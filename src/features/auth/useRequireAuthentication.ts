import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';

/**
 * Keeps public pages browseable while requiring an authenticated session before
 * an action can create or change member-specific data.
 */
export const useRequireAuthentication = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return useCallback(() => {
    if (isAuthenticated) return true;

    navigate('/login', {
      state: { from: `${location.pathname}${location.search}${location.hash}` }
    });
    return false;
  }, [isAuthenticated, location.hash, location.pathname, location.search, navigate]);
};
