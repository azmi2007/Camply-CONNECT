import { create } from 'zustand';
import { Profile, ConnectionRequest } from '../types';
import { INITIAL_MEMBERS } from '../data/mockData';

interface CommunityState {
  members: Profile[];
  sentRequestIds: string[];
  connectedIds: string[];
  searchQuery: string;
  selectedFaculty: string;
  selectedRole: string;
  sendConnectionRequest: (targetMemberId: string) => void;
  acceptConnection: (targetMemberId: string) => void;
  setSearchQuery: (query: string) => void;
  setSelectedFaculty: (faculty: string) => void;
  setSelectedRole: (role: string) => void;
}

const STORAGE_KEY = 'camply_community';

export const useCommunityStore = create<CommunityState>((set) => ({
  members: INITIAL_MEMBERS,
  sentRequestIds: [],
  connectedIds: ['user-alumni-01'], // Sarah is connected initially
  searchQuery: '',
  selectedFaculty: 'All',
  selectedRole: 'All',

  sendConnectionRequest: (targetMemberId: string) => {
    set((state) => ({
      sentRequestIds: [...state.sentRequestIds, targetMemberId]
    }));
  },

  acceptConnection: (targetMemberId: string) => {
    set((state) => ({
      connectedIds: [...state.connectedIds, targetMemberId],
      sentRequestIds: state.sentRequestIds.filter((id) => id !== targetMemberId)
    }));
  },

  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedFaculty: (faculty) => set({ selectedFaculty: faculty }),
  setSelectedRole: (role) => set({ selectedRole: role })
}));

