import { PageId, Language } from '../types';

interface PageMetadata {
  titleEn: string;
  titleUr: string;
  descriptionEn: string;
  descriptionUr: string;
}

export const pageSeoData: Record<PageId, PageMetadata> = {
  home: {
    titleEn: 'Shaheen Al Zaitoon Online Quran Academy | Global Islamic Education',
    titleUr: 'شاہین الزیتون آن لائن قرآن اکیڈمی | عالمی اسلامی تعلیمی نیٹ ورک',
    descriptionEn: 'Learn Quran online with certified Tajweed teachers. 3-Day free trial, personalized 1-on-1 classes, dedicated in memory of Zaitoon Bibi.',
    descriptionUr: 'گھر بیٹھے مستند قراء سے قرآن پاک ناظرہ، تجوید اور حفظ سیکھیں۔ 3 دن کی مفت آزمائشی کلاسز۔',
  },
  courses: {
    titleEn: 'Online Quran Courses & Syllabus | Shaheen Al Zaitoon Academy',
    titleUr: 'آن لائن قرآنی کورسز اور نصاب | شاہین الزیتون اکیڈمی',
    descriptionEn: 'Explore courses: Noorani Qaida, Nazra with Tajweed, Hifz-ul-Quran, Translation & Tafseer, and Arabic language for kids, adults and ladies.',
    descriptionUr: 'نورانی قاعدہ، ناظرہ مع تجوید، حفظ القرآن، ترجمہ و تفسیر اور عربی زبان کے کورسز۔',
  },
  about: {
    titleEn: 'About Academy & Founder Muneeb Ur Rehman | Shaheen Al Zaitoon',
    titleUr: 'اکیڈمی اور بانی منیب الرحمن کا تعارف | شاہین الزیتون',
    descriptionEn: 'Founded by Muneeb Ur Rehman in Rawalpindi, Pakistan as Sadaqah Jariyah for Zaitoon Bibi. Serving students worldwide across UK, USA, UAE & Canada.',
    descriptionUr: 'راولپنڈی سے بانی منیب الرحمن کی زیرِ نگرانی زیتون بی بی کی ایصالِ ثواب کے لیے قائم کردہ اکیڈمی۔',
  },
  teachers: {
    titleEn: 'Certified Qari & Qaria Faculty | Shaheen Al Zaitoon Academy',
    titleUr: 'مستند قراء اور اساتذہ کرام | شاہین الزیتون اکیڈمی',
    descriptionEn: 'Meet certified Egyptian, Pakistani and international Quran teachers, Huffaz and female Qaria teachers for sisters.',
    descriptionUr: 'مستند اور تجربہ کار قراء، حفاظ اور خواتین کے لیے معلمات۔',
  },
  admissions: {
    titleEn: 'Admissions & 3-Day Free Trial Class | Shaheen Quran Academy',
    titleUr: 'داخلہ فارم اور 3 روزہ مفت ٹرائل کلاس | شاہین قرآن اکیڈمی',
    descriptionEn: 'Register today for your 3-day free trial Quran recitation class with no upfront payment required.',
    descriptionUr: 'بغیر کسی پیشگی فیس کے 3 دن کی مفت آزمائشی کلاس کے لیے ابھی اندراج کریں۔',
  },
  'fee-payment': {
    titleEn: 'EasyPaisa & Bank Fee Payment | Shaheen Al Zaitoon Academy',
    titleUr: 'ایزی پیسہ اور فیس ادائیگی کا نظام | شاہین الزیتون اکیڈمی',
    descriptionEn: 'Pay monthly academy fees securely via EasyPaisa (03447956085) or direct bank transfer. Upload receipt for instant verification.',
    descriptionUr: 'ایزی پیسہ (03447956085) کے ذریعے باآسانی ماہانہ فیس ادا کریں اور رسید اپلوڈ کریں۔',
  },
  'live-classes': {
    titleEn: 'Live Quran Classrooms & Schedule | Shaheen Al Zaitoon',
    titleUr: 'لائیو قرآن کلاس رومز اور شیڈول | شاہین الزیتون',
    descriptionEn: 'Join live 1-on-1 Zoom & Google Meet Quran classrooms with interactive whiteboards and screen sharing.',
    descriptionUr: 'لائیو ون آن ون زوم اور گوگل میٹ کلاس رومز میں شرکت کریں۔',
  },
  certificates: {
    titleEn: 'Certificate Verification & Awards | Shaheen Al Zaitoon Academy',
    titleUr: 'سند کی تصدیق اور اسناد | شاہین الزیتون اکیڈمی',
    descriptionEn: 'Verify official Shaheen Al Zaitoon Academy Tajweed and Hifz graduation certificates online with QR codes.',
    descriptionUr: 'قرآن تجوید اور حفظ کی مکمل اسناد کی آن لائن تصدیق کریں۔',
  },
  'student-portal': {
    titleEn: 'Student Learning Portal & Attendance | Shaheen Quran Academy',
    titleUr: 'طالب علم پورٹل اور حاضری | شاہین قرآن اکیڈمی',
    descriptionEn: 'Access daily lesson homework, recitation progress tracking, attendance and class schedules.',
    descriptionUr: 'روزانہ کے اسباق، حاضری، اور پیش رفت کی تفصیلات۔',
  },
  'parent-portal': {
    titleEn: 'Parent Portal & Student Progress Tracking | Shaheen Quran',
    titleUr: 'والدین پورٹل اور پیش رفت رپورٹ | شاہین قرآن',
    descriptionEn: 'Track your child Quran recitation progress, attendance, monthly reports and teacher feedback.',
    descriptionUr: 'اپنے بچوں کی روزمرہ تعلیمی رپورٹ اور اساتذہ کے ریمارکس دیکھیں۔',
  },
  'zaitoon-traders': {
    titleEn: 'ZT (Zaitoon Traders) Pure Sidr Honey & Madinah Dates | Rawalpindi',
    titleUr: 'زیتون ٹریڈرز - خالص بیری شہد اور عجوہ کھجور | راولپنڈی',
    descriptionEn: '100% pure Karak Sidr Honey, Madinah Ajwa Dates, and Sunnah health products with COD and EasyPaisa payment.',
    descriptionUr: 'سو فیصد خالص بیری کا شہد، مدینہ منورہ کی عجوہ کھجور اور قدرتی مسنون مصنوعات۔',
  },
  'marriage-bureau': {
    titleEn: 'Shaheen Matrimonial & Nikah Bureau | Islamic Matchmaking',
    titleUr: 'شاہین میرج بیورو اور رشتہ سروس | شرعی رہنمائی',
    descriptionEn: 'Respectful, confidential Islamic matrimonial matchmaking service for practicing Muslim families worldwide.',
    descriptionUr: 'ملکی و غیر ملکی دیندار خاندانوں کے لیے بااعتماد اور باحجاب رشتہ سروس۔',
  },
  'growth-hub': {
    titleEn: 'Growth Hub, Referrals & Affiliate Earning | Shaheen Ecosystem',
    titleUr: 'گروتھ ہب اور الحاق شدہ آمدنی | شاہین نیٹ ورک',
    descriptionEn: 'Join Shaheen Al Zaitoon Growth Hub, earn commissions by sharing Islamic education and business opportunities.',
    descriptionUr: 'ریفرل اور مارکیٹنگ نیٹ ورک سے منسلک ہو کر باعزت آمدن حاصل کریں۔',
  },
  'ad-manager': {
    titleEn: 'Multi-Channel AI Ad Manager & Marketing Hub | Shaheen Network',
    titleUr: 'ملٹی چینل اشتہارات کا نظام | شاہین نیٹ ورک',
    descriptionEn: 'Launch high-converting digital ad campaigns with Gemini AI across Facebook, Instagram, WhatsApp and Web.',
    descriptionUr: 'فیس بک، انسٹاگرام، واٹس ایپ اور ویب سائٹ کے لیے اے آئی سے تیار کردہ اشتہارات چلائیں۔',
  },
  community: {
    titleEn: 'Global Islamic Community & WhatsApp Groups | Shaheen Academy',
    titleUr: 'عالمی اسلامی برادری اور واٹس ایپ گروپس | شاہین اکیڈمی',
    descriptionEn: 'Connect with students and parents in UK, USA, Canada, UAE and Pakistan in our official community groups.',
    descriptionUr: 'دنیا بھر سے طلباء اور والدین کے ساتھ جڑیں اور علمی تبادلہ خیال کریں۔',
  },
  contact: {
    titleEn: 'Contact Head Office Rawalpindi & Global Branches | Shaheen Academy',
    titleUr: 'راولپنڈی ہیڈ آفس اور عالمی دفاتر سے رابطہ | شاہین اکیڈمی',
    descriptionEn: 'Contact Founder Muneeb Ur Rehman at Rawalpindi Head Office on WhatsApp: 03447956085. Branches in London, Dubai, Toronto.',
    descriptionUr: 'راولپنڈی ہیڈ آفس اور بانی منیب الرحمن سے واٹس ایپ 03447956085 پر رابطہ کریں۔',
  },
  faq: {
    titleEn: 'Frequently Asked Questions (FAQ) | Shaheen Al Zaitoon Academy',
    titleUr: 'عام پوچھے جانے والے سوالات | شاہین الزیتون اکیڈمی',
    descriptionEn: 'Find answers about free trial classes, timings, EasyPaisa fees, female teachers, and class technical setup.',
    descriptionUr: 'فیس، ٹائمنگز، آزمائشی کلاسز اور طریقہ کار کے متعلق اہم سوالات کے جوابات۔',
  },
  blog: {
    titleEn: 'Islamic Knowledge & Tajweed Blog | Shaheen Al Zaitoon',
    titleUr: 'اسلامی مضامین اور تجوید بلاگ | شاہین الزیتون',
    descriptionEn: 'Read authentic articles on Quran recitation, Tajweed rules, Sunnah lifestyle, and parenting in Islam.',
    descriptionUr: 'قرآنی تعلیمات، تجوید کے قواعد اور اسلامی طرزِ زندگی پر مستند مضامین۔',
  },
  gallery: {
    titleEn: 'Academy Photo Gallery & Events | Shaheen Al Zaitoon',
    titleUr: 'تصویری گیلری اور تقاریب | شاہین الزیتون',
    descriptionEn: 'View pictures of student Hifz completions, online competitions, and community charity distributions.',
    descriptionUr: 'حفظ قرآن کی تکمیل، تقاریب اور خیراتی سرگرمیوں کی تصاویر۔',
  },
  testimonials: {
    titleEn: 'Student & Parent Reviews & Testimonials | Shaheen Academy',
    titleUr: 'طلباء اور والدین کے تاثرات | شاہین اکیڈمی',
    descriptionEn: 'Read real verified reviews from parents in UK, USA, Australia, and Pakistan studying at Shaheen Quran Academy.',
    descriptionUr: 'برطانیہ، امریکہ اور پاکستان کے والدین اور طلباء کے تصدیق شدہ تاثرات۔',
  },
  careers: {
    titleEn: 'Teach with Us - Online Quran Teacher Careers | Shaheen Academy',
    titleUr: 'آن لائن استاد بنیں - ملازمت کے مواقع | شاہین اکیڈمی',
    descriptionEn: 'Apply to teach as a certified Qari or female Qaria teacher. Flexible hours and competitive remuneration.',
    descriptionUr: 'مستند قاری یا معلمہ کے طور پر آن لائن تدریس کے لیے درخواست دیں۔',
  },
  privacy: {
    titleEn: 'Privacy Policy | Shaheen Al Zaitoon Online Quran Academy',
    titleUr: 'رازداری کی پالیسی | شاہین الزیتون آن لائن قرآن اکیڈمی',
    descriptionEn: 'Our commitment to protecting student and family privacy and student data security.',
    descriptionUr: 'طلباء اور اہل خانہ کی ذاتی معلومات کی حفاظت کی ضمانت۔',
  },
  terms: {
    titleEn: 'Terms of Service & Code of Conduct | Shaheen Quran Academy',
    titleUr: 'قوانین و ضوابط | شاہین قرآن اکیڈمی',
    descriptionEn: 'Academic policies, attendance rules, fee terms, and etiquette for students and parents.',
    descriptionUr: 'اکیڈمی کے قواعد و ضوابط، حاضری اور تدریسی اخلاقیات۔',
  },
  donations: {
    titleEn: 'Sadaqah Jariyah & Memorial Dedication for Zaitoon Bibi | Shaheen',
    titleUr: 'صدقہ جاریہ اور ایصالِ ثواب برائے زیتون بی بی | شاہین اکیڈمی',
    descriptionEn: 'Contribute to free Quran learning for deserving students and Sadaqah Jariyah projects dedicated to Zaitoon Bibi.',
    descriptionUr: 'مستحق بچوں کے لیے مفت قرآنی تعلیم اور زیتون بی بی کے ایصالِ ثواب کے لیے صدقہ جاریہ۔',
  },
  'help-support': {
    titleEn: 'Help & Live Support Desk | Shaheen Al Zaitoon Academy',
    titleUr: 'مدد اور لائیو سپورٹ ڈیسک | شاہین الزیتون اکیڈمی',
    descriptionEn: 'Get instant support for class links, teacher rescheduling, EasyPaisa fee issues, and general inquiries.',
    descriptionUr: 'کلاس لنک، استاد کی تبدیلی یا فیس کے مسائل کے فوری حل کے لیے سپورٹ ڈیسک۔',
  },
  'admin-portal': {
    titleEn: 'Academy Administration Portal | Shaheen Al Zaitoon',
    titleUr: 'اکیڈمی ایڈمن پورٹل | شاہین الزیتون',
    descriptionEn: 'Official management dashboard for founder, staff, student registries, and finance.',
    descriptionUr: 'اکیڈمی کا انتظامی پورٹل برائے بانی و ناظمین۔',
  },
  'online-quran-classes': {
    titleEn: 'Online Quran Classes for Kids & Adults | Shaheen Al Zaitoon',
    titleUr: 'آن لائن قرآن کلاسز برائے بچے اور بڑے | شاہین الزیتون اکیڈمی',
    descriptionEn: 'Join 1-on-1 online Quran classes for kids, beginners, ladies, and adults with certified Qaris. Flexible scheduling worldwide with a free 3-day trial.',
    descriptionUr: 'گھر بیٹھے مستند اساتذہ سے آن لائن قرآن کلاسز لیں۔ بچوں اور بڑوں کے لیے 3 دن کی مفت آزمائشی کلاسز۔',
  },
  'noorani-qaida': {
    titleEn: 'Learn Noorani Qaida Online | Shaheen Al Zaitoon',
    titleUr: 'آن لائن نورانی قاعدہ کورس | شاہین الزیتون اکیڈمی',
    descriptionEn: 'Master Arabic alphabet, Makharij, and basic Tajweed rules with 1-on-1 online Noorani Qaida classes for beginners and kids. Book your 3-day free trial.',
    descriptionUr: 'بچوں اور ابتدائی طلباء کے لیے نورانی قاعدہ مع درست مخارج اور تجوید۔ مفت آزمائشی کلاس میں شامل ہوں۔',
  },
  'quran-reading': {
    titleEn: 'Learn Quran Reading Online (Nazra) | Shaheen Al Zaitoon',
    titleUr: 'آن لائن ناظرہ قرآن کلاسز | شاہین الزیتون اکیڈمی',
    descriptionEn: 'Learn fluent Nazra Quran reading online with certified tutors. 1-on-1 personalized recitation classes for kids and adults. Start your 3-day free trial.',
    descriptionUr: 'مکمل قرآن مجید ناظرہ روانی اور تجوید کے ساتھ پڑھنا سیکھیں۔ مستند قراء کی زیرِ نگرانی 1-on-1 کلاسز۔',
  },
  'online-tajweed-classes': {
    titleEn: 'Online Quran Classes with Tajweed | Shaheen Al Zaitoon',
    titleUr: 'آن لائن تجوید و قرآن کلاسز | شاہین الزیتون اکیڈمی',
    descriptionEn: 'Master Makharij, Sifaat, and Tajweed rules with certified Qaris. 1-on-1 interactive online Tajweed classes for beginners and advanced students. Free 3-day trial.',
    descriptionUr: 'مستند قراء سے تجوید کے قواعد، مخارج اور صفات کی مکمل تربیت لیں۔ مفت 3 روزہ ٹرائل کلاس۔',
  },
  'online-hifz-quran-classes': {
    titleEn: 'Online Hifz Quran Classes & Memorization | Shaheen Al Zaitoon',
    titleUr: 'آن لائن حفظ القرآن کورس | شاہین الزیتون اکیڈمی',
    descriptionEn: 'Structured 1-on-1 online Hifz Quran program for kids and adults. Systematic daily Sabaq, Sabaqi, and Manzil revision guided by certified Huffaz. Free trial.',
    descriptionUr: 'مستند حفاظ کرام کی زیرِ نگرانی روزانہ سبق، سبقی اور منزل کا باقاعدہ نظام۔ آن لائن حفظ قرآن مکمل کریں۔',
  },
  'quran-translation': {
    titleEn: 'Learn Quran Translation Online | Shaheen Al Zaitoon',
    titleUr: 'آن لائن فہم و ترجمہ قرآن کلاسز | شاہین الزیتون اکیڈمی',
    descriptionEn: 'Understand the words of Allah with word-by-word and contextual Quran translation classes online. 1-on-1 personalized lessons in English and Urdu. Free trial.',
    descriptionUr: 'قرآن مجید کا لفظی و با محاورہ ترجمہ سیکھیں اور اللہ کے کلام کو گہرائی سے سمجھیں۔ 3 روزہ مفت ٹرائل۔',
  },
  'quran-tafseer': {
    titleEn: 'Online Quran Tafseer Classes | Shaheen Al Zaitoon',
    titleUr: 'آن لائن تفسیر قرآن کورس | شاہین الزیتون اکیڈمی',
    descriptionEn: 'Deepen your connection with Allah through online Quran Tafseer classes. Learn historical contexts, Asbab an-Nuzul, and practical wisdom. Book a free trial.',
    descriptionUr: 'مستند علماء کرام سے قرآن پاک کی مفصل تفسیر، اسباب النزول اور عملی رہنمائی حاصل کریں۔',
  },
  'quran-classes-for-kids': {
    titleEn: 'Online Quran Classes for Kids | Shaheen Al Zaitoon',
    titleUr: 'بچوں کے لیے آن لائن قرآن کلاسز | شاہین الزیتون اکیڈمی',
    descriptionEn: 'Engaging, child-friendly 1-on-1 online Quran classes for kids with patient certified tutors. Interactive lessons, Tajweed, and daily Duas. Start free 3-day trial.',
    descriptionUr: 'بچوں کے لیے دلچسپ اور دوستانہ ماحول میں نورانی قاعدہ، ناظرہ اور اسلامی اخلاقیات۔ 3 روزہ مفت آزمائش۔',
  },
  'quran-for-beginners': {
    titleEn: 'Learn Quran Online for Beginners | Shaheen Al Zaitoon',
    titleUr: 'ابتدائی افراد کے لیے آن لائن قرآن کورس | شاہین الزیتون اکیڈمی',
    descriptionEn: 'Step-by-step 1-on-1 Quran classes for beginners of all ages. Start from zero Arabic knowledge with patient certified tutors. Book a free 3-day trial.',
    descriptionUr: 'بالکل صفر سے قرآن پاک سیکھنا شروع کریں۔ بغیر کسی جھجک کے 1-on-1 کلاسز میں شامل ہوں۔ 3 روزہ مفت ٹرائل۔',
  },
  'quran-classes-for-adults': {
    titleEn: 'Online Quran Classes for Adults | Shaheen Al Zaitoon',
    titleUr: 'بڑوں کے لیے آن لائن قرآن کلاسز | شاہین الزیتون اکیڈمی',
    descriptionEn: 'Flexible, private 1-on-1 online Quran classes for busy adults and professionals. Learn Tajweed, recitation, translation, and Tafseer. Free 3-day trial.',
    descriptionUr: 'مصروف زندگی کے ساتھ گھر بیٹھے قرآن پاک تجوید، ناظرہ، ترجمہ اور تفسیر سیکھیں۔ 3 روزہ مفت آزمائش۔',
  },
  'quran-classes-for-ladies': {
    titleEn: 'Online Quran Classes for Ladies | Shaheen Al Zaitoon',
    titleUr: 'خواتین کے لیے آن لائن قرآن کلاسز | شاہین الزیتون اکیڈمی',
    descriptionEn: 'Private 1-on-1 online Quran classes for ladies and sisters taught exclusively by certified female Qarias and Alimahs. Complete privacy & flexible hours. Free trial.',
    descriptionUr: 'مستند اور باحجاب معلمات اور قاریہ صاحبان سے مکمل پردے کے ساتھ آن لائن قرآن پاک سیکھیں۔ 3 روزہ مفت ٹرائل۔',
  },
  'online-islamic-studies': {
    titleEn: 'Online Islamic Studies Classes | Shaheen Al Zaitoon',
    titleUr: 'آن لائن اسلامک اسٹڈیز کورس | شاہین الزیتون اکیڈمی',
    descriptionEn: 'Comprehensive online Islamic studies course covering Aqeedah, Fiqh, Seerah, Hadith, and Islamic manners for kids and adults. Start your free trial today.',
    descriptionUr: 'عقائد، فقہ، سیرت النبی ﷺ، احادیث اور اسلامی اخلاقیات پر مبنی جامع تعلیمی کورس۔',
  },
  'quranic-arabic': {
    titleEn: 'Online Quranic Arabic Classes | Shaheen Al Zaitoon',
    titleUr: 'آن لائن لسان القرآن و عربی گرامر کورس | شاہین الزیتون اکیڈمی',
    descriptionEn: 'Master Quranic Arabic grammar (Nahw & Sarf) to comprehend the Holy Quran directly in Arabic without translation. 1-on-1 online classes. Free trial.',
    descriptionUr: 'نحو و صرف کے آسان قواعد کے ذریعے قرآن مجید کو براہِ راست عربی زبان میں سمجھیں۔',
  },
  'salah-and-duas': {
    titleEn: 'Online Salah & Daily Duas Classes | Shaheen Al Zaitoon',
    titleUr: 'آن لائن نماز و مسنون دعائیں کورس | شاہین الزیتون اکیڈمی',
    descriptionEn: 'Learn the practical method of Salah (Namaz), Wudu, and essential Masnoon Duas with correct pronunciation and meanings. 1-on-1 online classes. Free trial.',
    descriptionUr: 'وضو، مکمل طریقہ نماز، مسنون دعائیں اور چھ کلمے درست تلفظ اور ترجمے کے ساتھ سیکھیں۔',
  },
};

