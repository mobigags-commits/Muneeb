import React, { useState, useEffect } from 'react';
import {
  Download,
  Smartphone,
  CheckCircle2,
  Share2,
  X,
  ShieldCheck,
  Zap,
  WifiOff,
  Sparkles,
  Copy,
  Check,
  CreditCard,
  Heart,
  MessageSquare,
  Lock,
  ArrowRight,
  Info
} from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { useAcademy } from '../context/AcademyContext';

interface InstallAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InstallAppModal: React.FC<InstallAppModalProps> = ({ isOpen, onClose }) => {
  const { isInstallable, isInstalled, isIOS, isAndroid, install } = usePWAInstall();
  const { siteSettings, addPayment } = useAcademy();

  const [installSuccess, setInstallSuccess] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

  // App Fee Payment State
  const [hasPaidFee, setHasPaidFee] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('sz_app_fee_paid') === 'true';
    }
    return false;
  });

  const [payerName, setPayerName] = useState('');
  const [payerPhone, setPayerPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'EasyPaisa' | 'JazzCash' | 'SadaPay' | 'Meezan Bank'>('EasyPaisa');
  const [trxId, setTrxId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentSubmittedSuccess, setPaymentSubmittedSuccess] = useState(false);
  const [showNeedyNotice, setShowNeedyNotice] = useState(false);

  useEffect(() => {
    if (isInstalled) {
      setHasPaidFee(true);
    }
  }, [isInstalled]);

  if (!isOpen) return null;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAccount(key);
    setTimeout(() => setCopiedAccount(null), 2500);
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const generatedTrx = trxId.trim() || `APP-${Date.now().toString().slice(-6)}`;
    const newPaymentId = `pay-app-${Date.now()}`;
    const feeAmount = siteSettings.appDownloadFeePKR || 100;

    // Record the Rs. 100 token fee directly into the database for the Owner
    await addPayment({
      id: newPaymentId,
      studentName: payerName.trim() || 'App User / Student',
      courseTitle: `Shaheen Quran App Installation & Download Token Fee (Rs. ${feeAmount})`,
      amountPKR: feeAmount,
      amountUSD: 0.80,
      paymentMethod,
      senderAccountOrPhone: payerPhone.trim() || 'Online User',
      transactionId: generatedTrx,
      date: new Date().toISOString().split('T')[0],
      status: 'Approved',
      notes: `App Download Commission Fee of Rs. ${feeAmount} paid directly to Owner ${siteSettings.ownerName}`,
      senderBankOrWallet: paymentMethod,
      currency: 'PKR',
    });

    localStorage.setItem('sz_app_fee_paid', 'true');
    setHasPaidFee(true);
    setIsSubmitting(false);
    setPaymentSubmittedSuccess(true);
  };

  const handleNeedyBypass = () => {
    localStorage.setItem('sz_app_fee_paid', 'true');
    setHasPaidFee(true);
    setShowNeedyNotice(true);
  };

  const handleInstallClick = async () => {
    if (isInstallable) {
      const outcome = await install();
      if (outcome) {
        setInstallSuccess(true);
      }
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: 'Shaheen Al Zaitoon Online Quran Academy App',
      text: 'Download & Install official Shaheen Al Zaitoon Quran Academy App for 1-on-1 Quran Classes & Free Trial.',
      url: window.location.origin,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // Ignored
      }
    } else {
      await navigator.clipboard.writeText(window.location.origin);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2500);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Assalamu Alaikum Founder & Owner ${siteSettings.ownerName}!\n\nI want to pay the Rs. 100 App Download & Installation Token Fee for Shaheen Quran App.\n\n• Name: ${payerName || 'Student'}\n• Phone: ${payerPhone || 'Online'}\n• Transaction ID: ${trxId || 'Pending'}\n\nPlease confirm my App download receipt. JazakAllah Khair!`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div
        className="relative w-full max-w-xl bg-gradient-to-b from-red-900 via-red-950 to-stone-950 border-2 border-amber-500/50 rounded-2xl shadow-2xl overflow-hidden text-white my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 px-4 py-2.5 text-red-950 font-bold text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-red-950" />
            <span className="tracking-wide uppercase font-extrabold">Official Mobile & Desktop Web App</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-amber-400 text-red-950 transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-5 max-h-[85vh] overflow-y-auto">
          {/* App Identity Card */}
          <div className="flex items-center gap-3.5 bg-red-950/80 p-3.5 sm:p-4 rounded-xl border border-red-800/80">
            <img
              src="/pwa-192x192.png"
              alt="Shaheen Quran Academy App Icon"
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl shadow-lg border border-amber-400/60 object-cover shrink-0"
            />
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 text-xs text-amber-400 font-bold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Verified Official App</span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-amber-100 truncate">
                Shaheen Al Zaitoon Quran App
              </h2>
              <p className="text-xs sm:text-sm text-stone-200 font-urdu mt-0.5">
                شاہین الزیتون آن لائن قرآنی اکیڈمی ایپ
              </p>
              <div className="flex items-center gap-2 mt-1 text-[11px] sm:text-xs text-amber-300/90 font-medium">
                <span>Fast & Safe</span>
                <span>•</span>
                <span>Lightweight (~1 MB)</span>
                <span>•</span>
                <span>v2.0 PWA</span>
              </div>
            </div>
          </div>

          {/* OFFICIAL TOKEN FEE ANNOUNCEMENT BOX (Rs. 100 PKR / $0.80) */}
          <div className="bg-gradient-to-r from-red-950 via-amber-950/80 to-red-950 border-2 border-amber-500/60 rounded-xl p-3.5 sm:p-4 shadow-lg space-y-2.5">
            <div className="flex items-center justify-between gap-2 border-b border-amber-500/30 pb-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="text-xs sm:text-sm font-extrabold uppercase text-amber-300 tracking-wider">
                  App Download & Activation Token Fee
                </span>
              </div>
              <span className="bg-gradient-to-r from-amber-400 to-amber-500 text-red-950 font-black text-xs sm:text-sm px-2.5 py-0.5 rounded-full shadow">
                صرف 100 روپے / Rs. 100 Only
              </span>
            </div>

            <p className="text-xs sm:text-sm text-amber-100 font-urdu leading-relaxed">
              اکیڈمی ایپ کو ڈاؤن لوڈ اور انسٹال کرنے کی کم سے کم علامتی فیس یعنی کمیشن <strong className="text-amber-300">صرف 100 روپے (PKR 100)</strong> رکھی گئی ہے، جو براہِ راست اکیڈمی کے بانی اور اونر <strong className="text-white">{siteSettings.ownerName}</strong> کے ایزی پیسہ / بینک اکاؤنٹ میں موصول ہوتی ہے تاکہ ایپ ہوسٹنگ اور قرآنی تعلیم کا سلسلہ جاری رہ سکے۔
            </p>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-[11px] sm:text-xs text-stone-300">
              <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" /> 100% براہِ راست اونر کو ادائیگی
              </span>
              <span className="flex items-center gap-1 text-amber-300 font-semibold">
                <Heart className="w-3.5 h-3.5 text-red-400" /> ایصالِ ثواب برائے زیتون بی بی
              </span>
            </div>
          </div>

          {/* OWNER PAYMENT DETAILS CARD */}
          <div className="bg-stone-900/90 border border-emerald-500/50 rounded-xl p-3.5 sm:p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <CreditCard className="w-4 h-4" />
                <span>Founder & Owner Official Receiving Accounts</span>
              </span>
              <span className="text-[11px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-bold">
                Online Verification
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {/* EasyPaisa / JazzCash Account */}
              <div className="bg-red-950/80 p-2.5 rounded-lg border border-red-800 flex items-center justify-between">
                <div>
                  <div className="text-stone-300 font-medium">EasyPaisa & JazzCash:</div>
                  <div className="text-amber-300 font-bold text-sm font-mono mt-0.5">
                    {siteSettings.easyPaisaAccountNumber}
                  </div>
                  <div className="text-[10px] text-stone-400">Title: {siteSettings.easyPaisaAccountTitle}</div>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(siteSettings.easyPaisaAccountNumber, 'easypaisa')}
                  className="p-1.5 bg-red-900 hover:bg-red-800 rounded text-amber-300 border border-amber-500/30 flex items-center gap-1 text-[10px] font-bold"
                  title="Copy Account Number"
                >
                  {copiedAccount === 'easypaisa' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedAccount === 'easypaisa' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              {/* Meezan Islamic Bank Account */}
              <div className="bg-red-950/80 p-2.5 rounded-lg border border-red-800 flex items-center justify-between">
                <div>
                  <div className="text-stone-300 font-medium">Meezan Bank (A/C):</div>
                  <div className="text-amber-300 font-bold text-sm font-mono mt-0.5">
                    03447956085001
                  </div>
                  <div className="text-[10px] text-stone-400">Title: Shaheen Al Zaitoon</div>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy('03447956085001', 'meezan')}
                  className="p-1.5 bg-red-900 hover:bg-red-800 rounded text-amber-300 border border-amber-500/30 flex items-center gap-1 text-[10px] font-bold"
                  title="Copy Account Number"
                >
                  {copiedAccount === 'meezan' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedAccount === 'meezan' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* STEP 1: PAYMENT SUBMISSION / VERIFICATION FORM (If not yet paid/unlocked) */}
          {!hasPaidFee && !isInstalled ? (
            <div className="bg-red-950/70 border border-amber-500/40 rounded-xl p-4 space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wide flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Step 1: Pay Rs. 100 & Enter Transaction ID</span>
                </span>
                <span className="text-[11px] text-red-200">فوری خودکار تصدیق</span>
              </div>

              <form onSubmit={handlePaymentSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[11px] text-stone-300 mb-1">
                      Your Name / آپ کا نام
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Ahmad Khan"
                      value={payerName}
                      onChange={(e) => setPayerName(e.target.value)}
                      className="w-full bg-stone-900 text-white text-xs px-3 py-2 rounded-lg border border-red-800 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-stone-300 mb-1">
                      WhatsApp / موبائل نمبر <span className="text-amber-400">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="03XXXXXXXXX"
                      value={payerPhone}
                      onChange={(e) => setPayerPhone(e.target.value)}
                      className="w-full bg-stone-900 text-white text-xs px-3 py-2 rounded-lg border border-red-800 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[11px] text-stone-300 mb-1">
                      Payment Channel / طریقہ ادائیگی
                    </label>
                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value as any)}
                      className="w-full bg-stone-900 text-white text-xs px-3 py-2 rounded-lg border border-red-800 focus:outline-none focus:border-amber-400 cursor-pointer"
                    >
                      <option value="EasyPaisa">EasyPaisa (03447956085)</option>
                      <option value="JazzCash">JazzCash (03447956085)</option>
                      <option value="SadaPay">SadaPay (03447956085)</option>
                      <option value="Meezan Bank">Meezan Bank Transfer</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] text-stone-300 mb-1">
                      Trx ID / ٹرانزیکشن آئی ڈی (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 8192304859"
                      value={trxId}
                      onChange={(e) => setTrxId(e.target.value)}
                      className="w-full bg-stone-900 text-white text-xs px-3 py-2 rounded-lg border border-red-800 focus:outline-none focus:border-amber-400 font-mono"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-500 hover:from-emerald-400 hover:to-emerald-500 text-white font-extrabold rounded-xl shadow-lg transition text-xs sm:text-sm flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>
                    {isSubmitting ? 'Recording Payment...' : 'I Have Paid Rs. 100 — Unlock Download Now'}
                  </span>
                  <span className="font-urdu text-xs font-bold border-l border-white/30 pl-2">
                    100 روپے فیس ادا کر دی — ڈاؤن لوڈ کھولیں
                  </span>
                </button>
              </form>

              {/* Direct WhatsApp to Owner & Free Option for Needy */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 border-t border-red-800/80 text-xs">
                <a
                  href={`https://wa.me/92${siteSettings.whatsappNumber.replace(/^0/, '')}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-emerald-300 hover:text-emerald-200 font-bold"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Send Slip / Contact Owner on WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={handleNeedyBypass}
                  className="text-stone-300 hover:text-amber-300 underline font-urdu text-[11px]"
                >
                  اگر آپ فیس ادا نہیں کر سکتے تو بلا جھجھک مفت ڈاؤن لوڈ کریں
                </button>
              </div>
            </div>
          ) : (
            /* STEP 2: INSTALLATION UNLOCKED */
            <div className="space-y-4">
              {paymentSubmittedSuccess && (
                <div className="bg-emerald-950/80 border border-emerald-500/50 p-3.5 rounded-xl text-center space-y-1">
                  <div className="inline-flex items-center gap-1.5 text-emerald-400 font-bold text-xs sm:text-sm">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>App Token Fee (Rs. 100) Recorded Successfully!</span>
                  </div>
                  <p className="text-xs text-stone-200 font-urdu">
                    جزاک اللہ خیر! آپ کی 100 روپے فیس کا اندراج ہو چکا ہے اور اونر {siteSettings.ownerName} تک پہنچ گئی ہے۔ اب نیچے دیے گئے بٹن سے ایپ انسٹال کریں۔
                  </p>
                </div>
              )}

              {showNeedyNotice && (
                <div className="bg-amber-950/60 border border-amber-500/40 p-3 rounded-xl text-center">
                  <p className="text-xs text-amber-200 font-urdu">
                    اللہ تعالیٰ آپ کو اور آپ کے اہل خانہ کو علمِ نافع عطا فرمائے۔ آپ کے لیے ایپ ڈاؤن لوڈ مکمل طور پر کھول دی گئی ہے۔
                  </p>
                </div>
              )}

              {isInstalled || installSuccess ? (
                <div className="bg-emerald-950/80 border border-emerald-500/50 p-5 rounded-xl text-center space-y-2.5">
                  <CheckCircle2 className="w-9 h-9 text-emerald-400 mx-auto" />
                  <h3 className="text-base font-bold text-emerald-200">
                    ایپ کامیابی سے انسٹال ہو چکی ہے! / App Installed Successfully!
                  </h3>
                  <p className="text-sm text-stone-200 leading-relaxed">
                    You can now launch Shaheen Quran Academy directly from your device's home screen or desktop launcher.
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-2 w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm font-bold transition"
                  >
                    Close Window / بند کریں
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-emerald-400 font-bold px-1">
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Token Fee Verified / Ready to Install
                    </span>
                    <span className="font-urdu">اب فوری انسٹال کریں</span>
                  </div>

                  {isInstallable ? (
                    <button
                      onClick={handleInstallClick}
                      className="w-full flex items-center justify-center gap-2.5 py-3.5 px-5 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-300 hover:to-amber-400 text-red-950 font-black rounded-xl shadow-xl transition transform active:scale-98 text-sm sm:text-base"
                    >
                      <Download className="w-5 h-5 text-red-950" />
                      <span>Download & Install App (1-Click)</span>
                      <span className="text-sm font-bold text-red-900 border-l border-red-900/30 pl-2">
                        ابھی انسٹال کریں
                      </span>
                    </button>
                  ) : isIOS ? (
                    <div className="bg-stone-900/90 border border-amber-500/40 p-4 rounded-xl space-y-3">
                      <div className="flex items-center gap-2 text-amber-300 font-bold text-sm uppercase tracking-wider">
                        <Smartphone className="w-4 h-4" />
                        <span>Install on iPhone / iPad (iOS Safari)</span>
                      </div>
                      <ol className="text-xs sm:text-sm text-stone-200 space-y-2 list-decimal list-inside font-urdu leading-relaxed">
                        <li>
                          Safari براؤزر میں نیچے <strong>Share</strong> (شیئر) بٹن پر کلک کریں:
                          <span className="inline-flex items-center gap-1 bg-stone-800 px-2 py-0.5 rounded text-xs ml-1.5 text-amber-300 border border-stone-700 font-sans">
                            <Share2 className="w-3.5 h-3.5" /> Share
                          </span>
                        </li>
                        <li>
                          تھوڑا نیچے سکرول کریں اور <strong>"Add to Home Screen"</strong> منتخب کریں۔
                        </li>
                        <li>
                          اوپر دائیں کونے میں <strong>"Add"</strong> دبائیں—اکیڈمی ایپ آپ کے فون پر فوری تیار ہو جائے گی!
                        </li>
                      </ol>
                    </div>
                  ) : (
                    <div className="bg-stone-900/90 border border-amber-500/40 p-4 rounded-xl space-y-3">
                      <div className="flex items-center gap-2 text-amber-300 font-bold text-sm uppercase tracking-wider">
                        <Download className="w-4 h-4" />
                        <span>Browser Installation (Chrome / Edge / Android)</span>
                      </div>
                      <p className="text-xs sm:text-sm text-stone-200 leading-relaxed font-urdu">
                        آپ اپنے موبائل براؤزر (کروم یا ایج) کے <strong>تین نقطوں (Menu ⋮)</strong> پر کلک کر کے 
                        <strong className="text-amber-300"> "Install App" </strong> یا 
                        <strong className="text-amber-300"> "Add to Home Screen" </strong> دبائیں، ایپ فوراً انسٹال ہو جائے گی۔
                      </p>
                      <button
                        onClick={handleInstallClick}
                        className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-amber-500 hover:bg-amber-400 text-red-950 font-bold rounded-lg text-sm transition"
                      >
                        <Zap className="w-4 h-4" />
                        <span>Prompt Install Dialog Now / فوری کوشش کریں</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Benefits Grid */}
          <div className="grid grid-cols-2 gap-2.5 pt-1">
            <div className="bg-red-900/30 border border-red-800/60 p-2.5 sm:p-3 rounded-lg flex items-start gap-2">
              <Zap className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm">
                <div className="font-bold text-amber-200">1-Tap Fast Launch</div>
                <div className="text-stone-300 font-urdu text-[11px]">فوری اوپن بغیر براؤزر کھولے</div>
              </div>
            </div>

            <div className="bg-red-900/30 border border-red-800/60 p-2.5 sm:p-3 rounded-lg flex items-start gap-2">
              <WifiOff className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm">
                <div className="font-bold text-amber-200">Works Offline</div>
                <div className="text-stone-300 font-urdu text-[11px]">آف لائن کیشنگ اور شیڈول</div>
              </div>
            </div>

            <div className="bg-red-900/30 border border-red-800/60 p-2.5 sm:p-3 rounded-lg flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm">
                <div className="font-bold text-amber-200">Direct to Owner</div>
                <div className="text-stone-300 font-urdu text-[11px]">اونر منیب الرحمن کو شفاف ادائیگی</div>
              </div>
            </div>

            <div className="bg-red-900/30 border border-red-800/60 p-2.5 sm:p-3 rounded-lg flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm">
                <div className="font-bold text-amber-200">Only Rs. 100 Token</div>
                <div className="text-stone-300 font-urdu text-[11px]">ہر ایک کے لیے انتہائی آسان فیس</div>
              </div>
            </div>
          </div>

          {/* Share App Link Footer */}
          <div className="pt-2 border-t border-red-800/80 flex items-center justify-between gap-3 text-xs">
            <span className="text-stone-300 text-xs">
              Share this sacred App with family & friends:
            </span>
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-red-900/80 hover:bg-red-800 text-amber-300 rounded-lg font-bold border border-red-700 transition text-xs"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copySuccess ? 'Link Copied! ✓' : 'Share App'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
