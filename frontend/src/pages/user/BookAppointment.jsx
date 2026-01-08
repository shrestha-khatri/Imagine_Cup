import { useEffect, useState } from "react";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";
import '../../CSS/BookAppointment.css';

export default function BookAppointment() {
  const navigate = useNavigate();
  const [beds, setBeds] = useState([]);
  const [specialists, setSpecialists] = useState([]);

  useEffect(() => {
    api.get("/hospitals/beds").then(res => setBeds(res.data));
    api.get("/hospitals/specialists").then(res => setSpecialists(res.data));
  }, []);

  return (
    <div className="appointment-dashboard-page" id="bookAppointmentPage">
      <div className="appointment-container" id="appointmentContainer">
        <header className="appointment-header" id="appointmentHeader">
          <h2 className="dashboard-title" id="mainDashboardTitle">User Dashboard</h2>
        </header>

        {/* Hospitals & Beds Section */}
        <section className="beds-section" id="hospitalsBedsSection">
          <h3 className="section-title beds-title" id="bedsSectionTitle">Hospitals & Beds</h3>
          <div className="beds-list" id="bedsList">
            {beds.map(b => (
              <div key={b.id} className="bed-item" id={`bed-${b.id}`}>
                <div className="bed-info">
                  <span className="hospital-badge" id={`hospital-${b.hospital_id}`}>Hospital #{b.hospital_id}</span>
                  <span className="bed-availability">Available: <strong>{b.available_beds}</strong></span>
                </div>
                <button 
                  className="book-bed-btn primary-btn" 
                  id={`bookBed-${b.id}`}
                  onClick={() => navigate("/user/book-bed")}
                >
                  Book Bed
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Specialists Section */}
        <section className="specialists-section" id="specialistsSection">
          <h3 className="section-title specialists-title" id="specialistsTitle">Specialists</h3>
          <div className="specialists-list" id="specialistsList">
            {specialists.map(s => (
              <div key={s.id} className="specialist-item" id={`specialist-${s.id}`}>
                <div className="specialist-info">
                  <span className="specialist-name">{s.name}</span>
                  <span className="specialist-specialty">({s.specialty})</span>
                  <span className="specialist-timing">— {s.timing}</span>
                </div>
                <button 
                  className="book-appointment-btn primary-btn" 
                  id={`bookAppt-${s.id}`}
                  onClick={() => navigate(`/user/book-appointment/${s.id}`)}
                >
                  Book Appointment
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <section className="quick-actions-section" id="quickActions">
          <div className="actions-grid" id="actionsGrid">
            <button 
              className="action-btn my-beds-btn secondary-btn" 
              id="myBedsBtn"
              onClick={() => navigate("/user/my-beds")}
            >
              My Bed Bookings
            </button>
            <button 
              className="action-btn my-appointments-btn secondary-btn" 
              id="myAppointmentsBtn"
              onClick={() => navigate("/user/my-appointments")}
            >
              My Appointments
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
