// TokenService.js

class TokenService {
    constructor() {
      this.token = null;
    }
  
    setToken(token) {
      this.token = token;
    }
  
    getToken() {
      return this.token;
    }
  }
  
  // 싱글톤 패턴 적용
  const tokenService = new TokenService();
  export default tokenService;
  