import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { UserRole } from '../../types';
import { hasAnyRole, hasPermission, Permission } from './permissions';

interface ProtectedRouteProps {
  allowedRoles?: UserRole[];
  requiredPermission?: Permission;
  redirectTo?: string;
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  allowedRoles,
  requiredPermission,
  redirectTo = '/login',
  children
}) => {
  const location = useLocation();
  const { user, isAuthenticated } = useAuthStore();

  if (!isAuthenticated || !user) {
    return <Navigate to={redirectTo} state={{ from: location.pathname }} replace />;
  }

  if (allowedRoles && !hasAnyRole(user.role, allowedRoles)) {
    return <Navigate to="/unauthorized" state={{ from: location.pathname }} replace />;
  }

  if (requiredPermission && !hasPermission(user.role, requiredPermission)) {
    return <Navigate to="/unauthorized" state={{ from: location.pathname }} replace />;
  }

  return <>{children}</>;
};
