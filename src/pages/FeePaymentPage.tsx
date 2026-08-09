import React, { useState } from 'react';
import { CreditCard, CheckCircle, ShieldCheck, Phone, Send, Upload, Copy, Sparkles, Building } from 'lucide-react';
import { useAcademy } from '../context/AcademyContext';

export const FeePaymentPage: React.FC = () => {
  const { siteSettings, courses, addPayment } = useAcademy();

  const [copiedEP, setCopiedEP] = useState(false);
  const [copiedIBAN, setCopiedIBAN] = useState(false);

  // Form State
  const [studentName, setStudentName] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(courses[0]?.title || 'Nazra Quran');
  const [pkrAmount, setPkrAmount] = useState(3500);
  const [senderNumber, setSenderNumber] = useState('');
  const [trxId, setTrxId] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const copyToClipboard = (text: string, type: 'ep' | 'iban') => {
    navigator.clipboard.writeText(text);
    if (type === 'ep') {
      setCopiedEP(true);
      setTimeout(() => setCopiedEP(false), 3000);
    } else {
      setCopiedIBAN(true);
      setTimeout(() => setCopiedIBAN(false), 3000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName || !trxId) return;

    addPayment({
      id: `pay-${Date.now()}`,
      studentName,
      courseTitle: selectedCourse,
      amountPKR: Number(pkrAmount),
      amountUSD: Math.round(Number(pkrAmount) / 280),
      paymentMethod: 'EasyPaisa',
      senderAccountOrPhone: senderNumber || '03447956085',
      transactionId: trxId,
      date: new Date().toISOString().split('T')[0],
      status: 'Pending Verification',
    });

    setSubmitted(true);
  };

  return (
    <div className="bg-red-950 text-white min-h-screen py-10 px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-400/30">
            <CreditCard className="w-4 h-4" />
            <span>Transparent Fee & Payment Hub</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-extrabold text-amber-100">
            EasyPaisa Fee Payment Portal
          </h1>
          <p className="text-xs sm:text-sm text-red-200">
            Send monthly course tuition directly via EasyPaisa or Meezan Bank. Submit your transaction ID below for automated digital receipt generation.
          </p>
        </div>

        {/* Account Details Banner */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* EasyPaisa Box */}
          <div className="bg-gradient-to-br from-emerald-950 via-red-950 to-emerald-950 border-2 border-emerald-500/60 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-emerald-500/30 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-emerald-500 text-white font-extrabold flex items-center justify-center text-xs">
                  EP
                </div>
                <h3 className="font-serif font-bold text-lg text-emerald-300">EasyPaisa Account</h3>
              </div>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full border border-emerald-400/30">
                Primary Payment Option
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="text-red-200">Account Title:</div>
              <div className="text-xl font-bold font-serif text-amber-200">
                {siteSettings.easyPaisaAccountTitle}
              </div>
              <div className="text-red-200 pt-2">EasyPaisa Account & WhatsApp Number:</div>
              <div className="flex items-center gap-2">
                <div className="text-2xl font-mono font-extrabold text-emerald-300 tracking-wider">
                  {siteSettings.easyPaisaAccountNumber}
                </div>
                <button
                  onClick={() => copyToClipboard(siteSettings.easyPaisaAccountNumber, 'ep')}
                  className="p-2 rounded-lg bg-emerald-900/80 hover:bg-emerald-800 text-emerald-200 text-xs flex items-center gap-1"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedEP ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Bank Transfer Box */}
          <div className="bg-gradient-to-br from-amber-950 via-red-950 to-amber-950 border-2 border-amber-500/60 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-amber-500/30 pb-3">
              <div className="flex items-center gap-2">
                <Building className="w-6 h-6 text-amber-400" />
                <h3 className="font-serif font-bold text-lg text-amber-200">Meezan Bank IBAN</h3>
              </div>
              <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2.5 py-0.5 rounded-full border border-amber-400/30">
                Bank / Overseas Wire
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="text-red-200">Bank Name: <strong className="text-white">{siteSettings.bankName}</strong></div>
              <div className="text-red-200">Account Title: <strong className="text-amber-200 font-serif">{siteSettings.bankAccountTitle}</strong></div>
              <div className="text-red-200 pt-1">IBAN Number:</div>
              <div className="flex items-center gap-2">
                <div className="text-xs font-mono font-bold text-amber-300 truncate">
                  {siteSettings.ibanNumber}
                </div>
                <button
                  onClick={() => copyToClipboard(siteSettings.ibanNumber, 'iban')}
                  className="p-2 rounded-lg bg-amber-900/80 hover:bg-amber-800 text-amber-200 text-xs flex items-center gap-1 shrink-0"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedIBAN ? 'Copied!' : 'Copy IBAN'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Transaction Verification Submission Form */}
        <div className="bg-gradient-to-b from-red-900 via-red-900 to-red-950 border-2 border-amber-500/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="flex items-center gap-3 border-b border-red-800 pb-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-serif font-bold text-amber-200">
                Submit EasyPaisa / Bank Transaction Receipt
              </h2>
              <p className="text-xs text-red-200">
                Enter your transaction ID for instant verification by Founder Muneeb Ur Rehman.
              </p>
            </div>
          </div>

          {submitted ? (
            <div className="text-center py-6 space-y-3">
              <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
              <h3 className="text-xl font-serif font-bold text-amber-200">
                Receipt Submitted for Verification!
              </h3>
              <p className="text-xs text-red-100 max-w-md mx-auto">
                Transaction ID (<strong>{trxId}</strong>) has been logged. You will receive invoice confirmation on WhatsApp (<strong>03447956085</strong>).
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="bg-amber-500 text-red-950 font-bold text-xs px-6 py-2.5 rounded-xl"
              >
                Submit Another Payment
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-amber-200 mb-1">
                    Student Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Zayd Rehman"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="w-full bg-red-950/80 border border-red-700 text-white rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-amber-200 mb-1">
                    Select Course *
                  </label>
                  <select
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                    className="w-full bg-red-950/80 border border-red-700 text-amber-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-amber-400"
                  >
                    {courses.map((c) => (
                      <option key={c.id} value={c.title}>
                        {c.title} (Rs. {c.feePKR})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-amber-200 mb-1">
                    Paid Amount (PKR) *
                  </label>
                  <input
                    type="number"
                    required
                    value={pkrAmount}
                    onChange={(e) => setPkrAmount(Number(e.target.value))}
                    className="w-full bg-red-950/80 border border-red-700 text-white rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-amber-200 mb-1">
                    EasyPaisa Transaction ID (TID) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. EP-998823104"
                    value={trxId}
                    onChange={(e) => setTrxId(e.target.value)}
                    className="w-full bg-red-950/80 border border-red-700 text-white font-mono rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end">
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs px-8 py-3.5 rounded-xl shadow-lg flex items-center gap-2"
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
