import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "../css/appointment.css";
import {
  deleteAppointment,
  getAppointment,
  insertAppointment,
  updateAppointment,
} from "../Service/AppointmentServices";

function AppointmentPages() {
  const [appointment, setAppointment] = useState([]);

  const [addAppointment, setAddAppointment] = useState({
    id: null,
    doctorId: null,
    patientId: null,
    status: "Scheduled",
    dateOnly: "",
    time: "",

    notes: "",
  });

  const [isEditingAppointment, setIsEditingAppointment] = useState(false);

  async function GetAppointment() {
    const data = await getAppointment();
    console.log("ALL APPOINTMENTS:", data);

    setAppointment(data);
    toast.success("Appointment Page Laoded  successfully");
  }
  async function CreateAppointment() {
    const newAppointment = {
      doctorId: addAppointment.doctorId,
      patientId: addAppointment.patientId,
      status: addAppointment.status,
      dateOnly: addAppointment.dateOnly,
      time: addAppointment.time,

      notes: addAppointment.notes,
    };

    await insertAppointment(newAppointment);

    setAddAppointment({
      id: null,
      doctorId: null,
      patientId: null,
      status: "Scheduled",
      dateOnly: "",
      time: "",

      notes: "",
    });
    await GetAppointment();
  }
  async function UpdateAppointment() {
    await updateAppointment({
      id: addAppointment.id,
      doctorId: addAppointment.doctorId,
      patientId: addAppointment.patientId,
      status: addAppointment.status,
      dateOnly: addAppointment.dateOnly,
      time: addAppointment.time,

      notes: addAppointment.notes,
    });

    setAddAppointment({
      id: null,
      doctorId: null,
      patientId: null,
      status: 0,
      dateOnly: "",
      time: "",

      notes: "",
    });

    setIsEditingAppointment(false);

    await GetAppointment();
  }
  function EditAppointment(Appointment) {
    setIsEditingAppointment(true);

    setAddAppointment({
      id: Appointment.id,
      doctorId: Appointment.doctorId,
      patientId: Appointment.patientId,
      status: Appointment.status,
      dateOnly: Appointment.dateOnly,
      time: Appointment.time,

      notes: Appointment.notes,
    });
  }
  async function DeleteAppointment(id) {
    await deleteAppointment(id);

    await GetAppointment();
  }

  useEffect(() => {
    GetAppointment();
  }, []);

  return (
    <div className="page-container">
      <h1 className="page-title">Appointments</h1>{" "}
      <form className="appointment-form">
        <label>Doctor ID</label>
        <input
          className="form-input"
          type="number"
          value={addAppointment.doctorId ?? ""}
          onChange={(event) => {
            setAddAppointment({
              ...addAppointment,
              doctorId: Number(event.target.value),
            });
          }}
        />
        <label>Patient ID</label>
        <input
          className="form-input"
          type="number"
          value={addAppointment.patientId ?? ""}
          onChange={(event) => {
            setAddAppointment({
              ...addAppointment,
              patientId: Number(event.target.value),
            });
          }}
        />
        <label>Status</label>
        <select
          className="form-input"
          value={addAppointment.status}
          onChange={(event) => {
            setAddAppointment({
              ...addAppointment,
              status: event.target.value,
            });
          }}
        >
          <option value="Scheduled">Scheduled</option>
          <option value="Cancelled">Cancelled</option>
          <option value="Completed">Completed</option>
        </select>
        <label>Date</label>
        <input
          className="form-input"
          type="date"
          value={addAppointment.dateOnly}
          onChange={(event) => {
            setAddAppointment({
              ...addAppointment,
              dateOnly: event.target.value,
            });
          }}
        />
        <label>Time</label>
        <input
          className="form-input"
          type="time"
          value={addAppointment.time}
          onChange={(event) => {
            setAddAppointment({
              ...addAppointment,
              time: event.target.value,
            });
          }}
        />
        <label>Notes</label>
        <input
          className="form-input"
          value={addAppointment.notes}
          onChange={(event) => {
            setAddAppointment({
              ...addAppointment,
              notes: event.target.value,
            });
          }}
        />
        <div className="appointment-buttons">
          <div className="create-update-buttons">
            <button
              className="btn btn-create"
              type="button"
              onClick={CreateAppointment}
            >
              Create
            </button>

            <button
              className="btn btn-update"
              type="button"
              onClick={UpdateAppointment}
              disabled={!isEditingAppointment}
            >
              Update
            </button>
          </div>

          <Link to="/home">
            <button className="btn btn-home" type="button">
              Home
            </button>
          </Link>
        </div>
      </form>
      <hr />
      <table className="data-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Doctor </th>
            <th>Patient </th>
            <th>Status</th>
            <th>Date</th>
            <th>Time</th>
            <th>Notes</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {appointment.map((appointment) => (
            <tr key={appointment.id}>
              <td>{appointment.id}</td>

              <td>
                {appointment.doctor.firstName} {appointment.doctor.lastName}
              </td>

              <td>
                {appointment.patients?.firstName}{" "}
                {appointment.patients?.lastName}
              </td>

              <td>{appointment.status}</td>

              <td>{appointment.dateOnly}</td>

              <td>{appointment.time}</td>

              <td>{appointment.notes}</td>

              <td>
                <button
                  className="btn btn-edit"
                  type="button"
                  onClick={() => EditAppointment(appointment)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-delete"
                  type="button"
                  onClick={() => DeleteAppointment(appointment.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/home">
        <button>Home</button>
      </Link>
    </div>
  );
}

export default AppointmentPages;
