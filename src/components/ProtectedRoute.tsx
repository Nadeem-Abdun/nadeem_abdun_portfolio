import React from 'react';
import { Navigate } from 'react-router-dom';
import { verifyUserSession } from '../utils/SessionManager';

interface Props {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  if (!verifyUserSession()) {
    return <Navigate to="/admin/login" replace />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
