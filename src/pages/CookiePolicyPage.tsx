import React, { useState } from 'react';
import { Cookie, Shield, CheckCircle, Settings, ToggleLeft, ToggleRight, Info } from 'lucide-react';
import { useAcademy } from '../context/AcademyContext';
import { GoogleAdSlot } from '../components/GoogleAdSlot';

export const CookiePolicyPage: React.FC = () => {
  const { siteSettings } = useAcademy();
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);
  const [adCookiesEnabled, setAdCookiesEnabled] = useState(true);
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSavePreferences = () => {
    localStorage.setItem(
      'sz_cookie_user_prefs',
      JSON.stringify({
        essential: true,
        analytics: analyticsEnabled,
        ads: adCookiesEnabled,
        timestamp: new Date().toISOString(),
      })
    );
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 4000);
  };

  return (
    <div className="bg-red-950 text-white min-h-screen py-10 px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 bg-red-900/60 rounded-2xl border border-amber-500/30 text-amber-400">
            <Cookie className="w-10 h-10" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-amber-100">
            Cookie Policy & Consent
          </h1>
          <p className="text-xs sm:text-sm text-red-200">
            Complete Transparency Regarding Web Cookies, Session Storage & Ad Personalization
          </p>
          <div className="text-[11px] text-amber-300 font-mono">
            {siteSettings.academyName} • Last Revised: 2026
          </div>
        </div>

        {/* Compliant Ad Unit */}
        <GoogleAdSlot slotId="cookies-header-ad" format="horizontal" />

        <div className="bg-red-900/60 border border-amber-500/30 rounded-3xl p-6 sm:p-8 text-xs sm:text-sm text-red-100 leading-relaxed space-y-6 shadow-xl">
          {/* Section 1: What Are Cookies */}
          <section className="space-y-2">
            <h2 className="text-lg font-serif font-bold text-amber-200 flex items-center gap-2">
              <Info className="w-5 h-5 text-emerald-400" />
              <span>1. What Are Cookies & Local Storage Technologies?</span>
            </h2>
            <p>
              Cookies are small text data files placed on your computer, smartphone, or tablet when you browse websites. They enable <strong>{siteSettings.academyName}</strong> to recognize your device, remember your educational preferences (such as language selection and theme mode), and provide smooth, secure, personalized navigation.
            </p>
          </section>

          {/* Section 2: Categories of Cookies Used */}
          <section className="space-y-4 border-t border-red-800/60 pt-4">
            <h2 className="text-lg font-serif font-bold text-amber-200 flex items-center gap-2">
              <Shield className="w-5 h-5 text-amber-400" />
              <span>2. Categories of Cookies We Use</span>
            </h2>

            <div className="space-y-3">
              {/* Category A: Strictly Necessary */}
              <div className="bg-red-950/80 p-4 rounded-xl border border-red-800 space-y-1.5">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-amber-300 text-sm flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>A. Strictly Necessary & Essential Cookies (Always Active)</span>
                  </h3>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full font-bold">
                    Required
                  </span>
                </div>
                <p className="text-xs text-red-200">
                  These cookies are vital for the core operation of our learning platform. They remember your active student/teacher session, keep the shopping cart state in ZT Store, and store language preference (English, Urdu, Arabic).
                </p>
              </div>

              {/* Category B: Analytical & Performance */}
              <div className="bg-red-950/80 p-4 rounded-xl border border-red-800 space-y-1.5">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-amber-300 text-sm flex items-center gap-1.5">
                    <Settings className="w-4 h-4 text-blue-400" />
                    <span>B. Analytics & Performance Cookies (Google Analytics)</span>
                  </h3>
                  <button
                    onClick={() => setAnalyticsEnabled(!analyticsEnabled)}
                    className="text-amber-400 hover:text-amber-300"
                    title="Toggle Analytics Cookies"
                  >
                    {analyticsEnabled ? (
                      <ToggleRight className="w-6 h-6 text-emerald-400" />
                    ) : (
                      <ToggleLeft className="w-6 h-6 text-stone-500" />
                    )}
                  </button>
                </div>
                <p className="text-xs text-red-200">
                  These cookies anonymously count visits, track popular Quranic courses, and help us optimize server performance and mobile response speeds.
                </p>
              </div>

              {/* Category C: Advertising & Marketing */}
              <div className="bg-red-950/80 p-4 rounded-xl border border-red-800 space-y-1.5">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-amber-300 text-sm flex items-center gap-1.5">
                    <Cookie className="w-4 h-4 text-amber-400" />
                    <span>C. Advertising & DART Cookies (Google AdSense)</span>
                  </h3>
                  <button
                    onClick={() => setAdCookiesEnabled(!adCookiesEnabled)}
                    className="text-amber-400 hover:text-amber-300"
                    title="Toggle Advertising Cookies"
                  >
                    {adCookiesEnabled ? (
                      <ToggleRight className="w-6 h-6 text-emerald-400" />
                    ) : (
                      <ToggleLeft className="w-6 h-6 text-stone-500" />
                    )}
                  </button>
                </div>
                <p className="text-xs text-red-200">
                  Google AdSense uses cookies (including the DoubleClick DART cookie) to deliver contextual advertisements based on previous visits to this or other websites across the web. You can manage or disable personalized ads at{' '}
                  <a
                    href="https://adssettings.google.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-amber-300 underline font-semibold"
                  >
                    Google Ad Settings
                  </a>.
                </p>
              </div>
            </div>

            {/* Save Preferences CTA */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleSavePreferences}
                className="bg-amber-500 hover:bg-amber-400 text-red-950 font-bold px-5 py-2.5 rounded-xl shadow-lg transition-transform hover:scale-105 text-xs sm:text-sm flex items-center gap-2"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Save Cookie Preferences</span>
              </button>
              {savedNotice && (
                <span className="text-xs text-emerald-300 font-semibold animate-pulse">
                  ✓ Preferences successfully updated!
                </span>
              )}
            </div>
          </section>

          {/* Section 3: Browser Controls */}
          <section className="space-y-2 border-t border-red-800/60 pt-4">
            <h2 className="text-lg font-serif font-bold text-amber-200">
              3. Managing Cookies in Your Browser
            </h2>
            <p>
              Most web browsers (Google Chrome, Apple Safari, Mozilla Firefox, Microsoft Edge) allow you to refuse or delete cookies through browser settings. Please note that disabling essential cookies may impact certain interactive academy features like live attendance recording and student portal logins.
            </p>
          </section>

          {/* Section 4: Contact */}
          <section className="space-y-2 border-t border-red-800/60 pt-4">
            <h2 className="text-lg font-serif font-bold text-amber-200">
              4. Privacy Desk Inquiries
            </h2>
            <p>
              If you have any questions regarding our cookie practices, reach our Technical Privacy Team at{' '}
              <strong className="text-amber-300">{siteSettings.whatsappNumber}</strong> or via WhatsApp.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
