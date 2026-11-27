import React from 'react';
import { Briefcase, GraduationCap, UserPlus, Check, Sparkles } from 'lucide-react';
import { Profile } from '../../types';
import { RoleBadge } from '../ui/RoleBadge';
import { useCommunityStore } from '../../store/useCommunityStore';
import { useAuthStore } from '../../store/useAuthStore';
import { useRequireAuthentication } from '../../features/auth/useRequireAuthentication';
import confetti from 'canvas-confetti';

interface AlumniCardProps {
  alumni: Profile;
  onSelect?: (alumni: Profile) => void;
}

export const AlumniCard: React.FC<AlumniCardProps> = ({ alumni, onSelect }) => {
  const { sentRequestIds, connectedIds, sendConnectionRequest } = useCommunityStore();
  const currentUser = useAuthStore((state) => state.user);
  const requireAuthentication = useRequireAuthentication();

  const isSelf = currentUser?.id === alumni.id;
  const isConnected = connectedIds.includes(alumni.id);
  const isPending = sentRequestIds.includes(alumni.id);

  const handleConnect = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!requireAuthentication()) return;
    if (isSelf || isConnected || isPending) return;

    sendConnectionRequest(alumni.id);
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.7 }
    });
  };

  return (
    <div
      onClick={() => onSelect?.(alumni)}
      className="group bg-white rounded-3xl border border-[#EAEAEA] p-5 sm:p-6 flex flex-col justify-between hover:border-neutral-300 hover:shadow-lg transition-all duration-300 cursor-pointer"
    >
      <div>
        {/* Header: Avatar + Role Badge + Mentorship Tag */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="relative">
            <img
              src={alumni.avatar_url}
              alt={alumni.full_name}
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover border border-neutral-200 group-hover:scale-105 transition-transform duration-300"
            />
            {alumni.is_mentor_available && (
              <span
                title="Available for Mentorship"
                className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#7865F5] border-2 border-white flex items-center justify-center text-white text-[10px]"
              >
                <Sparkles className="w-3 h-3" />
              </span>
            )}
          </div>
          <div className="flex flex-col items-end gap-1.5">
            <RoleBadge role={alumni.role} size="sm" />
            {alumni.graduation_year && (
              <span className="text-[11px] font-semibold text-neutral-400 flex items-center gap-1">
                <GraduationCap className="w-3 h-3" />
                Class of {alumni.graduation_year}
              </span>
            )}
          </div>
        </div>

        {/* Name and Headline */}
        <h4 className="font-bold text-neutral-900 text-base group-hover:text-[#7865F5] transition-colors leading-tight">
          {alumni.full_name}
        </h4>
        <p className="text-xs text-neutral-500 font-medium mt-1 line-clamp-1">
          {alumni.headline || `${alumni.faculty || 'Alumni'} • ${alumni.university}`}
        </p>

        {/* Company & Role */}
        {alumni.current_company && (
          <div className="flex items-center gap-1.5 text-xs text-neutral-700 font-medium mt-3 bg-neutral-50 py-1.5 px-2.5 rounded-xl border border-neutral-100">
            <Briefcase className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
            <span className="truncate">
              <strong>{alumni.current_position}</strong> at {alumni.current_company}
            </span>
          </div>
        )}

        {/* Skills or Expertise tags */}
        {alumni.skills && alumni.skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3.5">
            {alumni.skills.slice(0, 3).map((skill, i) => (
              <span
                key={i}
                className="text-[11px] font-medium bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded-md"
              >
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Footer with Connect Action */}
      <div className="pt-4 mt-4 border-t border-neutral-100 flex items-center justify-between">
        <span className="text-[11px] text-neutral-400 font-medium">
          {alumni.mutual_connections || 12} mutual connections
        </span>

        {isSelf ? (
          <span className="text-xs font-semibold px-3.5 py-1.5 rounded-full bg-neutral-100 text-neutral-500">
            You
          </span>
        ) : (
          <button
            onClick={handleConnect}
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
        )}
      </div>
    </div>
  );
};

