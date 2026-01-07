import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";

export default function ViewHospitals() {
  const [hospitals, setHospitals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/hospitals/beds").then(res => setHospitals(res.data));
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h2>Hospitals Near You</h2>

      {hospitals.map(h => (
        <div
          key={h.id}
          style={{ border: "1px solid #ccc", padding: 10, marginBottom: 10 }}
        >
          <p><b>Hospital ID:</b> {h.hospital_id}</p>
          <p>
            Beds Available: {h.available_beds} / {h.total_beds}
          </p>

          <button onClick={() => navigate(`/user/hospital/${h.hospital_id}`)}>
            View Details
          </button>
        </div>
      ))}
    </div>
  );
}
