import React, { useState } from 'react';
import {
  Download,
  Smartphone,
  CheckCircle,
  Apple,
  Sparkles,
  Zap,
  ShieldCheck,
  WifiOff
} from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { InstallAppModal } from './InstallAppModal';

export const AppDownloadBanner: React.FC = () => {
  const { isInstallable, isInstalled, install } = usePWAInstall();
  const [modalOpen, setModalOpen] = useState(false);

  if (isInstalled) {
    return null;
  }

  const handleAction = async () => {
    const hasPaid = typeof window !== 'undefined' && localStorage.getItem('sz_app_fee_paid') === 'true';
    if (hasPaid && isInstallable) {
      const outcome = await install();
      if (!outcome) {
        setModalOpen(true);
      }
    } else {
      setModalOpen(true);
    }
  };

  return (
    <section className="bg-gradient-to-r from-red-950 via-red-900 to-stone-950 border-y-2 border-amber-500/40 py-8 px-4 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10">
        
        {/* Left: App Logo & Details */}
        <div className="flex items-center gap-4 text-left w-full lg:w-auto">
          <img
            src="/pwa-192x192.png"
            alt="Shaheen Quran Academy App"
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl shadow-xl border-2 border-amber-400/80 object-cover shrink-0"
          />
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs sm:text-sm font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Official Academy App (PWA)</span>
              </div>
              <span className="bg-amber-400 text-red-950 font-black text-xs px-2.5 py-0.5 rounded-full shadow">
                علامتی فیس: صرف 100 روپے (Direct to Owner)
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-amber-100">
              Download Shaheen Quran App
            </h3>
            <p className="text-sm sm:text-base text-stone-200 font-urdu mt-0.5 leading-relaxed">
              اکیڈمی ایپ ڈاؤن لوڈ کریں — برائے سرور مینٹیننس و ایصالِ ثواب صرف 100 روپے کی علامتی فیس ایزی پیسہ 03447956085 (منیب الرحمن) پر ادا کریں!
            </p>
            <div className="flex flex-wrap items-center gap-3 mt-2 text-xs sm:text-sm text-amber-200 font-medium">
              <span className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-400" /> 1-Tap Home Screen
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <WifiOff className="w-4 h-4 text-emerald-400" /> Works Offline
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-400" /> No App Store Required
              </span>
            </div>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-start lg:justify-end">
          <button
            onClick={handleAction}
            className="flex items-center gap-2.5 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-300 hover:to-amber-500 text-red-950 font-black px-6 py-3.5 rounded-xl shadow-xl border border-amber-200 transition-all transform hover:scale-105 active:scale-95 text-sm sm:text-base"
          >
            <Download className="w-5 h-5 text-red-950" />
            <span>Install & Download App</span>
            <span className="font-urdu text-sm font-bold text-red-900 border-l border-red-900/30 pl-2">
              انسٹال کریں
            </span>
          </button>

          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 bg-stone-900/80 hover:bg-stone-800 text-stone-200 border border-stone-700 px-5 py-3.5 rounded-xl text-sm font-bold transition-all"
          >
            <Smartphone className="w-4 h-4 text-amber-400" />
            <span>How to Install Guide</span>
          </button>
        </div>
      </div>

      <InstallAppModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
};
