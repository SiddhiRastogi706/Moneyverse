import React from 'react';
import { cn } from '../../utils/cn';

export interface TabItem {
  id: string;
  label: string;
  badge?: string | number;
  icon?: React.ReactNode;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (tabId: string) => void;
  variant?: 'underline' | 'pill' | 'segmented';
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onChange,
  variant = 'underline',
  className,
}) => {
  return (
    <div
      className={cn(
        'flex items-center gap-1 overflow-x-auto no-scrollbar',
        variant === 'segmented' && 'bg-surface-2 p-1 rounded-lg border border-border-subtle',
        className
      )}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;

        if (variant === 'underline') {
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={cn(
                'relative px-4 py-2.5 text-sm font-medium transition-colors flex items-center gap-2 whitespace-nowrap focus:outline-none',
                isActive ? 'text-white' : 'text-text-secondary hover:text-white'
              )}
            >
              {tab.icon && <span className="w-4 h-4">{tab.icon}</span>}
              <span>{tab.label}</span>
              {tab.badge !== undefined && (
                <span
                  className={cn(
                    'text-[10px] px-1.5 py-0.2 rounded-full font-bold',
                    isActive ? 'bg-gold text-base' : 'bg-surface-2 text-text-secondary'
                  )}
                >
                  {tab.badge}
                </span>
              )}
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold rounded-full shadow-[0_0_8px_#F5B82E]" />
              )}
            </button>
          );
        }

        if (variant === 'pill') {
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={cn(
                'px-4 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-2 whitespace-nowrap focus:outline-none',
                isActive
                  ? 'bg-gold text-base font-semibold shadow-gold-glow'
                  : 'bg-surface-2 text-text-secondary hover:text-white hover:bg-surface-3 border border-border-subtle'
              )}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {tab.badge !== undefined && <span>({tab.badge})</span>}
            </button>
          );
        }

        // Segmented
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              'px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-1.5 whitespace-nowrap focus:outline-none flex-1 justify-center',
              isActive
                ? 'bg-surface-1 text-white shadow-sm border border-border-subtle font-semibold'
                : 'text-text-muted hover:text-text-secondary'
            )}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};
