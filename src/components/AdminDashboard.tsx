import { PieChart, Pie, Cell, BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface AdminDashboardProps {
  t: (en: string, te: string) => string;
}

const pieData = [
  { name: 'Correct', value: 75, color: '#D4F670' },
  { name: 'Incorrect', value: 25, color: '#2A2A2A' }
];

const barData = [
  { name: 'Mon', completion: 45 },
  { name: 'Tue', completion: 60 },
  { name: 'Wed', completion: 55 },
  { name: 'Thu', completion: 80 },
  { name: 'Fri', completion: 70 }
];

export default function AdminDashboard({ t }: AdminDashboardProps) {
  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex justify-between items-end mb-8 mt-2">
        <div>
          <h1 className="text-5xl font-semibold tracking-tight text-app-text mb-2">
            {t('Class Overview', 'తరగతి అవలోకనం')}
          </h1>
          <p className="text-gray-500 font-medium">
            {t('Monitor student progress and performance.', 'విద్యార్థి పురోగతి మరియు పనితీరును పర్యవేక్షించండి.')}
          </p>
        </div>
        <div className="flex items-center gap-4 text-sm font-medium text-gray-500">
          <span>{new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
          <button className="bg-white px-4 py-2 rounded-full shadow-sm border border-black/5 text-app-text flex items-center gap-2">
            {t('This Week', 'ఈ వారం')}
            <span className="text-xs">▼</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-8">
        
        {/* Answer Distribution (Pie Chart mimicking Energy Used circles) */}
        <div className="bg-white p-6 rounded-[32px] shadow-sm border border-black/5 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-2 font-semibold">
              <span>🎯</span> {t('Answers Distribution', 'సమాధానాల పంపిణీ')}
            </div>
            <button className="text-gray-400">⋮</button>
          </div>
          <div className="flex-1 flex flex-col justify-center relative">
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-3xl font-bold">75%</span>
              <span className="text-sm text-gray-500">{t('Accuracy', 'ఖచ్చితత్వం')}</span>
            </div>
          </div>
        </div>

        {/* Weekly Completion (Dark Card mimicking Sleep Analysis) */}
        <div className="bg-app-darkCard text-white p-6 rounded-[32px] shadow-sm flex flex-col col-span-2">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-2 font-semibold">
              <span>📊</span> {t('Task Completion', 'పని పూర్తయింది')}
            </div>
            <button className="bg-white/10 px-4 py-2 rounded-full text-sm flex items-center gap-2 hover:bg-white/20 transition-colors">
              {t('Chapters', 'అధ్యాయాలు')} <span className="text-xs">▼</span>
            </button>
          </div>
          
          <div className="flex items-end gap-12 mb-6 px-4">
            <div>
              <div className="text-4xl font-bold text-app-lime">342</div>
              <div className="text-sm text-white/60">{t('Tasks Completed', 'పూర్తయిన పనులు')}</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-app-accent">85%</div>
              <div className="text-sm text-white/60">{t('Avg Score', 'సగటు స్కోర్')}</div>
            </div>
          </div>

          <div className="flex-1 h-[150px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 12 }} dy={10} />
                <Tooltip cursor={{ fill: 'rgba(255,255,255,0.1)' }} contentStyle={{ borderRadius: '12px', border: 'none', backgroundColor: '#1A1A1A' }} />
                <Bar dataKey="completion" fill="#C3B8FF" radius={[4, 4, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* AI Summary and Student List */}
      <div className="grid grid-cols-3 gap-6">
        
        {/* AI Summary */}
        <div className="bg-app-accent/10 border-2 border-app-accent/20 p-6 rounded-[32px] flex flex-col">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-app-accentHover">
            <span>✨</span> {t('AI Insights', 'AI అంతర్దృష్టులు')}
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed font-medium">
            {t('Most students are struggling with Addition Level 3. Consider dedicating the next session to revision of carry-over mechanics. Overall engagement is up 15% this week.', 'చాలా మంది విద్యార్థులు ఎడిషన్ లెవల్ 3తో ఇబ్బంది పడుతున్నారు. క్యారీ-ఓవర్ మెకానిక్స్ యొక్క రివిజన్‌కు తదుపరి సెషన్‌ను అంకితం చేయడం గురించి ఆలోచించండి. మొత్తం నిశ్చితార్థం ఈ వారం 15% పెరిగింది.')}
          </p>
        </div>

        {/* Student List */}
        <div className="col-span-2 bg-white rounded-[32px] p-6 shadow-sm border border-black/5">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">{t('Student Progress', 'విద్యార్థి పురోగతి')}</h3>
            <button className="text-app-text font-semibold text-sm hover:underline">{t('View All', 'అన్నీ చూడండి')}</button>
          </div>
          
          <div className="flex flex-col gap-4">
            {[
              { name: 'Sai Kumar', level: 'Intermediate', progress: 85 },
              { name: 'Priya Reddy', level: 'Beginner', progress: 60 },
              { name: 'Rahul V.', level: 'Advanced', progress: 92 }
            ].map((student, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-500">
                    {student.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-app-text">{student.name}</h4>
                    <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-md">{student.level}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 w-1/3">
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-app-lime rounded-full" 
                      style={{ width: `${student.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-bold w-8">{student.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </div>
  );
}
