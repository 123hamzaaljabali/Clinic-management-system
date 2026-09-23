import { Link, Outlet, useNavigate } from "react-router-dom";
import "../css/home.css";

export function Layout() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  function handleLogout() {
    localStorage.removeItem("user");
    navigate("/login");
  }

  return (
    <div className="home-page">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <div className="medical-logo">⚕</div>

          <div>
            <h2>Clinic</h2>
            <span>Management</span>
          </div>
        </div>
        <div className="sidebar-user">
          <div className="user-avatar">👤</div>

          <div className="user-info">
            <span className="user-label">Logged in as</span>
            <span className="user-email">{user?.email}</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <Link to="/home" className="nav-link">
            <span>⌂</span>
            Dashboard
          </Link>

          <Link to="/doctors" className="nav-link">
            <span>♟</span>
            Doctors
          </Link>

          <Link to="/patients" className="nav-link">
            <span>♙</span>
            Patients
          </Link>

          <Link to="/appointments" className="nav-link">
            <span>▣</span>
            Appointments
          </Link>

          <Link to="/statistics" className="nav-link">
            <span>◈</span>
            Statistics
          </Link>
        </nav>

        <div className="sidebar-bottom">
          <div className="system-status">
            <span className="status-dot"></span>
            System Online
          </div>

          <button className="logout-button" onClick={handleLogout}>
            <span>↪</span>
            Logout
          </button>
        </div>
      </aside>

      {/* Page Content */}
      <main className="dashboard">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
