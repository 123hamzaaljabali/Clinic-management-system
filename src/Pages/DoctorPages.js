import { useState, useEffect } from "react";
import "../css/doctor.css";
import {
  deleteDoctor,
  getByIdDoctor,
  getDoctor,
  insertDoctor,
  updateDoctor,
} from "../Service/DoctorServices";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function DoctorPages() {
  const [doctor, setDoctor] = useState([]);
  const [addDoctor, setAddDoctor] = useState({
    id: null,
    firstName: "",
    lastName: "",
    specialty: "",
    mobileNumber: "",
    email: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  async function GetDoctor() {
    const data = await getDoctor();
    setDoctor(data);
    toast.success("Doctor page loaded successfully");
  }

  async function CreateDoctor() {
    const newDoctor = {
      firstName: addDoctor.firstName,
      lastName: addDoctor.lastName,
      specialty: addDoctor.specialty,
      mobileNumber: addDoctor.mobileNumber,
      email: addDoctor.email,
    };
    await insertDoctor(newDoctor);

    setAddDoctor({
      firstName: "",
      lastName: "",
      specialty: "",
      mobileNumber: "",
      email: "",
    });
    toast.success("Doctor Created successfully");

    await GetDoctor();
  }
  async function UpdateDoctor() {
    await updateDoctor({
      id: addDoctor.id,
      firstName: addDoctor.firstName,
      lastName: addDoctor.lastName,
      specialty: addDoctor.specialty,
      mobileNumber: addDoctor.mobileNumber,
      email: addDoctor.email,
    });
    setAddDoctor({
      id: "",
      firstName: "",
      lastName: "",
      specialty: "",
      mobileNumber: "",
      email: "",
    });
    setIsEditing(false);
    toast.success("Doctor Updated successfully");

    await GetDoctor();
  }
  function Edit(Doctor) {
    setIsEditing(true);
    setAddDoctor({
      id: Doctor.id,
      firstName: Doctor.firstName,
      lastName: Doctor.lastName,
      specialty: Doctor.specialty,
      mobileNumber: Doctor.mobileNumber,
      email: Doctor.email,
    });
  }
  async function DeleteDoctor(id) {
    await deleteDoctor(id);
    toast.success("Doctor Deleted successfully");

    await GetDoctor();
  }
  async function GetDoctorById(id) {
    const doct = await getByIdDoctor(id);
    setSelectedDoctor(doct);
  }
  useEffect(() => {
    GetDoctor();
  }, []);

  return (
    <div className="doctors-page">
      <h1 className="doctors-title">Doctors</h1>
      <hr></hr>

      <form className="doctor-form">
        <label>FirstName</label>
        <input
          className="doctor-input"
          value={addDoctor.firstName}
          onChange={(event) => {
            setAddDoctor({ ...addDoctor, firstName: event.target.value });
          }}
        />
        <hr></hr>

        <label>LastName</label>
        <input
          className="doctor-input"
          value={addDoctor.lastName}
          onChange={(event) => {
            setAddDoctor({ ...addDoctor, lastName: event.target.value });
          }}
        />
        <hr></hr>

        <label>Specialty</label>
        <input
          className="doctor-input"
          value={addDoctor.specialty}
          onChange={(event) => {
            setAddDoctor({ ...addDoctor, specialty: event.target.value });
          }}
        />
        <hr></hr>

        <label>MobileNumber</label>
        <input
          className="doctor-input"
          value={addDoctor.mobileNumber}
          onChange={(event) => {
            setAddDoctor({ ...addDoctor, mobileNumber: event.target.value });
          }}
        />
        <hr></hr>

        <label>Email</label>
        <input
          className="doctor-input"
          value={addDoctor.email}
          onChange={(event) => {
            setAddDoctor({ ...addDoctor, email: event.target.value });
          }}
        />

        <div className="doctor-buttons">
          <div className="doctor-create-update">
            <button
              className="doctor-btn doctor-create"
              type="button"
              onClick={CreateDoctor}
            >
              Create
            </button>

            <button
              className="doctor-btn doctor-update"
              type="button"
              onClick={UpdateDoctor}
              disabled={!isEditing}
            >
              Update
            </button>
          </div>

          <Link to="/home">
            <button className="doctor-btn doctor-home" type="button">
              Home
            </button>
          </Link>
        </div>
      </form>

      <table className="doctors-table">
        <thead>
          <th>Id</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Spacialty</th>
          <th>Mobile Number</th>
          <th>Email</th>
          <th>actions</th>
        </thead>
        <tbody>
          {doctor.map((doctor) => (
            <tr key={doctor.id}>
              <td>{doctor.id}</td>
              <td>{doctor.firstName}</td>
              <td>{doctor.lastName}</td>
              <td>{doctor.specialty}</td>
              <td>{doctor.mobileNumber}</td>
              <td>{doctor.email}</td>
              <td>
                <button type="button" onClick={() => Edit(doctor)}>
                  Edit
                </button>
                <button type="button" onClick={() => DeleteDoctor(doctor.id)}>
                  Delete{" "}
                </button>
                <button onClick={() => GetDoctorById(doctor.id)}>
                  Get By ID
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedDoctor && (
        <div>
          <h2>Selected Doctor</h2>
          <p>ID: {selectedDoctor.id}</p>
          <p>firstName: {selectedDoctor.firstName}</p>
          <p>LastName: {selectedDoctor.lastName}</p>
          <p>Specialty: {selectedDoctor.specialty}</p>
          <p>MobileNumber: {selectedDoctor.mobileNumber}</p>
          <p>Email : {selectedDoctor.email}</p>
        </div>
      )}
      <div>
        <Link to="/home">
          <button>Home</button>
        </Link>
      </div>
    </div>
  );
}

export default DoctorPages;
