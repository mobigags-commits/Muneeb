import React from 'react';
import { Heart, Award, Shield, Globe, MapPin, BookOpen, Sparkles, CheckCircle, Clock, Sun, Moon } from 'lucide-react';
import { useAcademy } from '../context/AcademyContext';
import { MemorialBanner } from '../components/MemorialBanner';
import { AcademyLogo } from '../components/AcademyLogo';

export const AboutPage: React.FC = () => {
  const { siteSettings, branches, setActivePage } = useAcademy();

  return (
    <div className="bg-red-950 text-white min-h-screen py-10 px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Header Title */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <AcademyLogo size="xl" shape="circle" glowEffect={true} />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-400/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Islamic Education Ecosystem</span>
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-serif font-black text-amber-100 leading-tight">
            About <span className="text-amber-400">Shaheen Al Zaitoon</span> Online Quran Academy
          </h1>
          <div className="font-urdu text-lg sm:text-2xl text-amber-300 font-bold">
            شاہین الزیتون آن لائن قرآنی اکیڈمی کا تعارف
          </div>
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

        {/* 24/7 ACADEMY OPERATIONS: 3 SHIFTS OF 8 HOURS EACH */}
        <div className="bg-gradient-to-b from-red-900 via-amber-950 to-red-950 border-2 border-amber-500/60 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-400/40">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>24/7 Global Round-the-Clock Schedule</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-amber-100">
              اکیڈمی کا تدریسی نظام: 8 گھنٹے کی 3 شفٹس
            </h2>
            <p className="text-xs sm:text-sm text-red-200 leading-relaxed">
              شاہین الزیتون قرآنی اکیڈمی چوبیس گھنٹے فعال رہتی ہے۔ اکیڈمی کا پورا نظام <strong>8، 8 گھنٹے کی 3 مستقل شفٹوں</strong> پر مشتمل ہے تاکہ پاکستان، خلیج، برطانیہ، یورپ اور امریکہ و کینیڈا کے طلبہ کو ان کے اپنے وقت پر معیاری 1-on-1 قرآن کلاسز مل سکیں۔
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {/* Shift 1 */}
            <div className="bg-red-950/80 border border-amber-500/40 rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="bg-amber-500 text-red-950 font-black text-xs px-2.5 py-1 rounded-full uppercase">
                  شفٹ 1 • 8 گھنٹے
                </span>
                <Sun className="w-5 h-5 text-amber-400" />
              </div>
              <h3 className="font-serif font-bold text-lg text-amber-200">صبح کی شفٹ (Morning Shift)</h3>
              <div className="text-xs text-amber-300 font-mono font-bold bg-red-900/80 p-2 rounded-lg border border-red-800">
                08:00 AM – 04:00 PM PKT
              </div>
              <p className="text-xs text-red-100/90 leading-relaxed">
                پاکستان ڈے ٹائم، گلف و مشرق وسطیٰ (06:00 AM – 02:00 PM)۔ بچوں کے نورانی قاعدہ اور خواتین و مستورات کی خصوصی کلاسز۔
              </p>
            </div>

            {/* Shift 2 */}
            <div className="bg-red-950/80 border border-emerald-500/50 rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="bg-emerald-500 text-red-950 font-black text-xs px-2.5 py-1 rounded-full uppercase">
                  شفٹ 2 • 8 گھنٹے
                </span>
                <Clock className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="font-serif font-bold text-lg text-emerald-200">شام کی شفٹ (Evening Shift)</h3>
              <div className="text-xs text-emerald-300 font-mono font-bold bg-red-900/80 p-2 rounded-lg border border-red-800">
                04:00 PM – 12:00 AM PKT
              </div>
              <p className="text-xs text-red-100/90 leading-relaxed">
                پاکستان بعد از اسکول طلبہ، برطانیہ UK (11:00 AM – 07:00 PM GMT) اور یورپ۔ تجوید، ناظرہ اور حفظ قرآن کی پرائم شفٹ۔
              </p>
            </div>

            {/* Shift 3 */}
            <div className="bg-red-950/80 border border-blue-500/50 rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="bg-blue-500 text-white font-black text-xs px-2.5 py-1 rounded-full uppercase">
                  شفٹ 3 • 8 گھنٹے
                </span>
                <Moon className="w-5 h-5 text-blue-300" />
              </div>
              <h3 className="font-serif font-bold text-lg text-blue-200">رات و اوورسیز شفٹ (Night Shift)</h3>
              <div className="text-xs text-blue-300 font-mono font-bold bg-red-900/80 p-2 rounded-lg border border-red-800">
                12:00 AM – 08:00 AM PKT
              </div>
              <p className="text-xs text-red-100/90 leading-relaxed">
                امریکہ (USA EST/PST)، کینیڈا اور آسٹریلیا کے اوورسیز مسلم بچوں اور فیملیز کے لیے انگریزی دان مستند حفاظ و قراء کے ساتھ کلاسز۔
              </p>
            </div>
          </div>

          <div className="bg-emerald-950/70 border border-emerald-500/40 rounded-xl p-3 text-center text-xs text-emerald-200 flex flex-col sm:flex-row items-center justify-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              <strong>اساتذہ کی تنخواہ کا قانون:</strong> تمام اساتذہ کو ہر 8 گھنٹے کی روزانہ شفٹ پر <strong>شروع میں 50,000 روپے ماہانہ تنخواہ</strong> دی جاتی ہے، جو کارکردگی اور وقت کے ساتھ بڑھتی جاتی ہے۔
            </span>
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
