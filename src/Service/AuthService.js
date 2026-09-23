const API_URL = "http://localhost:5264/api/Auth";

export async function loginUser(email, password) {
  const response = await fetch(
    `${API_URL}/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`,
    {
      method: "GET",
    },
  );

  if (!response.ok) {
    throw new Error("failed to login user");
  }

  const data = await response.json();

  return data;
}

export async function register(email, password) {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("failed to register user");
  }

  const data = await response.json();

  return data;
}
