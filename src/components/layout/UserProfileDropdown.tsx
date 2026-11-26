import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ChevronDown,
  LayoutDashboard,
  GraduationCap,
  CalendarDays,
  Settings,
  LogOut,
  ShieldCheck
} from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { RoleBadge } from '../ui/RoleBadge';
import { getDefaultDashboardRoute, hasPermission } from '../../features/permissions/permissions';

export const UserProfileDropdown: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) return null;

  const isAdmin = user.role === 'ADMIN';
  const showCampusProfile = hasPermission(user.role, 'profile.campus');
  const dashboardRoute = getDefaultDashboardRoute(user.role);
  const profileRoute = user.role === 'ALUMNI' ? `/alumni/${user.id}` : `/profile/${user.id}`;

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-full border border-[#EAEAEA] dark:border-[#2C2F38] hover:border-neutral-300 transition-colors bg-white dark:bg-[#20232B] shadow-2xs"
        aria-label="User profile menu"
      >
        <img
          src={user.avatar_url}
          alt={user.full_name}
          className="w-7 h-7 rounded-full object-cover"
        />
        <span className="hidden sm:inline text-xs font-semibold text-[#111111] dark:text-[#F5F5F5] max-w-[100px] truncate">
          {user.full_name.split(' ')[0]}
        </span>
        <span className="hidden md:inline">
          <RoleBadge role={user.role} size="sm" showDot={false} />
        </span>
        <ChevronDown className="w-3 h-3 text-neutral-400" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-[#181A20] rounded-2xl shadow-2xl border border-[#EAEAEA] dark:border-[#2C2F38] p-3 z-50">
          <div className="flex items-center gap-3 p-2 border-b border-neutral-100 dark:border-[#2C2F38] pb-3 mb-2">
            <img
              src={user.avatar_url}
              alt={user.full_name}
              className="w-10 h-10 rounded-xl object-cover"
            />
            <div className="overflow-hidden">
              <h5 className="font-bold text-[#111111] dark:text-[#F5F5F5] text-xs truncate">
                {user.full_name}
              </h5>
              <p className="text-[11px] text-[#929292] truncate">{user.email}</p>
              <RoleBadge role={user.role} size="sm" className="mt-1" />
            </div>
          </div>

          <div className="flex flex-col gap-1 text-xs">
            <Link
              to={dashboardRoute}
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-[#20232B] transition-colors font-medium"
            >
              {isAdmin ? (
                <ShieldCheck className="w-4 h-4 text-[#7865F5]" />
              ) : (
                <LayoutDashboard className="w-4 h-4 text-neutral-400" />
              )}
              <span>{isAdmin ? 'Admin Console' : 'My Dashboard'}</span>
            </Link>

            {showCampusProfile && (
              <Link
                to={profileRoute}
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-[#20232B] transition-colors"
              >
                <GraduationCap className="w-4 h-4 text-neutral-400" />
                <span>My Campus Profile</span>
              </Link>
            )}

            <Link
              to="/calendar"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-[#20232B] transition-colors"
            >
              <CalendarDays className="w-4 h-4 text-neutral-400" />
              <span>Campus Calendar</span>
            </Link>

            <Link
              to="/settings"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-[#20232B] transition-colors"
            >
              <Settings className="w-4 h-4 text-neutral-400" />
              <span>Settings</span>
            </Link>

            <button
              onClick={() => {
                logout();
                setOpen(false);
                navigate('/login');
              }}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors w-full text-left font-medium mt-1 border-t border-neutral-100 dark:border-[#2C2F38] pt-2"
            >
              <LogOut className="w-4 h-4 text-rose-500" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
