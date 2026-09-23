import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar,
} from "recharts";

import {
  getStatistics,
  getAppointmentStatusStatistics,
  getAppointmentByDoctor,
} from "../Service/StatisticServices";

function StatisticsPages() {
  const [statistics, setStatistics] = useState([]);
  const [statusStatistics, setStatusStatistics] = useState([]);
  const [doctorStatistics, setDoctorStatistics] = useState([]);

  async function GetStatistics() {
    const data = await getStatistics();

    console.log("STATISTICS:", data);

    setStatistics(data);
    toast.success("Gets the statistics successfully");
  }

  async function GetStatusStatistics() {
    const data = await getAppointmentStatusStatistics();

    console.log("STATUS STATISTICS:", data);

    setStatusStatistics(data);
    toast.success("Gets the status successfully");
  }
  async function GetDoctorStatistics() {
    const data = await getAppointmentByDoctor();

    console.log("DOCTOR STATISTICS:", data);

    setDoctorStatistics(data);
  }

  useEffect(() => {
    GetStatistics();
    GetStatusStatistics();
    GetDoctorStatistics();
  }, []);
  const STATUS_COLORS = {
    Scheduled: "#3b82f6",
    Completed: "#22c55e",
    Cancelled: "#ef4444",
  };
  return (
    <div>
      {/* HOME BUTTON */}

      {/* CHARTS */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "40px",
          width: "100%",
          marginBottom: "80px",
        }}
      >
        {/* CIRCLE CHART */}
        <div style={{ width: "33%", height: 500 }}>
          <h2>Appointments by Status</h2>

          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={statusStatistics}
                dataKey="count"
                nameKey="status"
                cx="50%"
                cy="50%"
                outerRadius={130}
                label
              >
                {statusStatistics.map((item, index) => (
                  <Cell key={index} fill={STATUS_COLORS[item.status]} />
                ))}
              </Pie>

              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* LINE CHART */}
        <div style={{ width: "33%", height: 500 }}>
          <h2>Appointments by Date</h2>

          <ResponsiveContainer>
            <LineChart data={statistics}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="date" />

              <YAxis allowDecimals={false} />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="count"
                stroke="#2563eb"
                strokeWidth={3}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* BAR CHART */}
        <div style={{ width: "33%", height: 500 }}>
          <h2>Appointments by Doctor</h2>

          <ResponsiveContainer>
            <BarChart data={doctorStatistics}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="doctorName" />

              <YAxis allowDecimals={false} />

              <Tooltip />

              <Bar dataKey="count" fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* HOME BUTTON */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "30px",
          marginBottom: "30px",
        }}
      >
        <Link to="/home">
          <button
            type="button"
            style={{
              padding: "10px 25px",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Home
          </button>
        </Link>
      </div>
    </div>
  );
}
export default StatisticsPages;
