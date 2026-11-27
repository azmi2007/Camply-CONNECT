import { create } from 'zustand';
import { CreateEventInput, EventItem, EventCategory } from '../types';
import { createMockEvents } from '../data/mockState';
import { useAuthStore } from './useAuthStore';

interface EventState {
  events: EventItem[];
  selectedCategory: EventCategory;
  selectedDate: string | null;
  searchQuery: string;
  setSelectedCategory: (category: EventCategory) => void;
  setSelectedDate: (date: string | null) => void;
  setSearchQuery: (query: string) => void;
  registerEvent: (eventId: string) => void;
  cancelRegistration: (eventId: string) => void;
  toggleSaveEvent: (eventId: string) => void;
  createEvent: (eventData: CreateEventInput) => EventItem | null;
}

const STORAGE_KEY = 'camply_events';

const getInitialEvents = (): EventItem[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    // fallback
  }
  return createMockEvents();
};

export const useEventStore = create<EventState>((set, get) => ({
  events: getInitialEvents(),
  selectedCategory: 'All Events',
  selectedDate: null,
  searchQuery: '',

  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setSelectedDate: (date) => set({ selectedDate: date }),
  setSearchQuery: (query) => set({ searchQuery: query }),

  registerEvent: (eventId) => {
    if (!useAuthStore.getState().isAuthenticated) return;
    set((state) => {
      const updated = state.events.map((e) => {
        if (e.id === eventId) {
          return {
            ...e,
            is_registered: true,
            current_participants: e.current_participants + 1
          };
        }
        return e;
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return { events: updated };
    });
  },

  cancelRegistration: (eventId) => {
    if (!useAuthStore.getState().isAuthenticated) return;
    set((state) => {
      const updated = state.events.map((e) => {
        if (e.id === eventId) {
          return {
            ...e,
            is_registered: false,
            current_participants: Math.max(0, e.current_participants - 1)
          };
        }
        return e;
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return { events: updated };
    });
  },

  toggleSaveEvent: (eventId) => {
    if (!useAuthStore.getState().isAuthenticated) return;
    set((state) => {
      const updated = state.events.map((e) => {
        if (e.id === eventId) {
          return { ...e, is_saved: !e.is_saved };
        }
        return e;
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return { events: updated };
    });
  },

  createEvent: (eventData) => {
    if (!useAuthStore.getState().isAuthenticated) {
      return null;
    }
    const newEvent: EventItem = {
      ...eventData,
      id: `event-${Date.now()}`,
      current_participants: 1,
      status: 'UPCOMING',
      is_registered: true
    };

    set((state) => {
      const updated = [newEvent, ...state.events];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return { events: updated };
    });

    return newEvent;
  }
}));

