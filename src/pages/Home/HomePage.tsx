import React, { useState, useMemo, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
import { useRequireAuthentication } from '../../features/auth/useRequireAuthentication';
import { JobVacancy } from '../../types';
import {
  ArrowRight,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  MapPin,
  Calendar,
  Laptop,
  ExternalLink
} from 'lucide-react';
import { formatDate } from '../../lib/utils';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { events } = useEventStore();
  const { jobs, applyJob } = useCareerStore();
  const { members } = useCommunityStore();
  const requireAuthentication = useRequireAuthentication();

  const [selectedDiscipline, setSelectedDiscipline] = useState('All');
  const [isCreateEventOpen, setIsCreateEventOpen] = useState(false);
  const [selectedJobModal, setSelectedJobModal] = useState<JobVacancy | null>(null);

  const carouselRef = useRef<HTMLDivElement>(null);

  const featuredEvents = useMemo(() => {
    return events.filter((e) => e.status === 'UPCOMING');
  }, [events]);

  const featuredAlumni = useMemo(() => {
    return members.filter((m) => m.role === 'ALUMNI').slice(0, 3);
  }, [members]);

  const campusInnovators = useMemo(() => {
    return members.filter((m) => m.is_innovator).slice(0, 3);
  }, [members]);

  const featuredJobs = useMemo(() => {
    return jobs.slice(0, 3);
  }, [jobs]);

  const scrollCarousel = (direction: 'prev' | 'next') => {
    if (!carouselRef.current) return;
    const offset = direction === 'next' ? 360 : -360;
    carouselRef.current.scrollBy({ left: offset, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FFFFFF]">
      {/* 1. Hero Section */}
      <HeroSection onOpenCreateEvent={() => setIsCreateEventOpen(true)} />

      {/* 2. Platform Statistics (Viewport-Triggered Counters) */}
      <StatsSection />

      {/* 3. University Partners Logo Bar */}
      <PartnersSection />

      {/* 4. MAIN TWO-COLUMN CONTENT WITH INTERACTIVE CALENDAR SIDEBAR */}
      <section className="py-12 lg:py-16 bg-[#F8F8F8]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">

            {/* ================= LEFT COLUMN: MAIN CONTENT ================= */}
            <div className="lg:col-span-8 flex flex-col gap-14 min-w-0">

              {/* D. Explore by Field & Faculty (Horizontal Pills navigating to Community) */}
              <CategoryPills
                selectedCategory={selectedDiscipline}
                onSelectCategory={setSelectedDiscipline}
                navigateOnSelect={true}
              />

              {/* E. Featured Campus Events (Horizontal Carousel with Prev/Next) */}
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#7865F5]" />
                      <h2 className="text-2xl font-extrabold text-[#111111] tracking-tight">
                        Featured Campus Events
                      </h2>
                    </div>
                    <p className="text-xs sm:text-sm text-[#929292] mt-1">
                      Academic seminars, interactive workshops, and high-impact campus gatherings.
                    </p>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-auto">
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => scrollCarousel('prev')}
                        aria-label="Previous events"
                        className="w-8 h-8 rounded-full bg-white border border-[#EAEAEA] flex items-center justify-center text-neutral-700 hover:border-neutral-300 shadow-2xs transition-colors"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => scrollCarousel('next')}
                        aria-label="Next events"
                        className="w-8 h-8 rounded-full bg-white border border-[#EAEAEA] flex items-center justify-center text-neutral-700 hover:border-neutral-300 shadow-2xs transition-colors"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                    <Link
                      to="/events"
                      className="text-xs font-bold text-[#111111] hover:text-[#7865F5] flex items-center gap-1 transition-colors group"
                    >
                      <span>View All Events</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>

                {/* Horizontal Events Carousel */}
                <div
                  ref={carouselRef}
                  className="flex gap-5 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-2"
                >
                  {featuredEvents.map((event) => (
                    <div key={event.id} className="w-[300px] sm:w-[340px] shrink-0 snap-start">
                      <EventCard
                        event={event}
                        onSelect={(ev) => navigate(`/events/${ev.id}`)}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* F. Featured Alumni Leaders */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#7865F5]" />
                      <h2 className="text-2xl font-extrabold text-[#111111] tracking-tight">
                        Featured Alumni Leaders
                      </h2>
                    </div>
                    <p className="text-xs sm:text-sm text-[#929292] mt-1">
                      Connect with graduates working at top global tech, consulting, and creative companies.
                    </p>
                  </div>

                  <Link
                    to="/alumni"
                    className="text-xs font-bold text-[#111111] hover:text-[#7865F5] flex items-center gap-1 transition-colors group shrink-0"
                  >
                    <span>View All Alumni</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  {featuredAlumni.map((alum) => (
                    <AlumniCard
                      key={alum.id}
                      alumni={alum}
                      onSelect={(al) => navigate(`/alumni/${al.id}`)}
                    />
                  ))}
                </div>
              </div>

              {/* G. Active Campus Innovators */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#16A36A]" />
                      <h2 className="text-2xl font-extrabold text-[#111111] tracking-tight">
                        Active Campus Innovators
                      </h2>
                    </div>
                    <p className="text-xs sm:text-sm text-[#929292] mt-1">
                      Students, alumni, and lecturers driving high-impact initiatives across the campus ecosystem.
                    </p>
                  </div>

                  <Link
                    to="/community"
                    className="text-xs font-bold text-[#111111] hover:text-[#7865F5] flex items-center gap-1 transition-colors group shrink-0"
                  >
                    <span>Explore Community</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  {campusInnovators.map((innovator) => {
                    const targetUrl =
                      innovator.role === 'ALUMNI'
                        ? `/alumni/${innovator.id}`
                        : `/profile/${innovator.id}`;

                    return (
                      <div
                        key={innovator.id}
                        onClick={() => navigate(targetUrl)}
                        className="group bg-white rounded-3xl border border-[#EAEAEA] p-5 hover:border-neutral-300 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-start justify-between mb-3.5">
                            <img
                              src={innovator.avatar_url}
                              alt={innovator.full_name}
                              className="w-12 h-12 rounded-2xl object-cover border border-neutral-200"
                            />
                            <RoleBadge role={innovator.role} size="sm" />
                          </div>

                          <h4 className="font-bold text-[#111111] text-sm group-hover:text-[#7865F5] transition-colors">
                            {innovator.full_name}
                          </h4>
                          <p className="text-[11px] text-[#929292] font-medium mt-0.5">
                            {innovator.faculty} • {innovator.major || innovator.department}
                          </p>

                          <div className="mt-3 p-3 rounded-2xl bg-[#F8F8F8] border border-[#EAEAEA]">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#7865F5] block mb-0.5">
                              {innovator.project_title || 'Campus Project'}
                            </span>
                            <p className="text-xs font-medium text-neutral-800 line-clamp-2">
                              {innovator.achievement || innovator.headline}
                            </p>
                          </div>
                        </div>

                        <div className="pt-3 mt-4 border-t border-neutral-100 flex items-center justify-between text-[11px]">
                          <span className="text-[#16A36A] font-semibold flex items-center gap-1 truncate">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#16A36A] animate-pulse shrink-0" />
                            <span className="truncate">{innovator.activity_indicator || 'Active contributor'}</span>
                          </span>
                          <span className="text-[#111111] font-bold shrink-0 group-hover:underline ml-2">
                            Profile →
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* H. Career & Internship Opportunities */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                      <h2 className="text-2xl font-extrabold text-[#111111] tracking-tight">
                        Career & Internship Opportunities
                      </h2>
                    </div>
                    <p className="text-xs sm:text-sm text-[#929292] mt-1">
                      Exclusive student internships, entry-level vacancies, and campus fellowships.
                    </p>
                  </div>

                  <Link
                    to="/careers"
                    className="text-xs font-bold text-[#111111] hover:text-[#7865F5] flex items-center gap-1 transition-colors group shrink-0"
                  >
                    <span>View All Opportunities</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>

                <div className="flex flex-col gap-4">
                  {featuredJobs.map((job) => (
                    <JobCard
                      key={job.id}
                      job={job}
                      onViewDetails={(j) => setSelectedJobModal(j)}
                    />
                  ))}
                </div>
              </div>

              {/* I. Final CTA */}
              <div className="bg-[#111111] text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl">
                <div className="relative z-10 max-w-xl">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-neutral-200 text-xs font-semibold mb-4">
                    <Sparkles className="w-3.5 h-3.5 text-[#7865F5]" />
                    <span>CAMPLY University Ecosystem</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4 leading-tight">
                    Your Next Opportunity Starts With a Connection.
                  </h2>
                  <p className="text-sm sm:text-base text-neutral-300 mb-8 leading-relaxed">
                    Join a community where your campus network becomes your biggest opportunity.
                  </p>
                  <div className="flex flex-wrap items-center gap-3">
                    <Link to="/register">
                      <Button variant="accent" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
                        Join CAMPLY
                      </Button>
                    </Link>
                    <Link to="/events">
                      <Button variant="secondary" size="lg">
                        Explore Events
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-[#7865F5]/20 rounded-full blur-3xl pointer-events-none" />
              </div>

            </div>

            {/* ================= RIGHT COLUMN: INTERACTIVE CALENDAR SIDEBAR ================= */}
            <div className="lg:col-span-4 w-full">
              <CalendarSidebar
                onOpenCreateEvent={() => setIsCreateEventOpen(true)}
                onSelectEvent={(ev) => navigate(`/events/${ev.id}`)}
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

      {/* Job Details Modal */}
      {selectedJobModal && (
        <Modal
          isOpen={Boolean(selectedJobModal)}
          onClose={() => setSelectedJobModal(null)}
          title={selectedJobModal.title}
          description={`${selectedJobModal.company.name} • ${selectedJobModal.employment_type}`}
          maxWidth="lg"
        >
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-600 bg-[#F8F8F8] p-3.5 rounded-2xl border border-[#EAEAEA]">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#7865F5]" />
                {selectedJobModal.location}
              </span>
              {selectedJobModal.work_mode && (
                <span className="flex items-center gap-1.5">
                  <Laptop className="w-4 h-4 text-[#7865F5]" />
                  {selectedJobModal.work_mode}
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#7865F5]" />
                Deadline: {formatDate(selectedJobModal.deadline)}
              </span>
            </div>

            {selectedJobModal.salary_range && (
              <div className="text-xs font-bold text-[#111111]">
                Compensation: {selectedJobModal.salary_range}
              </div>
            )}

            <div>
              <h5 className="font-bold text-xs text-[#111111] mb-1.5">Role Description</h5>
              <p className="text-xs text-neutral-600 leading-relaxed">{selectedJobModal.description}</p>
            </div>

            {selectedJobModal.requirements.length > 0 && (
              <div>
                <h5 className="font-bold text-xs text-[#111111] mb-1.5">Requirements</h5>
                <ul className="list-disc list-inside text-xs text-neutral-600 space-y-1">
                  {selectedJobModal.requirements.map((req, i) => (
                    <li key={i}>{req}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
              <Link
                to="/careers"
                onClick={() => setSelectedJobModal(null)}
                className="text-xs font-semibold text-[#7865F5] hover:underline flex items-center gap-1"
              >
                <span>Open in Careers Hub</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
              <Button
                variant={selectedJobModal.is_applied ? 'secondary' : 'primary'}
                size="md"
                onClick={() => {
                  if (!requireAuthentication()) return;
                  applyJob(selectedJobModal.id);
                  setSelectedJobModal(null);
                }}
              >
                {selectedJobModal.is_applied ? 'Applied ✓' : 'Apply Now'}
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
