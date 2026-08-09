import React, { useState } from 'react';
import {
  Megaphone,
  Sparkles,
  Share2,
  DollarSign,
  TrendingUp,
  Layers,
  Plus,
  Play,
  Pause,
  Trash2,
  Eye,
  MousePointer,
  Target,
  Calendar,
  Zap,
  CheckCircle2,
  Globe,
  Facebook,
  Instagram,
  MessageCircle,
  Copy,
  ExternalLink,
  Award,
  ShieldCheck,
  BarChart3,
  RefreshCw,
  Clock,
  ArrowUpRight,
  Check,
  Building2,
  Users,
  Smartphone,
  Send,
  Sliders,
} from 'lucide-react';
import { useAcademy } from '../context/AcademyContext';
import { AdCampaign, SocialAccount } from '../types';

export const AdManagerPage: React.FC = () => {
  const {
    adCampaigns,
    addAdCampaign,
    toggleAdStatus,
    deleteAdCampaign,
    recordAdClick,
    recordAdImpression,
    recordAdLead,
    socialAccounts,
    toggleSocialConnection,
    toggleSocialAutoPost,
    addSocialAccount,
    adPricingPlans,
    siteSettings,
    setActivePage,
  } = useAcademy();

  const [activeTab, setActiveTab] = useState<'dashboard' | 'create' | 'socials' | 'monetization' | 'analytics'>('dashboard');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Paused' | 'Scheduled'>('All');

  // AI Generator Form State
  const [adTitle, setAdTitle] = useState('');
  const [targetBrand, setTargetBrand] = useState<'Quran Academy' | 'ZT Traders' | 'Marriage Bureau' | 'Sponsor' | 'Custom User Business'>('Quran Academy');
  const [placement, setPlacement] = useState<AdCampaign['placement']>('Multi-Channel AI');
  const [campaignType, setCampaignType] = useState<'Free Social Post' | 'Paid Promotion' | 'Featured Listing'>('Paid Promotion');
  const [budgetPKR, setBudgetPKR] = useState<number>(2500);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['Facebook Page', 'Facebook Group', 'Instagram Feed', 'WhatsApp Broadcast', 'Website']);
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1585036156171-384164a8c675?auto=format&fit=crop&w=1200&q=80');
  const [linkUrl, setLinkUrl] = useState('admissions');

  // Generated Content State
  const [headline, setHeadline] = useState('');
  const [description, setDescription] = useState('');
  const [ctaText, setCtaText] = useState('');
  const [targetAudience, setTargetAudience] = useState<{
    locations: string[];
    ageRange: string;
    interests: string[];
    demographics: string;
  }>({
    locations: ['Pakistan', 'UK', 'UAE', 'USA'],
    ageRange: '20-50',
    interests: ['Islamic Studies', 'Quran Education', 'Halal Lifestyle'],
    demographics: 'Parents, Students & Working Professionals',
  });
  const [aiOptimizations, setAiOptimizations] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiTone, setAiTone] = useState('Persuasive & Respectful');
  const [aiObjective, setAiObjective] = useState('Lead Generation & Enrollments');

  // Selected Campaign for Modal View/Edit
  const [selectedCampaign, setSelectedCampaign] = useState<AdCampaign | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // New Social Account Modal State
  const [showAddSocialModal, setShowAddSocialModal] = useState(false);
  const [newSocialPlatform, setNewSocialPlatform] = useState<SocialAccount['platform']>('Facebook Group');
  const [newSocialName, setNewSocialName] = useState('');
  const [newSocialHandle, setNewSocialHandle] = useState('');
  const [newSocialMembers, setNewSocialMembers] = useState('15000');

  // Calculate High Level Metrics
  const totalCampaigns = adCampaigns.length;
  const activeCampaigns = adCampaigns.filter((a) => a.status === 'Active').length;
  const totalImpressions = adCampaigns.reduce((acc, a) => acc + (a.impressions || 0), 0);
  const totalClicks = adCampaigns.reduce((acc, a) => acc + (a.clicks || 0), 0);
  const totalLeads = adCampaigns.reduce((acc, a) => acc + (a.leads || 0), 0);
  const totalSpent = adCampaigns.reduce((acc, a) => acc + (a.pkrSpent || 0), 0);
  const totalRevenue = adCampaigns.reduce((acc, a) => acc + (a.pkrRevenue || 0), 0);
  const totalOwnerCommission = adCampaigns.reduce((acc, a) => acc + (a.ownerCommissionPKR || 0) + (a.adminFeePKR || 0), 0);

  const avgCTR = totalImpressions > 0 ? ((totalClicks / totalImpressions) * 100).toFixed(2) : '0.00';

  const filteredCampaigns = adCampaigns.filter((a) => {
    if (statusFilter === 'All') return true;
    return a.status === statusFilter;
  });

  const handleGenerateAIAd = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch('/api/gemini/ad-generator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessOrProduct: adTitle || targetBrand,
          targetAudience: targetAudience.demographics,
          objective: aiObjective,
          platform: selectedPlatforms.join(', '),
          tone: aiTone,
        }),
      });

      const data = await res.json();
      if (data.headline) setHeadline(data.headline);
      if (data.description) setDescription(data.description);
      if (data.ctaText) setCtaText(data.ctaText);
      if (data.targetAudience) setTargetAudience(data.targetAudience);
      if (data.aiOptimizations) setAiOptimizations(data.aiOptimizations);
    } catch (err) {
      console.error('Failed to generate ad:', err);
      // Fallback content if offline
      setHeadline(`🔥 Exclusive Offer: Join ${adTitle || targetBrand} Today!`);
      setDescription(`Transform your reach with Shaheen Al Zaitoon Ad Engine. Direct WhatsApp support, 100% verified leads across Pakistan, UK, UAE & North America.`);
      setCtaText('Get Started Now');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCreateCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adTitle) return;

    const adminFee = campaignType === 'Free Social Post' ? 0 : 500;
    const ownerComm = campaignType === 'Free Social Post' ? 0 : Math.round(budgetPKR * 0.15);

    const newAd: AdCampaign = {
      id: `ad-${Date.now()}`,
      title: adTitle,
      targetBrand,
      placement,
      imageUrl: imageUrl || 'https://images.unsplash.com/photo-1585036156171-384164a8c675?auto=format&fit=crop&w=1200&q=80',
      linkUrl: linkUrl || 'admissions',
      impressions: Math.floor(Math.random() * 500) + 100,
      clicks: Math.floor(Math.random() * 30) + 5,
      leads: Math.floor(Math.random() * 8) + 1,
      conversions: 0,
      status: 'Active',
      pkrSpent: campaignType === 'Free Social Post' ? 0 : budgetPKR,
      pkrRevenue: campaignType === 'Free Social Post' ? 0 : budgetPKR * 3,
      campaignType,
      budgetPKR: campaignType === 'Free Social Post' ? 0 : budgetPKR,
      adminFeePKR: adminFee,
      ownerCommissionPKR: ownerComm,
      paymentStatus: campaignType === 'Free Social Post' ? 'Free' : 'Paid via EasyPaisa',
      platforms: selectedPlatforms,
      headline: headline || `Promote ${adTitle}`,
      description: description || `Official advertisement campaign for ${targetBrand}.`,
      ctaText: ctaText || 'Learn More',
      targetAudience,
      scheduleDate: new Date().toISOString().split('T')[0],
      aiOptimizations: aiOptimizations.length > 0 ? aiOptimizations : ['Post during peak weekend hours for 25% higher CTR'],
      createdAt: new Date().toISOString().split('T')[0],
    };

    addAdCampaign(newAd);
    setActiveTab('dashboard');
    alert(`🎉 Campaign "${adTitle}" published successfully across selected platforms!`);
  };

  const togglePlatform = (p: string) => {
    if (selectedPlatforms.includes(p)) {
      if (selectedPlatforms.length > 1) {
        setSelectedPlatforms(selectedPlatforms.filter((x) => x !== p));
      }
    } else {
      setSelectedPlatforms([...selectedPlatforms, p]);
    }
  };

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleAddSocialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSocialName) return;
    const newAccount: SocialAccount = {
      id: `soc-user-${Date.now()}`,
      platform: newSocialPlatform,
      name: newSocialName,
      handleOrId: newSocialHandle || `@${newSocialName.toLowerCase().replace(/\s+/g, '')}`,
      followersOrMembers: parseInt(newSocialMembers) || 5000,
      isConnected: true,
      autoPostEnabled: true,
      avatarUrl: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=200&q=80',
      category: 'User Connected Social Hub',
    };
    addSocialAccount(newAccount);
    setShowAddSocialModal(false);
    setNewSocialName('');
    setNewSocialHandle('');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans pb-16">
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-red-950 via-slate-900 to-amber-950 border-b border-amber-500/30">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-3">
                <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
                <span>AI-Powered Multi-Platform Ad Engine</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-amber-100 tracking-tight">
                Social & Multi-Channel Advertising Hub
              </h1>
              <p className="mt-2 text-sm text-slate-300 max-w-2xl">
                Create, automate, and publish high-converting ad campaigns across website banners, Facebook Groups & Pages, Instagram, WhatsApp Broadcasts, and Google Ads with Gemini AI optimization.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setActiveTab('create')}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold px-5 py-3 rounded-xl shadow-lg shadow-amber-500/20 transition-all text-sm transform hover:-translate-y-0.5"
              >
                <Plus className="w-5 h-5" />
                <span>Create New Ad Campaign</span>
              </button>
              <button
                onClick={() => setActiveTab('socials')}
                className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-4 py-3 rounded-xl transition-all text-sm font-semibold"
              >
                <Share2 className="w-4 h-4 text-emerald-400" />
                <span>Manage Social Accounts</span>
              </button>
            </div>
          </div>

          {/* Key KPI Metrics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mt-8">
            <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Total Campaigns</span>
                <Megaphone className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-2xl font-bold font-mono text-white mt-1">{totalCampaigns}</div>
              <div className="text-[10px] text-emerald-400 mt-1 flex items-center gap-1">
                <span className="font-semibold">{activeCampaigns} Active Now</span>
              </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Impressions</span>
                <Eye className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="text-2xl font-bold font-mono text-cyan-300 mt-1">{totalImpressions.toLocaleString()}</div>
              <div className="text-[10px] text-slate-400 mt-1">Global Views</div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Total Clicks</span>
                <MousePointer className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl font-bold font-mono text-emerald-300 mt-1">{totalClicks.toLocaleString()}</div>
              <div className="text-[10px] text-emerald-400 mt-1">CTR: {avgCTR}%</div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Leads Generated</span>
                <Users className="w-4 h-4 text-purple-400" />
              </div>
              <div className="text-2xl font-bold font-mono text-purple-300 mt-1">{totalLeads}</div>
              <div className="text-[10px] text-purple-400 mt-1">Inquiries & Form Submissions</div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Total Ad Budget Spent</span>
                <DollarSign className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-2xl font-bold font-mono text-amber-300 mt-1">PKR {totalSpent.toLocaleString()}</div>
              <div className="text-[10px] text-slate-400 mt-1">Across Platforms</div>
            </div>

            <div className="bg-slate-900/80 border border-amber-500/30 p-4 rounded-2xl bg-amber-950/20">
              <div className="flex items-center justify-between text-amber-300 text-xs">
                <span>Owner Revenue</span>
                <Award className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-2xl font-bold font-mono text-amber-200 mt-1">PKR {totalOwnerCommission.toLocaleString()}</div>
              <div className="text-[10px] text-amber-400 mt-1">Fees & Commissions</div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 border-b border-slate-800 mt-8 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-4 py-3 text-sm font-semibold border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
                activeTab === 'dashboard'
                  ? 'border-amber-400 text-amber-300 bg-amber-500/10'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Campaign Dashboard</span>
            </button>

            <button
              onClick={() => setActiveTab('create')}
              className={`px-4 py-3 text-sm font-semibold border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
                activeTab === 'create'
                  ? 'border-amber-400 text-amber-300 bg-amber-500/10'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>AI Ad Generator & Studio</span>
            </button>

            <button
              onClick={() => setActiveTab('socials')}
              className={`px-4 py-3 text-sm font-semibold border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
                activeTab === 'socials'
                  ? 'border-amber-400 text-amber-300 bg-amber-500/10'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Share2 className="w-4 h-4" />
              <span>Social Accounts & Groups ({socialAccounts.filter((s) => s.isConnected).length})</span>
            </button>

            <button
              onClick={() => setActiveTab('monetization')}
              className={`px-4 py-3 text-sm font-semibold border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
                activeTab === 'monetization'
                  ? 'border-amber-400 text-amber-300 bg-amber-500/10'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <DollarSign className="w-4 h-4 text-emerald-400" />
              <span>Owner Monetization & Plans</span>
            </button>

            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-4 py-3 text-sm font-semibold border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
                activeTab === 'analytics'
                  ? 'border-amber-400 text-amber-300 bg-amber-500/10'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>AI Analytics & ROI</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Tab Contents */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* TAB 1: CAMPAIGN DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-4 rounded-2xl border border-slate-800">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white">Ad Campaigns</h2>
                <span className="bg-amber-500/20 text-amber-300 text-xs px-2.5 py-0.5 rounded-full font-mono font-bold">
                  {filteredCampaigns.length}
                </span>
              </div>

              <div className="flex items-center gap-2 overflow-x-auto">
                <span className="text-xs text-slate-400">Filter Status:</span>
                {(['All', 'Active', 'Paused', 'Scheduled'] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      statusFilter === st
                        ? 'bg-amber-500 text-slate-950 font-bold'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Campaign Cards List */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {filteredCampaigns.map((ad) => {
                const ctr = ad.impressions > 0 ? ((ad.clicks / ad.impressions) * 100).toFixed(1) : '0';
                return (
                  <div
                    key={ad.id}
                    className="bg-slate-900 rounded-2xl border border-slate-800 hover:border-amber-500/40 transition-all overflow-hidden flex flex-col justify-between group shadow-lg"
                  >
                    <div>
                      {/* Image header with badges */}
                      <div className="relative h-44 overflow-hidden bg-slate-950">
                        <img
                          src={ad.imageUrl}
                          alt={ad.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/40" />
                        
                        <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
                          <span className="bg-slate-900/90 backdrop-blur-md text-amber-300 text-[10px] font-bold px-2.5 py-1 rounded-full border border-amber-500/30">
                            {ad.targetBrand}
                          </span>
                          <span
                            className={`text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-md ${
                              ad.status === 'Active'
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                : ad.status === 'Scheduled'
                                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                                : 'bg-slate-700/80 text-slate-300 border border-slate-600'
                            }`}
                          >
                            ● {ad.status}
                          </span>
                        </div>

                        <div className="absolute top-3 right-3">
                          <span className="bg-slate-950/80 text-xs font-mono font-semibold text-slate-200 px-2 py-1 rounded border border-slate-800">
                            {ad.campaignType || 'Paid Promotion'}
                          </span>
                        </div>

                        <div className="absolute bottom-3 left-3 right-3 text-xs font-semibold text-white truncate">
                          {ad.title}
                        </div>
                      </div>

                      {/* Campaign details */}
                      <div className="p-5 space-y-4">
                        <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 space-y-1">
                          <div className="text-xs font-bold text-amber-200 line-clamp-1">
                            {ad.headline || ad.title}
                          </div>
                          <div className="text-xs text-slate-300 line-clamp-2">
                            {ad.description || 'Custom promotion active across Shaheen Quran networks.'}
                          </div>
                        </div>

                        {/* Platforms badges */}
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-[10px] text-slate-400 font-semibold mr-1">Target Channels:</span>
                          {(ad.platforms || ['Website', 'Facebook Page', 'Instagram Feed']).map((p, idx) => (
                            <span
                              key={idx}
                              className="bg-slate-800 text-slate-200 text-[10px] px-2 py-0.5 rounded border border-slate-700 flex items-center gap-1"
                            >
                              {p.includes('Facebook') && <Facebook className="w-3 h-3 text-blue-400" />}
                              {p.includes('Instagram') && <Instagram className="w-3 h-3 text-pink-400" />}
                              {p.includes('WhatsApp') && <MessageCircle className="w-3 h-3 text-emerald-400" />}
                              {p.includes('Website') && <Globe className="w-3 h-3 text-amber-400" />}
                              <span>{p}</span>
                            </span>
                          ))}
                        </div>

                        {/* Stats grid */}
                        <div className="grid grid-cols-3 gap-2 bg-slate-950/80 p-3 rounded-xl border border-slate-800 text-center font-mono">
                          <div>
                            <div className="text-[10px] text-slate-400">Views</div>
                            <div className="text-sm font-bold text-cyan-300">{ad.impressions.toLocaleString()}</div>
                          </div>
                          <div>
                            <div className="text-[10px] text-slate-400">Clicks</div>
                            <div className="text-sm font-bold text-emerald-300">{ad.clicks}</div>
                          </div>
                          <div>
                            <div className="text-[10px] text-slate-400">CTR</div>
                            <div className="text-sm font-bold text-amber-300">{ctr}%</div>
                          </div>
                        </div>

                        {/* Budget & Owner fee info */}
                        <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-800/80">
                          <div className="text-slate-400">
                            Spent: <span className="text-white font-mono font-semibold">PKR {ad.pkrSpent.toLocaleString()}</span>
                          </div>
                          <div className="text-amber-400 font-semibold text-[11px]">
                            {ad.paymentStatus || 'Paid via EasyPaisa'}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="p-4 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleAdStatus(ad.id)}
                          className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                            ad.status === 'Active'
                              ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30 hover:bg-amber-500/20'
                              : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20'
                          }`}
                          title={ad.status === 'Active' ? 'Pause Campaign' : 'Activate Campaign'}
                        >
                          {ad.status === 'Active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                          <span className="text-[11px] font-bold">{ad.status === 'Active' ? 'Pause' : 'Activate'}</span>
                        </button>

                        <button
                          onClick={() => setSelectedCampaign(ad)}
                          className="p-2 rounded-xl bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors text-[11px] font-semibold flex items-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Preview</span>
                        </button>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => {
                            recordAdClick(ad.id);
                            recordAdLead(ad.id);
                            alert(`Simulated 1 click & 1 lead for campaign "${ad.title}"!`);
                          }}
                          className="px-2.5 py-1.5 bg-emerald-500/20 text-emerald-300 rounded-lg text-[10px] font-bold hover:bg-emerald-500/30 transition-all flex items-center gap-1"
                          title="Simulate Lead"
                        >
                          <Zap className="w-3 h-3" />
                          <span>+ Lead</span>
                        </button>

                        <button
                          onClick={() => {
                            if (confirm(`Are you sure you want to delete campaign "${ad.title}"?`)) {
                              deleteAdCampaign(ad.id);
                            }
                          }}
                          className="p-2 text-slate-500 hover:text-red-400 transition-colors"
                          title="Delete Campaign"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: AI AD GENERATOR & STUDIO */}
        {activeTab === 'create' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Form (7 cols) */}
            <div className="lg:col-span-7 bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6 shadow-xl">
              <div>
                <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
                  <Sparkles className="w-4 h-4 animate-spin" />
                  <span>Gemini 3.6 Flash Ad Studio</span>
                </div>
                <h2 className="text-2xl font-serif font-bold text-white">
                  Create AI Ad Campaign
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Fill in your product details or click "Generate with AI" to auto-write high converting ad headlines, captions, and audience targeting.
                </p>
              </div>

              <form onSubmit={handleCreateCampaign} className="space-y-5">
                {/* Product / Business Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Campaign / Product Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={adTitle}
                    onChange={(e) => setAdTitle(e.target.value)}
                    placeholder="e.g. Shaheen Quran 3-Day Free Trial Admission or ZT Pure Sidr Honey"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                {/* Target Brand & Type */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                      Target Brand Category
                    </label>
                    <select
                      value={targetBrand}
                      onChange={(e: any) => setTargetBrand(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
                    >
                      <option value="Quran Academy">Quran Academy</option>
                      <option value="ZT Traders">ZT Traders (Honey & Sunnah)</option>
                      <option value="Marriage Bureau">Shaheen Marriage Bureau</option>
                      <option value="Sponsor">Sponsor / Partner</option>
                      <option value="Custom User Business">Custom User Business</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                      Campaign Mode
                    </label>
                    <select
                      value={campaignType}
                      onChange={(e: any) => setCampaignType(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
                    >
                      <option value="Paid Promotion">Paid Promotion (Multi-Channel + Budget)</option>
                      <option value="Free Social Post">Free Social Post (0 PKR Community Sharing)</option>
                      <option value="Featured Listing">Featured Listing (Top Sticky Banner)</option>
                    </select>
                  </div>
                </div>

                {/* Multi-Channel Platform Selector */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Publishing Platforms (Select All That Apply)
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {[
                      { name: 'Website', icon: Globe, color: 'text-amber-400' },
                      { name: 'Facebook Page', icon: Facebook, color: 'text-blue-400' },
                      { name: 'Facebook Group', icon: Users, color: 'text-indigo-400' },
                      { name: 'Instagram Feed', icon: Instagram, color: 'text-pink-400' },
                      { name: 'WhatsApp Broadcast', icon: MessageCircle, color: 'text-emerald-400' },
                      { name: 'Google Ads', icon: SearchIcon, color: 'text-cyan-400' },
                    ].map((item) => {
                      const isSelected = selectedPlatforms.includes(item.name);
                      const IconComp = item.icon;
                      return (
                        <button
                          key={item.name}
                          type="button"
                          onClick={() => togglePlatform(item.name)}
                          className={`p-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-between ${
                            isSelected
                              ? 'bg-amber-500/20 border-amber-500 text-amber-200'
                              : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <IconComp className={`w-4 h-4 ${item.color}`} />
                            <span>{item.name}</span>
                          </div>
                          {isSelected && <Check className="w-3.5 h-3.5 text-amber-400" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* AI Prompting Controls */}
                <div className="bg-gradient-to-r from-red-950/60 to-slate-950 p-4 rounded-2xl border border-amber-500/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                      <Zap className="w-4 h-4 text-amber-400" />
                      AI Copy Generator & Audience Matcher
                    </span>
                    <button
                      type="button"
                      disabled={isGenerating}
                      onClick={handleGenerateAIAd}
                      className="px-4 py-2 bg-amber-500 text-slate-950 hover:bg-amber-400 text-xs font-bold rounded-xl transition-all shadow-md flex items-center gap-1.5"
                    >
                      {isGenerating ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                      <span>{isGenerating ? 'Generating Copy...' : 'Generate with Gemini'}</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] text-slate-400 uppercase mb-1">Tone of Voice</label>
                      <select
                        value={aiTone}
                        onChange={(e) => setAiTone(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200"
                      >
                        <option value="Persuasive & Respectful">Persuasive & Respectful</option>
                        <option value="Urgent & Promotional">Urgent & Promotional (Discount/Offer)</option>
                        <option value="Inspiring & Spiritual">Inspiring & Spiritual</option>
                        <option value="Direct Sales & Action">Direct Sales & Action</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-400 uppercase mb-1">Campaign Objective</label>
                      <select
                        value={aiObjective}
                        onChange={(e) => setAiObjective(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200"
                      >
                        <option value="Lead Generation & Enrollments">Lead Generation & Enrollments</option>
                        <option value="Product Sales & Orders">Product Sales & Orders</option>
                        <option value="WhatsApp Direct Messages">WhatsApp Direct Messages</option>
                        <option value="Brand Awareness & Followers">Brand Awareness & Followers</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Generated Headline & Description Fields */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                      Generated Headline *
                    </label>
                    <input
                      type="text"
                      required
                      value={headline}
                      onChange={(e) => setHeadline(e.target.value)}
                      placeholder="e.g. 📖 Master Quran Tajweed 1-on-1 from Home"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500 font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                      Ad Copy / Caption *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Write your main offer, benefits, call to action..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs text-slate-200 focus:outline-none focus:border-amber-500 leading-relaxed"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                        Call To Action (CTA Button)
                      </label>
                      <input
                        type="text"
                        value={ctaText}
                        onChange={(e) => setCtaText(e.target.value)}
                        placeholder="e.g. Book Free Trial Now"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                        Destination Page / Link
                      </label>
                      <input
                        type="text"
                        value={linkUrl}
                        onChange={(e) => setLinkUrl(e.target.value)}
                        placeholder="admissions / zaitoon-traders / marriage-bureau"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Image Banner URL */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Ad Image Banner URL
                  </label>
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/photo-..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                  <div className="flex items-center gap-2 mt-2 text-[11px] text-slate-400 overflow-x-auto">
                    <span>Quick presets:</span>
                    <button
                      type="button"
                      onClick={() => setImageUrl('https://images.unsplash.com/photo-1585036156171-384164a8c675?auto=format&fit=crop&w=1200&q=80')}
                      className="hover:text-amber-300 underline"
                    >
                      Quran Study
                    </button>
                    <span>•</span>
                    <button
                      type="button"
                      onClick={() => setImageUrl('https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=1200&q=80')}
                      className="hover:text-amber-300 underline"
                    >
                      Sidr Honey & Dates
                    </button>
                    <span>•</span>
                    <button
                      type="button"
                      onClick={() => setImageUrl('https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80')}
                      className="hover:text-amber-300 underline"
                    >
                      Islamic Nikah
                    </button>
                  </div>
                </div>

                {/* Budget & Payment Breakdown */}
                {campaignType !== 'Free Social Post' && (
                  <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-200">Ad Campaign Budget (PKR)</span>
                      <span className="text-xs font-mono font-bold text-emerald-400">
                        Total: PKR {(budgetPKR + 500).toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        min={1000}
                        max={50000}
                        step={500}
                        value={budgetPKR}
                        onChange={(e) => setBudgetPKR(Number(e.target.value))}
                        className="w-full accent-amber-500 bg-slate-800 rounded-lg cursor-pointer"
                      />
                      <span className="text-sm font-bold font-mono text-amber-300 min-w-[100px] text-right">
                        PKR {budgetPKR.toLocaleString()}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-3 text-center text-xs pt-2 border-t border-slate-800/80">
                      <div className="bg-slate-900 p-2.5 rounded-xl">
                        <div className="text-[10px] text-slate-400">Platform Ad Spend</div>
                        <div className="font-mono font-bold text-white mt-0.5">PKR {budgetPKR.toLocaleString()}</div>
                      </div>
                      <div className="bg-slate-900 p-2.5 rounded-xl">
                        <div className="text-[10px] text-slate-400">Owner Ad Fee</div>
                        <div className="font-mono font-bold text-amber-300 mt-0.5">PKR 500</div>
                      </div>
                      <div className="bg-slate-900 p-2.5 rounded-xl">
                        <div className="text-[10px] text-slate-400">Est. Impressions</div>
                        <div className="font-mono font-bold text-cyan-300 mt-0.5">
                          {(budgetPKR * 4).toLocaleString()} Views
                        </div>
                      </div>
                    </div>

                    <div className="text-[11px] text-slate-400 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>
                        Payment processed securely via EasyPaisa (03447956085) or Online Bank Transfer.
                      </span>
                    </div>
                  </div>
                )}

                {/* Submit Action */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold py-4 rounded-2xl shadow-xl shadow-amber-500/20 text-base transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  <span>Publish Ad Campaign Now</span>
                </button>
              </form>
            </div>

            {/* Right Preview Column (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                    <Eye className="w-4 h-4" />
                    Live Platform Ad Preview
                  </span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-semibold px-2 py-0.5 rounded">
                    Real-time Render
                  </span>
                </div>

                {/* Facebook Post Preview Card */}
                <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden text-slate-200">
                  <div className="p-4 flex items-center gap-3 border-b border-slate-800/60">
                    <img
                      src="https://images.unsplash.com/photo-1585036156171-384164a8c675?auto=format&fit=crop&w=100&q=80"
                      className="w-10 h-10 rounded-full object-cover border border-amber-500/30"
                      alt="Logo"
                    />
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-1">
                        <span>Shaheen Al Zaitoon Network</span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 fill-blue-400/20" />
                      </div>
                      <div className="text-[10px] text-slate-400 flex items-center gap-1">
                        <span>Sponsored</span>
                        <span>•</span>
                        <Globe className="w-3 h-3" />
                      </div>
                    </div>
                  </div>

                  {/* Ad Post Body */}
                  <div className="p-4 space-y-2 text-xs">
                    <p className="whitespace-pre-line leading-relaxed text-slate-300">
                      {description || 'Join our premier online Quran Academy & Sunnah Store. Verified classes & 100% organic products.'}
                    </p>
                  </div>

                  {/* Ad Image */}
                  <div className="h-48 overflow-hidden bg-slate-900 relative">
                    <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                    <div className="absolute top-2 right-2 bg-slate-950/80 text-[10px] font-bold text-amber-300 px-2 py-0.5 rounded">
                      ADVERTISEMENT
                    </div>
                  </div>

                  {/* Ad Link Bar */}
                  <div className="bg-slate-900/90 p-3 flex items-center justify-between border-t border-slate-800">
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase tracking-wide">
                        {siteSettings.academyName || 'SHAHEEN AL ZAITOON'}
                      </div>
                      <div className="text-xs font-bold text-white truncate max-w-[200px]">
                        {headline || '3-Day Free Trial Quran Classes'}
                      </div>
                    </div>

                    <button className="bg-amber-500 text-slate-950 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-amber-400 transition-colors">
                      {ctaText || 'Learn More'}
                    </button>
                  </div>
                </div>

                {/* AI Audience Targeting Recommendations Box */}
                <div className="bg-gradient-to-br from-slate-950 to-amber-950/30 p-4 rounded-2xl border border-amber-500/20 space-y-3">
                  <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                    <Target className="w-4 h-4 text-amber-400" />
                    <span>AI Recommended Audience Targeting</span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase">Target Locations:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {targetAudience.locations.map((loc, i) => (
                          <span key={i} className="bg-slate-800 text-amber-200 text-[10px] px-2 py-0.5 rounded">
                            📍 {loc}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 uppercase">Age & Demographics:</span>
                      <p className="text-slate-300 font-mono mt-0.5">
                        {targetAudience.ageRange} Yrs | {targetAudience.demographics}
                      </p>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 uppercase">Targeted Interests:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {targetAudience.interests.map((int, i) => (
                          <span key={i} className="bg-amber-500/10 text-amber-300 text-[10px] px-2 py-0.5 rounded border border-amber-500/20">
                            #{int}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: CONNECTED SOCIAL ACCOUNTS */}
        {activeTab === 'socials' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-6 rounded-3xl border border-slate-800">
              <div>
                <h2 className="text-2xl font-serif font-bold text-white">
                  Connected Social Pages, Groups & Channels
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Integrate your Facebook Pages, Facebook Groups, Instagram Business profile, and WhatsApp Channels for automated 1-click publishing.
                </p>
              </div>

              <button
                onClick={() => setShowAddSocialModal(true)}
                className="bg-amber-500 text-slate-950 hover:bg-amber-400 px-4 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Connect New Social Channel</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {socialAccounts.map((acc) => (
                <div
                  key={acc.id}
                  className="bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-4 hover:border-amber-500/40 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {acc.platform.includes('Facebook') && <Facebook className="w-5 h-5 text-blue-400" />}
                        {acc.platform.includes('Instagram') && <Instagram className="w-5 h-5 text-pink-400" />}
                        {acc.platform.includes('WhatsApp') && <MessageCircle className="w-5 h-5 text-emerald-400" />}
                        {acc.platform.includes('Google') && <Globe className="w-5 h-5 text-cyan-400" />}
                        <span className="text-xs font-bold text-amber-300">{acc.platform}</span>
                      </div>

                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          acc.isConnected ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {acc.isConnected ? '● Connected API' : 'Disconnected'}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                      <img
                        src={acc.avatarUrl || 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=150&q=80'}
                        className="w-12 h-12 rounded-2xl object-cover border border-slate-800"
                        alt={acc.name}
                      />
                      <div>
                        <div className="text-sm font-bold text-white line-clamp-1">{acc.name}</div>
                        <div className="text-xs text-slate-400 font-mono">{acc.handleOrId}</div>
                      </div>
                    </div>

                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 flex items-center justify-between text-xs">
                      <span className="text-slate-400">Audience Reach:</span>
                      <span className="font-mono font-bold text-emerald-300">
                        {acc.followersOrMembers.toLocaleString()} Members
                      </span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-slate-400">Auto-Post:</span>
                      <button
                        onClick={() => toggleSocialAutoPost(acc.id)}
                        className={`px-2.5 py-1 rounded text-[10px] font-bold transition-all ${
                          acc.autoPostEnabled
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {acc.autoPostEnabled ? 'ON' : 'OFF'}
                      </button>
                    </div>

                    <button
                      onClick={() => toggleSocialConnection(acc.id)}
                      className="text-amber-400 hover:text-amber-300 text-xs font-semibold"
                    >
                      {acc.isConnected ? 'Disconnect' : 'Connect'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: OWNER MONETIZATION & PRICING PLANS */}
        {activeTab === 'monetization' && (
          <div className="space-y-8">
            {/* Owner Earnings Banner */}
            <div className="bg-gradient-to-r from-red-950 via-slate-900 to-amber-950 p-6 sm:p-8 rounded-3xl border border-amber-500/30 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-bold uppercase mb-2">
                  <Award className="w-4 h-4" />
                  <span>Website Owner Monetization Model</span>
                </div>
                <h2 className="text-2xl font-serif font-bold text-white">
                  Earn Through Ad Fees, Commissions & Subscriptions
                </h2>
                <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
                  The website owner (Founder Muneeb Ur Rehman & HQ Admins) automatically monetizes advertising traffic via flat PKR 500 service fees per campaign, 15% campaign budgets, featured listing upgrades, and monthly pro ad subscriptions.
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-amber-500/30 min-w-[240px] text-right space-y-1">
                <div className="text-xs text-slate-400">Total Admin Earnings Collected</div>
                <div className="text-3xl font-bold font-mono text-amber-300">
                  PKR {totalOwnerCommission.toLocaleString()}
                </div>
                <div className="text-[10px] text-emerald-400 font-semibold">EasyPaisa Account: 03447956085</div>
              </div>
            </div>

            {/* Pricing Plans Grid */}
            <div>
              <h3 className="text-xl font-serif font-bold text-amber-200 mb-6 text-center">
                Advertising Subscription Plans for Users & Brands
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {adPricingPlans.map((plan) => (
                  <div
                    key={plan.id}
                    className={`rounded-3xl p-6 flex flex-col justify-between border transition-all ${
                      plan.isPopular
                        ? 'bg-gradient-to-b from-slate-900 to-amber-950/40 border-amber-500 shadow-xl shadow-amber-500/10'
                        : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h4 className="text-lg font-bold text-white">{plan.name}</h4>
                        {plan.isPopular && (
                          <span className="bg-amber-500 text-slate-950 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                            MOST POPULAR
                          </span>
                        )}
                      </div>

                      <div>
                        <span className="text-3xl font-bold font-mono text-amber-300">
                          PKR {plan.pricePKR.toLocaleString()}
                        </span>
                        <span className="text-xs text-slate-400"> / {plan.billingCycle}</span>
                      </div>

                      <ul className="space-y-3 text-xs text-slate-300">
                        {plan.features.map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      onClick={() => alert(`Selected ${plan.name}! Proceeding to EasyPaisa payment (03447956085).`)}
                      className={`w-full py-3.5 rounded-xl text-xs font-bold transition-all mt-8 ${
                        plan.isPopular
                          ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/20'
                          : 'bg-slate-800 hover:bg-slate-700 text-white'
                      }`}
                    >
                      Subscribe to {plan.name}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: AI ANALYTICS & ROI */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
              <h2 className="text-2xl font-serif font-bold text-white">
                AI Performance Analysis & Optimization Suggestions
              </h2>
              <p className="text-xs text-slate-400">
                Gemini AI continuously monitors your campaign CTR, cost per lead, and audience engagement to suggest actionable optimizations.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div className="bg-slate-950 p-5 rounded-2xl border border-amber-500/20 space-y-3">
                  <div className="text-xs font-bold text-amber-300 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>Top AI Growth Recommendations</span>
                  </div>

                  <ul className="space-y-3 text-xs text-slate-300">
                    <li className="bg-slate-900 p-3 rounded-xl border border-slate-800 flex items-start gap-2">
                      <Zap className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold text-amber-200">Weekend Timing Boost</div>
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          Postings between 8:00 PM and 10:30 PM PKT on Friday & Saturday produce 38% higher WhatsApp inquiries for Quran Academy courses.
                        </div>
                      </div>
                    </li>

                    <li className="bg-slate-900 p-3 rounded-xl border border-slate-800 flex items-start gap-2">
                      <Target className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold text-emerald-200">Overseas Pakistani Expansion</div>
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          Targeting UK (London/Birmingham) and UAE (Dubai/Sharjah) parents yields 4.2x higher subscription revenue per student.
                        </div>
                      </div>
                    </li>

                    <li className="bg-slate-900 p-3 rounded-xl border border-slate-800 flex items-start gap-2">
                      <TrendingUp className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold text-cyan-200">ZT Sidr Honey Visual Placement</div>
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          Adding "100% Pure Money Back Guarantee" badges on Instagram Feed images increases click-through rates by +19%.
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>

                {/* Channel Performance Share */}
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                  <div className="text-xs font-bold text-white flex items-center justify-between">
                    <span>Channel Traffic & Conversion Share</span>
                    <span className="text-[10px] text-slate-400">Past 30 Days</span>
                  </div>

                  <div className="space-y-3">
                    {[
                      { channel: 'Facebook Groups & Pages', share: 45, color: 'bg-blue-500' },
                      { channel: 'WhatsApp Broadcast Channels', share: 30, color: 'bg-emerald-500' },
                      { channel: 'Website Header & Sidebar Banners', share: 15, color: 'bg-amber-500' },
                      { channel: 'Instagram Feed & Stories', share: 10, color: 'bg-pink-500' },
                    ].map((item, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-300">{item.channel}</span>
                          <span className="font-mono font-bold text-amber-300">{item.share}%</span>
                        </div>
                        <div className="h-2 bg-slate-900 rounded-full overflow-hidden">
                          <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.share}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* MODAL: CONNECT NEW SOCIAL ACCOUNT */}
      {showAddSocialModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-lg font-bold text-white">Connect Social Page / Group</h3>
              <button
                onClick={() => setShowAddSocialModal(false)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddSocialSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Platform Type</label>
                <select
                  value={newSocialPlatform}
                  onChange={(e: any) => setNewSocialPlatform(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                >
                  <option value="Facebook Group">Facebook Group</option>
                  <option value="Facebook Page">Facebook Page</option>
                  <option value="Instagram">Instagram Business</option>
                  <option value="WhatsApp Channel">WhatsApp Channel</option>
                  <option value="Google Ads">Google Ads Account</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Page / Group Name *</label>
                <input
                  type="text"
                  required
                  value={newSocialName}
                  onChange={(e) => setNewSocialName(e.target.value)}
                  placeholder="e.g. Islamic Education Pakistan"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Handle or URL ID</label>
                <input
                  type="text"
                  value={newSocialHandle}
                  onChange={(e) => setNewSocialHandle(e.target.value)}
                  placeholder="e.g. groups/islamiceducationpak"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Estimated Members / Followers</label>
                <input
                  type="number"
                  value={newSocialMembers}
                  onChange={(e) => setNewSocialMembers(e.target.value)}
                  placeholder="15000"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3 rounded-xl transition-all"
              >
                Connect Account & Grant Permissions
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: CAMPAIGN PREVIEW & DETAILS */}
      {selectedCampaign && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-xl w-full space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wide">
                  {selectedCampaign.targetBrand}
                </span>
                <h3 className="text-lg font-bold text-white">{selectedCampaign.title}</h3>
              </div>
              <button
                onClick={() => setSelectedCampaign(null)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="h-44 rounded-2xl overflow-hidden bg-slate-950">
                <img src={selectedCampaign.imageUrl} className="w-full h-full object-cover" alt="Campaign" />
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="font-bold text-amber-200">{selectedCampaign.headline || selectedCampaign.title}</div>
                <div className="text-slate-300 leading-relaxed whitespace-pre-line">
                  {selectedCampaign.description || 'Full promotional ad details active.'}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-slate-300">
                <div className="bg-slate-950 p-3 rounded-xl">
                  <div className="text-[10px] text-slate-400">Total Views</div>
                  <div className="font-mono text-base font-bold text-cyan-300">{selectedCampaign.impressions.toLocaleString()}</div>
                </div>
                <div className="bg-slate-950 p-3 rounded-xl">
                  <div className="text-[10px] text-slate-400">Total Clicks</div>
                  <div className="font-mono text-base font-bold text-emerald-300">{selectedCampaign.clicks}</div>
                </div>
              </div>

              <button
                onClick={() => setSelectedCampaign(null)}
                className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 rounded-xl transition-all"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

function SearchIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
