import { PageId, Language } from '../types';
import { seoCoursesList } from '../data/seoCoursesData';

interface PageMetadata {
  titleEn: string;
  titleUr: string;
  descriptionEn: string;
  descriptionUr: string;
  keywordsEn?: string;
  keywordsUr?: string;
}

export const pageSeoData: Record<PageId, PageMetadata> = {
  home: {
    titleEn: 'Online Quran Classes | Shaheen Al Zaitoon Online Quran Academy',
    titleUr: 'آن لائن قرآن اکیڈمی | شاہین الزیتون آن لائن قرآن اکیڈمی',
    descriptionEn: 'Learn Quran online with certified Tajweed teachers. 1-on-1 classes for kids, ladies & adults across USA, UK, Canada, Australia & Pakistan. 3-Day free trial.',
    descriptionUr: 'گھر بیٹھے مستند قراء سے قرآن پاک ناظرہ، تجوید اور حفظ سیکھیں۔ بچوں، خواتین اور بڑوں کے لیے 3 دن کی مفت آزمائشی کلاسز۔',
    keywordsEn: 'online Quran classes, learn Quran online, online Quran academy, Quran classes online, online Quran teacher, online Quran classes with Tajweed, online Noorani Qaida classes, online Hifz Quran classes, online Quran classes for kids, online Quran classes for ladies, 1 on 1 online Quran classes, learn Quran USA, learn Quran UK, learn Quran Canada, learn Quran Australia, Shaheen Al Zaitoon Quran Academy, Muneeb Ur Rehman',
    keywordsUr: 'آن لائن قرآن کلاسز, آن لائن قرآن اکیڈمی, گھر بیٹھے قرآن سیکھیں, آن لائن قاری, تجوید کے ساتھ قرآن, بچوں کے لیے قرآن کلاسز, خواتین کے لیے قرآن کلاسز, شاہین الزیتون قرآن اکیڈمی, منیب الرحمن',
  },
  courses: {
    titleEn: 'Online Quran Courses & Pricing 2026 | Shaheen Al Zaitoon Academy',
    titleUr: 'آن لائن قرآنی کورسز اور فیس شیڈول 2026 | شاہین الزیتون اکیڈمی',
    descriptionEn: 'Browse structured online Quran courses: Noorani Qaida, Tajweed, Hifz, Translation & Tafseer. 1-on-1 classes with certified Qaris. Free 3-day trial.',
    descriptionUr: 'نورانی قاعدہ، ناظرہ مع تجوید، حفظ القرآن، ترجمہ و تفسیر اور عربی زبان کے کورسز۔ مستند قراء سے 1-on-1 کلاسز اور 3 روزہ مفت آزمائش۔',
    keywordsEn: 'online Quran courses, Quran syllabus online, learn Noorani Qaida, online Tajweed course, online Hifz course, Quran translation online, Quran Tafseer course, online Islamic studies, Shaheen Al Zaitoon courses',
    keywordsUr: 'آن لائن قرآن کورسز, قرآنی نصاب, نورانی قاعدہ آن لائن, تجوید کورس, حفظ قرآن کورس, ترجمہ قرآن, تفسیر قرآن, اسلامی تعلیمات',
  },
  about: {
    titleEn: 'About Academy & Founder Muneeb Ur Rehman | Shaheen Al Zaitoon',
    titleUr: 'اکیڈمی اور بانی منیب الرحمن کا تعارف | شاہین الزیتون',
    descriptionEn: 'Founded by Muneeb Ur Rehman in Rawalpindi, Pakistan as Sadaqah Jariyah for Zaitoon Bibi. Serving students worldwide across UK, USA, UAE & Canada.',
    descriptionUr: 'راولپنڈی سے بانی منیب الرحمن کی زیرِ نگرانی زیتون بی بی کی ایصالِ ثواب کے لیے قائم کردہ اکیڈمی۔',
    keywordsEn: 'about Shaheen Al Zaitoon, Muneeb Ur Rehman founder, Zaitoon Bibi Sadaqah Jariyah, online Quran academy Rawalpindi Pakistan, Islamic charity education',
    keywordsUr: 'شاہین الزیتون اکیڈمی تعارف, بانی منیب الرحمن, زیتون بی بی ایصال ثواب, راولپنڈی قرآن اکیڈمی',
  },
  teachers: {
    titleEn: 'Certified Qari & Qaria Faculty | Shaheen Al Zaitoon Academy',
    titleUr: 'مستند قراء اور اساتذہ کرام | شاہین الزیتون اکیڈمی',
    descriptionEn: 'Meet certified Egyptian, Pakistani and international Quran teachers, Huffaz and female Qaria teachers for sisters.',
    descriptionUr: 'مستند اور تجربہ کار قراء، حفاظ اور خواتین کے لیے معلمات۔',
    keywordsEn: 'online Quran teachers, certified Qari online, female Quran teacher, hire Quran tutor, Qaria online, Huffaz online teachers',
    keywordsUr: 'مستند قاری آن لائن, آن لائن قاریہ, خواتین اساتذہ, حافظ قرآن اساتذہ',
  },
  admissions: {
    titleEn: 'Admissions & 3-Day Free Trial Class | Shaheen Quran Academy',
    titleUr: 'داخلہ فارم اور 3 روزہ مفت ٹرائل کلاس | شاہین قرآن اکیڈمی',
    descriptionEn: 'Register today for your 3-day free trial Quran recitation class with no upfront payment required.',
    descriptionUr: 'بغیر کسی پیشگی فیس کے 3 دن کی مفت آزمائشی کلاس کے لیے ابھی اندراج کریں۔',
    keywordsEn: 'online Quran admission, free Quran trial class, 3 day Quran trial, register online Quran classes, Quran classes without advance fee',
    keywordsUr: 'قرآن کلاس داخلہ, مفت ٹرائل کلاس, 3 روزہ ٹرائل, آن لائن رجسٹریشن قرآن',
  },
  'fee-payment': {
    titleEn: 'EasyPaisa & Bank Fee Payment | Shaheen Al Zaitoon Academy',
    titleUr: 'ایزی پیسہ اور فیس ادائیگی کا نظام | شاہین الزیتون اکیڈمی',
    descriptionEn: 'Pay monthly academy fees securely via EasyPaisa (03447956085) or direct bank transfer. Upload receipt for instant verification.',
    descriptionUr: 'ایزی پیسہ (03447956085) کے ذریعے باآسانی ماہانہ فیس ادا کریں اور رسید اپلوڈ کریں۔',
    keywordsEn: 'online Quran fee payment, EasyPaisa 03447956085, pay Quran tuition, monthly Quran fees, bank transfer tuition payment',
    keywordsUr: 'فیس ادائیگی ایزی پیسہ, 03447956085, ماہانہ فیس قرآن, رسید اپلوڈ',
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
    keywordsEn: 'online Quran classes, online Quran academy, learn Quran online, Quran classes online, online Quran tutor, 1 on 1 Quran lessons, best online Quran classes, online Quran classes USA UK, Shaheen Al Zaitoon',
    keywordsUr: 'آن لائن قرآن کلاسز, آن لائن قرآن اکیڈمی, انٹرنیٹ پر قرآن سیکھیں, ون آن ون قرآن کلاس, مستند قاری آن لائن',
  },
  'noorani-qaida': {
    titleEn: 'Learn Noorani Qaida Online | Shaheen Al Zaitoon',
    titleUr: 'آن لائن نورانی قاعدہ کورس | شاہین الزیتون اکیڈمی',
    descriptionEn: 'Master Arabic alphabet, Makharij, and basic Tajweed rules with 1-on-1 online Noorani Qaida classes for beginners and kids. Book your 3-day free trial.',
    descriptionUr: 'بچوں اور ابتدائی طلباء کے لیے نورانی قاعدہ مع درست مخارج اور تجوید۔ مفت آزمائشی کلاس میں شامل ہوں۔',
    keywordsEn: 'online Noorani Qaida classes, learn Noorani Qaida online, Noorani Qaida for kids, Arabic alphabet online, basic Quran reading, Noorani Qaida tutor, Noorani Qaida with Tajweed',
    keywordsUr: 'آن لائن نورانی قاعدہ, نورانی قاعدہ بچوں کے لیے, بنیادی عربی حروف, مخارج کے ساتھ نورانی قاعدہ',
  },
  'quran-reading': {
    titleEn: 'Learn Quran Reading Online (Nazra) | Shaheen Al Zaitoon',
    titleUr: 'آن لائن ناظرہ قرآن کلاسز | شاہین الزیتون اکیڈمی',
    descriptionEn: 'Learn fluent Nazra Quran reading online with certified tutors. 1-on-1 personalized recitation classes for kids and adults. Start your 3-day free trial.',
    descriptionUr: 'مکمل قرآن مجید ناظرہ روانی اور تجوید کے ساتھ پڑھنا سیکھیں۔ مستند قراء کی زیرِ نگرانی 1-on-1 کلاسز۔',
    keywordsEn: 'online Nazra Quran classes, learn Quran reading online, Nazra Quran with Tajweed, fluent Quran recitation, 1-on-1 Nazra tutor, online Quran reading for beginners',
    keywordsUr: 'آن لائن ناظرہ قرآن, ناظرہ قرآن کلاسز, روانی سے قرآن پڑھنا, ناظرہ مع تجوید',
  },
  'online-tajweed-classes': {
    titleEn: 'Online Quran Classes with Tajweed | Shaheen Al Zaitoon',
    titleUr: 'آن لائن تجوید و قرآن کلاسز | شاہین الزیتون اکیڈمی',
    descriptionEn: 'Master Makharij, Sifaat, and Tajweed rules with certified Qaris. 1-on-1 interactive online Tajweed classes for beginners and advanced students. Free 3-day trial.',
    descriptionUr: 'مستند قراء سے تجوید کے قواعد، مخارج اور صفات کی مکمل تربیت لیں۔ مفت 3 روزہ ٹرائل کلاس۔',
    keywordsEn: 'online Tajweed classes, online Quran classes with Tajweed, learn Tajweed online, Tajweed rules course, master Arabic Makharij, certified Tajweed teacher, Tajweed lessons online',
    keywordsUr: 'آن لائن تجوید کلاسز, علم التجوید, مخارج الحروف, تجوید کے قواعد, مستند قاری تجوید',
  },
  'online-hifz-quran-classes': {
    titleEn: 'Online Hifz Quran Classes & Memorization | Shaheen Al Zaitoon',
    titleUr: 'آن لائن حفظ القرآن کورس | شاہین الزیتون اکیڈمی',
    descriptionEn: 'Structured 1-on-1 online Hifz Quran program for kids and adults. Systematic daily Sabaq, Sabaqi, and Manzil revision guided by certified Huffaz. Free trial.',
    descriptionUr: 'مستند حفاظ کرام کی زیرِ نگرانی روزانہ سبق، سبقی اور منزل کا باقاعدہ نظام۔ آن لائن حفظ قرآن مکمل کریں۔',
    keywordsEn: 'online Hifz Quran classes, Quran memorization online, learn Hifz online, become Hafiz online, online Hifz tutor, daily Sabaq Manzil revision, Hifz program for kids',
    keywordsUr: 'آن لائن حفظ قرآن, حفظ القرآن کورس, حافظ بنیں آن لائن, روزانہ سبق سبقی منزل, مستند حفاظ',
  },
  'quran-translation': {
    titleEn: 'Learn Quran Translation Online | Shaheen Al Zaitoon',
    titleUr: 'آن لائن فہم و ترجمہ قرآن کلاسز | شاہین الزیتون اکیڈمی',
    descriptionEn: 'Understand the words of Allah with word-by-word and contextual Quran translation classes online. 1-on-1 personalized lessons in English and Urdu. Free trial.',
    descriptionUr: 'قرآن مجید کا لفظی و با محاورہ ترجمہ سیکھیں اور اللہ کے کلام کو گہرائی سے سمجھیں۔ 3 روزہ مفت ٹرائل۔',
    keywordsEn: 'online Quran translation classes, learn Quran translation online, word by word Quran translation, Urdu Quran translation, English Quran translation, understand Quran meaning',
    keywordsUr: 'آن لائن ترجمہ قرآن, لفظی ترجمہ قرآن, با محاورہ ترجمہ قرآن, فہم القرآن کورس',
  },
  'quran-tafseer': {
    titleEn: 'Online Quran Tafseer Classes | Shaheen Al Zaitoon',
    titleUr: 'آن لائن تفسیر قرآن کورس | شاہین الزیتون اکیڈمی',
    descriptionEn: 'Deepen your connection with Allah through online Quran Tafseer classes. Learn historical contexts, Asbab an-Nuzul, and practical wisdom. Book a free trial.',
    descriptionUr: 'مستند علماء کرام سے قرآن پاک کی مفصل تفسیر، اسباب النزول اور عملی رہنمائی حاصل کریں۔',
    keywordsEn: 'online Quran Tafseer classes, learn Tafseer online, Quran explanation course, Asbab an Nuzul, comprehensive Tafseer ul Quran, Islamic scholarship online',
    keywordsUr: 'آن لائن تفسیر قرآن, تفسیر کورس, اسباب النزول, مفصل تفسیر القرآن, مستند علمائے کرام',
  },
  'quran-classes-for-kids': {
    titleEn: 'Online Quran Classes for Kids | Shaheen Al Zaitoon',
    titleUr: 'بچوں کے لیے آن لائن قرآن کلاسز | شاہین الزیتون اکیڈمی',
    descriptionEn: 'Engaging, child-friendly 1-on-1 online Quran classes for kids with patient certified tutors. Interactive lessons, Tajweed, and daily Duas. Start free 3-day trial.',
    descriptionUr: 'بچوں کے لیے دلچسپ اور دوستانہ ماحول میں نورانی قاعدہ، ناظرہ اور اسلامی اخلاقیات۔ 3 روزہ مفت آزمائش۔',
    keywordsEn: 'online Quran classes for kids, kids Quran learning, Quran tutor for children, interactive Quran lessons, Quran lessons for toddlers, Noorani Qaida for children',
    keywordsUr: 'بچوں کے لیے آن لائن قرآن, بچوں کی قرآنی تعلیم, بچوں کے لیے نورانی قاعدہ, صبر و پیار سے قرآنی تدریس',
  },
  'quran-for-beginners': {
    titleEn: 'Learn Quran Online for Beginners | Shaheen Al Zaitoon',
    titleUr: 'ابتدائی افراد کے لیے آن لائن قرآن کورس | شاہین الزیتون اکیڈمی',
    descriptionEn: 'Step-by-step 1-on-1 Quran classes for beginners of all ages. Start from zero Arabic knowledge with patient certified tutors. Book a free 3-day trial.',
    descriptionUr: 'بالکل صفر سے قرآن پاک سیکھنا شروع کریں۔ بغیر کسی جھجک کے 1-on-1 کلاسز میں شامل ہوں۔ 3 روزہ مفت ٹرائل۔',
    keywordsEn: 'Quran for beginners, learn Quran from zero, beginner Quran classes online, step by step Quran learning, easy Quran reading, start reading Quran',
    keywordsUr: 'ابتدائی افراد کے لیے قرآن, صفر سے قرآن سیکھیں, بنیادی قرآنی کلاسز, آسان طریقہ قرآن خوانی',
  },
  'quran-classes-for-adults': {
    titleEn: 'Online Quran Classes for Adults | Shaheen Al Zaitoon',
    titleUr: 'بڑوں کے لیے آن لائن قرآن کلاسز | شاہین الزیتون اکیڈمی',
    descriptionEn: 'Flexible, private 1-on-1 online Quran classes for busy adults and professionals. Learn Tajweed, recitation, translation, and Tafseer. Free 3-day trial.',
    descriptionUr: 'مصروف زندگی کے ساتھ گھر بیٹھے قرآن پاک تجوید، ناظرہ، ترجمہ اور تفسیر سیکھیں۔ 3 روزہ مفت آزمائش۔',
    keywordsEn: 'online Quran classes for adults, adult Quran lessons, Quran for professionals, flexible Quran classes online, private adult Quran tutor',
    keywordsUr: 'بڑوں کے لیے قرآن کلاسز, پیشہ ور افراد کے لیے قرآن, لچکدار اوقات میں قرآن سیکھیں, بالغوں کی قرآنی تعلیم',
  },
  'quran-classes-for-ladies': {
    titleEn: 'Online Quran Classes for Ladies | Shaheen Al Zaitoon',
    titleUr: 'خواتین کے لیے آن لائن قرآن کلاسز | شاہین الزیتون اکیڈمی',
    descriptionEn: 'Private 1-on-1 online Quran classes for ladies and sisters taught exclusively by certified female Qarias and Alimahs. Complete privacy & flexible hours. Free trial.',
    descriptionUr: 'مستند اور باحجاب معلمات اور قاریہ صاحبان سے مکمل پردے کے ساتھ آن لائن قرآن پاک سیکھیں۔ 3 روزہ مفت ٹرائل۔',
    keywordsEn: 'online Quran classes for ladies, female Quran teacher online, Quran classes for women, private sisters Quran classes, certified female Qaria, Islamic education for sisters',
    keywordsUr: 'خواتین کے لیے آن لائن قرآن, باحجاب خواتین اساتذہ, قاریہ آن لائن, بہنوں کے لیے قرآنی کلاسز, پردے کے ساتھ تدریس',
  },
  'online-islamic-studies': {
    titleEn: 'Online Islamic Studies Classes | Shaheen Al Zaitoon',
    titleUr: 'آن لائن اسلامک اسٹڈیز کورس | شاہین الزیتون اکیڈمی',
    descriptionEn: 'Comprehensive online Islamic studies course covering Aqeedah, Fiqh, Seerah, Hadith, and Islamic manners for kids and adults. Start your free trial today.',
    descriptionUr: 'عقائد، فقہ، سیرت النبی ﷺ، احادیث اور اسلامی اخلاقیات پر مبنی جامع تعلیمی کورس۔',
    keywordsEn: 'online Islamic studies classes, Islamic education online, learn Fiqh Aqeedah Hadith, Islamic courses for kids, Seerah of Prophet Muhammad online',
    keywordsUr: 'آن لائن اسلامک اسٹڈیز, اسلامی تعلیمات, عقائد و فقہ, سیرت النبی کورس, احادیث نبوی کورس',
  },
  'quranic-arabic': {
    titleEn: 'Online Quranic Arabic Classes | Shaheen Al Zaitoon',
    titleUr: 'آن لائن لسان القرآن و عربی گرامر کورس | شاہین الزیتون اکیڈمی',
    descriptionEn: 'Master Quranic Arabic grammar (Nahw & Sarf) to comprehend the Holy Quran directly in Arabic without translation. 1-on-1 online classes. Free trial.',
    descriptionUr: 'نحو و صرف کے آسان قواعد کے ذریعے قرآن مجید کو براہِ راست عربی زبان میں سمجھیں۔',
    keywordsEn: 'online Quranic Arabic classes, learn Arabic grammar online, Nahw and Sarf course, comprehend Quran Arabic, Arabic language for Quran understanding',
    keywordsUr: 'لسان القرآن کورس, قرآنی عربی گرامر, نحو و صرف, عربی زبان آن لائن, براہِ راست قرآن فہمی',
  },
  'salah-and-duas': {
    titleEn: 'Online Salah & Daily Duas Classes | Shaheen Al Zaitoon',
    titleUr: 'آن لائن نماز و مسنون دعائیں کورس | شاہین الزیتون اکیڈمی',
    descriptionEn: 'Learn the practical method of Salah (Namaz), Wudu, and essential Masnoon Duas with correct pronunciation and meanings. 1-on-1 online classes. Free trial.',
    descriptionUr: 'وضو، مکمل طریقہ نماز، مسنون دعائیں اور چھ کلمے درست تلفظ اور ترجمے کے ساتھ سیکھیں۔',
    keywordsEn: 'online Salah classes, learn Namaz online, daily Masnoon Duas course, learn Wudu method, Six Kalimas with translation, Islamic prayer training online',
    keywordsUr: 'طریقہ نماز آن لائن, مسنون دعائیں سیکھیں, طریقہ وضو, چھ کلمے ترجمہ کے ساتھ, نماز کورس',
  },
};

