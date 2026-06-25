import { Course, Teacher, ArabicLetter, Testimonial, FAQItem } from './types';

export const courses: Course[] = [
  {
    id: 'qaida',
    title: 'নূরানী কায়েদা শিক্ষা',
    titleEn: 'Noorani Qaida Education',
    description: 'ছোটদের ও বড়দের জন্য কুরআন শেখার একদম প্রাথমিক ধাপ। হরফ ও উচ্চারণের বিশুদ্ধ বুনিয়াদ তৈরি করা হয়।',
    descriptionEn: 'The absolute starting point of learning the Quran. Builds a strong foundation of Arabic letters and correct pronunciation.',
    iconName: 'BookOpen',
    duration: '৩-৪ মাস (3-4 Months)',
    weeklyClasses: 'সপ্তাহে ৩ দিন (3 Days/Week)',
    details: [
      'আরবি হরফসমূহের সঠিক মাখরাজ ও উচ্চারণ',
      'যুক্তবর্ণ চেনা এবং সহজে পড়ার কৌশল',
      'হরকত, তানভীন ও জযম-এর ব্যবহার',
      'মদ্দের প্রাথমিক নিয়মাবলি',
      'পড়ার গতি বাড়ানোর অনুশীলন'
    ]
  },
  {
    id: 'recitation',
    title: 'শুদ্ধ কুরআন তিলাওয়াত',
    titleEn: 'Correct Quran Recitation',
    description: 'যাঁরা রিডিং পড়তে পারেন কিন্তু উচ্চারণ ও তিলাওয়াত শুদ্ধ নয়, তাঁদের জন্য তিলাওয়াত পরিমার্জন কোর্স।',
    descriptionEn: 'For those who can read but want to perfect their pronunciation, speed, and continuous recitation flow.',
    iconName: 'BookMarked',
    duration: '৪-৬ মাস (4-6 Months)',
    weeklyClasses: 'সপ্তাহে ৩ দিন (3 Days/Week)',
    details: [
      'নাযেরা বা রিডিং পড়ার জড়তা দূর করা',
      'তিলাওয়াতের সঠিক গতি ও সুর বজায় রাখা',
      'কুরআনের যেকোনো স্থান থেকে অনর্গল পড়ার দক্ষতা',
      'ওয়াকফ বা কোথায় থামতে হবে তার নিয়মসমূহ',
      'দৈনন্দিন পড়ার অভ্যাস গড়ে তোলা'
    ]
  },
  {
    id: 'tajweed',
    title: 'তাজবীদ শিক্ষা',
    titleEn: 'Tajweed Rules (Grammar of Recitation)',
    description: 'তিলাওয়াতকে আরও শ্রুতিমধুর ও ব্যাকরণগতভাবে নিখুঁত করতে তাজবীদের খুঁটিনাটি ও নিয়মকানুনের বিশদ অনুশীলন।',
    descriptionEn: 'Deep dive into the rules and grammar of Quranic recitation to make it melodious and structurally flawless.',
    iconName: 'Shield',
    duration: '৩-৫ মাস (3-5 Months)',
    weeklyClasses: 'সপ্তাহে ২-৩ দিন (2-3 Days/Week)',
    details: [
      'নুনে সাকিন ও মীম সাকিন-এর বিস্তারিত নিয়ম (ইযহার, ইদগাম, ইকলাব, ইখফা)',
      'গুন্নাহ করার সঠিক নিয়ম ও স্থায়িত্ব',
      'মদ্দের প্রকারভেদ এবং টানার সময়সীমা',
      'মোটা ও চিকন করে পড়ার হরফসমূহ (পুর ও বারীক)',
      'বাস্তব তিলাওয়াতে তাজবীদের নিয়ম প্রয়োগ'
    ]
  },
  {
    id: 'memorization',
    title: 'সূরা মুখস্থ করানো',
    titleEn: 'Surah Memorization (Hifz)',
    description: 'নামাজে পড়ার জন্য প্রয়োজনীয় ছোট ছোট সূরাসমূহ এবং আল-কুরআনের গুরুত্বপূর্ণ সূরাসমূহ তাজবীদসহ মুখস্থকরণ।',
    descriptionEn: 'Memorize essential Surahs for prayers (Salah) and important Quranic chapters with perfect Tajweed rules.',
    iconName: 'Award',
    duration: 'ব্যক্তিগত গতির উপর নির্ভরশীল (Flexible)',
    weeklyClasses: 'সপ্তাহে ৩ দিন (3 Days/Week)',
    details: [
      'নামাজের ৩০তম পারার শেষ ১০/২০টি সূরা মুখস্থ করা',
      'সূরা ইয়াসিন, আর-রহমান, আল-মুলক ও কাহফ-এর মত গুরুত্বপূর্ণ সূরা',
      'মুখস্থ করা সূরা সহজে মনে রাখার বিশেষ বৈজ্ঞানিক কৌশল',
      'শিক্ষকের কাছে প্রতিদিনের পড়া শোনানো ও সংশোধন',
      'মুখস্থকৃত সূরার অর্থ ও শানে নুযুল সংক্ষেপে জানা'
    ]
  },
  {
    id: 'hadith',
    title: 'হাদিস ও নৈতিকতা শিক্ষা',
    titleEn: 'Hadith & Islamic Ethics',
    description: 'দৈনন্দিন জীবনের প্রয়োজনীয় হাদিসসমূহ অর্থ ও আমলসহ শিক্ষা। চরিত্র গঠন ও নৈতিক মূল্যবোধ জাগ্রত করা।',
    descriptionEn: 'Learn essential Hadiths for daily life, including their practical applications, focusing on character building and ethics.',
    iconName: 'HeartHandshake',
    duration: '৩ মাস (3 Months)',
    weeklyClasses: 'সপ্তাহে ২ দিন (2 Days/Week)',
    details: [
      'রাসূলুল্লাহ (সা.)-এর নির্বাচিত ৫০টি ছোট ও গুরুত্বপূর্ণ হাদিস',
      'দৈনন্দিন সুন্নাহ ও আচার-আচরণ শিক্ষা',
      'পিতামাতা, শিক্ষক ও প্রতিবেশীর প্রতি দায়িত্বসমূহ',
      'সততা, ধৈর্য ও পরোপকারের গুরুত্ব ও বাস্তব আমল',
      'রাসূলুল্লাহ (সা.) ও সাহাবিদের জীবনী থেকে শিক্ষণীয় গল্প'
    ]
  },
  {
    id: 'salah',
    title: 'নামাজ ও প্রয়োজনীয় মাসআলা',
    titleEn: 'Salah & Essential Masail',
    description: 'শুদ্ধরূপে নামাজ আদায়ের নিয়ম, প্রয়োজনীয় দোয়াসমূহ এবং দৈনন্দিন জীবনে পবিত্রতা ও ইবাদতের জরুরি মাসআলা-মাসায়েল।',
    descriptionEn: 'Step-by-step guidance to perfect your prayers, learn mandatory supplications, and understand purity/worship rules.',
    iconName: 'Compass',
    duration: '২-৩ মাস (2-3 Months)',
    weeklyClasses: 'সপ্তাহে ৩ দিন (3 Days/Week)',
    details: [
      'নামাজের রুকন, ওয়াজিব ও সুন্নতসমূহ বিস্তারিত জানা',
      'নামাজের দোয়াসমূহ (সানা, আত্তাহিয়্যাতু, দরূদ, দোয়া মাসূরা) শুদ্ধ উচ্চারণ',
      'ওযু, তায়াম্মুম ও ফরয গোসলের সঠিক নিয়ম ও মাসআলা',
      'নামাজ ভঙ্গের কারণসমূহ এবং সাহু সেজদার নিয়ম',
      'দৈনন্দিন জীবনের প্রয়োজনীয় দোয়াসমূহ (ঘুমানো, খাওয়া, ঘর থেকে বের হওয়া ইত্যাদি)'
    ]
  }
];

