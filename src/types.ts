export interface Course {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  iconName: string;
  details: string[];
  duration: string;
  weeklyClasses: string;
}

export interface Teacher {
  id: string;
  name: string;
  role: string;
  gender: 'male' | 'female';
  qualification: string[];
  experience: string;
  avatarUrl: string;
}

export interface ArabicLetter {
  char: string;
  name: string;
  transliteration: string;
  makhraj: string; // Place of articulation
  englishMakhraj: string;
  exampleWord: string;
  exampleTranslation: string;
  audioText: string; // For Web Speech API synthesis
}

export interface Registration {
  id: string;
  studentName: string;
  parentName?: string;
  age: number;
  phone: string;
  courseId: string;
  teacherPreference: 'male' | 'female' | 'any';
  preferredTime: string;
  whatsappSubmitted: boolean;
  createdAt: string;
}

export interface Testimonial {
  id: string;
  author: string;
  relation: string; // e.g., "Student", "Parent of Safwan"
  location: string;
  text: string;
  rating: number;
}

export interface FAQItem {
  question: string;
  questionEn: string;
  answer: string;
  answerEn: string;
}

export interface User {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  registeredAt: string;
  password?: string;
}

export interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  size?: string;
  modifiedTime?: string;
  webViewLink?: string;
  thumbnailLink?: string;
  isVirtual?: boolean;
  category?: 'book' | 'qaida' | 'progress' | 'homework' | 'audio' | 'docs' | 'other';
  content?: string;
}


