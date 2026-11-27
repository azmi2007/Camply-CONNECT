import {
  INITIAL_EVENTS,
  INITIAL_JOBS,
  INITIAL_MEMBERS,
  INITIAL_NOTIFICATIONS
} from './mockData';
import { EventItem, JobVacancy, MentorshipRequest, NotificationItem, Profile } from '../types';

/**
 * Store instances must never mutate exported mock fixtures. Keeping the fixtures
 * immutable in practice makes the mock and Supabase-backed paths interchangeable.
 */
const clone = <T>(value: T): T => {
  if (typeof structuredClone === 'function') return structuredClone(value);
  return JSON.parse(JSON.stringify(value)) as T;
};

export const createMockEvents = (): EventItem[] => clone(INITIAL_EVENTS);
export const createMockJobs = (): JobVacancy[] => clone(INITIAL_JOBS);
export const createMockMembers = (): Profile[] => clone(INITIAL_MEMBERS);
export const createMockNotifications = (): NotificationItem[] => clone(INITIAL_NOTIFICATIONS);

const INITIAL_MENTORSHIP_REQUESTS: MentorshipRequest[] = [
  {
    id: 'req-01',
    student_id: 'user-student-01',
    mentor_id: 'user-alumni-01',
    topic: 'Design Systems Portfolio Review',
    message:
      'Hi Sarah! I loved your recent talk on UI component architecture. Could I get your feedback on my case study?',
    preferred_schedule: 'Thursday afternoons (Zoom)',
    status: 'ACCEPTED',
    created_at: '2026-11-10T14:00:00Z'
  }
];

export const createMockMentorshipRequests = (): MentorshipRequest[] => clone(INITIAL_MENTORSHIP_REQUESTS);
