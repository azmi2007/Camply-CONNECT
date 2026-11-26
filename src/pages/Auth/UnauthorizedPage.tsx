import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldAlert, ArrowLeft, Home } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { useAuthStore } from '../../store/useAuthStore';
import { getDefaultDashboardRoute } from '../../features/permissions/permissions';

export const UnauthorizedPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();

  const homeTarget = isAuthenticated && user ? getDefaultDashboardRoute(user.role) : '/';

  return (
    <div className="min-h-[calc(100vh-72px)] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full bg-white dark:bg-[#181A20] rounded-3xl border border-[#EAEAEA] dark:border-[#2C2F38] p-8 text-center shadow-sm">
        <div className="w-14 h-14 rounded-2xl bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto mb-5">
          <ShieldAlert className="w-7 h-7" />
        </div>

        <span className="text-[11px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 block mb-1">
          403 • Access Restricted
        </span>
        <h1 className="text-2xl font-extrabold text-[#111111] dark:text-[#F5F5F5] tracking-tight mb-2">
          Unauthorized Access
        </h1>
        <p className="text-xs sm:text-sm text-[#929292] dark:text-[#A0A0A0] leading-relaxed mb-6">
          Your current account permissions do not allow access to this area. Please contact a university administrator if you believe this is an error.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5">
          <Button
            variant="secondary"
            size="md"
            onClick={() => navigate(-1)}
            icon={<ArrowLeft className="w-4 h-4" />}
            className="w-full sm:w-auto"
          >
            Go Back
          </Button>
          <Link to={homeTarget} className="w-full sm:w-auto">
            <Button variant="primary" size="md" icon={<Home className="w-4 h-4" />} className="w-full">
              {isAuthenticated ? 'Return to Dashboard' : 'Return Home'}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
