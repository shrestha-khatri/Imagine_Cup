import api from "../../api/api";

export default function BookBed() {
  const userId = localStorage.getItem("user_id");
  const hospitalId = 1; // simple demo: choose hospital 1

  const book = async () => {
    await api.post(`/hospital/${hospitalId}/bed-book`, { user_id: userId });
    alert("Bed booking request sent");
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Book Bed</h2>
      <button onClick={book}>Confirm Booking</button>
    </div>
  );
}
