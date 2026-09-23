import { User, Award, LogOut, Globe, GraduationCap } from 'lucide-react';
import { StudentLevel, ThemeMode, StudentClass, STUDENT_CLASS_OPTIONS } from '../types';
import ThemeToggle from './ThemeToggle';

interface StudentSettingsProps {
  username: string;
  level: StudentLevel;
  onLogout: () => void;
  language: 'en' | 'te';
  setLanguage: (lang: 'en' | 'te') => void;
  t: (en: string, te: string) => string;
  theme: ThemeMode;
  onToggleTheme: () => void;
  studentClass?: StudentClass;
}

export default function StudentSettings({
  username,
  level,
  onLogout,
  language,
  setLanguage,
  t,
  theme,
  onToggleTheme,
  studentClass,
}: StudentSettingsProps) {
  const currentClassMeta = studentClass ? STUDENT_CLASS_OPTIONS.find((c) => c.value === studentClass) : null;
  return (
    <div className="animate-in fade-in duration-300 max-w-2xl mx-auto pt-6">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white mb-2">
          {t('Settings', 'సెట్టింగ్‌లు')}
        </h1>
        <p className="text-neutral-500 dark:text-neutral-400 font-medium">
          {t('Manage your student account details and preferences.', 'మీ విద్యార్థి ఖాతా వివరాలు మరియు ప్రాధాన్యతలను నిర్వహించండి.')}
        </p>
      </div>

      <div className="bg-white dark:bg-neutral-800 rounded-[32px] p-6 md:p-8 border border-black/5 dark:border-white/5 shadow-sm space-y-6">
        
        {/* Student Account Details Card */}
        <div className="p-5 rounded-2xl bg-neutral-50/80 dark:bg-neutral-700/40 border border-neutral-100 dark:border-neutral-700 flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-neutral-200/70 dark:border-neutral-600/70 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-app-lime/40 text-black flex items-center justify-center font-bold">
                <User size={20} />
              </div>
              <div>
                <span className="text-xs text-neutral-400 dark:text-neutral-400 font-semibold uppercase tracking-wider block">
                  {t('Username / Name', 'వినియోగదారు పేరు / పేరు')}
                </span>
                <span className="text-xl font-bold text-neutral-900 dark:text-white">
                  {username || 'Student'}
                </span>
              </div>
            </div>
            <span className="text-xs font-semibold px-3 py-1 bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300 rounded-full">
              {t('Active Session', 'యాక్టివ్ సెషన్')}
            </span>
          </div>

          {/* Enrolled Class Row */}
          <div className="flex items-center justify-between border-b border-neutral-200/70 dark:border-neutral-600/70 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 flex items-center justify-center font-bold">
                <GraduationCap size={20} />
              </div>
              <div>
                <span className="text-xs text-neutral-400 dark:text-neutral-400 font-semibold uppercase tracking-wider block">
                  {t('Enrolled Class / Grade', 'నమోదైన తరగతి')}
                </span>
                <span className="text-xl font-bold text-neutral-900 dark:text-white">
                  {currentClassMeta ? t(currentClassMeta.labelEn, currentClassMeta.labelTe) : (studentClass || 'Class 5')}
                </span>
              </div>
            </div>
            <span className="text-sm font-extrabold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/70 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-800">
              {currentClassMeta ? t(currentClassMeta.categoryEn, currentClassMeta.categoryTe) : 'School'}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 flex items-center justify-center font-bold">
                <Award size={20} />
              </div>
              <div>
                <span className="text-xs text-neutral-400 dark:text-neutral-400 font-semibold uppercase tracking-wider block">
                  {t('Current Level', 'ప్రస్తుత స్థాయి')}
                </span>
                <span className="text-xl font-bold text-neutral-900 dark:text-white">
                  {t(level, level === 'Beginner' ? 'ప్రారంభం' : level === 'Intermediate' ? 'మధ్యస్థం' : 'అధునాతనం')}
                </span>
              </div>
            </div>
            <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400 bg-white dark:bg-neutral-800 px-3 py-1 rounded-full border border-neutral-200 dark:border-neutral-600">
              {level === 'Beginner' ? t('Grade 1–3 Focus', '1–3 తరగతులు') : level === 'Intermediate' ? t('Grade 4–6 Focus', '4–6 తరగతులు') : t('Grade 7–10 Focus', '7–10 తరగతులు')}
            </span>
          </div>
        </div>

        {/* Theme Preference */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-neutral-50/50 dark:bg-neutral-700/30 border border-neutral-100 dark:border-neutral-700">
          <div>
            <p className="font-semibold text-neutral-900 dark:text-white text-sm md:text-base">
              {t('Interface Theme', 'ఇంటర్‌ఫేస్ థీమ్')}
            </p>
            <p className="text-xs text-neutral-400 dark:text-neutral-400">
              {t('Switch between light and eye-friendly dark appearance', 'లైట్ మరియు డార్క్ మోడ్ మధ్య మారండి')}
            </p>
          </div>
          <ThemeToggle theme={theme} onToggle={onToggleTheme} t={t} showLabel />
        </div>

        {/* Language Preference */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-neutral-50/50 dark:bg-neutral-700/30 border border-neutral-100 dark:border-neutral-700">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-300 flex items-center justify-center">
              <Globe size={18} />
            </div>
            <div>
              <p className="font-semibold text-neutral-900 dark:text-white text-sm md:text-base">{t('Display Language', 'ప్రదర్శన భాష')}</p>
              <p className="text-xs text-neutral-400 dark:text-neutral-400">{t('Switch between English and Telugu', 'ఇంగ్లీష్ మరియు తెలుగు మధ్య మారండి')}</p>
            </div>
          </div>
          <div className="flex items-center bg-neutral-200/70 dark:bg-neutral-700 p-1 rounded-xl">
            <button
              onClick={() => setLanguage('en')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                language === 'en' ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-xs' : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('te')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                language === 'te' ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-xs' : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              తెలుగు
            </button>
          </div>
        </div>

        {/* Log Out Action */}
        <div className="pt-4 border-t border-neutral-100 dark:border-neutral-700">
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 py-4 px-6 bg-red-50 hover:bg-red-100 dark:bg-red-950/40 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 font-bold rounded-2xl transition-all active:scale-[0.99] border border-red-200/50 dark:border-red-800/40 cursor-pointer"
          >
            <LogOut size={20} />
            <span>{t('Log Out', 'లాగ్ అవుట్ చేయండి')}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
