import { ArrowRight, BookOpen, PlayCircle } from 'lucide-react';
import { StudentLevel, AssignedTask, StudentClass } from '../types';
import { getChaptersForLevel } from '../data/curriculumData';

interface StudentDashboardProps {
  t: (en: string, te: string) => string;
  onPractice: () => void;
  onLearn: () => void;
  level: StudentLevel;
  taskProgress?: number;
  assignedTasks?: AssignedTask[];
  onSelectAssignedTask?: (task: AssignedTask) => void;
  studentName?: string;
  studentClass?: StudentClass;
  onSelectChapter?: (chapterId: string, action: 'learn' | 'test') => void;
  language?: 'en' | 'te';
}

export default function StudentDashboard({
  t,
  onPractice,
  onLearn,
  level = 'Beginner',
  studentName = 'Student',
  studentClass = 'Class 1',
  onSelectChapter,
}: StudentDashboardProps) {
  const studentChapters = getChaptersForLevel(level);
  const currentLevel = level;

  // Minimalist shape indicator for mobile & tablet
  const renderShapeIcon = (shapeType: string, numberLabel?: string) => {
    switch (shapeType) {
      case 'circle':
        return (
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/40 flex items-center justify-center font-black text-xs sm:text-sm shrink-0">
            {numberLabel || '●'}
          </div>
        );
      case 'square':
        return (
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/40 flex items-center justify-center font-black text-xs sm:text-sm shrink-0">
            {numberLabel || '■'}
          </div>
        );
      case 'triangle':
        return (
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/40 flex items-center justify-center font-black text-xs sm:text-sm shrink-0">
            {numberLabel || '▲'}
          </div>
        );
      default:
        return (
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#D4F670]/25 text-[#1a1a1a] dark:text-[#D4F670] border border-[#D4F670]/50 flex items-center justify-center font-black text-xs sm:text-sm shrink-0">
            {numberLabel || '★'}
          </div>
        );
    }
  };

  return (
    <div className="animate-in fade-in duration-300 max-w-4xl mx-auto space-y-5 sm:space-y-6 pb-12 px-1 sm:px-2">
      {/* Clean Minimalist Header for Phone & Tablet */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pt-1 pb-1">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
            {t('Hello, ', 'నమస్కారం, ')}{studentName} 👋
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
            {studentClass} • {t(`${currentLevel} Level Syllabus`, currentLevel === 'Beginner' ? 'ప్రారంభ స్థాయి సిలబస్' : currentLevel === 'Intermediate' ? 'మధ్యస్థ స్థాయి సిలబస్' : 'అధునాతన స్థాయి సిలబస్')}
          </p>
        </div>
      </div>

      {/* Ready to be Learnt Section - Dynamically matching active session level */}
      <div className="space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D4F670] inline-block animate-pulse"></span>
            <h2 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white">
              {t('Ready to be Learnt', 'నేర్చుకోవడానికి సిద్ధంగా ఉన్న పాఠాలు')}
            </h2>
          </div>
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#D4F670]/20 text-[#1a1a1a] dark:text-[#D4F670] border border-[#D4F670]/40">
            {t(`${currentLevel} Level (${studentChapters.length} Chapters)`, `${currentLevel === 'Beginner' ? 'ప్రారంభ' : currentLevel === 'Intermediate' ? 'మధ్యస్థ' : 'అధునాతన'} స్థాయి (${studentChapters.length} అధ్యాయాలు)`)}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {studentChapters.map((ch) => (
            <div
              key={ch.id}
              className="bg-white dark:bg-neutral-800 rounded-2xl p-4 sm:p-5 border border-black/5 dark:border-white/5 shadow-xs hover:border-[#D4F670]/80 transition-all flex flex-col justify-between gap-3 group"
            >
              <div>
                {/* Header: Visual Shape + Chapter Info */}
                <div className="flex items-center gap-2.5 mb-2.5">
                  {renderShapeIcon(ch.visualShape, String(ch.chapterNumber))}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">
                        {t(`Chapter ${ch.chapterNumber}`, `అధ్యాయం ${ch.chapterNumber}`)}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                        {t(ch.badgeEn, ch.badgeTe)}
                      </span>
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-neutral-900 dark:text-white leading-snug group-hover:text-emerald-600 dark:group-hover:text-[#D4F670] transition-colors truncate">
                      {t(ch.titleEn, ch.titleTe)}
                    </h3>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  {t(ch.shortDescriptionEn, ch.shortDescriptionTe)}
                </p>
              </div>

              {/* Minimal Touch-Friendly Actions for Phone & Tablet */}
              <div className="flex items-center gap-2 pt-2 border-t border-neutral-100 dark:border-neutral-700/60">
                <button
                  type="button"
                  onClick={() => {
                    if (onSelectChapter) onSelectChapter(ch.id, 'learn');
                    else onLearn();
                  }}
                  className="flex-1 min-h-[44px] px-3 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-700 dark:hover:bg-neutral-600 text-neutral-800 dark:text-neutral-200 font-bold text-xs sm:text-sm transition-colors flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                >
                  <BookOpen size={14} />
                  <span>{t('Learn', 'నేర్చుకోండి')}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (onSelectChapter) onSelectChapter(ch.id, 'test');
                    else onPractice();
                  }}
                  className="flex-1 min-h-[44px] px-3 py-2 rounded-xl bg-[#D4F670] hover:bg-[#c3e84e] text-black font-extrabold text-xs sm:text-sm transition-transform active:scale-95 shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <PlayCircle size={14} />
                  <span>{t('Practice', 'సాధన')}</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
