import axios from "axios";

const base = import.meta.env.VITE_API_BASE;

const api = axios.create({
  baseURL: base,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const t = localStorage.getItem("token");
  if (t) config.headers.Authorization = `Bearer ${t}`;
  return config;
});

export default api;
