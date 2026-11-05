import React from 'react';
import { cn } from '../../utils/cn';

export interface SectionHeaderProps {
  overline?: string;
  title: React.ReactNode;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  overline,
  title,
  subtitle,
  align = 'left',
  className,
}) => {
  const alignStyles = {
    left: 'text-left items-start',
    center: 'text-center items-center mx-auto',
    right: 'text-right items-end ml-auto',
  };

  return (
    <div className={cn('flex flex-col max-w-2xl mb-8 sm:mb-12', alignStyles[align], className)}>
      {overline && (
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-gold mb-2.5">
          {overline}
        </span>
      )}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading text-white tracking-tight leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm sm:text-base text-text-secondary mt-3 leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};
