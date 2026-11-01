import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  Save,
  CheckCircle,
  CreditCard,
  Users,
  BookOpen,
  MapPin,
  FileText,
  Plus,
  ShieldCheck,
  DollarSign,
  ArrowRight,
  RefreshCw,
  Briefcase,
  MessageSquare,
  Database,
  Smartphone,
  Wallet,
  ArrowDownLeft,
  ArrowUpRight,
  Clock,
  Search,
  Filter,
  Download,
  Trash2,
  Lock,
  LogOut,
  Mail,
  Heart,
  Calendar,
  Check,
  X,
  AlertTriangle,
  UserCheck,
  LayoutDashboard
} from 'lucide-react';
import { useAcademy } from '../context/AcademyContext';
import { AcademyLogo } from '../components/AcademyLogo';

// Helper to trigger instant CSV downloads from database tables
function exportToCSV(filename: string, rows: Record<string, any>[]) {
  if (!rows || !rows.length) {
    alert('No records available to export.');
    return;
  }
  const headers = Object.keys(rows[0]);
  const csvContent = [
    headers.join(','),
    ...rows.map((row) =>
      headers
        .map((h) => {
          const val = row[h];
          const str = val === undefined || val === null ? '' : String(val).replace(/"/g, '""');
          return `"${str}"`;
        })
        .join(',')
    ),
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}-${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export const AdminPortalPage: React.FC = () => {
  const {
    siteSettings,
    updateSiteSettings,
    payments,
    updatePaymentStatus,
    deletePayment,
    students,
    updateStudent,
    deleteStudent,
    courses,
    branches,
    announcements,
    ztProducts,
    matrimonialProfiles,
    adCampaigns,
    referrals,
    affiliatePartners,
    applications,
    updateApplicationStatus,
    deleteApplication,
    contactMessages,
    markContactMessageReplied,
    deleteContactMessage,
    donations,
    updateDonationStatus,
    deleteDonation,
    subscribers,
    deleteSubscriber,
    cloudSyncStatus,
    refreshFromCloud,
    setActivePage,
    walletTransactions,
    updateWalletTransactionStatus,
    deleteWalletTransaction,
    adminSession,
    adminLogin,
    adminLogout,
  } = useAcademy();

  // Navigation tab
  const [activeTab, setActiveTab] = useState<
    | 'overview'
    | 'settings'
    | 'payments'
    | 'wallet'
    | 'students'
    | 'careers'
    | 'messages'
    | 'donations'
    | 'subscribers'
    | 'courses'
    | 'branches'
    | 'ads'
    | 'zt'
    | 'matrimonial'
  >('overview');

  // Admin Login Form State
  const [loginEmail, setLoginEmail] = useState('mobigags@gmail.com');
  const [loginPin, setLoginPin] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Table Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Site Settings Form
  const [academyName, setAcademyName] = useState(siteSettings.academyName);
  const [ownerName, setOwnerName] = useState(siteSettings.ownerName);
  const [headOfficeCity, setHeadOfficeCity] = useState(siteSettings.headOfficeCity);
  const [contactNumber, setContactNumber] = useState(siteSettings.contactNumber);
  const [easyPaisaTitle, setEasyPaisaTitle] = useState(siteSettings.easyPaisaAccountTitle);
  const [easyPaisaNumber, setEasyPaisaNumber] = useState(siteSettings.easyPaisaAccountNumber);
  const [motherMemorialName, setMotherMemorialName] = useState(siteSettings.motherMemorialName);
  const [heroHeadline, setHeroHeadline] = useState(siteSettings.heroHeadline);
  const [facebookGroupUrl, setFacebookGroupUrl] = useState(siteSettings.facebookGroupUrl || 'https://www.facebook.com/groups/REPLACE_WITH_MY_GROUP_LINK');
  const [facebookGroupName, setFacebookGroupName] = useState(siteSettings.facebookGroupName || 'Shaheen Al Zaitoon Official Facebook Community');
  const [facebookGroupMembers, setFacebookGroupMembers] = useState(siteSettings.facebookGroupMembers || 92400);
  const [saved, setSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  // Manual Cloud Sync
  const handleManualSync = async () => {
    setIsSyncing(true);
    await refreshFromCloud();
    setIsSyncing(false);
  };

  // Login handler
  const handleAdminLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    if (!loginPin.trim()) {
      setLoginError('Please enter your Master PIN or Password.');
      return;
    }
    setIsLoggingIn(true);
    const result = await adminLogin(loginPin.trim(), loginEmail.trim());
    setIsLoggingIn(false);
    if (!result.success) {
      setLoginError(result.error || 'Authentication failed. Check your credentials.');
    }
  };

  // Settings Save
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await updateSiteSettings({
      academyName,
      ownerName,
      headOfficeCity,
      contactNumber,
      whatsappNumber: contactNumber,
      easyPaisaAccountTitle: easyPaisaTitle,
      easyPaisaAccountNumber: easyPaisaNumber,
      motherMemorialName,
      heroHeadline,
      facebookGroupUrl,
      facebookGroupName,
      facebookGroupMembers: Number(facebookGroupMembers),
    });
    setIsSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 4000);
  };

  // Total Submissions Counter
  const totalSubmissions = useMemo(() => {
    return (
      payments.length +
      walletTransactions.length +
      students.length +
      applications.length +
      contactMessages.length +
      donations.length +
      subscribers.length
    );
  }, [payments, walletTransactions, students, applications, contactMessages, donations, subscribers]);

  // Gross Tuition Revenue
  const totalTuitionPKR = useMemo(() => {
    return payments.reduce((sum, p) => sum + (p.amountPKR || 0), 0);
  }, [payments]);

  // Total Wallet Deposit & Withdraw Volume
  const totalWalletDepositPKR = useMemo(() => {
    return walletTransactions
      .filter((t) => t.type === 'deposit')
      .reduce((sum, t) => sum + (t.amountPKR || 0), 0);
  }, [walletTransactions]);

  const totalWalletWithdrawPKR = useMemo(() => {
    return walletTransactions
      .filter((t) => t.type === 'withdraw')
      .reduce((sum, t) => sum + (t.amountPKR || 0), 0);
  }, [walletTransactions]);

  // Total Donations PKR
  const totalDonationsPKR = useMemo(() => {
    return donations.reduce((sum, d) => sum + (d.amountPKR || 0), 0);
  }, [donations]);

  // Filtered Payments
  const filteredPayments = useMemo(() => {
    return payments.filter((p) => {
      const matchSearch =
        !searchQuery ||
        p.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.transactionId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.courseTitle.toLowerCase().includes(searchQuery.toLowerCase());
      const matchStatus = statusFilter === 'all' || p.status.toLowerCase() === statusFilter.toLowerCase();
      const matchStart = !startDate || p.date >= startDate;
      const matchEnd = !endDate || p.date <= endDate;
      return matchSearch && matchStatus && matchStart && matchEnd;
    });
  }, [payments, searchQuery, statusFilter, startDate, endDate]);

  // Filtered Wallet Transactions
  const filteredWalletTransactions = useMemo(() => {
    return walletTransactions.filter((tx) => {
      const matchSearch =
        !searchQuery ||
        tx.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.userPhone.includes(searchQuery) ||
        (tx.transactionId && tx.transactionId.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchStatus = statusFilter === 'all' || tx.status.toLowerCase() === statusFilter.toLowerCase();
      const matchStart = !startDate || tx.date >= startDate;
      const matchEnd = !endDate || tx.date <= endDate;
      return matchSearch && matchStatus && matchStart && matchEnd;
    });
  }, [walletTransactions, searchQuery, statusFilter, startDate, endDate]);

  // Filtered Students
  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      const matchSearch =
        !searchQuery ||
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.guardianName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchStatus = statusFilter === 'all' || s.feeStatus.toLowerCase() === statusFilter.toLowerCase();
      return matchSearch && matchStatus;
    });
  }, [students, searchQuery, statusFilter]);

  // Filtered Applications
  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      const matchSearch =
        !searchQuery ||
        (app.fullName || app.applicantName).toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.phone.includes(searchQuery) ||
        app.city.toLowerCase().includes(searchQuery.toLowerCase());
      const matchStatus = statusFilter === 'all' || app.status.toLowerCase() === statusFilter.toLowerCase();
      const matchDate = (!startDate || (app.appliedDate || app.date) >= startDate) && (!endDate || (app.appliedDate || app.date) <= endDate);
      return matchSearch && matchStatus && matchDate;
    });
  }, [applications, searchQuery, statusFilter, startDate, endDate]);

  // Filtered Messages
  const filteredMessages = useMemo(() => {
    return contactMessages.filter((m) => {
      const matchSearch =
        !searchQuery ||
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (m.phone && m.phone.includes(searchQuery)) ||
        (m.email && m.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (m.subject && m.subject.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchStatus = statusFilter === 'all' || m.status.toLowerCase() === statusFilter.toLowerCase();
      return matchSearch && matchStatus;
    });
  }, [contactMessages, searchQuery, statusFilter]);

  // Filtered Donations
  const filteredDonations = useMemo(() => {
    return donations.filter((d) => {
      const matchSearch =
        !searchQuery ||
        d.donorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.transactionId.toLowerCase().includes(searchQuery.toLowerCase());
      const matchStatus = statusFilter === 'all' || d.status.toLowerCase() === statusFilter.toLowerCase();
      return matchSearch && matchStatus;
    });
  }, [donations, searchQuery, statusFilter]);

  // Filtered Subscribers
  const filteredSubscribers = useMemo(() => {
    return subscribers.filter((sub) => {
      return !searchQuery || sub.email.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [subscribers, searchQuery]);

  // -------------------------------------------------------------------------
  // RESTRICTED AUTHENTICATION GATE
  // -------------------------------------------------------------------------
  if (!adminSession) {
    return (
      <div className="bg-red-950 text-white min-h-screen py-16 px-4 flex items-center justify-center">
        <div className="max-w-md w-full bg-gradient-to-b from-red-900 via-red-950 to-amber-950 border-2 border-amber-500/60 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-3">
            <div className="mx-auto flex justify-center">
              <AcademyLogo size="lg" shape="rounded" glowEffect={true} />
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-[11px] font-bold uppercase tracking-wider border border-amber-400/30">
              <Lock className="w-3.5 h-3.5" />
              <span>Owner & Admin Security Gate</span>
            </div>
            <h1 className="text-2xl font-serif font-bold text-amber-100">
              Admin Portal Login
            </h1>
            <p className="text-xs text-red-200">
              Restricted management console for Founder <strong>{siteSettings.ownerName}</strong> and authorized Rawalpindi HQ administration.
            </p>
          </div>

          <div className="bg-red-950/80 border border-amber-500/30 rounded-2xl p-4 text-xs space-y-2">
            <div className="text-amber-300 font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Authorized Owner Credentials</span>
            </div>
            <div className="text-stone-300 space-y-1 text-[11px]">
              <div>• Email: <strong className="text-white">mobigags@gmail.com</strong></div>
              <div>• Master PIN / WhatsApp: <strong className="text-emerald-400 font-mono">03447956085</strong></div>
              <div>• Or Password: <strong className="text-amber-200 font-mono">Shaheen2026!</strong></div>
            </div>
          </div>

          {loginError && (
            <div className="bg-red-900/90 border border-red-500 text-red-100 p-3 rounded-xl text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-300 flex-shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleAdminLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-amber-200 mb-1">
                Admin Email / Account
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-red-400 absolute left-3 top-3" />
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="mobigags@gmail.com"
                  className="w-full bg-red-950 border border-red-700 text-white rounded-xl pl-9 pr-3 py-2.5 text-xs focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-amber-200 mb-1">
                Master Security PIN or Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-red-400 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={loginPin}
                  onChange={(e) => setLoginPin(e.target.value)}
                  placeholder="Enter 03447956085 or Shaheen2026!"
                  className="w-full bg-red-950 border border-red-700 text-white rounded-xl pl-9 pr-3 py-2.5 text-xs focus:outline-none focus:border-amber-400 font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-red-950 font-bold py-3 rounded-xl text-xs shadow-lg transition flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              {isLoggingIn ? (
                <div className="w-4 h-4 border-2 border-red-950 border-t-transparent rounded-full animate-spin" />
              ) : (
                <ShieldCheck className="w-4 h-4" />
              )}
              <span>{isLoggingIn ? 'Authenticating...' : 'Sign In as Super Admin'}</span>
            </button>
          </form>

          <div className="text-center">
            <button
              type="button"
              onClick={() => setActivePage('home')}
              className="text-xs text-red-300 hover:text-amber-300 underline"
            >
              Return to Public Academy Homepage
            </button>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------------------
  // AUTHENTICATED ADMIN CONSOLE
  // -------------------------------------------------------------------------
  return (
    <div className="bg-red-950 text-white min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Header & Session Bar */}
        <div className="bg-gradient-to-r from-red-900 via-amber-950 to-red-900 border-2 border-amber-500/50 rounded-2xl p-6 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <AcademyLogo size="lg" shape="rounded" glowEffect={true} />
            <div>
              <div className="text-xs uppercase font-extrabold text-amber-300 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Super Admin & Owner Control Center</span>
              </div>
              <h1 className="text-2xl font-serif font-bold text-amber-100">
                {siteSettings.academyName}
              </h1>
              <p className="text-xs text-red-200">
                Authenticated as: <strong className="text-white">{adminSession.adminName}</strong> ({adminSession.email}) • HQ Rawalpindi, Pakistan
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* EasyPaisa Tag */}
            <div className="flex items-center gap-2 bg-red-950 p-2 rounded-xl border border-amber-500/30 text-xs">
              <span className="text-red-300">EasyPaisa:</span>
              <span className="font-mono font-bold text-emerald-400">{siteSettings.easyPaisaAccountNumber}</span>
            </div>

            {/* Cloud Database Sync Status */}
            <div className="flex items-center gap-2 bg-red-950/90 p-2 rounded-xl border border-emerald-500/40 text-xs">
              <Database className="w-4 h-4 text-emerald-400" />
              <div className="flex flex-col text-[11px] leading-tight">
                <span className="text-emerald-300 font-bold">Cloud Database</span>
                <span className="text-[10px] text-red-200 capitalize">
                  {cloudSyncStatus === 'syncing' ? 'Syncing...' : cloudSyncStatus === 'synced' ? 'Live & Persistent' : 'Offline Mode'}
                </span>
              </div>
              <button
                type="button"
                onClick={handleManualSync}
                disabled={isSyncing}
                title="Refresh latest data from cloud database"
                className="bg-emerald-700 hover:bg-emerald-600 text-white p-1.5 rounded-lg text-xs flex items-center gap-1 disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                <span className="text-[10px] font-bold">Sync</span>
              </button>
            </div>

            {/* Logout Button */}
            <button
              onClick={adminLogout}
              className="bg-red-800 hover:bg-red-700 text-white text-xs font-bold px-3 py-2 rounded-xl border border-red-600 flex items-center gap-1.5 transition"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-red-800 pb-3">
          <button
            onClick={() => { setActiveTab('overview'); setSearchQuery(''); setStatusFilter('all'); }}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'overview' ? 'bg-amber-500 text-red-950 shadow-lg' : 'bg-red-900/60 text-red-200 hover:bg-red-900'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Overview ({totalSubmissions})</span>
          </button>

          <button
            onClick={() => { setActiveTab('payments'); setSearchQuery(''); setStatusFilter('all'); }}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'payments' ? 'bg-amber-500 text-red-950 shadow-lg' : 'bg-red-900/60 text-red-200 hover:bg-red-900'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>Payments ({payments.length})</span>
          </button>

          <button
            onClick={() => { setActiveTab('wallet'); setSearchQuery(''); setStatusFilter('all'); }}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'wallet' ? 'bg-amber-500 text-red-950 shadow-lg' : 'bg-red-900/60 text-red-200 hover:bg-red-900'
            }`}
          >
            <Wallet className="w-3.5 h-3.5" />
            <span>Wallet ({walletTransactions.length})</span>
          </button>

          <button
            onClick={() => { setActiveTab('students'); setSearchQuery(''); setStatusFilter('all'); }}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'students' ? 'bg-amber-500 text-red-950 shadow-lg' : 'bg-red-900/60 text-red-200 hover:bg-red-900'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Admissions ({students.length})</span>
          </button>

          <button
            onClick={() => { setActiveTab('careers'); setSearchQuery(''); setStatusFilter('all'); }}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'careers' ? 'bg-amber-500 text-red-950 shadow-lg' : 'bg-red-900/60 text-red-200 hover:bg-red-900'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Teachers ({applications.length})</span>
          </button>

          <button
            onClick={() => { setActiveTab('messages'); setSearchQuery(''); setStatusFilter('all'); }}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'messages' ? 'bg-amber-500 text-red-950 shadow-lg' : 'bg-red-900/60 text-red-200 hover:bg-red-900'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Inquiries ({contactMessages.length})</span>
          </button>

          <button
            onClick={() => { setActiveTab('donations'); setSearchQuery(''); setStatusFilter('all'); }}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'donations' ? 'bg-amber-500 text-red-950 shadow-lg' : 'bg-red-900/60 text-red-200 hover:bg-red-900'
            }`}
          >
            <Heart className="w-3.5 h-3.5" />
            <span>Donations ({donations.length})</span>
          </button>

          <button
            onClick={() => { setActiveTab('subscribers'); setSearchQuery(''); setStatusFilter('all'); }}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'subscribers' ? 'bg-amber-500 text-red-950 shadow-lg' : 'bg-red-900/60 text-red-200 hover:bg-red-900'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Subscribers ({subscribers.length})</span>
          </button>

          <button
            onClick={() => { setActiveTab('settings'); setSearchQuery(''); setStatusFilter('all'); }}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'settings' ? 'bg-amber-500 text-red-950 shadow-lg' : 'bg-red-900/60 text-red-200 hover:bg-red-900'
            }`}
          >
            Site Settings & CMS
          </button>

          <button
            onClick={() => setActivePage('google-ecosystem')}
            className="px-3.5 py-2 rounded-xl text-xs font-bold transition-all bg-emerald-700 hover:bg-emerald-600 text-white ml-auto flex items-center gap-1.5 shadow-md"
          >
            <span>Google AdSense Hub</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* ------------------------------------------------------------------- */}
        {/* TAB 1: OVERVIEW DASHBOARD */}
        {/* ------------------------------------------------------------------- */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Total Submissions Hero Banner */}
            <div className="bg-gradient-to-r from-red-900 via-amber-950 to-red-900 border-2 border-amber-500/50 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-400/30">
                  <Database className="w-3.5 h-3.5" />
                  <span>Real-time Permanent Storage Active</span>
                </div>
                <h2 className="text-3xl font-serif font-black text-amber-100">
                  {totalSubmissions} Total Submissions in Database
                </h2>
                <p className="text-xs text-red-200 max-w-xl">
                  Every student admission, fee payment, teacher application, wallet transaction, inquiry, donation, and subscriber is persistently synchronized across sessions.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() =>
                    exportToCSV('shaheen-all-submissions-summary', [
                      {
                        TotalSubmissions: totalSubmissions,
                        AdmissionsCount: students.length,
                        PaymentsCount: payments.length,
                        TotalTuitionPKR: totalTuitionPKR,
                        WalletTransactionsCount: walletTransactions.length,
                        WalletDepositsPKR: totalWalletDepositPKR,
                        WalletWithdrawalsPKR: totalWalletWithdrawPKR,
                        TeacherApplicationsCount: applications.length,
                        InquiriesCount: contactMessages.length,
                        DonationsCount: donations.length,
                        DonationsPKR: totalDonationsPKR,
                        SubscribersCount: subscribers.length,
                        ExportDate: new Date().toISOString(),
                      },
                    ])
                  }
                  className="bg-amber-500 hover:bg-amber-400 text-red-950 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow"
                >
                  <Download className="w-4 h-4" />
                  <span>Export Executive Summary CSV</span>
                </button>
              </div>
            </div>

            {/* 8-Point Stat Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Card 1: Gross Tuition Revenue */}
              <div
                onClick={() => setActiveTab('payments')}
                className="bg-red-900/60 hover:bg-red-900/90 border border-amber-500/40 rounded-2xl p-5 space-y-2 cursor-pointer transition shadow"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-amber-300 uppercase">Tuition Fee Revenue</span>
                  <CreditCard className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-2xl font-serif font-black text-white">
                  Rs. {totalTuitionPKR.toLocaleString()}
                </div>
                <div className="text-[11px] text-stone-300 flex items-center justify-between">
                  <span>{payments.length} verified receipts</span>
                  <span className="text-emerald-400 font-bold">Direct EasyPaisa</span>
                </div>
              </div>

              {/* Card 2: Student Admissions */}
              <div
                onClick={() => setActiveTab('students')}
                className="bg-red-900/60 hover:bg-red-900/90 border border-amber-500/40 rounded-2xl p-5 space-y-2 cursor-pointer transition shadow"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-amber-300 uppercase">Student Admissions</span>
                  <Users className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-2xl font-serif font-black text-white">
                  {students.length} Students
                </div>
                <div className="text-[11px] text-stone-300 flex items-center justify-between">
                  <span>Across 3 8-hr shifts</span>
                  <span className="text-emerald-400 font-bold">100% Active</span>
                </div>
              </div>

              {/* Card 3: Teacher Applications (Rs. 50,000 Starting Salary) */}
              <div
                onClick={() => setActiveTab('careers')}
                className="bg-red-900/60 hover:bg-red-900/90 border border-amber-500/40 rounded-2xl p-5 space-y-2 cursor-pointer transition shadow"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-amber-300 uppercase">Teacher Applications</span>
                  <Briefcase className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-2xl font-serif font-black text-white">
                  {applications.length} Applicants
                </div>
                <div className="text-[11px] text-stone-300 flex items-center justify-between">
                  <span className="text-emerald-300 font-bold">Min Rs. 50,000 PKR</span>
                  <span className="text-amber-300">Shifts 1, 2 & 3</span>
                </div>
              </div>

              {/* Card 4: Digital Wallet Volume */}
              <div
                onClick={() => setActiveTab('wallet')}
                className="bg-red-900/60 hover:bg-red-900/90 border border-amber-500/40 rounded-2xl p-5 space-y-2 cursor-pointer transition shadow"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-amber-300 uppercase">Wallet Deposits</span>
                  <Wallet className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-2xl font-serif font-black text-white">
                  Rs. {totalWalletDepositPKR.toLocaleString()}
                </div>
                <div className="text-[11px] text-stone-300 flex items-center justify-between">
                  <span>{walletTransactions.length} transactions</span>
                  <span className="text-amber-300 font-bold">Out: Rs. {totalWalletWithdrawPKR.toLocaleString()}</span>
                </div>
              </div>

              {/* Card 5: Inquiries & Messages */}
              <div
                onClick={() => setActiveTab('messages')}
                className="bg-red-900/60 hover:bg-red-900/90 border border-amber-500/40 rounded-2xl p-5 space-y-2 cursor-pointer transition shadow"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-amber-300 uppercase">Contact Inquiries</span>
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-2xl font-serif font-black text-white">
                  {contactMessages.length} Messages
                </div>
                <div className="text-[11px] text-stone-300 flex items-center justify-between">
                  <span>{contactMessages.filter((m) => m.status === 'Unread').length} unread</span>
                  <span className="text-emerald-400">WhatsApp Desk</span>
                </div>
              </div>

              {/* Card 6: Sadaqah & Donations */}
              <div
                onClick={() => setActiveTab('donations')}
                className="bg-red-900/60 hover:bg-red-900/90 border border-amber-500/40 rounded-2xl p-5 space-y-2 cursor-pointer transition shadow"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-amber-300 uppercase">Sadaqah Jariyah</span>
                  <Heart className="w-4 h-4 text-rose-400" />
                </div>
                <div className="text-2xl font-serif font-black text-white">
                  Rs. {totalDonationsPKR.toLocaleString()}
                </div>
                <div className="text-[11px] text-stone-300 flex items-center justify-between">
                  <span>{donations.length} donor sponsorships</span>
                  <span className="text-rose-300">Zaitoon Bibi Fund</span>
                </div>
              </div>

              {/* Card 7: Newsletter Subscribers */}
              <div
                onClick={() => setActiveTab('subscribers')}
                className="bg-red-900/60 hover:bg-red-900/90 border border-amber-500/40 rounded-2xl p-5 space-y-2 cursor-pointer transition shadow"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-amber-300 uppercase">Newsletter Audience</span>
                  <Mail className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-2xl font-serif font-black text-white">
                  {subscribers.length} Subscribers
                </div>
                <div className="text-[11px] text-stone-300 flex items-center justify-between">
                  <span>Daily Quran Ayah & News</span>
                  <span className="text-emerald-400">Active</span>
                </div>
              </div>

              {/* Card 8: Ecosystem & Shifts */}
              <div
                onClick={() => setActivePage('google-ecosystem')}
                className="bg-red-900/60 hover:bg-red-900/90 border border-amber-500/40 rounded-2xl p-5 space-y-2 cursor-pointer transition shadow"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-amber-300 uppercase">Global Ecosystem</span>
                  <Sparkles className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-2xl font-serif font-black text-amber-300">
                  3 Shifts (8h each)
                </div>
                <div className="text-[11px] text-stone-300 flex items-center justify-between">
                  <span>7h teaching + 1h break</span>
                  <span className="text-emerald-400">24/7 PKT</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------- */}
        {/* TAB 2: PAYMENTS VERIFICATION */}
        {/* ------------------------------------------------------------------- */}
        {activeTab === 'payments' && (
          <div className="bg-red-900/60 border border-amber-500/30 rounded-3xl p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-red-800 pb-4">
              <div>
                <h2 className="text-xl font-serif font-bold text-amber-200">
                  Fee & Commission Receipts Verification
                </h2>
                <p className="text-xs text-red-200">
                  Payments received directly via EasyPaisa ({siteSettings.easyPaisaAccountNumber}) & Bank Accounts for Owner {siteSettings.ownerName}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => exportToCSV('shaheen-payments', filteredPayments)}
                  className="bg-emerald-700 hover:bg-emerald-600 text-white font-bold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1.5 shadow"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-xs font-bold px-3 py-1 rounded-full">
                  Total: {filteredPayments.length}
                </span>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 bg-red-950/80 p-3.5 rounded-2xl border border-red-800">
              <div className="sm:col-span-2 relative">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search student, course, TID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-red-900/80 border border-red-700 text-white rounded-xl pl-9 pr-3 py-1.5 text-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full bg-red-900/80 border border-red-700 text-white rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-amber-400"
                >
                  <option value="all">All Statuses</option>
                  <option value="Approved">Approved</option>
                  <option value="Pending Verification">Pending Verification</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

              <div className="flex items-center gap-1">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full bg-red-900/80 border border-red-700 text-white rounded-xl px-2 py-1.5 text-[11px]"
                />
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full bg-red-900/80 border border-red-700 text-white rounded-xl px-2 py-1.5 text-[11px]"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-red-950 text-amber-300 uppercase border-b border-red-800">
                  <tr>
                    <th className="p-3">Student Name</th>
                    <th className="p-3">Course</th>
                    <th className="p-3">Amount</th>
                    <th className="p-3">Method</th>
                    <th className="p-3">Transaction ID (TID)</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-red-800/80">
                  {filteredPayments.map((p) => (
                    <tr key={p.id} className="hover:bg-red-900/80">
                      <td className="p-3 font-bold text-white">{p.studentName}</td>
                      <td className="p-3 text-red-200">{p.courseTitle}</td>
                      <td className="p-3 font-bold text-emerald-400">Rs. {p.amountPKR}</td>
                      <td className="p-3">{p.paymentMethod}</td>
                      <td className="p-3 font-mono text-amber-300 font-bold">{p.transactionId}</td>
                      <td className="p-3 text-red-300">{p.date}</td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            p.status === 'Approved'
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30'
                              : 'bg-amber-500/20 text-amber-300 border border-amber-400/30'
                          }`}
                        >
                          {p.status}
                        </span>
                      </td>
                      <td className="p-3 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          {p.status !== 'Approved' && (
                            <button
                              onClick={() => updatePaymentStatus(p.id, 'Approved')}
                              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-2.5 py-1 rounded text-[11px]"
                            >
                              Approve
                            </button>
                          )}
                          <button
                            onClick={() => {
                              if (confirm('Are you sure you want to delete this payment record permanently?')) {
                                deletePayment(p.id);
                              }
                            }}
                            className="bg-red-800 hover:bg-red-700 text-red-200 p-1 rounded"
                            title="Delete receipt"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------- */}
        {/* TAB 3: WALLET DEPOSITS & WITHDRAWALS */}
        {/* ------------------------------------------------------------------- */}
        {activeTab === 'wallet' && (
          <div className="bg-red-900/60 border border-amber-500/30 rounded-3xl p-6 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-red-800 pb-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-200 flex items-center gap-2">
                  <Wallet className="w-5 h-5 text-amber-400" />
                  <span>Wallet Deposits & Withdrawals Manager</span>
                </h2>
                <p className="text-xs text-stone-300 font-urdu mt-0.5">
                  ڈپازٹ اور ودڈرا درخواستوں کی تصدیق اور آن لائن منظوری
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => exportToCSV('shaheen-wallet-transactions', filteredWalletTransactions)}
                  className="bg-emerald-700 hover:bg-emerald-600 text-white font-bold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1.5 shadow"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>
                <button
                  onClick={() => setActivePage('wallet')}
                  className="bg-amber-500 hover:bg-amber-400 text-red-950 font-bold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1.5 shadow"
                >
                  <span>Open Wallet</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 bg-red-950/80 p-3.5 rounded-2xl border border-red-800">
              <div className="sm:col-span-2 relative">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search user, phone, TID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-red-900/80 border border-red-700 text-white rounded-xl pl-9 pr-3 py-1.5 text-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full bg-red-900/80 border border-red-700 text-white rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-amber-400"
                >
                  <option value="all">All Statuses</option>
                  <option value="Approved">Approved</option>
                  <option value="Completed">Completed</option>
                  <option value="Pending Verification">Pending Verification</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

              <div className="flex items-center gap-1">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full bg-red-900/80 border border-red-700 text-white rounded-xl px-2 py-1.5 text-[11px]"
                />
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full bg-red-900/80 border border-red-700 text-white rounded-xl px-2 py-1.5 text-[11px]"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-red-950 text-amber-300 uppercase border-b border-red-800">
                  <tr>
                    <th className="p-3">Type & Date</th>
                    <th className="p-3">User & Contact</th>
                    <th className="p-3">Amount</th>
                    <th className="p-3">Method & Account</th>
                    <th className="p-3">TID / Ref</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-red-800/80">
                  {filteredWalletTransactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-red-900/80">
                      <td className="p-3 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1 font-bold text-[10px] px-2 py-0.5 rounded-full ${
                            tx.type === 'deposit'
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                              : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          }`}
                        >
                          {tx.type === 'deposit' ? <ArrowDownLeft className="w-3 h-3" /> : <ArrowUpRight className="w-3 h-3" />}
                          {tx.type === 'deposit' ? 'Deposit' : 'Withdraw'}
                        </span>
                        <div className="text-[10px] text-stone-400 mt-0.5">{tx.date}</div>
                      </td>

                      <td className="p-3">
                        <div className="font-bold text-white">{tx.userName}</div>
                        <div className="text-[10px] font-mono text-stone-300">{tx.userPhone}</div>
                      </td>

                      <td className="p-3 font-bold whitespace-nowrap">
                        <span className={tx.type === 'deposit' ? 'text-emerald-400' : 'text-amber-300'}>
                          Rs. {tx.amountPKR.toLocaleString()} PKR
                        </span>
                      </td>

                      <td className="p-3">
                        <div className="font-bold text-stone-200">{tx.method}</div>
                        <div className="text-[10px] text-stone-400 font-mono">{tx.accountNumberOrIban}</div>
                      </td>

                      <td className="p-3 font-mono text-[11px] text-stone-300">
                        {tx.transactionId || tx.id}
                      </td>

                      <td className="p-3 whitespace-nowrap">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            tx.status === 'Approved' || tx.status === 'Completed'
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30'
                              : tx.status === 'Rejected'
                              ? 'bg-red-500/20 text-red-300 border border-red-400/30'
                              : 'bg-amber-500/20 text-amber-300 border border-amber-400/30'
                          }`}
                        >
                          {tx.status}
                        </span>
                      </td>

                      <td className="p-3 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          {tx.status !== 'Approved' && tx.status !== 'Completed' && (
                            <button
                              onClick={() =>
                                updateWalletTransactionStatus(
                                  tx.id,
                                  tx.type === 'deposit' ? 'Approved' : 'Completed',
                                  'Approved by Super Admin'
                                )
                              }
                              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-2 py-1 rounded text-[10px] transition"
                            >
                              {tx.type === 'deposit' ? 'Approve' : 'Mark Paid'}
                            </button>
                          )}
                          <button
                            onClick={() => {
                              if (confirm('Delete this transaction permanently?')) {
                                deleteWalletTransaction(tx.id);
                              }
                            }}
                            className="bg-red-800 hover:bg-red-700 text-red-200 p-1 rounded"
                            title="Delete transaction"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------- */}
        {/* TAB 4: STUDENTS ADMISSIONS */}
        {/* ------------------------------------------------------------------- */}
        {activeTab === 'students' && (
          <div className="bg-red-900/60 border border-amber-500/30 rounded-3xl p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-red-800 pb-4">
              <div>
                <h2 className="text-xl font-serif font-bold text-amber-200">
                  Enrolled Students & Admissions ({filteredStudents.length})
                </h2>
                <p className="text-xs text-red-200">Manage student records, fee status, and attendance</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => exportToCSV('shaheen-students', filteredStudents)}
                  className="bg-emerald-700 hover:bg-emerald-600 text-white font-bold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1.5 shadow"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>
                <button
                  onClick={() => setActivePage('admissions')}
                  className="bg-amber-500 hover:bg-amber-400 text-red-950 font-bold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1.5 shadow"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>New Admission</span>
                </button>
              </div>
            </div>

            {/* Search */}
            <div className="bg-red-950/80 p-3 rounded-xl border border-red-800 flex items-center gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search student name, guardian, ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-red-900/80 border border-red-700 text-white rounded-xl pl-9 pr-3 py-1.5 text-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-red-900/80 border border-red-700 text-white rounded-xl px-3 py-1.5 text-xs"
              >
                <option value="all">All Fee Status</option>
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
                <option value="Overdue">Overdue</option>
              </select>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-red-950 text-amber-300 uppercase border-b border-red-800">
                  <tr>
                    <th className="p-3">ID</th>
                    <th className="p-3">Student Name</th>
                    <th className="p-3">Guardian</th>
                    <th className="p-3">Attendance</th>
                    <th className="p-3">Current Para</th>
                    <th className="p-3">Fee Status</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-red-800/80">
                  {filteredStudents.map((s) => (
                    <tr key={s.id} className="hover:bg-red-900/80">
                      <td className="p-3 font-mono text-amber-300">{s.id}</td>
                      <td className="p-3 font-bold text-white">{s.name}</td>
                      <td className="p-3 text-red-200">{s.guardianName}</td>
                      <td className="p-3 text-emerald-400 font-bold">{s.attendanceRate}%</td>
                      <td className="p-3 font-bold text-amber-200">Para {s.currentPara}</td>
                      <td className="p-3">
                        <select
                          value={s.feeStatus}
                          onChange={(e) => updateStudent(s.id, { feeStatus: e.target.value as any })}
                          className="bg-red-950 border border-red-700 text-white rounded px-2 py-0.5 text-[10px] font-bold"
                        >
                          <option value="Paid">Paid</option>
                          <option value="Pending">Pending</option>
                          <option value="Overdue">Overdue</option>
                        </select>
                      </td>
                      <td className="p-3">
                        <button
                          onClick={() => {
                            if (confirm(`Delete student record for ${s.name}?`)) {
                              deleteStudent(s.id);
                            }
                          }}
                          className="bg-red-800 hover:bg-red-700 text-red-200 p-1 rounded"
                          title="Delete student"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------- */}
        {/* TAB 5: TEACHERS & CAREERS (Rs. 50,000 STARTING SALARY STANDARDS) */}
        {/* ------------------------------------------------------------------- */}
        {activeTab === 'careers' && (
          <div className="bg-red-900/60 border border-amber-500/30 rounded-3xl p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-red-800 pb-4">
              <div>
                <h2 className="text-xl font-serif font-bold text-amber-200 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-amber-400" />
                  <span>Teacher & Qari Recruitment Applications ({filteredApplications.length})</span>
                </h2>
                <p className="text-xs text-red-200">
                  Fixed starting salary standard: <strong>Rs. 50,000 PKR</strong> minimum with tenure-based increments across 3 8-hour shifts.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => exportToCSV('shaheen-teacher-applications', filteredApplications)}
                  className="bg-emerald-700 hover:bg-emerald-600 text-white font-bold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1.5 shadow"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>

            {/* Search */}
            <div className="bg-red-950/80 p-3 rounded-xl border border-red-800 flex items-center gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search applicant name, phone, city..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-red-900/80 border border-red-700 text-white rounded-xl pl-9 pr-3 py-1.5 text-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-red-900/80 border border-red-700 text-white rounded-xl px-3 py-1.5 text-xs"
              >
                <option value="all">All Application Status</option>
                <option value="Pending Review">Pending Review</option>
                <option value="Audition Scheduled">Audition Scheduled</option>
                <option value="Accepted">Accepted</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-red-950 text-amber-300 uppercase border-b border-red-800">
                  <tr>
                    <th className="p-3">Ref ID</th>
                    <th className="p-3">Name</th>
                    <th className="p-3">Contact</th>
                    <th className="p-3">Starting Salary (Rs. 50k Standard)</th>
                    <th className="p-3">Shift</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-red-800/80">
                  {filteredApplications.map((app) => (
                    <tr key={app.id} className="hover:bg-red-900/80">
                      <td className="p-3 font-mono text-amber-300">{app.id}</td>
                      <td className="p-3 font-bold text-white">{app.fullName || app.applicantName}</td>
                      <td className="p-3 font-mono text-emerald-400">
                        <a
                          href={`https://wa.me/92${app.phone.replace(/^0/, '')}`}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:underline"
                        >
                          {app.phone}
                        </a>
                      </td>
                      <td className="p-3">
                        <span className="font-serif font-black text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/40 block w-fit">
                          Rs. {(app.approvedSalaryPKR || app.expectedSalaryPKR || 50000).toLocaleString()}
                        </span>
                      </td>
                      <td className="p-3 text-red-200">{app.teachingShift || '8-Hour Shift'}</td>
                      <td className="p-3">
                        <select
                          value={app.status}
                          onChange={(e) => updateApplicationStatus(app.id, e.target.value as any)}
                          className="bg-red-950 border border-red-700 text-white rounded px-2 py-0.5 text-[10px] font-bold"
                        >
                          <option value="Pending Review">Pending Review</option>
                          <option value="Audition Scheduled">Audition Scheduled</option>
                          <option value="Accepted">Accepted</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      </td>
                      <td className="p-3">
                        <button
                          onClick={() => {
                            if (confirm(`Delete application for ${app.fullName || app.applicantName}?`)) {
                              deleteApplication(app.id);
                            }
                          }}
                          className="bg-red-800 hover:bg-red-700 text-red-200 p-1 rounded"
                          title="Delete application"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------- */}
        {/* TAB 6: INQUIRIES & CONTACT MESSAGES */}
        {/* ------------------------------------------------------------------- */}
        {activeTab === 'messages' && (
          <div className="bg-red-900/60 border border-amber-500/30 rounded-3xl p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-red-800 pb-4">
              <div>
                <h2 className="text-xl font-serif font-bold text-amber-200 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-amber-400" />
                  <span>Contact Desk Messages ({filteredMessages.length})</span>
                </h2>
                <p className="text-xs text-red-200">User inquiries from Contact Us and Help Support forms</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => exportToCSV('shaheen-contact-inquiries', filteredMessages)}
                  className="bg-emerald-700 hover:bg-emerald-600 text-white font-bold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1.5 shadow"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-red-950 text-amber-300 uppercase border-b border-red-800">
                  <tr>
                    <th className="p-3">Ticket</th>
                    <th className="p-3">Name</th>
                    <th className="p-3">Contact</th>
                    <th className="p-3">Subject</th>
                    <th className="p-3">Message</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-red-800/80">
                  {filteredMessages.map((msg) => (
                    <tr key={msg.id} className="hover:bg-red-900/80">
                      <td className="p-3 font-mono text-amber-300">{msg.id}</td>
                      <td className="p-3 font-bold text-white">{msg.name}</td>
                      <td className="p-3 font-mono text-emerald-400">
                        {msg.phone && (
                          <a
                            href={`https://wa.me/92${msg.phone.replace(/^0/, '')}`}
                            target="_blank"
                            rel="noreferrer"
                            className="hover:underline block"
                          >
                            {msg.phone}
                          </a>
                        )}
                        {msg.email && <span className="text-[10px] text-stone-300 block">{msg.email}</span>}
                      </td>
                      <td className="p-3 text-amber-200 font-semibold">{msg.subject}</td>
                      <td className="p-3 text-red-100 max-w-xs truncate" title={msg.message}>{msg.message}</td>
                      <td className="p-3 text-red-300">{msg.date}</td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            msg.status === 'Replied'
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30'
                              : 'bg-amber-500/20 text-amber-300 border border-amber-400/30'
                          }`}
                        >
                          {msg.status}
                        </span>
                      </td>
                      <td className="p-3 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          {msg.status !== 'Replied' && (
                            <button
                              onClick={() => markContactMessageReplied(msg.id)}
                              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-2 py-1 rounded text-[10px]"
                            >
                              Mark Replied
                            </button>
                          )}
                          <button
                            onClick={() => {
                              if (confirm('Delete this message?')) {
                                deleteContactMessage(msg.id);
                              }
                            }}
                            className="bg-red-800 hover:bg-red-700 text-red-200 p-1 rounded"
                            title="Delete message"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------- */}
        {/* TAB 7: DONATIONS & SADAQAH JARIYAH */}
        {/* ------------------------------------------------------------------- */}
        {activeTab === 'donations' && (
          <div className="bg-red-900/60 border border-amber-500/30 rounded-3xl p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-red-800 pb-4">
              <div>
                <h2 className="text-xl font-serif font-bold text-amber-200 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-rose-400" />
                  <span>Sadaqah Jariyah & Orphan Fund Donations ({filteredDonations.length})</span>
                </h2>
                <p className="text-xs text-red-200">
                  Dedicated as Isal-e-Sawab for Zaitoon Bibi • Total Collected: Rs. {totalDonationsPKR.toLocaleString()} PKR
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => exportToCSV('shaheen-donations', filteredDonations)}
                  className="bg-emerald-700 hover:bg-emerald-600 text-white font-bold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1.5 shadow"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-red-950 text-amber-300 uppercase border-b border-red-800">
                  <tr>
                    <th className="p-3">Ref ID</th>
                    <th className="p-3">Donor Name</th>
                    <th className="p-3">Amount PKR</th>
                    <th className="p-3">Method</th>
                    <th className="p-3">Transaction ID (TID)</th>
                    <th className="p-3">Purpose</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-red-800/80">
                  {filteredDonations.map((d) => (
                    <tr key={d.id} className="hover:bg-red-900/80">
                      <td className="p-3 font-mono text-amber-300">{d.id}</td>
                      <td className="p-3 font-bold text-white">{d.donorName}</td>
                      <td className="p-3 font-bold text-emerald-400">Rs. {d.amountPKR.toLocaleString()}</td>
                      <td className="p-3">{d.paymentMethod}</td>
                      <td className="p-3 font-mono text-amber-300">{d.transactionId}</td>
                      <td className="p-3 text-stone-300">{d.purpose || 'Sadaqah'}</td>
                      <td className="p-3 text-red-300">{d.date}</td>
                      <td className="p-3">
                        <span className="bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded text-[10px] font-bold">
                          {d.status}
                        </span>
                      </td>
                      <td className="p-3 whitespace-nowrap">
                        <button
                          onClick={() => {
                            if (confirm('Delete this donation record?')) {
                              deleteDonation(d.id);
                            }
                          }}
                          className="bg-red-800 hover:bg-red-700 text-red-200 p-1 rounded"
                          title="Delete donation"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------- */}
        {/* TAB 8: NEWSLETTER SUBSCRIBERS */}
        {/* ------------------------------------------------------------------- */}
        {activeTab === 'subscribers' && (
          <div className="bg-red-900/60 border border-amber-500/30 rounded-3xl p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-red-800 pb-4">
              <div>
                <h2 className="text-xl font-serif font-bold text-amber-200 flex items-center gap-2">
                  <Mail className="w-5 h-5 text-amber-400" />
                  <span>Newsletter Subscribers ({filteredSubscribers.length})</span>
                </h2>
                <p className="text-xs text-red-200">Registered emails for daily Quran verses, Tajweed tips and updates</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => exportToCSV('shaheen-newsletter-subscribers', filteredSubscribers)}
                  className="bg-emerald-700 hover:bg-emerald-600 text-white font-bold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1.5 shadow"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-red-950 text-amber-300 uppercase border-b border-red-800">
                  <tr>
                    <th className="p-3">Subscriber ID</th>
                    <th className="p-3">Email Address</th>
                    <th className="p-3">Subscribed Date</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-red-800/80">
                  {filteredSubscribers.map((sub) => (
                    <tr key={sub.id} className="hover:bg-red-900/80">
                      <td className="p-3 font-mono text-amber-300">{sub.id}</td>
                      <td className="p-3 font-bold text-white">{sub.email}</td>
                      <td className="p-3 text-red-300">{sub.date}</td>
                      <td className="p-3">
                        <button
                          onClick={() => {
                            if (confirm(`Remove ${sub.email} from subscribers?`)) {
                              deleteSubscriber(sub.id);
                            }
                          }}
                          className="bg-red-800 hover:bg-red-700 text-red-200 p-1 rounded"
                          title="Delete subscriber"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------- */}
        {/* TAB 9: SITE SETTINGS & CMS */}
        {/* ------------------------------------------------------------------- */}
        {activeTab === 'settings' && (
          <form
            onSubmit={handleSaveSettings}
            className="bg-red-900/60 border border-amber-500/30 rounded-3xl p-6 sm:p-8 space-y-6"
          >
            <div className="flex items-center justify-between border-b border-red-800 pb-4">
              <div>
                <h2 className="text-xl font-serif font-bold text-amber-200">
                  Global Academy Settings & EasyPaisa Accounts
                </h2>
                <p className="text-xs text-red-200">
                  Saved settings persist directly into the cloud JSON database and reflect across all pages.
                </p>
              </div>

              {saved && (
                <div className="bg-emerald-500/20 text-emerald-300 border border-emerald-400 text-xs px-3 py-1 rounded-full flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Changes Published Successfully!</span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-amber-200 font-bold text-xs mb-1">Academy Name</label>
                <input
                  type="text"
                  value={academyName}
                  onChange={(e) => setAcademyName(e.target.value)}
                  className="w-full bg-red-950 border border-red-700 text-white rounded-xl px-3 py-2 text-xs"
                />
              </div>

              <div>
                <label className="block text-amber-200 font-bold text-xs mb-1">Founder / Owner Name</label>
                <input
                  type="text"
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  className="w-full bg-red-950 border border-red-700 text-white rounded-xl px-3 py-2 text-xs"
                />
              </div>

              <div>
                <label className="block text-amber-200 font-bold text-xs mb-1">Head Office City</label>
                <input
                  type="text"
                  value={headOfficeCity}
                  onChange={(e) => setHeadOfficeCity(e.target.value)}
                  className="w-full bg-red-950 border border-red-700 text-white rounded-xl px-3 py-2 text-xs"
                />
              </div>

              <div>
                <label className="block text-amber-200 font-bold text-xs mb-1">Contact / WhatsApp Number</label>
                <input
                  type="text"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  className="w-full bg-red-950 border border-red-700 text-white rounded-xl px-3 py-2 text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-amber-200 font-bold text-xs mb-1">EasyPaisa Account Title</label>
                <input
                  type="text"
                  value={easyPaisaTitle}
                  onChange={(e) => setEasyPaisaTitle(e.target.value)}
                  className="w-full bg-red-950 border border-red-700 text-white rounded-xl px-3 py-2 text-xs"
                />
              </div>

              <div>
                <label className="block text-amber-200 font-bold text-xs mb-1">EasyPaisa Account Number</label>
                <input
                  type="text"
                  value={easyPaisaNumber}
                  onChange={(e) => setEasyPaisaNumber(e.target.value)}
                  className="w-full bg-red-950 border border-red-700 text-white rounded-xl px-3 py-2 text-xs font-mono font-bold text-emerald-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-amber-200 font-bold text-xs mb-1">Homepage Hero Headline</label>
              <input
                type="text"
                value={heroHeadline}
                onChange={(e) => setHeroHeadline(e.target.value)}
                className="w-full bg-red-950 border border-red-700 text-white rounded-xl px-3 py-2 text-xs"
              />
            </div>

            {/* Facebook Group Single Configuration Section */}
            <div className="bg-red-950/80 border-2 border-[#1877F2]/60 rounded-2xl p-4 sm:p-5 space-y-4">
              <div className="flex items-center gap-2 text-[#1877F2] font-bold text-sm">
                <Sparkles className="w-4 h-4 text-[#1877F2]" />
                <span>Facebook Group Integration Single-Point Configuration</span>
              </div>
              <p className="text-[11px] text-red-200">
                Updating the URL below changes the link across the entire website instantly.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="sm:col-span-2">
                  <label className="block text-blue-300 font-bold mb-1">Official Facebook Group URL</label>
                  <input
                    type="url"
                    value={facebookGroupUrl}
                    onChange={(e) => setFacebookGroupUrl(e.target.value)}
                    placeholder="https://www.facebook.com/groups/YOUR_GROUP_LINK"
                    className="w-full bg-slate-900 border border-[#1877F2]/60 font-mono text-blue-200 font-bold rounded-xl px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-blue-300 font-bold mb-1">Facebook Group Display Name</label>
                  <input
                    type="text"
                    value={facebookGroupName}
                    onChange={(e) => setFacebookGroupName(e.target.value)}
                    className="w-full bg-slate-900 border border-red-700 text-white rounded-xl px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-blue-300 font-bold mb-1">Member Count Display</label>
                  <input
                    type="number"
                    value={facebookGroupMembers}
                    onChange={(e) => setFacebookGroupMembers(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-red-700 font-mono text-amber-300 font-bold rounded-xl px-3 py-2"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSaving}
              className="bg-amber-500 hover:bg-amber-400 text-red-950 font-bold text-xs px-6 py-3 rounded-xl shadow flex items-center gap-2 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
            >
              {isSaving ? (
                <div className="w-4 h-4 border-2 border-red-950 border-t-transparent rounded-full animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              <span>{isSaving ? 'Saving to Cloud Database...' : 'Save & Publish Changes'}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
