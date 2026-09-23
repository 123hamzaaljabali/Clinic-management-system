import { useState } from "react";
import { loginUser } from "../Service/AuthService";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "../css/login.css";

export function LoginPage() {
  const [userName, setUserName] = useState({
    email: "",
    password: "",
  });
  const [error] = useState("");

  const navigate = useNavigate();

  async function LoginUser() {
    try {
      const user = await loginUser(userName.email, userName.password);
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: user.id,
          email: user.email,
        }),
      );

      console.log("Logged in user:", user);
      navigate("/home");
      toast.success("User Login successfully");
    } catch (error) {
      toast.error("Email or password incorrect");
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <div className="login-icon">⚕</div>

          <h1>Welcome Back</h1>

          <p>Sign in to your Clinic Management System</p>
        </div>

        <div className="login-form">
          <div className="input-group">
            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={userName.email}
              onChange={(event) => {
                setUserName({
                  ...userName,
                  email: event.target.value,
                });
              }}
            />
          </div>

          <div className="input-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={userName.password}
              onChange={(event) => {
                setUserName({
                  ...userName,
                  password: event.target.value,
                });
              }}
            />
            {error && <div className="login-error">{error}</div>}
          </div>

          <button className="login-button" type="button" onClick={LoginUser}>
            Login
          </button>

          {/* Register */}

          <div className="register-section">
            <span>Don't have an account?</span>

            <Link to="/register" className="register-link">
              Create an account
            </Link>
          </div>
        </div>

        <div className="login-footer">
          <p>Clinic Management System</p>
        </div>
      </div>
    </div>
  );
}
