import { create } from 'zustand';
import { Profile, UserRole } from '../types';
import { authService, AuthResult } from '../features/auth/authService';

interface AuthState {
  user: Profile | null;
  isAuthenticated: boolean;
  activeRole: UserRole | null;
  loginWithCredentials: (params: {
    identifier: string;
    password: string;
  }) => Promise<AuthResult>;
  register: (profileData: Partial<Profile>) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<Profile>) => void;
}

const STORAGE_KEY = 'camply_auth_session';

const getInitialSession = (): { user: Profile | null; activeRole: UserRole | null; isAuthenticated: boolean } => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved) as Profile;
      if (parsed && parsed.id && parsed.role) {
        return { user: parsed, activeRole: parsed.role, isAuthenticated: true };
      }
    }
  } catch {
    // ignore invalid stored session
  }
  return {
    user: null,
    activeRole: null,
    isAuthenticated: false
  };
};

const initial = getInitialSession();

export const useAuthStore = create<AuthState>((set) => ({
  user: initial.user,
  isAuthenticated: initial.isAuthenticated,
  activeRole: initial.activeRole,

  loginWithCredentials: async ({ identifier, password }) => {
    const res = await authService.authenticate({ identifier, password });
    if (res.success && res.user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(res.user));
      set({
        user: res.user,
        isAuthenticated: true,
        activeRole: res.user.role
      });
    }
    return res;
  },

  register: async (profileData: Partial<Profile>) => {
    const res = await authService.registerMember(profileData);
    if (res.success && res.user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(res.user));
      set({
        user: res.user,
        isAuthenticated: true,
        activeRole: res.user.role
      });
      return true;
    }
    return false;
  },

  logout: () => {
    localStorage.removeItem(STORAGE_KEY);
    set({
      user: null,
      isAuthenticated: false,
      activeRole: null
    });
  },

  updateProfile: (updates: Partial<Profile>) => {
    set((state) => {
      if (!state.user) return state;
      // Users cannot elevate their own role client-side
      const { role: _ignoredRole, ...safeUpdates } = updates;
      const updated = { ...state.user, ...safeUpdates };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return { user: updated };
    });
  }
}));
