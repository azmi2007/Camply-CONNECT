import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Briefcase, Calendar, Users, CheckCircle2 } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { SplitText } from '../../components/animations/SplitText';
import { RoleBadge } from '../../components/ui/RoleBadge';

interface HeroSectionProps {
  onOpenCreateEvent?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenCreateEvent }) => {
  return (
    <section className="relative pt-12 pb-16 lg:pt-16 lg:pb-24 overflow-hidden border-b border-[#EAEAEA] bg-white">
      {/* Subtle background glow & curved pattern */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none overflow-hidden opacity-60">
        <div className="absolute -top-32 left-1/4 w-[500px] h-[500px] bg-[#7865F5]/6 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-20 w-[450px] h-[450px] bg-amber-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-6 flex flex-col items-start">
            {/* Top Pill */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100 text-neutral-800 text-xs font-semibold mb-6 border border-neutral-200/60"
            >
              <span className="w-2 h-2 rounded-full bg-[#7865F5] animate-pulse" />
              <span>The Next Generation University Ecosystem</span>
            </motion.div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#111111] tracking-tight leading-[1.08] mb-6">
              Connect With <br />
              <span className="text-neutral-400 font-normal">Your Campus.</span> <br />
              Discover Your Future.
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-neutral-500 max-w-xl font-normal leading-relaxed mb-8">
              One platform to connect with alumni, discover opportunities, join meaningful campus events, and build your professional future with confidence.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <Link to="/community">
                <Button variant="primary" size="lg" icon={<Users className="w-4 h-4" />}>
                  Explore Community
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="secondary" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
                  Join CAMPLY
                </Button>
              </Link>
            </div>

            {/* Quick Trust Badges */}
            <div className="flex items-center gap-6 mt-10 pt-6 border-t border-neutral-100 text-xs text-neutral-500">
              <div className="flex -space-x-2">
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=128"
                  alt="Avatar"
                />
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=128"
                  alt="Avatar"
                />
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128"
                  alt="Avatar"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-neutral-800">10,000+ Students & Alumni</span>
                <span>Active across 20+ faculties</span>
              </div>
            </div>
          </div>

          {/* Right Column: Floating Cards Composition (Inspired by NFT Marketplace & Linear layout) */}
          <div className="lg:col-span-6 relative flex items-center justify-center min-h-[460px] sm:min-h-[520px]">
            {/* Background Decorative Rings */}
            <div className="absolute w-[360px] sm:w-[480px] h-[360px] sm:h-[480px] rounded-full border border-neutral-200/80 -z-0" />
            <div className="absolute w-[260px] sm:w-[360px] h-[260px] sm:h-[360px] rounded-full border border-dashed border-neutral-200/60 -z-0" />

            {/* Card 1: Alumni Profile (Top Left) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="absolute top-4 left-2 sm:left-6 w-64 sm:w-72 bg-white rounded-3xl p-4 shadow-xl border border-neutral-200/80 z-20"
            >
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=256"
                  alt="Sarah Jenkins"
                  className="w-12 h-12 rounded-2xl object-cover border border-neutral-100"
                />
                <div className="overflow-hidden">
                  <div className="flex items-center gap-1.5">
                    <h5 className="font-bold text-neutral-900 text-xs sm:text-sm truncate">
                      Sarah Jenkins
                    </h5>
                    <RoleBadge role="ALUMNI" size="sm" showDot={false} />
                  </div>
                  <p className="text-[11px] text-neutral-400 font-medium truncate">
                    Senior Product Designer @ Stripe
                  </p>
                </div>
              </div>
              <div className="mt-3 pt-2.5 border-t border-neutral-100 flex items-center justify-between text-[11px]">
                <span className="text-emerald-600 font-semibold flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Available for Mentorship
                </span>
                <span className="text-neutral-400 font-medium">Class of '21</span>
              </div>
            </motion.div>

            {/* Card 2: Upcoming Event Spotlight (Center Main) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              className="relative w-72 sm:w-80 bg-white rounded-3xl overflow-hidden shadow-2xl border border-neutral-200 z-10"
            >
              <div className="relative h-36 w-full">
                <img
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800"
                  alt="Event"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-md text-neutral-900 font-bold text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider">
                  Seminar
                </span>
                <div className="absolute bottom-2.5 left-3 text-white text-xs font-semibold flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-neutral-300" />
                  <span>Nov 16, 2026 • 13:30</span>
                </div>
              </div>
              <div className="p-4">
                <h5 className="font-bold text-neutral-900 text-sm line-clamp-1">
                  AI Engineering & Campus Tech
                </h5>
                <p className="text-xs text-neutral-500 mt-1 line-clamp-1">
                  By Dr. Marcus Vance • 184 registered
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-neutral-400">
                    Gd. A Auditorium & Online
                  </span>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                    Confirmed ✓
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Card 3: Job Opportunity (Bottom Right) */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="absolute bottom-4 right-2 sm:right-6 w-64 sm:w-72 bg-white rounded-3xl p-4 shadow-xl border border-neutral-200/80 z-20"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-neutral-900 text-white flex items-center justify-center font-black text-sm">
                  L
                </div>
                <div>
                  <h5 className="font-bold text-neutral-900 text-xs sm:text-sm">
                    Frontend Engineer Intern
                  </h5>
                  <p className="text-[11px] text-neutral-400">Linear Technologies</p>
                </div>
              </div>
              <div className="mt-3 pt-2.5 border-t border-neutral-100 flex items-center justify-between text-[11px]">
                <span className="font-semibold text-neutral-800">IDR 8M - 12M / mo</span>
                <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md font-semibold text-[10px]">
                  Internship
                </span>
              </div>
            </motion.div>

            {/* Floating pill badge */}
            <div className="absolute top-1/2 -left-4 sm:left-0 -translate-y-1/2 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full border border-neutral-200 shadow-md flex items-center gap-1.5 text-xs font-semibold text-neutral-800 z-30">
              <CheckCircle2 className="w-4 h-4 text-[#7865F5]" />
              <span>Verified University Accounts</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

