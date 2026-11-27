-- Week 3: align the prototype's UI contract with a secure Supabase backend.
-- This migration is additive so it is safe to apply after the original schema
-- and seed data. Existing seeded profiles may keep auth_user_id NULL until
-- their matching Supabase Auth account is linked.

BEGIN;

DO $$
BEGIN
  CREATE TYPE public.profile_verification_status AS ENUM ('UNVERIFIED', 'PENDING', 'VERIFIED', 'REJECTED');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- Keep a profile separate from, but referentially linked to, an Auth user.
-- This preserves the existing demo seed IDs while allowing Supabase Auth IDs
-- to be attached as accounts are provisioned.
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS auth_user_id UUID;
CREATE UNIQUE INDEX IF NOT EXISTS profiles_auth_user_id_key
  ON public.profiles(auth_user_id)
  WHERE auth_user_id IS NOT NULL;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'profiles_auth_user_id_fkey'
  ) THEN
    ALTER TABLE public.profiles
      ADD CONSTRAINT profiles_auth_user_id_fkey
      FOREIGN KEY (auth_user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
  END IF;
END $$;

-- Fields already used by the frontend profile/event/job cards.
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS cover_url TEXT,
  ADD COLUMN IF NOT EXISTS location VARCHAR(255),
  ADD COLUMN IF NOT EXISTS industry VARCHAR(255),
  ADD COLUMN IF NOT EXISTS interests TEXT[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS is_innovator BOOLEAN NOT NULL DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS project_title VARCHAR(255),
  ADD COLUMN IF NOT EXISTS achievement TEXT,
  ADD COLUMN IF NOT EXISTS activity_indicator VARCHAR(255),
  ADD COLUMN IF NOT EXISTS requested_role public.user_role NOT NULL DEFAULT 'STUDENT',
  ADD COLUMN IF NOT EXISTS verification_status public.profile_verification_status NOT NULL DEFAULT 'UNVERIFIED';

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'profiles_requested_role_check'
  ) THEN
    ALTER TABLE public.profiles
      ADD CONSTRAINT profiles_requested_role_check
      CHECK (requested_role <> 'ADMIN');
  END IF;
END $$;

ALTER TABLE public.events
  ADD COLUMN IF NOT EXISTS faculty VARCHAR(255),
  ADD COLUMN IF NOT EXISTS agenda TEXT[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS is_featured BOOLEAN NOT NULL DEFAULT FALSE;

ALTER TABLE public.job_vacancies
  ADD COLUMN IF NOT EXISTS work_mode VARCHAR(20),
  ADD COLUMN IF NOT EXISTS faculty VARCHAR(255);

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'job_vacancies_work_mode_check'
  ) THEN
    ALTER TABLE public.job_vacancies
      ADD CONSTRAINT job_vacancies_work_mode_check
      CHECK (work_mode IS NULL OR work_mode IN ('Remote', 'Hybrid', 'On-site'));
  END IF;
END $$;

CREATE UNIQUE INDEX IF NOT EXISTS job_applications_job_applicant_key
  ON public.job_applications(job_id, applicant_id);
CREATE INDEX IF NOT EXISTS idx_profiles_auth_user_id ON public.profiles(auth_user_id);
CREATE INDEX IF NOT EXISTS idx_connection_requests_receiver_status
  ON public.connection_requests(receiver_id, status);
CREATE INDEX IF NOT EXISTS idx_event_registrations_user ON public.event_registrations(user_id);
CREATE INDEX IF NOT EXISTS idx_mentorship_requests_mentor_status
  ON public.mentorship_requests(mentor_id, status);

-- Central timestamp handling, rather than relying on each client mutation.
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS profiles_set_updated_at ON public.profiles;
CREATE TRIGGER profiles_set_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- A member may edit their profile, but never promote their own database role.
CREATE OR REPLACE FUNCTION public.prevent_profile_role_escalation()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF NEW.role IS DISTINCT FROM OLD.role AND NOT public.is_admin() THEN
    RAISE EXCEPTION 'Only an administrator can change a user role';
  END IF;
  IF NEW.verification_status IS DISTINCT FROM OLD.verification_status AND NOT public.is_admin() THEN
    RAISE EXCEPTION 'Only an administrator can update verification status';
  END IF;
  IF NEW.requested_role = 'ADMIN' THEN
    RAISE EXCEPTION 'Administrator access cannot be requested';
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS profiles_prevent_role_escalation ON public.profiles;
CREATE TRIGGER profiles_prevent_role_escalation
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.prevent_profile_role_escalation();

DROP TRIGGER IF EXISTS events_set_updated_at ON public.events;
CREATE TRIGGER events_set_updated_at
  BEFORE UPDATE ON public.events
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS job_vacancies_set_updated_at ON public.job_vacancies;
CREATE TRIGGER job_vacancies_set_updated_at
  BEFORE UPDATE ON public.job_vacancies
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS connection_requests_set_updated_at ON public.connection_requests;
CREATE TRIGGER connection_requests_set_updated_at
  BEFORE UPDATE ON public.connection_requests
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS mentorship_requests_set_updated_at ON public.mentorship_requests;
CREATE TRIGGER mentorship_requests_set_updated_at
  BEFORE UPDATE ON public.mentorship_requests
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- RLS helper functions deliberately expose no profile data. They are used in
-- policies so application code never needs to trust a role from local storage.
CREATE OR REPLACE FUNCTION public.current_profile_id()
RETURNS UUID
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT id FROM public.profiles WHERE auth_user_id = auth.uid() LIMIT 1;
$$;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE auth_user_id = auth.uid() AND role = 'ADMIN'
  );
