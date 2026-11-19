import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { Button } from '../../components/ui/Button';
import { RoleBadge } from '../../components/ui/RoleBadge';
import { UserRole } from '../../types';
import { ArrowRight, Lock, Mail, Sparkles, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, switchDemoRole } = useAuthStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('STUDENT');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(email || 'demo@camply.edu', selectedRole);
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
      navigate('/dashboard');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickDemo = (role: UserRole) => {
    switchDemoRole(role);
    confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-[calc(100vh-72px)] flex items-stretch">
      {/* Left Column: Brand Showcase & Editorial Intro */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#111111] text-white p-12 flex-col justify-between relative overflow-hidden">
        {/* Subtle decorative circles */}
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
              <span>Campus Networking Platform</span>
            </div>
            <h2 className="text-4xl font-extrabold tracking-tight text-white leading-tight mb-4">
              Your Campus. <br />
              Your People. <br />
              Your Future.
            </h2>
            <p className="text-neutral-400 text-sm leading-relaxed mb-8">
              Access your personalized role dashboard, connect with mentors from top global firms, and explore campus opportunities.
            </p>

            {/* Role highlights */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-xs text-neutral-300">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span><strong>Students:</strong> Access internships, mentorship & student clubs.</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-neutral-300">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                <span><strong>Alumni:</strong> Mentor undergraduates & hire campus talent.</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-neutral-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><strong>Lecturers:</strong> Host academic conferences & publish research.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer quote */}
        <div className="relative z-10 pt-8 border-t border-white/10 text-xs text-neutral-400">
          <p className="italic">"CAMPLY has transformed how our students connect with graduates globally."</p>
          <span className="text-neutral-500 block mt-1">— University Relations & Dean of Engineering</span>
        </div>
      </div>

      {/* Right Column: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-white">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111111] tracking-tight">
              Welcome Back
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1">
              Sign in with your university credentials or select a demo role.
            </p>
          </div>

          {/* Quick Demo Role Clickers */}
          <div className="mb-6 p-4 rounded-2xl bg-neutral-50 border border-neutral-100">
            <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider block mb-2">
              Instant Demo Access (1-Click Login):
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemo('STUDENT')}
                className="p-2.5 rounded-xl border border-blue-200 bg-white hover:bg-blue-50/50 text-left transition-colors flex items-center justify-between"
              >
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-neutral-900">Alex (Student)</span>
                  <span className="text-[10px] text-neutral-400">CS Senior</span>
                </div>
                <RoleBadge role="STUDENT" size="sm" showDot={false} />
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemo('ALUMNI')}
                className="p-2.5 rounded-xl border border-purple-200 bg-white hover:bg-purple-50/50 text-left transition-colors flex items-center justify-between"
              >
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-neutral-900">Sarah (Alumni)</span>
                  <span className="text-[10px] text-neutral-400">Stripe Designer</span>
                </div>
                <RoleBadge role="ALUMNI" size="sm" showDot={false} />
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemo('LECTURER')}
                className="p-2.5 rounded-xl border border-emerald-200 bg-white hover:bg-emerald-50/50 text-left transition-colors flex items-center justify-between"
              >
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-neutral-900">Dr. Marcus (Faculty)</span>
                  <span className="text-[10px] text-neutral-400">Prof. CS Dept</span>
                </div>
                <RoleBadge role="LECTURER" size="sm" showDot={false} />
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemo('ADMIN')}
                className="p-2.5 rounded-xl border border-neutral-300 bg-white hover:bg-neutral-100 text-left transition-colors flex items-center justify-between"
              >
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-neutral-900">Elena (Admin)</span>
                  <span className="text-[10px] text-neutral-400">Director</span>
                </div>
                <RoleBadge role="ADMIN" size="sm" showDot={false} />
              </button>
            </div>
          </div>

          <div className="relative my-6 text-center">
            <span className="bg-white px-3 text-xs text-neutral-400 relative z-10">Or sign in with email</span>
            <div className="absolute inset-0 top-1/2 border-t border-neutral-100 -z-0" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                University Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@university.edu"
                  className="w-full text-sm pl-10 pr-4 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-[#7865F5]"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-neutral-700">
                  Password
                </label>
                <Link to="/forgot-password" className="text-xs text-[#7865F5] font-semibold hover:underline">
                  Forgot?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full text-sm pl-10 pr-4 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-[#7865F5]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                Select Account Role
              </label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value as UserRole)}
                className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-[#7865F5] bg-white"
              >
                <option value="STUDENT">Student</option>
                <option value="ALUMNI">Alumni</option>
                <option value="LECTURER">Lecturer / Faculty</option>
                <option value="ADMIN">Administrator</option>
              </select>
            </div>

            <Button
              variant="primary"
              size="lg"
              type="submit"
              isLoading={isLoading}
              className="mt-2 w-full"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Sign In to CAMPLY
            </Button>
          </form>

          {/* Bottom link */}
          <p className="text-center text-xs text-neutral-500 mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-neutral-900 font-bold hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