export const teachers: Teacher[] = [
  {
    id: 't1',
    name: 'হাফেজ মাওলানা জোবায়ের হোসাইন',
    role: 'সিনিয়র কুরআন ও তাজবীদ শিক্ষক',
    gender: 'male',
    qualification: [
      'দাওরায়ে হাদীস (মাস্টার্স), কওমি মাদ্রাসা বোর্ড',
      'হাফেজ-এ কুরআন (ইন্টারন্যাশনাল হেফজ প্রতিযোগিতা পুরষ্কারপ্রাপ্ত)',
      'ইলমুত তাজবীদ ও ক্বেরাত বিষয়ে ডিপ্লোমা'
    ],
    experience: '৭+ বছর পাঠদানের অভিজ্ঞতা (দেশী ও বিদেশী ছাত্র)',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&fit=crop'
  },
  {
    id: 't2',
    name: 'কারীমা আয়েশা সিদ্দিকা',
    role: 'মহিলা ও শিশুদের জন্য বিশেষ শিক্ষিকা',
    gender: 'female',
    qualification: [
      'কামিল (ইসলামিক স্টাডিজ), ঢাকা আলিয়া',
      'তাজবীদের বিশেষ ইজাজাহ (সনদপ্রাপ্ত)',
      'নূরানী ও শিশু মনস্তত্ত্ব ট্রেনিংপ্রাপ্ত'
    ],
    experience: '৫+ বছর কেবল মহিলা ও শিশু শিক্ষার্থীদের পড়ানোর অভিজ্ঞতা',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&h=200&fit=crop'
  },
  {
    id: 't3',
    name: 'মুফতি আব্দুর রহমান আল-কাদেরী',
    role: 'হাদিস ও ফিকাহ বিশেষজ্ঞ',
    gender: 'male',
    qualification: [
      'ইফতা (ইসলামিক আইন ও ফতোয়া বিভাগ), জামিয়া রাহামানিয়া',
      'ডিপ্লোমা ইন অ্যারাবিক ল্যাঙ্গুয়েজ',
      'আল-আজহারের কারীগণের তত্ত্বাবধানে ক্বেরাত প্রশিক্ষণ'
    ],
    experience: '৬ বছর অনলাইন ও অফলাইন শিক্ষকতার অভিজ্ঞতা',
    avatarUrl: 'https://images.unsplash.com/photo-1628157582853-a796fa650a6a?q=80&w=200&h=200&fit=crop'
  },
  {
    id: 't4',
    name: 'হাফেজা উম্মে কুলসুম',
    role: 'হেফজ ও সূরা মুখস্থ বিষয়ের শিক্ষিকা',
    gender: 'female',
    qualification: [
      'হাফেজা-এ কুরআন (১০ বছর বয়সে হিফজ সম্পন্ন)',
      'কওমিয়া উলা গ্রেড সনদ',
      'অনলাইন টিচিং মেথডোলজি কোর্স সম্পন্ন'
    ],
    experience: '৪ বছর সৌদি আরব ও যুক্তরাজ্যের প্রবাসী বোনদের পাঠদান',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&h=200&fit=crop'
  }
];

