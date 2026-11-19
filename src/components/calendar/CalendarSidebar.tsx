import React, { useState, useMemo } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Plus, 
  Filter, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { useEventStore } from '../../store/useEventStore';
import { useAuthStore } from '../../store/useAuthStore';
import { EventCategory, EventItem } from '../../types';
import { cn, formatDate } from '../../lib/utils';
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

  // Current view date in calendar (defaults to November 2026 based on mock dataset & local time)
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 10, 1)); // Nov 2026

  // Categories for the calendar filter
  const filterCategories: EventCategory[] = [
    'All Events',
    'Seminar',
    'Workshop',
    'Career Fair',
    'Networking',
    'Competition'
  ];

  // Helper calculations for calendar grid
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const firstDayIndex = new Date(year, month, 1).getDay(); // 0 is Sunday
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Prev month navigation
  const prevMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1));
  };

  // Next month navigation
  const nextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1));
  };

  // Map events to dates (key format: YYYY-MM-DD)
  const eventsByDate = useMemo(() => {
    const map = new Map<string, EventItem[]>();
    events.forEach((event) => {
      // Filter by category if one is active
      if (selectedCategory !== 'All Events' && event.category !== selectedCategory) {
        return;
      }
      const existing = map.get(event.event_date) || [];
      map.set(event.event_date, [...existing, event]);
    });
    return map;
  }, [events, selectedCategory]);

  // Selected or upcoming events list
  const displayedEvents = useMemo(() => {
    if (selectedDate) {
      return events.filter((e) => {
        const matchesDate = e.event_date === selectedDate;
        const matchesCat = selectedCategory === 'All Events' || e.category === selectedCategory;
        return matchesDate && matchesCat;
      });
    }
    // If no date is specifically selected, show upcoming 3 events
    return events
      .filter((e) => selectedCategory === 'All Events' || e.category === selectedCategory)
      .slice(0, 3);
  }, [events, selectedDate, selectedCategory]);

  const handleDateClick = (dayString: string) => {
    if (selectedDate === dayString) {
      setSelectedDate(null); // toggle off
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
      case 'Seminar': return 'bg-indigo-500';
      case 'Workshop': return 'bg-[#7865F5]';
      case 'Career Fair': return 'bg-amber-500';
      case 'Networking': return 'bg-emerald-500';
      case 'Competition': return 'bg-rose-500';
      default: return 'bg-neutral-800';
    }
  };

  return (
    <aside className="sticky top-24 w-full flex flex-col gap-5">
      {/* Main Calendar Card */}
      <div className="bg-white rounded-3xl border border-[#EAEAEA] p-5 sm:p-6 shadow-sm shadow-neutral-100/60">
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-800">
              <CalendarIcon className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-neutral-900 text-base leading-tight">
                {monthNames[month]} {year}
              </h3>
              <p className="text-xs text-neutral-400">Campus Schedule</p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={prevMonth}
              aria-label="Previous month"
              className="p-1.5 rounded-lg border border-neutral-200 text-neutral-600 hover:bg-neutral-100 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextMonth}
              aria-label="Next month"
              className="p-1.5 rounded-lg border border-neutral-200 text-neutral-600 hover:bg-neutral-100 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-3 mb-3 border-b border-neutral-100">
          {filterCategories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  'text-[11px] font-medium px-2.5 py-1 rounded-full whitespace-nowrap transition-all duration-200 shrink-0',
                  isActive
                    ? 'bg-[#111111] text-white shadow-sm'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200/80 hover:text-neutral-900'
                )}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Calendar Day Labels */}
        <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-semibold text-neutral-400 mb-2">
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
          {/* Empty cells before month starts */}
          {Array.from({ length: firstDayIndex }).map((_, i) => (
            <div key={`empty-${i}`} className="h-9 w-full" />
          ))}

          {/* Month Days */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const dayNum = i + 1;
            const dayString = `${year}-${String(month + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
            const dayEvents = eventsByDate.get(dayString) || [];
            const hasEvents = dayEvents.length > 0;
            const isSelected = selectedDate === dayString;
            // Check if today (Nov 13, 2026 or current system date)
            const isToday = dayNum === 13 && month === 10 && year === 2026;

            return (
              <button
                key={dayString}
                onClick={() => handleDateClick(dayString)}
                className={cn(
                  'h-9 w-full rounded-xl flex flex-col items-center justify-center relative text-xs font-medium transition-all group',
                  isSelected
                    ? 'bg-[#111111] text-white shadow-md'
                    : isToday
                    ? 'bg-neutral-100 text-[#7865F5] font-bold border border-[#7865F5]/30'
                    : 'text-neutral-700 hover:bg-neutral-100'
                )}
              >
                <span>{dayNum}</span>

                {/* Event Indicator Dots */}
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

        {/* Calendar Footer / Reset date filter */}
        <div className="flex items-center justify-between pt-4 mt-3 border-t border-neutral-100 text-xs">
          <span className="text-neutral-500">
            {selectedDate ? (
              <span className="font-medium text-neutral-800">
                Filtered: {formatDate(selectedDate)}
              </span>
            ) : (
              'Upcoming Highlights'
            )}
          </span>
          {selectedDate && (
            <button
              onClick={() => setSelectedDate(null)}
              className="text-[#7865F5] hover:underline font-semibold"
            >
              Show all
            </button>
          )}
        </div>
      </div>

      {/* Events List for Selected Day or Upcoming */}
      <div className="bg-white rounded-3xl border border-[#EAEAEA] p-5 sm:p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h4 className="font-bold text-neutral-900 text-sm">
              {selectedDate ? `Events for ${formatDate(selectedDate)}` : 'Upcoming Campus Schedule'}
            </h4>
            <span className="text-xs bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded-full font-medium">
              {displayedEvents.length}
            </span>
          </div>

          {/* Quick Create Event Button */}
          {user && (
            <button
              onClick={onOpenCreateEvent}
              className="text-xs font-semibold text-[#7865F5] hover:text-[#6752EE] inline-flex items-center gap-1 p-1 rounded-lg hover:bg-purple-50 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Post Event</span>
            </button>
          )}
        </div>

        {displayedEvents.length === 0 ? (
          <div className="py-8 text-center">
            <p className="text-xs text-neutral-400">No events scheduled for this day.</p>
            {user && (
              <Button
                variant="outline"
                size="sm"
                onClick={onOpenCreateEvent}
                className="mt-3 text-xs"
                icon={<Plus className="w-3.5 h-3.5" />}
              >
                Host an Event
              </Button>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {displayedEvents.map((event) => (
              <div
                key={event.id}
                onClick={() => onSelectEvent?.(event)}
                className="p-3.5 rounded-2xl border border-neutral-100 hover:border-neutral-300 hover:bg-neutral-50/70 transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <span className={cn(
                    'text-[10px] font-bold px-2 py-0.5 rounded-md text-white',
                    getCategoryColor(event.category)
                  )}>
                    {event.category}
                  </span>
                  <span className="text-[11px] text-neutral-500 font-medium flex items-center gap-1">
                    <Clock className="w-3 h-3 text-neutral-400" />
                    {event.start_time}
                  </span>
                </div>

                <h5 className="font-semibold text-neutral-900 text-xs sm:text-sm line-clamp-1 group-hover:text-[#7865F5] transition-colors">
                  {event.title}
                </h5>

                <div className="flex items-center justify-between mt-2 pt-2 border-t border-neutral-100/80 text-[11px] text-neutral-500">
                  <div className="flex items-center gap-1 truncate max-w-[170px]">
                    <MapPin className="w-3 h-3 text-neutral-400 shrink-0" />
                    <span className="truncate">{event.location}</span>
                  </div>

                  <button
                    onClick={(e) => handleRegister(e, event.id, event.is_registered)}
                    className={cn(
                      'px-2.5 py-1 rounded-full text-[10px] font-semibold transition-all shrink-0',
                      event.is_registered
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
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
      </div>

      {/* Mini Promotion / Mentorship Banner */}
      <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 text-white rounded-3xl p-5 shadow-sm relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-1.5 text-xs text-amber-400 font-semibold mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Alumni Mentorship Open</span>
          </div>
          <h5 className="font-bold text-sm leading-snug">Need 1-on-1 Career or Academic Guidance?</h5>
          <p className="text-xs text-neutral-300 mt-1 mb-3">
            Book 30-min portfolio and career sessions with verified alumni leaders.
          </p>
          <a
            href="/mentorship"
            className="inline-flex items-center text-xs font-semibold text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full transition-colors"
          >
            Find a Mentor →
          </a>
        </div>
      </div>
    </aside>
  );
};

