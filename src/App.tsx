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
import { WalletPage } from './pages/WalletPage';
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
import { GoogleEcosystemPage } from './pages/GoogleEcosystemPage';
import { CookieConsentBanner } from './components/CookieConsentBanner';
import { AppDownloadBanner } from './components/AppDownloadBanner';
import { OfflineIndicator } from './components/OfflineIndicator';
import { PWAInstallButton } from './components/PWAInstallButton';
import { SeoCoursePage } from './pages/SeoCoursePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { seoCoursesList } from './data/seoCoursesData';
import { getPageUrl } from './utils/routing';

const AppContent: React.FC = () => {
  const { activePage, setActivePage, language } = useAcademy();

  // Dynamic SEO & Title Update + Address bar synchronization
  useEffect(() => {
    updatePageSeo(activePage, language);
    // Smooth scroll to top on page change
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Sync address bar URL cleanly without page reload
    if (activePage !== '404') {
      const targetPath = getPageUrl(activePage);
      if (window.location.pathname !== targetPath) {
        window.history.replaceState({ page: activePage }, '', targetPath);
      }
    }
  }, [activePage, language]);

  const renderPage = () => {
    if (activePage === '404') {
      return <NotFoundPage />;
    }

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
      case 'google-ecosystem':
        return <GoogleEcosystemPage />;
      case 'student-portal':
        return <StudentPortalPage />;
      case 'parent-portal':
        return <ParentPortalPage />;
      case 'admissions':
        return <AdmissionsPage />;
      case 'fee-payment':
        return <FeePaymentPage />;
      case 'wallet':
        return <WalletPage />;
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
        return <NotFoundPage />;
    }
  };

  return (
    <div className="min-h-screen bg-red-950 text-white font-sans flex flex-col justify-between selection:bg-amber-400 selection:text-red-950">
      <Navbar />
      <main className="flex-1">{renderPage()}</main>
      <AppDownloadBanner />
      <Footer />
      <EnrollmentModal />
      <AIChatAssistant />
      <WhatsAppWidget />
      <PWAInstallButton variant="floating" />
      <OfflineIndicator />
      <CookieConsentBanner />
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
