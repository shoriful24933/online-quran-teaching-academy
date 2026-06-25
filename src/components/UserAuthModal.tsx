import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Lock, Mail, User as UserIcon, Phone, Eye, EyeOff, CheckCircle, Sparkles, LogIn, KeyRound } from 'lucide-react';
import { User } from '../types';
import { getRegisteredUsers, saveRegisteredUsers, saveLoggedInUser } from '../lib/store';

interface UserAuthModalProps {
  lang: 'bn' | 'en';
  onClose: () => void;
  onSuccess: (user: User) => void;
}

export default function UserAuthModal({ lang, onClose, onSuccess }: UserAuthModalProps) {
  const [activeTab, setActiveTab] = React.useState<'login' | 'register'>('login');
  
  // Fields
  const [email, setEmail] = React.useState('');
  const [fullName, setFullName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  
  // States
  const [errorMsg, setErrorMsg] = React.useState('');
  const [successMsg, setSuccessMsg] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const resetFields = () => {
    setEmail('');
    setFullName('');
    setPhone('');
    setPassword('');
    setErrorMsg('');
    setSuccessMsg('');
  };

  const handleTabChange = (tab: 'login' | 'register') => {
    setActiveTab(tab);
    resetFields();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setIsSubmitting(true);

    // Basic validation
    if (!email || !password) {
      setErrorMsg(lang === 'bn' ? 'অনুগ্রহ করে ইমেইল এবং পাসওয়ার্ড প্রদান করুন।' : 'Please fill in both email and password.');
      setIsSubmitting(false);
      return;
    }

    if (activeTab === 'register' && !fullName) {
      setErrorMsg(lang === 'bn' ? 'অনুগ্রহ করে আপনার পুরো নাম প্রদান করুন।' : 'Please provide your full name.');
      setIsSubmitting(false);
      return;
    }

    // Let's mimic a network request for a super smooth, premium premium UX
    await new Promise((resolve) => setTimeout(resolve, 800));

    try {
      const users = getRegisteredUsers();

      if (activeTab === 'login') {
        const found = users.find(u => u.email.toLowerCase() === email.toLowerCase());
        if (!found || found.password !== password) {
          setErrorMsg(lang === 'bn' ? 'ভুল ইমেইল অথবা পাসওয়ার্ড! পুনরায় চেষ্টা করুন।' : 'Invalid email or password! Please try again.');
          setIsSubmitting(false);
          return;
        }

        // Success Login
        saveLoggedInUser(found);
        setSuccessMsg(lang === 'bn' ? `স্বাগতম, ${found.fullName}! লগইন সফল হয়েছে।` : `Welcome back, ${found.fullName}! Login successful.`);
        setTimeout(() => {
          onSuccess(found);
          onClose();
        }, 1200);

      } else {
        // Register Tab
        const exists = users.some(u => u.email.toLowerCase() === email.toLowerCase());
        if (exists) {
          setErrorMsg(lang === 'bn' ? 'এই ইমেইলটি অলরেডি রেজিস্টার্ড! দয়া করে লগইন করুন।' : 'This email is already registered! Please log in.');
          setIsSubmitting(false);
          return;
        }

        // Create new user
        const newUser: User = {
          id: 'user_' + Date.now(),
          email: email.trim(),
          fullName: fullName.trim(),
          phone: phone.trim() || undefined,
          registeredAt: new Date().toISOString(),
          password: password
        };

        const updatedUsers = [...users, newUser];
        saveRegisteredUsers(updatedUsers);
        saveLoggedInUser(newUser);

        setSuccessMsg(lang === 'bn' ? 'রেজিস্ট্রেশন সফল হয়েছে! অ্যাকাউন্ট তৈরি সম্পন্ন।' : 'Registration successful! Your account is created.');
        setTimeout(() => {
          onSuccess(newUser);
          onClose();
        }, 1200);
      }
    } catch (err) {
      console.error(err);
      setErrorMsg(lang === 'bn' ? 'একটি ত্রুটি ঘটেছে। পুনরায় চেষ্টা করুন।' : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose} />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl border border-gray-100 flex flex-col relative z-10"
        id="user_auth_modal"
      >
        {/* Decorative Top Accent */}
        <div className="h-2 bg-gradient-to-r from-emerald-950 via-gold-500 to-emerald-900" />

        {/* Modal Header */}
        <div className="p-6 pb-0 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-emerald-50 text-emerald-900 rounded-xl">
              <KeyRound className="h-5 w-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-emerald-950">
              {activeTab === 'login' 
                ? (lang === 'bn' ? 'লগইন করুন' : 'Sign In') 
                : (lang === 'bn' ? 'নতুন অ্যাকাউন্ট' : 'Register')}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-gray-400 hover:text-emerald-950 hover:bg-gray-100 transition-colors"
            id="close_auth_modal_btn"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form Content */}
        <div className="p-6">
          {/* Tab Selection */}
          <div className="flex bg-gray-100 p-1 rounded-xl mb-6">
            <button
              onClick={() => handleTabChange('login')}
              className={`flex-1 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all duration-300 ${
                activeTab === 'login'
                  ? 'bg-white text-emerald-950 shadow-sm'
                  : 'text-gray-500 hover:text-emerald-950'
              }`}
              id="auth_tab_login"
            >
              {lang === 'bn' ? 'লগইন' : 'Sign In'}
            </button>
            <button
              onClick={() => handleTabChange('register')}
              className={`flex-1 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all duration-300 ${
                activeTab === 'register'
                  ? 'bg-white text-emerald-950 shadow-sm'
                  : 'text-gray-500 hover:text-emerald-950'
              }`}
              id="auth_tab_register"
            >
              {lang === 'bn' ? 'রেজিস্ট্রেশন' : 'Register'}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name (Only for Register) */}
            {activeTab === 'register' && (
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                  {lang === 'bn' ? 'পুরো নাম' : 'Full Name'} <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-gray-400">
                    <UserIcon className="h-4 w-4" />
                  </span>
                  <input
                    type="text"
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-900/10 focus:border-emerald-900 outline-none text-sm transition-all"
                    placeholder={lang === 'bn' ? 'যেমন: মোহাম্মদ আহমেদ' : 'e.g. John Doe'}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    id="auth_input_fullname"
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                {lang === 'bn' ? 'ইমেইল অ্যাড্রেস' : 'Email Address'} <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-gray-400">
                  <Mail className="h-4 w-4" />
                </span>
                <input
                  type="email"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-900/10 focus:border-emerald-900 outline-none text-sm transition-all"
                  placeholder={lang === 'bn' ? 'যেমন: mail@example.com' : 'e.g. mail@example.com'}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="auth_input_email"
                />
              </div>
            </div>

            {/* Phone (Only for Register) */}
            {activeTab === 'register' && (
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                  {lang === 'bn' ? 'হোয়াটসঅ্যাপ / ফোন নম্বর' : 'WhatsApp / Mobile'}
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-gray-400">
                    <Phone className="h-4 w-4" />
                  </span>
                  <input
                    type="tel"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-900/10 focus:border-emerald-900 outline-none text-sm transition-all"
                    placeholder={lang === 'bn' ? 'যেমন: ০১৯৫৯৮৬৫৭৪২' : 'e.g. +8801959865742'}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    id="auth_input_phone"
                  />
                </div>
              </div>
            )}

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                {lang === 'bn' ? 'পাসওয়ার্ড' : 'Password'} <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-gray-400">
                  <Lock className="h-4 w-4" />
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-900/10 focus:border-emerald-900 outline-none text-sm transition-all"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="auth_input_password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-emerald-950"
                  id="auth_toggle_password_visibility"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {errorMsg && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-rose-500 font-semibold bg-rose-50 p-2.5 rounded-lg border border-rose-100"
              >
                {errorMsg}
              </motion.p>
            )}

            {/* Success Message */}
            {successMsg && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-emerald-800 font-semibold bg-emerald-50 p-2.5 rounded-lg border border-emerald-100 flex items-center space-x-1.5"
              >
                <CheckCircle className="h-4 w-4 text-emerald-600" />
                <span>{successMsg}</span>
              </motion.div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-emerald-950 hover:bg-emerald-900 text-white font-bold rounded-xl text-sm shadow-md hover:shadow-lg hover:shadow-emerald-950/10 active:scale-[0.98] transition-all flex items-center justify-center space-x-2 disabled:opacity-75 disabled:pointer-events-none mt-2"
              id="auth_submit_btn"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/35 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn className="h-4.5 w-4.5 text-gold-400" />
                  <span>
                    {activeTab === 'login'
                      ? (lang === 'bn' ? 'লগইন করুন' : 'Sign In')
                      : (lang === 'bn' ? 'নিবন্ধন সম্পন্ন করুন' : 'Complete Registration')}
                  </span>
                </>
              )}
            </button>
          </form>

          {/* Quick Notice */}
          <div className="mt-6 pt-5 border-t border-gray-100 text-center">
            <p className="text-[11px] text-gray-400 flex items-center justify-center space-x-1">
              <Sparkles className="h-3.5 w-3.5 text-gold-500" />
              <span>
                {lang === 'bn' 
                  ? 'সহীহ কুরআন ও নৈতিক শিক্ষা অর্জনের নির্ভরযোগ্য প্রতিষ্ঠান।' 
                  : 'Trusted Academy for Quranic and Islamic Ethical values.'}
              </span>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