$$;

-- A new Auth account receives a minimum student profile. Metadata holds only
-- the role requested during onboarding; elevated access is assigned by an
-- administrator after verification.
CREATE OR REPLACE FUNCTION public.create_profile_for_auth_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (
    auth_user_id,
    full_name,
    email,
    role,
    requested_role,
    verification_status,
    university,
    faculty,
    major,
    student_id,
    enrollment_year,
    expected_graduation_year,
    graduation_year,
    current_company,
    current_position,
    department,
    lecturer_id
  )
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', split_part(NEW.email, '@', 1)),
    NEW.email,
    'STUDENT',
    CASE NEW.raw_user_meta_data ->> 'requested_role'
      WHEN 'ALUMNI' THEN 'ALUMNI'::public.user_role
      WHEN 'LECTURER' THEN 'LECTURER'::public.user_role
      ELSE 'STUDENT'::public.user_role
    END,
    CASE NEW.raw_user_meta_data ->> 'requested_role'
      WHEN 'ALUMNI' THEN 'PENDING'::public.profile_verification_status
      WHEN 'LECTURER' THEN 'PENDING'::public.profile_verification_status
      ELSE 'VERIFIED'::public.profile_verification_status
    END,
    COALESCE(NEW.raw_user_meta_data ->> 'university', 'Universitas Indonesia'),
    NULLIF(NEW.raw_user_meta_data ->> 'faculty', ''),
    NULLIF(NEW.raw_user_meta_data ->> 'major', ''),
    NULLIF(NEW.raw_user_meta_data ->> 'student_id', ''),
    CASE
      WHEN COALESCE(NEW.raw_user_meta_data ->> 'enrollment_year', '') ~ '^[0-9]{4}$'
        THEN (NEW.raw_user_meta_data ->> 'enrollment_year')::INTEGER
      ELSE NULL
    END,
    CASE
      WHEN COALESCE(NEW.raw_user_meta_data ->> 'expected_graduation_year', '') ~ '^[0-9]{4}$'
        THEN (NEW.raw_user_meta_data ->> 'expected_graduation_year')::INTEGER
      ELSE NULL
    END,
    CASE
      WHEN COALESCE(NEW.raw_user_meta_data ->> 'graduation_year', '') ~ '^[0-9]{4}$'
        THEN (NEW.raw_user_meta_data ->> 'graduation_year')::INTEGER
      ELSE NULL
    END,
    NULLIF(NEW.raw_user_meta_data ->> 'current_company', ''),
    NULLIF(NEW.raw_user_meta_data ->> 'current_position', ''),
    NULLIF(NEW.raw_user_meta_data ->> 'department', ''),
    NULLIF(NEW.raw_user_meta_data ->> 'lecturer_id', '')
  )
  ON CONFLICT (email) DO UPDATE
    SET auth_user_id = EXCLUDED.auth_user_id,
        updated_at = NOW()
    WHERE public.profiles.auth_user_id IS NULL;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.create_profile_for_auth_user();

