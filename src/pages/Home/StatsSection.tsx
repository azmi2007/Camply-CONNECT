import React from 'react';
import { Counter } from '../../components/animations/Counter';
import { Users, Calendar, Award, Briefcase } from 'lucide-react';

export const StatsSection: React.FC = () => {
  const stats = [
    {
      label: 'Community Members',
      value: 10400,
      suffix: '+',
      icon: Users,
      description: 'Undergraduates, researchers & alumni'
    },
    {
      label: 'Campus Events',
      value: 520,
      suffix: '+',
      icon: Calendar,
      description: 'Workshops, hackathons & seminars'
    },
    {
      label: 'Verified Alumni',
      value: 1200,
      suffix: '+',
      icon: Award,
      description: 'Mentoring from leading tech companies'
    },
    {
      label: 'Career Opportunities',
      value: 340,
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
                  <div className="w-8 h-8 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-800">
                    <Icon className="w-4 h-4 text-[#7865F5]" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                    {item.label}
                  </span>
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-[#111111] tracking-tight">
                  <Counter value={item.value} suffix={item.suffix} />
                </div>
                <p className="text-xs text-neutral-500 mt-1">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

