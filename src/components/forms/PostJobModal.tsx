import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { JobType } from '../../types';
import { useCareerStore } from '../../store/useCareerStore';
import { useAuthStore } from '../../store/useAuthStore';
import { useRequireAuthentication } from '../../features/auth/useRequireAuthentication';
import confetti from 'canvas-confetti';

interface PostJobModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PostJobModal: React.FC<PostJobModalProps> = ({ isOpen, onClose }) => {
  const { postJob } = useCareerStore();
  const { user } = useAuthStore();
  const requireAuthentication = useRequireAuthentication();

  const [title, setTitle] = useState('');
  const [companyName, setCompanyName] = useState('Acme Tech Ventures');
  const [industry, setIndustry] = useState('Software Engineering');
  const [logoUrl, setLogoUrl] = useState('');
  const [employmentType, setEmploymentType] = useState<JobType>('Internship');
  const [location, setLocation] = useState('Remote / Jakarta');
  const [salaryRange, setSalaryRange] = useState('IDR 8,000,000 - 11,000,000 / mo');
  const [deadline, setDeadline] = useState('2026-12-31');
  const [applicationUrl, setApplicationUrl] = useState('https://careers.acmetech.com');
  const [description, setDescription] = useState('');
  const [requirements, setRequirements] = useState('React, TypeScript, Git, Problem Solving');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!requireAuthentication() || !user) {
      onClose();
      return;
    }
    if (!title || !companyName || !description) return;

    postJob({
      company_id: `comp-${Date.now()}`,
      company: {
        id: `comp-${Date.now()}`,
        name: companyName,
        logo_url:
          logoUrl ||
          'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=128&auto=format&fit=crop&q=80',
        industry,
        location,
        website: applicationUrl
      },
      poster_id: user.id,
      poster: {
        full_name: user.full_name,
        role: user.role,
        avatar_url: user.avatar_url
      },
      title,
      description,
      requirements: requirements.split(',').map((r) => r.trim()),
      location,
      employment_type: employmentType,
      salary_range: salaryRange,
      deadline,
      application_url: applicationUrl
    });

    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.6 }
    });

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Post Campus Opportunity"
      description="Connect students and alumni with job vacancies, internships, and fellowships."
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
            Job / Role Title *
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Software Engineering Intern"
            className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-[#7865F5]"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
              Company Name *
            </label>
            <input
              type="text"
              required
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-[#7865F5]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
              Employment Type *
            </label>
            <select
              value={employmentType}
              onChange={(e) => setEmploymentType(e.target.value as JobType)}
              className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-[#7865F5] bg-white"
            >
              <option value="Internship">Internship</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Remote">Remote</option>
              <option value="Freelance">Freelance</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
              Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Jakarta, Hybrid, or Remote"
              className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-[#7865F5]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
              Salary / Compensation Range
            </label>
            <input
              type="text"
              value={salaryRange}
              onChange={(e) => setSalaryRange(e.target.value)}
              placeholder="e.g. IDR 8M - 12M / mo"
              className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-[#7865F5]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
            Key Requirements (comma separated)
          </label>
          <input
            type="text"
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
            placeholder="e.g. React, TypeScript, Figma, Analytical mindset"
            className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-[#7865F5]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
            Role Description *
          </label>
          <textarea
            required
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the day-to-day responsibilities, learning outcomes, and team culture..."
            className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-[#7865F5] resize-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
            Application URL
          </label>
          <input
            type="url"
            value={applicationUrl}
            onChange={(e) => setApplicationUrl(e.target.value)}
            placeholder="https://company.com/apply"
            className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-[#7865F5]"
          />
        </div>

        <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-neutral-100 mt-2">
          <Button variant="secondary" size="md" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" size="md" type="submit">
            Post Vacancy
          </Button>
        </div>
      </form>
    </Modal>
  );
};

