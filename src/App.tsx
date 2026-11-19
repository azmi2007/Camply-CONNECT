import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { HomePage } from './pages/Home/HomePage';
import { CommunityPage } from './pages/Community/CommunityPage';
import { EventsPage } from './pages/Events/EventsPage';
import { CareersPage } from './pages/Careers/CareersPage';
import { AlumniPage } from './pages/Alumni/AlumniPage';
import { MentorshipPage } from './pages/Mentorship/MentorshipPage';
import { LoginPage } from './pages/Auth/LoginPage';
import { RegisterPage } from './pages/Auth/RegisterPage';
import { ForgotPasswordPage } from './pages/Auth/ForgotPasswordPage';
import { DashboardRouter } from './pages/Dashboard/DashboardRouter';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/alumni" element={<AlumniPage />} />
          <Route path="/mentorship" element={<MentorshipPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/dashboard" element={<DashboardRouter />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

