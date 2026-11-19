import React from 'react';
import { Sparkles, Calendar, MessageSquare, Check, ArrowRight } from 'lucide-react';
import { Profile } from '../../types';
import { RoleBadge } from '../ui/RoleBadge';

interface MentorCardProps {
  mentor: Profile;
  onRequestMentorship: (mentor: Profile) => void;
}

export const MentorCard: React.FC<MentorCardProps> = ({ mentor, onRequestMentorship }) => {
  return (
    <div className="group bg-white rounded-3xl border border-[#EAEAEA] p-5 sm:p-6 flex flex-col justify-between hover:border-neutral-300 hover:shadow-lg transition-all duration-300">
      <div>
        {/* Mentor Top Info */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <img
              src={mentor.avatar_url}
              alt={mentor.full_name}
              className="w-14 h-14 rounded-2xl object-cover border border-neutral-200"
            />
            <div>
              <h4 className="font-bold text-neutral-900 text-base group-hover:text-[#7865F5] transition-colors">
                {mentor.full_name}
              </h4>
              <p className="text-xs text-neutral-500 line-clamp-1">{mentor.headline}</p>
            </div>
          </div>
          <RoleBadge role={mentor.role} size="sm" />
        </div>

        {/* Bio */}
        <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed mb-4">
          {mentor.bio}
        </p>

        {/* Mentorship Expertise Topics */}
        {mentor.mentor_expertise && mentor.mentor_expertise.length > 0 && (
          <div className="mb-4">
            <span className="text-[11px] font-semibold text-neutral-400 block mb-2">
              Mentorship Focus Areas
            </span>
            <div className="flex flex-wrap gap-1.5">
              {mentor.mentor_expertise.map((exp, i) => (
                <span
                  key={i}
                  className="text-[11px] font-medium bg-purple-50 text-[#7865F5] border border-purple-100 px-2.5 py-1 rounded-full"
                >
                  {exp}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div className="pt-4 mt-2 border-t border-neutral-100 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Accepting Mentees</span>
        </div>

        <button
          onClick={() => onRequestMentorship(mentor)}
          className="text-xs font-semibold px-4 py-2 rounded-full bg-[#111111] text-white hover:bg-black/90 transition-all flex items-center gap-1.5 shadow-sm"
        >
          <span>Request Mentorship</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