export const arabicLetters: ArabicLetter[] = [
  {
    char: 'ا',
    name: 'আলিফ',
    transliteration: 'Alif',
    makhraj: 'মুখের খালি জায়গা থেকে (হলকের শুরু)',
    englishMakhraj: 'Empty space of the mouth (cavity)',
    exampleWord: 'أَنَا (আনা)',
    exampleTranslation: 'আমি (I)',
    audioText: 'Alif'
  },
  {
    char: 'ب',
    name: 'বা',
    transliteration: 'Ba',
    makhraj: 'দুই ঠোঁটের ভিজা অংশ মিলিত হয়ে',
    englishMakhraj: 'Meeting of the wet portion of both lips',
    exampleWord: 'بَيْتٌ (বাইতুন)',
    exampleTranslation: 'ঘর (House)',
    audioText: 'Baa'
  },
  {
    char: 'ت',
    name: 'তা',
    transliteration: 'Ta',
    makhraj: 'জিহ্বার আগা সামনের উপরের দুই দাঁতের গোড়ার সাথে লাগিয়ে',
    englishMakhraj: 'Tip of tongue touching root of top front teeth',
    exampleWord: 'تَاجٌ (তাজুন)',
    exampleTranslation: 'মুকুট (Crown)',
    audioText: 'Taa'
  },
  {
    char: 'ث',
    name: 'ছা',
    transliteration: 'Tha',
    makhraj: 'জিহ্বার আগা সামনের উপরের দুই দাঁতের আগার সাথে লাগিয়ে (নরম করে)',
    englishMakhraj: 'Tip of tongue touching edges of top front teeth (softly)',
    exampleWord: 'ثَوْبٌ (ছাওবুন)',
    exampleTranslation: 'পোশাক (Clothing)',
    audioText: 'Thaa'
  },
  {
    char: 'ج',
    name: 'জীম',
    transliteration: 'Jeem',
    makhraj: 'জিহ্বার মধ্যখান তার বরাবর উপরের তালুর সাথে লাগিয়ে',
    englishMakhraj: 'Center of the tongue touching the palate',
    exampleWord: 'جَمَلٌ (জামালুন)',
    exampleTranslation: 'উট (Camel)',
    audioText: 'Jeem'
  },
  {
    char: 'ح',
    name: 'হা (কণ্ঠনালী)',
    transliteration: 'Ha',
    makhraj: 'কণ্ঠনালীর মধ্যভাগ হতে বাতাস ছেড়ে পরিষ্কার করে',
    englishMakhraj: 'Middle of the throat, clear friction of air',
    exampleWord: 'حُبٌّ (হুব্বুন)',
    exampleTranslation: 'ভালোবাসা (Love)',
    audioText: 'Haa'
  },
  {
    char: 'خ',
    name: 'খ',
    transliteration: 'Kho',
    makhraj: 'কণ্ঠনালীর শুরু হতে (মুখের কাছাকাছি অংশ থেকে)',
    englishMakhraj: 'Beginning of the throat (closest to mouth)',
    exampleWord: 'خُبْزٌ (খুবযুন)',
    exampleTranslation: 'রুটি (Bread)',
    audioText: 'Khoo'
  },
  {
    char: 'د',
    name: 'দাল',
    transliteration: 'Dal',
    makhraj: 'জিহ্বার আগা সামনের উপরের দুই দাঁতের গোড়ার সাথে লাগিয়ে (মোটা নয়)',
    englishMakhraj: 'Tip of tongue touching root of top front teeth',
    exampleWord: 'دِيْنٌ (দীনুন)',
    exampleTranslation: 'ধর্ম (Religion)',
    audioText: 'Daal'
  },
  {
    char: 'ر',
    name: 'র',
    transliteration: 'Ra',
    makhraj: 'জিহ্বার আগার পিঠ তার বরাবর উপরের তালুর সাথে লাগিয়ে',
    englishMakhraj: 'Tip of tongue and its back touching the palate',
    exampleWord: 'رَحْمَةٌ (রাহমাহ)',
    exampleTranslation: 'দয়া (Mercy)',
    audioText: 'Raa'
  },
  {
    char: 'س',
    name: 'সীন',
    transliteration: 'Seen',
    makhraj: 'জিহ্বার আগা সামনের নিচের দুই দাঁতের পেট ও আগার সাথে লাগিয়ে শিস দিয়ে',
    englishMakhraj: 'Tip of tongue touching inner edges of lower front teeth with a whistle',
    exampleWord: 'سَلَامٌ (সালামুন)',
    exampleTranslation: 'শান্তি (Peace)',
    audioText: 'Seen'
  },
  {
    char: 'ص',
    name: 'ছাদ (মোটা)',
    transliteration: 'Saad',
    makhraj: 'সীনের মাখরাজ থেকেই, তবে জিহ্বা তালুর দিকে উঠিয়ে মোটা শিস দিয়ে',
    englishMakhraj: 'Same as Seen, but tongue raised towards palate, heavy whistle',
    exampleWord: 'صَلَاةٌ (সালাহ)',
    exampleTranslation: 'নামাজ (Prayer)',
    audioText: 'Saad'
  },
  {
    char: 'ط',
    name: 'ত্বা',
    transliteration: 'Toa',
    makhraj: 'জিহ্বার আগা উপরের দাঁতের গোড়ার সাথে লাগিয়ে জিহ্বাকে তালুর সাথে লেপ্টে',
    englishMakhraj: 'Tip of tongue touching root of top teeth, tongue fully raised',
    exampleWord: 'طَيِّبٌ (তইয়্যিবুন)',
    exampleTranslation: 'উত্তম (Pure)',
    audioText: 'Toaa'
  },
  {
    char: 'ع',
    name: 'আইন',
    transliteration: 'Ayn',
    makhraj: 'কণ্ঠনালীর মধ্যভাগ হতে কণ্ঠ চেপে উচ্চারণ করতে হয়',
    englishMakhraj: 'Middle of the throat with slight constriction',
    exampleWord: 'عِلْمٌ (ইলমুন)',
    exampleTranslation: 'জ্ঞান (Knowledge)',
    audioText: 'Ayn'
  },
  {
    char: 'ق',
    name: 'ক্বফ (মোটা)',
    transliteration: 'Qaf',
    makhraj: 'জিহ্বার গোড়া তার বরাবর উপরের নরম তালুর সাথে লাগিয়ে',
    englishMakhraj: 'Root of tongue touching the soft palate (deep and heavy)',
    exampleWord: 'قُرْآنٌ (কুরআন)',
    exampleTranslation: 'কুরআন (Quran)',
    audioText: 'Qaaf'
  }
];

