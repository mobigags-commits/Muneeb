import React, { useState } from 'react';
import { Award, Star, CheckCircle, MessageSquare, Shield, Sparkles } from 'lucide-react';
import { useAcademy } from '../context/AcademyContext';

export const TeachersPage: React.FC = () => {
  const { teachers, setSelectedCourseForEnroll, courses, setActivePage } = useAcademy();
  const [filterGender, setFilterGender] = useState<'all' | 'male' | 'female'>('all');

  const filteredTeachers = teachers.filter((t) => filterGender === 'all' || t.gender === filterGender);

  return (
    <div className="bg-red-950 text-white min-h-screen py-10 px-4 sm:px-6 lg:px-8 space-y-10">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-400/30">
            <Award className="w-4 h-4" />
            <span>Certified Faculty</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-extrabold text-amber-100">
            Our Certified Qaris & Scholars
          </h1>
          <p className="text-xs sm:text-sm text-red-200">
            Learn directly from certified Huffaz, Alims, and Qarias holding Sanad certifications in Qira’at Hafs and Islamic theology.
          </p>
        </div>

        {/* TEACHERS RECRUITMENT CALLOUT BANNER - MINIMUM RS. 50,000 SALARY */}
        <div className="bg-gradient-to-r from-emerald-950 via-amber-950/80 to-emerald-950 border-2 border-emerald-400/80 rounded-2xl p-4 sm:p-5 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-emerald-400 text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Wanted: Qualified Male & Female Quran Instructors</span>
            </div>
            <h3 className="text-lg sm:text-xl font-serif font-black text-white">
              Join Our Teaching Faculty • شروع میں تمام اساتذہ کی تنخواہ 50,000 روپے (وقت کے ساتھ اضافہ)
            </h3>
            <p className="text-xs text-red-100 max-w-2xl">
              اکیڈمی کے باقاعدہ قانون کے مطابق، <strong>شروع میں تمام اساتذہ کی ماہانہ تنخواہ 50,000 روپے ہو گی</strong>۔ بعد میں وقت، تدریسی مدت اور کارکردگی کے ساتھ تنخواہ میں سالانہ اور ششماہی اضافہ کیا جاتا ہے۔
            </p>
          </div>

          <button
            onClick={() => setActivePage('teacher-portal')}
            className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-black text-xs sm:text-sm px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 shrink-0 cursor-pointer transform hover:scale-105 transition-all"
          >
            <Award className="w-4 h-4 text-amber-300" />
            <span>Open Teachers Portal (تنخواہ 50,000+)</span>
          </button>
        </div>

        {/* Gender Filter Buttons */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => setFilterGender('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              filterGender === 'all'
                ? 'bg-amber-500 text-red-950 shadow-lg'
                : 'bg-red-900/60 text-red-200 border border-red-800'
            }`}
          >
            All Teachers ({teachers.length})
          </button>
          <button
            onClick={() => setFilterGender('male')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              filterGender === 'male'
                ? 'bg-amber-500 text-red-950 shadow-lg'
                : 'bg-red-900/60 text-red-200 border border-red-800'
            }`}
          >
            Male Qaris
          </button>
          <button
            onClick={() => setFilterGender('female')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              filterGender === 'female'
                ? 'bg-amber-500 text-red-950 shadow-lg'
                : 'bg-red-900/60 text-red-200 border border-red-800'
            }`}
          >
            Female Qarias (for Sisters & Girls)
          </button>
        </div>

        {/* Teacher Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTeachers.map((teacher) => (
            <div
              key={teacher.id}
              className="bg-gradient-to-b from-red-900 to-red-950 border border-amber-500/30 rounded-2xl overflow-hidden shadow-xl p-6 space-y-4 hover:border-amber-400 transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <img
                    src={teacher.image}
                    alt={teacher.name}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-amber-400 shadow-md shrink-0"
                  />
                  <div>
                    <h3 className="font-serif font-bold text-lg text-amber-200">{teacher.name}</h3>
                    <div className="text-xs text-amber-300 font-semibold">{teacher.title}</div>
                    <div className="flex items-center gap-1 text-xs text-amber-400 pt-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{teacher.rating}</span>
                      <span className="text-red-300">({teacher.reviewsCount} reviews)</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-red-100/90 leading-relaxed italic border-t border-b border-red-800/80 py-2">
                  &quot;{teacher.bio}&quot;
                </p>

                <div className="text-xs space-y-1.5 text-red-200">
                  <div>
                    <strong className="text-amber-300">Qualification:</strong> {teacher.qualification}
                  </div>
                  <div>
                    <strong className="text-amber-300">Experience:</strong> {teacher.experience}
                  </div>
                  <div>
                    <strong className="text-amber-300">Specialization:</strong> {teacher.specialization}
                  </div>
                  <div>
                    <strong className="text-amber-300">Languages:</strong> {teacher.languages.join(', ')}
                  </div>
                  <div className="pt-2 border-t border-red-800/60 mt-2 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-emerald-300 font-semibold flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                        Starting Salary (ابتدائی تنخواہ):
                      </span>
                      <span className="text-[11px] font-bold text-amber-300 bg-amber-950/70 border border-amber-500/40 px-2 py-0.5 rounded">
                        Rs. 50,000 PKR / mo
                      </span>
                    </div>
                    <div className="text-[10px] text-emerald-400/90 text-right font-medium">
                      ★ وقت اور کارکردگی کے ساتھ سالانہ اضافہ
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => setSelectedCourseForEnroll(courses[0])}
                  className="w-full bg-amber-500 hover:bg-amber-400 text-red-950 font-bold py-2.5 rounded-xl text-xs shadow flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Book Free Trial with {teacher.name.split(' ')[1] || teacher.name}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
