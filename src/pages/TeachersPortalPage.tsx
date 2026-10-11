import React, { useState } from 'react';
import {
  Award,
  CheckCircle,
  Briefcase,
  Calendar,
  Clock,
  UserCheck,
  FileText,
  Send,
  Sparkles,
  ShieldCheck,
  BookOpen,
  Video,
  Phone,
  CreditCard,
  AlertCircle,
  Download,
  Layers,
  Search,
  Building,
  ChevronRight,
  GraduationCap,
  Laptop,
  Wifi,
  Check,
  DollarSign,
  Heart,
  Users,
  Eye,
  MessageSquare,
  X,
  Globe,
  Sun,
  Moon,
} from 'lucide-react';
import { useAcademy } from '../context/AcademyContext';
import { TeacherApplication, Teacher } from '../types';

export const TeachersPortalPage: React.FC = () => {
  const {
    siteSettings,
    teachers,
    students,
    courses,
    applications,
    addApplication,
    language,
    setActivePage,
    shifts,
  } = useAcademy();

  // Active Tab: 'dashboard' | 'apply' | 'shifts' | 'salary-policy' | 'track'
  const [activeTab, setActiveTab] = useState<'dashboard' | 'apply' | 'shifts' | 'salary-policy' | 'track'>('dashboard');

  // Selected Faculty Member for Dashboard Workspace
  const [selectedTeacherId, setSelectedTeacherId] = useState<string>(teachers[0]?.id || 't1');
  const currentTeacher = teachers.find((t) => t.id === selectedTeacherId) || teachers[0];

  // Salary Slip Modal
  const [showSalarySlipModal, setShowSalarySlipModal] = useState(false);

  // Lesson Log Modal
  const [showLessonLogModal, setShowLessonLogModal] = useState(false);
  const [selectedStudentForLog, setSelectedStudentForLog] = useState<string>('');
  const [todaySabaq, setTodaySabaq] = useState('');
  const [todaySabqi, setTodaySabqi] = useState('');
  const [todayManzil, setTodayManzil] = useState('');
  const [tajweedRemarks, setTajweedRemarks] = useState('Excellent Makharij & Tajweed (ممتاز تجوید)');
  const [lessonLogSuccess, setLessonLogSuccess] = useState(false);

  // -------------------------------------------------------------
  // Full Teacher Application Form State
  // -------------------------------------------------------------
  const [title, setTitle] = useState('Qari Hafiz');
  const [fullName, setFullName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [cnic, setCnic] = useState('');
  const [phone, setPhone] = useState('');
  const [alternatePhone, setAlternatePhone] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState<'Male' | 'Female'>('Male');
  const [age, setAge] = useState('28');
  const [city, setCity] = useState('Rawalpindi');
  const [province, setProvince] = useState('Punjab');
  const [country, setCountry] = useState('Pakistan');
  const [address, setAddress] = useState('');

  // Islamic Education & Sanad
  const [qualification, setQualification] = useState('Shahadat-ul-Aalamiyyah (Dars-e-Nizami / MA Islamic Studies)');
  const [sanadMadrasa, setSanadMadrasa] = useState('Wifaq-ul-Madaris Al-Arabia Pakistan');
  const [hifzDetails, setHifzDetails] = useState('Complete Hafiz-ul-Quran with Certified Sanad');
  const [tajweedCertification, setTajweedCertification] = useState('Qira’at Hafs ‘an Asim with Tajweed Ijaza');
  const [secularEducation, setSecularEducation] = useState('Bachelor of Arts (BA / BS)');

  // Teaching Experience & Specialization
  const [experienceYears, setExperienceYears] = useState('3-5 Years (Professional Online Teacher)');
  const [experienceType, setExperienceType] = useState('Both Madrasa & International Online Sessions');
  const [selectedCourses, setSelectedCourses] = useState<string[]>([
    'Noorani Qaida',
    'Nazra Quran with Tajweed',
    'Hifz al-Quran',
    'Masnoon Duas & Salah',
  ]);
  const [studentAudience, setStudentAudience] = useState<'Kids & Boys' | 'Ladies & Sisters Only' | 'Adults & General' | 'Any'>('Kids & Boys');
  const [languagesSpoken, setLanguagesSpoken] = useState<string[]>(['Urdu', 'Arabic', 'English']);

  // Technical Setup & Shifts (3 Shifts of 8 Hours Each / 24 Hours Round the Clock)
  const [deviceType, setDeviceType] = useState('Laptop / Desktop PC with HD Webcam');
  const [internetConnection, setInternetConnection] = useState('High-Speed Fiber (20+ Mbps) with UPS/Power Backup');
  const [teachingShift, setTeachingShift] = useState('Shift 2: Evening Shift (04:00 PM – 12:00 AM PKT / 8 Hours)');
  const [weeklyHours, setWeeklyHours] = useState('48 Hours / Week (8 Hours Daily Shift - 6 Days)');
  const [hasQuietRoom, setHasQuietRoom] = useState(true);

  // SALARY & FINANCIAL INFORMATION (MINIMUM 50,000 PKR MANDATORY)
  const [expectedSalary, setExpectedSalary] = useState<number>(50000);
  const [salaryGrade, setSalaryGrade] = useState<'Grade 1 (Rs. 50,000 Entry)' | 'Grade 2 (Rs. 65,000 Senior)' | 'Grade 3 (Rs. 85,000+ Master)'>('Grade 1 (Rs. 50,000 Entry)');
  const [paymentMethod, setPaymentMethod] = useState<'EasyPaisa' | 'JazzCash' | 'Bank Transfer'>('EasyPaisa');
  const [accountTitle, setAccountTitle] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [bankName, setBankName] = useState('EasyPaisa Mobile Wallet');
  const [recitationDemo, setRecitationDemo] = useState('');
  const [bio, setBio] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(true);

  // Form submission feedback
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedAppId, setSubmittedAppId] = useState<string | null>(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  // Application Tracker State
  const [searchQuery, setSearchQuery] = useState('');
  const [trackResult, setTrackResult] = useState<TeacherApplication | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  // Toggle course checkbox
  const handleCourseToggle = (courseName: string) => {
    if (selectedCourses.includes(courseName)) {
      setSelectedCourses(selectedCourses.filter((c) => c !== courseName));
    } else {
      setSelectedCourses([...selectedCourses, courseName]);
    }
  };

  // Toggle language checkbox
  const handleLanguageToggle = (lang: string) => {
    if (languagesSpoken.includes(lang)) {
      setLanguagesSpoken(languagesSpoken.filter((l) => l !== lang));
    } else {
      setLanguagesSpoken([...languagesSpoken, lang]);
    }
  };

  // Handle Application Submit
  const handleApplicationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Strict validation: Full name, phone, account title, and MINIMUM 50,000 PKR salary
    if (!fullName.trim()) {
      setFormError('براہ کرم اپنا مکمل نام درج کریں۔ (Please enter your full name)');
      return;
    }
    if (!phone.trim()) {
      setFormError('براہ کرم اپنا واٹس ایپ نمبر درج کریں۔ (Please enter your WhatsApp contact)');
      return;
    }
    if (expectedSalary < 50000) {
      setFormError('اکیڈمی کے قواعد کے مطابق اساتذہ کی تنخواہ کم از کم 50,000 روپے (Rs. 50,000 PKR) ہونی چاہیے۔ اس سے کم تنخواہ درج کرنا ممنوع ہے۔');
      return;
    }
    if (!accountTitle.trim() || !accountNumber.trim()) {
      setFormError('براہ کرم ماہانہ تنخواہ کی منتقلی کے لیے اکاؤنٹ ٹائٹل اور اکاؤنٹ نمبر درج کریں۔');
      return;
    }
    if (!agreedToTerms) {
      setFormError('براہ کرم اکیڈمی کے کم از کم 50,000 تنخواہ کے معاہدے کی شرائط کو تسلیم کریں۔');
      return;
    }

    setIsSubmitting(true);
    const newId = `TEA-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;

    const newApp: TeacherApplication = {
      id: newId,
      applicantName: `${title} ${fullName.trim()}`,
      fullName: `${title} ${fullName.trim()}`,
      phone: phone.trim(),
      alternatePhone: alternatePhone.trim() || undefined,
      email: email.trim() || undefined,
      cnic: cnic.trim() || undefined,
      qualification,
      sanadMadrasa,
      hifzDetails,
      tajweedCertification,
      secularEducation,
      experienceYears,
      gender,
      city: `${city}, ${province}`,
      address: address.trim() || undefined,
      bio: bio.trim() || undefined,
      status: 'Accepted', // Auto approved for audit/contract with guaranteed min 50k
      date: new Date().toISOString().split('T')[0],
      appliedDate: new Date().toISOString().split('T')[0],
      expectedSalaryPKR: expectedSalary,
      approvedSalaryPKR: expectedSalary >= 50000 ? expectedSalary : 50000,
      teacherSalaryGrade: salaryGrade,
      paymentMethod,
      accountTitle: accountTitle.trim(),
      accountNumber: accountNumber.trim(),
      bankName: bankName.trim(),
      specializationCourses: selectedCourses,
      studentAudiencePreference: studentAudience,
      teachingShift,
      weeklyHoursAvailable: weeklyHours,
      deviceType,
      internetConnection,
      demoRecitationAudioUrl: recitationDemo.trim() || undefined,
      salaryAgreementAgreed: true,
    };

    await addApplication(newApp);
    setSubmittedAppId(newId);
    setIsSubmitting(false);
    setIsSuccessModalOpen(true);
  };

  // WhatsApp Notification to Founder Muneeb Ur Rehman
  const handleNotifyFounderWhatsApp = () => {
    const rawNumber = siteSettings.whatsappNumber.replace(/[^0-9]/g, '');
    const message = `السلام علیکم بانی اکیڈمی قاری منیب الرحمن!\n\nمیں نے شاہین الزیتون ٹیچرز پورٹل پر بطور قاری/استاد اپنی تفصیلی رجسٹریشن مکمل کر لی ہے:\n\n• درخواست حوالہ نمبر: ${submittedAppId}\n• نام: ${title} ${fullName}\n• سند/تعلیم: ${qualification}\n• حفظ/تجوید: ${hifzDetails}\n• رابطہ نمبر: ${phone}\n• شہر: ${city}, ${province}\n• ماہانہ تنخواہ: شروع میں Rs. ${expectedSalary.toLocaleString()} PKR (وقت کے ساتھ اضافہ)\n• تنخواہ وصولی کا ذریعہ: ${paymentMethod} (${accountNumber})\n• تدریسی شفٹ (8 گھنٹے روزانہ): ${teachingShift}\n\nبراہِ کرم آن لائن آڈیشن اور کلاس شیڈولنگ کے لیے رابطہ فرمائیں۔ جزاک اللہ خیراً!`;

    window.open(`https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  // Handle Search for Tracker
  const handleTrackSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const q = searchQuery.trim().toLowerCase();
    const found = applications.find(
      (a) =>
        a.id.toLowerCase() === q ||
        a.phone.replace(/[^0-9]/g, '').includes(q.replace(/[^0-9]/g, '')) ||
        (a.fullName && a.fullName.toLowerCase().includes(q))
    );

    setTrackResult(found || null);
    setHasSearched(true);
  };

  // Teacher's current monthly salary (minimum 50,000 PKR guaranteed)
  const teacherSalary = Math.max(currentTeacher?.monthlySalaryPKR || 50000, 50000);

  return (
    <div className="bg-red-950 text-white min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Top Banner / Breadcrumb */}
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Portal Title & Minimum Salary Guarantee Announcement */}
        <div className="bg-gradient-to-r from-red-900 via-amber-950 to-red-900 border-2 border-amber-500/60 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="space-y-3 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-black uppercase tracking-wider border border-amber-400/40">
                <Award className="w-4 h-4 text-amber-400" />
                <span>Shaheen Al Zaitoon Official Faculty Portal</span>
                <span className="hidden sm:inline">•</span>
                <span className="text-emerald-400 font-extrabold">مستند اساتذہ و قراء پورٹل</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-amber-100 leading-tight">
                Teachers Portal & Recruitment Desk
              </h1>

              <p className="text-xs sm:text-sm text-red-200 max-w-2xl leading-relaxed">
                Welcome to the digital faculty workspace for our certified international Quran teachers. Manage daily classes, student sabaq diaries, live sessions, and track your monthly honorarium.
              </p>
            </div>

            {/* HIGHLIGHT BADGES: 8-HOUR 3 SHIFTS & RS. 50,000 SALARY */}
            <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3 w-full lg:w-auto shrink-0">
              {/* 3 SHIFTS OF 8 HOURS BADGE */}
              <div className="bg-gradient-to-b from-red-950 via-amber-950 to-blue-950 border-2 border-amber-400/80 rounded-2xl p-4 sm:p-5 text-center shadow-2xl flex-1 min-w-[260px]">
                <div className="flex items-center justify-center gap-1.5 text-amber-400 text-xs font-black uppercase tracking-wider mb-1">
                  <Clock className="w-4 h-4 text-amber-400 animate-spin-slow" />
                  <span>24/7 Academy Operations</span>
                </div>
                <div className="text-xs text-amber-200 font-semibold">اکیڈمی تدریسی شیڈول:</div>
                <div className="text-xl sm:text-2xl font-black font-serif text-amber-300 my-1 drop-shadow-sm">
                  8 گھنٹے کی 3 شفٹس
                  <span className="text-xs text-amber-200 block font-normal">(صبح • شام • رات / 24 گھنٹے)</span>
                </div>
                <div className="text-[11px] text-red-100 bg-red-900/60 rounded-lg p-2 border border-red-800 leading-tight">
                  اکیڈمی نظام: <strong>8، 8 گھنٹے کی 3 شفٹس</strong> میں چوبیس گھنٹے پاکستان، یو کے، امریکہ و دنیا بھر کے طلبہ کو لائیو پڑھایا جاتا ہے۔
                </div>
              </div>

              {/* MANDATORY SALARY BADGE: STARTING RS. 50,000 FOR ALL TEACHERS */}
              <div className="bg-gradient-to-b from-red-950 via-amber-950 to-emerald-950 border-2 border-emerald-400/80 rounded-2xl p-4 sm:p-5 text-center shadow-2xl flex-1 min-w-[260px]">
                <div className="flex items-center justify-center gap-1.5 text-emerald-400 text-xs font-black uppercase tracking-wider mb-1">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Faculty Honorarium Charter</span>
                </div>
                <div className="text-xs text-amber-200 font-semibold">شروع میں تمام اساتذہ کی تنخواہ:</div>
                <div className="text-2xl sm:text-3xl font-black font-serif text-emerald-300 my-1 drop-shadow-sm">
                  Rs. 50,000 PKR
                  <span className="text-xs text-amber-200 block font-normal">/ ماہانہ (ابتدائی فکسڈ مشاہرہ)</span>
                </div>
                <div className="text-[11px] text-red-100 bg-red-900/60 rounded-lg p-2 border border-red-800 leading-tight">
                  اکیڈمی پالیسی: <strong>شروع میں تمام اساتذہ کی تنخواہ 50,000 روپے ہی ہو گی</strong>، اور بعد میں وقت اور کارکردگی کے ساتھ باقاعدگی سے بڑھتی جائے گی۔
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tab Bar */}
          <div className="mt-8 pt-6 border-t border-red-800/80 flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md ${
                activeTab === 'dashboard'
                  ? 'bg-amber-500 text-red-950 font-black shadow-amber-500/20'
                  : 'bg-red-950/80 text-amber-200 hover:bg-red-900 border border-red-800'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>1. Teacher Dashboard & Salary (فیکلٹی ڈیش بورڈ)</span>
            </button>

            <button
              onClick={() => setActiveTab('apply')}
              className={`flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md ${
                activeTab === 'apply'
                  ? 'bg-amber-500 text-red-950 font-black shadow-amber-500/20'
                  : 'bg-red-950/80 text-amber-200 hover:bg-red-900 border border-red-800'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>2. Detailed Application Form (ٹیچر بھرتی فارم)</span>
            </button>

            <button
              onClick={() => setActiveTab('shifts')}
              className={`flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md ${
                activeTab === 'shifts'
                  ? 'bg-amber-500 text-red-950 font-black shadow-amber-500/20'
                  : 'bg-red-950/80 text-amber-200 hover:bg-red-900 border border-red-800'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>3. 3 Shifts System (8 گھنٹے کی 3 شفٹس • 24h)</span>
            </button>

            <button
              onClick={() => setActiveTab('salary-policy')}
              className={`flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md ${
                activeTab === 'salary-policy'
                  ? 'bg-amber-500 text-red-950 font-black shadow-amber-500/20'
                  : 'bg-red-950/80 text-amber-200 hover:bg-red-900 border border-red-800'
              }`}
            >
              <DollarSign className="w-4 h-4" />
              <span>4. Salary Policy & Scale (شروع 50,000 اور ترقی منشور)</span>
            </button>

            <button
              onClick={() => setActiveTab('track')}
              className={`flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md ${
                activeTab === 'track'
                  ? 'bg-amber-500 text-red-950 font-black shadow-amber-500/20'
                  : 'bg-red-950/80 text-amber-200 hover:bg-red-900 border border-red-800'
              }`}
            >
              <Search className="w-4 h-4" />
              <span>5. Track Application (اسٹیٹس چیک کریں)</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: TEACHER DASHBOARD & SALARY WORKSPACE                                */}
        {/* ========================================================================= */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Faculty Switcher Header */}
            <div className="bg-red-900/60 border border-amber-500/40 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 w-full md:w-auto">
                <div className="w-12 h-12 rounded-xl bg-amber-500 text-red-950 font-black flex items-center justify-center font-serif text-xl shrink-0 shadow-md">
                  {currentTeacher.name.charAt(0)}
                </div>
                <div>
                  <div className="text-xs text-amber-300 font-bold uppercase tracking-wider">
                    Logged-in Faculty Member:
                  </div>
                  <div className="text-base sm:text-lg font-bold font-serif text-white">
                    {currentTeacher.name} ({currentTeacher.title})
                  </div>
                  <div className="text-xs text-red-200">
                    ID: {currentTeacher.id} • {currentTeacher.qualification}
                  </div>
                </div>
              </div>

              {/* Quick Switch Dropdown */}
              <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                <span className="text-xs text-red-300 hidden sm:inline">Switch Faculty:</span>
                <select
                  value={selectedTeacherId}
                  onChange={(e) => setSelectedTeacherId(e.target.value)}
                  className="bg-red-950 text-amber-200 border border-red-700 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-amber-400 w-full sm:w-auto cursor-pointer"
                >
                  {teachers.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name} ({t.title}) — Rs. {Math.max(t.monthlySalaryPKR || 50000, 50000).toLocaleString()}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Top Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* SALARY METRIC BOX (STARTING 50,000 GUARANTEED, INCREASING OVER TIME) */}
              <div className="bg-gradient-to-br from-emerald-950 to-red-900 border-2 border-emerald-400/70 rounded-2xl p-5 space-y-2 shadow-xl relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                    Starting Monthly Salary
                  </span>
                  <span className="bg-emerald-500 text-red-950 text-[10px] font-black px-2 py-0.5 rounded-full">
                    شروع میں 50k
                  </span>
                </div>
                <div className="text-2xl sm:text-3xl font-black font-serif text-white">
                  Rs. {teacherSalary.toLocaleString()}
                  <span className="text-xs text-amber-300 font-normal block">PKR / Month (وقت کے ساتھ اضافہ)</span>
                </div>
                <div className="flex items-center justify-between pt-1 text-xs">
                  <span className="text-emerald-300 font-bold flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>یکم تاریخ کو ادائیگی</span>
                  </span>
                  <button
                    onClick={() => setShowSalarySlipModal(true)}
                    className="text-amber-300 hover:text-white underline font-bold"
                  >
                    View Salary Slip →
                  </button>
                </div>
              </div>

              {/* Active Assigned Students */}
              <div className="bg-red-900/60 border border-amber-500/30 rounded-2xl p-5 space-y-2">
                <div className="text-xs text-red-300">Active Assigned Students</div>
                <div className="text-2xl sm:text-3xl font-bold font-serif text-amber-200">
                  {currentTeacher.assignedStudentsCount || 12} Students
                </div>
                <div className="text-xs text-amber-300 flex items-center justify-between">
                  <span>UK, USA, UAE & Pakistan</span>
                  <span className="text-emerald-400 font-bold">1-on-1 Sessions</span>
                </div>
              </div>

              {/* Monthly Teaching Shift & 8 Hours Duty */}
              <div className="bg-gradient-to-br from-red-900/80 to-blue-950/70 border border-amber-500/40 rounded-2xl p-5 space-y-2 relative overflow-hidden">
                <div className="flex items-center justify-between text-xs text-red-300">
                  <span className="font-semibold text-amber-200">Official Shift (8 Hours)</span>
                  <span className="bg-amber-400 text-red-950 text-[10px] font-black px-2 py-0.5 rounded-full">
                    8 گھنٹے روزانہ
                  </span>
                </div>
                <div className="text-base sm:text-lg font-bold font-serif text-white">
                  {currentTeacher.teachingShift || 'Evening Shift (04:00 PM – 12:00 AM PKT / 8 Hours)'}
                </div>
                <div className="text-xs text-emerald-300 flex items-center justify-between pt-1 border-t border-red-800/60">
                  <span>8 Hours Duty • 48h Weekly</span>
                  <button
                    onClick={() => setActiveTab('shifts')}
                    className="text-amber-300 hover:text-white underline font-bold cursor-pointer"
                  >
                    View 3 Shifts →
                  </button>
                </div>
              </div>

              {/* Attendance & Punctuality Rating */}
              <div className="bg-red-900/60 border border-amber-500/30 rounded-2xl p-5 space-y-2">
                <div className="text-xs text-red-300">Faculty Punctuality Score</div>
                <div className="text-2xl sm:text-3xl font-bold font-serif text-emerald-400">
                  99.4%
                </div>
                <div className="text-xs text-amber-300">
                  Eligible for Year-End Bonus
                </div>
              </div>
            </div>

            {/* Quick Action Bar for Teachers */}
            <div className="bg-gradient-to-r from-red-900 to-amber-950 border border-amber-500/40 rounded-2xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
                <div className="text-xs sm:text-sm">
                  <strong className="text-amber-200">Faculty Quick Actions:</strong> Log today&apos;s Sabaq, launch live video session, or access student progress.
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setShowLessonLogModal(true)}
                  className="bg-amber-500 hover:bg-amber-400 text-red-950 font-black text-xs px-4 py-2.5 rounded-xl shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Log Sabaq / سبق ڈائری</span>
                </button>

                <button
                  onClick={() => setActivePage('live-classes')}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  <Video className="w-4 h-4" />
                  <span>Start Live Class Studio</span>
                </button>

                <button
                  onClick={() => setShowSalarySlipModal(true)}
                  className="bg-red-950 hover:bg-red-900 text-amber-200 border border-amber-500/40 font-bold text-xs px-4 py-2.5 rounded-xl shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  <DollarSign className="w-4 h-4 text-emerald-400" />
                  <span>Salary Voucher (Rs. {teacherSalary.toLocaleString()})</span>
                </button>
              </div>
            </div>

            {/* Assigned Students Roster Table */}
            <div className="bg-red-900/60 border border-amber-500/30 rounded-2xl p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-red-800 pb-3">
                <div>
                  <h3 className="font-serif font-bold text-lg text-amber-200 flex items-center gap-2">
                    <Users className="w-5 h-5 text-amber-400" />
                    <span>My Assigned Students Roster ({students.length})</span>
                  </h3>
                  <p className="text-xs text-red-200">
                    Live tracking of assigned students, current progress, and direct class initiation.
                  </p>
                </div>
                <span className="text-xs bg-emerald-500/20 text-emerald-300 font-bold px-3 py-1 rounded-full border border-emerald-400/30 self-start sm:self-auto">
                  All Students Enrolled
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-red-950 text-amber-300 uppercase border-b border-red-800">
                    <tr>
                      <th className="p-3">Student ID</th>
                      <th className="p-3">Student Name</th>
                      <th className="p-3">Guardian</th>
                      <th className="p-3">Course</th>
                      <th className="p-3">Current Lesson / Para</th>
                      <th className="p-3">Attendance</th>
                      <th className="p-3">Fee Status</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-red-800/60">
                    {students.map((student) => {
                      const course = courses.find((c) => c.id === student.courseId) || courses[0];
                      return (
                        <tr key={student.id} className="hover:bg-red-900/80 transition-colors">
                          <td className="p-3 font-mono text-amber-300 font-bold">{student.id}</td>
                          <td className="p-3 font-bold text-white flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold text-[11px]">
                              {student.name.charAt(0)}
                            </div>
                            <span>{student.name}</span>
                          </td>
                          <td className="p-3 text-red-200">{student.guardianName}</td>
                          <td className="p-3 text-amber-200 font-medium">{course.title}</td>
                          <td className="p-3">
                            <span className="bg-red-950 px-2 py-0.5 rounded text-[11px] font-mono text-amber-300 border border-red-800">
                              Para / Juz {student.currentPara} ({student.progressPercent}%)
                            </span>
                          </td>
                          <td className="p-3">
                            <span className="text-emerald-400 font-bold">{student.attendanceRate}%</span>
                          </td>
                          <td className="p-3">
                            <span className="bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded text-[10px] font-bold border border-emerald-400/30">
                              {student.feeStatus}
                            </span>
                          </td>
                          <td className="p-3 text-right space-x-1 whitespace-nowrap">
                            <button
                              onClick={() => {
                                setSelectedStudentForLog(student.name);
                                setShowLessonLogModal(true);
                              }}
                              className="bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-red-950 font-bold text-[11px] px-2.5 py-1 rounded-lg transition-colors border border-amber-400/40"
                            >
                              Log Sabaq
                            </button>
                            <button
                              onClick={() => setActivePage('live-classes')}
                              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] px-2.5 py-1 rounded-lg transition-colors"
                            >
                              Join Call
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Weekly Timetable & International Timezones */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-red-900/60 border border-amber-500/30 rounded-2xl p-6 space-y-4">
                <h3 className="font-serif font-bold text-lg text-amber-200 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-amber-400" />
                  <span>Today&apos;s Class Schedule ({currentTeacher.name})</span>
                </h3>

                <div className="space-y-3 text-xs">
                  <div className="p-3 bg-red-950/80 rounded-xl border border-red-800 flex justify-between items-center">
                    <div>
                      <div className="font-bold text-white">Hamza Khan (London, UK)</div>
                      <div className="text-red-300">Course: Nazra Quran with Tajweed • Lesson: Surah Al-Baqarah 45-50</div>
                    </div>
                    <div className="text-right">
                      <div className="text-amber-300 font-mono font-bold">5:00 PM PKT</div>
                      <div className="text-[10px] text-red-300">1:00 PM GMT</div>
                    </div>
                  </div>

                  <div className="p-3 bg-red-950/80 rounded-xl border border-red-800 flex justify-between items-center">
                    <div>
                      <div className="font-bold text-white">Maryam Fatima (Dallas, USA)</div>
                      <div className="text-red-300">Course: Noorani Qaida for Kids • Lesson: Tanween Letters</div>
                    </div>
                    <div className="text-right">
                      <div className="text-amber-300 font-mono font-bold">6:30 PM PKT</div>
                      <div className="text-[10px] text-red-300">8:30 AM EST</div>
                    </div>
                  </div>

                  <div className="p-3 bg-red-950/80 rounded-xl border border-red-800 flex justify-between items-center">
                    <div>
                      <div className="font-bold text-white">Zayd Ahmed (Toronto, Canada)</div>
                      <div className="text-red-300">Course: Hifz-ul-Quran Memorization • Lesson: Para 2 Manzil</div>
                    </div>
                    <div className="text-right">
                      <div className="text-amber-300 font-mono font-bold">8:00 PM PKT</div>
                      <div className="text-[10px] text-red-300">11:00 AM EST</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Digital Teaching Toolkit */}
              <div className="bg-red-900/60 border border-amber-500/30 rounded-2xl p-6 space-y-4">
                <h3 className="font-serif font-bold text-lg text-amber-200 flex items-center gap-2">
                  <Laptop className="w-5 h-5 text-amber-400" />
                  <span>Digital Teaching Toolkit & Classroom Resources</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 bg-red-950/80 rounded-xl border border-red-800 space-y-1.5">
                    <div className="font-bold text-amber-200 flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-emerald-400" />
                      <span>16-Line Quran Mushaf</span>
                    </div>
                    <p className="text-[11px] text-red-200">
                      High-resolution Tajweed color-coded Mushaf for screen sharing.
                    </p>
                    <a
                      href="#mushaf"
                      onClick={(e) => {
                        e.preventDefault();
                        setActivePage('live-classes');
                      }}
                      className="text-amber-300 hover:underline font-bold text-[11px] inline-block"
                    >
                      Open Digital Mushaf →
                    </a>
                  </div>

                  <div className="p-3.5 bg-red-950/80 rounded-xl border border-red-800 space-y-1.5">
                    <div className="font-bold text-amber-200 flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-amber-400" />
                      <span>Noorani Qaida PDF Slides</span>
                    </div>
                    <p className="text-[11px] text-red-200">
                      Interactive 17-lesson beginner syllabus with color guides.
                    </p>
                    <a
                      href="#qaida"
                      onClick={(e) => {
                        e.preventDefault();
                        setActivePage('noorani-qaida');
                      }}
                      className="text-amber-300 hover:underline font-bold text-[11px] inline-block"
                    >
                      Open Qaida Lessons →
                    </a>
                  </div>

                  <div className="p-3.5 bg-red-950/80 rounded-xl border border-red-800 space-y-1.5">
                    <div className="font-bold text-amber-200 flex items-center gap-1.5">
                      <Phone className="w-4 h-4 text-emerald-400" />
                      <span>Academic Board WhatsApp</span>
                    </div>
                    <p className="text-[11px] text-red-200">
                      Emergency coordinator helpline for class rescheduling.
                    </p>
                    <a
                      href={`https://wa.me/92${siteSettings.whatsappNumber.replace(/^0/, '')}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-emerald-300 hover:underline font-bold text-[11px] inline-block"
                    >
                      Contact HQ: {siteSettings.whatsappNumber}
                    </a>
                  </div>

                  <div className="p-3.5 bg-red-950/80 rounded-xl border border-red-800 space-y-1.5">
                    <div className="font-bold text-amber-200 flex items-center gap-1.5">
                      <CreditCard className="w-4 h-4 text-amber-400" />
                      <span>Salary Disbursement Help</span>
                    </div>
                    <p className="text-[11px] text-red-200">
                      Bank details update, payment receipts, and allowances.
                    </p>
                    <button
                      onClick={() => setShowSalarySlipModal(true)}
                      className="text-amber-300 hover:underline font-bold text-[11px] inline-block"
                    >
                      Check Salary Status →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: DETAILED TEACHER APPLICATION & REGISTRATION FORM                     */}
        {/* ========================================================================= */}
        {activeTab === 'apply' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-red-900 via-amber-950 to-red-900 border-2 border-emerald-500/70 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-red-800/80 pb-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/40 uppercase tracking-wider mb-1">
                    <CheckCircle className="w-4 h-4" />
                    <span>Global Faculty Registration Form • اساتذہ بھرتی فارم</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-serif font-black text-amber-100">
                    Comprehensive Instructor Application Form
                  </h2>
                  <p className="text-xs sm:text-sm text-red-200">
                    Join Shaheen Al Zaitoon Quran Academy faculty. We provide dignified, guaranteed compensation starting at <strong>Rs. 50,000 PKR / Month</strong> minimum.
                  </p>
                </div>

                <div className="bg-red-950/90 border border-amber-500/50 rounded-2xl p-3 text-center shrink-0">
                  <div className="text-[11px] text-amber-300 font-bold uppercase">Minimum Monthly Salary</div>
                  <div className="text-xl sm:text-2xl font-black text-emerald-300 font-serif">Rs. 50,000 PKR</div>
                  <div className="text-[10px] text-red-300">Guaranteed by Academy Founder</div>
                </div>
              </div>

              {formError && (
                <div className="bg-red-900/90 border-2 border-red-500 text-white p-4 rounded-xl text-xs sm:text-sm flex items-start gap-3 shadow-lg">
                  <AlertCircle className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-amber-200">درخواست میں ضروری تصحیح:</strong>
                    <div className="mt-1">{formError}</div>
                  </div>
                </div>
              )}

              <form onSubmit={handleApplicationSubmit} className="space-y-8 pt-2">
                {/* 1. PERSONAL INFORMATION */}
                <div className="bg-red-950/60 border border-red-800 rounded-2xl p-5 sm:p-6 space-y-4">
                  <h3 className="text-base sm:text-lg font-serif font-bold text-amber-200 flex items-center gap-2 border-b border-red-800 pb-2">
                    <UserCheck className="w-5 h-5 text-amber-400" />
                    <span>1. Personal & Contact Details (ذاتی و رابطے کی معلومات)</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-amber-200 mb-1">
                        Title *
                      </label>
                      <select
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full bg-red-900/80 border border-red-700 text-white rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-amber-400"
                      >
                        <option>Qari Hafiz</option>
                        <option>Qari</option>
                        <option>Hafiz-ul-Quran</option>
                        <option>Alim / Islamic Scholar</option>
                        <option>Mufti</option>
                        <option>Qaria / Alimah (Female)</option>
                        <option>Hafiza-e-Quran (Female)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-amber-200 mb-1">
                        Full Name (پورا نام) *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Muhammad Bilal"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full bg-red-900/80 border border-red-700 text-white rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-amber-200 mb-1">
                        Father / Guardian Name (والد کا نام)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Abdul Rahman"
                        value={fatherName}
                        onChange={(e) => setFatherName(e.target.value)}
                        className="w-full bg-red-900/80 border border-red-700 text-white rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-amber-200 mb-1">
                        WhatsApp Contact Number (واٹس ایپ نمبر) *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 03447956085"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-red-900/80 border border-red-700 text-white rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-amber-200 mb-1">
                        Alternate Mobile / Emergency Contact
                      </label>
                      <input
                        type="tel"
                        placeholder="e.g. 03001234567"
                        value={alternatePhone}
                        onChange={(e) => setAlternatePhone(e.target.value)}
                        className="w-full bg-red-900/80 border border-red-700 text-white rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-amber-200 mb-1">
                        CNIC / National ID (شناختی کارڈ نمبر)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 37405-1234567-1"
                        value={cnic}
                        onChange={(e) => setCnic(e.target.value)}
                        className="w-full bg-red-900/80 border border-red-700 text-white rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-amber-200 mb-1">
                        Gender (جنس) *
                      </label>
                      <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value as any)}
                        className="w-full bg-red-900/80 border border-red-700 text-white rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-amber-400"
                      >
                        <option value="Male">Male Qari (مرد قاری برائے طلباء و بچے)</option>
                        <option value="Female">Female Qaria (خاتون قاریہ برائے طالبات و بچے)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-amber-200 mb-1">
                        Age (عمر)
                      </label>
                      <input
                        type="number"
                        min="18"
                        max="70"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className="w-full bg-red-900/80 border border-red-700 text-white rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-amber-200 mb-1">
                        Email Address (ای میل پتہ)
                      </label>
                      <input
                        type="email"
                        placeholder="e.g. qari@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-red-900/80 border border-red-700 text-white rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-amber-200 mb-1">
                        City (شہر) *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rawalpindi / Islamabad"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full bg-red-900/80 border border-red-700 text-white rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-amber-200 mb-1">
                        Province / State (صوبہ)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Punjab / KPK / Sindh"
                        value={province}
                        onChange={(e) => setProvince(e.target.value)}
                        className="w-full bg-red-900/80 border border-red-700 text-white rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-amber-200 mb-1">
                        Country (ملک)
                      </label>
                      <input
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-full bg-red-900/80 border border-red-700 text-white rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-amber-200 mb-1">
                      Complete Residential Address (مکمل رہائشی پتہ)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. House No, Street, Sector / Area, Rawalpindi"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full bg-red-900/80 border border-red-700 text-white rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                {/* 2. ISLAMIC EDUCATION & SANAD QUALIFICATIONS */}
                <div className="bg-red-950/60 border border-red-800 rounded-2xl p-5 sm:p-6 space-y-4">
                  <h3 className="text-base sm:text-lg font-serif font-bold text-amber-200 flex items-center gap-2 border-b border-red-800 pb-2">
                    <GraduationCap className="w-5 h-5 text-amber-400" />
                    <span>2. Islamic Education & Certified Sanad (دینی اسناد و اسنادِ حفظ و تجوید)</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-amber-200 mb-1">
                        Highest Islamic Degree / Sanad (اعلیٰ دینی سند) *
                      </label>
                      <select
                        value={qualification}
                        onChange={(e) => setQualification(e.target.value)}
                        className="w-full bg-red-900/80 border border-red-700 text-white rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-amber-400"
                      >
                        <option>Shahadat-ul-Aalamiyyah (Dars-e-Nizami / MA Islamic Studies equivalent)</option>
                        <option>Shahadat-ul-Aliyah (BA equivalent Islamic Studies)</option>
                        <option>Hafiz-ul-Quran with Certified Tajweed Sanad</option>
                        <option>Takhassus Fil-Fiqh / Mufti Course</option>
                        <option>Alimah Course (8-Year Graduate for Sisters)</option>
                        <option>Tajweed & Qira’at 2-Year Diploma Graduate</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-amber-200 mb-1">
                        Board / Madrasa Name (وفاق یا جامعہ کا نام) *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Wifaq-ul-Madaris / Jamia Darul Uloom / Jamia Ashrafia"
                        value={sanadMadrasa}
                        onChange={(e) => setSanadMadrasa(e.target.value)}
                        className="w-full bg-red-900/80 border border-red-700 text-white rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-amber-200 mb-1">
                        Hifz-ul-Quran Status (حفظ القرآن کی تفصیل) *
                      </label>
                      <select
                        value={hifzDetails}
                        onChange={(e) => setHifzDetails(e.target.value)}
                        className="w-full bg-red-900/80 border border-red-700 text-white rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-amber-400"
                      >
                        <option>Complete Hafiz-ul-Quran with Certified Sanad (مکمل حافظ مع سند)</option>
                        <option>Hafiz-ul-Quran (Partially completed / Strong Revision)</option>
                        <option>Nazra Quran & Tajweed Specialist (Non-Hafiz)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-amber-200 mb-1">
                        Tajweed & Qira’at Authorization / Ijaza (تجوید و قراءات کی اجازت)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Qira’at Hafs ‘an Asim, Saba’ah, or Tajweed Sanad"
                        value={tajweedCertification}
                        onChange={(e) => setTajweedCertification(e.target.value)}
                        className="w-full bg-red-900/80 border border-red-700 text-white rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-amber-200 mb-1">
                        Secular Academic Qualification (عصری تعلیم)
                      </label>
                      <select
                        value={secularEducation}
                        onChange={(e) => setSecularEducation(e.target.value)}
                        className="w-full bg-red-900/80 border border-red-700 text-white rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-amber-400"
                      >
                        <option>Matriculation (10th Grade)</option>
                        <option>Intermediate (FA / FSc / ICS)</option>
                        <option>Bachelor of Arts / Science (BA / BSc / BS)</option>
                        <option>Master of Arts / Science (MA / MSc / MS)</option>
                        <option>MPhil / PhD in Islamic Studies or Linguistics</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-amber-200 mb-1">
                        Sample Recitation Audio / Video Link (تلاوت کا آڈیو/ویڈیو لنک)
                      </label>
                      <input
                        type="url"
                        placeholder="e.g. Google Drive, YouTube, or SoundCloud link"
                        value={recitationDemo}
                        onChange={(e) => setRecitationDemo(e.target.value)}
                        className="w-full bg-red-900/80 border border-red-700 text-white rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. TEACHING EXPERIENCE & COURSES OFFERED */}
                <div className="bg-red-950/60 border border-red-800 rounded-2xl p-5 sm:p-6 space-y-4">
                  <h3 className="text-base sm:text-lg font-serif font-bold text-amber-200 flex items-center gap-2 border-b border-red-800 pb-2">
                    <Briefcase className="w-5 h-5 text-amber-400" />
                    <span>3. Teaching Experience & Subject Specializations (تدریسی تجربہ و نصاب)</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-amber-200 mb-1">
                        Years of Quran Teaching Experience *
                      </label>
                      <select
                        value={experienceYears}
                        onChange={(e) => setExperienceYears(e.target.value)}
                        className="w-full bg-red-900/80 border border-red-700 text-white rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-amber-400"
                      >
                        <option>1-2 Years (Online or Physical Madrasa)</option>
                        <option>3-5 Years (Professional Online Teacher)</option>
                        <option>5-10 Years (Senior Qari / International)</option>
                        <option>10+ Years (Master Scholar & Qari)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-amber-200 mb-1">
                        Teaching Experience Type
                      </label>
                      <select
                        value={experienceType}
                        onChange={(e) => setExperienceType(e.target.value)}
                        className="w-full bg-red-900/80 border border-red-700 text-white rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-amber-400"
                      >
                        <option>Both Madrasa & International Online Sessions</option>
                        <option>Primarily International 1-on-1 Online Classes</option>
                        <option>Traditional Islamic Seminary (Madrasa) Only</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-amber-200 mb-1">
                        Target Student Preference
                      </label>
                      <select
                        value={studentAudience}
                        onChange={(e) => setStudentAudience(e.target.value as any)}
                        className="w-full bg-red-900/80 border border-red-700 text-white rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-amber-400"
                      >
                        <option value="Kids & Boys">Children & Young Boys (بچے اور لڑکے)</option>
                        <option value="Ladies & Sisters Only">Ladies & Sisters Only (خواتین و بچیاں)</option>
                        <option value="Adults & General">Adult Males & Professionals (بڑے اور پروفیشنلز)</option>
                        <option value="Any">Any Audience (ہر عمر کے طلباء)</option>
                      </select>
                    </div>
                  </div>

                  {/* Courses capable of teaching */}
                  <div>
                    <label className="block text-xs font-semibold text-amber-200 mb-2">
                      Courses You Are Capable of Teaching (جن کورسز کی تدریس کر سکتے ہیں):
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 text-xs">
                      {[
                        'Noorani Qaida',
                        'Nazra Quran with Tajweed',
                        'Hifz al-Quran',
                        'Tajweed Rules & Makharij',
                        'Quran Translation & Tafseer',
                        'Quranic Arabic & Grammar',
                        'Masnoon Duas & Salah',
                        'Islamic Studies for Kids',
                        'Tuhfat-ul-Atfal & Jazariyyah',
                        'Ladies Special Quran Class',
                      ].map((courseName) => (
                        <label
                          key={courseName}
                          className={`flex items-center gap-2 p-2 rounded-xl border cursor-pointer transition-colors ${
                            selectedCourses.includes(courseName)
                              ? 'bg-amber-500/20 border-amber-400 text-amber-200'
                              : 'bg-red-900/50 border-red-800 text-red-200 hover:border-red-700'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={selectedCourses.includes(courseName)}
                            onChange={() => handleCourseToggle(courseName)}
                            className="rounded text-amber-500 focus:ring-0"
                          />
                          <span className="truncate">{courseName}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Languages spoken */}
                  <div>
                    <label className="block text-xs font-semibold text-amber-200 mb-2">
                      Spoken Languages for Student Communication (گفتگو کی زبانیں):
                    </label>
                    <div className="flex flex-wrap gap-2 text-xs">
                      {['Urdu', 'English', 'Arabic', 'Pashto', 'Punjabi', 'Sindhi'].map((lang) => (
                        <label
                          key={lang}
                          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border cursor-pointer transition-colors ${
                            languagesSpoken.includes(lang)
                              ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200 font-bold'
                              : 'bg-red-900/50 border-red-800 text-red-200'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={languagesSpoken.includes(lang)}
                            onChange={() => handleLanguageToggle(lang)}
                            className="rounded text-emerald-500 focus:ring-0"
                          />
                          <span>{lang}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 4. TECHNICAL SETUP & TIMINGS */}
                <div className="bg-red-950/60 border border-red-800 rounded-2xl p-5 sm:p-6 space-y-4">
                  <h3 className="text-base sm:text-lg font-serif font-bold text-amber-200 flex items-center gap-2 border-b border-red-800 pb-2">
                    <Laptop className="w-5 h-5 text-amber-400" />
                    <span>4. Technical Setup & Class Availability (آن لائن کلاس سیٹ اپ و تدریسی اوقات)</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-amber-200 mb-1">
                        Device Available for Teaching *
                      </label>
                      <select
                        value={deviceType}
                        onChange={(e) => setDeviceType(e.target.value)}
                        className="w-full bg-red-900/80 border border-red-700 text-white rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-amber-400"
                      >
                        <option>Laptop / Desktop PC with HD Webcam</option>
                        <option>Tablet / iPad with Stylus</option>
                        <option>Modern Smartphone with High-End Mic</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-amber-200 mb-1">
                        Internet Connection Type *
                      </label>
                      <select
                        value={internetConnection}
                        onChange={(e) => setInternetConnection(e.target.value)}
                        className="w-full bg-red-900/80 border border-red-700 text-white rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-amber-400"
                      >
                        <option>High-Speed Fiber (20+ Mbps) with UPS/Power Backup</option>
                        <option>PTCL Broadband (15+ Mbps) with Backup</option>
                        <option>4G LTE Mobile Wi-Fi (Jazz / Zong)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-amber-200 mb-1">
                        Preferred 8-Hour Teaching Shift (اکیڈمی میں 8 گھنٹے کی شفٹ) *
                      </label>
                      <select
                        value={teachingShift}
                        onChange={(e) => setTeachingShift(e.target.value)}
                        className="w-full bg-red-900/80 border border-red-700 text-white rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-amber-400 font-medium"
                      >
                        <option value="Shift 1: Morning Shift (08:00 AM – 04:00 PM PKT / 8 Hours)">
                          شفٹ 1: صبح کی شفٹ (08:00 AM – 04:00 PM PKT • 8 گھنٹے)
                        </option>
                        <option value="Shift 2: Evening Shift (04:00 PM – 12:00 AM PKT / 8 Hours)">
                          شفٹ 2: شام کی شفٹ (04:00 PM – 12:00 AM PKT • 8 گھنٹے)
                        </option>
                        <option value="Shift 3: Night / Overseas Shift (12:00 AM – 08:00 AM PKT / 8 Hours)">
                          شفٹ 3: رات و اوورسیز شفٹ (12:00 AM – 08:00 AM PKT • 8 گھنٹے)
                        </option>
                      </select>
                      <p className="text-[10px] text-emerald-300 mt-1">
                        ✓ اکیڈمی کا لازمی نظام: 8 گھنٹے کی 3 شفٹس (صبح، شام یا رات)۔
                      </p>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-amber-200 mb-1">
                        Weekly Hours Committed (ہفتہ وار تدریسی گھنٹے) *
                      </label>
                      <select
                        value={weeklyHours}
                        onChange={(e) => setWeeklyHours(e.target.value)}
                        className="w-full bg-red-900/80 border border-red-700 text-white rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-amber-400"
                      >
                        <option>48 Hours / Week (8 Hours Daily • 6 Days Standard Roster)</option>
                        <option>40 Hours / Week (8 Hours Daily • 5 Days Weekdays Only)</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2 flex items-center gap-3 pt-4">
                      <input
                        type="checkbox"
                        id="quietRoomCheck"
                        checked={hasQuietRoom}
                        onChange={(e) => setHasQuietRoom(e.target.checked)}
                        className="w-4 h-4 rounded text-emerald-500 focus:ring-0"
                      />
                      <label htmlFor="quietRoomCheck" className="text-xs text-red-100 cursor-pointer">
                        میں تصدیق کرتا ہوں کہ میرے پاس تدریس کے لیے ایک پرسکون کمرہ اور شور سے پاک ہیڈسیٹ موجود ہے۔
                      </label>
                    </div>
                  </div>
                </div>

                {/* 5. MANDATORY SALARY & BANKING DETAILS (MINIMUM 50,000 PKR ENFORCED) */}
                <div className="bg-gradient-to-b from-red-950 via-amber-950/70 to-red-950 border-2 border-emerald-400/80 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-emerald-500/40 pb-3">
                    <h3 className="text-base sm:text-lg font-serif font-black text-amber-200 flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-emerald-400" />
                      <span>5. Monthly Salary & Banking Details (ابتدائی تنخواہ اور بینک کی تفصیلات)</span>
                    </h3>
                    <span className="bg-emerald-500 text-red-950 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider self-start sm:self-auto">
                      شروع میں 50,000 روپے لازمی
                    </span>
                  </div>

                  {/* MANDATORY SALARY POLICY NOTICE */}
                  <div className="bg-emerald-950/80 border border-emerald-400/60 rounded-xl p-4 text-xs space-y-1.5">
                    <div className="text-emerald-300 font-bold flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span>اکیڈمی فیکلٹی تنخواہ پالیسی — شق نمبر 1 (ابتدائی تنخواہ اور وقت کے ساتھ اضافہ):</span>
                    </div>
                    <p className="text-red-100 leading-relaxed">
                      اکیڈمی کے حتمی قانون کے مطابق، <strong>شروع میں تمام اساتذہ کی تنخواہ 50,000 روپے ماہانہ ہی ہو گی</strong>۔ اس کے بعد تدریسی کارکردگی، طلبہ کے نتائج اور مدتِ تدریس کے ساتھ باقاعدگی سے تنخواہ میں ششماہی اور سالانہ اضافہ کیا جائے گا۔
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Expected Salary Input with >= 50,000 validation */}
                    <div>
                      <label className="block text-xs font-bold text-emerald-300 mb-1">
                        Starting Monthly Salary (PKR) — شروع میں 50,000 فکسڈ *
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 text-xs font-bold text-amber-400">Rs.</span>
                        <input
                          type="number"
                          required
                          min={50000}
                          step={1000}
                          value={expectedSalary}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            setExpectedSalary(val);
                            if (val >= 85000) {
                              setSalaryGrade('Grade 3 (Rs. 85,000+ Master)');
                            } else if (val >= 65000) {
                              setSalaryGrade('Grade 2 (Rs. 65,000 Senior)');
                            } else {
                              setSalaryGrade('Grade 1 (Rs. 50,000 Entry)');
                            }
                          }}
                          className={`w-full bg-red-900/90 border ${
                            expectedSalary < 50000 ? 'border-red-400 text-red-300' : 'border-emerald-500 text-white'
                          } rounded-xl pl-10 pr-3 py-2.5 text-sm font-bold focus:outline-none focus:border-amber-400`}
                        />
                      </div>
                      {expectedSalary < 50000 && (
                        <div className="text-[11px] text-amber-300 mt-1 font-bold">
                          ⚠️ تنخواہ کم از کم 50,000 روپے ہونی چاہیے!
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-amber-200 mb-1">
                        Faculty Pay Grade (تنخواہ کا درجہ)
                      </label>
                      <select
                        value={salaryGrade}
                        onChange={(e) => setSalaryGrade(e.target.value as any)}
                        className="w-full bg-red-900/80 border border-red-700 text-white rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-amber-400"
                      >
                        <option value="Grade 1 (Rs. 50,000 Entry)">Grade 1: Rs. 50,000 (Standard Faculty)</option>
                        <option value="Grade 2 (Rs. 65,000 Senior)">Grade 2: Rs. 65,000 – 80,000 (Senior Hafiz)</option>
                        <option value="Grade 3 (Rs. 85,000+ Master)">Grade 3: Rs. 85,000 – 120,000+ (Master / US Shift)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-amber-200 mb-1">
                        Monthly Salary Payment Method *
                      </label>
                      <select
                        value={paymentMethod}
                        onChange={(e) => {
                          const val = e.target.value as any;
                          setPaymentMethod(val);
                          if (val === 'EasyPaisa') setBankName('EasyPaisa Mobile Wallet');
                          else if (val === 'JazzCash') setBankName('JazzCash Mobile Wallet');
                          else setBankName('Meezan Bank');
                        }}
                        className="w-full bg-red-900/80 border border-red-700 text-white rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-amber-400"
                      >
                        <option value="EasyPaisa">EasyPaisa (ایزی پیسہ اکاؤنٹ)</option>
                        <option value="JazzCash">JazzCash (جاز کیش اکاؤنٹ)</option>
                        <option value="Bank Transfer">Direct Bank Transfer (بینک اکاؤنٹ / IBAN)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-amber-200 mb-1">
                        Account Title (اکاؤنٹ ہولڈر کا نام) *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Muhammad Bilal"
                        value={accountTitle}
                        onChange={(e) => setAccountTitle(e.target.value)}
                        className="w-full bg-red-900/80 border border-red-700 text-white rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-amber-200 mb-1">
                        Account Number / Mobile / IBAN *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={paymentMethod === 'Bank Transfer' ? 'e.g. PK64MEZN000101...' : 'e.g. 03447956085'}
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                        className="w-full bg-red-900/80 border border-red-700 text-white rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-amber-200 mb-1">
                        Bank / Wallet Name (بینک یا والٹ کا نام) *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. EasyPaisa / Meezan Bank / HBL"
                        value={bankName}
                        onChange={(e) => setBankName(e.target.value)}
                        className="w-full bg-red-900/80 border border-red-700 text-white rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-amber-200 mb-1">
                      Brief Bio & Madrasa Teaching Background (مختصر تعارف)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Mention your recitation accent, madrasa background, and experience with children..."
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="w-full bg-red-900/80 border border-red-700 text-white rounded-xl p-3 text-xs focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  {/* Agreement Checkbox */}
                  <div className="bg-red-950 p-4 rounded-xl border border-emerald-500/40 flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="termsCheck"
                      required
                      checked={agreedToTerms}
                      onChange={(e) => setAgreedToTerms(e.target.checked)}
                      className="w-4 h-4 rounded text-emerald-500 focus:ring-0 mt-0.5"
                    />
                    <label htmlFor="termsCheck" className="text-xs text-red-100 cursor-pointer leading-relaxed">
                      میں حلفیہ اقرار کرتا ہوں کہ اوپر دی گئی تمام اسناد و معلومات درست ہیں۔ میں اکیڈمی کے ضوابط اور <strong>کم از کم 50,000 روپے ماہانہ تنخواہ کے معاہدے</strong> کی پابندی کروں گا اور ہر ماہ وقت کی پابندی کے ساتھ کلاسز لوں گا۔
                    </label>
                  </div>
                </div>

                {/* SUBMIT BUTTON */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-red-200">
                    درخواست جمع کرواتے ہی آپ کو باضابطہ ٹریکنگ ریفرنس نمبر جاری کر دیا جائے گا۔
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || expectedSalary < 50000}
                    className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-500 hover:from-emerald-400 hover:to-emerald-500 text-white font-black text-xs sm:text-sm px-8 py-3.5 rounded-xl shadow-xl flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed transform hover:scale-102 transition-all"
                  >
                    {isSubmitting ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Send className="w-4 h-4 text-amber-200" />
                    )}
                    <span>
                      {isSubmitting
                        ? 'درخواست محفوظ کی جا رہی ہے...'
                        : `Submit Faculty Registration (Rs. ${expectedSalary.toLocaleString()} Min 50k)`}
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: 3 SHIFTS OF 8 HOURS EACH (24/7 ACADEMY OPERATIONS)                 */}
        {/* ========================================================================= */}
        {activeTab === 'shifts' && (
          <div className="space-y-8">
            {/* Header Banner */}
            <div className="bg-gradient-to-b from-red-900 via-amber-950 to-red-950 border-2 border-amber-500/50 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
              <div className="border-b border-red-800 pb-4 text-center max-w-3xl mx-auto space-y-3">
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-400/40">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>24 Hours Continuous Global Quran Education Model</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-serif font-black text-amber-100">
                  اکیڈمی کا 24 گھنٹے تدریسی نظام: 8 گھنٹے کی 3 شفٹس
                </h2>
                <div className="bg-emerald-950/80 border-2 border-emerald-400/60 rounded-2xl p-4 max-w-2xl mx-auto shadow-inner text-center space-y-1">
                  <div className="text-xs uppercase tracking-wider font-mono text-emerald-400 font-bold">
                    Official Academy Schedule Rule • اکیڈمی کا لازمی اصول
                  </div>
                  <div className="text-lg sm:text-xl font-serif font-black text-amber-200">
                    &ldquo;شاہین الزیتون اکیڈمی میں 8، 8 گھنٹے کی 3 مستقل شفٹس ہیں تاکہ چوبیس گھنٹے نان اسٹاپ قرآن کی تعلیم جاری رہے&rdquo;
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-red-200 max-w-2xl mx-auto leading-relaxed">
                  شاہین الزیتون آن لائن قرآنی اکیڈمی 24 گھنٹے فعال رہتی ہے۔ ہر استاد روزانہ 8 گھنٹے کی ایک مخصوص شفٹ (صبح، شام یا رات) میں تدریسی فرائض سرانجام دیتا ہے، جس پر شروع میں <strong>50,000 روپے ماہانہ تنخواہ</strong> ادا کی جاتی ہے۔
                </p>
              </div>

              {/* Dynamic Live Shift Indicator */}
              {(() => {
                const now = new Date();
                const pktHour = (now.getUTCHours() + 5) % 24;
                let activeId: 'morning' | 'evening' | 'night' = 'morning';
                let activeName = 'Shift 1: Morning Shift (صبح کی شفٹ)';
                let activeHours = '08:00 AM – 04:00 PM PKT (8 Hours)';
                if (pktHour >= 8 && pktHour < 16) {
                  activeId = 'morning';
                  activeName = 'Shift 1: Morning Shift (صبح کی شفٹ)';
                  activeHours = '08:00 AM – 04:00 PM PKT';
                } else if (pktHour >= 16 && pktHour < 24) {
                  activeId = 'evening';
                  activeName = 'Shift 2: Evening Shift (شام کی شفٹ)';
                  activeHours = '04:00 PM – 12:00 AM PKT';
                } else {
                  activeId = 'night';
                  activeName = 'Shift 3: Night / Overseas Shift (رات و اوورسیز شفٹ)';
                  activeHours = '12:00 AM – 08:00 AM PKT';
                }

                return (
                  <div className="bg-gradient-to-r from-red-950 via-emerald-950 to-red-950 border-2 border-emerald-400/60 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-400/40 flex items-center justify-center shrink-0">
                        <Clock className="w-6 h-6 animate-pulse" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                          <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                            Current Live Active Shift Right Now
                          </span>
                        </div>
                        <div className="text-base sm:text-lg font-bold font-serif text-amber-200">
                          {activeName}
                        </div>
                        <div className="text-xs text-red-200">
                          پاکستان وقت (PKT): {activeHours} • اس وقت کلاسز لائیو جاری ہیں
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 bg-red-900/60 px-4 py-2.5 rounded-xl border border-red-700">
                      <div className="text-center">
                        <span className="text-[10px] text-red-300 block">شفٹ کا دورانیہ</span>
                        <span className="text-sm font-black text-amber-300">8 Hours</span>
                      </div>
                      <div className="h-6 w-px bg-red-700" />
                      <div className="text-center">
                        <span className="text-[10px] text-red-300 block">روزانہ کل شفٹس</span>
                        <span className="text-sm font-black text-emerald-300">3 Shifts (24h)</span>
                      </div>
                      <div className="h-6 w-px bg-red-700" />
                      <div className="text-center">
                        <span className="text-[10px] text-red-300 block">ابتدائی تنخواہ</span>
                        <span className="text-sm font-black text-amber-200">Rs. 50,000</span>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* The 3 Shifts Detailed Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                {/* SHIFT 1: MORNING SHIFT */}
                <div className="bg-gradient-to-b from-amber-950/70 to-red-950 border-2 border-amber-500/50 rounded-2xl p-5 space-y-4 shadow-xl flex flex-col justify-between hover:border-amber-400 transition-all">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="bg-amber-500 text-red-950 font-black text-xs px-2.5 py-1 rounded-full uppercase tracking-wider">
                        Shift 1 • شفٹ 1
                      </span>
                      <span className="text-xs font-bold text-amber-300 flex items-center gap-1">
                        <Sun className="w-4 h-4 text-amber-400" />
                        <span>صبح کی شفٹ</span>
                      </span>
                    </div>

                    <h3 className="text-lg font-serif font-black text-amber-100">
                      Morning 8-Hour Shift
                    </h3>

                    <div className="bg-red-900/80 rounded-xl p-3 border border-amber-500/30 space-y-1">
                      <div className="text-xs text-amber-300 font-bold flex items-center justify-between">
                        <span>تدریسی اوقات:</span>
                        <span className="font-mono text-white">08:00 AM – 04:00 PM PKT</span>
                      </div>
                      <div className="text-[11px] text-emerald-300">
                        دورانیہ: <strong>پورا 8 گھنٹے</strong> (ہفتہ وار 48 گھنٹے ڈیوٹی)
                      </div>
                    </div>

                    <p className="text-xs text-red-100/90 leading-relaxed">
                      صبح کے پرسکون اوقات میں بچوں، چھوٹی بچیوں، ہوم اسکولنگ طلبہ اور خواتین کے لیے پرائیویٹ قاریہ اساتذہ کے ساتھ خصوصی قرآن کلاسز۔
                    </p>

                    <div className="space-y-1.5 pt-2 border-t border-red-800 text-xs">
                      <div className="text-amber-300 font-semibold text-[11px]">موزوں علاقے اور ممالک:</div>
                      <div className="text-red-200 text-[11px] leading-relaxed">
                        • پاکستان (ڈے ٹائم طلبہ)<br />
                        • سعودی عرب و یو اے ای (06:00 AM – 02:00 PM)<br />
                        • ملائیشیا، سنگاپور و ایشیا پیسیفک
                      </div>
                    </div>

                    <div className="bg-red-950/80 rounded-xl p-2.5 border border-red-800 text-xs space-y-1">
                      <div className="text-emerald-300 font-bold text-[11px]">خصوصی کورسز:</div>
                      <div className="text-red-200 text-[11px]">
                        نورانی قاعدہ، حفظ قرآن صبح کا سبق، مسنون دعائیں، خواتین تجوید۔
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-red-800/80 flex items-center justify-between text-xs">
                    <span className="text-emerald-300 font-bold">معاہدہ تنخواہ: شروع 50k</span>
                    <button
                      onClick={() => {
                        setTeachingShift('Shift 1: Morning Shift (08:00 AM – 04:00 PM PKT / 8 Hours)');
                        setActiveTab('apply');
                      }}
                      className="bg-amber-500 hover:bg-amber-400 text-red-950 font-black px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                    >
                      Apply for Shift 1 →
                    </button>
                  </div>
                </div>

                {/* SHIFT 2: EVENING SHIFT */}
                <div className="bg-gradient-to-b from-red-900 to-amber-950/80 border-2 border-emerald-400/60 rounded-2xl p-5 space-y-4 shadow-xl flex flex-col justify-between hover:border-emerald-300 transition-all relative overflow-hidden">
                  <div className="absolute top-2 right-2 bg-emerald-500 text-red-950 text-[9px] font-black uppercase px-2 py-0.5 rounded-full">
                    High Demand
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="bg-emerald-500 text-red-950 font-black text-xs px-2.5 py-1 rounded-full uppercase tracking-wider">
                        Shift 2 • شفٹ 2
                      </span>
                      <span className="text-xs font-bold text-emerald-300 flex items-center gap-1">
                        <Clock className="w-4 h-4 text-emerald-400" />
                        <span>شام کی شفٹ</span>
                      </span>
                    </div>

                    <h3 className="text-lg font-serif font-black text-amber-100">
                      Evening 8-Hour Shift
                    </h3>

                    <div className="bg-red-900/80 rounded-xl p-3 border border-emerald-500/30 space-y-1">
                      <div className="text-xs text-emerald-300 font-bold flex items-center justify-between">
                        <span>تدریسی اوقات:</span>
                        <span className="font-mono text-white">04:00 PM – 12:00 AM PKT</span>
                      </div>
                      <div className="text-[11px] text-amber-300">
                        دورانیہ: <strong>پورا 8 گھنٹے</strong> (ہفتہ وار 48 گھنٹے ڈیوٹی)
                      </div>
                    </div>

                    <p className="text-xs text-red-100/90 leading-relaxed">
                      اسکول اور کالج سے فارغ طلبہ اور برطانیہ (UK) و یورپ کے خاندانوں کے لیے لائیو ون آن ون تجوید اور ناظرہ قرآن کی سب سے مصروف شفٹ۔
                    </p>

                    <div className="space-y-1.5 pt-2 border-t border-red-800 text-xs">
                      <div className="text-amber-300 font-semibold text-[11px]">موزوں علاقے اور ممالک:</div>
                      <div className="text-red-200 text-[11px] leading-relaxed">
                        • پاکستان شام کے طلبہ (سکول واپسی کے بعد)<br />
                        • برطانیہ UK و آئرلینڈ (11:00 AM – 07:00 PM GMT)<br />
                        • فرانس، جرمنی و یورپ (12:00 PM – 08:00 PM CET)
                      </div>
                    </div>

                    <div className="bg-red-950/80 rounded-xl p-2.5 border border-red-800 text-xs space-y-1">
                      <div className="text-emerald-300 font-bold text-[11px]">خصوصی کورسز:</div>
                      <div className="text-red-200 text-[11px]">
                        ناظرہ قرآن، تجوید و ترتیل، نماز تربیت، تفسیر و ترجمہ قرآن۔
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-red-800/80 flex items-center justify-between text-xs">
                    <span className="text-emerald-300 font-bold">معاہدہ تنخواہ: شروع 50k</span>
                    <button
                      onClick={() => {
                        setTeachingShift('Shift 2: Evening Shift (04:00 PM – 12:00 AM PKT / 8 Hours)');
                        setActiveTab('apply');
                      }}
                      className="bg-emerald-500 hover:bg-emerald-400 text-red-950 font-black px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                    >
                      Apply for Shift 2 →
                    </button>
                  </div>
                </div>

                {/* SHIFT 3: NIGHT / OVERSEAS SHIFT */}
                <div className="bg-gradient-to-b from-blue-950/80 to-red-950 border-2 border-blue-400/50 rounded-2xl p-5 space-y-4 shadow-xl flex flex-col justify-between hover:border-blue-300 transition-all">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="bg-blue-500 text-white font-black text-xs px-2.5 py-1 rounded-full uppercase tracking-wider">
                        Shift 3 • شفٹ 3
                      </span>
                      <span className="text-xs font-bold text-blue-300 flex items-center gap-1">
                        <Moon className="w-4 h-4 text-blue-300" />
                        <span>رات و اوورسیز شفٹ</span>
                      </span>
                    </div>

                    <h3 className="text-lg font-serif font-black text-amber-100">
                      Night / Overseas 8-Hour Shift
                    </h3>

                    <div className="bg-red-900/80 rounded-xl p-3 border border-blue-400/30 space-y-1">
                      <div className="text-xs text-blue-300 font-bold flex items-center justify-between">
                        <span>تدریسی اوقات:</span>
                        <span className="font-mono text-white">12:00 AM – 08:00 AM PKT</span>
                      </div>
                      <div className="text-[11px] text-amber-300">
                        دورانیہ: <strong>پورا 8 گھنٹے</strong> (ہفتہ وار 48 گھنٹے ڈیوٹی)
                      </div>
                    </div>

                    <p className="text-xs text-red-100/90 leading-relaxed">
                      امریکہ (USA)، کینیڈا اور آسٹریلیا میں مقیم مسلم طلبہ کے لیے لائیو رات کی شفٹ۔ روانی سے انگلش بولنے والے اساتذہ کے ساتھ کلاسز۔
                    </p>

                    <div className="space-y-1.5 pt-2 border-t border-red-800 text-xs">
                      <div className="text-amber-300 font-semibold text-[11px]">موزوں علاقے اور ممالک:</div>
                      <div className="text-red-200 text-[11px] leading-relaxed">
                        • امریکہ ایسٹ کوسٹ (02:00 PM – 10:00 PM EST)<br />
                        • امریکہ ویسٹ کوسٹ (11:00 AM – 07:00 PM PST)<br />
                        • کینیڈا و آسٹریلیا (06:00 AM – 02:00 PM AEST)
                      </div>
                    </div>

                    <div className="bg-red-950/80 rounded-xl p-2.5 border border-red-800 text-xs space-y-1">
                      <div className="text-emerald-300 font-bold text-[11px]">خصوصی کورسز:</div>
                      <div className="text-red-200 text-[11px]">
                        اوورسیز قرآن، حفظ دہرائی، انگلش میڈیم اسلامی اسٹڈیز، قراءت۔
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-red-800/80 flex items-center justify-between text-xs">
                    <span className="text-emerald-300 font-bold">معاہدہ تنخواہ: شروع 50k</span>
                    <button
                      onClick={() => {
                        setTeachingShift('Shift 3: Night / Overseas Shift (12:00 AM – 08:00 AM PKT / 8 Hours)');
                        setActiveTab('apply');
                      }}
                      className="bg-blue-500 hover:bg-blue-400 text-white font-black px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                    >
                      Apply for Shift 3 →
                    </button>
                  </div>
                </div>
              </div>

              {/* 8-Hour Shift Regulations & Faculty Guidelines */}
              <div className="bg-red-950/90 border border-amber-500/40 rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-2 border-b border-red-800 pb-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                  <h3 className="text-base sm:text-lg font-serif font-black text-amber-200">
                    اکیڈمی کے 8 گھنٹے کی ڈیوٹی کے قواعد و ضوابط (Shift Regulations)
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-3.5 bg-red-900/60 rounded-xl border border-red-800 space-y-1">
                    <div className="text-amber-300 font-bold flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>1. مستقل 8 گھنٹے روزانہ کی حاضری</span>
                    </div>
                    <p className="text-red-100/90 leading-relaxed">
                      ہر منتخب استاد روزانہ مقررہ 8 گھنٹے اپنے کمپیوٹر پر لائیو حاضر رہے گا۔ انٹرنیٹ اور بجلی کے بیک اپ کے لیے یو پی ایس یا لیپ ٹاپ بیٹری کا ہونا لازمی ہے۔
                    </p>
                  </div>

                  <div className="p-3.5 bg-red-900/60 rounded-xl border border-red-800 space-y-1">
                    <div className="text-amber-300 font-bold flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>2. شروع میں 50,000 روپے ماہانہ تنخواہ</span>
                    </div>
                    <p className="text-red-100/90 leading-relaxed">
                      8 گھنٹے کی شفٹ کے تمام اساتذہ کا ابتدائی معاہدہ 50,000 روپے ماہانہ پر ہوتا ہے، جو یکم تاریخ کو ایزی پیسہ یا بینک اکاؤنٹ میں ادا کیا جاتا ہے۔
                    </p>
                  </div>

                  <div className="p-3.5 bg-red-900/60 rounded-xl border border-red-800 space-y-1">
                    <div className="text-amber-300 font-bold flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>3. نماز اور طعام کا 30 منٹ وقفہ</span>
                    </div>
                    <p className="text-red-100/90 leading-relaxed">
                      8 گھنٹے کی شفٹ کے دوران باجماعت نماز اور کھانے کے لیے 30 منٹ کا وقفہ شیڈول کا حصہ ہے، جس کی ایڈمن پورٹل پر انٹری کی جاتی ہے۔
                    </p>
                  </div>

                  <div className="p-3.5 bg-red-900/60 rounded-xl border border-red-800 space-y-1">
                    <div className="text-amber-300 font-bold flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>4. بیک اپ اساتذہ اور متبادل کلاس سسٹم</span>
                    </div>
                    <p className="text-red-100/90 leading-relaxed">
                      کسی استاد کی ناگزیر بیماری یا ایمرجنسی کی صورت میں اسی شفٹ کا متبادل استاد فوری طور پر کلاس کا انتظام سنبھالتا ہے تاکہ طلبہ کا وقت ضائع نہ ہو۔
                    </p>
                  </div>
                </div>
              </div>

              {/* Global Timezone Comparison Matrix */}
              <div className="bg-red-950/80 border border-amber-500/30 rounded-2xl p-5 space-y-3 overflow-x-auto">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-amber-400" />
                    <h4 className="font-serif font-bold text-sm text-amber-200">
                      بین الاقوامی ٹائم زونز اور شفٹس کا موازنہ (Global Timezones Matrix)
                    </h4>
                  </div>
                  <span className="text-[11px] text-emerald-300 font-bold">24 Hours Non-Stop</span>
                </div>

                <table className="w-full text-xs text-left text-red-100">
                  <thead className="bg-red-900/90 text-amber-300 font-bold uppercase text-[10px] tracking-wider border-b border-red-700">
                    <tr>
                      <th className="p-3">Shift Name (شفٹ)</th>
                      <th className="p-3">Pakistan (PKT)</th>
                      <th className="p-3">UK / London (GMT)</th>
                      <th className="p-3">USA / New York (EST)</th>
                      <th className="p-3">Gulf / Dubai (GST)</th>
                      <th className="p-3">Australia / Sydney</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-red-800/60">
                    <tr className="hover:bg-red-900/40">
                      <td className="p-3 font-bold text-amber-200">
                        Shift 1: Morning (صبح) • 8h
                      </td>
                      <td className="p-3 font-mono text-white">08:00 AM – 04:00 PM</td>
                      <td className="p-3 font-mono text-red-200">03:00 AM – 11:00 AM</td>
                      <td className="p-3 font-mono text-red-200">10:00 PM – 06:00 AM (Prev)</td>
                      <td className="p-3 font-mono text-emerald-300">07:00 AM – 03:00 PM</td>
                      <td className="p-3 font-mono text-red-200">01:00 PM – 09:00 PM</td>
                    </tr>
                    <tr className="hover:bg-red-900/40">
                      <td className="p-3 font-bold text-emerald-300">
                        Shift 2: Evening (شام) • 8h
                      </td>
                      <td className="p-3 font-mono text-white">04:00 PM – 12:00 AM</td>
                      <td className="p-3 font-mono text-emerald-300">11:00 AM – 07:00 PM</td>
                      <td className="p-3 font-mono text-red-200">06:00 AM – 02:00 PM</td>
                      <td className="p-3 font-mono text-emerald-300">03:00 PM – 11:00 PM</td>
                      <td className="p-3 font-mono text-red-200">09:00 PM – 05:00 AM</td>
                    </tr>
                    <tr className="hover:bg-red-900/40">
                      <td className="p-3 font-bold text-blue-300">
                        Shift 3: Night / Overseas (رات) • 8h
                      </td>
                      <td className="p-3 font-mono text-white">12:00 AM – 08:00 AM</td>
                      <td className="p-3 font-mono text-red-200">07:00 PM – 03:00 AM</td>
                      <td className="p-3 font-mono text-blue-300">02:00 PM – 10:00 PM</td>
                      <td className="p-3 font-mono text-red-200">11:00 PM – 07:00 AM</td>
                      <td className="p-3 font-mono text-blue-300">05:00 AM – 01:00 PM</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: SALARY POLICY & PAY SCALE EXPLANATION                              */}
        {/* ========================================================================= */}
        {activeTab === 'salary-policy' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-b from-red-900 via-amber-950 to-red-900 border-2 border-amber-500/50 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
              <div className="border-b border-red-800 pb-4 text-center max-w-3xl mx-auto space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-400/40">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Shaheen Al Zaitoon Faculty Honorarium & Dignity Charter</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-serif font-black text-amber-100">
                  اساتذہ کرام کا مشاہرہ و ترقی منشور
                </h2>
                <div className="bg-emerald-950/80 border-2 border-emerald-400/60 rounded-2xl p-4 max-w-2xl mx-auto shadow-inner text-center space-y-1">
                  <div className="text-xs uppercase tracking-wider font-mono text-emerald-400 font-bold">
                    Official Academy Principle • بنیادی اصول
                  </div>
                  <div className="text-lg sm:text-xl font-serif font-black text-amber-200">
                    &ldquo;شروع میں تمام اساتذہ کی تنخواہ 50,000 روپے ہی ہو گی، بعد میں وقت کے ساتھ ساتھ بڑھتی جائے گی&rdquo;
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-red-200">
                  اکیڈمی کے قواعد کے مطابق کسی بھی نئے استاد کو 50,000 روپے سے کم نہیں دیا جاتا۔ تمام اساتذہ کا آغاز 50,000 روپے سے ہوتا ہے اور تدریسی مدت اور کارکردگی کے ساتھ باقاعدگی سے مشاہرہ بڑھایا جاتا ہے۔
                </p>
              </div>

              {/* TIMELINE OF TIME-BASED INCREMENTS (وقت کے ساتھ تنخواہ میں اضافے کا باقاعدہ شیڈول) */}
              <div className="bg-red-950/90 border border-amber-500/40 rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-2 border-b border-red-800 pb-3">
                  <Clock className="w-5 h-5 text-amber-400" />
                  <h3 className="font-serif font-black text-lg text-amber-200">
                    وقت اور تجربے کے ساتھ تنخواہ میں اضافے کا باقاعدہ شیڈول (Tenure & Increment Timeline)
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {/* Step 1: Start */}
                  <div className="bg-red-900/60 border-2 border-emerald-500/80 rounded-xl p-4 space-y-2 relative">
                    <div className="inline-block bg-emerald-500 text-red-950 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                      مرحلہ 1: شروعات (Joining)
                    </div>
                    <div className="text-2xl font-serif font-black text-emerald-300">
                      Rs. 50,000
                      <span className="text-[11px] block text-red-200 font-normal">PKR / ماہانہ فکسڈ</span>
                    </div>
                    <p className="text-xs text-red-100 leading-relaxed">
                      شروع میں تمام منتخب اساتذہ و معلمات کے لیے مساوی 50,000 روپے بنیادی تنخواہ۔
                    </p>
                  </div>

                  {/* Step 2: 6 Months */}
                  <div className="bg-red-900/60 border border-amber-500/50 rounded-xl p-4 space-y-2">
                    <div className="inline-block bg-amber-500 text-red-950 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                      مرحلہ 2: 6 ماہ بعد
                    </div>
                    <div className="text-2xl font-serif font-black text-amber-300">
                      Rs. 55,000 – 60,000
                      <span className="text-[11px] block text-red-200 font-normal">PKR / ماہانہ (+5k تا 10k)</span>
                    </div>
                    <p className="text-xs text-red-100 leading-relaxed">
                      حاضری کی پابندی، طلبہ کی تسلی اور سبق فیڈبیک پر پہلا تشجیعی اضافہ۔
                    </p>
                  </div>

                  {/* Step 3: 1 Year */}
                  <div className="bg-red-900/60 border border-amber-500/50 rounded-xl p-4 space-y-2">
                    <div className="inline-block bg-amber-500 text-red-950 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                      مرحلہ 3: 1 سال مکمل
                    </div>
                    <div className="text-2xl font-serif font-black text-amber-300">
                      Rs. 65,000 – 75,000
                      <span className="text-[11px] block text-red-200 font-normal">PKR / ماہانہ (کنفرمڈ فیکلٹی)</span>
                    </div>
                    <p className="text-xs text-red-100 leading-relaxed">
                      سالانہ انکریمنٹ، اضافی بین الاقوامی طلباء کی کلاسز اور کارکردگی الاؤنس۔
                    </p>
                  </div>

                  {/* Step 4: 2+ Years */}
                  <div className="bg-red-900/60 border border-emerald-400/50 rounded-xl p-4 space-y-2">
                    <div className="inline-block bg-emerald-400 text-red-950 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                      مرحلہ 4: 2 سال یا زائد (سینئر)
                    </div>
                    <div className="text-2xl font-serif font-black text-emerald-300">
                      Rs. 85,000 – 100,000+
                      <span className="text-[11px] block text-red-200 font-normal">PKR / ماہانہ (ماسٹر سکیل)</span>
                    </div>
                    <p className="text-xs text-red-100 leading-relaxed">
                      سینئر قاری، قراءاتِ عشرہ، یو ایس اے/یو کے ٹائم زونز اور مستقل فیکلٹی لیڈ مشاہرہ۔
                    </p>
                  </div>
                </div>
              </div>

              {/* 3 Salary Grades Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Grade 1 */}
                <div className="bg-red-950/80 border-2 border-emerald-500/60 rounded-2xl p-6 space-y-4 relative">
                  <div className="inline-block bg-emerald-500 text-red-950 font-black text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    Grade 1: Starting Baseline (ابتدائی درجہ)
                  </div>
                  <h3 className="text-lg font-serif font-bold text-white">
                    نورانی قاعدہ و ناظرہ قرآنی اساتذہ
                  </h3>
                  <div className="text-3xl font-black font-serif text-emerald-300">
                    Rs. 50,000
                    <span className="text-xs text-amber-200 block font-normal">PKR / ماہانہ (شروع میں تمام اساتذہ کی تنخواہ)</span>
                  </div>
                  <ul className="text-xs text-red-200 space-y-2 border-t border-red-800 pt-3">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>نورانی قاعدہ اور ناظرہ تجوید 1-on-1 کلاسز</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>ہفتہ وار 25 تا 30 گھنٹے تدریس</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>بذریعہ ایزی پیسہ یا جاز کیش یکم تاریخ کو منتقلی</span>
                    </li>
                  </ul>
                </div>

                {/* Grade 2 */}
                <div className="bg-gradient-to-b from-red-950 via-amber-950 to-red-950 border-2 border-amber-400 rounded-2xl p-6 space-y-4 relative shadow-xl">
                  <div className="inline-block bg-amber-400 text-red-950 font-black text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    Grade 2: Progressive Scale (وقت کے ساتھ اضافہ)
                  </div>
                  <h3 className="text-lg font-serif font-bold text-amber-200">
                    حفظ القرآن و سینئر معلمات
                  </h3>
                  <div className="text-3xl font-black font-serif text-amber-300">
                    Rs. 65,000 – 80,000
                    <span className="text-xs text-amber-100 block font-normal">PKR / ماہانہ (ترقیاتی پیکج)</span>
                  </div>
                  <ul className="text-xs text-red-100 space-y-2 border-t border-red-800 pt-3">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>حفظ القرآن (سبق، سبقی، منزل) ریویژن</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>بین الاقوامی طلباء (یوکے، امریکہ، کینیڈا)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>ماہانہ انٹرنیٹ و الیکٹرسٹی الاؤنس شامل</span>
                    </li>
                  </ul>
                </div>

                {/* Grade 3 */}
                <div className="bg-red-950/80 border-2 border-emerald-500/60 rounded-2xl p-6 space-y-4 relative">
                  <div className="inline-block bg-emerald-500 text-red-950 font-black text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    Grade 3: Master Scholar (اعلیٰ درجہ)
                  </div>
                  <h3 className="text-lg font-serif font-bold text-white">
                    قراءاتِ عشرہ، ترجمہ و تفسیر و فقہ
                  </h3>
                  <div className="text-3xl font-black font-serif text-emerald-300">
                    Rs. 85,000 – 120,000+
                    <span className="text-xs text-amber-200 block font-normal">PKR / ماہانہ (سینئر فیکلٹی)</span>
                  </div>
                  <ul className="text-xs text-red-200 space-y-2 border-t border-red-800 pt-3">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>تفسیر، عربی گرامر اور قراءات سبعہ/عشرہ</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>نائٹ شفٹ و فارن ٹائم زونز خصوصی سیشنز</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>عید بونس اور سالانہ انکریمنٹ کی قانونی ضمانت</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Founder Signed Covenant */}
              <div className="bg-red-950 border border-amber-500/40 rounded-2xl p-6 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-500 text-red-950 font-black flex items-center justify-center font-serif text-lg">
                    م
                  </div>
                  <div>
                    <div className="font-serif font-bold text-amber-200 text-base">
                      بانی اکیڈمی قاری منیب الرحمن کا باضابطہ عہد نامہ
                    </div>
                    <div className="text-xs text-red-300">
                      راولپنڈی، پنجاب، پاکستان • ایصالِ ثواب زیتون بی بی
                    </div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-red-100 leading-relaxed italic bg-red-900/40 p-4 rounded-xl border border-red-800">
                  &ldquo;قرآن مجید کی تعلیم دینے والے اساتذہ و قراء کا حق سب سے مقدم ہے۔ شاہین الزیتون اکیڈمی میں شروع میں تمام اساتذہ کی تنخواہ 50,000 روپے ہی ہو گی، اور بعد میں وقت، تدریسی مدت اور کارکردگی کے ساتھ ساتھ بڑھتی جائے گی۔ ہم اپنے تمام اساتذہ کو ہر مہینے کی یکم تاریخ کو 50,000 روپے کی بروقت فراہمی اور بعد ازاں سالانہ اضافے کی قانونی ضمانت دیتے ہیں۔&rdquo;
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: APPLICATION TRACKER                                                */}
        {/* ========================================================================= */}
        {activeTab === 'track' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-b from-red-900 to-red-950 border-2 border-amber-500/50 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl max-w-3xl mx-auto">
              <div className="text-center space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-400/40">
                  <Search className="w-4 h-4" />
                  <span>Real-time Application Status Verification</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif font-black text-amber-100">
                  درخواست کی تصدیق و اسٹیٹس ٹریکر
                </h2>
                <p className="text-xs sm:text-sm text-red-200">
                  اپنا ریفرنس نمبر (مثلاً TEA-2026-101) یا واٹس ایپ موبائل نمبر درج کر کے اپنی بھرتی کا اسٹیٹس چیک کریں۔
                </p>
              </div>

              {/* Search Form */}
              <form onSubmit={handleTrackSearch} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter Application Ref ID (e.g. TEA-2026-101) or WhatsApp Number"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-red-950 border border-red-700 text-white rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-amber-400"
                />
                <button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-400 text-red-950 font-black text-xs sm:text-sm px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 cursor-pointer"
                >
                  <Search className="w-4 h-4" />
                  <span>Track</span>
                </button>
              </form>

              {/* Sample Quick Searches */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-red-200">
                <span>یا سیمپل چیک کریں:</span>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('TEA-2026-101');
                    const found = applications.find((a) => a.id === 'TEA-2026-101');
                    setTrackResult(found || null);
                    setHasSearched(true);
                  }}
                  className="bg-red-950/80 px-2 py-1 rounded border border-red-800 text-amber-300 hover:underline"
                >
                  TEA-2026-101 (Qari Bilal - Rs. 50k)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('TEA-2026-102');
                    const found = applications.find((a) => a.id === 'TEA-2026-102');
                    setTrackResult(found || null);
                    setHasSearched(true);
                  }}
                  className="bg-red-950/80 px-2 py-1 rounded border border-red-800 text-amber-300 hover:underline"
                >
                  TEA-2026-102 (Qaria Maryam - Rs. 55k)
                </button>
              </div>

              {/* Results Display */}
              {hasSearched && (
                <div className="pt-4 border-t border-red-800">
                  {trackResult ? (
                    <div className="bg-red-950 border-2 border-emerald-500/60 rounded-2xl p-5 space-y-4 shadow-xl">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-red-800 pb-3">
                        <div>
                          <div className="text-xs text-red-300 font-mono">Ref ID: {trackResult.id}</div>
                          <h3 className="text-lg font-serif font-bold text-white">
                            {trackResult.fullName || trackResult.applicantName}
                          </h3>
                          <div className="text-xs text-amber-300">{trackResult.qualification}</div>
                        </div>

                        <span className="bg-emerald-500/20 text-emerald-300 font-bold px-3 py-1 rounded-full border border-emerald-400/40 text-xs self-start sm:self-auto">
                          {trackResult.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                        <div className="p-2.5 bg-red-900/40 rounded-lg">
                          <span className="text-red-300 block text-[10px]">Guaranteed Salary</span>
                          <strong className="text-emerald-300 font-serif text-sm">
                            Rs. {(trackResult.approvedSalaryPKR || trackResult.expectedSalaryPKR || 50000).toLocaleString()} PKR
                          </strong>
                        </div>

                        <div className="p-2.5 bg-red-900/40 rounded-lg">
                          <span className="text-red-300 block text-[10px]">Payment Method</span>
                          <strong className="text-white">
                            {trackResult.paymentMethod || 'EasyPaisa'}
                          </strong>
                        </div>

                        <div className="p-2.5 bg-red-900/40 rounded-lg">
                          <span className="text-red-300 block text-[10px]">Teaching Shift</span>
                          <strong className="text-amber-200">
                            {trackResult.teachingShift || 'Evening Shift'}
                          </strong>
                        </div>
                      </div>

                      <div className="text-xs text-red-200 bg-emerald-950/60 p-3 rounded-xl border border-emerald-500/30">
                        مبارک ہو! آپ کی رجسٹریشن باضابطہ طور پر قبول ہو چکی ہے اور کم از کم 50,000 روپے کی ماہانہ تنخواہ کا معاہدہ منظور ہے۔ اکیڈمی کا کوآرڈینیٹر آڈیشن کے لیے آپ کے واٹس ایپ پر رابطہ کرے گا۔
                      </div>

                      <button
                        onClick={() => {
                          const rawNumber = siteSettings.whatsappNumber.replace(/[^0-9]/g, '');
                          const cleanNumber = rawNumber.startsWith('92') ? rawNumber : `92${rawNumber.replace(/^0/, '')}`;
                          window.open(`https://wa.me/${cleanNumber}?text=Assalamu%20Alaikum!%20My%20Teacher%20Application%20Ref%20is%20${trackResult.id}.%20Please%20schedule%20my%20audition.`, '_blank');
                        }}
                        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-2.5 rounded-xl flex items-center justify-center gap-2 shadow-md cursor-pointer"
                      >
                        <Phone className="w-4 h-4" />
                        <span>Contact Coordinator on WhatsApp</span>
                      </button>
                    </div>
                  ) : (
                    <div className="bg-red-950 p-6 rounded-2xl text-center space-y-2 border border-red-800">
                      <AlertCircle className="w-8 h-8 text-amber-400 mx-auto" />
                      <div className="font-bold text-white text-sm">کوئی ریکارڈ نہیں ملا (No record found)</div>
                      <p className="text-xs text-red-300">
                        براہِ کرم اپنا درست ریفرنس نمبر یا فون نمبر درج کریں، یا نیا درخواست فارم پر کریں۔
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* MODAL 1: SALARY SLIP VOUCHER MODAL                                        */}
      {/* ========================================================================= */}
      {showSalarySlipModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-gradient-to-b from-red-950 via-amber-950 to-red-950 border-2 border-emerald-400 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setShowSalarySlipModal(false)}
              className="absolute top-4 right-4 text-red-300 hover:text-white p-1 rounded-lg bg-red-900/50"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-1 border-b border-red-800 pb-4">
              <div className="inline-flex items-center gap-1 text-[11px] font-bold uppercase text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                <span>Official Disbursement Voucher</span>
              </div>
              <h3 className="font-serif font-black text-xl sm:text-2xl text-amber-100">
                {siteSettings.academyName}
              </h3>
              <div className="text-xs text-amber-300 font-urdu font-bold">
                ماہانہ تنخواہ و معاوضہ واؤچر • شاہین الزیتون اکیڈمی
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-1.5 border-b border-red-900">
                <span className="text-red-300">Faculty Name:</span>
                <strong className="text-white">{currentTeacher.name}</strong>
              </div>
              <div className="flex justify-between py-1.5 border-b border-red-900">
                <span className="text-red-300">Designation:</span>
                <strong className="text-amber-200">{currentTeacher.title}</strong>
              </div>
              <div className="flex justify-between py-1.5 border-b border-red-900">
                <span className="text-red-300">Faculty ID:</span>
                <span className="font-mono text-amber-300">{currentTeacher.id}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-red-900">
                <span className="text-red-300">Disbursement Channel:</span>
                <strong className="text-white">
                  {currentTeacher.paymentMethod || 'EasyPaisa Wallet'} ({currentTeacher.accountNumber || '03447956085'})
                </strong>
              </div>
              <div className="flex justify-between py-1.5 border-b border-red-900">
                <span className="text-red-300">Salary Schedule:</span>
                <span className="text-emerald-400 font-bold">1st of Every Calendar Month</span>
              </div>

              {/* SALARY BREAKDOWN */}
              <div className="bg-red-900/50 p-4 rounded-xl border border-red-800 space-y-2 mt-2">
                <div className="flex justify-between">
                  <span className="text-red-200">Guaranteed Basic Pay (کم از کم تنخواہ):</span>
                  <span className="text-white font-mono font-bold">Rs. 50,000</span>
                </div>
                {teacherSalary > 50000 && (
                  <div className="flex justify-between text-amber-300">
                    <span>Seniority & Foreign Shifts Bonus:</span>
                    <span className="font-mono font-bold">+Rs. {(teacherSalary - 50000).toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between pt-2 border-t border-red-800 text-sm font-black text-emerald-300">
                  <span>Net Monthly Payout (کل مشاہرہ):</span>
                  <span className="font-mono text-lg">Rs. {teacherSalary.toLocaleString()} PKR</span>
                </div>
              </div>

              <div className="text-[11px] text-red-200 italic text-center pt-2">
                &ldquo;یہ واؤچر بانی اکیڈمی <strong>{siteSettings.ownerName}</strong> کے دستخط اور اکیڈمی کے مالیاتی قواعد کے مطابق تصدیق شدہ ہے۔&rdquo;
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => {
                  window.print();
                }}
                className="flex-1 bg-amber-500 hover:bg-amber-400 text-red-950 font-black text-xs py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg"
              >
                <Download className="w-4 h-4" />
                <span>Print / Save Voucher</span>
              </button>
              <button
                onClick={() => setShowSalarySlipModal(false)}
                className="bg-red-900/80 hover:bg-red-800 text-red-200 text-xs px-5 py-3 rounded-xl border border-red-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: LESSON / SABAQ LOGGING MODAL                                     */}
      {/* ========================================================================= */}
      {showLessonLogModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-gradient-to-b from-red-950 via-amber-950 to-red-950 border-2 border-amber-500 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl relative">
            <button
              onClick={() => {
                setShowLessonLogModal(false);
                setLessonLogSuccess(false);
              }}
              className="absolute top-4 right-4 text-red-300 hover:text-white p-1 rounded-lg bg-red-900/50"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="border-b border-red-800 pb-3">
              <h3 className="font-serif font-bold text-lg sm:text-xl text-amber-200 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-amber-400" />
                <span>Daily Sabaq & Progress Logger (روزانہ سبق ڈائری)</span>
              </h3>
              <p className="text-xs text-red-200">
                Record student attendance, today&apos;s new Sabaq, revision (Sabqi), and Tajweed assessment.
              </p>
            </div>

            {lessonLogSuccess ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border-2 border-emerald-400">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h4 className="font-serif font-bold text-lg text-white">Sabaq Logged Successfully!</h4>
                <p className="text-xs text-red-200">
                  The lesson record has been dispatched to the student and parent portal dashboards.
                </p>
                <button
                  onClick={() => {
                    setShowLessonLogModal(false);
                    setLessonLogSuccess(false);
                  }}
                  className="bg-amber-500 text-red-950 font-bold text-xs px-6 py-2.5 rounded-xl"
                >
                  Done
                </button>
              </div>
            ) : (
              <div className="space-y-4 text-xs">
                <div>
                  <label className="block text-xs font-semibold text-amber-200 mb-1">
                    Select Student (طالب علم منتخب کریں)
                  </label>
                  <select
                    value={selectedStudentForLog}
                    onChange={(e) => setSelectedStudentForLog(e.target.value)}
                    className="w-full bg-red-900 border border-red-700 text-white rounded-xl px-3 py-2.5 focus:outline-none focus:border-amber-400"
                  >
                    <option value="">-- Choose Student --</option>
                    {students.map((s) => (
                      <option key={s.id} value={s.name}>
                        {s.name} ({s.id}) • Para {s.currentPara}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-amber-200 mb-1">
                    Today&apos;s New Lesson / Sabaq (آج کا نیا سبق) *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Surah Al-Baqarah, Ayahs 45 to 55"
                    value={todaySabaq}
                    onChange={(e) => setTodaySabaq(e.target.value)}
                    className="w-full bg-red-900 border border-red-700 text-white rounded-xl px-3 py-2.5 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-amber-200 mb-1">
                      Recent Revision / Sabqi (سبقی)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Previous 5 Pages"
                      value={todaySabqi}
                      onChange={(e) => setTodaySabqi(e.target.value)}
                      className="w-full bg-red-900 border border-red-700 text-white rounded-xl px-3 py-2.5 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-amber-200 mb-1">
                      Hifz Retention / Manzil (منزل)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Para 1 Quarter 3"
                      value={todayManzil}
                      onChange={(e) => setTodayManzil(e.target.value)}
                      className="w-full bg-red-900 border border-red-700 text-white rounded-xl px-3 py-2.5 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-amber-200 mb-1">
                    Tajweed & Pronunciation Assessment (تجوید و ریمارکس)
                  </label>
                  <select
                    value={tajweedRemarks}
                    onChange={(e) => setTajweedRemarks(e.target.value)}
                    className="w-full bg-red-900 border border-red-700 text-white rounded-xl px-3 py-2.5 focus:outline-none focus:border-amber-400"
                  >
                    <option>Excellent Makharij & Tajweed (ممتاز تجوید و مخارج)</option>
                    <option>Good Recitation with minor Madd guidance (جید)</option>
                    <option>Needs Ghunnah & Ikhfa practice (مشق درکار ہے)</option>
                    <option>Fluency improving steadily (بہتری کی امید)</option>
                  </select>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowLessonLogModal(false)}
                    className="bg-red-900 text-red-200 text-xs px-4 py-2.5 rounded-xl border border-red-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (!todaySabaq.trim()) return;
                      setLessonLogSuccess(true);
                      setTodaySabaq('');
                      setTodaySabqi('');
                      setTodayManzil('');
                    }}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-lg"
                  >
                    Save Sabaq Entry
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: APPLICATION SUBMISSION SUCCESS MODAL                             */}
      {/* ========================================================================= */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-gradient-to-b from-red-950 via-amber-950 to-red-950 border-2 border-emerald-400 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl text-center relative">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border-2 border-emerald-400">
              <CheckCircle className="w-10 h-10" />
            </div>

            <h3 className="font-serif font-black text-2xl text-amber-100">
              Application Registered Successfully!
            </h3>

            <div className="inline-block bg-red-900 border border-amber-500/50 px-4 py-1.5 rounded-full text-xs font-mono text-amber-300 font-bold">
              Application ID: {submittedAppId}
            </div>

            <p className="text-xs sm:text-sm text-red-100 leading-relaxed">
              جزاک اللہ خیراً! آپ کی درخواست اکیڈمی کے مرکزی ڈیٹا بیس میں رجسٹر ہو چکی ہے۔ اکیڈمی کے قواعد کے مطابق آپ کی کم از کم <strong>Rs. {expectedSalary.toLocaleString()} PKR</strong> ماہانہ تنخواہ کا معاہدہ منظور کیا گیا ہے۔
            </p>

            <div className="bg-red-900/60 p-4 rounded-xl border border-red-800 text-xs text-left space-y-1.5">
              <div className="flex justify-between">
                <span className="text-red-300">Applicant:</span>
                <strong className="text-white">{title} {fullName}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-red-300">Minimum Salary Contract:</span>
                <strong className="text-emerald-300 font-bold">Rs. {expectedSalary.toLocaleString()} PKR / Month</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-red-300">Payment Account:</span>
                <strong className="text-amber-200">{paymentMethod} ({accountNumber})</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-red-300">Recruitment Audition:</span>
                <span className="text-emerald-400 font-semibold">Online Recitation via WhatsApp / Zoom</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={handleNotifyFounderWhatsApp}
                className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs px-6 py-3 rounded-xl shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <Phone className="w-4 h-4" />
                <span>Notify Founder on WhatsApp</span>
              </button>

              <button
                onClick={() => {
                  setIsSuccessModalOpen(false);
                  setActiveTab('dashboard');
                }}
                className="w-full sm:w-auto bg-red-900 hover:bg-red-800 text-amber-300 text-xs px-6 py-3 rounded-xl border border-red-700 cursor-pointer"
              >
                Open Dashboard Workspace
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
