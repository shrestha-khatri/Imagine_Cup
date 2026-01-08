import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import '../../CSS/UserDashboard.css';

export default function UserDashboard() {
  const navigate = useNavigate();
  const [beds, setBeds] = useState([]);
  const [specialists, setSpecialists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [bedsRes, specialistsRes] = await Promise.all([
          api.get("/hospitals/beds"),
          api.get("/hospitals/specialists")
        ]);
        setBeds(bedsRes.data);
        setSpecialists(specialistsRes.data);
      } catch (err) {
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="dashboard-page">
        <div className="loading-container">
          <div className="spinner-large"></div>
          <p className="loading-text">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-page">
        <div className="error-state">
          <div className="error-icon">⚠️</div>
          <h2 className="error-title">{error}</h2>
          <button className="retry-button" onClick={() => window.location.reload()}>
            Reload Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <header className="dashboard-header">
          <div className="stats-overview">
            <div className="stat-card beds-stat">
              <div className="stat-icon">🛏️</div>
              <div className="stat-content">
                <span className="stat-number">{beds.reduce((sum, b) => sum + b.available_beds, 0)}</span>
                <span className="stat-label">Beds Available</span>
              </div>
            </div>
            <div className="stat-card specialists-stat">
              <div className="stat-icon">👨‍⚕️</div>
              <div className="stat-content">
                <span className="stat-number">{specialists.length}</span>
                <span className="stat-label">Specialists</span>
              </div>
            </div>
          </div>
          <h1 className="dashboard-title">Dashboard</h1>
        </header>

        {/* Hospitals & Beds Section */}
        <section className="dashboard-section beds-section">
          <div className="section-header">
            <div className="section-icon">🏥</div>
            <h2 className="section-title">Hospitals & Available Beds</h2>
          </div>
          <div className="beds-grid">
            {beds.map((bed) => (
              <div key={bed.id} className="bed-card">
                <div className="bed-header">
                  <span className="hospital-badge">Hospital #{bed.hospital_id}</span>
                  <div className="bed-icon">🛏️</div>
                </div>
                <div className="bed-stats">
                  <div className="bed-availability">
                    <span className="availability-number">{bed.available_beds}</span>
                    <span className="availability-label">Available Beds</span>
                  </div>
                  <div className="bed-progress">
                    <div 
                      className="progress-fill"
                      style={{ 
                        width: `${(bed.available_beds / bed.total_beds) * 100}%` 
                      }}
                    ></div>
                  </div>
                </div>
                <button 
                  className="book-bed-button"
                  onClick={() => navigate("/user/book-bed")}
                >
                  Book Bed
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Specialists Section */}
        <section className="dashboard-section specialists-section">
          <div className="section-header">
            <div className="section-icon">👨‍⚕️</div>
            <h2 className="section-title">Available Specialists</h2>
          </div>
          <div className="specialists-grid">
            {specialists.slice(0, 6).map((specialist) => (
              <div key={specialist.id} className="specialist-card">
                <div className="specialist-avatar">
                  Dr. {specialist.name.split(' ')[0]}
                </div>
                <div className="specialist-info">
                  <h4 className="specialist-name">{specialist.name}</h4>
                  <span className="specialist-specialty">{specialist.specialty}</span>
                  <span className="specialist-timing">{specialist.timing}</span>
                </div>
                <button 
                  className="book-appointment-button"
                  onClick={() => navigate(`/user/book-appointment/${specialist.id}`)}
                >
                  Book Now
                </button>
              </div>
            ))}
          </div>
          {specialists.length > 6 && (
            <div className="view-all-cta">
              <button 
                className="view-all-button"
                onClick={() => navigate('/user/specialists')}
              >
                View All Specialists ({specialists.length})
              </button>
            </div>
          )}
        </section>

        {/* Quick Actions */}
        <section className="quick-actions-section">
          <h3 className="actions-title">Quick Actions</h3>
          <div className="actions-grid">
            <button 
              className="action-button my-beds-button"
              onClick={() => navigate("/user/my-beds")}
            >
              <span className="action-icon">📋</span>
              My Bed Bookings
            </button>
            <button 
              className="action-button my-appointments-button"
              onClick={() => navigate("/user/my-appointments")}
            >
              <span className="action-icon">📅</span>
              My Appointments
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
