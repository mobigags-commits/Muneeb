import React, { useState } from 'react';
import { X, CheckCircle, CreditCard, Send, Sparkles, BookOpen, User } from 'lucide-react';
import { useAcademy } from '../context/AcademyContext';
import { Course } from '../types';

export const EnrollmentModal: React.FC = () => {
  const { selectedCourseForEnroll, setSelectedCourseForEnroll, siteSettings, addStudent, addPayment } = useAcademy();

  const [studentName, setStudentName] = useState('');
  const [guardianName, setGuardianName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [phone, setPhone] = useState('');
  const [cityCountry, setCityCountry] = useState('');
  const [preferredTime, setPreferredTime] = useState('Morning (8 AM - 12 PM)');
  const [paymentMethod, setPaymentMethod] = useState<'EasyPaisa' | 'Bank Transfer'>('EasyPaisa');
  const [submitted, setSubmitted] = useState(false);

  if (!selectedCourseForEnroll) return null;

  const course: Course = selectedCourseForEnroll;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName || !phone) return;

    // Create student record
    const newStudentId = `s-${Date.now()}`;
    addStudent({
      id: newStudentId,
      name: studentName,
      guardianName: guardianName || studentName,
      courseId: course.id,
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-red-950 via-red-900 to-red-950 border-2 border-amber-500/60 rounded-2xl shadow-2xl overflow-hidden text-white my-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-900 via-amber-950 to-red-900 p-6 border-b border-amber-500/40 flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Online Quran Admission</span>
            </div>
            <h3 className="text-xl font-serif font-bold text-amber-200">
              Enroll in {course.title}
            </h3>
          </div>
          <button
            onClick={() => {
              setSelectedCourseForEnroll(null);
              setSubmitted(false);
            }}
            className="p-2 rounded-lg bg-red-900/80 hover:bg-red-800 text-amber-300 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border-2 border-emerald-400">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-serif font-bold text-amber-200">
                JazakAllah Khair! Application Received
              </h4>
              <p className="text-sm text-red-100 max-w-md mx-auto leading-relaxed">
                Welcome to <strong>Shaheen Al Zaitoon Quran Academy</strong>. Founder <strong>{siteSettings.ownerName}</strong> or our admission team will contact you shortly on WhatsApp (<strong>{phone}</strong>) for your free trial class setup.
              </p>

              {/* EasyPaisa Payment Fee Instructions Box */}
              <div className="bg-red-950/90 border-2 border-amber-500/60 rounded-xl p-5 text-left space-y-3">
                <div className="flex items-center gap-2 text-amber-300 font-serif font-bold text-base">
                  <CreditCard className="w-5 h-5 text-emerald-400" />
                  <span>EasyPaisa Fee Payment Instructions</span>
                </div>
                <div className="text-xs space-y-1 text-red-100">
                  <p>
                    • Course Monthly Fee: <strong className="text-amber-300">Rs. {course.feePKR.toLocaleString()} PKR</strong> (or <strong className="text-amber-300">${course.feeUSD} USD</strong> for international)
                  </p>
                  <p>
                    • EasyPaisa Account Title: <strong className="text-white font-bold">{siteSettings.easyPaisaAccountTitle}</strong>
                  </p>
                  <p>
                    • EasyPaisa Mobile Number: <strong className="text-emerald-400 font-mono font-bold text-sm">{siteSettings.easyPaisaAccountNumber}</strong>
                  </p>
                  <p>
                    • After sending payment via EasyPaisa app or agent, please share transaction ID / screenshot on WhatsApp: <strong className="text-emerald-300">{siteSettings.whatsappNumber}</strong>
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedCourseForEnroll(null);
                  setSubmitted(false);
                }}
                className="bg-amber-500 hover:bg-amber-400 text-red-950 font-bold px-6 py-2.5 rounded-xl shadow-lg transition-colors"
              >
                Close & Return to Website
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="bg-red-900/40 p-3 rounded-xl border border-amber-500/20 flex items-center justify-between text-xs">
                <div>
                  <span className="text-red-300">Selected Course:</span>{' '}
                  <strong className="text-amber-200">{course.title}</strong>
                </div>
                <div>
                  <span className="text-red-300">Fee:</span>{' '}
                  <strong className="text-emerald-400">Rs. {course.feePKR.toLocaleString()} PKR / ${course.feeUSD} USD</strong>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-amber-200 mb-1">
                    Student Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Zayd Rehman"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="w-full bg-red-900/80 border border-red-700 text-white rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-amber-200 mb-1">
                    Father / Guardian Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Muneeb Rehman"
                    value={guardianName}
                    onChange={(e) => setGuardianName(e.target.value)}
                    className="w-full bg-red-900/80 border border-red-700 text-white rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-amber-200 mb-1">
                    WhatsApp & Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 03447956085"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-red-900/80 border border-red-700 text-white rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-amber-200 mb-1">
                    Age & Gender
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Age"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      className="w-20 bg-red-900/80 border border-red-700 text-white rounded-lg px-2 py-2 text-xs focus:outline-none focus:border-amber-400"
                    />
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value as any)}
                      className="flex-1 bg-red-900/80 border border-red-700 text-amber-200 rounded-lg px-2 py-2 text-xs focus:outline-none focus:border-amber-400"
                    >
                      <option value="male">Male (Male Teacher)</option>
                      <option value="female">Female (Female Teacher)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-amber-200 mb-1">
                    City & Country
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Rawalpindi, Pakistan / London, UK"
                    value={cityCountry}
                    onChange={(e) => setCityCountry(e.target.value)}
                    className="w-full bg-red-900/80 border border-red-700 text-white rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-amber-200 mb-1">
                    Preferred Class Time Slot
                  </label>
                  <select
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className="w-full bg-red-900/80 border border-red-700 text-amber-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-amber-400"
                  >
                    <option>Morning (8 AM - 12 PM PKT)</option>
                    <option>Afternoon (12 PM - 4 PM PKT)</option>
                    <option>Evening (4 PM - 8 PM PKT)</option>
                    <option>Night (8 PM - 12 AM PKT)</option>
                    <option>UK / Europe Timezone</option>
                    <option>USA / Canada Timezone</option>
                    <option>Gulf / Middle East Timezone</option>
                  </select>
                </div>
              </div>

              {/* Fee Payment Method Selection */}
              <div className="pt-2">
                <label className="block text-xs font-medium text-amber-200 mb-1">
                  Select Fee Payment Mode
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('EasyPaisa')}
                    className={`p-3 rounded-xl border text-xs text-left transition-all ${
                      paymentMethod === 'EasyPaisa'
                        ? 'bg-emerald-950 border-emerald-400 text-emerald-300 font-bold'
                        : 'bg-red-900/50 border-red-800 text-red-200'
                    }`}
                  >
                    <div className="font-bold flex items-center justify-between">
                      <span>EasyPaisa (Pakistan)</span>
                      <span className="text-[10px] bg-emerald-500 text-white px-1.5 py-0.5 rounded">03447956085</span>
                    </div>
                    <div className="text-[11px] text-red-300 mt-1">Title: {siteSettings.easyPaisaAccountTitle}</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('Bank Transfer')}
                    className={`p-3 rounded-xl border text-xs text-left transition-all ${
                      paymentMethod === 'Bank Transfer'
                        ? 'bg-amber-950 border-amber-400 text-amber-300 font-bold'
                        : 'bg-red-900/50 border-red-800 text-red-200'
                    }`}
                  >
                    <div className="font-bold">Meezan Bank / Wire</div>
                    <div className="text-[11px] text-red-300 mt-1">IBAN / Overseas Transfer</div>
                  </button>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedCourseForEnroll(null)}
                  className="px-4 py-2 text-xs text-red-300 hover:text-white"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-300 hover:to-amber-500 text-red-950 font-extrabold text-xs px-6 py-2.5 rounded-xl shadow-lg border border-amber-200 flex items-center gap-1.5"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Admission & Get Free Trial</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
