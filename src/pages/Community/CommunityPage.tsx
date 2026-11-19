import React, { useState, useMemo } from 'react';
import { useCommunityStore } from '../../store/useCommunityStore';
import { RoleBadge } from '../../components/ui/RoleBadge';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Profile, UserRole } from '../../types';
import { 
  Search, 
  Filter, 
  UserPlus, 
  Check, 
  Briefcase, 
  GraduationCap, 
  Sparkles,
  MapPin,
  ExternalLink 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const CommunityPage: React.FC = () => {
  const { members, sentRequestIds, connectedIds, sendConnectionRequest } = useCommunityStore();

  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<'All' | UserRole>('All');
  const [facultyFilter, setFacultyFilter] = useState('All');
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);

  const faculties = [
    'All',
    'Computer Science',
    'Engineering',
    'Art & Design',
    'Business',
    'Communication',
    'Medicine'
  ];

  const filteredMembers = useMemo(() => {
    return members.filter((member) => {
      const matchesSearch =
        member.full_name.toLowerCase().includes(search.toLowerCase()) ||
        (member.headline && member.headline.toLowerCase().includes(search.toLowerCase())) ||
        (member.current_company && member.current_company.toLowerCase().includes(search.toLowerCase())) ||
        (member.major && member.major.toLowerCase().includes(search.toLowerCase()));

      const matchesRole = roleFilter === 'All' || member.role === roleFilter;
      const matchesFaculty = facultyFilter === 'All' || member.faculty === facultyFilter;

      return matchesSearch && matchesRole && matchesFaculty;
    });
  }, [members, search, roleFilter, facultyFilter]);

  const handleConnect = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    sendConnectionRequest(id);
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#7865F5]" />
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
            University Network
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111111] tracking-tight">
          Campus Community & Directory
        </h1>
        <p className="text-sm text-neutral-500 mt-1 max-w-2xl">
          Connect with students, distinguished alumni, and faculty members across faculties and industries.
        </p>
      </div>

      {/* Filters Bar */}
      <div className="bg-white rounded-3xl border border-[#EAEAEA] p-4 sm:p-5 mb-8 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, company, skill, or department..."
            className="w-full text-xs sm:text-sm pl-10 pr-4 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-[#7865F5] bg-neutral-50/50"
          />
        </div>

        {/* Dropdowns */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-neutral-400 font-semibold">Role:</span>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value as any)}
              className="text-xs px-3 py-2 rounded-xl border border-neutral-200 focus:outline-none focus:border-[#7865F5] bg-white font-medium"
            >
              <option value="All">All Roles</option>
              <option value="STUDENT">Students</option>
              <option value="ALUMNI">Alumni</option>
              <option value="LECTURER">Lecturers</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-neutral-400 font-semibold">Faculty:</span>
            <select
              value={facultyFilter}
              onChange={(e) => setFacultyFilter(e.target.value)}
              className="text-xs px-3 py-2 rounded-xl border border-neutral-200 focus:outline-none focus:border-[#7865F5] bg-white font-medium"
            >
              {faculties.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Members Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMembers.map((member) => {
          const isConnected = connectedIds.includes(member.id);
          const isPending = sentRequestIds.includes(member.id);

          return (
            <div
              key={member.id}
              onClick={() => setSelectedProfile(member)}
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
                      <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#7865F5] border-2 border-white flex items-center justify-center text-white text-[10px]">
                        <Sparkles className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                  <RoleBadge role={member.role} size="sm" />
                </div>

                <h3 className="font-bold text-neutral-900 text-base group-hover:text-[#7865F5] transition-colors leading-tight">
                  {member.full_name}
                </h3>
                <p className="text-xs text-neutral-500 font-medium mt-1 line-clamp-1">
                  {member.headline || `${member.faculty || 'Campus Member'} • ${member.university}`}
                </p>

                {member.current_company && (
                  <div className="flex items-center gap-1.5 text-xs text-neutral-700 font-medium mt-3 bg-neutral-50 py-1.5 px-2.5 rounded-xl border border-neutral-100">
                    <Briefcase className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                    <span className="truncate">
                      <strong>{member.current_position}</strong> at {member.current_company}
                    </span>
                  </div>
                )}

                {member.skills && member.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3.5">
                    {member.skills.slice(0, 3).map((skill, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-medium bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded-md"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Footer */}
              <div className="pt-4 mt-4 border-t border-neutral-100 flex items-center justify-between">
                <span className="text-[11px] text-neutral-400 font-medium">
                  {member.mutual_connections || 8} mutual connections
                </span>

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
                      <Check className="w-3 h-3 text-emerald-600" />
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

      {/* Profile Detail Modal */}
      {selectedProfile && (
        <Modal
          isOpen={Boolean(selectedProfile)}
          onClose={() => setSelectedProfile(null)}
          title={selectedProfile.full_name}
          maxWidth="md"
        >
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <img
                src={selectedProfile.avatar_url}
                alt={selectedProfile.full_name}
                className="w-16 h-16 rounded-2xl object-cover border border-neutral-200"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-neutral-900 text-base">{selectedProfile.full_name}</h4>
                  <RoleBadge role={selectedProfile.role} size="sm" />
                </div>
                <p className="text-xs text-neutral-500 font-medium mt-0.5">{selectedProfile.headline}</p>
                <p className="text-xs text-neutral-400">{selectedProfile.university}</p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-100 text-xs text-neutral-600 leading-relaxed">
              {selectedProfile.bio}
            </div>

            {selectedProfile.skills && (
              <div>
                <span className="text-xs font-bold text-neutral-700 block mb-2">Skills & Focus</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProfile.skills.map((s, idx) => (
                    <span key={idx} className="text-xs bg-neutral-100 text-neutral-700 px-2.5 py-1 rounded-md font-medium">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center justify-end gap-2 pt-4 border-t border-neutral-100 mt-2">
              <Button variant="secondary" size="md" onClick={() => setSelectedProfile(null)}>
                Close
              </Button>
              <Button
                variant="primary"
                size="md"
                onClick={(e) => {
                  handleConnect(e, selectedProfile.id);
                  setSelectedProfile(null);
                }}
              >
                Connect on CAMPLY
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

