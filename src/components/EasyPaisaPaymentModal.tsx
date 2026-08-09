import React, { useState } from 'react';
import { CreditCard, CheckCircle, Upload, Send, X, Phone, ShieldCheck } from 'lucide-react';
import { useAcademy } from '../context/AcademyContext';

export const EasyPaisaPaymentModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const { siteSettings, addPayment, courses } = useAcademy();

  const [studentName, setStudentName] = useState('');
  const [courseTitle, setCourseTitle] = useState(courses[0]?.title || 'Nazra Quran');
  const [amountPKR, setAmountPKR] = useState(3500);
  const [senderPhone, setSenderPhone] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName || !transactionId) return;

    addPayment({
      id: `pay-${Date.now()}`,
      studentName,
      courseTitle,
      amountPKR: Number(amountPKR),
      amountUSD: Math.round(Number(amountPKR) / 280),
      paymentMethod: 'EasyPaisa',
      senderAccountOrPhone: senderPhone || '03447956085',
      transactionId,
      date: new Date().toISOString().split('T')[0],
      status: 'Pending Verification',
    });

    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-xl bg-gradient-to-b from-red-950 via-red-900 to-red-950 border-2 border-emerald-500/60 rounded-2xl shadow-2xl overflow-hidden text-white my-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-900 via-emerald-950 to-red-900 p-5 border-b border-emerald-500/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white font-extrabold flex items-center justify-center text-sm shadow">
              EP
            </div>
            <div>
              <h3 className="text-lg font-serif font-bold text-amber-200">
                EasyPaisa Fee Payment Portal
              </h3>
              <p className="text-xs text-emerald-300 font-medium">
                Shaheen Al Zaitoon Quran Academy • Rawalpindi
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
          {/* Official Account Banner */}
          <div className="bg-emerald-950/80 border-2 border-emerald-500/60 rounded-xl p-4 text-center space-y-1">
            <div className="text-xs text-emerald-300 uppercase tracking-wider font-bold">
              Official Designated Account Details
            </div>
            <div className="text-sm text-red-200">
              Account Title: <strong className="text-amber-200">{siteSettings.easyPaisaAccountTitle}</strong>
            </div>
            <div className="text-xs text-red-200">
              EasyPaisa & WhatsApp Number:
            </div>
            <div className="text-2xl font-mono font-extrabold text-emerald-300 tracking-wider">
              {siteSettings.easyPaisaAccountNumber}
            </div>
          </div>

          {submitted ? (
            <div className="text-center py-6 space-y-3">
              <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
              <h4 className="text-xl font-serif font-bold text-amber-200">
                Payment Receipt Submitted Successfully!
              </h4>
              <p className="text-xs text-red-100 max-w-sm mx-auto">
                Your transaction ID (<strong>{transactionId}</strong>) has been logged for instant verification by Founder <strong>{siteSettings.ownerName}</strong>. You will receive receipt confirmation on WhatsApp (<strong>03447956085</strong>).
              </p>
              <button
                onClick={() => {
                  onClose();
                  setSubmitted(false);
                }}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-5 py-2 rounded-xl"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-amber-200 mb-1">
                  Student Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Zayd Muneeb"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full bg-red-900/80 border border-red-700 text-white rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-amber-200 mb-1">
                    Select Course
                  </label>
                  <select
                    value={courseTitle}
                    onChange={(e) => setCourseTitle(e.target.value)}
                    className="w-full bg-red-900/80 border border-red-700 text-amber-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-emerald-400"
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
                    value={amountPKR}
                    onChange={(e) => setAmountPKR(Number(e.target.value))}
                    className="w-full bg-red-900/80 border border-red-700 text-white rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-amber-200 mb-1">
                    Sender Phone Number (EasyPaisa)
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. 03447956085"
                    value={senderPhone}
                    onChange={(e) => setSenderPhone(e.target.value)}
                    className="w-full bg-red-900/80 border border-red-700 text-white rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-amber-200 mb-1">
                    Transaction ID (TID) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. EP-998823104"
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                    className="w-full bg-red-900/80 border border-red-700 text-white font-mono rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs text-red-300 hover:text-white"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-lg flex items-center gap-1.5"
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
