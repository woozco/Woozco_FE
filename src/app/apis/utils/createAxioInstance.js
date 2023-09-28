const axios = require('axios');
require('dotenv').config(); // dotenv 라이브러리를 로드합니다.

// 동적으로 토큰을 설정하는 함수
const token = localStorage.getItem('token');
const baseURL = process.env.API_BASE_ADDRESS || 'http://localhost:8080';

function setAuthToken(config) {
  config.headers['Authorization'] = `Bearer ${token}`;
  return config;
}
// Axios 인스턴스를 생성합니다.
export const apiInstance = axios.create({
  baseURL: baseURL, // API의 기본 URL
});

// 요청을 보내기 전에 토큰을 설정하는 인터셉터를 추가합니다.
apiInstance.interceptors.request.use(
  (config) => {
    // "Authorization" 헤더를 동적으로 설정합니다.
    return setAuthToken(config);
  },
  (error) => {
    return Promise.reject(error);
  }
);

