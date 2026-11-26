import React, { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCommunityStore } from '../../store/useCommunityStore';
import { RoleBadge } from '../../components/ui/RoleBadge';
import { Button } from '../../components/ui/Button';
import {
  Search,
  GraduationCap,
  Briefcase,
  MapPin,
  UserPlus,
  Check,
  Sparkles,
  Users
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const AlumniPage: React.FC = () => {
  const navigate = useNavigate();
  const { members, sentRequestIds, connectedIds, sendConnectionRequest } = useCommunityStore();

  const [search, setSearch] = useState('');
  const [selectedFaculty, setSelectedFaculty] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');
  const [selectedCompany, setSelectedCompany] = useState('All');
  const [selectedIndustry, setSelectedIndustry] = useState('All');
  const [selectedPosition, setSelectedPosition] = useState('All');
  const [sortBy, setSortBy] = useState<'relevant' | 'newest'>('relevant');

  const alumniList = useMemo(() => {
    return members.filter((m) => m.role === 'ALUMNI');
  }, [members]);

  const faculties = useMemo(() => ['All', ...Array.from(new Set(alumniList.map((a) => a.faculty).filter(Boolean) as string[]))], [alumniList]);
  const years = useMemo(() => ['All', ...Array.from(new Set(alumniList.map((a) => String(a.graduation_year)).filter(Boolean))).sort().reverse()], [alumniList]);
  const companies = useMemo(() => ['All', ...Array.from(new Set(alumniList.map((a) => a.current_company).filter(Boolean) as string[]))], [alumniList]);
  const industries = useMemo(() => ['All', ...Array.from(new Set(alumniList.map((a) => a.industry).filter(Boolean) as string[]))], [alumniList]);
  const positions = useMemo(() => ['All', ...Array.from(new Set(alumniList.map((a) => a.current_position).filter(Boolean) as string[]))], [alumniList]);

  const filteredAlumni = useMemo(() => {
    const filtered = alumniList.filter((alum) => {
      const q = search.trim().toLowerCase();
      const matchesSearch =
        !q ||
        alum.full_name.toLowerCase().includes(q) ||
        (alum.current_company && alum.current_company.toLowerCase().includes(q)) ||
        (alum.current_position && alum.current_position.toLowerCase().includes(q)) ||
        (alum.skills && alum.skills.some((s) => s.toLowerCase().includes(q)));

      const matchesFaculty = selectedFaculty === 'All' || alum.faculty === selectedFaculty;
      const matchesYear = selectedYear === 'All' || String(alum.graduation_year) === selectedYear;
      const matchesCompany = selectedCompany === 'All' || alum.current_company === selectedCompany;
      const matchesIndustry = selectedIndustry === 'All' || alum.industry === selectedIndustry;
      const matchesPos = selectedPosition === 'All' || alum.current_position === selectedPosition;

      return matchesSearch && matchesFaculty && matchesYear && matchesCompany && matchesIndustry && matchesPos;
    });

    if (sortBy === 'newest') {
      return [...filtered].sort((a, b) => (b.graduation_year || 0) - (a.graduation_year || 0));
    }
    return [...filtered].sort((a, b) => (b.mutual_connections || 0) - (a.mutual_connections || 0));
  }, [alumniList, search, selectedFaculty, selectedYear, selectedCompany, selectedIndustry, selectedPosition, sortBy]);

  const clearFilters = () => {
    setSearch('');
    setSelectedFaculty('All');
    setSelectedYear('All');
    setSelectedCompany('All');
    setSelectedIndustry('All');
    setSelectedPosition('All');
  };

  const handleConnect = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    sendConnectionRequest(id);
    confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 } });
  };

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#7865F5]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#929292]">
              Alumni Relations & Directory
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111111] tracking-tight">
            Alumni Network & Directory
          </h1>
          <p className="text-sm text-[#929292] mt-1 max-w-2xl">
            Connect with verified graduates working across leading tech, finance, design, legal, and consulting organizations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-[#929292]">Sort:</span>
          <select
            aria-label="Sort alumni"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'relevant' | 'newest')}
            className="text-xs px-3.5 py-2 rounded-full border border-[#EAEAEA] bg-white font-semibold text-[#111111] focus:outline-none focus:border-[#7865F5]"
          >
            <option value="relevant">Most Relevant</option>
            <option value="newest">Newest Graduates</option>
          </select>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-3xl border border-[#EAEAEA] p-4 sm:p-5 mb-6 shadow-xs flex flex-col gap-4">
        <div className="relative">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search alumni by name, company (Stripe, Google, Linear), or skill..."
            className="w-full text-xs sm:text-sm pl-10 pr-4 py-2.5 rounded-xl border border-[#EAEAEA] focus:outline-none focus:border-[#7865F5] bg-[#F8F8F8]"
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          <select
            aria-label="Filter by faculty"
            value={selectedFaculty}
            onChange={(e) => setSelectedFaculty(e.target.value)}
            className="text-xs px-3 py-2 rounded-xl border border-[#EAEAEA] bg-white font-medium"
          >
            {faculties.map((f) => (
              <option key={f} value={f}>{f === 'All' ? 'All Faculties' : f}</option>
            ))}
          </select>

          <select
            aria-label="Filter by graduation year"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="text-xs px-3 py-2 rounded-xl border border-[#EAEAEA] bg-white font-medium"
          >
            {years.map((y) => (
              <option key={y} value={y}>{y === 'All' ? 'All Grad Years' : `Class of ${y}`}</option>
            ))}
          </select>

          <select
            aria-label="Filter by company"
            value={selectedCompany}
            onChange={(e) => setSelectedCompany(e.target.value)}
            className="text-xs px-3 py-2 rounded-xl border border-[#EAEAEA] bg-white font-medium"
          >
            {companies.map((c) => (
              <option key={c} value={c}>{c === 'All' ? 'All Companies' : c}</option>
            ))}
          </select>

          <select
            aria-label="Filter by industry"
            value={selectedIndustry}
            onChange={(e) => setSelectedIndustry(e.target.value)}
            className="text-xs px-3 py-2 rounded-xl border border-[#EAEAEA] bg-white font-medium"
          >
            {industries.map((i) => (
              <option key={i} value={i}>{i === 'All' ? 'All Industries' : i}</option>
            ))}
          </select>

          <select
            aria-label="Filter by position"
            value={selectedPosition}
            onChange={(e) => setSelectedPosition(e.target.value)}
            className="text-xs px-3 py-2 rounded-xl border border-[#EAEAEA] bg-white font-medium"
          >
            {positions.map((p) => (
              <option key={p} value={p}>{p === 'All' ? 'All Positions' : p}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between mb-6 text-xs">
        <span className="font-bold text-[#111111]">
          {filteredAlumni.length} Alumni Profile{filteredAlumni.length === 1 ? '' : 's'}
        </span>
        {(search || selectedFaculty !== 'All' || selectedYear !== 'All' || selectedCompany !== 'All' || selectedIndustry !== 'All' || selectedPosition !== 'All') && (
          <button onClick={clearFilters} className="font-bold text-[#7865F5] hover:underline">
            Clear Filters
          </button>
        )}
      </div>

      {/* Alumni Cards Grid */}
      {filteredAlumni.length === 0 ? (
        <div className="bg-white rounded-3xl border border-[#EAEAEA] p-12 text-center">
          <Users className="w-10 h-10 text-neutral-300 mx-auto mb-3" />
          <h3 className="font-bold text-[#111111] text-base">No alumni match your filters</h3>
          <p className="text-xs text-[#929292] mt-1 mb-4">Reset filters to see the full alumni directory.</p>
          <Button variant="primary" size="sm" onClick={clearFilters}>
            Reset Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAlumni.map((alum) => {
            const isConnected = connectedIds.includes(alum.id);
            const isPending = sentRequestIds.includes(alum.id);

            return (
              <div
                key={alum.id}
                onClick={() => navigate(`/alumni/${alum.id}`)}
                className="group bg-white rounded-3xl border border-[#EAEAEA] p-5 sm:p-6 flex flex-col justify-between hover:border-neutral-300 hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="relative">
                      <img
                        src={alum.avatar_url}
                        alt={alum.full_name}
                        className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover border border-neutral-200 group-hover:scale-105 transition-transform duration-300"
                      />
                      {alum.is_mentor_available && (
                        <span
                          title="Available for Mentorship"
                          className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#7865F5] border-2 border-white flex items-center justify-center text-white"
                        >
                          <Sparkles className="w-3 h-3" />
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-1.5">
                      <RoleBadge role="ALUMNI" size="sm" />
                      {alum.graduation_year && (
                        <span className="text-[11px] font-semibold text-[#929292] flex items-center gap-1">
                          <GraduationCap className="w-3 h-3" />
                          Class of {alum.graduation_year}
                        </span>
                      )}
                    </div>
                  </div>

                  <h4 className="font-bold text-[#111111] text-base group-hover:text-[#7865F5] transition-colors leading-tight">
                    {alum.full_name}
                  </h4>
                  <p className="text-xs text-[#929292] font-medium mt-1">
                    {alum.faculty} • {alum.major}
                  </p>

                  {alum.current_company && (
                    <div className="flex items-center gap-1.5 text-xs text-neutral-800 font-medium mt-3 bg-[#F8F8F8] py-1.5 px-2.5 rounded-xl border border-[#EAEAEA]">
                      <Briefcase className="w-3.5 h-3.5 text-[#7865F5] shrink-0" />
                      <span className="truncate">
                        <strong>{alum.current_position}</strong> at {alum.current_company}
                      </span>
                    </div>
                  )}

                  {alum.location && (
                    <div className="flex items-center gap-1.5 text-[11px] text-[#929292] mt-2.5">
                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                      <span>{alum.location}</span>
                    </div>
                  )}
                </div>

                {/* Footer Actions */}
                <div className="pt-4 mt-4 border-t border-neutral-100 flex items-center justify-between gap-2">
                  <Link
                    to={`/alumni/${alum.id}`}
                    onClick={(e) => e.stopPropagation()}
                    className="text-xs font-semibold text-neutral-700 hover:text-[#111111] hover:underline"
                  >
                    View Profile
                  </Link>

                  <button
                    onClick={(e) => handleConnect(e, alum.id)}
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
