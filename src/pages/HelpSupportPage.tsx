import React from 'react';
import { MessageSquare, Phone, MapPin, Sparkles, HelpCircle } from 'lucide-react';
import { useAcademy } from '../context/AcademyContext';
import { AIChatAssistant } from '../components/AIChatAssistant';

export const HelpSupportPage: React.FC = () => {
  const { siteSettings } = useAcademy();

  return (
    <div className="bg-red-950 text-white min-h-screen py-10 px-4 sm:px-6 lg:px-8 space-y-10">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-400/30">
            <HelpCircle className="w-4 h-4" />
            <span>24/7 Help Desk</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-extrabold text-amber-100">
            Academy Help Desk & Support
          </h1>
          <p className="text-xs sm:text-sm text-red-200">
            Ask our Academy Support Desk anything or contact Founder Muneeb Ur Rehman directly on WhatsApp (03447956085).
          </p>
        </div>

        {/* Embedded Support Desk */}
        <AIChatAssistant embedded />

        {/* Direct WhatsApp Callout */}
        <div className="bg-gradient-to-r from-emerald-950 via-red-950 to-emerald-950 border-2 border-emerald-500/60 rounded-3xl p-6 text-center space-y-3 shadow-xl">
          <h3 className="font-serif font-bold text-lg text-emerald-300">Need Urgent Support?</h3>
          <p className="text-xs text-red-100">
            Direct WhatsApp Assistance available 24/7 for class scheduling, EasyPaisa fee verifications, and technical support.
          </p>
          <a
            href={`https://wa.me/92${siteSettings.whatsappNumber.replace(/^0/, '')}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-6 py-3 rounded-xl shadow"
          >
            <MessageSquare className="w-4 h-4" />
            <span>WhatsApp {siteSettings.whatsappNumber}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
