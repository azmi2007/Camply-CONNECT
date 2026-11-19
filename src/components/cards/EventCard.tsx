import React from 'react';
import { Clock, MapPin, Users, Bookmark, Check } from 'lucide-react';
import { EventItem } from '../../types';
import { RoleBadge } from '../ui/RoleBadge';
import { formatDate } from '../../lib/utils';
import { useEventStore } from '../../store/useEventStore';
import confetti from 'canvas-confetti';

interface EventCardProps {
  event: EventItem;
  onSelect?: (event: EventItem) => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onSelect }) => {
  const { registerEvent, cancelRegistration, toggleSaveEvent } = useEventStore();

  const handleRegister = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (event.is_registered) {
      cancelRegistration(event.id);
    } else {
      registerEvent(event.id);
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleSaveEvent(event.id);
  };

  return (
    <div
      onClick={() => onSelect?.(event)}
      className="group bg-white rounded-3xl border border-[#EAEAEA] overflow-hidden flex flex-col justify-between hover:border-neutral-300 hover:shadow-lg transition-all duration-300 cursor-pointer"
    >
      <div>
        {/* Banner with floating badges */}
        <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-neutral-100">
          <img
            src={event.banner_url}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />

          {/* Top badges */}
          <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between">
            <span className="bg-white/95 backdrop-blur-md text-neutral-900 font-bold text-xs px-3 py-1 rounded-full shadow-sm">
              {event.category}
            </span>
            <button
              onClick={handleSave}
              className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-neutral-700 hover:text-black hover:bg-white transition-colors"
              aria-label="Save event"
            >
              <Bookmark
                className={`w-4 h-4 ${event.is_saved ? 'fill-neutral-900 text-neutral-900' : ''}`}
              />
            </button>
          </div>

          {/* Date pill overlay at bottom of image */}
          <div className="absolute bottom-3 left-3.5 flex items-center gap-2">
            <span className="bg-neutral-900/80 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-lg">
              {formatDate(event.event_date)}
            </span>
            <span className="bg-neutral-900/80 backdrop-blur-md text-neutral-200 text-xs px-2 py-1 rounded-lg flex items-center gap-1">
              <Clock className="w-3 h-3 text-neutral-300" />
              {event.start_time}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h4 className="font-bold text-neutral-900 text-base sm:text-lg line-clamp-1 group-hover:text-[#7865F5] transition-colors">
            {event.title}
          </h4>
          <p className="text-neutral-500 text-xs sm:text-sm line-clamp-2 mt-1.5 mb-4 leading-relaxed">
            {event.description}
          </p>

          {/* Details */}
          <div className="flex flex-col gap-1.5 text-xs text-neutral-600 mb-4">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
              <span className="truncate">{event.location}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
              <span>
                <strong className="text-neutral-800">{event.current_participants}</strong> registered / {event.max_participants} max
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Organizer & Action Footer */}
      <div className="px-5 pb-5 pt-3 border-t border-neutral-100 flex items-center justify-between">
        {event.organizer && (
          <div className="flex items-center gap-2">
            <img
              src={event.organizer.avatar_url}
              alt={event.organizer.full_name}
              className="w-7 h-7 rounded-full object-cover border border-neutral-200"
            />
            <div className="flex flex-col">
              <span className="text-xs font-medium text-neutral-900 leading-tight">
                {event.organizer.full_name}
              </span>
              <RoleBadge role={event.organizer.role} size="sm" showDot={false} className="mt-0.5" />
            </div>
          </div>
        )}

        <button
          onClick={handleRegister}
          className={`text-xs font-semibold px-4 py-2 rounded-full transition-all flex items-center gap-1.5 ${
            event.is_registered
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
              : 'bg-[#111111] text-white hover:bg-black/90 shadow-sm'
          }`}
        >
          {event.is_registered ? (
            <>
              <Check className="w-3.5 h-3.5" />
              Registered
            </>
          ) : (
            'Join Event'
          )}
        </button>
      </div>
    </div>
  );
};

