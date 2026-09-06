import React from 'react';
import { FileText, ShieldAlert, CheckCircle, HelpCircle } from 'lucide-react';
import { useAcademy } from '../context/AcademyContext';
import { GoogleAdSlot } from '../components/GoogleAdSlot';

export const TermsPage: React.FC = () => {
  const { siteSettings } = useAcademy();

  return (
    <div className="bg-red-950 text-white min-h-screen py-10 px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 bg-red-900/60 rounded-2xl border border-amber-500/30 text-amber-400">
            <FileText className="w-10 h-10" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-amber-100">Terms of Service & Usage</h1>
          <p className="text-xs sm:text-sm text-red-200">
            Shaheen Al Zaitoon Digital Ecosystem & 9-Websites Network
          </p>
          <div className="text-[11px] text-amber-300 font-mono">
            {siteSettings.academyName} • Rawalpindi Head Office
          </div>
        </div>

        {/* Compliant Ad Unit */}
        <GoogleAdSlot slotId="terms-header-ad" format="horizontal" />

        <div className="bg-red-900/60 border border-amber-500/30 rounded-3xl p-6 sm:p-8 text-xs sm:text-sm text-red-100 leading-relaxed space-y-6 shadow-xl">
          <section className="space-y-2">
            <h2 className="text-lg font-serif font-bold text-amber-200">1. Acceptance of Terms</h2>
            <p>
              By accessing, browsing, or utilizing any of the 9 digital websites, educational portals, e-commerce stores, matrimonial directories, or referral programs operated by <strong>{siteSettings.academyName}</strong>, you agree to be bound by these Terms of Service.
            </p>
          </section>

          <section className="space-y-2 border-t border-red-800/60 pt-4">
            <h2 className="text-lg font-serif font-bold text-amber-200">2. Quranic Class Attendance & Etiquette</h2>
            <ul className="space-y-2 text-xs text-red-200">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Students are expected to join live online classes punctually with proper Wudu and respectful attire.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Rescheduling requests must be sent to the Qari or official WhatsApp (<strong>{siteSettings.whatsappNumber}</strong>) at least 4 hours in advance.</span>
              </li>
            </ul>
          </section>

          <section className="space-y-2 border-t border-red-800/60 pt-4">
            <h2 className="text-lg font-serif font-bold text-amber-200">3. EasyPaisa Fee Payments & Trial Policy</h2>
            <p>
              Every new student receives a <strong>3-Day Free Trial</strong> with no obligation. Monthly tuition is payable in advance via EasyPaisa to account <strong>{siteSettings.easypaisaNumber}</strong> (Title: {siteSettings.easypaisaAccountTitle}) or approved international remittance. Tuition receipts must be verified via our Admissions Desk.
            </p>
          </section>

          <section className="space-y-2 border-t border-red-800/60 pt-4">
            <h2 className="text-lg font-serif font-bold text-amber-200 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-amber-400" />
              <span>4. Advertising & Sponsored Content Disclaimer</span>
            </h2>
            <p>
              Our websites feature commercial advertisements delivered via <strong>Google AdSense</strong> and verified local partners. While we strive to maintain high Islamic decorum and family-appropriate content standards, products or services promoted in third-party ad units belong solely to the respective advertisers.
            </p>
          </section>

          <section className="space-y-2 border-t border-red-800/60 pt-4">
            <h2 className="text-lg font-serif font-bold text-amber-200 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-emerald-400" />
              <span>5. Inquiries & Support</span>
            </h2>
            <p>
              For any clarification regarding our terms, reach out via WhatsApp at <strong>{siteSettings.whatsappNumber}</strong> or visit our Rawalpindi HQ.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

