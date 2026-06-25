import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Phone, BookOpen, Clock, Calendar, Check, ArrowRight, ArrowLeft, Send, Sparkles } from 'lucide-react';
import { Course, Registration } from '../types';
import { courses } from '../data';

interface RegistrationFormProps {
  lang: 'bn' | 'en';
  preselectedCourseId: string;
  onClearPreselectedCourse: () => void;
}

export default function RegistrationForm({ lang, preselectedCourseId, onClearPreselectedCourse }: RegistrationFormProps) {
  const [step, setStep] = React.useState(1);
  const [submittedReg, setSubmittedReg] = React.useState<Registration | null>(null);

  // Form Fields
  const [studentName, setStudentName] = React.useState('');
  const [parentName, setParentName] = React.useState('');
  const [age, setAge] = React.useState<number | ''>('');
  const [phone, setPhone] = React.useState('');
  const [courseId, setCourseId] = React.useState('');
  const [teacherPreference, setTeacherPreference] = React.useState<'male' | 'female' | 'any'>('any');
  const [preferredTime, setPreferredTime] = React.useState('');
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});

  // Auto-fill course from preselection
  React.useEffect(() => {
    if (preselectedCourseId) {
      setCourseId(preselectedCourseId);
      setStep(2); // Jump to course/teacher step directly!
    }
  }, [preselectedCourseId]);

  const validateStep = (currentStep: number) => {
    const errs: { [key: string]: string } = {};
    if (currentStep === 1) {
      if (!studentName.trim()) {
        errs.studentName = lang === 'bn' ? 'শিক্ষার্থীর নাম দিন' : 'Student name is required';
      }
      if (!age || Number(age) <= 0) {
        errs.age = lang === 'bn' ? 'সঠিক বয়স দিন' : 'Please provide a valid age';
      }
      if (!phone.trim()) {
        errs.phone = lang === 'bn' ? 'হোয়াটসঅ্যাপ নম্বর দিন' : 'WhatsApp/Phone number is required';
      } else if (!/^\+?[0-9\s-]{8,15}$/.test(phone.trim())) {
        errs.phone = lang === 'bn' ? 'সঠিক ফোন নম্বর দিন' : 'Provide a valid phone number';
      }
    } else if (currentStep === 2) {
      if (!courseId) {
        errs.courseId = lang === 'bn' ? 'একটি কোর্স নির্বাচন করুন' : 'Please select a course';
      }
    } else if (currentStep === 3) {
      if (!preferredTime) {
        errs.preferredTime = lang === 'bn' ? 'পছন্দনীয় সময় নির্বাচন করুন' : 'Please choose preferred timing';
      }
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(3)) return;

    const newRegistration: Registration = {
      id: 'reg_' + Date.now(),
      studentName,
      parentName,
      age: Number(age),
      phone,
      courseId,
      teacherPreference,
      preferredTime,
      whatsappSubmitted: false,
      createdAt: new Date().toISOString(),
    };

    // Save to LocalStorage
    try {
      const existing = localStorage.getItem('academy_registrations');
      const list = existing ? JSON.parse(existing) : [];
      list.push(newRegistration);
      localStorage.setItem('academy_registrations', JSON.stringify(list));
    } catch (err) {
      console.error('Failed to save registration', err);
    }

    setSubmittedReg(newRegistration);
  };

  const selectedCourseObj = courses.find(c => c.id === (submittedReg?.courseId || courseId));

  const triggerWhatsAppRedirect = () => {
    if (!submittedReg) return;
    
    const courseTitle = selectedCourseObj ? (lang === 'bn' ? selectedCourseObj.title : selectedCourseObj.titleEn) : 'কুরআন শিক্ষা';
    
    // Construct premium WhatsApp message in Bengali
    const textMessage = `আসসালামু আলাইকুম, 
আমি অনলাইন কুরআন টিচিং একাডেমিতে একটি ফ্রি ট্রায়াল ক্লাসের জন্য বুকিং করেছি। আমার বুকিংয়ের বিবরণ নিম্নরূপ:

📖 শিক্ষার্থী: ${submittedReg.studentName}
${submittedReg.parentName ? `👨‍👩‍👦 অভিভাবক: ${submittedReg.parentName}` : ''}
👶 বয়স: ${submittedReg.age} বছর
📱 হোয়াটসঅ্যাপ নম্বর: ${submittedReg.phone}
📚 কোর্স: ${courseTitle}
👨‍🏫 শিক্ষক পছন্দ: ${
      submittedReg.teacherPreference === 'male' 
        ? 'পুরুষ শিক্ষক (Male Teacher)' 
        : submittedReg.teacherPreference === 'female' 
        ? 'মহিলা শিক্ষিকা (Female Teacher)' 
        : 'যেকোনো (Any)'
    }
⏰ পছন্দনীয় সময়: ${submittedReg.preferredTime}

অনুগ্রহ করে আমাদের ট্রায়াল ক্লাসের সময়সূচী নিশ্চিত করুন। ধন্যবাদ!`;

    const encodedText = encodeURIComponent(textMessage);
    const whatsappUrl = `https://wa.me/8801959865742?text=${encodedText}`;
    
    // Update locally that WhatsApp was triggered
    try {
      const existing = localStorage.getItem('academy_registrations');
      if (existing) {
        const list = JSON.parse(existing) as Registration[];
        const updated = list.map(r => r.id === submittedReg.id ? { ...r, whatsappSubmitted: true } : r);
        localStorage.setItem('academy_registrations', JSON.stringify(updated));
      }
    } catch (e) {
      console.error(e);
    }

    window.open(whatsappUrl, '_blank');
  };

  const handleResetForm = () => {
    setStudentName('');
    setParentName('');
    setAge('');
    setPhone('');
    setCourseId('');
    setTeacherPreference('any');
    setPreferredTime('');
    setStep(1);
    setSubmittedReg(null);
    onClearPreselectedCourse();
  };

  const t = {
    bn: {
      trialTitle: 'ফ্রি ট্রায়াল ক্লাস বুকিং করুন',
      trialSubtitle: 'নিচের ধাপগুলো পূরণ করে এখনই ২৪ ঘণ্টার মধ্যে আপনার ফ্রি ট্রায়াল ক্লাসটি বুক করুন!',
      step1: 'প্রাথমিক তথ্য',
      step2: 'কোর্স ও শিক্ষক',
      step3: 'সময় ও শিডিউল',
      studentLabel: 'শিক্ষার্থীর পূর্ণ নাম *',
      studentPlace: 'যেমন: ফারহান আহমেদ',
      parentLabel: 'অভিভাবকের নাম (বাচ্চাদের জন্য)',
      parentPlace: 'যেমন: মোহাম্মদ হোসেন',
      ageLabel: 'শিক্ষার্থীর বয়স *',
      agePlace: 'যেমন: ৮',
      phoneLabel: 'হোয়াটসঅ্যাপ / মোবাইল নম্বর *',
      phonePlace: 'যেমন: 01959865742',
      courseLabel: 'কাঙ্ক্ষিত কোর্স নির্বাচন করুন *',
      teacherLabel: 'শিক্ষক পছন্দ *',
      maleTeacher: 'পুরুষ শিক্ষক',
      femaleTeacher: 'মহিলা শিক্ষিকা',
      anyTeacher: 'যেকোনো শিক্ষক',
      timeLabel: 'পছন্দনীয় সময় নির্বাচন করুন *',
      timeMorning: 'সকাল (০৮:০০ - ১২:০০)',
      timeAfternoon: 'দুপুর (১২:০০ - ০৫:০০)',
      timeEvening: 'সন্ধ্যা ও রাত (০৫:০০ - ১০:০০)',
      timeLate: 'দেরি রাত (১০:০০ - ১২:০০)',
      next: 'পরবর্তী ধাপ',
      back: 'পূর্ববর্তী ধাপ',
      submit: 'বুকিং সম্পন্ন করুন',
      congrats: 'অভিনন্দন! আপনার বুকিং সফল হয়েছে।',
      receiptMsg: 'আপনার ট্রায়াল ক্লাসের আবেদনটি সফলভাবে সিস্টেমে যুক্ত হয়েছে। আপনার ক্লাসটি দ্রুত কনফার্ম করার জন্য নিচে ক্লিক করে বিস্তারিত তথ্য হোয়াটসঅ্যাপে সেন্ড করুন।',
      sendWhatsApp: 'হোয়াটসঅ্যাপে বুকিং সেন্ড করুন',
      bookAnother: 'নতুন আরেকটি বুকিং করুন',
    },
    en: {
      trialTitle: 'Book a Free Trial Class',
      trialSubtitle: 'Fill out the steps to schedule your free demo class within 24 hours!',
      step1: 'Personal Details',
      step2: 'Course & Teacher',
      step3: 'Time Slots',
      studentLabel: 'Student Full Name *',
      studentPlace: 'e.g., Farhan Ahmed',
      parentLabel: 'Parent Name (Optional)',
      parentPlace: 'e.g., Mohammad Hossain',
      ageLabel: 'Student Age *',
      agePlace: 'e.g., 8',
      phoneLabel: 'WhatsApp / Phone Number *',
      phonePlace: 'e.g., 01959865742',
      courseLabel: 'Select Your Desired Course *',
      teacherLabel: 'Teacher Preference *',
      maleTeacher: 'Male Instructor',
      femaleTeacher: 'Female Instructor',
      anyTeacher: 'Any Instructor',
      timeLabel: 'Preferred Timing *',
      timeMorning: 'Morning (08:00 AM - 12:00 PM)',
      timeAfternoon: 'Afternoon (12:00 PM - 05:00 PM)',
      timeEvening: 'Evening & Night (05:00 PM - 10:00 PM)',
      timeLate: 'Late Night (10:00 PM - 12:00 AM)',
      next: 'Next Step',
      back: 'Go Back',
      submit: 'Complete Booking',
      congrats: 'Congratulations! Booking successful.',
      receiptMsg: 'Your trial class request has been recorded. To confirm instantly, click below to send the details to our official WhatsApp helpline.',
      sendWhatsApp: 'Send Booking details to WhatsApp',
      bookAnother: 'Book Another Session',
    }
  };

  const labelClass = "block text-sm font-semibold text-emerald-950 mb-1.5";
  const inputClass = "w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/10 text-gray-800 text-sm bg-white outline-none transition-all duration-150";

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-emerald-900/10 shadow-xl max-w-3xl mx-auto" id="registration_wizard_card">
      <AnimatePresence mode="wait">
        {!submittedReg ? (
          <motion.div
            key="form_wizard"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
          >
            {/* Header */}
            <div className="text-center mb-8">
              <span className="inline-flex items-center space-x-1 bg-emerald-50 text-emerald-800 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles className="h-3 text-gold-600 animate-spin" />
                <span>{lang === 'bn' ? 'ফ্রি ওয়ান-টু-ওয়ান ক্লাস' : 'Free 1-on-1 Class'}</span>
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-emerald-950">
                {t[lang].trialTitle}
              </h2>
              <p className="text-gray-500 text-xs sm:text-sm mt-1">
                {t[lang].trialSubtitle}
              </p>
            </div>

            {/* Stepper Progress */}
            <div className="flex items-center justify-between mb-8 max-w-md mx-auto px-4">
              {[1, 2, 3].map((num) => (
                <div key={num} className="flex items-center flex-1 last:flex-none">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-xs transition-colors duration-200 ${
                    step >= num 
                      ? 'bg-emerald-900 text-white' 
                      : 'bg-gray-100 text-gray-400 border border-gray-200'
                  }`}>
                    {num}
                  </div>
                  {num < 3 && (
                    <div className={`flex-grow h-1 mx-2 rounded-full transition-colors duration-200 ${
                      step > num ? 'bg-emerald-900' : 'bg-gray-100'
                    }`} />
                  )}
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step 1: Personal details */}
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-5"
                >
                  <h3 className="font-bold text-lg text-emerald-950 border-b pb-2 mb-4">
                    {t[lang].step1}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className={labelClass} htmlFor="student_name_field">{t[lang].studentLabel}</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400">
                          <User className="h-4 w-4" />
                        </span>
                        <input
                          id="student_name_field"
                          type="text"
                          className={`${inputClass} pl-10`}
                          placeholder={t[lang].studentPlace}
                          value={studentName}
                          onChange={(e) => {
                            setStudentName(e.target.value);
                            if (errors.studentName) setErrors(p => ({ ...p, studentName: '' }));
                          }}
                        />
                      </div>
                      {errors.studentName && <span className="text-rose-500 text-xs mt-1 block">{errors.studentName}</span>}
                    </div>

                    <div>
                      <label className={labelClass} htmlFor="parent_name_field">{t[lang].parentLabel}</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400">
                          <User className="h-4 w-4" />
                        </span>
                        <input
                          id="parent_name_field"
                          type="text"
                          className={`${inputClass} pl-10`}
                          placeholder={t[lang].parentPlace}
                          value={parentName}
                          onChange={(e) => setParentName(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className={labelClass} htmlFor="student_age_field">{t[lang].ageLabel}</label>
                      <input
                        id="student_age_field"
                        type="number"
                        className={inputClass}
                        placeholder={t[lang].agePlace}
                        value={age}
                        onChange={(e) => {
                          const val = e.target.value;
                          setAge(val === '' ? '' : Number(val));
                          if (errors.age) setErrors(p => ({ ...p, age: '' }));
                        }}
                      />
                      {errors.age && <span className="text-rose-500 text-xs mt-1 block">{errors.age}</span>}
                    </div>

                    <div>
                      <label className={labelClass} htmlFor="student_phone_field">{t[lang].phoneLabel}</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400">
                          <Phone className="h-4 w-4" />
                        </span>
                        <input
                          id="student_phone_field"
                          type="tel"
                          className={`${inputClass} pl-10`}
                          placeholder={t[lang].phonePlace}
                          value={phone}
                          onChange={(e) => {
                            setPhone(e.target.value);
                            if (errors.phone) setErrors(p => ({ ...p, phone: '' }));
                          }}
                        />
                      </div>
                      {errors.phone && <span className="text-rose-500 text-xs mt-1 block">{errors.phone}</span>}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Course & Teacher */}
              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-5"
                >
                  <h3 className="font-bold text-lg text-emerald-950 border-b pb-2 mb-4">
                    {t[lang].step2}
                  </h3>

                  <div>
                    <label className={labelClass} htmlFor="course_select_field">{t[lang].courseLabel}</label>
                    <select
                      id="course_select_field"
                      className={inputClass}
                      value={courseId}
                      onChange={(e) => {
                        setCourseId(e.target.value);
                        if (errors.courseId) setErrors(p => ({ ...p, courseId: '' }));
                      }}
                    >
                      <option value="">{lang === 'bn' ? 'কোর্স নির্বাচন করুন...' : 'Select a course...'}</option>
                      {courses.map(c => (
                        <option key={c.id} value={c.id}>
                          {lang === 'bn' ? c.title : c.titleEn} ({c.duration})
                        </option>
                      ))}
                    </select>
                    {errors.courseId && <span className="text-rose-500 text-xs mt-1 block">{errors.courseId}</span>}
                  </div>

                  <div>
                    <label className={labelClass}>{t[lang].teacherLabel}</label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { id: 'any', label: t[lang].anyTeacher },
                        { id: 'male', label: t[lang].maleTeacher },
                        { id: 'female', label: t[lang].femaleTeacher }
                      ].map((pref) => (
                        <button
                          key={pref.id}
                          type="button"
                          onClick={() => setTeacherPreference(pref.id as any)}
                          className={`py-3.5 px-3 rounded-xl border text-xs sm:text-sm font-semibold transition-all ${
                            teacherPreference === pref.id
                              ? 'bg-emerald-900 border-emerald-900 text-white shadow-md'
                              : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          {pref.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Timings */}
              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-5"
                >
                  <h3 className="font-bold text-lg text-emerald-950 border-b pb-2 mb-4">
                    {t[lang].step3}
                  </h3>

                  <div>
                    <label className={labelClass}>{t[lang].timeLabel}</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {[
                        { id: 'morning', text: t[lang].timeMorning },
                        { id: 'afternoon', text: t[lang].timeAfternoon },
                        { id: 'evening', text: t[lang].timeEvening },
                        { id: 'late_night', text: t[lang].timeLate }
                      ].map((slot) => (
                        <button
                          key={slot.id}
                          type="button"
                          onClick={() => {
                            setPreferredTime(slot.text);
                            if (errors.preferredTime) setErrors(p => ({ ...p, preferredTime: '' }));
                          }}
                          className={`py-3.5 px-4 rounded-xl border flex items-center justify-between text-sm font-semibold transition-all ${
                            preferredTime === slot.text
                              ? 'bg-emerald-900 border-emerald-900 text-white shadow-md'
                              : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          <span>{slot.text}</span>
                          <Clock className={`h-4 w-4 ${preferredTime === slot.text ? 'text-gold-400' : 'text-gray-400'}`} />
                        </button>
                      ))}
                    </div>
                    {errors.preferredTime && <span className="text-rose-500 text-xs mt-2 block">{errors.preferredTime}</span>}
                  </div>
                </motion.div>
              )}

              {/* Form Actions */}
              <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="inline-flex items-center space-x-1.5 px-5 py-3 border border-gray-300 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 active:scale-95 transition-all"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>{t[lang].back}</span>
                  </button>
                ) : (
                  <div />
                )}

                {step < 3 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="inline-flex items-center space-x-1.5 px-6 py-3.5 bg-emerald-900 hover:bg-emerald-950 text-white rounded-xl text-sm font-bold shadow-md active:scale-95 transition-all"
                    id="booking_form_next_btn"
                  >
                    <span>{t[lang].next}</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="inline-flex items-center space-x-1.5 px-6 py-3.5 bg-gradient-to-r from-gold-500 to-gold-600 text-emerald-950 rounded-xl text-sm font-extrabold shadow-lg shadow-gold-500/10 hover:shadow-gold-500/20 active:scale-95 transition-all"
                    id="booking_form_submit_btn"
                  >
                    <span>{t[lang].submit}</span>
                    <Send className="h-4 w-4" />
                  </button>
                )}
              </div>
            </form>
          </motion.div>
        ) : (
          /* Confirmation Receipt view */
          <motion.div
            key="receipt_success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6 text-center"
          >
            <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-emerald-500 animate-bounce">
              <Check className="h-8 w-8" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-emerald-950">
              {t[lang].congrats}
            </h2>

            <p className="text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
              {t[lang].receiptMsg}
            </p>

            {/* Receipt Summary Card */}
            <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5 text-left text-sm max-w-md mx-auto space-y-3.5 shadow-sm">
              <div className="flex justify-between border-b border-emerald-800/10 pb-2">
                <span className="text-gray-500">{lang === 'bn' ? 'শিক্ষার্থী' : 'Student'}</span>
                <span className="font-bold text-emerald-950">{submittedReg.studentName}</span>
              </div>
              {submittedReg.parentName && (
                <div className="flex justify-between border-b border-emerald-800/10 pb-2">
                  <span className="text-gray-500">{lang === 'bn' ? 'অভিভাবক' : 'Parent'}</span>
                  <span className="font-bold text-emerald-950">{submittedReg.parentName}</span>
                </div>
              )}
              <div className="flex justify-between border-b border-emerald-800/10 pb-2">
                <span className="text-gray-500">{lang === 'bn' ? 'বয়স' : 'Age'}</span>
                <span className="font-bold text-emerald-950">{submittedReg.age} {lang === 'bn' ? 'বছর' : 'years'}</span>
              </div>
              <div className="flex justify-between border-b border-emerald-800/10 pb-2">
                <span className="text-gray-500">{lang === 'bn' ? 'কোর্স' : 'Selected Course'}</span>
                <span className="font-bold text-emerald-900">
                  {selectedCourseObj ? (lang === 'bn' ? selectedCourseObj.title : selectedCourseObj.titleEn) : 'কুরআন শিক্ষা'}
                </span>
              </div>
              <div className="flex justify-between border-b border-emerald-800/10 pb-2">
                <span className="text-gray-500">{lang === 'bn' ? 'শিক্ষক পছন্দ' : 'Instructor Preference'}</span>
                <span className="font-bold text-emerald-950 capitalize">{submittedReg.teacherPreference === 'any' ? (lang === 'bn' ? 'যেকোনো' : 'Any') : (submittedReg.teacherPreference === 'male' ? (lang === 'bn' ? 'পুরুষ শিক্ষক' : 'Male') : (lang === 'bn' ? 'মহিলা শিক্ষিকা' : 'Female'))}</span>
              </div>
              <div className="flex justify-between pb-1">
                <span className="text-gray-500">{lang === 'bn' ? 'পছন্দনীয় সময়' : 'Preferred Slot'}</span>
                <span className="font-bold text-emerald-950">{submittedReg.preferredTime}</span>
              </div>
            </div>

            {/* Direct WhatsApp Call to Action */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
              <button
                onClick={triggerWhatsAppRedirect}
                className="w-full sm:flex-1 py-4 px-5 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-extrabold rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2 animate-pulse"
                id="receipt_whatsapp_btn"
              >
                <Send className="h-5 w-5" />
                <span>{t[lang].sendWhatsApp}</span>
              </button>
            </div>

            <div>
              <button
                onClick={handleResetForm}
                className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 hover:underline"
              >
                {t[lang].bookAnother}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
