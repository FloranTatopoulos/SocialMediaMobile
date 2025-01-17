import axios from 'axios';

const API_URL = 'http://localhost:3000/';

const authenticate = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}authenticate`, { email, password });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

const register = async (name, email, password, profileImage) => {
    try {
        const response = await axios.post(`${API_URL}register`, { name, email, password, profileImage });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// const logout = () => {
//     localStorage.removeItem("user");
//     return axios.post(API_URL + "signout").then((response) => {
//       return response.data;
//     });
//   };

const AuthService = {
    register,
    authenticate,
  }
  
  export default AuthService;