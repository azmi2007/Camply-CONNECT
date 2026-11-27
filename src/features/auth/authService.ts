import { Profile, RegistrationInput, UserRole } from '../../types';
import { DEMO_USERS } from '../../data/mockData';
import { isSupabaseConfigured, supabase } from '../../lib/supabase/client';
import { toProfile } from '../../lib/supabase/mappers';

export type PublicLoginRole = 'STUDENT' | 'ALUMNI' | 'LECTURER';

export interface LoginCredentials {
  identifier: string; // NIM, alumni ID, lecturer ID, admin ID, or institutional email
  password: string;
}

export interface AuthResult {
  success: boolean;
  user?: Profile;
  error?: string;
  requiresEmailConfirmation?: boolean;
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
      if (!identifier.includes('@')) {
        return { success: false, error: 'Use your university email address to sign in.' };
      }
      const { data, error } = await supabase.auth.signInWithPassword({
        email: identifier,
        password
      });
      if (error || !data.user) {
        return { success: false, error: error?.message || 'Invalid account ID or password.' };
      }
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('auth_user_id', data.user.id)
        .maybeSingle();
      if (profileData) {
        return { success: true, user: toProfile(profileData) };
      }
      await supabase.auth.signOut();
      return {
        success: false,
        error: profileError?.message || 'Your account is missing a CAMPLY profile. Please contact an administrator.'
      };
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

  async registerMember(profileData: RegistrationInput): Promise<AuthResult> {
    const email = profileData.email.trim().toLowerCase();

    if (!profileData.full_name.trim() || !email || !profileData.password) {
      return { success: false, error: 'Name, email, and password are required.' };
    }

    if (profileData.password.length < 8) {
      return { success: false, error: 'Use a password with at least 8 characters.' };
    }

    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password: profileData.password,
        options: {
          data: {
            full_name: profileData.full_name.trim(),
            requested_role: profileData.role,
            university: profileData.university,
            faculty: profileData.faculty,
            major: profileData.major,
            student_id: profileData.student_id,
            enrollment_year: profileData.enrollment_year,
            expected_graduation_year: profileData.expected_graduation_year,
            graduation_year: profileData.graduation_year,
            current_company: profileData.current_company,
            current_position: profileData.current_position,
            department: profileData.department,
            lecturer_id: profileData.lecturer_id
          }
        }
      });

      if (error || !data.user) {
        return { success: false, error: error?.message || 'Unable to create your account.' };
      }

      const { data: profileDataFromDb, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('auth_user_id', data.user.id)
        .maybeSingle();

      if (!profileDataFromDb) {
        return {
          success: false,
          error: profileError?.message || 'Your account was created, but its profile is not ready yet. Please sign in again.'
        };
      }

      return {
        success: true,
        user: toProfile(profileDataFromDb),
        requiresEmailConfirmation: !data.session
      };
    }

    await new Promise((r) => setTimeout(r, 350));

    // Strictly prevent self-registration as ADMIN
    const requestedRole: PublicLoginRole =
      profileData.role === 'ALUMNI' || profileData.role === 'LECTURER'
        ? profileData.role
        : 'STUDENT';

    const newUser: Profile = {
      id: `user-${Date.now()}`,
      full_name: profileData.full_name || 'New Member',
      email,
      role: requestedRole,
      avatar_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=256&auto=format&fit=crop&q=80',
      headline: `${requestedRole.charAt(0) + requestedRole.slice(1).toLowerCase()} at ${profileData.university || 'Campus'}`,
      bio: 'Recently joined CAMPLY network.',
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
      skills: ['Communication', 'Teamwork'],
      connections_count: 1,
      mutual_connections: 0,
      created_at: new Date().toISOString(),
      requested_role: requestedRole,
      verification_status: 'VERIFIED'
    };

    return { success: true, user: newUser };
  },

  async signOut(): Promise<void> {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
  }
};
