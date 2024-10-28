import axios from "axios"

const api = axios.create({
  baseURL: "https://sharemebackend.online",
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("access_token");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${JSON.parse(accessToken)}`
  }
  return config;
});

export default api;