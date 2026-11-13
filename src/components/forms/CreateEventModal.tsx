import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { EventCategory } from '../../types';
import { useEventStore } from '../../store/useEventStore';
import { useAuthStore } from '../../store/useAuthStore';
import confetti from 'canvas-confetti';

interface CreateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateEventModal: React.FC<CreateEventModalProps> = ({ isOpen, onClose }) => {
  const { createEvent } = useEventStore();
  const { user } = useAuthStore();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [bannerUrl, setBannerUrl] = useState('');
  const [category, setCategory] = useState<EventCategory>('Workshop');
  const [eventDate, setEventDate] = useState('2026-11-22');
  const [startTime, setStartTime] = useState('14:00');
  const [endTime, setEndTime] = useState('16:30');
  const [location, setLocation] = useState('Engineering Auditorium & Hybrid');
  const [isOnline, setIsOnline] = useState(false);
  const [onlineLink, setOnlineLink] = useState('');
  const [maxParticipants, setMaxParticipants] = useState(100);
  const [tags, setTags] = useState('Campus, Innovation, Technology');

  const categories: EventCategory[] = [
    'Academic',
    'Workshop',
    'Seminar',
    'Webinar',
    'Networking',
    'Career Fair',
    'Campus Gathering',
    'Competition'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !eventDate) return;

    createEvent({
      organizer_id: user?.id || 'demo-organizer',
      organizer: {
        full_name: user?.full_name || 'Event Organizer',
        avatar_url: user?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=256',
        role: user?.role || 'STUDENT',
        faculty: user?.faculty || 'Computer Science'
      },
      title,
      description,
      banner_url:
        bannerUrl ||
        'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&auto=format&fit=crop&q=80',
      category,
      event_date: eventDate,
      start_time: startTime,
      end_time: endTime,
      location,
      is_online: isOnline,
      online_link: isOnline ? onlineLink || 'https://meet.camply.edu/room' : undefined,
      max_participants: Number(maxParticipants),
      tags: tags.split(',').map((t) => t.trim())
    });

    confetti({
      particleCount: 80,
      spread: 80,
      origin: { y: 0.6 }
    });

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create University Event"
      description="Publish an academic seminar, student workshop, or campus gathering."
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Title */}
        <div>
          <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
            Event Title *
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Next-Gen AI Hackathon & Workshop"
            className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-[#7865F5] transition-colors"
          />
        </div>

        {/* Category & Date */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
              Category *
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as EventCategory)}
              className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-[#7865F5] bg-white transition-colors"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
              Event Date *
            </label>
            <input
              type="date"
              required
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-[#7865F5] bg-white transition-colors"
            />
          </div>
        </div>

        {/* Time start & end */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
              Start Time
            </label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-[#7865F5] bg-white"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
              End Time
            </label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-[#7865F5] bg-white"
            />
          </div>
        </div>

        {/* Location & Capacity */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
              Venue / Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Hall 204 or Online Zoom"
              className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-[#7865F5]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
              Max Capacity
            </label>
            <input
              type="number"
              min="5"
              max="5000"
              value={maxParticipants}
              onChange={(e) => setMaxParticipants(Number(e.target.value))}
              className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-[#7865F5]"
            />
          </div>
        </div>

        {/* Online Toggle */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="onlineCheckbox"
            checked={isOnline}
            onChange={(e) => setIsOnline(e.target.checked)}
            className="w-4 h-4 rounded text-[#7865F5] border-neutral-300 focus:ring-[#7865F5]"
          />
          <label htmlFor="onlineCheckbox" className="text-xs font-medium text-neutral-700">
            This is an Online or Hybrid Event
          </label>
        </div>

        {isOnline && (
          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
              Meeting / Stream Link
            </label>
            <input
              type="url"
              value={onlineLink}
              onChange={(e) => setOnlineLink(e.target.value)}
              placeholder="https://zoom.us/j/... or https://meet.google.com/..."
              className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-[#7865F5]"
            />
          </div>
        )}

        {/* Description */}
        <div>
          <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
            Event Description *
          </label>
          <textarea
            required
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Outline the schedule, key speakers, requirements, and benefits..."
            className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-[#7865F5] resize-none"
          />
        </div>

        {/* Banner URL (Optional) */}
        <div>
          <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
            Banner Image URL (Optional)
          </label>
          <input
            type="url"
            value={bannerUrl}
            onChange={(e) => setBannerUrl(e.target.value)}
            placeholder="https://images.unsplash.com/photo-..."
            className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-[#7865F5]"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-neutral-100 mt-2">
          <Button variant="secondary" size="md" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" size="md" type="submit">
            Publish Event
          </Button>
        </div>
      </form>
    </Modal>
  );
};

