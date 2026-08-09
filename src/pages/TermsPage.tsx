import React from 'react';
import { FileText } from 'lucide-react';
import { useAcademy } from '../context/AcademyContext';

export const TermsPage: React.FC = () => {
  const { siteSettings } = useAcademy();

  return (
    <div className="bg-red-950 text-white min-h-screen py-10 px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <FileText className="w-10 h-10 text-amber-400 mx-auto" />
          <h1 className="text-3xl font-serif font-bold text-amber-100">Terms & Conditions</h1>
          <p className="text-xs text-red-200">{siteSettings.academyName} • Rawalpindi, Pakistan</p>
        </div>

        <div className="bg-red-900/60 border border-amber-500/30 rounded-3xl p-6 text-xs text-red-100 leading-relaxed space-y-4">
          <h3 className="text-sm font-bold text-amber-200">1. Attendance & Punctuality</h3>
          <p>
            Students are expected to join live online classes punctually according to agreed time slots. Rescheduling requests must be sent to the Qari or WhatsApp (03447956085) at least 4 hours in advance.
          </p>
          <h3 className="text-sm font-bold text-amber-200">2. EasyPaisa Fee Payments</h3>
          <p>
            Monthly fees are payable in advance during the first week of every month via EasyPaisa to account number <strong>03447956085</strong> (Title: Muneeb Ur Rehman).
          </p>
        </div>
      </div>
    </div>
  );
};
