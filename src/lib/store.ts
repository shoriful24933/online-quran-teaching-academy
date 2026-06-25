import { Course, Teacher, Testimonial, FAQItem, Registration, User } from '../types';
import { courses as defaultCourses, teachers as defaultTeachers, testimonials as defaultTestimonials, faqs as defaultFaqs } from '../data';

// Interfaces for custom translation schema
export interface CustomTranslations {
  heroTitleBn: string;
  heroTitleEn: string;
  heroSubtitleBn: string;
  heroSubtitleEn: string;
  heroDescBn: string;
  heroDescEn: string;
  btnHeroTrialBn: string;
  btnHeroTrialEn: string;
  whatsappNumber: string; // e.g., "8801959865742" or a full WhatsApp link
  advTitleBn: string;
  advTitleEn: string;
  advSubtitleBn: string;
  advSubtitleEn: string;
  adv1TitleBn: string;
  adv1TitleEn: string;
  adv1DescBn: string;
  adv1DescEn: string;
  adv2TitleBn: string;
  adv2TitleEn: string;
  adv2DescBn: string;
  adv2DescEn: string;
  adv3TitleBn: string;
  adv3TitleEn: string;
  adv3DescBn: string;
  adv3DescEn: string;
  adv4TitleBn: string;
  adv4TitleEn: string;
  adv4DescBn: string;
  adv4DescEn: string;
  coursesTitleBn: string;
  coursesTitleEn: string;
  coursesSubtitleBn: string;
  coursesSubtitleEn: string;
  teachersTitleBn: string;
  teachersTitleEn: string;
  teachersSubtitleBn: string;
  teachersSubtitleEn: string;
  ctaTitleBn: string;
  ctaTitleEn: string;
  ctaDescBn: string;
  ctaDescEn: string;
  ctaBtnBn: string;
  ctaBtnEn: string;
  testimonialTitleBn: string;
  testimonialTitleEn: string;
  testimonialSubtitleBn: string;
  testimonialSubtitleEn: string;
  faqTitleBn: string;
  faqTitleEn: string;
  faqSubtitleBn: string;
  faqSubtitleEn: string;
}

