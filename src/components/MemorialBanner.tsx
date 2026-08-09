import React from 'react';
import { Heart, BookOpen, Star, Sparkles } from 'lucide-react';
import { useAcademy } from '../context/AcademyContext';

export const MemorialBanner: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { siteSettings } = useAcademy();

  if (compact) {
    return (
      <div className="bg-gradient-to-r from-red-950 via-red-900 to-red-950 text-amber-200 py-2 px-4 text-xs sm:text-sm font-medium border-b border-amber-500/30 flex items-center justify-between">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="bg-amber-500/20 text-amber-300 text-[10px] sm:text-xs uppercase tracking-wider px-2 py-0.5 rounded-full border border-amber-400/40 font-bold">
              صدقہ جاریہ
            </span>
            <span className="text-white/90">
              Dedicated as <span className="text-amber-300 font-semibold">Sadaqah Jariyah & Isal-e-Sawab</span> in memory of beloved mother{' '}
              <strong className="text-amber-200">{siteSettings.motherMemorialName}</strong> ({siteSettings.motherMemorialUrdu})
            </span>
          </div>
          <div className="hidden md:flex items-center gap-3 text-xs text-amber-300/90 font-mono">
            <span>Founder: {siteSettings.ownerName}</span>
            <span>•</span>
            <span>Rawalpindi, Pakistan</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-950 via-red-900 to-amber-950 text-white p-6 md:p-8 border-2 border-amber-500/40 shadow-xl my-6">
      <div className="absolute top-0 right-0 -translate-y-6 translate-x-6 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-semibold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Sadaqah Jariyah & Isal-e-Sawab Dedication</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-serif text-amber-100 font-bold leading-snug">
            In Loving Memory of <span className="text-amber-300">{siteSettings.motherMemorialName}</span>{' '}
            <span className="text-amber-200 font-serif font-normal font-arabic">({siteSettings.motherMemorialUrdu})</span>
          </h3>
          <p className="text-red-100/90 text-sm md:text-base max-w-2xl leading-relaxed">
            Founded by <strong className="text-amber-200">{siteSettings.ownerName}</strong> in Rawalpindi, Pakistan to spread the sacred knowledge of the Holy Quran to students worldwide. Every verse recited, lesson learned, and Hifz milestone completed on this platform serves as continuous spiritual reward (Sadaqah Jariyah).
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
          <div className="bg-red-900/80 backdrop-blur border border-amber-500/30 rounded-xl p-4 text-center min-w-[160px]">
            <BookOpen className="w-6 h-6 text-amber-400 mx-auto mb-1" />
            <div className="text-xs text-red-200 uppercase tracking-wider">Quran Legacy</div>
            <div className="text-lg font-bold text-amber-200 font-serif">100% Noble Intent</div>
          </div>
          <div className="bg-amber-950/80 backdrop-blur border border-amber-500/30 rounded-xl p-4 text-center min-w-[160px]">
            <Heart className="w-6 h-6 text-red-400 mx-auto mb-1" />
            <div className="text-xs text-amber-200 uppercase tracking-wider">Prayers & Duas</div>
            <div className="text-lg font-bold text-amber-200 font-serif">Isal-e-Sawab</div>
          </div>
        </div>
      </div>
    </div>
  );
};
