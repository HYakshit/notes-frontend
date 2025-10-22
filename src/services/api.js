
import axios from "axios";


// Create a credentialed axios instance targeting the Vite proxy at /api
export const apiClient = axios.create({
  baseURL: "/api",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// Global 401 handler hook; caller can set onUnauthorized to redirect, etc.
let onUnauthorized = null;
export const setUnauthorizedHandler = (handler) => {
  onUnauthorized = handler;
};

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    if (status === 401 && typeof onUnauthorized === "function") {
      onUnauthorized(error);
    }
    return Promise.reject(error);
  }
);

// Notes APIs
export const fetchNotes = async () => {
  const res = await apiClient.get(`/notes`);
  return res.data;
};

export const createNote = async (note) => {
  const res = await apiClient.post(`/notes`, note);
  return res.data;
};

export const updateNote = async (id, updatedNote) => {
  const res = await apiClient.put(`/notes/${id}`, updatedNote);
  return res.data;
};

export const deleteNote = async (id) => {
  const res = await apiClient.delete(`/notes/${id}`);
  return res.data;
};
export const pinNote = async (id) => {
  const res = await apiClient.put(`notes/${id}/pin`);
  return res.data;
};

// Auth APIs (aligned with backend)
export const register = async ({ email, password, displayName }) => {
  const res = await apiClient.post(`/register`, {
    email,
    password,
    displayName,
  });
  return res.data;
};

export const login = async ({ email, password }) => {
  const res = await apiClient.post(`/login`, { email, password });
  return res.data;
};

export const me = async () => {
  const res = await apiClient.get(`/me`);
  return res.data;
};

export const logout = async () => {
  const res = await apiClient.post(`/logout`);
  return res.data;
};

export const forgotPassword = async (email) => {
  const res = await apiClient.post(`/forgot-password`,{email});
  return res.data;
};

export const resetPassword = async (access_token, refresh_token, new_password) => {
  const res = await apiClient.post(`/reset-password/`, {
    access_token,
    refresh_token,
    new_password,
  });
  return res.data;
};
