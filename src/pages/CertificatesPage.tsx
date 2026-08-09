import React, { useState } from 'react';
import { Award, CheckCircle, Search, Printer, ShieldCheck, Sparkles } from 'lucide-react';
import { useAcademy } from '../context/AcademyContext';

export const CertificatesPage: React.FC = () => {
  const { certificates, siteSettings } = useAcademy();
  const [searchCode, setSearchCode] = useState('');
  const [selectedCert, setSelectedCert] = useState<any | null>(certificates[0]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchCode.trim()) return;
    const found = certificates.find(
      (c) =>
        c.verificationCode.toLowerCase() === searchCode.trim().toLowerCase() ||
        c.studentName.toLowerCase().includes(searchCode.trim().toLowerCase())
    );
    if (found) {
      setSelectedCert(found);
    } else {
      alert('Certificate not found. Try search code: SZ-2026-8891');
    }
  };

  return (
    <div className="bg-red-950 text-white min-h-screen py-10 px-4 sm:px-6 lg:px-8 space-y-10">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-400/30">
            <Award className="w-4 h-4" />
            <span>Sanad & Completion Verification</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-extrabold text-amber-100">
            Certificate Verification Portal
          </h1>
          <p className="text-xs sm:text-sm text-red-200">
            Verify authentic completion certificates issued by Shaheen Al Zaitoon Online Quran Academy in Rawalpindi.
          </p>
        </div>

        {/* Verification Lookup Form */}
        <form onSubmit={handleSearch} className="max-w-xl mx-auto flex gap-2">
          <input
            type="text"
            placeholder="Enter Verification Code (e.g. SZ-2026-8891) or Student Name..."
            value={searchCode}
            onChange={(e) => setSearchCode(e.target.value)}
            className="flex-1 bg-red-900 text-amber-100 placeholder-red-300/60 px-4 py-3 rounded-xl text-xs border border-amber-500/40 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-amber-500 hover:bg-amber-400 text-red-950 font-bold px-6 py-3 rounded-xl text-xs flex items-center gap-1.5 shadow-lg"
          >
            <Search className="w-4 h-4" />
            <span>Verify</span>
          </button>
        </form>

        {/* Display Verified Certificate */}
        {selectedCert && (
          <div className="bg-gradient-to-b from-amber-50 via-white to-amber-50 text-amber-950 border-8 border-amber-600 rounded-3xl p-8 sm:p-12 shadow-2xl space-y-8 relative overflow-hidden my-8">
            <div className="text-center space-y-4">
              <div className="text-amber-800 text-sm font-serif font-bold tracking-widest uppercase">
                بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
              </div>
              <div className="text-2xl sm:text-4xl font-serif font-extrabold text-red-950">
                {siteSettings.academyName}
              </div>
              <div className="text-xs text-amber-800 font-serif">
                Rawalpindi, Pakistan • Founder: {siteSettings.ownerName}
              </div>
              <div className="text-xl sm:text-2xl font-serif text-amber-700 italic border-t border-b border-amber-300 py-2 inline-block px-8">
                Certificate of Academic Excellence
              </div>
            </div>

            <div className="text-center space-y-4">
              <p className="text-xs text-amber-900">This is to certify that student</p>
              <div className="text-3xl font-serif font-bold text-red-950 border-b-2 border-amber-600 inline-block px-6 py-1">
                {selectedCert.studentName}
              </div>
              <p className="text-xs text-amber-900 max-w-lg mx-auto leading-relaxed">
                has successfully completed the course <strong>{selectedCert.courseName}</strong> with distinction grade <strong>{selectedCert.grade}</strong>.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-amber-300 text-xs text-amber-900">
              <div>
                <div>Issue Date: <strong>{selectedCert.issueDate}</strong></div>
                <div>Instructor: <strong>{selectedCert.instructorName}</strong></div>
              </div>
              <div className="text-right">
                <div>Verification Code: <strong className="font-mono text-red-900">{selectedCert.verificationCode}</strong></div>
                <div className="text-emerald-700 font-bold flex items-center justify-end gap-1 mt-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Verified Authentic</span>
                </div>
              </div>
            </div>

            <div className="text-center pt-4">
              <button
                onClick={() => window.print()}
                className="bg-red-950 hover:bg-red-900 text-amber-200 font-bold text-xs px-6 py-2.5 rounded-xl shadow inline-flex items-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>Print Certificate</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
