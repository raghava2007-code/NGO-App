import { useState, useEffect } from 'react';
import { ArrowLeft, Check, X, Volume2, VolumeX, Sparkles, PlayCircle, BookOpen, CheckCircle2, RotateCcw, TrendingUp } from 'lucide-react';
import { StudentLevel, Language, StudentClass, CompletedTestRecord } from '../types';
import { speakExplanation, stopSpeaking } from '../utils/voiceExplanation';
import { CHAPTERS_DATA, ChapterData, TestQuestionItem } from '../data/curriculumData';
import { saveCompletedTest } from '../utils/testStorage';
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
  level: _level,
  language = 'en',
  onProgressIncrement,
  studentClass = 'Class 1',
  selectedChapterId,
  onNavigateToProgress,
  studentName = 'Student',
}: PracticeScreenProps) {
  // Available chapters for the student's class
  const classChapters = CHAPTERS_DATA.filter((ch) => ch.classLevel === studentClass);
  const activeList = classChapters.length > 0 ? classChapters : CHAPTERS_DATA;

  // Selected Chapter for Test
  const [activeChapterId, setActiveChapterId] = useState<string>(() => {
    if (selectedChapterId && activeList.some((ch) => ch.id === selectedChapterId)) {
      return selectedChapterId;
    }
    return activeList[0]?.id || 'c1-ch1';
  });

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

  // Start the test after reviewing pre-test summary
  const handleStartTest = () => {
    stopSpeaking();
    setIsSpeaking(false);
    setQuestionIndex(0);
    setUserAnswer('');
    setAnswerStatus('idle');
    setUserAnswersList([]);
    setFlowState('taking_test');
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

        // Save and synchronize to teacher dashboard & progress storage
        const testRecord: CompletedTestRecord = {
          id: `test-${Date.now()}`,
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
          answers: userAnswersList,
        };

        saveCompletedTest(testRecord);
        setFlowState('test_completed');
      }
    }
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

          {/* Prompt requested: Prominent "Start Test" button below summary card */}
          <div className="pt-4 border-t border-neutral-100 dark:border-neutral-700 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-neutral-500 dark:text-neutral-400 text-center sm:text-left">
              {t(
                'When you click Start Test, your answers will be evaluated and synced to the teacher portal.',
                'మీరు స్టార్ట్ టెస్ట్ క్లిక్ చేయగానే మీ సమాధానాలు ఉపాధ్యాయుని పోర్టల్‌కు అనుసంధానించబడతాయి.'
              )}
            </p>

            <button
              type="button"
              onClick={handleStartTest}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#D4F670] hover:bg-[#bce451] text-black font-extrabold text-base md:text-lg transition-transform hover:scale-102 active:scale-98 shadow-lg shadow-[#D4F670]/15 flex items-center justify-center gap-2 cursor-pointer shrink-0"
            >
              <PlayCircle size={22} className="stroke-[2.5]" />
              <span>{t('Start Test', 'టెస్ట్ ప్రారంభించండి')}</span>
              <span>→</span>
            </button>
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
                {t('Test Question', 'పరీక్ష ప్రశ్న')} {questionIndex + 1} / {questions.length}
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

          {/* Question Prompt */}
          <div className="text-center sm:text-left space-y-1">
            <h3 className="text-xl md:text-2xl font-bold text-neutral-900 dark:text-white leading-relaxed">
              {language === 'te' ? currentQuestion.promptTe : currentQuestion.promptEn}
            </h3>
          </div>

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

            <button
              type="button"
              onClick={handleStartTest}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-700 dark:hover:bg-neutral-600 text-neutral-800 dark:text-neutral-200 font-bold text-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <RotateCcw size={16} />
              <span>{t('Retake Test', 'మళ్ళీ పరీక్ష రాయండి')}</span>
            </button>

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
