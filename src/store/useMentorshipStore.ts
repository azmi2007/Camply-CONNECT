import { create } from 'zustand';
import { MentorshipRequest } from '../types';

interface MentorshipState {
  requests: MentorshipRequest[];
  sendMentorshipRequest: (params: {
    mentorId: string;
    topic: string;
    message: string;
    preferredSchedule?: string;
  }) => void;
  updateRequestStatus: (requestId: string, status: 'ACCEPTED' | 'REJECTED' | 'COMPLETED') => void;
}

const INITIAL_REQUESTS: MentorshipRequest[] = [
  {
    id: 'req-01',
    student_id: 'user-student-01',
    mentor_id: 'user-alumni-01',
    topic: 'Design Systems Portfolio Review',
    message: 'Hi Sarah! I loved your recent talk on UI component architecture. Could I get your feedback on my case study?',
    preferredSchedule: 'Thursday afternoons (Zoom)',
    status: 'ACCEPTED',
    created_at: '2026-11-10T14:00:00Z'
  }
];

export const useMentorshipStore = create<MentorshipState>((set) => ({
  requests: INITIAL_REQUESTS,

  sendMentorshipRequest: (params) => {
    const newRequest: MentorshipRequest = {
      id: `req-${Date.now()}`,
      student_id: 'user-student-01',
      mentor_id: params.mentorId,
      topic: params.topic,
      message: params.message,
      preferredSchedule: params.preferredSchedule,
      status: 'PENDING',
      created_at: new Date().toISOString()
    };

    set((state) => ({
      requests: [newRequest, ...state.requests]
    }));
  },

  updateRequestStatus: (requestId, status) => {
    set((state) => ({
      requests: state.requests.map((r) => 
        r.id === requestId ? { ...r, status } : r
      )
    }));
  }
}));

