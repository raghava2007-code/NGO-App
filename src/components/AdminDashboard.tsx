import { useState } from 'react';
import { Sparkles, Calendar, CheckCircle2, XCircle, AlertTriangle, Plus, ChevronRight, X, BarChart3, Users, BookOpen, ClipboardList, Trash2 } from 'lucide-react';
import { AssignedTask, StudentLevel } from '../types';

interface AdminDashboardProps {
  t: (en: string, te: string) => string;
  tasks: AssignedTask[];
  onAssignTask: (task: Omit<AssignedTask, 'id' | 'assignedDate' | 'status'>) => void;
  onDeleteTask?: (taskId: string) => void;
  teacherName: string;
}

interface StudentRecord {
  id: string;
  name: string;
  level: StudentLevel;
  progress: number;
  status: 'on_track' | 'needs_help' | 'excelling';
  chapters: string;
  accuracy: string;
  lastActive: string;
  correctCount: number;
  incorrectCount: number;
  recentAnswers: {
    question: string;
    studentAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
    timestamp: string;
  }[];
}

const initialStudents: StudentRecord[] = [
  {
    id: '1',
    name: 'Sai Kumar',
    level: 'Intermediate',
    progress: 85,
    status: 'on_track',
    chapters: '4 / 6',
    accuracy: '82%',
    lastActive: 'Today, 10:30 AM',
    correctCount: 28,
    incorrectCount: 6,
    recentAnswers: [
      { question: '6 × 7', studentAnswer: '42', correctAnswer: '42', isCorrect: true, timestamp: '10:28 AM' },
      { question: '48 ÷ 6', studentAnswer: '8', correctAnswer: '8', isCorrect: true, timestamp: '10:25 AM' },
      { question: '15 × 4', studentAnswer: '55', correctAnswer: '60', isCorrect: false, timestamp: '10:20 AM' },
      { question: '7 × 8', studentAnswer: '56', correctAnswer: '56', isCorrect: true, timestamp: '10:15 AM' },
    ],
  },
  {
    id: '2',
    name: 'Priya Reddy',
    level: 'Beginner',
    progress: 60,
    status: 'needs_help',
    chapters: '2 / 6',
    accuracy: '55%',
    lastActive: 'Yesterday, 4:15 PM',
    correctCount: 16,
    incorrectCount: 13,
    recentAnswers: [
      { question: '5 + 2', studentAnswer: '7', correctAnswer: '7', isCorrect: true, timestamp: '4:10 PM' },
      { question: '9 + 4', studentAnswer: '12', correctAnswer: '13', isCorrect: false, timestamp: '4:05 PM' },
      { question: '12 - 5', studentAnswer: '6', correctAnswer: '7', isCorrect: false, timestamp: '3:55 PM' },
      { question: '8 + 3', studentAnswer: '11', correctAnswer: '11', isCorrect: true, timestamp: '3:50 PM' },
    ],
  },
  {
    id: '3',
    name: 'Rahul V.',
    level: 'Advanced',
    progress: 92,
    status: 'excelling',
    chapters: '5 / 6',
    accuracy: '94%',
    lastActive: 'Today, 11:45 AM',
    correctCount: 45,
    incorrectCount: 3,
    recentAnswers: [
      { question: '3x = 21', studentAnswer: '7', correctAnswer: '7', isCorrect: true, timestamp: '11:40 AM' },
      { question: '2x + 4 = 16', studentAnswer: '6', correctAnswer: '6', isCorrect: true, timestamp: '11:35 AM' },
      { question: '8² - 14', studentAnswer: '50', correctAnswer: '50', isCorrect: true, timestamp: '11:30 AM' },
    ],
  },
  {
    id: '4',
    name: 'Ananya Sharma',
    level: 'Intermediate',
    progress: 78,
    status: 'on_track',
    chapters: '3 / 6',
    accuracy: '79%',
    lastActive: 'May 18, 2026',
    correctCount: 22,
    incorrectCount: 6,
    recentAnswers: [
      { question: '9 × 3', studentAnswer: '27', correctAnswer: '27', isCorrect: true, timestamp: '2:15 PM' },
      { question: '36 ÷ 4', studentAnswer: '8', correctAnswer: '9', isCorrect: false, timestamp: '2:10 PM' },
    ],
  },
];

