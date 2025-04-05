import axios from "axios";

const token = localStorage.getItem("token");

const axiosInstance = axios.create({
  //baseURL: "http://104.248.36.17:5000", // Tüm istekler için temel URL
  baseURL: "http://localhost:5000", // Tüm istekler için temel URL
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
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