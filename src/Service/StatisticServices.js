const API_URL = "http://localhost:5264/api/Appointment";

export async function getStatistics() {
  const response = await fetch(`${API_URL}/statistics`);

  console.log("STATUS:", response.status);

  if (!response.ok) {
    const errorText = await response.text();
    console.log("ERROR FROM BACKEND:", errorText);

    throw new Error("Failed to get statistics");
  }

  return await response.json();
}
export async function getAppointmentStatusStatistics() {
  const response = await fetch(`${API_URL}/statistics/status`);

  console.log("STATUS:", response.status);

  if (!response.ok) {
    const errorText = await response.text();
    console.log("ERROR FROM BACKEND:", errorText);

    throw new Error("Failed to get appointment status statistics");
  }

  return await response.json();
}
export async function getAppointmentByDoctor() {
  const response = await fetch(`${API_URL}/statistics/doctor`);

  if (!response.ok) {
    throw new Error("Failed to get doctor appointment statistics");
  }

  return await response.json();
}
