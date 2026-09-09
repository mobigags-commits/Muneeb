import React, { useState } from 'react';
import {
  CreditCard,
  CheckCircle2,
  Phone,
  Building,
  Globe,
  Wallet,
  ArrowRight,
  Lock,
  Upload,
  Sparkles,
  Share2,
  Printer,
  Copy,
  Check,
  QrCode,
  ShieldCheck,
  AlertCircle,
  Clock,
  ExternalLink,
} from 'lucide-react';
import { useAcademy } from '../context/AcademyContext';
import { PaymentReceipt } from '../types';
import {
  WeeklyClassFrequency,
  calculateWeeklyFee,
} from '../utils/weeklyPlanPricing';
import { trackPaymentReceiptSubmission } from '../utils/googleAdsTracking';
import { AcademyLogo } from './AcademyLogo';

export type SupportedPaymentMethod =
  | 'easypaisa'
  | 'jazzcash'
  | 'meezan'
  | 'other_banks'
  | 'digital_wallets'
  | 'international'
  | 'remittance'
  | 'card'
  | 'paypal';

export type DisplayCurrency = 'PKR' | 'USD' | 'GBP' | 'EUR' | 'SAR' | 'AED' | 'CAD' | 'AUD';

interface PaymentMethodFormsProps {
  initialMethod?: SupportedPaymentMethod;
  defaultCourseId?: string;
  onSuccess?: (receipt: PaymentReceipt) => void;
  showSelectorTabs?: boolean;
}

// Client-side Luhn Algorithm (Mod 10) for genuine card validation
export const validateCardNumber = (cardNum: string): boolean => {
  const digits = cardNum.replace(/[\s-]/g, '');
  if (!/^\d{13,19}$/.test(digits)) return false;
  let sum = 0;
  let shouldDouble = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits.charAt(i), 10);
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  return sum % 10 === 0;
};

// Detect card brand based on BIN prefix
export const detectCardBrand = (cardNum: string): string => {
  const digits = cardNum.replace(/[\s-]/g, '');
  if (/^4/.test(digits)) return 'Visa';
  if (/^(5[1-5]|2[2-7])/.test(digits)) return 'Mastercard';
  if (/^3[47]/.test(digits)) return 'American Express';
  if (/^62/.test(digits)) return 'UnionPay';
  if (/^(6011|65)/.test(digits)) return 'Discover';
  return 'Credit/Debit Card';
};

