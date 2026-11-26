import React, { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import {
  Building2,
  Users,
  Award,
  Briefcase,
  Sparkles,
  Calendar,
  ArrowRight,
  Layers
} from 'lucide-react';
import { FACULTIES_DATA } from '../../data/mockData';
import { useCommunityStore } from '../../store/useCommunityStore';
import { useEventStore } from '../../store/useEventStore';
import { useCareerStore } from '../../store/useCareerStore';
import { RoleBadge } from '../../components/ui/RoleBadge';
import { Button } from '../../components/ui/Button';
import { EventCard } from '../../components/cards/EventCard';
import { JobCard } from '../../components/cards/JobCard';

export const FacultiesPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { members } = useCommunityStore();
  const { events } = useEventStore();
  const { jobs } = useCareerStore();

  const initialCat = searchParams.get('selected') || FACULTIES_DATA[0].category_key;
  const [selectedKey, setSelectedKey] = useState(initialCat);

  useEffect(() => {
    const param = searchParams.get('selected');
    if (param) setSelectedKey(param);
  }, [searchParams]);

  const activeFaculty = useMemo(() => {
    return (
      FACULTIES_DATA.find((f) => f.category_key === selectedKey) || FACULTIES_DATA[0]
    );
  }, [selectedKey]);

  const facultyMembers = useMemo(() => {
    return members.filter(
      (m) => m.faculty?.toLowerCase() === activeFaculty.category_key.toLowerCase()
    );
  }, [members, activeFaculty]);

  const facultyAlumni = useMemo(() => {
    return facultyMembers.filter((m) => m.role === 'ALUMNI');
  }, [facultyMembers]);

  const facultyEvents = useMemo(() => {
    return events.filter(
      (e) => e.faculty?.toLowerCase() === activeFaculty.category_key.toLowerCase()
    );
  }, [events, activeFaculty]);

  const facultyJobs = useMemo(() => {
    return jobs.filter(
      (j) => j.faculty?.toLowerCase() === activeFaculty.category_key.toLowerCase()
    );
  }, [jobs, activeFaculty]);

  const handleSelectFaculty = (categoryKey: string) => {
    setSelectedKey(categoryKey);
    setSearchParams({ selected: categoryKey });
  };

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#7865F5]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#929292]">
              Academic Disciplines
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111111] tracking-tight">
            Explore by Field & Faculty
          </h1>
          <p className="text-sm text-[#929292] mt-1 max-w-2xl">
            Browse campus faculties, academic departments, alumni chapters, and field-specific career openings.
          </p>
        </div>

        <Link to={`/community?faculty=${encodeURIComponent(activeFaculty.category_key)}`}>
          <Button variant="primary" size="md" icon={<ArrowRight className="w-4 h-4" />}>
            Explore {activeFaculty.category_key} in Community
          </Button>
        </Link>
      </div>

      {/* Faculty Selector Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {FACULTIES_DATA.map((fac) => {
          const isActive = fac.category_key === activeFaculty.category_key;
          return (
            <button
              key={fac.id}
              onClick={() => handleSelectFaculty(fac.category_key)}
              className={`text-left rounded-3xl p-5 border transition-all duration-200 flex flex-col justify-between ${
                isActive
                  ? 'bg-[#111111] text-white border-[#111111] shadow-lg'
                  : 'bg-white text-[#111111] border-[#EAEAEA] hover:border-neutral-300 hover:shadow-md'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-extrabold"
                    style={{ backgroundColor: fac.accent_color }}
                  >
                    {fac.short_name}
                  </span>
                  <span
                    className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
                      isActive ? 'bg-white/15 text-white' : 'bg-[#F8F8F8] text-neutral-600'
                    }`}
                  >
                    {fac.departments.length} Departments
                  </span>
                </div>
                <h3 className="font-bold text-base leading-snug">{fac.name}</h3>
                <p
                  className={`text-xs mt-1.5 line-clamp-2 leading-relaxed ${
                    isActive ? 'text-neutral-300' : 'text-[#929292]'
                  }`}
                >
                  {fac.description}
                </p>
              </div>

              <div
                className={`mt-4 pt-3 border-t flex items-center justify-between text-[11px] font-medium ${
                  isActive ? 'border-white/15 text-neutral-300' : 'border-neutral-100 text-neutral-500'
                }`}
              >
                <span className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" /> {fac.member_count.toLocaleString()}
                </span>
                <span className="flex items-center gap-1">
                  <Award className="w-3.5 h-3.5" /> {fac.alumni_count} alumni
                </span>
                <span className="flex items-center gap-1">
                  <Briefcase className="w-3.5 h-3.5" /> {fac.career_count} jobs
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Faculty Spotlight Panel */}
      <div className="bg-white rounded-3xl border border-[#EAEAEA] p-6 sm:p-8 shadow-xs flex flex-col gap-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-neutral-100">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <Building2 className="w-4 h-4 text-[#7865F5]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#7865F5]">
                Selected Faculty Overview
              </span>
            </div>
            <h2 className="text-2xl font-extrabold text-[#111111]">{activeFaculty.name}</h2>
            <p className="text-sm text-neutral-500 mt-1 max-w-2xl">{activeFaculty.description}</p>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <div className="px-4 py-2.5 rounded-2xl bg-[#F8F8F8] border border-[#EAEAEA] text-center">
              <div className="text-lg font-extrabold text-[#111111]">{activeFaculty.member_count.toLocaleString()}</div>
              <div className="text-[10px] font-semibold uppercase text-[#929292]">Members</div>
            </div>
            <div className="px-4 py-2.5 rounded-2xl bg-[#F8F8F8] border border-[#EAEAEA] text-center">
              <div className="text-lg font-extrabold text-[#7865F5]">{activeFaculty.alumni_count}</div>
              <div className="text-[10px] font-semibold uppercase text-[#929292]">Alumni</div>
            </div>
            <div className="px-4 py-2.5 rounded-2xl bg-[#F8F8F8] border border-[#EAEAEA] text-center">
              <div className="text-lg font-extrabold text-[#16A36A]">{activeFaculty.career_count}</div>
              <div className="text-[10px] font-semibold uppercase text-[#929292]">Careers</div>
            </div>
          </div>
        </div>

        {/* Departments & Featured Communities */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 rounded-2xl bg-[#F8F8F8] border border-[#EAEAEA]">
            <h4 className="font-bold text-sm text-[#111111] mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#7865F5]" />
              <span>Academic Departments</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {activeFaculty.departments.map((dept, i) => (
                <span
                  key={i}
                  className="text-xs font-semibold bg-white border border-[#EAEAEA] text-[#111111] px-3 py-1.5 rounded-xl"
                >
                  {dept}
                </span>
              ))}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#F8F8F8] border border-[#EAEAEA]">
            <h4 className="font-bold text-sm text-[#111111] mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#7865F5]" />
              <span>Featured Student & Alumni Communities</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {activeFaculty.featured_communities.map((comm, i) => (
                <span
                  key={i}
                  className="text-xs font-semibold bg-purple-50 border border-purple-100 text-[#7865F5] px-3 py-1.5 rounded-xl"
                >
                  {comm}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Faculty Members & Alumni */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-extrabold text-[#111111]">
              Members & Alumni in {activeFaculty.category_key} ({facultyMembers.length})
            </h3>
            <Link
              to={`/community?faculty=${encodeURIComponent(activeFaculty.category_key)}`}
              className="text-xs font-bold text-[#7865F5] hover:underline"
            >
              View in Explore Community →
            </Link>
          </div>

          {facultyMembers.length === 0 ? (
            <div className="p-6 rounded-2xl bg-[#F8F8F8] border border-[#EAEAEA] text-xs text-neutral-500">
              No featured profiles in our current snapshot for this faculty yet. Check Explore Community to invite peers!
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {facultyMembers.map((member) => (
                <Link
                  key={member.id}
                  to={member.role === 'ALUMNI' ? `/alumni/${member.id}` : `/profile/${member.id}`}
                  className="p-4 rounded-2xl border border-[#EAEAEA] hover:border-neutral-300 hover:shadow-sm transition-all flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <img
                      src={member.avatar_url}
                      alt={member.full_name}
                      className="w-11 h-11 rounded-xl object-cover shrink-0"
                    />
                    <div className="overflow-hidden">
                      <h5 className="font-bold text-xs text-[#111111] truncate">{member.full_name}</h5>
                      <p className="text-[11px] text-[#929292] truncate">{member.headline}</p>
                    </div>
                  </div>
                  <RoleBadge role={member.role} size="sm" showDot={false} />
                </Link>
              ))}
            </div>
          )}
          {facultyAlumni.length > 0 && (
            <p className="text-[11px] text-[#929292] mt-2">
              Includes {facultyAlumni.length} featured alumni mentor{facultyAlumni.length > 1 ? 's' : ''} active in {activeFaculty.category_key}.
            </p>
          )}
        </div>

        {/* Related Events */}
        <div>
          <h3 className="text-base font-extrabold text-[#111111] mb-4 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#7865F5]" />
            <span>Related Campus Events ({facultyEvents.length})</span>
          </h3>
          {facultyEvents.length === 0 ? (
            <p className="text-xs text-[#929292]">No upcoming events specifically tagged under {activeFaculty.category_key}.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {facultyEvents.map((ev) => (
                <EventCard
                  key={ev.id}
                  event={ev}
                  onSelect={(e) => navigate(`/events/${e.id}`)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Related Career Opportunities */}
        <div>
          <h3 className="text-base font-extrabold text-[#111111] mb-4 flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-amber-500" />
            <span>Relevant Career Opportunities ({facultyJobs.length})</span>
          </h3>
          {facultyJobs.length === 0 ? (
            <p className="text-xs text-[#929292]">No open roles tagged exclusively for {activeFaculty.category_key} right now. Browse Careers for all disciplines.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {facultyJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
