import axios from 'axios';
import AuthService from './authService';

// Configure your API base URL
const API_URL = import.meta.env.VITE_API_URL; 

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor to add token to headers for authenticated requests
axiosInstance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token'); // Retrieve token from localStorage
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`; // Attach token to headers
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// Optionally, you can handle response errors globally
axiosInstance.interceptors.response.use(
    response => response,
    async error => {
        if (error.response) {
            if (error.response.status === 401 && window.location.pathname != '/login') {
                AuthService.logout();
                window.location.href = '/login'; 
            } else if (error.response.status === 403) {
                AuthService.logout();
                window.location.href = '/login'; 
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;