import React from 'react';
import InitiateKYC from '../components/InitiateKYC';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PublicRoute: () => React.ReactElement = () => {
  const { isAuthenticated, kycStatus, kycStatusFetch } = useAuth();

  if (isAuthenticated) {
    console.log('[Public Route] authenticated');
    return <Navigate to ="/dashboard" />;
  }

  return <Outlet />
};

export default PublicRoute;