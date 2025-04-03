import axios from "axios";

const Axios = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

// Add a request interceptor
Axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default Axios;
