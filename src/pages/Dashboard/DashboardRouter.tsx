import React from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { StudentDashboard } from './StudentDashboard';
import { AlumniDashboard } from './AlumniDashboard';
import { LecturerDashboard } from './LecturerDashboard';
import { AdminDashboard } from './AdminDashboard';
import { RoleBadge } from '../../components/ui/RoleBadge';
import { UserRole } from '../../types';
import { Sparkles } from 'lucide-react';

export const DashboardRouter: React.FC = () => {
  const { user, activeRole, switchDemoRole } = useAuthStore();

  const roles: UserRole[] = ['STUDENT', 'ALUMNI', 'LECTURER', 'ADMIN'];

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Quick Role Switcher Banner */}
      <div className="bg-white rounded-2xl border border-neutral-200/80 p-3 sm:p-4 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#7865F5]" />
          <span className="text-xs font-bold text-neutral-800">
            Interactive Role Simulator:
          </span>
          <span className="text-xs text-neutral-400 hidden md:inline">
            Switch views to test all 4 role workflows
          </span>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          {roles.map((r) => {
            const isActive = activeRole === r;
            return (
              <button
                key={r}
                onClick={() => switchDemoRole(r)}
                className={`text-xs font-bold px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 border ${
                  isActive
                    ? 'bg-[#111111] text-white border-neutral-900 shadow-sm'
                    : 'bg-neutral-50 text-neutral-600 border-neutral-200/60 hover:bg-neutral-100 hover:text-neutral-900'
                }`}
              >
                <span>{r}</span>
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#7865F5]" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Role-Specific Dashboard Render */}
      {activeRole === 'STUDENT' && <StudentDashboard />}
      {activeRole === 'ALUMNI' && <AlumniDashboard />}
      {activeRole === 'LECTURER' && <LecturerDashboard />}
      {activeRole === 'ADMIN' && <AdminDashboard />}
    </div>
  );
};

