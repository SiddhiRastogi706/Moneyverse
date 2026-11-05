import React from 'react';
import { Card } from './Card';
import { cn } from '../../utils/cn';

export interface StatCardProps {
  title: string;
  value: string;
  subValue?: string;
  trend?: {
    value: string;
    isPositive?: boolean;
  };
  icon: React.ReactNode;
  iconBgColor?: string;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subValue,
  trend,
  icon,
  iconBgColor = 'bg-accent-blue/15 text-accent-blue',
  className,
}) => {
  return (
    <Card hoverEffect className={cn('p-4 sm:p-5 flex items-center gap-4', className)}>
      {/* Icon pill */}
      <div
        className={cn(
          'w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 border border-white/5 shadow-inner',
          iconBgColor
        )}
      >
        {icon}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-text-muted truncate mb-1">{title}</p>
        <div className="flex items-baseline gap-2">
          <h3 className="text-xl sm:text-2xl font-bold font-heading text-white tracking-tight">
            {value}
          </h3>
          {trend && (
            <span
              className={cn(
                'text-xs font-semibold px-1.5 py-0.5 rounded',
                trend.isPositive
                  ? 'text-status-success bg-status-success/10'
                  : 'text-status-danger bg-status-danger/10'
              )}
            >
              {trend.value}
            </span>
          )}
        </div>
        {subValue && (
          <p className="text-[11px] text-text-secondary mt-0.5 truncate">{subValue}</p>
        )}
      </div>
    </Card>
  );
};
