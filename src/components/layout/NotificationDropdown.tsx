import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, CheckCheck } from 'lucide-react';
import { useCommunityStore } from '../../store/useCommunityStore';

export const NotificationDropdown: React.FC = () => {
  const navigate = useNavigate();
  const { notifications, markNotificationRead, markAllNotificationsRead } = useCommunityStore();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        aria-label="Notifications"
        className="relative w-9 h-9 rounded-full bg-[#F8F8F8] dark:bg-[#20232B] border border-[#EAEAEA] dark:border-[#2C2F38] flex items-center justify-center text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:border-neutral-300 transition-colors"
      >
        <Bell className="w-4 h-4" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#7865F5] text-white text-[9px] font-bold flex items-center justify-center border-2 border-white dark:border-[#181A20]">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-[#181A20] rounded-2xl shadow-2xl border border-[#EAEAEA] dark:border-[#2C2F38] p-3 z-50">
          <div className="flex items-center justify-between px-2 pb-2.5 mb-2 border-b border-neutral-100 dark:border-[#2C2F38]">
            <span className="font-bold text-xs text-[#111111] dark:text-[#F5F5F5]">
              Notifications ({unreadCount} unread)
            </span>
            <button
              onClick={markAllNotificationsRead}
              className="text-[11px] font-semibold text-[#7865F5] hover:underline inline-flex items-center gap-1"
            >
              <CheckCheck className="w-3 h-3" />
              Mark all read
            </button>
          </div>

          <div className="flex flex-col gap-1.5 max-h-72 overflow-y-auto">
            {notifications.map((n) => (
              <button
                key={n.id}
                onClick={() => {
                  markNotificationRead(n.id);
                  setOpen(false);
                  if (n.link) navigate(n.link);
                }}
                className={`text-left p-2.5 rounded-xl transition-colors flex flex-col gap-1 ${
                  n.is_read
                    ? 'bg-white dark:bg-[#181A20] hover:bg-neutral-50 dark:hover:bg-[#20232B]'
                    : 'bg-purple-50/60 dark:bg-[#7865F5]/10 hover:bg-purple-50 dark:hover:bg-[#7865F5]/20'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-bold text-xs text-[#111111] dark:text-[#F5F5F5] line-clamp-1">
                    {n.title}
                  </span>
                  <span className="text-[10px] text-[#929292] shrink-0">{n.created_at}</span>
                </div>
                <p className="text-[11px] text-neutral-500 dark:text-[#A0A0A0] line-clamp-2 leading-snug">
                  {n.message}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
