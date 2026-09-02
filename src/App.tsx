import React, { useEffect } from 'react';
import { AcademyProvider, useAcademy } from './context/AcademyContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { EnrollmentModal } from './components/EnrollmentModal';
import { AIChatAssistant } from './components/AIChatAssistant';
import { WhatsAppWidget } from './components/WhatsAppWidget';
import { updatePageSeo } from './utils/seo';
import { PageId } from './types';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { CoursesPage } from './pages/CoursesPage';
import { TeachersPage } from './pages/TeachersPage';
import { StudentPortalPage } from './pages/StudentPortalPage';
import { ParentPortalPage } from './pages/ParentPortalPage';
import { AdmissionsPage } from './pages/AdmissionsPage';
import { FeePaymentPage } from './pages/FeePaymentPage';
import { LiveClassesPage } from './pages/LiveClassesPage';
import { CertificatesPage } from './pages/CertificatesPage';
import { GalleryPage } from './pages/GalleryPage';
import { BlogPage } from './pages/BlogPage';
import { TestimonialsPage } from './pages/TestimonialsPage';
import { FAQPage } from './pages/FAQPage';
import { ContactPage } from './pages/ContactPage';
import { CareersPage } from './pages/CareersPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { DonationsPage } from './pages/DonationsPage';
import { HelpSupportPage } from './pages/HelpSupportPage';
import { AdminPortalPage } from './pages/AdminPortalPage';
import { GrowthHubPage } from './pages/GrowthHubPage';
import { ZaitoonTradersPage } from './pages/ZaitoonTradersPage';
import { MarriageBureauPage } from './pages/MarriageBureauPage';
import { AdManagerPage } from './pages/AdManagerPage';
import { CommunityPage } from './pages/CommunityPage';
import { SeoCoursePage } from './pages/SeoCoursePage';
import { seoCoursesList } from './data/seoCoursesData';

const AppContent: React.FC = () => {
  const { activePage, setActivePage, language } = useAcademy();

  // Dynamic SEO & Title Update
  useEffect(() => {
    updatePageSeo(activePage, language);
    // Smooth scroll to top on page change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage, language]);

  // Sync hash routing on initial load and popstate
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PageId;
      if (hash && hash !== activePage) {
        const validPages: PageId[] = [
          'home',
          'about',
          'courses',
          'teachers',
          'student-portal',
          'parent-portal',
          'admissions',
          'fee-payment',
          'live-classes',
          'certificates',
          'gallery',
          'blog',
          'testimonials',
          'faq',
          'contact',
          'careers',
          'privacy',
          'terms',
          'donations',
          'help-support',
          'admin-portal',
          'growth-hub',
          'zaitoon-traders',
          'marriage-bureau',
          'ad-manager',
          'community',
          'online-quran-classes',
          'noorani-qaida',
          'quran-reading',
          'online-tajweed-classes',
          'online-hifz-quran-classes',
          'quran-translation',
          'quran-tafseer',
          'quran-classes-for-kids',
          'quran-for-beginners',
          'quran-classes-for-adults',
          'quran-classes-for-ladies',
          'online-islamic-studies',
          'quranic-arabic',
          'salah-and-duas',
        ];
        if (validPages.includes(hash)) {
          setActivePage(hash);
        }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [setActivePage]);

  const renderPage = () => {
    // Check if the page is one of the SEO course landing pages
    if (seoCoursesList[activePage]) {
      return <SeoCoursePage courseData={seoCoursesList[activePage]} />;
    }

    switch (activePage) {
      case 'home':
        return <HomePage />;
      case 'about':
        return <AboutPage />;
      case 'courses':
        return <CoursesPage />;
      case 'teachers':
        return <TeachersPage />;
      case 'zaitoon-traders':
        return <ZaitoonTradersPage />;
      case 'marriage-bureau':
        return <MarriageBureauPage />;
      case 'growth-hub':
        return <GrowthHubPage />;
      case 'ad-manager':
        return <AdManagerPage />;
      case 'community':
        return <CommunityPage />;
      case 'student-portal':
        return <StudentPortalPage />;
      case 'parent-portal':
        return <ParentPortalPage />;
      case 'admissions':
        return <AdmissionsPage />;
      case 'fee-payment':
        return <FeePaymentPage />;
      case 'live-classes':
        return <LiveClassesPage />;
      case 'certificates':
        return <CertificatesPage />;
      case 'gallery':
        return <GalleryPage />;
      case 'blog':
        return <BlogPage />;
      case 'testimonials':
        return <TestimonialsPage />;
      case 'faq':
        return <FAQPage />;
      case 'contact':
        return <ContactPage />;
      case 'careers':
        return <CareersPage />;
      case 'privacy':
        return <PrivacyPage />;
      case 'terms':
        return <TermsPage />;
      case 'donations':
        return <DonationsPage />;
      case 'help-support':
        return <HelpSupportPage />;
      case 'admin-portal':
        return <AdminPortalPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-red-950 text-white font-sans flex flex-col justify-between selection:bg-amber-400 selection:text-red-950">
      <Navbar />
      <main className="flex-1">{renderPage()}</main>
      <Footer />
      <EnrollmentModal />
      <AIChatAssistant />
      <WhatsAppWidget />
    </div>
  );
};


export function App() {
  return (
    <AcademyProvider>
      <AppContent />
    </AcademyProvider>
  );
}

export default App;
