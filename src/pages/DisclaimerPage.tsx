import React from 'react';
import { AlertTriangle, ShieldCheck, HeartHandshake, CreditCard, ExternalLink, HelpCircle } from 'lucide-react';
import { useAcademy } from '../context/AcademyContext';
import { GoogleAdSlot } from '../components/GoogleAdSlot';

export const DisclaimerPage: React.FC = () => {
  const { siteSettings, setActivePage } = useAcademy();

  return (
    <div className="bg-red-950 text-white min-h-screen py-10 px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 bg-red-900/60 rounded-2xl border border-amber-500/30 text-amber-400">
            <AlertTriangle className="w-10 h-10" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-amber-100">
            Legal & Educational Disclaimer
          </h1>
          <p className="text-xs sm:text-sm text-red-200">
            Official Regulatory, Religious, Financial & Advertising Disclaimers
          </p>
          <div className="text-[11px] text-amber-300 font-mono">
            {siteSettings.academyName} • Rawalpindi Head Office • 2026 Edition
          </div>
        </div>

        {/* Compliant Ad Unit Placement */}
        <GoogleAdSlot slotId="disclaimer-header-ad" format="horizontal" />

        <div className="bg-red-900/60 border border-amber-500/30 rounded-3xl p-6 sm:p-8 text-xs sm:text-sm text-red-100 leading-relaxed space-y-6 shadow-xl">
          {/* Section 1: Sacred Quranic Education */}
          <section className="space-y-2">
            <h2 className="text-lg font-serif font-bold text-amber-200 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>1. Sacred Quranic Education & Authentic Methodology</span>
            </h2>
            <p>
              The primary purpose of <strong>{siteSettings.academyName}</strong> is to disseminate authentic Quranic knowledge, Tajweed recitation (Makharij & Sifaat), Noorani Qaida fundamentals, and Islamic moral values for the pleasure of Allah Subhan-o-Ta&apos;ala and as Sadaqah Jariyah for <strong>{siteSettings.motherMemorialName}</strong> ({siteSettings.motherMemorialUrdu}).
            </p>
            <p>
              All course materials, syllabi, and live 1-on-1 sessions are conducted by qualified Qaris, Huffaz, and certified Islamic scholars (male and female) with verified Sanads. While we make every endeavor to maintain absolute phonological precision, ultimate recitation perfection is refined through consistent personal practice and devotion.
            </p>
          </section>

          {/* Section 2: Non-Sectarian Policy */}
          <section className="space-y-2 border-t border-red-800/60 pt-4">
            <h2 className="text-lg font-serif font-bold text-amber-200 flex items-center gap-2">
              <HeartHandshake className="w-5 h-5 text-amber-400" />
              <span>2. Non-Sectarian, Universal Islamic Mission</span>
            </h2>
            <p>
              Our academy welcomes Muslim children, youth, adult beginners, and sisters from all theological and cultural backgrounds worldwide (USA, UK, Canada, Australia, UAE, Saudi Arabia, Europe, Pakistan). We prioritize universal Quranic recitation, love of Allah&apos;s Book, and the Sunnah of Prophet Muhammad (PBUH) without engaging in controversial sectarian disputation.
            </p>
          </section>

          {/* Section 3: Financial & EasyPaisa Security */}
          <section className="space-y-2 border-t border-red-800/60 pt-4">
            <h2 className="text-lg font-serif font-bold text-amber-200 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-emerald-400" />
              <span>3. Financial & Fee Verification Disclaimer</span>
            </h2>
            <div className="p-4 rounded-xl bg-red-950/80 border border-emerald-500/40 space-y-2">
              <p className="font-semibold text-emerald-300">
                ⚠️ Critical Safety Notice Regarding Tuition Payments:
              </p>
              <p className="text-xs text-red-200">
                Official fee payments within Pakistan must ONLY be made to our verified EasyPaisa account:
              </p>
              <div className="font-mono text-sm text-amber-300 bg-red-900/60 p-2.5 rounded-lg border border-red-800">
                EasyPaisa Number: <strong>{siteSettings.easyPaisaAccountNumber}</strong> | Title: <strong>{siteSettings.easyPaisaAccountTitle}</strong>
              </div>
              <p className="text-xs text-red-200">
                The academy administration accepts NO liability for funds transferred to unauthorized individuals, third-party agents, or personal mobile wallets not officially listed on this verified platform.
              </p>
            </div>
          </section>

          {/* Section 4: Advertising & Google AdSense */}
          <section className="space-y-2 border-t border-red-800/60 pt-4">
            <h2 className="text-lg font-serif font-bold text-amber-200 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              <span>4. Third-Party Advertisements (Google AdSense)</span>
            </h2>
            <p>
              Parts of our online platform feature commercial advertisements delivered via <strong>Google AdSense</strong>. While we enforce strict ad filters to block un-Islamic, adult, gambling, and interest-based content, automated programmatic ad delivery is managed by Google&apos;s algorithms.
            </p>
            <p>
              Appearance of any commercial advertisement on our site does NOT constitute an official endorsement or theological sponsorship by Shaheen Al Zaitoon Academy or Founder Muneeb Ur Rehman.
            </p>
          </section>

          {/* Section 5: Matrimonial & Community Services */}
          <section className="space-y-2 border-t border-red-800/60 pt-4">
            <h2 className="text-lg font-serif font-bold text-amber-200">
              5. Matrimonial Directory & Community Proposals
            </h2>
            <p>
              Shaheen Marriage Bureau acts purely as a noble community facilitating network. While initial profiles are vetted for completeness and mutual compatibility, parents and guardians are strictly required to conduct independent background checks, character verification, and family meetings prior to finalizing any Nikah arrangements.
            </p>
          </section>

          {/* Section 6: Official Inquiries */}
          <section className="space-y-2 border-t border-red-800/60 pt-4">
            <h2 className="text-lg font-serif font-bold text-amber-200 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-emerald-400" />
              <span>6. Questions & Formal Clarifications</span>
            </h2>
            <p>
              For legal inquiries, copyright notices, or official verifications, contact our Executive Office in Rawalpindi:
            </p>
            <div className="bg-red-950 p-4 rounded-xl border border-red-800 text-xs space-y-1">
              <div><strong>Academy Name:</strong> {siteSettings.academyName}</div>
              <div><strong>Founder & Director:</strong> {siteSettings.ownerName}</div>
              <div><strong>Head Office:</strong> {siteSettings.headOfficeAddress}</div>
              <div><strong>Direct Helpline:</strong> {siteSettings.contactNumber}</div>
              <div><strong>Official WhatsApp:</strong> {siteSettings.whatsappNumber}</div>
            </div>
            <div className="pt-2">
              <button
                onClick={() => setActivePage('contact')}
                className="bg-amber-500 hover:bg-amber-400 text-red-950 font-bold px-4 py-2 rounded-lg transition-colors text-xs inline-flex items-center gap-1.5"
              >
                <span>Contact Administration Desk</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
