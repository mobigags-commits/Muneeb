import React, { useState } from 'react';
import {
  BookOpen,
  Phone,
  MessageSquare,
  MapPin,
  Heart,
  CreditCard,
  Send,
  CheckCircle,
  Shield,
  ArrowRight,
  Globe,
  Award,
  Sparkles,
  Facebook,
  Users,
  ExternalLink,
} from 'lucide-react';
import { useAcademy } from '../context/AcademyContext';
import { PageId } from '../types';

export const Footer: React.FC = () => {
  const { siteSettings, setActivePage } = useAcademy();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 5000);
      setNewsletterEmail('');
    }
  };

  const quickLinks: { id: PageId; label: string }[] = [
    { id: 'home', label: 'Home Page' },
    { id: 'about', label: 'About Us & Mission' },
    { id: 'courses', label: 'All Quran Courses' },
    { id: 'teachers', label: 'Certified Qaris' },
    { id: 'admissions', label: 'Online Admissions' },
    { id: 'fee-payment', label: 'Fee & EasyPaisa' },
    { id: 'live-classes', label: 'Live Virtual Classroom' },
    { id: 'certificates', label: 'Certificate Verification' },
  ];

  const secondaryLinks: { id: PageId; label: string }[] = [
    { id: 'student-portal', label: 'Student Portal' },
    { id: 'parent-portal', label: 'Parent Portal' },
    { id: 'gallery', label: 'Photo & Video Gallery' },
    { id: 'blog', label: 'Islamic Articles & Tips' },
    { id: 'faq', label: 'Frequently Asked Questions' },
    { id: 'careers', label: 'Teacher Careers' },
    { id: 'donations', label: 'Sadaqah & Donations' },
    { id: 'help-support', label: 'Help & Support Desk' },
  ];

  return (
    <footer className="bg-red-950 text-white border-t-4 border-amber-500/50 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Prominent EasyPaisa & Official Account Callout Box */}
        <div className="bg-gradient-to-r from-red-900 via-amber-950 to-red-900 border-2 border-amber-500/60 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center relative z-10">
            {/* Owner & Office Info */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-400/30">
                <Shield className="w-3.5 h-3.5" />
                <span>Official Verification</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-amber-200">
                {siteSettings.academyName}
              </h3>
              <p className="text-xs sm:text-sm text-red-200/90 leading-relaxed">
                Founder & Owner: <strong className="text-white">{siteSettings.ownerName}</strong>
                <br />
                Main Head Office: <strong className="text-amber-300">{siteSettings.headOfficeCity}, Pakistan</strong>
              </p>
            </div>

            {/* EasyPaisa Payment Account Card */}
            <div className="bg-red-950/90 border-2 border-emerald-500/60 rounded-xl p-4 sm:p-5 text-center shadow-lg hover:border-emerald-400 transition-colors">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500 text-white font-bold flex items-center justify-center text-xs">
                  EP
                </div>
                <span className="text-emerald-400 font-extrabold text-base tracking-wide uppercase">
                  Official EasyPaisa Account
                </span>
              </div>
              <div className="text-xs text-red-200 mb-1">Account Title:</div>
              <div className="text-lg font-bold text-amber-200 font-serif">
                {siteSettings.easyPaisaAccountTitle}
              </div>
              <div className="text-xs text-red-200 mt-2 mb-1">EasyPaisa & WhatsApp Number:</div>
              <a
                href={`https://wa.me/92${siteSettings.whatsappNumber.replace(/^0/, '')}`}
                target="_blank"
                rel="noreferrer"
                className="inline-block bg-emerald-600 hover:bg-emerald-500 text-white font-mono font-extrabold text-xl px-4 py-1.5 rounded-lg shadow-md transition-transform hover:scale-105"
              >
                {siteSettings.easyPaisaAccountNumber}
              </a>
              <div className="text-[11px] text-emerald-300/80 mt-2">
                ✓ Send screenshot to WhatsApp for instant verification
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <button
                onClick={() => setActivePage('fee-payment')}
                className="bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-300 hover:to-amber-500 text-red-950 font-extrabold text-sm px-5 py-3 rounded-xl shadow-lg border border-amber-200 flex items-center justify-center gap-2 transition-transform hover:scale-105"
              >
                <CreditCard className="w-5 h-5 text-red-950" />
                <span>Pay Fee / View EasyPaisa Details</span>
              </button>

              <a
                href={`https://wa.me/92${siteSettings.whatsappNumber.replace(/^0/, '')}`}
                target="_blank"
                rel="noreferrer"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm px-5 py-3 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-transform hover:scale-105"
              >
                <MessageSquare className="w-5 h-5" />
                <span>Contact Owner on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* 4-Column Footer Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Academy Overview & Memorial */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-red-950 flex items-center justify-center font-bold">
                <BookOpen className="w-6 h-6" />
              </div>
              <span className="font-serif font-bold text-lg text-amber-200">
                Shaheen Al Zaitoon
              </span>
            </div>
            <p className="text-xs text-red-200/90 leading-relaxed">
              A world-class digital Islamic education ecosystem spreading Tajweed, Hifz, and Quran comprehension globally.
            </p>
            <div className="p-3 rounded-xl bg-red-900/60 border border-amber-500/30 text-xs space-y-1">
              <div className="text-amber-300 font-bold flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 text-red-400" />
                <span>Isal-e-Sawab Dedication</span>
              </div>
              <p className="text-red-100 text-[11px]">
                In loving memory of <strong>{siteSettings.motherMemorialName}</strong> ({siteSettings.motherMemorialUrdu}).
              </p>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-amber-300 uppercase tracking-wider font-serif border-b border-red-800 pb-2">
              Main Navigation
            </h4>
            <ul className="space-y-1.5 text-xs">
              {quickLinks.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => setActivePage(item.id)}
                    className="hover:text-amber-300 transition-colors flex items-center gap-1.5 text-red-200"
                  >
                    <ArrowRight className="w-3 h-3 text-amber-400" />
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Secondary Links & Legal */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-amber-300 uppercase tracking-wider font-serif border-b border-red-800 pb-2">
              Portals & Legal
            </h4>
            <ul className="space-y-1.5 text-xs">
              {secondaryLinks.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => setActivePage(item.id)}
                    className="hover:text-amber-300 transition-colors flex items-center gap-1.5 text-red-200"
                  >
                    <ArrowRight className="w-3 h-3 text-amber-400" />
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => setActivePage('privacy')}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5 text-red-200"
                >
                  <ArrowRight className="w-3 h-3 text-amber-400" />
                  <span>Privacy Policy</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage('terms')}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5 text-red-200"
                >
                  <ArrowRight className="w-3 h-3 text-amber-400" />
                  <span>Terms & Conditions</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter & Direct Contact */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-amber-300 uppercase tracking-wider font-serif border-b border-red-800 pb-2">
              Stay Connected
            </h4>
            <p className="text-xs text-red-200">
              Subscribe for weekly Quranic insights, Tajweed lessons, and academy updates.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  required
                  className="w-full bg-red-900 text-amber-100 placeholder-red-300/60 pl-3 pr-10 py-2 rounded-lg text-xs border border-red-700 focus:outline-none focus:border-amber-400"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 px-2.5 bg-amber-500 text-red-950 font-bold rounded-md hover:bg-amber-400 transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
              {subscribed && (
                <div className="text-[11px] text-emerald-400 flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>JazakAllah Khair! Subscribed successfully.</span>
                </div>
              )}
            </form>

            <div className="pt-2 text-xs space-y-2 text-red-200">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{siteSettings.headOfficeAddress}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Call/WhatsApp: {siteSettings.contactNumber}</span>
              </div>
            </div>

            {/* Prominent Facebook Group CTA Card in Footer */}
            <div className="bg-slate-900 border-2 border-[#1877F2]/60 rounded-xl p-3.5 text-left space-y-2 shadow-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-[#1877F2] font-extrabold">
                  <Facebook className="w-4 h-4 fill-[#1877F2] text-white" />
                  <span>Official FB Community</span>
                </div>
                <span className="bg-[#1877F2]/20 text-blue-300 text-[10px] px-1.5 py-0.5 rounded font-mono font-bold">
                  92.4k+
                </span>
              </div>
              <p className="text-[11px] text-slate-300 line-clamp-2">
                Join our Facebook group for daily Quran lessons & Qari Q&A.
              </p>
              <a
                href={siteSettings.facebookGroupUrl || 'https://www.facebook.com/groups/REPLACE_WITH_MY_GROUP_LINK'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#1877F2] hover:bg-[#166fe5] text-white font-bold text-[11px] py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-transform hover:scale-102 shadow-md"
                id="footer-join-fb-btn"
              >
                <Facebook className="w-3.5 h-3.5 fill-white" />
                <span>Join Group on Facebook</span>
                <ExternalLink className="w-3 h-3 text-white/80" />
              </a>
            </div>
          </div>
        </div>

        {/* Social Media Highlight Bar with Facebook Prominently Featured */}
        <div className="border-t border-red-900/60 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs text-red-200 font-medium">Follow & Connect:</span>
            {/* Highlighted Facebook Button */}
            <a
              href={siteSettings.facebookGroupUrl || 'https://www.facebook.com/groups/REPLACE_WITH_MY_GROUP_LINK'}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#1877F2] hover:bg-[#166fe5] text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-md transition-all transform hover:-translate-y-0.5"
              id="footer-social-fb-highlight"
            >
              <Facebook className="w-3.5 h-3.5 fill-white" />
              <span>Facebook Group</span>
            </a>
            {/* WhatsApp */}
            <a
              href={`https://wa.me/92${siteSettings.whatsappNumber.replace(/^0/, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-500 text-white p-2 rounded-full text-xs transition-colors"
              title="WhatsApp Channel"
            >
              <MessageSquare className="w-3.5 h-3.5" />
            </a>
            {/* Community Hub Button */}
            <button
              onClick={() => setActivePage('community')}
              className="bg-red-900 hover:bg-red-800 text-amber-300 px-3 py-1.5 rounded-full text-xs font-semibold border border-amber-500/30 transition-colors"
            >
              <span>Community Hub</span>
            </button>
          </div>

          <div className="text-xs text-slate-300">
            Official Group Link Config: <code className="text-amber-300 font-mono text-[11px] bg-red-900/40 px-2 py-0.5 rounded border border-red-800">{siteSettings.facebookGroupUrl}</code>
          </div>
        </div>

        {/* Bottom Copyright & Global Suboffices List */}
        <div className="border-t border-red-900 pt-6 text-center text-xs text-red-300/80 space-y-2">
          <p>
            © {new Date().getFullYear()} <strong>{siteSettings.academyName}</strong>. All Rights Reserved. Main Head Office: Rawalpindi, Pakistan.
          </p>
          <p className="text-[11px] text-amber-300/80">
            Global Suboffices: Rawalpindi HQ (PK) • London (UK) • Dubai (UAE) • Toronto (Canada) • Dallas (USA) • Sydney (Australia)
          </p>
          <div className="pt-2 flex items-center justify-center gap-4 text-[11px] text-red-400">
            <button onClick={() => setActivePage('admin-portal')} className="hover:text-amber-300 underline">
              Admin & Owner Dashboard
            </button>
            <span>•</span>
            <button onClick={() => setActivePage('donations')} className="hover:text-amber-300 underline">
              Sadaqah Fund
            </button>
            <span>•</span>
            <button onClick={() => setActivePage('help-support')} className="hover:text-amber-300 underline">
              Student Support Desk
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
