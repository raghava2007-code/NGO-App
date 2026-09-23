import { useState, useEffect, useMemo } from 'react';
import { ArrowLeft, Check, X, HelpCircle, Volume2, VolumeX, Sparkles, GraduationCap } from 'lucide-react';
import { StudentLevel, Language, StudentClass, STUDENT_CLASS_OPTIONS } from '../types';
import { speakExplanation, stopSpeaking } from '../utils/voiceExplanation';

interface PracticeScreenProps {
  t: (en: string, te: string) => string;
  onBack: () => void;
  level: StudentLevel;
  language?: Language;
  onProgressIncrement?: () => void;
  studentClass?: StudentClass;
}

interface QuestionItem {
  problem: string;
  operand1: string;
  operator: string;
  operand2: string;
  answer: string;
  hintEn: string;
  hintTe: string;
}

/**
 * High-contrast, child-friendly mathematical symbol badge.
 * Provides maximum contrast (dark container in light mode, crisp white in dark mode)
 * with enlarged font size and generous spacing to eliminate ambiguity for young learners.
 */
export const MathSymbolBadge = ({
  symbol,
  size = 'large',
}: {
  symbol: string;
  size?: 'normal' | 'large';
}) => {
  const displaySymbol = symbol === '-' ? '−' : symbol;
  
  if (size === 'normal') {
    return (
      <span
        className="inline-flex items-center justify-center px-2.5 py-1 mx-1 rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 font-black text-base md:text-lg shadow-xs border border-neutral-800 dark:border-neutral-200 select-none"
        aria-label={`Symbol ${displaySymbol}`}
      >
        {displaySymbol}
      </span>
    );
  }

  return (
    <span
      className="inline-flex items-center justify-center min-w-[3.5rem] h-14 md:min-w-[4.5rem] md:h-20 px-3 md:px-4 mx-2 md:mx-3 rounded-2xl md:rounded-3xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 font-black text-3xl md:text-5xl shadow-md border-2 border-neutral-700 dark:border-neutral-300 select-none transform transition-transform hover:scale-105"
      aria-label={`Operation: ${displaySymbol}`}
    >
      {displaySymbol}
    </span>
  );
};

