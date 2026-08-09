import React, { useState } from 'react';
import { MessageCircle, X, Send, BookOpen, ShoppingBag, Heart, DollarSign, CheckCircle2 } from 'lucide-react';
import { useAcademy } from '../context/AcademyContext';

export const WhatsAppWidget: React.FC = () => {
  const { siteSettings } = useAcademy();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<'quran' | 'zt' | 'matrimonial' | 'affiliate'>('quran');
  const [customMsg, setCustomMsg] = useState('');

  const cleanPhone = siteSettings.whatsappNumber.replace(/[^0-9]/g, '');

  const topics = [
    {
      id: 'quran',
      title: 'Quran Class Trial',
      subtitle: 'Ask about courses, timings & EasyPaisa fee',
      icon: BookOpen,
      defaultMsg: 'Assalamu Alaikum! I would like to book a 3-Day Free Trial Quran Class for my child/family.',
    },
    {
      id: 'zt',
      title: 'ZT Traders Product Order',
      subtitle: 'Ajwa Dates, Sidr Honey, Ittar & Quran Pens',
      icon: ShoppingBag,
      defaultMsg: 'Assalamu Alaikum ZT Traders! I am interested in ordering Sidr Honey / Ajwa Dates.',
    },
    {
      id: 'matrimonial',
      title: 'Shaheen Marriage Bureau',
      subtitle: 'Islamic Rishta proposals & family matchmaking',
      icon: Heart,
      defaultMsg: 'Assalamu Alaikum! I need details regarding Shaheen Matrimonial Nikah Bureau proposals.',
    },
    {
      id: 'affiliate',
      title: 'Affiliate & Referral Partner',
      subtitle: 'Earn commissions & promote our platforms',
      icon: DollarSign,
      defaultMsg: 'Assalamu Alaikum! I want to join the Shaheen Growth & Affiliate Partner program.',
    },
  ];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const topicObj = topics.find((t) => t.id === selectedTopic);
    const finalText = customMsg.trim() || topicObj?.defaultMsg || 'Assalamu Alaikum!';
    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(finalText)}`;
    window.open(url, '_blank');
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-20 right-6 z-40 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-3 rounded-full shadow-2xl border-2 border-emerald-300 flex items-center gap-2 transform hover:scale-105 transition-all"
        >
          <div className="relative">
            <MessageCircle className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full animate-ping" />
          </div>
          <span className="text-xs font-serif hidden sm:inline">WhatsApp Desk (24/7)</span>
        </button>
      )}

      {/* Floating Dialog Modal */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 z-50 w-80 sm:w-96 bg-red-950 border-2 border-emerald-500/60 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[550px] text-white">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-emerald-800 p-3.5 flex items-center justify-between border-b border-emerald-500/40">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-white text-emerald-800 flex items-center justify-center font-bold">
                <MessageCircle className="w-5 h-5 fill-current" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-amber-200 text-sm">Shaheen WhatsApp Desk</h4>
                <p className="text-[10px] text-emerald-100">Official Rawalpindi HQ • Founder Muneeb Ur Rehman</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-emerald-100 hover:text-white bg-emerald-900/50 p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-3.5 space-y-3 overflow-y-auto max-h-[380px] bg-red-900/30">
            <div className="text-[11px] text-amber-200/90 font-medium bg-red-950 p-2.5 rounded-xl border border-amber-500/20">
              Select what you would like to inquire about to route your WhatsApp message directly to our dedicated desk:
            </div>

            <div className="grid grid-cols-1 gap-2">
              {topics.map((t) => {
                const Icon = t.icon;
                const isSel = selectedTopic === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => {
                      setSelectedTopic(t.id as any);
                      setCustomMsg(t.defaultMsg);
                    }}
                    className={`p-2.5 rounded-xl border text-left flex items-start gap-2.5 transition-all ${
                      isSel
                        ? 'bg-amber-500 text-red-950 border-amber-300 shadow-md font-semibold'
                        : 'bg-red-950 hover:bg-red-900/80 text-white border-amber-500/20'
                    }`}
                  >
                    <div className={`p-1.5 rounded-lg shrink-0 ${isSel ? 'bg-red-950 text-amber-300' : 'bg-red-900 text-amber-300'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold font-serif flex items-center justify-between">
                        <span>{t.title}</span>
                        {isSel && <CheckCircle2 className="w-3.5 h-3.5 text-red-950" />}
                      </div>
                      <div className={`text-[10px] truncate ${isSel ? 'text-red-900' : 'text-red-200'}`}>
                        {t.subtitle}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <form onSubmit={handleSend} className="space-y-2 pt-1">
              <label className="block text-[11px] font-bold text-amber-200">
                Customize Message:
              </label>
              <textarea
                rows={2}
                value={customMsg}
                onChange={(e) => setCustomMsg(e.target.value)}
                placeholder="Type your message..."
                className="w-full bg-red-950 text-white placeholder-red-300/60 p-2 rounded-xl text-xs border border-amber-500/30 focus:outline-none focus:border-amber-400"
              />

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-lg"
              >
                <Send className="w-4 h-4" />
                <span>Open in WhatsApp App</span>
              </button>
            </form>
          </div>

          {/* Footer */}
          <div className="bg-red-950 px-3 py-2 text-[10px] text-center text-amber-300/80 border-t border-amber-500/20">
            Direct Line: {siteSettings.whatsappNumber} (EasyPaisa verified)
          </div>
        </div>
      )}
    </>
  );
};
