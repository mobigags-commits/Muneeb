import React from 'react';
import { UserCheck, BookOpen, Calendar, Award, Clock, FileText, CheckCircle, Video, Play } from 'lucide-react';
import { useAcademy } from '../context/AcademyContext';

export const StudentPortalPage: React.FC = () => {
  const { students, courses, teachers, setActivePage } = useAcademy();
  const currentStudent = students[0]; // Active demo student
  const currentCourse = courses.find((c) => c.id === currentStudent?.courseId) || courses[0];
  const currentTeacher = teachers.find((t) => t.id === currentStudent?.teacherId) || teachers[0];

  return (
    <div className="bg-red-950 text-white min-h-screen py-10 px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-red-900 via-amber-950 to-red-900 border-2 border-amber-500/50 rounded-2xl p-6 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-500 text-red-950 font-bold flex items-center justify-center text-2xl font-serif">
              {currentStudent.name.charAt(0)}
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-amber-300 font-bold">
                Student Portal • ID: {currentStudent.id}
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-amber-100">
                Welcome, {currentStudent.name}
              </h1>
              <p className="text-xs text-red-200">
                Guardian: {currentStudent.guardianName} • Enrolled since {currentStudent.joinDate}
              </p>
            </div>
          </div>

          <button
            onClick={() => setActivePage('live-classes')}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 transform hover:scale-105 transition-all"
          >
            <Video className="w-4 h-4" />
            <span>Join Live Virtual Class</span>
          </button>
        </div>

        {/* Dashboard Metric Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-red-900/60 border border-amber-500/30 rounded-2xl p-5 space-y-1">
            <div className="text-xs text-red-300">Active Course</div>
            <div className="text-lg font-bold font-serif text-amber-200">{currentCourse.title}</div>
            <div className="text-[11px] text-amber-300">Teacher: {currentTeacher.name}</div>
          </div>

          <div className="bg-red-900/60 border border-amber-500/30 rounded-2xl p-5 space-y-1">
            <div className="text-xs text-red-300">Current Progress</div>
            <div className="text-2xl font-bold font-serif text-amber-200">Juz / Para {currentStudent.currentPara}</div>
            <div className="w-full bg-red-950 rounded-full h-2 mt-2 border border-red-800">
              <div
                className="bg-amber-400 h-2 rounded-full"
                style={{ width: `${currentStudent.progressPercent}%` }}
              />
            </div>
          </div>

          <div className="bg-red-900/60 border border-amber-500/30 rounded-2xl p-5 space-y-1">
            <div className="text-xs text-red-300">Attendance Rate</div>
            <div className="text-2xl font-bold font-serif text-emerald-400">{currentStudent.attendanceRate}%</div>
            <div className="text-[11px] text-emerald-300">Regular & Punctual</div>
          </div>

          <div className="bg-red-900/60 border border-amber-500/30 rounded-2xl p-5 space-y-1">
            <div className="text-xs text-red-300">Fee Payment Status</div>
            <div className="text-lg font-bold text-emerald-400 flex items-center gap-1">
              <CheckCircle className="w-4 h-4" />
              <span>{currentStudent.feeStatus}</span>
            </div>
            <button
              onClick={() => setActivePage('fee-payment')}
              className="text-[11px] text-amber-300 hover:underline font-bold"
            >
              EasyPaisa Receipt Portal →
            </button>
          </div>
        </div>

        {/* Schedule & Syllabus Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-red-900/60 border border-amber-500/30 rounded-2xl p-6 space-y-4">
            <h3 className="font-serif font-bold text-lg text-amber-200 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-amber-400" />
              <span>Upcoming Class Schedule</span>
            </h3>
            <div className="space-y-3 text-xs">
              <div className="p-3 bg-red-950/80 rounded-xl border border-red-800 flex justify-between items-center">
                <div>
                  <div className="font-bold text-white">Next Lesson: Makharij & Ghunnah Rules</div>
                  <div className="text-red-300">Teacher: {currentTeacher.name}</div>
                </div>
                <div className="text-amber-300 font-mono font-bold">Today, 5:00 PM PKT</div>
              </div>
              <div className="p-3 bg-red-950/80 rounded-xl border border-red-800 flex justify-between items-center">
                <div>
                  <div className="font-bold text-white">Daily Hifz Revision (Manzil)</div>
                  <div className="text-red-300">Para 21-22 Revision</div>
                </div>
                <div className="text-amber-300 font-mono font-bold">Tomorrow, 5:00 PM PKT</div>
              </div>
            </div>
          </div>

          <div className="bg-red-900/60 border border-amber-500/30 rounded-2xl p-6 space-y-4">
            <h3 className="font-serif font-bold text-lg text-amber-200 flex items-center gap-2">
              <FileText className="w-5 h-5 text-amber-400" />
              <span>Study Notes & Tajweed PDF Material</span>
            </h3>
            <div className="space-y-2 text-xs">
              <div className="p-3 bg-red-950/80 rounded-xl border border-red-800 flex justify-between items-center">
                <span>Noorani Qaida Color-Coded Chart.pdf</span>
                <button className="text-amber-300 hover:underline font-bold">Download PDF</button>
              </div>
              <div className="p-3 bg-red-950/80 rounded-xl border border-red-800 flex justify-between items-center">
                <span>40 Masnoon Duas with Translation.pdf</span>
                <button className="text-amber-300 hover:underline font-bold">Download PDF</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
