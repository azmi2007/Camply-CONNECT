import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  } catch {
    return dateString;
  }
}

export function formatTimeRange(start: string, end: string): string {
  return `${start.slice(0, 5)} - ${end.slice(0, 5)}`;
}

/** Formats API timestamps for compact UI surfaces without storing presentation text in data. */
export function formatRelativeTime(dateString: string): string {
  const timestamp = new Date(dateString).getTime();
  if (Number.isNaN(timestamp)) return dateString;

  const seconds = Math.round((timestamp - Date.now()) / 1000);
  const ranges: Array<[Intl.RelativeTimeFormatUnit, number]> = [
    ['year', 60 * 60 * 24 * 365],
    ['month', 60 * 60 * 24 * 30],
    ['week', 60 * 60 * 24 * 7],
    ['day', 60 * 60 * 24],
    ['hour', 60 * 60],
    ['minute', 60]
  ];

  if (Math.abs(seconds) < 60) return 'Just now';

  const [unit, interval] = ranges.find(([, value]) => Math.abs(seconds) >= value) || ['minute', 60];
  return new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(Math.round(seconds / interval), unit);
}

export function getRoleBadgeColor(role: string): { bg: string; text: string; border: string; dot: string } {
  switch (role) {
    case 'STUDENT':
      return {
        bg: 'bg-blue-50',
        text: 'text-blue-700',
        border: 'border-blue-200',
        dot: 'bg-blue-600'
      };
    case 'ALUMNI':
      return {
        bg: 'bg-purple-50',
        text: 'text-purple-700',
        border: 'border-purple-200',
        dot: 'bg-[#7865F5]'
      };
    case 'LECTURER':
      return {
        bg: 'bg-emerald-50',
        text: 'text-emerald-700',
        border: 'border-emerald-200',
        dot: 'bg-[#16A36A]'
      };
    case 'ADMIN':
      return {
        bg: 'bg-neutral-900',
        text: 'text-white',
        border: 'border-neutral-700',
        dot: 'bg-white'
      };
    default:
      return {
        bg: 'bg-gray-100',
        text: 'text-gray-700',
        border: 'border-gray-200',
        dot: 'bg-gray-500'
      };
  }
}

