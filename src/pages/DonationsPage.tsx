import React, { useState } from 'react';
import { Heart, Sparkles, Send, CheckCircle2, CreditCard, Building, Wallet, Copy, Check, ShieldCheck } from 'lucide-react';
import { useAcademy } from '../context/AcademyContext';

export const DonationsPage: React.FC = () => {
  const { siteSettings, addPayment } = useAcademy();
  const [donorName, setDonorName] = useState('');
  const [amount, setAmount] = useState(5000);
  const [selectedMethod, setSelectedMethod] = useState<'EasyPaisa' | 'JazzCash' | 'Meezan Bank' | 'SadaPay'>('EasyPaisa');
  const [trxId, setTrxId] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trxId) return;

    addPayment({
      id: `don-${Date.now()}`,
      studentName: donorName || 'Anonymous Sadaqah Donor',
      courseTitle: 'Sadaqah Jariyah & Orphan Scholarship Fund',
      amountPKR: Number(amount),
      amountUSD: Math.round(Number(amount) / 280),
      paymentMethod: selectedMethod as any,
      senderAccountOrPhone: '03447956085',
      transactionId: trxId.trim().toUpperCase(),
      date: new Date().toISOString().split('T')[0],
      status: 'Approved',
      senderBankOrWallet: selectedMethod,
      currency: 'PKR',
    });

    setSubmitted(true);
  };

  return (
    <div className="bg-red-950 text-white min-h-screen py-10 px-4 sm:px-6 lg:px-8 space-y-10">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-400/30">
            <Heart className="w-4 h-4 text-red-400" />
            <span>Sadaqah Jariyah & Isal-e-Sawab</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-extrabold text-amber-100">
            Quran Education Scholarship Fund
          </h1>
          <p className="text-xs sm:text-sm text-red-200">
            Dedicated in loving memory of late <strong>Zaitoon Bibi</strong> ({siteSettings.motherMemorialUrdu}). Support orphan and underprivileged students learning the Holy Quran.
          </p>
        </div>

        {/* Multi-Channel Donation Accounts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* EasyPaisa Box */}
          <div className="bg-gradient-to-br from-emerald-950 to-red-950 border-2 border-emerald-500/50 rounded-2xl p-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                <Wallet className="w-4 h-4" /> EasyPaisa Wallet
              </span>
              <span className="text-[10px] bg-emerald-500 text-white font-extrabold px-2 py-0.5 rounded">Active</span>
            </div>
            <div className="text-xs text-red-200">Title: <strong className="text-white">{siteSettings.easyPaisaAccountTitle}</strong></div>
            <div className="flex items-center justify-between bg-black/40 p-2.5 rounded-xl border border-emerald-500/30">
              <span className="text-xl font-mono font-black text-emerald-300">{siteSettings.easyPaisaAccountNumber}</span>
              <button
                onClick={() => handleCopy(siteSettings.easyPaisaAccountNumber, 'ep')}
                className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-2.5 py-1 rounded"
              >
                {copiedKey === 'ep' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              </button>
            </div>
          </div>

          {/* JazzCash Box */}
          <div className="bg-gradient-to-br from-red-900 to-red-950 border-2 border-red-600/50 rounded-2xl p-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                <Wallet className="w-4 h-4" /> JazzCash Wallet
              </span>
              <span className="text-[10px] bg-red-600 text-white font-extrabold px-2 py-0.5 rounded">Active</span>
            </div>
            <div className="text-xs text-red-200">Title: <strong className="text-white">{siteSettings.ownerName}</strong></div>
            <div className="flex items-center justify-between bg-black/40 p-2.5 rounded-xl border border-red-700">
              <span className="text-xl font-mono font-black text-amber-300">{siteSettings.jazzCashAccountNumber || '03447956085'}</span>
              <button
                onClick={() => handleCopy(siteSettings.jazzCashAccountNumber || '03447956085', 'jc')}
                className="bg-red-700 hover:bg-red-600 text-white text-xs font-bold px-2.5 py-1 rounded"
              >
                {copiedKey === 'jc' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              </button>
            </div>
          </div>

          {/* Meezan Islamic Bank Box */}
          <div className="bg-gradient-to-br from-red-950 to-amber-950 border-2 border-amber-500/50 rounded-2xl p-5 space-y-2 sm:col-span-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1">
                <Building className="w-4 h-4" /> Meezan Islamic Bank (Zakat / Sadaqah)
              </span>
              <span className="text-[10px] bg-amber-500 text-red-950 font-extrabold px-2 py-0.5 rounded">Shariah Compliant</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>Title: <strong className="text-white">{siteSettings.bankAccountTitle}</strong></div>
              <div>Account: <strong className="text-amber-200 font-mono">{siteSettings.bankAccountNumber}</strong></div>
              <div className="sm:col-span-2 flex items-center justify-between bg-black/40 p-2.5 rounded-xl border border-amber-500/30">
                <span className="font-mono text-xs text-amber-300 truncate mr-2">IBAN: {siteSettings.ibanNumber}</span>
                <button
                  onClick={() => handleCopy(siteSettings.ibanNumber, 'iban')}
                  className="bg-amber-500 hover:bg-amber-400 text-red-950 text-xs font-bold px-2.5 py-1 rounded shrink-0"
                >
                  {copiedKey === 'iban' ? 'Copied' : 'Copy IBAN'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Contribution Form */}
        <div className="bg-gradient-to-b from-red-900 to-red-950 border border-amber-500/40 rounded-3xl p-6 sm:p-8 space-y-5 shadow-xl">
          <h2 className="text-xl font-serif font-bold text-amber-200">Submit Contribution Receipt</h2>

          {submitted ? (
            <div className="text-center py-6 space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h3 className="text-xl font-serif font-bold text-amber-200">
                JazakAllah Khair for Your Generous Sadaqah!
              </h3>
              <p className="text-xs text-red-100">
                May Allah accept this contribution and grant high ranks in Jannah to late Zaitoon Bibi.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="bg-amber-500 text-red-950 font-bold text-xs px-5 py-2 rounded-xl"
              >
                Submit Another Contribution
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-amber-200 mb-1">Donor Name (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. Muneeb Rehman"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    className="w-full bg-red-950/80 border border-red-700 text-white rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-amber-200 mb-1">Contribution Amount (PKR) *</label>
                  <input
                    type="number"
                    required
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full bg-red-950/80 border border-red-700 text-white rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-amber-200 mb-1">Channel Used</label>
                  <select
                    value={selectedMethod}
                    onChange={(e) => setSelectedMethod(e.target.value as any)}
                    className="w-full bg-red-950/80 border border-red-700 text-amber-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-amber-400"
                  >
                    <option value="EasyPaisa">EasyPaisa</option>
                    <option value="JazzCash">JazzCash</option>
                    <option value="Meezan Bank">Meezan Bank</option>
                    <option value="SadaPay">SadaPay</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-amber-200 mb-1">Transaction ID (TID) *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. EP-998823104 or MZ-448201"
                  value={trxId}
                  onChange={(e) => setTrxId(e.target.value)}
                  className="w-full bg-red-950/80 border border-red-700 text-amber-300 font-mono font-bold rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-400 text-red-950 font-bold text-xs px-8 py-3 rounded-xl shadow flex items-center gap-1.5"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Sadaqah Receipt</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
