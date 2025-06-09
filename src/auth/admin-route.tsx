import React from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './auth-context';

interface Props { children: JSX.Element }

export const AdminRoute: React.FC<Props> = ({ children }) => {
  const { isAuthenticated, role } = React.useContext(AuthContext);
  if (!isAuthenticated || role !== 'admin') return <Navigate to="/" />;
  return children;
};