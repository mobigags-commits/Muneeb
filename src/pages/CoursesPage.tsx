import React, { useState } from 'react';
import { BookOpen, CheckCircle, GraduationCap, Sparkles, Filter, CreditCard } from 'lucide-react';
import { useAcademy } from '../context/AcademyContext';
import { Course } from '../types';

export const CoursesPage: React.FC = () => {
  const { courses, setSelectedCourseForEnroll } = useAcademy();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedAudience, setSelectedAudience] = useState<string>('all');

  const filteredCourses = courses.filter((c) => {
    const matchCat = selectedCategory === 'all' || c.category === selectedCategory;
    const matchAud = selectedAudience === 'all' || c.targetAudience === selectedAudience;
    return matchCat && matchAud;
  });

  return (
    <div className="bg-red-950 text-white min-h-screen py-10 px-4 sm:px-6 lg:px-8 space-y-10">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Page Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-400/30">
            <GraduationCap className="w-4 h-4" />
            <span>Structured Islamic Learning</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-extrabold text-amber-100">
            All Quranic & Islamic Courses
          </h1>
          <p className="text-xs sm:text-sm text-red-200">
            Select a course tailored to your age, language preference, and learning goals. 1-on-1 personalized classes with flexible schedules.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="bg-red-900/60 border border-amber-500/30 rounded-2xl p-4 sm:p-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider">
            <Filter className="w-4 h-4 text-amber-400" />
            <span>Filter Courses:</span>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs">
            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-red-950 text-amber-200 border border-red-700 rounded-xl px-3 py-2 focus:outline-none focus:border-amber-400"
            >
              <option value="all">All Categories</option>
              <option value="qaida">Noorani Qaida</option>
              <option value="tajweed">Nazra & Tajweed</option>
              <option value="hifz">Hifz-ul-Quran</option>
              <option value="translation">Translation & Tafseer</option>
              <option value="ladies">Ladies Special</option>
              <option value="kids">Kids Islamic Studies</option>
              <option value="arabic">Arabic Language</option>
            </select>

            {/* Audience Filter */}
            <select
              value={selectedAudience}
              onChange={(e) => setSelectedAudience(e.target.value)}
              className="bg-red-950 text-amber-200 border border-red-700 rounded-xl px-3 py-2 focus:outline-none focus:border-amber-400"
            >
              <option value="all">All Target Audiences</option>
              <option value="Children">Children</option>
              <option value="Adults">Adults</option>
              <option value="Ladies">Ladies Only</option>
              <option value="Everyone">Everyone</option>
            </select>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-gradient-to-b from-red-900 to-red-950 border border-amber-500/30 rounded-2xl overflow-hidden shadow-xl hover:border-amber-400 transition-all flex flex-col justify-between group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-red-950 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 bg-red-950/90 text-amber-300 text-[10px] uppercase font-extrabold px-2.5 py-1 rounded-full border border-amber-500/40">
                  {course.targetAudience} • {course.level}
                </span>
                <span className="absolute bottom-3 right-3 bg-amber-500 text-red-950 text-xs font-bold px-3 py-1 rounded-full">
                  Rs. {course.feePKR.toLocaleString()} PKR / ${course.feeUSD} USD
                </span>
              </div>

              <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="font-serif font-bold text-xl text-amber-200">{course.title}</h3>
                  <p className="text-xs text-red-100/90 leading-relaxed">{course.description}</p>
                </div>

                {/* Features & Syllabus */}
                <div className="space-y-2 border-t border-red-800 pt-3 text-xs text-red-200">
                  <div className="font-bold text-amber-300">Key Highlights:</div>
                  <ul className="space-y-1">
                    {course.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => setSelectedCourseForEnroll(course)}
                    className="w-full bg-amber-500 hover:bg-amber-400 text-red-950 font-bold py-3 rounded-xl shadow-lg text-xs flex items-center justify-center gap-2"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Enroll Now (Free 3-Day Trial)</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
