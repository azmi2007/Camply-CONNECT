import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  addMonths,
  subMonths,
  addWeeks,
  subWeeks,
  isSameMonth,
  isSameDay,
  parseISO
} from 'date-fns';
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Plus,
  LayoutGrid,
  Columns3,
  List,
  ArrowLeft
} from 'lucide-react';
import { useEventStore } from '../../store/useEventStore';
import { useAuthStore } from '../../store/useAuthStore';
import { EventCategory } from '../../types';
import { Button } from '../../components/ui/Button';
import { CreateEventModal } from '../../components/forms/CreateEventModal';
import { cn } from '../../lib/utils';

type CalendarView = 'month' | 'week' | 'agenda';

export const CalendarPage: React.FC = () => {
  const navigate = useNavigate();
  const { events, selectedCategory, setSelectedCategory, registerEvent, cancelRegistration } = useEventStore();
  const { user } = useAuthStore();

  const todayDate = useMemo(() => new Date(2026, 10, 26), []);
  const [cursorDate, setCursorDate] = useState(todayDate);
  const [view, setView] = useState<CalendarView>('month');
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const categories: EventCategory[] = [
    'All Events',
    'Academic',
    'Workshop',
    'Seminar',
    'Networking',
    'Career Fair',
    'Competition'
  ];

  const filteredEvents = useMemo(() => {
    return events
      .filter((e) => selectedCategory === 'All Events' || e.category === selectedCategory)
      .sort((a, b) => a.event_date.localeCompare(b.event_date));
  }, [events, selectedCategory]);

  const monthDays = useMemo(() => {
    const start = startOfWeek(startOfMonth(cursorDate));
    const end = endOfWeek(endOfMonth(cursorDate));
    return eachDayOfInterval({ start, end });
  }, [cursorDate]);

  const weekDays = useMemo(() => {
    const start = startOfWeek(cursorDate);
    const end = endOfWeek(cursorDate);
    return eachDayOfInterval({ start, end });
  }, [cursorDate]);

  const handlePrev = () => {
    if (view === 'week') setCursorDate(subWeeks(cursorDate, 1));
    else setCursorDate(subMonths(cursorDate, 1));
  };

  const handleNext = () => {
    if (view === 'week') setCursorDate(addWeeks(cursorDate, 1));
    else setCursorDate(addMonths(cursorDate, 1));
  };

  const getCategoryStyles = (cat: string) => {
    switch (cat) {
      case 'Academic': return 'bg-sky-50 text-sky-700 border-sky-200';
      case 'Seminar': return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'Workshop': return 'bg-purple-50 text-[#7865F5] border-purple-200';
      case 'Career Fair': return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'Networking': return 'bg-emerald-50 text-[#16A36A] border-emerald-200';
      case 'Competition': return 'bg-rose-50 text-rose-700 border-rose-200';
      default: return 'bg-neutral-100 text-neutral-800 border-neutral-200';
    }
  };

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <Link
            to="/events"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-500 hover:text-[#111111] mb-3"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Events Directory</span>
          </Link>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#7865F5]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#929292]">
              Full Campus Calendar
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111111] tracking-tight">
            University Events Schedule
          </h1>
        </div>

        <div className="flex items-center gap-2.5">
          {user && (
            <Button
              variant="primary"
              size="md"
              onClick={() => setIsCreateOpen(true)}
              icon={<Plus className="w-4 h-4" />}
            >
              Create Event
            </Button>
          )}
        </div>
      </div>

      {/* Controls Bar */}
      <div className="bg-white rounded-3xl border border-[#EAEAEA] p-4 sm:p-5 mb-6 shadow-xs flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        {/* Date Navigation */}
        <div className="flex items-center justify-between lg:justify-start gap-3">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCursorDate(todayDate)}
              className="px-3.5 py-1.5 rounded-full border border-[#EAEAEA] text-xs font-semibold text-[#111111] hover:bg-[#F8F8F8]"
            >
              Today
            </button>
            <button
              onClick={handlePrev}
              aria-label="Previous period"
              className="p-2 rounded-full border border-[#EAEAEA] text-neutral-600 hover:bg-[#F8F8F8]"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next period"
              className="p-2 rounded-full border border-[#EAEAEA] text-neutral-600 hover:bg-[#F8F8F8]"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <h2 className="font-extrabold text-lg text-[#111111]">
            {view === 'week'
              ? `Week of ${format(startOfWeek(cursorDate), 'MMM d, yyyy')}`
              : format(cursorDate, 'MMMM yyyy')}
          </h2>
        </div>

        {/* View Switcher */}
        <div className="flex items-center gap-1 bg-[#F8F8F8] p-1 rounded-full border border-[#EAEAEA] self-start lg:self-auto">
          <button
            onClick={() => setView('month')}
            className={cn(
              'px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all',
              view === 'month' ? 'bg-[#111111] text-white shadow-xs' : 'text-neutral-600 hover:text-[#111111]'
            )}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Month</span>
          </button>
          <button
            onClick={() => setView('week')}
            className={cn(
              'px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all',
              view === 'week' ? 'bg-[#111111] text-white shadow-xs' : 'text-neutral-600 hover:text-[#111111]'
            )}
          >
            <Columns3 className="w-3.5 h-3.5" />
            <span>Week</span>
          </button>
          <button
            onClick={() => setView('agenda')}
            className={cn(
              'px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all',
              view === 'agenda' ? 'bg-[#111111] text-white shadow-xs' : 'text-neutral-600 hover:text-[#111111]'
            )}
          >
            <List className="w-3.5 h-3.5" />
            <span>Agenda</span>
          </button>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-4 mb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={cn(
              'text-xs font-semibold px-3.5 py-1.5 rounded-full whitespace-nowrap transition-all border',
              selectedCategory === cat
                ? 'bg-[#111111] text-white border-[#111111]'
                : 'bg-white text-neutral-600 border-[#EAEAEA] hover:border-neutral-300'
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* MONTH VIEW */}
      {view === 'month' && (
        <div className="bg-white rounded-3xl border border-[#EAEAEA] overflow-hidden shadow-xs">
          <div className="grid grid-cols-7 border-b border-[#EAEAEA] bg-[#F8F8F8]">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
              <div key={d} className="py-3 text-center text-xs font-bold text-[#929292] uppercase tracking-wider">
                {d}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 auto-rows-[minmax(110px,auto)] divide-x divide-y divide-[#EAEAEA]">
            {monthDays.map((dayObj) => {
              const dateKey = format(dayObj, 'yyyy-MM-dd');
              const dayEvents = filteredEvents.filter((e) => e.event_date === dateKey);
              const inMonth = isSameMonth(dayObj, cursorDate);
              const isToday = isSameDay(dayObj, todayDate);

              return (
                <div
                  key={dateKey}
                  className={cn(
                    'p-2.5 flex flex-col gap-1.5 min-h-[115px]',
                    !inMonth && 'bg-[#F8F8F8]/60 text-neutral-400'
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={cn(
                        'w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center',
                        isToday
                          ? 'bg-[#7865F5] text-white'
                          : inMonth
                          ? 'text-[#111111]'
                          : 'text-neutral-400'
                      )}
                    >
                      {format(dayObj, 'd')}
                    </span>
                    {dayEvents.length > 0 && (
                      <span className="text-[10px] font-semibold text-[#929292]">
                        {dayEvents.length}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col gap-1">
                    {dayEvents.map((ev) => (
                      <button
                        key={ev.id}
                        onClick={() => navigate(`/events/${ev.id}`)}
                        className={cn(
                          'text-left px-2 py-1 rounded-lg text-[11px] font-semibold border truncate hover:opacity-85 transition-opacity',
                          getCategoryStyles(ev.category)
                        )}
                        title={`${ev.title} (${ev.start_time})`}
                      >
                        {ev.start_time} {ev.title}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* WEEK VIEW */}
      {view === 'week' && (
        <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
          {weekDays.map((dayObj) => {
            const dateKey = format(dayObj, 'yyyy-MM-dd');
            const dayEvents = filteredEvents.filter((e) => e.event_date === dateKey);
            const isToday = isSameDay(dayObj, todayDate);

            return (
              <div
                key={dateKey}
                className={cn(
                  'bg-white rounded-3xl border p-4 flex flex-col gap-3 min-h-[260px]',
                  isToday ? 'border-[#7865F5] ring-1 ring-[#7865F5]/20' : 'border-[#EAEAEA]'
                )}
              >
                <div className="pb-2 border-b border-neutral-100 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold uppercase text-[#929292] block">
                      {format(dayObj, 'EEE')}
                    </span>
                    <span className="text-lg font-extrabold text-[#111111]">
                      {format(dayObj, 'd MMM')}
                    </span>
                  </div>
                  {isToday && (
                    <span className="text-[10px] font-bold bg-[#7865F5] text-white px-2 py-0.5 rounded-full">
                      Today
                    </span>
                  )}
                </div>

                {dayEvents.length === 0 ? (
                  <p className="text-[11px] text-[#929292] py-6 text-center">No events</p>
                ) : (
                  <div className="flex flex-col gap-2">
                    {dayEvents.map((ev) => (
                      <div
                        key={ev.id}
                        onClick={() => navigate(`/events/${ev.id}`)}
                        className="p-2.5 rounded-2xl border border-[#EAEAEA] hover:border-neutral-300 cursor-pointer bg-[#F8F8F8]/50 transition-all"
                      >
                        <span
                          className={cn(
                            'text-[10px] font-bold px-2 py-0.5 rounded-full border inline-block mb-1',
                            getCategoryStyles(ev.category)
                          )}
                        >
                          {ev.category}
                        </span>
                        <h4 className="font-bold text-xs text-[#111111] line-clamp-2">{ev.title}</h4>
                        <div className="text-[10px] text-neutral-500 mt-1 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {ev.start_time}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* AGENDA VIEW */}
      {view === 'agenda' && (
        <div className="flex flex-col gap-4">
          {filteredEvents.length === 0 ? (
            <div className="bg-white rounded-3xl border border-[#EAEAEA] p-12 text-center">
              <CalendarIcon className="w-10 h-10 text-neutral-300 mx-auto mb-3" />
              <p className="text-sm font-bold text-[#111111]">No scheduled events in this category</p>
            </div>
          ) : (
            filteredEvents.map((ev) => (
              <div
                key={ev.id}
                onClick={() => navigate(`/events/${ev.id}`)}
                className="bg-white rounded-3xl border border-[#EAEAEA] p-5 hover:border-neutral-300 hover:shadow-md transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start sm:items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-[#F8F8F8] border border-[#EAEAEA] flex flex-col items-center justify-center shrink-0">
                    <span className="text-[10px] font-bold uppercase text-[#7865F5]">
                      {format(parseISO(ev.event_date), 'MMM')}
                    </span>
                    <span className="text-xl font-extrabold text-[#111111] leading-none">
                      {format(parseISO(ev.event_date), 'd')}
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={cn(
                          'text-[10px] font-bold px-2.5 py-0.5 rounded-full border',
                          getCategoryStyles(ev.category)
                        )}
                      >
                        {ev.category}
                      </span>
                      <span className="text-xs text-neutral-500 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {ev.start_time} - {ev.end_time}
                      </span>
                    </div>
                    <h3 className="font-bold text-base text-[#111111]">{ev.title}</h3>
                    <div className="text-xs text-[#929292] flex items-center gap-1.5 mt-1">
                      <MapPin className="w-3.5 h-3.5" /> {ev.location}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 self-end sm:self-center">
                  <Button
                    variant={ev.is_registered ? 'secondary' : 'primary'}
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (ev.is_registered) cancelRegistration(ev.id);
                      else registerEvent(ev.id);
                    }}
                  >
                    {ev.is_registered ? 'Registered ✓' : 'Register'}
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      <CreateEventModal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} />
    </div>
  );
};
