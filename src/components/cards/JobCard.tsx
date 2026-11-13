import React from 'react';
import { MapPin, Briefcase, Bookmark, Check, Calendar, ArrowUpRight } from 'lucide-react';
import { JobVacancy } from '../../types';
import { formatDate } from '../../lib/utils';
import { useCareerStore } from '../../store/useCareerStore';
import confetti from 'canvas-confetti';

interface JobCardProps {
  job: JobVacancy;
  onApply?: (job: JobVacancy) => void;
}

export const JobCard: React.FC<JobCardProps> = ({ job, onApply }) => {
  const { toggleSaveJob, applyJob } = useCareerStore();

  const handleApply = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (job.is_applied) return;
    applyJob(job.id);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    });
    onApply?.(job);
  };

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleSaveJob(job.id);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Internship':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Full-time':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Part-time':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default:
        return 'bg-purple-50 text-purple-700 border-purple-200';
    }
  };

  return (
    <div className="group bg-white rounded-3xl border border-[#EAEAEA] p-5 sm:p-6 flex flex-col justify-between hover:border-neutral-300 hover:shadow-lg transition-all duration-300">
      <div>
        {/* Top: Logo + Type Badge + Save */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <img
              src={job.company.logo_url}
              alt={job.company.name}
              className="w-12 h-12 rounded-2xl object-cover border border-neutral-200 p-1 bg-white shadow-xs"
            />
            <div>
              <h5 className="font-semibold text-neutral-900 text-sm">{job.company.name}</h5>
              <span className="text-xs text-neutral-400 font-normal">{job.company.industry}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${getTypeColor(
                job.employment_type
              )}`}
            >
              {job.employment_type}
            </span>
            <button
              onClick={handleSave}
              aria-label="Save job vacancy"
              className="w-8 h-8 rounded-full border border-neutral-100 flex items-center justify-center text-neutral-400 hover:text-black hover:bg-neutral-50 transition-colors"
            >
              <Bookmark className={`w-3.5 h-3.5 ${job.is_saved ? 'fill-neutral-900 text-neutral-900' : ''}`} />
            </button>
          </div>
        </div>

        {/* Title */}
        <h4 className="font-bold text-neutral-900 text-base sm:text-lg group-hover:text-[#7865F5] transition-colors leading-snug">
          {job.title}
        </h4>
        <p className="text-xs text-neutral-500 line-clamp-2 mt-2 leading-relaxed">
          {job.description}
        </p>

        {/* Requirements preview */}
        {job.requirements && job.requirements.length > 0 && (
          <div className="mt-3.5 flex flex-wrap gap-1.5">
            {job.requirements.slice(0, 2).map((req, i) => (
              <span
                key={i}
                className="text-[11px] font-medium bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded-md truncate max-w-[200px]"
              >
                {req}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Meta & Apply Action */}
      <div className="pt-4 mt-4 border-t border-neutral-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-col gap-1 text-xs text-neutral-500">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
            <span>{job.location}</span>
          </div>
          {job.salary_range && (
            <span className="font-semibold text-neutral-900 text-xs">
              {job.salary_range}
            </span>
          )}
        </div>

        <button
          onClick={handleApply}
          className={`text-xs font-semibold px-4 py-2 rounded-full transition-all flex items-center justify-center gap-1.5 self-end sm:self-auto ${
            job.is_applied
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
              : 'bg-[#111111] text-white hover:bg-black/90 shadow-sm'
          }`}
        >
          {job.is_applied ? (
            <>
              <Check className="w-3.5 h-3.5" />
              Applied
            </>
          ) : (
            <>
              <span>Apply Now</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

