import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:8000', // غيّر لو حطيت Laravel على دومين آخر
  withCredentials: true,
  
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosClient;
