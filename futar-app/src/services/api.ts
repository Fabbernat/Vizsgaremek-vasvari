const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_BASE_URL || 'http://192.168.1.145:5000/api';

  async function handleResponse(response: Response) {
  const contentType = response.headers.get('content-type');

  let data: any = null;

  if (contentType && contentType.includes('application/json')) {
    data = await response.json();
  } else {
    data = await response.text();
  }

  if (!response.ok) {
    throw new Error(data?.error || data || 'Ismeretlen hiba történt');
  }

  return data;
}

export async function loginUser(email: string, password: string) {
  const response = await fetch(`${API_BASE_URL}/Users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  return handleResponse(response);
}

export async function registerUser(payload: {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address: string;
}) {
  const response = await fetch(`${API_BASE_URL}/Users/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  return handleResponse(response);
}

export async function getOrders() {
  const response = await fetch(`${API_BASE_URL}/Orders`);
  return handleResponse(response);
}

export async function getMeals() {
  const response = await fetch(`${API_BASE_URL}/Meals`);
  return handleResponse(response);
}

export async function markDelivered(orderId: number) {
  const response = await fetch(`${API_BASE_URL}/Orders/${orderId}/deliver`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return handleResponse(response);
}