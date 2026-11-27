import React from 'react';
import { cn } from '../../lib/utils';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  icon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading = false, icon, children, disabled, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none select-none';

    const variants = {
      primary: 'bg-[#111111] text-white hover:bg-black/90 shadow-sm focus-visible:ring-neutral-900',
      secondary: 'bg-white text-[#111111] border border-[#EAEAEA] hover:border-neutral-300 hover:bg-neutral-50 shadow-sm focus-visible:ring-neutral-300',
      accent: 'bg-[#7865F5] text-white hover:bg-[#6752EE] shadow-sm shadow-[#7865F5]/20 focus-visible:ring-[#7865F5]',
      ghost: 'bg-transparent text-neutral-700 hover:bg-neutral-100/80 hover:text-neutral-900',
      outline: 'bg-transparent text-neutral-800 border border-neutral-200 hover:bg-neutral-50',
      danger: 'bg-rose-600 text-white hover:bg-rose-700 shadow-sm'
    };

    const sizes = {
      sm: 'text-sm h-9 px-3.5 rounded-full gap-1.5',
      md: 'text-sm h-10 px-4 rounded-full gap-2',
      lg: 'text-base h-12 px-6 rounded-full gap-2.5 font-semibold'
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading && <Loader2 className="w-4 h-4 animate-spin text-current" />}
        {!isLoading && icon && <span className="shrink-0">{icon}</span>}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

