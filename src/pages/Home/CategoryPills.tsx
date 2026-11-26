import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Terminal,
  Cpu,
  Briefcase,
  Palette,
  MessageSquare,
  Stethoscope,
  Scale,
  TrendingUp,
  Globe,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { COMMUNITY_CATEGORIES } from '../../data/mockData';
import { cn } from '../../lib/utils';

interface CategoryPillsProps {
  selectedCategory: string;
  onSelectCategory?: (name: string) => void;
  navigateOnSelect?: boolean;
}

export const CategoryPills: React.FC<CategoryPillsProps> = ({
  selectedCategory,
  onSelectCategory,
  navigateOnSelect = true
}) => {
  const navigate = useNavigate();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Terminal': return <Terminal className="w-3.5 h-3.5" />;
      case 'Cpu': return <Cpu className="w-3.5 h-3.5" />;
      case 'Briefcase': return <Briefcase className="w-3.5 h-3.5" />;
      case 'Palette': return <Palette className="w-3.5 h-3.5" />;
      case 'MessageSquare': return <MessageSquare className="w-3.5 h-3.5" />;
      case 'Stethoscope': return <Stethoscope className="w-3.5 h-3.5" />;
      case 'Scale': return <Scale className="w-3.5 h-3.5" />;
      case 'TrendingUp': return <TrendingUp className="w-3.5 h-3.5" />;
      case 'Globe': return <Globe className="w-3.5 h-3.5" />;
      default: return <Sparkles className="w-3.5 h-3.5" />;
    }
  };

  const handleSelect = (name: string) => {
    onSelectCategory?.(name);
    if (navigateOnSelect) {
      if (name === 'All') {
        navigate('/community');
      } else {
        navigate(`/community?faculty=${encodeURIComponent(name)}`);
      }
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#929292]">
          Explore by Field & Faculty
        </h3>
        <div className="flex items-center gap-3">
          {selectedCategory !== 'All' && !navigateOnSelect && (
            <button
              onClick={() => handleSelect('All')}
              className="text-xs text-[#7865F5] font-semibold hover:underline"
            >
              Clear Filter
            </button>
          )}
          <Link
            to="/faculties"
            className="text-xs font-bold text-[#111111] hover:text-[#7865F5] inline-flex items-center gap-1 transition-colors"
          >
            <span>All Faculties</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
        <button
          onClick={() => handleSelect('All')}
          className={cn(
            'flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 shrink-0 border',
            selectedCategory === 'All'
              ? 'bg-[#111111] text-white border-[#111111] shadow-sm'
              : 'bg-white text-neutral-700 border-[#EAEAEA] hover:border-neutral-300 hover:bg-neutral-50'
          )}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>All Disciplines</span>
        </button>

        {COMMUNITY_CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.name;
          return (
            <button
              key={cat.name}
              onClick={() => handleSelect(cat.name)}
              className={cn(
                'flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 shrink-0 border cursor-pointer',
                isSelected
                  ? 'bg-[#111111] text-white border-[#111111] shadow-sm'
                  : 'bg-white text-neutral-700 border-[#EAEAEA] hover:border-neutral-300 hover:bg-neutral-50'
              )}
            >
              <span className={isSelected ? 'text-[#7865F5]' : 'text-neutral-500'}>
                {getIcon(cat.icon)}
              </span>
              <span>{cat.name}</span>
              <span
                className={cn(
                  'text-[10px] px-1.5 py-0.5 rounded-full font-normal',
                  isSelected ? 'bg-white/20 text-white' : 'bg-[#F8F8F8] text-[#929292]'
                )}
              >
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
