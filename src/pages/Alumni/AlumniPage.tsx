import React, { useState, useMemo } from 'react';
import { useCommunityStore } from '../../store/useCommunityStore';
import { AlumniCard } from '../../components/cards/AlumniCard';
import { Modal } from '../../components/ui/Modal';
import { Button } from '../../components/ui/Button';
import { RoleBadge } from '../../components/ui/RoleBadge';
import { Profile } from '../../types';
import { Search, GraduationCap, Briefcase, Sparkles } from 'lucide-react';

export const AlumniPage: React.FC = () => {
  const { members } = useCommunityStore();

  const [search, setSearch] = useState('');
  const [selectedFaculty, setSelectedFaculty] = useState('All');
  const [selectedAlumniModal, setSelectedAlumniModal] = useState<Profile | null>(null);

  const alumniList = useMemo(() => {
    return members.filter((m) => m.role === 'ALUMNI');
  }, [members]);

  const filteredAlumni = useMemo(() => {
    return alumniList.filter((alum) => {
      const matchesSearch =
        alum.full_name.toLowerCase().includes(search.toLowerCase()) ||
        (alum.current_company && alum.current_company.toLowerCase().includes(search.toLowerCase())) ||
        (alum.current_position && alum.current_position.toLowerCase().includes(search.toLowerCase())) ||
        (alum.skills && alum.skills.some((s) => s.toLowerCase().includes(search.toLowerCase())));

      const matchesFaculty = selectedFaculty === 'All' || alum.faculty === selectedFaculty;

      return matchesSearch && matchesFaculty;
    });
  }, [alumniList, search, selectedFaculty]);

  const faculties = ['All', 'Computer Science', 'Art & Design', 'Engineering', 'Communication', 'Business'];

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
            Alumni Relations & Directory
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111111] tracking-tight">
          Alumni Network & Directory
        </h1>
        <p className="text-sm text-neutral-500 mt-1 max-w-2xl">
          Connect with graduated seniors and industry experts from top tech, design, and enterprise organizations worldwide.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-3xl border border-[#EAEAEA] p-4 sm:p-5 mb-8 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search alumni by name, company (e.g. Stripe, Google), or skill..."
            className="w-full text-xs sm:text-sm pl-10 pr-4 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-[#7865F5] bg-neutral-50/50"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-neutral-400 font-semibold">Faculty:</span>
          <select
            value={selectedFaculty}
            onChange={(e) => setSelectedFaculty(e.target.value)}
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

      {/* Alumni Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAlumni.map((alum) => (
          <AlumniCard
            key={alum.id}
            alumni={alum}
            onSelect={(al) => setSelectedAlumniModal(al)}
          />
        ))}
      </div>

      {/* Alumni Detail Modal */}
      {selectedAlumniModal && (
        <Modal
          isOpen={Boolean(selectedAlumniModal)}
          onClose={() => setSelectedAlumniModal(null)}
          title={selectedAlumniModal.full_name}
          maxWidth="md"
        >
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <img
                src={selectedAlumniModal.avatar_url}
                alt={selectedAlumniModal.full_name}
                className="w-16 h-16 rounded-2xl object-cover border border-neutral-200"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-neutral-900 text-base">{selectedAlumniModal.full_name}</h4>
                  <RoleBadge role={selectedAlumniModal.role} size="sm" />
                </div>
                <p className="text-xs text-neutral-500 font-medium mt-0.5">{selectedAlumniModal.headline}</p>
                <span className="text-xs text-neutral-400 flex items-center gap-1 mt-1">
                  <GraduationCap className="w-3.5 h-3.5" />
                  Class of {selectedAlumniModal.graduation_year} • {selectedAlumniModal.faculty}
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-100 text-xs text-neutral-600 leading-relaxed">
              {selectedAlumniModal.bio}
            </div>

            {selectedAlumniModal.current_company && (
              <div className="flex items-center gap-2 text-xs font-semibold text-neutral-800 bg-white p-3 rounded-xl border border-neutral-200">
                <Briefcase className="w-4 h-4 text-[#7865F5]" />
                <span>Current Role: {selectedAlumniModal.current_position} at {selectedAlumniModal.current_company}</span>
              </div>
            )}

            {selectedAlumniModal.skills && (
              <div>
                <span className="text-xs font-bold text-neutral-700 block mb-2">Technical Skills & Expertise</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedAlumniModal.skills.map((s, idx) => (
                    <span key={idx} className="text-xs bg-neutral-100 text-neutral-700 px-2.5 py-1 rounded-md font-medium">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center justify-end gap-2 pt-4 border-t border-neutral-100 mt-2">
              <Button variant="secondary" size="md" onClick={() => setSelectedAlumniModal(null)}>
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

