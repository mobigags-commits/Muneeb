import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Search } from 'lucide-react';

export const FAQPage: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [query, setQuery] = useState('');

  const faqs = [
    {
      q: 'How do 1-on-1 online Quran classes work?',
      a: 'Classes are conducted via Zoom or live virtual classroom using interactive screen sharing and high-definition audio. The teacher works individually with one student for personalized attention.',
    },
    {
      q: 'How do I pay the monthly fee via EasyPaisa?',
      a: 'You can transfer course fees directly via the EasyPaisa app or agent to account number 03447956085 (Account Title: Muneeb Ur Rehman). After sending, submit your transaction ID on our Fee & Payment portal for instant digital receipt.',
    },
    {
      q: 'Are female teachers available for girls and ladies?',
      a: 'Yes! We have certified female Qarias and Alimahs available for 100% private 1-on-1 classes for sisters, daughters, and young girls.',
    },
    {
      q: 'What is the duration of the 3-day free trial?',
      a: 'We offer 3 consecutive trial days with zero financial commitment so parents and students can evaluate the Qari’s teaching methodology and class quality.',
    },
    {
      q: 'Where is the main head office of Shaheen Al Zaitoon Academy located?',
      a: 'Our main headquarters is located in Rawalpindi, Pakistan, managed by Founder Muneeb Ur Rehman (Contact/WhatsApp: 03447956085), with suboffices in London (UK), Dubai (UAE), Toronto (Canada), and Dallas (USA).',
    },
  ];

  const filteredFaqs = faqs.filter(
    (f) => f.q.toLowerCase().includes(query.toLowerCase()) || f.a.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="bg-red-950 text-white min-h-screen py-10 px-4 sm:px-6 lg:px-8 space-y-10">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-400/30">
            <HelpCircle className="w-4 h-4" />
            <span>Got Questions?</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-extrabold text-amber-100">
            Frequently Asked Questions
          </h1>
          <p className="text-xs sm:text-sm text-red-200">
            Everything you need to know about class timings, EasyPaisa fee payment, trial classes, and faculty qualifications.
          </p>
        </div>

        <div className="relative max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search FAQ questions..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-red-900 text-amber-100 placeholder-red-300/60 pl-10 pr-4 py-2.5 rounded-xl text-xs border border-amber-500/40 focus:outline-none"
          />
          <Search className="w-4 h-4 text-amber-400 absolute left-3 top-3" />
        </div>

        <div className="space-y-3">
          {filteredFaqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-red-900/60 border border-amber-500/30 rounded-2xl overflow-hidden shadow-lg"
            >
              <button
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full p-4 text-left flex items-center justify-between gap-4 font-serif font-bold text-sm text-amber-200 hover:text-white transition-colors"
              >
                <span>{faq.q}</span>
                {openIdx === idx ? <ChevronUp className="w-5 h-5 text-amber-400 shrink-0" /> : <ChevronDown className="w-5 h-5 text-amber-400 shrink-0" />}
              </button>
              {openIdx === idx && (
                <div className="px-4 pb-4 text-xs text-red-100 leading-relaxed border-t border-red-800/80 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
