import React, { useState } from 'react';
import {
  BookOpen,
  CheckCircle,
  Clock,
  Globe,
  Award,
  Users,
  Shield,
  Phone,
  MessageSquare,
  Sparkles,
  ChevronDown,
  ChevronRight,
  ArrowRight,
  CreditCard,
  GraduationCap,
  Heart,
  Video,
  Layers,
  HelpCircle,
  FileText,
  Calendar,
  Lock,
} from 'lucide-react';
import { useAcademy } from '../context/AcademyContext';
import { PageId } from '../types';
import { SeoCourseData } from '../data/seoCoursesData';
import { EasyPaisaPaymentModal } from '../components/EasyPaisaPaymentModal';

interface SeoCoursePageProps {
  courseData: SeoCourseData;
}

export const SeoCoursePage: React.FC<SeoCoursePageProps> = ({ courseData }) => {
  const { setActivePage, setSelectedCourseForEnroll, siteSettings, courses } = useAcademy();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleEnrollClick = () => {
    // Match with one of the standard courses if available, or create temporary course object
    const matched = courses.find((c) => c.title.toLowerCase().includes(courseData.primaryKeyword.toLowerCase())) || {
      id: courseData.id,
      title: courseData.h1,
      category: 'tajweed' as const,
      description: courseData.shortIntro,
      duration: courseData.classFormat.duration,
      level: 'All Levels' as const,
      targetAudience: 'Everyone' as const,
      feePKR: courseData.feePKR,
      feeUSD: courseData.feeUSD,
      image: courseData.featuredImage,
      features: courseData.learningBenefits,
      syllabus: courseData.curriculum.map((m) => m.moduleTitle),
    };
    setSelectedCourseForEnroll(matched);
  };

  return (
    <div className="bg-red-950 text-white min-h-screen space-y-12 pb-16">
      {/* 1. BREADCRUMBS */}
      <nav
        aria-label="Breadcrumb"
        className="bg-red-900/60 border-b border-red-800 py-2.5 px-4 sm:px-6 lg:px-8 text-xs text-red-200"
      >
        <div className="max-w-7xl mx-auto flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setActivePage('home')}
            className="hover:text-amber-300 transition-colors flex items-center gap-1"
          >
            <span>Home</span>
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-amber-500/60" />
          <button
            onClick={() => setActivePage('courses')}
            className="hover:text-amber-300 transition-colors"
          >
            Courses
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-amber-500/60" />
          <span className="text-amber-300 font-semibold truncate max-w-xs sm:max-w-md">
            {courseData.h1}
          </span>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* 2. HERO SECTION */}
        <section className="bg-gradient-to-b from-red-900 via-amber-950 to-red-950 border-2 border-amber-500/40 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-400/30">
                <GraduationCap className="w-4 h-4 text-amber-400" />
                <span>Certified 1-on-1 Online Program</span>
              </div>

              {/* H1 Title (Primary Keyword Prominence) */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-extrabold text-amber-100 leading-tight">
                {courseData.h1}
              </h1>

              {/* Subheading */}
              <p className="text-base sm:text-lg text-amber-200/90 font-medium">
                {courseData.subheading}
              </p>

              {/* Short Intro */}
              <p className="text-xs sm:text-sm text-red-100/90 leading-relaxed max-w-2xl">
                {courseData.shortIntro}
              </p>

              {/* CTA Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
                <button
                  onClick={handleEnrollClick}
                  className="bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-300 hover:to-amber-500 text-red-950 font-extrabold text-sm px-7 py-3.5 rounded-xl shadow-xl border border-amber-200 flex items-center gap-2 transition-transform hover:scale-105"
                >
                  <Sparkles className="w-4 h-4 text-red-950" />
                  <span>Start Free 3-Day Trial</span>
                </button>

                <a
                  href={`https://wa.me/92${siteSettings.whatsappNumber.replace(/^0/, '')}?text=${encodeURIComponent(
                    `Assalam-o-Alaikum! I am interested in enrolling in ${courseData.h1}. Please guide me about class timings and tutor availability.`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-lg flex items-center gap-2 transition-transform hover:scale-105"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Inquiry</span>
                </a>

                <button
                  onClick={() => setPaymentModalOpen(true)}
                  className="bg-red-950 hover:bg-red-900 text-amber-300 font-bold text-xs px-5 py-3.5 rounded-xl border border-amber-500/40 flex items-center gap-2"
                >
                  <CreditCard className="w-4 h-4 text-emerald-400" />
                  <span>EasyPaisa & Fees</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-amber-300/80">
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>No upfront payment for 3-day trial</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Male & Female tutors available</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Flexible timezone scheduling</span>
                </span>
              </div>
            </div>

            {/* Right Card Hero Preview Box */}
            <div className="lg:col-span-5">
              <div className="bg-red-950/90 border-2 border-amber-500/40 rounded-2xl overflow-hidden shadow-2xl space-y-4">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={courseData.featuredImage}
                    alt={`${courseData.h1} - Shaheen Al Zaitoon Online Quran Academy`}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-red-950 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-3 bg-amber-500 text-red-950 font-bold text-xs px-3 py-1 rounded-full shadow">
                    Rs. {courseData.feePKR.toLocaleString()} PKR / ${courseData.feeUSD} USD / mo
                  </span>
                </div>

                <div className="p-5 space-y-3 text-xs">
                  <div className="flex items-center justify-between border-b border-red-800 pb-2">
                    <span className="text-red-300">Format:</span>
                    <span className="text-amber-200 font-bold">1-on-1 Live Interactive Classes</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-red-800 pb-2">
                    <span className="text-red-300">Class Duration:</span>
                    <span className="text-amber-200 font-bold">{courseData.classFormat.duration}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-red-800 pb-2">
                    <span className="text-red-300">Frequency:</span>
                    <span className="text-amber-200 font-bold">{courseData.classFormat.frequency}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-red-800 pb-2">
                    <span className="text-red-300">Languages:</span>
                    <span className="text-amber-200 font-bold">{courseData.classFormat.language}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-red-300">Certification:</span>
                    <span className="text-emerald-400 font-bold">Verified QR Code Certificate</span>
                  </div>

                  <button
                    onClick={handleEnrollClick}
                    className="w-full mt-3 bg-amber-500 hover:bg-amber-400 text-red-950 font-extrabold py-3 rounded-xl shadow text-xs flex items-center justify-center gap-2 transition-transform hover:scale-102"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Book Your Free 3-Day Trial</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. COURSE OVERVIEW & WHO THIS IS FOR */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 bg-red-900/60 border border-amber-500/30 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl">
            <div className="text-xs font-bold uppercase tracking-widest text-amber-400 font-serif">
              Detailed Description
            </div>
            <h2 className="text-2xl font-serif font-bold text-amber-100">
              Course Overview & Pedagogical Approach
            </h2>
            <p className="text-xs sm:text-sm text-red-100 leading-relaxed">
              {courseData.courseOverview}
            </p>

            <div className="pt-4 border-t border-red-800 space-y-3">
              <div className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                Key Learning Benefits:
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-red-200">
                {courseData.learningBenefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-5 bg-gradient-to-b from-red-900 to-amber-950 border border-amber-500/30 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl">
            <div className="text-xs font-bold uppercase tracking-widest text-amber-400 font-serif">
              Target Audience
            </div>
            <h2 className="text-2xl font-serif font-bold text-amber-100">
              Who Is This Course For?
            </h2>
            <ul className="space-y-3 text-xs text-red-100">
              {courseData.whoIsThisFor.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 p-2.5 bg-red-950/60 rounded-xl border border-red-800">
                  <Users className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 4. WHAT STUDENTS WILL LEARN */}
        <section className="space-y-6">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <div className="text-xs font-bold uppercase tracking-widest text-amber-400 font-serif">
              Core Competencies
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-amber-100">
              What Students Will Learn in This Course
            </h2>
            <p className="text-xs sm:text-sm text-red-200">
              Structured modules designed to build lasting confidence, accurate pronunciation, and deep spiritual connection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courseData.whatYouWillLearn.map((item, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-red-900/80 to-red-950 border border-amber-500/30 rounded-2xl p-6 space-y-2 hover:border-amber-400 transition-colors shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold text-xs border border-amber-400/30">
                    0{idx + 1}
                  </div>
                  <h3 className="font-serif font-bold text-base text-amber-200">{item.title}</h3>
                </div>
                <p className="text-xs text-red-100/90 leading-relaxed pl-11">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 5. COURSE CURRICULUM */}
        <section className="bg-red-900/60 border-2 border-amber-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-red-800 pb-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-amber-400 font-serif">
                Systematic Syllabus
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-amber-100">
                Detailed Course Curriculum & Modules
              </h2>
            </div>
            <button
              onClick={handleEnrollClick}
              className="bg-amber-500 hover:bg-amber-400 text-red-950 font-bold text-xs px-5 py-2.5 rounded-xl shadow flex items-center gap-1.5"
            >
              <span>Enroll in Course</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courseData.curriculum.map((mod, idx) => (
              <div
                key={idx}
                className="bg-red-950/80 border border-amber-500/20 rounded-2xl p-5 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] bg-amber-500/20 text-amber-300 font-bold px-2.5 py-0.5 rounded-full border border-amber-400/30">
                    {mod.moduleNumber}
                  </span>
                  <BookOpen className="w-4 h-4 text-amber-400" />
                </div>
                <h3 className="font-serif font-bold text-base text-amber-200">
                  {mod.moduleTitle}
                </h3>
                <ul className="space-y-1.5 text-xs text-red-200/90">
                  {mod.topics.map((t, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* 6. HOW ONLINE CLASSES WORK */}
        <section className="space-y-6">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <div className="text-xs font-bold uppercase tracking-widest text-amber-400 font-serif">
              Simple 3-Step Setup
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-amber-100">
              How Our Online Quran Classes Work
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {courseData.howClassesWork.map((step, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-b from-red-900 to-amber-950 border border-amber-500/30 rounded-2xl p-6 text-center space-y-3 shadow-lg"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center mx-auto border border-amber-400/30 font-serif font-bold text-lg">
                  {idx + 1}
                </div>
                <h3 className="font-serif font-bold text-base text-amber-200">{step.title}</h3>
                <p className="text-xs text-red-100/80 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 7. TEACHER INFORMATION */}
        <section className="bg-gradient-to-r from-red-900 via-amber-950 to-red-900 border-2 border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-400/30">
                <Award className="w-3.5 h-3.5" />
                <span>Vetted Scholarly Faculty</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-amber-100">
                {courseData.teacherInfo.title}
              </h2>
              <p className="text-xs sm:text-sm text-red-100/90 leading-relaxed">
                {courseData.teacherInfo.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-amber-200 pt-2">
                {courseData.teacherInfo.qualifications.map((q, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{q}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3 justify-center">
              <button
                onClick={() => setActivePage('teachers')}
                className="bg-amber-500 hover:bg-amber-400 text-red-950 font-bold text-xs px-6 py-3.5 rounded-xl shadow flex items-center justify-center gap-2"
              >
                <Users className="w-4 h-4" />
                <span>View Certified Faculty Profiles</span>
              </button>

              <a
                href={`https://wa.me/92${siteSettings.whatsappNumber.replace(/^0/, '')}`}
                target="_blank"
                rel="noreferrer"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-6 py-3.5 rounded-xl shadow flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Request Female Teacher on WhatsApp</span>
              </a>
            </div>
          </div>
        </section>

        {/* 8. FAQ SECTION */}
        <section className="space-y-6">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <div className="text-xs font-bold uppercase tracking-widest text-amber-400 font-serif">
              Clear Answers
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-amber-100">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-red-200">
              Got questions about our {courseData.h1}? Find real answers below.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {courseData.faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-red-900/60 border border-amber-500/30 rounded-2xl overflow-hidden shadow"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-serif font-bold text-sm text-amber-200 hover:text-white transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-amber-400 shrink-0 transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs text-red-100/90 leading-relaxed border-t border-red-800 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* 9. INTERNAL LINKING HUB (Mandated Section 8) */}
        <section className="bg-red-900/70 border-2 border-amber-500/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="space-y-1">
            <div className="text-xs font-bold uppercase tracking-widest text-amber-400 font-serif">
              Connected Learning Pathways
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-100">
              Explore Related Quranic Courses & Audience Tracks
            </h2>
            <p className="text-xs text-red-200">
              Complement your current study plan with our interconnected Quran and Islamic syllabus tracks.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {courseData.internalLinks.map((link, idx) => (
              <button
                key={idx}
                onClick={() => setActivePage(link.pageId)}
                className="text-left bg-red-950/80 border border-amber-500/20 hover:border-amber-400 rounded-2xl p-4 transition-all hover:scale-102 flex flex-col justify-between group shadow"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-amber-300 font-serif font-bold text-sm group-hover:text-amber-200">
                    <span>{link.anchorText}</span>
                    <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform shrink-0 ml-1" />
                  </div>
                  <p className="text-[11px] text-red-200/80 leading-relaxed line-clamp-2">
                    {link.description}
                  </p>
                </div>
                <div className="pt-2 text-[10px] text-amber-400 font-semibold uppercase tracking-wider">
                  View Program Details →
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* 10. FINAL CONVERSION BANNER */}
        <section className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-red-950 rounded-3xl p-8 sm:p-10 text-center space-y-6 shadow-2xl">
          <div className="max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-4xl font-serif font-extrabold tracking-tight">
              Begin Your 3-Day Free Trial Today
            </h2>
            <p className="text-xs sm:text-sm font-medium text-red-950/90 leading-relaxed">
              Experience personalized 1-on-1 Quran learning with zero financial commitment. Select your preferred timing and start learning right away.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={handleEnrollClick}
              className="bg-red-950 hover:bg-red-900 text-amber-300 font-extrabold text-sm px-8 py-4 rounded-xl shadow-2xl flex items-center gap-2 transition-transform hover:scale-105"
            >
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>Register for 3-Day Free Trial</span>
            </button>

            <a
              href={`https://wa.me/92${siteSettings.whatsappNumber.replace(/^0/, '')}?text=${encodeURIComponent(
                `Assalam-o-Alaikum! I want to enroll in ${courseData.h1} for myself/my child.`
              )}`}
              target="_blank"
              rel="noreferrer"
              className="bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-sm px-8 py-4 rounded-xl shadow-2xl flex items-center gap-2 transition-transform hover:scale-105"
            >
              <MessageSquare className="w-5 h-5" />
              <span>Contact via WhatsApp: 03447956085</span>
            </a>
          </div>
        </section>
      </div>

      {/* EasyPaisa Payment Modal */}
      <EasyPaisaPaymentModal isOpen={paymentModalOpen} onClose={() => setPaymentModalOpen(false)} />
    </div>
  );
};
