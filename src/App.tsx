import React from 'react';
import { AcademyProvider, useAcademy } from './context/AcademyContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { EnrollmentModal } from './components/EnrollmentModal';
import { AIChatAssistant } from './components/AIChatAssistant';
import { WhatsAppWidget } from './components/WhatsAppWidget';

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

const AppContent: React.FC = () => {
  const { activePage } = useAcademy();

  const renderPage = () => {
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
