import { create } from 'zustand';
import { Profile, NotificationItem } from '../types';
import { INITIAL_MEMBERS, INITIAL_NOTIFICATIONS } from '../data/mockData';

export interface DirectMessage {
  id: string;
  recipientId: string;
  text: string;
  sentAt: string;
}

interface CommunityState {
  members: Profile[];
  sentRequestIds: string[];
  connectedIds: string[];
  followingIds: string[];
  messages: DirectMessage[];
  notifications: NotificationItem[];
  searchQuery: string;
  selectedFaculty: string;
  selectedRole: string;
  sendConnectionRequest: (targetMemberId: string) => void;
  acceptConnection: (targetMemberId: string) => void;
  toggleFollow: (targetMemberId: string) => void;
  sendMessageToMember: (recipientId: string, text: string) => void;
  markNotificationRead: (notifId: string) => void;
  markAllNotificationsRead: () => void;
  setSearchQuery: (query: string) => void;
  setSelectedFaculty: (faculty: string) => void;
  setSelectedRole: (role: string) => void;
}

export const useCommunityStore = create<CommunityState>((set) => ({
  members: INITIAL_MEMBERS,
  sentRequestIds: [],
  connectedIds: ['user-alumni-01'], // Sarah is connected initially
  followingIds: ['user-alumni-01', 'user-lecturer-01'],
  messages: [],
  notifications: INITIAL_NOTIFICATIONS,
  searchQuery: '',
  selectedFaculty: 'All',
  selectedRole: 'All',

  sendConnectionRequest: (targetMemberId: string) => {
    set((state) => {
      if (state.sentRequestIds.includes(targetMemberId) || state.connectedIds.includes(targetMemberId)) {
        return state;
      }
      return {
        sentRequestIds: [...state.sentRequestIds, targetMemberId]
      };
    });
  },

  acceptConnection: (targetMemberId: string) => {
    set((state) => ({
      connectedIds: state.connectedIds.includes(targetMemberId)
        ? state.connectedIds
        : [...state.connectedIds, targetMemberId],
      sentRequestIds: state.sentRequestIds.filter((id) => id !== targetMemberId)
    }));
  },

  toggleFollow: (targetMemberId: string) => {
    set((state) => ({
      followingIds: state.followingIds.includes(targetMemberId)
        ? state.followingIds.filter((id) => id !== targetMemberId)
        : [...state.followingIds, targetMemberId]
    }));
  },

  sendMessageToMember: (recipientId: string, text: string) => {
    set((state) => ({
      messages: [
        {
          id: `msg-${Date.now()}`,
          recipientId,
          text,
          sentAt: 'Just now'
        },
        ...state.messages
      ]
    }));
  },

  markNotificationRead: (notifId: string) => {
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === notifId ? { ...n, is_read: true } : n
      )
    }));
  },

  markAllNotificationsRead: () => {
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, is_read: true }))
    }));
  },

  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedFaculty: (faculty) => set({ selectedFaculty: faculty }),
  setSelectedRole: (role) => set({ selectedRole: role })
}));
