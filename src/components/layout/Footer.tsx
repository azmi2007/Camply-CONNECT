import React from 'react';
import { Link } from 'react-router-dom';
import { CamplyMark } from '../ui/CamplyMark';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-[#EAEAEA] pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-neutral-100">
          {/* Brand Info */}
          <div className="md:col-span-2">
            <Link to="/" className="mb-4 inline-flex items-center gap-2 transition-transform hover:scale-[1.03]">
              <CamplyMark className="h-9 w-12" />
              <span className="text-xl font-extrabold tracking-[0.12em] text-[#111111]">CAMPLY</span>
            </Link>
            <p className="text-sm font-medium text-neutral-500 mb-2">
              "Your Campus. Your People. Your Future."
            </p>
            <p className="text-xs text-neutral-400 max-w-sm leading-relaxed mb-6">
              A premium university ecosystem connecting students, alumni, lecturers, and corporate partners through professional networking, curated campus events, mentorship, and career opportunities.
            </p>
            <div className="flex items-center gap-2 text-xs text-neutral-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Campus network operational & active across partner universities</span>
            </div>
          </div>

          {/* Navigation Columns */}
          <div>
            <h5 className="font-bold text-neutral-900 text-xs uppercase tracking-wider mb-4">Platform</h5>
            <ul className="flex flex-col gap-2.5 text-xs text-neutral-500">
              <li><Link to="/community" className="hover:text-neutral-900 transition-colors">Explore Community</Link></li>
              <li><Link to="/faculties" className="hover:text-neutral-900 transition-colors">Fields & Faculties</Link></li>
              <li><Link to="/events" className="hover:text-neutral-900 transition-colors">Events & Workshops</Link></li>
              <li><Link to="/calendar" className="hover:text-neutral-900 transition-colors">Campus Calendar</Link></li>
              <li><Link to="/careers" className="hover:text-neutral-900 transition-colors">Career & Internships</Link></li>
              <li><Link to="/alumni" className="hover:text-neutral-900 transition-colors">Alumni Directory</Link></li>
              <li><Link to="/mentorship" className="hover:text-neutral-900 transition-colors">Mentorship Program</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-neutral-900 text-xs uppercase tracking-wider mb-4">Ecosystem</h5>
            <ul className="flex flex-col gap-2.5 text-xs text-neutral-500">
              <li><Link to="/dashboard" className="hover:text-neutral-900 transition-colors">Student Portal</Link></li>
              <li><Link to="/dashboard" className="hover:text-neutral-900 transition-colors">Alumni Network</Link></li>
              <li><Link to="/dashboard" className="hover:text-neutral-900 transition-colors">Faculty & Research</Link></li>
              <li><Link to="/dashboard" className="hover:text-neutral-900 transition-colors">University Administration</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-neutral-900 text-xs uppercase tracking-wider mb-4">Governance</h5>
            <ul className="flex flex-col gap-2.5 text-xs text-neutral-500">
              <li><span className="text-neutral-400">Student Code of Conduct</span></li>
              <li><span className="text-neutral-400">Privacy & Data Security</span></li>
              <li><span className="text-neutral-400">University Partnerships</span></li>
              <li><span className="text-neutral-400">Help & Support</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <p>© {new Date().getFullYear()} CAMPLY Network Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Built with React, TypeScript & Vite</span>
            <span className="text-neutral-300">•</span>
            <span>Clean Light Aesthetic</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
