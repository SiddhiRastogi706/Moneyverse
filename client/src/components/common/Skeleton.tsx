import React from 'react';
import { cn } from '../../utils/cn';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  variant?: 'text' | 'rect' | 'circle';
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className,
  variant = 'rect',
  ...props
}) => {
  const variantStyles = {
    text: 'h-4 rounded',
    rect: 'rounded-xl',
    circle: 'rounded-full',
  };

  return (
    <div
      className={cn(
        'animate-pulse bg-surface-2/80 relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/5 before:to-transparent',
        variantStyles[variant],
        className
      )}
      {...props}
    />
  );
};
