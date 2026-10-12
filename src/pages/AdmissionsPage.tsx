import React, { useState } from 'react';
import { Send, CheckCircle, Sparkles, BookOpen, CreditCard, Shield, Clock, Globe } from 'lucide-react';
import { useAcademy } from '../context/AcademyContext';

export const AdmissionsPage: React.FC = () => {
  const { siteSettings, courses, addStudent } = useAcademy();

  const [studentName, setStudentName] = useState('');
  const [guardianName, setGuardianName] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [selectedCourseId, setSelectedCourseId] = useState(courses[0]?.id || '');
  const [timeSlot, setTimeSlot] = useState('Shift 2: Evening Shift (04:00 PM – 12:00 AM PKT / 8 Hours)');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedCourse = courses.find((c) => c.id === selectedCourseId) || courses[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim() || !phone.trim()) return;

    setIsSubmitting(true);
    const newStudentId = `s-${Date.now()}`;
    await addStudent({
      id: newStudentId,
      name: studentName.trim(),
      guardianName: guardianName.trim() || studentName.trim(),
      courseId: selectedCourseId,
      teacherId: 't1',
      attendanceRate: 100,
      progressPercent: 0,
      currentPara: 1,
      feeStatus: 'Pending',
      lastClassDate: new Date().toISOString().split('T')[0],
      joinDate: new Date().toISOString().split('T')[0],
    });

    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className="bg-red-950 text-white min-h-screen py-10 px-4 sm:px-6 lg:px-8 space-y-10">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-400/30">
            <Sparkles className="w-4 h-4" />
            <span>3-Day Free Trial Available</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-extrabold text-amber-100">
            Online Quran Class Admission Form
          </h1>
          <p className="text-xs sm:text-sm text-red-200">
            Fill in the form below to enroll yourself or your child. Our admission manager will reach out via WhatsApp for trial scheduling.
          </p>

          {/* 3 SHIFTS OF 8 HOURS INFO CALLOUT */}
          <div className="bg-gradient-to-r from-red-900/80 via-amber-950/80 to-blue-950/80 border-2 border-amber-500/40 rounded-2xl p-4 text-center max-w-2xl mx-auto shadow-lg space-y-2">
            <div className="flex items-center justify-center gap-2 text-amber-300 font-bold text-xs uppercase tracking-wider">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>24/7 Global Timing • اکیڈمی میں 8 گھنٹے کی 3 شفٹس</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] pt-1">
              <div className="bg-red-950/80 rounded-lg p-2 border border-red-800">
                <strong className="text-amber-200 block">شفٹ 1: صبح (8 گھنٹے)</strong>
                <span className="text-red-200">08:00 AM – 04:00 PM PKT</span>
                <span className="text-emerald-400 block text-[10px]">بچے، ہوم اسکولنگ و خواتین</span>
              </div>
              <div className="bg-red-950/80 rounded-lg p-2 border border-emerald-500/40">
                <strong className="text-emerald-300 block">شفٹ 2: شام (8 گھنٹے)</strong>
                <span className="text-white">04:00 PM – 12:00 AM PKT</span>
                <span className="text-emerald-400 block text-[10px]">پاکستان سکول و برطانیہ (UK)</span>
              </div>
              <div className="bg-red-950/80 rounded-lg p-2 border border-blue-400/40">
                <strong className="text-blue-300 block">شفٹ 3: رات (8 گھنٹے)</strong>
                <span className="text-white">12:00 AM – 08:00 AM PKT</span>
                <span className="text-blue-200 block text-[10px]">امریکہ (USA) و کینیڈا</span>
              </div>
            </div>
          </div>
        </div>

        {submitted ? (
          <div className="bg-gradient-to-b from-red-900 to-amber-950 border-2 border-emerald-500/60 rounded-3xl p-8 text-center space-y-4 shadow-2xl">
            <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto" />
            <h2 className="text-2xl font-serif font-bold text-amber-200">
              Admission Form Submitted Successfully!
            </h2>
            <p className="text-sm text-red-100 max-w-lg mx-auto leading-relaxed">
              JazakAllah Khair! Founder <strong>{siteSettings.ownerName}</strong> or our Rawalpindi Head Office team will contact you on WhatsApp (<strong>{phone}</strong>) within 2 hours.
            </p>

            <div className="p-4 bg-red-950 border border-amber-500/40 rounded-2xl text-left text-xs space-y-2">
              <div className="text-amber-300 font-bold">EasyPaisa Fee Information:</div>
              <div>• Account Title: <strong>{siteSettings.easyPaisaAccountTitle}</strong></div>
              <div>• EasyPaisa Account Number: <strong className="text-emerald-400 font-mono text-sm">{siteSettings.easyPaisaAccountNumber}</strong></div>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-gradient-to-b from-red-900 via-red-900 to-red-950 border-2 border-amber-500/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-amber-200 mb-1">
                  Student Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Zayd Muneeb"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full bg-red-950/80 border border-red-700 text-white rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-amber-200 mb-1">
                  Father / Guardian Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Muneeb Ur Rehman"
                  value={guardianName}
                  onChange={(e) => setGuardianName(e.target.value)}
                  className="w-full bg-red-950/80 border border-red-700 text-white rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-amber-200 mb-1">
                  WhatsApp Number *
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
                  Select Course *
                </label>
                <select
                  value={selectedCourseId}
                  onChange={(e) => setSelectedCourseId(e.target.value)}
                  className="w-full bg-red-950/80 border border-red-700 text-amber-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-amber-400"
                >
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title} (Rs. {c.feePKR.toLocaleString()} PKR)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-amber-200 mb-1">
                  Gender Preference
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value as any)}
                  className="w-full bg-red-950/80 border border-red-700 text-amber-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-amber-400"
                >
                  <option value="male">Male (Male Teacher)</option>
                  <option value="female">Female (Female Qaria Teacher)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-amber-200 mb-1">
                  Class Schedule Preference (اکیڈمی میں 8 گھنٹے کی 3 شفٹس) *
                </label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full bg-red-950/80 border border-red-700 text-amber-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-amber-400 font-medium"
                >
                  <option value="Shift 1: Morning Shift (08:00 AM – 04:00 PM PKT • 8h / 1h Break 1-2 PM)">
                    شفٹ 1: صبح کی شفٹ (08:00 AM – 04:00 PM PKT • 1 گھنٹہ وقفہ 1 تا 2 PM)
                  </option>
                  <option value="Shift 2: Evening Shift (04:00 PM – 12:00 AM PKT • 8h / 1h Break 7:30-8:30 PM)">
                    شفٹ 2: شام کی شفٹ (04:00 PM – 12:00 AM PKT • 1 گھنٹہ وقفہ 7:30 تا 8:30 PM)
                  </option>
                  <option value="Shift 3: Night / Overseas Shift (12:00 AM – 08:00 AM PKT • 8h / 1h Break 3:30-4:30 AM)">
                    شفٹ 3: رات و اوورسیز شفٹ (12:00 AM – 08:00 AM PKT • 1 گھنٹہ وقفہ 3:30 تا 4:30 AM)
                  </option>
                </select>
                <div className="text-[10px] text-emerald-300 mt-1">
                  ✓ 24 گھنٹے نان اسٹاپ تدریس: 8 گھنٹے کی 3 شفٹس (ہر شفٹ میں 1 گھنٹہ نماز و طعام کے وقفے کے ساتھ 7 گھنٹے کلاسز دستیاب ہیں)۔
                </div>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-emerald-300">
                Course Monthly Fee: <strong className="text-amber-300 text-sm">Rs. {selectedCourse.feePKR.toLocaleString()} PKR</strong> (${selectedCourse.feeUSD} USD)
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-red-950 font-extrabold text-xs px-8 py-3.5 rounded-xl shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="w-4 h-4 border-2 border-red-950 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                <span>{isSubmitting ? 'Saving Admission Record...' : 'Submit Admission Application'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
