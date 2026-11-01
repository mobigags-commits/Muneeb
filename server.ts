import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import * as db from './server/database.ts';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  // Trust reverse proxy for HTTPS detection
  app.set('trust proxy', 1);

  // Security & HTTPS Readiness Headers
  app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    if (process.env.NODE_ENV === 'production' || req.secure || req.headers['x-forwarded-proto'] === 'https') {
      res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
    }
    next();
  });

  app.use(express.json({ limit: '10mb' }));

  // Search Engine & Crawler Static Direct Endpoints
  app.get('/robots.txt', (req, res) => {
    const robotsPath = fs.existsSync(path.join(process.cwd(), 'dist', 'robots.txt'))
      ? path.join(process.cwd(), 'dist', 'robots.txt')
      : path.join(process.cwd(), 'public', 'robots.txt');
    res.type('text/plain; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.sendFile(robotsPath);
  });

  app.get('/sitemap.xml', (req, res) => {
    const sitemapPath = fs.existsSync(path.join(process.cwd(), 'dist', 'sitemap.xml'))
      ? path.join(process.cwd(), 'dist', 'sitemap.xml')
      : path.join(process.cwd(), 'public', 'sitemap.xml');
    res.type('application/xml; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.sendFile(sitemapPath);
  });

  // PWA Manifest and Service Worker Endpoints
  app.get(['/site.webmanifest', '/manifest.webmanifest'], (req, res) => {
    const manifestPath = fs.existsSync(path.join(process.cwd(), 'dist', 'site.webmanifest'))
      ? path.join(process.cwd(), 'dist', 'site.webmanifest')
      : fs.existsSync(path.join(process.cwd(), 'public', 'site.webmanifest'))
      ? path.join(process.cwd(), 'public', 'site.webmanifest')
      : path.join(process.cwd(), 'dist', 'manifest.webmanifest');
    res.type('application/manifest+json; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.sendFile(manifestPath);
  });

  app.get('/sw.js', (req, res, next) => {
    const swPath = path.join(process.cwd(), 'dist', 'sw.js');
    if (fs.existsSync(swPath)) {
      res.type('application/javascript; charset=utf-8');
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      return res.sendFile(swPath);
    }
    next();
  });

  // Initialize Gemini AI Client
  let aiClient: GoogleGenAI | null = null;
  if (process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }

  // =========================================================================
  // ADMIN AUTHENTICATION & SECURITY ENDPOINTS
  // =========================================================================
  const validAdminTokens = new Set<string>();

  app.post('/api/admin/login', (req, res) => {
    try {
      const { password, pin, email } = req.body;
      const cleanEmail = (email || '').trim().toLowerCase();
      const inputCredential = (password || pin || '').trim();

      // Accepted Owner credentials:
      // - PIN / EasyPaisa: 03447956085
      // - Master admin passwords: Shaheen2026!, ShaheenAdmin#1, Admin@2026, or 03447956085
      const isOwnerPin = inputCredential === '03447956085';
      const isOwnerPass = inputCredential === 'Shaheen2026!' || inputCredential === 'ShaheenAdmin#1' || inputCredential === 'Admin@2026';
      const isEmailValid = cleanEmail === '' || cleanEmail === 'mobigags@gmail.com' || cleanEmail.includes('admin') || cleanEmail.includes('shaheen');

      if ((isOwnerPin || isOwnerPass) && isEmailValid) {
        const token = `sza_adm_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;
        validAdminTokens.add(token);
        const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
        return res.json({
          success: true,
          token,
          admin: {
            adminName: 'Muneeb Ur Rehman',
            email: cleanEmail || 'mobigags@gmail.com',
            role: 'owner',
            expiresAt,
          },
        });
      }

      return res.status(401).json({
        success: false,
        error: 'Invalid Admin PIN or Password. Enter 03447956085 or Shaheen2026!',
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err?.message || 'Login failed' });
    }
  });

  app.post('/api/admin/verify', (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      const token = (req.body?.token || (authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : '')).trim();
      if (token && validAdminTokens.has(token)) {
        return res.json({
          success: true,
          valid: true,
          admin: {
            adminName: 'Muneeb Ur Rehman',
            email: 'mobigags@gmail.com',
            role: 'owner',
          },
        });
      }
      return res.json({ success: true, valid: false });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err?.message });
    }
  });

  // =========================================================================
  // CLOUD DATABASE & PERSISTENCE REST API ENDPOINTS
  // =========================================================================

  // 1. Full Database Fetch
  app.get('/api/data', (req, res) => {
    try {
      const data = db.getDatabase();
      res.json({
        success: true,
        data,
        storage: 'Server Cloud Persistent Store (data/database.json)',
        timestamp: new Date().toISOString(),
      });
    } catch (error: any) {
      console.error('API /api/data error:', error);
      res.status(500).json({ success: false, error: error?.message || 'Failed to fetch database' });
    }
  });

  // 2. Health & Storage Status
  app.get('/api/health', (req, res) => {
    try {
      const currentDb = db.getDatabase();
      res.json({
        status: 'ok',
        academy: 'Shaheen Al Zaitoon Online Quran Academy',
        storageType: 'Server Persistent Cloud Storage',
        stats: {
          paymentsCount: currentDb.payments.length,
          studentsCount: currentDb.students.length,
          coursesCount: currentDb.courses.length,
          applicationsCount: currentDb.applications.length,
          contactsCount: currentDb.contactMessages.length,
          donationsCount: currentDb.donations.length,
        },
        serverTime: new Date().toISOString(),
      });
    } catch (error: any) {
      res.status(500).json({ status: 'error', error: error.message });
    }
  });

  // 3. Site Settings Update
  app.put('/api/settings', (req, res) => {
    try {
      const updated = db.updateSiteSettings(req.body);
      res.json({ success: true, settings: updated });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error?.message || 'Failed to update settings' });
    }
  });

  // 4. Payments API
  app.post('/api/payments', (req, res) => {
    try {
      const { studentName, amountPKR, transactionId, paymentMethod } = req.body;
      if (!studentName || !amountPKR || !transactionId || !paymentMethod) {
        return res.status(400).json({
          success: false,
          error: 'Missing required fields: studentName, amountPKR, transactionId, paymentMethod are required',
        });
      }

      const receipt = db.addPayment(req.body);
      res.json({ success: true, payment: receipt });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error?.message || 'Failed to record payment' });
    }
  });

  app.put('/api/payments/:id', (req, res) => {
    try {
      const { status } = req.body;
      if (!status) {
        return res.status(400).json({ success: false, error: 'Status is required' });
      }
      const updated = db.updatePaymentStatus(req.params.id, status);
      if (!updated) {
        return res.status(404).json({ success: false, error: 'Payment receipt not found' });
      }
      res.json({ success: true, payment: updated });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error?.message || 'Failed to update payment status' });
    }
  });

  app.delete('/api/payments/:id', (req, res) => {
    try {
      const deleted = db.deletePayment(req.params.id);
      res.json({ success: deleted });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error?.message || 'Failed to delete payment' });
    }
  });

  // 5. Students / Admissions API
  app.post('/api/students', (req, res) => {
    try {
      const { name, courseId } = req.body;
      if (!name) {
        return res.status(400).json({ success: false, error: 'Student name is required' });
      }
      const student = db.addStudent({
        id: req.body.id || `s-${Date.now()}`,
        name,
        guardianName: req.body.guardianName || name,
        courseId: courseId || 'c1',
        teacherId: req.body.teacherId || 't1',
        attendanceRate: req.body.attendanceRate || 100,
        progressPercent: req.body.progressPercent || 0,
        currentPara: req.body.currentPara || 1,
        feeStatus: req.body.feeStatus || 'Pending',
        lastClassDate: new Date().toISOString().split('T')[0],
        joinDate: new Date().toISOString().split('T')[0],
      });
      res.json({ success: true, student });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error?.message || 'Failed to add student' });
    }
  });

  app.put('/api/students/:id', (req, res) => {
    try {
      const updated = db.updateStudentRecord(req.params.id, req.body);
      if (!updated) {
        return res.status(404).json({ success: false, error: 'Student not found' });
      }
      res.json({ success: true, student: updated });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error?.message || 'Failed to update student' });
    }
  });

  app.delete('/api/students/:id', (req, res) => {
    try {
      const deleted = db.deleteStudentRecord(req.params.id);
      res.json({ success: deleted });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error?.message || 'Failed to delete student' });
    }
  });

  // 6. Courses Catalog API
  app.post('/api/courses', (req, res) => {
    try {
      if (!req.body.title) {
        return res.status(400).json({ success: false, error: 'Course title is required' });
      }
      const course = db.addCourse({
        id: req.body.id || `course-${Date.now()}`,
        ...req.body,
      });
      res.json({ success: true, course });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error?.message || 'Failed to add course' });
    }
  });

  app.put('/api/courses/:id', (req, res) => {
    try {
      const course = db.updateCourse(req.params.id, req.body);
      if (!course) {
        return res.status(404).json({ success: false, error: 'Course not found' });
      }
      res.json({ success: true, course });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error?.message || 'Failed to update course' });
    }
  });

  app.delete('/api/courses/:id', (req, res) => {
    try {
      const deleted = db.deleteCourse(req.params.id);
      res.json({ success: deleted });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error?.message || 'Failed to delete course' });
    }
  });

  // 7. Teacher Applications (Careers) API
  app.post('/api/careers', (req, res) => {
    try {
      const { applicantName, phone, qualification } = req.body;
      if (!applicantName || !phone) {
        return res.status(400).json({ success: false, error: 'Applicant name and phone number are required' });
      }
      const appRecord = db.addTeacherApplication({
        id: req.body.id || `app-${Date.now()}`,
        applicantName,
        fullName: req.body.fullName || applicantName,
        phone,
        alternatePhone: req.body.alternatePhone || '',
        email: req.body.email || '',
        cnic: req.body.cnic || '',
        qualification: qualification || 'Shahadat-ul-Aalamiyyah',
        experienceYears: req.body.experienceYears ? Number(req.body.experienceYears) : 1,
        gender: req.body.gender || 'Male',
        city: req.body.city || 'Rawalpindi',
        status: 'Pending Review',
        date: new Date().toISOString().split('T')[0],
        appliedDate: new Date().toISOString().split('T')[0],
        expectedSalaryPKR: req.body.expectedSalaryPKR ? Math.max(Number(req.body.expectedSalaryPKR), 50000) : 50000,
        approvedSalaryPKR: req.body.approvedSalaryPKR ? Number(req.body.approvedSalaryPKR) : 50000,
        paymentMethod: req.body.paymentMethod || 'EasyPaisa',
        accountTitle: req.body.accountTitle || applicantName,
        accountNumber: req.body.accountNumber || phone,
        bankName: req.body.bankName || 'EasyPaisa Wallet',
        teachingShift: req.body.teachingShift || 'Evening Shift',
        salaryAgreementAgreed: true,
      });
      res.json({ success: true, application: appRecord });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error?.message || 'Failed to submit application' });
    }
  });

  app.put('/api/careers/:id', (req, res) => {
    try {
      const updated = db.updateTeacherApplication(req.params.id, req.body.status);
      if (!updated) {
        return res.status(404).json({ success: false, error: 'Application not found' });
      }
      res.json({ success: true, application: updated });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error?.message || 'Failed to update application' });
    }
  });

  app.delete('/api/careers/:id', (req, res) => {
    try {
      const deleted = db.deleteTeacherApplication(req.params.id);
      res.json({ success: deleted });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error?.message || 'Failed to delete application' });
    }
  });

  // 8. Contact & Help Desk Messages API
  app.post('/api/contact', (req, res) => {
    try {
      const { name, message } = req.body;
      if (!name || !message) {
        return res.status(400).json({ success: false, error: 'Name and message are required' });
      }
      const msg = db.addContactMessage({
        id: req.body.id || `msg-${Date.now()}`,
        name,
        email: req.body.email || '',
        phone: req.body.phone || '',
        subject: req.body.subject || 'Quran Academy Inquiry',
        message,
        date: new Date().toISOString().split('T')[0],
        status: 'Unread',
      });
      res.json({ success: true, message: msg });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error?.message || 'Failed to save contact message' });
    }
  });

  app.put('/api/contact/:id', (req, res) => {
    try {
      const updated = db.markContactMessageReplied(req.params.id);
      if (!updated) {
        return res.status(404).json({ success: false, error: 'Message not found' });
      }
      res.json({ success: true, message: updated });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error?.message || 'Failed to update message' });
    }
  });

  app.delete('/api/contact/:id', (req, res) => {
    try {
      const deleted = db.deleteContactMessage(req.params.id);
      res.json({ success: deleted });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error?.message || 'Failed to delete message' });
    }
  });

  // 9. Donations & Sadaqah Jariyah API
  app.post('/api/donations', (req, res) => {
    try {
      const { amountPKR, transactionId } = req.body;
      if (!amountPKR || !transactionId) {
        return res.status(400).json({ success: false, error: 'Amount and transaction ID are required' });
      }
      const donation = db.addDonation({
        id: req.body.id || `don-${Date.now()}`,
        donorName: req.body.donorName || 'Anonymous Donor',
        amountPKR: Number(amountPKR),
        amountUSD: req.body.amountUSD ? Number(req.body.amountUSD) : Math.round(Number(amountPKR) / 280),
        paymentMethod: req.body.paymentMethod || 'EasyPaisa',
        transactionId: transactionId.trim().toUpperCase(),
        purpose: req.body.purpose || 'Sadaqah Jariyah & Orphan Fund',
        date: new Date().toISOString().split('T')[0],
        status: 'Approved',
      });
      res.json({ success: true, donation });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error?.message || 'Failed to record donation' });
    }
  });

  app.put('/api/donations/:id', (req, res) => {
    try {
      const updated = db.updateDonationStatus(req.params.id, req.body.status);
      if (!updated) {
        return res.status(404).json({ success: false, error: 'Donation not found' });
      }
      res.json({ success: true, donation: updated });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error?.message || 'Failed to update donation' });
    }
  });

  app.delete('/api/donations/:id', (req, res) => {
    try {
      const deleted = db.deleteDonation(req.params.id);
      res.json({ success: deleted });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error?.message || 'Failed to delete donation' });
    }
  });

  // 10. ZT Marketplace Products API
  app.post('/api/zt-products', (req, res) => {
    try {
      const { name, pricePKR } = req.body;
      if (!name || !pricePKR) {
        return res.status(400).json({ success: false, error: 'Product name and price are required' });
      }
      const product = db.addZTProduct({
        id: req.body.id || `zt-${Date.now()}`,
        ...req.body,
      });
      res.json({ success: true, product });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error?.message || 'Failed to add product' });
    }
  });

  app.put('/api/zt-products/:id', (req, res) => {
    try {
      const product = db.updateZTProduct(req.params.id, req.body);
      if (!product) {
        return res.status(404).json({ success: false, error: 'Product not found' });
      }
      res.json({ success: true, product });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error?.message || 'Failed to update product' });
    }
  });

  app.delete('/api/zt-products/:id', (req, res) => {
    try {
      const deleted = db.deleteZTProduct(req.params.id);
      res.json({ success: deleted });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error?.message || 'Failed to delete product' });
    }
  });

  // 11. Marriage Bureau Proposals API
  app.post('/api/matrimonial', (req, res) => {
    try {
      const { gender, age, profession, city } = req.body;
      if (!gender || !age || !profession || !city) {
        return res.status(400).json({ success: false, error: 'Missing required profile fields' });
      }
      const profile = db.addMatrimonialProfile({
        id: req.body.id || `mat-${Date.now()}`,
        code: req.body.code || `SZA-M-${Math.floor(1000 + Math.random() * 9000)}`,
        gender,
        age: Number(age),
        maritalStatus: req.body.maritalStatus || 'Single / Unmarried',
        profession,
        city,
        country: req.body.country || 'Pakistan',
        qualification: req.body.qualification || 'Bachelors',
        sectSilsila: req.body.sectSilsila || 'Sunni / Hanafi',
        verified: true,
        description: req.body.description || 'Practicing Muslim seeking pious spouse.',
        contactPerson: req.body.contactPerson || 'Family / Shaheen Bureau Representative',
      });
      res.json({ success: true, profile });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error?.message || 'Failed to add proposal' });
    }
  });

  app.delete('/api/matrimonial/:id', (req, res) => {
    try {
      const deleted = db.deleteMatrimonialProfile(req.params.id);
      res.json({ success: deleted });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error?.message || 'Failed to delete proposal' });
    }
  });

  // 12. Ad Campaigns API
  app.post('/api/ads', (req, res) => {
    try {
      if (!req.body.title || !req.body.targetBrand) {
        return res.status(400).json({ success: false, error: 'Ad title and target brand are required' });
      }
      const ad = db.addAdCampaign({
        id: req.body.id || `ad-${Date.now()}`,
        ...req.body,
      });
      res.json({ success: true, ad });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error?.message || 'Failed to add ad campaign' });
    }
  });

  app.put('/api/ads/:id', (req, res) => {
    try {
      const ad = db.updateAdCampaign(req.params.id, req.body);
      if (!ad) {
        return res.status(404).json({ success: false, error: 'Ad campaign not found' });
      }
      res.json({ success: true, ad });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error?.message || 'Failed to update ad campaign' });
    }
  });

  app.delete('/api/ads/:id', (req, res) => {
    try {
      const deleted = db.deleteAdCampaign(req.params.id);
      res.json({ success: deleted });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error?.message || 'Failed to delete ad campaign' });
    }
  });

  app.post('/api/ads/:id/metric', (req, res) => {
    try {
      const { metric } = req.body;
      const success = db.recordAdMetric(req.params.id, metric);
      res.json({ success });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error?.message });
    }
  });

  // 13. Referrals & Affiliates API
  app.post('/api/referrals', (req, res) => {
    try {
      const ref = db.addReferral({
        id: req.body.id || `ref-${Date.now()}`,
        ...req.body,
      });
      res.json({ success: true, referral: ref });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error?.message || 'Failed to add referral' });
    }
  });

  app.post('/api/affiliates', (req, res) => {
    try {
      const aff = db.addAffiliatePartner({
        id: req.body.id || `aff-${Date.now()}`,
        ...req.body,
      });
      res.json({ success: true, affiliate: aff });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error?.message || 'Failed to add affiliate' });
    }
  });

  // 14. Social Accounts API
  app.post('/api/social-accounts', (req, res) => {
    try {
      const acc = db.addSocialAccount({
        id: req.body.id || `soc-${Date.now()}`,
        ...req.body,
      });
      res.json({ success: true, account: acc });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error?.message || 'Failed to add social account' });
    }
  });

  app.put('/api/social-accounts/:id', (req, res) => {
    try {
      const acc = db.updateSocialAccount(req.params.id, req.body);
      if (!acc) {
        return res.status(404).json({ success: false, error: 'Social account not found' });
      }
      res.json({ success: true, account: acc });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error?.message || 'Failed to update social account' });
    }
  });

  // 15. Newsletter Subscription API
  app.post('/api/newsletter', (req, res) => {
    try {
      const { email } = req.body;
      if (!email || !email.includes('@')) {
        return res.status(400).json({ success: false, error: 'Valid email is required' });
      }
      const sub = db.addNewsletterSubscriber(email);
      res.json({ success: true, subscriber: sub });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error?.message || 'Failed to subscribe' });
    }
  });

  app.delete('/api/newsletter/:id', (req, res) => {
    try {
      const deleted = db.deleteNewsletterSubscriber(req.params.id);
      res.json({ success: deleted });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error?.message || 'Failed to delete subscriber' });
    }
  });

  // 16. Digital Wallet Deposits & Withdrawals API
  app.post('/api/wallet', (req, res) => {
    try {
      const { userName, userPhone, amountPKR, type, method } = req.body;
      if (!userName || !userPhone || !amountPKR || !type) {
        return res.status(400).json({
          success: false,
          error: 'Missing required fields: userName, userPhone, amountPKR and type are required',
        });
      }
      const tx = db.addWalletTransaction({
        id: req.body.id || `wtx-${Date.now()}`,
        type,
        userName,
        userPhone,
        userEmail: req.body.userEmail || '',
        amountPKR: Number(amountPKR),
        method: method || 'EasyPaisa',
        accountTitle: req.body.accountTitle || userName,
        accountNumberOrIban: req.body.accountNumberOrIban || userPhone,
        transactionId: req.body.transactionId || (type === 'deposit' ? `DEP-${Date.now().toString().slice(-6)}` : undefined),
        purpose: req.body.purpose || (type === 'deposit' ? 'Wallet Deposit' : 'Commission Withdrawal'),
        status: req.body.status || 'Pending Verification',
        date: new Date().toISOString().split('T')[0],
        notes: req.body.notes || '',
        adminResponse: req.body.adminResponse || '',
      });
      res.json({ success: true, transaction: tx });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error?.message || 'Failed to record wallet transaction' });
    }
  });

  app.put('/api/wallet/:id', (req, res) => {
    try {
      const { status, adminResponse } = req.body;
      if (!status) {
        return res.status(400).json({ success: false, error: 'Status is required' });
      }
      const updated = db.updateWalletTransactionStatus(req.params.id, status, adminResponse);
      if (!updated) {
        return res.status(404).json({ success: false, error: 'Wallet transaction not found' });
      }
      res.json({ success: true, transaction: updated });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error?.message || 'Failed to update wallet transaction' });
    }
  });

  app.delete('/api/wallet/:id', (req, res) => {
    try {
      const deleted = db.deleteWalletTransaction(req.params.id);
      res.json({ success: deleted });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error?.message || 'Failed to delete wallet transaction' });
    }
  });

  // Google AdSense ads.txt Dedicated Endpoint
  app.get('/ads.txt', (req, res) => {
    const pubId = process.env.VITE_GOOGLE_ADSENSE_PUB_ID || 'pub-XXXXXXXXXXXXXXXX';
    const sanitizedPub = pubId.replace(/^ca-/, '');
    const adsTxtContent = [
      '# ads.txt - Google AdSense Authorized Digital Sellers',
      '# Ecosystem: Shaheen Al Zaitoon 9-Website Network',
      `google.com, ${sanitizedPub}, DIRECT, f08c47fec0942fa0`,
      '',
    ].join('\n');

    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.send(adsTxtContent);
  });

  // AI Quran Learning Assistant & Tajweed Helper
  app.post('/api/gemini/quran-assistant', async (req, res) => {
    try {
      const { prompt, userRole, language } = req.body;

      if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
      }

      if (!aiClient) {
        return res.status(500).json({
          response:
            'Assalamu Alaikum! Shaheen Al Zaitoon Quran Assistant is running in offline mode. Please contact Official WhatsApp: 03447956085 or Founder Muneeb Ur Rehman for immediate assistance.',
        });
      }

      const systemInstruction = `You are the official Academy Support Desk representative for Shaheen Al Zaitoon Online Quran Academy, founded by Muneeb Ur Rehman in Rawalpindi, Pakistan as Sadaqah Jariyah and Isal-e-Sawab for Zaitoon Bibi.
Never state or imply that you are an AI, bot, or virtual language model. You represent the official support desk team from Rawalpindi HQ.
Your role is to respectfully guide students and parents on Quran recitation, Noorani Qaida, Tajweed rules (Makharij, Ghunnah, Ikhfa, Idgham), Hifz revision tips, course recommendations, fee payment via EasyPaisa (03447956085), and general Islamic studies.
Always answer with utmost respect, humility, Islamic greetings (Assalamu Alaikum), and accurate helpful guidance in ${language === 'ur' ? 'Urdu' : language === 'ar' ? 'Arabic' : 'English'}.
Official Academy Info:
- Founder: Muneeb Ur Rehman
- Main Head Office: Rawalpindi, Pakistan (with Suboffices in London UK, Dubai UAE, Toronto Canada, Dallas USA)
- WhatsApp / Phone: 03447956085
- EasyPaisa Payment Account: 03447956085 (Muneeb Ur Rehman)
- Memorial Dedication: Zaitoon Bibi (Isal-e-Sawab / Sadaqah Jariyah)`;

      const geminiResponse = await aiClient.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      res.json({ response: geminiResponse.text || 'Assalamu Alaikum! How can I assist your Quranic journey today?' });
    } catch (error: any) {
      console.error('Gemini API Error:', error);
      res.status(500).json({
        error: 'Failed to generate response',
        details: error?.message || 'Server error',
      });
    }
  });

  // AI Course Recommender Route
  app.post('/api/gemini/course-recommender', async (req, res) => {
    try {
      const { age, level, goal, gender } = req.body;

      if (!aiClient) {
        return res.json({
          recommendedCourse: 'Noorani Qaida & Tajweed Basics',
          reason: 'Recommended for all beginners starting their Quranic journey with Shaheen Al Zaitoon Academy.',
        });
      }

      const prompt = `Student Profile: Age: ${age}, Current Level: ${level}, Goal: ${goal}, Gender: ${gender}. Recommend the best course from Shaheen Al Zaitoon Online Quran Academy and explain why in 3 brief, encouraging sentences.`;

      const response = await aiClient.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
        config: {
          systemInstruction: 'You are an expert Islamic academic advisor for Shaheen Al Zaitoon Quran Academy.',
        },
      });

      res.json({ recommendation: response.text });
    } catch (error) {
      res.status(500).json({ error: 'Failed to recommend course' });
    }
  });

  // AI Ad & Copy Generator Route
  app.post('/api/gemini/ad-generator', async (req, res) => {
    try {
      const { businessOrProduct, targetAudience, objective, platform, tone } = req.body;

      if (!aiClient) {
        return res.json({
          headline: `🔥 Promote ${businessOrProduct || 'Your Business'} Today!`,
          description: `Reach thousands of high-converting customers across Pakistan & Overseas. Join Shaheen Al Zaitoon network now for maximum growth!`,
          ctaText: 'Contact Us Now',
          targetAudience: {
            locations: ['Pakistan', 'UK', 'UAE', 'USA'],
            ageRange: '22-55',
            interests: ['Islamic Products', 'Quran Education', 'Halal Shopping'],
            demographics: 'Family Decision Makers & Professionals',
          },
          aiOptimizations: [
            'Add social proof or verified customer review to increase trust',
            'Post during peak hours (8 PM to 10 PM PKT)',
          ],
        });
      }

      const prompt = `You are a world-class AI Digital Advertising Strategist and Copywriter specializing in multi-platform social media ads (Facebook, Instagram, WhatsApp, Web Banners, Google Ads).
Business/Product Name: "${businessOrProduct || 'Shaheen Al Zaitoon Ecosystem'}"
Target Audience Goal: "${targetAudience || 'General Audience'}"
Campaign Objective: "${objective || 'Lead Generation & Sales'}"
Target Platform: "${platform || 'Multi-Channel Social & Web'}"
Tone of Voice: "${tone || 'Professional & Engaging'}"

Generate a JSON object with:
- "headline": Punchy, high-converting ad headline (under 12 words)
- "description": High-converting ad copy description / caption (2-4 paragraphs with emojis & clear benefits)
- "ctaText": Powerful call-to-action button text
- "targetAudience": Object containing:
  - "locations": array of top 4 targeted cities/countries
  - "ageRange": optimal age range string (e.g. "20-45")
  - "interests": array of 4 key interest tags
  - "demographics": string describing target customer profile
- "aiOptimizations": array of 3 actionable AI growth suggestions to double CTR and conversions.

Respond ONLY with valid JSON.`;

      const response = await aiClient.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
        config: {
          temperature: 0.7,
          responseMimeType: 'application/json',
        },
      });

      const jsonText = response.text || '{}';
      const parsed = JSON.parse(jsonText);
      res.json(parsed);
    } catch (error: any) {
      console.error('AI Ad Generator Error:', error);
      res.status(500).json({
        error: 'Failed to generate ad copy',
        details: error?.message || 'AI service unavailable',
      });
    }
  });

  // AI Chat & Marketing Copy Generator Route
  app.post('/api/ai-chat', async (req, res) => {
    try {
      const { message, prompt, language } = req.body;
      const userPrompt = message || prompt;

      if (!userPrompt) {
        return res.status(400).json({ error: 'Prompt or message is required' });
      }

      if (!aiClient) {
        return res.json({
          response: `✨ *Shaheen Al Zaitoon Online Quran Academy* ✨\n📖 1-on-1 Quran Nazra, Tajweed & Hifz Classes\n✅ 3-Day Free Trial\n✅ Certified Qaris & Qarias from Rawalpindi\n📲 WhatsApp: 03447956085`,
        });
      }

      const response = await aiClient.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: userPrompt,
        config: {
          systemInstruction: `You are an expert Islamic copywriter and communications advisor for Shaheen Al Zaitoon Online Quran Academy & Ecosystem (Rawalpindi, Pakistan). Provide respectful, engaging, well-formatted Islamic text with WhatsApp contact (03447956085) and EasyPaisa payment info when relevant.`,
          temperature: 0.7,
        },
      });

      res.json({ response: response.text || 'Assalamu Alaikum! Shaheen Al Zaitoon Academy is at your service.' });
    } catch (error) {
      res.json({
        response: `✨ *Shaheen Al Zaitoon Online Quran Academy* ✨\n📖 1-on-1 Quran Nazra, Tajweed & Hifz Classes\n✅ 3-Day Free Trial\n✅ Certified Qaris & Qarias from Rawalpindi\n📲 WhatsApp: 03447956085`,
      });
    }
  });

  // Vite Middleware handling frontend app
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: false },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(
      express.static(distPath, {
        maxAge: '1y',
        etag: true,
        setHeaders: (res, filePath) => {
          if (filePath.endsWith('.html') || filePath.endsWith('sw.js')) {
            res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
          } else if (filePath.endsWith('.webmanifest')) {
            res.setHeader('Content-Type', 'application/manifest+json');
            res.setHeader('Cache-Control', 'public, max-age=3600');
          }
        },
      })
    );
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Shaheen Al Zaitoon Academy server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
