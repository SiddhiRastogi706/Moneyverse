import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface AccordionItemData {
  id: string;
  number?: string | number;
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
  content: React.ReactNode;
  defaultOpen?: boolean;
}

export interface AccordionProps {
  items: AccordionItemData[];
  allowMultiple?: boolean;
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  className,
}) => {
  const [openIds, setOpenIds] = useState<string[]>(() => {
    return items.filter((item) => item.defaultOpen).map((item) => item.id);
  });

  const toggle = (id: string) => {
    if (allowMultiple) {
      setOpenIds((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className={cn('space-y-3', className)}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);

        return (
          <div
            key={item.id}
            className={cn(
              'rounded-xl border transition-all duration-200 overflow-hidden',
              isOpen
                ? 'bg-gradient-to-r from-sky-50/90 via-white to-blue-50/40 border-sky-300 shadow-sm shadow-sky-100'
                : 'bg-white border-slate-200 hover:border-sky-300 hover:bg-slate-50/70 shadow-sm'
            )}
          >
            <button
              onClick={() => toggle(item.id)}
              className="w-full flex items-center justify-between p-4 sm:p-5 text-left focus:outline-none"
              aria-expanded={isOpen}
            >
              <div className="flex items-center gap-3.5 pr-4 min-w-0">
                {item.icon ? (
                  <div className="w-8 h-8 rounded-lg bg-sky-50 flex items-center justify-center flex-shrink-0 text-sky-600 border border-sky-200 shadow-sm">
                    {item.icon}
                  </div>
                ) : item.number !== undefined ? (
                  <div
                    className={cn(
                      'w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold font-heading transition-colors',
                      isOpen
                        ? 'bg-sky-500 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-700 border border-slate-200'
                    )}
                  >
                    {item.number}
                  </div>
                ) : null}

                <div className="min-w-0">
                  <h4 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                    {item.title}
                  </h4>
                  {item.subtitle && (
                    <p className="text-xs text-slate-500 mt-0.5 truncate">{item.subtitle}</p>
                  )}
                </div>
              </div>

              <div
                className={cn(
                  'w-6 h-6 rounded-md flex items-center justify-center text-slate-400 transition-transform duration-200 flex-shrink-0',
                  isOpen && 'transform rotate-180 text-sky-600'
                )}
              >
                <ChevronDown className="w-4 h-4" />
              </div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                >
                  <div className="px-5 pb-5 pt-3 text-sm text-slate-700 border-t border-sky-100 leading-relaxed">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};
