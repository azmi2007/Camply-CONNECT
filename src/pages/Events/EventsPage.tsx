import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useEventStore } from '../../store/useEventStore';
import { EventCard } from '../../components/cards/EventCard';
import { CreateEventModal } from '../../components/forms/CreateEventModal';
import { Button } from '../../components/ui/Button';
import { RoleBadge } from '../../components/ui/RoleBadge';
import { EventCategory } from '../../types';
import {
  Search,
  Plus,
  Calendar,
  CalendarDays,
  LayoutGrid,
  List,
  Clock,
  MapPin,
  Users,
  Check
} from 'lucide-react';
import { formatDate } from '../../lib/utils';

type EventTab = 'all' | 'upcoming' | 'featured' | 'past';
type DateWindow = 'all' | 'this-week' | 'this-month' | 'next-month';

export const EventsPage: React.FC = () => {
  const navigate = useNavigate();
  const { events, registerEvent, cancelRegistration } = useEventStore();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<EventCategory>('All Events');
  const [activeTab, setActiveTab] = useState<EventTab>('all');
  const [dateWindow, setDateWindow] = useState<DateWindow>('all');
  const [layoutMode, setLayoutMode] = useState<'grid' | 'list'>('grid');
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const categories: EventCategory[] = [
    'All Events',
    'Academic',
    'Workshop',
    'Seminar',
    'Webinar',
    'Networking',
    'Career Fair',
    'Campus Gathering',
    'Competition'
  ];

  const filteredEvents = useMemo(() => {
    return events.filter((e) => {
      const q = search.trim().toLowerCase();
      const matchesSearch =
        !q ||
        e.title.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q) ||
        e.location.toLowerCase().includes(q);

      const matchesCategory = selectedCategory === 'All Events' || e.category === selectedCategory;

      const matchesTab =
        activeTab === 'all'
          ? true
          : activeTab === 'upcoming'
          ? e.status === 'UPCOMING'
          : activeTab === 'past'
          ? e.status === 'COMPLETED'
          : Boolean(e.is_featured);

      const matchesDate =
        dateWindow === 'all'
          ? true
          : dateWindow === 'this-week'
          ? e.event_date >= '2026-11-23' && e.event_date <= '2026-11-30'
          : dateWindow === 'this-month'
          ? e.event_date.startsWith('2026-11')
          : e.event_date.startsWith('2026-12');

      return matchesSearch && matchesCategory && matchesTab && matchesDate;
    });
  }, [events, search, selectedCategory, activeTab, dateWindow]);

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#7865F5]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#929292]">
              Campus Activities & Schedule
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111111] tracking-tight">
            Events, Workshops & Summits
          </h1>
          <p className="text-sm text-[#929292] mt-1">
            Discover student workshops, career fairs, faculty conferences, and hackathons.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link to="/calendar">
            <Button variant="secondary" size="md" icon={<CalendarDays className="w-4 h-4" />}>
              Full Calendar View
            </Button>
          </Link>
          <Button
            variant="primary"
            size="md"
            onClick={() => setIsCreateOpen(true)}
            icon={<Plus className="w-4 h-4" />}
          >
            Host an Event
          </Button>
        </div>
      </div>

      {/* Tabs + Layout Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {[
            { key: 'all', label: 'All Events' },
            { key: 'upcoming', label: 'Upcoming' },
            { key: 'featured', label: 'Featured' },
            { key: 'past', label: 'Past Events' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as EventTab)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap border transition-all ${
                activeTab === tab.key
                  ? 'bg-[#111111] text-white border-[#111111]'
                  : 'bg-white text-neutral-600 border-[#EAEAEA] hover:border-neutral-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <select
            aria-label="Filter by date range"
            value={dateWindow}
            onChange={(e) => setDateWindow(e.target.value as DateWindow)}
            className="text-xs px-3 py-1.5 rounded-full border border-[#EAEAEA] bg-white font-semibold text-neutral-700"
          >
            <option value="all">Any Date</option>
            <option value="this-week">This Week</option>
            <option value="this-month">November 2026</option>
            <option value="next-month">December 2026</option>
          </select>

          <div className="flex items-center bg-white border border-[#EAEAEA] rounded-full p-1">
            <button
              onClick={() => setLayoutMode('grid')}
              aria-label="Grid layout"
              className={`p-1.5 rounded-full transition-colors ${
                layoutMode === 'grid' ? 'bg-[#111111] text-white' : 'text-neutral-500 hover:text-[#111111]'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setLayoutMode('list')}
              aria-label="List layout"
              className={`p-1.5 rounded-full transition-colors ${
                layoutMode === 'list' ? 'bg-[#111111] text-white' : 'text-neutral-500 hover:text-[#111111]'
              }`}
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Search & Category Pills */}
      <div className="bg-white rounded-3xl border border-[#EAEAEA] p-4 sm:p-5 mb-8 shadow-xs flex flex-col gap-4">
        <div className="relative">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search events by title, keyword, or venue..."
            className="w-full text-xs sm:text-sm pl-10 pr-4 py-2.5 rounded-xl border border-[#EAEAEA] focus:outline-none focus:border-[#7865F5] bg-[#F8F8F8]"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs font-semibold px-3.5 py-1.5 rounded-full whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-[#111111] text-white shadow-xs'
                  : 'bg-[#F8F8F8] text-neutral-600 hover:bg-neutral-200/80 hover:text-neutral-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Events View */}
      {filteredEvents.length === 0 ? (
        <div className="bg-white rounded-3xl border border-[#EAEAEA] p-12 text-center">
          <Calendar className="w-10 h-10 text-neutral-300 mx-auto mb-3" />
          <h3 className="font-bold text-[#111111] text-base">No events found</h3>
          <p className="text-xs text-[#929292] mt-1 mb-4">
            Try adjusting your search criteria, date filter, or category filter.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSearch('');
              setSelectedCategory('All Events');
              setActiveTab('all');
              setDateWindow('all');
            }}
          >
            Reset Filters
          </Button>
        </div>
      ) : layoutMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onSelect={(ev) => navigate(`/events/${ev.id}`)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {filteredEvents.map((ev) => {
            const seatsLeft = Math.max(0, ev.max_participants - ev.current_participants);
            return (
              <div
                key={ev.id}
                onClick={() => navigate(`/events/${ev.id}`)}
                className="bg-white rounded-3xl border border-[#EAEAEA] p-5 hover:border-neutral-300 hover:shadow-md transition-all cursor-pointer flex flex-col md:flex-row items-start md:items-center justify-between gap-5"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <img
                    src={ev.banner_url}
                    alt={ev.title}
                    className="w-full sm:w-36 h-24 rounded-2xl object-cover border border-neutral-100 shrink-0"
                  />
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className="text-[11px] font-bold bg-[#F8F8F8] border border-[#EAEAEA] px-2.5 py-0.5 rounded-full text-[#111111]">
                        {ev.category}
                      </span>
                      <span className="text-xs text-neutral-500 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#7865F5]" /> {formatDate(ev.event_date)}
                      </span>
                      <span className="text-xs text-neutral-500 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#7865F5]" /> {ev.start_time}
                      </span>
                    </div>
                    <h3 className="font-bold text-base text-[#111111] hover:text-[#7865F5] transition-colors">
                      {ev.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 mt-1.5 text-xs text-[#929292]">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" /> {ev.location}
                      </span>
                      <span className="flex items-center gap-1 text-[#16A36A] font-semibold">
                        <Users className="w-3.5 h-3.5" /> {seatsLeft} seats available
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end md:self-center shrink-0">
                  {ev.organizer && <RoleBadge role={ev.organizer.role} size="sm" />}
                  <Button
                    variant={ev.is_registered ? 'secondary' : 'primary'}
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (ev.is_registered) cancelRegistration(ev.id);
                      else registerEvent(ev.id);
                    }}
                    icon={ev.is_registered ? <Check className="w-3.5 h-3.5 text-[#16A36A]" /> : undefined}
                  >
                    {ev.is_registered ? 'Registered' : 'Join Event'}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <CreateEventModal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} />
    </div>
  );
};
