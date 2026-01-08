import { useState } from "react";
import api from "../../api/api";

export default function ManageEquipment() {
  const hospitalId = localStorage.getItem("hospital_id");
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");

  const addEquipment = async () => {
    try {
      await api.post(`/hospital/${hospitalId}/equipment`, {
        name,
        quantity: parseInt(quantity),
      });
      alert("Equipment added successfully");
      setName("");
      setQuantity("");
    } catch {
      alert("Failed to add equipment");
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Manage Equipment</h2>

      <input
        placeholder="Equipment Name (e.g. MRI)"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <br /><br />

      <button onClick={addEquipment}>Add Equipment</button>
    </div>
  );
}
