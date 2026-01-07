import { useEffect, useState } from "react";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";

export default function HospitalDashboard() {
  const hospitalId = localStorage.getItem("hospital_id");
  const navigate = useNavigate();
  const [beds, setBeds] = useState(null);

  useEffect(() => {
    api.get("/hospitals/beds").then(res => {
      const b = res.data.find(x => x.hospital_id == hospitalId);
      setBeds(b);
    });
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h2>Hospital Dashboard</h2>

      {beds && (
        <p>
          Beds: {beds.available_beds} / {beds.total_beds}
        </p>
      )}

      <button onClick={() => navigate("/hospital/bed-requests")}>
        Bed Requests
      </button>

      <br /><br />

      <button onClick={() => navigate("/hospital/appointment-requests")}>
        Appointment Requests
      </button>
    </div>
  );
}
