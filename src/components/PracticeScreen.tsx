import { useState, useEffect, useMemo } from 'react';
import { ArrowLeft, Check, X, HelpCircle, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { StudentLevel, Language, StudentClass } from '../types';
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
 * Mathematical symbol component that matches number styling perfectly:
 * Renders in high-contrast black in light mode and white in dark mode
 * without any contrasting container pill or opposite-colored background box.
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
        className="inline-flex items-center justify-center font-bold text-neutral-900 dark:text-white mx-1 text-base md:text-lg select-none"
        aria-label={`Symbol ${displaySymbol}`}
      >
        {displaySymbol}
      </span>
    );
  }

  return (
    <span
      className="inline-flex items-center justify-center font-black text-neutral-900 dark:text-white mx-2 md:mx-4 text-4xl md:text-6xl select-none"
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
          hintEn: 'Keep 5 in your mind, then count up 2 more on your fingers. What number do you reach?',
          hintTe: '5 ని మనస్సులో ఉంచుకొని, చేతి వేళ్ళపై మరో 2 ముందుకు లెక్కించండి. ఎంత వస్తుంది?',
        },
        {
          problem: '6 + 3 = ?',
          operand1: '6',
          operator: '+',
          operand2: '3',
          answer: '9',
          hintEn: 'Start at 6 on the number line and jump forward 3 steps. Where do you land?',
          hintTe: 'సంఖ్యా రేఖపై 6 వద్ద మొదలుపెట్టి 3 అడుగులు ముందుకు వేయండి. ఏ సంఖ్య వస్తుంది?',
        },
        {
          problem: '8 - 3 = ?',
          operand1: '8',
          operator: '-',
          operand2: '3',
          answer: '5',
          hintEn: 'Imagine you have 8 objects and remove 3 of them. Count how many are still left.',
          hintTe: 'మీ వద్ద 8 వస్తువులు ఉంటే 3 తీసివేయండి. ఇంకా ఎన్ని మిగిలి ఉన్నాయో లెక్కించండి.',
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
          hintEn: 'Split 18 into 10 and 8: first add 10 to 24, then add 8 to that result.',
          hintTe: '18 ని 10 మరియు 8 గా విభజించండి: మొదట 24 కి 10 కలపండి, ఆపై 8 కలపండి.',
        },
        {
          problem: '12 × 5 = ?',
          operand1: '12',
          operator: '×',
          operand2: '5',
          answer: '60',
          hintEn: 'Break 12 into (10 + 2): multiply 10 by 5, multiply 2 by 5, and then combine the two parts.',
          hintTe: '12 ని (10 + 2) గా విభజించండి: 10 × 5 మరియు 2 × 5 చేసి ఆ రెండింటినీ కూడండి.',
        },
        {
          problem: '45 - 19 = ?',
          operand1: '45',
          operator: '-',
          operand2: '19',
          answer: '26',
          hintEn: '19 is very close to 20! Try subtracting 20 from 45 first, then adjust by adding 1 back.',
          hintTe: '19 అనేది 20 కి దగ్గరగా ఉంది! మొదట 45 నుండి 20 తీసివేసి, తర్వాత 1 కలపండి.',
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
          hintEn: 'Isolate the x term: what inverse operation cancels subtracting 12? Then divide by 4.',
          hintTe: 'x పదాన్ని వేరు చేయండి: -12 ను రద్దు చేయడానికి రెండు వైపులా 12 కలపండి, తర్వాత 4 తో భాగించండి.',
        },
        {
          problem: '5x + 15 = 45',
          operand1: '5x + 15',
          operator: '=',
          operand2: '45',
          answer: '6',
          hintEn: 'Keep the equation balanced: first subtract 15 from both sides, then divide by 5.',
          hintTe: 'సమీకరణాన్ని సమతుల్యంగా ఉంచండి: మొదట రెండు వైపులా 15 తీసివేయండి, తర్వాత 5 తో భాగించండి.',
        },
        {
          problem: '8² - 14 = ?',
          operand1: '8²',
          operator: '-',
          operand2: '14',
          answer: '50',
          hintEn: 'Calculate 8 squared (8 multiplied by itself) first. Then subtract 14 from that result.',
          hintTe: 'మొదట 8 వర్గాన్ని (8 × 8) లెక్కించండి. ఆ విలువ నుండి 14 తీసివేయండి.',
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
          hintEn: 'Start at 5 on the number line and jump forward 2 steps. Where do you land?',
          hintTe: 'సంఖ్యా రేఖపై 5 వద్ద మొదలుపెట్టి 2 అడుగులు ముందుకు వెళ్ళండి. ఎంత వస్తుంది?',
        },
        {
          problem: '9 + 4 = ?',
          operand1: '9',
          operator: '+',
          operand2: '4',
          answer: '13',
          hintEn: '9 needs 1 more to reach 10. Borrow 1 from 4 to make 10, then see what remains.',
          hintTe: '9 సంఖ్య 10 కావడానికి 1 కావాలి. 4 నుండి 1 తీసుకొని 10 చేయండి, తర్వాత మిగిలినది కలపండి.',
        },
        {
          problem: '12 - 5 = ?',
          operand1: '12',
          operator: '-',
          operand2: '5',
          answer: '7',
          hintEn: 'Split 5 into 2 and 3: first subtract 2 to reach friendly 10, then take away the other 3.',
          hintTe: '5 ని 2 మరియు 3 గా విభజించండి: మొదట 2 తీసివేసి 10 కి చేరుకోండి, తర్వాత మిగిలిన 3 తీసివేయండి.',
        },
      ],
      Intermediate: [
        {
          problem: '6 × 7 = ?',
          operand1: '6',
          operator: '×',
          operand2: '7',
          answer: '42',
          hintEn: 'Use a landmark you know: if 6 × 5 = 30, add two more groups of 6.',
          hintTe: 'మీకు తెలిసిన ల్యాండ్‌మార్క్ ఉపయోగించండి: 6 × 5 = 30 అయితే, దానికి మరో రెండు 6 లను కలపండి.',
        },
        {
          problem: '48 ÷ 6 = ?',
          operand1: '48',
          operator: '÷',
          operand2: '6',
          answer: '8',
          hintEn: 'Think backwards with times tables: which number, when multiplied by 6, gives 48?',
          hintTe: 'ఎక్కాలను రివర్స్‌లో ఆలోచించండి: 6 ని ఏ సంఖ్యతో గుణిస్తే 48 వస్తుంది?',
        },
        {
          problem: '15 × 4 = ?',
          operand1: '15',
          operator: '×',
          operand2: '4',
          answer: '60',
          hintEn: 'Try the double-and-double trick: double 15 once, then double that number again!',
          hintTe: 'రెట్టింపు వ్యూహాన్ని ఉపయోగించండి: 15 ని రెట్టింపు చేసి, వచ్చిన ఫలితాన్ని మరోసారి రెట్టింపు చేయండి!',
        },
      ],
      Advanced: [
        {
          problem: '3x = 21',
          operand1: '3x',
          operator: '=',
          operand2: '21',
          answer: '7',
          hintEn: 'Since 3 is multiplied by x, apply the inverse operation: divide both sides by 3.',
          hintTe: '3 అనేది x తో గుణించబడి ఉంది కాబట్టి, రెండు వైపులా 3 తో భాగించి x విలువను కనుగొనండి.',
        },
        {
          problem: '2x + 4 = 16',
          operand1: '2x + 4',
          operator: '=',
          operand2: '16',
          answer: '6',
          hintEn: 'Follow inverse operations: first subtract 4 from both sides, then divide by 2.',
          hintTe: 'వ్యతిరేక క్రమంలో చేయండి: మొదట రెండు వైపులా 4 తీసివేయండి, తర్వాత 2 తో భాగించండి.',
        },
        {
          problem: '8² - 14 = ?',
          operand1: '8²',
          operator: '-',
          operand2: '14',
          answer: '50',
          hintEn: 'Find the product of 8 × 8 first, then subtract 14 from that total.',
          hintTe: 'మొదట 8 × 8 విలువను లెక్కించి, ఆ మొత్తం నుండి 14 తీసివేయండి.',
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

        {/* Question Number & interactive voice explanation button */}
        <div className="flex items-center justify-center gap-3 mb-8 md:mb-10 mt-2 md:mt-0 flex-wrap">
          <div className="inline-flex items-center gap-2 bg-neutral-100 dark:bg-neutral-700/60 text-neutral-800 dark:text-neutral-200 px-4 py-2 rounded-full font-bold text-sm shadow-xs border border-black/5 dark:border-white/10">
            <span>
              {t('Question', 'ప్రశ్న')} {currentIndex + 1}
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
