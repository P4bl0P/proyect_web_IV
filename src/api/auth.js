// src/api/auth.js
const API_URL = import.meta.env.VITE_API_URL;

export const login = async (email, password) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  if (!res.ok) throw new Error('Login failed');
  return res.json(); // devuelve { accessToken, refreshToken }
};

export const refreshAccessToken = async (refreshToken) => {
  const res = await fetch(`${API_URL}/auth/refresh-token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken })
  });
  if (!res.ok) throw new Error('Refresh token failed');
  return res.json(); // devuelve { accessToken, refreshToken }
};

export const logout = async (refreshToken) => {
  await fetch(`${API_URL}/auth/logout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken })
  });
};
