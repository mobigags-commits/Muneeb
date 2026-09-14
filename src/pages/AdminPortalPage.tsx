import React, { useState } from 'react';
import { Sparkles, Save, CheckCircle, CreditCard, Users, BookOpen, MapPin, FileText, Plus, ShieldCheck, DollarSign, ArrowRight, RefreshCw, Briefcase, MessageSquare, Database } from 'lucide-react';
import { useAcademy } from '../context/AcademyContext';
import { AcademyLogo } from '../components/AcademyLogo';

export const AdminPortalPage: React.FC = () => {
  const {
    siteSettings,
    updateSiteSettings,
    payments,
    updatePaymentStatus,
    students,
    courses,
    branches,
    announcements,
    ztProducts,
    matrimonialProfiles,
    adCampaigns,
    referrals,
    affiliatePartners,
    applications,
    contactMessages,
    cloudSyncStatus,
    refreshFromCloud,
    setActivePage,
  } = useAcademy();

  const [activeTab, setActiveTab] = useState<'settings' | 'payments' | 'students' | 'courses' | 'branches' | 'ads' | 'zt' | 'matrimonial' | 'careers' | 'messages'>('settings');

  // Site Settings Form
  const [academyName, setAcademyName] = useState(siteSettings.academyName);
  const [ownerName, setOwnerName] = useState(siteSettings.ownerName);
  const [headOfficeCity, setHeadOfficeCity] = useState(siteSettings.headOfficeCity);
  const [contactNumber, setContactNumber] = useState(siteSettings.contactNumber);
  const [easyPaisaTitle, setEasyPaisaTitle] = useState(siteSettings.easyPaisaAccountTitle);
  const [easyPaisaNumber, setEasyPaisaNumber] = useState(siteSettings.easyPaisaAccountNumber);
  const [motherMemorialName, setMotherMemorialName] = useState(siteSettings.motherMemorialName);
  const [heroHeadline, setHeroHeadline] = useState(siteSettings.heroHeadline);
  const [facebookGroupUrl, setFacebookGroupUrl] = useState(siteSettings.facebookGroupUrl || 'https://www.facebook.com/groups/REPLACE_WITH_MY_GROUP_LINK');
  const [facebookGroupName, setFacebookGroupName] = useState(siteSettings.facebookGroupName || 'Shaheen Al Zaitoon Official Facebook Community');
  const [facebookGroupMembers, setFacebookGroupMembers] = useState(siteSettings.facebookGroupMembers || 92400);
  const [saved, setSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  const handleManualSync = async () => {
    setIsSyncing(true);
    await refreshFromCloud();
    setIsSyncing(false);
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await updateSiteSettings({
      academyName,
      ownerName,
      headOfficeCity,
      contactNumber,
      whatsappNumber: contactNumber,
      easyPaisaAccountTitle: easyPaisaTitle,
      easyPaisaAccountNumber: easyPaisaNumber,
      motherMemorialName,
      heroHeadline,
      facebookGroupUrl,
      facebookGroupName,
      facebookGroupMembers: Number(facebookGroupMembers),
    });
    setIsSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 4000);
  };

  return (
    <div className="bg-red-950 text-white min-h-screen py-10 px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-900 via-amber-950 to-red-900 border-2 border-amber-500/50 rounded-2xl p-6 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <AcademyLogo size="lg" shape="rounded" glowEffect={true} />
            <div>
              <div className="text-xs uppercase font-extrabold text-amber-300">
                Super Admin & Owner Control Center
              </div>
              <h1 className="text-2xl font-serif font-bold text-amber-100">
                {siteSettings.academyName} Management
              </h1>
              <p className="text-xs text-red-200">
                Logged in as Owner: <strong>{siteSettings.ownerName}</strong> (HQ: Rawalpindi, Pakistan)
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <div className="flex items-center gap-2 bg-red-950 p-2 rounded-xl border border-amber-500/30 text-xs">
              <span className="text-red-300">EasyPaisa:</span>
              <span className="font-mono font-bold text-emerald-400">{siteSettings.easyPaisaAccountNumber}</span>
            </div>

            {/* Cloud Database Persistence Sync Badge & Button */}
            <div className="flex items-center gap-2 bg-red-950/90 p-2 rounded-xl border border-emerald-500/40 text-xs">
              <Database className="w-4 h-4 text-emerald-400" />
              <div className="flex flex-col text-[11px] leading-tight">
                <span className="text-emerald-300 font-bold">Cloud Database</span>
                <span className="text-[10px] text-red-200 capitalize">
                  {cloudSyncStatus === 'syncing' ? 'Syncing...' : cloudSyncStatus === 'synced' ? 'Live & Persistent' : 'Local Fallback'}
                </span>
              </div>
              <button
                type="button"
                onClick={handleManualSync}
                disabled={isSyncing}
                title="Refresh latest data from cloud database"
                className="bg-emerald-700 hover:bg-emerald-600 text-white p-1.5 rounded-lg text-xs flex items-center gap-1 disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                <span className="text-[10px] font-bold">Sync</span>
              </button>
            </div>
          </div>
        </div>

        {/* Admin Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-red-800 pb-3">
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'settings' ? 'bg-amber-500 text-red-950 shadow-lg' : 'bg-red-900/60 text-red-200'
            }`}
          >
            Site Settings & CMS
          </button>
          <button
            onClick={() => setActiveTab('payments')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'payments' ? 'bg-amber-500 text-red-950 shadow-lg' : 'bg-red-900/60 text-red-200'
            }`}
          >
            Payment Receipts ({payments.length})
          </button>
          <button
            onClick={() => setActiveTab('students')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'students' ? 'bg-amber-500 text-red-950 shadow-lg' : 'bg-red-900/60 text-red-200'
            }`}
          >
            Students Manager ({students.length})
          </button>
          <button
            onClick={() => setActiveTab('careers')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'careers' ? 'bg-amber-500 text-red-950 shadow-lg' : 'bg-red-900/60 text-red-200'
            }`}
          >
            Teacher Applications ({applications.length})
          </button>
          <button
            onClick={() => setActiveTab('messages')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'messages' ? 'bg-amber-500 text-red-950 shadow-lg' : 'bg-red-900/60 text-red-200'
            }`}
          >
            Inquiries ({contactMessages.length})
          </button>
          <button
            onClick={() => setActiveTab('courses')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'courses' ? 'bg-amber-500 text-red-950 shadow-lg' : 'bg-red-900/60 text-red-200'
            }`}
          >
            Courses ({courses.length})
          </button>
          <button
            onClick={() => setActiveTab('branches')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'branches' ? 'bg-amber-500 text-red-950 shadow-lg' : 'bg-red-900/60 text-red-200'
            }`}
          >
            Suboffices ({branches.length})
          </button>
          <button
            onClick={() => setActiveTab('ads')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'ads' ? 'bg-amber-500 text-red-950 shadow-lg' : 'bg-red-900/60 text-red-200'
            }`}
          >
            Ads ({adCampaigns.length})
          </button>
          <button
            onClick={() => setActiveTab('zt')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'zt' ? 'bg-amber-500 text-red-950 shadow-lg' : 'bg-red-900/60 text-red-200'
            }`}
          >
            ZT Products ({ztProducts.length})
          </button>
          <button
            onClick={() => setActiveTab('matrimonial')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'matrimonial' ? 'bg-amber-500 text-red-950 shadow-lg' : 'bg-red-900/60 text-red-200'
            }`}
          >
            Nikah ({matrimonialProfiles.length})
          </button>
          <button
            onClick={() => setActivePage('google-ecosystem')}
            className="px-4 py-2 rounded-xl text-xs font-bold transition-all bg-emerald-700 hover:bg-emerald-600 text-white ml-auto flex items-center gap-1.5 shadow-md"
          >
            <span>Google AdSense Hub</span>
            <span className="bg-amber-400 text-red-950 px-1.5 py-0.5 rounded text-[10px] font-extrabold">9 Sites</span>
          </button>
        </div>

        {/* Tab 1: Settings CMS */}
        {activeTab === 'settings' && (
          <form onSubmit={handleSaveSettings} className="bg-red-900/60 border border-amber-500/30 rounded-3xl p-6 space-y-6">
            <h2 className="text-xl font-serif font-bold text-amber-200">Academy Identity & EasyPaisa Config</h2>

            {saved && (
              <div className="p-3 bg-emerald-500/20 text-emerald-300 border border-emerald-400 rounded-xl text-xs font-bold flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>Site settings updated live across all pages!</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-amber-200 font-bold mb-1">Academy Full Title</label>
                <input
                  type="text"
                  value={academyName}
                  onChange={(e) => setAcademyName(e.target.value)}
                  className="w-full bg-red-950 border border-red-700 text-white rounded-xl px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-amber-200 font-bold mb-1">Founder / Owner Name</label>
                <input
                  type="text"
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  className="w-full bg-red-950 border border-red-700 text-white rounded-xl px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-amber-200 font-bold mb-1">Rawalpindi Head Office Phone & WhatsApp</label>
                <input
                  type="text"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  className="w-full bg-red-950 border border-red-700 text-white rounded-xl px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-amber-200 font-bold mb-1">EasyPaisa Account Title</label>
                <input
                  type="text"
                  value={easyPaisaTitle}
                  onChange={(e) => setEasyPaisaTitle(e.target.value)}
                  className="w-full bg-red-950 border border-red-700 text-white rounded-xl px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-amber-200 font-bold mb-1">EasyPaisa Account Number</label>
                <input
                  type="text"
                  value={easyPaisaNumber}
                  onChange={(e) => setEasyPaisaNumber(e.target.value)}
                  className="w-full bg-red-950 border border-red-700 font-mono text-emerald-300 font-bold rounded-xl px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-amber-200 font-bold mb-1">Mother Memorial Dedication Name</label>
                <input
                  type="text"
                  value={motherMemorialName}
                  onChange={(e) => setMotherMemorialName(e.target.value)}
                  className="w-full bg-red-950 border border-red-700 text-white rounded-xl px-3 py-2"
                />
              </div>
            </div>

            <div>
              <label className="block text-amber-200 font-bold text-xs mb-1">Homepage Hero Headline</label>
              <input
                type="text"
                value={heroHeadline}
                onChange={(e) => setHeroHeadline(e.target.value)}
                className="w-full bg-red-950 border border-red-700 text-white rounded-xl px-3 py-2 text-xs"
              />
            </div>

            {/* Facebook Group Single Configuration Section */}
            <div className="bg-red-950/80 border-2 border-[#1877F2]/60 rounded-2xl p-4 sm:p-5 space-y-4">
              <div className="flex items-center gap-2 text-[#1877F2] font-bold text-sm">
                <Sparkles className="w-4 h-4 text-[#1877F2]" />
                <span>Facebook Group Integration Single-Point Configuration</span>
              </div>
              <p className="text-[11px] text-red-200">
                Updating the URL below changes the link across the entire website instantly (Header, EcosystemBar, Navbar, Homepage, Sidebar, and Footer).
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="sm:col-span-2">
                  <label className="block text-blue-300 font-bold mb-1">Official Facebook Group URL</label>
                  <input
                    type="url"
                    value={facebookGroupUrl}
                    onChange={(e) => setFacebookGroupUrl(e.target.value)}
                    placeholder="https://www.facebook.com/groups/YOUR_GROUP_LINK"
                    className="w-full bg-slate-900 border border-[#1877F2]/60 font-mono text-blue-200 font-bold rounded-xl px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-blue-300 font-bold mb-1">Facebook Group Display Name</label>
                  <input
                    type="text"
                    value={facebookGroupName}
                    onChange={(e) => setFacebookGroupName(e.target.value)}
                    className="w-full bg-slate-900 border border-red-700 text-white rounded-xl px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-blue-300 font-bold mb-1">Member Count Display</label>
                  <input
                    type="number"
                    value={facebookGroupMembers}
                    onChange={(e) => setFacebookGroupMembers(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-red-700 font-mono text-amber-300 font-bold rounded-xl px-3 py-2"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSaving}
              className="bg-amber-500 hover:bg-amber-400 text-red-950 font-bold text-xs px-6 py-3 rounded-xl shadow flex items-center gap-2 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
            >
              {isSaving ? (
                <div className="w-4 h-4 border-2 border-red-950 border-t-transparent rounded-full animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              <span>{isSaving ? 'Saving to Cloud Database...' : 'Save & Publish Changes'}</span>
            </button>
          </form>
        )}

        {/* Tab 2: Payments Verification */}
        {activeTab === 'payments' && (
          <div className="bg-red-900/60 border border-amber-500/30 rounded-3xl p-6 space-y-4">
            <h2 className="text-xl font-serif font-bold text-amber-200">EasyPaisa Fee Receipts Verification</h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-red-950 text-amber-300 uppercase border-b border-red-800">
                  <tr>
                    <th className="p-3">Student Name</th>
                    <th className="p-3">Course</th>
                    <th className="p-3">Amount</th>
                    <th className="p-3">Method</th>
                    <th className="p-3">Transaction ID (TID)</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-red-800/80">
                  {payments.map((p) => (
                    <tr key={p.id} className="hover:bg-red-900/80">
                      <td className="p-3 font-bold text-white">{p.studentName}</td>
                      <td className="p-3 text-red-200">{p.courseTitle}</td>
                      <td className="p-3 font-bold text-emerald-400">Rs. {p.amountPKR}</td>
                      <td className="p-3">{p.paymentMethod}</td>
                      <td className="p-3 font-mono text-amber-300 font-bold">{p.transactionId}</td>
                      <td className="p-3 text-red-300">{p.date}</td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            p.status === 'Approved'
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30'
                              : 'bg-amber-500/20 text-amber-300 border border-amber-400/30'
                          }`}
                        >
                          {p.status}
                        </span>
                      </td>
                      <td className="p-3">
                        {p.status !== 'Approved' && (
                          <button
                            onClick={() => updatePaymentStatus(p.id, 'Approved')}
                            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-2.5 py-1 rounded text-[11px]"
                          >
                            Approve
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Students Manager */}
        {activeTab === 'students' && (
          <div className="bg-red-900/60 border border-amber-500/30 rounded-3xl p-6 space-y-4">
            <h2 className="text-xl font-serif font-bold text-amber-200">Enrolled Students Records</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-red-950 text-amber-300 uppercase border-b border-red-800">
                  <tr>
                    <th className="p-3">Student ID</th>
                    <th className="p-3">Name</th>
                    <th className="p-3">Guardian</th>
                    <th className="p-3">Attendance</th>
                    <th className="p-3">Current Para</th>
                    <th className="p-3">Fee Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-red-800/80">
                  {students.map((s) => (
                    <tr key={s.id}>
                      <td className="p-3 font-mono text-amber-300">{s.id}</td>
                      <td className="p-3 font-bold text-white">{s.name}</td>
                      <td className="p-3 text-red-200">{s.guardianName}</td>
                      <td className="p-3 text-emerald-400 font-bold">{s.attendanceRate}%</td>
                      <td className="p-3 font-bold text-amber-200">Para {s.currentPara}</td>
                      <td className="p-3">
                        <span className="bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded text-[10px] font-bold">
                          {s.feeStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab: Ads & Monetization */}
        {activeTab === 'ads' && (
          <div className="bg-red-900/60 border border-amber-500/30 rounded-3xl p-6 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-serif font-bold text-amber-200">Active Ad Banners & Campaigns</h2>
                <p className="text-xs text-red-200">Manage all internal and sponsored multi-platform ad campaigns.</p>
              </div>
              <button
                onClick={() => setActivePage('ad-manager')}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs transition-all flex items-center gap-1.5 shadow-md"
              >
                <span>Full AI Ad Studio Suite</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-red-950 text-amber-300 uppercase border-b border-red-800">
                  <tr>
                    <th className="p-3">Ad Title</th>
                    <th className="p-3">Brand</th>
                    <th className="p-3">Placement</th>
                    <th className="p-3">Impressions</th>
                    <th className="p-3">Clicks</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-red-800/80">
                  {adCampaigns.map((ad) => (
                    <tr key={ad.id}>
                      <td className="p-3 font-bold text-white">{ad.title}</td>
                      <td className="p-3 font-semibold text-amber-200">{ad.targetBrand}</td>
                      <td className="p-3 text-red-200">{ad.placement}</td>
                      <td className="p-3 font-mono text-emerald-400">{ad.impressions.toLocaleString()}</td>
                      <td className="p-3 font-mono text-amber-300">{ad.clicks}</td>
                      <td className="p-3">
                        <span className="bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded text-[10px] font-bold">
                          {ad.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab: ZT Products */}
        {activeTab === 'zt' && (
          <div className="bg-red-900/60 border border-amber-500/30 rounded-3xl p-6 space-y-4">
            <h2 className="text-xl font-serif font-bold text-amber-200">ZT (Zaitoon Traders) Product Catalog</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {ztProducts.map((p) => (
                <div key={p.id} className="bg-red-950 p-4 rounded-xl border border-amber-500/20 space-y-2">
                  <div className="text-xs font-bold text-amber-300">{p.name}</div>
                  <div className="text-[10px] text-red-200">{p.category}</div>
                  <div className="text-sm font-bold text-emerald-400">PKR {p.pricePKR.toLocaleString()}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab: Marriage Proposals */}
        {activeTab === 'matrimonial' && (
          <div className="bg-red-900/60 border border-amber-500/30 rounded-3xl p-6 space-y-4">
            <h2 className="text-xl font-serif font-bold text-amber-200">Matrimonial & Rishta Proposals</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {matrimonialProfiles.map((m) => (
                <div key={m.id} className="bg-red-950 p-4 rounded-xl border border-amber-500/20 space-y-2">
                  <div className="text-xs font-bold text-amber-300">{m.code} - {m.gender} ({m.age} Yrs)</div>
                  <div className="text-xs text-white">{m.profession}</div>
                  <div className="text-[10px] text-red-200">{m.city}, {m.country}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab: Teacher Applications */}
        {activeTab === 'careers' && (
          <div className="bg-red-900/60 border border-amber-500/30 rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-serif font-bold text-amber-200 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-amber-400" />
                <span>Qari & Teacher Job Applications ({applications.length})</span>
              </h2>
              <span className="text-xs text-emerald-300 font-mono">Real-time Cloud Sync</span>
            </div>

            {applications.length === 0 ? (
              <div className="text-center py-10 text-red-200 text-sm">
                No teacher applications submitted yet.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-red-950 text-amber-300 uppercase border-b border-red-800">
                    <tr>
                      <th className="p-3">Ref ID</th>
                      <th className="p-3">Name</th>
                      <th className="p-3">Contact</th>
                      <th className="p-3">Gender</th>
                      <th className="p-3">Qualification</th>
                      <th className="p-3">Experience</th>
                      <th className="p-3">City</th>
                      <th className="p-3">Date</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-red-800/80">
                    {applications.map((app) => (
                      <tr key={app.id} className="hover:bg-red-900/80">
                        <td className="p-3 font-mono text-amber-300">{app.id}</td>
                        <td className="p-3 font-bold text-white">{app.fullName}</td>
                        <td className="p-3 font-mono text-emerald-400">
                          <a href={`https://wa.me/92${app.phone.replace(/^0/, '')}`} target="_blank" rel="noreferrer" className="hover:underline">
                            {app.phone}
                          </a>
                        </td>
                        <td className="p-3">{app.gender}</td>
                        <td className="p-3 text-amber-200 font-medium">{app.qualification}</td>
                        <td className="p-3 text-red-200">{app.experienceYears}</td>
                        <td className="p-3 text-red-200">{app.city}</td>
                        <td className="p-3 text-red-300">{app.appliedDate}</td>
                        <td className="p-3">
                          <span className="bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded text-[10px] font-bold border border-amber-400/30">
                            {app.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Tab: Inquiry Messages */}
        {activeTab === 'messages' && (
          <div className="bg-red-900/60 border border-amber-500/30 rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-serif font-bold text-amber-200 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-amber-400" />
                <span>Contact Messages & Inquiries ({contactMessages.length})</span>
              </h2>
              <span className="text-xs text-emerald-300 font-mono">Real-time Cloud Sync</span>
            </div>

            {contactMessages.length === 0 ? (
              <div className="text-center py-10 text-red-200 text-sm">
                No contact inquiry messages received yet.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-red-950 text-amber-300 uppercase border-b border-red-800">
                    <tr>
                      <th className="p-3">Ticket ID</th>
                      <th className="p-3">Sender Name</th>
                      <th className="p-3">WhatsApp</th>
                      <th className="p-3">Subject</th>
                      <th className="p-3">Message</th>
                      <th className="p-3">Date</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-red-800/80">
                    {contactMessages.map((msg) => (
                      <tr key={msg.id} className="hover:bg-red-900/80">
                        <td className="p-3 font-mono text-amber-300">{msg.id}</td>
                        <td className="p-3 font-bold text-white">{msg.name}</td>
                        <td className="p-3 font-mono text-emerald-400">
                          <a href={`https://wa.me/92${msg.phone.replace(/^0/, '')}`} target="_blank" rel="noreferrer" className="hover:underline">
                            {msg.phone}
                          </a>
                        </td>
                        <td className="p-3 text-amber-200 font-semibold">{msg.subject}</td>
                        <td className="p-3 text-red-100 max-w-xs truncate" title={msg.message}>{msg.message}</td>
                        <td className="p-3 text-red-300">{msg.date}</td>
                        <td className="p-3">
                          <span className="bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded text-[10px] font-bold border border-emerald-400/30">
                            {msg.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
