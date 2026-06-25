import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Lock, Trash2, Filter, X, Check, Users, ShieldAlert, Sparkles, LogOut, CheckCircle, 
  Settings, KeyRound, BookOpen, Plus, Edit, RefreshCw, FileText, Globe, HelpCircle, GraduationCap, MapPin, Eye, Info
} from 'lucide-react';
import { Registration, Course, Teacher, FAQItem, User } from '../types';
import { 
  getAdminPassword, saveAdminPassword, 
  getRegisteredUsers, saveRegisteredUsers, 
  getCustomTranslations, saveCustomTranslations, CustomTranslations,
  getCustomCourses, saveCustomCourses,
  getCustomTeachers, saveCustomTeachers,
  getCustomFaqs, saveCustomFaqs
} from '../lib/store';

interface AdminPanelProps {
  lang: 'bn' | 'en';
  onClose: () => void;
  onDataUpdate?: () => void; // Callback to notify App.tsx to reload custom content
}

type AdminTab = 'bookings' | 'users' | 'content' | 'courses' | 'teachers' | 'faqs' | 'password';

export default function AdminPanel({ lang, onClose, onDataUpdate }: AdminPanelProps) {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [passwordInput, setPasswordInput] = React.useState('');
  const [errorMsg, setErrorMsg] = React.useState('');
  const [activeTab, setActiveTab] = React.useState<AdminTab>('bookings');

  // Core stored states
  const [registrations, setRegistrations] = React.useState<Registration[]>([]);
  const [users, setUsers] = React.useState<User[]>([]);
  const [translations, setTranslations] = React.useState<CustomTranslations>(getCustomTranslations());
  const [coursesList, setCoursesList] = React.useState<Course[]>(getCustomCourses());
  const [teachersList, setTeachersList] = React.useState<Teacher[]>(getCustomTeachers());
  const [faqsList, setFaqsList] = React.useState<FAQItem[]>(getCustomFaqs());

  // Filter & Search
  const [filterCourse, setFilterCourse] = React.useState('all');
  const [userSearch, setUserSearch] = React.useState('');

  // Password tab states
  const [currentPasscode, setCurrentPasscode] = React.useState('');
  const [newPasscode, setNewPasscode] = React.useState('');
  const [confirmPasscode, setConfirmPasscode] = React.useState('');
  const [pwdSuccess, setPwdSuccess] = React.useState('');
  const [pwdError, setPwdError] = React.useState('');

  // Course Edit Modal / Form States
  const [editingCourse, setEditingCourse] = React.useState<Course | null>(null);
  const [courseForm, setCourseForm] = React.useState<{
    id: string; title: string; titleEn: string; description: string; descriptionEn: string;
    duration: string; weeklyClasses: string; detailsText: string; iconName: string;
  }>({
    id: '', title: '', titleEn: '', description: '', descriptionEn: '',
    duration: '', weeklyClasses: '', detailsText: '', iconName: 'BookOpen'
  });
  const [showCourseForm, setShowCourseForm] = React.useState(false);

  // Teacher Edit Modal / Form States
  const [editingTeacher, setEditingTeacher] = React.useState<Teacher | null>(null);
  const [teacherForm, setTeacherForm] = React.useState<{
    id: string; name: string; role: string; gender: 'male' | 'female';
    experience: string; qualificationsText: string; avatarUrl: string;
  }>({
    id: '', name: '', role: '', gender: 'male',
    experience: '', qualificationsText: '', avatarUrl: ''
  });
  const [showTeacherForm, setShowTeacherForm] = React.useState(false);

  // FAQ Edit Modal / Form States
  const [editingFaq, setEditingFaq] = React.useState<FAQItem | null>(null);
  const [faqForm, setFaqForm] = React.useState<{
    index: number; question: string; questionEn: string; answer: string; answerEn: string;
  }>({
    index: -1, question: '', questionEn: '', answer: '', answerEn: ''
  });
  const [showFaqForm, setShowFaqForm] = React.useState(false);

  // Save content state status
  const [saveStatus, setSaveStatus] = React.useState('');

  React.useEffect(() => {
    // Read registrations from local storage on load
    loadData();
  }, []);

  const loadData = () => {
    try {
      const savedRegs = localStorage.getItem('academy_registrations');
      if (savedRegs) {
        setRegistrations(JSON.parse(savedRegs));
      }
      setUsers(getRegisteredUsers());
      setTranslations(getCustomTranslations());
      setCoursesList(getCustomCourses());
      setTeachersList(getCustomTeachers());
      setFaqsList(getCustomFaqs());
    } catch (e) {
      console.error(e);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const secureKey = getAdminPassword();
    if (passwordInput === secureKey) {
      setIsAuthenticated(true);
      setErrorMsg('');
      loadData();
    } else {
      setErrorMsg(lang === 'bn' ? 'ভুল পাসকোড! পুনরায় চেষ্টা করুন।' : 'Invalid passcode! Try again.');
      setPasswordInput('');
    }
  };

  // 1. Admission Delete handlers
  const handleDeleteBooking = (id: string) => {
    const confirmMsg = lang === 'bn' ? 'আপনি কি এই বুকিংটি মুছে ফেলতে চান?' : 'Are you sure you want to delete this booking?';
    if (!window.confirm(confirmMsg)) return;

    try {
      const updated = registrations.filter(r => r.id !== id);
      localStorage.setItem('academy_registrations', JSON.stringify(updated));
      setRegistrations(updated);
    } catch (e) {
      console.error(e);
    }
  };

  const handleClearAllBookings = () => {
    const confirmMsg = lang === 'bn' ? 'আপনি কি সব বুকিং একসাথে মুছে ফেলতে চান?' : 'Are you sure you want to clear all bookings?';
    if (!window.confirm(confirmMsg)) return;

    try {
      localStorage.removeItem('academy_registrations');
      setRegistrations([]);
    } catch (e) {
      console.error(e);
    }
  };

  // 2. User Delete handlers
  const handleDeleteUser = (id: string) => {
    const confirmMsg = lang === 'bn' ? 'আপনি কি এই ব্যবহারকারীর অ্যাকাউন্ট মুছে ফেলতে চান?' : 'Are you sure you want to delete this user?';
    if (!window.confirm(confirmMsg)) return;

    const updated = users.filter(u => u.id !== id);
    saveRegisteredUsers(updated);
    setUsers(updated);
  };

  const handleClearAllUsers = () => {
    const confirmMsg = lang === 'bn' ? 'আপনি কি সকল ব্যবহারকারী মুছে ফেলতে চান?' : 'Are you sure you want to clear all registered users?';
    if (!window.confirm(confirmMsg)) return;

    saveRegisteredUsers([]);
    setUsers([]);
  };

  // 3. Save Custom Translations (Hero / Subtitles)
  const handleUpdateTranslations = (e: React.FormEvent) => {
    e.preventDefault();
    saveCustomTranslations(translations);
    setSaveStatus(lang === 'bn' ? 'সংরক্ষিত হয়েছে!' : 'Site settings updated successfully!');
    if (onDataUpdate) onDataUpdate();
    setTimeout(() => setSaveStatus(''), 2000);
  };

  // 4. Change Admin Password
  const handleChangePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPwdError('');
    setPwdSuccess('');

    const savedPwd = getAdminPassword();
    if (currentPasscode !== savedPwd) {
      setPwdError(lang === 'bn' ? 'বর্তমান পাসকোডটি ভুল!' : 'Current passcode is incorrect.');
      return;
    }

    if (!newPasscode) {
      setPwdError(lang === 'bn' ? 'নতুন পাসকোড খালি হতে পারে না!' : 'New passcode cannot be empty.');
      return;
    }

    if (newPasscode !== confirmPasscode) {
      setPwdError(lang === 'bn' ? 'নতুন পাসকোড এবং নিশ্চিত পাসকোড মেলেনি!' : 'Passwords do not match.');
      return;
    }

    saveAdminPassword(newPasscode);
    setPwdSuccess(lang === 'bn' ? 'পাসকোড সফলভাবে পরিবর্তন করা হয়েছে!' : 'Passcode updated successfully!');
    setCurrentPasscode('');
    setNewPasscode('');
    setConfirmPasscode('');
  };

  // 5. Course Actions (Add / Edit / Delete)
  const handleOpenCourseForm = (course: Course | null = null) => {
    if (course) {
      setEditingCourse(course);
      setCourseForm({
        id: course.id,
        title: course.title,
        titleEn: course.titleEn,
        description: course.description,
        descriptionEn: course.descriptionEn,
        duration: course.duration,
        weeklyClasses: course.weeklyClasses,
        detailsText: course.details.join('\n'),
        iconName: course.iconName || 'BookOpen'
      });
    } else {
      setEditingCourse(null);
      setCourseForm({
        id: 'course_' + Date.now(),
        title: '',
        titleEn: '',
        description: '',
        descriptionEn: '',
        duration: '৩ মাস (3 Months)',
        weeklyClasses: 'সপ্তাহে ৩ দিন (3 Days/Week)',
        detailsText: 'কোর্সের বিস্তারিত এখানে প্রতিটি নতুন লাইনে লিখুন',
        iconName: 'BookOpen'
      });
    }
    setShowCourseForm(true);
  };

  const handleSaveCourse = (e: React.FormEvent) => {
    e.preventDefault();
    const detailsArray = courseForm.detailsText.split('\n').map(d => d.trim()).filter(d => d.length > 0);
    const newCourseObj: Course = {
      id: courseForm.id,
      title: courseForm.title,
      titleEn: courseForm.titleEn,
      description: courseForm.description,
      descriptionEn: courseForm.descriptionEn,
      duration: courseForm.duration,
      weeklyClasses: courseForm.weeklyClasses,
      details: detailsArray,
      iconName: courseForm.iconName
    };

    let updatedCourses: Course[];
    if (editingCourse) {
      updatedCourses = coursesList.map(c => c.id === editingCourse.id ? newCourseObj : c);
    } else {
      updatedCourses = [...coursesList, newCourseObj];
    }

    saveCustomCourses(updatedCourses);
    setCoursesList(updatedCourses);
    setShowCourseForm(false);
    setEditingCourse(null);
    if (onDataUpdate) onDataUpdate();
  };

  const handleDeleteCourse = (id: string) => {
    const confirmMsg = lang === 'bn' ? 'আপনি কি এই কোর্সটি মুছে ফেলতে চান?' : 'Are you sure you want to delete this course?';
    if (!window.confirm(confirmMsg)) return;

    const updated = coursesList.filter(c => c.id !== id);
    saveCustomCourses(updated);
    setCoursesList(updated);
    if (onDataUpdate) onDataUpdate();
  };

  // 6. Teacher Actions (Add / Edit / Delete)
  const handleOpenTeacherForm = (teacher: Teacher | null = null) => {
    if (teacher) {
      setEditingTeacher(teacher);
      setTeacherForm({
        id: teacher.id,
        name: teacher.name,
        role: teacher.role,
        gender: teacher.gender,
        experience: teacher.experience,
        qualificationsText: teacher.qualification.join('\n'),
        avatarUrl: teacher.avatarUrl
      });
    } else {
      setEditingTeacher(null);
      setTeacherForm({
        id: 'teacher_' + Date.now(),
        name: '',
        role: '',
        gender: 'male',
        experience: '',
        qualificationsText: '',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&fit=crop'
      });
    }
    setShowTeacherForm(true);
  };

  const handleSaveTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    const qualsArray = teacherForm.qualificationsText.split('\n').map(q => q.trim()).filter(q => q.length > 0);
    const newTeacherObj: Teacher = {
      id: teacherForm.id,
      name: teacherForm.name,
      role: teacherForm.role,
      gender: teacherForm.gender,
      experience: teacherForm.experience,
      qualification: qualsArray,
      avatarUrl: teacherForm.avatarUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&fit=crop'
    };

    let updatedTeachers: Teacher[];
    if (editingTeacher) {
      updatedTeachers = teachersList.map(t => t.id === editingTeacher.id ? newTeacherObj : t);
    } else {
      updatedTeachers = [...teachersList, newTeacherObj];
    }

    saveCustomTeachers(updatedTeachers);
    setTeachersList(updatedTeachers);
    setShowTeacherForm(false);
    setEditingTeacher(null);
    if (onDataUpdate) onDataUpdate();
  };

  const handleDeleteTeacher = (id: string) => {
    const confirmMsg = lang === 'bn' ? 'আপনি কি এই শিক্ষককে তালিকা থেকে মুছতে চান?' : 'Are you sure you want to delete this teacher?';
    if (!window.confirm(confirmMsg)) return;

    const updated = teachersList.filter(t => t.id !== id);
    saveCustomTeachers(updated);
    setTeachersList(updated);
    if (onDataUpdate) onDataUpdate();
  };

  // 7. FAQ Actions (Add / Edit / Delete)
  const handleOpenFaqForm = (faq: FAQItem | null = null, index: number = -1) => {
    if (faq && index !== -1) {
      setEditingFaq(faq);
      setFaqForm({
        index: index,
        question: faq.question,
        questionEn: faq.questionEn,
        answer: faq.answer,
        answerEn: faq.answerEn
      });
    } else {
      setEditingFaq(null);
      setFaqForm({
        index: -1,
        question: '',
        questionEn: '',
        answer: '',
        answerEn: ''
      });
    }
    setShowFaqForm(true);
  };

  const handleSaveFaq = (e: React.FormEvent) => {
    e.preventDefault();
    const newFaqObj: FAQItem = {
      question: faqForm.question,
      questionEn: faqForm.questionEn,
      answer: faqForm.answer,
      answerEn: faqForm.answerEn
    };

    let updatedFaqs: FAQItem[];
    if (faqForm.index !== -1) {
      updatedFaqs = faqsList.map((f, i) => i === faqForm.index ? newFaqObj : f);
    } else {
      updatedFaqs = [...faqsList, newFaqObj];
    }

    saveCustomFaqs(updatedFaqs);
    setFaqsList(updatedFaqs);
    setShowFaqForm(false);
    setEditingFaq(null);
    if (onDataUpdate) onDataUpdate();
  };

  const handleDeleteFaq = (index: number) => {
    const confirmMsg = lang === 'bn' ? 'আপনি কি এই প্রশ্নটি মুছতে চান?' : 'Are you sure you want to delete this FAQ?';
    if (!window.confirm(confirmMsg)) return;

    const updated = faqsList.filter((_, i) => i !== index);
    saveCustomFaqs(updated);
    setFaqsList(updated);
    if (onDataUpdate) onDataUpdate();
  };

  // Filtered Lists
  const filteredBookings = registrations.filter(r => {
    if (filterCourse === 'all') return true;
    return r.courseId === filterCourse;
  });

  const filteredUsers = users.filter(u => {
    const q = userSearch.toLowerCase();
    return u.fullName.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || (u.phone && u.phone.includes(q));
  });

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose} />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="bg-white rounded-3xl w-full max-w-5xl max-h-[90vh] overflow-hidden shadow-2xl border border-gray-100 flex flex-col relative z-10"
        id="admin_panel_modal"
      >
        {/* Header */}
        <div className="bg-emerald-950 px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <Settings className="h-5 w-5 text-gold-400" />
            <div>
              <h3 className="font-serif font-bold text-base sm:text-lg">
                {lang === 'bn' ? 'ম্যানেজমেন্ট কন্ট্রোল প্যানেল' : 'Academy Management Console'}
              </h3>
              <p className="text-[10px] sm:text-xs text-emerald-200/80 font-sans">
                {lang === 'bn' ? 'অ্যাকাডেমি কন্টেন্ট, অ্যাডমিশন ও ইউজার ডিরেক্টরি পরিচালনা করুন' : 'Manage core content, registered users and dynamic admissions'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-emerald-100 hover:text-white hover:bg-emerald-900 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Auth Screen */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 text-center max-w-sm mx-auto flex-grow flex flex-col justify-center">
            <div className="w-12 h-12 bg-gold-500/10 border border-gold-500/20 text-gold-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="h-5 w-5" />
            </div>
            <h4 className="font-serif font-bold text-emerald-950 text-base mb-2">
              {lang === 'bn' ? 'সিকিউরিটি কোড প্রদান করুন' : 'Admin Authorization Required'}
            </h4>
            <p className="text-xs text-gray-400 mb-6 font-sans">
              {lang === 'bn' ? 'অ্যাডমিন ড্যাশবোর্ডে প্রবেশ করতে অনুগ্রহ করে গোপন পাসকোড প্রদান করুন। (ডিফল্ট: quran123)' : 'Please type your security key to manage dynamic records. (Default: quran123)'}
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-900/10 focus:border-emerald-900 outline-none text-center text-sm tracking-widest font-bold bg-gray-50/50 font-sans"
                placeholder="••••••••"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                id="admin_password_input"
              />
              {errorMsg && <p className="text-xs text-rose-500 font-semibold font-sans">{errorMsg}</p>}
              
              <button
                type="submit"
                className="w-full py-3 bg-emerald-950 hover:bg-emerald-900 text-white font-bold rounded-xl text-xs sm:text-sm shadow-md transition-colors font-sans"
                id="admin_login_submit"
              >
                {lang === 'bn' ? 'লগইন করুন' : 'Unlock Dashboard'}
              </button>
            </form>
          </div>
        ) : (
          /* Main Tabbed Layout */
          <div className="flex flex-col md:flex-row flex-grow min-h-0 bg-gray-50">
            {/* Sidebar Tabs */}
            <div className="md:w-60 bg-emerald-950/5 border-r border-gray-200/70 p-4 space-y-1.5 flex-shrink-0 flex md:flex-col overflow-x-auto md:overflow-x-visible">
              <button
                onClick={() => setActiveTab('bookings')}
                className={`w-full text-left px-4 py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center space-x-2 transition-all ${
                  activeTab === 'bookings'
                    ? 'bg-emerald-950 text-white shadow-sm'
                    : 'text-gray-600 hover:bg-emerald-950/10'
                }`}
              >
                <Sparkles className="h-4 w-4" />
                <span className="whitespace-nowrap">{lang === 'bn' ? 'ট্রায়াল ভর্তি অনুরোধ' : 'Admissions Request'}</span>
              </button>

              <button
                onClick={() => setActiveTab('users')}
                className={`w-full text-left px-4 py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center space-x-2 transition-all ${
                  activeTab === 'users'
                    ? 'bg-emerald-950 text-white shadow-sm'
                    : 'text-gray-600 hover:bg-emerald-950/10'
                }`}
              >
                <Users className="h-4 w-4" />
                <span className="whitespace-nowrap">{lang === 'bn' ? 'নিবন্ধিত ইউজার' : 'Registered Users'}</span>
              </button>

              <button
                onClick={() => setActiveTab('content')}
                className={`w-full text-left px-4 py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center space-x-2 transition-all ${
                  activeTab === 'content'
                    ? 'bg-emerald-950 text-white shadow-sm'
                    : 'text-gray-600 hover:bg-emerald-950/10'
                }`}
              >
                <FileText className="h-4 w-4" />
                <span className="whitespace-nowrap">{lang === 'bn' ? 'হেডার ও হিরো কাস্টমাইজ' : 'Custom Site Info'}</span>
              </button>

              <button
                onClick={() => setActiveTab('courses')}
                className={`w-full text-left px-4 py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center space-x-2 transition-all ${
                  activeTab === 'courses'
                    ? 'bg-emerald-950 text-white shadow-sm'
                    : 'text-gray-600 hover:bg-emerald-950/10'
                }`}
              >
                <BookOpen className="h-4 w-4" />
                <span className="whitespace-nowrap">{lang === 'bn' ? 'কোর্স ক্যাটালগ' : 'Courses Catalog'}</span>
              </button>

              <button
                onClick={() => setActiveTab('teachers')}
                className={`w-full text-left px-4 py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center space-x-2 transition-all ${
                  activeTab === 'teachers'
                    ? 'bg-emerald-950 text-white shadow-sm'
                    : 'text-gray-600 hover:bg-emerald-950/10'
                }`}
              >
                <GraduationCap className="h-4 w-4" />
                <span className="whitespace-nowrap">{lang === 'bn' ? 'শিক্ষকমণ্ডলী' : 'Teachers Bio'}</span>
              </button>

              <button
                onClick={() => setActiveTab('faqs')}
                className={`w-full text-left px-4 py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center space-x-2 transition-all ${
                  activeTab === 'faqs'
                    ? 'bg-emerald-950 text-white shadow-sm'
                    : 'text-gray-600 hover:bg-emerald-950/10'
                }`}
              >
                <HelpCircle className="h-4 w-4" />
                <span className="whitespace-nowrap">{lang === 'bn' ? 'সাধারণ জিজ্ঞাসা' : 'FAQs List'}</span>
              </button>

              <button
                onClick={() => setActiveTab('password')}
                className={`w-full text-left px-4 py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center space-x-2 transition-all ${
                  activeTab === 'password'
                    ? 'bg-emerald-950 text-white shadow-sm'
                    : 'text-gray-600 hover:bg-emerald-950/10'
                }`}
              >
                <KeyRound className="h-4 w-4" />
                <span className="whitespace-nowrap">{lang === 'bn' ? 'পাসওয়ার্ড পরিবর্তন' : 'Change Password'}</span>
              </button>
            </div>

            {/* Tab Panel Content wrapper */}
            <div className="flex-grow p-6 overflow-y-auto min-h-0 flex flex-col">
              
              {/* TAB 1: Admissions */}
              {activeTab === 'bookings' && (
                <div className="space-y-4 flex flex-col flex-grow min-h-0">
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-gray-200/50 shadow-xs">
                    <div className="text-sm font-bold text-emerald-950 flex items-center space-x-2">
                      <Sparkles className="h-5 w-5 text-gold-500" />
                      <span>{lang === 'bn' ? `সর্বমোট ডেমো অনুরোধ: ${filteredBookings.length}` : `Trial Requests count: ${filteredBookings.length}`}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <select
                        className="text-xs font-bold border border-gray-200 px-3 py-2 rounded-xl text-gray-700 outline-none"
                        value={filterCourse}
                        onChange={(e) => setFilterCourse(e.target.value)}
                      >
                        <option value="all">{lang === 'bn' ? 'সব কোর্স ফিল্টার' : 'Filter by course'}</option>
                        {coursesList.map(c => (
                          <option key={c.id} value={c.id}>{lang === 'bn' ? c.title : c.titleEn}</option>
                        ))}
                      </select>

                      {registrations.length > 0 && (
                        <button
                          onClick={handleClearAllBookings}
                          className="px-3.5 py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl text-xs font-bold flex items-center space-x-1 border border-rose-100"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          <span>{lang === 'bn' ? 'সব মুছুন' : 'Clear All'}</span>
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3 overflow-y-auto flex-grow pr-1">
                    {filteredBookings.length === 0 ? (
                      <div className="text-center py-16 bg-white rounded-2xl border border-gray-200/40">
                        <ShieldAlert className="h-10 w-10 text-gray-300 mx-auto mb-3" />
                        <h5 className="font-serif font-bold text-gray-700 text-sm">
                          {lang === 'bn' ? 'কোনো অনুরোধ পাওয়া যায়নি' : 'No Admissions Booking Found'}
                        </h5>
                      </div>
                    ) : (
                      filteredBookings.map((reg) => {
                        const c = coursesList.find(course => course.id === reg.courseId);
                        return (
                          <div key={reg.id} className="bg-white rounded-xl border border-gray-200/50 p-5 shadow-xs hover:shadow-md transition-all relative overflow-hidden">
                            <div className={`absolute left-0 top-0 w-1.5 h-full ${reg.whatsappSubmitted ? 'bg-green-500' : 'bg-amber-400'}`} />
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pl-3">
                              <div>
                                <div className="flex items-center space-x-2 mb-1">
                                  <h4 className="font-bold text-emerald-950 text-base">{reg.studentName}</h4>
                                  <span className="text-xs bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-full font-semibold">
                                    {reg.age} {lang === 'bn' ? 'বছর' : 'Y/O'}
                                  </span>
                                </div>
                                {reg.parentName && <p className="text-xs text-gray-500 mb-1">{lang === 'bn' ? `অভিভাবক: ${reg.parentName}` : `Parent: ${reg.parentName}`}</p>}
                                <div className="flex flex-wrap gap-2 text-xs pt-1">
                                  <span className="bg-emerald-50 text-emerald-900 font-bold px-2 py-1 rounded">
                                    {c ? (lang === 'bn' ? c.title : c.titleEn) : reg.courseId}
                                  </span>
                                  <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                    {lang === 'bn' ? `সময়: ${reg.preferredTime}` : `Slot: ${reg.preferredTime}`}
                                  </span>
                                  <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded capitalize">
                                    {lang === 'bn' ? `শিক্ষক: ${reg.teacherPreference === 'male' ? 'পুরুষ' : reg.teacherPreference === 'female' ? 'মহিলা' : 'যেকোনো'}` : `Teacher: ${reg.teacherPreference}`}
                                  </span>
                                </div>
                              </div>

                              <div className="flex items-center justify-between md:justify-end gap-4 border-t md:border-t-0 pt-3 md:pt-0 border-gray-100">
                                <div className="text-left md:text-right">
                                  <span className="block text-[10px] text-gray-400 font-bold uppercase">{lang === 'bn' ? 'যোগাযোগ নম্বর' : 'WhatsApp'}</span>
                                  <a href={`https://wa.me/${reg.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-emerald-800 hover:underline">
                                    {reg.phone}
                                  </a>
                                </div>

                                <button
                                  onClick={() => handleDeleteBooking(reg.id)}
                                  className="p-2 text-rose-500 hover:text-white hover:bg-rose-600 rounded-lg transition-colors border border-rose-100"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              )}

              {/* TAB 2: Registered Users */}
              {activeTab === 'users' && (
                <div className="space-y-4 flex flex-col flex-grow min-h-0">
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-gray-200/50 shadow-xs">
                    <div className="relative flex-grow max-w-sm">
                      <input
                        type="text"
                        placeholder={lang === 'bn' ? 'ইউজার নাম বা ইমেইল দিয়ে খুঁজুন...' : 'Search users by name, email...'}
                        className="w-full pl-3 pr-4 py-2 text-xs border border-gray-200 rounded-xl outline-none"
                        value={userSearch}
                        onChange={(e) => setUserSearch(e.target.value)}
                      />
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <span className="text-xs font-bold text-gray-600">{lang === 'bn' ? `মোট মেম্বার: ${filteredUsers.length}` : `Total Members: ${filteredUsers.length}`}</span>
                      {users.length > 0 && (
                        <button
                          onClick={handleClearAllUsers}
                          className="px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl text-xs font-bold border border-rose-100"
                        >
                          {lang === 'bn' ? 'সব মুছুন' : 'Clear Users'}
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="overflow-y-auto flex-grow pr-1 space-y-3">
                    {filteredUsers.length === 0 ? (
                      <div className="text-center py-16 bg-white rounded-2xl border border-gray-200/40">
                        <Users className="h-10 w-10 text-gray-300 mx-auto mb-3" />
                        <h5 className="font-serif font-bold text-gray-700 text-sm">
                          {lang === 'bn' ? 'কোনো নিবন্ধিত ইউজার পাওয়া যায়নি' : 'No Registered Users Found'}
                        </h5>
                      </div>
                    ) : (
                      filteredUsers.map((u) => (
                        <div key={u.id} className="bg-white rounded-xl border border-gray-200/50 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
                          <div>
                            <div className="flex items-center space-x-2">
                              <h4 className="font-bold text-emerald-950 text-sm sm:text-base">{u.fullName}</h4>
                              <span className="text-[10px] bg-emerald-50 text-emerald-900 font-bold px-2 py-0.5 rounded">
                                ID: {u.id}
                              </span>
                            </div>
                            <p className="text-xs text-gray-500 font-sans mt-0.5">{u.email}</p>
                            {u.phone && <p className="text-xs text-gray-500 font-sans">{lang === 'bn' ? `ফোন: ${u.phone}` : `Phone: ${u.phone}`}</p>}
                            <p className="text-[10px] text-gray-400 font-sans mt-1">
                              {lang === 'bn' ? `নিবন্ধন: ${new Date(u.registeredAt).toLocaleDateString('bn-BD')}` : `Registered: ${new Date(u.registeredAt).toLocaleDateString()}`}
                            </p>
                          </div>

                          <div className="flex items-center space-x-4 justify-between sm:justify-end border-t sm:border-t-0 pt-2 sm:pt-0 border-gray-100">
                            <div className="text-left sm:text-right">
                              <span className="block text-[9px] text-gray-400 font-bold uppercase">{lang === 'bn' ? 'পাসওয়ার্ড' : 'Password'}</span>
                              <span className="text-xs font-bold text-emerald-800 font-mono select-all bg-emerald-50 px-2 py-1 rounded">{u.password || 'N/A'}</span>
                            </div>

                            <button
                              onClick={() => handleDeleteUser(u.id)}
                              className="p-1.5 text-rose-500 hover:text-white hover:bg-rose-600 rounded-lg transition-colors border border-rose-100"
                              title="Delete user"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* TAB 3: Customize General translations */}
              {activeTab === 'content' && (
                <form onSubmit={handleUpdateTranslations} className="space-y-6">
                  <div className="bg-white p-6 rounded-2xl border border-gray-200/50 shadow-xs space-y-4">
                    <h3 className="font-serif font-bold text-emerald-950 text-base border-b border-gray-100 pb-2">
                      {lang === 'bn' ? 'হিরো সেকশন কাস্টমাইজ করুন (Hero Header Editor)' : 'Customize Hero Segment'}
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-500 uppercase">{lang === 'bn' ? 'হিরো শিরোনাম (বাংলা)' : 'Hero Title (Bengali)'}</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl outline-none focus:border-emerald-950 font-serif"
                          value={translations.heroTitleBn}
                          onChange={(e) => setTranslations({...translations, heroTitleBn: e.target.value})}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-500 uppercase">{lang === 'bn' ? 'হিরো শিরোনাম (ইংরেজী)' : 'Hero Title (English)'}</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl outline-none focus:border-emerald-950 font-serif"
                          value={translations.heroTitleEn}
                          onChange={(e) => setTranslations({...translations, heroTitleEn: e.target.value})}
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-500 uppercase">{lang === 'bn' ? 'হিরো সাবটাইটেল (বাংলা)' : 'Hero Subtitle (Bengali)'}</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl outline-none focus:border-emerald-950"
                          value={translations.heroSubtitleBn}
                          onChange={(e) => setTranslations({...translations, heroSubtitleBn: e.target.value})}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-500 uppercase">{lang === 'bn' ? 'হিরো সাবটাইটেল (ইংরেজী)' : 'Hero Subtitle (English)'}</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl outline-none focus:border-emerald-950"
                          value={translations.heroSubtitleEn}
                          onChange={(e) => setTranslations({...translations, heroSubtitleEn: e.target.value})}
                        />
                      </div>

                      <div className="space-y-1.5 md:col-span-2">
                        <label className="text-xs font-bold text-gray-500 uppercase">{lang === 'bn' ? 'হিরো বর্ণনা (বাংলা)' : 'Hero Description (Bengali)'}</label>
                        <textarea
                          rows={3}
                          className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl outline-none focus:border-emerald-950"
                          value={translations.heroDescBn}
                          onChange={(e) => setTranslations({...translations, heroDescBn: e.target.value})}
                        />
                      </div>
                      <div className="space-y-1.5 md:col-span-2">
                        <label className="text-xs font-bold text-gray-500 uppercase">{lang === 'bn' ? 'হিরো বর্ণনা (ইংরেজী)' : 'Hero Description (English)'}</label>
                        <textarea
                          rows={3}
                          className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl outline-none focus:border-emerald-950"
                          value={translations.heroDescEn}
                          onChange={(e) => setTranslations({...translations, heroDescEn: e.target.value})}
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-500 uppercase">{lang === 'bn' ? 'বাটন টেক্সট (বাংলা)' : 'Button Label (Bengali)'}</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl outline-none focus:border-emerald-950"
                          value={translations.btnHeroTrialBn}
                          onChange={(e) => setTranslations({...translations, btnHeroTrialBn: e.target.value})}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-500 uppercase">{lang === 'bn' ? 'বাটন টেক্সট (ইংরেজী)' : 'Button Label (English)'}</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl outline-none focus:border-emerald-950"
                          value={translations.btnHeroTrialEn}
                          onChange={(e) => setTranslations({...translations, btnHeroTrialEn: e.target.value})}
                        />
                      </div>

                      <div className="space-y-1.5 md:col-span-2">
                        <label className="text-xs font-bold text-gray-500 uppercase">{lang === 'bn' ? 'গ্লোবাল হোয়াটসঅ্যাপ ফোন নম্বর (যেমন: 8801959865742)' : 'Global WhatsApp Mobile Key (e.g. 8801959865742)'}</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl outline-none focus:border-emerald-950 font-mono font-bold"
                          value={translations.whatsappNumber}
                          onChange={(e) => setTranslations({...translations, whatsappNumber: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Advantages section config */}
                  <div className="bg-white p-6 rounded-2xl border border-gray-200/50 shadow-xs space-y-4">
                    <h3 className="font-serif font-bold text-emerald-950 text-base border-b border-gray-100 pb-2">
                      {lang === 'bn' ? 'সুবিধাসমূহ সেকশন (Advantages Section)' : 'Customize Advantages list'}
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-500 uppercase">{lang === 'bn' ? 'মূল শিরোনাম (বাংলা)' : 'Advantage Title (Bengali)'}</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl outline-none focus:border-emerald-950"
                          value={translations.advTitleBn}
                          onChange={(e) => setTranslations({...translations, advTitleBn: e.target.value})}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-500 uppercase">{lang === 'bn' ? 'মূল শিরোনাম (ইংরেজী)' : 'Advantage Title (English)'}</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl outline-none focus:border-emerald-950"
                          value={translations.advTitleEn}
                          onChange={(e) => setTranslations({...translations, advTitleEn: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Save feedback bar */}
                  <div className="flex items-center space-x-3 justify-end sticky bottom-0 bg-gray-50 py-3 border-t border-gray-200/60">
                    {saveStatus && <span className="text-xs text-green-600 font-bold bg-green-50 px-3 py-1.5 rounded-lg border border-green-100">{saveStatus}</span>}
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-emerald-950 hover:bg-emerald-900 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition-all flex items-center space-x-1.5"
                    >
                      <Check className="h-4 w-4" />
                      <span>{lang === 'bn' ? 'সব সংরক্ষণ করুন' : 'Save Site Settings'}</span>
                    </button>
                  </div>
                </form>
              )}

              {/* TAB 4: Courses list config */}
              {activeTab === 'courses' && (
                <div className="space-y-4 flex flex-col flex-grow min-h-0">
                  <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-gray-200/50 shadow-xs">
                    <span className="text-xs font-bold text-gray-600">
                      {lang === 'bn' ? `মোট অ্যাক্টিভ কোর্স: ${coursesList.length}` : `Active Courses catalog: ${coursesList.length}`}
                    </span>
                    <button
                      onClick={() => handleOpenCourseForm(null)}
                      className="px-3 py-2 bg-emerald-950 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold flex items-center space-x-1"
                    >
                      <Plus className="h-4 w-4 text-gold-400" />
                      <span>{lang === 'bn' ? 'নতুন কোর্স যোগ করুন' : 'Add New Course'}</span>
                    </button>
                  </div>

                  <div className="overflow-y-auto flex-grow pr-1 space-y-3">
                    {coursesList.map(c => (
                      <div key={c.id} className="bg-white rounded-xl border border-gray-200/50 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
                        <div className="space-y-1">
                          <h4 className="font-serif font-bold text-emerald-950 text-sm sm:text-base">
                            {lang === 'bn' ? c.title : c.titleEn}
                          </h4>
                          <p className="text-xs text-gray-500 font-sans line-clamp-1">
                            {lang === 'bn' ? c.description : c.descriptionEn}
                          </p>
                          <div className="flex gap-2 text-[10px] pt-1">
                            <span className="bg-emerald-50 text-emerald-900 font-bold px-2 py-0.5 rounded">{c.duration}</span>
                            <span className="bg-emerald-50 text-emerald-900 font-bold px-2 py-0.5 rounded">{c.weeklyClasses}</span>
                            <span className="bg-gray-100 text-gray-500 px-2 py-0.5 rounded">Details: {c.details.length} points</span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 justify-end">
                          <button
                            onClick={() => handleOpenCourseForm(c)}
                            className="p-1.5 text-emerald-900 hover:bg-emerald-50 rounded border border-emerald-100"
                            title="Edit"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteCourse(c.id)}
                            className="p-1.5 text-rose-500 hover:bg-rose-50 rounded border border-rose-100"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: Teachers management */}
              {activeTab === 'teachers' && (
                <div className="space-y-4 flex flex-col flex-grow min-h-0">
                  <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-gray-200/50 shadow-xs">
                    <span className="text-xs font-bold text-gray-600">
                      {lang === 'bn' ? `মোট শিক্ষক: ${teachersList.length}` : `Active Teachers: ${teachersList.length}`}
                    </span>
                    <button
                      onClick={() => handleOpenTeacherForm(null)}
                      className="px-3 py-2 bg-emerald-950 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold flex items-center space-x-1"
                    >
                      <Plus className="h-4 w-4 text-gold-400" />
                      <span>{lang === 'bn' ? 'নতুন শিক্ষক যোগ করুন' : 'Add New Teacher'}</span>
                    </button>
                  </div>

                  <div className="overflow-y-auto flex-grow pr-1 space-y-3">
                    {teachersList.map(t => (
                      <div key={t.id} className="bg-white rounded-xl border border-gray-200/50 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
                        <div className="flex items-center space-x-3">
                          <img src={t.avatarUrl} alt={t.name} className="w-10 h-10 rounded-full object-cover border border-gray-100" referrerPolicy="no-referrer" />
                          <div>
                            <h4 className="font-bold text-emerald-950 text-sm">{t.name}</h4>
                            <p className="text-xs text-gray-500">{t.role} • {t.experience}</p>
                            <p className="text-[10px] text-gray-400">Gender: <span className="capitalize">{t.gender}</span></p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 justify-end">
                          <button
                            onClick={() => handleOpenTeacherForm(t)}
                            className="p-1.5 text-emerald-900 hover:bg-emerald-50 rounded border border-emerald-100"
                            title="Edit"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteTeacher(t.id)}
                            className="p-1.5 text-rose-500 hover:bg-rose-50 rounded border border-rose-100"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 6: FAQs list configuration */}
              {activeTab === 'faqs' && (
                <div className="space-y-4 flex flex-col flex-grow min-h-0">
                  <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-gray-200/50 shadow-xs">
                    <span className="text-xs font-bold text-gray-600">
                      {lang === 'bn' ? `মোট প্রশ্নসমূহ: ${faqsList.length}` : `FAQs count: ${faqsList.length}`}
                    </span>
                    <button
                      onClick={() => handleOpenFaqForm(null, -1)}
                      className="px-3 py-2 bg-emerald-950 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold flex items-center space-x-1"
                    >
                      <Plus className="h-4 w-4 text-gold-400" />
                      <span>{lang === 'bn' ? 'নতুন প্রশ্নোত্তর যোগ করুন' : 'Add New FAQ'}</span>
                    </button>
                  </div>

                  <div className="overflow-y-auto flex-grow pr-1 space-y-3">
                    {faqsList.map((f, i) => (
                      <div key={i} className="bg-white rounded-xl border border-gray-200/50 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
                        <div className="space-y-1">
                          <h4 className="font-bold text-emerald-950 text-xs sm:text-sm">
                            Q: {lang === 'bn' ? f.question : f.questionEn}
                          </h4>
                          <p className="text-xs text-gray-500 font-sans line-clamp-1">
                            A: {lang === 'bn' ? f.answer : f.answerEn}
                          </p>
                        </div>

                        <div className="flex items-center space-x-2 justify-end">
                          <button
                            onClick={() => handleOpenFaqForm(f, i)}
                            className="p-1.5 text-emerald-900 hover:bg-emerald-50 rounded border border-emerald-100"
                            title="Edit"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteFaq(i)}
                            className="p-1.5 text-rose-500 hover:bg-rose-50 rounded border border-rose-100"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 7: Change Password */}
              {activeTab === 'password' && (
                <div className="bg-white p-6 rounded-2xl border border-gray-200/50 shadow-xs max-w-md">
                  <h3 className="font-serif font-bold text-emerald-950 text-base border-b border-gray-100 pb-2 mb-4 flex items-center space-x-2">
                    <KeyRound className="h-5 w-5 text-gold-500" />
                    <span>{lang === 'bn' ? 'অ্যাডমিন পাসকোড পরিবর্তন করুন' : 'Reset Admin Console Passcode'}</span>
                  </h3>

                  <form onSubmit={handleChangePasswordSubmit} className="space-y-4 font-sans">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-500 uppercase">{lang === 'bn' ? 'বর্তমান পাসকোড' : 'Current Passcode'}</label>
                      <input
                        type="password"
                        required
                        className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl outline-none focus:border-emerald-950"
                        placeholder="••••••••"
                        value={currentPasscode}
                        onChange={(e) => setCurrentPasscode(e.target.value)}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-500 uppercase">{lang === 'bn' ? 'নতুন পাসকোড' : 'New Passcode'}</label>
                      <input
                        type="password"
                        required
                        className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl outline-none focus:border-emerald-950"
                        placeholder="••••••••"
                        value={newPasscode}
                        onChange={(e) => setNewPasscode(e.target.value)}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-500 uppercase">{lang === 'bn' ? 'নতুন পাসকোড নিশ্চিত করুন' : 'Confirm New Passcode'}</label>
                      <input
                        type="password"
                        required
                        className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl outline-none focus:border-emerald-950"
                        placeholder="••••••••"
                        value={confirmPasscode}
                        onChange={(e) => setConfirmPasscode(e.target.value)}
                      />
                    </div>

                    {pwdError && <p className="text-xs text-rose-500 font-semibold">{pwdError}</p>}
                    {pwdSuccess && <p className="text-xs text-green-600 font-semibold bg-green-50 p-2 rounded border border-green-100">{pwdSuccess}</p>}

                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-emerald-950 hover:bg-emerald-900 text-white text-xs font-bold rounded-xl shadow-md transition-colors"
                    >
                      {lang === 'bn' ? 'পাসকোড পরিবর্তন করুন' : 'Update Passcode'}
                    </button>
                  </form>
                </div>
              )}

            </div>
          </div>
        )}
      </motion.div>

      {/* Dynamic Courses Form Dialog */}
      <AnimatePresence>
        {showCourseForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowCourseForm(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl w-full max-w-lg p-6 relative z-10 shadow-xl border border-gray-100 max-h-[85vh] overflow-y-auto"
            >
              <h4 className="font-serif font-bold text-emerald-950 text-base mb-4 border-b border-gray-100 pb-2 flex items-center justify-between">
                <span>{editingCourse ? (lang === 'bn' ? 'কোর্স সংশোধন করুন' : 'Edit Course') : (lang === 'bn' ? 'নতুন কোর্স যোগ করুন' : 'Add New Course')}</span>
                <button onClick={() => setShowCourseForm(false)} className="text-gray-400 hover:text-gray-600"><X className="h-4 w-4" /></button>
              </h4>

              <form onSubmit={handleSaveCourse} className="space-y-4 font-sans text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-gray-500 uppercase">Title (BN)</label>
                    <input type="text" required className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none" value={courseForm.title} onChange={(e) => setCourseForm({...courseForm, title: e.target.value})} />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-gray-500 uppercase">Title (EN)</label>
                    <input type="text" required className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none" value={courseForm.titleEn} onChange={(e) => setCourseForm({...courseForm, titleEn: e.target.value})} />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-gray-500 uppercase">Description (BN)</label>
                  <textarea rows={2} required className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none" value={courseForm.description} onChange={(e) => setCourseForm({...courseForm, description: e.target.value})} />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-gray-500 uppercase">Description (EN)</label>
                  <textarea rows={2} required className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none" value={courseForm.descriptionEn} onChange={(e) => setCourseForm({...courseForm, descriptionEn: e.target.value})} />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-gray-500 uppercase">Duration</label>
                    <input type="text" required className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none" value={courseForm.duration} onChange={(e) => setCourseForm({...courseForm, duration: e.target.value})} />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-gray-500 uppercase">Weekly Classes</label>
                    <input type="text" required className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none" value={courseForm.weeklyClasses} onChange={(e) => setCourseForm({...courseForm, weeklyClasses: e.target.value})} />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-gray-500 uppercase">Details/Syllabus bullet points (One per line)</label>
                  <textarea rows={4} required className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none font-mono" value={courseForm.detailsText} onChange={(e) => setCourseForm({...courseForm, detailsText: e.target.value})} />
                </div>

                <button type="submit" className="w-full py-2.5 bg-emerald-950 text-white rounded-lg font-bold hover:bg-emerald-900 transition-colors">
                  {lang === 'bn' ? 'সংরক্ষণ করুন' : 'Save Course'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Dynamic Teachers Form Dialog */}
      <AnimatePresence>
        {showTeacherForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowTeacherForm(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl w-full max-w-lg p-6 relative z-10 shadow-xl border border-gray-100 max-h-[85vh] overflow-y-auto"
            >
              <h4 className="font-serif font-bold text-emerald-950 text-base mb-4 border-b border-gray-100 pb-2 flex items-center justify-between">
                <span>{editingTeacher ? (lang === 'bn' ? 'শিক্ষক প্রোফাইল পরিবর্তন' : 'Edit Teacher Profile') : (lang === 'bn' ? 'নতুন শিক্ষক যুক্ত করুন' : 'Add New Teacher')}</span>
                <button onClick={() => setShowTeacherForm(false)} className="text-gray-400 hover:text-gray-600"><X className="h-4 w-4" /></button>
              </h4>

              <form onSubmit={handleSaveTeacher} className="space-y-4 font-sans text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-gray-500 uppercase">Name</label>
                    <input type="text" required className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none" value={teacherForm.name} onChange={(e) => setTeacherForm({...teacherForm, name: e.target.value})} />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-gray-500 uppercase">Role / Title</label>
                    <input type="text" required className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none" value={teacherForm.role} onChange={(e) => setTeacherForm({...teacherForm, role: e.target.value})} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-gray-500 uppercase">Gender</label>
                    <select className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none" value={teacherForm.gender} onChange={(e) => setTeacherForm({...teacherForm, gender: e.target.value as 'male' | 'female'})}>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-gray-500 uppercase">Experience</label>
                    <input type="text" required className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none" value={teacherForm.experience} onChange={(e) => setTeacherForm({...teacherForm, experience: e.target.value})} />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-gray-500 uppercase">Qualifications (One per line)</label>
                  <textarea rows={3} required className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none font-mono" value={teacherForm.qualificationsText} onChange={(e) => setTeacherForm({...teacherForm, qualificationsText: e.target.value})} />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-gray-500 uppercase">Avatar Image URL</label>
                  <input type="url" className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none" value={teacherForm.avatarUrl} onChange={(e) => setTeacherForm({...teacherForm, avatarUrl: e.target.value})} />
                </div>

                <button type="submit" className="w-full py-2.5 bg-emerald-950 text-white rounded-lg font-bold hover:bg-emerald-900 transition-colors">
                  {lang === 'bn' ? 'সংরক্ষণ করুন' : 'Save Profile'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Dynamic FAQs Form Dialog */}
      <AnimatePresence>
        {showFaqForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowFaqForm(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl w-full max-w-lg p-6 relative z-10 shadow-xl border border-gray-100 max-h-[85vh] overflow-y-auto"
            >
              <h4 className="font-serif font-bold text-emerald-950 text-base mb-4 border-b border-gray-100 pb-2 flex items-center justify-between">
                <span>{editingFaq ? (lang === 'bn' ? 'প্রশ্নোত্তর সংশোধন' : 'Edit FAQ') : (lang === 'bn' ? 'নতুন প্রশ্নোত্তর' : 'Add New FAQ')}</span>
                <button onClick={() => setShowFaqForm(false)} className="text-gray-400 hover:text-gray-600"><X className="h-4 w-4" /></button>
              </h4>

              <form onSubmit={handleSaveFaq} className="space-y-4 font-sans text-xs">
                <div className="space-y-1">
                  <label className="font-bold text-gray-500 uppercase">Question (BN)</label>
                  <input type="text" required className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none" value={faqForm.question} onChange={(e) => setFaqForm({...faqForm, question: e.target.value})} />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-gray-500 uppercase">Question (EN)</label>
                  <input type="text" required className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none" value={faqForm.questionEn} onChange={(e) => setFaqForm({...faqForm, questionEn: e.target.value})} />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-gray-500 uppercase">Answer (BN)</label>
                  <textarea rows={3} required className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none" value={faqForm.answer} onChange={(e) => setFaqForm({...faqForm, answer: e.target.value})} />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-gray-500 uppercase">Answer (EN)</label>
                  <textarea rows={3} required className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none" value={faqForm.answerEn} onChange={(e) => setFaqForm({...faqForm, answerEn: e.target.value})} />
                </div>

                <button type="submit" className="w-full py-2.5 bg-emerald-950 text-white rounded-lg font-bold hover:bg-emerald-900 transition-colors">
                  {lang === 'bn' ? 'সংরক্ষণ করুন' : 'Save FAQ'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
