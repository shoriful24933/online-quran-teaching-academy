import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, BookMarked, Shield, Award, HeartHandshake, Compass, Clock, Calendar, Check, X, ArrowRight } from 'lucide-react';
import { Course } from '../types';

const iconMap: { [key: string]: any } = {
  BookOpen,
  BookMarked,
  Shield,
  Award,
  HeartHandshake,
  Compass
};

interface CourseCardProps {
  key?: string;
  course: Course;
  lang: 'bn' | 'en';
  onBookTrial: (courseId: string) => void;
}

export default function CourseCard({ course, lang, onBookTrial }: CourseCardProps) {
  const [showDetail, setShowDetail] = React.useState(false);
  const IconComponent = iconMap[course.iconName] || BookOpen;

  return (
    <>
      <motion.div
        whileHover={{ y: -6, scale: 1.01 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="relative bg-white rounded-2xl border border-emerald-950/5 shadow-md hover:shadow-xl hover:border-emerald-800/20 overflow-hidden flex flex-col h-full"
        id={`course_card_${course.id}`}
      >
        {/* Accent Bar */}
        <div className="h-2 w-full bg-gradient-to-r from-gold-500 to-emerald-700" />

        <div className="p-6 sm:p-8 flex flex-col flex-grow">
          {/* Icon Header */}
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-100">
              <IconComponent className="h-6 w-6" />
            </div>
            <div>
              <span className="block text-[11px] font-bold text-gold-600 uppercase tracking-wider">
                {course.weeklyClasses}
              </span>
              <span className="block text-xs text-gray-500">
                {course.duration}
              </span>
            </div>
          </div>

          {/* Titles */}
          <h3 className="text-xl font-bold text-emerald-950 mb-2">
            {lang === 'bn' ? course.title : course.titleEn}
          </h3>

          <p className="text-gray-600 text-sm line-clamp-3 mb-6 leading-relaxed">
            {lang === 'bn' ? course.description : course.descriptionEn}
          </p>

          <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
            <button
              onClick={() => setShowDetail(true)}
              className="text-emerald-800 hover:text-emerald-600 text-xs font-semibold flex items-center space-x-1"
              id={`course_learn_more_${course.id}`}
            >
              <span>{lang === 'bn' ? 'বিস্তারিত সিলেবাস' : 'View Syllabus'}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>

            <button
              onClick={() => onBookTrial(course.id)}
              className="bg-emerald-900 hover:bg-emerald-950 text-white text-xs font-bold px-4 py-2 rounded-lg shadow-sm transition-all"
              id={`course_card_book_${course.id}`}
            >
              {lang === 'bn' ? 'ফ্রি ক্লাস নিন' : 'Book Free Trial'}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Slide-over syllabus modal */}
      <AnimatePresence>
        {showDetail && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            <div className="absolute inset-0 bg-black/55 backdrop-blur-xs" onClick={() => setShowDetail(false)} />

            <div className="absolute inset-y-0 right-0 max-w-full flex">
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                className="w-screen max-w-md bg-white shadow-2xl flex flex-col"
                id={`syllabus_drawer_${course.id}`}
              >
                {/* Drawer Header */}
                <div className="bg-emerald-950 px-6 py-6 text-white flex items-center justify-between">
                  <div>
                    <h4 className="text-lg font-bold text-gold-400">
                      {lang === 'bn' ? 'কোর্স সিলেবাস ও বিবরণ' : 'Course Syllabus'}
                    </h4>
                    <p className="text-xs text-emerald-200/80">
                      {lang === 'bn' ? course.title : course.titleEn}
                    </p>
                  </div>
                  <button
                    onClick={() => setShowDetail(false)}
                    className="p-1 rounded-full text-emerald-100 hover:text-white hover:bg-emerald-900 focus:outline-none"
                    id={`close_syllabus_${course.id}`}
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                {/* Drawer Body */}
                <div className="flex-grow p-6 overflow-y-auto">
                  {/* Meta stats */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-emerald-50/50 border border-emerald-100/30 p-3 rounded-xl flex items-center space-x-2.5">
                      <Clock className="h-5 w-5 text-emerald-800" />
                      <div>
                        <span className="block text-[10px] text-gray-400 uppercase font-semibold">
                          {lang === 'bn' ? 'সময়কাল' : 'Duration'}
                        </span>
                        <span className="block text-xs font-bold text-emerald-950">
                          {course.duration}
                        </span>
                      </div>
                    </div>
                    <div className="bg-emerald-50/50 border border-emerald-100/30 p-3 rounded-xl flex items-center space-x-2.5">
                      <Calendar className="h-5 w-5 text-emerald-800" />
                      <div>
                        <span className="block text-[10px] text-gray-400 uppercase font-semibold">
                          {lang === 'bn' ? 'সাপ্তাহিক ক্লাস' : 'Schedule'}
                        </span>
                        <span className="block text-xs font-bold text-emerald-950">
                          {course.weeklyClasses}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Syllabus outcomes list */}
                  <div className="mb-8">
                    <h5 className="font-bold text-emerald-950 text-sm mb-4 border-b border-gray-100 pb-2">
                      {lang === 'bn' ? 'যা যা শিখানো হবে:' : 'What You Will Learn:'}
                    </h5>
                    <ul className="space-y-3.5">
                      {course.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start space-x-3 text-sm text-gray-700">
                          <span className="p-0.5 bg-emerald-100 text-emerald-800 rounded-full mt-0.5">
                            <Check className="h-3.5 w-3.5" />
                          </span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Highlights */}
                  <div className="bg-amber-50 border border-amber-200/50 p-4 rounded-xl text-amber-900 text-xs space-y-1.5 mb-6">
                    <p className="font-bold">
                      {lang === 'bn' ? '💡 এই কোর্সের বৈশিষ্ট্যসমূহ:' : '💡 Key Features:'}
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-amber-800">
                      <li>{lang === 'bn' ? '১ জন ছাত্রের জন্য ১ জন নির্ধারিত শিক্ষক' : 'Personal 1-to-1 live class environment'}</li>
                      <li>{lang === 'bn' ? 'পুরুষদের জন্য অভিজ্ঞ পুরুষ শিক্ষক এবং নারীদের জন্য নারী শিক্ষিকা' : 'Dedicated male/female certified instructors'}</li>
                      <li>{lang === 'bn' ? 'ক্লাসের পর প্রতিদিনের পড়া ট্র্যাক করার সুযোগ' : 'Daily homework and progress report updates'}</li>
                    </ul>
                  </div>
                </div>

                {/* Drawer Footer */}
                <div className="border-t border-gray-100 p-6 bg-gray-50 flex items-center space-x-3">
                  <button
                    onClick={() => setShowDetail(false)}
                    className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors duration-150 text-sm"
                  >
                    {lang === 'bn' ? 'ফিরে যান' : 'Go Back'}
                  </button>
                  <button
                    onClick={() => {
                      setShowDetail(false);
                      onBookTrial(course.id);
                    }}
                    className="flex-1 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-500 text-emerald-950 font-bold py-3 rounded-xl transition-colors duration-150 text-sm shadow-md"
                    id={`drawer_book_btn_${course.id}`}
                  >
                    {lang === 'bn' ? 'ফ্রি ট্রায়াল নিন' : 'Book Trial Class'}
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
