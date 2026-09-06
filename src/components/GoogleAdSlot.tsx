import React, { useEffect, useRef } from 'react';
import { Sparkles, ShieldCheck } from 'lucide-react';
import { DEFAULT_PUBLISHER_ID } from '../utils/googleEcosystemConfig';

interface GoogleAdSlotProps {
  slotId: string;
  format?: 'auto' | 'horizontal' | 'rectangle' | 'vertical';
  className?: string;
  publisherId?: string;
  label?: string;
  minHeight?: number;
}

export const GoogleAdSlot: React.FC<GoogleAdSlotProps> = ({
  slotId,
  format = 'auto',
  className = '',
  publisherId = DEFAULT_PUBLISHER_ID,
  label = 'Advertisement / اشتہار',
  minHeight = 100,
}) => {
  const adRef = useRef<HTMLDivElement>(null);
  const isLoadedRef = useRef(false);

  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
        // Push ad unit once mounted if live script is present
        if (!isLoadedRef.current) {
          ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
          isLoadedRef.current = true;
        }
      }
    } catch (e) {
      console.debug('[Google AdSense] Ad unit push note:', e);
    }
  }, []);

  return (
    <div
      className={`my-6 mx-auto w-full max-w-5xl transition-all ${className}`}
      style={{ minHeight: `${minHeight}px` }}
    >
      {/* Accidental-Click Protection Label (Required by Google AdSense Policy) */}
      <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-amber-300/80 px-2 py-1 mb-1 border-b border-amber-500/10">
        <span className="flex items-center gap-1 font-semibold">
          <Sparkles className="w-3 h-3 text-amber-400" />
          {label}
        </span>
        <span className="flex items-center gap-1 text-[9px] text-red-300/70">
          <ShieldCheck className="w-3 h-3 text-emerald-400" />
          AdSense Compliant Placement
        </span>
      </div>

      {/* Ad Unit Container with Safe Padding & High Contrast Frame */}
      <div
        ref={adRef}
        className="relative bg-gradient-to-r from-red-950/70 via-red-900/50 to-red-950/70 border border-amber-500/20 rounded-xl p-3 flex flex-col items-center justify-center overflow-hidden text-center shadow-inner"
        style={{ minHeight: `${minHeight - 24}px` }}
      >
        {/* Real AdSense Ins Tag */}
        <ins
          className="adsbygoogle"
          style={{ display: 'block', width: '100%', minHeight: `${minHeight - 30}px` }}
          data-ad-client={publisherId}
          data-ad-slot={slotId}
          data-ad-format={format}
          data-full-width-responsive="true"
        />

        {/* Fallback Graceful Placeholder when AdSense JS hasn't rendered ads yet */}
        <div className="py-3 px-4 flex flex-col sm:flex-row items-center justify-between w-full gap-2 text-xs">
          <div className="text-left space-y-0.5">
            <div className="text-amber-200 font-bold text-xs flex items-center gap-1.5">
              <span>Google AdSense Slot:</span>
              <code className="text-[10px] bg-red-950 px-1.5 py-0.5 rounded text-amber-300 font-mono">
                {slotId}
              </code>
            </div>
            <div className="text-[11px] text-red-200">
              Format: <strong className="text-white capitalize">{format}</strong> • Pub ID: <span className="font-mono text-amber-300">{publisherId}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="bg-emerald-500/20 text-emerald-300 text-[10px] px-2.5 py-1 rounded-full border border-emerald-400/40 font-bold">
              ✓ Responsive Mobile & Desktop
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
