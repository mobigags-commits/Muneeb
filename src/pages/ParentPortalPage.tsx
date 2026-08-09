import React from 'react';
import { Shield, UserCheck, Calendar, CheckCircle, FileText, MessageSquare } from 'lucide-react';
import { useAcademy } from '../context/AcademyContext';

export const ParentPortalPage: React.FC = () => {
  const { students, siteSettings, setActivePage } = useAcademy();

  return (
    <div className="bg-red-950 text-white min-h-screen py-10 px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="bg-gradient-to-r from-red-900 via-amber-950 to-red-900 border-2 border-amber-500/50 rounded-2xl p-6 shadow-2xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-400/30">
            <Shield className="w-3.5 h-3.5" />
            <span>Parent & Guardian Oversight Portal</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-serif font-bold text-amber-100">
            Track Children Progress & Fee Status
          </h1>
          <p className="text-xs sm:text-sm text-red-200">
            Monitor class attendance, teacher feedback, quarterly grade reports, and EasyPaisa fee records.
          </p>
        </div>

        {/* Linked Children Cards */}
        <div className="space-y-4">
          <h2 className="text-xl font-serif font-bold text-amber-200">Linked Children</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {students.slice(0, 2).map((s) => (
              <div
                key={s.id}
                className="bg-red-900/60 border border-amber-500/30 rounded-2xl p-6 space-y-4 shadow-xl"
              >
                <div className="flex items-center justify-between border-b border-red-800 pb-3">
                  <div>
                    <h3 className="font-serif font-bold text-lg text-amber-200">{s.name}</h3>
                    <div className="text-xs text-red-300">Guardian: {s.guardianName}</div>
                  </div>
                  <span className="bg-emerald-500/20 text-emerald-300 text-xs px-2.5 py-1 rounded-full border border-emerald-400/30 font-bold">
                    {s.feeStatus}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-red-950/80 rounded-xl border border-red-800">
                    <div className="text-red-300">Attendance</div>
                    <div className="text-xl font-bold text-amber-300 font-serif">{s.attendanceRate}%</div>
                  </div>
                  <div className="p-3 bg-red-950/80 rounded-xl border border-red-800">
                    <div className="text-red-300">Current Para</div>
                    <div className="text-xl font-bold text-amber-300 font-serif">Para {s.currentPara}</div>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs">
                  <button
                    onClick={() => setActivePage('fee-payment')}
                    className="text-amber-300 hover:underline font-bold"
                  >
                    Pay Fee via EasyPaisa →
                  </button>
                  <a
                    href={`https://wa.me/92${siteSettings.whatsappNumber.replace(/^0/, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-400 hover:underline flex items-center gap-1 font-bold"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Teacher WhatsApp</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
