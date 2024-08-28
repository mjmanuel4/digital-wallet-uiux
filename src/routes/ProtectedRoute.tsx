import React from 'react';
import Loading from '../components/Loading';
import InitiateKYC from '../components/InitiateKYC';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute: () => React.ReactElement = () => {
  const { isAuthenticated, loading, kycStatus, kycStatusFetch } = useAuth();
  const location = useLocation();
  const isAuthPage = ["/login", "/register"].includes(location.pathname);

  // update KYC status after logging in
  console.log('Authenticated Route');
  kycStatusFetch();

  if (loading) {
    console.log('[Protected Route] loading');
    return <Loading />;
  }

  if (isAuthenticated) {
    console.log('[Protected Route] authenticated');
    if (kycStatus === undefined) {
      console.log('[Protected Route] for kyc verification')
      return <InitiateKYC />;
    }
    if (isAuthPage) {
      return <Navigate to="/dashboard" />;
    }
    return <Outlet />
  }

  console.log('[Protected Route] Not authenticated');
  return <Navigate to="/login" />;
};

export default ProtectedRoute;