import React, { useState } from 'react';
import { Briefcase, Send, CheckCircle, Award, Phone, Mail, MapPin, User, FileText, Sparkles } from 'lucide-react';
import { useAcademy } from '../context/AcademyContext';
import { TeacherApplication } from '../types';

export const CareersPage: React.FC = () => {
  const { siteSettings, addApplication } = useAcademy();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('Rawalpindi, Pakistan');
  const [gender, setGender] = useState<'Male' | 'Female'>('Male');
  const [qualification, setQualification] = useState('Shahadat-ul-Aalamiyyah (Alim / Alimah)');
  const [experienceYears, setExperienceYears] = useState('3-5 Years');
  const [bio, setBio] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedAppId, setSubmittedAppId] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim()) return;

    setIsSubmitting(true);
    const appId = `APP-${Date.now().toString().slice(-6)}`;
    const newApp: TeacherApplication = {
      id: appId,
      applicantName: fullName.trim(),
      fullName: fullName.trim(),
      phone: phone.trim(),
      email: email.trim() || undefined,
      city: city.trim(),
      gender,
      qualification,
      experienceYears,
      bio: bio.trim() || undefined,
      date: new Date().toISOString().split('T')[0],
      appliedDate: new Date().toISOString().split('T')[0],
      status: 'Pending Review',
    };

    await addApplication(newApp);
    setSubmittedAppId(appId);
    setIsSubmitting(false);
    setSubmitted(true);
  };

  const handleWhatsAppNotify = () => {
    const message = `Assalamu Alaikum Founder Muneeb Ur Rehman!\n\nI have submitted my official Teacher / Qari application on the Shaheen Al Zaitoon portal:\n\n• Application Ref: ${submittedAppId}\n• Name: ${fullName}\n• Gender: ${gender}\n• Qualification: ${qualification}\n• Experience: ${experienceYears}\n• Contact: ${phone}\n• City: ${city}\n\nPlease review my credentials for online Quran teaching audition. JazakAllah Khair!`;
    const cleanNumber = siteSettings.whatsappNumber.replace(/[^0-9]/g, '');
    const fullNumber = cleanNumber.startsWith('92') ? cleanNumber : `92${cleanNumber.replace(/^0/, '')}`;
    window.open(`https://wa.me/${fullNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="bg-red-950 text-white min-h-screen py-10 px-4 sm:px-6 lg:px-8 space-y-10">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-400/30">
            <Briefcase className="w-4 h-4 text-amber-400" />
            <span>Join Our Global Teaching Faculty</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-extrabold text-amber-100">
            Qari & Teacher Recruitment Desk
          </h1>
          <p className="text-xs sm:text-sm text-red-200 max-w-xl mx-auto leading-relaxed">
            We are actively hiring certified Male Qaris, Female Qarias, Huffaz, and Alimahs for international 1-on-1 online Quran teaching sessions.
          </p>
        </div>

        {submitted ? (
          <div className="bg-gradient-to-b from-red-900 to-amber-950 border-2 border-emerald-500/60 rounded-3xl p-8 text-center space-y-5 shadow-2xl">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border-2 border-emerald-400">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-serif font-bold text-amber-200">
              Application Saved in Academy Database!
            </h2>
            <div className="inline-block bg-red-950 px-4 py-1.5 rounded-full border border-amber-500/40 text-xs font-mono text-amber-300">
              Reference ID: {submittedAppId}
            </div>
            <p className="text-xs sm:text-sm text-red-100 max-w-md mx-auto leading-relaxed">
              JazakAllah Khair, <strong>{fullName}</strong>! Your application has been permanently registered in our central cloud system. Founder <strong>{siteSettings.ownerName}</strong> or the Academic Board will contact you at <strong>{phone}</strong> for an online recitation audition.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={handleWhatsAppNotify}
                className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-lg flex items-center justify-center gap-2"
              >
                <span>Notify Founder via WhatsApp</span>
              </button>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFullName('');
                  setPhone('');
                  setEmail('');
                  setBio('');
                }}
                className="w-full sm:w-auto bg-red-900/80 hover:bg-red-800 text-amber-300 text-xs px-6 py-3 rounded-xl border border-red-700"
              >
                Submit Another Application
              </button>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-gradient-to-b from-red-900 via-red-900 to-red-950 border-2 border-amber-500/40 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl"
          >
            <div className="border-b border-red-800 pb-3">
              <h3 className="text-lg font-serif font-bold text-amber-200 flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                <span>Instructor Credentials & Personal Details</span>
              </h3>
              <p className="text-xs text-red-200">
                All fields are securely transmitted and reviewed by the recruitment board.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-amber-200 mb-1">
                  Full Name (with Title) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Qari Hafiz Muhammad Zayd"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-red-950/80 border border-red-700 text-white rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-amber-200 mb-1">
                  WhatsApp Contact Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 03447956085"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-red-950/80 border border-red-700 text-white rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-amber-200 mb-1">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  placeholder="e.g. teacher@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-red-950/80 border border-red-700 text-white rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-amber-200 mb-1">
                  City & Country of Residence *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rawalpindi / Islamabad"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-red-950/80 border border-red-700 text-white rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-amber-200 mb-1">
                  Gender *
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value as any)}
                  className="w-full bg-red-950/80 border border-red-700 text-amber-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-amber-400"
                >
                  <option value="Male">Male Qari (For Male & Kids)</option>
                  <option value="Female">Female Qaria / Alimah (For Sisters & Kids)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-amber-200 mb-1">
                  Teaching Experience *
                </label>
                <select
                  value={experienceYears}
                  onChange={(e) => setExperienceYears(e.target.value)}
                  className="w-full bg-red-950/80 border border-red-700 text-amber-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-amber-400"
                >
                  <option>1-2 Years (Online or Madrasa)</option>
                  <option>3-5 Years (Professional)</option>
                  <option>5-10 Years (Senior Qari)</option>
                  <option>10+ Years (Master Instructor)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-amber-200 mb-1">
                Highest Islamic Academic Degree / Sanad *
              </label>
              <select
                value={qualification}
                onChange={(e) => setQualification(e.target.value)}
                className="w-full bg-red-950/80 border border-red-700 text-amber-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-amber-400"
              >
                <option>Shahadat-ul-Aalamiyyah (Dars-e-Nizami / HEC MA Islamic Studies)</option>
                <option>Hafiz-ul-Quran with Certified Tajweed Sanad</option>
                <option>Qira’at Saba’ah / Asharah Specialist</option>
                <option>Dars-e-Nizami Shahadat-ul-Aliyah</option>
                <option>Tafseer & Hadith Research Graduate</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-amber-200 mb-1">
                Brief Bio, Recitation Background & Internet Setup (Optional)
              </label>
              <textarea
                rows={3}
                placeholder="Mention your madrasa, internet connection stability, and available teaching hours..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full bg-red-950/80 border border-red-700 text-white rounded-xl p-3 text-xs focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-red-950 font-black text-xs px-8 py-3.5 rounded-xl shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="w-4 h-4 border-2 border-red-950 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                <span>{isSubmitting ? 'Registering Application in Database...' : 'Submit Faculty Application'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
