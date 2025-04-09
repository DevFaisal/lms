import axios from "axios";

// Base URL for the API
const API_BASE_URL = "http://ec2-3-8-134-165.eu-west-2.compute.amazonaws.com:8000/api/v1";

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request interceptor for API calls
api.interceptors.request.use(
  (config) => {
    // You can add auth token here if needed
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for API calls
api.interceptors.response.use(
  (response) => {
    // Extract data from standard API response format
    if (response.data && response.data.data) {
      return response.data.data;
    }
    return response.data;
  },
  (error) => {
    // Handle errors
    const errorResponse = {
      status: error.response?.status || 500,
      message: error.response?.data?.error || "An unexpected error occurred",
      details: error.response?.data?.details || {},
    };

    console.error("API Error:", errorResponse);
    return Promise.reject(errorResponse);
  }
);

export default api;
