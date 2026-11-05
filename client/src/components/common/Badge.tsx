import React from 'react';
import { cn } from '../../utils/cn';

export interface BadgeProps {
  children: React.ReactNode;
  variant?:
    | 'gold'
    | 'bonds'
    | 'moneyMarket'
    | 'mutualFunds'
    | 'unlisted'
    | 'cash'
    | 'success'
    | 'warning'
    | 'danger'
    | 'info'
    | 'neutral';
  size?: 'xs' | 'sm' | 'md';
  className?: string;
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'sm',
  className,
  dot = false,
}) => {
  const sizeStyles = {
    xs: 'text-[10px] px-2 py-0.5 font-medium tracking-wide',
    sm: 'text-xs px-2.5 py-0.5 font-medium',
    md: 'text-sm px-3 py-1 font-semibold',
  };

  const variantStyles = {
    gold: 'bg-sky-500/15 text-sky-400 border-sky-400/30',
    bonds: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
    moneyMarket: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    mutualFunds: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    unlisted: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
    cash: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    success: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    warning: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    danger: 'bg-red-500/15 text-red-400 border-red-500/30',
    info: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
    neutral: 'bg-surface-2 text-text-secondary border-border-subtle',
  };

  const dotColors = {
    gold: 'bg-gold',
    bonds: 'bg-blue-400',
    moneyMarket: 'bg-emerald-400',
    mutualFunds: 'bg-emerald-400',
    unlisted: 'bg-purple-400',
    cash: 'bg-amber-400',
    success: 'bg-emerald-400',
    warning: 'bg-amber-400',
    danger: 'bg-red-400',
    info: 'bg-cyan-400',
    neutral: 'bg-text-muted',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-pill border select-none',
        sizeStyles[size],
        variantStyles[variant],
        className
      )}
    >
      {dot && <span className={cn('w-1.5 h-1.5 rounded-full', dotColors[variant])} />}
      {children}
    </span>
  );
};
