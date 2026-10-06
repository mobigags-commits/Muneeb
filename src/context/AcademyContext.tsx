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
  initialWalletTransactions,
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
  TeacherApplication,
  ContactMessage,
  DonationRecord,
  NewsletterSubscriber,
  WalletTransaction,
} from '../types';
import { getPageFromLocation, getPageUrl } from '../utils/routing';
import * as api from '../utils/apiClient';

export type CloudSyncStatus = 'syncing' | 'synced' | 'offline' | 'error';

interface AcademyContextType {
  activePage: PageId;
  setActivePage: (page: PageId) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  role: UserRole;
  setRole: (role: UserRole) => void;
  
  // Cloud Database Sync Status
  cloudSyncStatus: CloudSyncStatus;
  lastCloudSync: string | null;
  refreshFromCloud: () => Promise<void>;

  // Site Settings
  siteSettings: SiteSettings;
  updateSiteSettings: (settings: Partial<SiteSettings>) => Promise<boolean>;

  // Courses
  courses: Course[];
  addCourse: (course: Course) => Promise<boolean>;
  updateCourse: (id: string, updated: Partial<Course>) => Promise<boolean>;
  deleteCourse: (id: string) => Promise<boolean>;

  // Teachers & Staff
  teachers: Teacher[];
  addTeacher: (teacher: Teacher) => void;

  // Branches
  branches: Branch[];
  addBranch: (branch: Branch) => void;

  // Students & Admissions
  students: StudentRecord[];
  addStudent: (student: StudentRecord) => Promise<boolean>;

  // Payments & Tuition Receipts
  payments: PaymentReceipt[];
  addPayment: (payment: PaymentReceipt) => Promise<boolean>;
  updatePaymentStatus: (id: string, status: 'Approved' | 'Pending Verification' | 'Rejected') => Promise<boolean>;

  // Announcements & Blog
  announcements: Announcement[];
  addAnnouncement: (announcement: Announcement) => void;
  blogPosts: BlogPost[];
  addBlogPost: (post: BlogPost) => void;
  certificates: CertificateRecord[];

