import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface StepItem {
  id: string | number;
  title: string;
  subtitle?: string;
}

export interface StepperProps {
  steps: StepItem[];
  activeStep: number; // 0-indexed
  onStepClick?: (stepIndex: number) => void;
  className?: string;
}

export const Stepper: React.FC<StepperProps> = ({
  steps,
  activeStep,
  onStepClick,
  className,
}) => {
  return (
    <div className={cn('w-full flex items-center justify-between', className)}>
      {steps.map((step, idx) => {
        const isDone = idx < activeStep;
        const isActive = idx === activeStep;

        return (
          <React.Fragment key={step.id}>
            <div
              onClick={() => onStepClick && idx <= activeStep && onStepClick(idx)}
              className={cn(
                'flex flex-col items-center gap-1.5 flex-1 relative',
                onStepClick && idx <= activeStep && 'cursor-pointer'
              )}
            >
              <div
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 border-2 shadow-sm',
                  isDone
                    ? 'bg-emerald-500 text-white border-emerald-500 shadow-emerald-500/25'
                    : isActive
                    ? 'bg-sky-500 text-white border-sky-500 shadow-sky-500/25 ring-4 ring-sky-100'
                    : 'bg-slate-100 text-slate-400 border-slate-200'
                )}
              >
                {isDone ? <Check className="w-4 h-4 text-white" /> : idx + 1}
              </div>
              <span
                className={cn(
                  'text-xs font-medium text-center',
                  isActive ? 'text-slate-900 font-bold' : isDone ? 'text-slate-700 font-semibold' : 'text-slate-400'
                )}
              >
                {step.title}
              </span>
            </div>

            {idx < steps.length - 1 && (
              <div
                className={cn(
                  'h-0.5 flex-1 mx-2 -mt-5 transition-colors duration-300',
                  idx < activeStep ? 'bg-emerald-500' : 'bg-slate-200'
                )}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
