import React from 'react';
import { Card } from './Card';
import { cn } from '../../utils/cn';

export interface ChartCardProps {
  title: string;
  subtitle?: string;
  rightAction?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const ChartCard: React.FC<ChartCardProps> = ({
  title,
  subtitle,
  rightAction,
  children,
  className,
}) => {
  return (
    <Card className={cn('p-5 flex flex-col', className)}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="text-base font-semibold font-heading text-white">{title}</h4>
          {subtitle && <p className="text-xs text-text-muted mt-0.5">{subtitle}</p>}
        </div>
        {rightAction && <div>{rightAction}</div>}
      </div>
      <div className="flex-1 w-full min-h-[220px]">{children}</div>
    </Card>
  );
};
