import { CheckCircle2, PlayCircle, BookOpen, Sparkles, Award } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getCompletedTests, resetOrDeleteTest } from '../utils/testStorage';
import { CompletedTestRecord, StudentClass } from '../types';

interface StudentProgressProps {
  t: (en: string, te: string) => string;
  studentName?: string;
  studentClass?: StudentClass;
  onGoToPractice?: () => void;
}

export default function StudentProgress({
  t,
  studentName = 'Student',
  studentClass = 'Class 1',
  onGoToPractice,
}: StudentProgressProps) {
  const [completedTests, setCompletedTests] = useState<CompletedTestRecord[]>([]);
  const [offset, setOffset] = useState(251.2);

  // Load completed tests on mount
  useEffect(() => {
    const all = getCompletedTests();
    // Filter tests for this student or include all student's tests
    const studentTests = all.filter(
      (test) => test.studentName.trim().toLowerCase() === studentName.trim().toLowerCase()
    );

    // If this specific student hasn't taken any, show tests in the system
    setCompletedTests(studentTests.length > 0 ? studentTests : all);
  }, [studentName]);

  // Compute stats
  const totalCompleted = completedTests.length;
  const averageAccuracy =
    totalCompleted > 0
      ? Math.round(completedTests.reduce((sum, item) => sum + item.percentage, 0) / totalCompleted)
      : 75;

  useEffect(() => {
    // Trigger progress arc animation
    const progressFraction = Math.min(100, Math.max(10, averageAccuracy)) / 100;
    const timer = setTimeout(() => {
      setOffset(251.2 * (1 - progressFraction));
    }, 100);
    return () => clearTimeout(timer);
  }, [averageAccuracy]);

  const handleResetTest = (testId: string) => {
    resetOrDeleteTest(testId);
    setCompletedTests((prev) => prev.filter((item) => item.id !== testId));
  };

  return (
    <div className="animate-in fade-in duration-500 max-w-4xl mx-auto pt-4 md:pt-6 space-y-10 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-200 dark:border-neutral-800 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#D4F670]/20 text-[#1a1a1a] dark:text-[#D4F670] border border-[#D4F670]/40">
              {studentClass}
            </span>
            <span className="text-xs font-bold text-neutral-400 dark:text-neutral-500">•</span>
            <span className="text-xs font-bold text-neutral-600 dark:text-neutral-400">
              {studentName}
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            {t('My Learning Progress', 'నా అభ్యాస పురోగతి')}
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400 font-medium text-sm md:text-base mt-1">
            {t('Real-time test scores, completed chapters, and accuracy records.', 'రియల్-టైమ్ పరీక్ష స్కోర్లు, పూర్తయిన అధ్యాయాలు మరియు ఖచ్చితత్వ రికార్డులు.')}
          </p>
        </div>

        {onGoToPractice && (
          <button
            type="button"
            onClick={onGoToPractice}
            className="px-5 py-2.5 rounded-full bg-[#D4F670] hover:bg-[#bce451] text-black font-extrabold text-xs md:text-sm flex items-center gap-2 shadow-xs transition-transform active:scale-95 cursor-pointer self-start sm:self-auto"
          >
            <PlayCircle size={16} />
            <span>{t('Take New Test', 'కొత్త పరీక్ష రాయండి')}</span>
          </button>
        )}
      </div>

      {/* Dynamic Overall Completion & Accuracy - Circular Indicator */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        {/* Progress Arc Card */}
        <div className="md:col-span-1 bg-white dark:bg-neutral-800 rounded-[32px] p-6 border border-black/5 dark:border-white/5 shadow-xs flex flex-col items-center justify-center text-center">
          <div className="relative flex items-center justify-center w-48 h-48">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                stroke="currentColor"
                strokeWidth="9"
                className="text-neutral-200 dark:text-neutral-700"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                stroke="currentColor"
                strokeWidth="9"
                strokeDasharray="251.2"
                strokeDashoffset={offset}
                className="text-app-lime drop-shadow-md transition-all duration-[1500ms] ease-out"
                strokeLinecap="round"
              />
            </svg>

            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-4xl font-extrabold tracking-tighter text-neutral-900 dark:text-white">
                {averageAccuracy}%
              </span>
              <span className="text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase mt-0.5">
                {t('Accuracy', 'ఖచ్చితత్వం')}
              </span>
            </div>
          </div>

          <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 mt-2">
            {t('Average Test Performance', 'సగటు పరీక్ష ప్రదర్శన')}
          </span>
        </div>

        {/* Quick Highlights Stats */}
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-3xl bg-white dark:bg-neutral-800 border border-black/5 dark:border-white/5 shadow-xs space-y-1">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center mb-3">
              <CheckCircle2 size={20} />
            </div>
            <span className="text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider block">
              {t('Chapters Assessed', 'పరీక్షించిన అధ్యాయాలు')}
            </span>
            <div className="text-3xl font-black text-neutral-900 dark:text-white">
              {totalCompleted} {t('Tests', 'పరీక్షలు')}
            </div>
            <span className="text-xs text-neutral-500 dark:text-neutral-400 block pt-1">
              {t('Directly synchronized with teacher roster', 'ఉపాధ్యాయుల రికార్డులతో అనుసంధానించబడింది')}
            </span>
          </div>

          <div className="p-5 rounded-3xl bg-white dark:bg-neutral-800 border border-black/5 dark:border-white/5 shadow-xs space-y-1">
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 flex items-center justify-center mb-3">
              <Award size={20} />
            </div>
            <span className="text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider block">
              {t('Mastery Status', 'సాధనా స్థితి')}
            </span>
            <div className="text-3xl font-black text-emerald-600 dark:text-[#D4F670]">
              {averageAccuracy >= 60 ? t('On Track', 'ముందంజలో') : t('Reviewing', 'సమీక్షలో')}
            </div>
            <span className="text-xs text-neutral-500 dark:text-neutral-400 block pt-1">
              {averageAccuracy >= 60
                ? t('Ready for higher difficulty drills', 'తదుపరి స్థాయికి సిద్ధం')
                : t('Practice review concepts recommended', 'కాన్సెప్ట్ సాధన సిఫార్సు చేయబడింది')}
            </span>
          </div>
        </div>
      </div>

      {/* Completed Chapter Tests History Table/List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl md:text-2xl font-bold text-neutral-900 dark:text-white">
            {t('Completed Chapter Tests & Answer Records', 'పూర్తయిన అధ్యాయాల పరీక్షలు & సమాధానాల రికార్డులు')}
          </h3>
          <span className="text-xs font-bold text-neutral-400">
            {completedTests.length} {t('Submissions', 'సమర్పణలు')}
          </span>
        </div>

        {completedTests.length === 0 ? (
          <div className="bg-white dark:bg-neutral-800 rounded-3xl p-10 text-center border border-black/5 dark:border-white/5 space-y-3">
            <BookOpen size={32} className="text-neutral-400 mx-auto" />
            <h4 className="text-base font-bold text-neutral-800 dark:text-neutral-200">
              {t('No tests completed yet', 'ఇంకా పరీక్షలు ఏవీ పూర్తి కాలేదు')}
            </h4>
            <p className="text-xs text-neutral-500 max-w-sm mx-auto">
              {t('Choose a chapter from the Home page or Practice page to take your first test.', 'మొదటి పరీక్ష రాయడానికి హోమ్ పేజీ నుండి అధ్యాయాన్ని ఎంచుకోండి.')}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3">
            {completedTests.map((test) => (
              <div
                key={test.id}
                className="p-5 rounded-3xl bg-white dark:bg-neutral-800 border border-black/5 dark:border-white/5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-[#D4F670]/60 transition-all"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[11px] font-black px-2.5 py-0.5 rounded-full bg-[#D4F670]/30 text-neutral-900 dark:text-[#D4F670]">
                      {t(`Chapter ${test.chapterNumber}`, `అధ్యాయం ${test.chapterNumber}`)}
                    </span>
                    <span className="text-[11px] font-bold text-neutral-400 dark:text-neutral-500">
                      • {test.timeFormatted}
                    </span>
                    <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <Sparkles size={11} />
                      {t('Teacher Synced', 'ఉపాధ్యాయునికి చేరింది')}
                    </span>
                  </div>

                  <h4 className="font-bold text-base md:text-lg text-neutral-900 dark:text-white">
                    {t(test.chapterTitleEn, test.chapterTitleTe)}
                  </h4>

                  {/* Answers recap */}
                  {test.answers && test.answers.length > 0 && (
                    <div className="flex items-center gap-1.5 pt-1">
                      <span className="text-[11px] text-neutral-400">
                        {t('Questions:', 'ప్రశ్నలు:')}
                      </span>
                      {test.answers.map((ans, aIdx) => (
                        <span
                          key={aIdx}
                          className={`w-5 h-5 rounded-md text-[10px] font-black flex items-center justify-center ${
                            ans.isCorrect
                              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                              : 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300'
                          }`}
                          title={`${ans.questionPrompt} -> Ans: ${ans.studentAnswer}`}
                        >
                          {ans.isCorrect ? '✓' : '✕'}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-3 self-end md:self-center">
                  <div className="text-right">
                    <span className="text-sm font-black text-neutral-900 dark:text-white block">
                      {test.score} / {test.totalQuestions}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block ${
                        test.percentage >= 60
                          ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                          : 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300'
                      }`}
                    >
                      {test.percentage}% {t('Score', 'స్కోర్')}
                    </span>
                  </div>

                  {/* Retry & Clear Options */}
                  <div className="flex items-center gap-2">
                    {onGoToPractice && (
                      <button
                        type="button"
                        onClick={() => onGoToPractice()}
                        className="px-3 py-1.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-700 dark:hover:bg-neutral-600 text-neutral-800 dark:text-neutral-200 text-xs font-bold transition-colors cursor-pointer"
                      >
                        {t('Practice Again', 'మరల సాధన')}
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => handleResetTest(test.id)}
                      className="p-1.5 rounded-xl text-neutral-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors cursor-pointer text-xs"
                      title={t('Clear this test record', 'ఈ రికార్డును తొలగించండి')}
                    >
                      ✕
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
