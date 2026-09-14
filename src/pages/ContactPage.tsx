import React, { useState } from 'react';
import { MapPin, Phone, MessageSquare, Send, CheckCircle, Shield, CreditCard, Building, Mail } from 'lucide-react';
import { useAcademy } from '../context/AcademyContext';
import { ContactMessage } from '../types';

export const ContactPage: React.FC = () => {
  const { siteSettings, addContactMessage } = useAcademy();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Quran Admission & Free Trial');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) return;

    setIsSubmitting(true);
    const msgId = `MSG-${Date.now().toString().slice(-6)}`;
    const newMsg: ContactMessage = {
      id: msgId,
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim() || undefined,
      subject,
      message: message.trim(),
      date: new Date().toISOString().split('T')[0],
      status: 'Unread',
    };

    await addContactMessage(newMsg);
    setTicketId(msgId);
    setIsSubmitting(false);
    setSubmitted(true);
  };

  const handleWhatsAppSend = () => {
    const text = `Assalamu Alaikum Founder Muneeb Ur Rehman!\n\nI have submitted an inquiry on the Shaheen Al Zaitoon Quran Academy portal:\n\n• Ticket ID: ${ticketId}\n• Name: ${name}\n• Phone: ${phone}\n• Subject: ${subject}\n• Message: ${message}\n\nPlease assist me. JazakAllah Khair!`;
    const cleanNumber = siteSettings.whatsappNumber.replace(/[^0-9]/g, '');
    const fullNumber = cleanNumber.startsWith('92') ? cleanNumber : `92${cleanNumber.replace(/^0/, '')}`;
    window.open(`https://wa.me/${fullNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="bg-red-950 text-white min-h-screen py-10 px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-400/30">
            <MapPin className="w-4 h-4 text-amber-400" />
            <span>Rawalpindi Head Office & Global Support</span>
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
            <p className="text-xs text-red-100 leading-relaxed">{siteSettings.headOfficeAddress}</p>
            <div className="text-xs text-amber-300 font-bold pt-1">
              Founder: {siteSettings.ownerName}
            </div>
          </div>

          <div className="bg-gradient-to-b from-red-900 to-red-950 border border-amber-500/40 rounded-3xl p-6 shadow-xl space-y-3">
            <Phone className="w-8 h-8 text-emerald-400" />
            <h3 className="font-serif font-bold text-lg text-amber-200">Direct Contact</h3>
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
              <span>Direct WhatsApp Desk</span>
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
          <div className="border-b border-red-800 pb-3">
            <h2 className="text-xl font-serif font-bold text-amber-200">
              Send an Official Inquiry Message
            </h2>
            <p className="text-xs text-red-200">
              Inquiries are stored directly into our cloud support queue and alerted to the administration.
            </p>
          </div>

          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border-2 border-emerald-400">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-amber-200">Message Stored in Database!</h3>
              <div className="inline-block bg-red-950 px-4 py-1.5 rounded-full border border-amber-500/40 text-xs font-mono text-amber-300">
                Support Ticket ID: {ticketId}
              </div>
              <p className="text-xs sm:text-sm text-red-100 max-w-md mx-auto leading-relaxed">
                JazakAllah Khair, <strong>{name}</strong>! Your inquiry is logged in the system. Our team will contact you on WhatsApp (<strong>{phone}</strong>).
              </p>

              <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={handleWhatsAppSend}
                  className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-6 py-3 rounded-xl shadow flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send Directly via WhatsApp</span>
                </button>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setMessage('');
                  }}
                  className="w-full sm:w-auto bg-red-900/80 hover:bg-red-800 text-amber-300 text-xs px-6 py-3 rounded-xl border border-red-700"
                >
                  Submit Another Message
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-amber-200 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Muneeb Ur Rehman"
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-amber-200 mb-1">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. student@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-red-950/80 border border-red-700 text-white rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-amber-200 mb-1">
                    Inquiry Subject *
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-red-950/80 border border-red-700 text-amber-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-amber-400"
                  >
                    <option>Quran Admission & Free Trial</option>
                    <option>Fee Payment Verification & Receipt</option>
                    <option>Teacher / Qari Audition & Hiring</option>
                    <option>ZT Marketplace Product Inquiry</option>
                    <option>Nikah & Matrimonial Registration</option>
                    <option>General Academy Support</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-amber-200 mb-1">
                  Message / Details *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe your inquiry, timing preferences, or questions..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-red-950/80 border border-red-700 text-white rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-red-950 font-black text-xs px-8 py-3.5 rounded-xl shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="w-4 h-4 border-2 border-red-950 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  <span>{isSubmitting ? 'Recording Inquiry to Database...' : 'Send Inquiry Message'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
