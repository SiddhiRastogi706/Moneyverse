import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
  variant?: 'landing' | 'dashboard' | 'compact';
  subtitle?: 'invest' | 'bonds';
  textColor?: string;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  variant = 'landing',
  subtitle = 'invest',
  textColor,
}) => {
  const isDark = textColor === 'text-white';
  return (
    <Link to="/" className={`inline-flex items-center gap-2.5 group ${className}`}>
      {/* Golden Wealth Tree Logo Mark */}
      <div className="relative flex-shrink-0">
        <img
          src="/logo-moneyverse.png"
          alt="MoneyVerse Wealth Tree"
          className="w-8 h-8 sm:w-9 sm:h-9 object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-sm"
        />
      </div>

      {variant !== 'compact' && (
        <div className="flex flex-col leading-none">
          <div className={`flex items-center text-xl font-black font-heading tracking-tight ${textColor || 'text-slate-900'}`}>
            <span>Money</span>
            <span className={isDark ? 'text-sky-400' : 'text-sky-600'}>Verse</span>
          </div>
          <span className={`text-[9px] font-bold tracking-[0.14em] uppercase mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            {subtitle === 'bonds'
              ? 'Bonds | Mutual Funds | Unlisted Shares'
              : 'INVEST · GROW · BUILD WEALTH'}
          </span>
        </div>
      )}
    </Link>
  );
};
