import React, { useState } from 'react';
import { CreditCard, CheckCircle2, Upload, Send, X, Phone, ShieldCheck, Copy, Check, Building, Wallet, Globe, ArrowRight } from 'lucide-react';
import { useAcademy } from '../context/AcademyContext';

export const EasyPaisaPaymentModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const { siteSettings, addPayment, courses } = useAcademy();

  const [selectedMethod, setSelectedMethod] = useState<'EasyPaisa' | 'JazzCash' | 'Meezan Bank' | 'SadaPay' | 'Overseas SWIFT'>('EasyPaisa');
  const [studentName, setStudentName] = useState('');
  const [courseTitle, setCourseTitle] = useState(courses[0]?.title || 'Noorani Qaida for Beginners');
  const [amountPKR, setAmountPKR] = useState(4500);
  const [senderPhone, setSenderPhone] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleCopy = (text: string) => {
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
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleCourseChange = (title: string) => {
    setCourseTitle(title);
    const found = courses.find((c) => c.title === title);
    if (found) {
      setAmountPKR(found.feePKR);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName || !transactionId) return;

    addPayment({
      id: `pay-${Date.now()}`,
      studentName,
      courseTitle,
      amountPKR: Number(amountPKR),
      amountUSD: Math.round(Number(amountPKR) / 280),
      paymentMethod: selectedMethod as any,
      senderAccountOrPhone: senderPhone || siteSettings.easyPaisaAccountNumber,
      transactionId: transactionId.trim().toUpperCase(),
      date: new Date().toISOString().split('T')[0],
      status: 'Pending Verification',
      senderBankOrWallet: selectedMethod,
      currency: 'PKR',
    });

    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-xl bg-gradient-to-b from-red-950 via-red-900 to-red-950 border-2 border-emerald-500/60 rounded-3xl shadow-2xl overflow-hidden text-white my-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-900 via-emerald-950 to-red-900 p-5 border-b border-emerald-500/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white font-extrabold flex items-center justify-center text-sm shadow">
              EP
            </div>
            <div>
              <h3 className="text-lg font-serif font-bold text-amber-200">
                Official Tuition Fee Portal
              </h3>
              <p className="text-xs text-emerald-300 font-medium">
                Shaheen Al Zaitoon Quran Academy • Rawalpindi Head Office
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              onClose();
              setSubmitted(false);
            }}
            className="p-1.5 rounded-lg bg-red-900/80 text-amber-300 hover:bg-red-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Method Selector Chips */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-red-900/60 border border-emerald-500/30 rounded-xl">
            {(['EasyPaisa', 'JazzCash', 'Meezan Bank', 'SadaPay', 'Overseas SWIFT'] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setSelectedMethod(m)}
                className={`flex-1 min-w-[80px] py-1.5 px-2 rounded-lg text-xs font-bold transition-all text-center ${
                  selectedMethod === m
                    ? 'bg-emerald-500 text-red-950 font-extrabold shadow'
                    : 'text-red-100 hover:bg-red-900'
                }`}
              >
                {m}
              </button>
            ))}
          </div>

          {/* Dynamic Account Details Box */}
          <div className="bg-emerald-950/80 border-2 border-emerald-500/60 rounded-2xl p-4 text-center space-y-2 relative">
            <div className="text-[11px] text-emerald-400 uppercase tracking-widest font-extrabold flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>
                {selectedMethod === 'EasyPaisa' && 'Official EasyPaisa Account'}
                {selectedMethod === 'JazzCash' && 'Official JazzCash Mobile Wallet'}
                {selectedMethod === 'Meezan Bank' && 'Meezan Islamic Bank Pakistan'}
                {selectedMethod === 'SadaPay' && 'SadaPay Digital Account'}
                {selectedMethod === 'Overseas SWIFT' && 'Overseas International SWIFT Wire'}
              </span>
            </div>

            <div className="text-xs text-red-200">
              Account Title: <strong className="text-amber-200 text-sm font-serif">{selectedMethod === 'Meezan Bank' ? siteSettings.bankAccountTitle : siteSettings.ownerName}</strong>
            </div>

            {selectedMethod === 'EasyPaisa' && (
              <div className="flex items-center justify-center gap-2 pt-1">
                <span className="text-2xl font-mono font-black text-emerald-300 tracking-wider">
                  {siteSettings.easyPaisaAccountNumber}
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(siteSettings.easyPaisaAccountNumber)}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs px-2.5 py-1 rounded-lg flex items-center gap-1"
                >
                  {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            )}

            {selectedMethod === 'JazzCash' && (
              <div className="flex items-center justify-center gap-2 pt-1">
                <span className="text-2xl font-mono font-black text-amber-300 tracking-wider">
                  {siteSettings.jazzCashAccountNumber || '03447956085'}
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(siteSettings.jazzCashAccountNumber || '03447956085')}
                  className="bg-red-700 hover:bg-red-600 text-white text-xs px-2.5 py-1 rounded-lg flex items-center gap-1"
                >
                  {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            )}

            {selectedMethod === 'Meezan Bank' && (
              <div className="text-xs text-left bg-red-950/90 p-2.5 rounded-xl border border-amber-500/40 space-y-1">
                <div>Account No: <strong className="text-white font-mono">{siteSettings.bankAccountNumber}</strong></div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] text-amber-300 truncate mr-2">IBAN: {siteSettings.ibanNumber}</span>
                  <button
                    type="button"
                    onClick={() => handleCopy(siteSettings.ibanNumber)}
                    className="bg-amber-500 text-red-950 text-[10px] font-bold px-2 py-0.5 rounded"
                  >
                    Copy IBAN
                  </button>
                </div>
              </div>
            )}

            {selectedMethod === 'SadaPay' && (
              <div className="text-xs text-center space-y-1">
                <div className="text-2xl font-mono font-bold text-teal-300">{siteSettings.sadaPayNumber || '03447956085'}</div>
                <div className="text-[11px] text-amber-300 font-mono">IBAN: {siteSettings.sadaPayIban || 'PK05SADA0000003447956085'}</div>
              </div>
            )}

            {selectedMethod === 'Overseas SWIFT' && (
              <div className="text-xs text-left bg-red-950/90 p-2.5 rounded-xl border border-indigo-500/40 space-y-1">
                <div>SWIFT Code: <strong className="text-emerald-400 font-mono">{siteSettings.swiftCode || 'MEZNPKKA'}</strong></div>
                <div>Bank: <strong className="text-white">{siteSettings.bankName}</strong></div>
                <div>IBAN: <strong className="text-amber-300 font-mono text-[11px]">{siteSettings.ibanNumber}</strong></div>
              </div>
            )}
          </div>

          {submitted ? (
            <div className="text-center py-6 space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h4 className="text-xl font-serif font-bold text-amber-200">
                Payment Receipt Submitted Successfully!
              </h4>
              <p className="text-xs text-red-100 max-w-sm mx-auto">
                Your transaction ID (<strong>{transactionId}</strong>) has been logged for instant verification by Founder <strong>{siteSettings.ownerName}</strong>. You will receive receipt confirmation on WhatsApp (<strong>{siteSettings.whatsappNumber}</strong>).
              </p>
              <button
                onClick={() => {
                  onClose();
                  setSubmitted(false);
                }}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-amber-200 mb-1">
                  Student Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Zayd Muneeb"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full bg-red-900/80 border border-red-700 text-white rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-amber-200 mb-1">
                    Select Course
                  </label>
                  <select
                    value={courseTitle}
                    onChange={(e) => handleCourseChange(e.target.value)}
                    className="w-full bg-red-900/80 border border-red-700 text-amber-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-emerald-400"
                  >
                    {courses.map((c) => (
                      <option key={c.id} value={c.title}>
                        {c.title} (Rs. {c.feePKR.toLocaleString()} / ${c.feeUSD})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-amber-200 mb-1">
                    Tuition Fee (PKR) *
                  </label>
                  <input
                    type="number"
                    required
                    value={amountPKR}
                    onChange={(e) => setAmountPKR(Number(e.target.value))}
                    className="w-full bg-red-900/80 border border-red-700 text-white rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-emerald-400 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-amber-200 mb-1">
                    Sender Account / Phone
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. 03447956085"
                    value={senderPhone}
                    onChange={(e) => setSenderPhone(e.target.value)}
                    className="w-full bg-red-900/80 border border-red-700 text-white rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-emerald-400 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-amber-200 mb-1">
                    Transaction ID (TID / Ref) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. EP-998823104"
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                    className="w-full bg-red-900/80 border border-red-700 text-amber-300 font-mono font-bold rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <a
                  href={`https://wa.me/92${siteSettings.whatsappNumber.replace(/^0/, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-emerald-400 hover:underline flex items-center gap-1 font-semibold"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>WhatsApp Support</span>
                </a>

                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs px-6 py-2.5 rounded-xl shadow-lg flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Payment Receipt</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
