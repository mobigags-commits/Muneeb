import React from 'react';
import { ExternalLink, Sparkles, Tag } from 'lucide-react';
import { useAcademy } from '../context/AcademyContext';

export const AdBanner: React.FC<{
  placement?: 'Header Banner' | 'Sidebar Ad' | 'In-feed Featured' | 'Footer Banner';
}> = ({ placement = 'In-feed Featured' }) => {
  const { adCampaigns, recordAdClick, setActivePage } = useAcademy();

  const matchingAd = adCampaigns.find(
    (ad) => ad.status === 'Active' && (placement ? ad.placement === placement : true)
  ) || adCampaigns[0];

  if (!matchingAd) return null;

  const handleClick = () => {
    recordAdClick(matchingAd.id);
    if (matchingAd.linkUrl.startsWith('http')) {
      window.open(matchingAd.linkUrl, '_blank');
    } else {
      setActivePage(matchingAd.linkUrl as any);
    }
  };

  if (placement === 'Header Banner') {
    return (
      <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-red-950 px-4 py-2 text-xs font-bold flex items-center justify-between border-b border-amber-300">
        <div className="flex items-center gap-2 max-w-4xl mx-auto text-center sm:text-left flex-wrap justify-center">
          <span className="bg-red-950 text-amber-300 text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-extrabold flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-300" /> Sponsored
          </span>
          <span className="font-serif">{matchingAd.title}</span>
        </div>
        <button
          onClick={handleClick}
          className="bg-red-950 text-amber-300 hover:bg-red-900 px-3 py-1 rounded-full text-[11px] font-bold flex items-center gap-1 shrink-0 ml-2"
        >
          <span>Explore Now</span>
          <ExternalLink className="w-3 h-3" />
        </button>
      </div>
    );
  }

  return (
    <div className="my-6 bg-gradient-to-r from-red-900 via-amber-950 to-red-900 border-2 border-amber-500/50 rounded-2xl p-4 shadow-xl text-white relative overflow-hidden group">
      {/* Background Accent glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all pointer-events-none" />

      <div className="flex flex-col md:flex-row items-center gap-4 relative z-10">
        <img
          src={matchingAd.imageUrl}
          alt={matchingAd.title}
          className="w-full md:w-48 h-32 object-cover rounded-xl border border-amber-500/30 shrink-0"
        />

        <div className="flex-1 space-y-1.5 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <span className="bg-amber-500/20 text-amber-300 border border-amber-400/30 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider flex items-center gap-1">
              <Tag className="w-3 h-3" />
              {matchingAd.targetBrand}
            </span>
            <span className="text-[10px] text-amber-200/70">Verified Partner Ad</span>
          </div>

          <h4 className="text-lg font-serif font-bold text-amber-100 group-hover:text-amber-300 transition-colors">
            {matchingAd.title}
          </h4>

          <p className="text-xs text-red-200">
            Official promotion from Shaheen Al Zaitoon Ecosystem. Click below to view details or register.
          </p>
        </div>

        <button
          onClick={handleClick}
          className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-red-950 font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-lg shrink-0 transition-transform transform group-hover:scale-105"
        >
          <span>Claim Offer</span>
          <ExternalLink className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
