import React from 'react';
import Loading from '../components/Loading';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute: () => React.ReactElement = () => {
  const { isAuthenticated } = useAuth();
  const { loading } = useAuth();
  const location = useLocation();
  const isAuthPage = ["/login", "/register"].includes(location.pathname);

  if (loading) {
    console.log('[Protected Route] loading');
    return <Loading />;
  }

  if (isAuthenticated) {
    console.log('[Protected Route] authenticated');
    if (isAuthPage) {
      return <Navigate to ="/dashboard" />;
    }
    return <Outlet />
  }

  console.log('[Protected Route] Not authenticated');
  return <Navigate to="/login" />;
};

export default ProtectedRoute;