import { create } from 'zustand';
import { CreateJobInput, JobVacancy, JobType } from '../types';
import { createMockJobs } from '../data/mockState';
import { useAuthStore } from './useAuthStore';

interface CareerState {
  jobs: JobVacancy[];
  selectedType: JobType | 'All';
  searchQuery: string;
  setSelectedType: (type: JobType | 'All') => void;
  setSearchQuery: (query: string) => void;
  toggleSaveJob: (jobId: string) => void;
  applyJob: (jobId: string) => void;
  postJob: (jobData: CreateJobInput) => JobVacancy | null;
}

const STORAGE_KEY = 'camply_jobs';

const getInitialJobs = (): JobVacancy[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    // fallback
  }
  return createMockJobs();
};

export const useCareerStore = create<CareerState>((set) => ({
  jobs: getInitialJobs(),
  selectedType: 'All',
  searchQuery: '',

  setSelectedType: (type) => set({ selectedType: type }),
  setSearchQuery: (query) => set({ searchQuery: query }),

  toggleSaveJob: (jobId) => {
    if (!useAuthStore.getState().isAuthenticated) return;
    set((state) => {
      const updated = state.jobs.map((j) => {
        if (j.id === jobId) {
          return { ...j, is_saved: !j.is_saved };
        }
        return j;
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return { jobs: updated };
    });
  },

  applyJob: (jobId) => {
    if (!useAuthStore.getState().isAuthenticated) return;
    set((state) => {
      const updated = state.jobs.map((j) => {
        if (j.id === jobId) {
          return { ...j, is_applied: true };
        }
        return j;
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return { jobs: updated };
    });
  },

  postJob: (jobData) => {
    if (!useAuthStore.getState().isAuthenticated) {
      return null;
    }
    const newJob: JobVacancy = {
      ...jobData,
      id: `job-${Date.now()}`,
      status: 'ACTIVE',
      created_at: new Date().toISOString(),
      is_saved: false,
      is_applied: false
    };

    set((state) => {
      const updated = [newJob, ...state.jobs];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return { jobs: updated };
    });

    return newJob;
  }
}));

