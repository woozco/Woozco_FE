const axios = require('axios');

// 동적으로 토큰을 설정하는 함수
let token = ''; 

function setAuthToken(config) {
config.headers['Authorization'] = `Bearer ${token}`;
  return config;
}

const postRegisterData = {
    name: 'John Doe',
    age: 32,
    email: 'johndoe@example.com',
    password: 'securePassword123',
};

const postLoginData = {
    email: "johndoe@example.com",
    password: 'securePassword123'
}

const postChangePWData = {
    email: "johndoe@example.com",
    password: '2'
}

// Axios 인스턴스를 생성합니다.
export const apiInstance = axios.create({
  baseURL: 'http://localhost:8080', // API의 기본 URL
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

// 이제 Axios 인스턴스를 사용하여 요청을 보낼 수 있습니다.
async function sendPostRequests() {
    try {
      // 첫 번째 POST 요청
      const response1 = await apiInstance.post('/auth/register', postRegisterData);
      console.log('첫 번째 POST 요청 성공:', response1.data);
  
      // 두 번째 POST 요청
      const response2 = await apiInstance.post('/auth/login', postLoginData);
      console.log('두 번째 POST 요청 성공:', response2.data);
      token = response2.data.access_token
      
      // 세 번째 POST 요청
      const response3 = await apiInstance.post('/auth/changepw', postChangePWData);
      console.log('세 번째 POST 요청 성공:', response3.data);
    } catch (error) {
      console.error('POST 요청 오류:', error);
    }
  }
  // 함수 호출
  sendPostRequests();
