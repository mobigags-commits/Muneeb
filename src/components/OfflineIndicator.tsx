import React from 'react';
import { WifiOff } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed bottom-20 left-4 sm:left-6 z-50 flex items-center gap-2.5 rounded-xl bg-amber-600/95 backdrop-blur-md px-4 py-2.5 text-xs font-semibold text-white shadow-2xl border border-amber-400/40 animate-bounce">
      <WifiOff className="w-4 h-4 text-amber-100 shrink-0" />
      <div>
        <span className="font-bold">Offline Mode:</span> Cached academy data & schedule loaded.
        <span className="block text-[11px] text-amber-100 font-urdu">انٹرنیٹ منقطع ہے — آف لائن موڈ فعال ہے</span>
      </div>
    </div>
  );
};
