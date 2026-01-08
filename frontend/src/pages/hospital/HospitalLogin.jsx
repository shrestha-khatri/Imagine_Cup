// HospitalRegister.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import '../../CSS/HospitalRegister.css';

export default function HospitalRegister() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const register = async () => {
    if (!name.trim() || !password.trim()) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      setError("");
      await api.post("/hospital/register", { name, password });
      navigate("/hospital/login");
    } catch (err) {
      setError("Hospital registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      register();
    }
  };

  return (
    <div className="hospital-register-page" id="hospitalRegisterPage">
      <div className="register-container" id="registerContainer">
        <div className="register-card" id="registerCard">
          <div className="register-header" id="registerHeader">
            <h1 className="register-title" id="registerTitle">Hospital Registration</h1>
            <p className="register-subtitle">Join Smart City Healthcare Network</p>
          </div>

          <div className="register-form" id="registerForm">
            <div className="form-group">
              <label className="form-label" htmlFor="hospitalName">Hospital Name</label>
              <input 
                id="hospitalName"
                className="form-input" 
                type="text" 
                placeholder="Enter hospital name"
                value={name}
                onChange={e => setName(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="hospitalPassword">Password</label>
              <input 
                id="hospitalPassword"
                className="form-input" 
                type="password" 
                placeholder="Create secure password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={loading}
              />
            </div>

            {error && (
              <div className="error-message" id="errorMessage" role="alert">
                {error}
              </div>
            )}

            <button 
              className={`register-button ${loading ? 'loading' : ''}`} 
              id="registerButton"
              onClick={register}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-small"></span>
                  Creating Account...
                </>
              ) : (
                'Create Hospital Account'
              )}
            </button>
          </div>

          <div className="register-footer">
            <p className="footer-text">
              Already registered? <button 
                className="login-link"
                onClick={() => navigate("/hospital/login")}
                disabled={loading}
              >
                Sign in here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
