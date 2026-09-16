interface AdminDashboardProps {
  t: (en: string, te: string) => string;
}

const students = [
  { name: 'Sai Kumar', level: 'Intermediate', progress: 85, status: 'on_track', chapters: '4 / 6', accuracy: '82%' },
  { name: 'Priya Reddy', level: 'Beginner', progress: 60, status: 'needs_help', chapters: '2 / 6', accuracy: '55%' },
  { name: 'Rahul V.', level: 'Advanced', progress: 92, status: 'on_track', chapters: '5 / 6', accuracy: '90%' }
];

export default function AdminDashboard({ t }: AdminDashboardProps) {
  return (
    <div className="animate-in fade-in duration-500 max-w-4xl mx-auto pt-4 md:pt-6">
      <div className="mb-10">
        <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-app-text mb-2">
          {t('Class Overview', 'తరగతి అవలోకనం')}
        </h1>
        <p className="text-gray-500 font-medium md:text-lg">
          {t('Student progress and performance.', 'విద్యార్థి పురోగతి మరియు పనితీరు.')}
        </p>
      </div>

      <div className="flex flex-col gap-8 mb-12">
        {/* Simple AI Insights row */}
        <div className="bg-app-accent/10 border border-app-accent/20 p-6 md:p-8 rounded-3xl">
          <h3 className="text-lg font-bold mb-3 flex items-center gap-2 text-app-accentHover">
            <span>✨</span> {t('AI Insights', 'AI అంతర్దృష్టులు')}
          </h3>
          <p className="text-base text-gray-700 leading-relaxed">
            {t('Most students are struggling with Addition Level 3. Consider dedicating the next session to revision of carry-over mechanics. Overall engagement is up 15% this week.', 'చాలా మంది విద్యార్థులు ఎడిషన్ లెవల్ 3తో ఇబ్బంది పడుతున్నారు. క్యారీ-ఓవర్ మెకానిక్స్ యొక్క రివిజన్‌కు తదుపరి సెషన్‌ను అంకితం చేయడం గురించి ఆలోచించండి. మొత్తం నిశ్చితార్థం ఈ వారం 15% పెరిగింది.')}
          </p>
        </div>

        {/* Weekly Stats List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-6 rounded-3xl border border-black/5 flex justify-between items-center">
             <span className="font-semibold text-gray-500">{t('Tasks Completed (Weekly)', 'పూర్తయిన పనులు (వారపు)')}</span>
             <span className="text-3xl font-bold text-app-text">342</span>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-black/5 flex justify-between items-center">
             <span className="font-semibold text-gray-500">{t('Average Accuracy', 'సగటు ఖచ్చితత్వం')}</span>
             <span className="text-3xl font-bold text-app-text">85%</span>
          </div>
        </div>
      </div>

      {/* Student List */}
      <div>
        <h3 className="text-2xl font-bold mb-6 text-app-text">{t('Student Progress', 'విద్యార్థి పురోగతి')}</h3>
        <div className="flex flex-col gap-4">
          {students.map((student, i) => (
            <div key={i} className="bg-white rounded-3xl p-6 border border-black/5 flex flex-col md:flex-row md:items-center justify-between gap-6">
              
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 min-w-[56px] rounded-full flex items-center justify-center font-bold text-xl
                  ${student.status === 'on_track' ? 'bg-app-lime/20 text-green-700' : 'bg-red-100 text-red-700'}
                `}>
                  {student.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-app-text text-xl mb-1">{student.name}</h4>
                  <div className="flex flex-wrap gap-2 items-center">
                    <span className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">{student.level}</span>
                    {student.status === 'needs_help' && (
                       <span className="text-sm font-medium text-red-600 bg-red-50 px-3 py-1 rounded-full">{t('Needs Help', 'సహాయం కావాలి')}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Stats stack for mobile, row for desktop */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 w-full md:w-auto">
                 <div className="flex flex-col">
                   <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1">{t('Progress', 'పురోగతి')}</span>
                   <span className="font-bold text-lg">{student.progress}%</span>
                 </div>
                 <div className="flex flex-col">
                   <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1">{t('Chapters', 'అధ్యాయాలు')}</span>
                   <span className="font-bold text-lg">{student.chapters}</span>
                 </div>
                 <div className="flex flex-col">
                   <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1">{t('Accuracy', 'ఖచ్చితత్వం')}</span>
                   <span className="font-bold text-lg">{student.accuracy}</span>
                 </div>
                 <div className="flex flex-col justify-end mt-2 md:mt-0 col-span-2 md:col-span-1">
                   <button className="text-sm font-semibold text-app-text bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full transition-colors w-full md:w-auto text-center">
                     {t('Details', 'వివరాలు')}
                   </button>
                 </div>
              </div>

            </div>
          ))}
        </div>
      </div>
        
    </div>
  );
}
