// src/services/axiosConfig.js
import axios from "axios";

const token = localStorage.getItem("token");

const axiosInstance = axios.create({
  baseURL: "http://104.248.36.17:5002/api", // Tüm istekler için temel URL
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    // Her istekte token'ı güncelle
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;