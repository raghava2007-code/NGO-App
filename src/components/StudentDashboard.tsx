import { CheckCircle2 } from 'lucide-react';

interface StudentDashboardProps {
  t: (en: string, te: string) => string;
  onPractice: () => void;
}

export default function StudentDashboard({ t, onPractice }: StudentDashboardProps) {
  return (
    <div className="animate-in fade-in duration-500 max-w-5xl mx-auto pt-4 md:pt-6">
      <div className="mb-10">
        <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-app-text mb-2">
          {t('Hello, Sai Kumar!', 'నమస్కారం, సాయి కుమార్!')}
        </h1>
        <p className="text-gray-500 font-medium md:text-lg">
          {t('What would you like to learn today?', 'ఈ రోజు మీరు ఏమి నేర్చుకోవాలనుకుంటున్నారు?')}
        </p>
      </div>

      {/* Hero "Continue Learning" Action */}
      <div className="bg-app-darkCard text-white p-8 md:p-10 rounded-[32px] md:rounded-[40px] shadow-lg mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 relative overflow-hidden">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full font-semibold text-sm mb-6 text-app-lime">
            <span>📚</span> {t('Current Task', 'ప్రస్తుత విధి')}
          </div>
          <h2 className="text-2xl md:text-4xl font-bold mb-3">{t('Addition - Chapter 2', 'కూడిక - అధ్యాయం 2')}</h2>
          <p className="text-white/70 font-medium mb-8 max-w-md">
            {t('You are learning how to add numbers up to 20. Ready to continue?', 'మీరు 20 వరకు సంఖ్యలను ఎలా కూడాలో నేర్చుకుంటున్నారు. కొనసాగించడానికి సిద్ధంగా ఉన్నారా?')}
          </p>
          <button 
            onClick={onPractice}
            className="bg-app-lime text-black font-bold text-lg px-8 py-4 rounded-full hover:bg-[#bce451] transition-transform hover:-translate-y-1 active:translate-y-0"
          >
            {t('Continue Learning', 'నేర్చుకోవడం కొనసాగించండి')}
          </button>
        </div>
        
        {/* Simple Progress Ring inside the dark card */}
        <div className="relative z-10 hidden md:flex items-center justify-center w-40 h-40 rounded-full border-8 border-white/10">
          <div className="absolute inset-0 rounded-full border-8 border-app-lime border-t-transparent -rotate-45"></div>
          <div className="text-center">
            <span className="block text-3xl font-bold">40%</span>
            <span className="text-sm font-medium text-white/60">{t('Done', 'పూర్తయింది')}</span>
          </div>
        </div>

        {/* Decorative background circle */}
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      <h3 className="text-xl md:text-2xl font-semibold mb-6 text-app-text">{t('Explore Levels', 'స్థాయిలను అన్వేషించండి')}</h3>
      
      <div className="flex flex-wrap items-center gap-6 md:gap-10 mb-12">
        {/* Beginner */}
        <button onClick={onPractice} className="flex items-center gap-3 group text-app-text hover:opacity-70 transition-opacity">
          <div className="w-5 h-5 rounded-full border-2 border-app-accent flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-app-accent"></div>
          </div>
          <span className="font-semibold text-lg">{t('Beginner', 'ప్రారంభకులకు')}</span>
        </button>

        {/* Intermediate */}
        <button onClick={onPractice} className="flex items-center gap-3 group text-gray-400 hover:text-app-text transition-colors">
          <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center group-hover:border-gray-400 transition-colors">
          </div>
          <span className="font-semibold text-lg">{t('Intermediate', 'మధ్యస్థం')}</span>
        </button>

        {/* Advanced */}
        <button onClick={onPractice} className="flex items-center gap-3 group text-gray-400 hover:text-app-text transition-colors">
          <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center group-hover:border-gray-400 transition-colors">
          </div>
          <span className="font-semibold text-lg">{t('Advanced', 'అధునాతన')}</span>
        </button>
      </div>

      {/* Simple Recent Achievements Row */}
      <h3 className="text-xl md:text-2xl font-semibold mb-6 text-app-text">{t('Recent Badges', 'ఇటీవలి బ్యాడ్జ్‌లు')}</h3>
      <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
        <div className="flex items-center gap-3 bg-white pr-6 pl-4 py-3 rounded-full border border-black/5 shadow-sm whitespace-nowrap">
          <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
            <CheckCircle2 size={18} />
          </div>
          <span className="font-semibold text-sm">{t('Perfect Score: Numbers', 'పర్ఫెక్ట్ స్కోర్: సంఖ్యలు')}</span>
        </div>
        <div className="flex items-center gap-3 bg-white pr-6 pl-4 py-3 rounded-full border border-black/5 shadow-sm whitespace-nowrap">
          <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-lg">
             🔥
          </div>
          <span className="font-semibold text-sm">{t('3 Day Streak', '3 రోజుల పరంపర')}</span>
        </div>
      </div>

    </div>
  );
}
