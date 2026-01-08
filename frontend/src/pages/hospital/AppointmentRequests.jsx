import { useEffect, useState } from "react";
import api from "../../api/api";
import '../../CSS/AppointmentRequests.css';

export default function AppointmentRequests() {
  const hospitalId = localStorage.getItem("hospital_id");
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    api.get("/hospitals/specialists").then(res => {
      const specialistIds = res.data
        .filter(s => s.hospital_id == hospitalId)
        .map(s => s.id);

      Promise.all(
        specialistIds.map(id => api.get(`/specialist/${id}/appointments`))
      ).then(results => {
        setRequests(results.flatMap(r => r.data));
      });
    });
  }, []);

  const updateStatus = (id, status) => {
    api.put(`/appointment/${id}`, { status }).then(() => {
      setRequests(reqs =>
        reqs.map(r => r.id === id ? { ...r, status } : r)
      );
    });
  };

  return (
    <div className="requests-dashboard-page" id="appointmentRequestsPage">
      <div className="requests-container" id="requestsContainer">
        <header className="requests-header" id="requestsHeader">
          <div className="header-content">
            <h2 className="page-title" id="requestsTitle">Appointment Requests</h2>
            <span className="requests-count" id="requestsCount">
              {requests.length} requests
            </span>
          </div>
        </header>

        <section className="requests-list-section" id="requestsListSection">
          <div className="requests-grid" id="requestsGrid">
            {requests.map(r => (
              <div key={r.id} className={`request-card status-${r.status}`} id={`request-${r.id}`}>
                <div className="request-header">
                  <div className="request-user">
                    <div className="user-avatar" id={`userAvatar-${r.user_id}`}>
                      U{r.user_id}
                    </div>
                    <div className="user-info">
                      <span className="user-id">User #{r.user_id}</span>
                      <span className="request-status" id={`status-${r.id}`}>
                        Status: <strong className={`status-badge status-${r.status}`}>{r.status}</strong>
                      </span>
                    </div>
                  </div>
                  <div className={`status-indicator status-${r.status}`} id={`indicator-${r.id}`}></div>
                </div>
                
                <div className="request-actions">
                  <button 
                    className="action-btn approve-btn primary-btn" 
                    id={`approve-${r.id}`}
                    onClick={() => updateStatus(r.id, "approved")}
                    disabled={r.status === "approved"}
                  >
                    <span className="btn-icon">✅</span>
                    Approve
                  </button>
                  <button 
                    className="action-btn reject-btn danger-btn" 
                    id={`reject-${r.id}`}
                    onClick={() => updateStatus(r.id, "rejected")}
                    disabled={r.status === "rejected"}
                  >
                    <span className="btn-icon">❌</span>
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {requests.length === 0 && (
            <div className="empty-state" id="emptyState">
              <div className="empty-icon">📅</div>
              <h3 className="empty-title">No appointment requests</h3>
              <p className="empty-subtitle">Requests will appear here when users book appointments</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
