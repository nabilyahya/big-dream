import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: '/api',
  timeout: 10000, // Timeout for requests
});

// Request interceptor to add authorization headers if needed
axiosInstance.interceptors.request.use(
  (config) => {
    // Retrieve token from local storage (if applicable)
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors or modify responses
axiosInstance.interceptors.response.use(
  (response) => {
    // Any modifications to the response data can be done here
    return response;
  },
  (error) => {
    // Handle errors globally
    console.error('API call error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
