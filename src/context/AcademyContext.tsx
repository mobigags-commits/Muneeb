import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  initialAnnouncements,
  initialBlogPosts,
  initialBranches,
  initialCertificates,
  initialCourses,
  initialPayments,
  initialSiteSettings,
  initialStudentRecords,
  initialTeachers,
  initialZTProducts,
  initialMatrimonialProfiles,
  initialAdCampaigns,
  initialReferrals,
  initialAffiliatePartners,
  initialSocialAccounts,
  initialAdPricingPlans,
} from '../data/initialData';
import {
  Announcement,
  BlogPost,
  Branch,
  CertificateRecord,
  Course,
  Language,
  PageId,
  PaymentReceipt,
  SiteSettings,
  StudentRecord,
  Teacher,
  UserRole,
  ZTProduct,
  MatrimonialProfile,
  AdCampaign,
  ReferralRecord,
  AffiliatePartner,
  SocialAccount,
  AdPricingPlan,
} from '../types';

interface AcademyContextType {
  activePage: PageId;
  setActivePage: (page: PageId) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  role: UserRole;
  setRole: (role: UserRole) => void;
  siteSettings: SiteSettings;
  updateSiteSettings: (settings: Partial<SiteSettings>) => void;
  courses: Course[];
  addCourse: (course: Course) => void;
  updateCourse: (id: string, updated: Partial<Course>) => void;
  teachers: Teacher[];
  addTeacher: (teacher: Teacher) => void;
  branches: Branch[];
  addBranch: (branch: Branch) => void;
  students: StudentRecord[];
  addStudent: (student: StudentRecord) => void;
  payments: PaymentReceipt[];
  addPayment: (payment: PaymentReceipt) => void;
  updatePaymentStatus: (id: string, status: 'Approved' | 'Pending Verification' | 'Rejected') => void;
  announcements: Announcement[];
  addAnnouncement: (announcement: Announcement) => void;
  blogPosts: BlogPost[];
  addBlogPost: (post: BlogPost) => void;
  certificates: CertificateRecord[];
  selectedCourseForEnroll: Course | null;
  setSelectedCourseForEnroll: (course: Course | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // New Global Growth, Ads & Earning Ecosystem State
  ztProducts: ZTProduct[];
  addZTProduct: (prod: ZTProduct) => void;
  matrimonialProfiles: MatrimonialProfile[];
  addMatrimonialProfile: (profile: MatrimonialProfile) => void;
  adCampaigns: AdCampaign[];
  addAdCampaign: (ad: AdCampaign) => void;
  updateAdCampaign: (id: string, updated: Partial<AdCampaign>) => void;
  toggleAdStatus: (id: string) => void;
  deleteAdCampaign: (id: string) => void;
  recordAdClick: (id: string) => void;
  recordAdImpression: (id: string) => void;
  recordAdLead: (id: string) => void;
  socialAccounts: SocialAccount[];
  toggleSocialConnection: (id: string) => void;
  toggleSocialAutoPost: (id: string) => void;
  addSocialAccount: (acc: SocialAccount) => void;
  adPricingPlans: AdPricingPlan[];
  referrals: ReferralRecord[];
  addReferral: (ref: ReferralRecord) => void;
  affiliatePartners: AffiliatePartner[];
  addAffiliatePartner: (aff: AffiliatePartner) => void;
}

const AcademyContext = createContext<AcademyContextType | undefined>(undefined);

export const AcademyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activePage, setActivePageState] = useState<PageId>(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const hash = window.location.hash.replace('#', '') as PageId;
      if (hash) return hash;
    }
    return 'home';
  });

  const setActivePage = (page: PageId) => {
    setActivePageState(page);
    if (typeof window !== 'undefined') {
      if (page === 'home') {
        if (window.location.hash) {
          history.pushState(null, '', window.location.pathname + window.location.search);
        }
      } else {
        window.location.hash = page;
      }
    }
  };

  const [language, setLanguage] = useState<Language>('en');
  const [role, setRole] = useState<UserRole>('guest');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Local storage persisted state
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() => {
    const saved = localStorage.getItem('sz_site_settings');
    return saved ? JSON.parse(saved) : initialSiteSettings;
  });

  const [courses, setCourses] = useState<Course[]>(() => {
    const saved = localStorage.getItem('sz_courses');
    return saved ? JSON.parse(saved) : initialCourses;
  });

  const [teachers, setTeachers] = useState<Teacher[]>(() => {
    const saved = localStorage.getItem('sz_teachers');
    return saved ? JSON.parse(saved) : initialTeachers;
  });

  const [branches, setBranches] = useState<Branch[]>(() => {
    const saved = localStorage.getItem('sz_branches');
    return saved ? JSON.parse(saved) : initialBranches;
  });

  const [students, setStudents] = useState<StudentRecord[]>(() => {
    const saved = localStorage.getItem('sz_students');
    return saved ? JSON.parse(saved) : initialStudentRecords;
  });

  const [payments, setPayments] = useState<PaymentReceipt[]>(() => {
    const saved = localStorage.getItem('sz_payments');
    return saved ? JSON.parse(saved) : initialPayments;
  });

  const [announcements, setAnnouncements] = useState<Announcement[]>(() => {
    const saved = localStorage.getItem('sz_announcements');
    return saved ? JSON.parse(saved) : initialAnnouncements;
  });

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => {
    const saved = localStorage.getItem('sz_blog_posts');
    return saved ? JSON.parse(saved) : initialBlogPosts;
  });

  const [certificates, setCertificates] = useState<CertificateRecord[]>(() => {
    const saved = localStorage.getItem('sz_certificates');
    return saved ? JSON.parse(saved) : initialCertificates;
  });

  // Ecosystem state
  const [ztProducts, setZtProducts] = useState<ZTProduct[]>(() => {
    const saved = localStorage.getItem('sz_zt_products');
    return saved ? JSON.parse(saved) : initialZTProducts;
  });

  const [matrimonialProfiles, setMatrimonialProfiles] = useState<MatrimonialProfile[]>(() => {
    const saved = localStorage.getItem('sz_matrimonial');
    return saved ? JSON.parse(saved) : initialMatrimonialProfiles;
  });

  const [adCampaigns, setAdCampaigns] = useState<AdCampaign[]>(() => {
    const saved = localStorage.getItem('sz_ads');
    return saved ? JSON.parse(saved) : initialAdCampaigns;
  });

  const [referrals, setReferrals] = useState<ReferralRecord[]>(() => {
    const saved = localStorage.getItem('sz_referrals');
    return saved ? JSON.parse(saved) : initialReferrals;
  });

  const [affiliatePartners, setAffiliatePartners] = useState<AffiliatePartner[]>(() => {
    const saved = localStorage.getItem('sz_affiliates');
    return saved ? JSON.parse(saved) : initialAffiliatePartners;
  });

  const [socialAccounts, setSocialAccounts] = useState<SocialAccount[]>(() => {
    const saved = localStorage.getItem('sz_social_accounts');
    return saved ? JSON.parse(saved) : initialSocialAccounts;
  });

  const [adPricingPlans] = useState<AdPricingPlan[]>(initialAdPricingPlans);

  const [selectedCourseForEnroll, setSelectedCourseForEnroll] = useState<Course | null>(null);

  useEffect(() => {
    localStorage.setItem('sz_site_settings', JSON.stringify(siteSettings));
  }, [siteSettings]);

  useEffect(() => {
    localStorage.setItem('sz_courses', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem('sz_teachers', JSON.stringify(teachers));
  }, [teachers]);

  useEffect(() => {
    localStorage.setItem('sz_branches', JSON.stringify(branches));
  }, [branches]);

  useEffect(() => {
    localStorage.setItem('sz_students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('sz_payments', JSON.stringify(payments));
  }, [payments]);

  useEffect(() => {
    localStorage.setItem('sz_announcements', JSON.stringify(announcements));
  }, [announcements]);

  useEffect(() => {
    localStorage.setItem('sz_blog_posts', JSON.stringify(blogPosts));
  }, [blogPosts]);

  useEffect(() => {
    localStorage.setItem('sz_certificates', JSON.stringify(certificates));
  }, [certificates]);

  useEffect(() => {
    localStorage.setItem('sz_zt_products', JSON.stringify(ztProducts));
  }, [ztProducts]);

  useEffect(() => {
    localStorage.setItem('sz_matrimonial', JSON.stringify(matrimonialProfiles));
  }, [matrimonialProfiles]);

  useEffect(() => {
    localStorage.setItem('sz_ads', JSON.stringify(adCampaigns));
  }, [adCampaigns]);

  useEffect(() => {
    localStorage.setItem('sz_referrals', JSON.stringify(referrals));
  }, [referrals]);

  useEffect(() => {
    localStorage.setItem('sz_affiliates', JSON.stringify(affiliatePartners));
  }, [affiliatePartners]);

  useEffect(() => {
    localStorage.setItem('sz_social_accounts', JSON.stringify(socialAccounts));
  }, [socialAccounts]);

  const updateSiteSettings = (settings: Partial<SiteSettings>) => {
    setSiteSettings((prev) => ({ ...prev, ...settings }));
  };

  const addCourse = (course: Course) => {
    setCourses((prev) => [course, ...prev]);
  };

  const updateCourse = (id: string, updated: Partial<Course>) => {
    setCourses((prev) => prev.map((c) => (c.id === id ? { ...c, ...updated } : c)));
  };

  const addTeacher = (teacher: Teacher) => {
    setTeachers((prev) => [teacher, ...prev]);
  };

  const addBranch = (branch: Branch) => {
    setBranches((prev) => [branch, ...prev]);
  };

  const addStudent = (student: StudentRecord) => {
    setStudents((prev) => [student, ...prev]);
  };

  const addPayment = (payment: PaymentReceipt) => {
    setPayments((prev) => [payment, ...prev]);
  };

  const updatePaymentStatus = (id: string, status: 'Approved' | 'Pending Verification' | 'Rejected') => {
    setPayments((prev) => prev.map((p) => (p.id === id ? { ...p, status } : p)));
  };

  const addAnnouncement = (announcement: Announcement) => {
    setAnnouncements((prev) => [announcement, ...prev]);
  };

  const addBlogPost = (post: BlogPost) => {
    setBlogPosts((prev) => [post, ...prev]);
  };

  const addZTProduct = (prod: ZTProduct) => {
    setZtProducts((prev) => [prod, ...prev]);
  };

  const addMatrimonialProfile = (profile: MatrimonialProfile) => {
    setMatrimonialProfiles((prev) => [profile, ...prev]);
  };

  const addAdCampaign = (ad: AdCampaign) => {
    setAdCampaigns((prev) => [ad, ...prev]);
  };

  const updateAdCampaign = (id: string, updated: Partial<AdCampaign>) => {
    setAdCampaigns((prev) => prev.map((ad) => (ad.id === id ? { ...ad, ...updated } : ad)));
  };

  const toggleAdStatus = (id: string) => {
    setAdCampaigns((prev) =>
      prev.map((ad) => {
        if (ad.id === id) {
          const nextStatus = ad.status === 'Active' ? 'Paused' : 'Active';
          return { ...ad, status: nextStatus };
        }
        return ad;
      })
    );
  };

  const deleteAdCampaign = (id: string) => {
    setAdCampaigns((prev) => prev.filter((ad) => ad.id !== id));
  };

  const recordAdClick = (id: string) => {
    setAdCampaigns((prev) =>
      prev.map((ad) => (ad.id === id ? { ...ad, clicks: ad.clicks + 1 } : ad))
    );
  };

  const recordAdImpression = (id: string) => {
    setAdCampaigns((prev) =>
      prev.map((ad) => (ad.id === id ? { ...ad, impressions: ad.impressions + 1 } : ad))
    );
  };

  const recordAdLead = (id: string) => {
    setAdCampaigns((prev) =>
      prev.map((ad) => (ad.id === id ? { ...ad, leads: (ad.leads || 0) + 1 } : ad))
    );
  };

  const toggleSocialConnection = (id: string) => {
    setSocialAccounts((prev) =>
      prev.map((acc) => (acc.id === id ? { ...acc, isConnected: !acc.isConnected } : acc))
    );
  };

  const toggleSocialAutoPost = (id: string) => {
    setSocialAccounts((prev) =>
      prev.map((acc) => (acc.id === id ? { ...acc, autoPostEnabled: !acc.autoPostEnabled } : acc))
    );
  };

  const addSocialAccount = (acc: SocialAccount) => {
    setSocialAccounts((prev) => [acc, ...prev]);
  };

  const addReferral = (ref: ReferralRecord) => {
    setReferrals((prev) => [ref, ...prev]);
  };

  const addAffiliatePartner = (aff: AffiliatePartner) => {
    setAffiliatePartners((prev) => [aff, ...prev]);
  };

  const handlePageChange = (page: PageId) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AcademyContext.Provider
      value={{
        activePage,
        setActivePage: handlePageChange,
        language,
        setLanguage,
        role,
        setRole,
        siteSettings,
        updateSiteSettings,
        courses,
        addCourse,
        updateCourse,
        teachers,
        addTeacher,
        branches,
        addBranch,
        students,
        addStudent,
        payments,
        addPayment,
        updatePaymentStatus,
        announcements,
        addAnnouncement,
        blogPosts,
        addBlogPost,
        certificates,
        selectedCourseForEnroll,
        setSelectedCourseForEnroll,
        searchQuery,
        setSearchQuery,
        ztProducts,
        addZTProduct,
        matrimonialProfiles,
        addMatrimonialProfile,
        adCampaigns,
        addAdCampaign,
        updateAdCampaign,
        toggleAdStatus,
        deleteAdCampaign,
        recordAdClick,
        recordAdImpression,
        recordAdLead,
        socialAccounts,
        toggleSocialConnection,
        toggleSocialAutoPost,
        addSocialAccount,
        adPricingPlans,
        referrals,
        addReferral,
        affiliatePartners,
        addAffiliatePartner,
      }}
    >
      {children}
    </AcademyContext.Provider>
  );
};

export const useAcademy = () => {
  const context = useContext(AcademyContext);
  if (!context) {
    throw new Error('useAcademy must be used within an AcademyProvider');
  }
  return context;
};

