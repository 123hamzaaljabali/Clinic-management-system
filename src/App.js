import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./Components/ProtectedRoute";
import { RegisterPage } from "./Pages/RegisterPage";
import DoctorPage from "./Pages/DoctorPages";
import PatientPage from "./Pages/PatientPages";
import AppointmentPage from "./Pages/AppointmentPages";
import StatisticsPages from "./Pages/statistics";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Layout from "./Layout/layout";

import { LoginPage } from "./Pages/AuthLogin";
import HomePage from "./Pages/HomePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* =========================
            AUTHENTICATION
        ========================= */}

        <Route path="/login" element={<LoginPage />} />

        <Route path="/register" element={<RegisterPage />} />

        {/* =========================
            CLINIC PAGES
            Layout keeps the sidebar
        ========================= */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/home" element={<HomePage />} />

            <Route path="/doctors" element={<DoctorPage />} />

            <Route path="/patients" element={<PatientPage />} />

            <Route path="/appointments" element={<AppointmentPage />} />

            <Route path="/statistics" element={<StatisticsPages />} />
          </Route>
        </Route>
      </Routes>

      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
