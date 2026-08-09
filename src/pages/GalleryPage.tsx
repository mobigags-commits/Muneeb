import React from 'react';
import { Image as ImageIcon, Video, Sparkles, Award } from 'lucide-react';
import { useAcademy } from '../context/AcademyContext';

export const GalleryPage: React.FC = () => {
  const galleryItems = [
    {
      title: 'Monthly Khatam-e-Quran Dua Session in Memory of Zaitoon Bibi',
      category: 'Events',
      image: 'https://images.unsplash.com/photo-1542816417-0983cbe33577?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Hifz Completion Graduation Ceremony 2026',
      category: 'Graduation',
      image: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'International Student Tajweed Competition',
      category: 'Competitions',
      image: 'https://images.unsplash.com/photo-1584286595398-a59f21d313f5?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Ladies Quran & Fiqh Seminar - Sister Qarias Session',
      category: 'Ladies Section',
      image: 'https://images.unsplash.com/photo-1564121211835-e88c852648ab?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Kids Noorani Qaida Interactive Learning Class',
      category: 'Kids Classes',
      image: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=800&q=80',
    },
  ];

  return (
    <div className="bg-red-950 text-white min-h-screen py-10 px-4 sm:px-6 lg:px-8 space-y-10">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-400/30">
            <ImageIcon className="w-4 h-4" />
            <span>Academy Life & Milestones</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-extrabold text-amber-100">
            Photo & Video Gallery
          </h1>
          <p className="text-xs sm:text-sm text-red-200">
            Highlights of Hifz graduations, Tajweed competitions, and Islamic events at Shaheen Al Zaitoon Quran Academy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item, idx) => (
            <div
              key={idx}
              className="bg-red-900/60 border border-amber-500/30 rounded-2xl overflow-hidden shadow-xl group hover:border-amber-400 transition-all"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-red-950/90 text-amber-300 text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full border border-amber-500/40">
                  {item.category}
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-serif font-bold text-sm text-amber-200">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
