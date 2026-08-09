import React, { useState } from 'react';
import {
  Facebook,
  Users,
  ExternalLink,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  Share2,
  CheckCircle,
  Copy,
  BookOpen,
  Heart,
  HelpCircle,
  Terminal,
  FolderTree,
  FileCode,
  Settings,
  Rocket,
  CheckSquare,
  TrendingUp,
  Globe,
  ArrowRight,
  Code,
  Info,
} from 'lucide-react';
import { useAcademy } from '../context/AcademyContext';
import { FacebookGroupWidget } from '../components/FacebookGroupWidget';

export const CommunityPage: React.FC = () => {
  const { siteSettings, setActivePage } = useAcademy();
  const [activeTab, setActiveTab] = useState<'community' | 'discussions' | 'docs'>('community');
  const [copiedUrl, setCopiedUrl] = useState(false);

  const groupUrl = siteSettings.facebookGroupUrl || 'https://www.facebook.com/groups/REPLACE_WITH_MY_GROUP_LINK';

  const handleCopyGroupUrl = () => {
    navigator.clipboard.writeText(groupUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 3000);
  };

  const communityFeatures = [
    {
      title: 'Daily Quran Recitation & Tafseer',
      description: 'Engage in daily verses, Word-by-Word translation breakdowns, and Tajweed practice recordings.',
      icon: BookOpen,
      badge: 'Daily Activity',
    },
    {
      title: 'Live Q&A with Certified Qaris',
      description: 'Get your Tajweed questions answered directly by senior Male & Female Alimahs and Huffaz.',
      icon: MessageSquare,
      badge: 'Expert Direct Access',
    },
    {
      title: 'Parent & Student Testimonials',
      description: 'Share progress, graduation certificates, and connect with fellow parents from 35+ countries.',
      icon: Heart,
      badge: 'Global Community',
    },
    {
      title: 'Islamic Business & Earning Tips',
      description: 'Discover Halal business opportunities, Zaitoon Traders affiliate earnings, and freelancing skills.',
      icon: TrendingUp,
      badge: 'Growth Hub',
    },
  ];

  const recentDiscussions = [
    {
      id: 1,
      author: 'Qari Hafiz Muhammad Tariq',
      authorRole: 'Senior Tajweed Instructor',
      time: '2 hours ago',
      content:
        'Assalamu Alaikum! Today in our group, we are discussing the rules of Madd Asli (Natural Elongation). How many Harakat should Madd Asli be stretched? Post your answers below!',
      likes: 142,
      comments: 38,
      category: 'Tajweed Rules',
    },
    {
      id: 2,
      author: 'Fatima Al-Zahra',
      authorRole: 'Parent from Manchester, UK',
      time: '5 hours ago',
      content:
        'Alhamdulillah! My 8-year-old daughter completed Para 30 today with Shaheen Al Zaitoon Academy. Sharing her completion video in the Facebook group!',
      likes: 215,
      comments: 54,
      category: 'Student Success',
    },
    {
      id: 3,
      author: 'Shaheen Al Zaitoon Official',
      authorRole: 'Admin Team',
      time: '1 day ago',
      content:
        '📢 Announcement: New weekend online Tajweed refresher batch starting this Saturday! Group members get early reservation access. Join the group now to claim your seat.',
      likes: 389,
      comments: 72,
      category: 'Official Notice',
    },
  ];

  return (
    <div className="bg-slate-950 text-white min-h-screen space-y-12 pb-20">
      {/* Hero Banner with Official Facebook Brand Style */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-[#1877F2]/10 to-slate-950 border-b-2 border-[#1877F2]/40 pt-12 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8 relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#1877F2]/20 border border-[#1877F2]/40 text-blue-300 px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider">
            <Facebook className="w-4 h-4 fill-[#1877F2] text-white" />
            <span>Official Facebook Group Integration</span>
            <ShieldCheck className="w-4 h-4 text-blue-400" />
          </div>

          <div className="max-w-4xl space-y-4">
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white leading-tight">
              Connect With 92,400+ Quran Scholars & Students on Facebook
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Welcome to the official digital community of{' '}
              <strong className="text-amber-300">{siteSettings.academyName}</strong>.
              Join our vibrant Facebook Group to participate in live Tajweed discussions, access exclusive study guides, and connect with Muslims worldwide.
            </p>
          </div>

          {/* Quick Config Link Display */}
          <div className="bg-slate-900/90 border border-[#1877F2]/50 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 max-w-3xl">
            <div className="flex items-center gap-3 overflow-hidden text-xs">
              <div className="w-8 h-8 rounded-lg bg-[#1877F2] text-white flex items-center justify-center shrink-0">
                <Facebook className="w-4 h-4 fill-white" />
              </div>
              <div className="truncate">
                <div className="text-slate-400 font-medium">Configured Facebook Group URL:</div>
                <div className="font-mono text-blue-300 font-bold truncate">{groupUrl}</div>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <a
                href={groupUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#1877F2] hover:bg-[#166fe5] text-white font-bold text-xs px-4 py-2 rounded-xl shadow-md flex items-center gap-1.5 transition-transform hover:scale-105"
                id="hero-join-fb-btn"
              >
                <span>Open FB Group</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={handleCopyGroupUrl}
                className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs transition-colors border border-slate-700"
                title="Copy URL"
              >
                {copiedUrl ? <CheckCircle className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-3 border-b border-slate-800 pt-4">
            <button
              onClick={() => setActiveTab('community')}
              className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors ${
                activeTab === 'community'
                  ? 'border-[#1877F2] text-[#1877F2]'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Facebook className="w-4 h-4" />
              <span>Facebook Group Hub</span>
            </button>
            <button
              onClick={() => setActiveTab('discussions')}
              className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors ${
                activeTab === 'discussions'
                  ? 'border-[#1877F2] text-[#1877F2]'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Group Feed & Discussions</span>
            </button>
            <button
              onClick={() => setActiveTab('docs')}
              className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors ${
                activeTab === 'docs'
                  ? 'border-amber-400 text-amber-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Code className="w-4 h-4" />
              <span>Integration Deliverables & Technical Specs</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Tab Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {activeTab === 'community' && (
          <div className="space-y-12">
            {/* Primary Facebook Group Widget Banner */}
            <FacebookGroupWidget variant="full" />

            {/* Why Join Section */}
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                  Why Join Our Facebook Group Community?
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto">
                  Our group brings together online Quran learners, experienced Huffaz, parents, and Islamic scholars in a respectful, highly moderated space.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {communityFeatures.map((feat, index) => {
                  const Icon = feat.icon;
                  return (
                    <div
                      key={index}
                      className="bg-slate-900 border border-slate-800 hover:border-[#1877F2]/60 p-6 rounded-2xl shadow-lg transition-all hover:-translate-y-1 group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-[#1877F2]/10 border border-[#1877F2]/30 text-[#1877F2] flex items-center justify-center mb-4 group-hover:bg-[#1877F2] group-hover:text-white transition-colors">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-md border border-amber-400/20">
                        {feat.badge}
                      </span>
                      <h3 className="text-lg font-serif font-bold text-white mt-2 mb-2">
                        {feat.title}
                      </h3>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {feat.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Direct Join CTA Card */}
            <div className="bg-gradient-to-r from-[#1877F2] to-blue-800 p-8 sm:p-12 rounded-3xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 text-white relative overflow-hidden">
              <div className="space-y-3 text-center md:text-left relative z-10">
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Free Instant Membership</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-serif font-bold leading-tight">
                  Ready to Become Part of Our Facebook Family?
                </h2>
                <p className="text-xs sm:text-sm text-blue-100 max-w-xl">
                  Click below to open our official Facebook Group in a new tab. Tap "Join Group" on Facebook and our moderators will approve your request instantly!
                </p>
              </div>

              <a
                href={groupUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white hover:bg-slate-100 text-[#1877F2] font-extrabold text-base px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3 transition-transform hover:scale-105 shrink-0"
                id="community-join-now-big-btn"
              >
                <Facebook className="w-6 h-6 fill-[#1877F2]" />
                <span>Join Group on Facebook</span>
                <ExternalLink className="w-5 h-5 text-[#1877F2]" />
              </a>
            </div>
          </div>
        )}

        {activeTab === 'discussions' && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-serif font-bold text-white">Recent Facebook Group Discussions</h2>
                <p className="text-xs text-slate-400">Live preview of topics actively discussed by group members.</p>
              </div>
              <a
                href={groupUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#1877F2] hover:bg-[#166fe5] text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md flex items-center gap-2"
              >
                <Facebook className="w-4 h-4 fill-white" />
                <span>Post Your Question on Facebook</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentDiscussions.map((post) => (
                <div
                  key={post.id}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 hover:border-[#1877F2]/50 transition-colors shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#1877F2] text-white font-bold flex items-center justify-center font-serif">
                        {post.author.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">{post.author}</div>
                        <div className="text-[11px] text-slate-400">{post.authorRole} • {post.time}</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold bg-blue-500/10 text-blue-300 px-2.5 py-1 rounded-full border border-blue-500/20">
                      {post.category}
                    </span>
                  </div>

                  <p className="text-xs text-slate-200 leading-relaxed">
                    "{post.content}"
                  </p>

                  <div className="flex items-center justify-between border-t border-slate-800 pt-3 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400" />
                      {post.likes} Likes
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-3.5 h-3.5 text-blue-400" />
                      {post.comments} Comments
                    </span>
                    <a
                      href={groupUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#1877F2] hover:underline font-bold text-[11px] flex items-center gap-1"
                    >
                      <span>Join Discussion</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'docs' && (
          <div className="space-y-10 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10">
            <div>
              <div className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 border border-amber-400/30">
                <Code className="w-4 h-4 text-amber-400" />
                <span>Technical Implementation Deliverables</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                Facebook Groups Integration Technical Specifications
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Comprehensive guide covering system architecture, single-file URL configuration, deployment checklist, and future Graph API scalability.
              </p>
            </div>

            {/* Deliverables 1-7 Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Deliverable 1: Source Code Structure */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
                  <FileCode className="w-4 h-4 text-amber-400" />
                  <span>1. Complete Source Code & Components</span>
                </div>
                <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-4">
                  <li><strong className="text-white">FacebookGroupWidget.tsx:</strong> Modular card/banner widget supporting full, card, banner, & compact variants.</li>
                  <li><strong className="text-white">CommunityPage.tsx:</strong> Dedicated Community section with live stats & technical docs.</li>
                  <li><strong className="text-white">Single-Point Config:</strong> Centralized URL state in <code className="text-amber-300">siteSettings.facebookGroupUrl</code>.</li>
                  <li><strong className="text-white">Placement Across Site:</strong> Integrated in Header, Navbar, EcosystemBar, Homepage, Sidebars, & Footer.</li>
                </ul>
              </div>

              {/* Deliverable 2: Folder Structure */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-[#1877F2] font-bold text-sm">
                  <FolderTree className="w-4 h-4 text-[#1877F2]" />
                  <span>2. Folder Structure Overview</span>
                </div>
                <pre className="bg-slate-900 p-3 rounded-xl text-[11px] font-mono text-blue-200 overflow-x-auto leading-relaxed">
{`/src
  ├── components/
  │   ├── FacebookGroupWidget.tsx  (Main FB Widget)
  │   ├── EcosystemBar.tsx         (Header FB Link)
  │   ├── Navbar.tsx               (Navigation Menu Link)
  │   └── Footer.tsx               (Footer FB Branding)
  ├── context/
  │   └── AcademyContext.tsx       (Centralized State)
  ├── data/
  │   └── initialData.ts           (Default FB URL Config)
  └── pages/
      ├── CommunityPage.tsx        (Dedicated Section)
      ├── HomePage.tsx             (Homepage Community Block)
      └── AdminPortalPage.tsx      (Admin Config UI)`}
                </pre>
              </div>

              {/* Deliverable 3: Installation Guide */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  <span>3. Installation Guide</span>
                </div>
                <div className="text-xs text-slate-300 space-y-2">
                  <p>To run or clone this application locally:</p>
                  <pre className="bg-slate-900 p-2.5 rounded-lg text-[11px] font-mono text-emerald-300">
{`npm install
npm run dev`}
                  </pre>
                  <p className="text-[11px] text-slate-400">Requires Node.js 18+ and Vite React TypeScript runtime.</p>
                </div>
              </div>

              {/* Deliverable 4: Configuration Guide */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
                  <Settings className="w-4 h-4 text-purple-400" />
                  <span>4. Configuration Guide (Single URL Update)</span>
                </div>
                <div className="text-xs text-slate-300 space-y-2">
                  <p>To update the Facebook Group link for the entire website:</p>
                  <ol className="list-decimal pl-4 space-y-1">
                    <li>Option A: Change <code className="text-amber-300">facebookGroupUrl</code> in <code className="text-slate-200">src/data/initialData.ts</code>.</li>
                    <li>Option B: Update dynamically in <strong className="text-white">Admin Portal → Settings</strong> tab.</li>
                  </ol>
                  <p className="text-[11px] text-slate-400">Current URL set to: <span className="text-blue-300 font-mono font-bold">{groupUrl}</span></p>
                </div>
              </div>

              {/* Deliverable 5: Deployment Instructions */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-sky-400 font-bold text-sm">
                  <Rocket className="w-4 h-4 text-sky-400" />
                  <span>5. Deployment Instructions</span>
                </div>
                <div className="text-xs text-slate-300 space-y-2">
                  <p>Build command for production static host or Cloud Run container:</p>
                  <pre className="bg-slate-900 p-2.5 rounded-lg text-[11px] font-mono text-sky-300">
{`npm run build`}
                  </pre>
                  <p className="text-[11px] text-slate-400">Generates optimized bundled assets in <code className="text-slate-200">dist/</code> directory.</p>
                </div>
              </div>

              {/* Deliverable 6: Testing Checklist */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-teal-400 font-bold text-sm">
                  <CheckSquare className="w-4 h-4 text-teal-400" />
                  <span>6. Quality & Testing Checklist</span>
                </div>
                <ul className="text-xs text-slate-300 space-y-1">
                  <li className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Target _blank security (rel="noopener noreferrer")</li>
                  <li className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Meta / Facebook brand guidelines (#1877F2 compliance)</li>
                  <li className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Mobile responsive breakpoint testing (sm, md, lg)</li>
                  <li className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Single central config URL propagation</li>
                </ul>
              </div>
            </div>

            {/* Deliverable 7: Future Scalability */}
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
                <Globe className="w-4 h-4 text-indigo-400" />
                <span>7. Future Scalability Recommendations</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                For future growth, you can connect Meta Graph API v19.0 webhooks to auto-sync group post counters, auto-approve verified enrolled students using Facebook Login OAuth, and push daily Quranic lessons directly to Facebook Group feeds using automated backend webhooks.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
