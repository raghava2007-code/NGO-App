import { CheckCircle2 } from 'lucide-react';
import { useEffect, useState } from 'react';

interface StudentProgressProps {
  t: (en: string, te: string) => string;
}

export default function StudentProgress({ t }: StudentProgressProps) {
  const [offset, setOffset] = useState(251.2);

  useEffect(() => {
    // Trigger the animation shortly after mount
    const timer = setTimeout(() => {
      setOffset(70.3); // 251.2 * (1 - 0.72) = 70.336
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="animate-in fade-in duration-500 max-w-3xl mx-auto pt-4 md:pt-6">
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-neutral-900 dark:text-white mb-2">
          {t('Your Progress', 'మీ పురోగతి')}
        </h1>
        <p className="text-neutral-500 dark:text-neutral-400 font-medium md:text-lg">
          {t('See how far you have come!', 'మీరు ఎంత దూరం వచ్చారో చూడండి!')}
        </p>
      </div>

      {/* Overall Completion - Circular Indicator */}
      <div className="flex justify-center mb-16">
        <div className="relative flex items-center justify-center w-64 h-64 md:w-80 md:h-80">
          {/* SVG Circle */}
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {/* Background Track */}
            <circle 
              cx="50" cy="50" r="40" 
              fill="transparent" 
              stroke="currentColor" 
              strokeWidth="8" 
              className="text-neutral-200 dark:text-neutral-700"
            />
            {/* Progress Arc */}
            <circle 
              cx="50" cy="50" r="40" 
              fill="transparent" 
              stroke="currentColor" 
              strokeWidth="8" 
              strokeDasharray="251.2" 
              strokeDashoffset={offset}
              className="text-app-lime drop-shadow-md transition-all duration-[1500ms] ease-out"
              strokeLinecap="round"
            />
          </svg>
          
          <div className="absolute flex flex-col items-center justify-center text-center">
            <span className="text-6xl md:text-7xl font-bold tracking-tighter text-neutral-900 dark:text-white">72%</span>
            <span className="text-sm md:text-base font-medium text-neutral-400 dark:text-neutral-500 mt-2">
              {t('Progress', 'పురోగతి')}
            </span>
          </div>
        </div>
      </div>

      {/* Recently Completed Chapters */}
      <div>
        <h3 className="text-xl md:text-2xl font-semibold mb-6 text-neutral-900 dark:text-white text-center md:text-left">
          {t('Recently Completed', 'ఇటీవల పూర్తయింది')}
        </h3>
        <div className="flex flex-col gap-3 md:gap-4">
          {[
            { title: 'Chapter 2: Basic Addition', te: 'అధ్యాయం 2: ప్రాథమిక కూడిక', date: 'Oct 14' },
            { title: 'Chapter 1: Counting to 10', te: 'అధ్యాయం 1: 10 వరకు లెక్కించడం', date: 'Oct 12' },
          ].map((chapter, i) => (
            <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-5 md:p-6 bg-white dark:bg-neutral-800 rounded-3xl border border-black/5 dark:border-white/5 shadow-sm gap-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 min-w-[40px] rounded-full bg-green-50 dark:bg-green-950/50 text-green-600 dark:text-green-400 flex items-center justify-center">
                  <CheckCircle2 size={24} />
                </div>
                <span className="font-semibold text-neutral-900 dark:text-white text-lg">{t(chapter.title, chapter.te)}</span>
              </div>
              <span className="text-sm font-medium text-neutral-400 dark:text-neutral-500 sm:text-right ml-14 sm:ml-0">{chapter.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
