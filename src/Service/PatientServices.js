const API_URL = "http://localhost:5264/api/patient";

export async function getPatient() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("failed to get the patients");
  }
  const data = response.json();
  return data;
}

export async function insertPatient(patient) {
  const response = await fetch(API_URL, {
    method: "POST",
    body: patient,
  });

  console.log("POST status:", response.status);

  const text = await response.text();

  console.log("POST response:", text);

  if (!response.ok) {
    throw new Error("failed to insert patient");
  }

  return text ? JSON.parse(text) : null;
}
export async function updatePatient(Patient) {
  const response = await fetch(API_URL, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(Patient),
  });
  if (!response.ok) {
    throw new Error("please fill in all the required fields");
  }
  const data = response.json();
  return data;
}

export async function deletePatient(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  console.log("Delete status:", response.status);

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message);
  }
}

export async function getById(id) {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) {
    throw new Error("failed to get Patient with id" + { id });
  }
  const data = response.json();
  return data;
}
