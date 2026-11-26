export type UserRole = 'STUDENT' | 'ALUMNI' | 'LECTURER' | 'ADMIN';

export type EventCategory = 
  | 'All Events'
  | 'Academic' 
  | 'Workshop' 
  | 'Seminar' 
  | 'Webinar' 
  | 'Networking' 
  | 'Career Fair' 
  | 'Campus Gathering' 
  | 'Competition';

export type JobType = 
  | 'Internship' 
  | 'Full-time' 
  | 'Part-time' 
  | 'Freelance' 
  | 'Remote';

export type WorkMode = 'Remote' | 'Hybrid' | 'On-site';

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  duration: string;
  location: string;
  description: string;
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  field: string;
  period: string;
}

export interface Profile {
  id: string;
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
  created_at?: string;
}

export interface University {
  id: string;
  name: string;
  short_name: string;
  logo_url: string;
  city: string;
  website: string;
}

export interface FacultyInfo {
  id: string;
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
  id: string;
  name: string;
  logo_url: string;
  industry: string;
  location: string;
  website?: string;
  description?: string;
  verified?: boolean;
}

export interface EventItem {
  id: string;
  organizer_id: string;
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
  event_date: string; // YYYY-MM-DD
  start_time: string; // HH:mm
  end_time: string; // HH:mm
  location: string;
  is_online?: boolean;
  online_link?: string;
  registration_deadline?: string;
  max_participants: number;
  current_participants: number;
  status: 'UPCOMING' | 'ONGOING' | 'COMPLETED' | 'CANCELLED';
  is_featured?: boolean;
  tags: string[];
  is_registered?: boolean;
  is_saved?: boolean;
}

export interface JobVacancy {
  id: string;
  company_id: string;
  company: Company;
  poster_id: string;
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
  status: 'ACTIVE' | 'CLOSED';
  created_at: string;
  is_saved?: boolean;
  is_applied?: boolean;
}

export interface MentorshipRequest {
  id: string;
  student_id: string;
  student?: Profile;
  mentor_id: string;
  mentor?: Profile;
  topic: string;
  message: string;
  preferred_schedule?: string;
  preferredSchedule?: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'COMPLETED';
  created_at: string;
}

export interface ConnectionRequest {
  id: string;
  sender_id: string;
  sender?: Profile;
  receiver_id: string;
  receiver?: Profile;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
  note?: string;
  created_at: string;
}

export interface NotificationItem {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: 'CONNECTION' | 'EVENT' | 'JOB' | 'MENTORSHIP' | 'SYSTEM';
  link?: string;
  is_read: boolean;
  created_at: string;
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
