import { useEffect, useState } from "react";
import api from "../../api/api";

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
    <div style={{ padding: 40 }}>
      <h2>Appointment Requests</h2>

      {requests.map(r => (
        <div key={r.id}>
          User {r.user_id} — Status: {r.status}
          <button onClick={() => updateStatus(r.id, "approved")}>Approve</button>
          <button onClick={() => updateStatus(r.id, "rejected")}>Reject</button>
        </div>
      ))}
    </div>
  );
}
