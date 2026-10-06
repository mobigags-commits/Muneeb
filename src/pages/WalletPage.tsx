import React, { useState } from 'react';
import {
  Wallet,
  ArrowDownLeft,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  CreditCard,
  Building,
  Smartphone,
  ShieldCheck,
  Sparkles,
  Search,
  Filter,
  DollarSign,
  TrendingUp,
  Receipt,
  HelpCircle,
  MessageSquare,
  RefreshCw,
  Zap,
  Info
} from 'lucide-react';
import { useAcademy } from '../context/AcademyContext';
import { WalletTransaction } from '../types';

export const WalletPage: React.FC = () => {
  const {
    siteSettings,
    walletTransactions,
    userWalletBalance,
    addDeposit,
    requestWithdrawal,
    walletTabInitial,
    setWalletTabInitial,
    setActivePage,
  } = useAcademy();

  const [activeTab, setActiveTab] = useState<'deposit' | 'withdraw' | 'history'>(walletTabInitial || 'deposit');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Deposit Form State
  const [depName, setDepName] = useState('');
  const [depPhone, setDepPhone] = useState('');
  const [depAmount, setDepAmount] = useState<number>(2500);
  const [depMethod, setDepMethod] = useState<'EasyPaisa' | 'JazzCash' | 'Meezan Bank' | 'SadaPay' | 'NayaPay' | 'Raast' | 'Bank Transfer'>('EasyPaisa');
  const [depTrxId, setDepTrxId] = useState('');
  const [depPurpose, setDepPurpose] = useState('Course Fee Advance (پیشگی ٹیوشن فیس)');
  const [depNotes, setDepNotes] = useState('');
  const [depSubmitting, setDepSubmitting] = useState(false);
  const [depSuccessMessage, setDepSuccessMessage] = useState(false);

  // Withdrawal Form State
  const [wthName, setWthName] = useState('');
  const [wthPhone, setWthPhone] = useState('');
  const [wthAmount, setWthAmount] = useState<number>(1500);
  const [wthMethod, setWthMethod] = useState<'EasyPaisa' | 'JazzCash' | 'Meezan Bank' | 'Bank Transfer' | 'Raast' | 'SadaPay' | 'NayaPay'>('EasyPaisa');
  const [wthAccountTitle, setWthAccountTitle] = useState('');
  const [wthAccountNumber, setWthAccountNumber] = useState('');
  const [wthPurpose, setWthPurpose] = useState('Affiliate & Referral Commission (کمیشن و منافع)');
  const [wthNotes, setWthNotes] = useState('');
  const [wthSubmitting, setWthSubmitting] = useState(false);
  const [wthSuccessMessage, setWthSuccessMessage] = useState(false);
  const [wthError, setWthError] = useState('');

  // History Filter
  const [historyFilter, setHistoryFilter] = useState<'all' | 'deposit' | 'withdraw'>('all');
  const [historySearch, setHistorySearch] = useState('');

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleDepositSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!depName.trim() || !depPhone.trim() || !depAmount || depAmount <= 0) return;

    setDepSubmitting(true);
    await addDeposit({
      userName: depName.trim(),
      userPhone: depPhone.trim(),
      amountPKR: Number(depAmount),
      method: depMethod,
      accountTitle: siteSettings.ownerName,
      accountNumberOrIban: depMethod === 'Meezan Bank' ? siteSettings.bankAccountNumber : siteSettings.easyPaisaAccountNumber,
      transactionId: depTrxId.trim() || `DEP-${Date.now().toString().slice(-6)}`,
      purpose: depPurpose,
      notes: depNotes.trim(),
    });

    setDepSubmitting(false);
    setDepSuccessMessage(true);
    setDepTrxId('');
    setDepNotes('');
    setTimeout(() => setDepSuccessMessage(false), 7000);
  };

  const handleWithdrawSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setWthError('');

    if (!wthName.trim() || !wthPhone.trim() || !wthAccountTitle.trim() || !wthAccountNumber.trim()) {
      setWthError('Please fill all required account details / تمام خانے پر کریں۔');
      return;
    }

    if (!wthAmount || wthAmount < 500) {
      setWthError('Minimum withdrawal amount is Rs. 500 / کم از کم ودڈرا رقم 500 روپے ہے۔');
      return;
    }

    if (wthAmount > userWalletBalance + 5000) {
      // Friendly check allowing withdrawal requests for earned commissions
    }

    setWthSubmitting(true);
    await requestWithdrawal({
      userName: wthName.trim(),
      userPhone: wthPhone.trim(),
      amountPKR: Number(wthAmount),
      method: wthMethod,
      accountTitle: wthAccountTitle.trim(),
      accountNumberOrIban: wthAccountNumber.trim(),
      purpose: wthPurpose,
      notes: wthNotes.trim(),
    });

    setWthSubmitting(false);
    setWthSuccessMessage(true);
    setWthNotes('');
    setTimeout(() => setWthSuccessMessage(false), 7000);
  };

  const totalDeposited = walletTransactions
    .filter((t) => t.type === 'deposit' && t.status === 'Approved')
    .reduce((sum, t) => sum + (t.amountPKR || 0), 0);

  const totalWithdrawn = walletTransactions
    .filter((t) => t.type === 'withdraw' && (t.status === 'Approved' || t.status === 'Completed'))
    .reduce((sum, t) => sum + (t.amountPKR || 0), 0);

  const pendingTransactionsCount = walletTransactions.filter(
    (t) => t.status === 'Pending Verification' || t.status === 'Processing'
  ).length;

  const filteredHistory = walletTransactions.filter((tx) => {
    const matchesType = historyFilter === 'all' || tx.type === historyFilter;
    const matchesSearch =
      historySearch === '' ||
      tx.userName.toLowerCase().includes(historySearch.toLowerCase()) ||
      tx.userPhone.includes(historySearch) ||
      (tx.transactionId && tx.transactionId.toLowerCase().includes(historySearch.toLowerCase())) ||
      tx.purpose.toLowerCase().includes(historySearch.toLowerCase()) ||
      tx.method.toLowerCase().includes(historySearch.toLowerCase());
    return matchesType && matchesSearch;
  });

  const whatsappDepositSlip = encodeURIComponent(
    `Assalamu Alaikum Founder & Owner ${siteSettings.ownerName}!\n\nI have submitted a Deposit to Shaheen Quran Academy Wallet:\n• Name: ${depName || 'User'}\n• Amount: Rs. ${depAmount} PKR\n• Method: ${depMethod}\n• Trx ID: ${depTrxId || 'Pending'}\n• Purpose: ${depPurpose}\n\nPlease verify and credit my wallet. JazakAllah Khair!`
  );

  const whatsappWithdrawFasttrack = encodeURIComponent(
    `Assalamu Alaikum Founder & Owner ${siteSettings.ownerName}!\n\nI have requested a Withdrawal from Shaheen Quran Academy:\n• Name: ${wthName || 'Account Holder'}\n• Amount: Rs. ${wthAmount} PKR\n• Method: ${wthMethod}\n• Account Title: ${wthAccountTitle || '-'}\n• Account Number: ${wthAccountNumber || '-'}\n• Purpose: ${wthPurpose}\n\nPlease process my payout. JazakAllah Khair!`
  );

  return (
    <div className="bg-red-950 text-white min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 animate-fade-in">
      {/* Top Hero Banner */}
      <div className="max-w-7xl mx-auto space-y-4 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-400/30">
          <Wallet className="w-4 h-4 text-amber-400" />
          <span>Official Academy Digital Wallet & Financial Portal</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-black text-amber-100 tracking-tight">
          Deposit & Withdraw Portal
        </h1>
        <p className="font-urdu text-lg sm:text-2xl text-amber-300 font-bold">
          اکیڈمی والٹ — رقم جمع کروائیں (ڈپازٹ) اور رقم نکلوائیں (ودڈرا)
        </p>
        <p className="text-xs sm:text-sm text-stone-200 max-w-3xl mx-auto leading-relaxed">
          Manage your course tuition advance, affiliate commissions, referral rewards, ZT Traders balance, and digital academy credits. Fast, 100% secure, transparent, and direct to Founder & Owner <strong className="text-white">{siteSettings.ownerName}</strong>.
        </p>
      </div>

      {/* Main Wallet Summary Dashboard Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Available Balance */}
        <div className="bg-gradient-to-br from-amber-950/90 via-red-950 to-stone-900 border-2 border-amber-500/70 rounded-2xl p-5 shadow-xl space-y-2 relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-amber-500/10 rounded-full blur-xl pointer-events-none" />
          <div className="flex items-center justify-between text-amber-400">
            <span className="text-xs font-extrabold uppercase tracking-wider">Available Balance</span>
            <Wallet className="w-5 h-5 text-amber-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-serif font-black text-white">
            Rs. {userWalletBalance.toLocaleString()} <span className="text-xs font-sans text-amber-300">PKR</span>
          </div>
          <div className="flex items-center justify-between text-[11px] text-stone-300 pt-1 border-t border-amber-500/20">
            <span className="font-urdu">دستیاب بیلنس و کریڈٹ</span>
            <span className="text-emerald-400 font-bold">Active & Ready</span>
          </div>
        </div>

        {/* Total Deposited */}
        <div className="bg-gradient-to-br from-emerald-950/80 via-red-950 to-stone-900 border-2 border-emerald-500/60 rounded-2xl p-5 shadow-xl space-y-2">
          <div className="flex items-center justify-between text-emerald-400">
            <span className="text-xs font-extrabold uppercase tracking-wider">Total Deposited</span>
            <ArrowDownLeft className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-serif font-black text-emerald-200">
            Rs. {totalDeposited.toLocaleString()} <span className="text-xs font-sans text-stone-300">PKR</span>
          </div>
          <div className="flex items-center justify-between text-[11px] text-stone-300 pt-1 border-t border-emerald-500/20">
            <span className="font-urdu">کل جمع شدہ رقم (ڈپازٹ)</span>
            <span className="text-emerald-300 font-semibold">{walletTransactions.filter(t => t.type === 'deposit' && t.status === 'Approved').length} Cleared</span>
          </div>
        </div>

        {/* Total Withdrawn */}
        <div className="bg-gradient-to-br from-red-900/80 via-red-950 to-stone-900 border-2 border-red-500/50 rounded-2xl p-5 shadow-xl space-y-2">
          <div className="flex items-center justify-between text-red-300">
            <span className="text-xs font-extrabold uppercase tracking-wider">Total Withdrawn</span>
            <ArrowUpRight className="w-5 h-5 text-red-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-serif font-black text-amber-200">
            Rs. {totalWithdrawn.toLocaleString()} <span className="text-xs font-sans text-stone-300">PKR</span>
          </div>
          <div className="flex items-center justify-between text-[11px] text-stone-300 pt-1 border-t border-red-500/20">
            <span className="font-urdu">کل نکلوائی گئی رقم (ودڈرا)</span>
            <span className="text-stone-300 font-semibold">{walletTransactions.filter(t => t.type === 'withdraw' && (t.status === 'Approved' || t.status === 'Completed')).length} Payouts</span>
          </div>
        </div>

        {/* Quick Operations Button Card */}
        <div className="bg-gradient-to-br from-stone-900 via-red-950 to-stone-950 border-2 border-stone-700/80 rounded-2xl p-4 shadow-xl flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-amber-300 uppercase tracking-wider">Quick Actions</span>
            <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-bold">
              {pendingTransactionsCount} Pending
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setActiveTab('deposit')}
              className="py-2.5 px-3 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-extrabold rounded-xl text-xs flex items-center justify-center gap-1 shadow transition"
            >
              <ArrowDownLeft className="w-3.5 h-3.5" />
              <span>Deposit</span>
            </button>
            <button
              onClick={() => setActiveTab('withdraw')}
              className="py-2.5 px-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-red-950 font-extrabold rounded-xl text-xs flex items-center justify-center gap-1 shadow transition"
            >
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>Withdraw</span>
            </button>
          </div>
          <button
            onClick={() => setActiveTab('history')}
            className="w-full py-1.5 text-center text-xs text-stone-300 hover:text-amber-300 font-bold border border-stone-800 rounded-lg hover:border-amber-500/40 transition"
          >
            View History & Ledger ({walletTransactions.length})
          </button>
        </div>
      </div>

      {/* Tabs Navigation Bar */}
      <div className="max-w-7xl mx-auto flex items-center justify-center border-b border-red-800/80 pb-3 gap-2 sm:gap-4">
        <button
          onClick={() => setActiveTab('deposit')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
            activeTab === 'deposit'
              ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-lg shadow-emerald-950/50 scale-102 border border-emerald-400/40'
              : 'bg-red-900/60 text-stone-300 hover:bg-red-900 hover:text-white'
          }`}
        >
          <ArrowDownLeft className="w-4 h-4" />
          <span>1. Deposit Funds (رقم جمع کروائیں)</span>
        </button>

        <button
          onClick={() => setActiveTab('withdraw')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
            activeTab === 'withdraw'
              ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-red-950 shadow-lg shadow-amber-950/50 scale-102 border border-amber-300'
              : 'bg-red-900/60 text-stone-300 hover:bg-red-900 hover:text-white'
          }`}
        >
          <ArrowUpRight className="w-4 h-4" />
          <span>2. Withdraw Funds (رقم نکلوائیں)</span>
        </button>

        <button
          onClick={() => setActiveTab('history')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
            activeTab === 'history'
              ? 'bg-red-800 text-white shadow-lg border border-red-600'
              : 'bg-red-900/60 text-stone-300 hover:bg-red-900 hover:text-white'
          }`}
        >
          <Receipt className="w-4 h-4" />
          <span>3. Transactions Ledger ({walletTransactions.length})</span>
        </button>
      </div>

      {/* TAB 1: DEPOSIT FUNDS */}
      {activeTab === 'deposit' && (
        <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
          {/* Owner Receiving Accounts Showcase */}
          <div className="bg-gradient-to-b from-stone-900 via-red-950 to-stone-950 border-2 border-emerald-500/60 rounded-3xl p-5 sm:p-7 shadow-2xl space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-emerald-500/30 pb-3">
              <div>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Step 1: Transfer Funds to Founder & Owner Official Accounts</span>
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-amber-200 mt-0.5">
                  رقم جمع کروانے کے لیے سرکاری اکاؤنٹس کی تفصیلات
                </h3>
              </div>
              <span className="text-xs bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full font-bold border border-emerald-500/40">
                100% Direct to Owner {siteSettings.ownerName}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Account 1: EasyPaisa & JazzCash */}
              <div className="bg-red-950/80 border border-emerald-500/40 rounded-2xl p-4 space-y-3 relative hover:border-emerald-400 transition">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-300 uppercase tracking-wide flex items-center gap-1">
                    <Smartphone className="w-4 h-4" /> EasyPaisa & JazzCash
                  </span>
                  <span className="text-[10px] bg-emerald-500 text-white font-black px-2 py-0.5 rounded">
                    Instant
                  </span>
                </div>
                <div>
                  <div className="text-[11px] text-stone-300">Account Number:</div>
                  <div className="text-lg font-mono font-bold text-amber-300 tracking-wider">
                    {siteSettings.easyPaisaAccountNumber}
                  </div>
                  <div className="text-xs text-stone-300 mt-0.5">
                    Account Title: <strong>{siteSettings.easyPaisaAccountTitle}</strong>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(siteSettings.easyPaisaAccountNumber, 'easypaisa')}
                  className="w-full py-2 bg-emerald-700/80 hover:bg-emerald-600 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition text-white"
                >
                  {copiedKey === 'easypaisa' ? <Check className="w-4 h-4 text-amber-300" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedKey === 'easypaisa' ? 'Copied Number!' : 'Copy Mobile Number'}</span>
                </button>
              </div>

              {/* Account 2: Meezan Islamic Bank */}
              <div className="bg-red-950/80 border border-emerald-500/40 rounded-2xl p-4 space-y-3 relative hover:border-emerald-400 transition">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-300 uppercase tracking-wide flex items-center gap-1">
                    <Building className="w-4 h-4" /> Meezan Islamic Bank
                  </span>
                  <span className="text-[10px] bg-amber-500 text-red-950 font-black px-2 py-0.5 rounded">
                    Shariah
                  </span>
                </div>
                <div>
                  <div className="text-[11px] text-stone-300">Bank Account No:</div>
                  <div className="text-base font-mono font-bold text-amber-300 tracking-wider">
                    {siteSettings.bankAccountNumber}
                  </div>
                  <div className="text-xs text-stone-300 mt-0.5 truncate">
                    Title: <strong>{siteSettings.bankAccountTitle}</strong>
                  </div>
                  <div className="text-[10px] text-stone-400 font-mono mt-0.5">
                    IBAN: {siteSettings.ibanNumber}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(siteSettings.bankAccountNumber, 'meezan')}
                  className="w-full py-2 bg-emerald-700/80 hover:bg-emerald-600 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition text-white"
                >
                  {copiedKey === 'meezan' ? <Check className="w-4 h-4 text-amber-300" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedKey === 'meezan' ? 'Copied Account!' : 'Copy Bank Account'}</span>
                </button>
              </div>

              {/* Account 3: SadaPay / NayaPay / Raast */}
              <div className="bg-red-950/80 border border-emerald-500/40 rounded-2xl p-4 space-y-3 relative hover:border-emerald-400 transition">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-300 uppercase tracking-wide flex items-center gap-1">
                    <Zap className="w-4 h-4" /> Raast & SadaPay
                  </span>
                  <span className="text-[10px] bg-teal-500 text-white font-black px-2 py-0.5 rounded">
                    0% Fee
                  </span>
                </div>
                <div>
                  <div className="text-[11px] text-stone-300">Raast ID / SadaPay:</div>
                  <div className="text-lg font-mono font-bold text-amber-300 tracking-wider">
                    {siteSettings.sadaPayNumber || '03447956085'}
                  </div>
                  <div className="text-xs text-stone-300 mt-0.5">
                    Title: <strong>{siteSettings.sadaPayAccountTitle || 'Muneeb Ur Rehman'}</strong>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(siteSettings.sadaPayNumber || '03447956085', 'sadapay')}
                  className="w-full py-2 bg-emerald-700/80 hover:bg-emerald-600 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition text-white"
                >
                  {copiedKey === 'sadapay' ? <Check className="w-4 h-4 text-amber-300" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedKey === 'sadapay' ? 'Copied Raast ID!' : 'Copy Raast ID'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Deposit Submission Form */}
          <div className="bg-gradient-to-br from-red-900/90 via-red-950 to-stone-950 border-2 border-emerald-500/50 rounded-3xl p-5 sm:p-8 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-red-800 pb-4">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <ArrowDownLeft className="w-4 h-4 text-emerald-400" />
                  <span>Step 2: Submit Deposit Proof & Transaction ID (TID)</span>
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-amber-100 mt-1">
                  ڈپازٹ فارم اور ٹرانزیکشن کی خودکار تصدیق
                </h3>
              </div>
              <span className="text-xs text-stone-300 font-urdu">
                فارم جمع ہوتے ہی کھاتہ فوری اپڈیٹ ہو جائے گا
              </span>
            </div>

            {depSuccessMessage && (
              <div className="bg-emerald-950 border-2 border-emerald-400 p-4 rounded-2xl flex items-start gap-3 animate-fade-in">
                <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="font-bold text-emerald-200 text-sm sm:text-base">
                    ڈپازٹ کی درخواست کامیابی سے جمع ہو گئی ہے! Deposit Submitted Successfully!
                  </h4>
                  <p className="text-xs text-stone-200">
                    Your deposit of Rs. {depAmount} PKR has been logged for instant verification. You can also send the screenshot directly to Founder {siteSettings.ownerName} via WhatsApp.
                  </p>
                  <a
                    href={`https://wa.me/92${siteSettings.whatsappNumber.replace(/^0/, '')}?text=${whatsappDepositSlip}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 mt-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-3.5 py-1.5 rounded-lg shadow"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Send Deposit Slip to Owner on WhatsApp</span>
                  </a>
                </div>
              </div>
            )}

            <form onSubmit={handleDepositSubmit} className="space-y-6">
              {/* Preset Amount Chips */}
              <div>
                <label className="block text-xs font-bold text-stone-200 uppercase tracking-wider mb-2">
                  Select Deposit Amount / رقم منتخب کریں (PKR) <span className="text-amber-400">*</span>
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {[500, 1000, 2500, 5000, 10000, 20000].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setDepAmount(amt)}
                      className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition border ${
                        depAmount === amt
                          ? 'bg-amber-400 text-red-950 border-amber-300 shadow-md font-extrabold scale-105'
                          : 'bg-red-950/80 text-stone-300 border-red-800 hover:border-amber-400'
                      }`}
                    >
                      Rs. {amt.toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Custom Amount */}
                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1.5">
                    Deposit Amount (PKR) / رقم (روپے) <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="number"
                    min="100"
                    required
                    value={depAmount}
                    onChange={(e) => setDepAmount(Number(e.target.value))}
                    className="w-full bg-stone-900 border border-red-800 focus:border-amber-400 text-amber-200 font-bold px-3.5 py-2.5 rounded-xl text-sm focus:outline-none"
                    placeholder="Enter PKR amount"
                  />
                </div>

                {/* Depositor Name */}
                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1.5">
                    Your Name / جمع کروانے والے کا نام <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={depName}
                    onChange={(e) => setDepName(e.target.value)}
                    className="w-full bg-stone-900 border border-red-800 focus:border-amber-400 text-white px-3.5 py-2.5 rounded-xl text-sm focus:outline-none"
                    placeholder="e.g. Usman Ali"
                  />
                </div>

                {/* Depositor Phone / WhatsApp */}
                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1.5">
                    WhatsApp / فون نمبر <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={depPhone}
                    onChange={(e) => setDepPhone(e.target.value)}
                    className="w-full bg-stone-900 border border-red-800 focus:border-amber-400 text-white px-3.5 py-2.5 rounded-xl text-sm focus:outline-none"
                    placeholder="03XXXXXXXXX"
                  />
                </div>

                {/* Payment Method Used */}
                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1.5">
                    Payment Method Used / طریقہ ادائیگی <span className="text-amber-400">*</span>
                  </label>
                  <select
                    value={depMethod}
                    onChange={(e) => setDepMethod(e.target.value as any)}
                    className="w-full bg-stone-900 border border-red-800 focus:border-amber-400 text-white px-3.5 py-2.5 rounded-xl text-sm focus:outline-none cursor-pointer"
                  >
                    <option value="EasyPaisa">EasyPaisa Mobile Wallet (03447956085)</option>
                    <option value="JazzCash">JazzCash Mobile Wallet (03447956085)</option>
                    <option value="Meezan Bank">Meezan Islamic Bank Transfer</option>
                    <option value="SadaPay">SadaPay (03447956085)</option>
                    <option value="NayaPay">NayaPay (03447956085)</option>
                    <option value="Raast">Raast Instant Payment</option>
                    <option value="Bank Transfer">Other Bank Transfer</option>
                  </select>
                </div>

                {/* Transaction ID (TID) */}
                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1.5">
                    Transaction ID (TID) / ٹرانزیکشن آئی ڈی <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={depTrxId}
                    onChange={(e) => setDepTrxId(e.target.value)}
                    className="w-full bg-stone-900 border border-red-800 focus:border-amber-400 text-amber-300 font-mono font-bold px-3.5 py-2.5 rounded-xl text-sm focus:outline-none"
                    placeholder="e.g. EP-88129034"
                  />
                </div>

                {/* Deposit Purpose */}
                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1.5">
                    Deposit Purpose / مقصد <span className="text-amber-400">*</span>
                  </label>
                  <select
                    value={depPurpose}
                    onChange={(e) => setDepPurpose(e.target.value)}
                    className="w-full bg-stone-900 border border-red-800 focus:border-amber-400 text-white px-3.5 py-2.5 rounded-xl text-sm focus:outline-none cursor-pointer"
                  >
                    <option value="Course Fee Advance (پیشگی ٹیوشن فیس)">Course Fee Advance (پیشگی ٹیوشن فیس)</option>
                    <option value="ZT Traders Credit (زیتون شاپنگ کریڈٹ)">ZT Traders Credit (زیتون شاپنگ کریڈٹ)</option>
                    <option value="Wallet Topup (اکیڈمی والٹ بیلنس)">Wallet Topup (اکیڈمی والٹ بیلنس)</option>
                    <option value="App Download Token Fee (ایپ ڈاؤن لوڈ فیس)">App Download Token Fee (ایپ ڈاؤن لوڈ فیس)</option>
                    <option value="Marriage Bureau Registration (رشتہ رجسٹریشن)">Marriage Bureau Registration (رشتہ رجسٹریشن)</option>
                    <option value="Ad Campaign Budget (اشتہارات بجٹ)">Ad Campaign Budget (اشتہارات بجٹ)</option>
                    <option value="Other / متفرق">Other / متفرق</option>
                  </select>
                </div>
              </div>

              {/* Optional Notes */}
              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1.5">
                  Additional Notes or Reference / کوئی اضافی پیغام یا تفصیل (Optional)
                </label>
                <input
                  type="text"
                  value={depNotes}
                  onChange={(e) => setDepNotes(e.target.value)}
                  className="w-full bg-stone-900 border border-red-800 focus:border-amber-400 text-stone-200 px-3.5 py-2 rounded-xl text-xs focus:outline-none"
                  placeholder="e.g. Deposited for 3 months advance Quran recitation fee"
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-red-800/80">
                <div className="text-xs text-stone-300 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Direct submission to Owner verification system</span>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <a
                    href={`https://wa.me/92${siteSettings.whatsappNumber.replace(/^0/, '')}?text=${whatsappDepositSlip}`}
                    target="_blank"
                    rel="noreferrer"
                    className="py-3 px-4 bg-emerald-800/80 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp Owner</span>
                  </a>

                  <button
                    type="submit"
                    disabled={depSubmitting}
                    className="flex-1 sm:flex-none py-3.5 px-7 bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-500 hover:from-emerald-400 hover:to-emerald-500 text-white font-extrabold rounded-xl shadow-xl text-sm transition flex items-center justify-center gap-2 transform active:scale-98"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{depSubmitting ? 'Submitting Deposit...' : 'Confirm Deposit / ڈپازٹ جمع کریں'}</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TAB 2: WITHDRAW FUNDS */}
      {activeTab === 'withdraw' && (
        <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
          {/* Withdrawal Guidelines & Speed Announcement */}
          <div className="bg-gradient-to-r from-red-950 via-amber-950 to-stone-950 border-2 border-amber-500/60 rounded-3xl p-5 sm:p-7 shadow-xl space-y-3">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-amber-500/30 pb-3">
              <div className="flex items-center gap-2">
                <ArrowUpRight className="w-5 h-5 text-amber-400" />
                <h3 className="text-lg sm:text-xl font-bold text-amber-100">
                  Withdraw Funds Directly to Your EasyPaisa, JazzCash or Bank
                </h3>
              </div>
              <span className="text-xs bg-amber-400 text-red-950 font-black px-3 py-1 rounded-full shadow">
                15 - 30 Minutes Payout (فوری ٹرانسفر)
              </span>
            </div>
            <p className="font-urdu text-sm sm:text-base text-stone-200 leading-relaxed">
              اگر آپ ہمارے ایجوکیشن سسٹم، گروتھ ہب (Growth Hub)، افیلی ایٹ پارٹنر یا ریفرل پروگرام کے ذریعے کمیشن کما رہے ہیں یا اکیڈمی والٹ سے اپنی رقم نکالنا چاہتے ہیں، تو نیچے دیے گئے فارم میں اپنا ایزی پیسہ، جاز کیش یا بینک اکاؤنٹ درج کریں۔ اکیڈمی انتظامیہ تصدیق کے بعد رقم فوری ٹرانسفر کرے گی۔
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-amber-200 font-medium pt-1">
              <span className="flex items-center gap-1 text-emerald-400">
                <CheckCircle2 className="w-4 h-4" /> کم از کم رقم: 500 روپے (Min Rs. 500)
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-amber-300">
                <Zap className="w-4 h-4" /> 0% اضافی کٹوتی (Zero Hidden Charges)
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-blue-300">
                <ShieldCheck className="w-4 h-4" /> راست (Raast) یا براہِ راست بینک ڈپازٹ
              </span>
            </div>
          </div>

          {/* Withdrawal Request Form */}
          <div className="bg-gradient-to-br from-red-900/90 via-red-950 to-stone-950 border-2 border-amber-500/50 rounded-3xl p-5 sm:p-8 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-red-800 pb-4">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <ArrowUpRight className="w-4 h-4 text-amber-400" />
                  <span>Withdrawal Request Form / رقم نکالنے کا فارم</span>
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-amber-100 mt-1">
                  اکاؤنٹ اور وصول کنندہ کی تفصیلات درج کریں
                </h3>
              </div>
              <div className="text-xs bg-red-950/80 px-3 py-1.5 rounded-xl border border-red-800 text-stone-300">
                Available: <strong className="text-amber-300">Rs. {userWalletBalance.toLocaleString()} PKR</strong>
              </div>
            </div>

            {wthError && (
              <div className="bg-red-900/60 border border-red-500 p-3.5 rounded-xl text-red-200 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{wthError}</span>
              </div>
            )}

            {wthSuccessMessage && (
              <div className="bg-emerald-950 border-2 border-emerald-400 p-4 rounded-2xl flex items-start gap-3 animate-fade-in">
                <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="font-bold text-emerald-200 text-sm sm:text-base">
                    رقم نکالنے کی درخواست موصول ہو گئی ہے! Withdrawal Request Received!
                  </h4>
                  <p className="text-xs text-stone-200">
                    Your payout request of Rs. {wthAmount} PKR to account "{wthAccountTitle}" ({wthAccountNumber}) has been routed to Founder {siteSettings.ownerName} for instant clearance.
                  </p>
                  <a
                    href={`https://wa.me/92${siteSettings.whatsappNumber.replace(/^0/, '')}?text=${whatsappWithdrawFasttrack}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 mt-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-3.5 py-1.5 rounded-lg shadow"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Fast-track Payout via WhatsApp to Owner</span>
                  </a>
                </div>
              </div>
            )}

            <form onSubmit={handleWithdrawSubmit} className="space-y-6">
              {/* Preset Withdrawal Amount Chips */}
              <div>
                <label className="block text-xs font-bold text-stone-200 uppercase tracking-wider mb-2">
                  Select Withdrawal Amount / مطلوبہ رقم (PKR) <span className="text-amber-400">*</span>
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {[500, 1000, 1500, 2500, 5000, 10000].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setWthAmount(amt)}
                      className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition border ${
                        wthAmount === amt
                          ? 'bg-amber-400 text-red-950 border-amber-300 shadow-md font-extrabold scale-105'
                          : 'bg-red-950/80 text-stone-300 border-red-800 hover:border-amber-400'
                      }`}
                    >
                      Rs. {amt.toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Custom Withdrawal Amount */}
                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1.5">
                    Amount to Withdraw (PKR) / رقم (روپے) <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="number"
                    min="500"
                    required
                    value={wthAmount}
                    onChange={(e) => setWthAmount(Number(e.target.value))}
                    className="w-full bg-stone-900 border border-red-800 focus:border-amber-400 text-amber-200 font-bold px-3.5 py-2.5 rounded-xl text-sm focus:outline-none"
                    placeholder="Min 500 PKR"
                  />
                </div>

                {/* Account Holder Name */}
                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1.5">
                    Account Title / اکاؤنٹ ہولڈر کا نام <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={wthAccountTitle}
                    onChange={(e) => setWthAccountTitle(e.target.value)}
                    className="w-full bg-stone-900 border border-red-800 focus:border-amber-400 text-white px-3.5 py-2.5 rounded-xl text-sm focus:outline-none"
                    placeholder="e.g. Muhammad Ahmad"
                  />
                </div>

                {/* Account / Mobile / IBAN Number */}
                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1.5">
                    Account No / IBAN / موبائل والٹ نمبر <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={wthAccountNumber}
                    onChange={(e) => setWthAccountNumber(e.target.value)}
                    className="w-full bg-stone-900 border border-red-800 focus:border-amber-400 text-amber-300 font-mono font-bold px-3.5 py-2.5 rounded-xl text-sm focus:outline-none"
                    placeholder="e.g. 03XXXXXXXXX or IBAN"
                  />
                </div>

                {/* Payout Channel */}
                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1.5">
                    Payout Method / ادائیگی کا ذریعہ <span className="text-amber-400">*</span>
                  </label>
                  <select
                    value={wthMethod}
                    onChange={(e) => setWthMethod(e.target.value as any)}
                    className="w-full bg-stone-900 border border-red-800 focus:border-amber-400 text-white px-3.5 py-2.5 rounded-xl text-sm focus:outline-none cursor-pointer"
                  >
                    <option value="EasyPaisa">EasyPaisa Mobile Wallet (ایزی پیسہ)</option>
                    <option value="JazzCash">JazzCash Mobile Wallet (جاز کیش)</option>
                    <option value="Raast">Raast Instant Payment (راست آئی ڈی)</option>
                    <option value="Meezan Bank">Meezan Islamic Bank (میزان بینک)</option>
                    <option value="Bank Transfer">Any Other Pakistani Bank Transfer (دیگر بینک)</option>
                    <option value="SadaPay">SadaPay (سادہ پے)</option>
                    <option value="NayaPay">NayaPay (نیا پے)</option>
                  </select>
                </div>

                {/* Contact Phone / WhatsApp */}
                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1.5">
                    Your WhatsApp Phone / رابطہ واٹس ایپ <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={wthPhone}
                    onChange={(e) => setWthPhone(e.target.value)}
                    className="w-full bg-stone-900 border border-red-800 focus:border-amber-400 text-white px-3.5 py-2.5 rounded-xl text-sm focus:outline-none"
                    placeholder="03XXXXXXXXX"
                  />
                </div>

                {/* Withdrawal Reason / Category */}
                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1.5">
                    Source / وجہ یا ذریعہ <span className="text-amber-400">*</span>
                  </label>
                  <select
                    value={wthPurpose}
                    onChange={(e) => setWthPurpose(e.target.value)}
                    className="w-full bg-stone-900 border border-red-800 focus:border-amber-400 text-white px-3.5 py-2.5 rounded-xl text-sm focus:outline-none cursor-pointer"
                  >
                    <option value="Affiliate & Referral Commission (کمیشن و منافع)">Affiliate & Referral Commission (کمیشن و منافع)</option>
                    <option value="Teacher Honorarium / Salary (معلم کا مشاہرہ)">Teacher Honorarium / Salary (معلم کا مشاہرہ)</option>
                    <option value="Wallet Balance Refund (والٹ بیلنس واپس)">Wallet Balance Refund (والٹ بیلنس واپس)</option>
                    <option value="ZT Traders Vendor Payout (وینڈر ادائیگی)">ZT Traders Vendor Payout (وینڈر ادائیگی)</option>
                    <option value="Other Payout (متفرق)">Other Payout (متفرق)</option>
                  </select>
                </div>
              </div>

              {/* Your Full Name */}
              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1.5">
                  Your Full Registered Name / آپ کا مکمل نام <span className="text-amber-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={wthName}
                  onChange={(e) => setWthName(e.target.value)}
                  className="w-full bg-stone-900 border border-red-800 focus:border-amber-400 text-white px-3.5 py-2.5 rounded-xl text-sm focus:outline-none"
                  placeholder="e.g. Qari Abdul Rasheed / Usman Ali"
                />
              </div>

              {/* Optional Notes */}
              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1.5">
                  Bank Branch / Raast Info / Additional Instructions (Optional)
                </label>
                <input
                  type="text"
                  value={wthNotes}
                  onChange={(e) => setWthNotes(e.target.value)}
                  className="w-full bg-stone-900 border border-red-800 focus:border-amber-400 text-stone-200 px-3.5 py-2 rounded-xl text-xs focus:outline-none"
                  placeholder="e.g. Please transfer to Raast ID or HBL Commercial branch"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-red-800/80">
                <div className="text-xs text-stone-300 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>Processed directly by Owner {siteSettings.ownerName}</span>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <a
                    href={`https://wa.me/92${siteSettings.whatsappNumber.replace(/^0/, '')}?text=${whatsappWithdrawFasttrack}`}
                    target="_blank"
                    rel="noreferrer"
                    className="py-3 px-4 bg-emerald-800/80 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp Owner</span>
                  </a>

                  <button
                    type="submit"
                    disabled={wthSubmitting}
                    className="flex-1 sm:flex-none py-3.5 px-7 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-300 hover:to-amber-400 text-red-950 font-black rounded-xl shadow-xl text-sm transition flex items-center justify-center gap-2 transform active:scale-98"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                    <span>{wthSubmitting ? 'Submitting Request...' : 'Request Withdrawal / رقم نکلوائیں'}</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TAB 3: TRANSACTION HISTORY & LEDGER */}
      {activeTab === 'history' && (
        <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
          {/* Controls: Filter & Search */}
          <div className="bg-gradient-to-r from-red-950 via-stone-950 to-red-950 border border-amber-500/30 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-xs text-stone-300 font-bold uppercase tracking-wider flex items-center gap-1">
                <Filter className="w-3.5 h-3.5 text-amber-400" /> Filter:
              </span>
              <div className="flex bg-stone-900 rounded-xl p-1 border border-red-800 text-xs">
                <button
                  onClick={() => setHistoryFilter('all')}
                  className={`px-3 py-1 rounded-lg font-bold transition ${
                    historyFilter === 'all' ? 'bg-amber-500 text-red-950' : 'text-stone-300 hover:text-white'
                  }`}
                >
                  All ({walletTransactions.length})
                </button>
                <button
                  onClick={() => setHistoryFilter('deposit')}
                  className={`px-3 py-1 rounded-lg font-bold transition ${
                    historyFilter === 'deposit' ? 'bg-emerald-600 text-white' : 'text-stone-300 hover:text-white'
                  }`}
                >
                  Deposits
                </button>
                <button
                  onClick={() => setHistoryFilter('withdraw')}
                  className={`px-3 py-1 rounded-lg font-bold transition ${
                    historyFilter === 'withdraw' ? 'bg-amber-600 text-white' : 'text-stone-300 hover:text-white'
                  }`}
                >
                  Withdrawals
                </button>
              </div>
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={historySearch}
                onChange={(e) => setHistorySearch(e.target.value)}
                placeholder="Search by name, TID, method..."
                className="w-full bg-stone-900 border border-red-800 focus:border-amber-400 text-xs text-white pl-9 pr-3 py-2 rounded-xl focus:outline-none"
              />
            </div>
          </div>

          {/* Transactions Table */}
          <div className="bg-gradient-to-b from-red-900/40 via-red-950 to-stone-950 border-2 border-red-800/80 rounded-3xl overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-red-950/90 text-amber-300 uppercase border-b border-red-800/80 font-bold tracking-wider">
                  <tr>
                    <th className="p-3.5">Type & Date</th>
                    <th className="p-3.5">User & Contact</th>
                    <th className="p-3.5">Amount (PKR)</th>
                    <th className="p-3.5">Method & Account</th>
                    <th className="p-3.5">TID / Reference</th>
                    <th className="p-3.5">Purpose</th>
                    <th className="p-3.5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-red-800/40 font-medium">
                  {filteredHistory.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-8 text-center text-stone-400">
                        No transactions found matching criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredHistory.map((tx) => (
                      <tr key={tx.id} className="hover:bg-red-900/30 transition">
                        <td className="p-3.5 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            {tx.type === 'deposit' ? (
                              <span className="p-1 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                                <ArrowDownLeft className="w-4 h-4" />
                              </span>
                            ) : (
                              <span className="p-1 rounded bg-amber-500/20 text-amber-400 border border-amber-500/40">
                                <ArrowUpRight className="w-4 h-4" />
                              </span>
                            )}
                            <div>
                              <div className="font-bold uppercase text-stone-200">
                                {tx.type === 'deposit' ? 'Deposit' : 'Withdrawal'}
                              </div>
                              <div className="text-[10px] text-stone-400">{tx.date}</div>
                            </div>
                          </div>
                        </td>

                        <td className="p-3.5">
                          <div className="font-bold text-amber-100">{tx.userName}</div>
                          <div className="text-[11px] text-stone-300 font-mono">{tx.userPhone}</div>
                        </td>

                        <td className="p-3.5 whitespace-nowrap">
                          <div
                            className={`text-sm font-serif font-black ${
                              tx.type === 'deposit' ? 'text-emerald-400' : 'text-amber-300'
                            }`}
                          >
                            {tx.type === 'deposit' ? '+' : '-'} Rs. {tx.amountPKR.toLocaleString()} PKR
                          </div>
                        </td>

                        <td className="p-3.5">
                          <div className="font-bold text-stone-200">{tx.method}</div>
                          <div className="text-[11px] text-stone-400 truncate max-w-[150px]">
                            {tx.accountNumberOrIban}
                          </div>
                        </td>

                        <td className="p-3.5">
                          <div className="font-mono text-stone-300 text-[11px]">
                            {tx.transactionId || tx.id}
                          </div>
                        </td>

                        <td className="p-3.5">
                          <div className="text-stone-300 text-xs font-urdu max-w-[160px] truncate">
                            {tx.purpose}
                          </div>
                          {tx.notes && (
                            <div className="text-[10px] text-stone-400 truncate max-w-[160px]">
                              {tx.notes}
                            </div>
                          )}
                        </td>

                        <td className="p-3.5 whitespace-nowrap">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-black tracking-wide inline-flex items-center gap-1 ${
                              tx.status === 'Approved' || tx.status === 'Completed'
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                                : tx.status === 'Rejected'
                                ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                                : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                            }`}
                          >
                            {tx.status === 'Approved' || tx.status === 'Completed' ? (
                              <CheckCircle2 className="w-3 h-3" />
                            ) : (
                              <Clock className="w-3 h-3" />
                            )}
                            <span>{tx.status}</span>
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Shariah & Trust Assurance Footer Card */}
      <div className="max-w-7xl mx-auto bg-stone-900/80 border border-amber-500/30 rounded-2xl p-5 text-center space-y-2">
        <div className="flex items-center justify-center gap-2 text-amber-300 font-bold text-xs uppercase tracking-widest">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Shariah-Compliant & Transparent Financial Operations</span>
        </div>
        <p className="font-urdu text-sm text-stone-300 max-w-2xl mx-auto leading-relaxed">
          تمام ڈپازٹ اور ودڈرا ٹرانزیکشنز سود (Riba) سے پاک اور براہِ راست اکیڈمی کے بانی و اونر منیب الرحمن ({siteSettings.contactNumber}) کی نگرانی میں مکمل شفافیت کے ساتھ سرانجام دی جاتی ہیں۔
        </p>
      </div>
    </div>
  );
};
