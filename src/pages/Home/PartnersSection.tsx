import React from 'react';
import { UNIVERSITY_PARTNERS } from '../../data/mockData';

export const PartnersSection: React.FC = () => {
  return (
    <section className="py-8 border-b border-[#EAEAEA] bg-[#F8F8F8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 shrink-0">
            Partner Universities & Faculties
          </span>
          <div className="flex items-center gap-4 sm:gap-8 overflow-x-auto no-scrollbar w-full sm:w-auto justify-start sm:justify-end py-1">
            {UNIVERSITY_PARTNERS.map((partner, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-neutral-200/80 shadow-2xs shrink-0"
              >
                <div className="w-5 h-5 rounded-md bg-neutral-900 text-white flex items-center justify-center font-bold text-[10px]">
                  {partner.abbr.slice(0, 2)}
                </div>
                <span className="text-xs font-semibold text-neutral-700 whitespace-nowrap">
                  {partner.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

