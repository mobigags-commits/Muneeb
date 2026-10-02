import React, { useState } from 'react';
import {
  Download,
  Smartphone,
  CheckCircle2,
  Share2,
  X,
  ExternalLink,
  ShieldCheck,
  Zap,
  WifiOff,
  Sparkles,
  ArrowRight,
  Info
} from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface InstallAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InstallAppModal: React.FC<InstallAppModalProps> = ({ isOpen, onClose }) => {
  const { isInstallable, isInstalled, isIOS, isAndroid, install } = usePWAInstall();
  const [installSuccess, setInstallSuccess] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  if (!isOpen) return null;

  const handleInstallClick = async () => {
    if (isInstallable) {
      const outcome = await install();
      if (outcome) {
        setInstallSuccess(true);
      }
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: 'Shaheen Al Zaitoon Online Quran Academy App',
      text: 'Download & Install official Shaheen Al Zaitoon Quran Academy App for 1-on-1 Quran Classes & Free Trial.',
      url: window.location.origin,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // Ignored if cancelled
      }
    } else {
      await navigator.clipboard.writeText(window.location.origin);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-lg bg-gradient-to-b from-red-900 via-red-950 to-stone-950 border-2 border-amber-500/50 rounded-2xl shadow-2xl overflow-hidden text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 px-4 py-2.5 text-red-950 font-bold text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-red-950" />
            <span className="tracking-wide uppercase font-extrabold">Official Mobile & Desktop Web App</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-amber-400 text-red-950 transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* App Identity Card */}
          <div className="flex items-center gap-4 bg-red-950/70 p-4 rounded-xl border border-red-800/80">
            <img
              src="/pwa-192x192.png"
              alt="Shaheen Quran Academy App Icon"
              className="w-16 h-16 rounded-2xl shadow-lg border border-amber-400/60 object-cover shrink-0"
            />
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 text-xs text-amber-400 font-bold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Verified Academy App</span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-amber-100 truncate">
                Shaheen Al Zaitoon Quran App
              </h2>
              <p className="text-sm text-stone-200 font-urdu mt-0.5">
                شاہین الزیتون آن لائن قرآنی اکیڈمی ایپ
              </p>
              <div className="flex items-center gap-2 mt-1 text-xs text-amber-300/90 font-medium">
                <span>Free & Safe</span>
                <span>•</span>
                <span>Lightweight (~1 MB)</span>
                <span>•</span>
                <span>v2.0 PWA</span>
              </div>
            </div>
          </div>

          {/* If already installed */}
          {isInstalled || installSuccess ? (
            <div className="bg-emerald-950/80 border border-emerald-500/50 p-5 rounded-xl text-center space-y-2.5">
              <CheckCircle2 className="w-9 h-9 text-emerald-400 mx-auto" />
              <h3 className="text-base font-bold text-emerald-200">
                ایپ کامیابی سے انسٹال ہو چکی ہے! / App Installed Successfully!
              </h3>
              <p className="text-sm text-stone-200 leading-relaxed">
                You can now launch Shaheen Quran Academy directly from your device's home screen or desktop launcher.
              </p>
              <button
                onClick={onClose}
                className="mt-2 w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm font-bold transition"
              >
                Close Window / بند کریں
              </button>
            </div>
          ) : (
            <>
              {/* Action Buttons depending on device */}
              <div className="space-y-3">
                {isInstallable ? (
                  <button
                    onClick={handleInstallClick}
                    className="w-full flex items-center justify-center gap-2.5 py-3.5 px-5 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-300 hover:to-amber-400 text-red-950 font-black rounded-xl shadow-xl transition transform active:scale-98 text-base"
                  >
                    <Download className="w-5 h-5 text-red-950" />
                    <span>Download & Install App (1-Click)</span>
                    <span className="text-sm font-bold text-red-900 border-l border-red-900/30 pl-2">
                      انسٹال کریں
                    </span>
                  </button>
                ) : isIOS ? (
                  <div className="bg-stone-900/90 border border-amber-500/40 p-4.5 rounded-xl space-y-3">
                    <div className="flex items-center gap-2 text-amber-300 font-bold text-sm uppercase tracking-wider">
                      <Smartphone className="w-4 h-4" />
                      <span>Install on iPhone / iPad (iOS Safari)</span>
                    </div>
                    <ol className="text-sm text-stone-200 space-y-2.5 list-decimal list-inside font-urdu leading-relaxed">
                      <li>
                        Safari براؤزر میں نیچے <strong>Share</strong> (شیئر) بٹن پر کلک کریں:
                        <span className="inline-flex items-center gap-1 bg-stone-800 px-2 py-0.5 rounded text-xs ml-1.5 text-amber-300 border border-stone-700 font-sans">
                          <Share2 className="w-3.5 h-3.5" /> Share Icon
                        </span>
                      </li>
                      <li>
                        تھوڑا نیچے سکرول کریں اور <strong>"Add to Home Screen"</strong> (ہوم اسکرین پر شامل کریں) منتخب کریں۔
                      </li>
                      <li>
                        اوپر دائیں کونے میں <strong>"Add"</strong> دبائیں—اکیڈمی ایپ آپ کے فون پر فوری تیار ہو جائے گی!
                      </li>
                    </ol>
                  </div>
                ) : (
                  <div className="bg-stone-900/90 border border-amber-500/40 p-4.5 rounded-xl space-y-3">
                    <div className="flex items-center gap-2 text-amber-300 font-bold text-sm uppercase tracking-wider">
                      <Download className="w-4 h-4" />
                      <span>Direct Browser Installation (Chrome / Edge / Android)</span>
                    </div>
                    <p className="text-sm text-stone-200 leading-relaxed font-urdu">
                      آپ اپنے موبائل براؤزر (کروم یا ایج) کے <strong>تین نقطوں (Menu ⋮)</strong> پر کلک کر کے 
                      <strong className="text-amber-300"> "Install App" </strong> یا 
                      <strong className="text-amber-300"> "Add to Home Screen" </strong> دبائیں، ایپ فوراً انسٹال ہو جائے گی۔
                    </p>
                    <button
                      onClick={handleInstallClick}
                      className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-amber-500 hover:bg-amber-400 text-red-950 font-bold rounded-lg text-sm transition"
                    >
                      <Zap className="w-4 h-4" />
                      <span>Try Prompting Install Now / فوری کوشش کریں</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Benefits of App */}
              <div className="grid grid-cols-2 gap-2.5 pt-1">
                <div className="bg-red-900/30 border border-red-800/60 p-3 rounded-lg flex items-start gap-2">
                  <Zap className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm">
                    <div className="font-bold text-amber-200">1-Tap Fast Launch</div>
                    <div className="text-stone-300 font-urdu text-xs">فوری اوپن بغیر براؤزر کھولے</div>
                  </div>
                </div>

                <div className="bg-red-900/30 border border-red-800/60 p-3 rounded-lg flex items-start gap-2">
                  <WifiOff className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm">
                    <div className="font-bold text-amber-200">Works Offline</div>
                    <div className="text-stone-300 font-urdu text-xs">آف لائن کیشنگ اور شیڈول</div>
                  </div>
                </div>

                <div className="bg-red-900/30 border border-red-800/60 p-3 rounded-lg flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm">
                    <div className="font-bold text-amber-200">Safe & No Ads</div>
                    <div className="text-stone-300 font-urdu text-xs">محفوظ اور تصدیق شدہ</div>
                  </div>
                </div>

                <div className="bg-red-900/30 border border-red-800/60 p-3 rounded-lg flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm">
                    <div className="font-bold text-amber-200">Easy WhatsApp & Fees</div>
                    <div className="text-stone-300 font-urdu text-xs">ایزی پیسہ فیس اور فوری رابطہ</div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Share App Link Footer */}
          <div className="pt-2 border-t border-red-800/80 flex items-center justify-between gap-3 text-xs sm:text-sm">
            <span className="text-stone-300 text-xs sm:text-sm">
              Share this App with family & friends:
            </span>
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-red-900/80 hover:bg-red-800 text-amber-300 rounded-lg font-bold border border-red-700 transition text-xs sm:text-sm"
            >
              <Share2 className="w-4 h-4" />
              <span>{copySuccess ? 'Link Copied! ✓' : 'Share App'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
