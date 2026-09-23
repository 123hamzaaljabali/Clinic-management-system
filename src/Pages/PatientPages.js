import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "../css/patient.css";
import {
  deletePatient,
  getById,
  getPatient,
  insertPatient,
  updatePatient,
} from "../Service/PatientServices";
import { Link } from "react-router-dom";

function PatientPages() {
  const [patient, setPatient] = useState([]);
  const [addPatient, setAddPatient] = useState({
    id: null,
    firstName: "",
    lastName: "",
    mobileNumber: "",
    photo: "",
    email: "",
    doctorId: null,
  });
  const [isEditingPatient, setIsEditingPatient] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [photo, setPhoto] = useState(null);

  async function GetPatient() {
    const data = await getPatient();
    console.log("Patients from API:", data);

    setPatient(data);
    toast.success("Patients page Loaded successfully");
  }

  async function CreatePatient() {
    const formData = new FormData();

    formData.append("firstName", addPatient.firstName);
    formData.append("lastName", addPatient.lastName);
    formData.append("mobileNumber", addPatient.mobileNumber);
    formData.append("email", addPatient.email);
    formData.append("doctorId", addPatient.doctorId);

    if (photo) {
      formData.append("photo", photo);
    }
    if (addPatient.firstName === "") {
      alert("first name required");
      return;
    }
    if (addPatient.email === "") {
      alert("email is required");
      return;
    }

    await insertPatient(formData);
    toast.success("Patient Inserted successfully");

    // Get the new list from the database
    const data = await getPatient();

    // Put the new list into React
    setPatient(data);

    // Clear the form
    setAddPatient({
      id: null,
      firstName: "",
      lastName: "",
      mobileNumber: "",
      email: "",
      doctorId: null,
    });

    setPhoto(null);
  }
  async function UpdatePatient() {
    try {
      await updatePatient({
        id: addPatient.id,
        firstName: addPatient.firstName,
        lastName: addPatient.lastName,
        mobileNumber: addPatient.mobileNumber,
        photo: addPatient.photo,
        doctorId: addPatient.doctorId,
        email: addPatient.email,
      });
      toast.success("Patient Updated successfully");

      setAddPatient({
        id: null,
        firstName: "",
        lastName: "",
        mobileNumber: "",
        photo: "",
        doctorId: "",
        email: "",
      });
      setIsEditingPatient(false);
      await GetPatient();
      toast.success("Patient Updated successfully");
    } catch (error) {
      toast.error(error.message);
    }
  }
  function EditPatient(Patient) {
    setIsEditingPatient(true);
    setAddPatient({
      id: Patient.id,
      firstName: Patient.firstName,
      lastName: Patient.lastName,
      mobileNumber: Patient.mobileNumber,
      photo: Patient.photo,
      email: Patient.email,
      doctorId: Patient.doctorId,
    });
  }
  async function DeletePatient(id) {
    try {
      await deletePatient(id);
      await GetPatient();
      toast.success("Patient deleted successfully");
    } catch (error) {
      toast.error(error.message);
    }
  }
  async function GetById(id) {
    const patient = await getById(id);
    setSelectedPatient(patient);
  }
  useEffect(() => {
    GetPatient();
  }, []);
  return (
    <div className="patients-page">
      <h1 className="patients-title">Patients</h1>
      <form className="patient-form">
        <label>FirstName</label>
        <input
          className="patient-input"
          value={addPatient.firstName}
          onChange={(event) => {
            setAddPatient({ ...addPatient, firstName: event.target.value });
          }}
        />
        <label>LastName</label>
        <input
          className="patient-input"
          value={addPatient.lastName}
          onChange={(event) => {
            setAddPatient({ ...addPatient, lastName: event.target.value });
          }}
        />
        <label>MobileNumber</label>
        <input
          className="patient-input"
          value={addPatient.mobileNumber}
          onChange={(event) => {
            setAddPatient({
              ...addPatient,
              mobileNumber: event.target.value,
            });
          }}
        />
        <label>Doctor ID</label>

        <input
          className="patient-input"
          type="number"
          value={addPatient.doctorId || ""}
          onChange={(e) =>
            setAddPatient({
              ...addPatient,
              doctorId: Number(e.target.value),
            })
          }
        />
        <label>Add your Photo</label>
        <input
          className="patient-input"
          type="file"
          accept="image/*"
          onChange={(e) => setPhoto(e.target.files[0])}
        />
        <label>Email</label>
        <input
          className="patient-input"
          value={addPatient.email}
          onChange={(event) => {
            setAddPatient({ ...addPatient, email: event.target.value });
          }}
        />
        <div className="patient-buttons">
          <div className="patient-create-update">
            <button
              className="patient-btn patient-create"
              type="button"
              onClick={CreatePatient}
            >
              Create
            </button>

            <button
              className="patient-btn patient-update"
              type="button"
              onClick={UpdatePatient}
              disabled={!isEditingPatient}
            >
              Update
            </button>
          </div>

          <Link to="/home">
            <button className="patient-btn patient-home" type="button">
              Home
            </button>
          </Link>
        </div>
      </form>
      <hr></hr>
      {/* PATIENT FORM  */}

      {/*PATIENT TABLE */}
      <div>
        <table className="patients-table">
          <thead>
            <tr>
              <th>Id </th>
              <th>FirstName </th>
              <th>LastName</th>
              <th>MobileNumber</th>
              <th>DoctorID</th>
              <th>Add your PHoto</th>
              <th>Email</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {patient.map((patient) => (
              <tr key={patient.id}>
                <td>{patient.id}</td>
                <td>{patient.firstName}</td>
                <td>{patient.lastName}</td>
                <td>{patient.mobileNumber}</td>
                <td>{patient.doctorId}</td>
                <td>{patient.photo}</td>
                <td>{patient.email}</td>
                <td>
                  <button
                    className="patient-edit"
                    type="button"
                    onClick={() => EditPatient(patient)}
                  >
                    Edit
                  </button>
                  <button
                    className="patient-delete"
                    type="button"
                    onClick={() => DeletePatient(patient.id)}
                  >
                    Delete{" "}
                  </button>
                  <button onClick={() => GetById(patient.id)}>Get By ID</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {selectedPatient && (
          <div>
            <h2>Selected Patient</h2>

            <p>ID: {selectedPatient.id}</p>

            <p>firstName: {selectedPatient.firstName}</p>
            <p>LastName: {selectedPatient.lastName}</p>
            <p>mobile: {selectedPatient.mobileNumber}</p>
            <p>photo: {selectedPatient.photo}</p>
            <p>Email : {selectedPatient.email}</p>
          </div>
        )}
      </div>
      <div>
        <Link to="/home">
          <button>Home</button>
        </Link>
      </div>
    </div>
  );
}
export default PatientPages;
