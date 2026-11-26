import React from 'react';
import { Bell } from 'lucide-react';

export const AnnouncementsPage: React.FC = () => {
  return (
    <div className="py-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white dark:bg-[#181A20] rounded-3xl border border-[#EAEAEA] dark:border-[#2C2F38] p-8 shadow-sm text-center">
        <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-5">
          <Bell className="w-7 h-7" />
        </div>
        <h1 className="text-xl font-extrabold text-[#111111] dark:text-[#F5F5F5] tracking-tight mb-2">
          Campus Announcements
        </h1>
        <p className="text-xs text-[#929292] dark:text-[#A0A0A0] mb-4 max-w-sm mx-auto leading-relaxed">
          University-wide notices, faculty updates, and department broadcasts will appear here.
        </p>
        <span className="text-xs font-semibold text-[#7865F5] bg-purple-50 dark:bg-purple-950/40 px-3 py-1 rounded-full">
          Coming Soon
        </span>
      </div>
    </div>
  );
};
