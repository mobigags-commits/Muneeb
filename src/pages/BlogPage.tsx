import React from 'react';
import { FileText, Clock, User, ArrowRight, Sparkles } from 'lucide-react';
import { useAcademy } from '../context/AcademyContext';

export const BlogPage: React.FC = () => {
  const { blogPosts } = useAcademy();

  return (
    <div className="bg-red-950 text-white min-h-screen py-10 px-4 sm:px-6 lg:px-8 space-y-10">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-400/30">
            <FileText className="w-4 h-4" />
            <span>Islamic Insights & Guidance</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-extrabold text-amber-100">
            Islamic Articles & Tajweed Blog
          </h1>
          <p className="text-xs sm:text-sm text-red-200">
            Educational articles on Quran memorization techniques, Tajweed rules, and Islamic parenting.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="bg-gradient-to-b from-red-900 to-red-950 border border-amber-500/30 rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between space-y-4 p-6"
            >
              <div className="space-y-4">
                <img
                  src={post.image}
                  alt={post.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-48 object-cover rounded-2xl border border-amber-500/30"
                />
                <div className="flex items-center gap-3 text-xs text-amber-300">
                  <span>Category: {post.category}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                <h2 className="text-xl font-serif font-bold text-amber-200 leading-snug">
                  {post.title}
                </h2>
                <p className="text-xs text-red-100/90 leading-relaxed whitespace-pre-line">
                  {post.content}
                </p>
              </div>

              <div className="pt-4 border-t border-red-800 flex items-center justify-between text-xs text-amber-300">
                <span>By: <strong>{post.author}</strong></span>
                <span>{post.date}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};
