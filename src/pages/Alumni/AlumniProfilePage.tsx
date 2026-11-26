import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Briefcase,
  GraduationCap,
  MapPin,
  UserPlus,
  Check,
  MessageSquare,
  ExternalLink,
  Sparkles,
  Users,
  Send,
  UserCheck
} from 'lucide-react';
import { useCommunityStore } from '../../store/useCommunityStore';
import { RoleBadge } from '../../components/ui/RoleBadge';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import confetti from 'canvas-confetti';

export const AlumniProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    members,
    sentRequestIds,
    connectedIds,
    followingIds,
    messages,
    sendConnectionRequest,
    toggleFollow,
    sendMessageToMember
  } = useCommunityStore();

  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [isMutualModalOpen, setIsMutualModalOpen] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [messageSentNotice, setMessageSentNotice] = useState(false);

  const profile = members.find((m) => m.id === id);

  if (!profile) {
    return (
      <div className="py-20 max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-2xl font-extrabold text-[#111111]">Profile Not Found</h2>
        <p className="text-sm text-[#929292] mt-2 mb-6">
          This campus member profile could not be found.
        </p>
        <Button variant="primary" size="md" onClick={() => navigate('/alumni')}>
          Back to Alumni Directory
        </Button>
      </div>
    );
  }

  const isConnected = connectedIds.includes(profile.id);
  const isPending = sentRequestIds.includes(profile.id);
  const isFollowing = followingIds.includes(profile.id);

  const mutualMembers = members.filter((m) => m.id !== profile.id).slice(0, 4);
  const conversationMessages = messages.filter((m) => m.recipientId === profile.id);

  const handleConnect = () => {
    if (isConnected || isPending) return;
    sendConnectionRequest(profile.id);
    confetti({ particleCount: 50, spread: 65, origin: { y: 0.6 } });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;
    sendMessageToMember(profile.id, messageText.trim());
    setMessageText('');
    setMessageSentNotice(true);
    setTimeout(() => setMessageSentNotice(false), 2500);
  };

  return (
    <div className="py-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Back navigation */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-500 hover:text-[#111111] mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back</span>
      </button>

      {/* Main Profile Header Card */}
      <div className="bg-white rounded-3xl border border-[#EAEAEA] overflow-hidden shadow-xs mb-8">
        {/* Cover Image */}
        <div className="h-44 sm:h-56 w-full bg-neutral-900 relative overflow-hidden">
          <img
            src={
              profile.cover_url ||
              'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&auto=format&fit=crop&q=80'
            }
            alt="Profile cover"
            className="w-full h-full object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>

        {/* Profile Info & Actions */}
        <div className="px-6 sm:px-8 pb-8">
          <div className="relative flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-12 sm:-mt-14 mb-6">
            <div className="flex items-end gap-4">
              <img
                src={profile.avatar_url}
                alt={profile.full_name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover border-4 border-white shadow-lg bg-white"
              />
              <div className="pb-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111111] tracking-tight">
                    {profile.full_name}
                  </h1>
                  <RoleBadge role={profile.role} size="md" />
                </div>
                <p className="text-xs sm:text-sm text-neutral-600 font-medium mt-1">
                  {profile.headline}
                </p>
              </div>
            </div>

            {/* Interactive Action Buttons */}
            <div className="flex flex-wrap items-center gap-2.5">
              <Button
                variant={isConnected ? 'secondary' : isPending ? 'outline' : 'primary'}
                size="md"
                onClick={handleConnect}
                disabled={isConnected || isPending}
                icon={
                  isConnected ? (
                    <Check className="w-4 h-4 text-[#16A36A]" />
                  ) : isPending ? (
                    <UserCheck className="w-4 h-4 text-[#7865F5]" />
                  ) : (
                    <UserPlus className="w-4 h-4" />
                  )
                }
              >
                {isConnected ? 'Connected' : isPending ? 'Request Sent' : 'Connect'}
              </Button>

              <Button
                variant="secondary"
                size="md"
                onClick={() => setIsMessageModalOpen(true)}
                icon={<MessageSquare className="w-4 h-4" />}
              >
                Message
              </Button>

              <Button
                variant={isFollowing ? 'accent' : 'outline'}
                size="md"
                onClick={() => toggleFollow(profile.id)}
              >
                {isFollowing ? 'Following ✓' : 'Follow'}
              </Button>
            </div>
          </div>

          {/* Academic & Professional Quick Meta */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-neutral-600 pt-4 border-t border-neutral-100">
            <span className="flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-[#7865F5]" />
              <strong>{profile.university}</strong> • {profile.faculty} {profile.major ? `(${profile.major})` : ''}
            </span>
            {profile.graduation_year && (
              <span className="font-semibold text-[#111111]">
                Class of {profile.graduation_year}
              </span>
            )}
            {profile.location && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                {profile.location}
              </span>
            )}
            <button
              onClick={() => setIsMutualModalOpen(true)}
              className="text-[#7865F5] font-semibold hover:underline flex items-center gap-1"
            >
              <Users className="w-3.5 h-3.5" />
              <span>{profile.mutual_connections || 14} mutual connections</span>
            </button>
          </div>
        </div>
      </div>

      {/* Two-Column Body */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Column: Bio, Experience, Education */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Biography */}
          <div className="bg-white rounded-3xl border border-[#EAEAEA] p-6 sm:p-8 shadow-xs">
            <h2 className="text-base font-extrabold text-[#111111] mb-3">Biography</h2>
            <p className="text-sm text-neutral-600 leading-relaxed">
              {profile.bio || 'Active contributor in the CAMPLY university ecosystem.'}
            </p>
            {profile.project_title && (
              <div className="mt-4 p-4 rounded-2xl bg-[#F8F8F8] border border-[#EAEAEA]">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#7865F5] mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Featured Campus Initiative</span>
                </div>
                <h4 className="font-bold text-sm text-[#111111]">{profile.project_title}</h4>
                <p className="text-xs text-neutral-600 mt-0.5">{profile.achievement}</p>
              </div>
            )}
          </div>

          {/* Professional Experience */}
          <div className="bg-white rounded-3xl border border-[#EAEAEA] p-6 sm:p-8 shadow-xs">
            <h2 className="text-base font-extrabold text-[#111111] mb-4 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-[#7865F5]" />
              <span>Professional Experience</span>
            </h2>

            {profile.experiences && profile.experiences.length > 0 ? (
              <div className="flex flex-col gap-5">
                {profile.experiences.map((exp) => (
                  <div key={exp.id} className="pl-4 border-l-2 border-[#EAEAEA]">
                    <h4 className="font-bold text-sm text-[#111111]">{exp.role}</h4>
                    <p className="text-xs font-semibold text-[#7865F5]">{exp.company}</p>
                    <p className="text-[11px] text-[#929292] mt-0.5">
                      {exp.duration} • {exp.location}
                    </p>
                    <p className="text-xs text-neutral-600 mt-2 leading-relaxed">{exp.description}</p>
                  </div>
                ))}
              </div>
            ) : profile.current_company ? (
              <div className="pl-4 border-l-2 border-[#EAEAEA]">
                <h4 className="font-bold text-sm text-[#111111]">{profile.current_position}</h4>
                <p className="text-xs font-semibold text-[#7865F5]">{profile.current_company}</p>
                <p className="text-[11px] text-[#929292] mt-0.5">{profile.location || 'Current'}</p>
              </div>
            ) : (
              <p className="text-xs text-[#929292]">No experience records listed yet.</p>
            )}
          </div>

          {/* Education */}
          <div className="bg-white rounded-3xl border border-[#EAEAEA] p-6 sm:p-8 shadow-xs">
            <h2 className="text-base font-extrabold text-[#111111] mb-4 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-[#7865F5]" />
              <span>Education</span>
            </h2>

            {profile.education && profile.education.length > 0 ? (
              <div className="flex flex-col gap-4">
                {profile.education.map((edu) => (
                  <div key={edu.id} className="p-4 rounded-2xl bg-[#F8F8F8] border border-[#EAEAEA]">
                    <h4 className="font-bold text-sm text-[#111111]">{edu.institution}</h4>
                    <p className="text-xs font-medium text-neutral-700 mt-0.5">
                      {edu.degree} — {edu.field}
                    </p>
                    <span className="text-[11px] text-[#929292] mt-1 block">{edu.period}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-[#F8F8F8] border border-[#EAEAEA]">
                <h4 className="font-bold text-sm text-[#111111]">{profile.university}</h4>
                <p className="text-xs text-neutral-600 mt-0.5">
                  {profile.faculty} • {profile.major || profile.department}
                </p>
                {profile.graduation_year && (
                  <span className="text-[11px] text-[#929292] mt-1 block">
                    Graduated {profile.graduation_year}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar: Skills, Links, Mentorship */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Skills */}
          {profile.skills && profile.skills.length > 0 && (
            <div className="bg-white rounded-3xl border border-[#EAEAEA] p-6 shadow-xs">
              <h3 className="text-sm font-extrabold text-[#111111] mb-3">Skills & Expertise</h3>
              <div className="flex flex-wrap gap-1.5">
                {profile.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-medium bg-[#F8F8F8] border border-[#EAEAEA] text-neutral-700 px-3 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* External Links */}
          <div className="bg-white rounded-3xl border border-[#EAEAEA] p-6 shadow-xs">
            <h3 className="text-sm font-extrabold text-[#111111] mb-3">Connect Externally</h3>
            <div className="flex flex-col gap-2">
              <a
                href={profile.linkedin_url || 'https://linkedin.com'}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-[#F8F8F8] hover:bg-neutral-100 border border-[#EAEAEA] text-xs font-semibold text-[#111111] transition-colors"
              >
                <span>LinkedIn Profile</span>
                <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
              </a>
              {profile.portfolio_url && (
                <a
                  href={profile.portfolio_url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-[#F8F8F8] hover:bg-neutral-100 border border-[#EAEAEA] text-xs font-semibold text-[#111111] transition-colors"
                >
                  <span>Personal Portfolio</span>
                  <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
                </a>
              )}
            </div>
          </div>

          {/* Mentorship Availability */}
          {profile.is_mentor_available && (
            <div className="bg-[#111111] text-white rounded-3xl p-6 shadow-sm">
              <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold mb-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Available for Mentorship</span>
              </div>
              <h4 className="font-bold text-sm mb-2">Book a 1-on-1 Session</h4>
              <p className="text-xs text-neutral-300 mb-4 leading-relaxed">
                Topics: {profile.mentor_expertise?.join(', ')}
              </p>
              <Link to="/mentorship">
                <Button variant="accent" size="sm" className="w-full">
                  Request Mentorship Session
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Prototype Direct Message Modal */}
      <Modal
        isOpen={isMessageModalOpen}
        onClose={() => setIsMessageModalOpen(false)}
        title={`Message ${profile.full_name}`}
        description="Start a direct campus networking conversation."
        maxWidth="md"
      >
        <div className="flex flex-col gap-4">
          {conversationMessages.length > 0 && (
            <div className="flex flex-col gap-2 max-h-48 overflow-y-auto p-3 rounded-2xl bg-[#F8F8F8] border border-[#EAEAEA]">
              {conversationMessages.map((msg) => (
                <div key={msg.id} className="bg-[#111111] text-white text-xs p-3 rounded-2xl self-end max-w-[85%]">
                  <p>{msg.text}</p>
                  <span className="text-[10px] text-neutral-400 block mt-1">{msg.sentAt}</span>
                </div>
              ))}
            </div>
          )}

          {messageSentNotice && (
            <div className="p-2.5 rounded-xl bg-emerald-50 text-[#16A36A] text-xs font-semibold text-center">
              Message delivered to {profile.full_name}!
            </div>
          )}

          <form onSubmit={handleSendMessage} className="flex flex-col gap-3">
            <textarea
              rows={3}
              required
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder={`Hi ${profile.full_name.split(' ')[0]}, I saw your profile on CAMPLY and would love to connect...`}
              className="w-full text-sm p-3.5 rounded-2xl border border-[#EAEAEA] focus:outline-none focus:border-[#7865F5] resize-none"
            />
            <div className="flex justify-end gap-2">
              <Button variant="secondary" size="md" type="button" onClick={() => setIsMessageModalOpen(false)}>
                Close
              </Button>
              <Button variant="primary" size="md" type="submit" icon={<Send className="w-3.5 h-3.5" />}>
                Send Message
              </Button>
            </div>
          </form>
        </div>
      </Modal>

      {/* Mutual Connections Modal */}
      <Modal
        isOpen={isMutualModalOpen}
        onClose={() => setIsMutualModalOpen(false)}
        title="Mutual Campus Connections"
        description={`You and ${profile.full_name} share ${profile.mutual_connections || 14} connections.`}
        maxWidth="md"
      >
        <div className="flex flex-col gap-3">
          {mutualMembers.map((m) => (
            <Link
              key={m.id}
              to={m.role === 'ALUMNI' ? `/alumni/${m.id}` : `/profile/${m.id}`}
              onClick={() => setIsMutualModalOpen(false)}
              className="flex items-center justify-between p-3 rounded-2xl border border-[#EAEAEA] hover:border-neutral-300 hover:bg-[#F8F8F8] transition-all"
            >
              <div className="flex items-center gap-3">
                <img src={m.avatar_url} alt={m.full_name} className="w-10 h-10 rounded-xl object-cover" />
                <div>
                  <h5 className="font-bold text-xs text-[#111111]">{m.full_name}</h5>
                  <p className="text-[11px] text-[#929292] line-clamp-1">{m.headline}</p>
                </div>
              </div>
              <RoleBadge role={m.role} size="sm" showDot={false} />
            </Link>
          ))}
        </div>
      </Modal>
    </div>
  );
};