export const defaultTranslations: CustomTranslations = {
  heroTitleBn: 'শিখুন • বুঝুন • কুরআনের আলোকে জীবন গড়ুন',
  heroTitleEn: 'Learn • Understand • Live by Quran',
  heroSubtitleBn: 'অনলাইন কুরআন টিচিং একাডেমি',
  heroSubtitleEn: 'Online Quran Teaching Academy',
  heroDescBn: 'তাজবীদ ও সহীহ উচ্চারণের সাথে পবিত্র কুরআনুল কারীম তিলাওয়াত শিখুন। অভিজ্ঞ পুরুষ ও মহিলা শিক্ষকদের সাথে ওয়ান-টু-ওয়ান (১:১) স্পেশাল লাইভ ক্লাস। বিশ্বের যেকোনো দেশ থেকে আপনার সুবিধাজনক সময়ে ক্লাস করার সুযোগ।',
  heroDescEn: 'Learn to recite the Holy Quran with perfect Tajweed rules and pristine pronunciation. Exclusive 1-to-1 live classes with certified male and female scholars. Flexible timings from anywhere in the world.',
  btnHeroTrialBn: 'আজই ফ্রি ট্রায়াল ক্লাস নিন',
  btnHeroTrialEn: 'Book a Free Trial Session',
  whatsappNumber: '8801959865742',
  advTitleBn: 'কেন আমাদের অনলাইন একাডেমিতে শিখবেন?',
  advTitleEn: 'Why Choose Our Online Academy?',
  advSubtitleBn: 'আমাদের একাডেমির বিশেষ সুবিধাসমূহ যা আমাদের অনন্য করে তুলেছে।',
  advSubtitleEn: 'The unique features and methodologies that make us the best choice for you.',
  adv1TitleBn: 'অভিজ্ঞ পুরুষ ও মহিলা শিক্ষক',
  adv1TitleEn: 'Experienced Male & Female Teachers',
  adv1DescBn: 'সহীহ তাজবীদ ট্রেনিংপ্রাপ্ত দক্ষ পুরুষ ও পর্দাময়ী হাফেজা শিক্ষিকাগণ শিক্ষার্থীদের সর্বোচ্চ যত্নে পড়ান।',
  adv1DescEn: 'Certified, respectful male and veil-observing female Hafiza scholars to teach students with custom care.',
  adv2TitleBn: 'বিশ্বের যেকোনো স্থান থেকে ক্লাস',
  adv2TitleEn: 'Accessible Worldwide',
  adv2DescBn: 'বাংলাদেশ, মধ্যপ্রাচ্য, ইউরোপ, আমেরিকা ও কানাডা প্রবাসী শিক্ষার্থীরা টাইমজোন মিলিয়ে ক্লাসে অংশ নিতে পারেন।',
  adv2DescEn: 'Tailored for students living globally in the UK, USA, Canada, Middle East, Europe, or Bangladesh.',
  adv3TitleBn: 'সুবিধাজনক সময় ও শিডিউল',
  adv3TitleEn: 'Convenient Dynamic Scheduling',
  adv3DescBn: 'আপনার নিজের বা সন্তানের পড়াশোনা ও কাজের ফাঁকে অবসর অনুযায়ী যেকোনো দিন যেকোনো সময় শিডিউল নির্বাচন করতে পারেন।',
  adv3DescEn: 'Choose your preferred days and times that perfectly fit your work, school, or personal schedules.',
  adv4TitleBn: 'ওয়ান-টু-ওয়ান স্পেশাল কেয়ার',
  adv4TitleEn: 'Personal 1-to-1 Care',
  adv4DescBn: '১ জন ছাত্রের জন্য ১ জন শিক্ষক নির্ধারিত থাকায় পড়ার গভীরতা ও দুর্বলতা অনুযায়ী সরাসরি পাঠদান সম্ভব হয়।',
  adv4DescEn: 'A dedicated teacher for every student guarantees individualized learning pace and comprehensive attention.',
  coursesTitleBn: 'আমাদের কোর্সসমূহ',
  coursesTitleEn: 'Our Specialized Courses',
  coursesSubtitleBn: 'শিক্ষার্থীর প্রয়োজন ও বয়স অনুযায়ী বিশেষভাবে তৈরি অনলাইন কোর্সসমূহ',
  coursesSubtitleEn: 'Specially structured syllabus for children, beginners, and advanced learners alike.',
  teachersTitleBn: 'আমাদের শিক্ষক মণ্ডলী',
  teachersTitleEn: 'Our Certified Faculty',
  teachersSubtitleBn: 'কুরআন ও হাদিসের দীক্ষায় আলোকিত ও আন্তর্জাতিক ইজাজাহপ্রাপ্ত হাফেজ ও কারীগণ',
  teachersSubtitleEn: 'Meet our highly qualified Islamic scholars holding verified recitation licenses (Ijazah).',
  ctaTitleBn: 'কুরআন শেখার পবিত্র যাত্রা শুরু হোক আজই!',
  ctaTitleEn: 'Begin Your Spiritual Journey Today!',
  ctaDescBn: 'আপনার সুবিধাজনক সময়ে একটি ফ্রি ডেমো ট্রায়াল ক্লাস বুক করুন। কোনো অগ্রিম ফি লাগবে না।',
  ctaDescEn: 'Schedule a completely free trial lesson to assess our classes firsthand. No advance payment is needed.',
  ctaBtnBn: 'ফ্রি ট্রায়াল ক্লাস বুক করুন',
  ctaBtnEn: 'Book Your Free Demo Now',
  testimonialTitleBn: 'শিক্ষার্থী ও অভিভাবকদের মতামত',
  testimonialTitleEn: 'Student & Parent Testimonials',
  testimonialSubtitleBn: 'বিশ্বের বিভিন্ন প্রান্ত থেকে আমাদের শিক্ষার্থীদের বাস্তব অভিজ্ঞতা ও অনুপ্রেরণা',
  testimonialSubtitleEn: 'Hear what our students and parents globally say about their Quranic learning experience.',
  faqTitleBn: 'সাধারণ জিজ্ঞাসাসমূহ (FAQ)',
  faqTitleEn: 'Frequently Asked Questions (FAQ)',
  faqSubtitleBn: 'অনলাইন কুরআন ক্লাস ও অ্যাকাডেমি সম্পর্কে যেকোনো প্রশ্নের উত্তর জেনে নিন',
  faqSubtitleEn: 'Frequently asked questions about our classes and teaching methodologies.',
};

// Admin Password Management
export function getAdminPassword(): string {
  try {
    const saved = localStorage.getItem('academy_admin_password');
    return saved || 'quran123';
  } catch (e) {
    return 'quran123';
  }
}

export function saveAdminPassword(password: string): void {
  try {
    localStorage.setItem('academy_admin_password', password);
  } catch (e) {
    console.error(e);
  }
}

