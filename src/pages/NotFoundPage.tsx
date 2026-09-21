import React from 'react';
import {
  AlertCircle,
  Home,
  BookOpen,
  GraduationCap,
  MessageSquare,
  ArrowRight,
  Phone,
  Sparkles,
} from 'lucide-react';
import { useAcademy } from '../context/AcademyContext';

export const NotFoundPage: React.FC = () => {
  const { setActivePage, siteSettings } = useAcademy();

  const suggestedPages = [
    { id: 'courses' as const, label: 'All Online Quran Courses', desc: 'Browse our complete 14-course curriculum' },
    { id: 'admissions' as const, label: '3-Day Free Trial Admission', desc: 'Register with zero upfront fees' },
    { id: 'noorani-qaida' as const, label: 'Learn Noorani Qaida Online', desc: 'Foundational course for beginners & kids' },
    { id: 'quran-classes-for-ladies' as const, label: 'Quran Classes for Ladies', desc: 'Private 1-on-1 with certified female Qarias' },
    { id: 'fee-payment' as const, label: 'Fee Payment & EasyPaisa', desc: 'Pay via EasyPaisa 03447956085 or bank transfer' },
    { id: 'contact' as const, label: 'Contact Rawalpindi HQ', desc: 'Direct support & live teacher coordination' },
  ];

  return (
    <div className="bg-red-950 text-white min-h-[75vh] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full text-center space-y-8">
        {/* 404 Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-900/80 border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-widest shadow-inner">
          <AlertCircle className="w-4 h-4 text-amber-400" />
          <span>HTTP 404 • Page Not Found</span>
        </div>

        {/* Headings */}
        <div className="space-y-3">
          <h1 className="text-5xl sm:text-7xl font-serif font-black text-amber-300 tracking-tight">
            404
          </h1>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-amber-100">
            Page Not Found / صفحہ دستیاب نہیں ہے
          </h2>
          <p className="text-sm sm:text-base text-red-200/90 max-w-xl mx-auto leading-relaxed">
            The page you are looking for does not exist, has been moved, or the link may be outdated.
            Please use the links below to navigate our online Quran programs or return home.
          </p>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              setActivePage('home');
            }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-red-950 font-bold px-6 py-3 rounded-xl shadow-lg transition-all hover:scale-105 text-sm"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </a>

          <a
            href="/courses"
            onClick={(e) => {
              e.preventDefault();
              setActivePage('courses');
            }}
            className="inline-flex items-center gap-2 bg-red-900 hover:bg-red-800 text-amber-200 border border-amber-500/40 font-bold px-6 py-3 rounded-xl shadow-md transition-all hover:scale-105 text-sm"
          >
            <GraduationCap className="w-4 h-4 text-amber-400" />
            <span>Explore Quran Courses</span>
          </a>

          <a
            href={`https://wa.me/92${siteSettings.whatsappNumber.replace(/^0/, '')}?text=${encodeURIComponent(
              'Assalam-o-Alaikum! I need assistance finding a page on Shaheen Al Zaitoon Quran Academy website.'
            )}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-6 py-3 rounded-xl shadow-md transition-all hover:scale-105 text-sm"
          >
            <MessageSquare className="w-4 h-4 text-emerald-200" />
            <span>WhatsApp Support</span>
          </a>
        </div>

        {/* Helpful Popular Pages Grid */}
        <div className="bg-red-900/40 border border-amber-500/20 rounded-2xl p-6 text-left space-y-4 shadow-xl">
          <div className="flex items-center gap-2 border-b border-red-800 pb-3">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <h3 className="font-serif font-bold text-sm text-amber-200">
              Popular & Active Academy Pages
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {suggestedPages.map((item) => (
              <a
                key={item.id}
                href={`/${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  setActivePage(item.id);
                }}
                className="group p-3 rounded-xl bg-red-950/70 hover:bg-red-900/80 border border-red-800 hover:border-amber-400/50 transition-all flex items-center justify-between"
              >
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-amber-100 group-hover:text-amber-300 transition-colors">
                    {item.label}
                  </div>
                  <div className="text-[11px] text-red-300/80">
                    {item.desc}
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform shrink-0 ml-2" />
              </a>
            ))}
          </div>
        </div>

        {/* Academy Direct Contact Footer Info */}
        <div className="text-xs text-red-300/80 flex items-center justify-center gap-4 flex-wrap pt-2">
          <span>Head Office: Rawalpindi, Pakistan</span>
          <span>•</span>
          <span>Direct Helpline: +92-344-7956085</span>
          <span>•</span>
          <span>Founder: Muneeb Ur Rehman</span>
        </div>
      </div>
    </div>
  );
};
