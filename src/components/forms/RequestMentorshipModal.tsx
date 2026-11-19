import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Profile } from '../../types';
import { useMentorshipStore } from '../../store/useMentorshipStore';
import confetti from 'canvas-confetti';

interface RequestMentorshipModalProps {
  isOpen: boolean;
  onClose: () => void;
  mentor: Profile | null;
}

export const RequestMentorshipModal: React.FC<RequestMentorshipModalProps> = ({
  isOpen,
  onClose,
  mentor
}) => {
  const { sendMentorshipRequest } = useMentorshipStore();

  const [topic, setTopic] = useState('Career Transition & Portfolio Feedback');
  const [schedule, setSchedule] = useState('Thursday 4:00 PM (Google Meet)');
  const [message, setMessage] = useState('');

  if (!mentor) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message) return;

    sendMentorshipRequest({
      mentorId: mentor.id,
      topic,
      preferredSchedule: schedule,
      message
    });

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    });

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Request Mentorship with ${mentor.full_name}`}
      description="Connect directly with verified alumni and professors for tailored advice."
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Mentor Preview */}
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-neutral-50 border border-neutral-100">
          <img
            src={mentor.avatar_url}
            alt={mentor.full_name}
            className="w-12 h-12 rounded-xl object-cover"
          />
          <div>
            <h5 className="font-bold text-neutral-900 text-sm">{mentor.full_name}</h5>
            <p className="text-xs text-neutral-500">{mentor.headline}</p>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
            Mentorship Topic *
          </label>
          <select
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-[#7865F5] bg-white"
          >
            {mentor.mentor_expertise && mentor.mentor_expertise.length > 0 ? (
              mentor.mentor_expertise.map((exp, i) => (
                <option key={i} value={exp}>
                  {exp}
                </option>
              ))
            ) : (
              <>
                <option value="Portfolio Review">Portfolio Review</option>
                <option value="Resume & Mock Interview">Resume & Mock Interview</option>
                <option value="Career Transition">Career Transition</option>
                <option value="Academic Research Guidance">Academic Research Guidance</option>
              </>
            )}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
            Preferred Time / Schedule
          </label>
          <input
            type="text"
            value={schedule}
            onChange={(e) => setSchedule(e.target.value)}
            placeholder="e.g. Wednesday 16:00 - 17:00"
            className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-[#7865F5]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
            Personal Note & Goals *
          </label>
          <textarea
            required
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Briefly introduce your background, what questions you have, and what you hope to learn..."
            className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-[#7865F5] resize-none"
          />
        </div>

        <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-neutral-100">
          <Button variant="secondary" size="md" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" size="md" type="submit">
            Send Mentorship Request
          </Button>
        </div>
      </form>
    </Modal>
  );
};

