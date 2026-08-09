import React, { useState } from 'react';
import { Heart, Sparkles, Send, CheckCircle, CreditCard } from 'lucide-react';
import { useAcademy } from '../context/AcademyContext';

export const DonationsPage: React.FC = () => {
  const { siteSettings, addPayment } = useAcademy();
  const [donorName, setDonorName] = useState('');
  const [amount, setAmount] = useState(5000);
  const [trxId, setTrxId] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trxId) return;

    addPayment({
      id: `don-${Date.now()}`,
      studentName: donorName || 'Anonymous Donor',
      courseTitle: 'Sadaqah Jariyah Scholarship Fund',
      amountPKR: Number(amount),
      amountUSD: Math.round(Number(amount) / 280),
      paymentMethod: 'EasyPaisa',
      senderAccountOrPhone: '03447956085',
      transactionId: trxId,
      date: new Date().toISOString().split('T')[0],
      status: 'Approved',
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

        {/* EasyPaisa Donation Details Box */}
        <div className="bg-gradient-to-r from-red-900 via-amber-950 to-red-900 border-2 border-amber-500/60 rounded-3xl p-6 sm:p-8 text-center space-y-4 shadow-2xl">
          <div className="text-xs text-amber-300 font-bold uppercase tracking-wider">
            Direct EasyPaisa Account for Sadaqah & Zakat
          </div>
          <div className="text-sm text-red-100">
            Account Title: <strong className="text-amber-200 font-serif text-lg">{siteSettings.easyPaisaAccountTitle}</strong>
          </div>
          <div className="text-3xl font-mono font-extrabold text-emerald-300 tracking-wider">
            {siteSettings.easyPaisaAccountNumber}
          </div>
          <div className="text-xs text-red-200">
            Official Contact / WhatsApp: <strong>{siteSettings.whatsappNumber}</strong> • Rawalpindi, Pakistan
          </div>
        </div>

        {/* Contribution Form */}
        <div className="bg-gradient-to-b from-red-900 to-red-950 border border-amber-500/40 rounded-3xl p-6 space-y-4 shadow-xl">
          <h2 className="text-xl font-serif font-bold text-amber-200">Submit Contribution Receipt</h2>

          {submitted ? (
            <div className="text-center py-6 space-y-3">
              <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
              <h3 className="text-xl font-serif font-bold text-amber-200">
                JazakAllah Khair for Your Generous Sadaqah!
              </h3>
              <p className="text-xs text-red-100">
                May Allah accept this contribution and grant high ranks in Jannah to late Zaitoon Bibi.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-amber-200 mb-1">Donor Name (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. Muneeb Rehman"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    className="w-full bg-red-950/80 border border-red-700 text-white rounded-xl px-3.5 py-2.5 text-xs focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-amber-200 mb-1">Contribution Amount (PKR) *</label>
                  <input
                    type="number"
                    required
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full bg-red-950/80 border border-red-700 text-white rounded-xl px-3.5 py-2.5 text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-amber-200 mb-1">EasyPaisa Transaction ID (TID) *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. EP-998823104"
                  value={trxId}
                  onChange={(e) => setTrxId(e.target.value)}
                  className="w-full bg-red-950/80 border border-red-700 text-white font-mono rounded-xl px-3.5 py-2.5 text-xs focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="bg-amber-500 hover:bg-amber-400 text-red-950 font-bold text-xs px-6 py-3 rounded-xl shadow flex items-center gap-1.5"
              >
                <Send className="w-4 h-4" />
                <span>Submit Sadaqah Receipt</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
