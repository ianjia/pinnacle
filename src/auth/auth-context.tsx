
import React, { createContext, useState, useEffect } from 'react';
import { setAuthToken } from './api';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  user_id: number; // Or `string` if appropriate?
  role: 'user' | 'admin';  
  iat?: number;
  exp?: number;
}

interface AuthContextType {
  isAuthenticated: boolean;
  userId: number | null;
  role: 'user' | 'admin' | null;
  loginUser: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  userId: null,
  role: null,   
  loginUser: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
   const stored = localStorage.getItem('token');
   const initiallyDecoded = stored ? (jwtDecode(stored) as any) : null;

   const [isAuthenticated, setIsAuthenticated] = useState(Boolean(initiallyDecoded));
   const [role,           setRole]           = useState<'user' | 'admin' | null>(
   initiallyDecoded?.role ?? null)

  // const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userId, setUserId] = useState<number | null>(null);
  // const [role, setRole]   = useState<'user' | 'admin' | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded: DecodedToken = jwtDecode<DecodedToken>(token);
      setIsAuthenticated(true);
      setUserId(decoded.user_id);
      setRole(decoded.role);
    }
  }, []);

  const logout = () => {
    setAuthToken(null);
    setIsAuthenticated(false);
    setUserId(null);
    setRole(null);
  };

  // Log in the user by decoding the token and updating the state
  const loginUser = (token: string) => {
    try {
      const decoded: DecodedToken = jwtDecode<DecodedToken>(token);
      setAuthToken(token);
      localStorage.setItem('token', token); // Persist token to localStorage
      setIsAuthenticated(true);
      setUserId(decoded.user_id);
      setRole(decoded.role);
    } catch (error) {
      console.error('Failed to log in user:', error);
      logout();
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userId, role, loginUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
