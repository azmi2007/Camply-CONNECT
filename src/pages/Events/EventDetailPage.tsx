import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Users,
  Bookmark,
  Check,
  ExternalLink,
  Share2,
  CalendarDays
} from 'lucide-react';
import { useEventStore } from '../../store/useEventStore';
import { Button } from '../../components/ui/Button';
import { RoleBadge } from '../../components/ui/RoleBadge';
import { EventCard } from '../../components/cards/EventCard';
import { useRequireAuthentication } from '../../features/auth/useRequireAuthentication';
import { formatDate } from '../../lib/utils';
import confetti from 'canvas-confetti';

export const EventDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { events, registerEvent, cancelRegistration, toggleSaveEvent } = useEventStore();
  const requireAuthentication = useRequireAuthentication();

  const event = events.find((e) => e.id === id);

  if (!event) {
    return (
      <div className="py-20 max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-2xl font-extrabold text-[#111111]">Event Not Found</h2>
        <p className="text-sm text-[#929292] mt-2 mb-6">
          The campus event you are looking for does not exist or has been removed.
        </p>
        <Button variant="primary" size="md" onClick={() => navigate('/events')}>
          Browse All Events
        </Button>
      </div>
    );
  }

  const availableSeats = Math.max(0, event.max_participants - event.current_participants);
  const fillPercent = Math.min(100, Math.round((event.current_participants / event.max_participants) * 100));
  const relatedEvents = events.filter((e) => e.id !== event.id).slice(0, 2);

  const handleToggleRegister = () => {
    if (!requireAuthentication()) return;
    if (event.is_registered) {
      cancelRegistration(event.id);
    } else {
      registerEvent(event.id);
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  };

  return (
    <div className="py-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Top Breadcrumb */}
      <div className="flex items-center justify-between mb-6">
        <Link
          to="/events"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-500 hover:text-[#111111] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Events</span>
        </Link>

        <Link
          to="/calendar"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#7865F5] hover:underline"
        >
          <CalendarDays className="w-4 h-4" />
          <span>View on Campus Calendar</span>
        </Link>
      </div>

      {/* Hero Cover */}
      <div className="relative h-64 sm:h-96 w-full rounded-3xl overflow-hidden bg-neutral-100 border border-[#EAEAEA] mb-8">
        <img
          src={event.banner_url}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

        <div className="absolute top-5 left-5 flex items-center gap-2">
          <span className="bg-white/95 backdrop-blur-md text-[#111111] font-bold text-xs px-3.5 py-1.5 rounded-full shadow-sm">
            {event.category}
          </span>
          <span className="bg-[#111111]/80 backdrop-blur-md text-white font-semibold text-xs px-3 py-1.5 rounded-full">
            {event.status}
          </span>
        </div>

        <div className="absolute bottom-6 left-6 right-6 text-white">
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight max-w-3xl">
            {event.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 mt-3 text-xs sm:text-sm text-neutral-200">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#7865F5]" />
              {formatDate(event.event_date)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#7865F5]" />
              {event.start_time} - {event.end_time}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#7865F5]" />
              {event.location}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Two-Column */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Description, Agenda & Organizer */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="bg-white rounded-3xl border border-[#EAEAEA] p-6 sm:p-8 shadow-xs">
            <h2 className="text-lg font-extrabold text-[#111111] mb-3">About This Event</h2>
            <p className="text-sm text-neutral-600 leading-relaxed mb-6">
              {event.description}
            </p>

            {event.agenda && event.agenda.length > 0 && (
              <div className="pt-6 border-t border-neutral-100">
                <h3 className="text-sm font-bold text-[#111111] mb-3">Event Schedule & Agenda</h3>
                <div className="flex flex-col gap-2.5">
                  {event.agenda.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-[#F8F8F8] border border-[#EAEAEA] text-xs font-medium text-neutral-800"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {event.tags && event.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-neutral-100">
                {event.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs font-semibold bg-[#F8F8F8] border border-[#EAEAEA] text-neutral-700 px-3 py-1 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Organizer Info Card */}
          {event.organizer && (
            <div className="bg-white rounded-3xl border border-[#EAEAEA] p-6 shadow-xs flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <img
                  src={event.organizer.avatar_url}
                  alt={event.organizer.full_name}
                  className="w-14 h-14 rounded-2xl object-cover border border-neutral-200"
                />
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#929292]">
                    Hosted By
                  </span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <h4 className="font-bold text-base text-[#111111]">{event.organizer.full_name}</h4>
                    <RoleBadge role={event.organizer.role} size="sm" />
                  </div>
                  <p className="text-xs text-neutral-500">{event.organizer.faculty || 'Campus Organizer'}</p>
                </div>
              </div>

              <Link to={`/profile/${event.organizer_id}`}>
                <Button variant="secondary" size="sm">
                  View Organizer
                </Button>
              </Link>
            </div>
          )}

          {/* Related Events */}
          {relatedEvents.length > 0 && (
            <div className="pt-4">
              <h3 className="text-lg font-extrabold text-[#111111] mb-4">More Upcoming Events</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {relatedEvents.map((rel) => (
                  <EventCard
                    key={rel.id}
                    event={rel}
                    onSelect={(ev) => navigate(`/events/${ev.id}`)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: Registration Sidebar Card */}
        <div className="lg:col-span-4 sticky top-24">
          <div className="bg-white rounded-3xl border border-[#EAEAEA] p-6 shadow-sm flex flex-col gap-5">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#111111]">Registration Status</span>
                <span className="text-xs font-bold text-[#16A36A] bg-emerald-50 px-2.5 py-0.5 rounded-full">
                  {availableSeats} seats left
                </span>
              </div>
              <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#7865F5] rounded-full transition-all duration-300"
                  style={{ width: `${fillPercent}%` }}
                />
              </div>
              <p className="text-xs text-[#929292] mt-2 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" />
                <span>
                  <strong className="text-[#111111]">{event.current_participants}</strong> of {event.max_participants} spots claimed
                </span>
              </p>
            </div>

            {event.online_link && (
              <div className="p-3.5 rounded-2xl bg-purple-50/70 border border-purple-100 text-xs text-[#7865F5] flex items-center justify-between">
                <span className="font-semibold">Online Access Link Included</span>
                <ExternalLink className="w-4 h-4 shrink-0" />
              </div>
            )}

            <div className="flex flex-col gap-2.5">
              <Button
                variant={event.is_registered ? 'secondary' : 'primary'}
                size="lg"
                onClick={handleToggleRegister}
                className="w-full"
                icon={event.is_registered ? <Check className="w-4 h-4 text-[#16A36A]" /> : undefined}
              >
                {event.is_registered ? 'Registered (Cancel Seat)' : 'Register for Event'}
              </Button>

              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => {
                    if (requireAuthentication()) toggleSaveEvent(event.id);
                  }}
                  icon={<Bookmark className={`w-4 h-4 ${event.is_saved ? 'fill-[#111111]' : ''}`} />}
                >
                  {event.is_saved ? 'Saved' : 'Save'}
                </Button>
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => navigator.clipboard?.writeText(window.location.href)}
                  icon={<Share2 className="w-4 h-4" />}
                >
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
