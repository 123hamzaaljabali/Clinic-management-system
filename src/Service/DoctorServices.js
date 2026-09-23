const API_URL = "http://localhost:5264/api/Doctor";

export async function getDoctor() {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("failed to get the docror");
  }
  const data = response.json();
  return data;
}

export async function insertDoctor(Doctor) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(Doctor),
  });
  if (!response.ok) {
    throw new Error("failed to add the docror");
  }
  const data = await response.json();
  return data;
}

export async function updateDoctor(Doctor) {
  const response = await fetch(API_URL, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(Doctor),
  });
  if (!response.ok) {
    throw new Error("failed to add the docror");
  }
  const data = await response.json();
  return data;
}

export async function deleteDoctor(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  console.log("Delete status:", response.status);

  if (!response.ok) {
    throw new Error("failed to delete Doctor");
  }
}

export async function getByIdDoctor(id) {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) {
    throw new Error("failed to get doctor with id" + { id });
  }
  const data = response.json();
  return data;
}
