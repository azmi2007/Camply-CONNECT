import { Profile, UserRole } from '../../types';
import { DEMO_USERS } from '../../data/mockData';
import { isSupabaseConfigured, supabase } from '../../lib/supabase/client';

export type PublicLoginRole = 'STUDENT' | 'ALUMNI' | 'LECTURER';

export interface LoginCredentials {
  identifier: string; // NIM, alumni ID, lecturer ID, admin ID, or institutional email
  password: string;
}

export interface AuthResult {
  success: boolean;
  user?: Profile;
  error?: string;
}

export interface DemoLoginAccount {
  role: UserRole;
  label: string;
  identifier: string;
  password: string;
  placeholder: string;
  identifiers: string[];
}

/**
 * These accounts are only for the local demo/prototype. In production, accounts
 * and roles must be validated by an authentication provider (such as Supabase).
 */
export const DEMO_LOGIN_ACCOUNTS: DemoLoginAccount[] = [
  {
    role: 'STUDENT',
    label: 'Student',
    identifier: '23100001',
    password: 'mahasiswa123',
    placeholder: 'Example: 23100001',
    identifiers: ['23100001', DEMO_USERS.student.email]
  },
  {
    role: 'ALUMNI',
    label: 'Alumni',
    identifier: 'ALM-2021-001',
    password: 'alumni123',
    placeholder: 'Example: ALM-2021-001',
    identifiers: ['ALM-2021-001', 'alumni@camply.demo', DEMO_USERS.alumni.email]
  },
  {
    role: 'LECTURER',
    label: 'Lecturer',
    identifier: 'DSN-001',
    password: 'dosen123',
    placeholder: 'Example: DSN-001',
    identifiers: ['DSN-001', '0012345678', DEMO_USERS.lecturer.lecturer_id || '', DEMO_USERS.lecturer.email]
  },
  {
    role: 'ADMIN',
    label: 'Admin',
    identifier: 'ADM-001',
    password: 'admin123',
    placeholder: 'Example: ADM-001',
    identifiers: ['ADM-001', 'admin', DEMO_USERS.admin.email]
  }
];

const demoUserByRole: Record<UserRole, Profile> = {
  STUDENT: DEMO_USERS.student,
  ALUMNI: DEMO_USERS.alumni,
  LECTURER: DEMO_USERS.lecturer,
  ADMIN: DEMO_USERS.admin
};

const matchesIdentifier = (value: string, candidate: string) =>
  value.toLocaleLowerCase() === candidate.toLocaleLowerCase();

export const authService = {
  async authenticate(credentials: LoginCredentials): Promise<AuthResult> {
    await new Promise((r) => setTimeout(r, 350));

    const identifier = credentials.identifier.trim();
    const password = credentials.password;

    if (!identifier || !password) {
      return { success: false, error: 'Enter your account ID and password to continue.' };
    }

    // Production Supabase path when configured
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: identifier,
        password
      });
      if (error || !data.user) {
        return { success: false, error: error?.message || 'Invalid account ID or password.' };
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

    // Prototype mock authentication. Role is inferred from the verified account,
    // never selected or set by the person signing in.
    const account = DEMO_LOGIN_ACCOUNTS.find((item) =>
      item.identifiers.some((candidate) => matchesIdentifier(identifier, candidate))
    );

    if (!account || password !== account.password) {
      return { success: false, error: 'Invalid account ID or password.' };
    }

    const baseUser = demoUserByRole[account.role];
    return {
      success: true,
      user: {
        ...baseUser,
        student_id: account.role === 'STUDENT' ? account.identifier : baseUser.student_id,
        lecturer_id:
          account.role === 'LECTURER' || account.role === 'ADMIN'
            ? account.identifier
            : baseUser.lecturer_id
      }
    };
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
