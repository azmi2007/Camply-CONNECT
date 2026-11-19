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