const chapterDifficulties = [
  { chapter: 'Ch 1: Number Bonds & Basic Facts', subtopic: 'Making 10s', difficulty: 'Low', passRate: '94%' },
  { chapter: 'Ch 2: Addition & Subtraction (Up to 20)', subtopic: 'Carry-over mechanics', difficulty: 'High', passRate: '62%' },
  { chapter: 'Ch 3: Multiplication & Arrays', subtopic: 'Multiplication Tables 6–9', difficulty: 'Medium', passRate: '75%' },
  { chapter: 'Ch 4: Division & Equal Sharing', subtopic: 'Remainders & Long Division', difficulty: 'High', passRate: '58%' },
  { chapter: 'Ch 5: Fractions & Decimals', subtopic: 'Unlike Denominators', difficulty: 'Medium', passRate: '71%' },
];

export default function AdminDashboard({
  t,
  tasks,
  onAssignTask,
  onDeleteTask,
  teacherName,
}: AdminDashboardProps) {
  const [students] = useState<StudentRecord[]>(initialStudents);
  const [selectedStudent, setSelectedStudent] = useState<StudentRecord | null>(null);
  const [dateRange, setDateRange] = useState<'today' | 'week' | 'month'>('week');
  const [activeTab, setActiveTab] = useState<'overview' | 'students' | 'difficulties' | 'tasks'>('overview');
  
  // Quick Task Assignment State
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [targetLevel, setTargetLevel] = useState<'All' | StudentLevel>('All');
  const [assignedSuccess, setAssignedSuccess] = useState('');

  const handleAssignSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;

    onAssignTask({
      title: taskTitle.trim(),
      description: taskDescription.trim() || t('Complete the designated practice drills and review chapter notes.', 'నిర్దేశిత సాధన ప్రశ్నలను పూర్తి చేసి నోట్స్ సమీక్షించండి.'),
      targetLevel: targetLevel,
      assignedBy: teacherName || 'Teacher',
      dueDate: t('Tomorrow, 5:00 PM', 'రేపు సాయంత్రం 5:00'),
    });

    setAssignedSuccess(t(`Task "${taskTitle.trim()}" successfully assigned to ${targetLevel} students!`, `టాస్క్ "${taskTitle.trim()}" విజయవంతంగా అసైన్ చేయబడింది!`));
    setTaskTitle('');
    setTaskDescription('');

    setTimeout(() => {
      setAssignedSuccess('');
      setIsAssignModalOpen(false);
    }, 1800);
  };

  return (
    <div className="animate-in fade-in duration-500 max-w-5xl mx-auto pt-2 md:pt-4 space-y-8">
      
      {/* Header with Date Filter & Quick Assign */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white mb-1">
            {t('Teacher Monitoring Portal', 'ఉపాధ్యాయుల పర్యవేక్షణ పోర్టల్')}
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400 font-medium text-sm md:text-base">
            {t('Real-time classroom monitoring, difficulty tracking, and student analytics.', 'రియల్-టైమ్ తరగతి గది పర్యవేక్షణ, కష్టతర అంశాలు మరియు విద్యార్థి విశ్లేషణలు.')}
          </p>
        </div>

        {/* Date Filter & Quick Assign Button */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-1 shadow-xs">
            <Calendar size={16} className="text-neutral-400 dark:text-neutral-500 ml-2 mr-1" />
            <button
              onClick={() => setDateRange('today')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                dateRange === 'today' ? 'bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 shadow-xs' : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              {t('Today', 'ఈరోజు')}
            </button>
            <button
              onClick={() => setDateRange('week')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                dateRange === 'week' ? 'bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 shadow-xs' : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              {t('7 Days', '7 రోజులు')}
            </button>
            <button
              onClick={() => setDateRange('month')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                dateRange === 'month' ? 'bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 shadow-xs' : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              {t('Month', 'నెల')}
            </button>
          </div>

          <button
            onClick={() => setIsAssignModalOpen(true)}
            className="bg-[#D4F670] hover:bg-[#bce451] text-black font-bold px-4 py-2.5 rounded-2xl text-xs md:text-sm flex items-center gap-1.5 shadow-sm transition-transform active:scale-95 cursor-pointer"
          >
            <Plus size={16} />
            {t('Assign Task', 'టాస్క్ అసైన్ చేయండి')}
          </button>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-neutral-200 dark:border-neutral-800 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'overview' ? 'bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900' : 'text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
          }`}
        >
          <BarChart3 size={16} />
          {t('Overview & AI Insights', 'అవలోకనం & AI అంతర్దృష్టులు')}
        </button>
        <button
          onClick={() => setActiveTab('students')}
          className={`px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'students' ? 'bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900' : 'text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
          }`}
        >
          <Users size={16} />
          {t('Students & Answers', 'విద్యార్థులు & సమాధానాలు')}
        </button>
        <button
          onClick={() => setActiveTab('difficulties')}
          className={`px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'difficulties' ? 'bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900' : 'text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
          }`}
        >
          <BookOpen size={16} />
          {t('Chapter & Topic Difficulties', 'అధ్యాయం & అంశాల కష్టం')}
        </button>
        <button
          onClick={() => setActiveTab('tasks')}
          className={`px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'tasks' ? 'bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900' : 'text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
          }`}
        >
          <ClipboardList size={16} />
          {t('Assigned Tasks', 'కేటాయించిన పనులు')}
          <span className="ml-1 text-xs px-2 py-0.5 rounded-full bg-neutral-200 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 font-bold">
            {tasks.length}
          </span>
        </button>
      </div>

      {/* TAB 1: OVERVIEW & AI INSIGHTS */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* AI-Based Summary Card */}
          <div className="bg-gradient-to-r from-emerald-950 to-gray-900 text-white p-6 md:p-8 rounded-[32px] shadow-lg border border-emerald-500/20 relative overflow-hidden">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 px-3.5 py-1 rounded-full text-xs font-bold mb-3 border border-emerald-500/30">
                <Sparkles size={14} />
                {t('AI Learning Summary & Recommendations', 'AI అభ్యాస సారాంశం & సిఫార్సులు')}
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-2 text-white">
                {t('Class Performance Synthesis', 'తరగతి పనితీరు సంశ్లేషణ')}
              </h3>
              <p className="text-white/80 text-sm md:text-base leading-relaxed max-w-3xl mb-4">
                {t(
                  'Most students show strong retention in single-digit multiplication arrays (78% accuracy). However, Carry-over mechanics in Addition Level 3 and Long Division remain recurring stumbling blocks, causing 42% of recent incorrect responses. Recommended Action: Assign a 10-minute visual regrouping practice drill before tomorrow’s lesson.',
                  'చాలా మంది విద్యార్థులు గుణకారంలో మంచి అవగాహన చూపుతున్నారు (78% ఖచ్చితత్వం). అయితే క్యారీ-ఓవర్ మెకానిక్స్ మరియు దీర్ఘ భాగహారం ఇంకా కష్టంగా ఉన్నాయి. సిఫార్సు: రేపటి తరగతికి ముందు 10 నిమిషాల రీగ్రూపింగ్ సాధన టాస్క్ ఇవ్వండి.'
                )}
              </p>
              <div className="flex items-center gap-4 text-xs text-white/60 font-medium">
                <span>{t('Data filtered by: ', 'డేటా ఫిల్టర్: ')}<strong className="text-white capitalize">{dateRange}</strong></span>
                <span>•</span>
                <span>{t('Generated from 111 recent problem submissions', '111 తాజా ప్రశ్నల ఆధారంగా విశ్లేషించబడింది')}</span>
              </div>
            </div>
          </div>

          {/* Classroom Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-neutral-800 p-5 rounded-2xl border border-black/5 dark:border-white/5 shadow-xs">
              <span className="text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider block mb-1">
                {t('Active Students', 'యాక్టివ్ విద్యార్థులు')}
              </span>
              <span className="text-2xl md:text-3xl font-black text-neutral-900 dark:text-white">4</span>
              <span className="text-xs text-green-600 dark:text-green-400 block mt-1 font-semibold">100% active this week</span>
            </div>

            <div className="bg-white dark:bg-neutral-800 p-5 rounded-2xl border border-black/5 dark:border-white/5 shadow-xs">
              <span className="text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider block mb-1">
                {t('Average Accuracy', 'సగటు ఖచ్చితత్వం')}
              </span>
              <span className="text-2xl md:text-3xl font-black text-neutral-900 dark:text-white">78%</span>
              <span className="text-xs text-emerald-600 dark:text-emerald-400 block mt-1 font-semibold">+4% vs last week</span>
            </div>

            <div className="bg-white dark:bg-neutral-800 p-5 rounded-2xl border border-black/5 dark:border-white/5 shadow-xs">
              <span className="text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider block mb-1">
                {t('Tasks Completed', 'పూర్తయిన పనులు')}
              </span>
              <span className="text-2xl md:text-3xl font-black text-neutral-900 dark:text-white">148</span>
              <span className="text-xs text-neutral-500 dark:text-neutral-400 block mt-1 font-medium">{t('Across all chapters', 'అన్ని అధ్యాయాలలో')}</span>
            </div>

            <div className="bg-white dark:bg-neutral-800 p-5 rounded-2xl border border-black/5 dark:border-white/5 shadow-xs">
              <span className="text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider block mb-1">
                {t('Active Assignments', 'కేటాయించిన పనులు')}
              </span>
              <span className="text-2xl md:text-3xl font-black text-indigo-600 dark:text-indigo-400">{tasks.length}</span>
              <span className="text-xs text-neutral-500 dark:text-neutral-400 block mt-1 font-semibold">{t('Synced with students', 'విద్యార్థులతో సింక్ అయింది')}</span>
            </div>
          </div>

          {/* Quick List Preview */}
          <div className="bg-white dark:bg-neutral-800 rounded-[32px] p-6 border border-black/5 dark:border-white/5 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white">{t('Quick Student Roster', 'విద్యార్థుల జాబితా')}</h3>
              <button
                onClick={() => setActiveTab('students')}
                className="text-xs font-bold text-neutral-900 dark:text-white hover:underline flex items-center gap-1 cursor-pointer"
              >
                {t('View Detailed Answers', 'వివరమైన సమాధానాలను చూడండి')} <ChevronRight size={14} />
              </button>
            </div>
            <div className="divide-y divide-neutral-100 dark:divide-neutral-700">
              {students.map((st) => (
                <div key={st.id} className="py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-app-lime/30 text-neutral-900 font-bold flex items-center justify-center text-sm">
                      {st.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-neutral-900 dark:text-white">{st.name}</h4>
                      <span className="text-xs text-neutral-400 dark:text-neutral-500">{st.level} • {st.lastActive}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <span className="text-xs text-neutral-400 dark:text-neutral-500 font-semibold block">{t('Accuracy', 'ఖచ్చితత్వం')}</span>
                      <span className="text-sm font-bold text-neutral-900 dark:text-white">{st.accuracy}</span>
                    </div>
                    <button
                      onClick={() => setSelectedStudent(st)}
                      className="px-3 py-1.5 bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600 text-neutral-900 dark:text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                    >
                      {t('Inspect', 'తనిఖీ చేయండి')}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: STUDENTS LIST & CORRECT/INCORRECT ANSWERS */}
      {activeTab === 'students' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
              {t('Student Performance & Answer Logs', 'విద్యార్థుల పనితీరు & సమాధానాల లాగ్‌లు')}
            </h3>
            <span className="text-xs text-neutral-400 dark:text-neutral-500 font-medium">
              {t('Click on any student to view exact correct vs incorrect submissions', 'సరియైన vs తప్పు సమాధానాలను చూడటానికి క్లిక్ చేయండి')}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {students.map((student) => (
              <div
                key={student.id}
                className="bg-white dark:bg-neutral-800 rounded-[28px] p-6 border border-black/5 dark:border-white/5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-neutral-300 dark:hover:border-neutral-600 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-xl ${
                    student.status === 'needs_help' ? 'bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400' : 'bg-[#D4F670]/40 text-black'
                  }`}>
                    {student.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-neutral-900 dark:text-white text-lg">{student.name}</h4>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs font-semibold px-2.5 py-0.5 bg-neutral-100 dark:bg-neutral-700 rounded-full text-neutral-700 dark:text-neutral-300">
                        {student.level}
                      </span>
                      <span className="text-xs text-neutral-400 dark:text-neutral-500">
                        {student.lastActive}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Accuracy & Correct/Incorrect Counts */}
                <div className="flex items-center gap-6 flex-wrap">
                  <div className="text-center">
                    <span className="text-xs text-neutral-400 dark:text-neutral-500 uppercase font-bold block">{t('Accuracy', 'ఖచ్చితత్వం')}</span>
                    <span className="text-lg font-black text-neutral-900 dark:text-white">{student.accuracy}</span>
                  </div>

                  <div className="flex items-center gap-2 bg-green-50 dark:bg-green-950/40 px-3 py-1.5 rounded-xl border border-green-200 dark:border-green-800/60">
                    <CheckCircle2 size={16} className="text-green-600 dark:text-green-400" />
                    <span className="text-xs font-bold text-green-700 dark:text-green-300">{student.correctCount} {t('Correct', 'సరియైనవి')}</span>
                  </div>

                  <div className="flex items-center gap-2 bg-red-50 dark:bg-red-950/40 px-3 py-1.5 rounded-xl border border-red-200 dark:border-red-800/60">
                    <XCircle size={16} className="text-red-600 dark:text-red-400" />
                    <span className="text-xs font-bold text-red-700 dark:text-red-300">{student.incorrectCount} {t('Incorrect', 'తప్పులు')}</span>
                  </div>

                  <button
                    onClick={() => setSelectedStudent(student)}
                    className="bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-xs font-bold px-4 py-2.5 rounded-xl transition-transform active:scale-95 cursor-pointer ml-auto md:ml-0"
                  >
                    {t('View Answer Details', 'వివరాలు చూడండి')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: CHAPTER & SUBTOPIC DIFFICULTIES */}
      {activeTab === 'difficulties' && (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-1">
              {t('Chapter & Subtopic Difficulty Breakdown', 'అధ్యాయం & ఉప-అంశాల కష్టతర విశ్లేషణ')}
            </h3>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm">
              {t('Identify which math mechanics students struggle with most across the curriculum.', 'పాఠ్యప్రణాళికలో విద్యార్థులు ఏ గణిత భావనలతో ఎక్కువగా ఇబ్బంది పడుతున్నారో గుర్తించండి.')}
            </p>
          </div>

          <div className="bg-white dark:bg-neutral-800 rounded-[32px] overflow-hidden border border-black/5 dark:border-white/5 shadow-xs">
            <div className="divide-y divide-neutral-100 dark:divide-neutral-700">
              {chapterDifficulties.map((item, idx) => (
                <div key={idx} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider block mb-0.5">
                      {item.chapter}
                    </span>
                    <h4 className="text-lg font-bold text-neutral-900 dark:text-white">
                      {item.subtopic}
                    </h4>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <span className="text-xs text-neutral-400 dark:text-neutral-500 font-semibold block">{t('Class Pass Rate', 'పాస్ రేటు')}</span>
                      <span className="text-sm font-bold text-neutral-900 dark:text-white">{item.passRate}</span>
                    </div>

                    <span className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 ${
                      item.difficulty === 'High' 
                        ? 'bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300' 
                        : item.difficulty === 'Medium' 
                        ? 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300' 
                        : 'bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300'
                    }`}>
                      {item.difficulty === 'High' && <AlertTriangle size={14} />}
                      {item.difficulty} {t('Difficulty', 'కష్టం')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: ASSIGNED TASKS MANAGEMENT (TEACHER TO STUDENT SYNC) */}
      {activeTab === 'tasks' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-1">
                {t('Class Task Assignments & Synchronization', 'తరగతి టాస్క్ కేటాయింపులు & సింక్రొనైజేషన్')}
              </h3>
              <p className="text-neutral-500 dark:text-neutral-400 text-sm">
                {t('Tasks assigned here are immediately dispatched and visible in targeted students’ dashboards.', 'ఇక్కడ కేటాయించిన పనులు వెంటనే విద్యార్థుల డాష్‌బోర్డులో కనిపిస్తాయి.')}
              </p>
            </div>
            <button
              onClick={() => setIsAssignModalOpen(true)}
              className="bg-[#D4F670] hover:bg-[#bce451] text-black font-bold px-4 py-2.5 rounded-2xl text-xs md:text-sm flex items-center gap-1.5 shadow-sm transition-transform active:scale-95 cursor-pointer"
            >
              <Plus size={16} />
              {t('Assign New Task', 'కొత్త టాస్క్ అసైన్ చేయండి')}
            </button>
          </div>

          <div className="space-y-4">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="bg-white dark:bg-neutral-800 rounded-[28px] p-6 border border-black/5 dark:border-white/5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold px-3 py-1 bg-neutral-100 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 rounded-full">
                      {t('Target: ', 'లక్ష్యం: ')}{task.targetLevel}
                    </span>
                    <span className="text-xs font-semibold px-2.5 py-1 bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300 rounded-full flex items-center gap-1">
                      <CheckCircle2 size={12} />
                      {t('Active & Synced', 'యాక్టివ్ & సింక్ చేయబడింది')}
                    </span>
                    <span className="text-xs text-neutral-400 dark:text-neutral-500">
                      {task.assignedDate}
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-neutral-900 dark:text-white">
                    {task.title}
                  </h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-2xl">
                    {task.description}
                  </p>
                </div>

                <div className="flex items-center gap-3 self-end md:self-center">
                  {onDeleteTask && (
                    <button
                      onClick={() => onDeleteTask(task.id)}
                      className="p-2.5 rounded-xl text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/50 transition-colors cursor-pointer"
                      title={t('Delete task', 'టాస్క్ తొలగించండి')}
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STUDENT DETAILED ANSWERS MODAL */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in">
          <div className="bg-white dark:bg-neutral-800 rounded-[36px] max-w-lg w-full p-6 md:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto custom-scrollbar">
            <button
              onClick={() => setSelectedStudent(null)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-app-lime/40 text-black font-bold flex items-center justify-center text-xl">
                {selectedStudent.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">{selectedStudent.name}</h3>
                <span className="text-xs text-neutral-400 dark:text-neutral-500 font-semibold">{selectedStudent.level} • {t('Detailed Submissions', 'సమర్పించిన సమాధానాలు')}</span>
              </div>
            </div>

            {/* Stats row inside modal */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="p-3 bg-neutral-50 dark:bg-neutral-700/50 rounded-2xl text-center">
                <span className="text-xs text-neutral-400 dark:text-neutral-400 uppercase font-bold block">{t('Accuracy', 'ఖచ్చితత్వం')}</span>
                <span className="text-lg font-bold text-neutral-900 dark:text-white">{selectedStudent.accuracy}</span>
              </div>
              <div className="p-3 bg-green-50 dark:bg-green-950/40 rounded-2xl text-center">
                <span className="text-xs text-green-600 dark:text-green-400 uppercase font-bold block">{t('Correct', 'సరియైనవి')}</span>
                <span className="text-lg font-bold text-green-700 dark:text-green-300">{selectedStudent.correctCount}</span>
              </div>
              <div className="p-3 bg-red-50 dark:bg-red-950/40 rounded-2xl text-center">
                <span className="text-xs text-red-600 dark:text-red-400 uppercase font-bold block">{t('Incorrect', 'తప్పులు')}</span>
                <span className="text-lg font-bold text-red-700 dark:text-red-300">{selectedStudent.incorrectCount}</span>
              </div>
            </div>

            <h4 className="text-sm font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-3">
              {t('Recent Problem Submissions', 'ఇటీవలి సమర్పణలు')}
            </h4>

            <div className="space-y-3">
              {selectedStudent.recentAnswers.map((ans, i) => (
                <div
                  key={i}
                  className={`p-4 rounded-2xl border flex items-center justify-between ${
                    ans.isCorrect ? 'bg-green-50/50 dark:bg-green-950/30 border-green-200 dark:border-green-800' : 'bg-red-50/50 dark:bg-red-950/30 border-red-200 dark:border-red-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {ans.isCorrect ? (
                      <CheckCircle2 size={20} className="text-green-600 dark:text-green-400 shrink-0" />
                    ) : (
                      <XCircle size={20} className="text-red-600 dark:text-red-400 shrink-0" />
                    )}
                    <div>
                      <p className="font-bold text-neutral-900 dark:text-white text-base">{ans.question}</p>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        {t('Answered: ', 'విద్యార్థి సమాధానం: ')}
                        <span className={ans.isCorrect ? 'font-bold text-green-700 dark:text-green-300' : 'font-bold text-red-700 dark:text-red-300'}>
                          {ans.studentAnswer}
                        </span>
                        {!ans.isCorrect && (
                          <span className="text-neutral-500 dark:text-neutral-400 ml-2">
                            ({t('Correct: ', 'సరైనది: ')}<span className="font-semibold text-green-700 dark:text-green-300">{ans.correctAnswer}</span>)
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-neutral-400 dark:text-neutral-500 font-medium">{ans.timestamp}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-700 flex justify-end">
              <button
                onClick={() => setSelectedStudent(null)}
                className="bg-neutral-900 dark:bg-neutral-100 hover:bg-black dark:hover:bg-white text-white dark:text-neutral-900 px-6 py-2.5 rounded-xl font-bold text-sm cursor-pointer"
              >
                {t('Close Details', 'మూసివేయండి')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* QUICK ASSIGN TASK MODAL */}
      {isAssignModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in">
          <div className="bg-white dark:bg-neutral-800 rounded-[36px] max-w-md w-full p-6 md:p-8 shadow-2xl relative">
            <button
              onClick={() => setIsAssignModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>

            <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
              {t('Assign New Math Task', 'కొత్త గణిత టాస్క్‌ను కేటాయించండి')}
            </h3>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-6">
              {t('Assign drills to targeted skill levels or the entire class.', 'నిర్దిష్ట స్థాయిలకు లేదా మొత్తం తరగతికి సాధనలను కేటాయించండి.')}
            </p>

            <form onSubmit={handleAssignSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-400 block mb-1">
                  {t('Task Title / Chapter', 'టాస్క్ శీర్షిక / అధ్యాయం')}
                </label>
                <input
                  type="text"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  placeholder={t('e.g. Chapter 3: 7x Tables Practice', 'ఉదా: అధ్యాయం 3 సాధన')}
                  required
                  className="w-full bg-neutral-50 dark:bg-neutral-700/50 border border-neutral-200 dark:border-neutral-600 rounded-xl px-4 py-3 text-sm text-neutral-900 dark:text-white focus:border-neutral-900 dark:focus:border-white outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-400 block mb-1">
                  {t('Instructions (Optional)', 'సూచనలు (ఐచ్ఛికం)')}
                </label>
                <input
                  type="text"
                  value={taskDescription}
                  onChange={(e) => setTaskDescription(e.target.value)}
                  placeholder={t('e.g. Complete 5 practice drills with hints', 'ఉదా: సూచనలతో 5 సాధన ప్రశ్నలను పూర్తి చేయండి')}
                  className="w-full bg-neutral-50 dark:bg-neutral-700/50 border border-neutral-200 dark:border-neutral-600 rounded-xl px-4 py-3 text-sm text-neutral-900 dark:text-white focus:border-neutral-900 dark:focus:border-white outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-400 block mb-1">
                  {t('Target Student Level', 'లక్ష్య విద్యార్థి స్థాయి')}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(['All', 'Beginner', 'Intermediate', 'Advanced'] as const).map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setTargetLevel(lvl)}
                      className={`p-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        targetLevel === lvl
                          ? 'bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 border-neutral-900 dark:border-neutral-100'
                          : 'bg-neutral-50 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-600'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              {assignedSuccess && (
                <div className="p-3 rounded-xl bg-green-100 dark:bg-green-950 text-green-800 dark:text-green-300 text-xs font-bold text-center border border-green-200 dark:border-green-800">
                  {assignedSuccess}
                </div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-[#D4F670] hover:bg-[#bce451] text-black font-bold py-3.5 rounded-xl text-sm transition-transform active:scale-95 shadow-md shadow-[#D4F670]/20 cursor-pointer"
                >
                  {t('Confirm Assignment', 'అసైన్‌మెంట్‌ను నిర్ధారించండి')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
