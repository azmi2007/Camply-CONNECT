import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { ProtectedRoute } from './features/permissions/ProtectedRoute';

import { HomePage } from './pages/Home/HomePage';
import { CommunityPage } from './pages/Community/CommunityPage';
import { EventsPage } from './pages/Events/EventsPage';
import { EventDetailPage } from './pages/Events/EventDetailPage';
import { CalendarPage } from './pages/Calendar/CalendarPage';
import { CareersPage } from './pages/Careers/CareersPage';
import { AlumniPage } from './pages/Alumni/AlumniPage';
import { AlumniProfilePage } from './pages/Alumni/AlumniProfilePage';
import { FacultiesPage } from './pages/Faculties/FacultiesPage';
import { MentorshipPage } from './pages/Mentorship/MentorshipPage';

import { LoginPage } from './pages/Auth/LoginPage';
import { RegisterPage } from './pages/Auth/RegisterPage';
import { ForgotPasswordPage } from './pages/Auth/ForgotPasswordPage';
import { UnauthorizedPage } from './pages/Auth/UnauthorizedPage';

import { StudentDashboard } from './pages/Dashboard/StudentDashboard';
import { AlumniDashboard } from './pages/Dashboard/AlumniDashboard';
import { LecturerDashboard } from './pages/Dashboard/LecturerDashboard';
import { AdminDashboard } from './pages/Dashboard/AdminDashboard';
import { DashboardRedirect } from './pages/Dashboard/DashboardRedirect';

import { SettingsPage } from './pages/Settings/SettingsPage';
import { AnnouncementsPage } from './pages/Announcements/AnnouncementsPage';
import { AdminPlaceholder } from './pages/Admin/AdminPlaceholder';

export function App() {
  return (
    <BrowserRouter>
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

          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
