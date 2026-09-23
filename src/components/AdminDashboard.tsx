import React, { useState } from 'react';
import { Plus, CheckCircle2, XCircle, AlertTriangle, X, Users, BookOpen, ClipboardList, Trash2 } from 'lucide-react';
import { AssignedTask, StudentLevel } from '../types';

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
  teacherSubject = 'Mathematics',
}: AdminDashboardProps) {
  const [students] = useState<StudentRecord[]>(initialStudents);
  const [selectedStudent, setSelectedStudent] = useState<StudentRecord | null>(null);
  const [activeTab, setActiveTab] = useState<'tasks' | 'students' | 'curriculum'>('tasks');
  
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
        <div className="flex items-center gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('tasks')}
            className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
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

          <button
            onClick={() => setActiveTab('students')}
            className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
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
            className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
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
                        {task.targetLevel === 'All' ? t('All Students', 'అందరికీ') : task.targetLevel}
                      </span>
                      <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 size={12} />
                        {t('Synced', 'సింక్ అయింది')}
                      </span>
                      <span className="text-[11px] text-neutral-400 dark:text-neutral-500">
                        • {task.assignedDate}
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

      {/* TAB 2: STUDENT ROSTER & DETAILED ANSWER LOGS */}
      {activeTab === 'students' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">
              {t('Click "Inspect Answers" to review individual student submissions and error patterns.', 'విద్యార్థుల వ్యక్తిగత సమాధానాలు మరియు తప్పులను సమీక్షించడానికి క్లిక్ చేయండి.')}
            </span>
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
                        {student.level}
                      </span>
                      <span className="text-[11px] text-neutral-400 dark:text-neutral-500">•</span>
                      <span className="text-[11px] text-neutral-400 dark:text-neutral-500">
                        {student.lastActive}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 flex-wrap md:justify-end">
                  <div className="text-center px-2">
                    <span className="text-[10px] text-neutral-400 dark:text-neutral-500 uppercase font-bold block">{t('Accuracy', 'ఖచ్చితత్వం')}</span>
                    <span className="text-sm font-bold text-neutral-900 dark:text-white">{student.accuracy}</span>
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-50 dark:bg-green-950/40 rounded-lg text-xs font-semibold text-green-700 dark:text-green-300">
                    <CheckCircle2 size={13} />
                    <span>{student.correctCount}</span>
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-red-50 dark:bg-red-950/40 rounded-lg text-xs font-semibold text-red-700 dark:text-red-300">
                    <XCircle size={13} />
                    <span>{student.incorrectCount}</span>
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
                      {item.chapter}
                    </span>
                    <h4 className="text-sm md:text-base font-bold text-neutral-900 dark:text-white">
                      {item.subtopic}
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
                      {item.difficulty} {t('Difficulty', 'కష్టం')}
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

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="p-2.5 bg-neutral-50 dark:bg-neutral-800 rounded-xl text-center">
                <span className="text-[10px] text-neutral-400 uppercase font-bold block">{t('Accuracy', 'ఖచ్చితత్వం')}</span>
                <span className="text-sm font-bold text-neutral-900 dark:text-white">{selectedStudent.accuracy}</span>
              </div>
              <div className="p-2.5 bg-green-50 dark:bg-green-950/40 rounded-xl text-center">
                <span className="text-[10px] text-green-600 dark:text-green-400 uppercase font-bold block">{t('Correct', 'సరియైనవి')}</span>
                <span className="text-sm font-bold text-green-700 dark:text-green-300">{selectedStudent.correctCount}</span>
              </div>
              <div className="p-2.5 bg-red-50 dark:bg-red-950/40 rounded-xl text-center">
                <span className="text-[10px] text-red-600 dark:text-red-400 uppercase font-bold block">{t('Incorrect', 'తప్పులు')}</span>
                <span className="text-sm font-bold text-red-700 dark:text-red-300">{selectedStudent.incorrectCount}</span>
              </div>
            </div>

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
                                className="inline-flex items-center justify-center px-1.5 py-0.5 mx-0.5 rounded-md bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 font-black text-xs shadow-xs"
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
                      {lvl === 'All' ? t('All Students', 'అందరూ') : lvl}
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