  selectedCourseForEnroll: Course | null;
  setSelectedCourseForEnroll: (course: Course | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // ZT Marketplace
  ztProducts: ZTProduct[];
  addZTProduct: (prod: ZTProduct) => Promise<boolean>;
  updateZTProduct: (id: string, updated: Partial<ZTProduct>) => Promise<boolean>;
  deleteZTProduct: (id: string) => Promise<boolean>;

  // Nikah & Matrimonial
  matrimonialProfiles: MatrimonialProfile[];
  addMatrimonialProfile: (profile: MatrimonialProfile) => Promise<boolean>;
  deleteMatrimonialProfile: (id: string) => Promise<boolean>;

  // Ads Studio & Campaigns
  adCampaigns: AdCampaign[];
  addAdCampaign: (ad: AdCampaign) => Promise<boolean>;
  updateAdCampaign: (id: string, updated: Partial<AdCampaign>) => Promise<boolean>;
  toggleAdStatus: (id: string) => void;
  deleteAdCampaign: (id: string) => Promise<boolean>;
  recordAdClick: (id: string) => void;
  recordAdImpression: (id: string) => void;
  recordAdLead: (id: string) => void;

  // Social & Referrals
  socialAccounts: SocialAccount[];
  toggleSocialConnection: (id: string) => void;
  toggleSocialAutoPost: (id: string) => void;
  addSocialAccount: (acc: SocialAccount) => Promise<boolean>;
  adPricingPlans: AdPricingPlan[];
  referrals: ReferralRecord[];
  addReferral: (ref: ReferralRecord) => Promise<boolean>;
  affiliatePartners: AffiliatePartner[];
  addAffiliatePartner: (aff: AffiliatePartner) => Promise<boolean>;

  // Career Applications (Teachers / Staff)
  applications: TeacherApplication[];
  addApplication: (app: TeacherApplication) => Promise<boolean>;
  updateApplicationStatus: (id: string, status: TeacherApplication['status']) => Promise<boolean>;

  // Contact Desk
  contactMessages: ContactMessage[];
  addContactMessage: (msg: ContactMessage) => Promise<boolean>;
  markContactMessageReplied: (id: string) => Promise<boolean>;

  // Donations
  donations: DonationRecord[];
  addDonation: (donation: DonationRecord) => Promise<boolean>;

  // Newsletter
  subscribers: NewsletterSubscriber[];
  addNewsletterSubscriber: (email: string) => Promise<boolean>;

  // Digital Wallet, Deposit & Withdraw
  walletTransactions: WalletTransaction[];
  userWalletBalance: number;
  addDeposit: (deposit: Omit<WalletTransaction, 'id' | 'type' | 'date' | 'status'> & Partial<WalletTransaction>) => Promise<boolean>;
  requestWithdrawal: (withdrawal: Omit<WalletTransaction, 'id' | 'type' | 'date' | 'status'> & Partial<WalletTransaction>) => Promise<boolean>;
  updateWalletTransactionStatus: (id: string, status: WalletTransaction['status'], adminResponse?: string) => Promise<boolean>;
  walletTabInitial: 'deposit' | 'withdraw' | 'history';
  setWalletTabInitial: (tab: 'deposit' | 'withdraw' | 'history') => void;
}

const AcademyContext = createContext<AcademyContextType | undefined>(undefined);

export const AcademyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activePage, setActivePageState] = useState<PageId>(() => {
    if (typeof window !== 'undefined') {
      return getPageFromLocation(window.location.pathname, window.location.hash);
    }
    return 'home';
  });

  const setActivePage = (page: PageId, replace: boolean = false) => {
    setActivePageState(page);
    if (typeof window !== 'undefined') {
      const targetPath = getPageUrl(page);
      if (window.location.pathname !== targetPath) {
        if (replace) {
          window.history.replaceState({ page }, '', targetPath);
        } else {
          window.history.pushState({ page }, '', targetPath);
        }
      }
    }
  };

  // Keep activePage in sync with browser forward/back buttons and hash changes
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleBrowserLocationChange = () => {
      const detectedPage = getPageFromLocation(window.location.pathname, window.location.hash);
      setActivePageState(detectedPage);
    };

    window.addEventListener('popstate', handleBrowserLocationChange);
    window.addEventListener('hashchange', handleBrowserLocationChange);
    return () => {
      window.removeEventListener('popstate', handleBrowserLocationChange);
      window.removeEventListener('hashchange', handleBrowserLocationChange);
    };
  }, []);

  const [language, setLanguage] = useState<Language>('en');
  const [role, setRole] = useState<UserRole>('guest');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Cloud database synchronization indicators
  const [cloudSyncStatus, setCloudSyncStatus] = useState<CloudSyncStatus>('syncing');
  const [lastCloudSync, setLastCloudSync] = useState<string | null>(null);

  // App data state initialized from offline cache or defaults
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() => {
    try {
      const saved = localStorage.getItem('sz_site_settings_v3');
      if (saved) return { ...initialSiteSettings, ...JSON.parse(saved) };
    } catch (e) {}
    return initialSiteSettings;
  });

  const [courses, setCourses] = useState<Course[]>(() => {
    try {
      const saved = localStorage.getItem('sz_courses_v6');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return initialCourses;
  });

  const [teachers, setTeachers] = useState<Teacher[]>(() => {
    try {
      const saved = localStorage.getItem('sz_teachers');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return initialTeachers;
  });

  const [branches, setBranches] = useState<Branch[]>(() => {
    try {
      const saved = localStorage.getItem('sz_branches');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return initialBranches;
  });

  const [students, setStudents] = useState<StudentRecord[]>(() => {
    try {
      const saved = localStorage.getItem('sz_students');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return initialStudentRecords;
  });

  const [payments, setPayments] = useState<PaymentReceipt[]>(() => {
    try {
      const saved = localStorage.getItem('sz_payments');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return initialPayments;
  });

  const [announcements, setAnnouncements] = useState<Announcement[]>(() => {
    try {
      const saved = localStorage.getItem('sz_announcements');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return initialAnnouncements;
  });

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => {
    try {
      const saved = localStorage.getItem('sz_blog_posts');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return initialBlogPosts;
  });

  const [certificates, setCertificates] = useState<CertificateRecord[]>(() => {
    try {
      const saved = localStorage.getItem('sz_certificates');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return initialCertificates;
  });

  const [ztProducts, setZtProducts] = useState<ZTProduct[]>(() => {
    try {
      const saved = localStorage.getItem('sz_zt_products');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return initialZTProducts;
  });

  const [matrimonialProfiles, setMatrimonialProfiles] = useState<MatrimonialProfile[]>(() => {
    try {
      const saved = localStorage.getItem('sz_matrimonial');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return initialMatrimonialProfiles;
  });

  const [adCampaigns, setAdCampaigns] = useState<AdCampaign[]>(() => {
    try {
      const saved = localStorage.getItem('sz_ads');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return initialAdCampaigns;
  });

  const [referrals, setReferrals] = useState<ReferralRecord[]>(() => {
    try {
      const saved = localStorage.getItem('sz_referrals');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return initialReferrals;
  });

  const [affiliatePartners, setAffiliatePartners] = useState<AffiliatePartner[]>(() => {
    try {
      const saved = localStorage.getItem('sz_affiliates');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return initialAffiliatePartners;
  });

  const [socialAccounts, setSocialAccounts] = useState<SocialAccount[]>(() => {
    try {
      const saved = localStorage.getItem('sz_social_accounts');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return initialSocialAccounts;
  });

  const [applications, setApplications] = useState<TeacherApplication[]>([]);
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);
  const [donations, setDonations] = useState<DonationRecord[]>([]);
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);

  const [adPricingPlans] = useState<AdPricingPlan[]>(initialAdPricingPlans);
  const [selectedCourseForEnroll, setSelectedCourseForEnroll] = useState<Course | null>(null);

  // Digital Wallet, Deposits & Withdrawals State
  const [walletTransactions, setWalletTransactions] = useState<WalletTransaction[]>(() => {
    try {
      const saved = localStorage.getItem('sz_wallet_transactions_v1');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return initialWalletTransactions;
  });

  const [walletTabInitial, setWalletTabInitial] = useState<'deposit' | 'withdraw' | 'history'>('deposit');

  // Dynamic user wallet balance based on approved deposits and withdrawals
  const userWalletBalance = React.useMemo(() => {
    const baseCredit = 2500; // Starter demo credit balance
    const deposits = walletTransactions
      .filter((t) => t.type === 'deposit' && t.status === 'Approved')
      .reduce((sum, t) => sum + (t.amountPKR || 0), 0);
    const withdrawals = walletTransactions
      .filter(
        (t) =>
          t.type === 'withdraw' &&
          (t.status === 'Approved' || t.status === 'Completed' || t.status === 'Processing')
      )
      .reduce((sum, t) => sum + (t.amountPKR || 0), 0);
    const balance = baseCredit + deposits - withdrawals;
    return balance > 0 ? balance : 0;
  }, [walletTransactions]);

  // =========================================================================
  // CLOUD DATABASE HYDRATION & REFRESH
  // =========================================================================
  const refreshFromCloud = async () => {
    setCloudSyncStatus('syncing');
    try {
      const cloudData = await api.fetchCloudData();
      if (cloudData) {
        if (cloudData.siteSettings) {
          setSiteSettings(cloudData.siteSettings);
          localStorage.setItem('sz_site_settings_v3', JSON.stringify(cloudData.siteSettings));
        }
        if (cloudData.courses && cloudData.courses.length > 0) {
          setCourses(cloudData.courses);
          localStorage.setItem('sz_courses_v6', JSON.stringify(cloudData.courses));
        }
        if (cloudData.teachers) setTeachers(cloudData.teachers);
        if (cloudData.branches) setBranches(cloudData.branches);
        if (cloudData.students) {
          setStudents(cloudData.students);
          localStorage.setItem('sz_students', JSON.stringify(cloudData.students));
        }
        if (cloudData.payments) {
          setPayments(cloudData.payments);
          localStorage.setItem('sz_payments', JSON.stringify(cloudData.payments));
        }
        if (cloudData.announcements) setAnnouncements(cloudData.announcements);
        if (cloudData.blogPosts) setBlogPosts(cloudData.blogPosts);
        if (cloudData.certificates) setCertificates(cloudData.certificates);
        if (cloudData.ztProducts) {
          setZtProducts(cloudData.ztProducts);
          localStorage.setItem('sz_zt_products', JSON.stringify(cloudData.ztProducts));
        }
        if (cloudData.matrimonialProfiles) {
          setMatrimonialProfiles(cloudData.matrimonialProfiles);
          localStorage.setItem('sz_matrimonial', JSON.stringify(cloudData.matrimonialProfiles));
        }
        if (cloudData.adCampaigns) {
          setAdCampaigns(cloudData.adCampaigns);
          localStorage.setItem('sz_ads', JSON.stringify(cloudData.adCampaigns));
        }
        if (cloudData.referrals) setReferrals(cloudData.referrals);
        if (cloudData.affiliatePartners) setAffiliatePartners(cloudData.affiliatePartners);
        if (cloudData.socialAccounts) setSocialAccounts(cloudData.socialAccounts);
        if (cloudData.applications) setApplications(cloudData.applications);
        if (cloudData.contactMessages) setContactMessages(cloudData.contactMessages);
        if (cloudData.donations) setDonations(cloudData.donations);
        if (cloudData.subscribers) setSubscribers(cloudData.subscribers);

        setCloudSyncStatus('synced');
        setLastCloudSync(new Date().toLocaleTimeString());
      } else {
        setCloudSyncStatus('offline');
      }
    } catch (err) {
      console.warn('Could not sync from cloud DB, continuing in offline mode:', err);
      setCloudSyncStatus('offline');
    }
  };

  useEffect(() => {
    refreshFromCloud();
  }, []);

  // Offline recovery backup to local storage
  useEffect(() => {
    try {
      localStorage.setItem('sz_site_settings_v3', JSON.stringify(siteSettings));
      localStorage.setItem('sz_courses_v6', JSON.stringify(courses));
      localStorage.setItem('sz_students', JSON.stringify(students));
      localStorage.setItem('sz_payments', JSON.stringify(payments));
      localStorage.setItem('sz_zt_products', JSON.stringify(ztProducts));
      localStorage.setItem('sz_matrimonial', JSON.stringify(matrimonialProfiles));
      localStorage.setItem('sz_ads', JSON.stringify(adCampaigns));
    } catch (e) {}
  }, [siteSettings, courses, students, payments, ztProducts, matrimonialProfiles, adCampaigns]);

  // =========================================================================
  // ATOMIC MUTATIONS WITH CLOUD API PERSISTENCE
  // =========================================================================

  const updateSiteSettings = async (settings: Partial<SiteSettings>): Promise<boolean> => {
    setSiteSettings((prev) => ({ ...prev, ...settings }));
    setCloudSyncStatus('syncing');
    const cloudRes = await api.saveCloudSettings(settings);
    if (cloudRes) {
      setSiteSettings(cloudRes);
      setCloudSyncStatus('synced');
      setLastCloudSync(new Date().toLocaleTimeString());
      return true;
    }
    setCloudSyncStatus('offline');
    return false;
  };

  const addCourse = async (course: Course): Promise<boolean> => {
    setCourses((prev) => [course, ...prev]);
    setCloudSyncStatus('syncing');
    const saved = await api.saveCloudCourse(course);
    if (saved) {
      setCourses((prev) => prev.map((c) => (c.id === course.id ? saved : c)));
      setCloudSyncStatus('synced');
      setLastCloudSync(new Date().toLocaleTimeString());
      return true;
    }
    return false;
  };

  const updateCourse = async (id: string, updated: Partial<Course>): Promise<boolean> => {
    setCourses((prev) => prev.map((c) => (c.id === id ? { ...c, ...updated } : c)));
    setCloudSyncStatus('syncing');
    const saved = await api.updateCloudCourse(id, updated);
    if (saved) {
      setCloudSyncStatus('synced');
      setLastCloudSync(new Date().toLocaleTimeString());
      return true;
    }
    return false;
  };

  const deleteCourse = async (id: string): Promise<boolean> => {
    setCourses((prev) => prev.filter((c) => c.id !== id));
    setCloudSyncStatus('syncing');
    const ok = await api.deleteCloudCourse(id);
    if (ok) {
      setCloudSyncStatus('synced');
      setLastCloudSync(new Date().toLocaleTimeString());
    }
    return ok;
  };

  const addTeacher = (teacher: Teacher) => {
    setTeachers((prev) => [teacher, ...prev]);
  };

  const addBranch = (branch: Branch) => {
    setBranches((prev) => [branch, ...prev]);
  };

  const addStudent = async (student: StudentRecord): Promise<boolean> => {
    setStudents((prev) => [student, ...prev]);
    setCloudSyncStatus('syncing');
    const saved = await api.saveCloudStudent(student);
    if (saved) {
      setStudents((prev) => prev.map((s) => (s.id === student.id ? saved : s)));
      setCloudSyncStatus('synced');
      setLastCloudSync(new Date().toLocaleTimeString());
      return true;
    }
    return false;
  };

  const addPayment = async (payment: PaymentReceipt): Promise<boolean> => {
    setPayments((prev) => [payment, ...prev]);
    setCloudSyncStatus('syncing');
    const saved = await api.saveCloudPayment(payment);
    if (saved) {
      setPayments((prev) => prev.map((p) => (p.id === payment.id ? saved : p)));
      setCloudSyncStatus('synced');
      setLastCloudSync(new Date().toLocaleTimeString());
      return true;
    }
    return false;
  };

  const updatePaymentStatus = async (
    id: string,
    status: 'Approved' | 'Pending Verification' | 'Rejected'
  ): Promise<boolean> => {
    setPayments((prev) => prev.map((p) => (p.id === id ? { ...p, status } : p)));
    setCloudSyncStatus('syncing');
    const saved = await api.updateCloudPaymentStatus(id, status);
    if (saved) {
      setCloudSyncStatus('synced');
      setLastCloudSync(new Date().toLocaleTimeString());
      return true;
    }
    return false;
  };

  const addAnnouncement = (announcement: Announcement) => {
    setAnnouncements((prev) => [announcement, ...prev]);
  };

  const addBlogPost = (post: BlogPost) => {
    setBlogPosts((prev) => [post, ...prev]);
  };

  const addZTProduct = async (prod: ZTProduct): Promise<boolean> => {
    setZtProducts((prev) => [prod, ...prev]);
    setCloudSyncStatus('syncing');
    const saved = await api.saveCloudZTProduct(prod);
    if (saved) {
      setZtProducts((prev) => prev.map((p) => (p.id === prod.id ? saved : p)));
      setCloudSyncStatus('synced');
      setLastCloudSync(new Date().toLocaleTimeString());
      return true;
    }
    return false;
  };

  const updateZTProduct = async (id: string, updated: Partial<ZTProduct>): Promise<boolean> => {
    setZtProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...updated } : p)));
    const saved = await api.updateCloudZTProduct(id, updated);
    return !!saved;
  };

  const deleteZTProduct = async (id: string): Promise<boolean> => {
    setZtProducts((prev) => prev.filter((p) => p.id !== id));
    return await api.deleteCloudZTProduct(id);
  };

  const addMatrimonialProfile = async (profile: MatrimonialProfile): Promise<boolean> => {
    setMatrimonialProfiles((prev) => [profile, ...prev]);
    setCloudSyncStatus('syncing');
    const saved = await api.saveCloudMatrimonialProfile(profile);
    if (saved) {
      setMatrimonialProfiles((prev) => prev.map((m) => (m.id === profile.id ? saved : m)));
      setCloudSyncStatus('synced');
      setLastCloudSync(new Date().toLocaleTimeString());
      return true;
    }
    return false;
  };

  const deleteMatrimonialProfile = async (id: string): Promise<boolean> => {
    setMatrimonialProfiles((prev) => prev.filter((m) => m.id !== id));
    return await api.deleteCloudMatrimonialProfile(id);
  };

  const addAdCampaign = async (ad: AdCampaign): Promise<boolean> => {
    setAdCampaigns((prev) => [ad, ...prev]);
    setCloudSyncStatus('syncing');
    const saved = await api.saveCloudAdCampaign(ad);
    if (saved) {
      setAdCampaigns((prev) => prev.map((a) => (a.id === ad.id ? saved : a)));
      setCloudSyncStatus('synced');
      setLastCloudSync(new Date().toLocaleTimeString());
      return true;
    }
    return false;
  };

  const updateAdCampaign = async (id: string, updated: Partial<AdCampaign>): Promise<boolean> => {
    setAdCampaigns((prev) => prev.map((ad) => (ad.id === id ? { ...ad, ...updated } : ad)));
    const saved = await api.updateCloudAdCampaign(id, updated);
    return !!saved;
  };

  const toggleAdStatus = (id: string) => {
    setAdCampaigns((prev) =>
      prev.map((ad) => {
        if (ad.id === id) {
          const nextStatus = ad.status === 'Active' ? 'Paused' : 'Active';
          api.updateCloudAdCampaign(id, { status: nextStatus });
          return { ...ad, status: nextStatus };
        }
        return ad;
      })
    );
  };

  const deleteAdCampaign = async (id: string): Promise<boolean> => {
    setAdCampaigns((prev) => prev.filter((ad) => ad.id !== id));
    return await api.deleteCloudAdCampaign(id);
  };

  const recordAdClick = (id: string) => {
    setAdCampaigns((prev) =>
      prev.map((ad) => (ad.id === id ? { ...ad, clicks: ad.clicks + 1 } : ad))
    );
    api.recordCloudAdMetric(id, 'click');
  };

  const recordAdImpression = (id: string) => {
    setAdCampaigns((prev) =>
      prev.map((ad) => (ad.id === id ? { ...ad, impressions: ad.impressions + 1 } : ad))
    );
    api.recordCloudAdMetric(id, 'impression');
  };

  const recordAdLead = (id: string) => {
    setAdCampaigns((prev) =>
      prev.map((ad) => (ad.id === id ? { ...ad, leads: (ad.leads || 0) + 1 } : ad))
    );
    api.recordCloudAdMetric(id, 'lead');
  };

  const toggleSocialConnection = (id: string) => {
    setSocialAccounts((prev) =>
      prev.map((acc) => {
        if (acc.id === id) {
          const nextVal = !acc.isConnected;
          api.updateCloudSocialAccount(id, { isConnected: nextVal });
          return { ...acc, isConnected: nextVal };
        }
        return acc;
      })
    );
  };

  const toggleSocialAutoPost = (id: string) => {
    setSocialAccounts((prev) =>
      prev.map((acc) => {
        if (acc.id === id) {
          const nextVal = !acc.autoPostEnabled;
          api.updateCloudSocialAccount(id, { autoPostEnabled: nextVal });
          return { ...acc, autoPostEnabled: nextVal };
        }
        return acc;
      })
    );
  };

  const addSocialAccount = async (acc: SocialAccount): Promise<boolean> => {
    setSocialAccounts((prev) => [acc, ...prev]);
    const saved = await api.saveCloudSocialAccount(acc);
    return !!saved;
  };

  const addReferral = async (ref: ReferralRecord): Promise<boolean> => {
    setReferrals((prev) => [ref, ...prev]);
    const saved = await api.saveCloudReferral(ref);
    return !!saved;
  };

  const addAffiliatePartner = async (aff: AffiliatePartner): Promise<boolean> => {
    setAffiliatePartners((prev) => [aff, ...prev]);
    const saved = await api.saveCloudAffiliate(aff);
    return !!saved;
  };

  const addApplication = async (app: TeacherApplication): Promise<boolean> => {
    setApplications((prev) => [app, ...prev]);
    setCloudSyncStatus('syncing');
    const saved = await api.saveCloudTeacherApplication(app);
    if (saved) {
      setApplications((prev) => prev.map((a) => (a.id === app.id ? saved : a)));
      setCloudSyncStatus('synced');
      setLastCloudSync(new Date().toLocaleTimeString());
      return true;
    }
    return false;
  };

  const updateApplicationStatus = async (
    id: string,
    status: TeacherApplication['status']
  ): Promise<boolean> => {
    setApplications((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
    const saved = await api.updateCloudTeacherApplication(id, status);
    return !!saved;
  };

  const addContactMessage = async (msg: ContactMessage): Promise<boolean> => {
    setContactMessages((prev) => [msg, ...prev]);
    setCloudSyncStatus('syncing');
    const saved = await api.saveCloudContactMessage(msg);
    if (saved) {
      setContactMessages((prev) => prev.map((m) => (m.id === msg.id ? saved : m)));
      setCloudSyncStatus('synced');
      setLastCloudSync(new Date().toLocaleTimeString());
      return true;
    }
    return false;
  };

  const markContactMessageReplied = async (id: string): Promise<boolean> => {
    setContactMessages((prev) => prev.map((m) => (m.id === id ? { ...m, status: 'Replied' } : m)));
    const saved = await api.markCloudContactMessageReplied(id);
    return !!saved;
  };

  const addDonation = async (donation: DonationRecord): Promise<boolean> => {
    setDonations((prev) => [donation, ...prev]);
    setCloudSyncStatus('syncing');
    const saved = await api.saveCloudDonation(donation);
    if (saved) {
      setDonations((prev) => prev.map((d) => (d.id === donation.id ? saved : d)));
      setCloudSyncStatus('synced');
      setLastCloudSync(new Date().toLocaleTimeString());
      return true;
    }
    return false;
  };

  const addNewsletterSubscriber = async (email: string): Promise<boolean> => {
    const sub = await api.subscribeCloudNewsletter(email);
    if (sub) {
      setSubscribers((prev) => [sub, ...prev]);
      return true;
    }
    return false;
  };

  // =========================================================================
  // DIGITAL WALLET: DEPOSIT & WITHDRAW ACTION HANDLERS
  // =========================================================================
  const addDeposit = async (
    deposit: Omit<WalletTransaction, 'id' | 'type' | 'date' | 'status'> & Partial<WalletTransaction>
  ): Promise<boolean> => {
    const newTx: WalletTransaction = {
      id: `wtx-dep-${Date.now()}`,
      type: 'deposit',
      userName: deposit.userName?.trim() || 'Student / Depositor',
      userPhone: deposit.userPhone?.trim() || siteSettings.contactNumber,
      userEmail: deposit.userEmail?.trim(),
      amountPKR: Number(deposit.amountPKR) || 1000,
      method: deposit.method || 'EasyPaisa',
      accountTitle: deposit.accountTitle || siteSettings.ownerName,
      accountNumberOrIban: deposit.accountNumberOrIban || siteSettings.easyPaisaAccountNumber,
      transactionId: deposit.transactionId?.trim() || `DEP-${Date.now().toString().slice(-6)}`,
      purpose: deposit.purpose || 'Wallet Topup (اکیڈمی والٹ)',
      status: 'Pending Verification',
      date: new Date().toISOString().split('T')[0],
      notes: deposit.notes?.trim(),
    };
    setWalletTransactions((prev) => {
      const updated = [newTx, ...prev];
      try {
        localStorage.setItem('sz_wallet_transactions_v1', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
    return true;
  };

  const requestWithdrawal = async (
    withdrawal: Omit<WalletTransaction, 'id' | 'type' | 'date' | 'status'> & Partial<WalletTransaction>
  ): Promise<boolean> => {
    const newTx: WalletTransaction = {
      id: `wtx-wth-${Date.now()}`,
      type: 'withdraw',
      userName: withdrawal.userName?.trim() || 'Account Holder',
      userPhone: withdrawal.userPhone?.trim() || '',
      userEmail: withdrawal.userEmail?.trim(),
      amountPKR: Number(withdrawal.amountPKR) || 500,
      method: withdrawal.method || 'EasyPaisa',
      accountTitle: withdrawal.accountTitle?.trim() || '',
      accountNumberOrIban: withdrawal.accountNumberOrIban?.trim() || '',
      purpose: withdrawal.purpose || 'Earnings & Commission Payout (رقم نکلوائیں)',
      status: 'Pending Verification',
      date: new Date().toISOString().split('T')[0],
      notes: withdrawal.notes?.trim(),
    };
    setWalletTransactions((prev) => {
      const updated = [newTx, ...prev];
      try {
        localStorage.setItem('sz_wallet_transactions_v1', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
    return true;
  };

  const updateWalletTransactionStatus = async (
    id: string,
    status: WalletTransaction['status'],
    adminResponse?: string
  ): Promise<boolean> => {
    setWalletTransactions((prev) => {
      const updated = prev.map((t) =>
        t.id === id ? { ...t, status, ...(adminResponse ? { adminResponse } : {}) } : t
      );
      try {
        localStorage.setItem('sz_wallet_transactions_v1', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
    return true;
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
        cloudSyncStatus,
        lastCloudSync,
        refreshFromCloud,
        siteSettings,
        updateSiteSettings,
        courses,
        addCourse,
        updateCourse,
        deleteCourse,
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
        updateZTProduct,
        deleteZTProduct,
        matrimonialProfiles,
        addMatrimonialProfile,
        deleteMatrimonialProfile,
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
        applications,
        addApplication,
        updateApplicationStatus,
        contactMessages,
        addContactMessage,
        markContactMessageReplied,
        donations,
        addDonation,
        subscribers,
        addNewsletterSubscriber,
        walletTransactions,
        userWalletBalance,
        addDeposit,
        requestWithdrawal,
        updateWalletTransactionStatus,
        walletTabInitial,
        setWalletTabInitial,
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

