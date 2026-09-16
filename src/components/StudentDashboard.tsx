import { Play, Volume2, BookText, ArrowRight } from 'lucide-react';

interface StudentDashboardProps {
  t: (en: string, te: string) => string;
  onPractice: () => void;
}

export default function StudentDashboard({ t, onPractice }: StudentDashboardProps) {
  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex justify-between items-end mb-8 mt-2">
        <div>
          <h1 className="text-5xl font-semibold tracking-tight text-app-text mb-2">
            {t('Math Progress', 'గణిత పురోగతి')}
          </h1>
          <p className="text-gray-500 font-medium">
            {t('Keep learning and growing today!', 'ఈ రోజు నేర్చుకోవడం మరియు ఎదగడం కొనసాగించండి!')}
          </p>
        </div>
        <div className="flex items-center gap-4 text-sm font-medium text-gray-500">
          <span>{new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
          <button className="bg-white px-4 py-2 rounded-full shadow-sm border border-black/5 text-app-text flex items-center gap-2">
            {t('Today', 'ఈ రోజు')}
            <span className="text-xs">▼</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-8">
        {/* Questions Solved Card (Mimicking Energy Used) */}
        <div className="bg-white p-6 rounded-[32px] shadow-sm border border-black/5 col-span-1 flex flex-col relative overflow-hidden">
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div className="flex items-center gap-2 text-app-text font-semibold">
              <span className="text-xl">⚡</span>
              {t('Questions Solved', 'ప్రశ్నలు పరిష్కరించబడ్డాయి')}
            </div>
            <button className="text-gray-400">⋮</button>
          </div>
          
          <div className="mb-4 relative z-10">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold tracking-tighter">430</span>
              <span className="bg-app-lime px-2 py-1 rounded-full text-xs font-bold text-black">+15%</span>
            </div>
            <span className="text-sm text-gray-500 font-medium">{t('total today', 'నేడు మొత్తం')}</span>
          </div>

          <div className="relative h-48 mt-auto flex items-center justify-center">
            {/* Overlapping Circles */}
            <div className="absolute w-40 h-40 rounded-full bg-app-accent flex flex-col items-center justify-center -translate-x-12 translate-y-4 shadow-lg">
              <span className="text-3xl font-bold text-app-text">250</span>
              <span className="text-sm font-medium text-app-text/70">{t('Math', 'గణితం')}</span>
            </div>
            <div className="absolute w-32 h-32 rounded-full bg-app-darkCard flex flex-col items-center justify-center translate-x-12 -translate-y-4 shadow-lg z-10">
              <span className="text-2xl font-bold text-white">180</span>
              <span className="text-sm font-medium text-white/70">{t('Logic', 'తర్కం')}</span>
            </div>
            <div className="absolute w-20 h-20 rounded-full bg-app-lime flex flex-col items-center justify-center translate-x-4 translate-y-16 shadow-lg z-20">
              <span className="text-xl font-bold text-black">50</span>
            </div>
          </div>
        </div>

        <div className="col-span-2 grid grid-rows-2 gap-6">
          <div className="grid grid-cols-2 gap-6">
            {/* Accuracy Card */}
            <div className="bg-white p-6 rounded-[32px] shadow-sm border border-black/5 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2 font-semibold">
                  <span>🎯</span> {t('Accuracy', 'ఖచ్చితత్వం')}
                </div>
                <button className="text-gray-400">⋮</button>
              </div>
              <div className="flex items-end justify-between mt-4">
                <span className="text-5xl font-bold tracking-tighter">92<span className="text-2xl text-gray-400">%</span></span>
                <div className="text-right">
                  <div className="text-sm font-bold text-app-text">Avg</div>
                  <div className="text-sm text-gray-500">85%</div>
                </div>
              </div>
            </div>

            {/* Time Spent Card */}
            <div className="bg-white p-6 rounded-[32px] shadow-sm border border-black/5 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2 font-semibold">
                  <span>⏱️</span> {t('Time Spent', 'వెచ్చించిన సమయం')}
                </div>
                <button className="text-gray-400">⋮</button>
              </div>
              <div className="flex items-end justify-between mt-4">
                <span className="text-5xl font-bold tracking-tighter">45<span className="text-2xl text-gray-400">m</span></span>
                <div className="text-right">
                  <div className="text-sm font-bold text-app-text">Active</div>
                  <div className="text-sm text-gray-500">60 Min</div>
                </div>
              </div>
            </div>
          </div>

          {/* Chapters Progress Card */}
          <div className="bg-app-darkCard text-white p-6 rounded-[32px] shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2 font-semibold">
                <span>📚</span> {t('Chapter Progress', 'అధ్యాయం పురోగతి')}
              </div>
              <button className="bg-white/10 px-3 py-1 rounded-full text-sm flex items-center gap-1 hover:bg-white/20 transition-colors">
                {t('Weekly', 'వారానికొకసారి')} <span className="text-xs">▼</span>
              </button>
            </div>
            
            <div className="flex items-end gap-8 mt-4">
              <div>
                <div className="text-4xl font-bold text-app-lime mb-1">85%</div>
                <div className="text-sm text-white/60">{t('Addition', 'కూడిక')}</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-app-accent mb-1">3 <span className="text-xl">Ch</span></div>
                <div className="text-sm text-white/60">{t('Completed', 'పూర్తయింది')}</div>
              </div>
            </div>
            
            <div className="w-full h-2 bg-white/10 rounded-full mt-6 overflow-hidden">
              <div className="w-[85%] h-full bg-app-lime rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-6">{t('Choose Your Level', 'మీ స్థాయిని ఎంచుకోండి')}</h2>
      
      <div className="grid grid-cols-3 gap-6">
        {/* Beginner */}
        <div 
          onClick={onPractice}
          className="bg-white p-6 rounded-[32px] shadow-sm border border-black/5 hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer group"
        >
          <div className="w-12 h-12 rounded-2xl bg-app-accent/20 flex items-center justify-center text-app-accent mb-4 group-hover:scale-110 transition-transform">
            <Volume2 size={24} />
          </div>
          <h3 className="text-xl font-bold mb-2">{t('Beginner', 'ప్రారంభకులకు')}</h3>
          <p className="text-gray-500 text-sm mb-6 line-clamp-2">
            {t('Basic numbers with voice explanations and simple visuals.', 'వాయిస్ వివరణలు మరియు సాధారణ విజువల్స్ తో ప్రాథమిక సంఖ్యలు.')}
          </p>
          <div className="flex items-center text-app-text font-semibold text-sm">
            {t('Start Learning', 'నేర్చుకోవడం ప్రారంభించండి')}
            <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Intermediate */}
        <div 
          onClick={onPractice}
          className="bg-white p-6 rounded-[32px] shadow-sm border border-black/5 hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer group"
        >
          <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-500 mb-4 group-hover:scale-110 transition-transform">
            <Play size={24} />
          </div>
          <h3 className="text-xl font-bold mb-2">{t('Intermediate', 'మధ్యస్థం')}</h3>
          <p className="text-gray-500 text-sm mb-6 line-clamp-2">
            {t('Text-based learning with voice option for difficult topics.', 'కష్టమైన అంశాల కోసం వాయిస్ ఎంపికతో టెక్స్ట్ ఆధారిత అభ్యాసం.')}
          </p>
          <div className="flex items-center text-app-text font-semibold text-sm">
            {t('Start Learning', 'నేర్చుకోవడం ప్రారంభించండి')}
            <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Advanced */}
        <div 
          onClick={onPractice}
          className="bg-white p-6 rounded-[32px] shadow-sm border border-black/5 hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer group"
        >
          <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-500 mb-4 group-hover:scale-110 transition-transform">
            <BookText size={24} />
          </div>
          <h3 className="text-xl font-bold mb-2">{t('Advanced', 'అధునాతన')}</h3>
          <p className="text-gray-500 text-sm mb-6 line-clamp-2">
            {t('Complex word problems, text-based learning only.', 'సంక్లిష్టమైన పద సమస్యలు, టెక్స్ట్ ఆధారిత అభ్యాసం మాత్రమే.')}
          </p>
          <div className="flex items-center text-app-text font-semibold text-sm">
            {t('Start Learning', 'నేర్చుకోవడం ప్రారంభించండి')}
            <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
}
