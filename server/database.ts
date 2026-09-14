import fs from 'fs';
import path from 'path';
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
} from '../src/data/initialData';
import {
  AcademyDataPayload,
  Course,
  PaymentReceipt,
  SiteSettings,
  StudentRecord,
  Teacher,
  Branch,
  ZTProduct,
  MatrimonialProfile,
  AdCampaign,
  ReferralRecord,
  AffiliatePartner,
  SocialAccount,
  TeacherApplication,
  ContactMessage,
  DonationRecord,
  NewsletterSubscriber,
  Announcement,
  BlogPost,
  CertificateRecord,
} from '../src/types';

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'database.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

function getDefaultData(): AcademyDataPayload {
  return {
    siteSettings: initialSiteSettings,
    courses: initialCourses,
    teachers: initialTeachers,
    branches: initialBranches,
    students: initialStudentRecords,
    payments: initialPayments,
    announcements: initialAnnouncements,
    blogPosts: initialBlogPosts,
    certificates: initialCertificates,
    ztProducts: initialZTProducts,
    matrimonialProfiles: initialMatrimonialProfiles,
    adCampaigns: initialAdCampaigns,
    referrals: initialReferrals,
    affiliatePartners: initialAffiliatePartners,
    socialAccounts: initialSocialAccounts,
    applications: [
      {
        id: 'app-sample-1',
        applicantName: 'Qari Muhammad Bilal',
        phone: '03001234567',
        email: 'bilal.quran@gmail.com',
        qualification: 'Hafiz-e-Quran with Tajweed Sanad',
        experienceYears: 4,
        gender: 'Male',
        city: 'Rawalpindi',
        status: 'Audition Scheduled',
        date: '2026-08-10',
      },
    ],
    contactMessages: [
      {
        id: 'msg-sample-1',
        name: 'Dr. Tariq Mahmood',
        email: 'tariq.uk@yahoo.com',
        phone: '+44 7700 900077',
        subject: 'Quran Classes for my 2 children in London',
        message: 'Assalamu Alaikum, we need UK time zone evening classes (5 PM BST) for Noorani Qaida.',
        date: '2026-08-12',
        status: 'Replied',
      },
    ],
    donations: [
      {
        id: 'don-sample-1',
        donorName: 'Overseas Pakistani Brother (Dubai)',
        amountPKR: 25000,
        amountUSD: 90,
        paymentMethod: 'Meezan Bank Raast',
        transactionId: 'RST9817264510',
        purpose: 'Orphan Quran Student Sponsorship',
        date: '2026-08-01',
        status: 'Approved',
      },
    ],
    subscribers: [
      {
        id: 'sub-sample-1',
        email: 'info@shaheenalzaitoon.com',
        date: '2026-08-01',
      },
    ],
    lastUpdated: new Date().toISOString(),
  };
}

let cachedData: AcademyDataPayload | null = null;

export function getDatabase(): AcademyDataPayload {
  if (cachedData) return cachedData;

  try {
    if (fs.existsSync(DB_FILE)) {
      const content = fs.readFileSync(DB_FILE, 'utf-8');
      if (content.trim()) {
        const parsed = JSON.parse(content);
        // Merge with default schema in case new fields were added
        cachedData = {
          ...getDefaultData(),
          ...parsed,
          siteSettings: {
            ...initialSiteSettings,
            ...(parsed.siteSettings || {}),
          },
        };
        return cachedData!;
      }
    }
  } catch (error) {
    console.error('Error reading database file, resetting to defaults:', error);
  }

  // If file doesn't exist or failed to load, initialize with defaults
  const initial = getDefaultData();
  saveDatabase(initial);
  cachedData = initial;
  return initial;
}

export function saveDatabase(data: AcademyDataPayload): boolean {
  try {
    data.lastUpdated = new Date().toISOString();
    const tempFile = `${DB_FILE}.tmp.${Date.now()}`;
    fs.writeFileSync(tempFile, JSON.stringify(data, null, 2), 'utf-8');
    fs.renameSync(tempFile, DB_FILE);
    cachedData = data;
    return true;
  } catch (error) {
    console.error('Failed to write database file:', error);
    return false;
  }
}

