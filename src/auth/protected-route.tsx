import React from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './auth-context';

interface ProtectedRouteProps {
  children: JSX.Element;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = React.useContext(AuthContext);

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return children;
};
