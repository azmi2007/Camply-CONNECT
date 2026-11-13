import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { HeroSection } from './HeroSection';
import { StatsSection } from './StatsSection';
import { PartnersSection } from './PartnersSection';
import { CategoryPills } from './CategoryPills';
import { CalendarSidebar } from '../../components/calendar/CalendarSidebar';
import { EventCard } from '../../components/cards/EventCard';
import { AlumniCard } from '../../components/cards/AlumniCard';
import { JobCard } from '../../components/cards/JobCard';
import { CreateEventModal } from '../../components/forms/CreateEventModal';
import { Modal } from '../../components/ui/Modal';
import { Button } from '../../components/ui/Button';
import { RoleBadge } from '../../components/ui/RoleBadge';
import { useEventStore } from '../../store/useEventStore';
import { useCareerStore } from '../../store/useCareerStore';
import { useCommunityStore } from '../../store/useCommunityStore';
import { EventItem, Profile } from '../../types';
import { 
  ArrowRight, 
  Calendar as CalendarIcon, 
  Sparkles, 
  Briefcase, 
  Users, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  ChevronRight,
  ExternalLink 
} from 'lucide-react';
import { formatDate } from '../../lib/utils';
import confetti from 'canvas-confetti';

export const HomePage: React.FC = () => {
  const { events, selectedCategory: eventCat, registerEvent, cancelRegistration } = useEventStore();
  const { jobs } = useCareerStore();
  const { members } = useCommunityStore();

  const [selectedDiscipline, setSelectedDiscipline] = useState('All');
  const [isCreateEventOpen, setIsCreateEventOpen] = useState(false);
  const [selectedEventModal, setSelectedEventModal] = useState<EventItem | null>(null);
  const [selectedProfileModal, setSelectedProfileModal] = useState<Profile | null>(null);

  // Filter events based on selected discipline if applicable
  const featuredEvents = useMemo(() => {
    return events.slice(0, 4);
  }, [events]);

  const featuredAlumni = useMemo(() => {
    return members.filter((m) => m.role === 'ALUMNI').slice(0, 3);
  }, [members]);

  const featuredJobs = useMemo(() => {
    return jobs.slice(0, 3);
  }, [jobs]);

  const topStudents = useMemo(() => {
    return members.filter((m) => m.role === 'STUDENT').slice(0, 3);
  }, [members]);

  const handleRegisterModalEvent = () => {
    if (!selectedEventModal) return;
    if (selectedEventModal.is_registered) {
      cancelRegistration(selectedEventModal.id);
    } else {
      registerEvent(selectedEventModal.id);
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
    setSelectedEventModal(null);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section */}
      <HeroSection onOpenCreateEvent={() => setIsCreateEventOpen(true)} />

      {/* 2. Key Statistics */}
      <StatsSection />

      {/* 3. University Partners Logo Bar */}
      <PartnersSection />

      {/* 4. MAIN TWO-COLUMN CONTENT WITH CALENDAR SIDEBAR */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            
            {/* ================= LEFT COLUMN: MAIN CONTENT ================= */}
            <div className="lg:col-span-8 flex flex-col gap-14">
              
              {/* Category Pills Navigation */}
              <CategoryPills
                selectedCategory={selectedDiscipline}
                onSelectCategory={setSelectedDiscipline}
              />

              {/* Section: Featured Events */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#7865F5]" />
                      <h2 className="text-2xl font-extrabold text-neutral-900 tracking-tight">
                        Featured Campus Events
                      </h2>
                    </div>
                    <p className="text-xs sm:text-sm text-neutral-500 mt-1">
                      Academic seminars, interactive workshops, and high-impact campus gatherings.
                    </p>
                  </div>

                  <Link
                    to="/events"
                    className="text-xs font-bold text-neutral-900 hover:text-[#7865F5] flex items-center gap-1 transition-colors group"
                  >
                    <span>View all events</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>

                {/* Events Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {featuredEvents.map((event) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      onSelect={(ev) => setSelectedEventModal(ev)}
                    />
                  ))}
                </div>
              </div>

              {/* Section: Featured Alumni */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                      <h2 className="text-2xl font-extrabold text-neutral-900 tracking-tight">
                        Featured Alumni Leaders
                      </h2>
                    </div>
                    <p className="text-xs sm:text-sm text-neutral-500 mt-1">
                      Connect with graduates working at top global tech and creative companies.
                    </p>
                  </div>

                  <Link
                    to="/alumni"
                    className="text-xs font-bold text-neutral-900 hover:text-[#7865F5] flex items-center gap-1 transition-colors group"
                  >
                    <span>Browse alumni directory</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  {featuredAlumni.map((alum) => (
                    <AlumniCard
                      key={alum.id}
                      alumni={alum}
                      onSelect={(al) => setSelectedProfileModal(al)}
                    />
                  ))}
                </div>
              </div>

              {/* Section: Career & Internship Opportunities */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                      <h2 className="text-2xl font-extrabold text-neutral-900 tracking-tight">
                        Career & Internship Opportunities
                      </h2>
                    </div>
                    <p className="text-xs sm:text-sm text-neutral-500 mt-1">
                      Exclusive student internships, entry-level vacancies, and campus fellowships.
                    </p>
                  </div>

                  <Link
                    to="/careers"
                    className="text-xs font-bold text-neutral-900 hover:text-[#7865F5] flex items-center gap-1 transition-colors group"
                  >
                    <span>Explore all jobs</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>

                <div className="flex flex-col gap-4">
                  {featuredJobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>
              </div>

              {/* Section: Top Community Members & Student Innovators */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                      <h2 className="text-2xl font-extrabold text-neutral-900 tracking-tight">
                        Active Campus Innovators
                      </h2>
                    </div>
                    <p className="text-xs sm:text-sm text-neutral-500 mt-1">
                      Meet student leaders, researchers, and club organizers in your campus network.
                    </p>
                  </div>

                  <Link
                    to="/community"
                    className="text-xs font-bold text-neutral-900 hover:text-[#7865F5] flex items-center gap-1 transition-colors group"
                  >
                    <span>Explore members</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  {topStudents.map((stud) => (
                    <div
                      key={stud.id}
                      onClick={() => setSelectedProfileModal(stud)}
                      className="group bg-white rounded-3xl border border-[#EAEAEA] p-5 hover:border-neutral-300 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-start justify-between mb-3">
                          <img
                            src={stud.avatar_url}
                            alt={stud.full_name}
                            className="w-12 h-12 rounded-2xl object-cover border border-neutral-200"
                          />
                          <RoleBadge role={stud.role} size="sm" />
                        </div>
                        <h4 className="font-bold text-neutral-900 text-sm group-hover:text-[#7865F5] transition-colors">
                          {stud.full_name}
                        </h4>
                        <p className="text-xs text-neutral-500 mt-1 line-clamp-1">
                          {stud.major} • {stud.university}
                        </p>
                      </div>
                      <div className="pt-3 mt-3 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-400">
                        <span>Class of {stud.expected_graduation_year || 2027}</span>
                        <span className="text-[#7865F5] font-semibold group-hover:underline">View Profile</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section: Final CTA */}
              <div className="bg-gradient-to-br from-[#111111] via-neutral-900 to-[#1e1e1e] text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl">
                <div className="relative z-10 max-w-xl">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-neutral-200 text-xs font-semibold mb-4">
                    <Sparkles className="w-3.5 h-3.5 text-[#7865F5]" />
                    <span>Join Your University Network</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4 leading-tight">
                    Your Next Opportunity Starts With a Connection.
                  </h2>
                  <p className="text-sm sm:text-base text-neutral-300 mb-8 leading-relaxed">
                    Join CAMPLY today and discover the boundless power of your university community. Find internships, connect with mentors, and never miss an event again.
                  </p>
                  <div className="flex flex-wrap items-center gap-3">
                    <Link to="/register">
                      <Button variant="accent" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
                        Join CAMPLY Now
                      </Button>
                    </Link>
                    <Link to="/events">
                      <Button variant="secondary" size="lg">
                        Explore Events
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Decorative floating shapes */}
                <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-[#7865F5]/20 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute top-10 right-10 opacity-10 hidden sm:block pointer-events-none">
                  <svg className="w-48 h-48 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M4 19L12 5L20 19" strokeWidth="1.5" />
                  </svg>
                </div>
              </div>

            </div>

            {/* ================= RIGHT COLUMN: CALENDAR SIDEBAR ================= */}
            <div className="lg:col-span-4 w-full">
              <CalendarSidebar
                onOpenCreateEvent={() => setIsCreateEventOpen(true)}
                onSelectEvent={(ev) => setSelectedEventModal(ev)}
              />
            </div>

          </div>
        </div>
      </section>

      {/* Create Event Modal */}
      <CreateEventModal
        isOpen={isCreateEventOpen}
        onClose={() => setIsCreateEventOpen(false)}
      />

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
                <CalendarIcon className="w-4 h-4 text-[#7865F5]" />
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
                <span>Hybrid / Online Link Available upon RSVP</span>
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

      {/* Profile Detail Preview Modal */}
      {selectedProfileModal && (
        <Modal
          isOpen={Boolean(selectedProfileModal)}
          onClose={() => setSelectedProfileModal(null)}
          title={selectedProfileModal.full_name}
          maxWidth="md"
        >
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <img
                src={selectedProfileModal.avatar_url}
                alt={selectedProfileModal.full_name}
                className="w-16 h-16 rounded-2xl object-cover border border-neutral-200"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-neutral-900 text-base">{selectedProfileModal.full_name}</h4>
                  <RoleBadge role={selectedProfileModal.role} size="sm" />
                </div>
                <p className="text-xs text-neutral-500 font-medium mt-0.5">{selectedProfileModal.headline}</p>
                <p className="text-xs text-neutral-400">{selectedProfileModal.university}</p>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-neutral-50 border border-neutral-100 text-xs text-neutral-600 leading-relaxed">
              {selectedProfileModal.bio || 'Active participant in the CAMPLY university network.'}
            </div>

            {selectedProfileModal.skills && (
              <div>
                <span className="text-xs font-bold text-neutral-700 block mb-2">Skills & Expertise</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProfileModal.skills.map((s, idx) => (
                    <span key={idx} className="text-xs bg-neutral-100 text-neutral-700 px-2.5 py-1 rounded-md font-medium">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center justify-end gap-2 pt-4 border-t border-neutral-100 mt-2">
              <Button variant="secondary" size="md" onClick={() => setSelectedProfileModal(null)}>
                Close
              </Button>
              <Link to="/community" onClick={() => setSelectedProfileModal(null)}>
                <Button variant="primary" size="md">
                  View in Community
                </Button>
              </Link>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

