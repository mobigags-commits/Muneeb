import React, { useState } from 'react';
import { MapPin, Phone, MessageSquare, Send, CheckCircle, Shield, CreditCard, Building } from 'lucide-react';
import { useAcademy } from '../context/AcademyContext';

export const ContactPage: React.FC = () => {
  const { siteSettings } = useAcademy();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message) return;
    setSubmitted(true);
  };

  return (
    <div className="bg-red-950 text-white min-h-screen py-10 px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-400/30">
            <MapPin className="w-4 h-4" />
            <span>Rawalpindi Head Office</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-extrabold text-amber-100">
            Contact Shaheen Al Zaitoon Academy
          </h1>
          <p className="text-xs sm:text-sm text-red-200">
            Reach Founder Muneeb Ur Rehman directly or visit our main office in Rawalpindi, Pakistan.
          </p>
        </div>

        {/* Official Contact & EasyPaisa Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-b from-red-900 to-red-950 border border-amber-500/40 rounded-3xl p-6 shadow-xl space-y-3">
            <MapPin className="w-8 h-8 text-amber-400" />
            <h3 className="font-serif font-bold text-lg text-amber-200">Main Head Office</h3>
            <p className="text-xs text-red-100">{siteSettings.headOfficeAddress}</p>
            <div className="text-xs text-amber-300 font-bold pt-1">
              Founder: {siteSettings.ownerName}
            </div>
          </div>

          <div className="bg-gradient-to-b from-red-900 to-red-950 border border-amber-500/40 rounded-3xl p-6 shadow-xl space-y-3">
            <Phone className="w-8 h-8 text-emerald-400" />
            <h3 className="font-serif font-bold text-lg text-amber-200">Phone & WhatsApp</h3>
            <a
              href={`tel:${siteSettings.contactNumber}`}
              className="text-xs font-mono font-bold text-emerald-300 block hover:underline"
            >
              Call: {siteSettings.contactNumber}
            </a>
            <a
              href={`https://wa.me/92${siteSettings.whatsappNumber.replace(/^0/, '')}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2 rounded-xl shadow"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Direct WhatsApp</span>
            </a>
          </div>

          <div className="bg-gradient-to-b from-emerald-950 to-red-950 border-2 border-emerald-500/60 rounded-3xl p-6 shadow-xl space-y-3">
            <CreditCard className="w-8 h-8 text-emerald-400" />
            <h3 className="font-serif font-bold text-lg text-amber-200">EasyPaisa Account</h3>
            <div className="text-xs text-red-200">
              Title: <strong className="text-white">{siteSettings.easyPaisaAccountTitle}</strong>
            </div>
            <div className="text-lg font-mono font-extrabold text-emerald-300">
              {siteSettings.easyPaisaAccountNumber}
            </div>
          </div>
        </div>

        {/* Message Form */}
        <div className="bg-gradient-to-b from-red-900 via-red-900 to-red-950 border-2 border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-w-3xl mx-auto">
          <h2 className="text-xl font-serif font-bold text-amber-200">
            Send an Inquiry Message
          </h2>

          {submitted ? (
            <div className="text-center py-6 space-y-3">
              <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
              <h3 className="text-xl font-serif font-bold text-amber-200">Message Sent!</h3>
              <p className="text-xs text-red-100">
                JazakAllah Khair! We will respond on WhatsApp (<strong>{phone}</strong>) shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-amber-200 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Muneeb Rehman"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-red-950/80 border border-red-700 text-white rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-amber-200 mb-1">
                    WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 03447956085"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-red-950/80 border border-red-700 text-white rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-amber-200 mb-1">
                  Message / Inquiry *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="How can we assist you with Quran classes or fee payments?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-red-950/80 border border-red-700 text-white rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              <button
                type="submit"
                className="bg-amber-500 hover:bg-amber-400 text-red-950 font-extrabold text-xs px-8 py-3 rounded-xl shadow-lg flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Send Inquiry</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
