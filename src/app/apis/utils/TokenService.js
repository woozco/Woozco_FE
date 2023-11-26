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
  
  const tokenService = new TokenService();
  export default tokenService;
  