import React from 'react';
import { cn } from '../../utils/cn';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
  variant?: 'surface' | 'glass' | 'surface-2' | 'danger';
  radius?: 'default' | 'panel' | 'sm';
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  hoverEffect = false,
  variant = 'surface',
  radius = 'default',
  ...props
}) => {
  const radiusStyles = {
    sm: 'rounded-[10px]',
    default: 'rounded-[14px]',
    panel: 'rounded-[20px]',
  };

  const variantStyles = {
    surface:
      'bg-white border border-slate-200 shadow-sm',
    glass:
      'glass-card shadow-sm',
    'surface-2':
      'bg-[#F8FAFC] border border-slate-200 shadow-sm',
    danger:
      'danger-box',
  };

  return (
    <div
      className={cn(
        'relative overflow-hidden transition-all duration-200',
        radiusStyles[radius],
        variantStyles[variant],
        hoverEffect && 'glass-card-hover',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
