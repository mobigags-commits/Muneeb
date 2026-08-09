import React, { useState } from 'react';
import { Video, Mic, MicOff, Volume2, BookOpen, Users, Play, MessageSquare, CheckCircle } from 'lucide-react';
import { useAcademy } from '../context/AcademyContext';

export const LiveClassesPage: React.FC = () => {
  const { courses, teachers } = useAcademy();
  const [micMuted, setMicMuted] = useState(false);
  const [activeBoardTab, setActiveBoardTab] = useState<'qaida' | 'tajweed' | 'quran'>('qaida');

  return (
    <div className="bg-red-950 text-white min-h-screen py-10 px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-red-800 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-1">
              ● Live Studio Active
            </div>
            <h1 className="text-2xl sm:text-4xl font-serif font-bold text-amber-100">
              Virtual Classroom Studio
            </h1>
            <p className="text-xs text-red-200">
              1-on-1 Interactive Tajweed & Quran Recitation Environment with High-Definition Audio.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setMicMuted(!micMuted)}
              className={`p-3 rounded-xl border font-bold text-xs flex items-center gap-2 ${
                micMuted ? 'bg-red-800 border-red-600 text-red-200' : 'bg-emerald-600 border-emerald-500 text-white'
              }`}
            >
              {micMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              <span>{micMuted ? 'Mic Muted' : 'Mic Active'}</span>
            </button>
          </div>
        </div>

        {/* Live Classroom Screen Simulation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Virtual Whiteboard Screen */}
          <div className="lg:col-span-8 bg-gradient-to-b from-red-900 via-amber-950 to-red-950 border-2 border-amber-500/50 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-amber-500/30 pb-3">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-amber-400" />
                <h3 className="font-serif font-bold text-lg text-amber-200">
                  Digital Noorani Qaida & Tajweed Board
                </h3>
              </div>

              <div className="flex gap-1.5 text-xs font-bold">
                <button
                  onClick={() => setActiveBoardTab('qaida')}
                  className={`px-3 py-1 rounded-lg ${
                    activeBoardTab === 'qaida' ? 'bg-amber-500 text-red-950' : 'bg-red-950 text-red-200'
                  }`}
                >
                  Noorani Qaida
                </button>
                <button
                  onClick={() => setActiveBoardTab('tajweed')}
                  className={`px-3 py-1 rounded-lg ${
                    activeBoardTab === 'tajweed' ? 'bg-amber-500 text-red-950' : 'bg-red-950 text-red-200'
                  }`}
                >
                  Makharij Rules
                </button>
              </div>
            </div>

            {/* Interactive Lesson Display */}
            <div className="bg-red-950/90 border-2 border-amber-500/40 rounded-2xl p-8 text-center space-y-6">
              <div className="text-amber-300 font-serif text-4xl sm:text-5xl font-arabic tracking-widest leading-relaxed">
                ا ب ت ث ج ح خ د ذ ر ز س ش ص ض ط ظ ع غ ف ق ك ل م ن ه و ي
              </div>
              <p className="text-xs text-red-200 max-w-md mx-auto">
                Lesson 1: Arabic Alphabets & Makharij Pronunciation Points (Throat, Tongue, Lips).
              </p>
            </div>
          </div>

          {/* Teacher & Video Audio Box */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-red-900/80 border border-amber-500/30 rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-3">
                <img
                  src={teachers[0].image}
                  alt="Teacher"
                  className="w-12 h-12 rounded-xl object-cover border-2 border-amber-400"
                />
                <div>
                  <div className="text-xs text-emerald-400 font-bold">● Connected Qari</div>
                  <h4 className="font-serif font-bold text-sm text-amber-200">{teachers[0].name}</h4>
                  <div className="text-[11px] text-red-300">{teachers[0].title}</div>
                </div>
              </div>
            </div>

            <div className="bg-red-900/80 border border-amber-500/30 rounded-2xl p-5 space-y-3">
              <h4 className="font-serif font-bold text-sm text-amber-200 flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-amber-400" />
                <span>Live Student Chat Notes</span>
              </h4>
              <div className="h-40 bg-red-950/80 rounded-xl p-3 text-xs space-y-2 overflow-y-auto border border-red-800">
                <div className="p-2 bg-red-900 rounded text-red-100">
                  <strong className="text-amber-300">Qari Muneeb:</strong> Please focus on throat letters (ح & خ).
                </div>
                <div className="p-2 bg-amber-500/20 rounded text-amber-200">
                  <strong className="text-amber-300">Student:</strong> JazakAllah, practicing now!
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
