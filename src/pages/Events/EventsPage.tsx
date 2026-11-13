import React, { useState, useMemo } from 'react';
import { useEventStore } from '../../store/useEventStore';
import { useAuthStore } from '../../store/useAuthStore';
import { EventCard } from '../../components/cards/EventCard';
import { CreateEventModal } from '../../components/forms/CreateEventModal';
import { Modal } from '../../components/ui/Modal';
import { Button } from '../../components/ui/Button';
import { EventCategory, EventItem } from '../../types';
import { Search, Plus, Calendar, Clock, MapPin, ExternalLink } from 'lucide-react';
import { formatDate } from '../../lib/utils';
import confetti from 'canvas-confetti';

export const EventsPage: React.FC = () => {
  const { events, registerEvent, cancelRegistration } = useEventStore();
  const { user } = useAuthStore();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<EventCategory>('All Events');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedEventModal, setSelectedEventModal] = useState<EventItem | null>(null);

  const categories: EventCategory[] = [
    'All Events',
    'Seminar',
    'Workshop',
    'Career Fair',
    'Networking',
    'Competition',
    'Webinar',
    'Academic',
    'Campus Gathering'
  ];

  const filteredEvents = useMemo(() => {
    return events.filter((e) => {
      const matchesSearch =
        e.title.toLowerCase().includes(search.toLowerCase()) ||
        e.description.toLowerCase().includes(search.toLowerCase()) ||
        e.location.toLowerCase().includes(search.toLowerCase());

      const matchesCategory = selectedCategory === 'All Events' || e.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [events, search, selectedCategory]);

  const handleRegisterModalEvent = () => {
    if (!selectedEventModal) return;
    if (selectedEventModal.is_registered) {
      cancelRegistration(selectedEventModal.id);
    } else {
      registerEvent(selectedEventModal.id);
      confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
    }
    setSelectedEventModal(null);
  };

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#7865F5]" />
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
              Campus Activities & Schedule
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111111] tracking-tight">
            Events, Workshops & Summits
          </h1>
          <p className="text-sm text-neutral-500 mt-1">
            Discover student workshops, career fairs, faculty conferences, and hackathons.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={() => setIsCreateOpen(true)}
          icon={<Plus className="w-4 h-4" />}
        >
          Host an Event
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-3xl border border-[#EAEAEA] p-4 sm:p-5 mb-8 shadow-xs flex flex-col gap-4">
        <div className="relative">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search events by title, keyword, or venue..."
            className="w-full text-xs sm:text-sm pl-10 pr-4 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-[#7865F5] bg-neutral-50/50"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs font-semibold px-3.5 py-1.5 rounded-full whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-[#111111] text-white shadow-xs'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200/80 hover:text-neutral-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Events Grid */}
      {filteredEvents.length === 0 ? (
        <div className="bg-white rounded-3xl border border-[#EAEAEA] p-12 text-center">
          <Calendar className="w-10 h-10 text-neutral-300 mx-auto mb-3" />
          <h3 className="font-bold text-neutral-900 text-base">No events found</h3>
          <p className="text-xs text-neutral-400 mt-1 mb-4">
            Try adjusting your search criteria or category filter.
          </p>
          <Button variant="outline" size="sm" onClick={() => { setSearch(''); setSelectedCategory('All Events'); }}>
            Reset Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onSelect={(ev) => setSelectedEventModal(ev)}
            />
          ))}
        </div>
      )}

      {/* Create Event Modal */}
      <CreateEventModal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} />

      {/* Event Details Preview Modal */}
      {selectedEventModal && (
        <Modal
          isOpen={Boolean(selectedEventModal)}
          onClose={() => setSelectedEventModal(null)}
          title={selectedEventModal.title}
          maxWidth="lg"
        >
          <div className="flex flex-col gap-4">
            <div className="relative h-48 w-full rounded-2xl overflow-hidden bg-neutral-100">
              <img
                src={selectedEventModal.banner_url}
                alt={selectedEventModal.title}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-neutral-900">
                {selectedEventModal.category}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs bg-neutral-50 p-3 rounded-2xl border border-neutral-100">
              <div className="flex items-center gap-2 text-neutral-700">
                <Calendar className="w-4 h-4 text-[#7865F5]" />
                <span>{formatDate(selectedEventModal.event_date)}</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-700">
                <Clock className="w-4 h-4 text-[#7865F5]" />
                <span>{selectedEventModal.start_time} - {selectedEventModal.end_time}</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-700 col-span-2">
                <MapPin className="w-4 h-4 text-[#7865F5] shrink-0" />
                <span>{selectedEventModal.location}</span>
              </div>
            </div>

            <div>
              <h5 className="font-bold text-neutral-900 text-sm mb-1.5">About this Event</h5>
              <p className="text-xs text-neutral-600 leading-relaxed">
                {selectedEventModal.description}
              </p>
            </div>

            {selectedEventModal.online_link && (
              <div className="flex items-center justify-between p-3 rounded-xl bg-purple-50 text-[#7865F5] text-xs font-medium">
                <span>Live Event Stream / Video Link Available</span>
                <ExternalLink className="w-4 h-4" />
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-neutral-100 mt-2">
              <span className="text-xs text-neutral-500 font-medium">
                {selectedEventModal.current_participants} / {selectedEventModal.max_participants} registered
              </span>
              <Button
                variant={selectedEventModal.is_registered ? 'secondary' : 'primary'}
                size="md"
                onClick={handleRegisterModalEvent}
              >
                {selectedEventModal.is_registered ? 'Cancel Registration' : 'Register for Event'}
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

