import React, { useState, useEffect } from 'react';
import { Plus, CheckCircle2, XCircle, AlertTriangle, X, Users, BookOpen, ClipboardList, Trash2, RotateCcw, Sparkles, Clock } from 'lucide-react';
import { AssignedTask, StudentLevel, CompletedTestRecord } from '../types';
import { getCompletedTests, resetOrDeleteTest, approveTestRetake, rejectTestRetake } from '../utils/testStorage';

interface AdminDashboardProps {
  t: (en: string, te: string) => string;
  tasks: AssignedTask[];
  onAssignTask: (task: Omit<AssignedTask, 'id' | 'assignedDate' | 'status'>) => void;
  onDeleteTask?: (taskId: string) => void;
  teacherName: string;
  teacherSubject?: string;
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
    accuracy: '75%',
    lastActive: 'Today, 10:30 AM',
    correctCount: 3,
    incorrectCount: 1,
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
    accuracy: '50%',
    lastActive: 'Yesterday, 4:15 PM',
    correctCount: 2,
    incorrectCount: 2,
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
    accuracy: '100%',
    lastActive: 'Today, 11:45 AM',
    correctCount: 3,
    incorrectCount: 0,
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
    accuracy: '50%',
    lastActive: 'May 18, 2026',
    correctCount: 1,
    incorrectCount: 1,
    recentAnswers: [
      { question: '9 × 3', studentAnswer: '27', correctAnswer: '27', isCorrect: true, timestamp: '2:15 PM' },
      { question: '36 ÷ 4', studentAnswer: '8', correctAnswer: '9', isCorrect: false, timestamp: '2:10 PM' },
    ],
  },
];

const chapterDifficulties = [
  { chapterEn: 'Ch 1: Number Bonds & Basic Facts', chapterTe: 'అధ్యాయం 1: సంఖ్య బంధాలు & ప్రాథమిక అంశాలు', subtopicEn: 'Making 10s', subtopicTe: '10 గా మార్చడం', difficulty: 'Low', passRate: '94%' },
  { chapterEn: 'Ch 2: Addition & Subtraction (Up to 20)', chapterTe: 'అధ్యాయం 2: కూడిక & తీసివేత (20 వరకు)', subtopicEn: 'Carry-over mechanics', subtopicTe: 'క్యారీ-ఓవర్ పద్ధతి', difficulty: 'High', passRate: '62%' },
  { chapterEn: 'Ch 3: Multiplication & Arrays', chapterTe: 'అధ్యాయం 3: గుణకారం & శ్రేణులు', subtopicEn: 'Multiplication Tables 6–9', subtopicTe: 'గుణకార పట్టికలు 6–9', difficulty: 'Medium', passRate: '75%' },
  { chapterEn: 'Ch 4: Division & Equal Sharing', chapterTe: 'అధ్యాయం 4: భాగహారం & సమాన పంపకం', subtopicEn: 'Remainders & Long Division', subtopicTe: 'శేషాలు & దీర్ఘ భాగహారం', difficulty: 'High', passRate: '58%' },
  { chapterEn: 'Ch 5: Fractions & Decimals', chapterTe: 'అధ్యాయం 5: భిన్నాలు & దశాంశాలు', subtopicEn: 'Unlike Denominators', subtopicTe: 'విభిన్న హారాలు', difficulty: 'Medium', passRate: '71%' },
];

