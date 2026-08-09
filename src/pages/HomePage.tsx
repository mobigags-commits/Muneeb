import React, { useState } from 'react';
import {
  BookOpen,
  Award,
  Users,
  Globe,
  Sparkles,
  Phone,
  MessageSquare,
  CheckCircle,
  CreditCard,
  ArrowRight,
  Play,
  Heart,
  Star,
  Shield,
  Clock,
  ChevronRight,
  GraduationCap,
  MapPin,
  Calendar,
  FileText,
} from 'lucide-react';
import { useAcademy } from '../context/AcademyContext';
import { MemorialBanner } from '../components/MemorialBanner';
import { AIChatAssistant } from '../components/AIChatAssistant';
import { EasyPaisaPaymentModal } from '../components/EasyPaisaPaymentModal';
import { FacebookGroupWidget } from '../components/FacebookGroupWidget';

export const HomePage: React.FC = () => {
  const {
    siteSettings,
    courses,
    teachers,
    branches,
    announcements,
    blogPosts,
    setActivePage,
    setSelectedCourseForEnroll,
  } = useAcademy();

  const [paymentModalOpen, setPaymentModalOpen] = useState(false);

  const stats = [
    { label: 'Enrolled Students', value: '5,000+', icon: Users },
    { label: 'Certified Qaris & Alimahs', value: '120+', icon: Award },
    { label: 'Countries Reached', value: '35+', icon: Globe },
    { label: 'Satisfaction Rate', value: '100%', icon: Star },
  ];

  const whyChooseUs = [
    {
      title: '1-on-1 Live Interactive Classes',
      desc: 'Individual focus on every student with personalized pace and flexible timings for UK, USA, Gulf & Pakistan timezones.',
      icon: Users,
    },
    {
      title: 'Certified Qaris & Alimahs',
      desc: 'Expert Male & Female instructors certified in Tajweed, Qira’at Hafs, and Shahadat-ul-Aalamiyyah.',
      icon: Award,
    },
    {
      title: 'Female Qaria Teachers for Ladies',
      desc: '100% private online environment exclusively conducted by qualified female scholars for sisters and daughters.',
      icon: Shield,
    },
    {
      title: 'EasyPaisa Fee Payment Integration',
      desc: 'Transparent, affordable fee structure with direct EasyPaisa payment (03447956085 - Muneeb Ur Rehman).',
      icon: CreditCard,
    },
  ];

  return (
    <div className="bg-red-950 text-white min-h-screen space-y-16 pb-16">
      {/* HERO SECTION - Premium Red Theme */}
      <section className="relative overflow-hidden bg-gradient-to-b from-red-950 via-red-900 to-red-950 pt-10 pb-20 px-4 sm:px-6 lg:px-8 border-b-2 border-amber-500/40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.15),transparent_50%)] pointer-events-none" />
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-red-800/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto space-y-10 relative z-10">
          {/* Top Announcement Bar */}
          {announcements.length > 0 && (
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 rounded-full px-4 py-1.5 text-xs text-amber-300">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="font-semibold text-amber-200">{announcements[0].title}</span>
              <button
                onClick={() => setActivePage('admissions')}
                className="underline hover:text-white font-bold ml-1"
              >
                Enroll Now →
              </button>
            </div>
          )}

          {/* Main Hero Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Islamic Bismillah Banner */}
              <div className="text-amber-300 text-xl sm:text-2xl font-serif tracking-widest font-arabic leading-relaxed">
                بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-extrabold tracking-tight text-amber-100 leading-tight">
                {siteSettings.heroHeadline || 'Shaheen Al Zaitoon Online Quran Academy'}
              </h1>

              <p className="text-base sm:text-lg text-red-100/90 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {siteSettings.heroSubheadline ||
                  'Learn Nazra Quran, Hifz, Tajweed, and Islamic Studies with certified Qaris from Rawalpindi, Pakistan. Dedicated as Sadaqah Jariyah for Zaitoon Bibi.'}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => setActivePage('admissions')}
                  className="bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-300 hover:to-amber-500 text-red-950 font-extrabold text-sm px-8 py-4 rounded-xl shadow-2xl border border-amber-200 flex items-center gap-2 transition-all transform hover:scale-105"
                >
                  <Sparkles className="w-5 h-5 text-red-950" />
                  <span>Book Free 3-Day Trial Class</span>
                </button>

                <button
                  onClick={() => setPaymentModalOpen(true)}
                  className="bg-red-900/90 hover:bg-red-800 text-amber-200 font-bold text-sm px-6 py-4 rounded-xl border border-amber-500/40 shadow-xl flex items-center gap-2 transition-all"
                >
                  <CreditCard className="w-5 h-5 text-emerald-400" />
                  <span>EasyPaisa Payment Portal</span>
                </button>

                <a
                  href={`https://wa.me/92${siteSettings.whatsappNumber.replace(/^0/, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm px-6 py-4 rounded-xl shadow-xl flex items-center gap-2 transition-all"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>WhatsApp 03447956085</span>
                </a>
              </div>

              {/* Founder & Location Tag */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-amber-300/90 font-medium">
                <span className="flex items-center gap-1">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>Founder: <strong>{siteSettings.ownerName}</strong></span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  <span>HQ: <strong>{siteSettings.headOfficeCity}, Pakistan</strong></span>
                </span>
              </div>
            </div>

            {/* Right Card Hero Preview Box */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl bg-gradient-to-b from-red-900 via-amber-950 to-red-950 border-2 border-amber-500/50 p-6 shadow-2xl space-y-6">
                <div className="flex items-center justify-between border-b border-red-800 pb-3">
                  <div className="text-amber-200 font-serif font-bold text-lg">
                    Official Academy Overview
                  </div>
                  <span className="text-xs bg-emerald-500/20 text-emerald-300 font-bold px-2.5 py-1 rounded-full border border-emerald-400/30">
                    Live Admissions Open
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-3 bg-red-950/80 rounded-xl border border-amber-500/30 flex items-center justify-between">
                    <div>
                      <div className="text-amber-300 font-bold">EasyPaisa Account Number</div>
                      <div className="text-white font-mono font-bold text-sm">{siteSettings.easyPaisaAccountNumber}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-red-300 text-[10px]">Account Title</div>
                      <div className="text-amber-200 font-serif font-bold">{siteSettings.easyPaisaAccountTitle}</div>
                    </div>
                  </div>

                  <div className="p-3 bg-red-950/80 rounded-xl border border-amber-500/30 space-y-1">
                    <div className="text-amber-300 font-bold flex items-center justify-between">
                      <span>Sadaqah Jariyah Dedication</span>
                      <Heart className="w-3.5 h-3.5 text-red-400" />
                    </div>
                    <p className="text-red-100 text-[11px]">
                      Established in memory of <strong>{siteSettings.motherMemorialName}</strong> ({siteSettings.motherMemorialUrdu}).
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setActivePage('courses')}
                  className="w-full bg-amber-500 hover:bg-amber-400 text-red-950 font-bold py-3 rounded-xl shadow text-xs flex items-center justify-center gap-2"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Explore All 12+ Courses</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Memorial Banner */}
        <MemorialBanner />

        {/* Live Stats Counter Bar */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="bg-gradient-to-br from-red-900 to-amber-950 border border-amber-500/30 rounded-2xl p-6 text-center shadow-xl space-y-2 hover:border-amber-400 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center mx-auto border border-amber-400/30">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-2xl sm:text-3xl font-serif font-bold text-amber-200">
                  {s.value}
                </div>
                <div className="text-xs text-red-200 uppercase tracking-wider font-semibold">
                  {s.label}
                </div>
              </div>
            );
          })}
        </section>

        {/* Homepage Facebook Group Community Section */}
        <section className="space-y-6">
          <div className="text-center space-y-2">
            <div className="text-xs uppercase tracking-widest text-[#1877F2] font-extrabold font-serif">
              Official Social Community
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              Join 92,400+ Students & Scholars in Our Facebook Group
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto">
              Get free daily Tajweed lessons, live Q&A with certified Qaris, and connect with fellow parents and students worldwide.
            </p>
          </div>

          <FacebookGroupWidget variant="banner" />
        </section>

        {/* Featured Courses Section */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-red-900 pb-4">
            <div>
              <div className="text-xs uppercase tracking-widest text-amber-400 font-bold font-serif">
                Comprehensive Quranic Curriculum
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-amber-100">
                Featured Quranic & Islamic Courses
              </h2>
            </div>
            <button
              onClick={() => setActivePage('courses')}
              className="text-xs text-amber-300 hover:text-white font-bold flex items-center gap-1"
            >
              <span>View All Courses</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.slice(0, 6).map((course) => (
              <div
                key={course.id}
                className="bg-gradient-to-b from-red-900 to-red-950 border border-amber-500/30 rounded-2xl overflow-hidden shadow-xl hover:border-amber-400 transition-all flex flex-col group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-red-950 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 bg-red-950/90 text-amber-300 text-[10px] uppercase font-extrabold px-2.5 py-1 rounded-full border border-amber-500/40">
                    {course.level}
                  </span>
                  <span className="absolute bottom-3 right-3 bg-amber-500 text-red-950 text-xs font-bold px-3 py-1 rounded-full">
                    Rs. {course.feePKR.toLocaleString()} / mo
                  </span>
                </div>

                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="font-serif font-bold text-lg text-amber-200 group-hover:text-white transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-xs text-red-100/80 line-clamp-2 leading-relaxed">
                      {course.description}
                    </p>
                  </div>

                  <ul className="text-xs text-red-200 space-y-1 pt-2 border-t border-red-800">
                    {course.features.slice(0, 3).map((f, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-3 flex items-center gap-2">
                    <button
                      onClick={() => setSelectedCourseForEnroll(course)}
                      className="flex-1 bg-amber-500 hover:bg-amber-400 text-red-950 font-bold py-2.5 rounded-xl text-xs text-center shadow"
                    >
                      Enroll Now
                    </button>
                    <button
                      onClick={() => setActivePage('courses')}
                      className="px-3 py-2.5 rounded-xl bg-red-900 hover:bg-red-800 text-amber-300 text-xs border border-red-700"
                    >
                      Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="bg-gradient-to-r from-red-900 via-amber-950 to-red-900 border-2 border-amber-500/40 rounded-3xl p-8 shadow-2xl space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="text-xs font-bold uppercase tracking-widest text-amber-400 font-serif">
              Unmatched Quality & Trust
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-amber-100">
              Why Choose Shaheen Al Zaitoon Online Quran Academy?
            </h2>
            <p className="text-xs sm:text-sm text-red-100">
              We blend authentic Islamic teaching principles with state-of-the-art digital classrooms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((w, idx) => {
              const Icon = w.icon;
              return (
                <div
                  key={idx}
                  className="bg-red-950/80 border border-amber-500/30 rounded-2xl p-5 space-y-3 hover:border-amber-400 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center border border-amber-400/30">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif font-bold text-base text-amber-200">{w.title}</h3>
                  <p className="text-xs text-red-100/80 leading-relaxed">{w.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* EasyPaisa Fee Payment Highlight Card */}
        <section className="bg-gradient-to-r from-emerald-950 via-red-950 to-emerald-950 border-2 border-emerald-500/60 rounded-3xl p-8 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-400/30">
                <CreditCard className="w-4 h-4" />
                <span>Seamless Local & Global Fee Collection</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-amber-200">
                Direct EasyPaisa Fee Payment
              </h2>
              <p className="text-xs sm:text-sm text-red-100 leading-relaxed">
                Send course fees directly via EasyPaisa to Founder <strong>{siteSettings.ownerName}</strong> at <strong>{siteSettings.easyPaisaAccountNumber}</strong>. Submit your transaction ID on our automated receipt portal for instant verification and receipt download.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-2">
                <div className="p-3 bg-red-950/80 rounded-xl border border-emerald-500/30 space-y-1">
                  <div className="text-emerald-400 font-bold">Account Title</div>
                  <div className="text-white font-serif font-bold text-sm">{siteSettings.easyPaisaAccountTitle}</div>
                </div>
                <div className="p-3 bg-red-950/80 rounded-xl border border-emerald-500/30 space-y-1">
                  <div className="text-emerald-400 font-bold">EasyPaisa & WhatsApp</div>
                  <div className="text-amber-200 font-mono font-bold text-sm">{siteSettings.easyPaisaAccountNumber}</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-3 justify-center">
              <button
                onClick={() => setPaymentModalOpen(true)}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm px-6 py-4 rounded-xl shadow-xl flex items-center justify-center gap-2 transition-transform hover:scale-105"
              >
                <CreditCard className="w-5 h-5" />
                <span>Submit EasyPaisa Payment Receipt</span>
              </button>

              <button
                onClick={() => setActivePage('fee-payment')}
                className="bg-red-900 hover:bg-red-800 text-amber-200 font-bold text-xs px-6 py-3 rounded-xl border border-amber-500/30 text-center"
              >
                View Complete Fee Plans & Bank IBAN
              </button>
            </div>
          </div>
        </section>

        {/* Global Presence & Suboffices */}
        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="text-xs font-bold uppercase tracking-widest text-amber-400 font-serif">
              Global Presence
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-amber-100">
              Rawalpindi Head Office & International Suboffices
            </h2>
            <p className="text-xs text-red-100">
              Serving Quran students across Pakistan, UK, USA, UAE, Canada, Australia and beyond.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {branches.map((b) => (
              <div
                key={b.id}
                className={`p-4 rounded-2xl border transition-all ${
                  b.isHeadquarters
                    ? 'bg-amber-950/90 border-amber-400 shadow-xl'
                    : 'bg-red-900/60 border-red-800 hover:border-amber-500/40'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <MapPin className={`w-5 h-5 ${b.isHeadquarters ? 'text-amber-400' : 'text-red-300'}`} />
                  {b.isHeadquarters && (
                    <span className="bg-amber-500 text-red-950 font-bold text-[9px] uppercase px-2 py-0.5 rounded-full">
                      Headquarters
                    </span>
                  )}
                </div>
                <h3 className="font-serif font-bold text-sm text-amber-200">{b.name}</h3>
                <div className="text-[11px] text-red-200 mt-1">{b.city}, {b.country}</div>
                <div className="text-[10px] text-amber-300 font-mono mt-2">{b.phone}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Academy Support & Advisory Desk Section */}
        <section className="space-y-4">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <div className="text-xs font-bold uppercase tracking-widest text-amber-400 font-serif">
              Interactive Guidance
            </div>
            <h2 className="text-2xl font-serif font-bold text-amber-100">
              Interactive Quran Advisory & Support Desk
            </h2>
          </div>
          <AIChatAssistant embedded />
        </section>
      </div>

      {/* EasyPaisa Payment Modal Trigger */}
      <EasyPaisaPaymentModal isOpen={paymentModalOpen} onClose={() => setPaymentModalOpen(false)} />
    </div>
  );
};
