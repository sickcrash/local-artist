import React from 'react';
import { useAuth } from './AuthContext';
import { Navigate } from 'react-router-dom';

const RedirectLoggedIn = ({ children }) => {
  const { currentUser } = useAuth();

  return currentUser ? <Navigate to="/dashboard" replace /> : children;
};

export default RedirectLoggedIn;