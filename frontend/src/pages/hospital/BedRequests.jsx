import { useEffect, useState } from "react";
import api from "../../api/api";

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
    <div style={{ padding: 40 }}>
      <h2>Bed Requests</h2>

      {requests.map(r => (
        <div key={r.id}>
          User {r.user_id} — {r.status}
          <button onClick={() => updateStatus(r.id, "approved")}>Approve</button>
          <button onClick={() => updateStatus(r.id, "rejected")}>Reject</button>
        </div>
      ))}
    </div>
  );
}
