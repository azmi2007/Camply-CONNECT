import { Profile, UserRole } from '../../types';
import { DEMO_USERS } from '../../data/mockData';
import { isSupabaseConfigured, supabase } from '../../lib/supabase/client';

export type PublicLoginRole = 'STUDENT' | 'ALUMNI' | 'LECTURER';

export interface LoginCredentials {
  role: UserRole;
  identifier: string; // NIM for student, Email/Alumni ID for alumni, NIDN/NIP for lecturer, username for admin
  password: string;
}

export interface AuthResult {
  success: boolean;
  user?: Profile;
  error?: string;
}

async function sha256Hex(value: string): Promise<string> {
  const data = new TextEncoder().encode(value);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

// SHA-256 digest checked exclusively in local development prototype mode
const DEV_ADMIN_DIGEST = '41e5653fc7aeb894026d6bb7b2db7f65902b454945fa8fd65a6327047b5277fb';

export const authService = {
  async authenticatePublicRole(credentials: LoginCredentials): Promise<AuthResult> {
    await new Promise((r) => setTimeout(r, 350));

    const identifier = credentials.identifier.trim();
    const password = credentials.password;

    if (!identifier || !password) {
      return { success: false, error: 'Please enter both your institutional identifier and password.' };
    }

    // Production Supabase path when configured
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: identifier,
        password
      });
      if (error || !data.user) {
        return { success: false, error: error?.message || 'Invalid credentials.' };
      }
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();
      if (profileData) {
        return { success: true, user: profileData as Profile };
      }
    }

    // Prototype mock authentication (role strictly determined by verified account)
    if (credentials.role === 'STUDENT') {
      const isValidDemo =
        (identifier === '23100001' || identifier.toLowerCase() === DEMO_USERS.student.email.toLowerCase()) &&
        password === 'student123';
      if (!isValidDemo) {
        return { success: false, error: 'Invalid Student ID (NIM) or password.' };
      }
      return {
        success: true,
        user: {
          ...DEMO_USERS.student,
          student_id: '23100001'
        }
      };
    }

    if (credentials.role === 'ALUMNI') {
      const isValidDemo =
        (identifier.toLowerCase() === 'alumni@camply.demo' ||
          identifier.toLowerCase() === DEMO_USERS.alumni.email.toLowerCase() ||
          identifier.toUpperCase() === 'ALM-2021-001') &&
        password === 'alumni123';
      if (!isValidDemo) {
        return { success: false, error: 'Invalid Alumni email/ID or password.' };
      }
      return {
        success: true,
        user: {
          ...DEMO_USERS.alumni,
          email: 'alumni@camply.demo'
        }
      };
    }

    if (credentials.role === 'LECTURER') {
      const isValidDemo =
        (identifier === '0012345678' ||
          identifier.toLowerCase() === DEMO_USERS.lecturer.email.toLowerCase()) &&
        password === 'lecturer123';
      if (!isValidDemo) {
        return { success: false, error: 'Invalid Lecturer ID (NIDN/NIP) or password.' };
      }
      return {
        success: true,
        user: {
          ...DEMO_USERS.lecturer,
          lecturer_id: '0012345678'
        }
      };
    }

    return { success: false, error: 'Unsupported public login role.' };
  },

  async authenticateAdmin(username: string, password: string): Promise<AuthResult> {
    await new Promise((r) => setTimeout(r, 400));

    const trimmedUser = username.trim().toLowerCase();
    if (!trimmedUser || !password) {
      return { success: false, error: 'Admin username and password are required.' };
    }

    // Production Supabase Auth path
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: trimmedUser,
        password
      });
      if (error || !data.user) {
        return { success: false, error: 'Invalid administrator credentials.' };
      }
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();
      if (!profileData || profileData.role !== 'ADMIN') {
        return { success: false, error: 'Account lacks administrative authorization.' };
      }
      return { success: true, user: profileData as Profile };
    }

    // Local development prototype verification ONLY
    const allowDevAdmin =
      import.meta.env.DEV || import.meta.env.VITE_ENABLE_DEV_ADMIN_AUTH === 'true';

    if (!allowDevAdmin) {
      return {
        success: false,
        error: 'Administrative login requires a configured backend authentication server in production.'
      };
    }

    const expectedUser = (import.meta.env.VITE_DEV_ADMIN_USERNAME || 'admin').toLowerCase();
    const inputDigest = await sha256Hex(password);
    const matchesEnvPass =
      Boolean(import.meta.env.VITE_DEV_ADMIN_PASSWORD) &&
      password === import.meta.env.VITE_DEV_ADMIN_PASSWORD;

    if (trimmedUser === expectedUser && (inputDigest === DEV_ADMIN_DIGEST || matchesEnvPass)) {
      return {
        success: true,
        user: DEMO_USERS.admin
      };
    }

    return { success: false, error: 'Invalid administrator credentials.' };
  },

  async registerMember(profileData: Partial<Profile>): Promise<AuthResult> {
    await new Promise((r) => setTimeout(r, 350));

    // Strictly prevent self-registration as ADMIN
    const requestedRole: PublicLoginRole =
      profileData.role === 'ALUMNI' || profileData.role === 'LECTURER'
        ? profileData.role
        : 'STUDENT';

    const newUser: Profile = {
      id: `user-${Date.now()}`,
      full_name: profileData.full_name || 'New Member',
      email: profileData.email || 'user@camply.edu',
      role: requestedRole,
      avatar_url:
        profileData.avatar_url ||
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=256&auto=format&fit=crop&q=80',
      headline:
        profileData.headline ||
        `${requestedRole.charAt(0) + requestedRole.slice(1).toLowerCase()} at ${profileData.university || 'Campus'}`,
      bio: profileData.bio || 'Recently joined CAMPLY network.',
      university: profileData.university || 'Universitas Indonesia',
      faculty: profileData.faculty,
      major: profileData.major,
      student_id: requestedRole === 'STUDENT' ? profileData.student_id : undefined,
      enrollment_year: requestedRole === 'STUDENT' ? profileData.enrollment_year : undefined,
      expected_graduation_year:
        requestedRole === 'STUDENT' ? profileData.expected_graduation_year : undefined,
      graduation_year: requestedRole === 'ALUMNI' ? profileData.graduation_year : undefined,
      current_company: requestedRole === 'ALUMNI' ? profileData.current_company : undefined,
      current_position: requestedRole === 'ALUMNI' ? profileData.current_position : undefined,
      department: requestedRole === 'LECTURER' ? profileData.department : undefined,
      lecturer_id: requestedRole === 'LECTURER' ? profileData.lecturer_id : undefined,
      skills: profileData.skills || ['Communication', 'Teamwork'],
      connections_count: 1,
      mutual_connections: 0,
      created_at: new Date().toISOString()
    };

    return { success: true, user: newUser };
  }
};
