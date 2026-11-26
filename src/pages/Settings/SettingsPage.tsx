import React from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { Settings } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { user } = useAuthStore();

  return (
    <div className="py-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white dark:bg-[#181A20] rounded-3xl border border-[#EAEAEA] dark:border-[#2C2F38] p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-2xl bg-neutral-100 dark:bg-[#20232B] flex items-center justify-center">
            <Settings className="w-5 h-5 text-neutral-600 dark:text-neutral-300" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-[#111111] dark:text-[#F5F5F5] tracking-tight">
              Account Settings
            </h1>
            <p className="text-xs text-[#929292]">
              Manage your profile, preferences, and privacy.
            </p>
          </div>
        </div>

        <div className="space-y-5">
          <div className="p-5 rounded-2xl bg-neutral-50 dark:bg-[#20232B] border border-neutral-100 dark:border-[#2C2F38]">
            <h3 className="font-bold text-sm text-neutral-900 dark:text-neutral-100 mb-1">Profile Information</h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-3">
              {user?.full_name} • {user?.email}
            </p>
            <span className="text-xs font-semibold text-[#7865F5] bg-purple-50 dark:bg-purple-950/40 px-3 py-1 rounded-full">
              Coming Soon
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-neutral-50 dark:bg-[#20232B] border border-neutral-100 dark:border-[#2C2F38]">
            <h3 className="font-bold text-sm text-neutral-900 dark:text-neutral-100 mb-1">Notification Preferences</h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-3">
              Configure how and when you receive platform notifications.
            </p>
            <span className="text-xs font-semibold text-[#7865F5] bg-purple-50 dark:bg-purple-950/40 px-3 py-1 rounded-full">
              Coming Soon
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-neutral-50 dark:bg-[#20232B] border border-neutral-100 dark:border-[#2C2F38]">
            <h3 className="font-bold text-sm text-neutral-900 dark:text-neutral-100 mb-1">Privacy & Security</h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-3">
              Password updates, two-factor authentication, and account visibility.
            </p>
            <span className="text-xs font-semibold text-[#7865F5] bg-purple-50 dark:bg-purple-950/40 px-3 py-1 rounded-full">
              Coming Soon
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
