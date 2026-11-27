import React from 'react';
import { UserRole } from '../../types';
import { cn } from '../../lib/utils';

interface RoleBadgeProps {
  role: UserRole;
  size?: 'sm' | 'md';
  showDot?: boolean;
  className?: string;
}

export const RoleBadge: React.FC<RoleBadgeProps> = ({
  role,
  size = 'md',
  showDot = true,
  className
}) => {
  const getStyles = () => {
    switch (role) {
      case 'STUDENT':
        return {
          bg: 'bg-blue-50/90 text-blue-700 border-blue-200/80',
          dot: 'bg-blue-500'
        };
      case 'ALUMNI':
        return {
          bg: 'bg-purple-50/90 text-[#7865F5] border-purple-200/80',
          dot: 'bg-[#7865F5]'
        };
      case 'LECTURER':
        return {
          bg: 'bg-emerald-50/90 text-[#16A36A] border-emerald-200/80',
          dot: 'bg-[#16A36A]'
        };
      case 'ADMIN':
        return {
          bg: 'bg-neutral-900 text-white border-neutral-800 shadow-sm',
          dot: 'bg-amber-400'
        };
      default:
        return {
          bg: 'bg-gray-100 text-gray-700 border-gray-200',
          dot: 'bg-gray-400'
        };
    }
  };

  const style = getStyles();

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 font-medium tracking-wide uppercase border rounded-full transition-colors',
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs',
        style.bg,
        className
      )}
    >
      {showDot && (
        <span
          className={cn(
            'rounded-full',
            size === 'sm' ? 'w-1.5 h-1.5' : 'w-2 h-2',
            style.dot
          )}
        />
      )}
      <span>{role}</span>
    </span>
  );
};

