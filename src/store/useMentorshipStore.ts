import { create } from 'zustand';
import { MentorshipRequest, MentorshipStatus } from '../types';
import { createMockMentorshipRequests } from '../data/mockState';
import { useAuthStore } from './useAuthStore';

interface MentorshipState {
  requests: MentorshipRequest[];
  sendMentorshipRequest: (params: {
    mentorId: string;
    topic: string;
    message: string;
    preferredSchedule?: string;
  }) => void;
  updateRequestStatus: (requestId: string, status: Exclude<MentorshipStatus, 'PENDING'>) => void;
}

export const useMentorshipStore = create<MentorshipState>((set) => ({
  requests: createMockMentorshipRequests(),

  sendMentorshipRequest: (params) => {
    const currentUser = useAuthStore.getState().user;
    if (!currentUser) return;
    const newRequest: MentorshipRequest = {
      id: `req-${Date.now()}`,
      student_id: currentUser.id,
      mentor_id: params.mentorId,
      topic: params.topic,
      message: params.message,
      preferred_schedule: params.preferredSchedule,
      status: 'PENDING',
      created_at: new Date().toISOString()
    };

    set((state) => ({
      requests: [newRequest, ...state.requests]
    }));
  },

  updateRequestStatus: (requestId, status) => {
    if (!useAuthStore.getState().isAuthenticated) return;
    set((state) => ({
      requests: state.requests.map((r) => 
        r.id === requestId ? { ...r, status } : r
      )
    }));
  }
}));

