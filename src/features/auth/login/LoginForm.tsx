import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, CheckCircle2, Eye, EyeOff, Lock, User } from 'lucide-react';
import { DEMO_LOGIN_ACCOUNTS } from '../authService';
import { Button } from '../../../components/ui/Button';

interface LoginFormProps {
  isLoading: boolean;
  error: string | null;
  successMessage: string | null;
  onSubmit: (identifier: string, password: string) => void;
}

const publicDemoAccounts = DEMO_LOGIN_ACCOUNTS.filter((account) => account.role !== 'ADMIN');

export const LoginForm: React.FC<LoginFormProps> = ({
  isLoading,
  error,
  successMessage,
  onSubmit
}) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);

  const handleFillDemo = (account: (typeof DEMO_LOGIN_ACCOUNTS)[number]) => {
    setIdentifier(account.identifier);
    setPassword(account.password);
    setSelectedAccount(account.role);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(identifier, password);
  };

  return (
    <div className="space-y-5">
      {error && (
        <div role="alert" className="flex items-start gap-2.5 rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-3 text-sm leading-5 text-rose-700 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {successMessage && (
        <div role="status" className="flex items-start gap-2.5 rounded-xl border border-emerald-200 bg-emerald-50 px-3.5 py-3 text-sm leading-5 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="login-identifier" className="mb-2 block text-sm font-medium text-[#242424] dark:text-[#E4E4E4]">
            Account ID or university email
          </label>
          <div className="relative">
            <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" aria-hidden="true" />
            <input
              id="login-identifier"
              type="text"
              required
              autoComplete="username"
              value={identifier}
              onChange={(event) => {
                setIdentifier(event.target.value);
                setSelectedAccount(null);
              }}
              placeholder="Student ID, alumni ID, or lecturer ID"
              className="w-full rounded-xl border border-[#DCDCDC] bg-white py-3 pl-10 pr-4 text-sm text-[#111111] outline-none transition-colors placeholder:text-neutral-400 focus:border-[#7865F5] focus:ring-3 focus:ring-[#7865F5]/15 dark:border-[#3A3D47] dark:bg-[#20232B] dark:text-[#F5F5F5]"
            />
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between gap-4">
            <label htmlFor="login-password" className="block text-sm font-medium text-[#242424] dark:text-[#E4E4E4]">
              Password
            </label>
            <Link to="/forgot-password" className="text-sm font-medium text-[#7865F5] underline-offset-4 hover:text-[#6752EE] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7865F5]">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" aria-hidden="true" />
            <input
              id="login-password"
              type={showPassword ? 'text' : 'password'}
              required
              autoComplete="current-password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                setSelectedAccount(null);
              }}
              placeholder="Enter your password"
              className="w-full rounded-xl border border-[#DCDCDC] bg-white py-3 pl-10 pr-12 text-sm text-[#111111] outline-none transition-colors placeholder:text-neutral-400 focus:border-[#7865F5] focus:ring-3 focus:ring-[#7865F5]/15 dark:border-[#3A3D47] dark:bg-[#20232B] dark:text-[#F5F5F5]"
            />
            <button
              type="button"
              onClick={() => setShowPassword((visible) => !visible)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              aria-pressed={showPassword}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-neutral-400 transition-colors hover:text-[#7865F5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7865F5] dark:hover:text-[#A99BFF]"
            >
              {showPassword ? (
                <Eye className="h-4 w-4" aria-hidden="true" />
              ) : (
                <EyeOff className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        <Button
          variant="accent"
          size="lg"
          type="submit"
          isLoading={isLoading}
          className="mt-1 w-full rounded-xl"
        >
          Sign in
        </Button>
      </form>

      <details className="border-t border-[#EAEAEA] pt-5 dark:border-[#2C2F38]">
        <summary className="cursor-pointer text-sm font-medium text-[#4E4E4E] marker:text-[#7865F5] dark:text-[#C9C9C9]">
          Use a demo account
        </summary>
        <p className="mt-2 text-xs leading-5 text-[#777777] dark:text-[#A0A0A0]">
          Select a role to fill in the credentials automatically.
        </p>
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          {publicDemoAccounts.map((account) => {
            const isSelected = selectedAccount === account.role;

            return (
              <button
                key={account.role}
                type="button"
                onClick={() => handleFillDemo(account)}
                className={`rounded-lg border px-3 py-2.5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7865F5] focus-visible:ring-offset-2 ${
                  isSelected
                    ? 'border-[#7865F5] bg-[#F5F3FF] dark:bg-[#282542]'
                    : 'border-[#EAEAEA] bg-[#FAFAFA] hover:border-[#BDB4F9] hover:bg-[#F8F7FF] dark:border-[#2C2F38] dark:bg-[#20232B] dark:hover:border-[#5D5497]'
                }`}
              >
                <span className="block text-xs font-semibold text-[#242424] dark:text-[#F5F5F5]">
                  {account.label}
                </span>
                <span className="mt-1 block font-mono text-[10px] leading-4 text-[#777777] dark:text-[#A0A0A0]">
                  {account.identifier}
                </span>
              </button>
            );
          })}
        </div>
      </details>
    </div>
  );
};
