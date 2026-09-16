import { useState } from 'react';
import { ArrowLeft, Check, X, HelpCircle, Volume2 } from 'lucide-react';

interface PracticeScreenProps {
  t: (en: string, te: string) => string;
  onBack: () => void;
}

export default function PracticeScreen({ t, onBack }: PracticeScreenProps) {
  const [answer, setAnswer] = useState('');
  const [status, setStatus] = useState<'idle' | 'correct' | 'incorrect'>('idle');
  const [showHint, setShowHint] = useState(false);

  const handleAction = () => {
    if (status === 'idle') {
      if (!answer) return;
      if (answer.trim() === '7') {
        setStatus('correct');
      } else {
        setStatus('incorrect');
      }
    } else {
      // Move to next question
      setAnswer('');
      setStatus('idle');
      setShowHint(false);
    }
  };

  return (
    <div className="animate-in fade-in duration-300 max-w-3xl mx-auto pt-6">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-gray-500 hover:text-black transition-colors font-medium mb-8"
      >
        <ArrowLeft size={20} />
        {t('Back to Home', 'హోమ్‌కి తిరిగి వెళ్లండి')}
      </button>

      <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-sm border border-black/5 text-center relative overflow-hidden">
        
        <div className="absolute top-6 right-6 md:top-8 md:right-8">
           <button 
             onClick={() => setShowHint(!showHint)}
             className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-gray-200 transition-colors"
           >
             <HelpCircle size={20} />
           </button>
        </div>

        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full font-semibold text-sm mb-12 mt-4 md:mt-0">
          <Volume2 size={18} />
          {t('Addition - Level 1', 'కూడిక - స్థాయి 1')}
        </div>

        <div className="text-5xl md:text-7xl font-bold tracking-tighter mb-16 flex items-center justify-center gap-4 md:gap-6">
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
                if(status !== 'idle') setStatus('idle');
              }}
              disabled={status !== 'idle'}
              className={`w-24 h-20 md:w-32 md:h-24 text-center rounded-2xl border-4 outline-none transition-all text-4xl md:text-5xl font-bold
                ${status === 'idle' ? 'border-gray-200 focus:border-app-accent bg-gray-50' : ''}
                ${status === 'correct' ? 'border-green-500 bg-green-50 text-green-600' : ''}
                ${status === 'incorrect' ? 'border-red-500 bg-red-50 text-red-600' : ''}
              `}
              maxLength={2}
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
          <div className="bg-orange-50 text-orange-800 p-6 rounded-2xl mb-10 max-w-md mx-auto text-left flex gap-4 animate-in slide-in-from-top-4">
            <div className="text-2xl">💡</div>
            <div>
              <p className="font-semibold mb-1">{t('Hint', 'సూచన')}</p>
              <p className="opacity-90">{t('Count forward from 5... six, seven!', '5 నుండి ముందుకు లెక్కించండి... ఆరు, ఏడు!')}</p>
            </div>
          </div>
        )}

        <button 
          onClick={handleAction}
          className={`text-white text-lg md:text-xl font-bold py-4 px-12 md:py-5 md:px-16 rounded-full transition-all shadow-lg active:scale-95 ${
            status === 'idle' ? 'bg-app-text hover:bg-black hover:-translate-y-1' : 'bg-app-lime text-black hover:bg-[#bce451] hover:-translate-y-1'
          }`}
        >
          {status === 'idle' ? t('Check Answer', 'సమాధానం తనిఖీ చేయండి') : t('Next Question', 'తదుపరి ప్రశ్న')}
        </button>

      </div>
    </div>
  );
}
