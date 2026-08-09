import React, { useState } from 'react';
import { Briefcase, Send, CheckCircle, Award } from 'lucide-react';

export const CareersPage: React.FC = () => {
  const [applicantName, setApplicantName] = useState('');
  const [qualification, setQualification] = useState('Shahadat-ul-Aalamiyyah');
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="bg-red-950 text-white min-h-screen py-10 px-4 sm:px-6 lg:px-8 space-y-10">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-400/30">
            <Briefcase className="w-4 h-4" />
            <span>Join Our Faculty</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-extrabold text-amber-100">
            Qari & Teacher Careers Application
          </h1>
          <p className="text-xs sm:text-sm text-red-200">
            We are hiring certified Male & Female Qaris, Huffaz, and Alimahs for online Quran teaching positions.
          </p>
        </div>

        {submitted ? (
          <div className="bg-gradient-to-b from-red-900 to-amber-950 border border-emerald-500/60 rounded-3xl p-8 text-center space-y-3">
            <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
            <h2 className="text-2xl font-serif font-bold text-amber-200">
              Application Submitted Successfully!
            </h2>
            <p className="text-xs text-red-100">
              Our academic board will review your credentials and schedule an online audition interview.
            </p>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="bg-gradient-to-b from-red-900 to-red-950 border border-amber-500/40 rounded-3xl p-6 space-y-4"
          >
            <div>
              <label className="block text-xs font-medium text-amber-200 mb-1">Full Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Qari Abdullah"
                value={applicantName}
                onChange={(e) => setApplicantName(e.target.value)}
                className="w-full bg-red-950/80 border border-red-700 text-white rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-amber-200 mb-1">Highest Islamic Qualification *</label>
              <select
                value={qualification}
                onChange={(e) => setQualification(e.target.value)}
                className="w-full bg-red-950/80 border border-red-700 text-amber-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-amber-400"
              >
                <option>Shahadat-ul-Aalamiyyah (Alim / Alimah)</option>
                <option>Hafiz-e-Quran with Tajweed Sanad</option>
                <option>Qira’at Hafs Specialist</option>
                <option>Islamic Studies Master</option>
              </select>
            </div>

            <button
              type="submit"
              className="bg-amber-500 hover:bg-amber-400 text-red-950 font-bold text-xs px-6 py-3 rounded-xl shadow flex items-center gap-1.5"
            >
              <Send className="w-4 h-4" />
              <span>Submit Teacher CV Application</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