-- Enable RLS on every application table, including tables that were present
-- but not protected in the initial prototype migration.
ALTER TABLE public.universities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faculties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.connection_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_vacancies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mentorship_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;

-- Replace the prototype policies with ownership-aware policies.
DROP POLICY IF EXISTS "Public universities are viewable by everyone" ON public.universities;
CREATE POLICY "Public universities are viewable by everyone" ON public.universities FOR SELECT USING (TRUE);
DROP POLICY IF EXISTS "Public faculties are viewable by everyone" ON public.faculties;
CREATE POLICY "Public faculties are viewable by everyone" ON public.faculties FOR SELECT USING (TRUE);
DROP POLICY IF EXISTS "Public departments are viewable by everyone" ON public.departments;
CREATE POLICY "Public departments are viewable by everyone" ON public.departments FOR SELECT USING (TRUE);

DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles FOR SELECT USING (TRUE);
DROP POLICY IF EXISTS "Users can create their own profile" ON public.profiles;
CREATE POLICY "Users can create their own profile" ON public.profiles
  FOR INSERT WITH CHECK (
    (auth_user_id = auth.uid() AND role = 'STUDENT') OR public.is_admin()
  );
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth_user_id = auth.uid() OR public.is_admin())
  WITH CHECK (auth_user_id = auth.uid() OR public.is_admin());

DROP POLICY IF EXISTS "Connections are visible to participants" ON public.connections;
CREATE POLICY "Connections are visible to participants" ON public.connections
  FOR SELECT USING (user_id = public.current_profile_id() OR connected_user_id = public.current_profile_id());
DROP POLICY IF EXISTS "Users can create their connections" ON public.connections;
CREATE POLICY "Users can create their connections" ON public.connections
  FOR INSERT WITH CHECK (user_id = public.current_profile_id() OR connected_user_id = public.current_profile_id());

DROP POLICY IF EXISTS "Connection requests are visible to participants" ON public.connection_requests;
CREATE POLICY "Connection requests are visible to participants" ON public.connection_requests
  FOR SELECT USING (sender_id = public.current_profile_id() OR receiver_id = public.current_profile_id());
DROP POLICY IF EXISTS "Users can send connection requests" ON public.connection_requests;
CREATE POLICY "Users can send connection requests" ON public.connection_requests
  FOR INSERT WITH CHECK (sender_id = public.current_profile_id());
DROP POLICY IF EXISTS "Recipients can respond to connection requests" ON public.connection_requests;
CREATE POLICY "Recipients can respond to connection requests" ON public.connection_requests
  FOR UPDATE USING (receiver_id = public.current_profile_id())
  WITH CHECK (receiver_id = public.current_profile_id());

DROP POLICY IF EXISTS "Public companies are viewable by everyone" ON public.companies;
CREATE POLICY "Public companies are viewable by everyone" ON public.companies FOR SELECT USING (TRUE);

DROP POLICY IF EXISTS "Events are viewable by everyone" ON public.events;
CREATE POLICY "Events are viewable by everyone" ON public.events FOR SELECT USING (TRUE);
DROP POLICY IF EXISTS "Authorized users can insert events" ON public.events;
CREATE POLICY "Authorized users can insert events" ON public.events
  FOR INSERT WITH CHECK (organizer_id = public.current_profile_id());
DROP POLICY IF EXISTS "Owners and admins can update events" ON public.events;
CREATE POLICY "Owners and admins can update events" ON public.events
  FOR UPDATE USING (organizer_id = public.current_profile_id() OR public.is_admin())
  WITH CHECK (organizer_id = public.current_profile_id() OR public.is_admin());
DROP POLICY IF EXISTS "Owners and admins can delete events" ON public.events;
CREATE POLICY "Owners and admins can delete events" ON public.events
  FOR DELETE USING (organizer_id = public.current_profile_id() OR public.is_admin());

