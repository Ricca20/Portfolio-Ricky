import axios from 'axios';

// Use relative URL in production, localhost in development
const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const API_BASE_URL = import.meta.env.VITE_API_URL || 
  (isDevelopment ? 'http://localhost:5001/api' : '/api');

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Response interceptor
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    const message = error.response?.data?.message || error.message;
    console.error('API Error:', message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
