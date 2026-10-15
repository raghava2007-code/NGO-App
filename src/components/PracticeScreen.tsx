import { useState, useEffect } from 'react';
import { ArrowLeft, Check, X, Volume2, VolumeX, Sparkles, PlayCircle, BookOpen, CheckCircle2, RotateCcw, TrendingUp, Clock, XCircle } from 'lucide-react';
import { StudentLevel, Language, StudentClass, CompletedTestRecord } from '../types';
import { speakExplanation, stopSpeaking } from '../utils/voiceExplanation';
import { CHAPTERS_DATA, ChapterData, TestQuestionItem, getChaptersForLevel } from '../data/curriculumData';
import { saveCompletedTest, updateTestRetakeRequest, getCompletedTests } from '../utils/testStorage';
import MathDiagram from './MathDiagram';

interface PracticeScreenProps {
  t: (en: string, te: string) => string;
  onBack: () => void;
  level: StudentLevel;
  language?: Language;
  onProgressIncrement?: () => void;
  studentClass?: StudentClass;
  selectedChapterId?: string;
  onNavigateToProgress?: () => void;
  studentName?: string;
}

export type TestFlowState = 'pre_test_summary' | 'taking_test' | 'test_completed';

export default function PracticeScreen({
  t,
  onBack,
  level,
  language = 'en',
  onProgressIncrement,
  studentClass = 'Class 1',
  selectedChapterId,
  onNavigateToProgress,
  studentName = 'Student',
}: PracticeScreenProps) {
  // Available chapters for the active session's level (universal access across all classes)
  const activeList = getChaptersForLevel(level);

  // Selected Chapter for Test
  const [activeChapterId, setActiveChapterId] = useState<string>(() => {
    if (selectedChapterId && activeList.some((ch) => ch.id === selectedChapterId)) {
      return selectedChapterId;
    }
    return activeList[0]?.id || (level === 'Beginner' ? 'b-ch1' : level === 'Intermediate' ? 'i-ch1' : 'a-ch1');
  });

  // Keep activeChapterId aligned if level or selectedChapterId changes
  useEffect(() => {
    if (selectedChapterId && activeList.some((ch) => ch.id === selectedChapterId)) {
      setActiveChapterId(selectedChapterId);
    } else if (!activeList.some((ch) => ch.id === activeChapterId)) {
      if (activeList[0]) {
        setActiveChapterId(activeList[0].id);
      }
    }
  }, [selectedChapterId, activeList, activeChapterId]);

  // Test Flow State:
  // 1. 'pre_test_summary': Displays Pre-Test Topic Summary Card & "Start Test" Button
  // 2. 'taking_test': Fill-in-the-blank assessment questions supported by graphics & diagrams
  // 3. 'test_completed': Results card with score and teacher synchronization
  const [flowState, setFlowState] = useState<TestFlowState>('pre_test_summary');

  // Test Execution State
  const [questionIndex, setQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [answerStatus, setAnswerStatus] = useState<'idle' | 'correct' | 'incorrect'>('idle');
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Student-initiated Retake Request State
  const [currentTestId, setCurrentTestId] = useState<string | null>(null);
  const [isRetakeRequested, setIsRetakeRequested] = useState<boolean>(false);
  const [isRetakeApproved, setIsRetakeApproved] = useState<boolean>(false);
  const [isRetakeRejected, setIsRetakeRejected] = useState<boolean>(false);

  // Synchronize all completed tests to enforce Retake approval rules across screens
  const [allCompletedTests, setAllCompletedTests] = useState<CompletedTestRecord[]>(() => getCompletedTests());

  useEffect(() => {
    const handleSync = () => {
      setAllCompletedTests(getCompletedTests());
    };
    window.addEventListener('storage', handleSync);
    window.addEventListener('ganitmitra_tests_updated', handleSync);
    const interval = setInterval(handleSync, 1000);
    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', handleSync);
      window.removeEventListener('ganitmitra_tests_updated', handleSync);
    };
  }, []);

  // Most recent test for the active chapter by this student
  const activeChapterTest = allCompletedTests.find(
    (t) =>
      t.chapterId === activeChapterId &&
      t.studentName.trim().toLowerCase() === studentName.trim().toLowerCase()
  );

  // Collected Answers for Test Record
  const [userAnswersList, setUserAnswersList] = useState<{
    questionPrompt: string;
    studentAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
  }[]>([]);

  // Score summary
  const [finalScore, setFinalScore] = useState<{ score: number; total: number; percentage: number }>({
    score: 0,
    total: 0,
    percentage: 0,
  });

  // Current active chapter object
  const currentChapter: ChapterData =
    activeList.find((ch) => ch.id === activeChapterId) || activeList[0] || CHAPTERS_DATA[0];

  const questions: TestQuestionItem[] = currentChapter.testQuestions || [];
  const currentQuestion: TestQuestionItem | undefined = questions[questionIndex];

  // Stop speech when component unmounts
  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, []);

  // Update active chapter if selectedChapterId prop updates
  useEffect(() => {
    if (selectedChapterId && activeList.some((ch) => ch.id === selectedChapterId)) {
      setActiveChapterId(selectedChapterId);
      setFlowState('pre_test_summary');
      setQuestionIndex(0);
      setUserAnswer('');
      setAnswerStatus('idle');
      setUserAnswersList([]);
    }
  }, [selectedChapterId]);

  // Voice narration for question
  const handleSpeakQuestion = () => {
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
      return;
    }

    if (!currentQuestion) return;

    const promptText = language === 'te' ? currentQuestion.promptTe : currentQuestion.promptEn;

    speakExplanation(
      promptText,
      language,
      () => setIsSpeaking(true),
      () => setIsSpeaking(false),
      () => setIsSpeaking(false)
    );
  };

  // Synchronize Retake Approval in real-time when teacher approves
  useEffect(() => {
    if (flowState !== 'test_completed' || !currentTestId) return;

    const checkApprovalStatus = () => {
      const tests = getCompletedTests();
      const current = tests.find((t) => t.id === currentTestId);
      if (current) {
        if (current.retry_locked === false) {
          setIsRetakeApproved(true);
          setIsRetakeRequested(false);
          setIsRetakeRejected(false);
        } else if (current.retake_requested) {
          setIsRetakeRequested(true);
          setIsRetakeRejected(false);
        } else if (current.retake_rejected) {
          setIsRetakeRequested(false);
          setIsRetakeApproved(false);
          setIsRetakeRejected(true);
        }
      }
    };

    checkApprovalStatus();
    window.addEventListener('storage', checkApprovalStatus);
    window.addEventListener('ganitmitra_tests_updated', checkApprovalStatus);
    const interval = setInterval(checkApprovalStatus, 1000);

    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', checkApprovalStatus);
      window.removeEventListener('ganitmitra_tests_updated', checkApprovalStatus);
    };
  }, [flowState, currentTestId]);

  // Start the test after reviewing pre-test summary
  const handleStartTest = () => {
    stopSpeaking();
    setIsSpeaking(false);
    setQuestionIndex(0);
    setUserAnswer('');
    setAnswerStatus('idle');
    setUserAnswersList([]);
    setIsRetakeRequested(false);
    setIsRetakeApproved(false);
    setIsRetakeRejected(false);
    setFlowState('taking_test');
  };

  // Student requests retake for the completed assessment
  const handleRequestRetake = () => {
    if (!currentTestId) return;
    setIsRetakeRequested(true);
    setIsRetakeRejected(false);
    updateTestRetakeRequest(currentTestId, true);
  };

  // Handle checking the current answer or moving to next question
  const handleCheckOrNext = () => {
    if (!currentQuestion) return;

    if (answerStatus === 'idle') {
      const trimmed = userAnswer.trim();
      if (!trimmed) return;

      const isMatch =
        trimmed.toLowerCase() === currentQuestion.correctAnswer.toLowerCase() ||
        (currentQuestion.acceptableAnswers &&
          currentQuestion.acceptableAnswers.some((ans) => ans.toLowerCase() === trimmed.toLowerCase()));

      const isCorrect = Boolean(isMatch);
      setAnswerStatus(isCorrect ? 'correct' : 'incorrect');

      const answerRecord = {
        questionPrompt: language === 'te' ? currentQuestion.promptTe : currentQuestion.promptEn,
        studentAnswer: trimmed,
        correctAnswer: currentQuestion.correctAnswer,
        isCorrect,
      };

      const updatedAnswers = [...userAnswersList, answerRecord];
      setUserAnswersList(updatedAnswers);

      if (isCorrect && onProgressIncrement) {
        onProgressIncrement();
      }
    } else {
      // Advance to next question or complete test
      stopSpeaking();
      setIsSpeaking(false);
      setAnswerStatus('idle');
      setUserAnswer('');

      if (questionIndex < questions.length - 1) {
        setQuestionIndex(questionIndex + 1);
      } else {
        // Test completed!
        const finalCorrect = userAnswersList.filter((a) => a.isCorrect).length;
        const total = questions.length;
        const percentage = Math.round((finalCorrect / total) * 100);

        setFinalScore({ score: finalCorrect, total, percentage });

        const testId = `test-${Date.now()}`;
        // Save and synchronize to teacher dashboard & progress storage
        const testRecord: CompletedTestRecord = {
          id: testId,
          studentName: studentName || 'Student',
          studentClass: studentClass,
          chapterId: currentChapter.id,
          chapterNumber: currentChapter.chapterNumber,
          chapterTitleEn: currentChapter.titleEn,
          chapterTitleTe: currentChapter.titleTe,
          score: finalCorrect,
          totalQuestions: total,
          percentage: percentage,
          passed: percentage >= 50,
          completedAt: new Date().toISOString(),
          timeFormatted: `${t('Today', 'ఈరోజు')}, ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
          retake_requested: false,
          retry_locked: true,
          answers: userAnswersList,
        };

        saveCompletedTest(testRecord);
        setCurrentTestId(testId);
        setIsRetakeRequested(false);
        setIsRetakeApproved(false);
        setFlowState('test_completed');
      }
    }
  };

  // Dedicated visual illustrations for test questions (clean and spoiler-free)
  const renderQuestionVisual = () => {
    if (!currentQuestion) return null;

    // 1. Question 3 of Big and Small: 3 Big Stars (Addressing "there is no stars being displayed")
    if (
      currentQuestion.id === 'q-c1-ch1-3' ||
      (currentQuestion.diagramType === 'counting' && currentQuestion.diagramData?.itemType === 'big_star') ||
      currentQuestion.promptEn.toLowerCase().includes('big star')
    ) {
      return (
        <div className="w-full max-w-lg mx-auto bg-neutral-50 dark:bg-neutral-900/60 rounded-3xl p-6 border border-black/5 dark:border-white/5 text-center space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between text-[11px] font-extrabold uppercase tracking-wider text-neutral-400">
            <span>{t('Visual Diagram: Big Stars', 'దృశ్య చిత్రం: పెద్ద నక్షత్రాలు')}</span>
            <span className="text-amber-500 font-black">⭐</span>
          </div>

          {/* High-visibility golden stars with drop shadows & number tags */}
          <div className="flex items-center justify-center gap-4 sm:gap-6 flex-wrap py-2">
            {[1, 2, 3].map((starNum) => (
              <div
                key={starNum}
                className="flex flex-col items-center justify-center gap-2 p-3 sm:p-4 bg-amber-50 dark:bg-amber-950/40 rounded-3xl border-2 border-amber-400 shadow-md transform hover:scale-105 transition-transform"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-16 h-16 sm:w-20 sm:h-20 fill-amber-400 text-amber-500 filter drop-shadow-md"
                >
                  <polygon
                    points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
                    fill="#F59E0B"
                    stroke="#D97706"
                    strokeWidth="1.2"
                  />
                </svg>
                <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-amber-400 text-black shadow-xs">
                  {t('BIG STAR', 'పెద్ద నక్షత్రం')} #{starNum}
                </span>
              </div>
            ))}
          </div>

          <p className="text-xs text-neutral-600 dark:text-neutral-300 font-bold bg-white dark:bg-neutral-800 p-2.5 rounded-xl border border-black/5 dark:border-white/5">
            {t('Count the big stars above and type the number in the box below.', 'పైనున్న పెద్ద నక్షత్రాలను లెక్కించి కింద సంఖ్యను రాయండి.')}
          </p>
        </div>
      );
    }

    // 2. Question 1 of Big & Small: Elephant vs Ant
    if (
      currentQuestion.id === 'q-c1-ch1-1' ||
      (currentQuestion.diagramType === 'big_small' && currentQuestion.diagramData?.left === 'Elephant')
    ) {
      return (
        <div className="w-full max-w-lg mx-auto bg-neutral-50 dark:bg-neutral-900/60 rounded-3xl p-5 border border-black/5 dark:border-white/5 space-y-2 animate-in fade-in">
          <div className="text-[11px] font-extrabold uppercase tracking-wider text-neutral-400 text-center">
            {t('Compare Sizes (Elephant vs Ant)', 'పరిమాణాలను పోల్చండి (ఏనుగు మరియు చీమ)')}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col items-center justify-center p-4 bg-white dark:bg-neutral-800 rounded-2xl border border-black/5 dark:border-white/5 text-center">
              <span className="text-5xl sm:text-6xl mb-2 select-none">🐘</span>
              <span className="font-extrabold text-sm sm:text-base text-neutral-900 dark:text-white">
                {t('Elephant', 'ఏనుగు')}
              </span>
            </div>
            <div className="flex flex-col items-center justify-center p-4 bg-white dark:bg-neutral-800 rounded-2xl border border-black/5 dark:border-white/5 text-center">
              <span className="text-2xl sm:text-3xl mb-4 mt-3 select-none">🐜</span>
              <span className="font-extrabold text-sm sm:text-base text-neutral-900 dark:text-white">
                {t('Ant', 'చీమ')}
              </span>
            </div>
          </div>
        </div>
      );
    }

    // 3. Question 2 of Big & Small: Basketball vs Marble
    if (
      currentQuestion.id === 'q-c1-ch1-2' ||
      (currentQuestion.diagramType === 'big_small' && currentQuestion.diagramData?.left === 'Basketball')
    ) {
      return (
        <div className="w-full max-w-lg mx-auto bg-neutral-50 dark:bg-neutral-900/60 rounded-3xl p-5 border border-black/5 dark:border-white/5 space-y-2 animate-in fade-in">
          <div className="text-[11px] font-extrabold uppercase tracking-wider text-neutral-400 text-center">
            {t('Compare Sizes (Basketball vs Marble)', 'పరిమాణాలను పోల్చండి (బాస్కెట్‌బాల్ మరియు గోళీ)')}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col items-center justify-center p-4 bg-white dark:bg-neutral-800 rounded-2xl border border-black/5 dark:border-white/5 text-center">
              <span className="text-5xl sm:text-6xl mb-2 select-none">🏀</span>
              <span className="font-extrabold text-sm sm:text-base text-neutral-900 dark:text-white">
                {t('Basketball', 'బాస్కెట్‌బాల్')}
              </span>
            </div>
            <div className="flex flex-col items-center justify-center p-4 bg-white dark:bg-neutral-800 rounded-2xl border border-black/5 dark:border-white/5 text-center">
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-500 shadow-md mb-4 mt-3"></div>
              <span className="font-extrabold text-sm sm:text-base text-neutral-900 dark:text-white">
                {t('Marble', 'గోళీ')}
              </span>
            </div>
          </div>
        </div>
      );
    }

    // 4. Counting Apples (Class 1 Ch 2 Q1)
    if (currentQuestion.diagramType === 'counting' && currentQuestion.diagramData?.icon === 'apple') {
      const count = currentQuestion.diagramData?.count || 5;
      return (
        <div className="w-full max-w-lg mx-auto bg-neutral-50 dark:bg-neutral-900/60 rounded-3xl p-5 border border-black/5 dark:border-white/5 text-center space-y-3 animate-in fade-in">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-neutral-400 block">
            {t('Apples Tray', 'ఆపిల్స్ ట్రే')}
          </span>
          <div className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap p-4 bg-white dark:bg-neutral-800 rounded-2xl border border-black/5 dark:border-white/5">
            {Array.from({ length: count }).map((_, i) => (
              <span key={i} className="text-3xl sm:text-4xl select-none">🍎</span>
            ))}
          </div>
        </div>
      );
    }

    // 5. Counting Circles (Class 1 Ch 2 Q2)
    if (currentQuestion.diagramType === 'counting' && currentQuestion.diagramData?.icon === 'circle') {
      const count = currentQuestion.diagramData?.count || 7;
      return (
        <div className="w-full max-w-lg mx-auto bg-neutral-50 dark:bg-neutral-900/60 rounded-3xl p-5 border border-black/5 dark:border-white/5 text-center space-y-3 animate-in fade-in">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-neutral-400 block">
            {t('Blue Circles', 'నీలం రంగు వృత్తాలు')}
          </span>
          <div className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap p-4 bg-white dark:bg-neutral-800 rounded-2xl border border-black/5 dark:border-white/5">
            {Array.from({ length: count }).map((_, i) => (
              <div key={i} className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-500 shadow-xs"></div>
            ))}
          </div>
        </div>
      );
    }

    // 6. Subtraction Apples on Branch (Class 1 Ch 3 Q1)
    if (currentQuestion.diagramType === 'subtraction_apples' || currentQuestion.id === 'q-c1-ch3-1') {
      return (
        <div className="w-full max-w-lg mx-auto bg-neutral-50 dark:bg-neutral-900/60 rounded-3xl p-5 border border-black/5 dark:border-white/5 text-center space-y-3 animate-in fade-in">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-neutral-400 block">
            {t('Apple Branch (8 apples initially, 3 eaten)', 'ఆపిల్ కొమ్మ (మొదట 8 ఆపిల్స్, 3 తినబడ్డాయి)')}
          </span>
          <div className="p-4 bg-white dark:bg-neutral-800 rounded-2xl border border-black/5 dark:border-white/5 space-y-3">
            <div className="flex items-center justify-center gap-3 flex-wrap">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={`rem-${i}`} className="text-3xl select-none" title="Whole apple">🍎</span>
              ))}
              {Array.from({ length: 3 }).map((_, i) => (
                <span key={`eat-${i}`} className="text-2xl select-none opacity-30 grayscale filter" title="Eaten apple">🍏✕</span>
              ))}
            </div>
            <div className="flex items-center justify-center gap-4 text-xs font-semibold text-neutral-500">
              <span className="flex items-center gap-1">🍎 {t('Remaining apples', 'మిగిలినవి')}</span>
              <span className="flex items-center gap-1 opacity-60">🍏✕ {t('Eaten apples', 'తినివేయబడినవి')}</span>
            </div>
          </div>
        </div>
      );
    }

    // 7. Counting Balloons (Class 1 Ch 3 Q2)
    if (currentQuestion.id === 'q-c1-ch3-2') {
      return (
        <div className="w-full max-w-lg mx-auto bg-neutral-50 dark:bg-neutral-900/60 rounded-3xl p-5 border border-black/5 dark:border-white/5 text-center space-y-3 animate-in fade-in">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-neutral-400 block">
            {t('Balloons (6 initially, 2 fly away)', 'బెలూన్లు (మొదట 6, 2 ఎగిరిపోయాయి)')}
          </span>
          <div className="p-4 bg-white dark:bg-neutral-800 rounded-2xl border border-black/5 dark:border-white/5 flex items-center justify-center gap-3 flex-wrap">
            {Array.from({ length: 4 }).map((_, i) => (
              <span key={`stay-${i}`} className="text-3xl select-none">🎈</span>
            ))}
            {Array.from({ length: 2 }).map((_, i) => (
              <span key={`fly-${i}`} className="text-2xl select-none opacity-40" title="Flying away">🎈↗</span>
            ))}
          </div>
        </div>
      );
    }

    // 8. 2D Shapes Triangle (Class 1 Ch 4 Q1)
    if (
      currentQuestion.id === 'q-c1-ch4-1' ||
      (currentQuestion.diagramType === 'shapes_geom' && currentQuestion.diagramData?.shape === 'triangle')
    ) {
      return (
        <div className="w-full max-w-xs mx-auto bg-neutral-50 dark:bg-neutral-900/60 rounded-3xl p-5 border border-black/5 dark:border-white/5 text-center space-y-2 animate-in fade-in">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-neutral-400 block">
            {t('Triangle Diagram', 'త్రిభుజం చిత్రం')}
          </span>
          <div className="flex justify-center p-3 bg-white dark:bg-neutral-800 rounded-2xl border border-black/5 dark:border-white/5">
            <svg viewBox="0 0 60 60" className="w-20 h-20">
              <polygon points="30,8 8,50 52,50" fill="#F97316" stroke="#C2410C" strokeWidth="3" />
            </svg>
          </div>
        </div>
      );
    }

    // 9. 2D Shapes Selection (Class 1 Ch 4 Q2)
    if (currentQuestion.id === 'q-c1-ch4-2') {
      return (
        <div className="w-full max-w-md mx-auto bg-neutral-50 dark:bg-neutral-900/60 rounded-3xl p-5 border border-black/5 dark:border-white/5 text-center space-y-3 animate-in fade-in">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-neutral-400 block">
            {t('Geometric Shapes', 'రేఖాగణిత ఆకారాలు')}
          </span>
          <div className="grid grid-cols-3 gap-3">
            <div className="flex flex-col items-center p-3 bg-white dark:bg-neutral-800 rounded-2xl border border-black/5 dark:border-white/5">
              <div className="w-12 h-12 rounded-full bg-emerald-500 mb-1"></div>
              <span className="text-xs font-bold text-neutral-700 dark:text-neutral-300">{t('Circle', 'వృత్తం')}</span>
            </div>
            <div className="flex flex-col items-center p-3 bg-white dark:bg-neutral-800 rounded-2xl border border-black/5 dark:border-white/5">
              <div className="w-12 h-12 bg-blue-500 rounded-lg mb-1"></div>
              <span className="text-xs font-bold text-neutral-700 dark:text-neutral-300">{t('Square', 'చతురస్రం')}</span>
            </div>
            <div className="flex flex-col items-center p-3 bg-white dark:bg-neutral-800 rounded-2xl border border-black/5 dark:border-white/5">
              <svg viewBox="0 0 60 60" className="w-12 h-12 mb-1">
                <polygon points="30,8 8,50 52,50" fill="#F97316" />
              </svg>
              <span className="text-xs font-bold text-neutral-700 dark:text-neutral-300">{t('Triangle', 'త్రిభుజం')}</span>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="animate-in fade-in duration-500 max-w-4xl mx-auto pt-2 md:pt-4 space-y-6 pb-12">
      {/* Top Header Bar with Back navigation & chapter badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer self-start"
        >
          <ArrowLeft size={18} />
          <span>{t('Back to Dashboard', 'డాష్‌బోర్డ్‌కు తిరిగి వెళ్లండి')}</span>
        </button>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-xs font-bold px-3 py-1 bg-white dark:bg-neutral-800 rounded-full border border-black/5 dark:border-white/5 text-neutral-600 dark:text-neutral-300">
            {studentClass} • {t(`Chapter ${currentChapter.chapterNumber}`, `అధ్యాయం ${currentChapter.chapterNumber}`)}
          </span>
        </div>
      </div>

      {/* Chapter Selection Pill List (Select which chapter to test on) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar">
        {activeList.map((ch) => (
          <button
            key={ch.id}
            type="button"
            onClick={() => {
              setActiveChapterId(ch.id);
              setFlowState('pre_test_summary');
              setQuestionIndex(0);
              setUserAnswer('');
              setAnswerStatus('idle');
              setUserAnswersList([]);
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer border flex items-center gap-1.5 ${
              activeChapterId === ch.id
                ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 border-neutral-900 dark:border-white shadow-xs'
                : 'bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border-black/5 dark:border-white/5 hover:bg-neutral-50 dark:hover:bg-neutral-700'
            }`}
          >
            <span className="w-4 h-4 rounded-full bg-[#D4F670] text-[#1a1a1a] text-[10px] font-black flex items-center justify-center">
              {ch.chapterNumber}
            </span>
            <span>{t(ch.titleEn, ch.titleTe)}</span>
          </button>
        ))}
      </div>

      {/* ============================================================
          PHASE 1: PRE-TEST TOPIC SUMMARY CARD & "START TEST" ACTION
          ============================================================ */}
      {flowState === 'pre_test_summary' && (
        <div className="bg-white dark:bg-neutral-800 rounded-[36px] p-6 md:p-10 shadow-sm border border-black/5 dark:border-white/5 space-y-7 animate-in zoom-in-95">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-100 dark:border-neutral-700 pb-4">
            <div>
              <span className="text-xs font-extrabold uppercase px-2.5 py-1 rounded-full bg-[#D4F670]/30 text-neutral-900 dark:text-[#D4F670] inline-block mb-1.5">
                {t('Pre-Test Topic Summary', 'పరీక్షకు ముందస్తు ముఖ్యాంశాలు')}
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-neutral-900 dark:text-white">
                {t(currentChapter.titleEn, currentChapter.titleTe)}
              </h2>
            </div>

            <span className="text-xs font-bold px-3 py-1 bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-full self-start sm:self-auto">
              {currentChapter.testQuestions.length} {t('Test Questions', 'పరీక్ష ప్రశ్నలు')}
            </span>
          </div>

          {/* Visual Diagram Reminder */}
          <div className="bg-neutral-50 dark:bg-neutral-900/60 rounded-3xl p-5 border border-black/5 dark:border-white/5">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 block mb-3 text-center sm:text-left">
              {t('Visual Concept Diagram Reminder', 'దృశ్య భావనల రేఖాచిత్రం')}
            </span>
            <MathDiagram
              type={currentChapter.visualDiagramType}
              language={language}
              t={t}
              size="normal"
            />
          </div>

          {/* Key Concept Reminders */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              {t('Key Rules & Concepts to Remember', 'గుర్తుంచుకోవలసిన ముఖ్య నియమాలు')}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {(language === 'te' ? currentChapter.keyConceptsTe : currentChapter.keyConceptsEn).map((concept, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-700/40 border border-neutral-200/60 dark:border-neutral-700"
                >
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-xs md:text-sm font-medium text-neutral-800 dark:text-neutral-200">
                    {concept}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Prompt requested: Prominent "Start Test" / "Request Retake" action below summary card */}
          <div className="pt-4 border-t border-neutral-100 dark:border-neutral-700 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-neutral-500 dark:text-neutral-400 text-center sm:text-left">
              {activeChapterTest && activeChapterTest.retry_locked !== false
                ? activeChapterTest.retake_requested
                  ? t(
                      'Retake request is pending teacher approval. Please wait for your teacher to unlock this test.',
                      'రీటేక్ అభ్యర్థన ఉపాధ్యాయుని అనుమతి కోసం వేచి ఉంది. దయచేసి వేచి ఉండండి.'
                    )
                  : activeChapterTest.retake_rejected
                  ? t(
                      'Your retake request was reviewed and rejected by your teacher.',
                      'ఉపాధ్యాయుడు మీ రీటేక్ అభ్యర్థనను తిరస్కరించారు.'
                    )
                  : t(
                      `You already completed this test (Score: ${activeChapterTest.score}/${activeChapterTest.totalQuestions}). Request a retake to attempt it again.`,
                      `మీరు ఇప్పటికే ఈ పరీక్షను పూర్తి చేసారు (స్కోర్: ${activeChapterTest.score}/${activeChapterTest.totalQuestions}). మళ్లీ రాయడానికి రీటేక్ అభ్యర్థించండి.`
                    )
                : t(
                    'When you click Start Test, your answers will be evaluated and synced to the teacher portal.',
                    'మీరు స్టార్ట్ టెస్ట్ క్లిక్ చేయగానే మీ సమాధానాలు ఉపాధ్యాయుని పోర్టల్‌కు అనుసంధానించబడతాయి.'
                  )}
            </p>

            {activeChapterTest && activeChapterTest.retry_locked !== false ? (
              activeChapterTest.retake_requested ? (
                <button
                  type="button"
                  disabled
                  className="w-full sm:w-auto px-6 py-4 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-200 border border-amber-300 dark:border-amber-700 font-extrabold text-sm flex items-center justify-center gap-2 cursor-not-allowed opacity-90 shadow-xs"
                >
                  <Clock size={16} className="animate-spin" />
                  <span>{t('Request Sent. Waiting for Teacher Approval...', 'అభ్యర్థన పంపబడింది. ఉపాధ్యాయుని అనుమతి కోసం వేచి ఉంది...')}</span>
                </button>
              ) : activeChapterTest.retake_rejected ? (
                <span className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs">
                  <XCircle size={16} className="text-rose-600 dark:text-rose-400 shrink-0" />
                  <span>{t('Request Rejected', 'అభ్యర్థన తిరస్కరించబడింది')}</span>
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    updateTestRetakeRequest(activeChapterTest.id, true);
                    setAllCompletedTests(getCompletedTests());
                  }}
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#D4F670] hover:bg-[#bce451] text-black font-extrabold text-base md:text-lg transition-transform hover:scale-102 active:scale-98 shadow-lg shadow-[#D4F670]/15 flex items-center justify-center gap-2 cursor-pointer shrink-0"
                >
                  <RotateCcw size={20} className="stroke-[2.5]" />
                  <span>{t('Request Retake', 'మళ్లీ పరీక్ష కోసం అభ్యర్థించండి')}</span>
                </button>
              )
            ) : activeChapterTest && activeChapterTest.retry_locked === false ? (
              <button
                type="button"
                onClick={handleStartTest}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-base md:text-lg transition-transform hover:scale-102 active:scale-98 shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 cursor-pointer shrink-0"
              >
                <RotateCcw size={22} className="stroke-[2.5]" />
                <span>{t('Retake Approved! Start Test', 'రీటేక్ ఆమోదించబడింది! పరీక్ష ప్రారంభించండి')}</span>
                <span>→</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleStartTest}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#D4F670] hover:bg-[#bce451] text-black font-extrabold text-base md:text-lg transition-transform hover:scale-102 active:scale-98 shadow-lg shadow-[#D4F670]/15 flex items-center justify-center gap-2 cursor-pointer shrink-0"
              >
                <PlayCircle size={22} className="stroke-[2.5]" />
                <span>{t('Start Test', 'టెస్ట్ ప్రారంభించండి')}</span>
                <span>→</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* ============================================================
          PHASE 2: DIAGRAM-BASED ASSESSMENT (FILL-IN-THE-BLANK QUESTIONS)
          ============================================================ */}
      {flowState === 'taking_test' && currentQuestion && (
        <div className="bg-white dark:bg-neutral-800 rounded-[36px] p-6 md:p-10 shadow-sm border border-black/5 dark:border-white/5 space-y-7 animate-in fade-in">
          {/* Header Bar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#D4F670] animate-ping"></span>
              <span className="text-xs md:text-sm font-extrabold text-neutral-900 dark:text-white">
                {t(`Question ${questionIndex + 1} of ${questions.length}`, `ప్రశ్న ${questionIndex + 1} / ${questions.length}`)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Voice Read-Aloud Button */}
              <button
                type="button"
                onClick={handleSpeakQuestion}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  isSpeaking
                    ? 'bg-amber-500 text-white animate-pulse'
                    : 'bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-700 dark:hover:bg-neutral-600 text-neutral-800 dark:text-neutral-200'
                }`}
                title={language === 'te' ? 'ప్రశ్న వినండి' : 'Listen to question'}
              >
                {isSpeaking ? <VolumeX size={15} /> : <Volume2 size={15} />}
                <span>{isSpeaking ? t('Stop', 'ఆపండి') : t('Listen', 'వినండి')}</span>
              </button>
            </div>
          </div>

          {/* Question Prompt - Dual Language Display (English first, followed immediately by Telugu stacked vertically) */}
          <div className="text-center sm:text-left space-y-2">
            <h3 className="text-xl md:text-2xl font-light text-neutral-900 dark:text-white leading-relaxed">
              {currentQuestion.promptEn}
            </h3>
            <p className="text-lg md:text-xl font-light text-neutral-600 dark:text-neutral-300 leading-relaxed">
              {currentQuestion.promptTe}
            </p>
          </div>

          {/* Question Visual Illustration */}
          {renderQuestionVisual()}

          {/* High-Contrast Fill-in-the-Blank Answer Input */}
          <div className="flex flex-col items-center justify-center gap-3 pt-2">
            <label className="text-xs font-bold uppercase tracking-wider text-neutral-400">
              {t('Enter Your Answer:', 'మీ సమాధానాన్ని నమోదు చేయండి:')}
            </label>

            <div className="relative flex items-center justify-center">
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => {
                  setUserAnswer(e.target.value);
                  if (answerStatus !== 'idle') setAnswerStatus('idle');
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleCheckOrNext();
                }}
                disabled={answerStatus !== 'idle'}
                placeholder="?"
                autoFocus
                className={`w-40 sm:w-52 h-16 md:h-20 text-center rounded-3xl border-4 outline-none transition-all text-2xl md:text-4xl font-black
                  ${
                    answerStatus === 'idle'
                      ? 'border-neutral-300 dark:border-neutral-600 focus:border-neutral-900 dark:focus:border-white bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-white'
                      : ''
                  }
                  ${
                    answerStatus === 'correct'
                      ? 'border-green-500 bg-green-50 dark:bg-green-950 text-green-600 dark:text-green-300'
                      : ''
                  }
                  ${
                    answerStatus === 'incorrect'
                      ? 'border-red-500 bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-300'
                      : ''
                  }
                `}
              />
              {answerStatus === 'correct' && (
                <div className="absolute -right-3 -top-3 w-9 h-9 bg-green-500 text-white rounded-full flex items-center justify-center shadow-lg animate-in zoom-in">
                  <Check size={20} strokeWidth={4} />
                </div>
              )}
              {answerStatus === 'incorrect' && (
                <div className="absolute -right-3 -top-3 w-9 h-9 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg animate-in zoom-in">
                  <X size={20} strokeWidth={4} />
                </div>
              )}
            </div>
          </div>

          {/* Feedback Card */}
          {answerStatus === 'correct' && (
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-400 text-center animate-in zoom-in-95">
              <span className="text-xs font-bold uppercase text-emerald-700 dark:text-emerald-300 block">
                {t('Correct! Excellent Work!', 'సరైన సమాధానం! అద్భుతం!')}
              </span>
              <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 mt-1">
                {language === 'te' ? currentQuestion.explanationTe : currentQuestion.explanationEn}
              </p>
            </div>
          )}

          {answerStatus === 'incorrect' && (
            <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/60 border border-red-400 text-center animate-in zoom-in-95">
              <span className="text-xs font-bold uppercase text-red-700 dark:text-red-300 block">
                {t('Not quite right.', 'సరైనది కాదు.')}
              </span>
              <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 mt-1">
                {t('Correct Answer: ', 'సరైన సమాధానం: ')}
                <span className="font-extrabold text-green-600 dark:text-green-400">
                  {currentQuestion.correctAnswer}
                </span>
              </p>
              <p className="text-xs text-neutral-600 dark:text-neutral-300 mt-1">
                {language === 'te' ? currentQuestion.explanationTe : currentQuestion.explanationEn}
              </p>
            </div>
          )}

          {/* Action Button: Check Answer or Next Question */}
          <div className="pt-3 border-t border-neutral-100 dark:border-neutral-700 flex justify-center">
            <button
              type="button"
              onClick={handleCheckOrNext}
              className={`px-10 py-4 rounded-full font-extrabold text-base md:text-lg transition-transform active:scale-95 shadow-md cursor-pointer ${
                answerStatus === 'idle'
                  ? 'bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 hover:bg-black'
                  : 'bg-[#D4F670] hover:bg-[#bce451] text-black'
              }`}
            >
              {answerStatus === 'idle'
                ? t('Check Answer', 'సమాధానం తనిఖీ చేయండి')
                : questionIndex < questions.length - 1
                ? t('Next Question', 'తదుపరి ప్రశ్న')
                : t('Complete Test & Save Score', 'పరీక్షను పూర్తి చేయండి & స్కోర్ సేవ్ చేయండి')}
            </button>
          </div>
        </div>
      )}

      {/* ============================================================
          PHASE 3: TEST COMPLETED & TEACHER SYNCHRONIZATION SUMMARY
          ============================================================ */}
      {flowState === 'test_completed' && (
        <div className="bg-white dark:bg-neutral-800 rounded-[36px] p-6 md:p-10 shadow-sm border border-black/5 dark:border-white/5 space-y-7 text-center animate-in zoom-in-95">
          <div className="w-16 h-16 rounded-full bg-[#D4F670] text-[#1a1a1a] flex items-center justify-center mx-auto shadow-md">
            <Sparkles size={32} />
          </div>

          <div>
            <span className="text-xs font-extrabold uppercase px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 inline-block mb-2">
              {t('Chapter Test Submitted', 'అధ్యాయం పరీక్ష సమర్పించబడింది')}
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-900 dark:text-white">
              {t('Great Job, ', 'అభినందనలు, ')}{studentName}!
            </h2>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm mt-1">
              {t(currentChapter.titleEn, currentChapter.titleTe)}
            </p>
          </div>

          {/* Score Badge */}
          <div className="p-6 rounded-3xl bg-neutral-50 dark:bg-neutral-900 max-w-sm mx-auto border border-black/5 dark:border-white/5 space-y-2">
            <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider block">
              {t('Final Score', 'తుది స్కోరు')}
            </span>
            <div className="text-5xl font-black text-neutral-900 dark:text-white">
              {finalScore.score} / {finalScore.total}
            </div>
            <span className="inline-block px-3 py-1 rounded-full font-bold text-xs bg-[#D4F670] text-[#1a1a1a]">
              {finalScore.percentage}% {t('Accuracy', 'ఖచ్చితత్వం')}
            </span>
          </div>

          {/* Teacher Synchronization Notice */}
          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 max-w-lg mx-auto flex items-center justify-center gap-2.5 text-emerald-900 dark:text-emerald-200 text-xs sm:text-sm font-semibold">
            <CheckCircle2 size={18} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>
              {t(
                'Test score and submission date synced with Teacher Dashboard successfully.',
                'పరీక్ష స్కోరు మరియు సమర్పణ తేదీ ఉపాధ్యాయుని డాష్‌బోర్డ్‌తో సమకాలీకరించబడ్డాయి.'
              )}
            </span>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
            {onNavigateToProgress && (
              <button
                type="button"
                onClick={onNavigateToProgress}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-extrabold text-sm flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <TrendingUp size={16} />
                <span>{t('View in My Progress', 'నా పురోగతిలో చూడండి')}</span>
              </button>
            )}

            {/* Student-initiated "Request Retake" flow alongside score */}
            {isRetakeApproved ? (
              <button
                type="button"
                onClick={handleStartTest}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-sm flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-transform active:scale-95 animate-in zoom-in-95"
              >
                <RotateCcw size={16} />
                <span>{t('Retake Approved! Start Test', 'రీటేక్ ఆమోదించబడింది! పరీక్ష ప్రారంభించండి')}</span>
              </button>
            ) : isRetakeRequested ? (
              <button
                type="button"
                disabled
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-amber-50 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-700/60 text-amber-800 dark:text-amber-200 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-not-allowed opacity-90 shadow-xs"
              >
                <Clock size={16} className="text-amber-500 animate-spin" />
                <span>{t('Request Sent. Waiting for Teacher Approval...', 'అభ్యర్థన పంపబడింది. ఉపాధ్యాయుని అనుమతి కోసం వేచి ఉంది...')}</span>
              </button>
            ) : isRetakeRejected ? (
              <span className="w-full sm:w-auto px-5 py-3.5 rounded-full bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs">
                <XCircle size={16} className="text-rose-600 dark:text-rose-400 shrink-0" />
                <span>{t('Request Rejected by Teacher', 'ఉపాధ్యాయునిచే అభ్యర్థన తిరస్కరించబడింది')}</span>
              </span>
            ) : (
              <button
                type="button"
                onClick={handleRequestRetake}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-amber-100 hover:bg-amber-200 dark:bg-amber-900/40 dark:hover:bg-amber-900/60 text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-700 font-bold text-sm flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-transform active:scale-95"
              >
                <RotateCcw size={16} />
                <span>{t('Request Retake', 'మళ్లీ పరీక్ష కోసం అభ్యర్థించండి')}</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                setFlowState('pre_test_summary');
              }}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#D4F670] hover:bg-[#bce451] text-black font-extrabold text-sm flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <BookOpen size={16} />
              <span>{t('Choose Another Chapter', 'మరొక అధ్యాయాన్ని ఎంచుకోండి')}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
