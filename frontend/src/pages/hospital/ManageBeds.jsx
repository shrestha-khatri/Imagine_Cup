import { useState } from "react";
import api from "../../api/api";

export default function ManageBeds() {
  const hospitalId = localStorage.getItem("hospital_id");
  const [totalBeds, setTotalBeds] = useState("");
  const [availableBeds, setAvailableBeds] = useState("");

  const updateBeds = async () => {
    try {
      await api.post(`/hospital/${hospitalId}/beds`, {
        total_beds: parseInt(totalBeds),
        available_beds: parseInt(availableBeds),
      });
      alert("Beds updated successfully");
    } catch {
      alert("Failed to update beds");
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Manage Beds</h2>

      <input
        placeholder="Total Beds"
        value={totalBeds}
        onChange={(e) => setTotalBeds(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Available Beds"
        value={availableBeds}
        onChange={(e) => setAvailableBeds(e.target.value)}
      />
      <br /><br />

      <button onClick={updateBeds}>Update Beds</button>
    </div>
  );
}
