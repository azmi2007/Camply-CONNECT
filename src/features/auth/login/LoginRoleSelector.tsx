import React from 'react';
import { GraduationCap, Briefcase, BookOpen } from 'lucide-react';
import { PublicLoginRole } from '../authService';
import { cn } from '../../../lib/utils';

interface LoginRoleSelectorProps {
  selectedRole: PublicLoginRole;
  onSelectRole: (role: PublicLoginRole) => void;
}

export const LoginRoleSelector: React.FC<LoginRoleSelectorProps> = ({
  selectedRole,
  onSelectRole
}) => {
  const roles: {
    id: PublicLoginRole;
    label: string;
    subtitle: string;
    icon: React.FC<{ className?: string }>;
  }[] = [
    {
      id: 'STUDENT',
      label: 'Student',
      subtitle: 'NIM Login',
      icon: GraduationCap
    },
    {
      id: 'ALUMNI',
      label: 'Alumni',
      subtitle: 'Email / ID',
      icon: Briefcase
    },
    {
      id: 'LECTURER',
      label: 'Lecturer',
      subtitle: 'NIDN / NIP',
      icon: BookOpen
    }
  ];

  return (
    <div className="grid grid-cols-3 gap-2.5" role="tablist" aria-label="Select login account type">
      {roles.map((r) => {
        const Icon = r.icon;
        const isActive = selectedRole === r.id;
        return (
          <button
            key={r.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onSelectRole(r.id)}
            className={cn(
              'p-3 rounded-2xl border text-left transition-all flex flex-col gap-1.5',
              isActive
                ? 'bg-[#111111] dark:bg-[#8B7CFF] text-white dark:text-[#101114] border-[#111111] dark:border-[#8B7CFF] shadow-sm'
                : 'bg-[#F8F8F8] dark:bg-[#20232B] text-neutral-700 dark:text-neutral-300 border-[#EAEAEA] dark:border-[#2C2F38] hover:border-neutral-300'
            )}
          >
            <Icon className={cn('w-4 h-4', isActive ? 'text-[#7865F5] dark:text-[#101114]' : 'text-neutral-500')} />
            <div>
              <div className="text-xs font-bold leading-tight">{r.label}</div>
              <div className={cn('text-[10px]', isActive ? 'text-neutral-300 dark:text-[#101114]/80' : 'text-neutral-400')}>
                {r.subtitle}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
};
