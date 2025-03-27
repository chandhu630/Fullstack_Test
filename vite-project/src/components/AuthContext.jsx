import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({ email: decoded.email, role: decoded.role });
      } catch (error) {
        console.error('Invalid token:', error);
        logout(); // If the token is invalid, log out
      }
    }
  }, [token]);

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      const userToken = response.data.token;

      // Store token and update state
      localStorage.setItem('token', userToken);
      setToken(userToken);
      
      // Decode token to get user details
      const decoded = jwtDecode(userToken);
      setUser({ email: decoded.email, role: decoded.role });

      // Redirect based on user role
      setTimeout(() => {
        window.location.href = decoded.role === 'admin' ? '/create-users' : '/user_images';
      }, 500);
      
    } catch (error) {
      alert(error.response?.data?.message || 'Login failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    window.location.href = '/login'; // Redirect to login page
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
