import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { useCommunityStore } from '../../store/useCommunityStore';
import { RoleBadge } from '../../components/ui/RoleBadge';
import { Button } from '../../components/ui/Button';
import { UserRole } from '../../types';
import {
  Search,
  UserPlus,
  Check,
  Briefcase,
  Sparkles,
  X,
  Users,
  Building2
} from 'lucide-react';
import confetti from 'canvas-confetti';

type CommunityTab = 'All' | 'STUDENT' | 'ALUMNI' | 'LECTURER' | 'INNOVATORS';

export const CommunityPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { members, sentRequestIds, connectedIds, sendConnectionRequest } = useCommunityStore();

  const initialFaculty = searchParams.get('faculty') || 'All';

  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<CommunityTab>('All');
  const [facultyFilter, setFacultyFilter] = useState(initialFaculty);
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [interestFilter, setInterestFilter] = useState('All');
  const [industryFilter, setIndustryFilter] = useState('All');
  const [yearFilter, setYearFilter] = useState('All');

  useEffect(() => {
    const paramFac = searchParams.get('faculty');
    if (paramFac) setFacultyFilter(paramFac);
  }, [searchParams]);

  const faculties = useMemo(() => {
    const set = new Set<string>(['All', 'Computer Science', 'Engineering', 'Business & Management', 'Communication', 'Design & Creative', 'Medicine & Health', 'Law', 'Economics', 'Social Sciences']);
    members.forEach((m) => m.faculty && set.add(m.faculty));
    return Array.from(set);
  }, [members]);

  const departments = useMemo(() => {
    const set = new Set<string>(['All']);
    members.forEach((m) => {
      if (m.major) set.add(m.major);
      if (m.department) set.add(m.department);
    });
    return Array.from(set);
  }, [members]);

  const interests = useMemo(() => {
    const set = new Set<string>(['All']);
    members.forEach((m) => m.interests?.forEach((int) => set.add(int)));
    return Array.from(set);
  }, [members]);

  const industries = useMemo(() => {
    const set = new Set<string>(['All']);
    members.forEach((m) => m.industry && set.add(m.industry));
    return Array.from(set);
  }, [members]);

  const years = useMemo(() => {
    const set = new Set<string>(['All']);
    members.forEach((m) => {
      if (m.graduation_year) set.add(String(m.graduation_year));
      if (m.expected_graduation_year) set.add(String(m.expected_graduation_year));
    });
    return Array.from(set).sort();
  }, [members]);

  const filteredMembers = useMemo(() => {
    return members.filter((member) => {
      const q = search.trim().toLowerCase();
      const matchesSearch =
        !q ||
        member.full_name.toLowerCase().includes(q) ||
        (member.headline && member.headline.toLowerCase().includes(q)) ||
        (member.current_company && member.current_company.toLowerCase().includes(q)) ||
        (member.major && member.major.toLowerCase().includes(q)) ||
        (member.skills && member.skills.some((s) => s.toLowerCase().includes(q)));

      const matchesTab =
        activeTab === 'All'
          ? true
          : activeTab === 'INNOVATORS'
          ? Boolean(member.is_innovator)
          : member.role === (activeTab as UserRole);

      const matchesFaculty =
        facultyFilter === 'All' ||
        member.faculty?.toLowerCase() === facultyFilter.toLowerCase();

      const matchesDept =
        departmentFilter === 'All' ||
        member.major === departmentFilter ||
        member.department === departmentFilter;

      const matchesInterest =
        interestFilter === 'All' ||
        (member.interests && member.interests.includes(interestFilter));

      const matchesIndustry =
        industryFilter === 'All' || member.industry === industryFilter;

      const memberYear = String(member.graduation_year || member.expected_graduation_year || '');
      const matchesYear = yearFilter === 'All' || memberYear === yearFilter;

      return (
        matchesSearch &&
        matchesTab &&
        matchesFaculty &&
        matchesDept &&
        matchesInterest &&
        matchesIndustry &&
        matchesYear
      );
    });
  }, [members, search, activeTab, facultyFilter, departmentFilter, interestFilter, industryFilter, yearFilter]);

  const activeFilters: { label: string; clear: () => void }[] = [];
  if (facultyFilter !== 'All') activeFilters.push({ label: `Faculty: ${facultyFilter}`, clear: () => { setFacultyFilter('All'); setSearchParams({}); } });
  if (departmentFilter !== 'All') activeFilters.push({ label: `Dept: ${departmentFilter}`, clear: () => setDepartmentFilter('All') });
  if (interestFilter !== 'All') activeFilters.push({ label: `Interest: ${interestFilter}`, clear: () => setInterestFilter('All') });
  if (industryFilter !== 'All') activeFilters.push({ label: `Field: ${industryFilter}`, clear: () => setIndustryFilter('All') });
  if (yearFilter !== 'All') activeFilters.push({ label: `Class: ${yearFilter}`, clear: () => setYearFilter('All') });
  if (search.trim()) activeFilters.push({ label: `Query: "${search}"`, clear: () => setSearch('') });

  const clearAllFilters = () => {
    setSearch('');
    setActiveTab('All');
    setFacultyFilter('All');
    setDepartmentFilter('All');
    setInterestFilter('All');
    setIndustryFilter('All');
    setYearFilter('All');
    setSearchParams({});
  };

  const handleConnect = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    sendConnectionRequest(id);
    confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
  };

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#7865F5]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#929292]">
              University Network
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111111] tracking-tight">
            Explore Campus Community
          </h1>
          <p className="text-sm text-[#929292] mt-1 max-w-2xl">
            Discover and connect with students, alumni mentors, lecturers, and campus innovators across every faculty.
          </p>
        </div>

        <Link to="/faculties">
          <Button variant="secondary" size="md" icon={<Building2 className="w-4 h-4" />}>
            Explore by Faculty
          </Button>
        </Link>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-4">
        {[
          { key: 'All', label: 'All Members' },
          { key: 'STUDENT', label: 'Students' },
          { key: 'ALUMNI', label: 'Alumni' },
          { key: 'LECTURER', label: 'Lecturers' },
          { key: 'INNOVATORS', label: 'Campus Innovators' }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as CommunityTab)}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
              activeTab === tab.key
                ? 'bg-[#111111] text-white border-[#111111] shadow-xs'
                : 'bg-white text-neutral-600 border-[#EAEAEA] hover:border-neutral-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search & Multi-Filters Bar */}
      <div className="bg-white rounded-3xl border border-[#EAEAEA] p-4 sm:p-5 mb-6 shadow-xs flex flex-col gap-4">
        <div className="relative">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search community members by name, company, skill, or major..."
            className="w-full text-xs sm:text-sm pl-10 pr-4 py-2.5 rounded-xl border border-[#EAEAEA] focus:outline-none focus:border-[#7865F5] bg-[#F8F8F8]"
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          <select
            aria-label="Filter by faculty"
            value={facultyFilter}
            onChange={(e) => setFacultyFilter(e.target.value)}
            className="text-xs px-3 py-2 rounded-xl border border-[#EAEAEA] focus:outline-none focus:border-[#7865F5] bg-white font-medium"
          >
            {faculties.map((f) => (
              <option key={f} value={f}>
                {f === 'All' ? 'All Faculties' : f}
              </option>
            ))}
          </select>

          <select
            aria-label="Filter by department"
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="text-xs px-3 py-2 rounded-xl border border-[#EAEAEA] focus:outline-none focus:border-[#7865F5] bg-white font-medium"
          >
            {departments.map((d) => (
              <option key={d} value={d}>
                {d === 'All' ? 'All Departments / Majors' : d}
              </option>
            ))}
          </select>

          <select
            aria-label="Filter by interests"
            value={interestFilter}
            onChange={(e) => setInterestFilter(e.target.value)}
            className="text-xs px-3 py-2 rounded-xl border border-[#EAEAEA] focus:outline-none focus:border-[#7865F5] bg-white font-medium"
          >
            {interests.map((i) => (
              <option key={i} value={i}>
                {i === 'All' ? 'All Interests' : i}
              </option>
            ))}
          </select>

          <select
            aria-label="Filter by professional field"
            value={industryFilter}
            onChange={(e) => setIndustryFilter(e.target.value)}
            className="text-xs px-3 py-2 rounded-xl border border-[#EAEAEA] focus:outline-none focus:border-[#7865F5] bg-white font-medium"
          >
            {industries.map((ind) => (
              <option key={ind} value={ind}>
                {ind === 'All' ? 'All Professional Fields' : ind}
              </option>
            ))}
          </select>

          <select
            aria-label="Filter by graduation year"
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
            className="text-xs px-3 py-2 rounded-xl border border-[#EAEAEA] focus:outline-none focus:border-[#7865F5] bg-white font-medium"
          >
            {years.map((y) => (
              <option key={y} value={y}>
                {y === 'All' ? 'All Graduation Years' : `Class of ${y}`}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Active Filter Indicators & Result Count */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-[#111111]">
            Showing {filteredMembers.length} member{filteredMembers.length === 1 ? '' : 's'}
          </span>

          {activeFilters.map((f, idx) => (
            <button
              key={idx}
              onClick={f.clear}
              className="inline-flex items-center gap-1.5 text-[11px] font-semibold bg-purple-50 text-[#7865F5] border border-purple-200 px-2.5 py-1 rounded-full hover:bg-purple-100 transition-colors"
            >
              <span>{f.label}</span>
              <X className="w-3 h-3" />
            </button>
          ))}
        </div>

        {(activeFilters.length > 0 || activeTab !== 'All') && (
          <button
            onClick={clearAllFilters}
            className="text-xs font-bold text-[#7865F5] hover:underline"
          >
            Clear All Filters
          </button>
        )}
      </div>

      {/* Empty State or Members Grid */}
      {filteredMembers.length === 0 ? (
        <div className="bg-white rounded-3xl border border-[#EAEAEA] p-12 text-center">
          <Users className="w-10 h-10 text-neutral-300 mx-auto mb-3" />
          <h3 className="font-bold text-[#111111] text-base">No matching community members</h3>
          <p className="text-xs text-[#929292] mt-1 mb-5">
            Try widening your search query or clearing some active filters.
          </p>
          <Button variant="primary" size="sm" onClick={clearAllFilters}>
            Clear Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map((member) => {
            const isConnected = connectedIds.includes(member.id);
            const isPending = sentRequestIds.includes(member.id);
            const profileUrl = member.role === 'ALUMNI' ? `/alumni/${member.id}` : `/profile/${member.id}`;

            return (
              <div
                key={member.id}
                onClick={() => navigate(profileUrl)}
                className="group bg-white rounded-3xl border border-[#EAEAEA] p-5 sm:p-6 flex flex-col justify-between hover:border-neutral-300 hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="relative">
                      <img
                        src={member.avatar_url}
                        alt={member.full_name}
                        className="w-14 h-14 rounded-2xl object-cover border border-neutral-200"
                      />
                      {member.is_mentor_available && (
                        <span
                          title="Available Mentor"
                          className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#7865F5] border-2 border-white flex items-center justify-center text-white text-[10px]"
                        >
                          <Sparkles className="w-3 h-3" />
                        </span>
                      )}
                    </div>
                    <RoleBadge role={member.role} size="sm" />
                  </div>

                  <h3 className="font-bold text-[#111111] text-base group-hover:text-[#7865F5] transition-colors leading-tight">
                    {member.full_name}
                  </h3>
                  <p className="text-xs text-[#929292] font-medium mt-1 line-clamp-1">
                    {member.headline || `${member.faculty || 'Campus Member'} • ${member.university}`}
                  </p>

                  {member.current_company ? (
                    <div className="flex items-center gap-1.5 text-xs text-neutral-700 font-medium mt-3 bg-[#F8F8F8] py-1.5 px-2.5 rounded-xl border border-[#EAEAEA]">
                      <Briefcase className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                      <span className="truncate">
                        <strong>{member.current_position}</strong> at {member.current_company}
                      </span>
                    </div>
                  ) : member.project_title ? (
                    <div className="flex items-center gap-1.5 text-xs text-neutral-700 font-medium mt-3 bg-[#F8F8F8] py-1.5 px-2.5 rounded-xl border border-[#EAEAEA]">
                      <Sparkles className="w-3.5 h-3.5 text-[#7865F5] shrink-0" />
                      <span className="truncate">{member.project_title}</span>
                    </div>
                  ) : null}

                  {member.skills && member.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3.5">
                      {member.skills.slice(0, 3).map((skill, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] font-medium bg-[#F8F8F8] text-neutral-600 px-2 py-0.5 rounded-md border border-[#EAEAEA]/60"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-4 mt-4 border-t border-neutral-100 flex items-center justify-between gap-2">
                  <Link
                    to={profileUrl}
                    onClick={(e) => e.stopPropagation()}
                    className="text-xs font-semibold text-neutral-600 hover:text-[#111111] hover:underline"
                  >
                    View Profile
                  </Link>

                  <button
                    onClick={(e) => handleConnect(e, member.id)}
                    disabled={isConnected || isPending}
                    className={`text-xs font-semibold px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1 ${
                      isConnected
                        ? 'bg-neutral-100 text-neutral-600 cursor-default'
                        : isPending
                        ? 'bg-purple-50 text-[#7865F5] border border-purple-200 cursor-default'
                        : 'bg-[#111111] text-white hover:bg-black/90 shadow-sm'
                    }`}
                  >
                    {isConnected ? (
                      <>
                        <Check className="w-3 h-3 text-[#16A36A]" />
                        Connected
                      </>
                    ) : isPending ? (
                      'Request Sent'
                    ) : (
                      <>
                        <UserPlus className="w-3 h-3" />
                        Connect
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
