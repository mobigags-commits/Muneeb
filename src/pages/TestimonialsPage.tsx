import React from 'react';
import { Star, Quote, Sparkles, Globe } from 'lucide-react';

export const TestimonialsPage: React.FC = () => {
  const reviews = [
    {
      name: 'Sister Sarah Ahmed',
      location: 'London, United Kingdom',
      course: 'Ladies Tajweed & Nazra Quran',
      comment: 'Finding a certified female Qaria for my daughter and myself was a blessing. The 1-on-1 focus and flexible time slots fit our London routine perfectly.',
      rating: 5,
    },
    {
      name: 'Brother Khalid Al-Mansoori',
      location: 'Dubai, UAE',
      course: 'Hifz-ul-Quran Memorization',
      comment: 'My son completed 5 Juz in just 6 months with Qari Muneeb. The daily progress tracking and EasyPaisa / card fee payment system is super smooth.',
      rating: 5,
    },
    {
      name: 'Tariq Mahmood',
      location: 'Dallas, TX, USA',
      course: 'Noorani Qaida for Kids',
      comment: 'The patient teaching style made my 6-year-old child love reading Quran alphabets. Highly recommended online academy from Rawalpindi!',
      rating: 5,
    },
    {
      name: 'Aisha Bibi',
      location: 'Lahore, Pakistan',
      course: 'Quran Translation & Tafseer',
      comment: 'Deeply inspirational classes. May Allah elevate the rank of Zaitoon Bibi and reward Founder Muneeb Ur Rehman for this noble Sadaqah Jariyah.',
      rating: 5,
    },
  ];

  return (
    <div className="bg-red-950 text-white min-h-screen py-10 px-4 sm:px-6 lg:px-8 space-y-10">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-400/30">
            <Sparkles className="w-4 h-4" />
            <span>Verified Global Reviews</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-extrabold text-amber-100">
            What Our Students & Parents Say
          </h1>
          <p className="text-xs sm:text-sm text-red-200">
            Real feedback from Quran learners across UK, USA, UAE, Canada, and Pakistan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((r, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-b from-red-900 to-red-950 border border-amber-500/30 rounded-3xl p-6 shadow-xl space-y-4 relative"
            >
              <Quote className="w-8 h-8 text-amber-500/30 absolute top-4 right-4" />
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(r.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs text-red-100 italic leading-relaxed">
                &quot;{r.comment}&quot;
              </p>
              <div className="border-t border-red-800 pt-3 flex items-center justify-between text-xs">
                <div>
                  <div className="font-serif font-bold text-amber-200">{r.name}</div>
                  <div className="text-red-300 text-[11px]">{r.course}</div>
                </div>
                <div className="text-amber-300 font-medium text-right flex items-center gap-1">
                  <Globe className="w-3.5 h-3.5 text-amber-400" />
                  <span>{r.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
