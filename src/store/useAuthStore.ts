import { create } from 'zustand';
import { Profile, UserRole } from '../types';
import { DEMO_USERS } from '../data/mockData';

interface AuthState {
  user: Profile | null;
  isAuthenticated: boolean;
  activeRole: UserRole;
  login: (email: string, role?: UserRole) => Promise<boolean>;
  register: (profileData: Partial<Profile>) => Promise<boolean>;
  logout: () => void;
  switchDemoRole: (role: UserRole) => void;
  updateProfile: (updates: Partial<Profile>) => void;
}

// Persist in localStorage so demo switches & login states survive refreshes
const STORAGE_KEY = 'camply_auth_session';

const getInitialUser = (): { user: Profile | null; activeRole: UserRole } => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return { user: parsed, activeRole: parsed.role };
    }
  } catch (e) {
    // fallback
  }
  // Default to student demo user for immediate rich interactive experience
  return {
    user: DEMO_USERS.student,
    activeRole: 'STUDENT'
  };
};

const initial = getInitialUser();

export const useAuthStore = create<AuthState>((set) => ({
  user: initial.user,
  isAuthenticated: true,
  activeRole: initial.activeRole,

  login: async (email: string, role?: UserRole) => {
    // If role provided or matched from demo
    const targetRole = role || 'STUDENT';
    const matched = Object.values(DEMO_USERS).find(
      (u) => u.email.toLowerCase() === email.toLowerCase() || u.role === targetRole
    ) || {
      ...DEMO_USERS.student,
      email,
      role: targetRole
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(matched));
    set({
      user: matched,
      isAuthenticated: true,
      activeRole: matched.role
    });
    return true;
  },

  register: async (profileData: Partial<Profile>) => {
    const newUser: Profile = {
      id: `user-${Date.now()}`,
      full_name: profileData.full_name || 'New Member',
      email: profileData.email || 'user@camply.edu',
      role: profileData.role || 'STUDENT',
      avatar_url: profileData.avatar_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=256&auto=format&fit=crop&q=80',
      headline: profileData.headline || `${profileData.role} at ${profileData.university || 'Campus'}`,
      bio: profileData.bio || 'Recently joined CAMPLY network.',
      university: profileData.university || 'Universitas Indonesia',
      faculty: profileData.faculty,
      major: profileData.major,
      student_id: profileData.student_id,
      enrollment_year: profileData.enrollment_year,
      expected_graduation_year: profileData.expected_graduation_year,
      graduation_year: profileData.graduation_year,
      current_company: profileData.current_company,
      current_position: profileData.current_position,
      department: profileData.department,
      lecturer_id: profileData.lecturer_id,
      skills: profileData.skills || ['Communication', 'Teamwork'],
      connections_count: 1,
      mutual_connections: 0,
      created_at: new Date().toISOString()
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    set({
      user: newUser,
      isAuthenticated: true,
      activeRole: newUser.role
    });
    return true;
  },

  logout: () => {
    localStorage.removeItem(STORAGE_KEY);
    set({
      user: null,
      isAuthenticated: false
    });
  },

  switchDemoRole: (role: UserRole) => {
    let demoUser = DEMO_USERS.student;
    if (role === 'ALUMNI') demoUser = DEMO_USERS.alumni;
    if (role === 'LECTURER') demoUser = DEMO_USERS.lecturer;
    if (role === 'ADMIN') demoUser = DEMO_USERS.admin;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(demoUser));
    set({
      user: demoUser,
      isAuthenticated: true,
      activeRole: role
    });
  },

  updateProfile: (updates: Partial<Profile>) => {
    set((state) => {
      if (!state.user) return state;
      const updated = { ...state.user, ...updates };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return { user: updated };
    });
  }
}));

