import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { useEventStore } from '../../store/useEventStore';
import { RoleBadge } from '../../components/ui/RoleBadge';
import { Button } from '../../components/ui/Button';
import { CreateEventModal } from '../../components/forms/CreateEventModal';
import { 
  BookOpen, 
  Users, 
  Calendar, 
  Plus, 
  FileText, 
  Bell, 
  Sparkles,
  ArrowRight 
} from 'lucide-react';
import { formatDate } from '../../lib/utils';

export const LecturerDashboard: React.FC = () => {
  const { user } = useAuthStore();
  const { events } = useEventStore();
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);

  const academicEvents = events.filter((e) => e.category === 'Seminar' || e.category === 'Academic');

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl border border-[#EAEAEA] p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={user?.avatar_url || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=256'}
            alt="Lecturer Avatar"
            className="w-16 h-16 rounded-2xl object-cover border border-neutral-200"
          />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-extrabold text-[#111111] tracking-tight">
                {user?.full_name || 'Dr. Marcus Vance'}
              </h2>
              <RoleBadge role="LECTURER" size="sm" />
            </div>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1">
              {user?.department || 'Computer Systems & Architecture'} • {user?.university} • NIDN: {user?.lecturer_id || 'LEC-40918'}
            </p>
          </div>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={() => setIsEventModalOpen(true)}
          icon={<Plus className="w-4 h-4" />}
        >
          Publish Academic Event
        </Button>
      </div>

      {/* Metrics Row */}
      <div className="flex items-center justify-between -mb-4">
        <span className="text-xs font-bold uppercase tracking-wider text-[#929292]">
          Academic Analytics
        </span>
        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-500">
          Read Only
        </span>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-2xs">
          <span className="text-xs font-semibold text-neutral-400 block mb-1">Active Academic Events</span>
          <span className="text-2xl font-bold text-neutral-900">{academicEvents.length}</span>
          <span className="text-[11px] text-neutral-400 block mt-1">Seminars & Defense</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-2xs">
          <span className="text-xs font-semibold text-neutral-400 block mb-1">Total Student Attendees</span>
          <span className="text-2xl font-bold text-neutral-900">420</span>
          <span className="text-[11px] text-emerald-600 block mt-1">88% average turnout</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-2xs">
          <span className="text-xs font-semibold text-neutral-400 block mb-1">Mentored Undergrads</span>
          <span className="text-2xl font-bold text-neutral-900">18</span>
          <span className="text-[11px] text-neutral-400 block mt-1">Thesis & research lab</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-2xs">
          <span className="text-xs font-semibold text-neutral-400 block mb-1">Department Notices</span>
          <span className="text-2xl font-bold text-neutral-900">6</span>
          <span className="text-[11px] text-neutral-400 block mt-1">Published announcements</span>
        </div>
      </div>

      {/* Two Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Managed Events */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-[#EAEAEA] p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#16A36A]" />
              <h3 className="font-bold text-neutral-900 text-base">Faculty & Academic Events</h3>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                Manage
              </span>
            </div>
            <button
              onClick={() => setIsEventModalOpen(true)}
              className="text-xs text-[#7865F5] font-semibold hover:underline"
            >
              + Create Event
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {academicEvents.map((ev) => (
              <div
                key={ev.id}
                className="p-4 rounded-2xl bg-neutral-50 border border-neutral-100 flex items-center justify-between gap-4"
              >
                <div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md uppercase">
                    {ev.category}
                  </span>
                  <h4 className="font-bold text-neutral-900 text-sm mt-1">{ev.title}</h4>
                  <p className="text-xs text-neutral-400 mt-1">
                    {formatDate(ev.event_date)} • {ev.start_time} • {ev.location}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs font-bold text-neutral-900 block">
                    {ev.current_participants} / {ev.max_participants}
                  </span>
                  <span className="text-[10px] text-neutral-400">Registered Students</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Department Announcements & Advising */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-white rounded-3xl border border-[#EAEAEA] p-6 shadow-xs">
            <div className="flex items-center gap-2 mb-3">
              <Bell className="w-4 h-4 text-emerald-600" />
              <h3 className="font-bold text-neutral-900 text-base">Campus Announcements</h3>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                Manage
              </span>
            </div>
            <p className="text-xs text-neutral-500 mb-4 leading-relaxed">
              Broadcast thesis deadlines, symposium calls for papers, and lab hours to students.
            </p>
            <Button variant="outline" size="sm" className="w-full">
              Draft Department Notice
            </Button>
          </div>

          <div className="bg-white rounded-3xl border border-[#EAEAEA] p-6 shadow-xs">
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="w-4 h-4 text-[#7865F5]" />
              <h3 className="font-bold text-neutral-900 text-base">Faculty Research Lab</h3>
            </div>
            <p className="text-xs text-neutral-500 mb-2">
              Student Innovation & Cloud Architecture Lab
            </p>
            <span className="text-xs text-emerald-600 font-semibold bg-emerald-50 px-2.5 py-1 rounded-full">
              Accepting Research Assistants
            </span>
          </div>
        </div>
      </div>

      <CreateEventModal isOpen={isEventModalOpen} onClose={() => setIsEventModalOpen(false)} />
    </div>
  );
};

