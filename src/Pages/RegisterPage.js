import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../Service/AuthService";
import "../css/login.css";
import { toast } from "react-toastify";
export function RegisterPage() {
  const [user, setUser] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function RegisterUser() {
    setError("");

    // Check password
    if (user.password !== user.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await register(user.email, user.password);

      // After successful registration, go to login
      toast.success("User Createdd successfully");

      navigate("/login");
    } catch (error) {
      toast.error(error);

      setError("Registration failed");
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        {/* Header */}
        <div className="login-header">
          <div className="login-icon">⚕</div>

          <h1>Create Account</h1>

          <p>Register for the Clinic Management System</p>
        </div>

        {/* Form */}
        <div className="login-form">
          {/* Email */}
          <div className="input-group">
            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={user.email}
              onChange={(event) => {
                setUser({
                  ...user,
                  email: event.target.value,
                });
              }}
            />
          </div>

          {/* Password */}
          <div className="input-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={user.password}
              onChange={(event) => {
                setUser({
                  ...user,
                  password: event.target.value,
                });
              }}
            />
          </div>

          {/* Confirm Password */}
          <div className="input-group">
            <label>Confirm Password</label>

            <input
              type="password"
              placeholder="Confirm your password"
              value={user.confirmPassword}
              onChange={(event) => {
                setUser({
                  ...user,
                  confirmPassword: event.target.value,
                });
              }}
            />
          </div>

          {/* Error */}
          {error && <div className="register-error">{error}</div>}

          {/* Register Button */}
          <button className="login-button" type="button" onClick={RegisterUser}>
            Create Account
          </button>

          {/* Login Link */}
          <div className="register-section">
            <span>Already have an account?</span>

            <Link to="/login" className="register-link">
              Login
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="login-footer">
          <p>Clinic Management System</p>
        </div>
      </div>
    </div>
  );
}