// Specific atomic operations for forms

export function updateSiteSettings(settings: Partial<SiteSettings>): SiteSettings {
  const db = getDatabase();
  db.siteSettings = { ...db.siteSettings, ...settings };
  saveDatabase(db);
  return db.siteSettings;
}

export function addPayment(payment: PaymentReceipt): PaymentReceipt {
  const db = getDatabase();
  // Check duplicate transaction ID
  const existingIdx = db.payments.findIndex(
    (p) => p.transactionId && p.transactionId.toLowerCase() === payment.transactionId.toLowerCase()
  );
  if (existingIdx >= 0) {
    // Update existing
    db.payments[existingIdx] = { ...db.payments[existingIdx], ...payment };
    saveDatabase(db);
    return db.payments[existingIdx];
  }

  db.payments.unshift(payment);
  saveDatabase(db);
  return payment;
}

export function updatePaymentStatus(id: string, status: 'Approved' | 'Pending Verification' | 'Rejected'): PaymentReceipt | null {
  const db = getDatabase();
  const payment = db.payments.find((p) => p.id === id);
  if (payment) {
    payment.status = status;
    saveDatabase(db);
    return payment;
  }
  return null;
}

export function addStudent(student: StudentRecord): StudentRecord {
  const db = getDatabase();
  db.students.unshift(student);
  saveDatabase(db);
  return student;
}

export function addCourse(course: Course): Course {
  const db = getDatabase();
  db.courses.unshift(course);
  saveDatabase(db);
  return course;
}

export function updateCourse(id: string, updated: Partial<Course>): Course | null {
  const db = getDatabase();
  const idx = db.courses.findIndex((c) => c.id === id);
  if (idx >= 0) {
    db.courses[idx] = { ...db.courses[idx], ...updated };
    saveDatabase(db);
    return db.courses[idx];
  }
  return null;
}

export function deleteCourse(id: string): boolean {
  const db = getDatabase();
  const initialLen = db.courses.length;
  db.courses = db.courses.filter((c) => c.id !== id);
  if (db.courses.length !== initialLen) {
    saveDatabase(db);
    return true;
  }
  return false;
}

export function addTeacher(teacher: Teacher): Teacher {
  const db = getDatabase();
  db.teachers.unshift(teacher);
  saveDatabase(db);
  return teacher;
}

export function addBranch(branch: Branch): Branch {
  const db = getDatabase();
  db.branches.unshift(branch);
  saveDatabase(db);
  return branch;
}

export function addZTProduct(product: ZTProduct): ZTProduct {
  const db = getDatabase();
  db.ztProducts.unshift(product);
  saveDatabase(db);
  return product;
}

export function updateZTProduct(id: string, updated: Partial<ZTProduct>): ZTProduct | null {
  const db = getDatabase();
  const idx = db.ztProducts.findIndex((p) => p.id === id);
  if (idx >= 0) {
    db.ztProducts[idx] = { ...db.ztProducts[idx], ...updated };
    saveDatabase(db);
    return db.ztProducts[idx];
  }
  return null;
}

export function deleteZTProduct(id: string): boolean {
  const db = getDatabase();
  const initialLen = db.ztProducts.length;
  db.ztProducts = db.ztProducts.filter((p) => p.id !== id);
  if (db.ztProducts.length !== initialLen) {
    saveDatabase(db);
    return true;
  }
  return false;
}

export function addMatrimonialProfile(profile: MatrimonialProfile): MatrimonialProfile {
  const db = getDatabase();
  db.matrimonialProfiles.unshift(profile);
  saveDatabase(db);
  return profile;
}

export function deleteMatrimonialProfile(id: string): boolean {
  const db = getDatabase();
  const initialLen = db.matrimonialProfiles.length;
  db.matrimonialProfiles = db.matrimonialProfiles.filter((p) => p.id !== id);
  if (db.matrimonialProfiles.length !== initialLen) {
    saveDatabase(db);
    return true;
  }
  return false;
}

export function addAdCampaign(ad: AdCampaign): AdCampaign {
  const db = getDatabase();
  db.adCampaigns.unshift(ad);
  saveDatabase(db);
  return ad;
}

