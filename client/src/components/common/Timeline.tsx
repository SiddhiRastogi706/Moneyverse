import React from 'react';
import { cn } from '../../utils/cn';

export interface TimelineEvent {
  id: string;
  title: string;
  dateOrInfo: string;
  badge?: React.ReactNode;
  dotColor?: string;
}

export interface TimelineProps {
  events: TimelineEvent[];
  className?: string;
}

export const Timeline: React.FC<TimelineProps> = ({ events, className }) => {
  return (
    <div className={cn('relative space-y-4 before:absolute before:inset-0 before:left-2 before:w-0.5 before:bg-slate-200', className)}>
      {events.map((event) => (
        <div key={event.id} className="relative flex items-center justify-between pl-7 group">
          {/* Dot */}
          <div
            className={cn(
              'absolute left-0.5 w-3.5 h-3.5 rounded-full border-2 border-white bg-sky-500 shadow-sm transition-transform group-hover:scale-125',
              event.dotColor
            )}
          />

          <div className="flex-1 min-w-0 pr-3">
            <h5 className="text-xs sm:text-sm font-bold text-slate-900 tracking-tight truncate">
              {event.title}
            </h5>
            <p className="text-[11px] text-slate-500 mt-0.5">{event.dateOrInfo}</p>
          </div>

          {event.badge && <div className="flex-shrink-0">{event.badge}</div>}
        </div>
      ))}
    </div>
  );
};
