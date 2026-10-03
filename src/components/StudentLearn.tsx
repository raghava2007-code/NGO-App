import { useState, useEffect } from 'react';
import { CheckCircle, ArrowRight, PlayCircle, Volume2, VolumeX, GraduationCap } from 'lucide-react';
import { StudentLevel, Language, StudentClass, STUDENT_CLASS_OPTIONS } from '../types';
import { speakExplanation, stopSpeaking } from '../utils/voiceExplanation';
import { ChapterData, getChaptersForClass } from '../data/curriculumData';
import MathDiagram from './MathDiagram';

interface StudentLearnProps {
  level: StudentLevel;
  t: (en: string, te: string) => string;
  onPractice: (chapterId?: string) => void;
  language?: Language;
  studentClass?: StudentClass;
  selectedChapterId?: string;
  onSelectChapter?: (chapterId: string) => void;
}

export default function StudentLearn({
  level,
  t,
  onPractice,
  language = 'en',
  studentClass = 'Class 1',
  selectedChapterId,
  onSelectChapter,
}: StudentLearnProps) {
  // Filter chapters strictly for this student's class (no intermediate or other class topics)
  const activeClassChapters = getChaptersForClass(studentClass);

  const initialChapterIndex = selectedChapterId
    ? Math.max(0, activeClassChapters.findIndex((c) => c.id === selectedChapterId))
    : 0;

  const [activeChapterIndex, setActiveChapterIndex] = useState<number>(initialChapterIndex);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Sync if selectedChapterId changes externally
  useEffect(() => {
    if (selectedChapterId) {
      const idx = activeClassChapters.findIndex((c) => c.id === selectedChapterId);
      if (idx !== -1) {
        setActiveChapterIndex(idx);
      }
    }
  }, [selectedChapterId, activeClassChapters]);

  const currentClassMeta = STUDENT_CLASS_OPTIONS.find((c) => c.value === studentClass);
  const currentChapter: ChapterData = activeClassChapters[activeChapterIndex] || activeClassChapters[0];

  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, []);

  useEffect(() => {
    stopSpeaking();
    setIsSpeaking(false);
  }, [activeChapterIndex]);

  const handleSpeakLesson = () => {
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
      return;
    }

    const title = language === 'te' ? currentChapter.titleTe : currentChapter.titleEn;
    const summary = language === 'te' ? currentChapter.preTestSummaryTe : currentChapter.preTestSummaryEn;
    const textToSpeak = `${title}. ${summary}`;

    speakExplanation(
      textToSpeak,
      language,
      () => setIsSpeaking(true),
      () => setIsSpeaking(false),
      () => setIsSpeaking(false)
    );
  };

  return (
    <div className="animate-in fade-in duration-500 max-w-4xl mx-auto pt-2 md:pt-4 space-y-8 pb-12">
      {/* Header Info */}
      <div>
        <div className="inline-flex items-center gap-2 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 px-3.5 py-1.5 rounded-full text-xs font-bold mb-3 shadow-xs border border-indigo-200/50 dark:border-indigo-900/50">
          <GraduationCap size={14} />
          <span>
            {currentClassMeta
              ? `${language === 'te' ? currentClassMeta.labelTe : currentClassMeta.labelEn} • ${t(level, level === 'Beginner' ? 'ప్రారంభం' : level === 'Intermediate' ? 'మధ్యస్థం' : 'అధునాతనం')}`
              : studentClass}{' '}
            {t('Visual Learning & Revision', 'దృశ్య అభ్యాసం & రివిజన్')}
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight mb-2">
          {t('Concepts & Step-by-Step Visual Diagrams', 'భావనలు & దశలవారీ దృశ్య రేఖాచిత్రాలు')}
        </h1>
        <p className="text-neutral-500 dark:text-neutral-400 text-sm md:text-base">
          {t(
            'Master core mathematics with illustrative diagrams, side-by-side object representations, and audio explanations.',
            'చిత్రాలు, పక్కపక్క పోలికలు మరియు ఆడియో వివరణలతో గణిత భావనలను నేర్చుకోండి.'
          )}
        </p>
      </div>

      {/* Chapter Selection Pills */}
      <div className="flex items-center gap-2.5 border-b border-neutral-200 dark:border-neutral-700 pb-3 overflow-x-auto custom-scrollbar">
        {activeClassChapters.map((ch, idx) => (
          <button
            key={ch.id}
            type="button"
            onClick={() => {
              setActiveChapterIndex(idx);
              if (onSelectChapter) onSelectChapter(ch.id);
            }}
            className={`px-4 py-2.5 rounded-2xl text-xs md:text-sm font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeChapterIndex === idx
                ? 'bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 shadow-xs'
                : 'bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-700'
            }`}
          >
            <span className="w-5 h-5 rounded-full bg-[#D4F670] text-[#1a1a1a] text-[11px] font-black flex items-center justify-center">
              {ch.chapterNumber}
            </span>
            <span>{t(ch.titleEn, ch.titleTe)}</span>
          </button>
        ))}
      </div>

      {/* Main Concept Deep Dive Card */}
      <div className="bg-white dark:bg-neutral-800 rounded-[32px] p-6 md:p-10 border border-black/5 dark:border-white/5 shadow-xs space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-[#D4F670]/30 text-neutral-900 dark:text-[#D4F670]">
                {t(`Chapter ${currentChapter.chapterNumber}`, `అధ్యాయం ${currentChapter.chapterNumber}`)}
              </span>
              <span className="text-xs font-bold text-neutral-400 dark:text-neutral-500">
                {currentChapter.level} Level
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white mb-2">
              {t(currentChapter.titleEn, currentChapter.titleTe)}
            </h2>
            <p className="text-neutral-600 dark:text-neutral-300 text-base md:text-lg leading-relaxed">
              {t(currentChapter.shortDescriptionEn, currentChapter.shortDescriptionTe)}
            </p>
          </div>

          <button
            type="button"
            onClick={handleSpeakLesson}
            className={`self-start sm:self-center shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all cursor-pointer shadow-xs ${
              isSpeaking
                ? 'bg-amber-500 text-white animate-pulse'
                : 'bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-700 dark:hover:bg-neutral-600 text-neutral-800 dark:text-neutral-200 border border-black/5 dark:border-white/10'
            }`}
            title={language === 'te' ? 'వాయిస్ ద్వారా పాఠం వినండి' : 'Listen to lesson explanation'}
          >
            {isSpeaking ? <VolumeX size={17} /> : <Volume2 size={17} />}
            <span>
              {isSpeaking
                ? t('Stop Voice', 'ఆపండి')
                : t('Listen to Lesson', 'పాఠం వినండి (వాయిస్)')}
            </span>
          </button>
        </div>

        {/* VISUAL DIAGRAM SECTION (Big-Small, Subtraction Apples, Shapes, Fractions, Arrays) */}
        <div className="pt-2">
          <MathDiagram
            type={currentChapter.visualDiagramType}
            language={language}
            t={t}
            size="large"
          />
        </div>

        {/* Key Concepts Bullet Breakdown */}
        <div className="p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-700/50 border border-neutral-200/80 dark:border-neutral-700 space-y-4">
          <span className="text-xs font-extrabold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 block">
            {t('Core Concept Highlights', 'ప్రధాన భావనల ముఖ్యాంశాలు')}
          </span>

          <div className="space-y-3">
            {(language === 'te' ? currentChapter.keyConceptsTe : currentChapter.keyConceptsEn).map((concept, sIdx) => (
              <div key={sIdx} className="flex items-start gap-3">
                <CheckCircle size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base leading-relaxed font-medium">
                  {concept}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Pre-Test Summary / Takeaway Card */}
        <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-2xl p-5 flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-200 flex items-center justify-center font-bold text-lg shrink-0 mt-0.5">
            💡
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300 mb-1">
              {t('Teacher Summary & Rule', 'ఉపాధ్యాయుని సూచన & నియమం')}
            </h4>
            <p className="text-amber-900/90 dark:text-amber-200/90 text-sm font-medium leading-relaxed">
              {t(currentChapter.preTestSummaryEn, currentChapter.preTestSummaryTe)}
            </p>
          </div>
        </div>

        {/* Action Button: Take Chapter Test */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-4 border-t border-neutral-100 dark:border-neutral-700 gap-3">
          <span className="text-xs font-bold text-neutral-400 dark:text-neutral-500">
            {currentChapter.testQuestions.length} {t('Practice Questions Ready', 'సాధన ప్రశ్నలు సిద్ధంగా ఉన్నాయి')}
          </span>

          <button
            type="button"
            onClick={() => onPractice(currentChapter.id)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#D4F670] hover:bg-[#bce451] text-black font-extrabold text-sm md:text-base px-6 py-3.5 rounded-full transition-transform active:scale-95 shadow-sm cursor-pointer"
          >
            <PlayCircle size={18} />
            <span>{t('Take Chapter Test Now', 'ఇప్పుడే అధ్యాయం పరీక్ష రాయండి')}</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
