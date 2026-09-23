const API_URL = "http://localhost:5264/api/Appointment";

export async function getAppointment() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("failed to get the appointments");
  }

  const data = await response.json();
  return data;
}

export async function insertAppointment(Appointment) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(Appointment),
  });

  console.log("Appointment POST status:", response.status);

  const responseText = await response.text();

  console.log("Appointment POST response:", responseText);

  if (!response.ok) {
    throw new Error("failed to insert the appointment: " + responseText);
  }

  if (responseText) {
    return JSON.parse(responseText);
  }
}

export async function updateAppointment(Appointment) {
  const response = await fetch(API_URL, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(Appointment),
  });

  if (!response.ok) {
    throw new Error("failed to update the appointment");
  }

  const data = await response.json();
  return data;
}

export async function deleteAppointment(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  console.log("Delete status:", response.status);

  if (!response.ok) {
    throw new Error("failed to delete Appointment");
  }
}

export async function getAppointmentById(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "GET",
  });

  console.log("GET BY ID status:", response.status);

  const responseText = await response.text();

  console.log("GET BY ID response:", responseText);

  if (!response.ok) {
    throw new Error("failed to get appointment by ID: " + responseText);
  }

  if (!responseText) {
    return null;
  }

  return JSON.parse(responseText);
}