export function updateAdCampaign(id: string, updated: Partial<AdCampaign>): AdCampaign | null {
  const db = getDatabase();
  const idx = db.adCampaigns.findIndex((a) => a.id === id);
  if (idx >= 0) {
    db.adCampaigns[idx] = { ...db.adCampaigns[idx], ...updated };
    saveDatabase(db);
    return db.adCampaigns[idx];
  }
  return null;
}

export function deleteAdCampaign(id: string): boolean {
  const db = getDatabase();
  const initialLen = db.adCampaigns.length;
  db.adCampaigns = db.adCampaigns.filter((a) => a.id !== id);
  if (db.adCampaigns.length !== initialLen) {
    saveDatabase(db);
    return true;
  }
  return false;
}

export function recordAdMetric(id: string, metric: 'click' | 'impression' | 'lead'): boolean {
  const db = getDatabase();
  const ad = db.adCampaigns.find((a) => a.id === id);
  if (ad) {
    if (metric === 'click') ad.clicks = (ad.clicks || 0) + 1;
    else if (metric === 'impression') ad.impressions = (ad.impressions || 0) + 1;
    else if (metric === 'lead') ad.leads = (ad.leads || 0) + 1;
    saveDatabase(db);
    return true;
  }
  return false;
}

export function addReferral(ref: ReferralRecord): ReferralRecord {
  const db = getDatabase();
  db.referrals.unshift(ref);
  saveDatabase(db);
  return ref;
}

export function addAffiliatePartner(aff: AffiliatePartner): AffiliatePartner {
  const db = getDatabase();
  db.affiliatePartners.unshift(aff);
  saveDatabase(db);
  return aff;
}

export function addSocialAccount(acc: SocialAccount): SocialAccount {
  const db = getDatabase();
  db.socialAccounts.unshift(acc);
  saveDatabase(db);
  return acc;
}

export function updateSocialAccount(id: string, updated: Partial<SocialAccount>): SocialAccount | null {
  const db = getDatabase();
  const idx = db.socialAccounts.findIndex((s) => s.id === id);
  if (idx >= 0) {
    db.socialAccounts[idx] = { ...db.socialAccounts[idx], ...updated };
    saveDatabase(db);
    return db.socialAccounts[idx];
  }
  return null;
}

export function addTeacherApplication(app: TeacherApplication): TeacherApplication {
  const db = getDatabase();
  db.applications.unshift(app);
  saveDatabase(db);
  return app;
}

export function updateTeacherApplication(id: string, status: TeacherApplication['status']): TeacherApplication | null {
  const db = getDatabase();
  const app = db.applications.find((a) => a.id === id);
  if (app) {
    app.status = status;
    saveDatabase(db);
    return app;
  }
  return null;
}

export function addContactMessage(msg: ContactMessage): ContactMessage {
  const db = getDatabase();
  db.contactMessages.unshift(msg);
  saveDatabase(db);
  return msg;
}

export function markContactMessageReplied(id: string): ContactMessage | null {
  const db = getDatabase();
  const msg = db.contactMessages.find((m) => m.id === id);
  if (msg) {
    msg.status = 'Replied';
    saveDatabase(db);
    return msg;
  }
  return null;
}

export function addDonation(donation: DonationRecord): DonationRecord {
  const db = getDatabase();
  db.donations.unshift(donation);
  saveDatabase(db);
  return donation;
}

export function addNewsletterSubscriber(email: string): NewsletterSubscriber {
  const db = getDatabase();
  const cleanEmail = email.trim().toLowerCase();
  const existing = db.subscribers.find((s) => s.email.toLowerCase() === cleanEmail);
  if (existing) return existing;

  const sub: NewsletterSubscriber = {
    id: `sub-${Date.now()}`,
    email: cleanEmail,
    date: new Date().toISOString().split('T')[0],
  };
  db.subscribers.unshift(sub);
  saveDatabase(db);
  return sub;
}

export function resetDatabaseToDefaults(): AcademyDataPayload {
  const initial = getDefaultData();
  saveDatabase(initial);
  return initial;
}
