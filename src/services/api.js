// src/api/notesApi.js
import axios from "axios";

const API_URL = "https://express-fruit-1gm4.onrender.com/api";

export const fetchNotes = async () => {
  const res = await axios.get(`${API_URL}/notes`);
  return res.data;
};

export const createNote = async (note) => {
  const res = await axios.post(`${API_URL}/notes/`, note);
  return res.data;
};

export const updateNote = async (id, updatedNote) => {
  const res = await axios.put(`${API_URL}/notes/${id}`, updatedNote);
  return res.data;
};

export const deleteNote = async (id) => {
  const res = await axios.delete(`${API_URL}/notes/${id}`);
  return res.data;
};

export const logout = async () => {
  const res = await axios.post(`${API_URL}/logout`);
  return res.data;
};

export const forgot= async () => {
  const res = await axios.post(`${API_URL}/forgot-password`);
  return res.data;
};

export const reset = async (access_token, refresh_token, new_password) => {
  const res = await axios.post(`${API_URL}/reset-password/`, {
    access_token,
    refresh_token,
    new_password
  });
  return res.data;
};