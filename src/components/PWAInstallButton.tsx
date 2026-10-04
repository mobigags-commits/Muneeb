import React, { useState } from 'react';
import { Download, Smartphone } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { InstallAppModal } from './InstallAppModal';

interface PWAInstallButtonProps {
  variant?: 'navbar' | 'mobile' | 'badge' | 'footer' | 'floating';
  className?: string;
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({
  variant = 'navbar',
  className = '',
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [modalOpen, setModalOpen] = useState(false);

  // If already running as an installed PWA in standalone mode, hide button
  if (isInstalled) {
    return null;
  }

  const handleClick = async () => {
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

  if (variant === 'mobile') {
    return (
      <>
        <button
          onClick={handleClick}
          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-red-950 font-bold text-xs shadow-md border border-amber-300 ${className}`}
        >
          <div className="flex items-center gap-2">
            <Download className="w-4 h-4 text-red-950 shrink-0" />
            <span>Install / Download App</span>
          </div>
          <span className="text-[11px] font-urdu text-red-900 bg-amber-400/80 px-2 py-0.5 rounded">
            ایپ انسٹال کریں
          </span>
        </button>
        <InstallAppModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      </>
    );
  }

  if (variant === 'floating') {
    return (
      <>
        <button
          onClick={handleClick}
          title="Download & Install Academy App"
          className={`fixed bottom-20 right-4 sm:right-6 z-40 flex items-center gap-2 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-300 hover:to-amber-500 text-red-950 font-black px-3.5 py-2 rounded-full shadow-2xl border-2 border-amber-200 transform hover:scale-105 active:scale-95 transition-all text-xs ${className}`}
        >
          <Download className="w-4 h-4 text-red-950 animate-pulse" />
          <span className="font-extrabold">Install App</span>
          <span className="hidden sm:inline font-urdu text-[11px] font-bold">| ایپ</span>
        </button>
        <InstallAppModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      </>
    );
  }

  if (variant === 'footer') {
    return (
      <>
        <button
          onClick={handleClick}
          className={`flex items-center gap-2 bg-red-900/90 hover:bg-red-800 text-amber-300 border border-amber-500/40 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${className}`}
        >
          <Smartphone className="w-4 h-4 text-amber-400" />
          <span>Download Academy App (Android / iOS)</span>
          <span className="text-[11px] font-urdu text-amber-200">| ایپ ڈاؤن لوڈ</span>
        </button>
        <InstallAppModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      </>
    );
  }

  // Default navbar variant
  return (
    <>
      <button
        onClick={handleClick}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-red-950 font-extrabold text-xs transition-all shadow-sm border border-amber-300 transform active:scale-95 ${className}`}
        title="Install Shaheen Quran Academy App to your device"
      >
        <Download className="w-3.5 h-3.5 text-red-950 shrink-0" />
        <span>Install App</span>
        <span className="text-[10px] bg-red-950/20 px-1 py-0.5 rounded font-urdu">
          ایپ
        </span>
      </button>
      <InstallAppModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};
