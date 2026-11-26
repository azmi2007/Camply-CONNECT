import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { AdminLoginForm } from '../../features/auth/login/AdminLoginForm';

export const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { loginAdmin } = useAuthStore();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAdminLogin = async (username: string, password: string) => {
    setError(null);
    setIsLoading(true);
    try {
      const res = await loginAdmin(username, password);
      if (!res.success) {
        setError(res.error || 'Administrator authentication failed.');
        return;
      }
      navigate('/admin', { replace: true });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-72px)] flex items-center justify-center px-4 py-12 bg-[#F8F8F8] dark:bg-[#101114]">
      <div className="w-full max-w-md bg-white dark:bg-[#181A20] rounded-3xl border border-[#EAEAEA] dark:border-[#2C2F38] p-8 shadow-sm">
        <Link
          to="/login"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-500 hover:text-[#111111] dark:hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Campus Login</span>
        </Link>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-11 h-11 rounded-2xl bg-[#111111] dark:bg-[#20232B] text-white flex items-center justify-center border border-neutral-800">
            <ShieldAlert className="w-5 h-5 text-[#7865F5]" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#7865F5] block">
              Private System Access
            </span>
            <h1 className="text-xl font-extrabold text-[#111111] dark:text-[#F5F5F5] tracking-tight">
              Administrator Sign In
            </h1>
          </div>
        </div>

        <p className="text-xs text-[#929292] dark:text-[#A0A0A0] mb-6 leading-relaxed">
          Restricted governance portal for authorized university system administrators. Access is verified via backend or local development authentication service.
        </p>

        <AdminLoginForm isLoading={isLoading} error={error} onSubmit={handleAdminLogin} />
      </div>
    </div>
  );
};
