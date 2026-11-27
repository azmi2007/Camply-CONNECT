import { Profile, PublicRegistrationRole, UserRole, VerificationStatus } from '../../types';
import { ProfileInsert, ProfileRow } from './database.types';

const DEFAULT_AVATAR_URL =
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=256&auto=format&fit=crop&q=80';

/** Converts nullable PostgreSQL fields into the UI's stable domain model. */
export const toProfile = (row: ProfileRow): Profile => ({
  id: row.id,
  full_name: row.full_name,
  email: row.email,
  role: row.role as UserRole,
  avatar_url: row.avatar_url || DEFAULT_AVATAR_URL,
  cover_url: row.cover_url || undefined,
  bio: row.bio || undefined,
  headline: row.headline || undefined,
  university: row.university || 'Universitas Indonesia',
  faculty: row.faculty || undefined,
  major: row.major || undefined,
  location: row.location || undefined,
  industry: row.industry || undefined,
  interests: row.interests || undefined,
  student_id: row.student_id || undefined,
  enrollment_year: row.enrollment_year || undefined,
  expected_graduation_year: row.expected_graduation_year || undefined,
  graduation_year: row.graduation_year || undefined,
  current_company: row.current_company || undefined,
  current_position: row.current_position || undefined,
  department: row.department || undefined,
  lecturer_id: row.lecturer_id || undefined,
  is_innovator: row.is_innovator || undefined,
  project_title: row.project_title || undefined,
  achievement: row.achievement || undefined,
  activity_indicator: row.activity_indicator || undefined,
  is_mentor_available: row.is_mentor_available || undefined,
  mentor_expertise: row.mentor_expertise || undefined,
  skills: row.skills || undefined,
  linkedin_url: row.linkedin_url || undefined,
  github_url: row.github_url || undefined,
  portfolio_url: row.portfolio_url || undefined,
  created_at: row.created_at || undefined,
  updated_at: row.updated_at || undefined,
  requested_role: row.requested_role as PublicRegistrationRole,
  verification_status: row.verification_status as VerificationStatus
});

/** Whitelists profile fields that may be submitted to Supabase. */
export const toProfileInsert = (profile: Partial<Profile>, authUserId: string): ProfileInsert => ({
  auth_user_id: authUserId,
  full_name: profile.full_name || 'New Member',
  email: profile.email || '',
  // Client-side profile creation is always least-privilege. Elevated access
  // is assigned by an administrator through the verification workflow.
  role: 'STUDENT',
  requested_role:
    profile.requested_role || (profile.role && profile.role !== 'ADMIN' ? profile.role : 'STUDENT'),
  verification_status: 'UNVERIFIED',
  avatar_url: profile.avatar_url || null,
  bio: profile.bio || null,
  cover_url: profile.cover_url || null,
  headline: profile.headline || null,
  university: profile.university || 'Universitas Indonesia',
  faculty: profile.faculty || null,
  major: profile.major || null,
  location: profile.location || null,
  industry: profile.industry || null,
  interests: profile.interests || [],
  student_id: profile.student_id || null,
  enrollment_year: profile.enrollment_year || null,
  expected_graduation_year: profile.expected_graduation_year || null,
  graduation_year: profile.graduation_year || null,
  current_company: profile.current_company || null,
  current_position: profile.current_position || null,
  department: profile.department || null,
  lecturer_id: profile.lecturer_id || null,
  is_innovator: profile.is_innovator || false,
  project_title: profile.project_title || null,
  achievement: profile.achievement || null,
  activity_indicator: profile.activity_indicator || null,
  skills: profile.skills || []
});
