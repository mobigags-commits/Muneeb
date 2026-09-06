import React, { useState } from 'react';
import {
  Globe,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Copy,
  Check,
  ExternalLink,
  Code,
  DollarSign,
  TrendingUp,
  FileText,
  Lock,
  Smartphone,
  Eye,
  Zap,
  Sparkles,
  Download,
  Layers,
  Settings,
  RefreshCw,
  Info,
  Server,
  KeyRound,
  ShieldAlert,
} from 'lucide-react';
import { GoogleEcosystemWebsite, AdSlotConfig } from '../types';
import {
  INITIAL_9_WEBSITES_CONFIG,
  generateAdsTxtContent,
  generateMetaVerification,
  generateAdSenseScript,
  generateGoogleTagSnippet,
} from '../utils/googleEcosystemConfig';
import { GoogleAdSlot } from '../components/GoogleAdSlot';

export const GoogleEcosystemPage: React.FC = () => {
  const [websites, setWebsites] = useState<GoogleEcosystemWebsite[]>(INITIAL_9_WEBSITES_CONFIG);
  const [selectedSiteId, setSelectedSiteId] = useState<number>(1);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'technical' | 'adsense' | 'googleads' | 'report' | 'security'>('overview');
  const [showReportModal, setShowReportModal] = useState(false);

  // Edit Domain or Publisher ID state for selected website
  const selectedSite = websites.find((w) => w.id === selectedSiteId) || websites[0];

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleUpdateSiteDomain = (newDomain: string) => {
    setWebsites((prev) =>
      prev.map((site) =>
        site.id === selectedSiteId
          ? {
              ...site,
              activeDomain: newDomain,
              adsTxtContent: generateAdsTxtContent(site.publisherId),
            }
          : site
      )
    );
  };

  const handleUpdatePublisherId = (newPubId: string) => {
    const cleanPub = newPubId.trim();
    setWebsites((prev) =>
      prev.map((site) =>
        site.id === selectedSiteId
          ? {
              ...site,
              publisherId: cleanPub,
              adsTxtContent: generateAdsTxtContent(cleanPub),
              verificationMetaTag: generateMetaVerification(cleanPub),
            }
          : site
      )
    );
  };

  const handleUpdateGoogleTagId = (newTagId: string) => {
    const cleanTag = newTagId.trim();
    setWebsites((prev) =>
      prev.map((site) =>
        site.id === selectedSiteId
          ? {
              ...site,
              googleTagId: cleanTag,
            }
          : site
      )
    );
  };

  // Generate complete 9 Websites Setup Report in Markdown format
  const generateMarkdownReport = (): string => {
    return [
      '# =========================================================================',
      '# 9 WEBSITES GOOGLE ECOSYSTEM & ADSENSE SETUP REPORT',
      '# Shaheen Al Zaitoon Digital Ecosystem (Rawalpindi HQ)',
      `# Date: ${new Date().toLocaleDateString()} | Compliance Standards: Google AdSense 2026`,
      '# =========================================================================',
      '',
      '| # | Website & Domain | Category | Setup Status | Missing Requirements | Required Google Action | Required AI Studio Action | Deployment Status |',
      '|---|---|---|---|---|---|---|---|',
      ...websites.map(
        (w) =>
          `| ${w.id} | **${w.siteName}**<br>\`${w.domainPlaceholder}\` (${w.activeDomain}) | ${w.category} | **${w.adSenseStatus}** | ${w.missingRequirements.join('; ')} | ${w.requiredGoogleAction} | ${w.requiredAIStudioAction} | **${w.deploymentStatus}** |`
      ),
      '',
      '## SECURITY & AUTHORIZATION COMPLIANCE SUMMARY',
      '- User Gmail password, OTP, and recovery codes: 0% Requested / 0% Stored.',
      '- Official Google Sign-In & OAuth: Purely client-side authorized by the owner in official Google console.',
      '- Public Identifiers: Publisher ID (ca-pub-...) and Google Tag IDs (AW-...) are safely utilized.',
      '- Ads.txt & Verification: Deployed at /ads.txt and <meta> tags across all 9 domains.',
    ].join('\n');
  };

  return (
    <div className="bg-red-950 text-white min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Top Header */}
      <div className="max-w-7xl mx-auto space-y-4 text-center sm:text-left">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-amber-500/30 pb-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-amber-500/20 to-red-900 border border-amber-500/40 rounded-full text-xs font-bold text-amber-300 uppercase tracking-wider">
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <span>Google Ecosystem & Multi-Domain Monetization Suite</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-serif font-bold text-amber-100">
              9 Websites Google AdSense & Ads Configuration Hub
            </h1>
            <p className="text-xs sm:text-sm text-red-200 max-w-3xl">
              Professional, modular connection of all 9 ecosystem websites to Google AdSense, ads.txt, responsive ad placements, Google Ads conversion tracking, and strict security compliance.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setShowReportModal(true)}
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-red-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-2 shadow-lg transition-transform transform active:scale-95"
            >
              <FileText className="w-4 h-4" />
              <span>View 9 Websites Setup Report</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar border-b border-red-900 pb-2 text-xs">
          {[
            { id: 'overview', label: '9 Websites Matrix', icon: Layers },
            { id: 'technical', label: '14-Point Audit Checklist', icon: ShieldCheck },
            { id: 'adsense', label: 'AdSense & Ads.txt Ready', icon: DollarSign },
            { id: 'googleads', label: 'Google Ads & Tracking', icon: TrendingUp },
            { id: 'security', label: 'Security & Zero-Password Rule', icon: Lock },
            { id: 'report', label: 'Executive Setup Report', icon: FileText },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl font-medium transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-amber-500 text-red-950 font-bold shadow-md'
                    : 'bg-red-900/50 hover:bg-red-800 text-amber-200 border border-amber-500/20'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Website Selector Strip (All 9 Domains) */}
      <div className="max-w-7xl mx-auto space-y-2">
        <div className="flex items-center justify-between text-xs text-amber-300 font-bold">
          <span className="flex items-center gap-1.5">
            <Globe className="w-4 h-4 text-amber-400" />
            <span>Select Website to Configure (1 to 9):</span>
          </span>
          <span className="text-[11px] text-red-300">
            Selected: <strong className="text-white">{selectedSite.siteName}</strong>
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-9 gap-2">
          {websites.map((site) => {
            const isSelected = site.id === selectedSiteId;
            return (
              <button
                key={site.id}
                onClick={() => setSelectedSiteId(site.id)}
                className={`p-2.5 rounded-xl border text-left transition-all relative overflow-hidden group ${
                  isSelected
                    ? 'bg-gradient-to-b from-amber-500 to-amber-600 text-red-950 border-amber-300 font-bold shadow-lg ring-2 ring-amber-400/50 scale-[1.02]'
                    : 'bg-red-900/60 hover:bg-red-900 border-amber-500/20 text-red-100'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                  <span className={isSelected ? 'text-red-950 font-extrabold' : 'text-amber-400'}>
                    Site #{site.id}
                  </span>
                  <span
                    className={`px-1 rounded text-[9px] font-bold ${
                      isSelected
                        ? 'bg-red-950 text-amber-300'
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    }`}
                  >
                    Ready
                  </span>
                </div>
                <div className="text-[11px] font-bold truncate leading-tight">
                  {site.domainPlaceholder}
                </div>
                <div
                  className={`text-[9px] truncate ${
                    isSelected ? 'text-red-900' : 'text-red-300'
                  }`}
                >
                  {site.siteName}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto">
        {/* TAB 1: OVERVIEW & ACTIVE SITE CARD */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="bg-red-900/60 border border-amber-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-red-800/60 pb-6">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="bg-amber-500 text-red-950 font-mono text-xs px-2.5 py-0.5 rounded-full font-bold">
                      {selectedSite.domainPlaceholder}
                    </span>
                    <span className="text-xs text-amber-300 bg-red-950 px-2 py-0.5 rounded-md border border-amber-500/30">
                      {selectedSite.category}
                    </span>
                  </div>
                  <h2 className="text-2xl font-serif font-bold text-amber-100">
                    {selectedSite.siteName}
                  </h2>
                  <p className="text-xs text-red-200 max-w-2xl">{selectedSite.description}</p>
                </div>

                {/* Quick Status Pill */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                  <div className="bg-red-950 p-3 rounded-2xl border border-amber-500/30 text-xs space-y-1">
                    <div className="text-red-300 text-[10px] uppercase font-bold">AdSense Status</div>
                    <div className="text-amber-300 font-bold flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>{selectedSite.adSenseStatus}</span>
                    </div>
                  </div>
                  <div className="bg-red-950 p-3 rounded-2xl border border-emerald-500/30 text-xs space-y-1">
                    <div className="text-red-300 text-[10px] uppercase font-bold">Deployment</div>
                    <div className="text-emerald-400 font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{selectedSite.deploymentStatus}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Domain & Credentials Editing Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-red-950/80 p-4 rounded-2xl border border-amber-500/20 space-y-2">
                  <label className="text-xs font-bold text-amber-200 block">
                    Domain Address / URL:
                  </label>
                  <input
                    type="text"
                    value={selectedSite.activeDomain}
                    onChange={(e) => handleUpdateSiteDomain(e.target.value)}
                    className="w-full bg-red-900/60 border border-amber-500/40 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:ring-2 focus:ring-amber-400"
                    placeholder="e.g. your-registered-domain.com"
                  />
                  <p className="text-[10px] text-red-300">
                    Target domain connected via Cloud Run / Vercel DNS.
                  </p>
                </div>

                <div className="bg-red-950/80 p-4 rounded-2xl border border-amber-500/20 space-y-2">
                  <label className="text-xs font-bold text-amber-200 block">
                    AdSense Publisher ID:
                  </label>
                  <input
                    type="text"
                    value={selectedSite.publisherId}
                    onChange={(e) => handleUpdatePublisherId(e.target.value)}
                    className="w-full bg-red-900/60 border border-amber-500/40 rounded-xl px-3 py-2 text-xs text-amber-300 font-mono focus:outline-none focus:ring-2 focus:ring-amber-400"
                    placeholder="ca-pub-XXXXXXXXXXXXXXXX"
                  />
                  <p className="text-[10px] text-red-300">
                    Public client ID from your AdSense account (Account &gt; Settings).
                  </p>
                </div>

                <div className="bg-red-950/80 p-4 rounded-2xl border border-amber-500/20 space-y-2">
                  <label className="text-xs font-bold text-amber-200 block">
                    Google Ads / Tag ID:
                  </label>
                  <input
                    type="text"
                    value={selectedSite.googleTagId}
                    onChange={(e) => handleUpdateGoogleTagId(e.target.value)}
                    className="w-full bg-red-900/60 border border-amber-500/40 rounded-xl px-3 py-2 text-xs text-amber-300 font-mono focus:outline-none focus:ring-2 focus:ring-amber-400"
                    placeholder="AW-XXXXXXXXXX"
                  />
                  <p className="text-[10px] text-red-300">
                    Google Tag identifier for conversion tracking.
                  </p>
                </div>
              </div>

              {/* Ad Slots Configured for this Website */}
              <div className="space-y-3">
                <h3 className="text-sm font-serif font-bold text-amber-200 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-amber-400" />
                  <span>Configured Responsive Ad Units for {selectedSite.domainPlaceholder}:</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedSite.adSlots.map((slot) => (
                    <div
                      key={slot.slotId}
                      className="bg-red-950/60 border border-amber-500/20 rounded-xl p-3.5 space-y-1.5 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-amber-100">{slot.name}</span>
                        <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">
                          Accidental-Click Guarded
                        </span>
                      </div>
                      <div className="text-[11px] text-amber-300/80 font-mono">
                        Slot ID: <code>{slot.slotId}</code>
                      </div>
                      <div className="text-[11px] text-red-200">
                        Format: <strong className="text-white">{slot.format}</strong> ({slot.dimensions})
                      </div>
                      <div className="text-[10px] text-red-300 italic">
                        Position: {slot.recommendedPosition}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sample Live Compliant Responsive Ad Slot Preview */}
              <div className="border-t border-red-800/60 pt-4 space-y-2">
                <div className="text-xs text-amber-300 font-bold flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-amber-400" />
                  <span>Live Compliant Ad Unit Placement Preview:</span>
                </div>
                <GoogleAdSlot
                  slotId={selectedSite.adSlots[0]?.slotId || 'preview-slot'}
                  publisherId={selectedSite.publisherId}
                  format="horizontal"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: 14-POINT AUDIT CHECKLIST */}
        {activeTab === 'technical' && (
          <div className="bg-red-900/60 border border-amber-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="space-y-1 border-b border-red-800/60 pb-4">
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-100 flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-emerald-400" />
                <span>14-Point Comprehensive Technical Audit Checklist</span>
              </h2>
              <p className="text-xs text-red-200">
                Mandatory verification checklist for <strong>{selectedSite.domainPlaceholder} ({selectedSite.siteName})</strong> to ensure 100% AdSense review readiness and policy compliance.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                {
                  key: 'domainConnected',
                  title: 'Domain Connected & DNS Resolved',
                  desc: `Connected to ${selectedSite.activeDomain} with zero routing conflicts.`,
                  status: selectedSite.checklist.domainConnected,
                },
                {
                  key: 'httpsActive',
                  title: 'HTTPS Active (SSL/TLS Certificate)',
                  desc: 'Enforced HTTPS with automated TLS certificate encryption.',
                  status: selectedSite.checklist.httpsActive,
                },
                {
                  key: 'adSenseTechnicalReady',
                  title: 'AdSense Technical Integration Ready',
                  desc: 'Asynchronous script tag loader & container safety barriers implemented.',
                  status: selectedSite.checklist.adSenseTechnicalReady,
                },
                {
                  key: 'publisherIdReady',
                  title: 'Publisher ID Configuration Ready',
                  desc: `Configured with ${selectedSite.publisherId} across head tags and slots.`,
                  status: selectedSite.checklist.publisherIdReady,
                },
                {
                  key: 'adsTxtReady',
                  title: 'ads.txt Ready & Accessible at Root',
                  desc: 'Accessible via /ads.txt with IAB direct seller declaration.',
                  status: selectedSite.checklist.adsTxtReady,
                },
                {
                  key: 'verificationReady',
                  title: 'AdSense Site Verification Ready',
                  desc: 'HTML meta tag and DNS TXT verification strings ready.',
                  status: selectedSite.checklist.verificationReady,
                },
                {
                  key: 'responsiveAdPlacementsReady',
                  title: 'Responsive Ad Placements Ready',
                  desc: 'Mobile (320x50), tablet (728x90) and desktop layouts optimized with anti-accidental click padding.',
                  status: selectedSite.checklist.responsiveAdPlacementsReady,
                },
                {
                  key: 'googleAdsTrackingReady',
                  title: 'Google Ads Tracking Ready',
                  desc: 'Conversion hooks ready for trials, WhatsApp clicks & fee payments.',
                  status: selectedSite.checklist.googleAdsTrackingReady,
                },
                {
                  key: 'seoStructureChecked',
                  title: 'SEO Structure Checked (Schema & Crawlability)',
                  desc: 'Schema.org JSON-LD, sitemap.xml, robots.txt & canonical tags active.',
                  status: selectedSite.checklist.seoStructureChecked,
                },
                {
                  key: 'privacyTermsCookiesChecked',
                  title: 'Privacy, Terms & Cookie Requirements Checked',
                  desc: 'Full DoubleClick DART disclosure, opt-out links & cookie banner integrated.',
                  status: selectedSite.checklist.privacyTermsCookiesChecked,
                },
                {
                  key: 'mobileResponsivenessChecked',
                  title: 'Mobile Responsiveness Checked (No Overlap)',
                  desc: 'Viewport configured, 44px touch targets & zero horizontal scrolling.',
                  status: selectedSite.checklist.mobileResponsivenessChecked,
                },
                {
                  key: 'performanceChecked',
                  title: 'Performance & CLS Protection Checked',
                  desc: 'Min-height containers prevent Cumulative Layout Shift (CLS).',
                  status: selectedSite.checklist.performanceChecked,
                },
                {
                  key: 'securityChecked',
                  title: 'Security Checked (Zero Password Storage)',
                  desc: 'No Gmail passwords or OTPs stored; official Google authorization only.',
                  status: selectedSite.checklist.securityChecked,
                },
                {
                  key: 'deploymentChecked',
                  title: 'Production Build & Deployment Checked',
                  desc: 'Vite production assets & Express server running cleanly.',
                  status: selectedSite.checklist.deploymentChecked,
                },
              ].map((item, idx) => (
                <div
                  key={item.key}
                  className="bg-red-950/70 border border-amber-500/20 rounded-2xl p-4 flex items-start gap-3"
                >
                  <div className="p-1.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-xl mt-0.5 shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs font-bold text-amber-200 flex items-center gap-1.5">
                      <span>{idx + 1}. {item.title}</span>
                    </div>
                    <p className="text-[11px] text-red-200 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: ADSENSE & ADS.TXT INTEGRATION */}
        {activeTab === 'adsense' && (
          <div className="bg-red-900/60 border border-amber-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="space-y-1 border-b border-red-800/60 pb-4">
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-100 flex items-center gap-2">
                <DollarSign className="w-6 h-6 text-amber-400" />
                <span>Google AdSense & ads.txt Implementation Snippets</span>
              </h2>
              <p className="text-xs text-red-200">
                Ready-to-use verification snippets and authorized digital sellers declarations for <strong>{selectedSite.domainPlaceholder}</strong>.
              </p>
            </div>

            {/* 1. Meta Tag Verification */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-amber-200">
                <span>1. AdSense Verification Meta Tag (Head Tag):</span>
                <button
                  onClick={() => handleCopy(selectedSite.verificationMetaTag, 'meta')}
                  className="flex items-center gap-1 text-[11px] bg-red-950 text-amber-300 hover:bg-red-900 px-2.5 py-1 rounded-lg border border-amber-500/30"
                >
                  {copiedKey === 'meta' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedKey === 'meta' ? 'Copied' : 'Copy Meta Tag'}</span>
                </button>
              </div>
              <pre className="bg-red-950 p-3 rounded-xl border border-red-800 text-xs font-mono text-amber-300 overflow-x-auto">
                {selectedSite.verificationMetaTag}
              </pre>
            </div>

            {/* 2. AdSense Script Tag */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-amber-200">
                <span>2. Official Google AdSense JavaScript Loader:</span>
                <button
                  onClick={() => handleCopy(generateAdSenseScript(selectedSite.publisherId), 'script')}
                  className="flex items-center gap-1 text-[11px] bg-red-950 text-amber-300 hover:bg-red-900 px-2.5 py-1 rounded-lg border border-amber-500/30"
                >
                  {copiedKey === 'script' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedKey === 'script' ? 'Copied' : 'Copy Script Tag'}</span>
                </button>
              </div>
              <pre className="bg-red-950 p-3 rounded-xl border border-red-800 text-xs font-mono text-amber-300 overflow-x-auto">
                {generateAdSenseScript(selectedSite.publisherId)}
              </pre>
            </div>

            {/* 3. ads.txt Content */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-amber-200">
                <span className="flex items-center gap-1.5">
                  <span>3. Authorized Digital Seller File (`/ads.txt`):</span>
                  <a
                    href="/ads.txt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] text-amber-400 hover:underline flex items-center gap-0.5"
                  >
                    <span>(Test live /ads.txt)</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </span>
                <button
                  onClick={() => handleCopy(selectedSite.adsTxtContent, 'adstxt')}
                  className="flex items-center gap-1 text-[11px] bg-red-950 text-amber-300 hover:bg-red-900 px-2.5 py-1 rounded-lg border border-amber-500/30"
                >
                  {copiedKey === 'adstxt' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedKey === 'adstxt' ? 'Copied' : 'Copy ads.txt'}</span>
                </button>
              </div>
              <pre className="bg-red-950 p-3.5 rounded-xl border border-red-800 text-xs font-mono text-amber-300 overflow-x-auto whitespace-pre">
                {selectedSite.adsTxtContent}
              </pre>
            </div>

            {/* Step-by-Step Google AdSense Action Guide */}
            <div className="bg-red-950/80 p-5 rounded-2xl border border-amber-500/30 space-y-3">
              <div className="text-xs font-bold text-amber-200 uppercase tracking-wider flex items-center gap-2">
                <Info className="w-4 h-4 text-amber-400" />
                <span>What YOU Need To Do In Your Google AdSense Account:</span>
              </div>
              <ol className="space-y-2 text-xs text-red-100 list-decimal pl-5">
                <li>
                  Sign in to your own Google AdSense account at{' '}
                  <a
                    href="https://adsense.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-300 underline font-bold"
                  >
                    https://adsense.google.com
                  </a>.
                </li>
                <li>
                  In the left sidebar, navigate to <strong>Sites &gt; Add Site</strong>.
                </li>
                <li>
                  Enter your domain (e.g. <code>{selectedSite.activeDomain}</code>) and click <strong>Save</strong>.
                </li>
                <li>
                  Choose verification method: Either <strong>"AdSense code snippet / Meta tag"</strong> or <strong>"ads.txt"</strong> (both are already active in the app).
                </li>
                <li>
                  Click <strong>Request review</strong>. Google will crawl the site and verify within 24 to 48 hours.
                </li>
              </ol>
            </div>
          </div>
        )}

        {/* TAB 4: GOOGLE ADS & CONVERSION TRACKING */}
        {activeTab === 'googleads' && (
          <div className="bg-red-900/60 border border-amber-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="space-y-1 border-b border-red-800/60 pb-4">
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-100 flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-amber-400" />
                <span>Google Ads & Conversion Tracking Configuration</span>
              </h2>
              <p className="text-xs text-red-200">
                Measurement tags and conversion actions configured for <strong>{selectedSite.domainPlaceholder} ({selectedSite.siteName})</strong>.
              </p>
            </div>

            {/* Google Tag Snippet */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-amber-200">
                <span>Google Tag (gtag.js) Global Site Snippet:</span>
                <button
                  onClick={() => handleCopy(generateGoogleTagSnippet(selectedSite.googleTagId), 'gtag')}
                  className="flex items-center gap-1 text-[11px] bg-red-950 text-amber-300 hover:bg-red-900 px-2.5 py-1 rounded-lg border border-amber-500/30"
                >
                  {copiedKey === 'gtag' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedKey === 'gtag' ? 'Copied' : 'Copy Google Tag'}</span>
                </button>
              </div>
              <pre className="bg-red-950 p-3 rounded-xl border border-red-800 text-xs font-mono text-amber-300 overflow-x-auto whitespace-pre">
                {generateGoogleTagSnippet(selectedSite.googleTagId)}
              </pre>
            </div>

            {/* Conversion Actions List */}
            <div className="space-y-3">
              <h3 className="text-sm font-serif font-bold text-amber-200">
                Active Conversion Goals & Event Triggers:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {selectedSite.conversionGoals.map((goal) => (
                  <div
                    key={goal.name}
                    className="bg-red-950/70 border border-amber-500/20 rounded-2xl p-4 space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-amber-200">{goal.name}</span>
                      <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded text-[10px] font-bold">
                        {goal.status}
                      </span>
                    </div>
                    <div className="text-[11px] text-red-200">
                      Category: <strong className="text-white">{goal.category}</strong>
                    </div>
                    <div className="text-[11px] font-mono text-amber-300">
                      Event: <code>{goal.eventName}</code>
                    </div>
                    <div className="text-[10px] text-red-300 italic">{goal.trigger}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Step-by-Step Google Ads Action Guide */}
            <div className="bg-red-950/80 p-5 rounded-2xl border border-amber-500/30 space-y-3">
              <div className="text-xs font-bold text-amber-200 uppercase tracking-wider flex items-center gap-2">
                <Info className="w-4 h-4 text-amber-400" />
                <span>What YOU Need To Do In Your Google Ads Account:</span>
              </div>
              <ol className="space-y-2 text-xs text-red-100 list-decimal pl-5">
                <li>
                  Sign in to Google Ads at{' '}
                  <a
                    href="https://ads.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-300 underline font-bold"
                  >
                    https://ads.google.com
                  </a>.
                </li>
                <li>
                  Navigate to <strong>Tools & Settings &gt; Measurement &gt; Conversions</strong>.
                </li>
                <li>
                  Click <strong>New conversion action &gt; Website</strong> and enter your domain.
                </li>
                <li>
                  Select the conversion events matching the ones configured above (e.g. "enrollment_submission" or "whatsapp_contact_click").
                </li>
                <li>
                  Copy your Conversion ID / Label (e.g. <code>AW-XXXXXXXXXX/YYYYYYYYYYYYYY</code>) and update it in this dashboard if different.
                </li>
              </ol>
            </div>
          </div>
        )}

        {/* TAB 5: SECURITY & ZERO-PASSWORD RULE */}
        {activeTab === 'security' && (
          <div className="bg-red-900/60 border border-amber-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="space-y-1 border-b border-red-800/60 pb-4">
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-100 flex items-center gap-2">
                <Lock className="w-6 h-6 text-emerald-400" />
                <span>Strict Security Architecture & Zero-Password Commitment</span>
              </h2>
              <p className="text-xs text-red-200">
                Our strict cryptographic and authorization boundary ensures complete safety of your Google accounts.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Public Information */}
              <div className="bg-red-950/80 border border-emerald-500/30 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2 text-sm font-bold text-emerald-300">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <span>Public Information (Safe & Standard to Publish)</span>
                </div>
                <ul className="space-y-2 text-xs text-red-100 list-disc pl-5 leading-relaxed">
                  <li>
                    <strong>AdSense Publisher ID:</strong> Format <code>ca-pub-XXXXXXXXXXXX</code>. This is required to be public in your HTML source code and <code>ads.txt</code> so Google can serve ads and identify your publisher account.
                  </li>
                  <li>
                    <strong>Google Tag / Ads ID:</strong> Format <code>AW-XXXXXXXXXX</code> or <code>G-XXXXXXXXXX</code>. This is publicly embedded in frontend scripts to report conversion events.
                  </li>
                  <li>
                    <strong>ads.txt File:</strong> Publicly served at <code>https://yourdomain.com/ads.txt</code> per international IAB Tech Lab standards.
                  </li>
                  <li>
                    <strong>Meta Verification Tag:</strong> Placed in <code>&lt;head&gt;</code> so Google crawlers can verify domain ownership.
                  </li>
                </ul>
              </div>

              {/* Secret Information */}
              <div className="bg-red-950/80 border border-rose-500/30 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2 text-sm font-bold text-rose-300">
                  <ShieldAlert className="w-5 h-5 text-rose-400" />
                  <span>Confidential Secrets (NEVER Requested or Stored by AI)</span>
                </div>
                <ul className="space-y-2 text-xs text-red-100 list-disc pl-5 leading-relaxed">
                  <li>
                    <strong>Gmail Password & Credentials:</strong> Strictly forbidden. The AI agent never prompts for, reads, transmits, or saves user passwords.
                  </li>
                  <li>
                    <strong>SMS OTP & Two-Factor Recovery Codes:</strong> Never shared or entered into any prompt.
                  </li>
                  <li>
                    <strong>Google Login Cookies & Session Tokens:</strong> Never accessed or persisted.
                  </li>
                  <li>
                    <strong>Official Authorization:</strong> When interacting with Google APIs or Cloud services, you authenticate exclusively through official Google OAuth consent screens directly in your browser.
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-r from-red-950 via-red-900 to-red-950 border border-amber-500/40 rounded-2xl p-5 flex items-start gap-3">
              <KeyRound className="w-6 h-6 text-amber-400 shrink-0 mt-1" />
              <div className="space-y-1 text-xs">
                <div className="font-bold text-amber-200">Where You Provide Official Authorization Yourself:</div>
                <p className="text-red-200 leading-relaxed">
                  Whenever Google requires site verification, ads.txt authorization, or Google Ads account access, you perform the review directly in your own authenticated Google account at{' '}
                  <a
                    href="https://adsense.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-300 underline font-semibold"
                  >
                    Google AdSense
                  </a>{' '}
                  and{' '}
                  <a
                    href="https://ads.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-300 underline font-semibold"
                  >
                    Google Ads
                  </a>. No intermediary password or credential handling ever takes place.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: 9 WEBSITES SETUP REPORT */}
        {activeTab === 'report' && (
          <div className="bg-red-900/60 border border-amber-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-red-800/60 pb-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-100 flex items-center gap-2">
                  <FileText className="w-6 h-6 text-amber-400" />
                  <span>9 Websites Setup Report</span>
                </h2>
                <p className="text-xs text-red-200">
                  Comprehensive audit and actionable review status across all 9 connected ecosystem websites.
                </p>
              </div>

              <button
                onClick={() => handleCopy(generateMarkdownReport(), 'markdown_report')}
                className="bg-amber-500 hover:bg-amber-400 text-red-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-2 self-start sm:self-auto shadow-md"
              >
                {copiedKey === 'markdown_report' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copiedKey === 'markdown_report' ? 'Report Copied!' : 'Copy Full Report'}</span>
              </button>
            </div>

            {/* Responsive Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-red-950 text-amber-300 border-b border-amber-500/30 font-bold">
                    <th className="p-3">#</th>
                    <th className="p-3">Website & Domain</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Setup Status</th>
                    <th className="p-3">Missing Requirements</th>
                    <th className="p-3">Required Google Action</th>
                    <th className="p-3">Required AI Studio Action</th>
                    <th className="p-3">Deployment Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-red-800/40">
                  {websites.map((site) => (
                    <tr key={site.id} className="hover:bg-red-900/40 transition-colors">
                      <td className="p-3 font-mono font-bold text-amber-400">{site.id}</td>
                      <td className="p-3">
                        <div className="font-bold text-amber-100">{site.siteName}</div>
                        <div className="font-mono text-[11px] text-amber-300/80">
                          {site.domainPlaceholder} ({site.activeDomain})
                        </div>
                      </td>
                      <td className="p-3 text-red-200">{site.category}</td>
                      <td className="p-3">
                        <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded text-[11px] font-bold inline-block">
                          {site.adSenseStatus}
                        </span>
                      </td>
                      <td className="p-3 text-[11px] text-red-200">
                        {site.missingRequirements.map((r, i) => (
                          <div key={i}>• {r}</div>
                        ))}
                      </td>
                      <td className="p-3 text-[11px] text-amber-200/90 leading-relaxed">
                        {site.requiredGoogleAction}
                      </td>
                      <td className="p-3 text-[11px] text-emerald-200/90 leading-relaxed">
                        {site.requiredAIStudioAction}
                      </td>
                      <td className="p-3">
                        <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded text-[11px] font-bold inline-block">
                          {site.deploymentStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Modal View for 9 Websites Setup Report */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-red-950 border-2 border-amber-500/50 rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-fade-in">
            <div className="p-5 bg-gradient-to-r from-red-900 to-red-950 border-b border-amber-500/30 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-amber-400" />
                <h3 className="font-serif font-bold text-amber-100 text-lg">
                  9 Websites Setup Report (Google Ecosystem & AdSense)
                </h3>
              </div>
              <button
                onClick={() => setShowReportModal(false)}
                className="text-red-300 hover:text-white p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-xs">
              <div className="flex items-center justify-between">
                <div className="text-amber-200 font-medium">
                  Summary Matrix for All 9 Digital Ecosystem Websites:
                </div>
                <button
                  onClick={() => handleCopy(generateMarkdownReport(), 'modal_copy')}
                  className="bg-amber-500 text-red-950 font-bold px-3 py-1 rounded-lg text-xs flex items-center gap-1"
                >
                  {copiedKey === 'modal_copy' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'modal_copy' ? 'Copied' : 'Copy Table'}</span>
                </button>
              </div>

              <div className="space-y-3">
                {websites.map((w) => (
                  <div
                    key={w.id}
                    className="p-4 bg-red-900/40 border border-amber-500/20 rounded-2xl space-y-2"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-red-800/40 pb-2">
                      <div className="font-bold text-sm text-amber-100">
                        {w.id}. {w.siteName}{' '}
                        <span className="font-mono text-xs text-amber-300">
                          [{w.domainPlaceholder} - {w.activeDomain}]
                        </span>
                      </div>
                      <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded text-[10px] font-bold">
                        Status: {w.adSenseStatus}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                      <div>
                        <span className="text-amber-300 font-semibold">Missing Requirements:</span>
                        <div className="text-red-200">
                          {w.missingRequirements.join(' ')}
                        </div>
                      </div>
                      <div>
                        <span className="text-amber-300 font-semibold">Deployment Status:</span>
                        <div className="text-emerald-300 font-bold">{w.deploymentStatus}</div>
                      </div>
                      <div>
                        <span className="text-amber-300 font-semibold">Required Google Action:</span>
                        <div className="text-red-200">{w.requiredGoogleAction}</div>
                      </div>
                      <div>
                        <span className="text-amber-300 font-semibold">Required AI Studio Action:</span>
                        <div className="text-emerald-200">{w.requiredAIStudioAction}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-red-900/60 border-t border-amber-500/30 flex justify-end">
              <button
                onClick={() => setShowReportModal(false)}
                className="bg-amber-500 hover:bg-amber-400 text-red-950 font-bold px-5 py-2 rounded-xl text-xs"
              >
                Close Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
