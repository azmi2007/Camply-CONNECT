import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowLeft } from 'lucide-react';
import { Button } from '../../components/ui/Button';

interface AdminPlaceholderProps {
  section: string;
}

export const AdminPlaceholder: React.FC<AdminPlaceholderProps> = ({ section }) => {
  return (
    <div className="py-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white dark:bg-[#181A20] rounded-3xl border border-[#EAEAEA] dark:border-[#2C2F38] p-8 shadow-sm text-center">
        <div className="w-14 h-14 rounded-2xl bg-neutral-100 dark:bg-[#20232B] text-neutral-600 dark:text-neutral-300 flex items-center justify-center mx-auto mb-5">
          <ShieldCheck className="w-7 h-7" />
        </div>

        <span className="text-[10px] font-bold uppercase tracking-wider text-[#7865F5] block mb-1">
          Admin Only
        </span>
        <h1 className="text-xl font-extrabold text-[#111111] dark:text-[#F5F5F5] tracking-tight mb-2">
          {section}
        </h1>
        <p className="text-xs text-[#929292] dark:text-[#A0A0A0] mb-6 max-w-sm mx-auto leading-relaxed">
          This administration module is under development and will be available in the next release.
        </p>

        <Link to="/admin">
          <Button variant="secondary" size="md" icon={<ArrowLeft className="w-4 h-4" />}>
            Back to Admin Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
};
