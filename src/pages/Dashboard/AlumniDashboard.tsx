import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { useEventStore } from '../../store/useEventStore';
import { useCareerStore } from '../../store/useCareerStore';
import { useMentorshipStore } from '../../store/useMentorshipStore';
import { RoleBadge } from '../../components/ui/RoleBadge';
import { Button } from '../../components/ui/Button';
import { CreateEventModal } from '../../components/forms/CreateEventModal';
import { PostJobModal } from '../../components/forms/PostJobModal';
import { 
  Eye, 
  UserPlus, 
  MessageSquare, 
  Briefcase, 
  Calendar, 
  Plus, 
  Sparkles, 
  Check, 
  X,
  TrendingUp 
} from 'lucide-react';
import { formatDate } from '../../lib/utils';

export const AlumniDashboard: React.FC = () => {
  const { user } = useAuthStore();
  const { events } = useEventStore();
  const { jobs } = useCareerStore();
  const { requests, updateRequestStatus } = useMentorshipStore();

  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);

  const myEvents = events.filter((e) => e.organizer_id === user?.id || e.category === 'Workshop');
  const myJobs = jobs.filter((j) => j.poster_id === user?.id || j.employment_type === 'Internship');

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl border border-[#EAEAEA] p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={user?.avatar_url || 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=256'}
            alt="Alumni Avatar"
            className="w-16 h-16 rounded-2xl object-cover border border-neutral-200"
          />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-extrabold text-[#111111] tracking-tight">
                Welcome back, {user?.full_name?.split(' ')[0] || 'Sarah'}!
              </h2>
              <RoleBadge role="ALUMNI" size="sm" />
            </div>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1">
              {user?.current_position} at <strong>{user?.current_company || 'Stripe'}</strong> • Class of {user?.graduation_year || 2021}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setIsEventModalOpen(true)}
            icon={<Plus className="w-3.5 h-3.5" />}
          >
            Host Workshop
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsJobModalOpen(true)}
            icon={<Plus className="w-3.5 h-3.5" />}
          >
            Post Vacancy
          </Button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="flex items-center justify-between -mb-4">
        <span className="text-xs font-bold uppercase tracking-wider text-[#929292]">
          Impact Overview
        </span>
        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-500">
          Read Only
        </span>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-neutral-400">Profile Views</span>
            <Eye className="w-4 h-4 text-purple-500" />
          </div>
          <span className="text-2xl font-bold text-neutral-900">438</span>
          <span className="text-[11px] text-emerald-600 block mt-1">+18% this month</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-neutral-400">Mentorship Inquiries</span>
            <MessageSquare className="w-4 h-4 text-[#7865F5]" />
          </div>
          <span className="text-2xl font-bold text-neutral-900">{requests.length}</span>
          <span className="text-[11px] text-neutral-400 block mt-1">Active requests</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-neutral-400">Events Organized</span>
            <Calendar className="w-4 h-4 text-indigo-500" />
          </div>
          <span className="text-2xl font-bold text-neutral-900">{myEvents.length}</span>
          <span className="text-[11px] text-neutral-400 block mt-1">Total workshops</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-neutral-400">Job Vacancies</span>
            <Briefcase className="w-4 h-4 text-amber-500" />
          </div>
          <span className="text-2xl font-bold text-neutral-900">{myJobs.length}</span>
          <span className="text-[11px] text-neutral-400 block mt-1">Published opportunities</span>
        </div>
      </div>

      {/* Main Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Mentorship Requests Management */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-[#EAEAEA] p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#7865F5]" />
              <h3 className="font-bold text-neutral-900 text-base">Student Mentorship Inquiries</h3>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-50 text-[#7865F5]">
                Manage
              </span>
            </div>
            <span className="text-xs text-neutral-400 font-medium">Pending Review</span>
          </div>

          <div className="flex flex-col gap-3">
            {requests.map((req) => (
              <div key={req.id} className="p-4 rounded-2xl bg-neutral-50 border border-neutral-100 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-neutral-900 text-xs">{req.topic}</h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase bg-amber-100 text-amber-800">
                    {req.status}
                  </span>
                </div>
                <p className="text-xs text-neutral-600 italic">"{req.message}"</p>
                {req.preferredSchedule && (
                  <p className="text-[11px] text-neutral-400">Preferred: {req.preferredSchedule}</p>
                )}
                {req.status === 'PENDING' && (
                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-neutral-200/60 mt-1">
                    <button
                      onClick={() => updateRequestStatus(req.id, 'REJECTED')}
                      className="px-3 py-1 rounded-full text-xs font-semibold text-neutral-600 hover:bg-neutral-200/60"
                    >
                      Decline
                    </button>
                    <button
                      onClick={() => updateRequestStatus(req.id, 'ACCEPTED')}
                      className="px-3 py-1 rounded-full text-xs font-semibold bg-[#111111] text-white hover:bg-black"
                    >
                      Accept Mentee
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Published Jobs by Alumni */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-[#EAEAEA] p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-amber-500" />
              <h3 className="font-bold text-neutral-900 text-base">Your Published Vacancies</h3>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-50 text-[#7865F5]">
                Manage
              </span>
            </div>
            <button
              onClick={() => setIsJobModalOpen(true)}
              className="text-xs text-[#7865F5] font-semibold hover:underline"
            >
              + Add
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {myJobs.map((job) => (
              <div key={job.id} className="p-3.5 rounded-2xl border border-neutral-100 flex items-center justify-between gap-3">
                <div>
                  <h5 className="font-bold text-neutral-900 text-xs">{job.title}</h5>
                  <p className="text-[11px] text-neutral-400">{job.employment_type} • {job.location}</p>
                </div>
                <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                  Active
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <CreateEventModal isOpen={isEventModalOpen} onClose={() => setIsEventModalOpen(false)} />
      <PostJobModal isOpen={isJobModalOpen} onClose={() => setIsJobModalOpen(false)} />
    </div>
  );
};

