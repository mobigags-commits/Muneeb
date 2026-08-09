import React from 'react';
import { Shield } from 'lucide-react';
import { useAcademy } from '../context/AcademyContext';

export const PrivacyPage: React.FC = () => {
  const { siteSettings } = useAcademy();

  return (
    <div className="bg-red-950 text-white min-h-screen py-10 px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <Shield className="w-10 h-10 text-amber-400 mx-auto" />
          <h1 className="text-3xl font-serif font-bold text-amber-100">Privacy Policy</h1>
          <p className="text-xs text-red-200">{siteSettings.academyName} • Rawalpindi, Pakistan</p>
        </div>

        <div className="bg-red-900/60 border border-amber-500/30 rounded-3xl p-6 text-xs text-red-100 leading-relaxed space-y-4">
          <p>
            At <strong>{siteSettings.academyName}</strong>, we are committed to safeguarding the privacy and security of all our students, parents, and instructors across Pakistan and internationally.
          </p>
          <h3 className="text-sm font-bold text-amber-200">1. Student Data Protection</h3>
          <p>
            Personal contact numbers, EasyPaisa transaction records, and student progress reports are securely handled solely for academic administration. We never sell or share data with third parties.
          </p>
          <h3 className="text-sm font-bold text-amber-200">2. Female Student Privacy</h3>
          <p>
            Classes conducted for sisters and young girls by our female Qaria instructors are held in strict private 1-on-1 environments.
          </p>
        </div>
      </div>
    </div>
  );
};
