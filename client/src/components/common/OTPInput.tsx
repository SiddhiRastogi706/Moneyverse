import React, { useRef, useState, useEffect } from 'react';
import { cn } from '../../utils/cn';

interface OTPInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  error?: boolean;
}

export const OTPInput: React.FC<OTPInputProps> = ({
  length = 6,
  value,
  onChange,
  disabled = false,
  error = false,
}) => {
  const [digits, setDigits] = useState<string[]>(Array(length).fill(''));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const arr = value.split('').slice(0, length);
    while (arr.length < length) arr.push('');
    setDigits(arr);
  }, [value, length]);

  const handleChange = (index: number, val: string) => {
    if (disabled) return;
    const clean = val.replace(/\D/g, '');
    const newDigits = [...digits];

    if (clean.length > 1) {
      // Pasting full OTP
      const pasted = clean.slice(0, length).split('');
      for (let i = 0; i < length; i++) {
        newDigits[i] = pasted[i] || '';
      }
      setDigits(newDigits);
      onChange(newDigits.join(''));
      const nextIndex = Math.min(pasted.length, length - 1);
      inputsRef.current[nextIndex]?.focus();
      return;
    }

    newDigits[index] = clean.slice(-1);
    setDigits(newDigits);
    onChange(newDigits.join(''));

    if (clean && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex items-center gap-2.5 justify-center">
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={(el) => (inputsRef.current[i] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digits[i] || ''}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          disabled={disabled}
          className={cn(
            'w-12 h-12 text-center text-lg font-bold font-heading rounded-button bg-surface-2 border border-border-subtle text-white transition-all duration-200 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/40',
            error && 'border-status-danger text-status-danger',
            disabled && 'opacity-50 cursor-not-allowed'
          )}
        />
      ))}
    </div>
  );
};
