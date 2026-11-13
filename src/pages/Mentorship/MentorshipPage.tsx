import React, { useState, useMemo } from 'react';
import { useCommunityStore } from '../../store/useCommunityStore';
import { useMentorshipStore } from '../../store/useMentorshipStore';
import { useAuthStore } from '../../store/useAuthStore';
import { MentorCard } from '../../components/cards/MentorCard';
import { RequestMentorshipModal } from '../../components/forms/RequestMentorshipModal';
import { Profile } from '../../types';
import { Search, Sparkles, CheckCircle2, Clock, Calendar, MessageSquare } from 'lucide-react';
import { formatDate } from '../../lib/utils';

export const MentorshipPage: React.FC = () => {
  const { members } = useCommunityStore();
  const { requests } = useMentorshipStore();
  const { user } = useAuthStore();

  const [search, setSearch] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [selectedMentor, setSelectedMentor] = useState<Profile | null>(null);

  const mentors = useMemo(() => {
    return members.filter((m) => m.is_mentor_available);
  }, [members]);

  const filteredMentors = useMemo(() => {
    return mentors.filter((mentor) => {
      const matchesSearch =
        mentor.full_name.toLowerCase().includes(search.toLowerCase()) ||
        (mentor.headline && mentor.headline.toLowerCase().includes(search.toLowerCase())) ||
        (mentor.current_company && mentor.current_company.toLowerCase().includes(search.toLowerCase()));

      const matchesTopic =
        selectedTopic === 'All' ||
        (mentor.mentor_expertise && mentor.mentor_expertise.includes(selectedTopic));

      return matchesSearch && matchesTopic;
    });
  }, [mentors, search, selectedTopic]);

  const topics = [
    'All',
    'Portfolio Review',
    'System Design',
    'FAANG Interview Prep',
    'Design Systems',
    'Career Transition',
    'Academic Research'
  ];

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#7865F5]" />
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
            Alumni & Faculty Mentorship
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111111] tracking-tight">
          Mentorship & Office Hours
        </h1>
        <p className="text-sm text-neutral-500 mt-1 max-w-2xl">
          Book 1-on-1 portfolio critiques, resume feedback sessions, and graduate school coaching with verified alumni leaders.
        </p>
      </div>

      {/* Active Mentorship Sessions Tracker (for the current student/user) */}
      {requests.length > 0 && (
        <div className="bg-white rounded-3xl border border-[#EAEAEA] p-6 mb-8 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-neutral-900 text-sm flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#7865F5]" />
              <span>Your Active Mentorship Requests</span>
            </h3>
            <span className="text-xs bg-purple-50 text-[#7865F5] font-semibold px-2.5 py-0.5 rounded-full">
              {requests.length} Active
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {requests.map((req) => (
              <div
                key={req.id}
                className="p-4 rounded-2xl bg-neutral-50 border border-neutral-100 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-bold text-neutral-900">{req.topic}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                        req.status === 'ACCEPTED'
                          ? 'bg-emerald-100 text-emerald-800'
                          : req.status === 'PENDING'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-neutral-200 text-neutral-700'
                      }`}
                    >
                      {req.status}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-500 line-clamp-2 italic mb-2">
                    "{req.message}"
                  </p>
                </div>
                {req.preferredSchedule && (
                  <div className="text-[11px] text-neutral-600 font-medium pt-2 border-t border-neutral-200/60 flex items-center gap-1.5">
                    <Calendar className="w-3 h-3 text-neutral-400" />
                    <span>{req.preferredSchedule}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Search & Topic Filters */}
      <div className="bg-white rounded-3xl border border-[#EAEAEA] p-4 sm:p-5 mb-8 shadow-xs flex flex-col gap-4">
        <div className="relative">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search mentors by name, company, or focus..."
            className="w-full text-xs sm:text-sm pl-10 pr-4 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-[#7865F5] bg-neutral-50/50"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
          {topics.map((t) => (
            <button
              key={t}
              onClick={() => setSelectedTopic(t)}
              className={`text-xs font-semibold px-3.5 py-1.5 rounded-full whitespace-nowrap transition-all ${
                selectedTopic === t
                  ? 'bg-[#111111] text-white shadow-xs'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200/80 hover:text-neutral-900'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Mentors Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMentors.map((mentor) => (
          <MentorCard
            key={mentor.id}
            mentor={mentor}
            onRequestMentorship={(m) => setSelectedMentor(m)}
          />
        ))}
      </div>

      {/* Request Mentorship Modal */}
      <RequestMentorshipModal
        isOpen={Boolean(selectedMentor)}
        onClose={() => setSelectedMentor(null)}
        mentor={selectedMentor}
      />
    </div>
  );
};

