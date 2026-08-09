import React, { useState } from 'react';
import { Heart, ShieldCheck, UserCheck, Phone, Plus, Lock, CheckCircle2, Search } from 'lucide-react';
import { useAcademy } from '../context/AcademyContext';
import { MatrimonialProfile } from '../types';
import { AdBanner } from '../components/AdBanner';

export const MarriageBureauPage: React.FC = () => {
  const { matrimonialProfiles, addMatrimonialProfile, siteSettings, role } = useAcademy();
  const [filterGender, setFilterGender] = useState<'All' | 'Male' | 'Female'>('All');
  const [searchCode, setSearchCode] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form states
  const [code, setCode] = useState(`SZA-M-${Math.floor(1000 + Math.random() * 9000)}`);
  const [gender, setGender] = useState<'Male' | 'Female'>('Male');
  const [age, setAge] = useState(26);
  const [maritalStatus, setMaritalStatus] = useState<'Single / Unmarried' | 'Divorced' | 'Widowed'>('Single / Unmarried');
  const [profession, setProfession] = useState('Software Engineer & Hafiz');
  const [city, setCity] = useState('Rawalpindi');
  const [country, setCountry] = useState('Pakistan');
  const [qualification, setQualification] = useState('BS Computer Science');
  const [sectSilsila, setSectSilsila] = useState('Sunni / Hanafi');
  const [description, setDescription] = useState('Practicing Muslim seeking pious spouse.');

  const filteredProfiles = matrimonialProfiles.filter((p) => {
    const matchesGender = filterGender === 'All' || p.gender === filterGender;
    const matchesCode =
      !searchCode ||
      p.code.toLowerCase().includes(searchCode.toLowerCase()) ||
      p.city.toLowerCase().includes(searchCode.toLowerCase()) ||
      p.qualification.toLowerCase().includes(searchCode.toLowerCase());
    return matchesGender && matchesCode;
  });

  const handleInquireProfile = (profile: MatrimonialProfile) => {
    const text = `Assalamu Alaikum Shaheen Nikah Bureau! I am inquiring regarding Proposal Code: "${profile.code}" (${profile.gender}, ${profile.age} yrs, ${profile.profession}, ${profile.city}). Please share family contact procedure.`;
    const cleanPhone = siteSettings.whatsappNumber.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleAddProfile = (e: React.FormEvent) => {
    e.preventDefault();
    addMatrimonialProfile({
      id: `mat-${Date.now()}`,
      code,
      gender,
      age: Number(age),
      maritalStatus,
      profession,
      city,
      country,
      qualification,
      sectSilsila,
      verified: true,
      description,
      contactPerson: 'Family / Shaheen Bureau Representative',
    });
    setShowAddModal(false);
  };

  return (
    <div className="min-h-screen bg-red-950 text-white py-10 px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Header */}
      <div className="max-w-7xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-rose-500/20 text-rose-300 border border-rose-400/30 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
          <Heart className="w-4 h-4 text-rose-400" />
          <span>Shaheen Matrimonial & Islamic Rishta Bureau</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-extrabold text-amber-100">
          Shaheen Islamic Nikah Service
        </h1>
        <p className="text-sm sm:text-base text-red-200 max-w-3xl mx-auto">
          Honorable, confidential, and 100% verified Islamic family matchmaking for practicing Muslim brothers & sisters across Pakistan, UK, USA, Canada, UAE, and Europe.
        </p>

        <div className="flex flex-wrap justify-center items-center gap-4 text-xs font-bold text-amber-200 pt-2">
          <span className="flex items-center gap-1 bg-red-900/80 px-3 py-1.5 rounded-full border border-amber-500/30">
            <Lock className="w-4 h-4 text-rose-300" /> 100% Family Privacy & Confidentiality
          </span>
          <span className="flex items-center gap-1 bg-red-900/80 px-3 py-1.5 rounded-full border border-amber-500/30">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> Verified Background Checks
          </span>
          <span className="flex items-center gap-1 bg-red-900/80 px-3 py-1.5 rounded-full border border-amber-500/30">
            <UserCheck className="w-4 h-4 text-amber-400" /> Managed by Senior Family Elders
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-8">
        <AdBanner placement="In-feed Featured" />

        {/* Filter & Search Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-gradient-to-r from-red-900 via-amber-950 to-red-900 p-4 rounded-2xl border border-amber-500/40 shadow-xl">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-amber-300">Show:</span>
            {['All', 'Male', 'Female'].map((g) => (
              <button
                key={g}
                onClick={() => setFilterGender(g as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  filterGender === g
                    ? 'bg-rose-500 text-white shadow-md'
                    : 'bg-red-950 text-amber-200 border border-amber-500/20 hover:bg-red-900'
                }`}
              >
                {g === 'All' ? 'All Profiles' : g === 'Male' ? 'Groom / Male (Grooms)' : 'Bride / Female (Brides)'}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 flex-1 max-w-xs">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-amber-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search Code, City or Profession..."
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value)}
                className="w-full bg-red-950 text-white placeholder-red-300/60 pl-9 pr-3 py-1.5 rounded-xl text-xs border border-amber-500/30 focus:outline-none"
              />
            </div>
          </div>

          {(role === 'admin' || role === 'owner') && (
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shrink-0 shadow-lg"
            >
              <Plus className="w-4 h-4" />
              <span>Add Matrimonial Profile</span>
            </button>
          )}
        </div>

        {/* Profiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProfiles.map((p) => (
            <div
              key={p.id}
              className="bg-gradient-to-br from-red-900 via-amber-950 to-red-900 border-2 border-amber-500/40 rounded-2xl p-5 shadow-2xl space-y-4 relative flex flex-col justify-between group hover:border-amber-400 transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-amber-500/20 pb-2">
                  <span className="font-mono text-xs font-extrabold text-amber-300 bg-red-950 px-2.5 py-1 rounded-lg border border-amber-500/30">
                    {p.code}
                  </span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    Verified
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-serif font-bold text-amber-100 flex items-center gap-2">
                    <span>{p.gender === 'Male' ? 'Groom Proposal' : 'Bride Proposal'}</span>
                    <span className="text-xs text-amber-300">({p.age} Yrs)</span>
                  </h3>
                  <p className="text-xs font-bold text-rose-300">{p.profession}</p>
                </div>

                <div className="space-y-1.5 text-xs text-red-200 bg-red-950/60 p-3 rounded-xl border border-amber-500/20">
                  <div><strong>Qualification:</strong> {p.qualification}</div>
                  <div><strong>City / Country:</strong> {p.city}, {p.country}</div>
                  <div><strong>Marital Status:</strong> {p.maritalStatus}</div>
                  <div><strong>Maslak / Sect:</strong> {p.sectSilsila}</div>
                </div>

                <p className="text-xs text-red-200/90 italic leading-relaxed">
                  "{p.description}"
                </p>
              </div>

              <div className="pt-3 border-t border-amber-500/20">
                <button
                  onClick={() => handleInquireProfile(p)}
                  className="w-full bg-gradient-to-r from-rose-600 via-rose-500 to-rose-600 hover:from-rose-500 hover:to-rose-400 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
                >
                  <Phone className="w-4 h-4" />
                  <span>Request Family Matchmaker Contact</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Profile Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-red-950 border-2 border-amber-500/60 rounded-2xl max-w-md w-full p-6 text-white space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-serif font-bold text-amber-200">Add Matrimonial Profile</h3>

            <form onSubmit={handleAddProfile} className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-amber-200 mb-1">Code:</label>
                  <input
                    type="text"
                    required
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full bg-red-900 text-white p-2 rounded-xl text-xs border border-amber-500/40"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-amber-200 mb-1">Gender:</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as any)}
                    className="w-full bg-red-900 text-white p-2 rounded-xl text-xs border border-amber-500/40"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-amber-200 mb-1">Age:</label>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    className="w-full bg-red-900 text-white p-2 rounded-xl text-xs border border-amber-500/40"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-amber-200 mb-1">Status:</label>
                  <select
                    value={maritalStatus}
                    onChange={(e) => setMaritalStatus(e.target.value as any)}
                    className="w-full bg-red-900 text-white p-2 rounded-xl text-xs border border-amber-500/40"
                  >
                    <option value="Single / Unmarried">Single / Unmarried</option>
                    <option value="Divorced">Divorced</option>
                    <option value="Widowed">Widowed</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-amber-200 mb-1">Profession:</label>
                <input
                  type="text"
                  required
                  value={profession}
                  onChange={(e) => setProfession(e.target.value)}
                  className="w-full bg-red-900 text-white p-2 rounded-xl text-xs border border-amber-500/40"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-amber-200 mb-1">City:</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-red-900 text-white p-2 rounded-xl text-xs border border-amber-500/40"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-amber-200 mb-1">Country:</label>
                  <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full bg-red-900 text-white p-2 rounded-xl text-xs border border-amber-500/40"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-amber-200 mb-1">Qualification:</label>
                <input
                  type="text"
                  value={qualification}
                  onChange={(e) => setQualification(e.target.value)}
                  className="w-full bg-red-900 text-white p-2 rounded-xl text-xs border border-amber-500/40"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-amber-200 mb-1">Sect / Silsila:</label>
                <input
                  type="text"
                  value={sectSilsila}
                  onChange={(e) => setSectSilsila(e.target.value)}
                  className="w-full bg-red-900 text-white p-2 rounded-xl text-xs border border-amber-500/40"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-amber-200 mb-1">Description:</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-red-900 text-white p-2 rounded-xl text-xs border border-amber-500/40"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 bg-red-900 text-red-200 py-2 rounded-xl text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-amber-500 text-red-950 font-bold py-2 rounded-xl text-xs"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
