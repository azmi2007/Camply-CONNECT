/** Shared domain contracts. API mappers convert Supabase rows into these UI models. */
export type EntityId = string;
export type ISODateString = string;
export type UserRole = 'STUDENT' | 'ALUMNI' | 'LECTURER' | 'ADMIN';

export const EVENT_CATEGORIES = [
  'Academic',
  'Workshop',
  'Seminar',
  'Webinar',
  'Networking',
  'Career Fair',
  'Campus Gathering',
  'Competition'
] as const;
export type EventCategory = 'All Events' | (typeof EVENT_CATEGORIES)[number];
export type PersistedEventCategory = Exclude<EventCategory, 'All Events'>;

export const JOB_TYPES = ['Internship', 'Full-time', 'Part-time', 'Freelance', 'Remote'] as const;
export type JobType = (typeof JOB_TYPES)[number];

export const WORK_MODES = ['Remote', 'Hybrid', 'On-site'] as const;
export type WorkMode = (typeof WORK_MODES)[number];

export type EventStatus = 'UPCOMING' | 'ONGOING' | 'COMPLETED' | 'CANCELLED';
export type JobStatus = 'ACTIVE' | 'CLOSED';
export type MentorshipStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'COMPLETED';
export type ConnectionStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED';
export type VerificationStatus = 'UNVERIFIED' | 'PENDING' | 'VERIFIED' | 'REJECTED';
export type PublicRegistrationRole = Exclude<UserRole, 'ADMIN'>;

export interface ExperienceItem {
  id: EntityId;
  role: string;
  company: string;
  duration: string;
  location: string;
  description: string;
}

export interface EducationItem {
  id: EntityId;
  institution: string;
  degree: string;
  field: string;
  period: string;
}

export interface Profile {
  id: EntityId;
  full_name: string;
  email: string;
  role: UserRole;
  avatar_url: string;
  cover_url?: string;
  bio?: string;
  headline?: string;
  university: string;
  faculty?: string;
  major?: string;
  location?: string;
  industry?: string;
  interests?: string[];
  
  // Student
  student_id?: string;
  enrollment_year?: number;
  expected_graduation_year?: number;

  // Alumni
  graduation_year?: number;
  current_company?: string;
  current_position?: string;

  // Lecturer
  department?: string;
  lecturer_id?: string;

  // Innovator spotlight
  is_innovator?: boolean;
  project_title?: string;
  achievement?: string;
  activity_indicator?: string;

  // Detailed profile sections
  experiences?: ExperienceItem[];
  education?: EducationItem[];

  // Mentorship & Networking
  is_mentor_available?: boolean;
  mentor_expertise?: string[];
  skills?: string[];
  connections_count?: number;
  followers_count?: number;
  mutual_connections?: number;

  linkedin_url?: string;
  github_url?: string;
  portfolio_url?: string;
  created_at?: ISODateString;
  updated_at?: ISODateString;
  requested_role?: PublicRegistrationRole;
  verification_status?: VerificationStatus;
}

/** Data collected by onboarding. Passwords never belong to a persisted Profile. */
export interface RegistrationInput {
  full_name: string;
  email: string;
  password: string;
  role: PublicRegistrationRole;
  university?: string;
  faculty?: string;
  major?: string;
  student_id?: string;
  enrollment_year?: number;
  expected_graduation_year?: number;
  graduation_year?: number;
  current_company?: string;
  current_position?: string;
  department?: string;
  lecturer_id?: string;
}

export interface University {
  id: EntityId;
  name: string;
  short_name: string;
  logo_url: string;
  city: string;
  website: string;
}

export interface FacultyInfo {
  id: EntityId;
  name: string;
  short_name: string;
  category_key: string;
  description: string;
  member_count: number;
  alumni_count: number;
  career_count: number;
  departments: string[];
  featured_communities: string[];
  accent_color: string;
}

export interface Company {
  id: EntityId;
  name: string;
  logo_url: string;
  industry: string;
  location: string;
  website?: string;
  description?: string;
  verified?: boolean;
}

export interface EventItem {
  id: EntityId;
  organizer_id: EntityId;
  organizer?: {
    full_name: string;
    avatar_url: string;
    role: UserRole;
    faculty?: string;
  };
  title: string;
  description: string;
  agenda?: string[];
  banner_url: string;
  category: EventCategory;
  faculty?: string;
  event_date: ISODateString; // YYYY-MM-DD
  start_time: string; // HH:mm
  end_time: string; // HH:mm
  location: string;
  is_online?: boolean;
  online_link?: string;
  registration_deadline?: string;
  max_participants: number;
  current_participants: number;
  status: EventStatus;
  is_featured?: boolean;
  tags: string[];
  is_registered?: boolean;
  is_saved?: boolean;
}

/** Payload accepted when an organizer publishes an event. */
export type CreateEventInput = Omit<
  EventItem,
  'id' | 'current_participants' | 'status' | 'is_registered' | 'is_saved'
>;

export interface JobVacancy {
  id: EntityId;
  company_id: EntityId;
  company: Company;
  poster_id: EntityId;
  poster?: {
    full_name: string;
    role: UserRole;
    avatar_url: string;
  };
  title: string;
  description: string;
  requirements: string[];
  location: string;
  work_mode?: WorkMode;
  faculty?: string;
  employment_type: JobType;
  salary_range?: string;
  deadline: string;
  application_url?: string;
  status: JobStatus;
  created_at: ISODateString;
  updated_at?: ISODateString;
  is_saved?: boolean;
  is_applied?: boolean;
}

/** Payload accepted when a member publishes a career opportunity. */
export type CreateJobInput = Omit<
  JobVacancy,
  'id' | 'status' | 'created_at' | 'updated_at' | 'is_saved' | 'is_applied'
>;

export interface MentorshipRequest {
  id: EntityId;
  student_id: EntityId;
  student?: Profile;
  mentor_id: EntityId;
  mentor?: Profile;
  topic: string;
  message: string;
  preferred_schedule?: string;
  status: MentorshipStatus;
  created_at: ISODateString;
  updated_at?: ISODateString;
}

export interface ConnectionRequest {
  id: EntityId;
  sender_id: EntityId;
  sender?: Profile;
  receiver_id: EntityId;
  receiver?: Profile;
  status: ConnectionStatus;
  note?: string;
  created_at: ISODateString;
}

export interface NotificationItem {
  id: EntityId;
  user_id: EntityId;
  title: string;
  message: string;
  type: 'CONNECTION' | 'EVENT' | 'JOB' | 'MENTORSHIP' | 'SYSTEM';
  link?: string;
  is_read: boolean;
  created_at: ISODateString;
}

export interface PlatformStats {
  total_users: number;
  total_students: number;
  total_alumni: number;
  total_lecturers: number;
  total_events: number;
  total_jobs: number;
  monthly_active_users: number;
  connection_count: number;
}
