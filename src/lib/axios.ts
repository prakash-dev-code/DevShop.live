// src/lib/axios.ts
import axios from "axios";
import toast from "react-hot-toast";

const axiosInstance = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  baseURL: "https://devshop-backend-xzm8.onrender.com/",

  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      localStorage.removeItem("token");
      toast.error("Session expired. Please log in again.");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
