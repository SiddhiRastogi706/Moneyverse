import React from 'react';
import { FolderSearch } from 'lucide-react';
import { cn } from '../../utils/cn';
import { Button } from './Button';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionText,
  onAction,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center p-8 sm:p-12 rounded-2xl border border-dashed border-border-subtle bg-surface-1/50',
        className
      )}
    >
      <div className="w-14 h-14 rounded-2xl bg-surface-2 flex items-center justify-center text-text-muted mb-4 border border-border-subtle shadow-inner">
        {icon || <FolderSearch className="w-7 h-7 text-accent-blue/70" />}
      </div>
      <h4 className="text-base font-semibold font-heading text-white mb-1.5">{title}</h4>
      <p className="text-xs sm:text-sm text-text-muted max-w-sm mb-5 leading-relaxed">
        {description}
      </p>
      {actionText && onAction && (
        <Button variant="secondary" size="sm" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </div>
  );
};
