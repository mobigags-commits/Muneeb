import React, { useState } from 'react';
import { Send, CheckCircle, Sparkles, BookOpen, CreditCard, Shield } from 'lucide-react';
import { useAcademy } from '../context/AcademyContext';

export const AdmissionsPage: React.FC = () => {
  const { siteSettings, courses, addStudent } = useAcademy();

  const [studentName, setStudentName] = useState('');
  const [guardianName, setGuardianName] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [selectedCourseId, setSelectedCourseId] = useState(courses[0]?.id || '');
  const [timeSlot, setTimeSlot] = useState('Evening (4 PM - 8 PM PKT)');
  const [submitted, setSubmitted] = useState(false);

  const selectedCourse = courses.find((c) => c.id === selectedCourseId) || courses[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName || !phone) return;

    addStudent({
      id: `s-${Date.now()}`,
      name: studentName,
      guardianName: guardianName || studentName,
      courseId: selectedCourseId,
      teacherId: 't1',
      attendanceRate: 100,
      progressPercent: 0,
      currentPara: 1,
      feeStatus: 'Pending',
      lastClassDate: new Date().toISOString().split('T')[0],
      joinDate: new Date().toISOString().split('T')[0],
    });

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
                  Class Schedule Preference
                </label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full bg-red-950/80 border border-red-700 text-amber-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-amber-400"
                >
                  <option>Morning Slot (8 AM - 12 PM PKT)</option>
                  <option>Afternoon Slot (12 PM - 4 PM PKT)</option>
                  <option>Evening Slot (4 PM - 8 PM PKT)</option>
                  <option>Night Slot (8 PM - 12 AM PKT)</option>
                </select>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <div className="text-xs text-emerald-300">
                Course Monthly Fee: <strong className="text-amber-300 text-sm">Rs. {selectedCourse.feePKR.toLocaleString()} PKR</strong> (${selectedCourse.feeUSD} USD)
              </div>
              <button
                type="submit"
                className="bg-amber-500 hover:bg-amber-400 text-red-950 font-extrabold text-xs px-8 py-3.5 rounded-xl shadow-lg flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Application</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
