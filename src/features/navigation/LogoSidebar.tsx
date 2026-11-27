import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Home,
  Users,
  Award,
  Calendar,
  CalendarDays,
  Briefcase,
  Sparkles,
  User,
  LayoutDashboard,
  Settings,
  Megaphone,
  ShieldCheck,
  BarChart3,
  Sliders,
  AlertTriangle,
  UserCheck,
  LogIn,
  UserPlus,
  LogOut
} from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { RoleBadge } from '../../components/ui/RoleBadge';
import { CamplyMark } from '../../components/ui/CamplyMark';
import { cn } from '../../lib/utils';

interface SidebarOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SidebarOverlay: React.FC<SidebarOverlayProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px]"
          aria-hidden="true"
        />
      )}
    </AnimatePresence>
  );
};

interface SidebarLinkItem {
  label: string;
  path: string;
  icon: React.FC<{ className?: string }>;
}

interface LogoSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LogoSidebar: React.FC<LogoSidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuthStore();
  const role = user?.role;

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEsc);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  const isRouteActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    if (path === '/admin') return location.pathname === '/admin';
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  // Dynamic role-based navigation sections
  const getMenuSections = (): { title: string; items: SidebarLinkItem[] }[] => {
    if (isAuthenticated && role === 'ADMIN') {
      return [
        {
          title: 'ADMINISTRATION',
          items: [
            { label: 'Platform Overview', path: '/admin', icon: LayoutDashboard },
            { label: 'User Management', path: '/admin/users', icon: Users },
            { label: 'Event Management', path: '/admin/events', icon: Calendar },
            { label: 'Career Management', path: '/admin/careers', icon: Briefcase },
            { label: 'Alumni Verification', path: '/admin/verification', icon: UserCheck },
            { label: 'Moderation', path: '/admin/moderation', icon: AlertTriangle },
            { label: 'Analytics', path: '/admin/analytics', icon: BarChart3 },
            { label: 'System Settings', path: '/admin/settings', icon: Sliders }
          ]
        },
        {
          title: 'PUBLIC ECOSYSTEM',
          items: [
            { label: 'Community', path: '/community', icon: Users },
            { label: 'Events', path: '/events', icon: Calendar },
            { label: 'Calendar', path: '/calendar', icon: CalendarDays }
          ]
        },
        {
          title: 'ACCOUNT',
          items: [{ label: 'Settings', path: '/settings', icon: Settings }]
        }
      ];
    }

    if (isAuthenticated && role === 'LECTURER') {
      return [
        {
          title: 'MAIN MENU',
          items: [
            { label: 'Dashboard', path: '/dashboard/lecturer', icon: LayoutDashboard },
            { label: 'Community', path: '/community', icon: Users },
            { label: 'Events', path: '/events', icon: Calendar },
            { label: 'Calendar', path: '/calendar', icon: CalendarDays },
            { label: 'Careers & Internship', path: '/careers', icon: Briefcase },
            { label: 'Academic Announcements', path: '/announcements', icon: Megaphone }
          ]
        },
        {
          title: 'LECTURER WORKSPACE',
          items: [
            { label: 'Academic Event Management', path: '/events', icon: Calendar },
            { label: 'Student Community', path: '/community', icon: Users }
          ]
        },
        {
          title: 'ACCOUNT',
          items: [
            { label: 'Profile', path: `/profile/${user?.id}`, icon: User },
            { label: 'Settings', path: '/settings', icon: Settings }
          ]
        }
      ];
    }

    if (isAuthenticated && (role === 'STUDENT' || role === 'ALUMNI')) {
      return [
        {
          title: 'MAIN MENU',
          items: [
            { label: 'Dashboard', path: role === 'ALUMNI' ? '/dashboard/alumni' : '/dashboard/student', icon: LayoutDashboard },
            { label: 'Community', path: '/community', icon: Users },
            { label: 'Alumni Directory', path: '/alumni', icon: Award },
            { label: 'Events', path: '/events', icon: Calendar },
            { label: 'Careers & Internship', path: '/careers', icon: Briefcase },
            { label: 'Mentorship', path: '/mentorship', icon: Sparkles },
            { label: 'Calendar', path: '/calendar', icon: CalendarDays }
          ]
        },
        {
          title: 'ACCOUNT',
          items: [
            { label: 'Profile', path: role === 'ALUMNI' ? `/alumni/${user?.id}` : `/profile/${user?.id}`, icon: User },
            { label: 'Settings', path: '/settings', icon: Settings }
          ]
        }
      ];
    }

    // Guest navigation
    return [
      {
        title: 'MAIN MENU',
        items: [
          { label: 'Home', path: '/', icon: Home },
          { label: 'Community', path: '/community', icon: Users },
          { label: 'Alumni Directory', path: '/alumni', icon: Award },
          { label: 'Events', path: '/events', icon: Calendar },
          { label: 'Careers & Internship', path: '/careers', icon: Briefcase },
          { label: 'Mentorship', path: '/mentorship', icon: Sparkles },
          { label: 'Calendar', path: '/calendar', icon: CalendarDays }
        ]
      },
      {
        title: 'ACCOUNT',
        items: [
          { label: 'Login', path: '/login', icon: LogIn },
          { label: 'Join CAMPLY', path: '/register', icon: UserPlus }
        ]
      }
    ];
  };

  const sections = getMenuSections();

  return (
    <>
      <SidebarOverlay isOpen={isOpen} onClose={onClose} />

      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            className="fixed top-0 left-0 bottom-0 z-50 w-72 sm:w-80 bg-white dark:bg-[#181A20] border-r border-[#EAEAEA] dark:border-[#2C2F38] shadow-2xl flex flex-col justify-between"
            aria-label="CAMPLY Navigation Sidebar"
          >
            {/* Header */}
            <div className="p-5 border-b border-[#EAEAEA] dark:border-[#2C2F38] flex items-center justify-between">
              <Link to="/" onClick={onClose} className="flex items-center gap-2 rounded-lg transition-transform hover:scale-[1.03]">
                <CamplyMark className="h-9 w-12" />
                <span className="text-lg font-extrabold tracking-[0.12em] text-[#111111] dark:text-[#F5F5F5]">CAMPLY</span>
              </Link>

              <button
                onClick={onClose}
                aria-label="Close navigation sidebar"
                className="p-2 rounded-xl text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-[#20232B] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Links */}
            <div className="flex-1 overflow-y-auto px-4 py-5 flex flex-col gap-6">
              {sections.map((section) => (
                <div key={section.title}>
                  <span className="px-3 text-[10px] font-bold uppercase tracking-wider text-[#929292] block mb-2">
                    {section.title}
                  </span>
                  <nav className="flex flex-col gap-1">
                    {section.items.map((item) => {
                      const Icon = item.icon;
                      const active = isRouteActive(item.path);
                      return (
                        <Link
                          key={`${section.title}-${item.label}`}
                          to={item.path}
                          onClick={onClose}
                          className={cn(
                            'flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all',
                            active
                              ? 'bg-[#111111] dark:bg-[#8B7CFF] text-white dark:text-[#101114] shadow-sm'
                              : 'text-neutral-600 dark:text-neutral-300 hover:bg-[#F8F8F8] dark:hover:bg-[#20232B] hover:text-[#111111] dark:hover:text-white'
                          )}
                        >
                          <Icon
                            className={cn(
                              'w-4 h-4 shrink-0',
                              active ? 'text-[#7865F5] dark:text-[#101114]' : 'text-neutral-400'
                            )}
                          />
                          <span>{item.label}</span>
                        </Link>
                      );
                    })}
                  </nav>
                </div>
              ))}
            </div>

            {/* Footer Authenticated Card */}
            {isAuthenticated && user && (
              <div className="p-4 border-t border-[#EAEAEA] dark:border-[#2C2F38] bg-[#F8F8F8]/60 dark:bg-[#20232B]/50">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    <img
                      src={user.avatar_url}
                      alt={user.full_name}
                      className="w-9 h-9 rounded-xl object-cover border border-[#EAEAEA] dark:border-[#2C2F38] shrink-0"
                    />
                    <div className="overflow-hidden">
                      <p className="text-xs font-bold text-[#111111] dark:text-[#F5F5F5] truncate">
                        {user.full_name}
                      </p>
                      <RoleBadge role={user.role} size="sm" showDot={false} className="mt-0.5" />
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      onClose();
                    }}
                    title="Sign Out"
                    aria-label="Sign Out"
                    className="p-2 rounded-xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};
