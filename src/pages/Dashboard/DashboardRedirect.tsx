import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { getDefaultDashboardRoute } from '../../features/permissions/permissions';

export const DashboardRedirect: React.FC = () => {
  const { user, isAuthenticated } = useAuthStore();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  return <Navigate to={getDefaultDashboardRoute(user.role)} replace />;
};
