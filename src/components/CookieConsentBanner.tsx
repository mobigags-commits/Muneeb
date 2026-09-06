import React, { useState, useEffect } from 'react';
import { ShieldCheck, Cookie, X, ExternalLink } from 'lucide-react';
import { useAcademy } from '../context/AcademyContext';

export const CookieConsentBanner: React.FC = () => {
  const { setActivePage } = useAcademy();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('shaheen_cookie_consent');
      if (!consent) {
        // Show after a brief delay so it doesn't jarringly block initial render
        const timer = setTimeout(() => setIsVisible(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch {
      // localStorage may fail in restricted iframes
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem('shaheen_cookie_consent', 'accepted');
    } catch {}
    setIsVisible(false);
  };

  const handleDecline = () => {
    try {
      localStorage.setItem('shaheen_cookie_consent', 'essential_only');
    } catch {}
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-3 left-3 right-3 sm:left-6 sm:right-auto sm:max-w-xl z-50 animate-fade-in">
      <div className="bg-gradient-to-r from-red-950 via-red-900 to-red-950 border-2 border-amber-500/50 rounded-2xl p-4 sm:p-5 shadow-2xl text-white backdrop-blur-md">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-amber-500/20 border border-amber-500/30 rounded-xl text-amber-300 shrink-0 mt-0.5">
            <Cookie className="w-5 h-5" />
          </div>

          <div className="space-y-2 flex-1 text-xs">
            <div className="flex items-center justify-between">
              <h4 className="font-serif font-bold text-amber-200 text-sm flex items-center gap-1.5">
                <span>Cookie & Privacy Transparency</span>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              </h4>
              <button
                onClick={handleDecline}
                className="text-red-300 hover:text-white p-1 rounded"
                title="Dismiss"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-red-100 leading-relaxed text-[11px] sm:text-xs">
              We use cookies and authorized Google partner services (Google AdSense, Google Tag analytics) to personalize content, measure traffic, and serve non-intrusive advertisements. By browsing our website, you agree to our transparent data practices.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <button
                onClick={handleAccept}
                className="bg-amber-500 hover:bg-amber-400 text-red-950 font-bold px-4 py-1.5 rounded-lg text-xs transition-colors shadow-sm"
              >
                Accept All Cookies
              </button>

              <button
                onClick={handleDecline}
                className="bg-red-900/80 hover:bg-red-800 text-red-200 border border-red-700 px-3 py-1.5 rounded-lg text-xs transition-colors"
              >
                Essential Only
              </button>

              <button
                onClick={() => {
                  setActivePage('privacy');
                  setIsVisible(false);
                }}
                className="text-amber-300 hover:text-amber-200 text-xs font-semibold underline flex items-center gap-1 ml-auto"
              >
                <span>Read Privacy Policy</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
