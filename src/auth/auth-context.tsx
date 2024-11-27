
import React, { createContext, useState, useEffect } from 'react';
import { setAuthToken } from './api';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  user_id: number; // Or `string` if appropriate?
  iat?: number;
  exp?: number;
}

interface AuthContextType {
  isAuthenticated: boolean;
  userId: number | null;
  loginUser: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  userId: null,
  loginUser: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded: DecodedToken = jwtDecode<DecodedToken>(token);
      setIsAuthenticated(true);
      setUserId(decoded.user_id);
    }
  }, []);

  const logout = () => {
    setAuthToken(null);
    setIsAuthenticated(false);
    setUserId(null);
  };

  // Log in the user by decoding the token and updating the state
  const loginUser = (token: string) => {
    try {
      const decoded: DecodedToken = jwtDecode<DecodedToken>(token);
      setAuthToken(token);
      localStorage.setItem('token', token); // Persist token to localStorage
      setIsAuthenticated(true);
      setUserId(decoded.user_id);
    } catch (error) {
      console.error('Failed to log in user:', error);
      logout();
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userId, loginUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
