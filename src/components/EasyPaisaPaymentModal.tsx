import React from 'react';
import { X, ShieldCheck } from 'lucide-react';
import { useAcademy } from '../context/AcademyContext';
import { PaymentMethodForms } from './PaymentMethodForms';

export const EasyPaisaPaymentModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const { siteSettings } = useAcademy();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-gradient-to-b from-red-950 via-red-900 to-red-950 border-2 border-emerald-500/60 rounded-3xl shadow-2xl overflow-hidden text-white my-8 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-900 via-emerald-950 to-red-900 p-5 border-b border-emerald-500/40 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white font-extrabold flex items-center justify-center text-sm shadow">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-serif font-bold text-amber-200">
                Academy Official Fee & Payment Portal (تمام 8 پیمنٹ فارمز)
              </h3>
              <p className="text-xs text-emerald-300 font-medium">
                {siteSettings.academyName} • Founder & Owner: {siteSettings.ownerName} ({siteSettings.headOfficeCity})
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-red-900/80 text-amber-300 hover:bg-red-800 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6">
          <PaymentMethodForms
            showSelectorTabs={true}
            initialMethod="easypaisa"
            onSuccess={() => {
              // keep open so user can view and print/send voucher
            }}
          />
        </div>
      </div>
    </div>
  );
};

