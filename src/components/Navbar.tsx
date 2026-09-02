import React, { useState } from 'react';
import {
  BookOpen,
  Phone,
  MessageSquare,
  Globe,
  Search,
  UserCheck,
  CreditCard,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  Award,
  GraduationCap,
  Heart,
  HelpCircle,
  FileText,
  Shield,
  Briefcase,
  MapPin,
  Calendar,
  Image as ImageIcon,
  ShoppingBag,
  TrendingUp,
  Layers,
  Megaphone,
  Facebook,
  Users,
} from 'lucide-react';
import { useAcademy } from '../context/AcademyContext';
import { PageId, UserRole } from '../types';
import { MemorialBanner } from './MemorialBanner';
import { EcosystemBar } from './EcosystemBar';

export const Navbar: React.FC = () => {
  const {
    activePage,
    setActivePage,
    language,
    setLanguage,
    role,
    setRole,
    siteSettings,
    searchQuery,
    setSearchQuery,
  } = useAcademy();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pagesMenuOpen, setPagesMenuOpen] = useState(false);

  const mainNavItems: { id: PageId; label: string; labelUrdu?: string; icon: any }[] = [
    { id: 'home', label: 'Home', labelUrdu: 'صفحہ اول', icon: BookOpen },
    { id: 'courses', label: 'Courses', labelUrdu: 'کورسز', icon: GraduationCap },
    { id: 'community', label: 'FB Community', labelUrdu: 'فیس بک کمیونٹی', icon: Facebook },
    { id: 'zaitoon-traders', label: 'ZT Store', labelUrdu: 'زیطون ٹریڈرز', icon: ShoppingBag },
    { id: 'marriage-bureau', label: 'Marriage Bureau', labelUrdu: 'رشتہ بیورو', icon: Heart },
    { id: 'growth-hub', label: 'Growth Hub', labelUrdu: 'گروتھ پورٹل', icon: TrendingUp },
    { id: 'fee-payment', label: 'Fee & EasyPaisa', labelUrdu: 'فیس و ایزی پیسہ', icon: CreditCard },
  ];

  const allPageLinks: { id: PageId; label: string; group: string; icon: any }[] = [
    { id: 'home', label: '1. Home Page', group: 'Core', icon: BookOpen },
    { id: 'online-quran-classes', label: 'Online Quran Classes (General)', group: 'Quran Programs', icon: GraduationCap },
    { id: 'noorani-qaida', label: 'Learn Noorani Qaida Online', group: 'Quran Programs', icon: BookOpen },
    { id: 'quran-reading', label: 'Learn Quran Reading (Nazra)', group: 'Quran Programs', icon: BookOpen },
    { id: 'online-tajweed-classes', label: 'Online Tajweed Classes', group: 'Quran Programs', icon: Award },
    { id: 'online-hifz-quran-classes', label: 'Online Hifz Quran Classes', group: 'Quran Programs', icon: Award },
    { id: 'quran-classes-for-kids', label: 'Quran Classes for Kids', group: 'Quran Programs', icon: Users },
    { id: 'quran-classes-for-ladies', label: 'Quran Classes for Ladies (Female Teachers)', group: 'Quran Programs', icon: Heart },
    { id: 'quran-for-beginners', label: 'Quran for Adult Beginners', group: 'Quran Programs', icon: BookOpen },
    { id: 'quran-classes-for-adults', label: 'Quran Classes for Adults & Professionals', group: 'Quran Programs', icon: GraduationCap },
    { id: 'quran-translation', label: 'Quran Translation Course', group: 'Quran Programs', icon: FileText },
    { id: 'quran-tafseer', label: 'Quran Tafseer Course', group: 'Quran Programs', icon: BookOpen },
    { id: 'online-islamic-studies', label: 'Online Islamic Studies', group: 'Quran Programs', icon: GraduationCap },
    { id: 'quranic-arabic', label: 'Quranic Arabic & Grammar', group: 'Quran Programs', icon: Layers },
    { id: 'salah-and-duas', label: 'Salah & Daily Masnoon Duas', group: 'Quran Programs', icon: Heart },
    { id: 'community', label: '2. Facebook Group & Community', group: 'Community', icon: Facebook },
    { id: 'about', label: '3. About Academy & Founder', group: 'Core', icon: Heart },
    { id: 'courses', label: '4. All Courses Catalog', group: 'Academic', icon: GraduationCap },
    { id: 'teachers', label: '5. Qualified Teachers & Qaris', group: 'Academic', icon: Award },
    { id: 'zaitoon-traders', label: '6. ZT (Zaitoon Traders)', group: 'Ecosystem', icon: ShoppingBag },
    { id: 'marriage-bureau', label: '7. Shaheen Marriage Bureau', group: 'Ecosystem', icon: Heart },
    { id: 'growth-hub', label: '8. Growth & Earning Hub', group: 'Monetization', icon: TrendingUp },
    { id: 'ad-manager', label: '9. AI Ad Studio & Social Hub', group: 'Monetization', icon: Megaphone },
    { id: 'student-portal', label: '10. Student Portal', group: 'Portals', icon: UserCheck },
    { id: 'parent-portal', label: '11. Parent Portal', group: 'Portals', icon: Shield },
    { id: 'admissions', label: '12. Online Admissions & Free Trial', group: 'Academic', icon: FileText },
    { id: 'fee-payment', label: '13. Fee & EasyPaisa (03447956085)', group: 'Finance', icon: CreditCard },
    { id: 'live-classes', label: '14. Live Classes Studio', group: 'Academic', icon: Calendar },
    { id: 'certificates', label: '15. Certificates Verification', group: 'Academic', icon: Award },
    { id: 'gallery', label: '16. Photo & Video Gallery', group: 'Media', icon: ImageIcon },
    { id: 'blog', label: '17. Islamic Articles & Blog', group: 'Media', icon: FileText },
    { id: 'testimonials', label: '18. Student Testimonials', group: 'Social', icon: Sparkles },
    { id: 'faq', label: '19. Frequently Asked Questions', group: 'Support', icon: HelpCircle },
    { id: 'contact', label: '20. Contact Us (Rawalpindi HQ)', group: 'Support', icon: MapPin },
    { id: 'careers', label: '21. Teacher Careers Application', group: 'Support', icon: Briefcase },
    { id: 'privacy', label: '22. Privacy Policy', group: 'Legal', icon: Shield },
    { id: 'terms', label: '23. Terms & Conditions', group: 'Legal', icon: FileText },
    { id: 'donations', label: '24. Sadaqah Jariyah & Donations', group: 'Finance', icon: Heart },
    { id: 'help-support', label: '25. Help Desk & Support Desk', group: 'Support', icon: MessageSquare },
    { id: 'admin-portal', label: '★ Super Admin & Owner CMS', group: 'Management', icon: Sparkles },
  ];

  return (
    <header className="sticky top-0 z-50 shadow-2xl">
      {/* Ecosystem Top Switcher Bar */}
      <EcosystemBar />

      {/* Top Memorial Ribbon */}
      <MemorialBanner compact />

      {/* Contact & Quick Info Header */}
      <div className="bg-red-950 text-red-100 py-1.5 px-4 text-xs border-b border-red-900">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1.5 text-amber-300 font-medium">
              <MapPin className="w-3.5 h-3.5" />
              <span>HQ: {siteSettings.headOfficeCity}, Pakistan</span>
            </span>
            <span className="hidden sm:inline text-red-400">•</span>
            <a
              href={`tel:${siteSettings.contactNumber}`}
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>Call: {siteSettings.contactNumber}</span>
            </a>
            <span className="hidden sm:inline text-red-400">•</span>
            <a
              href={`https://wa.me/92${siteSettings.whatsappNumber.replace(/^0/, '')}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-emerald-300 font-semibold hover:text-emerald-200 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp: {siteSettings.whatsappNumber}</span>
            </a>
          </div>

          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <div className="flex items-center gap-1 bg-red-900/80 px-2 py-0.5 rounded text-[11px] border border-red-800">
              <Globe className="w-3 h-3 text-amber-300" />
              <button
                onClick={() => setLanguage('en')}
                className={`px-1 rounded ${language === 'en' ? 'bg-amber-500 text-red-950 font-bold' : 'hover:text-amber-200'}`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('ur')}
                className={`px-1 rounded ${language === 'ur' ? 'bg-amber-500 text-red-950 font-bold' : 'hover:text-amber-200'}`}
              >
                اردو
              </button>
              <button
                onClick={() => setLanguage('ar')}
                className={`px-1 rounded ${language === 'ar' ? 'bg-amber-500 text-red-950 font-bold' : 'hover:text-amber-200'}`}
              >
                عربي
              </button>
            </div>

            {/* Quick Role Switcher */}
            <div className="flex items-center gap-1 text-[11px]">
              <span className="text-red-300 hidden md:inline">View as:</span>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as UserRole)}
                className="bg-red-900 text-amber-200 border border-red-800 rounded px-1.5 py-0.5 text-[11px] focus:outline-none font-semibold"
              >
                <option value="guest">Guest</option>
                <option value="student">Student</option>
                <option value="parent">Parent</option>
                <option value="teacher">Teacher</option>
                <option value="admin">Admin Panel</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-red-900 text-white border-b-2 border-amber-500/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo & Brand Title */}
            <button
              onClick={() => setActivePage('home')}
              className="flex items-center gap-3 text-left group focus:outline-none"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-red-950 shadow-lg group-hover:scale-105 transition-transform border border-amber-200">
                <BookOpen className="w-7 h-7 font-bold" />
              </div>
              <div>
                <div className="text-lg sm:text-xl md:text-2xl font-serif font-bold text-amber-200 tracking-tight leading-tight group-hover:text-white transition-colors">
                  Shaheen Al Zaitoon
                </div>
                <div className="text-xs text-amber-300/90 tracking-wide font-serif">
                  Online Quran Academy • Rawalpindi
                </div>
              </div>
            </button>

            {/* Search Bar (Desktop) */}
            <div className="hidden lg:flex items-center relative max-w-xs w-full">
              <input
                type="text"
                placeholder="Search courses, Qaris, fees..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-red-950/80 text-amber-100 placeholder-red-300/60 pl-9 pr-3 py-1.5 rounded-full text-xs border border-red-700/80 focus:outline-none focus:border-amber-400"
              />
              <Search className="w-4 h-4 text-amber-400 absolute left-3 top-2" />
            </div>

            {/* Nav Menu Items (Desktop) */}
            <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
              {mainNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = activePage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActivePage(item.id)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-amber-500 text-red-950 font-bold shadow-md'
                        : 'text-red-100 hover:bg-red-800 hover:text-amber-200'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-red-950' : 'text-amber-400'}`} />
                    <span>{language === 'ur' && item.labelUrdu ? item.labelUrdu : item.label}</span>
                  </button>
                );
              })}

              {/* 20-Pages Mega Selector Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setPagesMenuOpen(!pagesMenuOpen)}
                  className={`flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                    pagesMenuOpen
                      ? 'bg-amber-400 text-red-950'
                      : 'bg-red-950 text-amber-300 border border-amber-500/40 hover:bg-red-800'
                  }`}
                >
                  <Layers className="w-4 h-4 text-amber-300" />
                  <span>All 20 Pages</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>

                {pagesMenuOpen && (
                  <div
                    className="absolute right-0 mt-2 w-80 bg-red-950 border-2 border-amber-500/50 rounded-xl shadow-2xl p-3 z-50 max-h-[80vh] overflow-y-auto"
                    onMouseLeave={() => setPagesMenuOpen(false)}
                  >
                    <div className="text-xs font-bold uppercase tracking-wider text-amber-300 px-2 py-1 mb-2 border-b border-red-800 flex items-center justify-between">
                      <span>Academy Directory</span>
                      <span className="text-[10px] text-red-300">20 Pages</span>
                    </div>

                    <div className="grid grid-cols-1 gap-1">
                      {allPageLinks.map((p) => {
                        const Icon = p.icon;
                        const isCurrent = activePage === p.id;
                        return (
                          <button
                            key={p.id}
                            onClick={() => {
                              setActivePage(p.id);
                              setPagesMenuOpen(false);
                            }}
                            className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs text-left w-full transition-colors ${
                              isCurrent
                                ? 'bg-amber-500 text-red-950 font-bold'
                                : 'text-red-100 hover:bg-red-900 hover:text-amber-200'
                            }`}
                          >
                            <Icon className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                            <span className="truncate">{p.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Action Button */}
            <div className="hidden lg:flex items-center gap-2">
              <button
                onClick={() => setActivePage('admissions')}
                className="bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-300 hover:to-amber-500 text-red-950 font-extrabold text-xs px-4 py-2.5 rounded-xl shadow-lg border border-amber-200 flex items-center gap-1.5 transition-all transform hover:scale-105"
              >
                <Sparkles className="w-4 h-4 text-red-950" />
                <span>Apply / Free Trial</span>
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={() => setActivePage('admissions')}
                className="bg-amber-400 text-red-950 font-bold text-xs px-2.5 py-1.5 rounded-lg"
              >
                Free Trial
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-amber-300 hover:bg-red-800"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu slideout */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-red-950 border-t border-red-800 px-4 pt-3 pb-6 space-y-2">
            <div className="mb-3">
              <input
                type="text"
                placeholder="Search Academy..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-red-900 text-amber-100 placeholder-red-300/60 px-3 py-2 rounded-lg text-xs border border-red-700"
              />
            </div>

            <div className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-2">
              Page Navigator (20 Pages)
            </div>

            <div className="grid grid-cols-1 gap-1 max-h-80 overflow-y-auto pr-1">
              {allPageLinks.map((p) => {
                const Icon = p.icon;
                const isCurrent = activePage === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => {
                      setActivePage(p.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-left w-full ${
                      isCurrent ? 'bg-amber-500 text-red-950 font-bold' : 'text-red-100 hover:bg-red-900'
                    }`}
                  >
                    <Icon className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{p.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
