import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Bell,
  BellRing,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  CheckCheck,
  Handshake,
  Inbox,
  UserPlus
} from 'lucide-react';
import { NotificationItem } from '../../types';
import { useCommunityStore } from '../../store/useCommunityStore';
import { formatRelativeTime } from '../../lib/utils';

const notificationMeta: Record<NotificationItem['type'], {
  label: string;
  icon: React.ElementType;
  iconClassName: string;
}> = {
  CONNECTION: {
    label: 'Connection',
    icon: UserPlus,
    iconClassName: 'bg-sky-50 text-sky-700 dark:bg-sky-500/10 dark:text-sky-300'
  },
  EVENT: {
    label: 'Event',
    icon: CalendarDays,
    iconClassName: 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300'
  },
  JOB: {
    label: 'Career',
    icon: BriefcaseBusiness,
    iconClassName: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300'
  },
  MENTORSHIP: {
    label: 'Mentoring',
    icon: Handshake,
    iconClassName: 'bg-violet-50 text-violet-700 dark:bg-violet-500/10 dark:text-violet-300'
  },
  SYSTEM: {
    label: 'System',
    icon: BellRing,
    iconClassName: 'bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300'
  }
};

const getMessagePreview = (message: string, maxLength = 72) => {
  const compactMessage = message.replace(/\s+/g, ' ').trim();
  if (compactMessage.length <= maxLength) return compactMessage;
  return `${compactMessage.slice(0, maxLength).trimEnd()}…`;
};

export const NotificationDropdown: React.FC = () => {
  const navigate = useNavigate();
  const { notifications, markNotificationRead, markAllNotificationsRead } = useCommunityStore();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((notification) => !notification.is_read).length;
  const unreadLabel = unreadCount > 9 ? '9+' : unreadCount;

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) setOpen(false);
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open]);

  const handleNotificationClick = (notification: NotificationItem) => {
    if (!notification.is_read) markNotificationRead(notification.id);
    setOpen(false);
    if (notification.link) navigate(notification.link);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((isOpen) => !isOpen)}
        aria-label={unreadCount > 0 ? `Notifications, ${unreadCount} unread` : 'Notifications'}
        aria-expanded={open}
        aria-controls="notification-popover"
        aria-haspopup="dialog"
        className={`relative flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-200 ${
          open
            ? 'border-[#7865F5]/40 bg-[#F1EEFF] text-[#6752EE] shadow-sm dark:bg-[#7865F5]/15 dark:text-[#B9AEFF]'
            : 'border-[#EAEAEA] bg-[#F8F8F8] text-neutral-600 hover:border-neutral-300 hover:text-neutral-900 dark:border-[#2C2F38] dark:bg-[#20232B] dark:text-neutral-300 dark:hover:text-white'
        }`}
      >
        <Bell className="h-4 w-4" strokeWidth={open ? 2.25 : 2} />
        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full border-2 border-white bg-[#7865F5] px-0.5 text-[9px] font-bold leading-none text-white dark:border-[#181A20]">
            {unreadLabel}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.section
            id="notification-popover"
            role="dialog"
            aria-label="Notifications"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 z-50 mt-3 w-[384px] max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl border border-[#EAEAEA] bg-white shadow-[0_18px_45px_-18px_rgba(15,23,42,0.28)] dark:border-[#2C2F38] dark:bg-[#181A20]"
          >
            <div className="flex items-center justify-between gap-4 border-b border-[#EAEAEA] px-4 py-3 dark:border-[#2C2F38]">
              <div>
                <h2 className="text-sm font-extrabold text-[#111111] dark:text-[#F5F5F5]">Notifications</h2>
                <p className="mt-0.5 text-[11px] text-neutral-500 dark:text-neutral-400">
                  {unreadCount > 0
                    ? `${unreadCount} activities need your attention`
                    : 'All notifications are read'}
                </p>
              </div>

              <button
                type="button"
                onClick={markAllNotificationsRead}
                disabled={unreadCount === 0}
                aria-label="Mark all notifications as read"
                className="inline-flex items-center gap-1 rounded-lg px-2 py-1.5 text-[11px] font-bold text-[#6752EE] transition-colors hover:bg-[#F1EEFF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7865F5] disabled:cursor-default disabled:text-neutral-400 disabled:hover:bg-transparent dark:text-[#B9AEFF] dark:hover:bg-[#7865F5]/10 dark:disabled:text-neutral-600"
              >
                <CheckCheck className="h-3.5 w-3.5" />
                Mark all
              </button>
            </div>

            {notifications.length > 0 ? (
              <div className="max-h-[min(28rem,calc(100vh-9rem))] overflow-y-auto p-2">
                {notifications.map((notification) => {
                  const meta = notificationMeta[notification.type];
                  const Icon = meta.icon;

                  return (
                    <button
                      key={notification.id}
                      type="button"
                      onClick={() => handleNotificationClick(notification)}
                      aria-label={`${notification.title}. Click to view details.`}
                      className={`group relative flex w-full gap-3 rounded-xl px-3 py-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7865F5] focus-visible:ring-inset ${
                        notification.is_read
                          ? 'hover:bg-neutral-50 dark:hover:bg-[#20232B]'
                          : 'bg-[#F8F7FF] hover:bg-[#F1EEFF] dark:bg-[#7865F5]/8 dark:hover:bg-[#7865F5]/14'
                      }`}
                    >
                      <span className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${meta.iconClassName}`}>
                        <Icon className="h-4 w-4" strokeWidth={2.1} />
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="flex items-center gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-wide text-neutral-400 dark:text-neutral-500">
                            {meta.label}
                          </span>
                          {!notification.is_read && (
                            <span className="h-1.5 w-1.5 rounded-full bg-[#7865F5]" aria-label="Unread" />
                          )}
                        </span>
                        <span className="mt-0.5 block pr-1 text-xs font-bold leading-snug text-[#111111] dark:text-[#F5F5F5]">
                          {notification.title}
                        </span>
                        <span className="mt-1 block line-clamp-1 pr-1 text-[11px] leading-[1.45] text-neutral-500 dark:text-neutral-400">
                          {getMessagePreview(notification.message)}
                        </span>
                        <span className="mt-2 flex items-center gap-1.5 text-[10px] font-medium text-neutral-400 dark:text-neutral-500">
                          <span>{formatRelativeTime(notification.created_at)}</span>
                          {notification.is_read && <Check className="h-3 w-3" aria-label="Read" />}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center px-8 py-12 text-center">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F8F8F8] text-neutral-400 dark:bg-[#20232B] dark:text-neutral-500">
                  <Inbox className="h-5 w-5" />
                </span>
                <h3 className="mt-3 text-sm font-bold text-[#111111] dark:text-[#F5F5F5]">No notifications</h3>
                <p className="mt-1 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
                  Recent campus activity will appear here.
                </p>
              </div>
            )}
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
};
