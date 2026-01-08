import { useEffect, useState } from "react";
import api from "../../api/api";
import '../../CSS/BedRequests.css';

export default function BedRequests() {
  const hospitalId = localStorage.getItem("hospital_id");
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    api.get(`/hospital/${hospitalId}/bed-requests`).then(res => setRequests(res.data));
  }, []);

  const updateStatus = (id, status) => {
    api.put(`/hospital/bed-booking/${id}`, { status }).then(() => {
      setRequests(reqs =>
        reqs.map(r => r.id === id ? { ...r, status } : r)
      );
    });
  };

  return (
    <div className="bed-requests-page" id="bedRequestsPage">
      <div className="bed-requests-container" id="bedRequestsContainer">
        <header className="bed-requests-header" id="bedRequestsHeader">
          <div className="header-content">
            <h2 className="page-title" id="bedRequestsTitle">Bed Requests</h2>
            <span className="requests-count" id="bedRequestsCount">
              {requests.length} requests
            </span>
          </div>
        </header>

        <section className="bed-requests-section" id="bedRequestsSection">
          <div className="bed-requests-grid" id="bedRequestsGrid">
            {requests.map(r => (
              <div key={r.id} className={`bed-request-card status-${r.status}`} id={`bedRequest-${r.id}`}>
                <div className="request-header">
                  <div className="request-user">
                    <div className="user-avatar bed-avatar" id={`bedUserAvatar-${r.user_id}`}>
                      U{r.user_id}
                    </div>
                    <div className="user-info">
                      <span className="user-id">User #{r.user_id}</span>
                      <div className="bed-status-container">
                        <span className="status-label">Status:</span>
                        <span className="status-badge status-${r.status}" id={`bedStatus-${r.id}`}>
                          {r.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="bed-icon-container">
                    <div className="bed-icon" id={`bedIcon-${r.id}`}>🛏️</div>
                  </div>
                  <div className={`status-indicator status-${r.status}`} id={`bedIndicator-${r.id}`}></div>
                </div>
                
                <div className="bed-request-actions">
                  <button 
                    className="action-btn approve-bed-btn primary-btn" 
                    id={`approveBed-${r.id}`}
                    onClick={() => updateStatus(r.id, "approved")}
                    disabled={r.status === "approved"}
                  >
                    <span className="btn-icon">✅</span>
                    Approve Bed
                  </button>
                  <button 
                    className="action-btn reject-bed-btn danger-btn" 
                    id={`rejectBed-${r.id}`}
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
            <div className="empty-state" id="bedEmptyState">
              <div className="empty-icon">🛏️</div>
              <h3 className="empty-title">No bed requests</h3>
              <p className="empty-subtitle">Bed requests will appear here when users book beds</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
