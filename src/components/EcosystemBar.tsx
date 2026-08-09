import React from 'react';
import { BookOpen, ShoppingBag, Heart, TrendingUp, Phone, ShieldCheck, Megaphone, Facebook } from 'lucide-react';
import { useAcademy } from '../context/AcademyContext';

export const EcosystemBar: React.FC = () => {
  const { activePage, setActivePage, siteSettings } = useAcademy();

  return (
    <div className="bg-gradient-to-r from-red-950 via-red-900 to-red-950 border-b border-amber-500/30 text-white text-xs py-2 px-3 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        {/* Left: Ecosystem Brands */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-0.5">
          <span className="text-[10px] text-amber-300 font-bold uppercase tracking-wider hidden md:inline">
            Ecosystem:
          </span>

          <button
            onClick={() => setActivePage('home')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
              activePage === 'home' || activePage === 'courses' || activePage === 'teachers'
                ? 'bg-amber-500 text-red-950 font-bold shadow-sm'
                : 'bg-red-900/60 hover:bg-red-800 text-amber-100 border border-amber-500/20'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-300 group-hover:text-amber-200" />
            <span>Shaheen Quran Academy</span>
          </button>

          <button
            onClick={() => setActivePage('zaitoon-traders')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
              activePage === 'zaitoon-traders'
                ? 'bg-amber-500 text-red-950 font-bold shadow-sm'
                : 'bg-red-900/60 hover:bg-red-800 text-amber-100 border border-amber-500/20'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5 text-amber-300" />
            <span>ZT (Zaitoon Traders)</span>
            <span className="bg-emerald-500 text-white text-[9px] px-1 rounded font-bold">Shop</span>
          </button>

          <button
            onClick={() => setActivePage('marriage-bureau')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
              activePage === 'marriage-bureau'
                ? 'bg-amber-500 text-red-950 font-bold shadow-sm'
                : 'bg-red-900/60 hover:bg-red-800 text-amber-100 border border-amber-500/20'
            }`}
          >
            <Heart className="w-3.5 h-3.5 text-rose-300" />
            <span>Marriage Bureau</span>
            <span className="bg-rose-500 text-white text-[9px] px-1 rounded font-bold">Rishta</span>
          </button>

          <button
            onClick={() => setActivePage('growth-hub')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
              activePage === 'growth-hub'
                ? 'bg-amber-400 text-red-950 font-bold shadow-sm'
                : 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-400/40'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5 text-amber-300" />
            <span>Growth & Earning Hub</span>
            <span className="bg-amber-400 text-red-950 text-[9px] px-1 rounded font-extrabold animate-pulse">Earn</span>
          </button>

          <button
            onClick={() => setActivePage('ad-manager')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
              activePage === 'ad-manager'
                ? 'bg-amber-400 text-red-950 font-bold shadow-sm'
                : 'bg-gradient-to-r from-amber-500/30 to-red-900 hover:from-amber-500/40 text-amber-200 border border-amber-400/50'
            }`}
          >
            <Megaphone className="w-3.5 h-3.5 text-amber-300" />
            <span>AI Ad Studio</span>
            <span className="bg-emerald-500 text-white text-[9px] px-1 rounded font-extrabold">Ads</span>
          </button>

          <button
            onClick={() => setActivePage('community')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
              activePage === 'community'
                ? 'bg-[#1877F2] text-white font-bold shadow-sm'
                : 'bg-[#1877F2]/30 hover:bg-[#1877F2]/40 text-blue-200 border border-[#1877F2]/60'
            }`}
          >
            <Facebook className="w-3.5 h-3.5 fill-[#1877F2] text-white" />
            <span>FB Group</span>
            <span className="bg-[#1877F2] text-white text-[9px] px-1 rounded font-extrabold">92.4k</span>
          </button>
        </div>

        {/* Right: Direct WhatsApp & Official Status */}
        <div className="flex items-center gap-3 shrink-0 ml-auto">
          <a
            href={`https://wa.me/${siteSettings.whatsappNumber.replace(/[^0-9]/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-500 text-white px-2.5 py-1 rounded-full text-[11px] font-bold transition-all shadow-sm"
          >
            <Phone className="w-3 h-3" />
            <span>WhatsApp: {siteSettings.whatsappNumber}</span>
          </a>

          <div className="hidden lg:flex items-center gap-1 text-[11px] text-amber-200">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Rawalpindi HQ Verified</span>
          </div>
        </div>
      </div>
    </div>
  );
};
