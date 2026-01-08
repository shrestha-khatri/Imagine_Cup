import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/api";
import '../../CSS/HospitalDetails.css';

export default function HospitalDetails() {
  const { hospitalId } = useParams();
  const navigate = useNavigate();
  
  const [opds, setOpds] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [specialists, setSpecialists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [opdRes, equipRes, specRes] = await Promise.all([
          api.get("/hospitals/opd"),
          api.get("/hospitals/equipment"),
          api.get("/hospitals/specialists")
        ]);
        
        setOpds(opdRes.data.filter(o => o.hospital_id == hospitalId));
        setEquipment(equipRes.data.filter(e => e.hospital_id == hospitalId));
        setSpecialists(specRes.data.filter(s => s.hospital_id == hospitalId));
      } catch (err) {
        console.error("HospitalDetails API Error:", err);
        setError("Failed to load hospital details. Please check server status.");
      } finally {
        setLoading(false); // FIXED: was setLoading(true)
      }
    };

    if (hospitalId) {
      fetchData();
    }
  }, [hospitalId]);

  if (loading) {
    return (
      <div className="hospital-details-page">
        <div className="loading-container">
          <div className="spinner-large"></div>
          <p className="loading-text">Loading hospital details...</p>
        </div>
      </div>
    );
  }

  if (error || !hospitalId) {
    return (
      <div className="hospital-details-page">
        <div className="error-state">
          <div className="error-icon">⚠️</div>
          <h2 className="error-title">{error || "Hospital not found"}</h2>
          <button className="retry-button" onClick={() => window.location.reload()}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="hospital-details-page" id="hospitalDetailsPage">
      <div className="hospital-details-container" id="hospitalDetailsContainer">
        <header className="hospital-header" id="hospitalHeader">
          <div className="hospital-badge" id="hospitalBadge">
            <span className="hospital-icon">🏥</span>
            <h1 className="hospital-title" id="hospitalTitle">Hospital #{hospitalId}</h1>
          </div>
          <p className="hospital-subtitle" id="hospitalSubtitle">
            Complete hospital information and booking
          </p>
        </header>

        <div className="hospital-sections" id="hospitalSections">
          {/* OPD Section */}
          <section className="hospital-section opd-section" id="opdSection">
            <div className="section-header" id="opdHeader">
              <div className="section-icon">⏰</div>
              <h2 className="section-title">OPD Queue</h2>
              <span className="section-count">{opds.length} Departments</span>
            </div>
            <div className="section-grid" id="opdGrid">
              {opds.map((opd) => (
                <div key={opd.id} className="section-item opd-item" id={`opd-${opd.id}`}>
                  <div className="item-header">
                    <span className="item-icon">👨‍⚕️</span>
                    <span className="item-title">{opd.department}</span>
                  </div>
                  <div className="item-stat">
                    <span className="stat-number">{opd.queue_length}</span>
                    <span className="stat-label">Waiting</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Equipment Section */}
          <section className="hospital-section equipment-section" id="equipmentSection">
            <div className="section-header" id="equipmentHeader">
              <div className="section-icon">🩺</div>
              <h2 className="section-title">Equipment</h2>
              <span className="section-count">{equipment.length} Items</span>
            </div>
            <div className="section-grid" id="equipmentGrid">
              {equipment.map((equip) => (
                <div key={equip.id} className="section-item equipment-item" id={`equip-${equip.id}`}>
                  <div className="item-header">
                    <span className="item-icon">⚕️</span>
                    <span className="item-title">{equip.name}</span>
                  </div>
                  <div className="item-stat">
                    <span className="stat-number">{equip.quantity}</span>
                    <span className="stat-label">Available</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Specialists Section */}
          <section className="hospital-section specialists-section" id="specialistsSection">
            <div className="section-header" id="specialistsHeader">
              <div className="section-icon">👨‍⚕️</div>
              <h2 className="section-title">Specialists</h2>
              <span className="section-count">{specialists.length} Doctors</span>
            </div>
            <div className="section-grid" id="specialistsGrid">
              {specialists.map((specialist) => (
                <div key={specialist.id} className="section-item specialist-item" id={`specialist-${specialist.id}`}>
                  <div className="item-header">
                    <div className="doctor-avatar" id={`avatar-${specialist.id}`}>
                      Dr. {specialist.name.split(' ')[0]}
                    </div>
                    <div className="specialist-info">
                      <span className="item-title">{specialist.name}</span>
                      <span className="specialty-badge">{specialist.specialty}</span>
                    </div>
                  </div>
                  <div className="item-timing">{specialist.timing}</div>
                  <button 
                    className="book-button primary-btn"
                    id={`book-${specialist.id}`}
                    onClick={() => navigate(`/user/book-appointment/${specialist.id}`)}
                  >
                    Book Now
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Bed Booking CTA */}
        <div className="bed-booking-cta" id="bedBookingCTA">
          <button 
            className="bed-booking-button primary-btn large-btn"
            id="bookBedBtn"
            onClick={() => navigate("/user/book-bed")}
          >
            Book Bed →
          </button>
        </div>
      </div>
    </div>
  );
}
