import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  ArrowRight, 
  Clock, 
  Sparkles, 
  Star, 
  BookOpen, 
  Users, 
  CheckCircle2, 
  ChevronDown, 
  Globe, 
  Award, 
  ShieldCheck, 
  ChevronRight,
  BookMarked
} from 'lucide-react';

// Subcomponents
import Header from './components/Header';
import CourseCard from './components/CourseCard';
import LetterBoard from './components/LetterBoard';
import RegistrationForm from './components/RegistrationForm';
import AdminPanel from './components/AdminPanel';
import UserAuthModal from './components/UserAuthModal';
import DriveHub from './components/DriveHub';
import academyLogo from './assets/images/academy_logo_1782376836871.jpg';
import Footer from './components/Footer';

// Data Helpers from Store
import { 
  getCustomTranslations, 
  getCustomCourses, 
  getCustomTeachers, 
  getCustomFaqs, 
  getCustomTestimonials,
  getLoggedInUser, 
  saveLoggedInUser 
} from './lib/store';
import { User } from './types';

export default function App() {
  const [lang, setLang] = React.useState<'bn' | 'en'>('bn');
  const [showAdmin, setShowAdmin] = React.useState(false);
  const [showAuth, setShowAuth] = React.useState(false);
  const [showDrive, setShowDrive] = React.useState(false);
  const [preselectedCourse, setPreselectedCourse] = React.useState('');
  const [activeFaq, setActiveFaq] = React.useState<number | null>(null);

  // Dynamic content state
  const [currentUser, setCurrentUser] = React.useState<User | null>(null);
  const [siteTranslations, setSiteTranslations] = React.useState(getCustomTranslations());
  const [coursesList, setCoursesList] = React.useState(getCustomCourses());
  const [teachersList, setTeachersList] = React.useState(getCustomTeachers());
  const [faqsList, setFaqsList] = React.useState(getCustomFaqs());
  const [testimonialsList, setTestimonialsList] = React.useState(getCustomTestimonials());

  React.useEffect(() => {
    loadContent();
  }, []);

  const loadContent = () => {
    setCurrentUser(getLoggedInUser());
    setSiteTranslations(getCustomTranslations());
    setCoursesList(getCustomCourses());
    setTeachersList(getCustomTeachers());
    setFaqsList(getCustomFaqs());
    setTestimonialsList(getCustomTestimonials());
  };

  const handleLogout = () => {
    saveLoggedInUser(null);
    setCurrentUser(null);
  };

  const handleAuthSuccess = (user: User) => {
    setCurrentUser(user);
    // Reload registrations or updates if necessary
    loadContent();
  };

  const handleBookCourse = (courseId: string) => {
    setPreselectedCourse(courseId);
    // Smooth scroll to registration section
    const element = document.getElementById('registration_section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleClearPreselectedCourse = () => {
    setPreselectedCourse('');
  };

  const t = {
    bn: {
      heroTitle: siteTranslations.heroTitleBn,
      heroSubtitle: siteTranslations.heroSubtitleBn,
      heroDesc: siteTranslations.heroDescBn,
      btnHeroTrial: siteTranslations.btnHeroTrialBn,
      btnHeroWhatsapp: 'হোয়াটসঅ্যাপে যোগাযোগ',
      advTitle: siteTranslations.advTitleBn,
      advSubtitle: siteTranslations.advSubtitleBn,
      adv1Title: siteTranslations.adv1TitleBn,
      adv1Desc: siteTranslations.adv1DescBn,
      adv2Title: siteTranslations.adv2TitleBn,
      adv2Desc: siteTranslations.adv2DescBn,
      adv3Title: siteTranslations.adv3TitleBn,
      adv3Desc: siteTranslations.adv3DescBn,
      adv4Title: siteTranslations.adv4TitleBn,
      adv4Desc: siteTranslations.adv4DescBn,
      coursesTitle: siteTranslations.coursesTitleBn,
      coursesSubtitle: siteTranslations.coursesSubtitleBn,
      teachersTitle: siteTranslations.teachersTitleBn,
      teachersSubtitle: siteTranslations.teachersSubtitleBn,
      ctaTitle: siteTranslations.ctaTitleBn,
      ctaDesc: siteTranslations.ctaDescBn,
      ctaBtn: siteTranslations.ctaBtnBn,
      testimonialTitle: siteTranslations.testimonialTitleBn,
      testimonialSubtitle: siteTranslations.testimonialSubtitleBn,
      faqTitle: siteTranslations.faqTitleBn,
      faqSubtitle: siteTranslations.faqSubtitleBn,
    },
    en: {
      heroTitle: siteTranslations.heroTitleEn,
      heroSubtitle: siteTranslations.heroSubtitleEn,
      heroDesc: siteTranslations.heroDescEn,
      btnHeroTrial: siteTranslations.btnHeroTrialEn,
      btnHeroWhatsapp: 'Connect via WhatsApp',
      advTitle: siteTranslations.advTitleEn,
      advSubtitle: siteTranslations.advSubtitleEn,
      adv1Title: siteTranslations.adv1TitleEn,
      adv1Desc: siteTranslations.adv1DescEn,
      adv2Title: siteTranslations.adv2TitleEn,
      adv2Desc: siteTranslations.adv2DescEn,
      adv3Title: siteTranslations.adv3TitleEn,
      adv3Desc: siteTranslations.adv3DescEn,
      adv4Title: siteTranslations.adv4TitleEn,
      adv4Desc: siteTranslations.adv4DescEn,
      coursesTitle: siteTranslations.coursesTitleEn,
      coursesSubtitle: siteTranslations.coursesSubtitleEn,
      teachersTitle: siteTranslations.teachersTitleEn,
      teachersSubtitle: siteTranslations.teachersSubtitleEn,
      ctaTitle: siteTranslations.ctaTitleEn,
      ctaDesc: siteTranslations.ctaDescEn,
      ctaBtn: siteTranslations.ctaBtnEn,
      testimonialTitle: siteTranslations.testimonialTitleEn,
      testimonialSubtitle: siteTranslations.testimonialSubtitleEn,
      faqTitle: siteTranslations.faqTitleEn,
      faqSubtitle: siteTranslations.faqSubtitleEn,
    }
  };


  return (
    <div className="min-h-screen flex flex-col font-sans relative overflow-hidden bg-emerald-50" id="academy_app_root">
      {/* Natural Tones Decorative Ambient Elements */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-100 rounded-full -mr-32 -mt-32 opacity-50 pointer-events-none z-0" />
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-emerald-950/5 rounded-full -ml-48 -mb-48 opacity-20 pointer-events-none z-0" />

      {/* Dynamic Header */}
      <Header 
        lang={lang} 
        setLang={setLang} 
        onAdminClick={() => setShowAdmin(true)} 
        currentUser={currentUser}
        onAuthClick={() => setShowAuth(true)}
        onLogout={handleLogout}
        onDriveClick={() => setShowDrive(true)}
      />

      {/* Hero Section */}
      <section className="relative bg-emerald-950 text-white pt-12 pb-20 sm:pt-20 sm:pb-28 overflow-hidden" id="hero_section">
        {/* Abstract shapes & visual glow */}
        <div className="absolute top-0 right-0 w-[45%] h-[45%] bg-gold-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[30%] h-[40%] bg-emerald-800/20 rounded-full blur-3xl" />
        
        {/* Decorative Grid backdrop */}
        <div className="absolute inset-0 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Text info */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center space-x-1.5 bg-gold-500/10 border border-gold-500/20 px-4 py-1.5 rounded-full"
              >
                <Sparkles className="h-4 w-4 text-gold-400" />
                <span className="text-xs sm:text-sm font-bold text-gold-400 uppercase tracking-wider">
                  {t[lang].heroSubtitle}
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-3xl sm:text-4xl md:text-5.5xl font-serif font-bold text-white tracking-tight leading-tight"
              >
                {t[lang].heroTitle}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-emerald-100/80 text-sm sm:text-base md:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed"
              >
                {t[lang].heroDesc}
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
              >
                <button
                  onClick={() => handleBookCourse('')}
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-500 text-emerald-950 font-extrabold px-7 py-4 rounded-full shadow-lg shadow-gold-500/10 hover:shadow-gold-500/20 hover:scale-102 active:scale-98 transition-all"
                  id="hero_btn_demo"
                >
                  <span>{t[lang].btnHeroTrial}</span>
                  <ArrowRight className="h-4.5 w-4.5" />
                </button>

                <a
                  href={`https://wa.me/${siteTranslations.whatsappNumber.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 border border-emerald-700/60 bg-emerald-900/30 hover:bg-emerald-900/60 text-emerald-100 hover:text-white font-bold px-7 py-4 rounded-full active:scale-98 transition-all"
                  id="hero_btn_whatsapp"
                >
                  <Phone className="h-4.5 w-4.5 text-gold-500" />
                  <span>{t[lang].btnHeroWhatsapp}</span>
                </a>
              </motion.div>

              {/* Instant Social proof stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="pt-6 border-t border-emerald-900/40 grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0"
              >
                <div>
                  <span className="block text-xl sm:text-2xl font-extrabold text-gold-400">১০০%</span>
                  <span className="block text-[10px] sm:text-xs text-emerald-200/70">{lang === 'bn' ? 'ফ্রি ওয়ান-টু-ওয়ান ট্রায়াল' : 'Free Trial Class'}</span>
                </div>
                <div>
                  <span className="block text-xl sm:text-2xl font-extrabold text-gold-400">১:১</span>
                  <span className="block text-[10px] sm:text-xs text-emerald-200/70">{lang === 'bn' ? 'নির্ধারিত শিক্ষক যত্ন' : 'Personal 1-1 Care'}</span>
                </div>
                <div>
                  <span className="block text-xl sm:text-2xl font-extrabold text-gold-400">২৪/৭</span>
                  <span className="block text-[10px] sm:text-xs text-emerald-200/70">{lang === 'bn' ? 'হোয়াটসঅ্যাপ সাপোর্ট' : 'WhatsApp Support'}</span>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Visual Callout (Book Illustration/Quran design) */}
            <div className="lg:col-span-5 flex justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative w-full max-w-sm sm:max-w-md bg-gradient-to-b from-emerald-900 to-emerald-950 p-6 sm:p-8 rounded-3xl border border-emerald-800 shadow-2xl overflow-hidden text-center"
              >
                {/* Visual patterns */}
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-gold-400 to-emerald-600" />
                <div className="absolute bottom-[-50px] right-[-50px] w-48 h-48 bg-gold-500/5 rounded-full blur-2xl" />

                <div className="border border-emerald-800/60 rounded-2xl py-8 px-4 relative z-10 flex flex-col items-center">
                  <div className="w-28 h-28 bg-white border-2 border-gold-400 text-gold-400 rounded-full flex items-center justify-center mb-6 shadow-xl overflow-hidden">
                    <img 
                      src={academyLogo} 
                      alt="Online Quran Teaching Academy Logo" 
                      className="w-full h-full object-cover scale-110"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  
                  {/* Arabic calligraphy placeholder visual */}
                  <span className="arabic-text text-4xl sm:text-5xl text-gold-400 block tracking-wider leading-relaxed my-2 select-none">
                    اقْرَأْ بِاسْمِ رَبِّكَ
                  </span>
                  
                  <span className="block text-xs text-emerald-300 font-medium tracking-wide">
                    {lang === 'bn' ? '"পড়ো তোমার প্রভুর নামে, যিনি সৃষ্টি করেছেন।"' : '"Read in the name of your Lord who created."'}
                  </span>

                  <div className="mt-8 space-y-3 w-full text-left">
                    <div className="bg-emerald-900/60 border border-emerald-800/40 p-3 rounded-xl flex items-center space-x-3">
                      <div className="h-2 w-2 rounded-full bg-gold-400 animate-ping" />
                      <span className="text-xs sm:text-sm text-emerald-100 font-medium">
                        {lang === 'bn' ? '২০+ অভিজ্ঞ হাফেজ ও হাফেজা শিক্ষিকা' : '20+ Certified Male & Female Scholars'}
                      </span>
                    </div>
                    <div className="bg-emerald-900/60 border border-emerald-800/40 p-3 rounded-xl flex items-center space-x-3">
                      <div className="h-2 w-2 rounded-full bg-gold-400 animate-ping" />
                      <span className="text-xs sm:text-sm text-emerald-100 font-medium">
                        {lang === 'bn' ? 'বিশ্বের যেকোনো দেশে অনলাইন ক্লাস' : 'Global Online 1-to-1 Dynamic Classes'}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Academy Core Advantages Section */}
      <section className="py-16 sm:py-24 bg-emerald-50/50 border-b border-emerald-100/40 relative" id="advantages_section">
        {/* Subtle decorative blob */}
        <div className="absolute top-1/2 left-0 w-72 h-72 bg-emerald-100/20 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-2xl sm:text-3.5xl font-serif font-bold text-emerald-950 tracking-tight">
              {t[lang].advTitle}
            </h2>
            <p className="text-sage-600 font-sans text-sm sm:text-base mt-2">
              {t[lang].advSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {/* Advantage 1 */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-emerald-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="p-3 bg-emerald-100/50 text-emerald-950 rounded-xl inline-block mb-5">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-emerald-950 mb-2">
                {t[lang].adv1Title}
              </h3>
              <p className="text-sage-600 text-sm leading-relaxed">
                {t[lang].adv1Desc}
              </p>
            </div>

            {/* Advantage 2 */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-emerald-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="p-3 bg-emerald-100/50 text-emerald-950 rounded-xl inline-block mb-5">
                <Globe className="h-6 w-6 animate-pulse" />
              </div>
              <h3 className="text-lg font-bold text-emerald-950 mb-2">
                {t[lang].adv2Title}
              </h3>
              <p className="text-sage-600 text-sm leading-relaxed">
                {t[lang].adv2Desc}
              </p>
            </div>

            {/* Advantage 3 */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-emerald-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="p-3 bg-emerald-100/50 text-emerald-950 rounded-xl inline-block mb-5">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-emerald-950 mb-2">
                {t[lang].adv3Title}
              </h3>
              <p className="text-sage-600 text-sm leading-relaxed">
                {t[lang].adv3Desc}
              </p>
            </div>

            {/* Advantage 4 */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-emerald-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="p-3 bg-emerald-100/50 text-emerald-950 rounded-xl inline-block mb-5">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-emerald-950 mb-2">
                {t[lang].adv4Title}
              </h3>
              <p className="text-sage-600 text-sm leading-relaxed">
                {t[lang].adv4Desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Catalog Section */}
      <section className="py-16 sm:py-24 bg-emerald-50/20" id="courses">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block bg-emerald-100 text-emerald-900 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
              {lang === 'bn' ? 'সিলেবাস ও কোর্সসমূহ' : 'Curriculum Catalog'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-emerald-950 tracking-tight">
              {t[lang].coursesTitle}
            </h2>
            <p className="text-gray-500 text-sm sm:text-base mt-2">
              {t[lang].coursesSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {coursesList.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                lang={lang}
                onBookTrial={handleBookCourse}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Letters & Tajweed Board Section */}
      <section className="py-16 sm:py-20 bg-emerald-950 text-white" id="letters">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <LetterBoard lang={lang} />
        </div>
      </section>

      {/* Certified Teachers Spotlight */}
      <section className="py-16 sm:py-24 bg-emerald-50/20" id="teachers">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block bg-emerald-100 text-emerald-900 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
              {lang === 'bn' ? 'অভিজ্ঞ শিক্ষকমণ্ডলী' : 'Our Certified Faculty'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-emerald-950 tracking-tight">
              {t[lang].teachersTitle}
            </h2>
            <p className="text-gray-500 text-sm sm:text-base mt-2">
              {t[lang].teachersSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-5xl mx-auto">
            {teachersList.map((teacher) => (
              <div
                key={teacher.id}
                className="bg-emerald-50/40 p-6 sm:p-8 rounded-3xl border border-emerald-900/5 shadow-xs flex flex-col sm:flex-row items-center sm:items-start space-y-6 sm:space-y-0 sm:space-x-6 relative"
                id={`teacher_item_${teacher.id}`}
              >
                {/* Avatar */}
                <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 shadow-md border-2 border-emerald-900/10">
                  <img
                    src={teacher.avatarUrl}
                    alt={teacher.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info details */}
                <div className="space-y-3 text-center sm:text-left flex-grow">
                  <div>
                    <span className="inline-block bg-gold-500/10 text-gold-600 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider mb-1">
                      {teacher.gender === 'male' ? (lang === 'bn' ? 'পুরুষ শিক্ষক' : 'Male Faculty') : (lang === 'bn' ? 'নারী শিক্ষিকা' : 'Female Faculty')}
                    </span>
                    <h3 className="text-lg font-bold text-emerald-950">{teacher.name}</h3>
                    <p className="text-xs text-gray-500 font-semibold">{teacher.role}</p>
                  </div>

                  {/* Qualifications */}
                  <div className="space-y-1">
                    <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-wide">
                      {lang === 'bn' ? 'যোগ্যতাসমূহ:' : 'Qualifications:'}
                    </span>
                    <ul className="text-xs text-gray-700 space-y-0.5">
                      {teacher.qualification.map((q, idx) => (
                        <li key={idx} className="flex items-center space-x-1.5 justify-center sm:justify-start">
                          <CheckCircle2 className="h-3 w-3 text-emerald-700 shrink-0" />
                          <span className="line-clamp-1">{q}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <p className="text-xs text-emerald-900 font-bold bg-emerald-100/50 py-1.5 px-3 rounded-lg inline-block">
                    {teacher.experience}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-24 bg-emerald-50/30 border-t border-b border-emerald-100/40" id="testimonials">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block bg-emerald-100 text-emerald-900 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
              {lang === 'bn' ? 'শিক্ষার্থীদের অভিজ্ঞতা' : 'Reviews & Testimonials'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-emerald-950 tracking-tight">
              {t[lang].testimonialTitle}
            </h2>
            <p className="text-gray-500 text-sm sm:text-base mt-2">
              {t[lang].testimonialSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {testimonialsList.map((test) => (
              <div
                key={test.id}
                className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200/50 shadow-xs flex flex-col justify-between"
                id={`testimonial_item_${test.id}`}
              >
                <div className="space-y-4">
                  {/* Stars Rating */}
                  <div className="flex items-center space-x-0.5 text-amber-500">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed italic">
                    "{test.text}"
                  </p>
                </div>

                <div className="pt-6 border-t border-gray-100 mt-6 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-emerald-950">{test.author}</h4>
                    <span className="block text-[10px] text-gray-400 uppercase font-semibold">{test.relation}</span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-900 bg-emerald-50 px-2 py-0.5 rounded-md">
                    {test.location}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Booking Section */}
      <section className="py-16 sm:py-24 bg-white" id="registration_section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RegistrationForm 
            lang={lang} 
            preselectedCourseId={preselectedCourse} 
            onClearPreselectedCourse={handleClearPreselectedCourse}
          />
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-16 sm:py-24 bg-emerald-50/30 border-t border-b border-emerald-100/40" id="faq">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block bg-emerald-100 text-emerald-900 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
              {lang === 'bn' ? 'যেকোনো জিজ্ঞাসার উত্তর' : 'Common Inquiries'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-emerald-950 tracking-tight">
              {t[lang].faqTitle}
            </h2>
            <p className="text-gray-500 text-sm sm:text-base mt-2">
              {t[lang].faqSubtitle}
            </p>
          </div>

          <div className="space-y-4">
            {faqsList.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-gray-200/60 shadow-xs overflow-hidden transition-all"
                  id={`faq_item_${index}`}
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left font-bold text-emerald-950 text-sm sm:text-base focus:outline-none"
                    id={`faq_trigger_${index}`}
                  >
                    <span>{lang === 'bn' ? faq.question : faq.questionEn}</span>
                    <ChevronDown className={`h-4.5 w-4.5 text-emerald-800 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-5 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-4 bg-emerald-50/10">
                          {lang === 'bn' ? faq.answer : faq.answerEn}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Floating Sticky Call to Action for Mobile & Desktop */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col space-y-3">
        {/* Scroll back to trial button */}
        <button
          onClick={() => handleBookCourse('')}
          className="bg-emerald-950 text-white hover:bg-emerald-900 border border-emerald-800 p-3.5 rounded-full shadow-xl hover:scale-105 active:scale-95 transition-all text-xs font-bold hidden sm:flex items-center space-x-2"
          title="Book Trial"
          id="floating_booking_btn"
        >
          <Sparkles className="h-4.5 w-4.5 text-gold-400 animate-spin" />
          <span>{lang === 'bn' ? 'ফ্রি ট্রায়াল নিন' : 'Free Trial'}</span>
        </button>

        {/* WhatsApp direct Floating button */}
        <a
          href={`https://wa.me/${siteTranslations.whatsappNumber.replace(/[^0-9]/g, '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center border-2 border-white/20 animate-bounce"
          title="WhatsApp Helpline"
          id="floating_whatsapp_btn"
        >
          <Phone className="h-6 w-6" />
        </a>
      </div>

      {/* Admin Panel Modal Overlay */}
      <AnimatePresence>
        {showAdmin && (
          <AdminPanel 
            lang={lang} 
            onClose={() => setShowAdmin(false)} 
            onDataUpdate={loadContent}
          />
        )}
      </AnimatePresence>

      {/* User Auth Modal Overlay */}
      <AnimatePresence>
        {showAuth && (
          <UserAuthModal
            lang={lang}
            onClose={() => setShowAuth(false)}
            onSuccess={handleAuthSuccess}
          />
        )}
      </AnimatePresence>

      {/* Google Drive Hub Overlay */}
      <AnimatePresence>
        {showDrive && (
          <DriveHub
            lang={lang}
            onClose={() => setShowDrive(false)}
            currentUser={currentUser}
          />
        )}
      </AnimatePresence>

      {/* Standard Dynamic Footer */}
      <Footer lang={lang} />
    </div>
  );
}
