import { useState } from "react";
import api from "../../api/api";

export default function ManageOPD() {
  const hospitalId = localStorage.getItem("hospital_id");
  const [department, setDepartment] = useState("");
  const [queueLength, setQueueLength] = useState("");

  const addOPD = async () => {
    try {
      await api.post(`/hospital/${hospitalId}/opd`, {
        department,
        queue_length: parseInt(queueLength),
      });
      alert("OPD added successfully");
      setDepartment("");
      setQueueLength("");
    } catch {
      alert("Failed to add OPD");
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Manage OPD</h2>

      <input
        placeholder="Department Name"
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Queue Length"
        value={queueLength}
        onChange={(e) => setQueueLength(e.target.value)}
      />
      <br /><br />

      <button onClick={addOPD}>Add OPD</button>
    </div>
  );
}
