import React from 'react';
import { Shield, Lock, Eye, Cookie, Globe, ExternalLink, CheckCircle } from 'lucide-react';
import { useAcademy } from '../context/AcademyContext';
import { GoogleAdSlot } from '../components/GoogleAdSlot';

export const PrivacyPage: React.FC = () => {
  const { siteSettings } = useAcademy();

  return (
    <div className="bg-red-950 text-white min-h-screen py-10 px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 bg-red-900/60 rounded-2xl border border-amber-500/30 text-amber-400">
            <Shield className="w-10 h-10" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-amber-100">Privacy & Cookie Policy</h1>
          <p className="text-xs sm:text-sm text-red-200">
            Official Data Protection, Google AdSense Monetization & Cookie Transparency Notice
          </p>
          <div className="text-[11px] text-amber-300 font-mono">
            {siteSettings.academyName} • Ecosystem Rawalpindi HQ • Last Updated: 2026
          </div>
        </div>

        {/* Compliant Ad Unit Placement */}
        <GoogleAdSlot slotId="privacy-header-ad" format="horizontal" />

        <div className="bg-red-900/60 border border-amber-500/30 rounded-3xl p-6 sm:p-8 text-xs sm:text-sm text-red-100 leading-relaxed space-y-6 shadow-xl">
          <section className="space-y-2">
            <h2 className="text-lg font-serif font-bold text-amber-200 flex items-center gap-2">
              <Lock className="w-5 h-5 text-emerald-400" />
              <span>1. Introduction & Overview</span>
            </h2>
            <p>
              At <strong>{siteSettings.academyName}</strong> (part of the Shaheen Al Zaitoon Digital Ecosystem), we respect your personal privacy and are deeply committed to safeguarding all information submitted by students, parents, visitors, and commercial clients across our 9 interconnected websites and platforms.
            </p>
            <p>
              This Privacy Policy documents how we collect, process, utilize, and protect your information, including data processed in conjunction with authorized advertising partners like <strong>Google AdSense</strong> and measurement tools like <strong>Google Ads / Google Tag (gtag.js)</strong>.
            </p>
          </section>

          <section className="space-y-2 border-t border-red-800/60 pt-4">
            <h2 className="text-lg font-serif font-bold text-amber-200 flex items-center gap-2">
              <Cookie className="w-5 h-5 text-amber-400" />
              <span>2. Google AdSense & Third-Party Advertising Cookies</span>
            </h2>
            <p>
              We monetize portions of our network via <strong>Google AdSense</strong> to support our ongoing educational missions and free student trials. Google AdSense uses cookies to serve ads based on prior visits to our websites or other websites across the Internet:
            </p>
            <ul className="space-y-2 bg-red-950/70 p-4 rounded-xl border border-amber-500/20 text-xs">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>DoubleClick DART Cookie:</strong> Google, as a third-party vendor, uses cookies to serve ads on our site. Google's use of the DART cookie enables it to serve ads to our users based on their visit to our sites and other sites on the Internet.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>User Opt-Out:</strong> Users may opt out of the use of the DART cookie or personalized advertising by visiting the official Google Ads Settings page at{' '}
                  <a
                    href="https://adssettings.google.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-300 underline font-bold"
                  >
                    https://adssettings.google.com
                  </a>.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Third-Party Vendors:</strong> Third-party ad vendors and ad networks may also serve ads on our website. You can opt out of some third-party vendors' uses of cookies for personalized advertising by visiting{' '}
                  <a
                    href="https://www.aboutads.info/choices/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-300 underline font-bold"
                  >
                    www.aboutads.info/choices
                  </a>.
                </span>
              </li>
            </ul>
          </section>

          <section className="space-y-2 border-t border-red-800/60 pt-4">
            <h2 className="text-lg font-serif font-bold text-amber-200 flex items-center gap-2">
              <Eye className="w-5 h-5 text-emerald-400" />
              <span>3. Google Ads & Conversion Tracking Disclosure</span>
            </h2>
            <p>
              When visitors interact with high-value actions (such as booking a 3-day trial class, clicking to chat on WhatsApp with our Rawalpindi admissions desk, or submitting an EasyPaisa fee receipt), we may utilize <strong>Google Ads Conversion Tracking</strong> (Google tag).
            </p>
            <p>
              This tracking helps us measure the efficiency of our academic outreach campaigns. No personally identifiable passwords, banking login credentials, or secret student records are ever passed to Google or stored insecurely.
            </p>
          </section>

          <section className="space-y-2 border-t border-red-800/60 pt-4">
            <h2 className="text-lg font-serif font-bold text-amber-200 flex items-center gap-2">
              <Globe className="w-5 h-5 text-amber-400" />
              <span>4. Children's Online Privacy Protection (COPPA) & Female Privacy</span>
            </h2>
            <p>
              Our academy takes utmost care with children's safety:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs text-red-200">
              <li>Classes for students under age 13 require parental supervision and guardian registration.</li>
              <li>We do not collect personal data from children without verified parental consent.</li>
              <li>Online Quran classes for ladies and young sisters are conducted exclusively by certified female Qaria instructors in private 1-on-1 virtual classrooms.</li>
            </ul>
          </section>

          <section className="space-y-2 border-t border-red-800/60 pt-4">
            <h2 className="text-lg font-serif font-bold text-amber-200">5. GDPR & International Privacy Rights</h2>
            <p>
              Students and visitors residing in the European Economic Area (EEA), United Kingdom, California (CCPA), and elsewhere enjoy full rights regarding their personal data, including the right to inspect, correct, export, or request deletion of their records. To exercise any data rights, please contact our Data Protection desk via WhatsApp at <strong>{siteSettings.whatsappNumber}</strong> or email.
            </p>
          </section>

          <section className="space-y-2 border-t border-red-800/60 pt-4">
            <h2 className="text-lg font-serif font-bold text-amber-200">6. Official Contact for Privacy Inquiries</h2>
            <p>
              For questions regarding our privacy practices or advertising disclosures, contact:
            </p>
            <div className="bg-red-950 p-4 rounded-xl border border-red-800 text-xs space-y-1">
              <div><strong>Organization:</strong> {siteSettings.academyName}</div>
              <div><strong>Head Office:</strong> Rawalpindi, Punjab, Pakistan</div>
              <div><strong>Founder & Director:</strong> {siteSettings.founderName}</div>
              <div><strong>Official WhatsApp:</strong> {siteSettings.whatsappNumber}</div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

