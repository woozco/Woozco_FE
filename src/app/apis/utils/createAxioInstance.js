// apiInstance.js

import axios from 'axios';
import tokenService from './TokenService';

const baseURL = process.env.NEXT_PUBLIC_API_BASE_ADDRESS || 'http://localhost:8080';

function setAuthToken(config) {
  const token = tokenService.getToken();
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}

const apiInstance = axios.create({
  baseURL: baseURL,
});

apiInstance.interceptors.request.use(
  (config) => setAuthToken(config),
  (error) => Promise.reject(error)
);

export default apiInstance;
