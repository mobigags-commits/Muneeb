export type PageId =
  | 'home'
  | 'about'
  | 'courses'
  | 'teachers'
  | 'student-portal'
  | 'parent-portal'
  | 'admissions'
  | 'fee-payment'
  | 'live-classes'
  | 'certificates'
  | 'gallery'
  | 'blog'
  | 'testimonials'
  | 'faq'
  | 'contact'
  | 'careers'
  | 'privacy'
  | 'terms'
  | 'donations'
  | 'help-support'
  | 'admin-portal'
  | 'growth-hub'
  | 'zaitoon-traders'
  | 'marriage-bureau'
  | 'ad-manager'
  | 'community';

export type UserRole = 'guest' | 'student' | 'parent' | 'teacher' | 'admin' | 'owner';

export type Language = 'en' | 'ur' | 'ar';

export interface Course {
  id: string;
  title: string;
  titleUrdu?: string;
  titleArabic?: string;
  category: 'qaida' | 'tajweed' | 'hifz' | 'translation' | 'ladies' | 'kids' | 'arabic';
  description: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  targetAudience: 'Children' | 'Adults' | 'Ladies' | 'Everyone';
  feePKR: number;
  feeUSD: number;
  image: string;
  features: string[];
  syllabus: string[];
}

export interface Teacher {
  id: string;
  name: string;
  title: string;
  qualification: string;
  experience: string;
  languages: string[];
  specialization: string;
  rating: number;
  reviewsCount: number;
  image: string;
  bio: string;
  availableDays: string[];
  gender: 'male' | 'female';
}

export interface Branch {
  id: string;
  name: string;
  country: string;
  city: string;
  address: string;
  phone: string;
  email: string;
  manager: string;
  isHeadquarters: boolean;
  activeStudents: number;
}

export interface StudentRecord {
  id: string;
  name: string;
  guardianName: string;
  courseId: string;
  teacherId: string;
  attendanceRate: number;
  progressPercent: number;
  currentPara: number;
  feeStatus: 'Paid' | 'Pending' | 'Overdue';
  lastClassDate: string;
  joinDate: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  isUrgent: boolean;
  targetRole?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  image: string;
  readTime: string;
}

export interface CertificateRecord {
  id: string;
  studentName: string;
  courseName: string;
  issueDate: string;
  verificationCode: string;
  grade: string;
  instructorName: string;
}

export interface PaymentReceipt {
  id: string;
  studentName: string;
  courseTitle: string;
  amountPKR: number;
  amountUSD: number;
  paymentMethod: 'EasyPaisa' | 'Bank Transfer' | 'Card / Stripe' | 'Other';
  senderAccountOrPhone: string;
  transactionId: string;
  date: string;
  status: 'Approved' | 'Pending Verification' | 'Rejected';
  notes?: string;
}

export interface AdCampaign {
  id: string;
  title: string;
  targetBrand: 'Quran Academy' | 'ZT Traders' | 'Marriage Bureau' | 'Sponsor' | 'Custom User Business';
  placement: 'Header Banner' | 'Sidebar Ad' | 'In-feed Featured' | 'Footer Banner' | 'Facebook Page' | 'Facebook Group' | 'Instagram Feed' | 'WhatsApp Broadcast' | 'Multi-Channel AI';
  imageUrl: string;
  linkUrl: string;
  impressions: number;
  clicks: number;
  leads?: number;
  conversions?: number;
  status: 'Active' | 'Paused' | 'Scheduled' | 'Completed' | 'Draft';
  pkrSpent: number;
  pkrRevenue: number;
  campaignType?: 'Free Social Post' | 'Paid Promotion' | 'Featured Listing';
  budgetPKR?: number;
  adminFeePKR?: number;
  ownerCommissionPKR?: number;
  paymentStatus?: 'Free' | 'Paid via EasyPaisa' | 'Pending Payment' | 'Paid via Card';
  platforms?: string[];
  headline?: string;
  description?: string;
  ctaText?: string;
  targetAudience?: {
    locations: string[];
    ageRange: string;
    interests: string[];
    demographics: string;
  };
  scheduleDate?: string;
  aiOptimizations?: string[];
  createdAt?: string;
}

export interface SocialAccount {
  id: string;
  platform: 'Facebook Page' | 'Facebook Group' | 'Instagram' | 'WhatsApp Channel' | 'Google Ads';
  name: string;
  handleOrId: string;
  followersOrMembers: number;
  isConnected: boolean;
  autoPostEnabled: boolean;
  avatarUrl?: string;
  category?: string;
}

export interface AdPricingPlan {
  id: string;
  name: string;
  pricePKR: number;
  billingCycle: 'Monthly' | 'One-time';
  features: string[];
  monthlyAdLimit: number;
  aiGenerationsLimit: number;
  multiPlatformPosting: boolean;
  isPopular?: boolean;
}

export interface ZTProduct {
  id: string;
  name: string;
  category: 'Dates & Honey' | 'Ittar & Fragrances' | 'Quran Pens & Rehal' | 'Islamic Books' | 'Modest Wear';
  pricePKR: number;
  originalPricePKR?: number;
  image: string;
  description: string;
  inStock: boolean;
  isFeatured?: boolean;
  rating: number;
}

export interface MatrimonialProfile {
  id: string;
  code: string;
  gender: 'Male' | 'Female';
  age: number;
  maritalStatus: 'Single / Unmarried' | 'Divorced' | 'Widowed';
  profession: string;
  city: string;
  country: string;
  qualification: string;
  sectSilsila: string;
  verified: boolean;
  description: string;
  contactPerson: string;
}

export interface ReferralRecord {
  id: string;
  referrerName: string;
  referralCode: string;
  referredUser: string;
  brand: 'Quran Academy' | 'ZT Traders' | 'Marriage Bureau';
  rewardStatus: 'Earned' | 'Claimed' | 'Pending';
  rewardAmountPKR: number;
  date: string;
}

export interface AffiliatePartner {
  id: string;
  name: string;
  websiteOrChannel: string;
  commissionTier: 'Standard 10%' | 'Gold 15%' | 'Platinum 20%';
  totalEarnedPKR: number;
  status: 'Active' | 'Pending Approval';
}

export interface SiteSettings {
  academyName: string;
  ownerName: string;
  headOfficeCity: string;
  headOfficeCountry: string;
  headOfficeAddress: string;
  contactNumber: string;
  whatsappNumber: string;
  emailAddress: string;
  easyPaisaAccountTitle: string;
  easyPaisaAccountNumber: string;
  bankAccountTitle: string;
  bankAccountNumber: string;
  bankName: string;
  ibanNumber: string;
  motherMemorialName: string;
  motherMemorialUrdu: string;
  heroHeadline: string;
  heroSubheadline: string;
  noticeBannerText: string;
  facebookGroupUrl: string;
  facebookGroupName: string;
  facebookGroupDescription: string;
  facebookGroupMembers: number;
  facebookGroupCoverImage: string;
}
