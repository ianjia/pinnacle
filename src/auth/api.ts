
import axios from 'axios';
import { HTTPS_SERVER_URL, SERVER_URL } from '../components/component-service-proxy';


export const api = axios.create({
  baseURL: SERVER_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      alert("Please login again");
      // 1. Remove token from local storage or from axios defaults, normally 401 means token expired
      localStorage.removeItem('token');
      // 2. Hard redirect or react-router navigate
      window.location.href = '/'; 
      // OR handle with a custom approach
    }
    return Promise.reject(error);
  }
);


export const initializeAuthToken = () => {
  const token = localStorage.getItem('token');
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
};

export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem('token', token);
  } else {
    delete api.defaults.headers.common['Authorization'];
    localStorage.removeItem('token');
  }
};
