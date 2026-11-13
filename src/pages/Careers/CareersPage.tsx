import React, { useState, useMemo } from 'react';
import { useCareerStore } from '../../store/useCareerStore';
import { useAuthStore } from '../../store/useAuthStore';
import { JobCard } from '../../components/cards/JobCard';
import { PostJobModal } from '../../components/forms/PostJobModal';
import { Modal } from '../../components/ui/Modal';
import { Button } from '../../components/ui/Button';
import { JobType, JobVacancy } from '../../types';
import { Search, Plus, Briefcase, MapPin, Building2, CheckCircle2, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export const CareersPage: React.FC = () => {
  const { jobs, applyJob } = useCareerStore();
  const { user } = useAuthStore();

  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState<JobType | 'All'>('All');
  const [isPostOpen, setIsPostOpen] = useState(false);
  const [appliedJobSuccess, setAppliedJobSuccess] = useState<JobVacancy | null>(null);

  const types: (JobType | 'All')[] = [
    'All',
    'Internship',
    'Full-time',
    'Part-time',
    'Remote',
    'Freelance'
  ];

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.company.name.toLowerCase().includes(search.toLowerCase()) ||
        job.location.toLowerCase().includes(search.toLowerCase()) ||
        job.description.toLowerCase().includes(search.toLowerCase());

      const matchesType = selectedType === 'All' || job.employment_type === selectedType;

      return matchesSearch && matchesType;
    });
  }, [jobs, search, selectedType]);

  const handleApplySuccess = (job: JobVacancy) => {
    setAppliedJobSuccess(job);
  };

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
              Campus Career Hub
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111111] tracking-tight">
            Careers & Internships
          </h1>
          <p className="text-sm text-neutral-500 mt-1">
            Browse verified campus internships, fellowships, and graduate roles posted by alumni and partners.
          </p>
        </div>

        {user && (
          <Button
            variant="primary"
            size="md"
            onClick={() => setIsPostOpen(true)}
            icon={<Plus className="w-4 h-4" />}
          >
            Post Opportunity
          </Button>
        )}
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-3xl border border-[#EAEAEA] p-4 sm:p-5 mb-8 shadow-xs flex flex-col gap-4">
        <div className="relative">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by job title, company, or tech stack..."
            className="w-full text-xs sm:text-sm pl-10 pr-4 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-[#7865F5] bg-neutral-50/50"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
          {types.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`text-xs font-semibold px-3.5 py-1.5 rounded-full whitespace-nowrap transition-all ${
                selectedType === type
                  ? 'bg-[#111111] text-white shadow-xs'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200/80 hover:text-neutral-900'
              }`}
            >
              {type === 'All' ? 'All Roles' : type}
            </button>
          ))}
        </div>
      </div>

      {/* Jobs List */}
      {filteredJobs.length === 0 ? (
        <div className="bg-white rounded-3xl border border-[#EAEAEA] p-12 text-center">
          <Briefcase className="w-10 h-10 text-neutral-300 mx-auto mb-3" />
          <h3 className="font-bold text-neutral-900 text-base">No opportunities found</h3>
          <p className="text-xs text-neutral-400 mt-1 mb-4">
            Try searching with different keywords or clearing the employment filter.
          </p>
          <Button variant="outline" size="sm" onClick={() => { setSearch(''); setSelectedType('All'); }}>
            Reset Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} onApply={handleApplySuccess} />
          ))}
        </div>
      )}

      {/* Post Job Modal */}
      <PostJobModal isOpen={isPostOpen} onClose={() => setIsPostOpen(false)} />

      {/* Applied Confirmation Modal */}
      {appliedJobSuccess && (
        <Modal
          isOpen={Boolean(appliedJobSuccess)}
          onClose={() => setAppliedJobSuccess(null)}
          title="Application Submitted!"
          maxWidth="sm"
        >
          <div className="text-center py-4 flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h4 className="font-bold text-neutral-900 text-base">
              Applied to {appliedJobSuccess.company.name}
            </h4>
            <p className="text-xs text-neutral-500 mt-1 mb-6">
              Your student profile and resume portfolio were submitted for <strong>{appliedJobSuccess.title}</strong>.
            </p>
            <Button
              variant="primary"
              size="md"
              className="w-full"
              onClick={() => setAppliedJobSuccess(null)}
            >
              Continue Browsing
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
};

