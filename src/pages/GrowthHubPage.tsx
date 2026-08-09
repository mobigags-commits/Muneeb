import React, { useState } from 'react';
import {
  TrendingUp,
  Share2,
  DollarSign,
  Users,
  Copy,
  Check,
  Megaphone,
  BarChart3,
  Globe,
  Award,
  Zap,
  Gift,
  ArrowRight,
  ShieldCheck,
  Send,
  Sparkles,
} from 'lucide-react';
import { useAcademy } from '../context/AcademyContext';
import { AIMarketingAssistant } from '../components/AIMarketingAssistant';
import { AdBanner } from '../components/AdBanner';

export const GrowthHubPage: React.FC = () => {
  const { siteSettings, referrals, addReferral, affiliatePartners, addAffiliatePartner, adCampaigns, setActivePage } =
    useAcademy();

  const [refName, setRefName] = useState('');
  const [refUser, setRefUser] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<'Quran Academy' | 'ZT Traders' | 'Marriage Bureau'>('Quran Academy');
  const [generatedCode, setGeneratedCode] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);

  // Affiliate Application state
  const [affName, setAffName] = useState('');
  const [affChannel, setAffChannel] = useState('');
  const [affTier, setAffTier] = useState<'Standard 10%' | 'Gold 15%' | 'Platinum 20%'>('Standard 10%');
  const [affSubmitted, setAffSubmitted] = useState(false);

  const handleGenerateRef = (e: React.FormEvent) => {
    e.preventDefault();
    if (!refName) return;
    const code = `SZA-REF-${Math.floor(1000 + Math.random() * 9000)}`;
    setGeneratedCode(code);

    if (refUser) {
      addReferral({
        id: `ref-${Date.now()}`,
        referrerName: refName,
        referralCode: code,
        referredUser: refUser,
        brand: selectedBrand,
        rewardStatus: 'Earned',
        rewardAmountPKR: selectedBrand === 'Quran Academy' ? 1500 : selectedBrand === 'ZT Traders' ? 800 : 2000,
        date: new Date().toISOString().split('T')[0],
      });
    }
  };

  const handleCopyLink = () => {
    const link = `${window.location.origin}/?ref=${generatedCode || 'SZA-GLOBAL'}`;
    navigator.clipboard.writeText(link);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleApplyAffiliate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!affName || !affChannel) return;
    addAffiliatePartner({
      id: `aff-${Date.now()}`,
      name: affName,
      websiteOrChannel: affChannel,
      commissionTier: affTier,
      totalEarnedPKR: 0,
      status: 'Active',
    });
    setAffSubmitted(true);
    setTimeout(() => setAffSubmitted(false), 4000);
    setAffName('');
    setAffChannel('');
  };

  return (
    <div className="min-h-screen bg-red-950 text-white py-10 px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 border border-amber-400/30 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
          <TrendingUp className="w-4 h-4 text-amber-400" />
          <span>Global Ecosystem Growth & Monetization Platform</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-extrabold text-amber-100">
          Shaheen Growth, Advertising & Affiliate Hub
        </h1>
        <p className="text-sm sm:text-base text-red-200 max-w-3xl mx-auto">
          Monetize your reach, invite students and customers, promote ZT Traders products, share Marriage Bureau proposals, and earn generous commissions through our global referral ecosystem.
        </p>
      </div>

      <div className="max-w-7xl mx-auto space-y-10">
        {/* AI Ad Manager Quick Banner */}
        <div className="bg-gradient-to-r from-red-900 via-amber-950 to-red-950 border-2 border-amber-500 p-6 sm:p-8 rounded-3xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 border border-amber-400/40 px-3 py-1 rounded-full text-xs font-bold uppercase">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Multi-Platform Social & Web Advertising System</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-amber-100">
              Run AI Ad Campaigns Across Facebook, Instagram, WhatsApp & Website
            </h2>
            <p className="text-xs sm:text-sm text-red-200 max-w-2xl">
              Auto-generate high-converting copy, headlines, audience targeting, and multi-channel scheduling with Gemini 3.6 Flash. Includes free group sharing & paid campaign management.
            </p>
          </div>

          <button
            onClick={() => setActivePage('ad-manager')}
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-4 rounded-2xl shadow-xl transition-all text-sm shrink-0 flex items-center gap-2 transform hover:-translate-y-0.5"
          >
            <Megaphone className="w-5 h-5" />
            <span>Open AI Ad Studio Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gradient-to-r from-red-900 via-amber-950 to-red-900 border-2 border-amber-500/40 p-5 rounded-2xl shadow-xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500 text-red-950 flex items-center justify-center font-bold shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs text-amber-300 font-medium">Total Referral Growth</div>
              <div className="text-2xl font-serif font-extrabold text-white">
                {referrals.length * 14 + 180}+ Active Users
              </div>
              <div className="text-[10px] text-emerald-400">● 100% Organic Expansion</div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-red-900 via-amber-950 to-red-900 border-2 border-amber-500/40 p-5 rounded-2xl shadow-xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500 text-red-950 flex items-center justify-center font-bold shrink-0">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs text-amber-300 font-medium">Affiliate Payouts</div>
              <div className="text-2xl font-serif font-extrabold text-emerald-300">
                PKR {affiliatePartners.reduce((acc, p) => acc + p.totalEarnedPKR, 0).toLocaleString()}
              </div>
              <div className="text-[10px] text-amber-200">Via EasyPaisa & Direct Bank</div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-red-900 via-amber-950 to-red-900 border-2 border-amber-500/40 p-5 rounded-2xl shadow-xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-rose-500 text-white flex items-center justify-center font-bold shrink-0">
              <Megaphone className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs text-amber-300 font-medium">Ad Banner Impressions</div>
              <div className="text-2xl font-serif font-extrabold text-amber-200">
                {adCampaigns.reduce((acc, a) => acc + a.impressions, 0).toLocaleString()}
              </div>
              <div className="text-[10px] text-amber-300">3 Active Brand Campaigns</div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-red-900 via-amber-950 to-red-900 border-2 border-amber-500/40 p-5 rounded-2xl shadow-xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-sky-500 text-white flex items-center justify-center font-bold shrink-0">
              <BarChart3 className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs text-amber-300 font-medium">Ecosystem Conversion Rate</div>
              <div className="text-2xl font-serif font-extrabold text-sky-200">8.4%</div>
              <div className="text-[10px] text-emerald-400">Above Global Industry Avg</div>
            </div>
          </div>
        </div>

        {/* Dynamic Ad Placement Banner */}
        <AdBanner placement="In-feed Featured" />

        {/* Section 1: Unique Referral Link & Rewards System */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="bg-gradient-to-br from-red-900 via-amber-950 to-red-900 border-2 border-amber-500/50 p-6 rounded-2xl shadow-2xl space-y-5">
            <div className="flex items-center gap-3 border-b border-amber-500/30 pb-3">
              <div className="p-2.5 rounded-xl bg-amber-500 text-red-950 font-bold">
                <Gift className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold text-amber-200">
                  Instant Referral Link & Reward Generator
                </h3>
                <p className="text-xs text-red-200">
                  Earn up to PKR 2,000 or 5 Free Trial Quran Days for every student or customer you invite!
                </p>
              </div>
            </div>

            <form onSubmit={handleGenerateRef} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-amber-200 mb-1">Your Full Name:</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Muneeb Ur Rehman"
                  value={refName}
                  onChange={(e) => setRefName(e.target.value)}
                  className="w-full bg-red-950 text-white placeholder-red-300/60 p-2.5 rounded-xl text-xs border border-amber-500/40 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-amber-200 mb-1">Target Platform To Promote:</label>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value as any)}
                  className="w-full bg-red-950 text-amber-100 p-2.5 rounded-xl text-xs border border-amber-500/40 focus:outline-none"
                >
                  <option value="Quran Academy">Shaheen Quran Academy (1-on-1 Classes)</option>
                  <option value="ZT Traders">ZT (Zaitoon Traders - Sidr Honey & Dates)</option>
                  <option value="Marriage Bureau">Shaheen Matrimonial Bureau (Rishta Service)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-amber-200 mb-1">
                  Optional: Friend's Name You Are Inviting
                </label>
                <input
                  type="text"
                  placeholder="e.g. Usman Ghani (UK)"
                  value={refUser}
                  onChange={(e) => setRefUser(e.target.value)}
                  className="w-full bg-red-950 text-white placeholder-red-300/60 p-2.5 rounded-xl text-xs border border-amber-500/40 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 text-red-950 font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-xl hover:from-amber-300 hover:to-amber-400 transition-all"
              >
                <Zap className="w-4 h-4" />
                <span>Generate Tracking Code & Link</span>
              </button>
            </form>

            {generatedCode && (
              <div className="bg-red-950 p-4 rounded-xl border border-amber-500/50 space-y-3 animate-fade-in">
                <div className="text-xs text-amber-300 font-bold">Your Tracking Code: <span className="font-mono text-emerald-400 text-sm">{generatedCode}</span></div>
                <div className="flex items-center gap-2 bg-red-900/60 p-2 rounded-lg border border-amber-500/30">
                  <span className="text-xs text-amber-100 truncate flex-1 font-mono">
                    {window.location.origin}/?ref={generatedCode}
                  </span>
                  <button
                    onClick={handleCopyLink}
                    className="bg-amber-500 hover:bg-amber-400 text-red-950 px-3 py-1 rounded-lg text-xs font-bold shrink-0 flex items-center gap-1"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-950" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode ? 'Copied!' : 'Copy Link'}</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Social Media Sharing Toolkit */}
          <div className="bg-gradient-to-br from-red-900 via-amber-950 to-red-900 border-2 border-amber-500/50 p-6 rounded-2xl shadow-2xl space-y-5">
            <div className="flex items-center gap-3 border-b border-amber-500/30 pb-3">
              <div className="p-2.5 rounded-xl bg-emerald-500 text-red-950 font-bold">
                <Share2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold text-amber-200">
                  One-Click Global Social Sharing Toolkit
                </h3>
                <p className="text-xs text-red-200">
                  Share verified messages to Facebook, Instagram, WhatsApp, X, Telegram, and TikTok.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <a
                href={`https://wa.me/?text=${encodeURIComponent(
                  `Assalamu Alaikum! Join Shaheen Al Zaitoon Online Quran Academy for 1-on-1 Quran, Hifz & Tajweed classes. Contact Founder Muneeb Ur Rehman on WhatsApp: ${siteSettings.whatsappNumber} or visit: ${window.location.origin}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold p-3 rounded-xl text-xs flex items-center gap-2 justify-center shadow-md transition-all"
              >
                <Send className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>

              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.origin)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold p-3 rounded-xl text-xs flex items-center gap-2 justify-center shadow-md transition-all"
              >
                <Globe className="w-4 h-4" />
                <span>Facebook</span>
              </a>

              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent('Learn Quran online with Shaheen Al Zaitoon Academy Rawalpindi!')}&url=${encodeURIComponent(window.location.origin)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-sky-500 hover:bg-sky-400 text-white font-bold p-3 rounded-xl text-xs flex items-center gap-2 justify-center shadow-md transition-all"
              >
                <Share2 className="w-4 h-4" />
                <span>X / Twitter</span>
              </a>

              <a
                href={`https://t.me/share/url?url=${encodeURIComponent(window.location.origin)}&text=${encodeURIComponent('Shaheen Quran Academy & ZT Traders Global Platform')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold p-3 rounded-xl text-xs flex items-center gap-2 justify-center shadow-md transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Telegram</span>
              </a>

              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.origin)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-800 hover:bg-blue-700 text-white font-bold p-3 rounded-xl text-xs flex items-center gap-2 justify-center shadow-md transition-all"
              >
                <Globe className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>

              <button
                onClick={handleCopyLink}
                className="bg-amber-500 hover:bg-amber-400 text-red-950 font-bold p-3 rounded-xl text-xs flex items-center gap-2 justify-center shadow-md transition-all"
              >
                <Copy className="w-4 h-4" />
                <span>Copy Page Link</span>
              </button>
            </div>

            <div className="bg-red-950 p-3.5 rounded-xl border border-amber-500/20 text-xs text-amber-200/90 space-y-1">
              <div className="font-bold text-amber-300 flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                EasyPaisa & Bank Referral Payouts Guaranteed
              </div>
              <p className="text-[11px] text-red-200">
                All referral earnings are credited instantly and paid directly via EasyPaisa ({siteSettings.easyPaisaAccountNumber}) or Bank Transfer every Friday!
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: AI Marketing Content Generator */}
        <AIMarketingAssistant />

        {/* Section 3: Affiliate Partner Network Registration */}
        <div className="bg-gradient-to-br from-red-900 via-amber-950 to-red-900 border-2 border-amber-500/50 p-6 rounded-2xl shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-amber-500/30 pb-3 flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500 text-red-950 font-bold">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold text-amber-200">
                  Join The Shaheen Affiliate & Partner Network
                </h3>
                <p className="text-xs text-red-200">
                  Ideal for Islamic YouTube channels, Facebook pages, bloggers, scholars & influencers.
                </p>
              </div>
            </div>
            <span className="bg-emerald-500/20 text-emerald-300 text-xs px-3 py-1 rounded-full border border-emerald-400/40 font-bold">
              3 Tier Commission System (10% - 20%)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <form onSubmit={handleApplyAffiliate} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-amber-200 mb-1">Partner / Channel Name:</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Islamic Knowledge Official YouTube"
                  value={affName}
                  onChange={(e) => setAffName(e.target.value)}
                  className="w-full bg-red-950 text-white placeholder-red-300/60 p-2.5 rounded-xl text-xs border border-amber-500/40 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-amber-200 mb-1">Website or Channel Link:</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. youtube.com/c/yourchannel or facebook.com/yourpage"
                  value={affChannel}
                  onChange={(e) => setAffChannel(e.target.value)}
                  className="w-full bg-red-950 text-white placeholder-red-300/60 p-2.5 rounded-xl text-xs border border-amber-500/40 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-amber-200 mb-1">Select Commission Tier:</label>
                <select
                  value={affTier}
                  onChange={(e) => setAffTier(e.target.value as any)}
                  className="w-full bg-red-950 text-amber-100 p-2.5 rounded-xl text-xs border border-amber-500/40 focus:outline-none"
                >
                  <option value="Standard 10%">Standard Tier - 10% Commission on Course/ZT Sales</option>
                  <option value="Gold 15%">Gold Tier - 15% Commission (500+ Audience)</option>
                  <option value="Platinum 20%">Platinum Tier - 20% Commission (10,000+ Audience)</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-400 text-red-950 font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <span>Submit Partner Application</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {affSubmitted && (
                <div className="p-3 bg-emerald-500/20 border border-emerald-400/40 rounded-xl text-xs text-emerald-300 font-bold flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>JazakAllah Khair! Application submitted. Founder Muneeb Ur Rehman will review and approve within 24 hours.</span>
                </div>
              )}
            </form>

            <div className="space-y-3 bg-red-950 p-4 rounded-2xl border border-amber-500/30">
              <h4 className="text-sm font-serif font-bold text-amber-300 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                Active Affiliate Partners ({affiliatePartners.length})
              </h4>
              <div className="space-y-2 max-h-[220px] overflow-y-auto no-scrollbar">
                {affiliatePartners.map((aff) => (
                  <div key={aff.id} className="bg-red-900/60 p-3 rounded-xl border border-amber-500/20 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-amber-100">{aff.name}</div>
                      <div className="text-[10px] text-red-200 truncate">{aff.websiteOrChannel}</div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full font-bold">
                        {aff.commissionTier}
                      </span>
                      <div className="text-xs font-bold text-emerald-400 mt-1">
                        PKR {aff.totalEarnedPKR.toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
