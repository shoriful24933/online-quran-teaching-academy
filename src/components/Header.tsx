import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Phone, Globe, Menu, X, Sliders, User as UserIcon, LogOut, HardDrive } from 'lucide-react';
import academyLogo from '../assets/images/academy_logo_1782376836871.jpg';
import { User } from '../types';

interface HeaderProps {
  lang: 'bn' | 'en';
  setLang: (lang: 'bn' | 'en') => void;
  onAdminClick: () => void;
  currentUser: User | null;
  onAuthClick: () => void;
  onLogout: () => void;
  onDriveClick: () => void;
}


export default function Header({ lang, setLang, onAdminClick, currentUser, onAuthClick, onLogout, onDriveClick }: HeaderProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const t = {
    bn: {
      academy: 'অনলাইন কুরআন টিচিং একাডেমি',
      slogan: 'শিখুন • বুঝুন • কুরআনের আলোকে জীবন',
      courses: 'আমাদের কোর্সসমূহ',
      teachers: 'শিক্ষকমণ্ডলী',
      makhraj: 'মাখরাজ বোর্ড',
      faq: 'প্রশ্নোত্তর',
      trial: 'ফ্রি ট্রায়াল',
      admin: 'অ্যাডমিন',
    },
    en: {
      academy: 'Online Quran Teaching Academy',
      slogan: 'Learn • Understand • Live by Quran',
      courses: 'Courses',
      teachers: 'Teachers',
      makhraj: 'Tajweed Board',
      faq: 'FAQs',
      trial: 'Free Trial',
      admin: 'Admin Portal',
    }
  };

  const navItems = [
    { href: '#courses', label: t[lang].courses },
    { href: '#teachers', label: t[lang].teachers },
    { href: '#letters', label: t[lang].makhraj },
    { href: '#faq', label: t[lang].faq },
  ];

  return (
    <header className="sticky top-0 z-50 bg-emerald-950/95 backdrop-blur-md border-b border-emerald-800/30 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <a href="#" className="flex items-center space-x-3 group" id="nav_logo">
            <div className="w-12 h-12 bg-white rounded-full overflow-hidden flex items-center justify-center border border-gold-500/30 shadow-lg shadow-gold-500/10 group-hover:scale-105 transition-transform duration-300">
              <img 
                src={academyLogo} 
                alt="Online Quran Teaching Academy Logo" 
                className="w-full h-full object-cover scale-110"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <span className="block h-[32px] w-[132.734px] text-[9px] leading-[15px] sm:h-[28px] sm:w-[320px] sm:text-[14px] sm:leading-[28px] font-bold text-white tracking-wide group-hover:text-gold-400 transition-colors duration-300 font-serif">
                {t[lang].academy}
              </span>
              <span className="block text-[8px] w-[118.094px] sm:text-[11px] sm:w-auto text-gold-500/80 tracking-wider">
                {t[lang].slogan}
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 w-[931.969px]">
            {navItems.map((item) => {
              const itemId = `nav_link_${item.href.replace('#', '')}`;
              let customStyle = '';
              if (itemId === 'nav_link_courses') {
                customStyle = 'w-[143.3594px] text-[12px]';
              } else if (itemId === 'nav_link_teachers') {
                customStyle = 'text-[12px]';
              } else if (itemId === 'nav_link_letters') {
                customStyle = 'w-[127.4219px] text-[12px]';
              } else if (itemId === 'nav_link_faq') {
                customStyle = 'text-[12px]';
              }

              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`text-emerald-100/90 hover:text-gold-400 font-medium transition-colors duration-200 text-center ${customStyle}`}
                  id={itemId}
                >
                  {item.label}
                </a>
              );
            })}

            {/* Language Switcher */}
            <button
              onClick={() => setLang(lang === 'bn' ? 'en' : 'bn')}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full border border-emerald-700/50 hover:border-gold-500 bg-emerald-900/40 text-emerald-100 hover:text-gold-400 font-medium text-xs transition-all duration-300 mr-[16px]"
              id="lang_switch_desktop"
            >
              <Globe className="h-3.5 w-3.5 text-gold-500" />
              <span>{lang === 'bn' ? 'English' : 'বাংলা'}</span>
            </button>

            {/* Study Drive trigger */}
            <button
              onClick={onDriveClick}
              className="flex items-center justify-center space-x-1.5 rounded-full border border-emerald-700/50 hover:border-gold-500 bg-emerald-900/40 text-emerald-100 hover:text-gold-400 font-medium transition-all duration-300 h-[31px] w-[136.9219px] leading-[13px] text-[11px] mr-[13px] pl-[5px] pr-[5px]"
              id="drive_trigger_desktop"
              title={lang === 'bn' ? 'স্টাডি ড্রাইভ রিসোর্স' : 'Study Drive Resources'}
            >
              <HardDrive className="h-3.5 w-3.5 text-gold-500" />
              <span>{lang === 'bn' ? 'স্টাডি ড্রাইভ' : 'Study Drive'}</span>
            </button>

            {/* Admin toggle icon */}
            <button
              onClick={onAdminClick}
              className="p-2 text-emerald-300 hover:text-gold-400 hover:bg-emerald-900/50 rounded-full transition-colors duration-200"
              title={t[lang].admin}
              id="admin_trigger_desktop"
            >
              <Sliders className="h-4.5 w-4.5 mr-[-12px]" />
            </button>

            {/* User Login/Profile badge */}
            {currentUser ? (
              <div className="flex items-center space-x-2 bg-emerald-900/40 border border-emerald-800 rounded-full px-3 py-1.5 text-emerald-100 mr-[16px]" id="user_profile_desktop">
                <UserIcon className="h-3.5 w-3.5 text-gold-400" />
                <span className="text-xs font-bold truncate max-w-[90px]">{currentUser.fullName}</span>
                <button 
                  onClick={onLogout}
                  className="p-1 hover:text-rose-400 transition-colors"
                  title={lang === 'bn' ? 'লগআউট' : 'Sign Out'}
                  id="user_logout_desktop"
                >
                  <LogOut className="h-3.5 w-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={onAuthClick}
                className="flex items-center justify-center space-x-1.5 px-3 py-1.5 rounded-full border border-gold-500/30 hover:border-gold-500 bg-gold-500/10 text-gold-400 hover:text-gold-300 font-bold text-xs transition-all duration-300 mr-[16px] w-[121.3125px]"
                id="user_login_desktop"
              >
                <UserIcon className="h-3.5 w-3.5" />
                <span>{lang === 'bn' ? 'লগইন' : 'Sign In'}</span>
              </button>
            )}

            {/* WhatsApp call button */}
            <a
              href="https://wa.me/8801959865742"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-500 text-emerald-950 font-bold rounded-full shadow-lg shadow-gold-500/10 hover:shadow-gold-500/20 active:scale-95 transition-all duration-300 h-[36px] text-[12px] w-[248.016px] mr-[96px] pl-[10px] pr-[10px]"
              id="header_cta_whatsapp"
            >
              <Phone className="h-4 w-4 ml-[10px]" style={{ fontSize: '10px' }} />
              <span className="text-[11px] border-0 ml-0">{lang === 'bn' ? 'হোয়াটসঅ্যাপ যোগাযোগ' : 'Contact WhatsApp'}</span>
            </a>
          </nav>

          {/* Mobile Menu Trigger */}
          <div className="flex items-center md:hidden space-x-2">
            {currentUser ? (
              <div className="flex items-center space-x-1 bg-emerald-900/50 border border-emerald-800 rounded-full px-2.5 py-1 text-emerald-100 text-xs font-bold" id="user_profile_mobile_header">
                <UserIcon className="h-3 w-3 text-gold-400" />
                <span className="truncate max-w-[65px]">{currentUser.fullName.split(' ')[0]}</span>
                <button onClick={onLogout} className="p-0.5 text-rose-400">
                  <LogOut className="h-3 w-3" />
                </button>
              </div>
            ) : (
              <button
                onClick={onAuthClick}
                className="p-1.5 rounded-full border border-gold-500/30 bg-gold-500/10 text-gold-400 hover:text-gold-300"
                id="user_login_mobile_header"
              >
                <UserIcon className="h-4 w-4" />
              </button>
            )}

            <button
              onClick={() => setLang(lang === 'bn' ? 'en' : 'bn')}
              className="p-1.5 rounded-full border border-emerald-800 bg-emerald-900/50 text-gold-500"
              id="lang_switch_mobile"
            >
              <Globe className="h-4 w-4" />
            </button>

            {/* Study Drive trigger */}
            <button
              onClick={onDriveClick}
              className="p-1.5 rounded-full border border-emerald-800 bg-emerald-900/50 text-gold-500"
              id="drive_trigger_mobile"
              title={lang === 'bn' ? 'স্টাডি ড্রাইভ' : 'Study Drive'}
            >
              <HardDrive className="h-4 w-4" />
            </button>
            
            <button
              onClick={onAdminClick}
              className="p-1.5 rounded-full text-emerald-300 hover:text-gold-400"
              id="admin_trigger_mobile"
            >
              <Sliders className="h-4 w-4" />
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-emerald-200 hover:text-gold-400 focus:outline-none"
              id="mobile_menu_trigger"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-emerald-950 border-b border-emerald-800"
            id="mobile_drawer"
          >
            <div className="px-4 pt-2 pb-6 space-y-3">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2.5 rounded-md text-base font-medium text-emerald-100 hover:bg-emerald-900/60 hover:text-gold-400 transition-all duration-200"
                  id={`mobile_nav_${item.href.replace('#', '')}`}
                >
                  {item.label}
                </a>
              ))}

              <button
                onClick={() => {
                  setIsOpen(false);
                  onDriveClick();
                }}
                className="w-full text-left flex items-center space-x-2 px-3 py-2.5 rounded-md text-base font-bold text-emerald-100 bg-emerald-900/40 hover:bg-emerald-900/80 hover:text-gold-400 transition-all duration-200"
                id="mobile_nav_drive"
              >
                <HardDrive className="h-5 w-5 text-gold-500" />
                <span>{lang === 'bn' ? 'স্টাডি ড্রাইভ' : 'Study Drive'}</span>
              </button>

              <div className="pt-3 border-t border-emerald-900 flex flex-col space-y-3 px-3">
                <a
                  href="https://wa.me/8801959865742"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 bg-gradient-to-r from-gold-500 to-gold-600 text-emerald-950 font-bold py-3 rounded-full text-center shadow-md"
                  id="mobile_whatsapp_btn"
                >
                  <Phone className="h-4.5 w-4.5" />
                  <span>{lang === 'bn' ? 'হোয়াটসঅ্যাপ' : 'WhatsApp'}</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
