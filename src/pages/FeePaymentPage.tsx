import React, { useState } from 'react';
import {
  CreditCard,
  CheckCircle2,
  ShieldCheck,
  Phone,
  Send,
  Upload,
  Copy,
  Sparkles,
  Building,
  Globe,
  Wallet,
  ArrowRight,
  Printer,
  Download,
  Share2,
  Lock,
  FileText,
  Search,
  Check,
  Clock,
  Coins,
  QrCode,
  DollarSign
} from 'lucide-react';
import { useAcademy } from '../context/AcademyContext';
import { Course } from '../types';

type PaymentTab = 'easypaisa' | 'jazzcash' | 'meezan' | 'other_banks' | 'digital_wallets' | 'international' | 'remittance' | 'card';

export const FeePaymentPage: React.FC = () => {
  const { siteSettings, courses, addPayment, payments } = useAcademy();

  const [activeTab, setActiveTab] = useState<PaymentTab>('easypaisa');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Currency Converter State
  const [selectedCurrency, setSelectedCurrency] = useState<'PKR' | 'USD' | 'GBP' | 'EUR' | 'SAR' | 'AED' | 'CAD' | 'AUD'>('PKR');
  const [selectedCourseId, setSelectedCourseId] = useState<string>(courses[0]?.id || 'c1');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'quarterly' | 'biannual' | 'annual'>('monthly');

  // Form State
  const [studentName, setStudentName] = useState('');
  const [guardianName, setGuardianName] = useState('');
  const [studentPhone, setStudentPhone] = useState('');
  const [senderAccountOrPhone, setSenderAccountOrPhone] = useState('');
  const [senderBankOrWallet, setSenderBankOrWallet] = useState('EasyPaisa');
  const [trxId, setTrxId] = useState('');
  const [slipImage, setSlipImage] = useState<string | null>(null);
  const [userNotes, setUserNotes] = useState('');
  const [submittedReceipt, setSubmittedReceipt] = useState<any | null>(null);
  const [searchTrxQuery, setSearchTrxQuery] = useState('');

  // Currency exchange rates relative to PKR
  const currencyRates: Record<string, { symbol: string; rateToPKR: number; label: string }> = {
    PKR: { symbol: 'Rs.', rateToPKR: 1, label: 'Pakistani Rupee (PKR)' },
    USD: { symbol: '$', rateToPKR: 280, label: 'US Dollar (USD)' },
    GBP: { symbol: '£', rateToPKR: 355, label: 'British Pound (GBP)' },
    EUR: { symbol: '€', rateToPKR: 305, label: 'Euro (EUR)' },
    SAR: { symbol: 'SAR', rateToPKR: 75, label: 'Saudi Riyal (SAR)' },
    AED: { symbol: 'AED', rateToPKR: 76.5, label: 'UAE Dirham (AED)' },
    CAD: { symbol: 'CAD $', rateToPKR: 205, label: 'Canadian Dollar (CAD)' },
    AUD: { symbol: 'AUD $', rateToPKR: 185, label: 'Australian Dollar (AUD)' },
  };

  const selectedCourseObj = courses.find((c) => c.id === selectedCourseId) || courses[0];

  // Calculate fees based on billing cycle
  const getCalculatedFee = (course: Course, cycle: 'monthly' | 'quarterly' | 'biannual' | 'annual') => {
    const basePKR = course.feePKR;
    const baseUSD = course.feeUSD;

    let multiplier = 1;
    let discount = 0;

    if (cycle === 'quarterly') {
      multiplier = 3;
      discount = 0.05; // 5% discount
    } else if (cycle === 'biannual') {
      multiplier = 6;
      discount = 0.10; // 10% discount
    } else if (cycle === 'annual') {
      multiplier = 12;
      discount = 0.15; // 15% discount
    }

    const totalPKR = Math.round(basePKR * multiplier * (1 - discount));
    const totalUSD = Math.round(baseUSD * multiplier * (1 - discount));

    return { totalPKR, totalUSD, discountPercent: Math.round(discount * 100) };
  };

  const currentCalc = selectedCourseObj ? getCalculatedFee(selectedCourseObj, billingCycle) : { totalPKR: 19600, totalUSD: 70, discountPercent: 0 };

  const copyToClipboard = (text: string, key: string) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text).catch(() => {
        const el = document.createElement('textarea');
        el.value = text;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
      });
    } else {
      const el = document.createElement('textarea');
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }

    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 3000);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSlipImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName || !trxId) return;

    const receiptId = `REC-${Date.now().toString().slice(-6)}`;
    const newReceipt = {
      id: receiptId,
      studentName,
      courseTitle: selectedCourseObj?.title || 'Quran Course',
      amountPKR: currentCalc.totalPKR,
      amountUSD: currentCalc.totalUSD,
      paymentMethod: (senderBankOrWallet === 'EasyPaisa'
        ? 'EasyPaisa'
        : senderBankOrWallet === 'JazzCash'
        ? 'JazzCash'
        : senderBankOrWallet === 'Meezan Bank'
        ? 'Meezan Bank'
        : senderBankOrWallet === 'SadaPay'
        ? 'SadaPay'
        : senderBankOrWallet === 'NayaPay'
        ? 'NayaPay'
        : senderBankOrWallet === 'International Wire'
        ? 'International Wire'
        : senderBankOrWallet === 'Remittance'
        ? 'Remittance (Western Union/MoneyGram)'
        : 'Bank Transfer') as any,
      senderAccountOrPhone: senderAccountOrPhone || studentPhone || '03447956085',
      transactionId: trxId.trim().toUpperCase(),
      date: new Date().toISOString().split('T')[0],
      status: 'Pending Verification' as const,
      slipImageUrl: slipImage || undefined,
      senderBankOrWallet,
      currency: selectedCurrency,
      notes: `Guardian: ${guardianName || 'N/A'}, Phone: ${studentPhone || 'N/A'}. ${userNotes}`.trim(),
    };

    addPayment(newReceipt);
    setSubmittedReceipt(newReceipt);
  };

  const handleWhatsAppShareReceipt = (receipt: any) => {
    const text = `Assalamu Alaikum Founder Muneeb Ur Rehman!\n\nI have submitted my tuition fee payment receipt for Shaheen Al Zaitoon Quran Academy:\n\n• Receipt No: ${receipt.id}\n• Student Name: ${receipt.studentName}\n• Course: ${receipt.courseTitle}\n• Amount: Rs. ${receipt.amountPKR.toLocaleString()} PKR ($${receipt.amountUSD} USD)\n• Method: ${receipt.senderBankOrWallet || receipt.paymentMethod}\n• Transaction ID: ${receipt.transactionId}\n• Date: ${receipt.date}\n\nPlease confirm verification. JazakAllah Khair!`;
    const cleanPhone = siteSettings.whatsappNumber.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${cleanPhone.startsWith('92') ? cleanPhone : '92' + cleanPhone.replace(/^0/, '')}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const filteredHistory = payments.filter((p) => {
    if (!searchTrxQuery) return true;
    const q = searchTrxQuery.toLowerCase();
    return (
      p.transactionId.toLowerCase().includes(q) ||
      p.studentName.toLowerCase().includes(q) ||
      p.courseTitle.toLowerCase().includes(q)
    );
  });

  return (
    <div className="bg-red-950 text-white min-h-screen py-10 px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Page Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-400/30">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>100% Genuine & Transparent Banking</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-extrabold text-amber-100">
            Academy Fee & Payment Center
          </h1>
          <p className="text-xs sm:text-sm text-red-200 leading-relaxed">
            Choose your preferred domestic or international payment method. Official designated accounts managed by Founder & Owner <strong>{siteSettings.ownerName}</strong> ({siteSettings.headOfficeCity}, Pakistan).
          </p>
        </div>

        {/* Live Multi-Currency Tuition Calculator */}
        <div className="bg-gradient-to-r from-red-900 via-amber-950 to-red-900 border-2 border-amber-500/50 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-amber-500/30 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold">
                <Coins className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-serif font-bold text-amber-200">
                  Live Fee & Multi-Currency Calculator
                </h2>
                <p className="text-xs text-red-200">
                  Select course, billing cycle, and currency for instant calculation with bundle discounts.
                </p>
              </div>
            </div>

            {/* Currency Selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-amber-300 flex items-center gap-1">
                <Globe className="w-3.5 h-3.5" /> Currency:
              </span>
              <select
                value={selectedCurrency}
                onChange={(e) => setSelectedCurrency(e.target.value as any)}
                className="bg-red-950 text-amber-200 text-xs font-bold border border-amber-500/40 rounded-xl px-3 py-2 focus:outline-none focus:border-amber-400"
              >
                {Object.keys(currencyRates).map((cur) => (
                  <option key={cur} value={cur}>
                    {cur} ({currencyRates[cur].symbol})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* Step 1: Select Course */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-amber-200 uppercase tracking-wider">
                1. Select Quran Course
              </label>
              <select
                value={selectedCourseId}
                onChange={(e) => setSelectedCourseId(e.target.value)}
                className="w-full bg-red-950/90 text-white text-xs border border-red-700 rounded-xl p-3 focus:outline-none focus:border-amber-400"
              >
                {courses.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title} — Rs. {c.feePKR.toLocaleString()} / ${c.feeUSD}
                  </option>
                ))}
              </select>
            </div>

            {/* Step 2: Select Billing Duration */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-amber-200 uppercase tracking-wider">
                2. Select Plan Duration
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'monthly', label: '1 Month', badge: 'Standard' },
                  { id: 'quarterly', label: '3 Months', badge: '5% OFF' },
                  { id: 'biannual', label: '6 Months', badge: '10% OFF' },
                  { id: 'annual', label: '1 Year', badge: '15% OFF' },
                ].map((plan) => (
                  <button
                    key={plan.id}
                    type="button"
                    onClick={() => setBillingCycle(plan.id as any)}
                    className={`p-2 rounded-xl text-xs font-bold transition-all border text-left flex flex-col justify-between ${
                      billingCycle === plan.id
                        ? 'bg-amber-500 text-red-950 border-amber-400 shadow-md'
                        : 'bg-red-950/60 text-red-200 border-red-800 hover:bg-red-900'
                    }`}
                  >
                    <span>{plan.label}</span>
                    <span className={`text-[10px] font-extrabold ${billingCycle === plan.id ? 'text-red-950' : 'text-emerald-400'}`}>
                      {plan.badge}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Total Fee Display */}
            <div className="bg-red-950/90 border-2 border-emerald-500/60 rounded-2xl p-5 text-center space-y-2 shadow-xl">
              <div className="text-[11px] text-emerald-400 uppercase font-extrabold tracking-widest">
                Total Payable Tuition Fee
              </div>
              <div className="text-3xl sm:text-4xl font-serif font-black text-amber-200">
                {selectedCurrency === 'PKR' ? (
                  <>Rs. {currentCalc.totalPKR.toLocaleString()}</>
                ) : (
                  <>
                    {currencyRates[selectedCurrency].symbol}{' '}
                    {Math.round(currentCalc.totalPKR / currencyRates[selectedCurrency].rateToPKR).toLocaleString()}
                  </>
                )}
              </div>
              <div className="text-xs text-red-200 flex items-center justify-center gap-2">
                <span>Equivalent: <strong className="text-emerald-300">${currentCalc.totalUSD} USD</strong></span>
                {currentCalc.discountPercent > 0 && (
                  <span className="bg-emerald-500/20 text-emerald-300 text-[10px] px-2 py-0.5 rounded-full border border-emerald-400/40">
                    Saved {currentCalc.discountPercent}%
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Payment Methods Tabs */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-serif font-bold text-amber-100">
                Official Academy Payment Channels
              </h2>
              <p className="text-xs text-red-200">
                Choose any payment method below to view complete banking credentials and copy instructions.
              </p>
            </div>
          </div>

          {/* Tab Buttons */}
          <div className="flex flex-wrap gap-2 p-1.5 bg-red-900/60 border border-amber-500/30 rounded-2xl">
            {[
              { id: 'easypaisa', label: 'EasyPaisa Mobile', icon: Wallet, color: 'text-emerald-400' },
              { id: 'jazzcash', label: 'JazzCash Wallet', icon: Phone, color: 'text-red-400' },
              { id: 'meezan', label: 'Meezan Islamic Bank', icon: Building, color: 'text-amber-400' },
              { id: 'other_banks', label: 'Bank Alfalah & HBL', icon: Building, color: 'text-blue-400' },
              { id: 'digital_wallets', label: 'SadaPay & NayaPay', icon: CreditCard, color: 'text-teal-400' },
              { id: 'international', label: 'International Wire (SWIFT)', icon: Globe, color: 'text-indigo-300' },
              { id: 'remittance', label: 'Remittance (Western Union/Wise)', icon: ArrowRight, color: 'text-yellow-400' },
              { id: 'card', label: 'Debit / Credit Cards', icon: Lock, color: 'text-purple-300' },
            ].map((tab) => {
              const Icon = tab.icon;
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as PaymentTab);
                    if (tab.id === 'easypaisa') setSenderBankOrWallet('EasyPaisa');
                    else if (tab.id === 'jazzcash') setSenderBankOrWallet('JazzCash');
                    else if (tab.id === 'meezan') setSenderBankOrWallet('Meezan Bank');
                    else if (tab.id === 'other_banks') setSenderBankOrWallet('Bank Alfalah');
                    else if (tab.id === 'digital_wallets') setSenderBankOrWallet('SadaPay');
                    else if (tab.id === 'international') setSenderBankOrWallet('International Wire');
                    else if (tab.id === 'remittance') setSenderBankOrWallet('Remittance');
                    else if (tab.id === 'card') setSenderBankOrWallet('Debit / Credit Card');
                  }}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isSelected
                      ? 'bg-amber-500 text-red-950 shadow-lg font-extrabold scale-[1.02]'
                      : 'text-red-100 hover:bg-red-900/80 hover:text-white'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-red-950' : tab.color}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Active Tab Detailed Card View */}
          <div className="bg-gradient-to-br from-red-900 via-amber-950 to-red-950 border-2 border-amber-500/60 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            {/* EASYPAISA TAB */}
            {activeTab === 'easypaisa' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-500/30 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white font-black flex items-center justify-center text-base shadow-lg">
                      EP
                    </div>
                    <div>
                      <div className="inline-flex items-center gap-1 text-emerald-400 text-xs font-extrabold uppercase">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Primary Official Mobile Account
                      </div>
                      <h3 className="text-2xl font-serif font-bold text-amber-200">
                        EasyPaisa Direct Payment
                      </h3>
                    </div>
                  </div>
                  <span className="bg-emerald-500/20 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full border border-emerald-400/40">
                    Instant 24/7 Verification
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Account Information */}
                  <div className="bg-red-950/80 border border-emerald-500/40 rounded-2xl p-5 space-y-4">
                    <div className="space-y-1">
                      <div className="text-xs text-red-300">Account Title (Receiver Name):</div>
                      <div className="text-xl font-serif font-extrabold text-amber-200">
                        {siteSettings.easyPaisaAccountTitle}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="text-xs text-red-300">EasyPaisa Mobile & Account Number:</div>
                      <div className="flex items-center justify-between bg-emerald-950/80 p-3 rounded-xl border border-emerald-500/40">
                        <span className="text-2xl font-mono font-black text-emerald-300 tracking-wider">
                          {siteSettings.easyPaisaAccountNumber}
                        </span>
                        <button
                          onClick={() => copyToClipboard(siteSettings.easyPaisaAccountNumber, 'ep_num')}
                          className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 shadow"
                        >
                          {copiedKey === 'ep_num' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedKey === 'ep_num' ? 'Copied' : 'Copy Number'}</span>
                        </button>
                      </div>
                    </div>

                    <div className="text-xs text-red-200 space-y-1 pt-2 border-t border-red-900">
                      <p>• <strong>USSD Dial Code (Telenor):</strong> Dial <code>*786#</code> ➔ Money Transfer ➔ EasyPaisa Mobile Account</p>
                      <p>• <strong>EasyPaisa App:</strong> Open App ➔ Send Money ➔ EasyPaisa ➔ Enter <code>03447956085</code></p>
                    </div>
                  </div>

                  {/* QR & WhatsApp Proof Box */}
                  <div className="bg-red-950/80 border border-amber-500/40 rounded-2xl p-5 space-y-4 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
                        <QrCode className="w-4 h-4 text-emerald-400" />
                        <span>Instant WhatsApp Dispatch</span>
                      </div>
                      <p className="text-xs text-red-200 leading-relaxed">
                        After transferring fee via EasyPaisa app or retail agent, please save the 3737 SMS receipt or transaction screenshot and submit it below or on official WhatsApp.
                      </p>
                    </div>

                    <div className="bg-emerald-900/30 p-3 rounded-xl border border-emerald-500/30 text-xs space-y-1 text-emerald-200">
                      <div>Official WhatsApp: <strong className="text-white">{siteSettings.whatsappNumber}</strong></div>
                      <div>Founder Desk: <strong className="text-white">{siteSettings.ownerName} (Rawalpindi)</strong></div>
                    </div>

                    <a
                      href={`https://wa.me/92${siteSettings.whatsappNumber.replace(/^0/, '')}?text=${encodeURIComponent('Assalamu Alaikum! I am sending course fee through EasyPaisa. Please share class schedule.')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow"
                    >
                      <Phone className="w-4 h-4" />
                      <span>Chat with Founder on WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* JAZZCASH TAB */}
            {activeTab === 'jazzcash' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-red-700 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-red-600 text-white font-black flex items-center justify-center text-base shadow-lg">
                      JC
                    </div>
                    <div>
                      <div className="inline-flex items-center gap-1 text-amber-400 text-xs font-extrabold uppercase">
                        <CheckCircle2 className="w-3.5 h-3.5" /> JazzCash Mobile Wallet
                      </div>
                      <h3 className="text-2xl font-serif font-bold text-amber-200">
                        JazzCash Mobile Transfer
                      </h3>
                    </div>
                  </div>
                  <span className="bg-red-500/20 text-red-300 text-xs font-bold px-3 py-1 rounded-full border border-red-400/40">
                    Active Account
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-red-950/80 border border-red-700 rounded-2xl p-5 space-y-4">
                    <div className="space-y-1">
                      <div className="text-xs text-red-300">JazzCash Account Title:</div>
                      <div className="text-xl font-serif font-extrabold text-amber-200">
                        {siteSettings.jazzCashAccountTitle || siteSettings.ownerName}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="text-xs text-red-300">JazzCash Account / Mobile Number:</div>
                      <div className="flex items-center justify-between bg-red-900/80 p-3 rounded-xl border border-red-700">
                        <span className="text-2xl font-mono font-black text-amber-300 tracking-wider">
                          {siteSettings.jazzCashAccountNumber || '03447956085'}
                        </span>
                        <button
                          onClick={() => copyToClipboard(siteSettings.jazzCashAccountNumber || '03447956085', 'jc_num')}
                          className="bg-red-700 hover:bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 shadow"
                        >
                          {copiedKey === 'jc_num' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedKey === 'jc_num' ? 'Copied' : 'Copy Number'}</span>
                        </button>
                      </div>
                    </div>

                    <div className="text-xs text-red-200 space-y-1 pt-2 border-t border-red-900">
                      <p>• <strong>Jazz USSD Code:</strong> Dial <code>*786#</code> ➔ Send Money ➔ To Mobile Account ➔ Enter <code>03447956085</code></p>
                      <p>• <strong>JazzCash App:</strong> Send Money ➔ Mobile Account ➔ <code>03447956085</code></p>
                    </div>
                  </div>

                  <div className="bg-red-950/80 border border-amber-500/40 rounded-2xl p-5 space-y-4 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="text-amber-300 font-bold text-sm">JazzCash Confirmation Tips</div>
                      <p className="text-xs text-red-200 leading-relaxed">
                        JazzCash generates an 8-12 digit TID (e.g. <code>JC-99882103</code>). Simply copy that TID and paste it into our receipt submission form below.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        const el = document.getElementById('payment-submission-box');
                        el?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="w-full bg-amber-500 hover:bg-amber-400 text-red-950 font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow"
                    >
                      <span>Submit JazzCash Receipt Below</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* MEEZAN BANK TAB */}
            {activeTab === 'meezan' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-500/30 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500 text-red-950 font-black flex items-center justify-center text-lg shadow-lg">
                      <Building className="w-6 h-6 text-red-950" />
                    </div>
                    <div>
                      <div className="inline-flex items-center gap-1 text-amber-300 text-xs font-extrabold uppercase">
                        <ShieldCheck className="w-3.5 h-3.5" /> Pakistan’s Premier Islamic Bank
                      </div>
                      <h3 className="text-2xl font-serif font-bold text-amber-200">
                        {siteSettings.bankName}
                      </h3>
                    </div>
                  </div>
                  <span className="bg-amber-500/20 text-amber-300 text-xs font-bold px-3 py-1 rounded-full border border-amber-400/40">
                    Shariah Compliant 100%
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Account Data */}
                  <div className="bg-red-950/80 border border-amber-500/40 rounded-2xl p-5 space-y-3">
                    <div>
                      <div className="text-[11px] text-red-300">Account Title:</div>
                      <div className="text-lg font-serif font-extrabold text-amber-200">
                        {siteSettings.bankAccountTitle}
                      </div>
                    </div>

                    <div>
                      <div className="text-[11px] text-red-300">Account Number:</div>
                      <div className="flex items-center justify-between bg-red-900/70 p-2.5 rounded-xl border border-red-800">
                        <span className="text-base font-mono font-bold text-white">
                          {siteSettings.bankAccountNumber}
                        </span>
                        <button
                          onClick={() => copyToClipboard(siteSettings.bankAccountNumber, 'meezan_acc')}
                          className="bg-amber-500 hover:bg-amber-400 text-red-950 text-xs font-bold px-2.5 py-1 rounded flex items-center gap-1"
                        >
                          {copiedKey === 'meezan_acc' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedKey === 'meezan_acc' ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>
                    </div>

                    <div>
                      <div className="text-[11px] text-red-300">IBAN (International Bank Account Number):</div>
                      <div className="flex items-center justify-between bg-red-900/70 p-2.5 rounded-xl border border-red-800">
                        <span className="text-xs font-mono font-bold text-amber-300 truncate mr-2">
                          {siteSettings.ibanNumber}
                        </span>
                        <button
                          onClick={() => copyToClipboard(siteSettings.ibanNumber, 'meezan_iban')}
                          className="bg-amber-500 hover:bg-amber-400 text-red-950 text-xs font-bold px-2.5 py-1 rounded shrink-0 flex items-center gap-1"
                        >
                          {copiedKey === 'meezan_iban' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedKey === 'meezan_iban' ? 'Copied' : 'Copy IBAN'}</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Branch & SWIFT */}
                  <div className="bg-red-950/80 border border-amber-500/40 rounded-2xl p-5 space-y-3 flex flex-col justify-between">
                    <div className="space-y-2 text-xs text-red-200">
                      <div>
                        <span className="text-red-400">Branch Name:</span>{' '}
                        <strong className="text-white">{siteSettings.branchName || 'Commercial Market Branch, Satellite Town, Rawalpindi'}</strong>
                      </div>
                      <div>
                        <span className="text-red-400">Branch Code:</span>{' '}
                        <strong className="text-amber-300 font-mono">{siteSettings.branchCode || '0142'}</strong>
                      </div>
                      <div>
                        <span className="text-red-400">SWIFT / BIC Code (Overseas):</span>{' '}
                        <strong className="text-emerald-400 font-mono">{siteSettings.swiftCode || 'MEZNPKKA'}</strong>
                      </div>
                      <div>
                        <span className="text-red-400">Interbank Raast ID:</span>{' '}
                        <strong className="text-amber-200 font-mono">03447956085</strong>
                      </div>
                    </div>

                    <div className="bg-amber-950/80 p-3 rounded-xl border border-amber-500/30 text-[11px] text-amber-200">
                      💡 <em>Supports Raast instant transfers with zero bank fee across all Pakistani banks.</em>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* OTHER BANKS (ALFALAH & HBL) */}
            {activeTab === 'other_banks' && (
              <div className="space-y-6">
                <div className="border-b border-amber-500/30 pb-3">
                  <h3 className="text-2xl font-serif font-bold text-amber-200">
                    Bank Alfalah & Habib Bank Limited (HBL)
                  </h3>
                  <p className="text-xs text-red-200">
                    Additional institutional banking options for domestic and overseas wire transfers.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Bank Alfalah */}
                  <div className="bg-red-950/80 border border-blue-500/40 rounded-2xl p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-serif font-bold text-blue-300 text-lg">Bank Alfalah Islamic</h4>
                      <span className="text-[10px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded">Verified</span>
                    </div>
                    <div className="text-xs space-y-1">
                      <div className="text-red-300">Title: <strong className="text-white">{siteSettings.alfalahAccountTitle || siteSettings.ownerName}</strong></div>
                      <div className="text-red-300">Account: <strong className="text-amber-200 font-mono">{siteSettings.alfalahAccountNumber || '551003447956085'}</strong></div>
                      <div className="text-red-300">IBAN:</div>
                      <div className="flex items-center justify-between bg-red-900/80 p-2 rounded border border-red-800">
                        <span className="font-mono text-[11px] text-amber-300 truncate mr-2">
                          {siteSettings.alfalahIban || 'PK45ALFH0551003447956085'}
                        </span>
                        <button
                          onClick={() => copyToClipboard(siteSettings.alfalahIban || 'PK45ALFH0551003447956085', 'alfalah_iban')}
                          className="bg-blue-600 text-white text-[10px] px-2 py-1 rounded"
                        >
                          {copiedKey === 'alfalah_iban' ? 'Copied' : 'Copy'}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* HBL */}
                  <div className="bg-red-950/80 border border-emerald-500/40 rounded-2xl p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-serif font-bold text-emerald-300 text-lg">Habib Bank Limited (HBL)</h4>
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded">Verified</span>
                    </div>
                    <div className="text-xs space-y-1">
                      <div className="text-red-300">Title: <strong className="text-white">{siteSettings.hblAccountTitle || siteSettings.ownerName}</strong></div>
                      <div className="text-red-300">Account: <strong className="text-amber-200 font-mono">{siteSettings.hblAccountNumber || '23907956085001'}</strong></div>
                      <div className="text-red-300">IBAN:</div>
                      <div className="flex items-center justify-between bg-red-900/80 p-2 rounded border border-red-800">
                        <span className="font-mono text-[11px] text-amber-300 truncate mr-2">
                          {siteSettings.hblIban || 'PK64HABB0023907956085001'}
                        </span>
                        <button
                          onClick={() => copyToClipboard(siteSettings.hblIban || 'PK64HABB0023907956085001', 'hbl_iban')}
                          className="bg-emerald-600 text-white text-[10px] px-2 py-1 rounded"
                        >
                          {copiedKey === 'hbl_iban' ? 'Copied' : 'Copy'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* DIGITAL WALLETS TAB (SADAPAY & NAYAPAY) */}
            {activeTab === 'digital_wallets' && (
              <div className="space-y-6">
                <div className="border-b border-teal-500/30 pb-3">
                  <h3 className="text-2xl font-serif font-bold text-amber-200">
                    SadaPay & NayaPay Digital Wallets
                  </h3>
                  <p className="text-xs text-red-200">
                    Instant app-to-app zero-fee transfers via SadaPay & NayaPay accounts.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* SadaPay */}
                  <div className="bg-red-950/80 border border-teal-500/40 rounded-2xl p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="font-serif font-bold text-teal-300 text-lg">SadaPay Digital</div>
                      <span className="text-[10px] bg-teal-500/20 text-teal-300 px-2 py-0.5 rounded">Instant</span>
                    </div>
                    <div className="text-xs space-y-2">
                      <div>Title: <strong className="text-white">{siteSettings.sadaPayAccountTitle || siteSettings.ownerName}</strong></div>
                      <div>Mobile / SadaNumber:</div>
                      <div className="flex items-center justify-between bg-red-900/80 p-2.5 rounded-xl border border-red-800">
                        <span className="font-mono font-bold text-teal-300 text-base">
                          {siteSettings.sadaPayNumber || '03447956085'}
                        </span>
                        <button
                          onClick={() => copyToClipboard(siteSettings.sadaPayNumber || '03447956085', 'sada_num')}
                          className="bg-teal-600 text-white text-xs px-2.5 py-1 rounded"
                        >
                          {copiedKey === 'sada_num' ? 'Copied' : 'Copy'}
                        </button>
                      </div>
                      <div>IBAN: <code className="text-[11px] text-amber-300 font-mono">{siteSettings.sadaPayIban || 'PK05SADA0000003447956085'}</code></div>
                    </div>
                  </div>

                  {/* NayaPay */}
                  <div className="bg-red-950/80 border border-orange-500/40 rounded-2xl p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="font-serif font-bold text-orange-300 text-lg">NayaPay Digital</div>
                      <span className="text-[10px] bg-orange-500/20 text-orange-300 px-2 py-0.5 rounded">Instant</span>
                    </div>
                    <div className="text-xs space-y-2">
                      <div>Title: <strong className="text-white">{siteSettings.ownerName}</strong></div>
                      <div>NayaPay ID: <strong className="text-orange-300 font-mono text-sm">{siteSettings.nayaPayId || '@muneebur'}</strong></div>
                      <div>Registered Mobile:</div>
                      <div className="flex items-center justify-between bg-red-900/80 p-2.5 rounded-xl border border-red-800">
                        <span className="font-mono font-bold text-amber-300 text-base">
                          {siteSettings.nayaPayNumber || '03447956085'}
                        </span>
                        <button
                          onClick={() => copyToClipboard(siteSettings.nayaPayNumber || '03447956085', 'naya_num')}
                          className="bg-orange-600 text-white text-xs px-2.5 py-1 rounded"
                        >
                          {copiedKey === 'naya_num' ? 'Copied' : 'Copy'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* INTERNATIONAL WIRE TAB (SWIFT) */}
            {activeTab === 'international' && (
              <div className="space-y-6">
                <div className="border-b border-indigo-500/30 pb-3 flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-serif font-bold text-amber-200">
                      International SWIFT & Overseas Wire Transfer
                    </h3>
                    <p className="text-xs text-red-200">
                      For students residing in UK, USA, Canada, UAE, Saudi Arabia, Qatar, Australia & Europe.
                    </p>
                  </div>
                  <span className="bg-indigo-500/20 text-indigo-300 text-xs px-3 py-1 rounded-full border border-indigo-400/40">
                    Worldwide Remittance
                  </span>
                </div>

                <div className="bg-red-950/80 border border-indigo-500/40 rounded-2xl p-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="p-3 bg-red-900/50 rounded-xl border border-red-800 space-y-1">
                      <div className="text-red-300">Beneficiary Bank:</div>
                      <div className="text-white font-bold">{siteSettings.bankName}</div>
                    </div>
                    <div className="p-3 bg-red-900/50 rounded-xl border border-red-800 space-y-1">
                      <div className="text-red-300">SWIFT / BIC Code:</div>
                      <div className="text-emerald-400 font-mono font-extrabold text-base">{siteSettings.swiftCode || 'MEZNPKKA'}</div>
                    </div>
                    <div className="p-3 bg-red-900/50 rounded-xl border border-red-800 space-y-1">
                      <div className="text-red-300">Beneficiary Account Title:</div>
                      <div className="text-amber-200 font-bold">{siteSettings.bankAccountTitle}</div>
                    </div>
                    <div className="p-3 bg-red-900/50 rounded-xl border border-red-800 space-y-1">
                      <div className="text-red-300">IBAN:</div>
                      <div className="text-amber-300 font-mono font-bold">{siteSettings.ibanNumber}</div>
                    </div>
                  </div>

                  <div className="bg-indigo-950/70 p-4 rounded-xl border border-indigo-500/40 text-xs text-indigo-200 space-y-1.5">
                    <div className="font-bold text-amber-200">International Wire Guidelines:</div>
                    <p>• When initiating the transfer from your online banking portal (e.g. Barclays, Chase, RBC, Emirates NBD, Al Rajhi), enter purpose as <strong>"Educational Services / Quran Tutoring"</strong>.</p>
                    <p>• Wire transfers usually clear within 24 to 48 business hours.</p>
                  </div>
                </div>
              </div>
            )}

            {/* REMITTANCE SERVICES TAB */}
            {activeTab === 'remittance' && (
              <div className="space-y-6">
                <div className="border-b border-yellow-500/30 pb-3 flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-serif font-bold text-amber-200">
                      Remittance Channels (Western Union / Wise / Remitly)
                    </h3>
                    <p className="text-xs text-red-200">
                      Send fee easily via online remittance apps or retail exchange booths.
                    </p>
                  </div>
                  <span className="bg-yellow-500/20 text-yellow-300 text-xs px-3 py-1 rounded-full border border-yellow-400/40">
                    Fast Remittance
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {['Western Union', 'MoneyGram', 'Remitly', 'Wise (TransferWise)', 'WorldRemit', 'Ria Money Transfer', 'TapTap Send', 'ACE Money Transfer'].map((rem, i) => (
                    <div key={i} className="p-3 bg-red-950/90 rounded-xl border border-yellow-500/30 text-center space-y-1">
                      <div className="font-bold text-amber-200 text-xs">{rem}</div>
                      <div className="text-[10px] text-emerald-400 font-semibold">Supported & Active</div>
                    </div>
                  ))}
                </div>

                <div className="bg-red-950/80 border border-yellow-500/40 rounded-2xl p-5 space-y-3 text-xs">
                  <div className="font-bold text-amber-300 text-sm">Receiver Details for Remittance:</div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="bg-red-900/60 p-2.5 rounded-lg border border-red-800">
                      <span className="text-red-300 block text-[11px]">Receiver Full Name:</span>
                      <strong className="text-white text-sm">{siteSettings.ownerName}</strong>
                    </div>
                    <div className="bg-red-900/60 p-2.5 rounded-lg border border-red-800">
                      <span className="text-red-300 block text-[11px]">City & Country:</span>
                      <strong className="text-white text-sm">{siteSettings.headOfficeCity}, Pakistan</strong>
                    </div>
                    <div className="bg-red-900/60 p-2.5 rounded-lg border border-red-800">
                      <span className="text-red-300 block text-[11px]">Receiver Phone:</span>
                      <strong className="text-emerald-400 text-sm font-mono">{siteSettings.whatsappNumber}</strong>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* DEBIT / CREDIT CARD TAB */}
            {activeTab === 'card' && (
              <div className="space-y-6">
                <div className="border-b border-purple-500/30 pb-3 flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-serif font-bold text-amber-200">
                      Debit & Credit Card Gateway
                    </h3>
                    <p className="text-xs text-red-200">
                      256-Bit SSL Encrypted Card Processing for Visa, MasterCard & UnionPay.
                    </p>
                  </div>
                  <span className="bg-purple-500/20 text-purple-300 text-xs px-3 py-1 rounded-full border border-purple-400/40">
                    256-Bit SSL
                  </span>
                </div>

                <div className="max-w-xl mx-auto bg-red-950/90 border border-purple-500/40 rounded-2xl p-6 space-y-4">
                  <div className="flex items-center justify-between border-b border-red-800 pb-3">
                    <div className="text-xs text-amber-300 font-bold uppercase tracking-wider">
                      Card Authorization Details
                    </div>
                    <div className="flex items-center gap-2 text-xs text-red-300">
                      <Lock className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Encrypted SSL</span>
                    </div>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="block text-red-200 mb-1">Cardholder Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Muneeb Ur Rehman"
                        className="w-full bg-red-900/80 border border-red-700 text-white rounded-xl p-2.5 focus:outline-none focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <label className="block text-red-200 mb-1">Card Number (16-digits)</label>
                      <input
                        type="text"
                        maxLength={19}
                        placeholder="4242 •••• •••• 4242"
                        className="w-full bg-red-900/80 border border-red-700 text-amber-200 font-mono rounded-xl p-2.5 focus:outline-none focus:border-amber-400"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-red-200 mb-1">Expiry Date (MM/YY)</label>
                        <input
                          type="text"
                          maxLength={5}
                          placeholder="MM/YY"
                          className="w-full bg-red-900/80 border border-red-700 text-white rounded-xl p-2.5 focus:outline-none focus:border-amber-400"
                        />
                      </div>
                      <div>
                        <label className="block text-red-200 mb-1">CVC / CVV</label>
                        <input
                          type="password"
                          maxLength={4}
                          placeholder="•••"
                          className="w-full bg-red-900/80 border border-red-700 text-white rounded-xl p-2.5 focus:outline-none focus:border-amber-400"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      alert('Card tokenization simulated successfully. Please complete transaction submission below.');
                      const el = document.getElementById('payment-submission-box');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 rounded-xl text-xs shadow-lg flex items-center justify-center gap-2"
                  >
                    <Lock className="w-4 h-4" />
                    <span>Authorize Payment Online (Rs. {currentCalc.totalPKR.toLocaleString()} / ${currentCalc.totalUSD})</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* PAYMENT SUBMISSION FORM BOX */}
        <div id="payment-submission-box" className="bg-gradient-to-b from-red-900 via-red-900 to-red-950 border-2 border-amber-500/50 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-red-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold">
                <Upload className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-serif font-bold text-amber-200">
                  Submit Payment Slip / Transaction ID for Instant Verification
                </h2>
                <p className="text-xs text-red-200">
                  Once submitted, an official digital invoice is automatically generated for your student records.
                </p>
              </div>
            </div>
          </div>

          {submittedReceipt ? (
            <div className="bg-red-950/90 border-2 border-emerald-500/60 rounded-2xl p-6 space-y-6">
              <div className="text-center space-y-2">
                <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border-2 border-emerald-400">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-amber-200">
                  Payment Receipt Logged Successfully!
                </h3>
                <p className="text-xs text-red-200 max-w-lg mx-auto">
                  Receipt No: <strong className="text-amber-300 font-mono">{submittedReceipt.id}</strong>. Your transaction ID (<strong>{submittedReceipt.transactionId}</strong>) has been queued for verification.
                </p>
              </div>

              {/* Printable Official Digital Invoice Voucher */}
              <div className="bg-white text-slate-900 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl border-4 border-amber-500/40 relative overflow-hidden" id="printable-invoice">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                      Official Academy Tuition Voucher
                    </span>
                    <h4 className="text-xl sm:text-2xl font-serif font-extrabold text-red-950 mt-1">
                      {siteSettings.academyName}
                    </h4>
                    <p className="text-xs text-slate-600">
                      Head Office: {siteSettings.headOfficeCity}, Pakistan • WhatsApp: {siteSettings.whatsappNumber}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold text-slate-500">VOUCHER #</div>
                    <div className="text-lg font-mono font-black text-red-900">{submittedReceipt.id}</div>
                    <div className="text-[11px] text-slate-500 font-medium">Date: {submittedReceipt.date}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div>
                    <span className="text-slate-500 text-[11px] block">Student Name:</span>
                    <strong className="text-slate-900 text-sm font-serif">{submittedReceipt.studentName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[11px] block">Quran Course:</span>
                    <strong className="text-slate-900">{submittedReceipt.courseTitle}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[11px] block">Payment Method:</span>
                    <strong className="text-emerald-700">{submittedReceipt.senderBankOrWallet || submittedReceipt.paymentMethod}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[11px] block">Transaction ID:</span>
                    <strong className="text-red-800 font-mono text-sm">{submittedReceipt.transactionId}</strong>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-slate-200 pt-4">
                  <div>
                    <div className="text-xs text-slate-500">Total Amount Received:</div>
                    <div className="text-2xl sm:text-3xl font-serif font-black text-red-950">
                      Rs. {submittedReceipt.amountPKR.toLocaleString()} PKR <span className="text-sm font-sans font-bold text-slate-600">(${submittedReceipt.amountUSD} USD)</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 text-xs font-extrabold px-3 py-1 rounded-full border border-emerald-300">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{submittedReceipt.status}</span>
                    </span>
                    <div className="text-[10px] text-slate-400 mt-1">Authorized by Founder {siteSettings.ownerName}</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={() => handleWhatsAppShareReceipt(submittedReceipt)}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-6 py-3 rounded-xl shadow flex items-center gap-2"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Send Voucher to Founder on WhatsApp</span>
                </button>
                <button
                  onClick={() => window.print()}
                  className="bg-red-900 hover:bg-red-800 text-amber-200 font-bold text-xs px-6 py-3 rounded-xl border border-amber-500/40 flex items-center gap-2"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Invoice Receipt</span>
                </button>
                <button
                  onClick={() => setSubmittedReceipt(null)}
                  className="bg-amber-500 hover:bg-amber-400 text-red-950 font-bold text-xs px-6 py-3 rounded-xl"
                >
                  Submit Another Payment
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmitPayment} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-amber-200 mb-1">
                    Student Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Zayd Rehman"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="w-full bg-red-950/90 border border-red-700 text-white rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-amber-200 mb-1">
                    Father / Guardian Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Muneeb Rehman"
                    value={guardianName}
                    onChange={(e) => setGuardianName(e.target.value)}
                    className="w-full bg-red-950/90 border border-red-700 text-white rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-amber-200 mb-1">
                    Student / Parent WhatsApp Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 03447956085"
                    value={studentPhone}
                    onChange={(e) => setStudentPhone(e.target.value)}
                    className="w-full bg-red-950/90 border border-red-700 text-white rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-amber-200 mb-1">
                    Payment Method Used *
                  </label>
                  <select
                    value={senderBankOrWallet}
                    onChange={(e) => setSenderBankOrWallet(e.target.value)}
                    className="w-full bg-red-950/90 border border-red-700 text-amber-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-amber-400"
                  >
                    <option value="EasyPaisa">EasyPaisa Mobile Wallet</option>
                    <option value="JazzCash">JazzCash Mobile Wallet</option>
                    <option value="Meezan Bank">Meezan Islamic Bank</option>
                    <option value="Bank Alfalah">Bank Alfalah</option>
                    <option value="HBL">Habib Bank Limited (HBL)</option>
                    <option value="SadaPay">SadaPay Digital Wallet</option>
                    <option value="NayaPay">NayaPay Digital Wallet</option>
                    <option value="International Wire">International Wire Transfer (SWIFT)</option>
                    <option value="Remittance">Remittance (Western Union / Wise / Remitly)</option>
                    <option value="Debit / Credit Card">Debit / Credit Card</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-amber-200 mb-1">
                    Sender Account / Mobile Number
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 03001234567 or IBAN"
                    value={senderAccountOrPhone}
                    onChange={(e) => setSenderAccountOrPhone(e.target.value)}
                    className="w-full bg-red-950/90 border border-red-700 text-white rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-amber-200 mb-1">
                    Transaction ID (TID) / Reference No *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. EP-998823104 or MZ-448201"
                    value={trxId}
                    onChange={(e) => setTrxId(e.target.value)}
                    className="w-full bg-red-950/90 border border-red-700 text-amber-300 font-mono font-bold rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Slip Upload & Notes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-bold text-amber-200 mb-1">
                    Attach Payment Slip Screenshot (Optional)
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full bg-red-950/90 border border-red-700 text-red-200 text-xs rounded-xl p-2 focus:outline-none"
                  />
                  {slipImage && (
                    <div className="mt-2 flex items-center gap-2">
                      <img src={slipImage} alt="Preview" className="w-12 h-12 object-cover rounded-lg border border-amber-400" />
                      <span className="text-[11px] text-emerald-400 font-bold">Screenshot Attached</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-amber-200 mb-1">
                    Additional Instructions / Notes
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Paid for 3 months Noorani Qaida bundle"
                    value={userNotes}
                    onChange={(e) => setUserNotes(e.target.value)}
                    className="w-full bg-red-950/90 border border-red-700 text-white rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-red-800">
                <div className="text-xs text-red-200">
                  Total Payable Amount: <strong className="text-emerald-400 text-sm">Rs. {currentCalc.totalPKR.toLocaleString()} PKR (${currentCalc.totalUSD} USD)</strong>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs px-8 py-3.5 rounded-xl shadow-xl flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Payment Receipt & Generate Voucher</span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* RECENT PAYMENTS & VERIFICATION LOG SEARCH */}
        <div className="bg-red-900/60 border border-amber-500/30 rounded-3xl p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-red-800 pb-3">
            <div>
              <h3 className="font-serif font-bold text-lg text-amber-200">
                Public Transparency & Verification Ledger
              </h3>
              <p className="text-xs text-red-200">
                Real-time verified tuition fees processed by Shaheen Al Zaitoon Quran Academy.
              </p>
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder="Search TID or Student..."
                value={searchTrxQuery}
                onChange={(e) => setSearchTrxQuery(e.target.value)}
                className="bg-red-950 text-white text-xs pl-8 pr-3 py-1.5 rounded-xl border border-red-700 focus:outline-none focus:border-amber-400 w-48 sm:w-60"
              />
              <Search className="w-3.5 h-3.5 text-red-400 absolute left-2.5 top-2.5" />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-red-300 border-b border-red-800 text-[11px] uppercase tracking-wider">
                  <th className="py-2.5 px-3">Date</th>
                  <th className="py-2.5 px-3">Student Name</th>
                  <th className="py-2.5 px-3">Course</th>
                  <th className="py-2.5 px-3">Method</th>
                  <th className="py-2.5 px-3">Amount</th>
                  <th className="py-2.5 px-3">Transaction ID</th>
                  <th className="py-2.5 px-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-red-900">
                {filteredHistory.map((p) => (
                  <tr key={p.id} className="hover:bg-red-900/40 transition-colors">
                    <td className="py-2.5 px-3 text-red-300 font-mono">{p.date}</td>
                    <td className="py-2.5 px-3 font-bold text-amber-100">{p.studentName}</td>
                    <td className="py-2.5 px-3 text-red-200">{p.courseTitle}</td>
                    <td className="py-2.5 px-3">
                      <span className="bg-red-950 px-2 py-0.5 rounded border border-red-800 text-[11px] text-amber-300 font-medium">
                        {p.senderBankOrWallet || p.paymentMethod}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 font-mono font-bold text-emerald-400">
                      Rs. {p.amountPKR.toLocaleString()} (${p.amountUSD})
                    </td>
                    <td className="py-2.5 px-3 font-mono text-amber-200 font-bold">{p.transactionId}</td>
                    <td className="py-2.5 px-3 text-right">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${
                          p.status === 'Approved'
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40'
                            : p.status === 'Pending Verification'
                            ? 'bg-amber-500/20 text-amber-300 border-amber-400/40'
                            : 'bg-red-500/20 text-red-300 border-red-400/40'
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
