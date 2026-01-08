import { useEffect, useState } from "react";
import api from "../../api/api";
import '../../CSS/MyAppointments.css';

export default function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    if (!userId) {
      setError("Please login to view appointments");
      setLoading(false);
      return;
    }

    const fetchAppointments = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/user/${userId}/appointments`);
        setAppointments(res.data);
      } catch (err) {
        setError("Failed to load appointments");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [userId]);

  const getStatusConfig = (status) => {
    const statuses = {
      pending: { color: 'orange', label: 'Pending', icon: '⏳' },
      confirmed: { color: 'green', label: 'Confirmed', icon: '✓' },
      completed: { color: 'blue', label: 'Completed', icon: '✅' },
      cancelled: { color: 'red', label: 'Cancelled', icon: '❌' }
    };
    return statuses[status.toLowerCase()] || statuses.pending;
  };

  if (loading) {
    return (
      <div className="appointments-page">
        <div className="loading-container">
          <div className="spinner-large"></div>
          <p className="loading-text">Loading your appointments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="appointments-page">
      <div className="appointments-container">
        <header className="appointments-header">
          <h1 className="appointments-title">My Appointments</h1>
          <div className="header-stats">
            <span className="stat-total">{appointments.length} Appointments</span>
          </div>
        </header>

        {error ? (
          <div className="error-state">
            <div className="error-icon">⚠️</div>
            <h2 className="error-title">{error}</h2>
            <p className="error-subtitle">
              {error.includes("login") 
                ? "Please log in to view your appointments" 
                : "Please try refreshing the page"
              }
            </p>
          </div>
        ) : appointments.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📅</div>
            <h2 className="empty-title">No Appointments Yet</h2>
            <p className="empty-subtitle">Book your first appointment to get started</p>
          </div>
        ) : (
          <div className="appointments-grid">
            {appointments.map((appointment) => {
              const status = getStatusConfig(appointment.status);
              return (
                <article key={appointment.id} className="appointment-card">
                  <div className="appointment-header">
                    <div className="doctor-avatar">
                      Dr. {appointment.specialist_id}
                    </div>
                    <div className={`status-badge ${status.color}`}>
                      <span className="status-icon">{status.icon}</span>
                      <span className="status-text">{status.label}</span>
                    </div>
                  </div>
                  
                  <div className="appointment-details">
                    <div className="detail-row">
                      <span className="detail-label">Specialty</span>
                      <span className="detail-value">General Medicine</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Date</span>
                      <span className="detail-value">
                        {appointment.date || 'Upcoming'}
                      </span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Time</span>
                      <span className="detail-value">
                        {appointment.time || 'TBD'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="appointment-actions">
                    <button className="action-button primary">
                      View Details
                    </button>
                    <button className="action-button secondary">
                      Reschedule
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