export const testimonials: Testimonial[] = [
  {
    id: 'tes1',
    author: 'মোহাম্মদ তারেক হোসেন',
    relation: 'যুক্তরাজ্য প্রবাসী অভিভাবক',
    location: 'লন্ডন, ইউকে (London, UK)',
    text: 'আমার ৭ বছরের ছেলের জন্য এমন একজন শিক্ষক খুঁজছিলাম যিনি পরম যত্নে নূরানী কায়দা পড়াবেন। এই একাডেমির কারীমা আপা খুবই যত্ন সহকারে ক্লাস নেন। বাচ্চার উচ্চারণ অনেক সুন্দর হয়েছে। আলহামদুলিল্লাহ!',
    rating: 5
  },
  {
    id: 'tes2',
    author: 'তাসমিয়া আহমেদ ফারহিন',
    relation: 'বিশ্ববিদ্যালয় শিক্ষার্থী ও ছাত্রী',
    location: 'ঢাকা, বাংলাদেশ (Dhaka)',
    text: 'নিজে কুরআন পড়তে পারলেও তাজবীদ সম্পর্কে কোনো ধারণা ছিল না। এই একাডেমির তাজবীদ কোর্সে ভর্তি হয়ে এখন চমৎকার গুন্নাহ ও মদ্দের সাথে সুমধুর কণ্ঠে তিলাওয়াত করতে পারছি। আল্লাহর অশেষ রহমত।',
    rating: 5
  },
  {
    id: 'tes3',
    author: 'আব্দুল্লাহ বিন সাঈদ',
    relation: 'কানাডা প্রবাসী পেশাজীবী',
    location: 'টরন্টো, কানাডা (Toronto)',
    text: 'ব্যস্ত কর্মজীবনের মাঝে নিজের সময় সুবিধামত রাত ১০টায় ক্লাস করার সুযোগ পাওয়ায় আমার জন্য কুরআন রিভিশন দেওয়া ও সহীহ করা খুব সহজ হয়েছে। শিক্ষক অত্যন্ত ধৈর্যশীল। জাযাকাল্লাহু খাইরান।',
    rating: 5
  }
];