export function updatePageSeo(page: PageId, lang: Language) {
  const meta = pageSeoData[page] || pageSeoData.home;
  const title = lang === 'ur' ? meta.titleUr : meta.titleEn;
  const description = lang === 'ur' ? meta.descriptionUr : meta.descriptionEn;

  document.title = title;

  // Update meta title
  let titleTag = document.querySelector('meta[name="title"]');
  if (!titleTag) {
    titleTag = document.createElement('meta');
    titleTag.setAttribute('name', 'title');
    document.head.appendChild(titleTag);
  }
  titleTag.setAttribute('content', title);

  // Update meta description
  let descTag = document.querySelector('meta[name="description"]');
  if (descTag) {
    descTag.setAttribute('content', description);
  }

  // Update meta keywords (2026 Semantic Search & Intent Clusters)
  const keywords = lang === 'ur' ? (meta.keywordsUr || meta.keywordsEn) : (meta.keywordsEn || meta.keywordsUr);
  if (keywords) {
    let kwTag = document.querySelector('meta[name="keywords"]');
    if (!kwTag) {
      kwTag = document.createElement('meta');
      kwTag.setAttribute('name', 'keywords');
      document.head.appendChild(kwTag);
    }
    kwTag.setAttribute('content', keywords);
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

  // Update canonical URL & social URLs
  const cleanUrl = page === 'home' ? 'https://muneeb-lime.vercel.app/' : `https://muneeb-lime.vercel.app/${page}`;
  
  let canonicalTag = document.querySelector('link[rel="canonical"]');
  if (canonicalTag) {
    canonicalTag.setAttribute('href', cleanUrl);
  }

  let ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl) {
    ogUrl.setAttribute('content', cleanUrl);
  }

  let twUrl = document.querySelector('meta[name="twitter:url"]');
  if (twUrl) {
    twUrl.setAttribute('content', cleanUrl);
  }

  // Update HTML lang and dir
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ur' || lang === 'ar' ? 'rtl' : 'ltr';

  // Inject or update Page-Specific Schema.org JSON-LD Graph
  let dynamicScript = document.getElementById('dynamic-page-schema');
  if (!dynamicScript) {
    dynamicScript = document.createElement('script');
    dynamicScript.id = 'dynamic-page-schema';
    dynamicScript.setAttribute('type', 'application/ld+json');
    document.head.appendChild(dynamicScript);
  }

  const currentUrl = cleanUrl;

  const schemaGraph: any[] = [
    {
      '@type': 'BreadcrumbList',
      '@id': `${currentUrl}#breadcrumb`,
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
          item: currentUrl,
        },
      ],
    },
  ];

  // If this is a specialized SEO course page, attach Course & FAQPage schemas
  const courseData = seoCoursesList[page];
  if (courseData) {
    schemaGraph.push({
      '@type': 'Course',
      '@id': `${currentUrl}#course`,
      name: courseData.h1,
      description: courseData.shortIntro,
      provider: {
        '@type': 'EducationalOrganization',
        name: 'Shaheen Al Zaitoon Online Quran Academy',
        url: 'https://muneeb-lime.vercel.app/',
      },
      offers: [
        {
          '@type': 'Offer',
          price: courseData.feePKR.toString(),
          priceCurrency: 'PKR',
          category: 'Monthly Quran Tuition (Pakistan)',
          availability: 'https://schema.org/InStock',
          validFrom: '2026-01-01',
        },
        {
          '@type': 'Offer',
          price: courseData.feeUSD.toString(),
          priceCurrency: 'USD',
          category: 'Monthly Quran Tuition (Global - USA, UK, Canada, Australia, UAE)',
          availability: 'https://schema.org/InStock',
          validFrom: '2026-01-01',
        },
      ],
      hasCourseInstance: {
        '@type': 'CourseInstance',
        courseMode: 'Online',
        courseWorkload: `${courseData.classFormat.duration}, ${courseData.classFormat.frequency}`,
        inLanguage: ['en', 'ur', 'ar'],
      },
    });

    if (courseData.faqs && courseData.faqs.length > 0) {
      schemaGraph.push({
        '@type': 'FAQPage',
        '@id': `${currentUrl}#faq`,
        mainEntity: courseData.faqs.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.answer,
          },
        })),
      });
    }
  } else if (page === 'contact') {
    schemaGraph.push({
      '@type': 'ContactPage',
      '@id': `${currentUrl}#contactpage`,
      name: title,
      description: description,
      mainEntity: {
        '@type': 'LocalBusiness',
        name: 'Shaheen Al Zaitoon Online Quran Academy HQ',
        telephone: '+92-344-7956085',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Rawalpindi',
          addressRegion: 'Punjab',
          addressCountry: 'PK',
        },
      },
    });
  } else if (page === 'about') {
    schemaGraph.push({
      '@type': 'AboutPage',
      '@id': `${currentUrl}#aboutpage`,
      name: title,
      description: description,
      mainEntity: {
        '@type': 'Person',
        name: 'Muneeb Ur Rehman',
        jobTitle: 'Founder',
        description: 'Founder of Shaheen Al Zaitoon Online Quran Academy, dedicated as Sadaqah Jariyah for Zaitoon Bibi.',
      },
    });
  }

  dynamicScript.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': schemaGraph,
  });
}
