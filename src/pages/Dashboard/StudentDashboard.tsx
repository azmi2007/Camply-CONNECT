import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { useEventStore } from '../../store/useEventStore';
import { useCareerStore } from '../../store/useCareerStore';
import { useCommunityStore } from '../../store/useCommunityStore';
import { RoleBadge } from '../../components/ui/RoleBadge';
import { Button } from '../../components/ui/Button';
import { 
  Calendar, 
  Briefcase, 
  Users, 
  Sparkles, 
  Bookmark, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  GraduationCap 
} from 'lucide-react';
import { formatDate } from '../../lib/utils';

export const StudentDashboard: React.FC = () => {
  const { user } = useAuthStore();
  const { events } = useEventStore();
  const { jobs } = useCareerStore();
  const { members } = useCommunityStore();

  const registeredEvents = events.filter((e) => e.is_registered);
  const savedJobs = jobs.filter((j) => j.is_saved);
  const recommendedMentors = members.filter((m) => m.is_mentor_available).slice(0, 2);

  return (
    <div className="flex flex-col gap-8">
      {/* Top Welcome Banner */}
      <div className="bg-white rounded-3xl border border-[#EAEAEA] p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={user?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=256'}
            alt="User avatar"
            className="w-16 h-16 rounded-2xl object-cover border border-neutral-200"
          />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-extrabold text-[#111111] tracking-tight">
                Welcome back, {user?.full_name?.split(' ')[0] || 'Student'}! 👋
              </h2>
              <RoleBadge role="STUDENT" size="sm" />
            </div>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1">
              {user?.major || 'Informatics Engineering'} • Class of {user?.expected_graduation_year || 2027} • {user?.university}
            </p>
          </div>
        </div>

        {/* Profile Completion Card */}
        <div className="bg-neutral-50 rounded-2xl p-4 border border-neutral-100 min-w-[240px]">
          <div className="flex items-center justify-between text-xs mb-1.5 font-bold">
            <span className="text-neutral-700">Profile Completion</span>
            <span className="text-[#7865F5]">85%</span>
          </div>
          <div className="w-full h-2 bg-neutral-200 rounded-full overflow-hidden">
            <div className="w-[85%] h-full bg-[#7865F5] rounded-full" />
          </div>
          <p className="text-[11px] text-neutral-400 mt-2">Add your portfolio URL to reach 100%</p>
        </div>
      </div>

      {/* Grid: Events & Opportunities */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Registered Events & Recommended Jobs */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          
          {/* Registered Campus Events */}
          <div className="bg-white rounded-3xl border border-[#EAEAEA] p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#7865F5]" />
                <h3 className="font-bold text-neutral-900 text-base">Your Registered Events</h3>
              </div>
              <Link to="/events" className="text-xs font-semibold text-[#7865F5] hover:underline">
                Browse More
              </Link>
            </div>

            {registeredEvents.length === 0 ? (
              <p className="text-xs text-neutral-400 py-4">No events registered yet.</p>
            ) : (
              <div className="flex flex-col gap-3">
                {registeredEvents.map((ev) => (
                  <div
                    key={ev.id}
                    className="p-4 rounded-2xl bg-neutral-50 border border-neutral-100 flex items-center justify-between gap-4"
                  >
                    <div>
                      <span className="text-[10px] font-bold text-[#7865F5] bg-purple-50 px-2 py-0.5 rounded-md uppercase">
                        {ev.category}
                      </span>
                      <h4 className="font-bold text-neutral-900 text-sm mt-1">{ev.title}</h4>
                      <p className="text-xs text-neutral-400 flex items-center gap-2 mt-1">
                        <span>{formatDate(ev.event_date)}</span>
                        <span>•</span>
                        <span>{ev.location}</span>
                      </p>
                    </div>
                    <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full shrink-0">
                      Confirmed ✓
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recommended Jobs & Internships */}
          <div className="bg-white rounded-3xl border border-[#EAEAEA] p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-amber-500" />
                <h3 className="font-bold text-neutral-900 text-base">Recommended Internships</h3>
              </div>
              <Link to="/careers" className="text-xs font-semibold text-[#7865F5] hover:underline">
                View All Vacancies
              </Link>
            </div>

            <div className="flex flex-col gap-3">
              {jobs.slice(0, 3).map((job) => (
                <div
                  key={job.id}
                  className="p-4 rounded-2xl border border-neutral-100 hover:border-neutral-300 transition-colors flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={job.company.logo_url}
                      alt={job.company.name}
                      className="w-10 h-10 rounded-xl object-cover border border-neutral-200"
                    />
                    <div>
                      <h4 className="font-bold text-neutral-900 text-sm">{job.title}</h4>
                      <p className="text-xs text-neutral-500">
                        {job.company.name} • {job.employment_type} • {job.salary_range}
                      </p>
                    </div>
                  </div>
                  <Link to="/careers">
                    <Button variant="secondary" size="sm">
                      Apply
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Recommended Mentors & Quick Links */}
        <div className="lg:col-span-4 flex flex-col gap-8">
          
          {/* Alumni Mentors for You */}
          <div className="bg-white rounded-3xl border border-[#EAEAEA] p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#7865F5]" />
                <h3 className="font-bold text-neutral-900 text-base">Recommended Mentors</h3>
              </div>
              <Link to="/mentorship" className="text-xs font-semibold text-[#7865F5] hover:underline">
                Explore
              </Link>
            </div>

            <div className="flex flex-col gap-4">
              {recommendedMentors.map((mentor) => (
                <div key={mentor.id} className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-100">
                  <div className="flex items-center gap-3 mb-2">
                    <img
                      src={mentor.avatar_url}
                      alt={mentor.full_name}
                      className="w-10 h-10 rounded-xl object-cover"
                    />
                    <div>
                      <h5 className="font-bold text-neutral-900 text-xs">{mentor.full_name}</h5>
                      <p className="text-[11px] text-neutral-400">{mentor.headline}</p>
                    </div>
                  </div>
                  <Link to="/mentorship">
                    <button className="w-full mt-2 py-1.5 rounded-lg text-xs font-semibold bg-white border border-neutral-200 text-neutral-800 hover:border-neutral-300">
                      Request Mentorship
                    </button>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Saved Opportunities */}
          <div className="bg-white rounded-3xl border border-[#EAEAEA] p-6 shadow-xs">
            <div className="flex items-center gap-2 mb-3">
              <Bookmark className="w-4 h-4 text-neutral-500" />
              <h3 className="font-bold text-neutral-900 text-base">Saved Opportunities</h3>
            </div>
            <p className="text-xs text-neutral-500 mb-3">
              You have {savedJobs.length} saved jobs in your career tracker.
            </p>
            <Link to="/careers">
              <Button variant="outline" size="sm" className="w-full">
                Review Saved Vacancies
              </Button>
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
};

