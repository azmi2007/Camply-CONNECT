import React, { useState, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Search,
  CalendarDays,
  Briefcase,
  Users,
  Building2
} from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { useCommunityStore } from '../../store/useCommunityStore';
import { useEventStore } from '../../store/useEventStore';
import { useCareerStore } from '../../store/useCareerStore';
import { FACULTIES_DATA } from '../../data/mockData';
import { RoleBadge } from '../ui/RoleBadge';
import { Button } from '../ui/Button';
import { CamplyMark } from '../ui/CamplyMark';
import { Modal } from '../ui/Modal';
import { ThemeToggle } from '../../features/theme/ThemeToggle';
import { LogoSidebar } from '../../features/navigation/LogoSidebar';
import { NotificationDropdown } from './NotificationDropdown';
import { UserProfileDropdown } from './UserProfileDropdown';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated } = useAuthStore();
  const { members } = useCommunityStore();
  const { events } = useEventStore();
  const { jobs } = useCareerStore();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [globalQuery, setGlobalQuery] = useState('');
  const isAuthenticationPage = location.pathname === '/login' || location.pathname === '/register';

  const searchResults = useMemo(() => {
    const q = globalQuery.trim().toLowerCase();
    if (!q) {
      return {
        members: members.slice(0, 3),
        events: events.slice(0, 2),
        jobs: jobs.slice(0, 2),
        faculties: FACULTIES_DATA.slice(0, 2)
      };
    }
    return {
      members: members
        .filter(
          (m) =>
            m.full_name.toLowerCase().includes(q) ||
            (m.headline && m.headline.toLowerCase().includes(q)) ||
            (m.faculty && m.faculty.toLowerCase().includes(q)) ||
            (m.current_company && m.current_company.toLowerCase().includes(q))
        )
        .slice(0, 4),
      events: events
        .filter(
          (ev) =>
            ev.title.toLowerCase().includes(q) ||
            ev.category.toLowerCase().includes(q) ||
            ev.location.toLowerCase().includes(q)
        )
        .slice(0, 3),
      jobs: jobs
        .filter(
          (j) =>
            j.title.toLowerCase().includes(q) ||
            j.company.name.toLowerCase().includes(q)
        )
        .slice(0, 3),
      faculties: FACULTIES_DATA.filter(
        (f) =>
          f.name.toLowerCase().includes(q) ||
          f.category_key.toLowerCase().includes(q)
      ).slice(0, 3)
    };
  }, [globalQuery, members, events, jobs]);

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/85 dark:bg-[#181A20]/90 backdrop-blur-md border-b border-[#EAEAEA] dark:border-[#2C2F38] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
          {/* LEFT: Brand mark trigger for Sidebar */}
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="group -ml-1 flex items-center gap-2 rounded-xl p-1 transition-colors hover:bg-neutral-100/70 dark:hover:bg-[#20232B]"
            aria-label="Open CAMPLY navigation sidebar"
          >
            <CamplyMark className="h-10 w-[53px] transition-transform duration-200 group-hover:scale-[1.04]" />
            <span className="text-lg font-extrabold tracking-[0.12em] text-[#111111] dark:text-[#F5F5F5]">CAMPLY</span>
          </button>

          {/* RIGHT: Search, Notifications, Theme Toggle, User Profile / Login */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {!isAuthenticationPage && (
              <>
                {/* Search Button */}
                <button
                  onClick={() => setSearchOpen(true)}
                  aria-label="Global Search"
                  className="flex items-center gap-2 px-3 py-2 rounded-full bg-[#F8F8F8] dark:bg-[#20232B] border border-[#EAEAEA] dark:border-[#2C2F38] text-neutral-500 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:border-neutral-300 transition-colors text-xs"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span className="hidden md:inline text-[#929292]">Search campus...</span>
                </button>

                {/* Notifications */}
                <NotificationDropdown />
              </>
            )}

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* User Profile or Auth CTAs */}
            {isAuthenticated && user ? (
              <UserProfileDropdown />
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link to="/register" className="hidden sm:inline-block">
                  <Button variant="primary" size="sm">
                    Join CAMPLY
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Logo-Triggered Navigation Sidebar */}
      <LogoSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Global Campus Search Modal */}
      <Modal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        title="Search CAMPLY Ecosystem"
        description="Find students, alumni, campus events, career openings, or faculties."
        maxWidth="lg"
      >
        <div className="flex flex-col gap-5">
          <div className="relative">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              autoFocus
              value={globalQuery}
              onChange={(e) => setGlobalQuery(e.target.value)}
              placeholder="Type a name, company (Stripe, Google), event, or faculty..."
              className="w-full text-sm pl-10 pr-4 py-3 rounded-xl border border-[#EAEAEA] dark:border-[#2C2F38] focus:outline-none focus:border-[#7865F5] bg-[#F8F8F8] dark:bg-[#20232B]"
            />
          </div>

          <div className="flex flex-col gap-4 max-h-96 overflow-y-auto">
            {searchResults.members.length > 0 && (
              <div>
                <h5 className="text-[11px] font-bold uppercase tracking-wider text-[#929292] mb-2 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" /> People & Alumni
                </h5>
                <div className="flex flex-col gap-1.5">
                  {searchResults.members.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => {
                        setSearchOpen(false);
                        navigate(m.role === 'ALUMNI' ? `/alumni/${m.id}` : `/profile/${m.id}`);
                      }}
                      className="flex items-center justify-between p-2.5 rounded-xl hover:bg-neutral-50 dark:hover:bg-[#20232B] border border-transparent hover:border-[#EAEAEA] dark:hover:border-[#2C2F38] transition-all text-left"
                    >
                      <div className="flex items-center gap-3">
                        <img src={m.avatar_url} alt={m.full_name} className="w-8 h-8 rounded-xl object-cover" />
                        <div>
                          <div className="text-xs font-bold text-[#111111] dark:text-[#F5F5F5]">{m.full_name}</div>
                          <div className="text-[11px] text-[#929292]">{m.headline}</div>
                        </div>
                      </div>
                      <RoleBadge role={m.role} size="sm" showDot={false} />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {searchResults.events.length > 0 && (
              <div>
                <h5 className="text-[11px] font-bold uppercase tracking-wider text-[#929292] mb-2 flex items-center gap-1.5">
                  <CalendarDays className="w-3.5 h-3.5" /> Campus Events
                </h5>
                <div className="flex flex-col gap-1.5">
                  {searchResults.events.map((ev) => (
                    <button
                      key={ev.id}
                      onClick={() => {
                        setSearchOpen(false);
                        navigate(`/events/${ev.id}`);
                      }}
                      className="flex items-center justify-between p-2.5 rounded-xl hover:bg-neutral-50 dark:hover:bg-[#20232B] border border-transparent hover:border-[#EAEAEA] dark:hover:border-[#2C2F38] transition-all text-left"
                    >
                      <div>
                        <div className="text-xs font-bold text-[#111111] dark:text-[#F5F5F5]">{ev.title}</div>
                        <div className="text-[11px] text-[#929292]">{ev.event_date} • {ev.location}</div>
                      </div>
                      <span className="text-[10px] font-semibold bg-neutral-100 dark:bg-[#20232B] px-2 py-0.5 rounded-full text-neutral-700 dark:text-neutral-300">
                        {ev.category}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {searchResults.jobs.length > 0 && (
              <div>
                <h5 className="text-[11px] font-bold uppercase tracking-wider text-[#929292] mb-2 flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5" /> Career Opportunities
                </h5>
                <div className="flex flex-col gap-1.5">
                  {searchResults.jobs.map((j) => (
                    <button
                      key={j.id}
                      onClick={() => {
                        setSearchOpen(false);
                        navigate('/careers');
                      }}
                      className="flex items-center justify-between p-2.5 rounded-xl hover:bg-neutral-50 dark:hover:bg-[#20232B] border border-transparent hover:border-[#EAEAEA] dark:hover:border-[#2C2F38] transition-all text-left"
                    >
                      <div>
                        <div className="text-xs font-bold text-[#111111] dark:text-[#F5F5F5]">{j.title}</div>
                        <div className="text-[11px] text-[#929292]">{j.company.name} • {j.location}</div>
                      </div>
                      <span className="text-[10px] font-semibold bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full">
                        {j.employment_type}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {searchResults.faculties.length > 0 && (
              <div>
                <h5 className="text-[11px] font-bold uppercase tracking-wider text-[#929292] mb-2 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5" /> Faculties & Fields
                </h5>
                <div className="flex flex-col gap-1.5">
                  {searchResults.faculties.map((f) => (
                    <button
                      key={f.id}
                      onClick={() => {
                        setSearchOpen(false);
                        navigate(`/faculties?selected=${encodeURIComponent(f.category_key)}`);
                      }}
                      className="flex items-center justify-between p-2.5 rounded-xl hover:bg-neutral-50 dark:hover:bg-[#20232B] border border-transparent hover:border-[#EAEAEA] dark:hover:border-[#2C2F38] transition-all text-left"
                    >
                      <div>
                        <div className="text-xs font-bold text-[#111111] dark:text-[#F5F5F5]">{f.name}</div>
                        <div className="text-[11px] text-[#929292]">{f.member_count.toLocaleString()} members • {f.alumni_count} alumni</div>
                      </div>
                      <span className="text-[11px] font-semibold text-[#7865F5]">Explore →</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};
