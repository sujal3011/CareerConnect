import axios from 'axios';

// const API_URL = `${process.env.SERVER_URL}/auth`;
const API_URL = `http://localhost:3000/api/auth`;
console.log(API_URL);

export const signup = async (name, email, password) => {
    try {
      console.log(name,email,password);
      const response = await axios.post(`${API_URL}/register`, {name,email,password});
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'An error occurred during signup');
    }
  };

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data;
};