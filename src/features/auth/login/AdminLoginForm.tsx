import React, { useState } from 'react';
import { Lock, ShieldCheck, AlertCircle, ArrowRight } from 'lucide-react';
import { Button } from '../../../components/ui/Button';

interface AdminLoginFormProps {
  isLoading: boolean;
  error: string | null;
  onSubmit: (username: string, password: string) => void;
}

export const AdminLoginForm: React.FC<AdminLoginFormProps> = ({
  isLoading,
  error,
  onSubmit
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(username, password);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {error && (
        <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div>
        <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
          Admin ID or Username
        </label>
        <div className="relative">
          <ShieldCheck className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            required
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter administrator username"
            className="w-full text-sm pl-10 pr-4 py-2.5 rounded-xl border border-[#EAEAEA] dark:border-[#2C2F38] focus:outline-none focus:border-[#7865F5]"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
          Password
        </label>
        <div className="relative">
          <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="password"
            required
            autoComplete="current-password"
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
        className="mt-2 w-full"
        icon={<ArrowRight className="w-4 h-4" />}
      >
        Authenticate Administrator
      </Button>
    </form>
  );
};
