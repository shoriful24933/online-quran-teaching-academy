import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, BookOpen, Sparkles, Check } from 'lucide-react';
import { arabicLetters } from '../data';
import { ArabicLetter } from '../types';

interface LetterBoardProps {
  lang: 'bn' | 'en';
}

export default function LetterBoard({ lang }: LetterBoardProps) {
  const [selectedLetter, setSelectedLetter] = React.useState<ArabicLetter>(arabicLetters[0]);
  const [playing, setPlaying] = React.useState(false);

  const speakLetter = (letter: ArabicLetter) => {
    if (!('speechSynthesis' in window)) return;
    
    setPlaying(true);
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(letter.audioText);
    
    // Try to find an Arabic voice for authentic sound
    const voices = window.speechSynthesis.getVoices();
    const arabicVoice = voices.find(voice => voice.lang.startsWith('ar'));
    
    if (arabicVoice) {
      utterance.voice = arabicVoice;
      utterance.rate = 0.7; // Slow down for clarity
    } else {
      utterance.rate = 0.6;
    }
    
    utterance.onend = () => setPlaying(false);
    utterance.onerror = () => setPlaying(false);
    window.speechSynthesis.speak(utterance);
  };

  React.useEffect(() => {
    // Populate voices for the browser
    if ('speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
    }
  }, []);

  return (
    <div className="bg-emerald-950 text-white rounded-3xl p-6 sm:p-10 border border-emerald-800 shadow-2xl relative overflow-hidden" id="tajweed_interactive_board">
      {/* Background patterns */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-800/10 rounded-full blur-3xl" />

      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="inline-flex items-center space-x-1 bg-gold-500/10 border border-gold-500/20 px-3.5 py-1.5 rounded-full text-xs font-bold text-gold-400 uppercase tracking-wide">
          <Sparkles className="h-3.5 w-3.5" />
          <span>{lang === 'bn' ? 'তাজবীদ ও উচ্চারণ বোর্ড' : 'Interactive Tajweed Guide'}</span>
        </span>
        <h2 className="text-2xl sm:text-3.5xl font-extrabold text-white mt-4 tracking-tight">
          {lang === 'bn' ? 'সহজে হরফ ও সঠিক মাখরাজ শিখুন' : 'Learn Arabic Letters & Articulation'}
        </h2>
        <p className="text-emerald-200/80 text-sm sm:text-base mt-2">
          {lang === 'bn' 
            ? 'আরবি অক্ষরের উপর ক্লিক করে তিলাওয়াতের মাকড়সা (মাখরাজ) এবং সঠিক উচ্চারণ জেনে নিন।' 
            : 'Click on any Arabic alphabet below to discover its origin of sound, pronunciation tips, and listen to the voice.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative z-10">
        {/* Left Side: Interactive Alphabet Selector Grid */}
        <div className="lg:col-span-7 bg-emerald-900/40 border border-emerald-800/50 p-6 rounded-2xl flex flex-col justify-between">
          <div>
            <h3 className="text-gold-400 font-bold text-sm mb-4 flex items-center space-x-2">
              <BookOpen className="h-4 w-4" />
              <span>{lang === 'bn' ? 'আরবি হরফসমূহ:' : 'Arabic Alphabets:'}</span>
            </h3>
            <div className="grid grid-cols-5 sm:grid-cols-7 gap-3">
              {arabicLetters.map((letter) => {
                const isSelected = selectedLetter.char === letter.char;
                return (
                  <button
                    key={letter.char}
                    onClick={() => {
                      setSelectedLetter(letter);
                      speakLetter(letter);
                    }}
                    className={`h-14 w-full flex flex-col items-center justify-center rounded-xl font-bold transition-all duration-200 select-none ${
                      isSelected
                        ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-emerald-950 scale-105 shadow-lg shadow-gold-500/10'
                        : 'bg-emerald-900/60 hover:bg-emerald-800 text-emerald-100 hover:text-white border border-emerald-800/30'
                    }`}
                    id={`alphabet_btn_${letter.transliteration.toLowerCase()}`}
                  >
                    <span className="arabic-text text-2xl leading-none font-bold">{letter.char}</span>
                    <span className="text-[9px] font-medium tracking-wide leading-tight mt-0.5 opacity-80">
                      {lang === 'bn' ? letter.name : letter.transliteration}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-emerald-800/30 text-xs text-emerald-300/80 flex items-center space-x-2">
            <div className="h-1.5 w-1.5 rounded-full bg-gold-400 animate-pulse" />
            <p>{lang === 'bn' ? 'হরফে ক্লিক করলে উচ্চারণ অডিও স্বয়ংক্রিয়ভাবে বেজে উঠবে।' : 'Click any letter to trigger the instant audio guide.'}</p>
          </div>
        </div>

        {/* Right Side: Detailed Card View */}
        <div className="lg:col-span-5 bg-white text-emerald-950 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden border border-emerald-900/10">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-full -z-10" />

          <div>
            {/* Letter Callout */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
              <div>
                <span className="inline-block bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider mb-1">
                  {selectedLetter.transliteration}
                </span>
                <h4 className="text-xl font-bold text-emerald-950">
                  {lang === 'bn' ? `হরফ: ${selectedLetter.name}` : `Letter: ${selectedLetter.transliteration}`}
                </h4>
              </div>
              
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-emerald-900 text-white flex items-center justify-center shadow-md">
                  <span className="arabic-text text-4xl font-bold leading-none">{selectedLetter.char}</span>
                </div>
              </div>
            </div>

            {/* Makhraj / Articulation Details */}
            <div className="space-y-4 mb-6">
              <div>
                <span className="block text-[11px] uppercase font-bold tracking-wider text-gold-600">
                  {lang === 'bn' ? 'মাখরাজ (উচ্চারণ স্থান)' : 'Place of Articulation (Makhraj)'}
                </span>
                <p className="text-sm text-gray-700 font-medium leading-relaxed mt-1">
                  {lang === 'bn' ? selectedLetter.makhraj : selectedLetter.englishMakhraj}
                </p>
              </div>

              <div>
                <span className="block text-[11px] uppercase font-bold tracking-wider text-gold-600">
                  {lang === 'bn' ? 'উদাহরণ শব্দ' : 'Vocabulary Example'}
                </span>
                <div className="flex items-center space-x-3 mt-1 bg-emerald-50/50 p-2.5 rounded-lg border border-emerald-100/30">
                  <span className="arabic-text text-lg font-bold text-emerald-900">{selectedLetter.exampleWord}</span>
                  <span className="text-xs text-gray-500">— {selectedLetter.exampleTranslation}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Pronunciation Play Button */}
          <button
            onClick={() => speakLetter(selectedLetter)}
            disabled={playing}
            className={`w-full py-3 px-4 rounded-xl font-bold flex items-center justify-center space-x-2 transition-all ${
              playing
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
                : 'bg-emerald-950 text-white hover:bg-emerald-900 shadow-md shadow-emerald-950/10'
            }`}
            id="speak_letter_btn"
          >
            <Volume2 className={`h-4.5 w-4.5 ${playing ? 'animate-bounce text-gray-400' : 'text-gold-400'}`} />
            <span>
              {playing 
                ? (lang === 'bn' ? 'শোনাচ্ছে...' : 'Pronouncing...') 
                : (lang === 'bn' ? 'শুদ্ধ উচ্চারণ শুনুন' : 'Listen to Pronunciation')}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
