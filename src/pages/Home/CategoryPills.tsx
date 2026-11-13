import React from 'react';
import { 
  Terminal, 
  Cpu, 
  Briefcase, 
  Palette, 
  MessageSquare, 
  Stethoscope, 
  Scale, 
  TrendingUp, 
  Sparkles 
} from 'lucide-react';
import { COMMUNITY_CATEGORIES } from '../../data/mockData';
import { cn } from '../../lib/utils';

interface CategoryPillsProps {
  selectedCategory: string;
  onSelectCategory: (name: string) => void;
}

export const CategoryPills: React.FC<CategoryPillsProps> = ({
  selectedCategory,
  onSelectCategory
}) => {
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
      default: return <Sparkles className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
          Explore by Field & Faculty
        </h3>
        {selectedCategory !== 'All' && (
          <button
            onClick={() => onSelectCategory('All')}
            className="text-xs text-[#7865F5] font-semibold hover:underline"
          >
            Clear Filter
          </button>
        )}
      </div>

      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
        <button
          onClick={() => onSelectCategory('All')}
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 shrink-0 border',
            selectedCategory === 'All'
              ? 'bg-[#111111] text-white border-neutral-900 shadow-sm'
              : 'bg-white text-neutral-700 border-neutral-200/90 hover:border-neutral-300 hover:bg-neutral-50'
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
              onClick={() => onSelectCategory(cat.name)}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 shrink-0 border',
                isSelected
                  ? 'bg-[#111111] text-white border-neutral-900 shadow-sm'
                  : 'bg-white text-neutral-700 border-neutral-200/90 hover:border-neutral-300 hover:bg-neutral-50'
              )}
            >
              <span className={isSelected ? 'text-[#7865F5]' : 'text-neutral-500'}>
                {getIcon(cat.icon)}
              </span>
              <span>{cat.name}</span>
              <span className={cn(
                'text-[10px] px-1.5 py-0.5 rounded-full font-normal',
                isSelected ? 'bg-white/20 text-white' : 'bg-neutral-100 text-neutral-400'
              )}>
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

