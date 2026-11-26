import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Plus,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
  addMonths,
  subMonths,
  isSameDay,
  parseISO
} from 'date-fns';
import { useEventStore } from '../../store/useEventStore';
import { useAuthStore } from '../../store/useAuthStore';
import { EventCategory, EventItem } from '../../types';
import { cn } from '../../lib/utils';
import { Button } from '../ui/Button';
import confetti from 'canvas-confetti';

interface CalendarSidebarProps {
  onOpenCreateEvent?: () => void;
  onSelectEvent?: (event: EventItem) => void;
}

export const CalendarSidebar: React.FC<CalendarSidebarProps> = ({
  onOpenCreateEvent,
  onSelectEvent
}) => {
  const navigate = useNavigate();
  const {
    events,
    selectedDate,
    setSelectedDate,
    selectedCategory,
    setSelectedCategory,
    registerEvent,
    cancelRegistration
  } = useEventStore();

  const { user } = useAuthStore();

  // Anchored on Nov 2026 (matches current mock events & local time)
  const todayDate = useMemo(() => new Date(2026, 10, 26), []);
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(todayDate));

  const filterCategories: EventCategory[] = [
    'All Events',
    'Academic',
    'Workshop',
    'Seminar',
    'Networking',
    'Career Fair',
    'Competition'
  ];

  const firstDayOffset = getDay(startOfMonth(currentMonth));
  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth)
  });

  const handleToday = () => {
    setCurrentMonth(startOfMonth(todayDate));
    setSelectedDate(format(todayDate, 'yyyy-MM-dd'));
  };

  // Map events to dates (YYYY-MM-DD)
  const eventsByDate = useMemo(() => {
    const map = new Map<string, EventItem[]>();
    events.forEach((event) => {
      if (selectedCategory !== 'All Events' && event.category !== selectedCategory) {
        return;
      }
      const existing = map.get(event.event_date) || [];
      map.set(event.event_date, [...existing, event]);
    });
    return map;
  }, [events, selectedCategory]);

  // Selected day events or upcoming
  const displayedEvents = useMemo(() => {
    const filtered = events.filter(
      (e) => selectedCategory === 'All Events' || e.category === selectedCategory
    );
    if (selectedDate) {
      return filtered.filter((e) => e.event_date === selectedDate);
    }
    return filtered.filter((e) => e.status === 'UPCOMING').slice(0, 4);
  }, [events, selectedDate, selectedCategory]);

  const handleDateClick = (dayString: string) => {
    if (selectedDate === dayString) {
      setSelectedDate(null);
    } else {
      setSelectedDate(dayString);
    }
  };

  const handleRegister = (e: React.MouseEvent, eventId: string, isRegistered?: boolean) => {
    e.stopPropagation();
    if (isRegistered) {
      cancelRegistration(eventId);
    } else {
      registerEvent(eventId);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    }
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Academic': return 'bg-sky-500';
      case 'Seminar': return 'bg-indigo-500';
      case 'Workshop': return 'bg-[#7865F5]';
      case 'Career Fair': return 'bg-amber-500';
      case 'Networking': return 'bg-[#16A36A]';
      case 'Competition': return 'bg-rose-500';
      default: return 'bg-[#111111]';
    }
  };

  return (
    <aside className="sticky top-24 w-full flex flex-col gap-5" aria-label="Interactive Campus Calendar">
      {/* Main Calendar Card */}
      <div className="bg-white rounded-3xl border border-[#EAEAEA] p-5 sm:p-6 shadow-sm">
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#F8F8F8] border border-[#EAEAEA] flex items-center justify-center text-[#111111]">
              <CalendarIcon className="w-4 h-4 text-[#7865F5]" />
            </div>
            <div>
              <h3 className="font-bold text-[#111111] text-base leading-tight">
                {format(currentMonth, 'MMMM yyyy')}
              </h3>
              <p className="text-[11px] text-[#929292]">Interactive Campus Schedule</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleToday}
              className="px-2.5 py-1 rounded-lg border border-[#EAEAEA] text-[11px] font-semibold text-neutral-700 hover:bg-[#F8F8F8] transition-colors"
            >
              Today
            </button>
            <button
              onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
              aria-label="Previous month"
              className="p-1.5 rounded-lg border border-[#EAEAEA] text-neutral-600 hover:bg-[#F8F8F8] transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
              aria-label="Next month"
              className="p-1.5 rounded-lg border border-[#EAEAEA] text-neutral-600 hover:bg-[#F8F8F8] transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-3 mb-3 border-b border-neutral-100">
          {filterCategories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  'text-[11px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap transition-all duration-200 shrink-0',
                  isActive
                    ? 'bg-[#111111] text-white shadow-xs'
                    : 'bg-[#F8F8F8] text-neutral-600 hover:bg-neutral-200/80 hover:text-neutral-900'
                )}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Day Labels */}
        <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-semibold text-[#929292] mb-2">
          <span>Su</span>
          <span>Mo</span>
          <span>Tu</span>
          <span>We</span>
          <span>Th</span>
          <span>Fr</span>
          <span>Sa</span>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: firstDayOffset }).map((_, i) => (
            <div key={`empty-${i}`} className="h-9 w-full" />
          ))}

          {daysInMonth.map((dayObj) => {
            const dayString = format(dayObj, 'yyyy-MM-dd');
            const dayEvents = eventsByDate.get(dayString) || [];
            const hasEvents = dayEvents.length > 0;
            const isSelected = selectedDate === dayString;
            const isToday = isSameDay(dayObj, todayDate);

            return (
              <button
                key={dayString}
                onClick={() => handleDateClick(dayString)}
                title={hasEvents ? `${dayEvents.length} event(s)` : undefined}
                className={cn(
                  'h-9 w-full rounded-xl flex flex-col items-center justify-center relative text-xs font-medium transition-all',
                  isSelected
                    ? 'bg-[#111111] text-white shadow-md'
                    : isToday
                    ? 'bg-purple-50 text-[#7865F5] font-bold border border-[#7865F5]/40'
                    : 'text-neutral-700 hover:bg-[#F8F8F8]'
                )}
              >
                <span>{format(dayObj, 'd')}</span>

                {hasEvents && (
                  <div className="flex items-center gap-0.5 absolute bottom-1">
                    {dayEvents.slice(0, 3).map((ev, idx) => (
                      <span
                        key={idx}
                        className={cn(
                          'w-1.5 h-1.5 rounded-full',
                          isSelected ? 'bg-white' : getCategoryColor(ev.category)
                        )}
                      />
                    ))}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Calendar Footer */}
        <div className="flex items-center justify-between pt-4 mt-3 border-t border-neutral-100 text-xs">
          <div className="text-neutral-500">
            {selectedDate ? (
              <span className="font-semibold text-[#111111]">
                {format(parseISO(selectedDate), 'MMM d, yyyy')} ({displayedEvents.length} event{displayedEvents.length === 1 ? '' : 's'})
              </span>
            ) : (
              <span>Showing upcoming events</span>
            )}
          </div>
          <div className="flex items-center gap-3">
            {selectedDate && (
              <button
                onClick={() => setSelectedDate(null)}
                className="text-[#7865F5] hover:underline font-semibold"
              >
                Clear
              </button>
            )}
            <Link
              to="/calendar"
              className="text-[#111111] hover:text-[#7865F5] font-bold inline-flex items-center gap-0.5"
            >
              <span>Full View</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* Events List for Selected Day or Upcoming */}
      <div className="bg-white rounded-3xl border border-[#EAEAEA] p-5 sm:p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h4 className="font-bold text-[#111111] text-sm">
              {selectedDate
                ? `Schedule for ${format(parseISO(selectedDate), 'MMM d')}`
                : 'Upcoming Campus Schedule'}
            </h4>
            <span className="text-xs bg-[#F8F8F8] border border-[#EAEAEA] text-neutral-700 px-2 py-0.5 rounded-full font-semibold">
              {displayedEvents.length}
            </span>
          </div>

          {user && onOpenCreateEvent && (
            <button
              onClick={onOpenCreateEvent}
              className="text-xs font-semibold text-[#7865F5] hover:text-[#6752EE] inline-flex items-center gap-1 p-1 rounded-lg hover:bg-purple-50 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Event</span>
            </button>
          )}
        </div>

        {displayedEvents.length === 0 ? (
          <div className="py-8 text-center">
            <p className="text-xs text-[#929292]">No events scheduled for this date.</p>
            <div className="flex items-center justify-center gap-2 mt-3">
              {selectedDate && (
                <Button variant="secondary" size="sm" onClick={() => setSelectedDate(null)}>
                  View All Events
                </Button>
              )}
              {user && onOpenCreateEvent && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onOpenCreateEvent}
                  icon={<Plus className="w-3.5 h-3.5" />}
                >
                  Host Event
                </Button>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {displayedEvents.map((event) => (
              <div
                key={event.id}
                onClick={() => (onSelectEvent ? onSelectEvent(event) : navigate(`/events/${event.id}`))}
                className="p-3.5 rounded-2xl border border-[#EAEAEA] hover:border-neutral-300 hover:bg-[#F8F8F8]/70 transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <span
                    className={cn(
                      'text-[10px] font-bold px-2 py-0.5 rounded-md text-white',
                      getCategoryColor(event.category)
                    )}
                  >
                    {event.category}
                  </span>
                  <span className="text-[11px] text-neutral-500 font-medium flex items-center gap-1">
                    <Clock className="w-3 h-3 text-neutral-400" />
                    {format(parseISO(event.event_date), 'MMM d')} • {event.start_time}
                  </span>
                </div>

                <h5 className="font-semibold text-[#111111] text-xs sm:text-sm line-clamp-1 group-hover:text-[#7865F5] transition-colors">
                  {event.title}
                </h5>

                <div className="flex items-center justify-between mt-2 pt-2 border-t border-neutral-100 text-[11px] text-neutral-500">
                  <div className="flex items-center gap-1 truncate max-w-[165px]">
                    <MapPin className="w-3 h-3 text-neutral-400 shrink-0" />
                    <span className="truncate">{event.location}</span>
                  </div>

                  <button
                    onClick={(e) => handleRegister(e, event.id, event.is_registered)}
                    className={cn(
                      'px-2.5 py-1 rounded-full text-[10px] font-semibold transition-all shrink-0',
                      event.is_registered
                        ? 'bg-emerald-50 text-[#16A36A] border border-emerald-200'
                        : 'bg-[#111111] text-white hover:bg-black'
                    )}
                  >
                    {event.is_registered ? 'Registered ✓' : 'Register'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <Link
          to="/events"
          className="mt-4 w-full py-2.5 rounded-xl bg-[#F8F8F8] hover:bg-neutral-100 border border-[#EAEAEA] text-xs font-bold text-[#111111] flex items-center justify-center gap-1.5 transition-colors"
        >
          <span>View All Events</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Mentorship Quick Banner */}
      <div className="bg-[#111111] text-white rounded-3xl p-5 shadow-sm relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-1.5 text-xs text-amber-400 font-semibold mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Alumni Mentorship Open</span>
          </div>
          <h5 className="font-bold text-sm leading-snug">Need 1-on-1 Career or Academic Guidance?</h5>
          <p className="text-xs text-neutral-300 mt-1 mb-3">
            Book 30-min portfolio and career sessions with verified alumni leaders.
          </p>
          <Link
            to="/mentorship"
            className="inline-flex items-center text-xs font-semibold text-white bg-white/15 hover:bg-white/25 px-3.5 py-1.5 rounded-full transition-colors"
          >
            Find a Mentor →
          </Link>
        </div>
      </div>
    </aside>
  );
};
