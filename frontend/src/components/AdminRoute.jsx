import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const AdminRoute = ({ children }) => {
  const { user, isAuthenticated } = useAuth();

  // Check if user is authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check if user is admin
  const ADMIN_EMAIL = 'belalmohamedyousry@gmail.com';
  const isAdmin =
    user &&
    (user.role === 'admin' ||
      (user.email && user.email.toLowerCase() === ADMIN_EMAIL.toLowerCase()));

  if (!isAdmin) {
    // Not authorized - redirect to home
    return <Navigate to="/home" replace />;
  }

  return children;
};
