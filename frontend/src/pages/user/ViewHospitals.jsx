import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import '../../CSS/ViewHospitals.css';

export default function ViewHospitals() {
  const [hospitals, setHospitals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/hospitals/beds").then(res => setHospitals(res.data));
  }, []);

  if (hospitals.length === 0) {
    return (
      <div className="hospitals-page">
        <div className="empty-state">
          <div className="empty-icon">🏥</div>
          <h2 className="empty-title">No Hospitals Found</h2>
          <p className="empty-subtitle">Check back soon for available beds</p>
        </div>
      </div>
    );
  }

  return (
    <div className="hospitals-page">
      <div className="hospitals-container">
        <header className="page-header">
          <h2 className="page-title">Hospitals Near You</h2>
          <div className="header-stats">
            <span className="stat-badge">{hospitals.length} Hospitals</span>
          </div>
        </header>

        <div className="hospitals-grid">
          {hospitals.map(h => (
            <article key={h.id} className="hospital-card">
              <div className="hospital-header">
                <div className="hospital-id-badge">
                  ID #{h.hospital_id}
                </div>
                <div className="hospital-icon">🏥</div>
              </div>
              
              <div className="hospital-body">
                <div className="beds-info">
                  <div className="beds-label">
                    Beds Available
                  </div>
                  <div className="beds-progress">
                    <div 
                      className="progress-bar"
                      style={{ 
                        width: `${(h.available_beds / h.total_beds) * 100}%` 
                      }}
                    >
                      <span className="progress-text">
                        {h.available_beds}/{h.total_beds}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <button 
                className="details-button"
                onClick={() => navigate(`/user/hospital/${h.hospital_id}`)}
              >
                View Details →
              </button>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
