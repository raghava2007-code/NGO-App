import { useState } from 'react';
import { ArrowLeft, Check, X, HelpCircle, Volume2 } from 'lucide-react';
import { StudentLevel } from '../types';

interface PracticeScreenProps {
  t: (en: string, te: string) => string;
  onBack: () => void;
  level: StudentLevel;
  onProgressIncrement?: () => void;
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

export default function PracticeScreen({ t, onBack, level, onProgressIncrement }: PracticeScreenProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [status, setStatus] = useState<'idle' | 'correct' | 'incorrect'>('idle');
  const [showHint, setShowHint] = useState(false);

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
        operand2: '21, x',
        answer: '7',
        hintEn: 'Divide both sides by 3: 21 / 3 = 7.',
        hintTe: 'రెండు వైపులా 3 తో భాగించండి: 21 / 3 = 7.',
      },
      {
        problem: '2x + 4 = 16',
        operand1: '2x + 4',
        operator: '=',
        operand2: '16, x',
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

  const list = questionsByLevel[level] || questionsByLevel.Beginner;
  const currentQ = list[currentIndex] || list[0];

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

      <div className="bg-white dark:bg-neutral-800 rounded-[40px] p-8 md:p-12 shadow-sm border border-black/5 dark:border-white/5 text-center relative overflow-hidden">
        
        <div className="absolute top-6 right-6 md:top-8 md:right-8">
          <button 
            onClick={() => setShowHint(!showHint)}
            className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 flex items-center justify-center hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors cursor-pointer"
            title={t('Show Hint', 'సూచన చూపించు')}
          >
            <HelpCircle size={20} />
          </button>
        </div>

        <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full font-semibold text-sm mb-10 mt-2 md:mt-0">
          <Volume2 size={18} />
          <span>{level} {t('Practice Drill', 'సాధన డ్రిల్')} • Q{currentIndex + 1}</span>
        </div>

        {/* Math Problem Display */}
        <div className="text-4xl md:text-6xl font-bold tracking-tighter mb-12 flex items-center justify-center gap-4 md:gap-6 flex-wrap text-neutral-900 dark:text-white">
          <span>{currentQ.operand1}</span>
          <span className="text-neutral-300 dark:text-neutral-600">{currentQ.operator}</span>
          <span>{currentQ.operand2}</span>
          <span className="text-neutral-300 dark:text-neutral-600">{level === 'Advanced' ? '=>' : '='}</span>
          <div className="relative inline-block">
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
              className={`w-24 h-20 md:w-32 md:h-24 text-center rounded-2xl border-4 outline-none transition-all text-3xl md:text-5xl font-bold
                ${status === 'idle' ? 'border-neutral-200 dark:border-neutral-700 focus:border-indigo-400 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-white' : ''}
                ${status === 'correct' ? 'border-green-500 bg-green-50 dark:bg-green-950 text-green-600 dark:text-green-300' : ''}
                ${status === 'incorrect' ? 'border-red-500 bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-300' : ''}
              `}
              maxLength={4}
            />
            {status === 'correct' && (
              <div className="absolute -right-4 -top-4 md:-right-6 md:-top-6 w-10 h-10 md:w-12 md:h-12 bg-green-500 text-white rounded-full flex items-center justify-center shadow-lg animate-in zoom-in">
                <Check size={24} strokeWidth={4} />
              </div>
            )}
            {status === 'incorrect' && (
              <div className="absolute -right-4 -top-4 md:-right-6 md:-top-6 w-10 h-10 md:w-12 md:h-12 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg animate-in zoom-in">
                <X size={24} strokeWidth={4} />
              </div>
            )}
          </div>
        </div>

        {showHint && (
          <div className="bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-200 p-5 rounded-2xl mb-8 max-w-md mx-auto text-left flex gap-3 animate-in slide-in-from-top-4 border border-amber-200/60 dark:border-amber-800/60">
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
