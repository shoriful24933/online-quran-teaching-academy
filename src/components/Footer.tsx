import React from 'react';
import { BookOpen, Phone, MapPin, Globe, Sparkles, MessageSquare } from 'lucide-react';
import academyLogo from '../assets/images/academy_logo_1782376836871.jpg';

interface FooterProps {
  lang: 'bn' | 'en';
}

export default function Footer({ lang }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const t = {
    bn: {
      about: 'বিশ্বের যেকোনো প্রান্ত থেকে সহীহ-শুদ্ধভাবে কুরআন, কায়দা, তাজবীদ, নামাজ ও নিত্যপ্রয়োজনীয় ইবাদত ও মাসআলা-মাসায়েল শেখার একটি বিশ্বস্ত ও নিরাপদ অনলাইন প্রতিষ্ঠান। অভিজ্ঞ হাফেজ ও কারী শিক্ষকমণ্ডলী দ্বারা পরম যত্নে ও স্নেহে পাঠদান করা হয়।',
      slogan: 'শিখুন • বুঝুন • কুরআনের আলোকে জীবন গড়ুন',
      courses: 'আমাদের কোর্সসমূহ',
      contact: 'যোগাযোগ ও তথ্য',
      address: 'বিশ্বের যেকোনো প্রান্ত থেকে (অনলাইন ক্লাস)',
      phone: '+880 1959-865742',
      site: 'online-quran-teching-academy.youware.app',
      allRights: 'অনলাইন কুরআন টিচিং একাডেমি। সর্বস্বত্ব সংরক্ষিত।',
      credit: 'সহীহ কুরআন ও দ্বীন শিক্ষার বিশ্বস্ত বুনিয়াদ।'
    },
    en: {
      about: 'A highly trusted and secure online academy to learn Quran with perfect Tajweed, Noorani Qaida, Salah rules, and essential Islamic ethics. Guided by certified male and female teachers with customized schedules.',
      slogan: 'Learn • Understand • Live by the Quran',
      courses: 'Our Courses',
      contact: 'Contact Info',
      address: 'Accessible Globally (Online 1-to-1 Classes)',
      phone: '+880 1959-865742',
      site: 'online-quran-teching-academy.youware.app',
      allRights: 'Online Quran Teaching Academy. All Rights Reserved.',
      credit: 'Building a Strong Foundation of Divine Knowledge.'
    }
  };

  return (
    <footer className="bg-emerald-950 text-white border-t border-emerald-800/40" id="academy_footer">
      {/* Upper Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          {/* Column 1: About */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-full overflow-hidden flex items-center justify-center border border-gold-500/30 shadow-md">
                <img 
                  src={academyLogo} 
                  alt="Online Quran Teaching Academy Logo" 
                  className="w-full h-full object-cover scale-110"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="font-extrabold text-lg sm:text-xl tracking-wide font-serif">
                {lang === 'bn' ? 'অনলাইন কুরআন টিচিং একাডেমি' : 'Online Quran Academy'}
              </span>
            </div>
            <p className="text-emerald-100/70 text-sm leading-relaxed max-w-md">
              {t[lang].about}
            </p>
            <div className="inline-flex items-center space-x-1 bg-gold-500/10 border border-gold-500/20 px-3.5 py-1.5 rounded-full text-[10px] sm:text-xs font-bold text-gold-400 tracking-wide">
              <Sparkles className="h-3 w-3" />
              <span>{t[lang].slogan}</span>
            </div>
          </div>

          {/* Column 2: Quick Courses */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-gold-400 font-extrabold text-sm uppercase tracking-wider border-b border-emerald-800/40 pb-2">
              {t[lang].courses}
            </h4>
            <ul className="space-y-2 text-sm text-emerald-100/80">
              <li>{lang === 'bn' ? '• নূরানী কায়েদা শিক্ষা' : '• Noorani Qaida'}</li>
              <li>{lang === 'bn' ? '• শুদ্ধ কুরআন তিলাওয়াত' : '• Quran Recitation'}</li>
              <li>{lang === 'bn' ? '• তাজবীদ শিক্ষা' : '• Tajweed & Pronunciation'}</li>
              <li>{lang === 'bn' ? '• সূরা মুখস্থ করানো' : '• Surah Memorization'}</li>
              <li>{lang === 'bn' ? '• নামাজ ও মাসআলা শিক্ষা' : '• Salah & Supplications'}</li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-gold-400 font-extrabold text-sm uppercase tracking-wider border-b border-emerald-800/40 pb-2">
              {t[lang].contact}
            </h4>
            <ul className="space-y-3 text-sm text-emerald-100/80">
              <li className="flex items-start space-x-3">
                <MapPin className="h-4.5 w-4.5 text-gold-500 shrink-0 mt-0.5" />
                <span>{t[lang].address}</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-4.5 w-4.5 text-gold-500 shrink-0" />
                <a href="https://wa.me/8801959865742" className="hover:text-gold-400 transition-colors font-bold">
                  {t[lang].phone}
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Globe className="h-4.5 w-4.5 text-gold-500 shrink-0" />
                <a href={`https://${t[lang].site}`} target="_blank" rel="noopener noreferrer" className="hover:text-gold-400 transition-colors font-mono">
                  {t[lang].site}
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <MessageSquare className="h-4.5 w-4.5 text-gold-500 shrink-0" />
                <span>WhatsApp Active 24/7 Support</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-emerald-950 border-t border-emerald-900/60 py-6 text-center text-xs text-emerald-300/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>
            &copy; {currentYear} {t[lang].allRights}
          </p>
          <p className="italic text-gold-500/85">
            {t[lang].credit}
          </p>
        </div>
      </div>
    </footer>
  );
}
