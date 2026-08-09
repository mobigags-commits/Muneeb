import React, { useState } from 'react';
import {
  Facebook,
  Users,
  ExternalLink,
  CheckCircle,
  Copy,
  Sparkles,
  ShieldCheck,
  Globe,
  MessageCircle,
  Share2,
} from 'lucide-react';
import { useAcademy } from '../context/AcademyContext';

interface FacebookGroupWidgetProps {
  variant?: 'full' | 'card' | 'banner' | 'compact';
  customTitle?: string;
  className?: string;
}

export const FacebookGroupWidget: React.FC<FacebookGroupWidgetProps> = ({
  variant = 'full',
  customTitle,
  className = '',
}) => {
  const { siteSettings, setActivePage } = useAcademy();
  const [copied, setCopied] = useState(false);

  const groupUrl = siteSettings.facebookGroupUrl || 'https://www.facebook.com/groups/REPLACE_WITH_MY_GROUP_LINK';
  const groupName = siteSettings.facebookGroupName || 'Shaheen Al Zaitoon Official Facebook Community';
  const groupDescription =
    siteSettings.facebookGroupDescription ||
    'Join our official community of 92,400+ online Quran students, parents, Qaris, and Islamic business members worldwide.';
  const memberCount = siteSettings.facebookGroupMembers || 92400;
  const coverImage =
    siteSettings.facebookGroupCoverImage ||
    'https://images.unsplash.com/photo-1542816417-0983cbe82752?auto=format&fit=crop&w=1200&q=80';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(groupUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  // Compact variant: ideal for headers or minimal sidebars
  if (variant === 'compact') {
    return (
      <a
        href={groupUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-2 bg-[#1877F2] hover:bg-[#166fe5] text-white px-3.5 py-1.5 rounded-full font-medium text-xs shadow-md transition-all transform hover:scale-105 ${className}`}
        id="fb-group-compact-btn"
      >
        <Facebook className="w-4 h-4 fill-white" />
        <span>Join Facebook Group</span>
        <span className="bg-white/20 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
          {(memberCount / 1000).toFixed(1)}k+
        </span>
        <ExternalLink className="w-3 h-3 text-white/80" />
      </a>
    );
  }

  // Banner variant: horizontal bar suitable for homepage sections or top of pages
  if (variant === 'banner') {
    return (
      <div
        className={`bg-gradient-to-r from-slate-900 via-[#1877F2]/20 to-slate-900 border-2 border-[#1877F2]/60 rounded-2xl p-4 sm:p-6 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4 ${className}`}
        id="fb-group-banner-widget"
      >
        <div className="flex items-center gap-4 text-left">
          <div className="w-12 h-12 rounded-2xl bg-[#1877F2] text-white flex items-center justify-center shrink-0 shadow-lg border border-white/20">
            <Facebook className="w-7 h-7 fill-white" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs text-[#1877F2] font-extrabold uppercase tracking-wide">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Official Facebook Public Group</span>
              <span className="bg-[#1877F2]/20 text-[#1877F2] text-[10px] px-2 py-0.5 rounded-full font-bold border border-[#1877F2]/30">
                {memberCount.toLocaleString()} Members
              </span>
            </div>
            <h4 className="text-base sm:text-lg font-serif font-bold text-white leading-tight">
              {customTitle || groupName}
            </h4>
            <p className="text-xs text-slate-300 line-clamp-1 max-w-xl">
              {groupDescription}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <a
            href={groupUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#1877F2] hover:bg-[#166fe5] text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-lg flex items-center gap-2 transition-all transform hover:-translate-y-0.5"
            id="fb-group-banner-join-btn"
          >
            <Facebook className="w-4 h-4 fill-white" />
            <span>Join Our Facebook Group</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <button
            onClick={handleCopyLink}
            className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl border border-slate-700 text-xs transition-colors"
            title="Copy Group Link"
          >
            {copied ? <CheckCircle className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>
    );
  }

  // Card variant: compact card for sidebar or grid display
  if (variant === 'card') {
    return (
      <div
        className={`bg-slate-900 border-2 border-[#1877F2]/50 rounded-2xl overflow-hidden shadow-xl hover:border-[#1877F2] transition-all group ${className}`}
        id="fb-group-card-widget"
      >
        <div className="relative h-32 overflow-hidden">
          <img
            src={coverImage}
            alt="Facebook Group Cover"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          <div className="absolute top-3 left-3 bg-[#1877F2] text-white px-2.5 py-1 rounded-full text-[10px] font-extrabold tracking-wider uppercase flex items-center gap-1 shadow-md">
            <Facebook className="w-3 h-3 fill-white" />
            <span>Official Group</span>
          </div>
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
            <span className="bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 font-bold flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-[#1877F2]" />
              {memberCount.toLocaleString()} Members
            </span>
            <span className="bg-emerald-500/90 text-white font-bold text-[10px] px-2 py-0.5 rounded-md">
              Public Group
            </span>
          </div>
        </div>

        <div className="p-4 space-y-3">
          <h4 className="font-serif font-bold text-sm text-white line-clamp-2">
            {groupName}
          </h4>
          <p className="text-xs text-slate-300 line-clamp-2">
            {groupDescription}
          </p>

          <a
            href={groupUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-[#1877F2] hover:bg-[#166fe5] text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow-md flex items-center justify-center gap-2 transition-all transform group-hover:translate-x-0.5"
            id="fb-group-card-join-btn"
          >
            <Facebook className="w-4 h-4 fill-white" />
            <span>Join Our Facebook Group</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    );
  }

  // Default 'full' variant: comprehensive feature card with cover, member metrics, brand guidelines notice & metadata
  return (
    <div
      className={`bg-slate-900 border-2 border-[#1877F2] rounded-3xl overflow-hidden shadow-2xl ${className}`}
      id="fb-group-full-widget"
    >
      {/* Cover Header */}
      <div className="relative h-48 sm:h-60 overflow-hidden">
        <img
          src={coverImage}
          alt="Facebook Group Cover Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <div className="inline-flex items-center gap-2 bg-[#1877F2] text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg border border-white/20">
            <Facebook className="w-4 h-4 fill-white" />
            <span>Official Facebook Group</span>
            <ShieldCheck className="w-3.5 h-3.5 text-blue-200" />
          </div>

          <div className="bg-slate-950/80 backdrop-blur-md border border-slate-700 text-slate-200 px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-emerald-400" />
            <span>Public Global Community</span>
          </div>
        </div>

        {/* Cover Overlay Info */}
        <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div className="flex items-end gap-3">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#1877F2] border-4 border-slate-950 flex items-center justify-center text-white shadow-2xl shrink-0">
              <Facebook className="w-10 h-10 sm:w-12 sm:h-12 fill-white" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#1877F2] bg-blue-500/10 px-2.5 py-0.5 rounded-md border border-[#1877F2]/30">
                Verified Community
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mt-1 leading-tight">
                {groupName}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-6 sm:p-8 space-y-6">
        <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
          {groupDescription}
        </p>

        {/* Community Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950/70 p-4 rounded-2xl border border-slate-800 text-center">
          <div>
            <div className="text-xl sm:text-2xl font-extrabold text-[#1877F2] font-mono">
              {memberCount.toLocaleString()}+
            </div>
            <div className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">
              Active Members
            </div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-extrabold text-amber-400 font-mono">
              25+
            </div>
            <div className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">
              Daily Posts
            </div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-extrabold text-emerald-400 font-mono">
              100%
            </div>
            <div className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">
              Free Access
            </div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-extrabold text-purple-400 font-mono">
              24/7
            </div>
            <div className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">
              Q&A Discussions
            </div>
          </div>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
          <a
            href={groupUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:flex-1 bg-[#1877F2] hover:bg-[#166fe5] text-white font-bold text-base px-6 py-4 rounded-2xl shadow-xl flex items-center justify-center gap-3 transition-all transform hover:-translate-y-0.5"
            id="fb-group-full-join-btn"
          >
            <Facebook className="w-6 h-6 fill-white" />
            <span>Join Our Facebook Group</span>
            <ExternalLink className="w-5 h-5 text-blue-200" />
          </a>

          <button
            onClick={handleCopyLink}
            className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm px-5 py-4 rounded-2xl border border-slate-700 flex items-center justify-center gap-2 transition-colors shrink-0"
            id="fb-group-copy-link-btn"
          >
            {copied ? (
              <>
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400">URL Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Group URL</span>
              </>
            )}
          </button>
        </div>

        {/* Facebook Brand Guidelines Compliance Banner */}
        <div className="flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800 pt-4">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#1877F2]" />
            Official Meta / Facebook Brand Assets & Guidelines Compliant
          </span>
          <button
            onClick={() => setActivePage('community')}
            className="text-[#1877F2] hover:underline font-semibold"
          >
            Explore Full Community Hub →
          </button>
        </div>
      </div>
    </div>
  );
};
