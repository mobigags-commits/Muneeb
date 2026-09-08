import React, { useState } from 'react';

export interface AcademyLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  showText?: boolean;
  textTone?: 'gold' | 'light' | 'dark';
  subtext?: string;
  className?: string;
  shape?: 'rounded' | 'circle' | 'shield';
  glowEffect?: boolean;
  onClick?: () => void;
}

export const AcademyLogo: React.FC<AcademyLogoProps> = ({
  size = 'md',
  showText = false,
  textTone = 'gold',
  subtext = 'Online Quran Academy • Rawalpindi',
  className = '',
  shape = 'rounded',
  glowEffect = true,
  onClick,
}) => {
  const [imgError, setImgError] = useState(false);

  // Size mappings
  const dimensionClasses: Record<string, { box: string; px: number; titleSize: string; subtextSize: string }> = {
    xs: { box: 'w-7 h-7 min-w-7', px: 28, titleSize: 'text-xs', subtextSize: 'text-[9px]' },
    sm: { box: 'w-9 h-9 min-w-9', px: 36, titleSize: 'text-sm', subtextSize: 'text-[10px]' },
    md: { box: 'w-12 h-12 min-w-12', px: 48, titleSize: 'text-lg sm:text-xl', subtextSize: 'text-[11px]' },
    lg: { box: 'w-16 h-16 min-w-16', px: 64, titleSize: 'text-xl sm:text-2xl', subtextSize: 'text-xs' },
    xl: { box: 'w-20 h-20 min-w-20', px: 80, titleSize: 'text-2xl sm:text-3xl', subtextSize: 'text-sm' },
    '2xl': { box: 'w-28 h-28 min-w-28', px: 112, titleSize: 'text-3xl sm:text-4xl', subtextSize: 'text-base' },
  };

  const currentSize = dimensionClasses[size] || dimensionClasses.md;

  const shapeClasses = {
    rounded: 'rounded-2xl',
    circle: 'rounded-full',
    shield: 'rounded-3xl',
  }[shape];

  // Text color styles
  const titleColor = {
    gold: 'text-amber-200 group-hover:text-white',
    light: 'text-white group-hover:text-amber-200',
    dark: 'text-red-950 group-hover:text-red-900',
  }[textTone];

  const subtextColor = {
    gold: 'text-amber-300/90',
    light: 'text-red-200',
    dark: 'text-slate-600',
  }[textTone];

  // The official emblem asset
  const logoSrc = '/academy-logo.jpg';

  const logoElement = (
    <div
      className={`relative flex items-center justify-center shrink-0 ${currentSize.box} ${className} ${
        onClick ? 'cursor-pointer' : ''
      }`}
      onClick={onClick}
    >
      {/* Outer subtle luxury gold aura/glow */}
      {glowEffect && (
        <div className={`absolute inset-0 ${shapeClasses} bg-gradient-to-tr from-amber-500/30 via-emerald-500/20 to-amber-300/30 blur-sm scale-110 pointer-events-none -z-10`} />
      )}

      {/* Main Container */}
      <div
        className={`relative w-full h-full ${shapeClasses} overflow-hidden bg-gradient-to-br from-red-950 via-red-900 to-emerald-950 border-2 border-amber-400/80 shadow-xl flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:border-amber-300`}
        style={{
          boxShadow: '0 4px 20px -2px rgba(245, 158, 11, 0.35), inset 0 1px 2px rgba(255, 255, 255, 0.4)',
        }}
      >
        {!imgError ? (
          <img
            src={logoSrc}
            alt="Shaheen Al Zaitoon Online Quran Academy Official Logo"
            className="w-full h-full object-cover select-none"
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            loading="eager"
          />
        ) : (
          /* High-Fidelity Vector Fallback Emblem (Golden Shaheen Falcon + Quran + Olive Zaitoon Branches) */
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full p-1"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="50%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#b45309" />
              </linearGradient>
              <linearGradient id="emeraldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#34d399" />
                <stop offset="100%" stopColor="#065f46" />
              </linearGradient>
            </defs>

            {/* Inner Gold Border Ring */}
            <circle cx="50" cy="50" r="46" stroke="url(#goldGrad)" strokeWidth="2.5" strokeDasharray="3 2" />
            <circle cx="50" cy="50" r="41" stroke="#fbbf24" strokeWidth="1" opacity="0.7" />

            {/* Shaheen Falcon Wings */}
            <path
              d="M50 22 C34 10 18 24 15 38 C23 35 32 37 40 44 C45 40 48 30 50 22 Z"
              fill="url(#goldGrad)"
              opacity="0.9"
            />
            <path
              d="M50 22 C66 10 82 24 85 38 C77 35 68 37 60 44 C55 40 52 30 50 22 Z"
              fill="url(#goldGrad)"
              opacity="0.9"
            />

            {/* Open Holy Quran Book on Rehal */}
            <path
              d="M50 68 C42 62 30 62 24 65 V38 C30 35 42 35 50 40 C58 35 70 35 76 38 V65 C70 62 58 62 50 68 Z"
              fill="#fffbeb"
              stroke="url(#goldGrad)"
              strokeWidth="2"
            />
            {/* Center Spine */}
            <line x1="50" y1="40" x2="50" y2="68" stroke="#92400e" strokeWidth="2.5" />

            {/* Holy Quran Calligraphy Strokes */}
            <path d="M30 46 H44 M30 52 H42 M30 58 H44" stroke="#d97706" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M56 46 H70 M58 52 H70 M56 58 H70" stroke="#d97706" strokeWidth="1.5" strokeLinecap="round" />

            {/* Olive (Zaitoon) Branch Leaves */}
            <path
              d="M18 70 C20 62 26 56 32 54 C31 62 25 68 18 70 Z"
              fill="url(#emeraldGrad)"
            />
            <path
              d="M82 70 C80 62 74 56 68 54 C69 62 75 68 82 70 Z"
              fill="url(#emeraldGrad)"
            />

            {/* Rehal Wooden Stand Base */}
            <path
              d="M38 72 L50 82 L62 72 M44 76 L50 80 L56 76"
              stroke="#b45309"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Top Crescent & 8-pointed star */}
            <circle cx="50" cy="15" r="3" fill="#fef08a" />
          </svg>
        )}

        {/* Gloss highlight over top corner */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-transparent pointer-events-none" />
      </div>
    </div>
  );

  if (!showText) {
    return logoElement;
  }

  return (
    <div
      className={`inline-flex items-center gap-3 text-left group select-none ${
        onClick ? 'cursor-pointer' : ''
      }`}
      onClick={onClick}
    >
      {logoElement}
      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-2">
          <span className={`font-serif font-extrabold ${currentSize.titleSize} tracking-tight leading-tight transition-colors ${titleColor}`}>
            Shaheen Al Zaitoon
          </span>
          <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-400 text-red-950 shadow-sm uppercase tracking-wider">
            HQ
          </span>
        </div>
        <div className={`text-xs ${currentSize.subtextSize} tracking-wide font-serif flex items-center gap-1.5 ${subtextColor}`}>
          <span>{subtext}</span>
          <span className="text-emerald-400 font-bold hidden md:inline">• شاہین الزیتون</span>
        </div>
      </div>
    </div>
  );
};