export function updatePageSeo(page: PageId, lang: Language) {
  const meta = pageSeoData[page] || pageSeoData.home;
  const title = lang === 'ur' ? meta.titleUr : meta.titleEn;
  const description = lang === 'ur' ? meta.descriptionUr : meta.descriptionEn;

  document.title = title;

  // Update meta description
  let descTag = document.querySelector('meta[name="description"]');
  if (descTag) {
    descTag.setAttribute('content', description);
  }

  // Update og:title & og:description
  let ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', title);

  let ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute('content', description);

  // Update twitter:title & twitter:description
  let twTitle = document.querySelector('meta[name="twitter:title"]');
  if (twTitle) twTitle.setAttribute('content', title);

  let twDesc = document.querySelector('meta[name="twitter:description"]');
  if (twDesc) twDesc.setAttribute('content', description);

  // Update canonical URL
  let canonicalTag = document.querySelector('link[rel="canonical"]');
  if (canonicalTag) {
    const url = page === 'home' ? 'https://muneeb-lime.vercel.app/' : `https://muneeb-lime.vercel.app/#${page}`;
    canonicalTag.setAttribute('href', url);
  }

  // Update HTML lang and dir
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ur' || lang === 'ar' ? 'rtl' : 'ltr';

  // Inject or update Page-Specific Schema.org JSON-LD
  let dynamicScript = document.getElementById('dynamic-page-schema');
  if (!dynamicScript) {
    dynamicScript = document.createElement('script');
    dynamicScript.id = 'dynamic-page-schema';
    dynamicScript.setAttribute('type', 'application/ld+json');
    document.head.appendChild(dynamicScript);
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://muneeb-lime.vercel.app/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: title,
        item: page === 'home' ? 'https://muneeb-lime.vercel.app/' : `https://muneeb-lime.vercel.app/#${page}`,
      },
    ],
  };

  dynamicScript.textContent = JSON.stringify(breadcrumbSchema);
}