// User Registration & Login Storage
export function getRegisteredUsers(): User[] {
  try {
    const saved = localStorage.getItem('academy_registered_users');
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    return [];
  }
}

export function saveRegisteredUsers(users: User[]): void {
  try {
    localStorage.setItem('academy_registered_users', JSON.stringify(users));
  } catch (e) {
    console.error(e);
  }
}

export function getLoggedInUser(): User | null {
  try {
    const saved = localStorage.getItem('academy_current_user');
    return saved ? JSON.parse(saved) : null;
  } catch (e) {
    return null;
  }
}

export function saveLoggedInUser(user: User | null): void {
  try {
    if (user) {
      localStorage.setItem('academy_current_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('academy_current_user');
    }
  } catch (e) {
    console.error(e);
  }
}

// Site Translations Custom Content Storage
export function getCustomTranslations(): CustomTranslations {
  try {
    const saved = localStorage.getItem('academy_custom_translations');
    if (saved) {
      const parsed = JSON.parse(saved);
      return { ...defaultTranslations, ...parsed };
    }
    return defaultTranslations;
  } catch (e) {
    return defaultTranslations;
  }
}

export function saveCustomTranslations(translations: CustomTranslations): void {
  try {
    localStorage.setItem('academy_custom_translations', JSON.stringify(translations));
  } catch (e) {
    console.error(e);
  }
}

// Customizable Lists Storage
export function getCustomCourses(): Course[] {
  try {
    const saved = localStorage.getItem('academy_custom_courses');
    return saved ? JSON.parse(saved) : defaultCourses;
  } catch (e) {
    return defaultCourses;
  }
}

export function saveCustomCourses(courses: Course[]): void {
  try {
    localStorage.setItem('academy_custom_courses', JSON.stringify(courses));
  } catch (e) {
    console.error(e);
  }
}

export function getCustomTeachers(): Teacher[] {
  try {
    const saved = localStorage.getItem('academy_custom_teachers');
    return saved ? JSON.parse(saved) : defaultTeachers;
  } catch (e) {
    return defaultTeachers;
  }
}

export function saveCustomTeachers(teachers: Teacher[]): void {
  try {
    localStorage.setItem('academy_custom_teachers', JSON.stringify(teachers));
  } catch (e) {
    console.error(e);
  }
}

export function getCustomTestimonials(): Testimonial[] {
  try {
    const saved = localStorage.getItem('academy_custom_testimonials');
    return saved ? JSON.parse(saved) : defaultTestimonials;
  } catch (e) {
    return defaultTestimonials;
  }
}

export function saveCustomTestimonials(testimonials: Testimonial[]): void {
  try {
    localStorage.setItem('academy_custom_testimonials', JSON.stringify(testimonials));
  } catch (e) {
    console.error(e);
  }
}

export function getCustomFaqs(): FAQItem[] {
  try {
    const saved = localStorage.getItem('academy_custom_faqs');
    return saved ? JSON.parse(saved) : defaultFaqs;
  } catch (e) {
    return defaultFaqs;
  }
}

export function saveCustomFaqs(faqs: FAQItem[]): void {
  try {
    localStorage.setItem('academy_custom_faqs', JSON.stringify(faqs));
  } catch (e) {
    console.error(e);
  }
}

// Google Drive Pre-loaded/Mocked Files and Persistence
import { DriveFile } from '../types';

export const defaultDriveFiles: DriveFile[] = [
  {
    id: 'file_1',
    name: 'Noorani Qaida (Tajweed Basics).pdf',
    mimeType: 'application/pdf',
    size: '4.8 MB',
    modifiedTime: '2026-06-20T10:00:00.000Z',
    isVirtual: true,
    category: 'qaida'
  },
  {
    id: 'file_2',
    name: 'Tajweed Rules Guide (with Pronunciation).pdf',
    mimeType: 'application/pdf',
    size: '2.4 MB',
    modifiedTime: '2026-06-21T14:30:00.000Z',
    isVirtual: true,
    category: 'book'
  },
  {
    id: 'file_3',
    name: 'Juz Amma (Arabic & Bangla Translation).pdf',
    mimeType: 'application/pdf',
    size: '12.1 MB',
    modifiedTime: '2026-06-19T09:15:00.000Z',
    isVirtual: true,
    category: 'book'
  },
  {
    id: 'file_4',
    name: 'Surah Al-Fatihah Audio Practice.mp3',
    mimeType: 'audio/mpeg',
    size: '1.8 MB',
    modifiedTime: '2026-06-22T11:45:00.000Z',
    isVirtual: true,
    category: 'audio'
  },
  {
    id: 'file_5',
    name: 'Quran Class Schedule & Progress Tracker.xlsx',
    mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    size: '142 KB',
    modifiedTime: '2026-06-24T16:20:00.000Z',
    isVirtual: true,
    category: 'progress'
  },
  {
    id: 'file_6',
    name: 'Weekly Tajweed Homework Assignment.pdf',
    mimeType: 'application/pdf',
    size: '850 KB',
    modifiedTime: '2026-06-24T18:00:00.000Z',
    isVirtual: true,
    category: 'homework'
  },
  {
    id: 'doc_1',
    name: 'Class Notes - Surah Al-Mulk Tajweed',
    mimeType: 'application/vnd.google-apps.document',
    size: '12 KB',
    modifiedTime: '2026-06-24T10:00:00.000Z',
    isVirtual: true,
    category: 'docs',
    content: `<h1>Memorization & Tajweed Study Notes</h1>
<p><strong>Date:</strong> June 24, 2026</p>
<p><strong>Student:</strong> Safwan Ahmed</p>
<p><strong>Teacher:</strong> Hafez Mawlana Yusuf</p>

<h2>📖 Current Progress:</h2>
<ul>
  <li>Surah Al-Mulk (Ayat 1-5) - Memorization and Pronunciation check.</li>
</ul>

<h2>📝 Tajweed Pronunciation Points to Focus On:</h2>
<ul>
  <li>Watch out for the <strong>Madd</strong> length in Ayat 3 (six counts).</li>
  <li>Practice the heavy, rounded sound of the letter <strong>Qaf (ق)</strong> without spilling into Kaaf.</li>
  <li>Keep the nasalization (Ghunnah) clear for 2 beats during <strong>Idgham Meem-Mutamathilayn</strong>.</li>
</ul>

<h2>🏠 Homework Assignment:</h2>
<ul>
  <li>Recite Ayat 1-5 ten times daily using the Surah Al-Mulk audio guide.</li>
  <li>Read Noorani Qaida Page 12 lines 3-5 to perfect heavy letters.</li>
</ul>`
  },
  {
    id: 'doc_2',
    name: 'Makharij Pronunciation Reference Sheet',
    mimeType: 'application/vnd.google-apps.document',
    size: '18 KB',
    modifiedTime: '2026-06-25T11:20:00.000Z',
    isVirtual: true,
    category: 'docs',
    content: `<h1>Makharij Pronunciation Reference Guide</h1>
<p>This reference sheet contains the 17 Makharij (points of articulation) for the Arabic letters, helping you perfect your Holy Quran recitation.</p>

<h2>🗣️ The Throat Letters (Halqiyyah)</h2>
<p>There are 6 throat letters categorized by the part of the throat they originate from:</p>
<table border="1" cellpadding="5" style="border-collapse: collapse; width: 100%;">
  <tr style="background-color: #f3f4f6;">
    <th>Throat Section</th>
    <th>Letters</th>
    <th>Pronunciation Notes</th>
  </tr>
  <tr>
    <td><strong>Bottom (Aqsal-Halq)</strong></td>
    <td>Hamzah (ء) & Haa (ه)</td>
    <td>Produced closest to the chest. Deep air release.</td>
  </tr>
  <tr>
    <td><strong>Middle (Wast-Halq)</strong></td>
    <td>'Ayn (ع) & Haa (ح)</td>
    <td>Requires throat squeeze. Clear, sharp, crisp sound.</td>
  </tr>
  <tr>
    <td><strong>Top (Adnal-Halq)</strong></td>
    <td>Ghayn (غ) & Khaa (خ)</td>
    <td>Slightly scraping sound near the mouth. Heavy letters.</td>
  </tr>
</table>

<h2>✨ Study Reminder:</h2>
<p>Always practice in front of a mirror or record your recitation to compare it with your teacher's feedback.</p>`
  }
];

export function getDriveFiles(): DriveFile[] {
  try {
    const saved = localStorage.getItem('academy_drive_files');
    return saved ? JSON.parse(saved) : defaultDriveFiles;
  } catch (e) {
    return defaultDriveFiles;
  }
}

export function saveDriveFiles(files: DriveFile[]): void {
  try {
    localStorage.setItem('academy_drive_files', JSON.stringify(files));
  } catch (e) {
    console.error(e);
  }
}

