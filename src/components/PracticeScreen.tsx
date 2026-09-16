import { useState } from 'react';
import { ArrowLeft, Check, X, HelpCircle, Volume2, ArrowRight } from 'lucide-react';

interface PracticeScreenProps {
  t: (en: string, te: string) => string;
  onBack: () => void;
}

export default function PracticeScreen({ t, onBack }: PracticeScreenProps) {
  const [answer, setAnswer] = useState('');
  const [status, setStatus] = useState<'idle' | 'correct' | 'incorrect'>('idle');
  const [showHint, setShowHint] = useState(false);

  const checkAnswer = () => {
    if (!answer) return;
    if (answer.trim() === '7') {
      setStatus('correct');
    } else {
      setStatus('incorrect');
    }
  };

  return (
    <div className="animate-in fade-in duration-300 max-w-4xl mx-auto pt-6">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-gray-500 hover:text-black transition-colors font-medium mb-8"
      >
        <ArrowLeft size={20} />
        {t('Back to Dashboard', 'డాష్‌బోర్డ్‌కు తిరిగి వెళ్లండి')}
      </button>

      {/* Breadcrumbs / Flow Indicator */}
      <div className="flex items-center gap-4 mb-10 text-sm font-semibold text-gray-400">
        <span className="text-app-text">{t('Chapter Explanation', 'అధ్యాయం వివరణ')}</span>
        <ArrowRight size={16} />
        <span className="text-app-text">{t('Revision', 'పునర్విమర్శ')}</span>
        <ArrowRight size={16} />
        <span className="text-app-text">{t('Examples', 'ఉదాహరణలు')}</span>
        <ArrowRight size={16} />
        <span className="bg-app-text text-white px-3 py-1 rounded-full shadow-sm">{t('Practice Test', 'ప్రాక్టీస్ టెస్ట్')}</span>
      </div>

      <div className="bg-white rounded-[40px] p-12 shadow-sm border border-black/5 text-center relative overflow-hidden">
        
        <div className="absolute top-8 right-8">
           <button 
             onClick={() => setShowHint(!showHint)}
             className="w-12 h-12 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-gray-200 transition-colors"
           >
             <HelpCircle size={24} />
           </button>
        </div>

        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full font-semibold text-sm mb-8">
          <Volume2 size={18} />
          {t('Addition - Level 1', 'కూడిక - స్థాయి 1')}
        </div>

        <div className="text-7xl font-bold tracking-tighter mb-16 flex items-center justify-center gap-6">
          <span>5</span>
          <span className="text-gray-300">+</span>
          <span>2</span>
          <span className="text-gray-300">=</span>
          <div className="relative">
            <input 
              type="text"
              value={answer}
              onChange={(e) => {
                setAnswer(e.target.value);
                setStatus('idle');
              }}
              className={`w-32 h-24 text-center rounded-2xl border-4 outline-none transition-all text-5xl font-bold
                ${status === 'idle' ? 'border-gray-200 focus:border-app-accent bg-gray-50' : ''}
                ${status === 'correct' ? 'border-green-500 bg-green-50 text-green-600' : ''}
                ${status === 'incorrect' ? 'border-red-500 bg-red-50 text-red-600' : ''}
              `}
              maxLength={2}
            />
            {status === 'correct' && (
              <div className="absolute -right-6 -top-6 w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center shadow-lg animate-in zoom-in">
                <Check size={28} strokeWidth={4} />
              </div>
            )}
            {status === 'incorrect' && (
              <div className="absolute -right-6 -top-6 w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg animate-in zoom-in">
                <X size={28} strokeWidth={4} />
              </div>
            )}
          </div>
        </div>

        {showHint && (
          <div className="bg-orange-50 text-orange-800 p-6 rounded-2xl mb-10 max-w-md mx-auto text-left flex gap-4 animate-in slide-in-from-top-4">
            <div className="text-2xl">💡</div>
            <div>
              <p className="font-semibold mb-1">{t('Hint', 'సూచన')}</p>
              <p className="opacity-90">{t('Count forward from 5... six, seven!', '5 నుండి ముందుకు లెక్కించండి... ఆరు, ఏడు!')}</p>
            </div>
          </div>
        )}

        <button 
          onClick={checkAnswer}
          className="bg-app-text text-white text-xl font-bold py-5 px-16 rounded-full hover:bg-black transition-transform hover:scale-105 active:scale-95 shadow-xl"
        >
          {t('Check Answer', 'సమాధానం తనిఖీ చేయండి')}
        </button>

      </div>
    </div>
  );
}
