import React from 'react';
import { cn } from '../../utils/cn';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'ghost' | 'secondary' | 'gold' | 'surface';
  size?: 'sm' | 'md' | 'lg';
  label: string;
}

export const IconButton: React.FC<IconButtonProps> = ({
  children,
  className,
  variant = 'ghost',
  size = 'md',
  label,
  ...props
}) => {
  const sizeStyles = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-9 h-9 text-sm',
    lg: 'w-11 h-11 text-base',
  };

  const variantStyles = {
    ghost: 'text-text-secondary hover:text-white hover:bg-surface-2',
    secondary: 'border border-border-subtle bg-surface-2/60 text-text-secondary hover:text-white hover:border-accent-blue/50 hover:bg-surface-2',
    gold: 'bg-gold text-base hover:bg-gold-hover shadow-gold-glow',
    surface: 'bg-surface-1 border border-border-subtle text-text-secondary hover:text-white hover:border-border-strong',
  };

  return (
    <button
      aria-label={label}
      title={label}
      className={cn(
        'inline-flex items-center justify-center rounded-button transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gold/40 disabled:opacity-50',
        sizeStyles[size],
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
