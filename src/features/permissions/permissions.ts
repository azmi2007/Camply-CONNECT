import { EventItem, JobVacancy, Profile, UserRole } from '../../types';

export type Permission =
  | 'users.read'
  | 'users.manage'
  | 'events.read'
  | 'events.create'
  | 'events.update.own'
  | 'events.update.any'
  | 'events.delete.own'
  | 'events.delete.any'
  | 'events.moderate'
  | 'announcements.read'
  | 'announcements.publish'
  | 'jobs.read'
  | 'jobs.publish'
  | 'jobs.update.own'
  | 'jobs.moderate'
  | 'analytics.read'
  | 'analytics.read.academic'
  | 'analytics.read.full'
  | 'alumni.verify'
  | 'settings.manage'
  | 'admin.dashboard'
  | 'lecturer.dashboard'
  | 'profile.campus'
  | 'mentorship.request'
  | 'connections.create';

export const ROLE_PERMISSIONS: Record<UserRole, ReadonlySet<Permission>> = {
  ADMIN: new Set<Permission>([
    'users.read',
    'users.manage',
    'events.read',
    'events.create',
    'events.update.own',
    'events.update.any',
    'events.delete.own',
    'events.delete.any',
    'events.moderate',
    'announcements.read',
    'announcements.publish',
    'jobs.read',
    'jobs.publish',
    'jobs.update.own',
    'jobs.moderate',
    'analytics.read',
    'analytics.read.academic',
    'analytics.read.full',
    'alumni.verify',
    'settings.manage',
    'admin.dashboard',
    'mentorship.request',
    'connections.create'
    // Note: ADMIN intentionally does NOT have 'profile.campus'
  ]),
  LECTURER: new Set<Permission>([
    'users.read',
    'events.read',
    'events.create',
    'events.update.own',
    'events.delete.own',
    'events.moderate', // Academic event oversight
    'announcements.read',
    'announcements.publish',
    'jobs.read',
    'jobs.publish', // Authorized academic/research roles
    'jobs.update.own',
    'analytics.read',
    'analytics.read.academic',
    'lecturer.dashboard',
    'profile.campus',
    'mentorship.request',
    'connections.create'
  ]),
  ALUMNI: new Set<Permission>([
    'users.read',
    'events.read',
    'events.create',
    'events.update.own',
    'events.delete.own',
    'announcements.read',
    'jobs.read',
    'jobs.publish',
    'jobs.update.own',
    'analytics.read', // Read-only public campus overview
    'profile.campus',
    'mentorship.request',
    'connections.create'
  ]),
  STUDENT: new Set<Permission>([
    'users.read',
    'events.read',
    'events.create',
    'events.update.own',
    'events.delete.own',
    'announcements.read',
    'jobs.read', // Can view & apply, cannot publish vacancies
    'analytics.read', // Read-only public campus overview
    'profile.campus',
    'mentorship.request',
    'connections.create'
  ])
};

export function hasPermission(role: UserRole | undefined | null, permission: Permission): boolean {
  if (!role) return false;
  return ROLE_PERMISSIONS[role]?.has(permission) ?? false;
}

export function hasAnyRole(role: UserRole | undefined | null, allowedRoles: UserRole[]): boolean {
  if (!role) return false;
  return allowedRoles.includes(role);
}

export function canEditEvent(user: Profile | null, event: EventItem): boolean {
  if (!user) return false;
  if (hasPermission(user.role, 'events.update.any')) return true;
  return hasPermission(user.role, 'events.update.own') && event.organizer_id === user.id;
}

export function canDeleteEvent(user: Profile | null, event: EventItem): boolean {
  if (!user) return false;
  if (hasPermission(user.role, 'events.delete.any')) return true;
  return hasPermission(user.role, 'events.delete.own') && event.organizer_id === user.id;
}

export function canEditJob(user: Profile | null, job: JobVacancy): boolean {
  if (!user) return false;
  if (hasPermission(user.role, 'jobs.moderate')) return true;
  return hasPermission(user.role, 'jobs.update.own') && job.poster_id === user.id;
}

export function getDefaultDashboardRoute(role: UserRole | undefined | null): string {
  switch (role) {
    case 'ADMIN':
      return '/admin';
    case 'LECTURER':
      return '/dashboard/lecturer';
    case 'ALUMNI':
      return '/dashboard/alumni';
    case 'STUDENT':
      return '/dashboard/student';
    default:
      return '/login';
  }
}