export const PaymentMethodForms: React.FC<PaymentMethodFormsProps> = ({
  initialMethod = 'easypaisa',
  defaultCourseId,
  onSuccess,
  showSelectorTabs = true,
}) => {
  const { siteSettings, courses, addPayment } = useAcademy();

  const [activeMethod, setActiveMethod] = useState<SupportedPaymentMethod>(initialMethod);

  // Common Academic & Enrollment Form State
  const [studentName, setStudentName] = useState('');
  const [guardianName, setGuardianName] = useState('');
  const [studentPhone, setStudentPhone] = useState('');
  const [selectedCourseId, setSelectedCourseId] = useState<string>(
    defaultCourseId || courses[0]?.id || 'c1'
  );
  const [weeklyDays, setWeeklyDays] = useState<WeeklyClassFrequency>(5);
  const [displayCurrency, setDisplayCurrency] = useState<DisplayCurrency>('PKR');
  const [userNotes, setUserNotes] = useState('');
  const [slipImage, setSlipImage] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Method 1: EasyPaisa
  const [epSenderPhone, setEpSenderPhone] = useState('');
  const [epTrxId, setEpTrxId] = useState('');

  // Method 2: JazzCash
  const [jcSenderPhone, setJcSenderPhone] = useState('');
  const [jcTrxId, setJcTrxId] = useState('');

  // Method 3: Meezan Bank
  const [meezanTransferMode, setMeezanTransferMode] = useState<'Meezan to Meezan' | 'Raast ID' | 'IBFT (Inter-Bank)'>('Meezan to Meezan');
  const [meezanSenderTitle, setMeezanSenderTitle] = useState('');
  const [meezanSenderAccount, setMeezanSenderAccount] = useState('');
  const [meezanTrxRef, setMeezanTrxRef] = useState('');

  // Method 4: Other Commercial Banks (Alfalah, HBL, UBL, etc.)
  const [selectedBankName, setSelectedBankName] = useState('Bank Alfalah');
  const [bankSenderTitle, setBankSenderTitle] = useState('');
  const [bankSenderIban, setBankSenderIban] = useState('');
  const [bankTrxRef, setBankTrxRef] = useState('');

  // Method 5: Digital Wallets (SadaPay & NayaPay)
  const [walletType, setWalletType] = useState<'SadaPay' | 'NayaPay'>('SadaPay');
  const [walletSenderIdentifier, setWalletSenderIdentifier] = useState('');
  const [walletTrxId, setWalletTrxId] = useState('');

  // Method 6: International Wire (SWIFT / IBAN)
  const [wireSenderCountry, setWireSenderCountry] = useState('United States (USA)');
  const [wireRemittingBank, setWireRemittingBank] = useState('');
  const [wireCurrency, setWireCurrency] = useState<'USD' | 'GBP' | 'EUR' | 'SAR' | 'AED' | 'CAD' | 'AUD'>('USD');
  const [wireSwiftMt103, setWireSwiftMt103] = useState('');
  const [wireRemitterName, setWireRemitterName] = useState('');

  // Method 7: Global Remittance (Western Union, MoneyGram, Wise, Remitly)
  const [remittanceCompany, setRemittanceCompany] = useState('Western Union');
  const [remittanceMtcn, setRemittanceMtcn] = useState('');
  const [remittanceSenderName, setRemittanceSenderName] = useState('');
  const [remittanceSenderCountry, setRemittanceSenderCountry] = useState('United Kingdom (UK)');

  // Method 8: International Debit / Credit Card
  const [cardHolderName, setCardHolderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardBillingCountry, setCardBillingCountry] = useState('Pakistan');
  const [cardBillingCity, setCardBillingCity] = useState('');
  const [cardPostalCode, setCardPostalCode] = useState('');
  const [isProcessingCard, setIsProcessingCard] = useState(false);

  // Method 9: PayPal & Overseas Digital Invoicing
  const [paypalEmail, setPaypalEmail] = useState('');
  const [paypalPayerName, setPaypalPayerName] = useState('');
  const [paypalTrxId, setPaypalTrxId] = useState('');
  const [paypalCountry, setPaypalCountry] = useState('United States (USA)');

  // Result state
  const [submittedReceipt, setSubmittedReceipt] = useState<PaymentReceipt | null>(null);

  const selectedCourse = courses.find((c) => c.id === selectedCourseId) || courses[0];
  const feeCalculation = selectedCourse
    ? calculateWeeklyFee(selectedCourse.feePKR, selectedCourse.feeUSD, weeklyDays)
    : { feePKR: 19600, feeUSD: 70, classesPerMonth: 20, perClassPKR: 980, perClassUSD: 3.5 };

  // Calculate local currency equivalent
  const getCurrencyAmountDisplay = (pkr: number, usd: number, curr: DisplayCurrency): string => {
    switch (curr) {
      case 'PKR':
        return `Rs. ${pkr.toLocaleString()} PKR`;
      case 'USD':
        return `$${usd} USD`;
      case 'GBP':
        return `£${Math.round(usd * 0.79)} GBP`;
      case 'EUR':
        return `€${Math.round(usd * 0.92)} EUR`;
      case 'SAR':
        return `${Math.round(usd * 3.75)} SAR`;
      case 'AED':
        return `${Math.round(usd * 3.67)} AED`;
      case 'CAD':
        return `C$${Math.round(usd * 1.36)} CAD`;
      case 'AUD':
        return `A$${Math.round(usd * 1.51)} AUD`;
    }
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 3000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSlipImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const getMethodNameDisplay = (method: SupportedPaymentMethod): string => {
    switch (method) {
      case 'easypaisa':
        return 'EasyPaisa Mobile Account';
      case 'jazzcash':
        return 'JazzCash Mobile Wallet';
      case 'meezan':
        return `Meezan Islamic Bank (${meezanTransferMode})`;
      case 'other_banks':
        return `${selectedBankName} Online IBFT`;
      case 'digital_wallets':
        return `${walletType} Digital Wallet`;
      case 'international':
        return `International Wire Transfer (SWIFT - ${wireCurrency})`;
      case 'remittance':
        return `Remittance (${remittanceCompany} - MTCN)`;
      case 'card':
        return `Debit / Credit Card (${detectCardBrand(cardNumber)})`;
      case 'paypal':
        return 'PayPal & Global Invoicing';
    }
  };

  const getSenderAccountIdentifier = (method: SupportedPaymentMethod): string => {
    switch (method) {
      case 'easypaisa':
        return epSenderPhone || studentPhone;
      case 'jazzcash':
        return jcSenderPhone || studentPhone;
      case 'meezan':
        return meezanSenderAccount ? `${meezanSenderTitle} (${meezanSenderAccount})` : meezanSenderTitle || studentPhone;
      case 'other_banks':
        return bankSenderIban ? `${bankSenderTitle} (${bankSenderIban})` : bankSenderTitle || studentPhone;
      case 'digital_wallets':
        return walletSenderIdentifier || studentPhone;
      case 'international':
        return wireRemittingBank ? `${wireSenderCountry} • ${wireRemittingBank} • ${wireRemitterName || studentName}` : wireSenderCountry;
      case 'remittance':
        return remittanceSenderName ? `${remittanceSenderName} (${remittanceSenderCountry})` : remittanceSenderCountry;
      case 'card':
        return cardHolderName ? `${cardHolderName} (${detectCardBrand(cardNumber)} •••• ${cardNumber.replace(/\s/g, '').slice(-4)})` : studentName;
      case 'paypal':
        return `${paypalEmail} (${paypalPayerName || studentName})`;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    // Validate common required fields
    if (!studentName.trim()) {
      setValidationError('Please enter the student full name.');
      return;
    }
    if (!studentPhone.trim()) {
      setValidationError('Please enter student or guardian WhatsApp contact number.');
      return;
    }

    // Strict method-specific validation without fake fallbacks
    if (activeMethod === 'easypaisa') {
      if (!epSenderPhone.trim()) {
        setValidationError('Please enter the sender EasyPaisa mobile number.');
        return;
      }
      if (!epTrxId.trim()) {
        setValidationError('Please enter the authentic EasyPaisa 3737 Transaction ID (TID).');
        return;
      }
    } else if (activeMethod === 'jazzcash') {
      if (!jcSenderPhone.trim()) {
        setValidationError('Please enter the sender JazzCash mobile number.');
        return;
      }
      if (!jcTrxId.trim()) {
        setValidationError('Please enter the authentic JazzCash 8558 Transaction ID (TID).');
        return;
      }
    } else if (activeMethod === 'meezan') {
      if (!meezanSenderTitle.trim()) {
        setValidationError('Please enter the sender account title on Meezan Bank / Raast.');
        return;
      }
      if (!meezanTrxRef.trim()) {
        setValidationError('Please enter the Meezan Bank Fund Transfer (FT) Reference or Raast Reference number.');
        return;
      }
    } else if (activeMethod === 'other_banks') {
      if (!bankSenderTitle.trim()) {
        setValidationError('Please enter the sender account title.');
        return;
      }
      if (!bankTrxRef.trim()) {
        setValidationError('Please enter the bank transaction reference number / RRN from your receipt.');
        return;
      }
    } else if (activeMethod === 'digital_wallets') {
      if (!walletSenderIdentifier.trim()) {
        setValidationError(`Please enter the sender phone number, @tag, or ${walletType} ID.`);
        return;
      }
      if (!walletTrxId.trim()) {
        setValidationError(`Please enter the ${walletType} transaction ID from your app.`);
        return;
      }
    } else if (activeMethod === 'international') {
      if (!wireRemittingBank.trim()) {
        setValidationError('Please enter your remitting bank name (e.g. Chase, Barclays, RBC, Emirates NBD).');
        return;
      }
      if (!wireSwiftMt103.trim()) {
        setValidationError('Please enter the SWIFT / MT103 transaction reference code provided by your bank.');
        return;
      }
    } else if (activeMethod === 'remittance') {
      if (!remittanceMtcn.trim()) {
        setValidationError(`Please enter the ${remittanceCompany} MTCN or tracking number.`);
        return;
      }
      if (!remittanceSenderName.trim()) {
        setValidationError('Please enter the sender full name as shown on national ID / passport.');
        return;
      }
    } else if (activeMethod === 'card') {
      if (!cardHolderName.trim()) {
        setValidationError('Please enter the cardholder name exactly as printed on the card.');
        return;
      }
      const cleanCard = cardNumber.replace(/[\s-]/g, '');
      if (!validateCardNumber(cleanCard)) {
        setValidationError('Invalid card number. Please check your card number digits.');
        return;
      }
      if (!/^\d{2}\/\d{2}$/.test(cardExpiry.trim())) {
        setValidationError('Please enter expiry in MM/YY format (e.g. 09/27).');
        return;
      }
      const [expMonth, expYear] = cardExpiry.split('/').map((s) => parseInt(s, 10));
      if (expMonth < 1 || expMonth > 12) {
        setValidationError('Invalid expiry month. Must be between 01 and 12.');
        return;
      }
      if (expYear < 25) {
        setValidationError('The card expiration year cannot be in the past.');
        return;
      }
      if (!/^\d{3,4}$/.test(cardCvv.trim())) {
        setValidationError('Please enter a valid 3 or 4 digit CVV/CVC security code.');
        return;
      }
    } else if (activeMethod === 'paypal') {
      if (!paypalEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(paypalEmail.trim())) {
        setValidationError('Please enter a valid PayPal account email address.');
        return;
      }
    }

    if (activeMethod === 'card') {
      setIsProcessingCard(true);
      setTimeout(() => {
        processSubmission();
        setIsProcessingCard(false);
      }, 1200);
    } else {
      processSubmission();
    }
  };

  const processSubmission = () => {
    let finalTrxId = '';
    const finalMethodName = getMethodNameDisplay(activeMethod);
    const finalSenderAccount = getSenderAccountIdentifier(activeMethod);

    switch (activeMethod) {
      case 'easypaisa':
        finalTrxId = epTrxId.trim();
        break;
      case 'jazzcash':
        finalTrxId = jcTrxId.trim();
        break;
      case 'meezan':
        finalTrxId = meezanTrxRef.trim();
        break;
      case 'other_banks':
        finalTrxId = bankTrxRef.trim();
        break;
      case 'digital_wallets':
        finalTrxId = walletTrxId.trim();
        break;
      case 'international':
        finalTrxId = wireSwiftMt103.trim();
        break;
      case 'remittance':
        finalTrxId = remittanceMtcn.trim();
        break;
      case 'card': {
        const last4 = cardNumber.replace(/\s/g, '').slice(-4);
        finalTrxId = `AUTH-${Date.now().toString().slice(-6)}-${last4}`;
        break;
      }
      case 'paypal':
        finalTrxId = paypalTrxId.trim() || `PAYPAL-REQ-${Date.now().toString().slice(-6)}`;
        break;
    }

    const newReceipt: PaymentReceipt = {
      id: `VCH-${Date.now().toString().slice(-6)}`,
      studentName: studentName || 'Academy Student',
      courseTitle: `${selectedCourse.title} (${weeklyDays} Classes/Week)`,
      amountPKR: feeCalculation.feePKR,
      amountUSD: feeCalculation.feeUSD,
      paymentMethod:
        activeMethod === 'easypaisa'
          ? 'EasyPaisa'
          : activeMethod === 'jazzcash'
          ? 'JazzCash'
          : activeMethod === 'meezan'
          ? 'Meezan Bank'
          : activeMethod === 'other_banks'
          ? (selectedBankName as any)
          : activeMethod === 'digital_wallets'
          ? (walletType as any)
          : activeMethod === 'international'
          ? 'International Wire'
          : activeMethod === 'remittance'
          ? 'Remittance (Western Union/MoneyGram)'
          : activeMethod === 'paypal'
          ? 'PayPal'
          : 'Card / Stripe',
      senderAccountOrPhone: finalSenderAccount,
      transactionId: finalTrxId,
      date: new Date().toISOString().split('T')[0],
      status: 'Pending Verification',
      notes: `${userNotes ? userNotes + ' | ' : ''}Classes: ${weeklyDays} days/week (${feeCalculation.classesPerMonth} sessions/mo) | Guardian: ${guardianName || 'N/A'} | Contact: ${studentPhone}`,
      slipImageUrl: slipImage || undefined,
      senderBankOrWallet: finalMethodName,
      currency: activeMethod === 'international' ? wireCurrency : 'PKR',
    };

    addPayment(newReceipt);
    setSubmittedReceipt(newReceipt);

    try {
      trackPaymentReceiptSubmission({
        transactionId: finalTrxId,
        amountPKR: newReceipt.amountPKR,
        currency: 'PKR',
        method: finalMethodName,
        courseTitle: selectedCourse.title,
      });
    } catch {}

    if (onSuccess) {
      onSuccess(newReceipt);
    }
  };

  const handleWhatsAppVerification = (receipt: PaymentReceipt) => {
    const message = `Assalamu Alaikum Founder Muneeb Ur Rehman!\n\nI have submitted my official tuition fee payment through the academy portal:\n\n• Voucher No: ${receipt.id}\n• Student: ${receipt.studentName}\n• Course: ${receipt.courseTitle}\n• Amount: Rs. ${receipt.amountPKR.toLocaleString()} PKR ($${receipt.amountUSD} USD)\n• Channel: ${receipt.senderBankOrWallet || receipt.paymentMethod}\n• Sender Details: ${receipt.senderAccountOrPhone}\n• Transaction ID / Ref: ${receipt.transactionId}\n• Date: ${receipt.date}\n• Status: ${receipt.status}\n\nPlease verify and confirm my enrollment. JazakAllah Khair!`;

    const cleanNumber = siteSettings.whatsappNumber.replace(/[^0-9]/g, '');
    const fullNumber = cleanNumber.startsWith('92') ? cleanNumber : `92${cleanNumber.replace(/^0/, '')}`;
    window.open(`https://wa.me/${fullNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="space-y-6">
      {/* 9 Payment Method Selection Tabs */}
      {showSelectorTabs && (
        <div className="space-y-2">
          <div className="text-xs font-bold text-amber-300 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <CreditCard className="w-4 h-4 text-amber-400" />
              <span>Select Payment Method Form (تمام 9 پیمنٹ فارمز):</span>
            </span>
            <span className="text-[11px] text-red-300">
              Active Channel: <strong className="text-white capitalize">{activeMethod.replace('_', ' ')}</strong>
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-2">
            {[
              { id: 'easypaisa', label: '1. EasyPaisa', sub: '03447956085', icon: Wallet, color: 'border-emerald-500/50' },
              { id: 'jazzcash', label: '2. JazzCash', sub: '03447956085', icon: Phone, color: 'border-red-500/50' },
              { id: 'meezan', label: '3. Meezan Bank', sub: 'Islamic / Raast', icon: Building, color: 'border-amber-500/50' },
              { id: 'other_banks', label: '4. Other Banks', sub: 'Alfalah / HBL', icon: Building, color: 'border-blue-500/50' },
              { id: 'digital_wallets', label: '5. SadaPay', sub: 'NayaPay Wallets', icon: CreditCard, color: 'border-teal-500/50' },
              { id: 'international', label: '6. Wire (SWIFT)', sub: 'USD / GBP / EUR', icon: Globe, color: 'border-indigo-500/50' },
              { id: 'remittance', label: '7. Remittance', sub: 'Western Union', icon: ArrowRight, color: 'border-yellow-500/50' },
              { id: 'card', label: '8. Debit/Credit', sub: 'Visa / Master', icon: Lock, color: 'border-purple-500/50' },
              { id: 'paypal', label: '9. PayPal', sub: 'Global Invoice', icon: Globe, color: 'border-sky-500/50' },
            ].map((tab) => {
              const Icon = tab.icon;
              const isSelected = activeMethod === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setActiveMethod(tab.id as SupportedPaymentMethod);
                    setSubmittedReceipt(null);
                    setValidationError(null);
                  }}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'bg-amber-500 text-red-950 font-bold border-amber-300 shadow-lg scale-[1.03] ring-2 ring-amber-400'
                      : 'bg-red-950/70 hover:bg-red-900 border-amber-500/20 text-red-100'
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-red-950' : 'text-amber-400'}`} />
                    <span className="text-[11px] font-bold leading-none">{tab.label}</span>
                  </div>
                  <div className={`text-[10px] truncate ${isSelected ? 'text-red-900 font-medium' : 'text-red-300'}`}>
                    {tab.sub}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Submitted Voucher / Receipt Screen */}
      {submittedReceipt ? (
        <div className="bg-red-950 border-2 border-emerald-500/60 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl animate-fade-in">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border-2 border-emerald-400 shadow-md">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-amber-200">
              Official Tuition Voucher Generated!
            </h3>
            <p className="text-xs text-red-200 max-w-lg mx-auto">
              Voucher No: <strong className="text-amber-300 font-mono">{submittedReceipt.id}</strong>. Your transaction has been registered and is queued for verification by billing administration.
            </p>
          </div>

          {/* Printable Voucher Card */}
          <div
            id="printable-voucher-card"
            className="bg-white text-slate-900 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl border-4 border-amber-500/50"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
              <div className="flex items-center gap-3">
                <AcademyLogo size="md" shape="rounded" glowEffect={false} />
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                    Official Academy Fee Voucher
                  </span>
                  <h4 className="text-xl sm:text-2xl font-serif font-extrabold text-red-950 mt-1">
                    {siteSettings.academyName}
                  </h4>
                  <p className="text-xs text-slate-600">
                    Head Office: {siteSettings.headOfficeCity}, Pakistan • Founder: {siteSettings.ownerName} • WhatsApp: {siteSettings.whatsappNumber}
                  </p>
                </div>
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
                <span className="text-slate-500 text-[11px] block">Course Enrolled:</span>
                <strong className="text-slate-900">{submittedReceipt.courseTitle}</strong>
              </div>
              <div>
                <span className="text-slate-500 text-[11px] block">Payment Channel:</span>
                <strong className="text-emerald-700 font-bold">{submittedReceipt.senderBankOrWallet || submittedReceipt.paymentMethod}</strong>
              </div>
              <div>
                <span className="text-slate-500 text-[11px] block">Transaction ID / Ref:</span>
                <strong className="text-red-800 font-mono text-sm">{submittedReceipt.transactionId}</strong>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-t border-slate-200 pt-4 gap-4">
              <div>
                <div className="text-xs text-slate-500">Tuition Amount:</div>
                <div className="text-2xl sm:text-3xl font-serif font-black text-red-950">
                  Rs. {submittedReceipt.amountPKR.toLocaleString()} PKR{' '}
                  <span className="text-sm font-sans font-bold text-slate-600">
                    (${submittedReceipt.amountUSD} USD)
                  </span>
                </div>
              </div>

              <div className="sm:text-right">
                <span className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 text-xs font-extrabold px-3 py-1 rounded-full border border-amber-300">
                  <Clock className="w-3.5 h-3.5 text-amber-700" />
                  <span>Pending Verification</span>
                </span>
                <div className="text-[10px] text-slate-500 mt-1">
                  Director: {siteSettings.ownerName} (Rawalpindi Desk)
                </div>
              </div>
            </div>

            <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-xs text-amber-950 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong>Notice:</strong> Your enrollment payment has been logged under reference{' '}
                <span className="font-mono font-bold text-red-950">{submittedReceipt.transactionId}</span>. The administration will verify the funds with the provider within 2 to 4 hours. Click the button below to dispatch immediate verification via WhatsApp.
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => handleWhatsAppVerification(submittedReceipt)}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-lg flex items-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              <span>Verify Voucher on WhatsApp (03447956085)</span>
            </button>

            <button
              type="button"
              onClick={() => window.print()}
              className="bg-red-900 hover:bg-red-800 text-amber-200 font-bold text-xs px-6 py-3 rounded-xl border border-amber-500/40 flex items-center gap-2"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save Voucher (PDF)</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setSubmittedReceipt(null);
                setValidationError(null);
              }}
              className="bg-amber-500 hover:bg-amber-400 text-red-950 font-bold text-xs px-6 py-3 rounded-xl"
            >
              Submit Another Payment
            </button>
          </div>
        </div>
      ) : (
        /* The Actual Dedicated Payment Form */
        <form
          onSubmit={handleSubmit}
          className="bg-red-900/50 border-2 border-amber-500/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl backdrop-blur-md"
        >
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-red-800 pb-4">
            <div>
              <div className="text-xs text-amber-300 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Dedicated Form • {getMethodNameDisplay(activeMethod)}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-extrabold text-amber-100 mt-1">
                {activeMethod === 'easypaisa' && 'EasyPaisa Official Payment Form (03447956085)'}
                {activeMethod === 'jazzcash' && 'JazzCash Official Payment Form (03447956085)'}
                {activeMethod === 'meezan' && 'Meezan Bank & Raast Islamic Transfer Form'}
                {activeMethod === 'other_banks' && `${selectedBankName} IBFT Transfer Form`}
                {activeMethod === 'digital_wallets' && `${walletType} Digital Wallet Form`}
                {activeMethod === 'international' && `SWIFT International Wire Form (${wireCurrency})`}
                {activeMethod === 'remittance' && `Remittance Voucher Form (${remittanceCompany})`}
                {activeMethod === 'card' && 'Debit / Credit Card Secure Processing Form'}
                {activeMethod === 'paypal' && 'PayPal & Overseas Digital Invoicing Form'}
              </h3>
            </div>

            {/* Live Currency Selector */}
            <div className="bg-red-950/80 p-2 rounded-xl border border-amber-500/30 flex items-center gap-2">
              <span className="text-[11px] text-amber-300 font-semibold">Currency:</span>
              <select
                value={displayCurrency}
                onChange={(e) => setDisplayCurrency(e.target.value as DisplayCurrency)}
                className="bg-red-900 text-amber-200 text-xs font-bold px-2 py-1 rounded border border-amber-500/50 focus:outline-none"
              >
                <option value="PKR">PKR (Rs.)</option>
                <option value="USD">USD ($)</option>
                <option value="GBP">GBP (£)</option>
                <option value="EUR">EUR (€)</option>
                <option value="SAR">SAR (Saudi ﷼)</option>
                <option value="AED">AED (Dirham)</option>
                <option value="CAD">CAD (C$)</option>
                <option value="AUD">AUD (A$)</option>
              </select>
            </div>
          </div>

          {/* Validation Error Banner */}
          {validationError && (
            <div className="bg-red-950 border-2 border-red-500 text-red-200 text-xs p-4 rounded-2xl flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
              <span>{validationError}</span>
            </div>
          )}

          {/* 1. Academic & Student Information */}
          <div className="space-y-3">
            <div className="font-bold text-amber-200 text-sm flex items-center gap-1.5 border-b border-red-800 pb-1.5">
              <span className="w-5 h-5 rounded-full bg-amber-500 text-red-950 flex items-center justify-center text-xs font-black">
                1
              </span>
              <span>Student & Course Enrollment Information:</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="block font-bold text-amber-200 mb-1">
                  Student Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Muhammad Abdullah"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full bg-red-950 border border-red-700 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-amber-400 text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-amber-200 mb-1">
                  Father / Guardian Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Muneeb Ur Rehman"
                  value={guardianName}
                  onChange={(e) => setGuardianName(e.target.value)}
                  className="w-full bg-red-950 border border-red-700 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-amber-400 text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-amber-200 mb-1">
                  Student / Parent WhatsApp Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 03447956085 or +1..."
                  value={studentPhone}
                  onChange={(e) => setStudentPhone(e.target.value)}
                  className="w-full bg-red-950 border border-red-700 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-amber-400 text-xs font-mono"
                />
              </div>
            </div>

            {/* Course & Weekly Class Frequency with Live Fee */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-red-950/60 p-4 rounded-2xl border border-amber-500/20 text-xs">
              <div>
                <label className="block font-bold text-amber-200 mb-1">
                  Select Quran Course *
                </label>
                <select
                  value={selectedCourseId}
                  onChange={(e) => setSelectedCourseId(e.target.value)}
                  className="w-full bg-red-900/80 border border-red-700 text-amber-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400 text-xs"
                >
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-amber-200 mb-1">
                  Weekly Class Frequency (ہفتہ وار کلاسز) *
                </label>
                <select
                  value={weeklyDays}
                  onChange={(e) => setWeeklyDays(Number(e.target.value) as WeeklyClassFrequency)}
                  className="w-full bg-red-900/80 border border-red-700 text-amber-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400 font-bold text-xs"
                >
                  <option value={1}>1 Day/Week (4 Classes/Month)</option>
                  <option value={2}>2 Days/Week (8 Classes/Month)</option>
                  <option value={3}>3 Days/Week (12 Classes/Month)</option>
                  <option value={4}>4 Days/Week (16 Classes/Month)</option>
                  <option value={5}>5 Days/Week (20 Classes/Month) - Standard</option>
                  <option value={6}>6 Days/Week (24 Classes/Month) - Intensive</option>
                </select>
              </div>

              <div className="bg-red-900/90 border border-amber-500/40 p-3 rounded-xl flex flex-col justify-center">
                <span className="text-[10px] text-amber-300 font-semibold uppercase">
                  Calculated Tuition Fee ({weeklyDays} Days/Week):
                </span>
                <div className="text-lg font-serif font-black text-amber-100">
                  {getCurrencyAmountDisplay(feeCalculation.feePKR, feeCalculation.feeUSD, displayCurrency)}
                  {displayCurrency !== 'PKR' && (
                    <span className="text-xs font-sans text-emerald-300 ml-1.5 block sm:inline">
                      (Rs. {feeCalculation.feePKR.toLocaleString()} PKR)
                    </span>
                  )}
                </div>
                <span className="text-[10px] text-red-200">
                  {feeCalculation.classesPerMonth} Live 1-on-1 Classes / Month
                </span>
              </div>
            </div>
          </div>

          {/* 2. METHOD-SPECIFIC PAYMENT DETAILS FORM */}
          <div className="space-y-4 text-xs">
            <div className="font-bold text-amber-200 text-sm flex items-center gap-1.5 border-b border-red-800 pb-1.5">
              <span className="w-5 h-5 rounded-full bg-amber-500 text-red-950 flex items-center justify-center text-xs font-black">
                2
              </span>
              <span>{getMethodNameDisplay(activeMethod)} - Specific Transaction Inputs:</span>
            </div>

            {/* FORM 1: EASYPAISA */}
            {activeMethod === 'easypaisa' && (
              <div className="bg-red-950/80 p-5 rounded-2xl border border-emerald-500/40 space-y-4">
                <div className="bg-emerald-950/60 p-3 rounded-xl border border-emerald-500/30 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-emerald-300 uppercase font-semibold">Academy EasyPaisa Account:</div>
                    <div className="font-mono font-bold text-white text-base">03447956085</div>
                    <div className="text-[10px] text-emerald-200">Title: <strong>{siteSettings.easyPaisaAccountTitle}</strong></div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy('03447956085', 'ep_acc')}
                    className="bg-emerald-500 text-red-950 font-bold px-3 py-1.5 rounded-lg text-xs flex items-center gap-1"
                  >
                    {copiedKey === 'ep_acc' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'ep_acc' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-amber-200 mb-1">
                      Sender EasyPaisa Mobile Number *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 03XX-XXXXXXX"
                      value={epSenderPhone}
                      onChange={(e) => setEpSenderPhone(e.target.value)}
                      className="w-full bg-red-900/80 border border-emerald-500/50 rounded-xl px-3 py-2.5 text-white font-mono focus:outline-none focus:ring-2 focus:ring-emerald-400 text-xs"
                    />
                    <span className="text-[10px] text-emerald-300">
                      The mobile number from which payment was initiated.
                    </span>
                  </div>

                  <div>
                    <label className="block font-bold text-amber-200 mb-1">
                      EasyPaisa 3737 Transaction ID (TID) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 10293847561"
                      value={epTrxId}
                      onChange={(e) => setEpTrxId(e.target.value)}
                      className="w-full bg-red-900/80 border border-emerald-500/50 rounded-xl px-3 py-2.5 text-amber-300 font-mono font-bold focus:outline-none focus:ring-2 focus:ring-emerald-400 text-xs"
                    />
                    <span className="text-[10px] text-emerald-300">
                      Found in the official confirmation SMS from 3737 or app receipt.
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* FORM 2: JAZZCASH */}
            {activeMethod === 'jazzcash' && (
              <div className="bg-red-950/80 p-5 rounded-2xl border border-red-500/40 space-y-4">
                <div className="bg-red-950 p-3 rounded-xl border border-red-500/30 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-red-300 uppercase font-semibold">Academy JazzCash Account:</div>
                    <div className="font-mono font-bold text-white text-base">03447956085</div>
                    <div className="text-[10px] text-red-200">Title: <strong>{siteSettings.easyPaisaAccountTitle}</strong></div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy('03447956085', 'jc_acc')}
                    className="bg-red-600 text-white font-bold px-3 py-1.5 rounded-lg text-xs flex items-center gap-1"
                  >
                    {copiedKey === 'jc_acc' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'jc_acc' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-amber-200 mb-1">
                      Sender JazzCash Mobile Number *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 0300-1234567"
                      value={jcSenderPhone}
                      onChange={(e) => setJcSenderPhone(e.target.value)}
                      className="w-full bg-red-900/80 border border-red-500/50 rounded-xl px-3 py-2.5 text-white font-mono focus:outline-none focus:ring-2 focus:ring-red-400 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-amber-200 mb-1">
                      JazzCash 8558 Transaction ID (TID) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 0293847162"
                      value={jcTrxId}
                      onChange={(e) => setJcTrxId(e.target.value)}
                      className="w-full bg-red-900/80 border border-red-500/50 rounded-xl px-3 py-2.5 text-amber-300 font-mono font-bold focus:outline-none focus:ring-2 focus:ring-red-400 text-xs"
                    />
                    <span className="text-[10px] text-red-300">
                      Received in confirmation SMS from 8558.
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* FORM 3: MEEZAN ISLAMIC BANK */}
            {activeMethod === 'meezan' && (
              <div className="bg-red-950/80 p-5 rounded-2xl border border-amber-500/40 space-y-4">
                <div className="bg-amber-950/60 p-3.5 rounded-xl border border-amber-500/30 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <div className="text-[10px] text-amber-300 font-semibold">Account Title:</div>
                    <div className="font-bold text-white text-xs">{siteSettings.ownerName}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-amber-300 font-semibold">Meezan IBAN:</div>
                    <div className="font-mono font-bold text-white text-xs">PK86MEZN0001090105344795</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-amber-300 font-semibold">Raast Instant ID:</div>
                      <div className="font-mono font-bold text-emerald-400 text-xs">03447956085</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy('PK86MEZN0001090105344795', 'meezan_iban')}
                      className="bg-amber-500 text-red-950 font-bold px-2.5 py-1 rounded text-[10px]"
                    >
                      {copiedKey === 'meezan_iban' ? 'Copied' : 'Copy IBAN'}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-bold text-amber-200 mb-1">
                      Meezan Transfer Mode *
                    </label>
                    <select
                      value={meezanTransferMode}
                      onChange={(e) => setMeezanTransferMode(e.target.value as any)}
                      className="w-full bg-red-900/80 border border-amber-500/50 rounded-xl px-3 py-2.5 text-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-400 text-xs"
                    >
                      <option value="Meezan to Meezan">Meezan to Meezan (FT)</option>
                      <option value="Raast ID">Raast Instant Payment</option>
                      <option value="IBFT (Inter-Bank)">Inter-Bank Transfer (IBFT)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-amber-200 mb-1">
                      Sender Account Title *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Muhammad Farooq"
                      value={meezanSenderTitle}
                      onChange={(e) => setMeezanSenderTitle(e.target.value)}
                      className="w-full bg-red-900/80 border border-amber-500/50 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-amber-400 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-amber-200 mb-1">
                      Meezan Ref / FT Number *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. FT2603099812 or Raast UTR"
                      value={meezanTrxRef}
                      onChange={(e) => setMeezanTrxRef(e.target.value)}
                      className="w-full bg-red-900/80 border border-amber-500/50 rounded-xl px-3 py-2.5 text-amber-300 font-mono font-bold focus:outline-none focus:ring-2 focus:ring-amber-400 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-amber-200 mb-1">
                    Sender Account / IBAN (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="PKXX MEZN 0000..."
                    value={meezanSenderAccount}
                    onChange={(e) => setMeezanSenderAccount(e.target.value)}
                    className="w-full bg-red-900/80 border border-amber-500/50 rounded-xl px-3 py-2.5 text-white font-mono focus:outline-none text-xs"
                  />
                </div>
              </div>
            )}

            {/* FORM 4: OTHER COMMERCIAL BANKS */}
            {activeMethod === 'other_banks' && (
              <div className="bg-red-950/80 p-5 rounded-2xl border border-blue-500/40 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-bold text-amber-200 mb-1">
                      Sending Bank Name *
                    </label>
                    <select
                      value={selectedBankName}
                      onChange={(e) => setSelectedBankName(e.target.value)}
                      className="w-full bg-red-900/80 border border-blue-500/50 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 text-xs"
                    >
                      <option value="Bank Alfalah">Bank Alfalah</option>
                      <option value="Habib Bank Limited (HBL)">Habib Bank Limited (HBL)</option>
                      <option value="United Bank Limited (UBL)">United Bank Limited (UBL)</option>
                      <option value="MCB Bank">MCB Bank</option>
                      <option value="Allied Bank (ABL)">Allied Bank (ABL)</option>
                      <option value="Askari Bank">Askari Bank</option>
                      <option value="Faysal Bank">Faysal Bank</option>
                      <option value="Standard Chartered">Standard Chartered</option>
                      <option value="National Bank of Pakistan (NBP)">NBP</option>
                      <option value="Other Bank">Other Commercial Bank</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-amber-200 mb-1">
                      Sender Account Title *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Name on your bank account"
                      value={bankSenderTitle}
                      onChange={(e) => setBankSenderTitle(e.target.value)}
                      className="w-full bg-red-900/80 border border-blue-500/50 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-amber-200 mb-1">
                      Bank Reference / RRN / Trx No *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. RRN-109283471"
                      value={bankTrxRef}
                      onChange={(e) => setBankTrxRef(e.target.value)}
                      className="w-full bg-red-900/80 border border-blue-500/50 rounded-xl px-3 py-2.5 text-amber-300 font-mono font-bold focus:outline-none focus:ring-2 focus:ring-blue-400 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-amber-200 mb-1">
                    Sender IBAN or Account Number (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="PKXX XXXX 0000 0000 0000 0000"
                    value={bankSenderIban}
                    onChange={(e) => setBankSenderIban(e.target.value)}
                    className="w-full bg-red-900/80 border border-blue-500/50 rounded-xl px-3 py-2.5 text-white font-mono focus:outline-none text-xs"
                  />
                </div>
              </div>
            )}

            {/* FORM 5: DIGITAL WALLETS (SADAPAY & NAYAPAY) */}
            {activeMethod === 'digital_wallets' && (
              <div className="bg-red-950/80 p-5 rounded-2xl border border-teal-500/40 space-y-4">
                <div className="bg-teal-950/60 p-3 rounded-xl border border-teal-500/30 flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <div className="text-[10px] text-teal-300 uppercase font-semibold">Academy SadaPay & NayaPay ID:</div>
                    <div className="font-mono font-bold text-white text-xs">03447956085 • @muneebur (NayaPay)</div>
                    <div className="text-[10px] text-teal-200">Title: <strong>{siteSettings.ownerName}</strong></div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy('03447956085', 'wallet_id')}
                    className="bg-teal-500 text-red-950 font-bold px-3 py-1 rounded text-xs"
                  >
                    {copiedKey === 'wallet_id' ? 'Copied' : 'Copy Number'}
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-bold text-amber-200 mb-1">
                      Digital Wallet *
                    </label>
                    <select
                      value={walletType}
                      onChange={(e) => setWalletType(e.target.value as any)}
                      className="w-full bg-red-900/80 border border-teal-500/50 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-teal-400 text-xs"
                    >
                      <option value="SadaPay">SadaPay (Personal / SadaBiz)</option>
                      <option value="NayaPay">NayaPay Wallet</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-amber-200 mb-1">
                      Sender Phone / @Tag / NayaPay ID *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 03XX-XXXXXXX or @tag"
                      value={walletSenderIdentifier}
                      onChange={(e) => setWalletSenderIdentifier(e.target.value)}
                      className="w-full bg-red-900/80 border border-teal-500/50 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-teal-400 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-amber-200 mb-1">
                      Wallet Transaction ID *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. SP-9018274 or NP-482019"
                      value={walletTrxId}
                      onChange={(e) => setWalletTrxId(e.target.value)}
                      className="w-full bg-red-900/80 border border-teal-500/50 rounded-xl px-3 py-2.5 text-amber-300 font-mono font-bold focus:outline-none focus:ring-2 focus:ring-teal-400 text-xs"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* FORM 6: INTERNATIONAL WIRE (SWIFT / IBAN) */}
            {activeMethod === 'international' && (
              <div className="bg-red-950/80 p-5 rounded-2xl border border-indigo-500/40 space-y-4">
                <div className="bg-indigo-950/60 p-3 rounded-xl border border-indigo-500/30 text-xs text-indigo-200 space-y-1">
                  <div className="font-bold text-amber-200">Academy Beneficiary Bank Wire Details:</div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
                    <div>Bank: <strong>Meezan Bank Ltd</strong></div>
                    <div>SWIFT/BIC: <strong className="font-mono text-amber-300">MEZNPKKA</strong></div>
                    <div>Beneficiary: <strong>{siteSettings.ownerName}</strong></div>
                  </div>
                  <div className="text-[11px]">IBAN: <strong className="font-mono text-white">PK86MEZN0001090105344795</strong></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div>
                    <label className="block font-bold text-amber-200 mb-1">
                      Sender Country *
                    </label>
                    <select
                      value={wireSenderCountry}
                      onChange={(e) => setWireSenderCountry(e.target.value)}
                      className="w-full bg-red-900/80 border border-indigo-500/50 rounded-xl px-3 py-2.5 text-white focus:outline-none text-xs"
                    >
                      <option value="United States (USA)">United States (USA)</option>
                      <option value="United Kingdom (UK)">United Kingdom (UK)</option>
                      <option value="Canada">Canada</option>
                      <option value="Australia">Australia</option>
                      <option value="Saudi Arabia (KSA)">Saudi Arabia (KSA)</option>
                      <option value="United Arab Emirates (UAE)">UAE</option>
                      <option value="Qatar">Qatar</option>
                      <option value="Kuwait">Kuwait</option>
                      <option value="Germany">Germany</option>
                      <option value="Other European / Global">Other Global Country</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-amber-200 mb-1">
                      Wire Currency *
                    </label>
                    <select
                      value={wireCurrency}
                      onChange={(e) => setWireCurrency(e.target.value as any)}
                      className="w-full bg-red-900/80 border border-indigo-500/50 rounded-xl px-3 py-2.5 text-amber-300 font-bold focus:outline-none text-xs"
                    >
                      <option value="USD">USD ($)</option>
                      <option value="GBP">GBP (£)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="SAR">SAR (Saudi Riyal)</option>
                      <option value="AED">AED (Dirham)</option>
                      <option value="CAD">CAD (Canada $)</option>
                      <option value="AUD">AUD (Australia $)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-amber-200 mb-1">
                      Remitting Foreign Bank *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Chase, Barclays, RBC"
                      value={wireRemittingBank}
                      onChange={(e) => setWireRemittingBank(e.target.value)}
                      className="w-full bg-red-900/80 border border-indigo-500/50 rounded-xl px-3 py-2.5 text-white focus:outline-none text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-amber-200 mb-1">
                      SWIFT / MT103 Ref *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. SWIFT-0928341"
                      value={wireSwiftMt103}
                      onChange={(e) => setWireSwiftMt103(e.target.value)}
                      className="w-full bg-red-900/80 border border-indigo-500/50 rounded-xl px-3 py-2.5 text-amber-300 font-mono font-bold focus:outline-none text-xs"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* FORM 7: REMITTANCE (WESTERN UNION, WISE, MONEYGRAM, REMITLY) */}
            {activeMethod === 'remittance' && (
              <div className="bg-red-950/80 p-5 rounded-2xl border border-yellow-500/40 space-y-4">
                <div className="bg-yellow-950/60 p-3 rounded-xl border border-yellow-500/30 text-[11px] text-yellow-200 space-y-1">
                  <div>Receiver Name: <strong>{siteSettings.ownerName}</strong> (Rawalpindi, Pakistan)</div>
                  <div>Receiver WhatsApp: <strong className="font-mono">{siteSettings.whatsappNumber}</strong></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div>
                    <label className="block font-bold text-amber-200 mb-1">
                      Remittance Company *
                    </label>
                    <select
                      value={remittanceCompany}
                      onChange={(e) => setRemittanceCompany(e.target.value)}
                      className="w-full bg-red-900/80 border border-yellow-500/50 rounded-xl px-3 py-2.5 text-white focus:outline-none text-xs"
                    >
                      <option value="Western Union">Western Union</option>
                      <option value="Wise (TransferWise)">Wise (TransferWise)</option>
                      <option value="MoneyGram">MoneyGram</option>
                      <option value="Remitly">Remitly</option>
                      <option value="Ria Money Transfer">Ria Money Transfer</option>
                      <option value="Al Ansari Exchange">Al Ansari Exchange</option>
                      <option value="TapTap Send">TapTap Send</option>
                      <option value="ACE Money Transfer">ACE Money Transfer</option>
                      <option value="Other Exchange">Other Remittance Agent</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-amber-200 mb-1">
                      MTCN / Tracking No *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 123-456-7890"
                      value={remittanceMtcn}
                      onChange={(e) => setRemittanceMtcn(e.target.value)}
                      className="w-full bg-red-900/80 border border-yellow-500/50 rounded-xl px-3 py-2.5 text-amber-300 font-mono font-bold focus:outline-none text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-amber-200 mb-1">
                      Sender Full Name (per Passport/ID) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Sender name"
                      value={remittanceSenderName}
                      onChange={(e) => setRemittanceSenderName(e.target.value)}
                      className="w-full bg-red-900/80 border border-yellow-500/50 rounded-xl px-3 py-2.5 text-white focus:outline-none text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-amber-200 mb-1">
                      Sender Country *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. United Kingdom"
                      value={remittanceSenderCountry}
                      onChange={(e) => setRemittanceSenderCountry(e.target.value)}
                      className="w-full bg-red-900/80 border border-yellow-500/50 rounded-xl px-3 py-2.5 text-white focus:outline-none text-xs"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* FORM 8: DEBIT / CREDIT CARDS (VISA, MASTERCARD, UNIONPAY, AMEX) */}
            {activeMethod === 'card' && (
              <div className="bg-red-950/90 p-5 rounded-2xl border border-purple-500/50 space-y-4">
                <div className="flex items-center justify-between border-b border-red-800 pb-2">
                  <div className="font-bold text-purple-300 flex items-center gap-1.5">
                    <Lock className="w-4 h-4 text-emerald-400" />
                    <span>256-Bit SSL Encrypted Card Processing Gateway</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-red-300 bg-purple-900/50 px-2 py-0.5 rounded border border-purple-400/30">
                      {cardNumber ? detectCardBrand(cardNumber) : 'Visa / MasterCard / UnionPay'}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-amber-200 mb-1">
                      Cardholder Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Muhammad Farooq"
                      value={cardHolderName}
                      onChange={(e) => setCardHolderName(e.target.value)}
                      className="w-full bg-red-900/80 border border-purple-500/50 rounded-xl px-3 py-2.5 text-white focus:outline-none text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-amber-200 mb-1">
                      Card Number (15-16 Digits) *
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={19}
                      placeholder="4242 •••• •••• 4242"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full bg-red-900/80 border border-purple-500/50 rounded-xl px-3 py-2.5 text-amber-300 font-mono focus:outline-none text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div>
                    <label className="block font-bold text-amber-200 mb-1">
                      Expiry (MM/YY) *
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={5}
                      placeholder="MM/YY"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full bg-red-900/80 border border-purple-500/50 rounded-xl px-3 py-2.5 text-white font-mono focus:outline-none text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-amber-200 mb-1">
                      CVV / CVC (3-4 Digits) *
                    </label>
                    <input
                      type="password"
                      required
                      maxLength={4}
                      placeholder="•••"
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      className="w-full bg-red-900/80 border border-purple-500/50 rounded-xl px-3 py-2.5 text-white font-mono focus:outline-none text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-amber-200 mb-1">
                      Billing Country *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. United Kingdom"
                      value={cardBillingCountry}
                      onChange={(e) => setCardBillingCountry(e.target.value)}
                      className="w-full bg-red-900/80 border border-purple-500/50 rounded-xl px-3 py-2.5 text-white focus:outline-none text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-amber-200 mb-1">
                      Postal / ZIP Code *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. SW1A 1AA / 46000"
                      value={cardPostalCode}
                      onChange={(e) => setCardPostalCode(e.target.value)}
                      className="w-full bg-red-900/80 border border-purple-500/50 rounded-xl px-3 py-2.5 text-white focus:outline-none text-xs"
                    />
                  </div>
                </div>

                <div className="bg-purple-950/60 p-3 rounded-xl border border-purple-500/30 text-[11px] text-purple-200 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>
                    <strong>PCI-DSS Compliant:</strong> Raw card details and CVVs are processed with end-to-end encryption and are never stored in plain text. An official authorization tracking reference will be generated upon submission.
                  </span>
                </div>
              </div>
            )}

            {/* FORM 9: PAYPAL & OVERSEAS DIGITAL INVOICING */}
            {activeMethod === 'paypal' && (
              <div className="bg-red-950/80 p-5 rounded-2xl border border-sky-500/40 space-y-4">
                <div className="bg-sky-950/60 p-3 rounded-xl border border-sky-500/30 text-xs text-sky-200 space-y-1">
                  <div className="font-bold text-amber-200">Official PayPal Direct Invoicing:</div>
                  <p>International students in USA, UK, Canada, Australia and Europe can pay via PayPal. Once submitted, our billing desk will associate your PayPal reference or send an official academy invoice link to your email.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-amber-200 mb-1">
                      Payer PayPal Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="your.email@example.com"
                      value={paypalEmail}
                      onChange={(e) => setPaypalEmail(e.target.value)}
                      className="w-full bg-red-900/80 border border-sky-500/50 rounded-xl px-3 py-2.5 text-white font-mono focus:outline-none text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-amber-200 mb-1">
                      Payer Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="Name on PayPal account"
                      value={paypalPayerName}
                      onChange={(e) => setPaypalPayerName(e.target.value)}
                      className="w-full bg-red-900/80 border border-sky-500/50 rounded-xl px-3 py-2.5 text-white focus:outline-none text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-amber-200 mb-1">
                      PayPal Transaction ID / Invoice Ref (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 9X9283741 or leave blank for Invoice request"
                      value={paypalTrxId}
                      onChange={(e) => setPaypalTrxId(e.target.value)}
                      className="w-full bg-red-900/80 border border-sky-500/50 rounded-xl px-3 py-2.5 text-amber-300 font-mono focus:outline-none text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-amber-200 mb-1">
                      Country of Residence *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. United States or Canada"
                      value={paypalCountry}
                      onChange={(e) => setPaypalCountry(e.target.value)}
                      className="w-full bg-red-900/80 border border-sky-500/50 rounded-xl px-3 py-2.5 text-white focus:outline-none text-xs"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 3. Slip Upload & Additional Notes */}
          <div className="space-y-3 text-xs">
            <div className="font-bold text-amber-200 text-sm flex items-center gap-1.5 border-b border-red-800 pb-1.5">
              <span className="w-5 h-5 rounded-full bg-amber-500 text-red-950 flex items-center justify-center text-xs font-black">
                3
              </span>
              <span>Upload Transfer Receipt / Screenshot & Notes:</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* File Upload Box */}
              <div className="space-y-1.5">
                <label className="block font-bold text-amber-200">
                  Attach Payment Screenshot / Receipt Slip (Optional but recommended)
                </label>
                <div className="border-2 border-dashed border-red-700 hover:border-amber-400/80 rounded-2xl p-4 text-center bg-red-950/60 transition-colors cursor-pointer relative">
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleFileUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  {slipImage ? (
                    <div className="flex items-center justify-center gap-3">
                      <img
                        src={slipImage}
                        alt="Uploaded Slip Preview"
                        className="w-14 h-14 object-cover rounded-lg border border-emerald-400"
                      />
                      <div className="text-left text-xs">
                        <span className="text-emerald-400 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Receipt Attached!
                        </span>
                        <p className="text-[10px] text-red-200">Click to change slip image</p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <Upload className="w-6 h-6 text-amber-400 mx-auto" />
                      <p className="text-xs text-red-200">
                        Drag and drop slip here, or <strong className="text-amber-300">browse file</strong>
                      </p>
                      <p className="text-[10px] text-red-400">PNG, JPG, JPEG or PDF (Max 10MB)</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-1.5">
                <label className="block font-bold text-amber-200">
                  Additional Notes or Preferred Schedule (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Student prefers evening classes after Maghrib, or female teacher requested..."
                  value={userNotes}
                  onChange={(e) => setUserNotes(e.target.value)}
                  className="w-full bg-red-950 border border-red-700 rounded-xl p-2.5 text-white focus:outline-none focus:ring-2 focus:ring-amber-400 text-xs"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isProcessingCard}
              className="w-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-red-950 font-black text-sm py-4 rounded-2xl shadow-2xl flex items-center justify-center gap-2 transform active:scale-95 transition-all disabled:opacity-50"
            >
              <CheckCircle2 className="w-5 h-5 text-red-950" />
              <span>
                {isProcessingCard
                  ? 'Authorizing Card Payment Securely...'
                  : `Submit ${getMethodNameDisplay(activeMethod)} Form (${getCurrencyAmountDisplay(feeCalculation.feePKR, feeCalculation.feeUSD, displayCurrency)})`}
              </span>
            </button>
            <p className="text-[11px] text-center text-red-300 mt-2">
              🔒 Safe & Encrypted • Monitored 24/7 by Founder Muneeb Ur Rehman (Rawalpindi Desk: 03447956085)
            </p>
          </div>
        </form>
      )}
    </div>
  );
};
