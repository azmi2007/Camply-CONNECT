import React from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { UserRole } from '../../types';
import { hasAnyRole, hasPermission, Permission } from './permissions';

interface PermissionGateProps {
  permission?: Permission;
  allowedRoles?: UserRole[];
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

export const PermissionGate: React.FC<PermissionGateProps> = ({
  permission,
  allowedRoles,
  fallback = null,
  children
}) => {
  const { user, isAuthenticated } = useAuthStore();

  if (!isAuthenticated || !user) {
    return <>{fallback}</>;
  }

  if (allowedRoles && !hasAnyRole(user.role, allowedRoles)) {
    return <>{fallback}</>;
  }

  if (permission && !hasPermission(user.role, permission)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};
