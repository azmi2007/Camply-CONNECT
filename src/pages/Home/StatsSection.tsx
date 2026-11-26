import React from 'react';
import { Counter } from '../../components/animations/Counter';
import { Users, Calendar, Award, Briefcase } from 'lucide-react';

export const StatsSection: React.FC = () => {
  const stats = [
    {
      label: 'Community Members',
      value: 10000,
      compactK: true,
      suffix: '+',
      icon: Users,
      description: 'Undergraduates, researchers & faculty'
    },
    {
      label: 'Alumni',
      value: 1000,
      compactK: true,
      suffix: '+',
      icon: Award,
      description: 'Mentoring from leading global firms'
    },
    {
      label: 'Campus Events',
      value: 500,
      compactK: false,
      suffix: '+',
      icon: Calendar,
      description: 'Workshops, hackathons & seminars'
    },
    {
      label: 'Career Opportunities',
      value: 300,
      compactK: false,
      suffix: '+',
      icon: Briefcase,
      description: 'Exclusive internships & fresh-grad jobs'
    }
  ];

  return (
    <section className="py-12 border-b border-[#EAEAEA] bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex flex-col">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-xl bg-[#F8F8F8] border border-[#EAEAEA] flex items-center justify-center text-[#111111]">
                    <Icon className="w-4 h-4 text-[#7865F5]" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#929292]">
                    {item.label}
                  </span>
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-[#111111] tracking-tight">
                  <Counter value={item.value} compactK={item.compactK} suffix={item.suffix} />
                </div>
                <p className="text-xs text-[#929292] mt-1">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
