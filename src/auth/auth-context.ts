import React from 'react';

export interface AuthContextType {
  isAuthenticated: boolean;
  userId: number | null;
  role: 'user' | 'admin' | null;
  loginUser: (token: string) => void;
  logout: () => void;
}

export const AuthContext = React.createContext<AuthContextType>({
  isAuthenticated: false,
  userId: null,
  role: null,
  loginUser: () => {},
  logout: () => {},
});
