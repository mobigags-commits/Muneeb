import React, { useState } from 'react';
import { BookOpen, CheckCircle, GraduationCap, Sparkles, Filter, Calendar, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { useAcademy } from '../context/AcademyContext';
import { Course } from '../types';
import {
  WeeklyClassFrequency,
  WEEKLY_CLASS_PLANS,
  calculateWeeklyFee,
  getAllWeeklyPlansForCourse,
} from '../utils/weeklyPlanPricing';

export const CoursesPage: React.FC = () => {
  const { courses, setSelectedCourseForEnroll } = useAcademy();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedAudience, setSelectedAudience] = useState<string>('all');
  const [selectedFrequency, setSelectedFrequency] = useState<WeeklyClassFrequency>(5);
  const [expandedCoursePlanId, setExpandedCoursePlanId] = useState<string | null>(null);

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
            Select a course tailored to your age, language preference, and learning goals. 1-on-1 personalized classes with flexible 1 to 6 days weekly schedules.
          </p>
        </div>

        {/* Weekly Class Frequency Selector Bar */}
        <div className="bg-gradient-to-r from-red-900 via-amber-950 to-red-900 border-2 border-amber-500/40 rounded-2xl p-5 shadow-xl space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-emerald-400" />
              <div>
                <span className="font-serif font-bold text-amber-200 text-sm sm:text-base">
                  Choose Weekly Class Schedule (ہفتہ وار کلاسز کا انتخاب کریں):
                </span>
                <p className="text-[11px] text-red-200">
                  Select 1, 2, 3, 4, 5, or 6 days/week. Course fees below automatically adjust in both USD ($) and PKR (Rs.).
                </p>
              </div>
            </div>
            <div className="text-[11px] font-bold text-amber-300 bg-red-950/80 px-3 py-1 rounded-full border border-amber-500/30 self-start sm:self-center">
              Active: {selectedFrequency} {selectedFrequency === 1 ? 'Class' : 'Classes'} / Week ({selectedFrequency * 4} Classes/mo)
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {WEEKLY_CLASS_PLANS.map((plan) => {
              const isSelected = selectedFrequency === plan.daysPerWeek;
              return (
                <button
                  key={plan.daysPerWeek}
                  type="button"
                  onClick={() => setSelectedFrequency(plan.daysPerWeek)}
                  className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-between ${
                    isSelected
                      ? 'bg-amber-500 text-red-950 border-amber-300 font-extrabold shadow-lg scale-102 ring-2 ring-amber-300/50'
                      : 'bg-red-950/70 border-red-800 text-red-100 hover:border-amber-500/60 hover:bg-red-900/60'
                  }`}
                >
                  <span className="text-xs font-black">
                    {plan.daysPerWeek} {plan.daysPerWeek === 1 ? 'Class' : 'Classes'} / Wk
                  </span>
                  <span className={`text-[10px] mt-0.5 ${isSelected ? 'text-red-900 font-bold' : 'text-red-300'}`}>
                    {plan.classesPerMonth} classes / month
                  </span>
                  {plan.badge && (
                    <span
                      className={`text-[9px] mt-1.5 px-2 py-0.5 rounded-full font-bold uppercase ${
                        isSelected
                          ? 'bg-red-950 text-amber-300'
                          : 'bg-red-900 text-amber-200 border border-amber-500/30'
                      }`}
                    >
                      {plan.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
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
          {filteredCourses.map((course) => {
            const planPricing = calculateWeeklyFee(course.feePKR, course.feeUSD, selectedFrequency);
            const allPlans = getAllWeeklyPlansForCourse(course.feePKR, course.feeUSD);
            const isExpanded = expandedCoursePlanId === course.id;

            return (
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
                  <div className="absolute bottom-3 right-3 bg-amber-500 text-red-950 text-xs font-black px-3 py-1.5 rounded-xl shadow-lg flex flex-col items-end">
                    <span>Rs. {planPricing.feePKR.toLocaleString()} PKR / ${planPricing.feeUSD} USD</span>
                    <span className="text-[9px] font-bold text-red-900">
                      {selectedFrequency} {selectedFrequency === 1 ? 'day' : 'days'}/wk ({planPricing.classesPerMonth} classes/mo)
                    </span>
                  </div>
                </div>

                <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="font-serif font-bold text-xl text-amber-200">{course.title}</h3>
                    <p className="text-xs text-red-100/90 leading-relaxed">{course.description}</p>
                  </div>

                  {/* Frequency Fee Comparison Quick Bar */}
                  <div className="bg-red-950/90 border border-red-800/80 rounded-xl p-3 space-y-2">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-amber-300 font-bold flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Monthly Fee for {selectedFrequency} {selectedFrequency === 1 ? 'Class' : 'Classes'}/Wk:</span>
                      </span>
                      <span className="font-extrabold text-amber-200">
                        {planPricing.classesPerMonth} Classes
                      </span>
                    </div>

                    <div className="flex items-baseline justify-between pt-1 border-t border-red-800/40">
                      <div>
                        <span className="text-lg font-serif font-black text-amber-300">
                          Rs. {planPricing.feePKR.toLocaleString()}
                        </span>
                        <span className="text-[10px] text-red-300 ml-1">PKR</span>
                      </div>
                      <div className="text-right">
                        <span className="text-base font-serif font-black text-emerald-400">
                          ${planPricing.feeUSD}
                        </span>
                        <span className="text-[10px] text-red-300 ml-1">USD</span>
                      </div>
                    </div>

                    {/* Expand All 1 to 6 Plans Button */}
                    <button
                      type="button"
                      onClick={() => setExpandedCoursePlanId(isExpanded ? null : course.id)}
                      className="w-full mt-1 pt-1.5 border-t border-red-800/50 flex items-center justify-between text-[10px] font-bold text-amber-300 hover:text-amber-200"
                    >
                      <span>{isExpanded ? 'Hide 1-6 Days Fee Breakdown' : 'View All 1 to 6 Classes/Week Rates'}</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>

                    {isExpanded && (
                      <div className="pt-2 space-y-1 border-t border-red-800/60">
                        <div className="text-[10px] text-amber-200 font-bold mb-1">
                          Full 1 to 6 Days/Week Fee Distribution:
                        </div>
                        <div className="grid grid-cols-2 gap-1 text-[10px]">
                          {allPlans.map((p) => (
                            <div
                              key={p.daysPerWeek}
                              className={`p-1.5 rounded-lg border flex flex-col justify-between ${
                                selectedFrequency === p.daysPerWeek
                                  ? 'bg-amber-500/20 border-amber-400 text-white font-bold'
                                  : 'bg-red-900/40 border-red-800 text-red-200'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-bold">{p.daysPerWeek} {p.daysPerWeek === 1 ? 'Day' : 'Days'}/wk</span>
                                <span className="text-[9px] text-red-300">({p.classesPerMonth} cls)</span>
                              </div>
                              <div className="flex items-center justify-between mt-0.5">
                                <span className="text-emerald-300 font-bold">Rs. {p.feePKR.toLocaleString()}</span>
                                <span className="text-amber-300 font-bold">${p.feeUSD}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
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
            );
          })}
        </div>
      </div>
    </div>
  );
};
