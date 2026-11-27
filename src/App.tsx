import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { ProtectedRoute } from './features/permissions/ProtectedRoute';

const HomePage = lazy(() => import('./pages/Home/HomePage').then(({ HomePage }) => ({ default: HomePage })));
const CommunityPage = lazy(() => import('./pages/Community/CommunityPage').then(({ CommunityPage }) => ({ default: CommunityPage })));
const EventsPage = lazy(() => import('./pages/Events/EventsPage').then(({ EventsPage }) => ({ default: EventsPage })));
const EventDetailPage = lazy(() => import('./pages/Events/EventDetailPage').then(({ EventDetailPage }) => ({ default: EventDetailPage })));
const CalendarPage = lazy(() => import('./pages/Calendar/CalendarPage').then(({ CalendarPage }) => ({ default: CalendarPage })));
const CareersPage = lazy(() => import('./pages/Careers/CareersPage').then(({ CareersPage }) => ({ default: CareersPage })));
const AlumniPage = lazy(() => import('./pages/Alumni/AlumniPage').then(({ AlumniPage }) => ({ default: AlumniPage })));
const AlumniProfilePage = lazy(() => import('./pages/Alumni/AlumniProfilePage').then(({ AlumniProfilePage }) => ({ default: AlumniProfilePage })));
const FacultiesPage = lazy(() => import('./pages/Faculties/FacultiesPage').then(({ FacultiesPage }) => ({ default: FacultiesPage })));
const MentorshipPage = lazy(() => import('./pages/Mentorship/MentorshipPage').then(({ MentorshipPage }) => ({ default: MentorshipPage })));
const LoginPage = lazy(() => import('./pages/Auth/LoginPage').then(({ LoginPage }) => ({ default: LoginPage })));
const RegisterPage = lazy(() => import('./pages/Auth/RegisterPage').then(({ RegisterPage }) => ({ default: RegisterPage })));
const ForgotPasswordPage = lazy(() => import('./pages/Auth/ForgotPasswordPage').then(({ ForgotPasswordPage }) => ({ default: ForgotPasswordPage })));
const UnauthorizedPage = lazy(() => import('./pages/Auth/UnauthorizedPage').then(({ UnauthorizedPage }) => ({ default: UnauthorizedPage })));
const StudentDashboard = lazy(() => import('./pages/Dashboard/StudentDashboard').then(({ StudentDashboard }) => ({ default: StudentDashboard })));
const AlumniDashboard = lazy(() => import('./pages/Dashboard/AlumniDashboard').then(({ AlumniDashboard }) => ({ default: AlumniDashboard })));
const LecturerDashboard = lazy(() => import('./pages/Dashboard/LecturerDashboard').then(({ LecturerDashboard }) => ({ default: LecturerDashboard })));
const AdminDashboard = lazy(() => import('./pages/Dashboard/AdminDashboard').then(({ AdminDashboard }) => ({ default: AdminDashboard })));
const DashboardRedirect = lazy(() => import('./pages/Dashboard/DashboardRedirect').then(({ DashboardRedirect }) => ({ default: DashboardRedirect })));
const SettingsPage = lazy(() => import('./pages/Settings/SettingsPage').then(({ SettingsPage }) => ({ default: SettingsPage })));
const AnnouncementsPage = lazy(() => import('./pages/Announcements/AnnouncementsPage').then(({ AnnouncementsPage }) => ({ default: AnnouncementsPage })));
const AdminPlaceholder = lazy(() => import('./pages/Admin/AdminPlaceholder').then(({ AdminPlaceholder }) => ({ default: AdminPlaceholder })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then(({ NotFoundPage }) => ({ default: NotFoundPage })));

const RouteLoader = () => <div className="min-h-[45vh]" aria-label="Loading page" />;

export function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<RouteLoader />}>
        <Routes>
        <Route element={<AppLayout />}>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/faculties" element={<FacultiesPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/events/:id" element={<EventDetailPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/alumni" element={<AlumniPage />} />
          <Route path="/alumni/:id" element={<AlumniProfilePage />} />
          <Route path="/profile/:id" element={<AlumniProfilePage />} />
          <Route path="/mentorship" element={<MentorshipPage />} />

          {/* Auth routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          {/* Kept as a compatibility URL; all roles use the same sign-in form. */}
          <Route path="/admin-login" element={<Navigate to="/login" replace />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />

          {/* Dashboard redirect — sends authenticated users to their role dashboard */}
          <Route path="/dashboard" element={<DashboardRedirect />} />

          {/* Role-specific dashboards */}
          <Route
            path="/dashboard/student"
            element={
              <ProtectedRoute allowedRoles={['STUDENT']}>
                <StudentDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/alumni"
            element={
              <ProtectedRoute allowedRoles={['ALUMNI']}>
                <AlumniDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/lecturer"
            element={
              <ProtectedRoute allowedRoles={['LECTURER']}>
                <LecturerDashboard />
              </ProtectedRoute>
            }
          />

          {/* Admin routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <AdminPlaceholder section="User Management" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/events"
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <AdminPlaceholder section="Event Management" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/careers"
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <AdminPlaceholder section="Career Management" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/verification"
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <AdminPlaceholder section="Verification & Moderation" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/moderation"
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <AdminPlaceholder section="Moderation" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/analytics"
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <AdminPlaceholder section="Platform Analytics" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/settings"
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <AdminPlaceholder section="Admin Settings" />
              </ProtectedRoute>
            }
          />

          {/* Shared authenticated routes */}
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <SettingsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/announcements"
            element={
              <ProtectedRoute>
                <AnnouncementsPage />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFoundPage />} />
        </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
