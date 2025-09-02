import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from './auth-context';

type Props = { children: React.ReactElement };

export const AdminRoute: React.FC<Props> = ({ children }) => {
  const { isAuthenticated, role } = React.useContext(AuthContext);
  const location = useLocation();

  if (!isAuthenticated || role !== 'admin') {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return children;
};
