import React, { createContext, useContext } from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { Profile, UserRole } from '../../types';

interface AuthContextValue {
  user: Profile | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, activeRole, isAuthenticated, logout } = useAuthStore();

  return (
    <AuthContext.Provider
      value={{
        user,
        role: activeRole,
        isAuthenticated,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return ctx;
};
