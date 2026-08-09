import React, { useState } from 'react';
import { Sparkles, Copy, Check, RefreshCw, Megaphone, Share2, Send } from 'lucide-react';
import { useAcademy } from '../context/AcademyContext';

export const AIMarketingAssistant: React.FC = () => {
  const { siteSettings } = useAcademy();
  const [brand, setBrand] = useState<'Quran Academy' | 'ZT Traders' | 'Marriage Bureau'>('Quran Academy');
  const [platform, setPlatform] = useState<'WhatsApp Status' | 'Facebook/Insta Post' | 'Ad Headline' | 'Email Newsletter'>('WhatsApp Status');
  const [language, setLanguage] = useState<'Urdu' | 'English' | 'Bilingual'>('Bilingual');
  const [generatedContent, setGeneratedContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setCopied(false);

    try {
      const promptText = `Generate a high-converting, respectful, and engaging ${platform} marketing copy in ${language} for "${brand}" from Shaheen Al Zaitoon Ecosystem in Rawalpindi.
Include WhatsApp contact: ${siteSettings.whatsappNumber}, EasyPaisa fee/payment info where applicable, and a strong Islamic call to action. Return formatted text ready to copy.`;

      const res = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: promptText, language: language === 'Urdu' ? 'ur' : 'en' }),
      });

      const data = await res.json();
      if (data.response) {
        setGeneratedContent(data.response);
      } else {
        setGeneratedContent(getFallbackContent(brand, platform, language));
      }
    } catch {
      setGeneratedContent(getFallbackContent(brand, platform, language));
    } finally {
      setLoading(false);
    }
  };

  const getFallbackContent = (b: string, p: string, l: string) => {
    if (b === 'Quran Academy') {
      return `✨ *Shaheen Al Zaitoon Online Quran Academy* ✨
📖 Learn Nazra Quran, Hifz & Tajweed rules 1-on-1 with certified Qaris from Rawalpindi!
✅ 3-Day Free Trial Classes
✅ Flexible Timings for UK, USA, Gulf & Pakistan
✅ EasyPaisa Fee Payment Available: ${siteSettings.easyPaisaAccountNumber}

📲 Register on WhatsApp today: ${siteSettings.whatsappNumber}
(Dedicated as Sadaqah Jariyah for Zaitoon Bibi)`;
    } else if (b === 'ZT Traders') {
      return `🍇 *ZT (Zaitoon Traders) Pure Sidr Honey & Ajwa Dates* 🍯
100% Guaranteed Pure Karak Sidr Honey & VIP Madinah Ajwa Dates.
🚚 Cash on Delivery & EasyPaisa Payment across Pakistan!

📲 Order now on WhatsApp: ${siteSettings.whatsappNumber}`;
    } else {
      return `💍 *Shaheen Matrimonial & Nikah Bureau* 💍
Respectful Islamic Rishta matchmaking service under family supervision. Verified profiles of practicing Muslim brothers and sisters worldwide.

📲 Inquiry on WhatsApp: ${siteSettings.whatsappNumber}`;
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gradient-to-r from-red-950 via-red-900 to-red-950 border-2 border-amber-500/50 rounded-2xl p-4 sm:p-6 shadow-2xl text-white space-y-4">
      <div className="flex items-center justify-between border-b border-amber-500/30 pb-3 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-red-950 flex items-center justify-center font-bold shadow-md">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-serif font-bold text-amber-200">
              AI Growth & Marketing Content Generator
            </h3>
            <p className="text-xs text-amber-300/80">
              Generate viral social posts, ad headlines & WhatsApp status templates for your ecosystem
            </p>
          </div>
        </div>
        <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2.5 py-1 rounded-full border border-amber-400/30 font-bold flex items-center gap-1">
          <Megaphone className="w-3 h-3 text-amber-300" /> Powered by Gemini
        </span>
      </div>

      <form onSubmit={handleGenerate} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label className="block text-xs font-bold text-amber-200 mb-1">Target Brand:</label>
          <select
            value={brand}
            onChange={(e) => setBrand(e.target.value as any)}
            className="w-full bg-red-900 text-amber-100 p-2 rounded-xl text-xs border border-amber-500/40 focus:outline-none"
          >
            <option value="Quran Academy">Shaheen Quran Academy</option>
            <option value="ZT Traders">ZT (Zaitoon Traders)</option>
            <option value="Marriage Bureau">Shaheen Marriage Bureau</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-amber-200 mb-1">Format / Platform:</label>
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value as any)}
            className="w-full bg-red-900 text-amber-100 p-2 rounded-xl text-xs border border-amber-500/40 focus:outline-none"
          >
            <option value="WhatsApp Status">WhatsApp Status / Broadcast</option>
            <option value="Facebook/Insta Post">Facebook & Instagram Post</option>
            <option value="Ad Headline">Digital Ad Copy & Banner Text</option>
            <option value="Email Newsletter">Email Newsletter & Announcement</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-amber-200 mb-1">Language Style:</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as any)}
            className="w-full bg-red-900 text-amber-100 p-2 rounded-xl text-xs border border-amber-500/40 focus:outline-none"
          >
            <option value="Bilingual">Bilingual (English + Roman Urdu)</option>
            <option value="Urdu">Urdu (اردو)</option>
            <option value="English">English</option>
          </select>
        </div>

        <div className="sm:col-span-3">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-300 hover:to-amber-400 text-red-950 font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg transition-transform hover:scale-[1.01]"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>AI is crafting marketing copy...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Generate High-Converting Promotion Copy</span>
              </>
            )}
          </button>
        </div>
      </form>

      {generatedContent && (
        <div className="bg-red-950 p-4 rounded-xl border border-amber-500/40 space-y-3 relative">
          <div className="flex items-center justify-between text-xs font-bold text-amber-300 border-b border-amber-500/20 pb-2">
            <span>Generated Promo Copy:</span>
            <button
              type="button"
              onClick={handleCopy}
              className="bg-amber-500 text-red-950 hover:bg-amber-400 px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-950" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Copy Text'}</span>
            </button>
          </div>

          <pre className="text-xs text-amber-100 whitespace-pre-wrap font-sans leading-relaxed">
            {generatedContent}
          </pre>

          <div className="flex gap-2 pt-1 flex-wrap">
            <a
              href={`https://wa.me/?text=${encodeURIComponent(generatedContent)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-1.5 rounded-lg text-xs flex items-center gap-1"
            >
              <Share2 className="w-3 h-3" />
              <span>Share Directly to WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