DROP POLICY IF EXISTS "Users manage their event registrations" ON public.event_registrations;
CREATE POLICY "Users manage their event registrations" ON public.event_registrations
  FOR ALL USING (user_id = public.current_profile_id())
  WITH CHECK (user_id = public.current_profile_id());

DROP POLICY IF EXISTS "Jobs are viewable by everyone" ON public.job_vacancies;
CREATE POLICY "Jobs are viewable by everyone" ON public.job_vacancies FOR SELECT USING (TRUE);
DROP POLICY IF EXISTS "Users can publish their jobs" ON public.job_vacancies;
CREATE POLICY "Users can publish their jobs" ON public.job_vacancies
  FOR INSERT WITH CHECK (poster_id = public.current_profile_id());
DROP POLICY IF EXISTS "Owners and admins can update jobs" ON public.job_vacancies;
CREATE POLICY "Owners and admins can update jobs" ON public.job_vacancies
  FOR UPDATE USING (poster_id = public.current_profile_id() OR public.is_admin())
  WITH CHECK (poster_id = public.current_profile_id() OR public.is_admin());
DROP POLICY IF EXISTS "Owners and admins can delete jobs" ON public.job_vacancies;
CREATE POLICY "Owners and admins can delete jobs" ON public.job_vacancies
  FOR DELETE USING (poster_id = public.current_profile_id() OR public.is_admin());

DROP POLICY IF EXISTS "Users manage their applications" ON public.job_applications;
CREATE POLICY "Users manage their applications" ON public.job_applications
  FOR ALL USING (applicant_id = public.current_profile_id())
  WITH CHECK (applicant_id = public.current_profile_id());
DROP POLICY IF EXISTS "Users manage their saved jobs" ON public.saved_jobs;
CREATE POLICY "Users manage their saved jobs" ON public.saved_jobs
  FOR ALL USING (user_id = public.current_profile_id())
  WITH CHECK (user_id = public.current_profile_id());
DROP POLICY IF EXISTS "Users manage their saved events" ON public.saved_events;
CREATE POLICY "Users manage their saved events" ON public.saved_events
  FOR ALL USING (user_id = public.current_profile_id())
  WITH CHECK (user_id = public.current_profile_id());

DROP POLICY IF EXISTS "Mentorship requests are visible to participants" ON public.mentorship_requests;
CREATE POLICY "Mentorship requests are visible to participants" ON public.mentorship_requests
  FOR SELECT USING (student_id = public.current_profile_id() OR mentor_id = public.current_profile_id());
DROP POLICY IF EXISTS "Students can request mentorship" ON public.mentorship_requests;
CREATE POLICY "Students can request mentorship" ON public.mentorship_requests
  FOR INSERT WITH CHECK (student_id = public.current_profile_id());
DROP POLICY IF EXISTS "Mentors can respond to mentorship requests" ON public.mentorship_requests;
CREATE POLICY "Mentors can respond to mentorship requests" ON public.mentorship_requests
  FOR UPDATE USING (mentor_id = public.current_profile_id())
  WITH CHECK (mentor_id = public.current_profile_id());

DROP POLICY IF EXISTS "Notifications viewable by owner" ON public.notifications;
CREATE POLICY "Notifications viewable by owner" ON public.notifications
  FOR SELECT USING (user_id = public.current_profile_id());
DROP POLICY IF EXISTS "Owners can update notifications" ON public.notifications;
CREATE POLICY "Owners can update notifications" ON public.notifications
  FOR UPDATE USING (user_id = public.current_profile_id())
  WITH CHECK (user_id = public.current_profile_id());

DROP POLICY IF EXISTS "Users can create reports" ON public.reports;
CREATE POLICY "Users can create reports" ON public.reports
  FOR INSERT WITH CHECK (reporter_id = public.current_profile_id());
DROP POLICY IF EXISTS "Reporters and admins can view reports" ON public.reports;
CREATE POLICY "Reporters and admins can view reports" ON public.reports
  FOR SELECT USING (reporter_id = public.current_profile_id() OR public.is_admin());
DROP POLICY IF EXISTS "Admins can update reports" ON public.reports;
CREATE POLICY "Admins can update reports" ON public.reports
  FOR UPDATE USING (public.is_admin()) WITH CHECK (public.is_admin());

COMMIT;