export default function AdminDashboard({
  t,
  tasks,
  onAssignTask,
  onDeleteTask,
  teacherName,
  teacherSubject = 'Mathematics',
}: AdminDashboardProps) {
  const [students] = useState<StudentRecord[]>(initialStudents);
  const [selectedStudent, setSelectedStudent] = useState<StudentRecord | null>(null);
  const [activeTab, setActiveTab] = useState<'tasks' | 'retakes' | 'students' | 'curriculum'>('tasks');
  const [completedTests, setCompletedTests] = useState<CompletedTestRecord[]>([]);
  const [selectedCompletedTest, setSelectedCompletedTest] = useState<CompletedTestRecord | null>(null);
  const [retryNotice, setRetryNotice] = useState<string>('');

  // Strict Filter Rule: Pending retakes MUST ONLY render records where retake_requested === true
  const pendingRetakes = completedTests.filter((test) => test.retake_requested === true);

  useEffect(() => {
    const refresh = () => setCompletedTests(getCompletedTests());
    refresh();
    window.addEventListener('storage', refresh);
    window.addEventListener('ganitmitra_tests_updated', refresh);
    const interval = setInterval(refresh, 2000);
    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', refresh);
      window.removeEventListener('ganitmitra_tests_updated', refresh);
    };
  }, []);

  // When teacher clicks "Approve Retake": update backend/local state to retry_locked = false AND retake_requested = false
  const handleApproveRetake = (testId: string, studentName: string, chapterTitle: string) => {
    approveTestRetake(testId);
    setCompletedTests(getCompletedTests());
    setRetryNotice(
      t(
        `Retake approved for ${studentName} on ${chapterTitle}. Retry unlocked.`,
        `${studentName} కు ${chapterTitle} పై రీటేక్ అనుమతించబడింది. రీట్రై అన్‌లాక్ చేయబడింది.`
      )
    );
    setTimeout(() => setRetryNotice(''), 4500);
  };

  // When teacher clicks "Reject Retake": update backend/local state to retry_locked = true, retake_requested = false, retake_rejected = true
  const handleRejectRetake = (testId: string, studentName: string, chapterTitle: string) => {
    rejectTestRetake(testId);
    setCompletedTests(getCompletedTests());
    setRetryNotice(
      t(
        `Retake request rejected for ${studentName} on ${chapterTitle}.`,
        `${studentName} కొరకు ${chapterTitle} రీటేక్ అభ్యర్థన తిరస్కరించబడింది.`
      )
    );
    setTimeout(() => setRetryNotice(''), 4500);
  };

  const handleAllowRetry = (testId: string, studentName: string, chapterTitle: string) => {
    resetOrDeleteTest(testId);
    setCompletedTests((prev) => prev.filter((t) => t.id !== testId));
    setRetryNotice(
      t(
        `Retry unlocked for ${studentName} on ${chapterTitle}`,
        `${studentName} కు ${chapterTitle} పై మళ్లీ పరీక్ష రాయడానికి అనుమతి ఇవ్వబడింది!`
      )
    );
    setTimeout(() => setRetryNotice(''), 3500);
  };
  
  // Assign Task State
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
      assignedBy: teacherName ? `${teacherName} (${teacherSubject})` : teacherSubject || 'Teacher',
      dueDate: t('Tomorrow, 5:00 PM', 'రేపు సాయంత్రం 5:00'),
    });

    setAssignedSuccess(t(`Task assigned to ${targetLevel} students`, `టాస్క్ విజయవంతంగా కేటాయించబడింది!`));
    setTaskTitle('');
    setTaskDescription('');

    setTimeout(() => {
      setAssignedSuccess('');
      setIsAssignModalOpen(false);
    }, 1500);
  };

  return (
    <div className="animate-in fade-in duration-300 max-w-5xl mx-auto pt-1 space-y-5">
      
      {/* Tab Navigation & Assign Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-200/80 dark:border-neutral-800 pb-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 custom-scrollbar">
          <button
            onClick={() => setActiveTab('tasks')}
            className={`px-3.5 lg:px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer shrink-0 whitespace-nowrap ${
              activeTab === 'tasks' 
                ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 shadow-xs' 
                : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            <ClipboardList size={16} />
            <span>{t('Assignments & Tasks', 'కేటాయించిన పనులు')}</span>
            <span className={`text-[11px] px-1.5 py-0.2 rounded-full font-extrabold ${
              activeTab === 'tasks' 
                ? 'bg-neutral-700 text-white dark:bg-neutral-200 dark:text-neutral-900' 
                : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300'
            }`}>
              {tasks.length}
            </span>
          </button>

          {/* Dedicated Tab: Pending Retake Requests */}
          <button
            onClick={() => setActiveTab('retakes')}
            className={`px-3.5 lg:px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer shrink-0 whitespace-nowrap ${
              activeTab === 'retakes' 
                ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 shadow-xs' 
                : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            <RotateCcw size={16} />
            <span>{t('Pending Retake Requests', 'పెండింగ్‌లో ఉన్న రీటేక్ అభ్యర్థనలు')}</span>
            <span className={`text-[11px] px-2 py-0.5 rounded-full font-extrabold ${
              pendingRetakes.length > 0
                ? 'bg-amber-500 text-white animate-pulse'
                : activeTab === 'retakes' 
                ? 'bg-neutral-700 text-white dark:bg-neutral-200 dark:text-neutral-900' 
                : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300'
            }`}>
              {pendingRetakes.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('students')}
            className={`px-3.5 lg:px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer shrink-0 whitespace-nowrap ${
              activeTab === 'students' 
                ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 shadow-xs' 
                : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            <Users size={16} />
            <span>{t('Student Roster & Logs', 'విద్యార్థుల జాబితా & లాగ్‌లు')}</span>
          </button>

          <button
            onClick={() => setActiveTab('curriculum')}
            className={`px-3.5 lg:px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer shrink-0 whitespace-nowrap ${
              activeTab === 'curriculum' 
                ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 shadow-xs' 
                : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            <BookOpen size={16} />
            <span>{t('Curriculum Health', 'పాఠ్యప్రణాళిక విశ్లేషణ')}</span>
          </button>
        </div>

        <button
          onClick={() => setIsAssignModalOpen(true)}
          className="bg-[#D4F670] hover:bg-[#bce451] text-black font-bold px-4 py-2 rounded-xl text-xs md:text-sm flex items-center gap-1.5 shadow-xs transition-transform active:scale-95 cursor-pointer self-start sm:self-auto shrink-0"
        >
          <Plus size={16} />
          <span>{t('Assign Task', 'టాస్క్ అసైన్ చేయండి')}</span>
        </button>
      </div>

      {/* Global Notice if Retry was Unlocked/Approved/Rejected */}
      {retryNotice && (
        <div
          className={`p-3.5 rounded-2xl text-xs md:text-sm font-bold text-center border animate-in fade-in flex items-center justify-center gap-2 ${
            retryNotice.includes('rejected') || retryNotice.includes('తిరస్కరించబడింది')
              ? 'bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-200 border-rose-300 dark:border-rose-800'
              : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200 border-emerald-300 dark:border-emerald-800'
          }`}
        >
          {retryNotice.includes('rejected') || retryNotice.includes('తిరస్కరించబడింది') ? (
            <XCircle size={16} />
          ) : (
            <Sparkles size={16} />
          )}
          <span>{retryNotice}</span>
        </div>
      )}

      {/* Prompt Banner when Retakes are pending and teacher is on another tab */}
      {pendingRetakes.length > 0 && activeTab !== 'retakes' && (
        <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs sm:text-sm font-bold flex flex-col sm:flex-row items-center justify-between gap-3 animate-in fade-in shadow-xs">
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-amber-600 animate-spin shrink-0" />
            <span>
              {t(
                `${pendingRetakes.length} Student Retake Request(s) Awaiting Approval`,
                `${pendingRetakes.length} విద్యార్థి రీటేక్ అభ్యర్థనలు ఆమోదం కోసం ఎదురుచూస్తున్నాయి`
              )}
            </span>
          </div>
          <button
            onClick={() => setActiveTab('retakes')}
            className="px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-extrabold cursor-pointer transition-colors shadow-xs"
          >
            {t('Review Retakes', 'రీటేక్‌లను సమీక్షించండి')}
          </button>
        </div>
      )}

      {/* TAB 1: ASSIGNMENTS & TASKS */}
      {activeTab === 'tasks' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">
              {t('Tasks assigned here sync immediately to student dashboards and notifications.', 'ఇక్కడ కేటాయించిన పనులు వెంటనే విద్యార్థుల నోటిఫికేషన్లలో కనిపిస్తాయి.')}
            </span>
            <button
              onClick={() => setIsAssignModalOpen(true)}
              className="text-xs font-bold text-neutral-900 dark:text-white hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Plus size={14} />
              <span>{t('New Assignment', 'కొత్త అసైన్‌మెంట్')}</span>
            </button>
          </div>

          {tasks.length === 0 ? (
            <div className="bg-white dark:bg-neutral-800 rounded-2xl p-10 text-center border border-black/5 dark:border-white/5">
              <ClipboardList size={32} className="text-neutral-400 mx-auto mb-2" />
              <h3 className="font-bold text-base text-neutral-900 dark:text-white">{t('No active tasks assigned', 'ప్రస్తుతం యాక్టివ్ టాస్క్‌లు లేవు')}</h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 max-w-sm mx-auto mb-4">
                {t('Assign exercises and practice sets for students to review and practice.', 'విద్యార్థుల సాధన కోసం కొత్త టాస్క్‌ను కేటాయించండి.')}
              </p>
              <button
                onClick={() => setIsAssignModalOpen(true)}
                className="bg-[#D4F670] hover:bg-[#bce451] text-black font-bold px-4 py-2 rounded-xl text-xs inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Plus size={14} />
                <span>{t('Assign First Task', 'మొదటి టాస్క్ కేటాయించండి')}</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-white dark:bg-neutral-800 rounded-2xl p-5 border border-black/5 dark:border-white/5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-neutral-300 dark:hover:border-neutral-600 transition-all"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[11px] font-bold px-2.5 py-0.5 bg-[#D4F670]/30 text-neutral-900 dark:text-[#D4F670] rounded-full border border-[#D4F670]/30">
                        {task.targetLevel === 'All'
                          ? t('All Students', 'అందరికీ')
                          : t(
                              task.targetLevel,
                              task.targetLevel === 'Beginner'
                                ? 'ప్రారంభం'
                                : task.targetLevel === 'Intermediate'
                                ? 'మధ్యస్థం'
                                : 'అధునాతనం'
                            )}
                      </span>
                      <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 size={12} />
                        {t('Synced', 'సింక్ అయింది')}
                      </span>
                      <span className="text-[11px] text-neutral-400 dark:text-neutral-500">
                        •{' '}
                        {task.assignedDate === 'Today'
                          ? t('Today', 'ఈరోజు')
                          : task.assignedDate === 'Yesterday'
                          ? t('Yesterday', 'నిన్న')
                          : task.assignedDate}
                      </span>
                    </div>
                    <h3 className="font-bold text-base text-neutral-900 dark:text-white">
                      {task.title}
                    </h3>
                    <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-2xl">
                      {task.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 self-end md:self-center">
                    {onDeleteTask && (
                      <button
                        onClick={() => onDeleteTask(task.id)}
                        className="p-2 rounded-xl text-neutral-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors cursor-pointer"
                        title={t('Delete task', 'టాస్క్ తొలగించండి')}
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: PENDING RETAKE REQUESTS (STRICT FILTER RULE: ONLY retake_requested === true) */}
      {activeTab === 'retakes' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-200/80 dark:border-neutral-800 pb-3">
            <div>
              <h2 className="text-xl md:text-2xl font-extrabold text-neutral-900 dark:text-white flex items-center gap-2">
                <span>{t('Pending Retake Requests', 'పెండింగ్‌లో ఉన్న రీటేక్ అభ్యర్థనలు')}</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-200 border border-amber-300 dark:border-amber-800 font-extrabold">
                  {pendingRetakes.length}
                </span>
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                {t(
                  'Strictly filtered: Only dynamic assessment records where retake_requested === true are displayed here.',
                  'ఖచ్చితంగా ఫిల్టర్ చేయబడింది: retake_requested === true ఉన్న విద్యార్థుల అభ్యర్థనలు మాత్రమే ఇక్కడ కనిపిస్తాయి.'
                )}
              </p>
            </div>
          </div>

          {/* Empty State: STRICT CLEANUP requirement - starts entirely empty */}
          {pendingRetakes.length === 0 ? (
            <div className="bg-white dark:bg-neutral-800 rounded-3xl p-10 md:p-14 text-center border border-black/5 dark:border-white/5 space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-neutral-100 dark:bg-neutral-700 text-neutral-400 dark:text-neutral-300 flex items-center justify-center mx-auto">
                <CheckCircle2 size={28} />
              </div>
              <h3 className="font-bold text-base md:text-lg text-neutral-900 dark:text-white">
                {t('No Pending Retake Requests', 'పెండింగ్‌లో ఉన్న రీటేక్ అభ్యర్థనలు ఏవీ లేవు')}
              </h3>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3.5">
              {pendingRetakes.map((test) => (
                <div
                  key={test.id}
                  className="bg-white dark:bg-neutral-800 rounded-2xl p-5 border-2 border-amber-300/80 dark:border-amber-700/60 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 animate-in fade-in"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-black px-2.5 py-0.5 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-200 border border-amber-300 dark:border-amber-800 flex items-center gap-1">
                        <Clock size={12} />
                        {t('Retake Requested', 'రీటేక్ కోరబడింది')}
                      </span>
                      <span className="text-xs font-bold text-neutral-900 dark:text-white">
                        {test.studentName} ({test.studentClass})
                      </span>
                      <span className="text-[11px] text-neutral-400">
                        • {test.timeFormatted}
                      </span>
                    </div>

                    <h4 className="font-bold text-base text-neutral-900 dark:text-white">
                      {t(test.chapterTitleEn, test.chapterTitleTe)}
                    </h4>

                    <div className="flex items-center gap-3 text-xs text-neutral-600 dark:text-neutral-300">
                      <span>
                        {t('Previous Score: ', 'గత స్కోరు: ')}
                        <span className="font-extrabold text-neutral-900 dark:text-white">
                          {test.score} / {test.totalQuestions} ({test.percentage}%)
                        </span>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end md:self-center flex-wrap">
                    <button
                      type="button"
                      onClick={() => setSelectedCompletedTest(test)}
                      className="px-3.5 py-2 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-700 dark:hover:bg-neutral-600 text-neutral-800 dark:text-neutral-200 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                    >
                      {t('Inspect Answers', 'సమాధానాలు చూడండి')}
                    </button>

                    {/* Prompt requirement: Reject retake request option */}
                    <button
                      type="button"
                      onClick={() => handleRejectRetake(test.id, test.studentName, test.chapterTitleEn)}
                      className="px-3.5 py-2 bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-900/60 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-800 font-extrabold text-xs sm:text-sm rounded-xl transition-transform active:scale-95 shadow-xs flex items-center gap-1.5 cursor-pointer"
                      title={t('Reject this retake request', 'ఈ రీటేక్ అభ్యర్థనను తిరస్కరించండి')}
                    >
                      <XCircle size={16} />
                      <span>{t('Reject Request', 'అభ్యర్థనను తిరస్కరించండి')}</span>
                    </button>

                    {/* Prompt requirement: "Approve Retake" action button */}
                    <button
                      type="button"
                      onClick={() => handleApproveRetake(test.id, test.studentName, test.chapterTitleEn)}
                      className="px-4 py-2 bg-[#D4F670] hover:bg-[#bce451] text-black font-extrabold text-xs sm:text-sm rounded-xl transition-transform active:scale-95 shadow-xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <CheckCircle2 size={16} />
                      <span>{t('Approve Retake', 'రీటేక్ ఆమోదించండి')}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: STUDENT ROSTER & DETAILED ANSWER LOGS */}
      {activeTab === 'students' && (
        <div className="space-y-6">
          {/* REAL-TIME COMPLETED CHAPTER TESTS & RETRY MANAGEMENT */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base md:text-lg font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                  <span>{t('Live Chapter Test Submissions', 'ప్రత్యక్ష అధ్యాయ పరీక్ష సమర్పణలు')}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[#D4F670] text-[#1a1a1a] font-extrabold">
                    {completedTests.length}
                  </span>
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  {t(
                    'Real-time student test submissions with score breakdowns and retry management.',
                    'విద్యార్థుల నిజ-సమయ పరీక్ష స్కోర్లు మరియు రీట్రై నిర్వహణ.'
                  )}
                </p>
              </div>
            </div>

            {completedTests.length === 0 ? (
              <div className="p-6 rounded-2xl bg-white dark:bg-neutral-800 border border-black/5 dark:border-white/5 text-center text-xs text-neutral-500">
                {t('No chapter tests submitted yet.', 'ఇంకా పరీక్షలు ఏవీ సమర్పించబడలేదు.')}
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3">
                {completedTests.map((test) => (
                  <div
                    key={test.id}
                    className="p-4 rounded-2xl bg-white dark:bg-neutral-800 border border-black/5 dark:border-white/5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-black px-2.5 py-0.5 rounded-lg bg-[#D4F670]/30 text-neutral-900 dark:text-[#D4F670]">
                          {test.studentName} ({test.studentClass})
                        </span>
                        <span className="text-[11px] font-bold text-neutral-400">
                          {test.timeFormatted}
                        </span>
                        <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 size={12} />
                          {t('Live Synced', 'లైవ్ సింక్ అయింది')}
                        </span>
                        {test.retake_requested && (
                          <span className="text-[11px] font-bold text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-950 px-2 py-0.5 rounded-md flex items-center gap-1 border border-amber-300 dark:border-amber-800">
                            <Clock size={11} />
                            {t('Retake Requested', 'రీటేక్ కోరబడింది')}
                          </span>
                        )}
                        {test.retake_rejected && !test.retake_requested && test.retry_locked !== false && (
                          <span className="text-[11px] font-bold text-rose-700 dark:text-rose-300 bg-rose-100 dark:bg-rose-950 px-2 py-0.5 rounded-md flex items-center gap-1 border border-rose-300 dark:border-rose-800">
                            <XCircle size={11} />
                            {t('Retake Rejected', 'రీటేక్ తిరస్కరించబడింది')}
                          </span>
                        )}
                      </div>
                      <h4 className="font-bold text-sm md:text-base text-neutral-900 dark:text-white">
                        {t(test.chapterTitleEn, test.chapterTitleTe)}
                      </h4>
                    </div>

                    <div className="flex items-center gap-3 self-end md:self-center flex-wrap">
                      <div className="text-right">
                        <span className="text-sm font-black text-neutral-900 dark:text-white block">
                          {test.score} / {test.totalQuestions}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            test.percentage >= 60
                              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                              : 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                          }`}
                        >
                          {test.percentage}% {t('Accuracy', 'ఖచ్చితత్వం')}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => setSelectedCompletedTest(test)}
                        className="px-3 py-1.5 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-bold rounded-xl hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors cursor-pointer"
                      >
                        {t('Inspect Answers', 'సమాధానాలు చూడండి')}
                      </button>

                      {/* Prompt requirement: Retry management for teachers */}
                      {test.retake_requested ? (
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleRejectRetake(test.id, test.studentName, test.chapterTitleEn)}
                            className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-900/60 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-800 text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center gap-1 shadow-xs"
                            title={t('Reject student retake request', 'విద్యార్థి రీటేక్ అభ్యర్థనను తిరస్కరించండి')}
                          >
                            <XCircle size={13} />
                            <span>{t('Reject', 'తిరస్కరించండి')}</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleApproveRetake(test.id, test.studentName, test.chapterTitleEn)}
                            className="px-3 py-1.5 bg-[#D4F670] hover:bg-[#bce451] text-black text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
                            title={t('Approve student retake request', 'విద్యార్థి రీటేక్ అభ్యర్థనను ఆమోదించండి')}
                          >
                            <CheckCircle2 size={13} />
                            <span>{t('Approve Retake', 'రీటేక్ ఆమోదించండి')}</span>
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleAllowRetry(test.id, test.studentName, test.chapterTitleEn)}
                          className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/40 dark:hover:bg-amber-900/60 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-800 text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
                          title={t('Allow student to retry this chapter test', 'ఈ పరీక్షను విద్యార్థి మళ్ళీ రాయడానికి అనుమతించండి')}
                        >
                          <RotateCcw size={13} />
                          <span>{t('Allow Retry', 'రీట్రై అనుమతించండి')}</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* GENERAL STUDENT ROSTER */}
          <div className="space-y-3 pt-4 border-t border-neutral-200/80 dark:border-neutral-800">
            <div className="flex items-center justify-between">
              <h3 className="text-base md:text-lg font-bold text-neutral-900 dark:text-white">
                {t('Classroom Roster & Historical Baseline', 'తరగతి విద్యార్థుల జాబితా')}
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-3">
            {students.map((student) => (
              <div
                key={student.id}
                className="bg-white dark:bg-neutral-800 rounded-2xl p-4 md:p-5 border border-black/5 dark:border-white/5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-base shrink-0 ${
                    student.status === 'needs_help' ? 'bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400' : 'bg-[#D4F670]/40 text-black'
                  }`}>
                    {student.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-neutral-900 dark:text-white text-base leading-tight">{student.name}</h4>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[11px] font-semibold text-neutral-500 dark:text-neutral-400">
                        {t(
                          student.level,
                          student.level === 'Beginner'
                            ? 'ప్రారంభం'
                            : student.level === 'Intermediate'
                            ? 'మధ్యస్థం'
                            : 'అధునాతనం'
                        )}
                      </span>
                      <span className="text-[11px] text-neutral-400 dark:text-neutral-500">•</span>
                      <span className="text-[11px] text-neutral-400 dark:text-neutral-500">
                        {student.lastActive.startsWith('Today')
                          ? student.lastActive.replace('Today', t('Today', 'ఈరోజు'))
                          : student.lastActive.startsWith('Yesterday')
                          ? student.lastActive.replace('Yesterday', t('Yesterday', 'నిన్న'))
                          : student.lastActive}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 flex-wrap md:justify-end">
                  <div className="text-center px-2">
                    <span className="text-[10px] text-neutral-400 dark:text-neutral-500 uppercase font-bold block">{t('Accuracy', 'ఖచ్చితత్వం')}</span>
                    <span className="text-sm font-bold text-neutral-900 dark:text-white">
                      {student.recentAnswers && student.recentAnswers.length > 0
                        ? `${Math.round((student.recentAnswers.filter((a) => a.isCorrect).length / student.recentAnswers.length) * 100)}%`
                        : student.accuracy}
                    </span>
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-50 dark:bg-green-950/40 rounded-lg text-xs font-semibold text-green-700 dark:text-green-300">
                    <CheckCircle2 size={13} />
                    <span>{student.recentAnswers ? student.recentAnswers.filter((a) => a.isCorrect).length : student.correctCount}</span>
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-red-50 dark:bg-red-950/40 rounded-lg text-xs font-semibold text-red-700 dark:text-red-300">
                    <XCircle size={13} />
                    <span>{student.recentAnswers ? student.recentAnswers.filter((a) => !a.isCorrect).length : student.incorrectCount}</span>
                  </div>

                  <button
                    onClick={() => setSelectedStudent(student)}
                    className="px-3.5 py-1.5 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-bold rounded-xl hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors cursor-pointer"
                  >
                    {t('Inspect Answers', 'సమాధానాలు చూడండి')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )}

      {/* TAB 3: CURRICULUM HEALTH & TOPIC DIFFICULTIES */}
      {activeTab === 'curriculum' && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-neutral-800 rounded-2xl overflow-hidden border border-black/5 dark:border-white/5 shadow-xs">
            <div className="divide-y divide-neutral-100 dark:divide-neutral-700/60">
              {chapterDifficulties.map((item, idx) => (
                <div key={idx} className="p-4 md:p-5 flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div>
                    <span className="text-[11px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider block mb-0.5">
                      {t(item.chapterEn, item.chapterTe)}
                    </span>
                    <h4 className="text-sm md:text-base font-bold text-neutral-900 dark:text-white">
                      {t(item.subtopicEn, item.subtopicTe)}
                    </h4>
                  </div>

                  <div className="flex items-center gap-5">
                    <div className="text-right">
                      <span className="text-[10px] text-neutral-400 dark:text-neutral-500 font-bold uppercase block">{t('Pass Rate', 'పాస్ రేటు')}</span>
                      <span className="text-sm font-bold text-neutral-900 dark:text-white">{item.passRate}</span>
                    </div>

                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${
                      item.difficulty === 'High' 
                        ? 'bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300' 
                        : item.difficulty === 'Medium' 
                        ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300' 
                        : 'bg-green-100 dark:bg-green-950/60 text-green-700 dark:text-green-300'
                    }`}>
                      {item.difficulty === 'High' && <AlertTriangle size={12} />}
                      {t(item.difficulty, item.difficulty === 'High' ? 'ఎక్కువ' : item.difficulty === 'Medium' ? 'మధ్యస్థ' : 'తక్కువ')} {t('Difficulty', 'కష్టం')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-100 dark:bg-neutral-800/60 border border-neutral-200/60 dark:border-neutral-700/60 flex items-start gap-3">
            <AlertTriangle size={18} className="text-amber-500 shrink-0 mt-0.5" />
            <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
              {t(
                'Focus Recommendation: Addition carry-over mechanics (Ch 2) and Long Division remainders (Ch 4) have the highest error rates. Consider assigning targeted 5-question review drills before advancing.',
                'సిఫార్సు: క్యారీ-ఓవర్ కూడిక మరియు దీర్ఘ భాగహారంలో తప్పులు ఎక్కువగా ఉన్నాయి. తదుపరి అధ్యాయానికి వెళ్లేముందు లక్ష్యిత రివిజన్ టాస్క్ ఇవ్వండి.'
              )}
            </p>
          </div>
        </div>
      )}

      {/* COMPLETED TEST INSPECTION MODAL */}
      {selectedCompletedTest && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in duration-200"
          onClick={() => setSelectedCompletedTest(null)}
        >
          <div 
            className="bg-white dark:bg-neutral-900 rounded-[28px] max-w-lg w-full p-6 shadow-2xl border border-black/10 dark:border-white/10 relative max-h-[85vh] overflow-y-auto custom-scrollbar animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-neutral-100 dark:border-neutral-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#D4F670] text-[#1a1a1a] font-bold flex items-center justify-center text-lg">
                  {selectedCompletedTest.studentName.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                    {selectedCompletedTest.studentName} ({selectedCompletedTest.studentClass})
                  </h3>
                  <span className="text-xs text-neutral-400">
                    {t(selectedCompletedTest.chapterTitleEn, selectedCompletedTest.chapterTitleTe)} • {selectedCompletedTest.timeFormatted}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCompletedTest(null)}
                className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-500 hover:text-neutral-900 dark:hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Score summary */}
            {(() => {
              const totalAns = selectedCompletedTest.answers?.length || selectedCompletedTest.totalQuestions;
              const correctAns = selectedCompletedTest.answers
                ? selectedCompletedTest.answers.filter((a) => a.isCorrect).length
                : selectedCompletedTest.score;
              const incorrectAns = totalAns - correctAns;
              const acc = totalAns > 0 ? Math.round((correctAns / totalAns) * 100) : selectedCompletedTest.percentage;

              return (
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="p-2.5 bg-neutral-50 dark:bg-neutral-800 rounded-xl text-center">
                    <span className="text-[10px] text-neutral-400 uppercase font-bold block">{t('Accuracy', 'ఖచ్చితత్వం')}</span>
                    <span className="text-base font-black text-neutral-900 dark:text-white">
                      {acc}%
                    </span>
                  </div>
                  <div className="p-2.5 bg-green-50 dark:bg-green-950/40 rounded-xl text-center">
                    <span className="text-[10px] text-green-600 dark:text-green-400 uppercase font-bold block">{t('Correct', 'సరియైనవి')}</span>
                    <span className="text-base font-black text-green-700 dark:text-green-300">
                      {correctAns}
                    </span>
                  </div>
                  <div className="p-2.5 bg-red-50 dark:bg-red-950/40 rounded-xl text-center">
                    <span className="text-[10px] text-red-600 dark:text-red-400 uppercase font-bold block">{t('Incorrect', 'తప్పులు')}</span>
                    <span className="text-base font-black text-red-700 dark:text-red-300">
                      {incorrectAns}
                    </span>
                  </div>
                </div>
              );
            })()}

            {/* Answer items */}
            <div className="space-y-2.5">
              {selectedCompletedTest.answers.map((ans, i) => (
                <div
                  key={i}
                  className={`p-3.5 rounded-xl border flex items-center justify-between ${
                    ans.isCorrect
                      ? 'bg-green-50/50 dark:bg-green-950/20 border-green-200 dark:border-green-800/60'
                      : 'bg-red-50/50 dark:bg-red-950/20 border-red-200 dark:border-red-800/60'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    {ans.isCorrect ? (
                      <CheckCircle2 size={18} className="text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle size={18} className="text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <p className="font-bold text-neutral-900 dark:text-white text-xs sm:text-sm">
                        {ans.questionPrompt}
                      </p>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                        {t('Student Answer: ', 'విద్యార్థి సమాధానం: ')}
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
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={() => {
                    handleAllowRetry(selectedCompletedTest.id, selectedCompletedTest.studentName, selectedCompletedTest.chapterTitleEn);
                    setSelectedCompletedTest(null);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw size={14} />
                  <span>{t('Reset & Allow Retry', 'రీసెట్ చేసి రీట్రై ఇవ్వండి')}</span>
                </button>

                {selectedCompletedTest.retake_requested && (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        handleRejectRetake(selectedCompletedTest.id, selectedCompletedTest.studentName, selectedCompletedTest.chapterTitleEn);
                        setSelectedCompletedTest(null);
                      }}
                      className="px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-300 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <XCircle size={14} />
                      <span>{t('Reject Request', 'అభ్యర్థనను తిరస్కరించండి')}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        handleApproveRetake(selectedCompletedTest.id, selectedCompletedTest.studentName, selectedCompletedTest.chapterTitleEn);
                        setSelectedCompletedTest(null);
                      }}
                      className="px-3.5 py-2 rounded-xl bg-[#D4F670] hover:bg-[#bce451] text-black font-extrabold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <CheckCircle2 size={14} />
                      <span>{t('Approve Retake', 'రీటేక్ ఆమోదించండి')}</span>
                    </button>
                  </>
                )}
              </div>

              <button
                type="button"
                onClick={() => setSelectedCompletedTest(null)}
                className="bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 px-4 py-2 rounded-xl font-bold text-xs cursor-pointer"
              >
                {t('Close', 'మూసివేయి')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STUDENT DETAILED ANSWERS MODAL (BLURRED BACKGROUND) */}
      {selectedStudent && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in duration-200"
          onClick={() => setSelectedStudent(null)}
        >
          <div 
            className="bg-white dark:bg-neutral-900 rounded-[28px] max-w-lg w-full p-6 shadow-2xl border border-black/10 dark:border-white/10 relative max-h-[85vh] overflow-y-auto custom-scrollbar animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-neutral-100 dark:border-neutral-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#D4F670]/40 text-black font-bold flex items-center justify-center text-lg">
                  {selectedStudent.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white">{selectedStudent.name}</h3>
                  <span className="text-xs text-neutral-400 dark:text-neutral-500">{selectedStudent.level} • {t('Submission Log', 'సమర్పించిన వివరాలు')}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedStudent(null)}
                className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-500 hover:text-neutral-900 dark:hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Quick stats dynamically calculated from recentAnswers */}
            {(() => {
              const totalAns = selectedStudent.recentAnswers.length;
              const correctAns = selectedStudent.recentAnswers.filter((a) => a.isCorrect).length;
              const incorrectAns = totalAns - correctAns;
              const acc = totalAns > 0 ? `${Math.round((correctAns / totalAns) * 100)}%` : selectedStudent.accuracy;

              return (
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="p-2.5 bg-neutral-50 dark:bg-neutral-800 rounded-xl text-center">
                    <span className="text-[10px] text-neutral-400 uppercase font-bold block">{t('Accuracy', 'ఖచ్చితత్వం')}</span>
                    <span className="text-sm font-bold text-neutral-900 dark:text-white">{acc}</span>
                  </div>
                  <div className="p-2.5 bg-green-50 dark:bg-green-950/40 rounded-xl text-center">
                    <span className="text-[10px] text-green-600 dark:text-green-400 uppercase font-bold block">{t('Correct', 'సరియైనవి')}</span>
                    <span className="text-sm font-bold text-green-700 dark:text-green-300">{correctAns}</span>
                  </div>
                  <div className="p-2.5 bg-red-50 dark:bg-red-950/40 rounded-xl text-center">
                    <span className="text-[10px] text-red-600 dark:text-red-400 uppercase font-bold block">{t('Incorrect', 'తప్పులు')}</span>
                    <span className="text-sm font-bold text-red-700 dark:text-red-300">{incorrectAns}</span>
                  </div>
                </div>
              );
            })()}

            <div className="space-y-2.5">
              {selectedStudent.recentAnswers.map((ans, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-xl border flex items-center justify-between ${
                    ans.isCorrect ? 'bg-green-50/50 dark:bg-green-950/20 border-green-200 dark:border-green-800/60' : 'bg-red-50/50 dark:bg-red-950/20 border-red-200 dark:border-red-800/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {ans.isCorrect ? (
                      <CheckCircle2 size={18} className="text-green-600 dark:text-green-400 shrink-0" />
                    ) : (
                      <XCircle size={18} className="text-red-600 dark:text-red-400 shrink-0" />
                    )}
                    <div>
                      <div className="font-bold text-neutral-900 dark:text-white text-sm flex items-center flex-wrap">
                        {ans.question.split(/([+\-−×÷=])/g).map((part, pIdx) => {
                          if (['+', '-', '−', '×', '÷', '='].includes(part)) {
                            const symbol = part === '-' ? '−' : part;
                            return (
                              <span
                                key={pIdx}
                                className="mx-1 font-black text-neutral-900 dark:text-white text-sm"
                              >
                                {symbol}
                              </span>
                            );
                          }
                          return <span key={pIdx}>{part}</span>;
                        })}
                      </div>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        {t('Answer: ', 'సమాధానం: ')}
                        <span className={ans.isCorrect ? 'font-bold text-green-700 dark:text-green-300' : 'font-bold text-red-700 dark:text-red-300'}>
                          {ans.studentAnswer}
                        </span>
                        {!ans.isCorrect && (
                          <span className="text-neutral-500 dark:text-neutral-400 ml-1.5">
                            ({t('Correct: ', 'సరైనది: ')}<span className="font-semibold text-green-700 dark:text-green-300">{ans.correctAnswer}</span>)
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] text-neutral-400 dark:text-neutral-500">{ans.timestamp}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800 flex justify-end">
              <button
                onClick={() => setSelectedStudent(null)}
                className="bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 px-4 py-2 rounded-xl font-bold text-xs cursor-pointer"
              >
                {t('Close', 'మూసివేయి')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* QUICK ASSIGN TASK MODAL (BLURRED BACKGROUND) */}
      {isAssignModalOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in duration-200"
          onClick={() => setIsAssignModalOpen(false)}
        >
          <div 
            className="bg-white dark:bg-neutral-900 rounded-[28px] max-w-md w-full p-6 shadow-2xl border border-black/10 dark:border-white/10 relative animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-neutral-100 dark:border-neutral-800">
              <div>
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                  {t('Assign Task', 'కొత్త టాస్క్‌ను కేటాయించండి')}
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                  {teacherName || 'Teacher'} • {teacherSubject}
                </p>
              </div>
              <button
                onClick={() => setIsAssignModalOpen(false)}
                className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-500 hover:text-neutral-900 dark:hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleAssignSubmit} className="space-y-3.5">
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">
                  {t('Task Title', 'టాస్క్ శీర్షిక')}
                </label>
                <input
                  type="text"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  placeholder={t('e.g. Chapter 3: 7x Tables Practice', 'ఉదా: అధ్యాయం 3 సాధన')}
                  required
                  className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl px-3.5 py-2.5 text-xs md:text-sm text-neutral-900 dark:text-white focus:border-neutral-900 dark:focus:border-white outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">
                  {t('Instructions (Optional)', 'సూచనలు (ఐచ్ఛికం)')}
                </label>
                <input
                  type="text"
                  value={taskDescription}
                  onChange={(e) => setTaskDescription(e.target.value)}
                  placeholder={t('e.g. Complete 5 practice drills with hints', 'ఉదా: సూచనలతో 5 సాధన ప్రశ్నలను పూర్తి చేయండి')}
                  className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl px-3.5 py-2.5 text-xs md:text-sm text-neutral-900 dark:text-white focus:border-neutral-900 dark:focus:border-white outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">
                  {t('Target Student Level', 'లక్ష్య విద్యార్థి స్థాయి')}
                </label>
                <div className="grid grid-cols-2 gap-2">
                    {(['All', 'Beginner', 'Intermediate', 'Advanced'] as const).map((lvl) => (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() => setTargetLevel(lvl)}
                        className={`p-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          targetLevel === lvl
                            ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 border-neutral-900 dark:border-white shadow-xs'
                            : 'bg-neutral-50 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-700'
                        }`}
                      >
                        {lvl === 'All'
                          ? t('All Students', 'అందరూ')
                          : t(
                              lvl,
                              lvl === 'Beginner'
                                ? 'ప్రారంభం'
                                : lvl === 'Intermediate'
                                ? 'మధ్యస్థం'
                                : 'అధునాతనం'
                            )}
                      </button>
                    ))}
                </div>
              </div>

              {assignedSuccess && (
                <div className="p-2.5 rounded-xl bg-green-100 dark:bg-green-950 text-green-800 dark:text-green-300 text-xs font-bold text-center border border-green-200 dark:border-green-800">
                  {assignedSuccess}
                </div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-[#D4F670] hover:bg-[#bce451] text-black font-bold py-3 rounded-xl text-xs md:text-sm transition-transform active:scale-95 shadow-xs cursor-pointer"
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
