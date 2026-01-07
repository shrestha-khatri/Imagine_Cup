import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: 40, maxWidth: 400, margin: "auto" }}>
      <h1>Smart City Healthcare</h1>

      {/* Hospital Section */}
      <div style={{ marginTop: 30 }}>
        <h3>Hospital</h3>

        <button
          style={{ width: "100%" }}
          onClick={() => navigate("/hospital/login")}
        >
          Hospital Login
        </button>

        <p style={{ fontSize: 14, marginTop: 8 }}>
          New hospital?{" "}
          <span
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() => navigate("/hospital/register")}
          >
            Register here
          </span>
        </p>
      </div>

      {/* User Section */}
      <div style={{ marginTop: 40 }}>
        <h3>User</h3>

        <button
          style={{ width: "100%" }}
          onClick={() => navigate("/user/login")}
        >
          User Login
        </button>

        <p style={{ fontSize: 14, marginTop: 8 }}>
          New user?{" "}
          <span
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() => navigate("/user/register")}
          >
            Register here
          </span>
        </p>
      </div>
    </div>
  );
}