export const faqs: FAQItem[] = [
  {
    question: 'ক্লাসগুলো কিভাবে নেওয়া হয়?',
    questionEn: 'How are the classes conducted?',
    answer: 'অনলাইনে অত্যন্ত সহজে Zoom অথবা Google Meet-এর মাধ্যমে লাইভ ওয়ান-টু-ওয়ান (১ জন ছাত্রের জন্য ১ জন শিক্ষক) ক্লাস নেওয়া হয়। এতে শিক্ষক কেবল আপনার বা আপনার বাচ্চার পড়ার দিকেই পূর্ণ মনোযোগ দিতে পারেন।',
    answerEn: 'Classes are conducted online via Zoom or Google Meet on a live 1-to-1 basis (one teacher for one student). This ensures personal attention and customized learning speed.'
  },
  {
    question: 'ক্লাসের সময়সূচী কিভাবে নির্ধারিত হয়?',
    questionEn: 'How is the class schedule determined?',
    answer: 'আপনার বা আপনার বাচ্চার সময় অনুযায়ী সুবিধাজনক দিনে ও সময়ে ক্লাসের শিডিউল নির্ধারণ করা হয়। বিশ্বের যেকোনো টাইমজোন থেকেই ক্লাস বুকিং করা সম্ভব।',
    answerEn: 'Classes are scheduled at your convenient days and times. Students from any timezone in the world can easily select their comfortable slot.'
  },
  {
    question: 'মহিলা শিক্ষার্থীদের জন্য মহিলা শিক্ষক আছেন কি?',
    questionEn: 'Are female teachers available for female students?',
    answer: 'হ্যাঁ, আমাদের একাডেমিতে অত্যন্ত অভিজ্ঞ, পর্দানশীন ও দক্ষ হাফেজা ও কারীমা শিক্ষিকা রয়েছেন, যাঁরা প্রবাসের বোনদের ও ছোট বাচ্চাদের জন্য পরম স্নেহে ক্লাস নেন।',
    answerEn: 'Yes, we have highly experienced, certified, and qualified female Hafiza/Qariyah teachers specifically for female students and young children.'
  },
  {
    question: 'ভর্তি ফি বা কোর্স ফি কত?',
    questionEn: 'What is the course fee structure?',
    answer: 'সাপ্তাহিক ক্লাসের সংখ্যা এবং শিক্ষার্থীর বয়সের উপর নির্ভর করে মাসিক ফি নির্ধারণ করা হয়। যেকোনো কোর্সের শুরুতে একটি সম্পূর্ণ "ফ্রি ট্রায়াল" ক্লাস করার সুযোগ রয়েছে যাতে পড়াশোনার মান সরাসরি যাচাই করতে পারেন। বিস্তারিত জানতে আমাদের হোয়াটসঅ্যাপে যোগাযোগ করুন।',
    answerEn: 'Fees are calculated monthly based on the number of weekly classes and course types. We offer a 100% Free Trial Class for everyone to experience the quality firsthand before paying.'
  },
  {
    question: 'বাচ্চাদের কুরআন শেখাতে ন্যূনতম বয়স কত হতে হবে?',
    questionEn: 'What is the minimum age for kids to start?',
    answer: 'সাধারণত ৪.৫ বা ৫ বছর বয়স থেকে বাচ্চারা আমাদের নূরানী কায়দা কোর্সে ভর্তি হতে পারে। আমাদের শিক্ষকরা বাচ্চাদের সাথে খেলতে খেলতে মনোরম উপায়ে হরফ মুখস্থ করিয়ে দেন।',
    answerEn: 'Children can start from 4.5 to 5 years of age. Our teachers are trained in child psychology to make Arabic alphabet learning fun, playful, and highly engaging.'
  }
];