export default function PracticeScreen({
  t,
  onBack,
  level,
  language = 'en',
  onProgressIncrement,
  studentClass,
}: PracticeScreenProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [status, setStatus] = useState<'idle' | 'correct' | 'incorrect'>('idle');
  const [showHint, setShowHint] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Stop speech when component unmounts
  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, []);

  // Class-specific dynamically filtered questions
  const classQuestions = useMemo((): QuestionItem[] => {
    if (studentClass === 'Class 1' || studentClass === 'Class 2') {
      return [
        {
          problem: '5 + 2 = ?',
          operand1: '5',
          operator: '+',
          operand2: '2',
          answer: '7',
          hintEn: 'Count forward from 5... six, seven!',
          hintTe: '5 నుండి ముందుకు లెక్కించండి... ఆరు, ఏడు!',
        },
        {
          problem: '6 + 3 = ?',
          operand1: '6',
          operator: '+',
          operand2: '3',
          answer: '9',
          hintEn: 'Count 3 more after 6: 7, 8, 9!',
          hintTe: '6 తర్వాత మరో 3 లెక్కించండి: 7, 8, 9!',
        },
        {
          problem: '8 - 3 = ?',
          operand1: '8',
          operator: '-',
          operand2: '3',
          answer: '5',
          hintEn: 'Take away 3 from 8: 8, 7, 6 -> 5!',
          hintTe: '8 నుండి 3 తీసివేయండి: 5 మిగులుతుంది!',
        },
      ];
    }

    if (studentClass === 'Class 3' || studentClass === 'Class 4' || studentClass === 'Class 5') {
      return [
        {
          problem: '24 + 18 = ?',
          operand1: '24',
          operator: '+',
          operand2: '18',
          answer: '42',
          hintEn: 'Add units first: 4 + 8 = 12 (carry 1). Then 2 + 1 + 1 = 4 -> 42!',
          hintTe: 'మొదట ఒకట్ల స్థానం కూడండి: 4 + 8 = 12. తర్వాత పదుల స్థానం: 42!',
        },
        {
          problem: '12 × 5 = ?',
          operand1: '12',
          operator: '×',
          operand2: '5',
          answer: '60',
          hintEn: 'Think 10 × 5 = 50, and 2 × 5 = 10. 50 + 10 = 60!',
          hintTe: '10 × 5 = 50 మరియు 2 × 5 = 10. మొత్తం 60!',
        },
        {
          problem: '45 - 19 = ?',
          operand1: '45',
          operator: '-',
          operand2: '19',
          answer: '26',
          hintEn: 'Subtract 20 to get 25, then add 1 back: 26!',
          hintTe: '45 నుండి 20 తీసివేసి 1 కలపండి: 26!',
        },
      ];
    }

    if (studentClass === 'Intermediate 1st Year' || studentClass === 'Intermediate 2nd Year') {
      return [
        {
          problem: '4x - 12 = 28',
          operand1: '4x - 12',
          operator: '=',
          operand2: '28',
          answer: '10',
          hintEn: 'Add 12 to both sides: 4x = 40. Then divide by 4: x = 10.',
          hintTe: 'రెండు వైపులా 12 కలపండి: 4x = 40. ఆపై 4 తో భాగించండి: x = 10.',
        },
        {
          problem: '5x + 15 = 45',
          operand1: '5x + 15',
          operator: '=',
          operand2: '45',
          answer: '6',
          hintEn: 'Subtract 15: 5x = 30. Then divide by 5: x = 6.',
          hintTe: '15 తీసివేయండి: 5x = 30. ఆపై 5 తో భాగించండి: x = 6.',
        },
        {
          problem: '8² - 14 = ?',
          operand1: '8²',
          operator: '-',
          operand2: '14',
          answer: '50',
          hintEn: '8² = 64. Then 64 - 14 = 50.',
          hintTe: '8² = 64. ఆపై 64 - 14 = 50.',
        },
      ];
    }

    // Default questions by standard level (Classes 6-10 and fallbacks)
    const questionsByLevel: Record<StudentLevel, QuestionItem[]> = {
      Beginner: [
        {
          problem: '5 + 2 = ?',
          operand1: '5',
          operator: '+',
          operand2: '2',
          answer: '7',
          hintEn: 'Count forward from 5... six, seven!',
          hintTe: '5 నుండి ముందుకు లెక్కించండి... ఆరు, ఏడు!',
        },
        {
          problem: '9 + 4 = ?',
          operand1: '9',
          operator: '+',
          operand2: '4',
          answer: '13',
          hintEn: '9 needs 1 more to reach 10. Then add remaining 3: 10 + 3 = 13!',
          hintTe: '9 కి 10 చేరుకోవడానికి 1 కావాలి. ఆపై మిగిలిన 3 కలపండి: 13!',
        },
        {
          problem: '12 - 5 = ?',
          operand1: '12',
          operator: '-',
          operand2: '5',
          answer: '7',
          hintEn: 'Subtract 2 to reach 10, then subtract 3 more: 10 - 3 = 7.',
          hintTe: '10 చేరుకోవడానికి 2 తీసివేయండి, తర్వాత మరో 3 తీసివేయండి: 7.',
        },
      ],
      Intermediate: [
        {
          problem: '6 × 7 = ?',
          operand1: '6',
          operator: '×',
          operand2: '7',
          answer: '42',
          hintEn: 'Think: 6 × 6 = 36, then add one more 6 to get 42.',
          hintTe: '6 × 6 = 36, దానికి మరొక 6 కలపండి: 42.',
        },
        {
          problem: '48 ÷ 6 = ?',
          operand1: '48',
          operator: '÷',
          operand2: '6',
          answer: '8',
          hintEn: 'What number multiplied by 6 equals 48? Think 6 × 8 = 48!',
          hintTe: '6 తో ఏ సంఖ్యను గుణిస్తే 48 వస్తుంది? 6 × 8 = 48.',
        },
        {
          problem: '15 × 4 = ?',
          operand1: '15',
          operator: '×',
          operand2: '4',
          answer: '60',
          hintEn: 'Double 15 is 30, and double 30 is 60!',
          hintTe: '15 ని రెట్టింపు చేస్తే 30, 30 ని రెట్టింపు చేస్తే 60!',
        },
      ],
      Advanced: [
        {
          problem: '3x = 21',
          operand1: '3x',
          operator: '=',
          operand2: '21',
          answer: '7',
          hintEn: 'Divide both sides by 3: 21 / 3 = 7.',
          hintTe: 'రెండు వైపులా 3 తో భాగించండి: 21 / 3 = 7.',
        },
        {
          problem: '2x + 4 = 16',
          operand1: '2x + 4',
          operator: '=',
          operand2: '16',
          answer: '6',
          hintEn: 'First subtract 4 (2x = 12), then divide by 2: x = 6.',
          hintTe: 'మొదట 4 తీసివేయండి (2x = 12), తర్వాత 2 తో భాగించండి: x = 6.',
        },
        {
          problem: '8² - 14 = ?',
          operand1: '8²',
          operator: '-',
          operand2: '14',
          answer: '50',
          hintEn: '8² = 64. Then 64 - 14 = 50.',
          hintTe: '8² = 64. ఆపై 64 - 14 = 50.',
        },
      ],
    };

    return questionsByLevel[level] || questionsByLevel.Beginner;
  }, [studentClass, level]);

  const list = classQuestions;
  const currentQ = list[currentIndex] || list[0];

  const handleSpeak = () => {
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
      return;
    }

    const opSymbol = currentQ.operator === '-' ? 'minus' : currentQ.operator === '+' ? 'plus' : currentQ.operator === '×' ? 'times' : currentQ.operator === '÷' ? 'divided by' : 'equals';
    const opTelugu = currentQ.operator === '-' ? 'తీసివేత' : currentQ.operator === '+' ? 'కూడిక' : currentQ.operator === '×' ? 'గుణకారం' : currentQ.operator === '÷' ? 'భాగహారం' : 'సమానం';

    const problemPrompt =
      language === 'te'
        ? `ప్రశ్న: ${currentQ.operand1} ${opTelugu} ${currentQ.operand2} సమానం ఎంత? ${
            showHint ? 'సూచన: ' + currentQ.hintTe : ''
          }`
        : `Question: What is ${currentQ.operand1} ${opSymbol} ${currentQ.operand2}? ${
            showHint ? 'Hint: ' + currentQ.hintEn : ''
          }`;

    speakExplanation(
      problemPrompt,
      language,
      () => setIsSpeaking(true),
      () => setIsSpeaking(false),
      () => setIsSpeaking(false)
    );
  };

  const handleAction = () => {
    if (status === 'idle') {
      if (!answer.trim()) return;

      if (answer.trim() === currentQ.answer) {
        setStatus('correct');
        if (onProgressIncrement) onProgressIncrement();
      } else {
        setStatus('incorrect');
      }
    } else {
      // Advance to next
      stopSpeaking();
      setIsSpeaking(false);
      setStatus('idle');
      setAnswer('');
      setShowHint(false);
      if (currentIndex < list.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        // Loop back
        setCurrentIndex(0);
      }
    }
  };

  return (
    <div className="animate-in fade-in duration-500 max-w-3xl mx-auto pt-4 md:pt-6 space-y-6">
      
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft size={18} />
          {t('Back to Dashboard', 'డాష్‌బోర్డ్‌కు తిరిగి వెళ్లండి')}
        </button>

        <span className="text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
          {currentIndex + 1} / {list.length} {t('Questions', 'ప్రశ్నలు')}
        </span>
      </div>

      <div className="bg-white dark:bg-neutral-800 rounded-[40px] p-6 md:p-12 shadow-sm border border-black/5 dark:border-white/5 text-center relative overflow-hidden">
        
        <div className="absolute top-6 right-6 md:top-8 md:right-8">
          <button 
            onClick={() => setShowHint(!showHint)}
            className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 flex items-center justify-center hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors cursor-pointer"
            title={t('Show Hint', 'సూచన చూపించు')}
          >
            <HelpCircle size={20} />
          </button>
        </div>

        {/* Level & Class badge and interactive voice explanation button */}
        <div className="flex items-center justify-center gap-3 mb-8 md:mb-10 mt-2 md:mt-0 flex-wrap">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full font-semibold text-sm shadow-xs border border-blue-200/50 dark:border-blue-900/50">
            <GraduationCap size={16} />
            <span>
              {studentClass
                ? `${t(
                    STUDENT_CLASS_OPTIONS.find((c) => c.value === studentClass)?.labelEn || studentClass,
                    STUDENT_CLASS_OPTIONS.find((c) => c.value === studentClass)?.labelTe || studentClass
                  )} • ${t(level, level === 'Beginner' ? 'ప్రారంభం' : level === 'Intermediate' ? 'మధ్యస్థం' : 'అధునాతనం')}`
                : `${level}`}{' '}
              {t('Practice Drill', 'సాధన డ్రిల్')} • Q{currentIndex + 1}
            </span>
          </div>

          <button
            type="button"
            onClick={handleSpeak}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-xs sm:text-sm transition-all cursor-pointer shadow-xs ${
              isSpeaking
                ? 'bg-amber-500 text-white animate-pulse'
                : 'bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-700 dark:hover:bg-neutral-600 text-neutral-800 dark:text-neutral-200'
            }`}
            title={
              language === 'te'
                ? 'వాయిస్ ద్వారా ప్రశ్న వినండి'
                : 'Listen to voice explanation'
            }
          >
            {isSpeaking ? <VolumeX size={16} /> : <Volume2 size={16} />}
            <span>
              {isSpeaking
                ? t('Stop Voice', 'ఆపండి')
                : t('Listen (Voice)', 'వినండి (వాయిస్)')}
            </span>
          </button>
        </div>

        {/* HIGH-CONTRAST MATH PROBLEM DISPLAY */}
        {/* All mathematical symbols (+, −, ×, ÷, =) are rendered inside bold, high-contrast badges with generous spacing */}
        <div className="mb-10 flex items-center justify-center flex-wrap gap-y-4 text-neutral-900 dark:text-white select-none">
          <span className="text-4xl md:text-6xl font-black px-2 tracking-tight">
            {currentQ.operand1}
          </span>
          
          {/* Arithmetical Operator Symbol Badge */}
          <MathSymbolBadge symbol={currentQ.operator} size="large" />

          <span className="text-4xl md:text-6xl font-black px-2 tracking-tight">
            {currentQ.operand2}
          </span>

          {/* Equality / Arrow Symbol Badge */}
          <MathSymbolBadge symbol={level === 'Advanced' && currentQ.operator === '=' ? '=>' : '='} size="large" />

          <div className="relative inline-block ml-2">
            <input 
              type="text"
              value={answer}
              onChange={(e) => {
                setAnswer(e.target.value);
                if (status !== 'idle') setStatus('idle');
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleAction();
              }}
              disabled={status !== 'idle'}
              placeholder="?"
              autoFocus
              className={`w-24 h-16 md:w-32 md:h-20 text-center rounded-2xl md:rounded-3xl border-4 outline-none transition-all text-3xl md:text-5xl font-black
                ${status === 'idle' ? 'border-neutral-300 dark:border-neutral-600 focus:border-neutral-900 dark:focus:border-white bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-white' : ''}
                ${status === 'correct' ? 'border-green-500 bg-green-50 dark:bg-green-950 text-green-600 dark:text-green-300' : ''}
                ${status === 'incorrect' ? 'border-red-500 bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-300' : ''}
              `}
              maxLength={4}
            />
            {status === 'correct' && (
              <div className="absolute -right-3 -top-3 md:-right-4 md:-top-4 w-9 h-9 md:w-11 md:h-11 bg-green-500 text-white rounded-full flex items-center justify-center shadow-lg animate-in zoom-in">
                <Check size={22} strokeWidth={4} />
              </div>
            )}
            {status === 'incorrect' && (
              <div className="absolute -right-3 -top-3 md:-right-4 md:-top-4 w-9 h-9 md:w-11 md:h-11 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg animate-in zoom-in">
                <X size={22} strokeWidth={4} />
              </div>
            )}
          </div>
        </div>

        {/* INTERACTIVE HIGH-CONTRAST FEEDBACK SCREEN */}
        {status === 'correct' && (
          <div className="bg-emerald-50 dark:bg-emerald-950/60 border-2 border-emerald-500/70 p-4 md:p-5 rounded-2xl max-w-lg mx-auto mb-6 flex flex-col sm:flex-row items-center justify-center gap-3 animate-in zoom-in-95 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-sm">
              <Sparkles size={20} />
            </div>
            <div className="text-center sm:text-left">
              <p className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                {t('Correct Answer! Great Job!', 'సరైన సమాధానం! అద్భుతం!')}
              </p>
              <div className="flex items-center justify-center sm:justify-start flex-wrap gap-1 text-base md:text-lg font-bold text-neutral-900 dark:text-white mt-1">
                <span>{currentQ.operand1}</span>
                <MathSymbolBadge symbol={currentQ.operator} size="normal" />
                <span>{currentQ.operand2}</span>
                <MathSymbolBadge symbol="=" size="normal" />
                <span className="text-emerald-600 dark:text-emerald-400 font-black text-lg md:text-xl">
                  {currentQ.answer}
                </span>
              </div>
            </div>
          </div>
        )}

        {status === 'incorrect' && (
          <div className="bg-red-50 dark:bg-red-950/60 border-2 border-red-500/70 p-4 md:p-5 rounded-2xl max-w-lg mx-auto mb-6 flex flex-col sm:flex-row items-center justify-center gap-3 animate-in zoom-in-95 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center shrink-0 shadow-sm">
              <X size={20} strokeWidth={3.5} />
            </div>
            <div className="text-center sm:text-left">
              <p className="text-xs font-bold uppercase tracking-wider text-red-700 dark:text-red-300">
                {t('Not quite right. Review the equation:', 'సరైన సమీకరణాన్ని సమీక్షించండి:')}
              </p>
              <div className="flex items-center justify-center sm:justify-start flex-wrap gap-1 text-base md:text-lg font-bold text-neutral-900 dark:text-white mt-1">
                <span>{currentQ.operand1}</span>
                <MathSymbolBadge symbol={currentQ.operator} size="normal" />
                <span>{currentQ.operand2}</span>
                <MathSymbolBadge symbol="=" size="normal" />
                <span className="text-green-600 dark:text-green-400 font-black text-lg md:text-xl">
                  {currentQ.answer}
                </span>
              </div>
            </div>
          </div>
        )}

        {showHint && (
          <div className="bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-200 p-5 rounded-2xl mb-8 max-w-md mx-auto text-left flex gap-3 animate-in slide-in-from-top-4 border border-amber-200/60 dark:border-amber-800/60 shadow-xs">
            <div className="text-xl">💡</div>
            <div>
              <p className="font-semibold text-sm mb-0.5">{t('Hint', 'సూచన')}</p>
              <p className="opacity-90 text-sm leading-relaxed">{t(currentQ.hintEn, currentQ.hintTe)}</p>
            </div>
          </div>
        )}

        <button 
          onClick={handleAction}
          className={`text-base md:text-lg font-bold py-4 px-10 md:py-4 md:px-14 rounded-full transition-all shadow-lg active:scale-95 cursor-pointer ${
            status === 'idle' 
              ? 'bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 hover:bg-black dark:hover:bg-white hover:-translate-y-0.5' 
              : 'bg-[#D4F670] hover:bg-[#bce451] text-black hover:-translate-y-0.5'
          }`}
        >
          {status === 'idle' ? t('Check Answer', 'సమాధానం తనిఖీ చేయండి') : t('Next Question', 'తదుపరి ప్రశ్న')}
        </button>

      </div>
    </div>
  );
}
