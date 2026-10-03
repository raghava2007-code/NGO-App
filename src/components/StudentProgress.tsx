import { CheckCircle2, PlayCircle, BookOpen, Sparkles, RotateCcw, Clock, XCircle, Download } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getCompletedTests, resetOrDeleteTest, updateTestRetakeRequest } from '../utils/testStorage';
import { CompletedTestRecord, StudentClass } from '../types';

interface StudentProgressProps {
  t: (en: string, te: string) => string;
  studentName?: string;
  studentClass?: StudentClass;
  onGoToPractice?: (chapterId?: string) => void;
}

export default function StudentProgress({
  t,
  studentName = 'Student',
  studentClass = 'Class 1',
  onGoToPractice,
}: StudentProgressProps) {
  const [completedTests, setCompletedTests] = useState<CompletedTestRecord[]>([]);
  const [offset, setOffset] = useState(251.2);

  // Load completed tests on mount and listen for real-time updates
  useEffect(() => {
    const refresh = () => {
      const all = getCompletedTests();
      // Filter tests for this student or include all student's tests
      const studentTests = all.filter(
        (test) => test.studentName.trim().toLowerCase() === studentName.trim().toLowerCase()
      );
      setCompletedTests(studentTests.length > 0 ? studentTests : all);
    };

    refresh();
    window.addEventListener('storage', refresh);
    window.addEventListener('ganitmitra_tests_updated', refresh);

    return () => {
      window.removeEventListener('storage', refresh);
      window.removeEventListener('ganitmitra_tests_updated', refresh);
    };
  }, [studentName]);

  // Compute stats
  const totalCompleted = completedTests.length;
  const averageAccuracy =
    totalCompleted > 0
      ? Math.round(completedTests.reduce((sum, item) => sum + item.percentage, 0) / totalCompleted)
      : 0;

  useEffect(() => {
    // Trigger progress arc animation
    const progressFraction = totalCompleted > 0 ? Math.min(100, Math.max(0, averageAccuracy)) / 100 : 0;
    const timer = setTimeout(() => {
      setOffset(251.2 * (1 - progressFraction));
    }, 100);
    return () => clearTimeout(timer);
  }, [averageAccuracy, totalCompleted]);

  const handleResetTest = (testId: string) => {
    resetOrDeleteTest(testId);
    setCompletedTests((prev) => prev.filter((item) => item.id !== testId));
  };

  return (
    <div className="animate-in fade-in duration-500 max-w-4xl mx-auto pt-4 md:pt-6 space-y-8 pb-12">
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

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            type="button"
            onClick={() => window.print()}
            className="px-5 py-2.5 rounded-full bg-white dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-900 dark:text-white border border-neutral-200 dark:border-neutral-700 font-extrabold text-xs md:text-sm flex items-center gap-2 shadow-xs transition-transform active:scale-95 cursor-pointer"
            title={t('Print or save progress report as PDF', 'పురోగతి నివేదికను ప్రింట్ చేయండి లేదా PDF రూపంలో సేవ్ చేయండి')}
          >
            <Download size={16} />
            <span>{t('Download PDF Report', 'PDF నివేదికను డౌన్‌లోడ్ చేయండి')}</span>
          </button>

          {onGoToPractice && (
            <button
              type="button"
              onClick={() => onGoToPractice()}
              className="px-5 py-2.5 rounded-full bg-[#D4F670] hover:bg-[#bce451] text-black font-extrabold text-xs md:text-sm flex items-center gap-2 shadow-xs transition-transform active:scale-95 cursor-pointer"
            >
              <PlayCircle size={16} />
              <span>{t('Take New Test', 'కొత్త పరీక్ష రాయండి')}</span>
            </button>
          )}
        </div>
      </div>

      {/* Dynamic Overall Completion & Accuracy - Circular Indicator */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 items-center">
        {/* Progress Arc Card */}
        <div className="lg:col-span-1 bg-white dark:bg-neutral-800 rounded-[28px] lg:rounded-[32px] p-5 lg:p-6 border border-black/5 dark:border-white/5 shadow-xs flex flex-col items-center justify-center text-center">
          <div className="relative flex items-center justify-center w-40 h-40 sm:w-44 sm:h-44 lg:w-48 lg:h-48">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                className="text-neutral-200 dark:text-neutral-700/80"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#D4F670"
                strokeWidth="8"
                strokeDasharray="251.2"
                strokeDashoffset={offset}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
              <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
                {totalCompleted > 0 ? `${averageAccuracy}%` : '0%'}
              </span>
              <span className="text-[11px] font-bold text-neutral-400 dark:text-neutral-400 uppercase tracking-wider mt-0.5">
                {t('Accuracy', 'ఖచ్చితత్వం')}
              </span>
            </div>
          </div>

          <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 mt-2">
            {totalCompleted > 0
              ? t('Average Test Performance', 'సగటు పరీక్ష ప్రదర్శన')
              : t('Complete a test to view accuracy', 'ఖచ్చితత్వాన్ని చూడటానికి పరీక్షను పూర్తి చేయండి')}
          </span>
        </div>

        {/* Quick Highlights Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 lg:gap-4 w-full">
          <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-neutral-800 border border-black/5 dark:border-white/5 shadow-xs space-y-1">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center mb-2.5">
              <CheckCircle2 size={18} />
            </div>
            <span className="text-[11px] sm:text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider block">
              {t('Chapters Assessed', 'పరీక్షించిన అధ్యాయాలు')}
            </span>
            <div className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white">
              {totalCompleted} {t('Tests', 'పరీక్షలు')}
            </div>
            <span className="text-[11px] sm:text-xs text-neutral-500 dark:text-neutral-400 block pt-1">
              {t('Directly synchronized with teacher roster', 'ఉపాధ్యాయుల రికార్డులతో అనుసంధానించబడింది')}
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
            {completedTests.length > 0 ? `${completedTests.length} ${t('Submissions', 'సమర్పణలు')}` : t('None', 'ఏమీ లేదు')}
          </span>
        </div>

        {completedTests.length === 0 ? (
          <div className="bg-white dark:bg-neutral-800 rounded-3xl p-10 text-center border border-black/5 dark:border-white/5 space-y-3">
            <BookOpen size={32} className="text-neutral-400 mx-auto" />
            <h4 className="text-base font-bold text-neutral-800 dark:text-neutral-200">
              {t('None', 'ఏమీ లేదు')}
            </h4>
            <p className="text-xs text-neutral-500 max-w-sm mx-auto">
              {t('No chapter tests attempted yet. Complete a test to view your scores and answer records here.', 'ఇంకా ఏ పరీక్షా ప్రయత్నించలేదు. మీ స్కోర్లు మరియు సమాధానాల రికార్డులను చూడటానికి పరీక్షను పూర్తి చేయండి.')}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3">
            {completedTests.map((test) => (
              <div
                key={test.id}
                className={`p-5 rounded-3xl bg-white dark:bg-neutral-800 border shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all ${
                  test.retake_rejected && !test.retake_requested && test.retry_locked !== false
                    ? 'border-rose-300 dark:border-rose-800/80 bg-rose-50/20 dark:bg-rose-950/10'
                    : 'border-black/5 dark:border-white/5 hover:border-[#D4F670]/60'
                }`}
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
                    {test.retake_requested && (
                      <span className="text-[11px] font-bold text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-950 px-2 py-0.5 rounded-full border border-amber-300 dark:border-amber-800 flex items-center gap-1">
                        <span>⏱️</span> {t('Retake Pending Approval', 'రీటేక్ అనుమతి పెండింగ్‌లో ఉంది')}
                      </span>
                    )}
                    {test.retake_rejected && !test.retake_requested && test.retry_locked !== false && (
                      <span className="text-[11px] font-black px-2.5 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-800 flex items-center gap-1 shadow-xs">
                        <XCircle size={12} className="stroke-[2.5]" />
                        <span>{t('Request Rejected', 'అభ్యర్థన తిరస్కరించబడింది')}</span>
                      </span>
                    )}
                    {test.retry_locked === false && (
                      <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-800 flex items-center gap-1">
                        <span>✓</span> {t('Retake Approved', 'రీటేక్ ఆమోదించబడింది')}
                      </span>
                    )}
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

                  {/* Retry & Retake Request Options */}
                  <div className="flex items-center gap-2 flex-wrap">
                    {test.retry_locked === false ? (
                      <button
                        type="button"
                        onClick={() => onGoToPractice && onGoToPractice(test.chapterId)}
                        className="px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 shadow-xs active:scale-95"
                      >
                        <RotateCcw size={13} />
                        <span>{t('Retake Approved! Start Test', 'రీటేక్ ఆమోదించబడింది! పరీక్ష ప్రారంభించండి')}</span>
                      </button>
                    ) : test.retake_requested ? (
                      <button
                        type="button"
                        disabled
                        className="px-3.5 py-1.5 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-200 border border-amber-300 dark:border-amber-700 text-xs font-bold flex items-center gap-1.5 cursor-not-allowed opacity-90 shadow-xs"
                      >
                        <Clock size={13} className="animate-spin" />
                        <span>{t('Request Sent. Waiting for Teacher Approval...', 'అభ్యర్థన పంపబడింది. ఉపాధ్యాయుని అనుమతి కోసం వేచి ఉంది...')}</span>
                      </button>
                    ) : test.retake_rejected ? null : (
                      <button
                        type="button"
                        onClick={() => {
                          updateTestRetakeRequest(test.id, true);
                          setCompletedTests((prev) =>
                            prev.map((item) => (item.id === test.id ? { ...item, retake_requested: true } : item))
                          );
                        }}
                        className="px-3.5 py-1.5 rounded-xl bg-[#D4F670] hover:bg-[#bce451] text-black text-xs font-extrabold transition-transform active:scale-95 shadow-xs flex items-center gap-1.5 cursor-pointer"
                      >
                        <RotateCcw size={13} />
                        <span>{t('Request Retake', 'మళ్లీ పరీక్ష కోసం అభ్యర్థించండి')}</span>
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
