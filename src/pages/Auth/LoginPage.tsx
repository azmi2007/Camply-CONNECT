import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { PublicLoginRole } from '../../features/auth/authService';
import { LoginRoleSelector } from '../../features/auth/login/LoginRoleSelector';
import { LoginForm } from '../../features/auth/login/LoginForm';
import { getDefaultDashboardRoute } from '../../features/permissions/permissions';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginWithCredentials } = useAuthStore();

  const [selectedRole, setSelectedRole] = useState<PublicLoginRole>('STUDENT');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleLogin = async (identifier: string, password: string) => {
    setError(null);
    setSuccessMessage(null);
    setIsLoading(true);

    try {
      const result = await loginWithCredentials({
        role: selectedRole,
        identifier,
        password
      });

      if (!result.success || !result.user) {
        setError(result.error || 'Authentication failed.');
        return;
      }

      setSuccessMessage(`Signed in as ${result.user.full_name}. Redirecting...`);
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });

      const fromState = (location.state as { from?: string } | null)?.from;
      const target = fromState && !fromState.startsWith('/admin')
        ? fromState
        : getDefaultDashboardRoute(result.user.role);

      setTimeout(() => navigate(target, { replace: true }), 400);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-72px)] flex items-stretch">
      {/* Left Column: Brand Showcase */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#111111] dark:bg-[#101114] text-white p-12 flex-col justify-between relative overflow-hidden border-r border-transparent dark:border-[#2C2F38]">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#7865F5]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-neutral-800/40 rounded-full blur-2xl" />

        <div className="relative z-10">
          <Link to="/" className="inline-flex items-center gap-2 mb-12">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white">
              <svg className="w-5 h-5 text-[#7865F5]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M4 19L12 5L20 19" />
                <circle cx="4" cy="19" r="2" fill="#7865F5" />
                <circle cx="12" cy="5" r="2" fill="#FFFFFF" />
                <circle cx="20" cy="19" r="2" fill="#7865F5" />
              </svg>
            </div>
            <span className="font-extrabold text-xl tracking-tight text-white">
              CAMPLY<span className="text-[#7865F5]">.</span>
            </span>
          </Link>

          <div className="max-w-md">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-neutral-300 text-xs font-semibold mb-6">
              <Sparkles className="w-3.5 h-3.5 text-[#7865F5]" />
              <span>University Identity Sign-In</span>
            </div>
            <h2 className="text-4xl font-extrabold tracking-tight text-white leading-tight mb-4">
              Your Campus. <br />
              Your People. <br />
              Your Future.
            </h2>
            <p className="text-neutral-400 text-sm leading-relaxed mb-8">
              Authenticate with your Student NIM, Alumni email, or institutional Lecturer ID to access your authorized dashboard.
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-xs text-neutral-300">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span><strong>Students:</strong> Discover internships, mentorship & campus events.</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-neutral-300">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                <span><strong>Alumni:</strong> Mentor undergraduates & publish career vacancies.</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-neutral-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><strong>Lecturers:</strong> Host academic summits & publish announcements.</span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 pt-8 border-t border-white/10 text-xs text-neutral-400">
          <p className="italic">"CAMPLY connects our campus ecosystem through verified academic identities."</p>
        </div>
      </div>

      {/* Right Column: Role-Specific Demo Login */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-white dark:bg-[#181A20]">
        <div className="w-full max-w-md">
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111111] dark:text-[#F5F5F5] tracking-tight">
              Sign in to CAMPLY
            </h1>
            <p className="text-xs sm:text-sm text-[#929292] dark:text-[#A0A0A0] mt-1">
              Select your campus identity type to sign in with demo or university credentials.
            </p>
          </div>

          <div className="mb-6">
            <LoginRoleSelector
              selectedRole={selectedRole}
              onSelectRole={(r) => {
                setSelectedRole(r);
                setError(null);
              }}
            />
          </div>

          <LoginForm
            role={selectedRole}
            isLoading={isLoading}
            error={error}
            successMessage={successMessage}
            onSubmit={handleLogin}
          />

          <p className="text-center text-xs text-[#929292] mt-6">
            New to CAMPLY?{' '}
            <Link to="/register" className="text-[#111111] dark:text-[#F5F5F5] font-bold hover:underline">
              Create a Student, Alumni, or Lecturer account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
