import React from 'react';
import { Heart, Award, Shield, Globe, MapPin, BookOpen, Sparkles, CheckCircle } from 'lucide-react';
import { useAcademy } from '../context/AcademyContext';
import { MemorialBanner } from '../components/MemorialBanner';

export const AboutPage: React.FC = () => {
  const { siteSettings, branches, setActivePage } = useAcademy();

  return (
    <div className="bg-red-950 text-white min-h-screen py-10 px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Header Title */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-400/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Islamic Education Ecosystem</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-extrabold text-amber-100">
            About {siteSettings.academyName}
          </h1>
          <p className="text-sm sm:text-base text-red-200 max-w-2xl mx-auto leading-relaxed">
            Founded by <strong>{siteSettings.ownerName}</strong> in Rawalpindi, Pakistan to deliver world-class Quranic education to Muslims globally.
          </p>
        </div>

        {/* Memorial Dedication Banner */}
        <MemorialBanner />

        {/* Founder Message Section */}
        <div className="bg-gradient-to-r from-red-900 via-amber-950 to-red-900 border-2 border-amber-500/50 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500 text-red-950 flex items-center justify-center font-serif font-bold text-xl">
              M
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-200">
                Message from the Founder & Owner
              </h2>
              <div className="text-xs text-amber-300 font-medium">
                Muneeb Ur Rehman • Rawalpindi, Pakistan
              </div>
            </div>
          </div>

          <div className="text-sm text-red-100 leading-relaxed space-y-3 pt-2 border-t border-amber-500/30">
            <p>
              &quot;Assalamu Alaikum wa Rahmatullah wa Barakatuh. Shaheen Al Zaitoon Online Quran Academy was established with a singular noble vision: to make authentic Quranic recitation, Tajweed, and Islamic understanding accessible to every child, sister, and brother across the globe.&quot;
            </p>
            <p>
              &quot;This sacred platform is dedicated as continuous Sadaqah Jariyah and Isal-e-Sawab for my beloved late mother, <strong>Zaitoon Bibi</strong> ({siteSettings.motherMemorialUrdu}). Every letter recited by our students brings eternal light and blessings. We treat every student as part of our spiritual family.&quot;
            </p>
          </div>
        </div>

        {/* Core Mission & Vision Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-red-900/60 border border-amber-500/30 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-serif font-bold text-amber-200">Our Mission</h3>
            <p className="text-xs text-red-100/90 leading-relaxed">
              To preserve and propagate the Holy Quran with correct Tajweed rules, correct Arabic pronunciation (Makharij), and deep spiritual comprehension using modern interactive virtual classrooms.
            </p>
          </div>

          <div className="bg-red-900/60 border border-amber-500/30 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-serif font-bold text-amber-200">Our Vision</h3>
            <p className="text-xs text-red-100/90 leading-relaxed">
              To become the world&apos;s most trusted online Quranic institution, bridging geographic boundaries and providing certified Qaris and Alimahs to every Muslim household.
            </p>
          </div>
        </div>

        {/* Global Branches & Office Directory */}
        <div className="space-y-4">
          <h2 className="text-2xl font-serif font-bold text-amber-100 text-center">
            Rawalpindi Head Office & Global Suboffices
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {branches.map((b) => (
              <div
                key={b.id}
                className={`p-5 rounded-2xl border space-y-2 ${
                  b.isHeadquarters ? 'bg-amber-950 border-amber-400' : 'bg-red-900/80 border-red-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <MapPin className="w-5 h-5 text-amber-400" />
                  {b.isHeadquarters && (
                    <span className="bg-amber-500 text-red-950 font-bold text-[9px] uppercase px-2 py-0.5 rounded-full">
                      Headquarters
                    </span>
                  )}
                </div>
                <h3 className="font-serif font-bold text-base text-amber-200">{b.name}</h3>
                <p className="text-xs text-red-200">{b.address}</p>
                <div className="text-xs text-emerald-300 font-mono font-bold pt-1">
                  Manager: {b.manager} • {b.phone}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-4">
          <button
            onClick={() => setActivePage('admissions')}
            className="bg-amber-500 hover:bg-amber-400 text-red-950 font-bold text-sm px-8 py-3.5 rounded-xl shadow-xl"
          >
            Join Shaheen Al Zaitoon Academy Today
          </button>
        </div>
      </div>
    </div>
  );
};
