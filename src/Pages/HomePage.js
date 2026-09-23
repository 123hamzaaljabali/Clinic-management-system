import { Link } from "react-router-dom";
import { toast } from "react-toastify";
function HomePage() {
  toast.success("Home Page Loaded successfully");
  return (
    <>
      <header className="dashboard-header">
        <div>
          <p className="welcome-text">Welcome back 👋</p>
          <h1>Clinic Dashboard</h1>
          <p className="header-description">
            Manage your clinic from one place.
          </p>
        </div>

        <div className="profile">
          <div className="profile-icon">A</div>

          <div>
            <strong>Admin</strong>
            <span>Administrator</span>
          </div>
        </div>
      </header>

      <section className="overview">
        <div className="dashboard-card blue-card">
          <div className="card-icon">♟</div>

          <div>
            <p>Doctors</p>
            <h2>Manage Doctors</h2>
            <Link to="/doctors">View Doctors →</Link>
          </div>
        </div>

        <div className="dashboard-card green-card">
          <div className="card-icon">♙</div>

          <div>
            <p>Patients</p>
            <h2>Manage Patients</h2>
            <Link to="/patients">View Patients →</Link>
          </div>
        </div>

        <div className="dashboard-card purple-card">
          <div className="card-icon">▣</div>

          <div>
            <p>Appointments</p>
            <h2>Manage Appointments</h2>
            <Link to="/appointments">View Appointments →</Link>
          </div>
        </div>

        <div className="dashboard-card orange-card">
          <div className="card-icon">◈</div>

          <div>
            <p>Statistics</p>
            <h2>View Statistics</h2>
            <Link to="/statistics">View Statistics →</Link>
          </div>
        </div>
      </section>

      <section className="quick-section">
        <div className="section-heading">
          <h2>Quick Access</h2>

          <p>Quickly access the most important areas.</p>
        </div>

        <div className="quick-grid">
          <Link to="/appointments" className="quick-card">
            <div className="quick-icon">+</div>

            <div>
              <h3>New Appointment</h3>
              <p>Create a new patient appointment</p>
            </div>

            <span>→</span>
          </Link>

          <Link to="/patients" className="quick-card">
            <div className="quick-icon">+</div>

            <div>
              <h3>New Patient</h3>
              <p>Add a new patient to the system</p>
            </div>

            <span>→</span>
          </Link>

          <Link to="/doctors" className="quick-card">
            <div className="quick-icon">+</div>

            <div>
              <h3>New Doctor</h3>
              <p>Add a doctor to the clinic</p>
            </div>

            <span>→</span>
          </Link>
        </div>
      </section>

      <section className="welcome-card">
        <div>
          <span className="welcome-badge">CLINIC SYSTEM</span>

          <h2>Everything you need to manage your clinic.</h2>

          <p>
            Manage doctors, patients, appointments and clinic statistics from
            one simple dashboard.
          </p>
        </div>

        <div className="welcome-symbol">⚕</div>
      </section>
    </>
  );
}

export default HomePage;
