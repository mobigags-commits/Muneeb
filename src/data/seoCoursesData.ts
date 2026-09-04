import { PageId } from '../types';

export interface SeoCourseData {
  id: PageId;
  urlPath: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  metaTitle: string;
  metaDescription: string;
  metaTitleUrdu: string;
  metaDescriptionUrdu: string;
  h1: string;
  subheading: string;
  shortIntro: string;
  courseOverview: string;
  whoIsThisFor: string[];
  whatYouWillLearn: {
    title: string;
    description: string;
  }[];
  curriculum: {
    moduleNumber: string;
    moduleTitle: string;
    topics: string[];
  }[];
  howClassesWork: {
    title: string;
    desc: string;
    icon: string;
  }[];
  learningBenefits: string[];
  classFormat: {
    duration: string;
    frequency: string;
    platform: string;
    language: string;
    schedule: string;
    assessment: string;
  };
  teacherInfo: {
    title: string;
    description: string;
    qualifications: string[];
  };
  faqs: {
    question: string;
    answer: string;
  }[];
  internalLinks: {
    pageId: PageId;
    anchorText: string;
    description: string;
  }[];
  feePKR: number;
  feeUSD: number;
  featuredImage: string;
}

export const seoCoursesList: Record<string, SeoCourseData> = {
  'online-quran-classes': {
    id: 'online-quran-classes',
    urlPath: '/online-quran-classes',
    primaryKeyword: 'online Quran classes',
    secondaryKeywords: [
      'Quran classes online',
      'learn Quran online',
      'online Quran academy',
      'Quran lessons online',
      'private Quran classes online',
    ],
    metaTitle: 'Online Quran Classes for Kids & Adults | Shaheen Al Zaitoon',
    metaDescription:
      'Join 1-on-1 online Quran classes for kids, beginners, ladies, and adults with certified Qaris. Flexible scheduling worldwide with a free 3-day trial.',
    metaTitleUrdu: 'آن لائن قرآن کلاسز برائے بچے اور بڑے | شاہین الزیتون اکیڈمی',
    metaDescriptionUrdu:
      'گھر بیٹھے مستند اساتذہ سے آن لائن قرآن کلاسز لیں۔ بچوں اور بڑوں کے لیے 3 دن کی مفت آزمائشی کلاسز۔',
    h1: 'Online Quran Classes for Kids & Adults',
    subheading: 'Live 1-on-1 Interactive Quran Learning from the Comfort of Your Home',
    shortIntro:
      'Shaheen Al Zaitoon Online Quran Academy provides structured, individual online Quran classes tailored for students of all ages across the United States, United Kingdom, Canada, Australia, the UAE, Pakistan, and worldwide.',
    courseOverview:
      'Our online Quran classes are designed to guide students systematically from the Arabic alphabet basics to fluent recitation with authentic Tajweed rules, memorization (Hifz), and comprehensive understanding. Every student receives a dedicated tutor who customizes each lesson to their personal learning pace, schedule, and goals.',
    whoIsThisFor: [
      'Children (ages 4+) starting their Quranic journey from the foundational alphabet.',
      'Beginners and converts looking for patient, step-by-step guidance.',
      'Adults seeking to rectify their Tajweed rules and improve recitation fluency.',
      'Sisters who prefer exclusive 1-on-1 classes with qualified female Quran teachers (Qarias).',
      'Busy professionals seeking flexible evening or weekend lesson slots in their local timezone.',
    ],
    whatYouWillLearn: [
      {
        title: 'Accurate Letter Articulation (Makharij)',
        description: 'Master the 29 Arabic letters from their exact throat, tongue, and lip points of articulation.',
      },
      {
        title: 'Core Tajweed Rules & Application',
        description: 'Learn Noon Sakinah, Meem Sakinah, Qalqalah, Ghunnah, Madd, and stopping signs (Waqf).',
      },
      {
        title: 'Fluent Quran Recitation (Nazra)',
        description: 'Read the Holy Quran smoothly with proper rhythm, correct vowels, and natural cadence.',
      },
      {
        title: 'Essential Daily Duas & Salah Practice',
        description: 'Memorize daily Sunnah supplications, Kalimahs, and complete practical method of Salah (Namaz).',
      },
    ],
    curriculum: [
      {
        moduleNumber: 'Module 1',
        moduleTitle: 'Foundational Arabic & Phonetics',
        topics: [
          'Single Arabic letter recognition & pronunciation',
          'Compound joint letter forms (Murakkabat)',
          'Short vowel movements: Fatha, Kasra, Damma (Harakat)',
          'Tanween, Sukoon, and Jazm practical exercises',
        ],
      },
      {
        moduleNumber: 'Module 2',
        moduleTitle: 'Essential Tajweed Rules & Word Formation',
        topics: [
          'Letters of Madd (prolongation rules)',
          'Shaddah (gemination) and heavy vs light letters (Tafkheem & Tarqeeq)',
          'Rules of Noon Sakinah & Tanween: Izhar, Idgham, Iqlab, Ikhfa',
          'Rules of Meem Sakinah: Ikhfa Shafawi, Idgham Shafawi, Izhar Shafawi',
        ],
      },
      {
        moduleNumber: 'Module 3',
        moduleTitle: 'Continuous Recitation of Juz Amma (30th Part)',
        topics: [
          'Word-by-word guided reading of short Surahs',
          'Rhythmic breathing and pausing signs (Rumuz al-Awqaf)',
          'Correcting common subtle recitation errors (Lahn Khafi & Lahn Jali)',
          'Memorizing Surah Al-Fatiha and the last 10 Surahs with Tajweed',
        ],
      },
      {
        moduleNumber: 'Module 4',
        moduleTitle: 'Full Quran Recitation (Nazra Completion)',
        topics: [
          'Systematic reading from Surah Al-Baqarah to Surah An-Nas',
          'Daily recitation review and continuous tutor feedback',
          'Practical tajweed examination and assessment',
          'Graduation certificate and recitation evaluation report',
        ],
      },
    ],
    howClassesWork: [
      {
        title: '1. Book a Free 3-Day Trial',
        desc: 'Submit your preferred schedule and receive class credentials with no upfront payment.',
        icon: 'Sparkles',
      },
      {
        title: '2. 1-on-1 Interactive Video Class',
        desc: 'Join via Zoom or Google Meet with screen sharing and digital Quran pointer tools.',
        icon: 'Video',
      },
      {
        title: '3. Daily Feedback & Progress Tracking',
        desc: 'Parents receive regular attendance, recitation notes, and monthly milestone reports.',
        icon: 'CheckCircle',
      },
    ],
    learningBenefits: [
      '100% individual attention with dedicated private instructor.',
      'Convenient schedule adapted to your specific timezone (US, UK, CA, AU, UAE, PK).',
      'Certified Alim / Qari and female Qaria teachers available.',
      'Bilingual instructors fluent in English, Urdu, and Arabic.',
      'Flexible makeup classes for missed sessions.',
    ],
    classFormat: {
      duration: '30 to 45 minutes per session',
      frequency: '2, 3, 4, or 5 days per week',
      platform: 'Zoom / Google Meet / Interactive Screen Share',
      language: 'English, Urdu, Arabic',
      schedule: '24/7 flexible time slots suited for global timezones',
      assessment: 'Monthly recitation evaluation and Tajweed progress tracking',
    },
    teacherInfo: {
      title: 'Certified Quran Tutors & Scholars',
      description:
        'Our faculty comprises graduates from renowned Islamic institutions including Wifaq-ul-Madaris, Jamia Ashrafia, and Al-Azhar, holding Ijazah in Tajweed and Qira’at Hafs.',
      qualifications: [
        'Ijazah in Hafs an Asim recitation',
        'Shahadat-ul-Aalamiyyah (Master in Islamic Studies)',
        'Experienced in teaching Western diaspora children & adults',
        'Rigorous background check and pedagogical training',
      ],
    },
    faqs: [
      {
        question: 'How do online Quran classes work?',
        answer:
          'Online Quran classes take place live 1-on-1 over Zoom or Google Meet. The teacher shares the digital Quran lesson on screen, listens to the student recite, and corrects pronunciation in real time with interactive markers.',
      },
      {
        question: 'Who can join online Quran classes?',
        answer:
          'Anyone can join! We cater to young children (from age 4), school students, university students, working professionals, homemakers, and senior citizens.',
      },
      {
        question: 'Are there female Quran teachers available for ladies and girls?',
        answer:
          'Yes, we have certified female Qarias and Alimahs available for sisters and young girls in complete privacy and comfortable scheduling.',
      },
      {
        question: 'Do you offer a free trial before paying fees?',
        answer:
          'Yes, we provide a complete 3-day free trial class with no credit card or advance payment required. You only continue if you are satisfied with the tutor.',
      },
    ],
    internalLinks: [
      {
        pageId: 'noorani-qaida',
        anchorText: 'Learn Noorani Qaida Online',
        description: 'Start with the fundamental Arabic phonetics and alphabet recognition course.',
      },
      {
        pageId: 'quran-reading',
        anchorText: 'Learn Quran Reading Online',
        description: 'Progress into fluent Nazra recitation of the complete Holy Quran.',
      },
      {
        pageId: 'online-tajweed-classes',
        anchorText: 'Online Quran Classes with Tajweed',
        description: 'Refine your Makharij and learn classical Tajweed rules systematically.',
      },
      {
        pageId: 'online-hifz-quran-classes',
        anchorText: 'Online Hifz Quran Classes',
        description: 'Structured memorization program with daily revision schedules.',
      },
      {
        pageId: 'quran-classes-for-kids',
        anchorText: 'Online Quran Classes for Kids',
        description: 'Child-friendly pedagogy, patience, and engaging interactive visual aids.',
      },
      {
        pageId: 'quran-classes-for-ladies',
        anchorText: 'Online Quran Classes for Ladies',
        description: 'Exclusive private classes taught by certified female Qaria instructors.',
      },
    ],
    feePKR: 19600,
    feeUSD: 70,
    featuredImage: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&w=1200&q=80',
  },

  'noorani-qaida': {
    id: 'noorani-qaida',
    urlPath: '/noorani-qaida',
    primaryKeyword: 'online Noorani Qaida classes',
    secondaryKeywords: [
      'Noorani Qaida online',
      'learn Noorani Qaida online',
      'Noorani Qaida for beginners',
      'Noorani Qaida for kids',
      'Noorani Qaida teacher online',
    ],
    metaTitle: 'Learn Noorani Qaida Online | Shaheen Al Zaitoon',
    metaDescription:
      'Master Arabic alphabet, Makharij, and basic Tajweed rules with 1-on-1 online Noorani Qaida classes for beginners and kids. Book your 3-day free trial.',
    metaTitleUrdu: 'آن لائن نورانی قاعدہ کورس | شاہین الزیتون اکیڈمی',
    metaDescriptionUrdu:
      'بچوں اور ابتدائی طلباء کے لیے نورانی قاعدہ مع درست مخارج اور تجوید۔ مفت آزمائشی کلاس میں شامل ہوں۔',
    h1: 'Learn Noorani Qaida Online',
    subheading: 'The Essential Foundation for Accurate Arabic & Quranic Reading',
    shortIntro:
      'The Noorani Qaida course is the primary building block for anyone wishing to recite the Holy Quran with correct articulation, whether young children beginning their education or adults learning Arabic phonetics for the first time.',
    courseOverview:
      'Noorani Qaida is the world-renowned classical methodology for teaching non-Arabic speakers how to recognize, pronounce, and join Arabic letters into full Quranic words. Our certified tutors teach letter by letter, focusing on exact Makharij (points of vocal emission) and fundamental Tajweed rules such as Harakat, Tanween, Sukoon, Shaddah, and Madd.',
    whoIsThisFor: [
      'Children aged 4 to 12 taking their first steps in Islamic and Quranic education.',
      'Adult beginners who have never read Arabic letters before.',
      'Students struggling with letter confusion or incorrect vocal pronunciation.',
      'Parents wanting their kids to learn authentic pronunciation from certified Qaris.',
    ],
    whatYouWillLearn: [
      {
        title: '29 Arabic Letters & Individual Sounds',
        description: 'Identify isolated letters and master their precise acoustic sounds from the vocal tract.',
      },
      {
        title: 'Compound & Joint Letter Forms (Murakkabat)',
        description: 'Understand how Arabic letters change shape at the beginning, middle, and end of words.',
      },
      {
        title: 'Short & Long Vowels (Harakat & Madd)',
        description: 'Distinguish between short vowels (Fatha, Kasra, Damma) and prolonged vowel letters (Alif, Waw, Yaa).',
      },
      {
        title: 'Tanween, Sukoon, Tashdeed & Qalqalah',
        description: 'Apply essential rhythmic symbols and vibration rules necessary for Quranic sentences.',
      },
    ],
    curriculum: [
      {
        moduleNumber: 'Lesson 1-4',
        moduleTitle: 'Letters & Compound Forms',
        topics: [
          'The 29 Individual Arabic Letters (Huroof Mufradat)',
          'Letter shapes in combined words (Huroof Murakkabat)',
          'Abbreviated letters at Surah openings (Huroof Muqattaat)',
          'Points of articulation: Throat, Tongue, Lips, Nasal cavity',
        ],
      },
      {
        moduleNumber: 'Lesson 5-9',
        moduleTitle: 'Vowels & Pronunciation Symbols',
        topics: [
          'Short Vowel Marks: Zabar (Fatha), Zer (Kasra), Pesh (Damma)',
          'Double Vowels (Tanween): Do Zabar, Do Zer, Do Pesh',
          'Standing Vowels: Khari Harakat (Khari Zabar, Khari Zer, Ulta Pesh)',
          'Soft Letters (Huroof Leen): Waw Leen and Yaa Leen',
        ],
      },
      {
        moduleNumber: 'Lesson 10-14',
        moduleTitle: 'Resting & Doubling Marks',
        topics: [
          'Sukoon / Jazm (Resting mark exercises)',
          'Qalqalah letters (Echoing mechanism for Qaf, Taa, Baa, Jeem, Daal)',
          'Tashdeed / Shaddah (Doubled letters)',
          'Silent letters and connecting rules',
        ],
      },
      {
        moduleNumber: 'Lesson 15-17',
        moduleTitle: 'Advanced Qaida & Quran Word Practice',
        topics: [
          'Rules of Madd (Prolongation for 2 to 6 counts)',
          'Noon Sakinah and Tanween recognition in words',
          'Waqf (Stopping) rules at the end of verses',
          'Comprehensive final exam before transitioning to the Holy Quran',
        ],
      },
    ],
    howClassesWork: [
      {
        title: 'Visual Interactive Screen',
        desc: 'The teacher highlights each letter in real time using colored pointers to maintain focus.',
        icon: 'Monitor',
      },
      {
        title: 'Repetition & Correction',
        desc: 'Student recites repeatedly until letter shape and sound are memorized accurately.',
        icon: 'Repeat',
      },
      {
        title: 'Gradual Milestone Progression',
        desc: 'No student is rushed; each lesson is mastered before moving forward.',
        icon: 'Check',
      },
    ],
    learningBenefits: [
      'Eliminates common reading hesitancy from the very beginning.',
      'Builds confident phonetic pronunciation for life.',
      'Child-centric, patient, and motivating teaching methodology.',
      'Seamless transition into Nazra Quran reading.',
    ],
    classFormat: {
      duration: '30 minutes per class',
      frequency: '3 to 5 days weekly',
      platform: 'Zoom / Google Meet',
      language: 'English, Urdu, Arabic',
      schedule: 'Customized based on student availability',
      assessment: 'Weekly revision tests and end-of-Qaida certification',
    },
    teacherInfo: {
      title: 'Specialist Qaida Instructors for Kids',
      description:
        'Our Qaida tutors are trained specifically in child psychology, maintaining high engagement through friendly encouragement and structured pedagogical pacing.',
      qualifications: [
        'Certified Tajweed Master',
        'Specialized child teaching pedagogy certification',
        'Fluent in English & Urdu',
      ],
    },
    faqs: [
      {
        question: 'How long does it take to complete Noorani Qaida?',
        answer:
          'On average, children complete Noorani Qaida in 3 to 5 months with regular classes (4-5 days a week). Adults can often finish faster in 2 to 3 months.',
      },
      {
        question: 'Is Noorani Qaida suitable for a complete beginner adult?',
        answer:
          'Absolutely. Noorani Qaida is the most proven method for adult learners who have zero prior Arabic knowledge.',
      },
      {
        question: 'Can parents sit with their children during the class?',
        answer:
          'Yes, parents are welcome and encouraged to observe their child’s online lessons, especially in the early stages.',
      },
    ],
    internalLinks: [
      {
        pageId: 'quran-reading',
        anchorText: 'Learn Quran Reading Online',
        description: 'Next step: apply your Qaida skills to reading the Holy Quran smoothly.',
      },
      {
        pageId: 'online-tajweed-classes',
        anchorText: 'Online Quran Classes with Tajweed',
        description: 'Advance your Tajweed rules and beautiful recitation technique.',
      },
      {
        pageId: 'quran-for-beginners',
        anchorText: 'Learn Quran Online for Beginners',
        description: 'Discover tailored programs for adults starting their learning path.',
      },
      {
        pageId: 'quran-classes-for-kids',
        anchorText: 'Online Quran Classes for Kids',
        description: 'Explore engaging online learning tailored for children.',
      },
    ],
    feePKR: 19600,
    feeUSD: 70,
    featuredImage: 'https://images.unsplash.com/photo-1584286595398-a59f21d313f5?auto=format&fit=crop&w=1200&q=80',
  },

  'quran-reading': {
    id: 'quran-reading',
    urlPath: '/quran-reading',
    primaryKeyword: 'online Quran reading classes',
    secondaryKeywords: [
      'Quran reading online',
      'Nazra Quran online',
      'learn Quran reading',
      'Quran recitation classes',
      'online Nazra Quran course',
    ],
    metaTitle: 'Learn Quran Reading Online | Shaheen Al Zaitoon',
    metaDescription:
      'Learn fluent Nazra Quran reading online with certified tutors. 1-on-1 personalized recitation classes for kids and adults. Start your 3-day free trial.',
    metaTitleUrdu: 'آن لائن ناظرہ قرآن کلاسز | شاہین الزیتون اکیڈمی',
    metaDescriptionUrdu:
      'مکمل قرآن مجید ناظرہ روانی اور تجوید کے ساتھ پڑھنا سیکھیں۔ مستند قراء کی زیرِ نگرانی 1-on-1 کلاسز۔',
    h1: 'Learn Quran Reading Online',
    subheading: 'Recite the Complete Holy Quran Fluently with Confidence and Reverence',
    shortIntro:
      'Our Nazra Quran reading course empowers students to recite the entire 30 Juz of the Holy Quran accurately, smoothly, and with proper rhythm under the direct supervision of certified Qaris.',
    courseOverview:
      'Once a student recognizes Arabic letters and basic vowel combinations, the Nazra Quran Reading course transitions them into reading verses and continuous Surahs directly from the Mushaf. Through systematic daily reading, Qaris correct hesitations, train proper breathing cadence, and reinforce Tajweed rules until reading becomes natural and effortless.',
    whoIsThisFor: [
      'Students who have completed Noorani Qaida and want to begin reading the Mushaf.',
      'Adults who can read slowly but want to achieve fluency and speed without errors.',
      'Anyone who wishes to complete a full recitation (Khatam) of the Holy Quran with a teacher.',
    ],
    whatYouWillLearn: [
      {
        title: 'Fluent Continuous Reading',
        description: 'Transition from syllable spelling to smooth, uninterrupted reading of long Quranic verses.',
      },
      {
        title: 'Observance of Quranic Stops (Waqf)',
        description: 'Understand stop signs (Meem, Laa, Jeem, Taa, Qaf) to avoid altering Quranic meanings.',
      },
      {
        title: 'Tone, Cadence & Tarteel',
        description: 'Apply the Sunnah principle of reciting clearly and calmly as commanded in Surah Al-Muzzammil.',
      },
      {
        title: 'Full Quran Khatam Completion',
        description: 'Systematically recite all 114 Surahs from Surah Al-Fatiha to Surah An-Nas.',
      },
    ],
    curriculum: [
      {
        moduleNumber: 'Stage 1',
        moduleTitle: 'Juz 30 (Juz Amma) Recitation Mastery',
        topics: [
          'Detailed reading of short Surahs with individual verse feedback',
          'Reinforcing Makharij on familiar chapters (Surah Ikhlas, Falaq, Nas)',
          'Breath control and basic pauses',
        ],
      },
      {
        moduleNumber: 'Stage 2',
        moduleTitle: 'Juz 1 to 10 (Foundational Long Surahs)',
        topics: [
          'Reciting Surah Al-Baqarah, Al-Imran, An-Nisa, Al-Ma’idah',
          'Managing long complex sentences and compound words',
          'Practical application of Ghunnah, Ikhfa, and Idgham',
        ],
      },
      {
        moduleNumber: 'Stage 3',
        moduleTitle: 'Juz 11 to 20 (Intermediate Fluency Building)',
        topics: [
          'Accelerating reading speed while maintaining full phonetic clarity',
          'Identifying Sajdah Tilawat verses and Sunnah practices',
          'Refining recitation tone with natural melody',
        ],
      },
      {
        moduleNumber: 'Stage 4',
        moduleTitle: 'Juz 21 to 29 & Final Khatam',
        topics: [
          'Final chapters recitation and revision of difficult verses',
          'Complete Khatam-ul-Quran celebration and Du’a Khatam',
          'Issuing official Academy Nazra Completion Certificate',
        ],
      },
    ],
    howClassesWork: [
      {
        title: 'Daily Sabaq (New Verse)',
        desc: 'Student recites new assigned verses while tutor listens attentively and corrects in real time.',
        icon: 'BookOpen',
      },
      {
        title: 'Revision of Previous Pages',
        desc: 'Teacher reviews previous lessons to ensure retention and progressive fluency.',
        icon: 'RotateCcw',
      },
      {
        title: 'Personalized Speed Adjustments',
        desc: 'Lessons move at whatever pace ensures 100% accuracy for the student.',
        icon: 'Gauge',
      },
    ],
    learningBenefits: [
      'Develops lifelong love and attachment to the words of Allah.',
      'Removes hesitation and stuttering during public and personal recitation.',
      'Prepares students for advanced Tajweed or Hifz memorization.',
      'Flexible class timings accommodating international school and work schedules.',
    ],
    classFormat: {
      duration: '30 to 45 minutes',
      frequency: '3 to 5 days weekly',
      platform: 'Zoom / Google Meet',
      language: 'English, Urdu, Arabic',
      schedule: 'Available 24 hours a day across global time zones',
      assessment: 'Weekly page tracking and quarterly milestone assessments',
    },
    teacherInfo: {
      title: 'Experienced Nazra Quran Instructors',
      description:
        'Our teachers have guided thousands of students through complete Quran readings with immense patience, high attentiveness, and gentle corrections.',
      qualifications: ['Certified Qari', 'Over 5+ years online teaching experience', 'Bilingual proficiency'],
    },
    faqs: [
      {
        question: 'What is Nazra Quran reading?',
        answer:
          'Nazra means reciting the Holy Quran directly by looking at the Arabic text (Mushaf) with correct pronunciation and Tajweed rules, without memorization.',
      },
      {
        question: 'How long does it take to complete the full Quran reading?',
        answer:
          'Typically, students complete the entire Quran in 6 to 12 months, depending on weekly class frequency (3 to 5 days) and daily home practice.',
      },
      {
        question: 'Can I choose my preferred Quran script (Indo-Pak or Uthmani)?',
        answer:
          'Yes! We accommodate both the 13/16-line Indo-Pak script (popular in Pakistan/India) and the 15-line Uthmani/Madani script (popular in the Middle East and the West).',
      },
    ],
    internalLinks: [
      {
        pageId: 'noorani-qaida',
        anchorText: 'Learn Noorani Qaida Online',
        description: 'Brush up on basic Arabic letters and foundational phonetic rules.',
      },
      {
        pageId: 'online-tajweed-classes',
        anchorText: 'Online Quran Classes with Tajweed',
        description: 'Refine your recitation with scientific Tajweed rules and Ijazah standards.',
      },
      {
        pageId: 'online-hifz-quran-classes',
        anchorText: 'Online Hifz Quran Classes',
        description: 'Take your reading fluency to the ultimate level of Quran memorization.',
      },
      {
        pageId: 'quran-classes-for-kids',
        anchorText: 'Online Quran Classes for Kids',
        description: 'See how we make daily Quran reading joyful and consistent for children.',
      },
    ],
    feePKR: 22400,
    feeUSD: 80,
    featuredImage: 'https://images.unsplash.com/photo-1542816417-0983cbe33577?auto=format&fit=crop&w=1200&q=80',
  },

  'online-tajweed-classes': {
    id: 'online-tajweed-classes',
    urlPath: '/online-tajweed-classes',
    primaryKeyword: 'online Quran classes with Tajweed',
    secondaryKeywords: [
      'online Tajweed classes',
      'learn Quran with Tajweed',
      'Tajweed Quran course',
      'Quran Tajweed teacher',
      'Tajweed classes for beginners',
      'advanced Tajweed rules',
    ],
    metaTitle: 'Online Tajweed & Quran Classes | Shaheen Al Zaitoon',
    metaDescription:
      'Master Makharij, Sifaat, and Tajweed rules with certified Qaris. 1-on-1 interactive online Tajweed classes for beginners and advanced students. Free 3-day trial.',
    metaTitleUrdu: 'آن لائن تجوید و قرآن کلاسز | شاہین الزیتون اکیڈمی',
    metaDescriptionUrdu:
      'مستند قراء سے تجوید کے قواعد، مخارج اور صفات کی مکمل تربیت لیں۔ مفت 3 روزہ ٹرائل کلاس۔',
    h1: 'Online Quran Classes with Tajweed',
    subheading: 'Perfect Your Recitation According to the Rules of Prophet Muhammad (PBUH)',
    shortIntro:
      'Tajweed is the art and science of reciting the Holy Quran as it was revealed to Prophet Muhammad (PBUH). Our structured online Tajweed classes train students in the precise articulation of letters, phonetic rules, and melodious delivery.',
    courseOverview:
      'Reciting the Quran with Tajweed is an obligation upon every Muslim to protect the divine words from distortion. Our course combines classical treatises (such as Al-Jazariyyah and Tuhfat al-Atfal) with practical, vocal coaching from certified Qaris holding traditional Ijazah. Students learn the theoretical rules and practice them verse by verse until their recitation is pristine.',
    whoIsThisFor: [
      'Anyone who can read the Quran but wants to eliminate pronunciation errors.',
      'Students wanting to learn the theoretical and practical rules of Tajweed.',
      'Qaris, Imams, and Islamic educators seeking structured certification.',
      'Sisters wanting private female Qaria instruction in Tajweed.',
    ],
    whatYouWillLearn: [
      {
        title: 'Makharij-ul-Huroof (Points of Articulation)',
        description: 'Deep anatomical understanding of the 17 throat, oral, nasal, and lip articulation points.',
      },
      {
        title: 'Sifaat-ul-Huroof (Letter Characteristics)',
        description: 'Master intrinsic characteristics: Hams, Jahr, Shiddah, Rakhawah, Isti’la, Istifal, and Qalqalah.',
      },
      {
        title: 'Rules of Noon & Meem Sakinah',
        description: 'Izhar, Idgham (with and without Ghunnah), Iqlab, and Ikhfa applied seamlessly.',
      },
      {
        title: 'Rules of Madd (Prolongation)',
        description: 'Distinguish between Madd Asli, Madd Muttasil, Munfasil, Lazim, and Aridh li-Sukoon.',
      },
    ],
    curriculum: [
      {
        moduleNumber: 'Part 1',
        moduleTitle: 'Makharij & Phonetic Precision',
        topics: [
          'Throat letters (Halqiyyah) - Hamza, Haa, Ayn, Haa, Ghayn, Khaa',
          'Tongue letters (Lisaniyyah) - Qaf, Kaf, Jeem, Sheen, Yaa, Dhad, Lam, Noon, Raa, Taa, Daal, Taa, Zay, Seen, Saad, Dhal, Thaa, Zhaa',
          'Lip letters (Shafawiyyah) - Faa, Baa, Meem, Waw',
          'Nasal & Empty space (Khayshoom & Jawf)',
        ],
      },
      {
        moduleNumber: 'Part 2',
        moduleTitle: 'Sifaat (Attributes of Letters)',
        topics: [
          'Opposing attributes: Whispering vs Vocalization (Hams vs Jahr)',
          'Strength vs Softness (Shiddah, Bayniyyah, Rakhawah)',
          'Elevation vs Lowering (Isti’la vs Istifal - Heavy vs Light letters)',
          'Non-opposing attributes: Qalqalah, Safeer, Leen, Inhiraf, Takreer, Tafash-shee, Istitalah',
        ],
      },
      {
        moduleNumber: 'Part 3',
        moduleTitle: 'Noon Sakinah, Meem Sakinah & Lam Rules',
        topics: [
          'Izhar Halqi, Idgham Bighunnah, Idgham Bilaghunnah, Iqlab, Ikhfa Haqiqi',
          'Meem Sakinah: Ikhfa Shafawi, Idgham Mutamathilayn, Izhar Shafawi',
          'Rules of the word “Allah” (Lam Jalalah) - Heavy vs Light pronunciation',
          'Rules of letter Raa (Tafkheem and Tarqeeq conditions)',
        ],
      },
      {
        moduleNumber: 'Part 4',
        moduleTitle: 'Rules of Madd, Waqf & Practical Ijazah Exam',
        topics: [
          'Madd Tabee’i (Natural 2 counts)',
          'Madd Wajib Muttasil & Madd Ja’iz Munfasil (4-5 counts)',
          'Madd Lazim (Compulsory 6 counts) in words and letters',
          'Waqf, Ibtida, and stopping on the end of words (Rawm & Ishmam)',
          'Comprehensive practical recitation test and Tajweed Certification',
        ],
      },
    ],
    howClassesWork: [
      {
        title: 'Anatomical Diagrams',
        desc: 'Visual charts illustrating tongue placement and vocal cord engagement.',
        icon: 'Layers',
      },
      {
        title: 'Listen & Repeat (Talaqqi)',
        desc: 'Traditional oral transmission method: Teacher recites, student imitates, tutor fine-tunes.',
        icon: 'Headphones',
      },
      {
        title: 'Audio Recording Reviews',
        desc: 'Submit voice notes of your practice for teacher feedback between classes.',
        icon: 'Mic',
      },
    ],
    learningBenefits: [
      'Eliminates both major errors (Lahn Jali) and minor subtle errors (Lahn Khafi).',
      'Transforms your recitation into a spiritual, melodious experience.',
      'Earn an authentic Tajweed certificate from Shaheen Al Zaitoon Academy.',
      'Flexible scheduling with 1-on-1 private attention.',
    ],
    classFormat: {
      duration: '30 to 45 minutes',
      frequency: '2 to 4 days weekly',
      platform: 'Zoom / Google Meet with HD audio',
      language: 'English, Urdu, Arabic',
      schedule: 'Morning, evening, and weekend time slots worldwide',
      assessment: 'Oral examination and rule explanation tests',
    },
    teacherInfo: {
      title: 'Certified Qaris with Traditional Ijazah',
      description:
        'Our Tajweed faculty hold authentic chains of transmission (Sanad) tracing back to the Prophet (PBUH) through Imam Asim and Hafs.',
      qualifications: [
        'Holder of Ijazah in Tajweed Al-Quran',
        'Expert in Qira’at rules and classical Tajweed texts',
        'Proven track record in voice training & recitation aesthetics',
      ],
    },
    faqs: [
      {
        question: 'What is the difference between simple Nazra reading and Tajweed?',
        answer:
          'Nazra is basic visual reading of the words, whereas Tajweed is the rigorous science of giving every single letter its exact physical right in articulation and vocal characteristics.',
      },
      {
        question: 'Can beginners take Tajweed classes?',
        answer:
          'Yes! We offer Beginner Tajweed (starting from simple Makharij) and Advanced Tajweed (covering Sifaat, complex Madd, and classical poetry treatises).',
      },
      {
        question: 'Do you provide Tajweed certificates upon completion?',
        answer:
          'Yes, students who successfully complete the theoretical and practical evaluations receive a verified Academy Tajweed Certificate with a QR code.',
      },
    ],
    internalLinks: [
      {
        pageId: 'quran-reading',
        anchorText: 'Learn Quran Reading Online',
        description: 'Read the full Holy Quran while applying your Tajweed rules.',
      },
      {
        pageId: 'online-hifz-quran-classes',
        anchorText: 'Online Hifz Quran Classes',
        description: 'Combine Tajweed mastery with lifelong Quran memorization.',
      },
      {
        pageId: 'quran-for-beginners',
        anchorText: 'Learn Quran Online for Beginners',
        description: 'Step-by-step beginner guide to building confidence with Tajweed.',
      },
      {
        pageId: 'quran-classes-for-ladies',
        anchorText: 'Online Quran Classes for Ladies',
        description: 'Private 1-on-1 Tajweed classes with female Qarias.',
      },
    ],
    feePKR: 22400,
    feeUSD: 80,
    featuredImage: 'https://images.unsplash.com/photo-1585036156171-384164a8c675?auto=format&fit=crop&w=1200&q=80',
  },

  'online-hifz-quran-classes': {
    id: 'online-hifz-quran-classes',
    urlPath: '/online-hifz-quran-classes',
    primaryKeyword: 'online Hifz Quran classes',
    secondaryKeywords: [
      'Hifz Quran online',
      'Quran memorization classes',
      'online Quran memorization',
      'Hifz classes for kids',
      'Quran memorization course',
      'Hifz revision program',
    ],
    metaTitle: 'Online Hifz Quran & Memorization Classes | Shaheen Al Zaitoon',
    metaDescription:
      'Structured 1-on-1 online Hifz Quran program for kids and adults. Systematic daily Sabaq, Sabaqi, and Manzil revision guided by certified Huffaz. Free trial.',
    metaTitleUrdu: 'آن لائن حفظ القرآن کورس | شاہین الزیتون اکیڈمی',
    metaDescriptionUrdu:
      'مستند حفاظ کرام کی زیرِ نگرانی روزانہ سبق، سبقی اور منزل کا باقاعدہ نظام۔ آن لائن حفظ قرآن مکمل کریں۔',
    h1: 'Online Hifz Quran Classes',
    subheading: 'Preserve the Holy Quran in Your Heart Through Systematic Daily Memorization',
    shortIntro:
      'Becoming a Hafiz of the Holy Quran is one of the highest spiritual honors in Islam. Our structured online Hifz program guides students step-by-step with proven memorization and retention techniques.',
    courseOverview:
      'Memorizing the Quran requires discipline, dedicated technique, and an experienced Hafiz teacher. Our online Hifz program follows the proven classical 3-tier method: Sabaq (Daily New Lesson), Sabaqi (Recent Memorization), and Manzil (Long-Term Permanent Revision). We ensure that every Ayah memorized remains firmly rooted in the student’s memory for life.',
    whoIsThisFor: [
      'Children and youth dedicated to full or partial Quran memorization.',
      'Adults who wish to memorize selected Surahs (e.g., Surah Baqarah, Yaseen, Kahf, Mulk, Rahman).',
      'Huffaz looking for a structured daily Manzil revision program (Dhor) to reinforce weak retention.',
    ],
    whatYouWillLearn: [
      {
        title: 'Sabaq (Daily New Memorization)',
        description: 'Memorize lines or pages daily according to your personal retention capacity.',
      },
      {
        title: 'Sabaqi (Recent Juz Revision)',
        description: 'Recite the last 1 to 2 Juz daily to solidify new lessons before they fade.',
      },
      {
        title: 'Manzil (Comprehensive Old Revision)',
        description: 'Systematic rotation through all previously memorized parts on a scheduled cycle.',
      },
      {
        title: 'Mutashabihat (Similar Verses Mastery)',
        description: 'Identify and master overlapping verses across different Surahs to prevent confusion.',
      },
    ],
    curriculum: [
      {
        moduleNumber: 'Phase 1',
        moduleTitle: 'Foundation & Short Surahs (Juz 30 & 29)',
        topics: [
          'Memorizing Juz Amma with 100% Tajweed precision',
          'Memorizing Juz Tabarak (Surah Al-Mulk to Surah Al-Mursalat)',
          'Developing personal memory pacing and focus habits',
        ],
      },
      {
        moduleNumber: 'Phase 2',
        moduleTitle: 'Core Selected Surahs & Fast Retention',
        topics: [
          'Memorizing Surah Al-Baqarah and Surah Al-Imran',
          'Memorizing popular protective Surahs: Yaseen, Al-Kahf, Ar-Rahman, Al-Waqi’ah',
          'Daily Sabaqi review protocols',
        ],
      },
      {
        moduleNumber: 'Phase 3',
        moduleTitle: 'Full Quran Systematic Memorization',
        topics: [
          'Progressive completion of all 30 Juz',
          'Resolving Mutashabihat (similar wording across Quran)',
          'Daily 1 Juz Manzil examination with the tutor',
        ],
      },
      {
        moduleNumber: 'Phase 4',
        moduleTitle: 'Final Revision, Sanad & Hifz Completion',
        topics: [
          '3 full complete Khatams in consecutive sittings',
          'Final oral Hifz examination before senior scholarly committee',
          'Awarding official Hifz Certificate and Sanad',
        ],
      },
    ],
    howClassesWork: [
      {
        title: '1. Recite Yesterday’s Sabaq',
        desc: 'Student recites newly learned verses with zero mistakes.',
        icon: 'Check',
      },
      {
        title: '2. Recite Sabaqi & Manzil',
        desc: 'Student reviews older memorized portions to ensure permanent retention.',
        icon: 'RotateCw',
      },
      {
        title: '3. Receive Today’s New Lesson',
        desc: 'Teacher recites new Ayahs with the student to verify Tajweed before memorization begins.',
        icon: 'FilePlus',
      },
    ],
    learningBenefits: [
      'Proven classical methodology preventing memory loss.',
      'Individual 1-on-1 pacing tailored to each student’s memory speed.',
      'Weekly progress logs and parent dashboards for children.',
      'Available full-time (intensive) or part-time (evening/weekend).',
    ],
    classFormat: {
      duration: '45 to 60 minutes per session',
      frequency: '4 to 6 days weekly',
      platform: 'Zoom / Google Meet 1-on-1',
      language: 'English, Urdu, Arabic',
      schedule: 'Morning (Fajr time) or flexible evening slots',
      assessment: 'Daily grading of Sabaq, Sabaqi, and weekly Manzil tests',
    },
    teacherInfo: {
      title: 'Certified Huffaz & Sanad Holders',
      description:
        'Our Hifz instructors are dedicated Huffaz who have completed their own memorization with excellence and have guided hundreds of students to complete the Holy Quran.',
      qualifications: [
        'Hafiz-ul-Quran with authentic Sanad',
        'Expert in memory retention & Mutashabihat',
        'Over 7+ years guiding online Hifz students',
      ],
    },
    faqs: [
      {
        question: 'How long does it take to memorize the entire Quran online?',
        answer:
          'On average, dedicated full-time students complete Hifz in 2 to 3 years. Part-time students or adults memorizing selected chapters progress at their own comfortable pace.',
      },
      {
        question: 'Is online Hifz effective for young children?',
        answer:
          'Yes! Online 1-on-1 Hifz is often more effective than crowded traditional classrooms because the teacher focuses exclusively on your child for the entire duration without distractions.',
      },
      {
        question: 'Do you offer a partial Hifz program for busy adults?',
        answer:
          'Yes, we offer partial Hifz programs where adults can memorize Juz 30, Surah Al-Baqarah, Surah Kahf, Surah Yaseen, or custom selected portions.',
      },
    ],
    internalLinks: [
      {
        pageId: 'online-tajweed-classes',
        anchorText: 'Online Quran Classes with Tajweed',
        description: 'Ensure accurate pronunciation before and during your memorization.',
      },
      {
        pageId: 'quran-reading',
        anchorText: 'Learn Quran Reading Online',
        description: 'Build high-speed reading fluency to accelerate your Hifz pace.',
      },
      {
        pageId: 'quran-classes-for-kids',
        anchorText: 'Online Quran Classes for Kids',
        description: 'See our child-friendly Hifz foundation programs.',
      },
    ],
    feePKR: 26600,
    feeUSD: 95,
    featuredImage: 'https://images.unsplash.com/photo-1542816417-0983cbe33577?auto=format&fit=crop&w=1200&q=80',
  },

  'quran-translation': {
    id: 'quran-translation',
    urlPath: '/quran-translation',
    primaryKeyword: 'online Quran translation classes',
    secondaryKeywords: [
      'Quran translation course',
      'learn Quran translation online',
      'Quran meaning online',
      'Quran translation lessons',
      'word by word Quran translation',
    ],
    metaTitle: 'Learn Quran Translation Online | Shaheen Al Zaitoon',
    metaDescription:
      'Understand the words of Allah with word-by-word and contextual Quran translation classes online. 1-on-1 personalized lessons in English and Urdu. Free trial.',
    metaTitleUrdu: 'آن لائن فہم و ترجمہ قرآن کلاسز | شاہین الزیتون اکیڈمی',
    metaDescriptionUrdu:
      'قرآن مجید کا لفظی و با محاورہ ترجمہ سیکھیں اور اللہ کے کلام کو گہرائی سے سمجھیں۔ 3 روزہ مفت ٹرائل۔',
    h1: 'Learn Quran Translation Online',
    subheading: 'Understand the Divine Message Word-by-Word with Clarity and Depth',
    shortIntro:
      'Reciting the Holy Quran earns tremendous reward, but understanding its meaning transforms the heart and illuminates daily life. Our online Quran translation course teaches word-by-word and idiomatic translation in English and Urdu.',
    courseOverview:
      'Designed for both beginners and experienced reciters, this course breaks down the Quranic vocabulary into root words, repetitive grammatical patterns, and sentence structures. By learning the most frequently occurring Quranic vocabulary, students quickly begin understanding verses directly during Salah and personal recitation.',
    whoIsThisFor: [
      'Muslims who recite the Quran regularly and desire to understand what they read.',
      'Youth and adults in English-speaking countries wanting clear, authentic explanations.',
      'Anyone striving to experience deeper Khushu (focus) in daily Salah.',
    ],
    whatYouWillLearn: [
      {
        title: 'Word-by-Word Translation (Lafzi Tarjuma)',
        description: 'Understand the literal dictionary meaning of individual Arabic words.',
      },
      {
        title: 'Idiomatic Translation (Ba Muhawara Tarjuma)',
        description: 'Grasp the complete coherent meaning of sentences in fluent English or Urdu.',
      },
      {
        title: 'Core Quranic Vocabulary',
        description: 'Master the top 500 words that make up over 80% of the entire Quranic text.',
      },
      {
        title: 'Basic Quranic Grammar in Context',
        description: 'Identify past/present verbs, pronouns, and prepositional relationships in verses.',
      },
    ],
    curriculum: [
      {
        moduleNumber: 'Module 1',
        moduleTitle: 'Essential Vocabulary & Short Surahs',
        topics: [
          'High-frequency Quranic nouns, verbs, and particles',
          'Word-by-word translation of Surah Al-Fatiha and Juz 30',
          'Meanings of daily Azkar, Tashahhud, and Salah recitations',
        ],
      },
      {
        moduleNumber: 'Module 2',
        moduleTitle: 'Quranic Stories & Historical Context',
        topics: [
          'Translation of Surah Yusuf, Surah Maryam, and Surah Al-Kahf',
          'Root word extraction and morphological derivation',
          'Understanding commandments (Ahkam) vs narratives (Qisas)',
        ],
      },
      {
        moduleNumber: 'Module 3',
        moduleTitle: 'Major Surahs (Al-Baqarah to An-Nisa)',
        topics: [
          'Detailed translation of foundational legal and spiritual verses',
          'Ayat al-Kursi, Amanar-Rasul, and core theological foundations',
          'Direct comprehension practice without translating to English/Urdu',
        ],
      },
    ],
    howClassesWork: [
      {
        title: 'Screen Shared Interactive Text',
        desc: 'Color-coded digital texts separating Arabic roots, prefixes, and suffixes.',
        icon: 'Layout',
      },
      {
        title: 'Practical Salah Connection',
        desc: 'Immediately apply what you learn to improve concentration in daily prayer.',
        icon: 'Heart',
      },
      {
        title: 'Interactive Vocabulary Quizzes',
        desc: 'Weekly vocabulary checks to reinforce root word retention.',
        icon: 'HelpCircle',
      },
    ],
    learningBenefits: [
      'Experience deep spiritual emotion during Ramadan Taraweeh and daily Salah.',
      'Bridge the gap between reading Arabic sounds and internalizing divine guidance.',
      'Taught by qualified Islamic scholars with authentic references.',
    ],
    classFormat: {
      duration: '40 minutes',
      frequency: '2 to 4 days weekly',
      platform: 'Zoom / Google Meet',
      language: 'English, Urdu, Arabic',
      schedule: 'Flexible timing suited for adults & professionals',
      assessment: 'Monthly vocabulary and translation comprehension assessments',
    },
    teacherInfo: {
      title: 'Scholars of Quranic Linguistics',
      description:
        'Our translation teachers are graduate Alims with deep mastery in Arabic lexicology, Balaghah (rhetoric), and classical commentaries.',
      qualifications: ['Shahadat-ul-Aalamiyyah', 'Fluent bilingual communicator (English/Urdu)', '5+ years experience'],
    },
    faqs: [
      {
        question: 'Do I need to know advanced Arabic before joining this course?',
        answer:
          'No prior Arabic knowledge is required! The course is designed to build your vocabulary gradually from the very first lesson.',
      },
      {
        question: 'Is translation taught in English or Urdu?',
        answer:
          'We offer both streams! You can choose classes taught in pure English, Urdu, or a bilingual mix based on your preference.',
      },
    ],
    internalLinks: [
      {
        pageId: 'quran-tafseer',
        anchorText: 'Online Quran Tafseer Classes',
        description: 'Explore the deep wisdom, historical context, and theological exegesis.',
      },
      {
        pageId: 'quranic-arabic',
        anchorText: 'Online Quranic Arabic Classes',
        description: 'Learn Arabic grammar (Nahw & Sarf) to comprehend Quran directly.',
      },
      {
        pageId: 'online-tajweed-classes',
        anchorText: 'Online Quran Classes with Tajweed',
        description: 'Pair your understanding with pristine Quranic recitation rules.',
      },
    ],
    feePKR: 23800,
    feeUSD: 85,
    featuredImage: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=1200&q=80',
  },

  'quran-tafseer': {
    id: 'quran-tafseer',
    urlPath: '/quran-tafseer',
    primaryKeyword: 'online Quran Tafseer classes',
    secondaryKeywords: [
      'Tafseer Quran online',
      'learn Quran Tafseer',
      'Quran explanation classes',
      'Tafseer course online',
      'Islamic Tafseer program',
    ],
    metaTitle: 'Online Quran Tafseer Classes | Shaheen Al Zaitoon',
    metaDescription:
      'Deepen your connection with Allah through online Quran Tafseer classes. Learn historical contexts, Asbab an-Nuzul, and practical wisdom. Book a free trial.',
    metaTitleUrdu: 'آن لائن تفسیر قرآن کورس | شاہین الزیتون اکیڈمی',
    metaDescriptionUrdu:
      'مستند علماء کرام سے قرآن پاک کی مفصل تفسیر، اسباب النزول اور عملی رہنمائی حاصل کریں۔',
    h1: 'Online Quran Tafseer Classes',
    subheading: 'Uncover the Wisdom, Historical Context & Spiritual Realities of the Holy Quran',
    shortIntro:
      'Tafseer is the scholarly exegesis and deep explanation of the Holy Quran. Our online Tafseer classes connect modern Muslims with the timeless guidance of Allah based on authentic classical commentaries.',
    courseOverview:
      'While translation gives the literal meaning, Tafseer unveils why verses were revealed (Asbab an-Nuzul), how the Prophet (PBUH) and his Companions understood them, and how their principles apply to contemporary life challenges. Guided by certified Islamic scholars, this course draws from classical sources such as Tafseer Ibn Katheer, Tafseer al-Tabari, Tafseer al-Qurtubi, and Ma’ariful Quran.',
    whoIsThisFor: [
      'Adults, university students, and professionals seeking intellectual and spiritual depth.',
      'Parents wanting to raise their families with authentic Islamic values rooted in Quranic wisdom.',
      'Sisters and brothers seeking answers to modern ethical questions from a Quranic perspective.',
    ],
    whatYouWillLearn: [
      {
        title: 'Asbab an-Nuzul (Reasons for Revelation)',
        description: 'Understand the historical events and specific circumstances under which verses were revealed.',
      },
      {
        title: 'Classical & Contemporary Tafseer Sources',
        description: 'Study interpretations from Ibn Katheer, Jalalayn, Saadi, and Mufti Muhammad Shafi.',
      },
      {
        title: 'Practical Contemporary Application',
        description: 'Derive solutions for family life, ethics, financial dealings, and personal character.',
      },
      {
        title: 'Seerah & Quranic Interconnections',
        description: 'Discover how the Quran chronicled the major battles, migrations, and milestones of the Prophet (PBUH).',
      },
    ],
    curriculum: [
      {
        moduleNumber: 'Semester 1',
        moduleTitle: 'Theology, Faith & Short Surahs (Juz Amma)',
        topics: [
          'Tafseer of Surah Al-Fatiha: The Mother of the Book',
          'Tafseer of Juz 30: The Afterlife, Day of Judgment, and Divine Oneness (Tawheed)',
          'The miracles of the Quran and protection from modern doubts',
        ],
      },
      {
        moduleNumber: 'Semester 2',
        moduleTitle: 'Surahs of Guidance & Protection',
        topics: [
          'Tafseer of Surah Al-Kahf: The 4 trials (Faith, Wealth, Knowledge, Power)',
          'Tafseer of Surah Yaseen: The Heart of the Quran',
          'Tafseer of Surah Al-Mulk: Deliverance from the punishment of the grave',
        ],
      },
      {
        moduleNumber: 'Semester 3',
        moduleTitle: 'Social Ethics & Islamic Society',
        topics: [
          'Tafseer of Surah Al-Hujurat: Manners of Muslim society, avoiding slander, unity of humanity',
          'Tafseer of Surah An-Nur & Surah Al-Ahzab: Modesty, family laws, and social conduct',
          'Tafseer of selected passages of Surah Al-Baqarah',
        ],
      },
    ],
    howClassesWork: [
      {
        title: 'Interactive Discourse',
        desc: 'Engage in thoughtful discussions and ask real-world questions with the scholar.',
        icon: 'MessageSquare',
      },
      {
        title: 'Comprehensive Reference Notes',
        desc: 'Receive digital summary notes and classical commentary references after each class.',
        icon: 'FileText',
      },
      {
        title: 'Focus on Practical Action',
        desc: 'Every session concludes with actionable moral lessons to implement immediately.',
        icon: 'CheckCircle',
      },
    ],
    learningBenefits: [
      'Transforms intellectual curiosity into sincere, unshakable faith.',
      'Equips students with solid Islamic reasoning to navigate contemporary cultural challenges.',
      '1-on-1 personalized discussions and flexible scheduling.',
    ],
    classFormat: {
      duration: '45 to 60 minutes',
      frequency: '2 to 3 days weekly',
      platform: 'Zoom / Google Meet',
      language: 'English, Urdu, Arabic',
      schedule: 'Evening and weekend options across international timezones',
      assessment: 'Reflective assignments and semester evaluations',
    },
    teacherInfo: {
      title: 'Renowned Scholars & Researchers',
      description:
        'Our Tafseer faculty comprises senior Alims holding Darse Nizami / Shahadat-ul-Aalamiyyah with deep research specializations in Quranic sciences.',
      qualifications: ['Master in Islamic Sciences / Tafseer', 'Published authors and speakers', '10+ years teaching experience'],
    },
    faqs: [
      {
        question: 'Which Tafseer books are followed in the course?',
        answer:
          'We follow recognized mainstream classical commentaries, primarily Tafseer Ibn Katheer, Tafseer al-Jalalayn, Tafseer as-Saadi, and Ma’ariful Quran.',
      },
      {
        question: 'Can I study Tafseer of specific Surahs only?',
        answer:
          'Yes! We offer customized module tracks such as "Tafseer of Surah Al-Kahf", "Tafseer of Juz Amma", or "Tafseer of Surah Al-Baqarah".',
      },
    ],
    internalLinks: [
      {
        pageId: 'quran-translation',
        anchorText: 'Learn Quran Translation Online',
        description: 'Study word-by-word meanings alongside comprehensive Tafseer.',
      },
      {
        pageId: 'quranic-arabic',
        anchorText: 'Online Quranic Arabic Classes',
        description: 'Explore linguistic and grammatical nuances of the Quran.',
      },
      {
        pageId: 'online-islamic-studies',
        anchorText: 'Online Islamic Studies Classes',
        description: 'Broaden your understanding of Fiqh, Hadith, and Islamic history.',
      },
    ],
    feePKR: 23800,
    feeUSD: 85,
    featuredImage: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80',
  },

  'quran-classes-for-kids': {
    id: 'quran-classes-for-kids',
    urlPath: '/quran-classes-for-kids',
    primaryKeyword: 'online Quran classes for kids',
    secondaryKeywords: [
      'Quran classes for kids',
      'learn Quran online for kids',
      'Quran teacher for kids',
      'kids Quran course',
      'Tajweed classes for kids',
      'online Quran for children',
    ],
    metaTitle: 'Online Quran Classes for Kids | Shaheen Al Zaitoon',
    metaDescription:
      'Engaging, child-friendly 1-on-1 online Quran classes for kids with patient certified tutors. Interactive lessons, Tajweed, and daily Duas. Start free 3-day trial.',
    metaTitleUrdu: 'بچوں کے لیے آن لائن قرآن کلاسز | شاہین الزیتون اکیڈمی',
    metaDescriptionUrdu:
      'بچوں کے لیے دلچسپ اور دوستانہ ماحول میں نورانی قاعدہ، ناظرہ اور اسلامی اخلاقیات۔ 3 روزہ مفت آزمائش۔',
    h1: 'Online Quran Classes for Kids',
    subheading: 'Nurturing Young Hearts with the Love, Light & Recitation of the Holy Quran',
    shortIntro:
      'Teaching children the Holy Quran requires gentleness, patience, and engaging pedagogical methods. Our online Quran classes for kids make learning fun, interactive, and spiritually enriching for children of all ages.',
    courseOverview:
      'Designed especially for children living in Western countries (USA, UK, Canada, Australia, UAE, Europe) and Pakistan, our kids program starts from Noorani Qaida and progresses systematically to fluent Nazra, basic Tajweed rules, memorization of short Surahs, and daily Islamic etiquette. Our tutors use digital whiteboard tools, colorful letter markers, and joyful reward milestones to keep young learners motivated.',
    whoIsThisFor: [
      'Boys and girls aged 4 to 15 taking their first steps in Quran learning.',
      'Children who easily lose focus in crowded physical mosques or madrasas.',
      'Muslim families in the West seeking qualified, English-speaking Islamic tutors.',
      'Parents wanting weekly progress reports and direct WhatsApp updates.',
    ],
    whatYouWillLearn: [
      {
        title: 'Alphabet Mastery & Makharij',
        description: 'Learn Arabic letters with cheerful phonetic associations and visual games.',
      },
      {
        title: 'Fluent Quran Recitation with Tajweed',
        description: 'Read continuous verses with correct vowel length, pauses, and clear pronunciation.',
      },
      {
        title: 'Daily Masnoon Duas & Kalimahs',
        description: 'Memorize essential prayers for eating, sleeping, waking, entering home, and before study.',
      },
      {
        title: 'Practical Wudu & Salah Method',
        description: 'Step-by-step instruction on ablution, prayer positions, and reciting Salah with understanding.',
      },
    ],
    curriculum: [
      {
        moduleNumber: 'Level 1 (Ages 4-7)',
        moduleTitle: 'Little Explorers: Qaida & Phonetics',
        topics: [
          'Interactive letter recognition with color flashcards',
          'Simple 2-letter and 3-letter word blending',
          'Memorizing 1st & 2nd Kalimah with simple English meanings',
          'Stories of Prophet Adam (AS) and Prophet Nuh (AS)',
        ],
      },
      {
        moduleNumber: 'Level 2 (Ages 7-11)',
        moduleTitle: 'Junior Reciter: Juz Amma & Basic Tajweed',
        topics: [
          'Reading from the Mushaf with Tajweed highlights',
          'Memorizing the last 10 Surahs with perfect pronunciation',
          'Learning Wudu & complete Salah practical recitation',
          'Essential Islamic manners (Adab): Respecting parents, honesty, kindness',
        ],
      },
      {
        moduleNumber: 'Level 3 (Ages 11-15)',
        moduleTitle: 'Young Scholar: Full Quran Nazra & Character',
        topics: [
          'Completing full Quran reading (Nazra Khatam)',
          'Advanced Tajweed rules (Ghunnah, Ikhfa, Qalqalah, Madd)',
          'Understanding core Islamic beliefs (Aqeedah & Pillars of Islam)',
          'Graduation award and achievement badge',
        ],
      },
    ],
    howClassesWork: [
      {
        title: 'Child-Safe 1-on-1 Environment',
        desc: 'Private, secure video lessons where parents can supervise anytime.',
        icon: 'Shield',
      },
      {
        title: 'Gamified Milestone Badges',
        desc: 'Children receive digital certificates and verbal praise for completing lessons.',
        icon: 'Award',
      },
      {
        title: 'Short 30-Min Focused Slots',
        desc: 'Calibrated duration matched to the natural attention span of young children.',
        icon: 'Clock',
      },
    ],
    learningBenefits: [
      'Develops positive, loving memories associated with the Holy Quran.',
      'Taught by highly patient teachers trained in child empathy.',
      'Convenient schedule directly after school or on weekends.',
      'Personalized WhatsApp progress updates sent to parents.',
    ],
    classFormat: {
      duration: '30 minutes per class',
      frequency: '3 to 5 days weekly',
      platform: 'Zoom / Google Meet',
      language: 'English, Urdu, Arabic',
      schedule: 'After-school and weekend timings tailored to your timezone',
      assessment: 'Monthly star report cards and parent-teacher check-ins',
    },
    teacherInfo: {
      title: 'Child-Specialist Quran Teachers',
      description:
        'Our teachers are specially vetted for their gentleness, enthusiasm, and ability to keep young students smiling, engaged, and focused.',
      qualifications: ['Trained in online child psychology', 'Fluent in English & Urdu', 'Gentle, encouraging teaching approach'],
    },
    faqs: [
      {
        question: 'What is the best age for my child to start online Quran classes?',
        answer:
          'Children as young as 4 or 5 can begin with our gentle, interactive Noorani Qaida phonetics program.',
      },
      {
        question: 'How do you keep restless kids engaged online?',
        answer:
          'Our tutors use digital on-screen drawing tools, interactive pointers, frequent verbal encouragement, and short, focused 30-minute sessions.',
      },
      {
        question: 'Can siblings share a class or take back-to-back classes?',
        answer:
          'Yes! We offer convenient back-to-back scheduling and special family sibling discount packages.',
      },
    ],
    internalLinks: [
      {
        pageId: 'noorani-qaida',
        anchorText: 'Learn Noorani Qaida Online',
        description: 'The premier starting foundation for young children.',
      },
      {
        pageId: 'quran-reading',
        anchorText: 'Learn Quran Reading Online',
        description: 'Guide your child to complete their first full Quran Khatam.',
      },
      {
        pageId: 'online-tajweed-classes',
        anchorText: 'Online Quran Classes with Tajweed',
        description: 'Instill correct Makharij from the very start of their journey.',
      },
      {
        pageId: 'online-hifz-quran-classes',
        anchorText: 'Online Hifz Quran Classes',
        description: 'Explore youth memorization pathways for dedicated kids.',
      },
      {
        pageId: 'online-islamic-studies',
        anchorText: 'Online Islamic Studies Classes',
        description: 'Holistic character building, Seerah stories, and Islamic morals.',
      },
    ],
    feePKR: 19600,
    feeUSD: 70,
    featuredImage: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&w=1200&q=80',
  },

  'quran-for-beginners': {
    id: 'quran-for-beginners',
    urlPath: '/quran-for-beginners',
    primaryKeyword: 'learn Quran online for beginners',
    secondaryKeywords: [
      'Quran classes for beginners',
      'beginner Quran course',
      'Quran reading for beginners',
      'learn Quran from home',
      'start learning Quran online',
    ],
    metaTitle: 'Learn Quran Online for Beginners | Shaheen Al Zaitoon',
    metaDescription:
      'Step-by-step 1-on-1 Quran classes for beginners of all ages. Start from zero Arabic knowledge with patient certified tutors. Book a free 3-day trial.',
    metaTitleUrdu: 'ابتدائی افراد کے لیے آن لائن قرآن کورس | شاہین الزیتون اکیڈمی',
    metaDescriptionUrdu:
      'بالکل صفر سے قرآن پاک سیکھنا شروع کریں۔ بغیر کسی جھجک کے 1-on-1 کلاسز میں شامل ہوں۔ 3 روزہ مفت ٹرائل۔',
    h1: 'Learn Quran Online for Beginners',
    subheading: 'No Prior Knowledge Required — Start Your Quranic Journey with Zero Hesitation',
    shortIntro:
      'It is never too late to learn the Holy Quran. Whether you are a new Muslim, someone who never had the chance to learn as a child, or an adult wanting a fresh start, our beginner Quran program provides a warm, judgment-free learning space.',
    courseOverview:
      'Our beginner curriculum takes you step-by-step from recognizing the Arabic alphabet to reading your first full verses with correct Tajweed. We emphasize comfort, patience, and gradual progression, ensuring that you never feel overwhelmed or rushed.',
    whoIsThisFor: [
      'Adults who cannot read Arabic script and want to learn from the beginning.',
      'Reverts / new Muslims looking for authentic, patient Islamic mentorship.',
      'Learners who feel embarrassed about starting late in life.',
      'Students wanting flexible evening or weekend classes from home.',
    ],
    whatYouWillLearn: [
      {
        title: 'Alphabet & Sound Identification',
        description: 'Recognize the 29 letters in isolated, initial, medial, and final forms.',
      },
      {
        title: 'Vowel Transitions & Word Joining',
        description: 'Combine letters into words using short vowels (Fatha, Kasra, Damma) and Sukoon.',
      },
      {
        title: 'Essential Tajweed Rules Simplified',
        description: 'Understand heavy vs light letters and basic pauses in plain, easy-to-follow terms.',
      },
      {
        title: 'Reciting Surah Al-Fatiha & Short Chapters',
        description: 'Read essential Surahs for your daily prayer with absolute confidence.',
      },
    ],
    curriculum: [
      {
        moduleNumber: 'Step 1',
        moduleTitle: 'The Arabic Alphabet & Sounds',
        topics: [
          'Mastering all 29 Arabic consonants without confusion',
          'Pronunciation coaching for sounds unique to Arabic (Ayn, Haa, Qaf, Dhad)',
          'Recognizing joint letters and word shapes',
        ],
      },
      {
        moduleNumber: 'Step 2',
        moduleTitle: 'Vowels & Smooth Reading',
        topics: [
          'Harakat (short vowels) and Tanween (double vowels)',
          'Madd (long vowels) and basic prolongation',
          'Connecting words and reading short Quranic phrases',
        ],
      },
      {
        moduleNumber: 'Step 3',
        moduleTitle: 'Reading Directly from the Quran',
        topics: [
          'Reciting short Surahs of the 30th Juz',
          'Overcoming hesitation and pauses',
          'Learning basic stopping rules at verse endings',
        ],
      },
    ],
    howClassesWork: [
      {
        title: '100% Private 1-on-1',
        desc: 'Learn in private with zero embarrassment or classroom pressure.',
        icon: 'Lock',
      },
      {
        title: 'Customized Pace',
        desc: 'We move as fast or as gently as you need to feel comfortable.',
        icon: 'Smile',
      },
      {
        title: 'Practical Guidance',
        desc: 'Learn both Quran reading and the basics of daily Islamic prayers.',
        icon: 'Compass',
      },
    ],
    learningBenefits: [
      'Empathetic, highly patient instructors who celebrate every small milestone.',
      'No complicated academic jargon — everything explained in plain English or Urdu.',
      'Flexible class reschedule policy for busy working adults.',
    ],
    classFormat: {
      duration: '30 to 45 minutes',
      frequency: '2 to 5 days weekly',
      platform: 'Zoom / Google Meet',
      language: 'English, Urdu, Arabic',
      schedule: 'Flexible 24/7 time slots',
      assessment: 'Gentle informal reviews and encouraging feedback',
    },
    teacherInfo: {
      title: 'Patient Mentors for Adult Beginners',
      description:
        'Our beginner tutors specialize in adult education, offering immense encouragement, cultural understanding, and calm step-by-step coaching.',
      qualifications: ['Certified Qari', 'Specialized in adult education pedagogy', 'Fluent in English & Urdu'],
    },
    faqs: [
      {
        question: 'Is it too late for an adult to learn Quran from scratch?',
        answer:
          'Never! The Prophet (PBUH) taught companions who accepted Islam as adults. Allah rewards the effort of adult learners twice as much for their dedication.',
      },
      {
        question: 'How quickly can a beginner start reading the Quran?',
        answer:
          'Most adult beginners start reading simple Quranic verses within 6 to 10 weeks of regular practice.',
      },
    ],
    internalLinks: [
      {
        pageId: 'noorani-qaida',
        anchorText: 'Learn Noorani Qaida Online',
        description: 'See the foundational curriculum designed for absolute beginners.',
      },
      {
        pageId: 'quran-reading',
        anchorText: 'Learn Quran Reading Online',
        description: 'Advance to continuous Nazra recitation of the Holy Quran.',
      },
      {
        pageId: 'online-tajweed-classes',
        anchorText: 'Online Quran Classes with Tajweed',
        description: 'Refine your pronunciation with structured Tajweed rules.',
      },
      {
        pageId: 'quran-classes-for-adults',
        anchorText: 'Online Quran Classes for Adults',
        description: 'Discover specialized programs tailored for mature learners.',
      },
    ],
    feePKR: 19600,
    feeUSD: 70,
    featuredImage: 'https://images.unsplash.com/photo-1584286595398-a59f21d313f5?auto=format&fit=crop&w=1200&q=80',
  },

  'quran-classes-for-adults': {
    id: 'quran-classes-for-adults',
    urlPath: '/quran-classes-for-adults',
    primaryKeyword: 'online Quran classes for adults',
    secondaryKeywords: [
      'Quran classes for adults',
      'adult Quran learning',
      'learn Quran online adults',
      'Quran lessons for adults',
      'private Quran classes for professionals',
    ],
    metaTitle: 'Online Quran Classes for Adults | Shaheen Al Zaitoon',
    metaDescription:
      'Flexible, private 1-on-1 online Quran classes for busy adults and professionals. Learn Tajweed, recitation, translation, and Tafseer. Free 3-day trial.',
    metaTitleUrdu: 'بڑوں کے لیے آن لائن قرآن کلاسز | شاہین الزیتون اکیڈمی',
    metaDescriptionUrdu:
      'مصروف زندگی کے ساتھ گھر بیٹھے قرآن پاک تجوید، ناظرہ، ترجمہ اور تفسیر سیکھیں۔ 3 روزہ مفت آزمائش۔',
    h1: 'Online Quran Classes for Adults',
    subheading: 'Tailored Quranic Education Designed for Busy Professionals & Lifelong Learners',
    shortIntro:
      'Balancing career, family, and personal life can make attending traditional classes difficult. Our online Quran classes for adults offer flexible 1-on-1 schedules that adapt to your routine, whether you are refreshing old skills or learning from scratch.',
    courseOverview:
      'Our adult learning tracks range from correcting basic Tajweed and achieving recitation fluency to in-depth Quran Translation, Tafseer, and Arabic grammar. We understand the learning patterns of mature students and provide direct, intellectual, and spiritually fulfilling guidance with complete schedule flexibility.',
    whoIsThisFor: [
      'Working professionals seeking early morning, evening, or weekend classes.',
      'Parents wanting to refresh their Quran skills so they can guide their children.',
      'Senior citizens looking for a peaceful, daily spiritual Quran routine.',
      'Adults wanting to memorize selected Surahs with authentic Tajweed.',
    ],
    whatYouWillLearn: [
      {
        title: 'Flawless Recitation & Tajweed Correction',
        description: 'Identify and fix ingrained pronunciation habits and subtle mistakes.',
      },
      {
        title: 'Deep Quranic Comprehension',
        description: 'Understand the linguistic meanings and life application of the verses you recite.',
      },
      {
        title: 'Daily Azkar & Spiritual Mindset',
        description: 'Integrate morning and evening Sunnah supplications into your daily routine.',
      },
      {
        title: 'Flexible Custom Curriculum',
        description: 'Choose to focus on Nazra, Tajweed, Translation, Tafseer, or Hifz.',
      },
    ],
    curriculum: [
      {
        moduleNumber: 'Track A',
        moduleTitle: 'Tajweed Rectification & Fluent Recitation',
        topics: [
          'Vocal acoustic evaluation and Makharij correction',
          'Mastering Sifaat, Noon Sakinah, and Madd rules',
          'Reciting through the Quran with personal feedback',
        ],
      },
      {
        moduleNumber: 'Track B',
        moduleTitle: 'Quran Translation & Key Vocabularies',
        topics: [
          'Word-by-word meanings of daily Salah and short Surahs',
          'High-frequency Quranic vocabulary lists',
          'Connecting verses with personal moral and family responsibilities',
        ],
      },
      {
        moduleNumber: 'Track C',
        moduleTitle: 'Selected Surahs Memorization',
        topics: [
          'Memorizing Surah Al-Kahf, Yaseen, Ar-Rahman, Al-Waqi’ah, Al-Mulk',
          'Daily structured revision system for busy schedules',
        ],
      },
    ],
    howClassesWork: [
      {
        title: 'Schedule Around Your Life',
        desc: 'Choose your ideal class time — before work, during lunch, or late evening.',
        icon: 'Calendar',
      },
      {
        title: 'Adult-Oriented Pedagogy',
        desc: 'Intellectually stimulating discussions tailored for mature students.',
        icon: 'UserCheck',
      },
      {
        title: 'Strict Confidentiality',
        desc: 'Learn in private 1-on-1 sessions with total peace of mind.',
        icon: 'ShieldCheck',
      },
    ],
    learningBenefits: [
      'Maximum flexibility with easy rescheduling options.',
      'Taught by certified scholars who respect your time and intellectual curiosity.',
      'Progress at your own chosen pace with no peer pressure.',
    ],
    classFormat: {
      duration: '30 to 45 minutes',
      frequency: '2 to 5 days weekly',
      platform: 'Zoom / Google Meet',
      language: 'English, Urdu, Arabic',
      schedule: '24/7 global availability',
      assessment: 'Personal milestone reviews',
    },
    teacherInfo: {
      title: 'Senior Scholars & Qaris',
      description:
        'Our adult faculty includes experienced educators and Imams who provide articulate, respectful, and mature mentorship.',
      qualifications: ['Ijazah in Tajweed & Qira’at', 'Experienced in adult education', 'Bilingual English/Urdu'],
    },
    faqs: [
      {
        question: 'What if I need to travel for work or reschedule a class?',
        answer:
          'We offer flexible makeup classes! Simply notify your tutor in advance, and we will reschedule your session to a convenient time.',
      },
      {
        question: 'Can I focus only on understanding the Quran rather than just reading?',
        answer:
          'Yes, we can customize your track to focus primarily on Quran Translation, Tafseer, and Quranic Arabic grammar.',
      },
    ],
    internalLinks: [
      {
        pageId: 'quran-reading',
        anchorText: 'Learn Quran Reading Online',
        description: 'Perfect your recitation fluency across all 30 Juz.',
      },
      {
        pageId: 'online-tajweed-classes',
        anchorText: 'Online Quran Classes with Tajweed',
        description: 'Master authentic pronunciation and classical Tajweed rules.',
      },
      {
        pageId: 'quran-translation',
        anchorText: 'Learn Quran Translation Online',
        description: 'Understand the divine revelation word-by-word.',
      },
      {
        pageId: 'quran-tafseer',
        anchorText: 'Online Quran Tafseer Classes',
        description: 'Deepen your knowledge of historical context and spiritual wisdom.',
      },
      {
        pageId: 'quranic-arabic',
        anchorText: 'Online Quranic Arabic Classes',
        description: 'Master Arabic grammar to understand the Quran directly.',
      },
    ],
    feePKR: 22400,
    feeUSD: 80,
    featuredImage: 'https://images.unsplash.com/photo-1542816417-0983cbe82752?auto=format&fit=crop&w=1200&q=80',
  },

  'quran-classes-for-ladies': {
    id: 'quran-classes-for-ladies',
    urlPath: '/quran-classes-for-ladies',
    primaryKeyword: 'online Quran classes for ladies',
    secondaryKeywords: [
      'Quran classes for women',
      'Quran classes for sisters',
      'learn Quran online for women',
      'online Quran teacher for ladies',
      'female Quran teacher online',
      'female Qaria classes',
    ],
    metaTitle: 'Online Quran Classes for Ladies | Shaheen Al Zaitoon',
    metaDescription:
      'Private 1-on-1 online Quran classes for ladies and sisters taught exclusively by certified female Qarias and Alimahs. Complete privacy & flexible hours. Free trial.',
    metaTitleUrdu: 'خواتین کے لیے آن لائن قرآن کلاسز | شاہین الزیتون اکیڈمی',
    metaDescriptionUrdu:
      'مستند اور باحجاب معلمات اور قاریہ صاحبان سے مکمل پردے کے ساتھ آن لائن قرآن پاک سیکھیں۔ 3 روزہ مفت ٹرائل۔',
    h1: 'Online Quran Classes for Ladies',
    subheading: '100% Private, Shariah-Compliant Quran Learning with Certified Female Qarias',
    shortIntro:
      'We provide dedicated, private 1-on-1 online Quran classes for Muslim women, sisters, mothers, and daughters, conducted exclusively by certified female Qarias and Alimahs in a safe and comfortable environment.',
    courseOverview:
      'Our ladies program is designed with full respect for Islamic modesty, privacy, and the unique schedules of homemakers, university students, and working women. Courses cover Noorani Qaida, Nazra Quran with Tajweed, Hifz, Quran Translation, Tafseer, and essential Fiqh of Taharah (purification), Salah, and family ethics.',
    whoIsThisFor: [
      'Muslim women and girls wanting exclusive instruction from qualified female teachers.',
      'Mothers wanting to learn so they can teach and cultivate an Islamic home.',
      'Sisters preparing for marriage or seeking to learn daily Duas and Islamic jurisprudence.',
      'Working women and university students needing flexible evening or weekend slots.',
    ],
    whatYouWillLearn: [
      {
        title: 'Tajweed & Recitation Fluency',
        description: 'Correct articulation of Arabic letters and melodious recitation of the Holy Quran.',
      },
      {
        title: 'Quranic Translation & Reflection',
        description: 'Understand the message of Allah and its practical application to women’s daily lives.',
      },
      {
        title: 'Fiqh of Purification & Worship',
        description: 'Essential Islamic rulings on Wudu, Ghusl, Salah, fasting, and women’s jurisprudence.',
      },
      {
        title: 'Sunnah Duas & Daily Azkar',
        description: 'Daily supplications for home protection, children, health, and spiritual tranquility.',
      },
    ],
    curriculum: [
      {
        moduleNumber: 'Option 1',
        moduleTitle: 'Foundations & Nazra with Tajweed',
        topics: [
          'Noorani Qaida review and Makharij refinement',
          'Complete reading of the Holy Quran under teacher supervision',
          'Application of Tajweed rules (Ghunnah, Ikhfa, Madd, Waqf)',
        ],
      },
      {
        moduleNumber: 'Option 2',
        moduleTitle: 'Quran Translation, Tafseer & Fiqh',
        topics: [
          'Word-by-word translation of Juz 30 and selected Surahs',
          'Tafseer of Surah Maryam, Surah An-Nur, and Surah Al-Ahzab',
          'Islamic guidance on family life, motherhood, and women in Islam',
        ],
      },
      {
        moduleNumber: 'Option 3',
        moduleTitle: 'Hifz Program for Sisters',
        topics: [
          'Structured memorization of selected Surahs or full Quran',
          'Daily Sabaq and Manzil revision with certified Hafiza',
        ],
      },
    ],
    howClassesWork: [
      {
        title: '100% Female Faculty',
        desc: 'Classes conducted strictly by verified female Qarias and Alimahs.',
        icon: 'Users',
      },
      {
        title: 'Complete Privacy (Pardah)',
        desc: 'Voice or camera options according to each student’s personal comfort.',
        icon: 'Lock',
      },
      {
        title: 'Flexible Rescheduling',
        desc: 'Easily adapt around household duties, childcare, or university exams.',
        icon: 'Clock',
      },
    ],
    learningBenefits: [
      'Warm, supportive, and spiritually uplifting sisterhood atmosphere.',
      'Opportunity to ask sensitive Fiqh and religious questions freely.',
      'Mother-daughter joint learning options available.',
      'Authentic certification upon course completion.',
    ],
    classFormat: {
      duration: '30 to 45 minutes',
      frequency: '2 to 5 days weekly',
      platform: 'Zoom / Google Meet',
      language: 'English, Urdu, Arabic',
      schedule: 'Morning, afternoon, and evening slots tailored for ladies',
      assessment: 'Personal feedback and progress evaluation',
    },
    teacherInfo: {
      title: 'Certified Female Qarias & Alimahs',
      description:
        'Our female teachers are graduates of recognized Islamic seminaries, holding Darse Nizami / Alimah degrees and Ijazah in Tajweed.',
      qualifications: [
        'Certified Alimah / Hafiza',
        'Ijazah in Tajweed Al-Quran',
        'Experienced in teaching Western and international sisters',
      ],
    },
    faqs: [
      {
        question: 'Are all teachers for ladies guaranteed to be female?',
        answer:
          'Yes, 100%. Our ladies classes are assigned exclusively to certified female Qarias and Alimahs.',
      },
      {
        question: 'Is video camera mandatory during the class?',
        answer:
          'No, video is entirely optional. Sisters can choose audio-only with on-screen digital Quran sharing for complete comfort and privacy.',
      },
      {
        question: 'Can mothers and daughters learn together in the same session?',
        answer:
          'Yes! We offer convenient mother-daughter family packages with customized pacing.',
      },
    ],
    internalLinks: [
      {
        pageId: 'noorani-qaida',
        anchorText: 'Learn Noorani Qaida Online',
        description: 'Begin with foundational Arabic phonetics and letter recognition.',
      },
      {
        pageId: 'online-tajweed-classes',
        anchorText: 'Online Quran Classes with Tajweed',
        description: 'Refine your Makharij with structured female Qaria guidance.',
      },
      {
        pageId: 'quran-translation',
        anchorText: 'Learn Quran Translation Online',
        description: 'Understand the deep meanings of Quranic verses word-by-word.',
      },
      {
        pageId: 'online-islamic-studies',
        anchorText: 'Online Islamic Studies Classes',
        description: 'Learn Islamic jurisprudence, Sunnah ethics, and family values.',
      },
      {
        pageId: 'salah-and-duas',
        anchorText: 'Online Salah & Daily Duas Classes',
        description: 'Master practical Salah, Wudu method, and essential Masnoon Duas.',
      },
    ],
    feePKR: 22400,
    feeUSD: 80,
    featuredImage: 'https://images.unsplash.com/photo-1564121211835-e88c852648ab?auto=format&fit=crop&w=1200&q=80',
  },

  'online-islamic-studies': {
    id: 'online-islamic-studies',
    urlPath: '/online-islamic-studies',
    primaryKeyword: 'online Islamic studies classes',
    secondaryKeywords: [
      'Islamic studies for kids',
      'learn Islamic studies online',
      'Islamic basics course',
      'online Islamic education',
      'Seerah and Hadith classes',
    ],
    metaTitle: 'Online Islamic Studies Classes | Shaheen Al Zaitoon',
    metaDescription:
      'Comprehensive online Islamic studies course covering Aqeedah, Fiqh, Seerah, Hadith, and Islamic manners for kids and adults. Start your free trial today.',
    metaTitleUrdu: 'آن لائن اسلامک اسٹڈیز کورس | شاہین الزیتون اکیڈمی',
    metaDescriptionUrdu:
      'عقائد، فقہ، سیرت النبی ﷺ، احادیث اور اسلامی اخلاقیات پر مبنی جامع تعلیمی کورس۔',
    h1: 'Online Islamic Studies Classes',
    subheading: 'A Complete Holistic Islamic Education: Aqeedah, Seerah, Fiqh & Character Building',
    shortIntro:
      'Islamic education goes beyond recitation to building an authentic Islamic identity, understanding fundamental beliefs, practicing daily Sunnahs, and living with noble moral character (Akhlaq).',
    courseOverview:
      'Our Islamic Studies program provides a structured curriculum covering the 5 Pillars of Islam, 6 Articles of Faith (Iman), Seerah of the Prophet Muhammad (PBUH), stories of the Prophets, basic Fiqh of daily worship, 40 essential Hadiths, and practical Islamic manners for navigating modern life.',
    whoIsThisFor: [
      'Children and teenagers growing up in Western societies needing strong Islamic roots.',
      'Adults and reverts wanting a structured, authentic understanding of Islamic theology and practice.',
      'Families seeking a comprehensive, holistic Deen education alongside Quran reading.',
    ],
    whatYouWillLearn: [
      {
        title: 'Core Islamic Beliefs (Aqeedah)',
        description: 'Tawheed (Oneness of Allah), Angels, Revealed Books, Prophets, Day of Judgment, and Qadar.',
      },
      {
        title: 'Seerah of Prophet Muhammad (PBUH)',
        description: 'Chronological study of the Prophet’s life, character, compassion, and leadership.',
      },
      {
        title: 'Practical Fiqh of Worship',
        description: 'Rules of Taharah (cleanliness), Wudu, Salah, Fasting (Sawm), Zakah, and Hajj.',
      },
      {
        title: 'Islamic Ethics & Akhlaq',
        description: 'Honesty, respecting parents, kindness to neighbors, halal earnings, and avoiding sins.',
      },
    ],
    curriculum: [
      {
        moduleNumber: 'Module 1',
        moduleTitle: 'Pillars of Faith & Five Pillars of Islam',
        topics: [
          'Understanding the Shahadah and its conditions',
          'Salah: Conditions, pillars, nullifiers, and spiritual essence',
          'Zakah, Fasting in Ramadan, and the journey of Hajj',
        ],
      },
      {
        moduleNumber: 'Module 2',
        moduleTitle: 'Seerah & Stories of the Prophets (Qisas al-Anbiya)',
        topics: [
          'Prophet Adam, Ibrahim, Musa, and Isa (peace be upon them)',
          'The life of Prophet Muhammad (PBUH) from birth in Makkah to migration in Madinah',
          'The exemplary lives of the 4 Rightly Guided Caliphs (Khulafa-e-Rashideen)',
        ],
      },
      {
        moduleNumber: 'Module 3',
        moduleTitle: '40 Short Hadiths & Islamic Manners (Adab)',
        topics: [
          'Memorable Hadiths on character, anger management, and good deeds',
          'Islamic etiquette of speech, eating, dressing, and visiting',
          'Overcoming modern peer pressure and maintaining Islamic identity',
        ],
      },
    ],
    howClassesWork: [
      {
        title: 'Engaging Multimedia',
        desc: 'Visual timelines, maps, and illustrative digital story presentations.',
        icon: 'Tv',
      },
      {
        title: 'Open Q&A Discussions',
        desc: 'Students can openly discuss real-life ethical questions and doubts.',
        icon: 'HelpCircle',
      },
      {
        title: 'Practical Action Tasks',
        desc: 'Weekly Sunnah challenges to implement lessons in daily life.',
        icon: 'CheckSquare',
      },
    ],
    learningBenefits: [
      'Equips students with solid Islamic reasoning to resist negative cultural influences.',
      'Cultivates genuine love and reverence for Allah and the Prophet (PBUH).',
      'Complementary to all Quran reading, Tajweed, and Hifz courses.',
    ],
    classFormat: {
      duration: '30 to 45 minutes',
      frequency: '2 to 4 days weekly',
      platform: 'Zoom / Google Meet',
      language: 'English, Urdu, Arabic',
      schedule: 'Flexible weekend and weekday options',
      assessment: 'Interactive quizzes and project presentations',
    },
    teacherInfo: {
      title: 'Graduates of Islamic Universities',
      description:
        'Our Islamic Studies instructors are qualified Alims and Alimahs trained in modern pedagogy and cross-cultural communication.',
      qualifications: ['Degree in Islamic Studies', 'Fluent in English & Urdu', 'Experienced in youth mentorship'],
    },
    faqs: [
      {
        question: 'Can Islamic Studies be combined with Quran reading classes?',
        answer:
          'Yes! Many parents choose our popular combined track: 20 minutes of Quran Tajweed followed by 10-15 minutes of Islamic Studies in each session.',
      },
      {
        question: 'Are classes suitable for new Muslims / reverts?',
        answer:
          'Absolutely. We offer a dedicated, step-by-step beginner Islamic foundations track tailored for new Muslims.',
      },
    ],
    internalLinks: [
      {
        pageId: 'salah-and-duas',
        anchorText: 'Online Salah & Daily Duas Classes',
        description: 'Practical step-by-step guidance on daily prayers and supplications.',
      },
      {
        pageId: 'quran-classes-for-kids',
        anchorText: 'Online Quran Classes for Kids',
        description: 'Explore engaging Islamic learning tracks designed for children.',
      },
      {
        pageId: 'quran-translation',
        anchorText: 'Learn Quran Translation Online',
        description: 'Connect your Islamic knowledge directly with Quranic verses.',
      },
    ],
    feePKR: 18200,
    feeUSD: 65,
    featuredImage: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=1200&q=80',
  },

  'quranic-arabic': {
    id: 'quranic-arabic',
    urlPath: '/quranic-arabic',
    primaryKeyword: 'online Quranic Arabic classes',
    secondaryKeywords: [
      'learn Quranic Arabic online',
      'Arabic grammar for Quran',
      'Quranic Arabic course',
      'Nahw and Sarf online',
      'Arabic language for Quran understanding',
    ],
    metaTitle: 'Online Quranic Arabic Classes | Shaheen Al Zaitoon',
    metaDescription:
      'Master Quranic Arabic grammar (Nahw & Sarf) to comprehend the Holy Quran directly in Arabic without translation. 1-on-1 online classes. Free trial.',
    metaTitleUrdu: 'آن لائن لسان القرآن و عربی گرامر کورس | شاہین الزیتون اکیڈمی',
    metaDescriptionUrdu:
      'نحو و صرف کے آسان قواعد کے ذریعے قرآن مجید کو براہِ راست عربی زبان میں سمجھیں۔',
    h1: 'Online Quranic Arabic Classes',
    subheading: 'Master Nahw & Sarf to Understand the Divine Words in Their Original Language',
    shortIntro:
      'Allah revealed the Holy Quran in clear, eloquent Arabic. Our Quranic Arabic course enables students to understand the Quran directly without relying on secondary translations by mastering Arabic morphology (Sarf) and grammar (Nahw).',
    courseOverview:
      'Using a structured, practical approach tailored for non-native speakers, this course decodes Arabic root letters, verb conjugation tables, noun declensions, and sentence structures found throughout the Quran. Within months, students begin recognizing grammatical patterns directly in the verses they recite during Salah.',
    whoIsThisFor: [
      'Students wanting to comprehend the Quran directly in Arabic.',
      'Adults and university students seeking intellectual and linguistic mastery.',
      'Hifz students wishing to connect memorized sounds with deep grammatical meaning.',
    ],
    whatYouWillLearn: [
      {
        title: 'Ilm as-Sarf (Morphology & Word Formation)',
        description: 'Learn 3-letter root systems, verb paradigms (past, present, imperative), and derived noun forms.',
      },
      {
        title: 'Ilm an-Nahw (Grammar & Sentence Syntax)',
        description: 'Understand grammatical cases (Marfoo, Mansoob, Majroor), nominal and verbal sentences.',
      },
      {
        title: 'Quranic Text Analysis',
        description: 'Break down complex Quranic verses into their grammatical components (I’rab).',
      },
      {
        title: 'Direct Comprehension Skills',
        description: 'Train your mind to comprehend Arabic speech and recitation in real time.',
      },
    ],
    curriculum: [
      {
        moduleNumber: 'Level 1',
        moduleTitle: 'Sarf (Morphology) Fundamentals',
        topics: [
          'The 3-letter root system (Fa-Ayn-Lam)',
          'Past tense verb conjugation table (Madi)',
          'Present/Future tense verb conjugation (Mudari)',
          'Command (Amr) and Prohibition (Nahi) forms',
        ],
      },
      {
        moduleNumber: 'Level 2',
        moduleTitle: 'Nahw (Syntax) & Case Endings',
        topics: [
          'Types of words: Ism (Noun), Fi’l (Verb), Harf (Particle)',
          'The 3 grammatical states (Rafa, Nasb, Jarr)',
          'Definite vs Indefinite nouns (Marifah vs Nakirah)',
          'Possessive construction (Mudaf & Mudaf Ilayh) and Adjective-Noun phrases (Mawsoof & Sifah)',
        ],
      },
      {
        moduleNumber: 'Level 3',
        moduleTitle: 'Advanced Quranic I’rab & Rhetoric',
        topics: [
          'Nominal sentence structure (Mubtada & Khabar)',
          'Verbal sentence structure (Fi’l, Faa’il, Maf’ool)',
          'Analyzing Juz 30 and Surah Yusuf grammatically',
        ],
      },
    ],
    howClassesWork: [
      {
        title: 'Color-Coded Charts',
        desc: 'Interactive grammar tables that make memorizing patterns intuitive and visual.',
        icon: 'Table',
      },
      {
        title: 'Direct Verse Application',
        desc: 'Every rule is immediately practiced using actual verses from the Quran.',
        icon: 'BookOpen',
      },
      {
        title: 'Weekly Drill Sheets',
        desc: 'Engaging translation and parsing exercises to cement grammatical agility.',
        icon: 'Edit3',
      },
    ],
    learningBenefits: [
      'Eliminates dependence on English/Urdu translations during recitation and Taraweeh.',
      'Deepens your appreciation of Quranic eloquence, word choice, and divine miracles.',
      'Taught by certified scholars of classical Arabic linguistics.',
    ],
    classFormat: {
      duration: '45 minutes',
      frequency: '2 to 4 days weekly',
      platform: 'Zoom / Google Meet',
      language: 'English, Urdu, Arabic',
      schedule: 'Flexible evening and weekend time slots',
      assessment: 'Grammar conjugation tests and verse parsing evaluations',
    },
    teacherInfo: {
      title: 'Experts in Classical Arabic & Balaghah',
      description:
        'Our Arabic faculty holds specialized degrees in Arabic grammar and literature, making complex linguistic rules clear and simple for non-native learners.',
      qualifications: ['Master in Arabic Language & Literature', 'Shahadat-ul-Aalamiyyah', '10+ years teaching experience'],
    },
    faqs: [
      {
        question: 'How is Quranic Arabic different from Modern Standard Arabic (MSA)?',
        answer:
          'Quranic Arabic focuses specifically on the classical vocabulary, syntax, and morphology used in the Holy Quran and Hadith, avoiding modern conversational slang to fast-track your Quran comprehension.',
      },
      {
        question: 'Do I need prior Arabic reading skills to start?',
        answer:
          'You should be able to read Arabic letters (at Noorani Qaida level). If not, we can start with a 2-week reading refresher.',
      },
    ],
    internalLinks: [
      {
        pageId: 'quran-translation',
        anchorText: 'Learn Quran Translation Online',
        description: 'Apply your Arabic grammar to word-by-word Quranic meanings.',
      },
      {
        pageId: 'quran-tafseer',
        anchorText: 'Online Quran Tafseer Classes',
        description: 'Explore the deeper theological wisdom behind Arabic phrasing.',
      },
      {
        pageId: 'quran-classes-for-adults',
        anchorText: 'Online Quran Classes for Adults',
        description: 'See adult learning pathways designed for intellectual growth.',
      },
    ],
    feePKR: 23800,
    feeUSD: 85,
    featuredImage: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80',
  },

  'salah-and-duas': {
    id: 'salah-and-duas',
    urlPath: '/salah-and-duas',
    primaryKeyword: 'online Salah and Duas classes',
    secondaryKeywords: [
      'learn Namaz online',
      'learn daily Duas with meaning',
      'Masnoon Duas course',
      'learn prayer and supplications online',
      'Salah practical course',
    ],
    metaTitle: 'Online Salah & Daily Duas Classes | Shaheen Al Zaitoon',
    metaDescription:
      'Learn the practical method of Salah (Namaz), Wudu, and essential Masnoon Duas with correct pronunciation and meanings. 1-on-1 online classes. Free trial.',
    metaTitleUrdu: 'آن لائن نماز و مسنون دعائیں کورس | شاہین الزیتون اکیڈمی',
    metaDescriptionUrdu:
      'وضو، مکمل طریقہ نماز، مسنون دعائیں اور چھ کلمے درست تلفظ اور ترجمے کے ساتھ سیکھیں۔',
    h1: 'Online Salah & Daily Duas Classes',
    subheading: 'Master the Second Pillar of Islam & Enrich Every Moment of Your Day with Sunnah Duas',
    shortIntro:
      'Salah (Namaz) is the direct conversation between a believer and Allah, and Duas are the weapon of the believer. Our dedicated Salah & Duas course teaches the exact physical and verbal method of prayer alongside essential daily supplications.',
    courseOverview:
      'Designed for children, adult beginners, and converts, this course provides step-by-step practical instruction in Taharah (cleanliness), Wudu, the complete movements and recitations of Salah according to the Sunnah, the 6 Kalimahs, Ayat-ul-Kursi, Dua Qunoot, and over 40 essential Masnoon Duas for daily life.',
    whoIsThisFor: [
      'Children learning how to perform their five daily prayers independently.',
      'New Muslims wanting patient, visual guidance on how to pray correctly.',
      'Adults who want to correct their pronunciation of Tashahhud, Durood, and Dua Qunoot.',
      'Anyone wanting to memorize essential authentic Sunnah supplications with meanings.',
    ],
    whatYouWillLearn: [
      {
        title: 'Step-by-Step Wudu & Taharah',
        description: 'The Sunnah method of ablution, its conditions, virtues, and nullifiers.',
      },
      {
        title: 'Complete Method of Salah (Namaz)',
        description: 'From Takbeer Tahreemah to Tasleem, including Ruku, Sajdah, and Tashahhud posture.',
      },
      {
        title: 'Exact Pronunciation of Salah Recitations',
        description: 'Thana, Surah Al-Fatiha, Tashahhud (Attahiyyat), Durood Ibrahim, and Dua Qunoot with Tajweed.',
      },
      {
        title: '40 Essential Masnoon Daily Duas',
        description: 'Authentic supplications for waking, sleeping, eating, traveling, entering mosques, and distress.',
      },
    ],
    curriculum: [
      {
        moduleNumber: 'Part 1',
        moduleTitle: 'Taharah & Wudu Practical',
        topics: [
          'Importance of spiritual and physical cleanliness (Taharah)',
          'Practical Wudu step-by-step with Duas before and after',
          'What breaks Wudu and rulings on Tayammum',
        ],
      },
      {
        moduleNumber: 'Part 2',
        moduleTitle: 'The Complete Salah Method',
        topics: [
          'The 5 daily prayer timings, number of Rak’ats (Fard, Sunnah, Nafl, Witr)',
          'Correct physical postures for men and women according to authentic Sunnah',
          'Memorizing Thana, Tashahhud, Durood, and Rabbana Duas with Tajweed',
          'Dua Qunoot in Witr prayer and Sajdah Sahw (prostration of forgetfulness)',
        ],
      },
      {
        moduleNumber: 'Part 3',
        moduleTitle: 'Daily Sunnah Duas & Protection',
        topics: [
          'Morning and Evening protective Azkar (including Ayat-ul-Kursi & 4 Quls)',
          'Duas for entering/leaving home, bathroom, mosque, and starting a journey',
          'Duas for parents, forgiveness, anxiety, sickness, and gratitude',
        ],
      },
    ],
    howClassesWork: [
      {
        title: 'Visual Step-by-Step Demonstrations',
        desc: 'Interactive diagrams and teacher demonstrations of correct prayer positions.',
        icon: 'Eye',
      },
      {
        title: 'Word-by-Word Pronunciation Practice',
        desc: 'Teacher listens and corrects every single syllable of the prayer recitations.',
        icon: 'Mic',
      },
      {
        title: 'Daily Duas Audio Cards',
        desc: 'Downloadable audio clips to practice memorizing Duas throughout the day.',
        icon: 'Download',
      },
    ],
    learningBenefits: [
      'Perform all 5 daily prayers with complete confidence and inner tranquility (Khushu).',
      'Enrich everyday moments by remembering Allah through authentic prophetic supplications.',
      'Patient, gentle 1-on-1 instruction suitable for all ages.',
    ],
    classFormat: {
      duration: '30 minutes',
      frequency: '2 to 4 days weekly',
      platform: 'Zoom / Google Meet',
      language: 'English, Urdu, Arabic',
      schedule: 'Flexible scheduling for global timezones',
      assessment: 'Practical prayer evaluation and Duas memorization review',
    },
    teacherInfo: {
      title: 'Compassionate Islamic Instructors',
      description:
        'Our tutors are certified Qaris and Alimahs dedicated to instilling a deep love for prayer in young students and adult learners.',
      qualifications: ['Certified Islamic Scholar', 'Experienced in teaching reverts and children', 'Bilingual English/Urdu'],
    },
    faqs: [
      {
        question: 'Can this course be taught to a brand-new Muslim who has never prayed before?',
        answer:
          'Yes, absolutely! We have specialized tutors with immense experience guiding new Muslims gently through their very first prayer with full transliteration and visual aids.',
      },
      {
        question: 'Are the differences in prayer posture for sisters covered?',
        answer:
          'Yes, our female Qarias provide specific instruction on Sunnah prayer posture for sisters in complete privacy.',
      },
    ],
    internalLinks: [
      {
        pageId: 'online-islamic-studies',
        anchorText: 'Online Islamic Studies Classes',
        description: 'Explore the broader pillars of Islamic faith and character building.',
      },
      {
        pageId: 'quran-classes-for-kids',
        anchorText: 'Online Quran Classes for Kids',
        description: 'See child-friendly prayer and Quran programs for young learners.',
      },
      {
        pageId: 'noorani-qaida',
        anchorText: 'Learn Noorani Qaida Online',
        description: 'Build Arabic letter pronunciation skills for accurate prayer recitation.',
      },
    ],
    feePKR: 18200,
    feeUSD: 65,
    featuredImage: 'https://images.unsplash.com/photo-1564121211835-e88c852648ab?auto=format&fit=crop&w=1200&q=80',
  },
};
