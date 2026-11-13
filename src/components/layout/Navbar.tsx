import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Search, 
  Bell, 
  Menu, 
  X, 
  ChevronDown, 
  LayoutDashboard, 
  LogOut, 
  UserCheck, 
  ShieldCheck, 
  Sparkles,
  CalendarDays
} from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { RoleBadge } from '../ui/RoleBadge';
import { Button } from '../ui/Button';
import { UserRole } from '../../types';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, activeRole, logout, switchDemoRole } = useAuthStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [roleSwitcherOpen, setRoleSwitcherOpen] = useState(false);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Community', path: '/community' },
    { label: 'Events', path: '/events' },
    { label: 'Careers', path: '/careers' },
    { label: 'Alumni', path: '/alumni' },
    { label: 'Mentorship', path: '/mentorship' }
  ];

  const handleRoleSwitch = (role: UserRole) => {
    switchDemoRole(role);
    setRoleSwitcherOpen(false);
    setProfileDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#F8F8F8]/80 backdrop-blur-md border-b border-[#EAEAEA] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Left: Brand Logo */}
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-2xl bg-[#111111] flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
              <svg className="w-5 h-5 text-[#7865F5]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19L12 5L20 19" />
                <circle cx="4" cy="19" r="2" fill="#7865F5" />
                <circle cx="12" cy="5" r="2" fill="#FFFFFF" />
                <circle cx="20" cy="19" r="2" fill="#7865F5" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-tight text-[#111111] leading-none">
                CAMPLY<span className="text-[#7865F5]">.</span>
              </span>
              <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold mt-0.5">
                Campus Ecosystem
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-white text-neutral-900 border border-neutral-200/80 shadow-xs'
                      : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100/60'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Demo Role Switcher Quick Pill */}
          <div className="relative">
            <button
              onClick={() => setRoleSwitcherOpen(!roleSwitcherOpen)}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-neutral-200 text-xs font-medium text-neutral-700 hover:border-neutral-300 shadow-xs"
              title="Click to quickly test other roles (Student, Alumni, Lecturer, Admin)"
            >
              <span className="text-neutral-400 text-[11px]">Role:</span>
              <RoleBadge role={activeRole} size="sm" />
              <ChevronDown className="w-3 h-3 text-neutral-400" />
            </button>

            {roleSwitcherOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-neutral-100 py-2 z-50 animate-in fade-in zoom-in-95">
                <div className="px-3.5 py-1.5 text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                  Test Experience As:
                </div>
                {(['STUDENT', 'ALUMNI', 'LECTURER', 'ADMIN'] as UserRole[]).map((r) => (
                  <button
                    key={r}
                    onClick={() => handleRoleSwitch(r)}
                    className={`w-full px-3.5 py-2 text-left text-xs flex items-center justify-between hover:bg-neutral-50 transition-colors ${
                      activeRole === r ? 'font-bold bg-neutral-50/80' : 'text-neutral-700'
                    }`}
                  >
                    <RoleBadge role={r} size="sm" />
                    {activeRole === r && <span className="text-[#7865F5] text-xs">Active</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick Dashboard link */}
          {isAuthenticated && (
            <Link
              to="/dashboard"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white border border-neutral-200 text-neutral-800 hover:border-neutral-300 shadow-xs transition-colors"
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-neutral-500" />
              <span>Dashboard</span>
            </Link>
          )}

          {/* User profile or Auth buttons */}
          {isAuthenticated && user ? (
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2 p-1 rounded-full border border-neutral-200 hover:border-neutral-300 transition-colors bg-white shadow-xs"
                aria-label="User profile menu"
              >
                <img
                  src={user.avatar_url}
                  alt={user.full_name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <ChevronDown className="w-3 h-3 text-neutral-400 pr-1" />
              </button>

              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-neutral-100 p-3 z-50">
                  <div className="flex items-center gap-3 p-2 border-b border-neutral-100 pb-3 mb-2">
                    <img
                      src={user.avatar_url}
                      alt={user.full_name}
                      className="w-10 h-10 rounded-xl object-cover"
                    />
                    <div className="overflow-hidden">
                      <h5 className="font-bold text-neutral-900 text-xs truncate">
                        {user.full_name}
                      </h5>
                      <p className="text-[11px] text-neutral-400 truncate">{user.email}</p>
                      <RoleBadge role={user.role} size="sm" className="mt-1" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1 text-xs">
                    <Link
                      to="/dashboard"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-neutral-700 hover:bg-neutral-50 transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4 text-neutral-400" />
                      <span>Role Dashboard</span>
                    </Link>

                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        setRoleSwitcherOpen(true);
                      }}
                      className="flex items-center justify-between px-3 py-2 rounded-xl text-neutral-700 hover:bg-neutral-50 transition-colors w-full text-left"
                    >
                      <span className="flex items-center gap-2">
                        <UserCheck className="w-4 h-4 text-neutral-400" />
                        <span>Switch Role Demo</span>
                      </span>
                      <RoleBadge role={activeRole} size="sm" showDot={false} />
                    </button>

                    <button
                      onClick={() => {
                        logout();
                        setProfileDropdownOpen(false);
                        navigate('/login');
                      }}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-rose-600 hover:bg-rose-50 transition-colors w-full text-left font-medium mt-1 border-t border-neutral-100 pt-2"
                    >
                      <LogOut className="w-4 h-4 text-rose-500" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  Log in
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="primary" size="sm">
                  Get Started
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-neutral-700 hover:bg-neutral-100"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-neutral-200 px-4 pt-3 pb-6 flex flex-col gap-3 shadow-lg">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2 rounded-xl text-sm font-semibold ${
                  location.pathname === link.path
                    ? 'bg-[#111111] text-white'
                    : 'text-neutral-700 hover:bg-neutral-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-neutral-100 flex flex-col gap-2">
            <div className="text-xs font-semibold text-neutral-400 px-3">Switch Demo Role:</div>
            <div className="grid grid-cols-2 gap-1.5 px-2">
              {(['STUDENT', 'ALUMNI', 'LECTURER', 'ADMIN'] as UserRole[]).map((r) => (
                <button
                  key={r}
                  onClick={() => {
                    handleRoleSwitch(r);
                    setMobileMenuOpen(false);
                  }}
                  className={`px-3 py-2 rounded-xl text-xs flex items-center justify-between border ${
                    activeRole === r
                      ? 'border-[#7865F5] bg-purple-50/50'
                      : 'border-neutral-200 bg-white'
                  }`}
                >
                  <RoleBadge role={r} size="sm" showDot={false} />
                  {activeRole === r && <span className="text-[10px] text-[#7865F5]">✓</span>}
                </button>
              ))}
            </div>

            {isAuthenticated ? (
              <Link
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 w-full text-center py-2.5 rounded-full bg-[#111111] text-white text-xs font-semibold"
              >
                Go to Role Dashboard
              </Link>
            ) : (
              <div className="flex items-center gap-2 pt-2">
                <Link to="/login" className="flex-1" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="secondary" size="md" className="w-full">
                    Log in
                  </Button>
                </Link>
                <Link to="/register" className="flex-1" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="primary" size="md" className="w-full">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

