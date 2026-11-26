import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Lock, User, AlertCircle, CheckCircle2, Sparkles } from 'lucide-react';
import { PublicLoginRole } from '../authService';
import { Button } from '../../../components/ui/Button';

interface LoginFormProps {
  role: PublicLoginRole;
  isLoading: boolean;
  error: string | null;
  successMessage: string | null;
  onSubmit: (identifier: string, password: string) => void;
}

const DEMO_HINTS: Record<PublicLoginRole, { label: string; identifier: string; password: string; placeholder: string }> = {
  STUDENT: {
    label: 'Student ID (NIM)',
    identifier: '23100001',
    password: 'student123',
    placeholder: 'e.g. 23100001'
  },
  ALUMNI: {
    label: 'Email or Alumni ID',
    identifier: 'alumni@camply.demo',
    password: 'alumni123',
    placeholder: 'e.g. alumni@camply.demo'
  },
  LECTURER: {
    label: 'Lecturer ID (NIDN / NIP)',
    identifier: '0012345678',
    password: 'lecturer123',
    placeholder: 'e.g. 0012345678'
  }
};

export const LoginForm: React.FC<LoginFormProps> = ({
  role,
  isLoading,
  error,
  successMessage,
  onSubmit
}) => {
  const hint = DEMO_HINTS[role];
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    setIdentifier('');
    setPassword('');
  }, [role]);

  const handleFillDemo = () => {
    setIdentifier(hint.identifier);
    setPassword(hint.password);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(identifier, password);
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Prototype Demo Account Card */}
      <div className="p-3.5 rounded-2xl bg-[#F8F8F8] dark:bg-[#20232B] border border-[#EAEAEA] dark:border-[#2C2F38] flex items-center justify-between gap-3">
        <div className="text-xs">
          <div className="font-bold text-[#111111] dark:text-[#F5F5F5] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#7865F5]" />
            <span>Demo {role.charAt(0) + role.slice(1).toLowerCase()} Account</span>
          </div>
          <p className="text-[11px] text-[#929292] mt-0.5 font-mono">
            ID: {hint.identifier} • Pass: {hint.password}
          </p>
        </div>
        <button
          type="button"
          onClick={handleFillDemo}
          className="px-3 py-1.5 rounded-full bg-white dark:bg-[#181A20] border border-[#EAEAEA] dark:border-[#2C2F38] text-[11px] font-bold text-[#7865F5] hover:border-[#7865F5] transition-colors shrink-0"
        >
          Fill Demo
        </button>
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {successMessage && (
        <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-emerald-700 dark:text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
            {hint.label}
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              required
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder={hint.placeholder}
              className="w-full text-sm pl-10 pr-4 py-2.5 rounded-xl border border-[#EAEAEA] dark:border-[#2C2F38] focus:outline-none focus:border-[#7865F5]"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300">
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
              className="w-full text-sm pl-10 pr-4 py-2.5 rounded-xl border border-[#EAEAEA] dark:border-[#2C2F38] focus:outline-none focus:border-[#7865F5]"
            />
          </div>
        </div>

        <Button
          variant="primary"
          size="lg"
          type="submit"
          isLoading={isLoading}
          className="mt-1 w-full"
          icon={<ArrowRight className="w-4 h-4" />}
        >
          Login as {role.charAt(0) + role.slice(1).toLowerCase()}
        </Button>
      </form>
    </div>
  );
};
