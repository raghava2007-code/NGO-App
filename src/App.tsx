import { useState, useEffect } from 'react';
import { LayoutDashboard, Users, BookOpen, Bell, X, TrendingUp, LogOut, Settings, PlayCircle } from 'lucide-react';
import StudentDashboard from './components/StudentDashboard';
import AdminDashboard from './components/AdminDashboard';
import PracticeScreen from './components/PracticeScreen';
import StudentProgress from './components/StudentProgress';
import StudentSettings from './components/StudentSettings';
import StudentLearn from './components/StudentLearn';
import LoginScreen, { UserRole, StudentLevel } from './components/LoginScreen';
import CustomCursor from './components/CustomCursor';
import AnimatedLogo from './components/AnimatedLogo';
import ThemeToggle from './components/ThemeToggle';
import { AssignedTask, ThemeMode } from './types';

export type StudentViewState = 'student_home' | 'student_learn' | 'student_practice' | 'student_progress' | 'student_settings';
export type Language = 'en' | 'te';

const DEFAULT_ASSIGNED_TASKS: AssignedTask[] = [
  {
    id: 'task-1',
    title: 'Chapter 3: Times Tables 6 & 7 Drill',
    description: 'Complete 5 quick practice questions on 6 and 7 multiplication tables with 80%+ accuracy.',
    targetLevel: 'Intermediate',
    assignedBy: 'Mr. Sharma',
    assignedDate: 'Today',
    dueDate: 'Tomorrow, 5:00 PM',
    status: 'pending',
  },
  {
    id: 'task-2',
    title: 'Number Bonds to 20 Mastery',
    description: 'Review carry-over mechanics and practice splitting numbers to reach friendly tens.',
    targetLevel: 'Beginner',
    assignedBy: 'Mrs. Lakshmi',
    assignedDate: 'Today',
    dueDate: 'Friday, 4:00 PM',
    status: 'pending',
  },
  {
    id: 'task-3',
    title: 'Single-Variable Linear Equations',
    description: 'Practice isolating variables and balancing both sides of equations.',
    targetLevel: 'Advanced',
    assignedBy: 'Mr. Sharma',
    assignedDate: 'Yesterday',
    dueDate: 'Today, 6:00 PM',
    status: 'pending',
  },
];

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [username, setUsername] = useState<string>('');
  const [studentLevel, setStudentLevel] = useState<StudentLevel>('Beginner');
  const [taskProgress, setTaskProgress] = useState<number>(68);
  const [studentView, setStudentView] = useState<StudentViewState>('student_home');
  const [language, setLanguage] = useState<Language>('en');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Theme Management (Light / Dark Mode) with localStorage persistence
  const [theme, setTheme] = useState<ThemeMode>(() => {
    try {
      const savedTheme = localStorage.getItem('ganitmitra_theme');
      if (savedTheme === 'dark' || savedTheme === 'light') {
        return savedTheme;
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem('ganitmitra_theme', theme);
    } catch (e) {
      console.warn('Could not save theme preference:', e);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Task Synchronization (Teacher to Student) with localStorage persistence
  const [tasks, setTasks] = useState<AssignedTask[]>(() => {
    try {
      const saved = localStorage.getItem('ganitmitra_assigned_tasks');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Error reading saved tasks:', e);
    }
    return DEFAULT_ASSIGNED_TASKS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('ganitmitra_assigned_tasks', JSON.stringify(tasks));
    } catch (e) {
      console.warn('Error saving tasks:', e);
    }
  }, [tasks]);

  const handleAssignTask = (newTaskData: Omit<AssignedTask, 'id' | 'assignedDate' | 'status'>) => {
    const newTask: AssignedTask = {
      ...newTaskData,
      id: `task-${Date.now()}`,
      assignedDate: 'Today',
      status: 'pending',
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  };

  const t = (en: string, te: string) => (language === 'en' ? en : te);

  const handleLoginSuccess = (userData: { role: UserRole; username: string; level?: StudentLevel }) => {
    setUserRole(userData.role);
    setUsername(userData.username || (userData.role === 'student' ? 'Student' : 'Teacher'));
    if (userData.level) {
      setStudentLevel(userData.level);
    }
    setIsAuthenticated(true);
    setStudentView('student_home');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    setUsername('');
    setStudentView('student_home');
    setIsMobileMenuOpen(false);
  };

  if (!isAuthenticated) {
    return (
      <>
        <CustomCursor />
        <LoginScreen onLoginSuccess={handleLoginSuccess} t={t} />
      </>
    );
  }

  const isTeacher = userRole === 'teacher';

  const NavItem = ({ view, icon: Icon, label }: { view: StudentViewState; icon: any; label: string }) => (
    <button
      onClick={() => {
        setStudentView(view);
        setIsMobileMenuOpen(false);
      }}
      className={`flex items-center gap-4 px-5 py-4 rounded-full transition-all w-full cursor-pointer ${
        studentView === view
          ? 'bg-white text-black font-semibold shadow-sm'
          : 'text-neutral-400 hover:text-white hover:bg-white/10'
      }`}
    >
      <Icon size={20} />
      <span>{label}</span>
    </button>
  );

  return (
    <>
      <CustomCursor />
      <div className="flex h-screen w-full bg-neutral-900 text-white font-sans overflow-hidden md:p-4 md:gap-4">
        
        {/* Mobile Header */}
        <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-neutral-900 z-50 flex items-center justify-between px-4 border-b border-white/10">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 transition-all cursor-pointer"
          >
            {isMobileMenuOpen ? <X size={20} className="text-white" /> : <LayoutDashboard size={20} className="text-white" />}
            <span className="font-semibold text-white">
              {isTeacher ? t('Teacher Portal', 'ఉపాధ్యాయుల పోర్టల్') : t('Student Menu', 'విద్యార్థి మెను')}
            </span>
          </button>
          
          <div className="flex items-center gap-2">
            <ThemeToggle theme={theme} onToggle={toggleTheme} t={t} />
            <span className="text-lg font-bold text-white tracking-tight flex items-center"><AnimatedLogo /></span>
          </div>
        </div>

        {/* Sidebar Navigation */}
        <aside
          className={`fixed inset-0 z-40 bg-neutral-900 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:w-[280px] flex flex-col justify-between rounded-[32px] overflow-hidden ${
            isMobileMenuOpen ? 'translate-x-0 pt-16' : '-translate-x-full md:pt-0'
          }`}
        >
          <div className="py-8 px-6">
            <div className="hidden md:flex items-center gap-3 mb-10">
              <button
                onClick={() => {
                  if (!isTeacher) setStudentView('student_home');
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 transition-all w-full cursor-pointer"
              >
                <LayoutDashboard size={24} className="text-white shrink-0" />
                <span className="text-xl tracking-tight text-white flex items-center"><AnimatedLogo /></span>
              </button>
            </div>

            {/* Student Specific Navigation */}
            {!isTeacher && (
              <nav className="flex flex-col gap-2">
                <NavItem view="student_home" icon={LayoutDashboard} label={t('Home', 'హోమ్')} />
                <NavItem view="student_learn" icon={BookOpen} label={t('Learn & Revision', 'నేర్చుకోండి & రివిజన్')} />
                <NavItem view="student_practice" icon={PlayCircle} label={t('Practice', 'సాధన')} />
                <NavItem view="student_progress" icon={TrendingUp} label={t('My Progress', 'నా పురోగతి')} />
                <NavItem view="student_settings" icon={Settings} label={t('Settings', 'సెట్టింగ్‌లు')} />
              </nav>
            )}

            {/* Teacher Specific Navigation */}
            {isTeacher && (
              <nav className="flex flex-col gap-2">
                <button
                  className="flex items-center gap-4 px-5 py-4 rounded-full transition-all w-full bg-white text-black font-semibold shadow-sm cursor-pointer"
                >
                  <Users size={20} />
                  <span>{t('Classroom Monitor', 'తరగతి పర్యవేక్షణ')}</span>
                </button>
              </nav>
            )}
          </div>

          {/* Sidebar Footer with Theme Toggle & Logout */}
          <div className="p-6 pb-12 md:pb-6 space-y-3">
            <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-xs font-semibold text-neutral-300">
                {t('Appearance', 'రూపం')}
              </span>
              <ThemeToggle theme={theme} onToggle={toggleTheme} t={t} showLabel />
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-4 px-5 py-4 w-full rounded-full transition-all text-red-400 hover:text-red-300 hover:bg-red-500/10 cursor-pointer font-medium"
            >
              <LogOut size={20} />
              <span>{t('Log Out', 'లాగౌట్')}</span>
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-white mt-16 md:mt-0 md:rounded-[40px] shadow-2xl flex flex-col overflow-hidden relative w-full transition-colors duration-200">
          
          {/* Top Header Bar */}
          <header className="flex justify-between items-center px-6 md:px-10 pt-6 md:pt-8 pb-4 bg-neutral-50 dark:bg-neutral-900 z-10 sticky top-0 border-b border-black/5 dark:border-white/10 md:border-none transition-colors duration-200">
            
            {/* User Profile Info */}
            <div className="flex items-center gap-3">
              <div>
                <h2 className="font-bold text-base md:text-lg leading-tight text-neutral-900 dark:text-white">
                  {username || (isTeacher ? t('Teacher', 'ఉపాధ్యాయుడు') : t('Student', 'విద్యార్థి'))}
                </h2>
                <p className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mt-0.5">
                  {isTeacher
                    ? t('Mathematics Educator', 'గణిత ఉపాధ్యాయుడు')
                    : t(`${studentLevel} Level`, `${studentLevel === 'Beginner' ? 'ప్రారంభ' : studentLevel === 'Intermediate' ? 'మధ్యస్థ' : 'అధునాతన'} స్థాయి`)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 md:gap-3">
              {/* Theme Toggle (Quick Header Access) */}
              <ThemeToggle theme={theme} onToggle={toggleTheme} t={t} />

              {/* Language Switcher */}
              <div className="flex bg-white dark:bg-neutral-800 rounded-full p-1 shadow-xs border border-black/5 dark:border-white/10">
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-semibold transition-all cursor-pointer ${
                    language === 'en'
                      ? 'bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 shadow-xs'
                      : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLanguage('te')}
                  className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-semibold transition-all cursor-pointer ${
                    language === 'te'
                      ? 'bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 shadow-xs'
                      : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                  }`}
                >
                  తెలుగు
                </button>
              </div>

              {/* Notification Bell */}
              <button
                className="w-10 h-10 md:w-11 md:h-11 bg-white dark:bg-neutral-800 rounded-full flex items-center justify-center shadow-xs border border-black/5 dark:border-white/10 relative hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors cursor-pointer"
                title={t('Notifications', 'నోటిఫికేషన్లు')}
              >
                <Bell size={18} className="text-neutral-600 dark:text-neutral-300" />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-[#D4F670] rounded-full border border-white dark:border-neutral-900"></span>
              </button>

              {/* Logout Header Button */}
              <button
                onClick={handleLogout}
                className="w-10 h-10 md:w-11 md:h-11 bg-white dark:bg-neutral-800 rounded-full flex items-center justify-center shadow-xs border border-black/5 dark:border-white/10 relative hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40 dark:hover:text-red-400 transition-colors text-neutral-500 dark:text-neutral-400 cursor-pointer"
                title={t('Log Out', 'లాగౌట్')}
              >
                <LogOut size={18} />
              </button>
            </div>
          </header>

          {/* Scrollable View Content */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-6 md:px-10 pb-10 custom-scrollbar">
            
            {/* TEACHER EXPERIENCE */}
            {isTeacher && (
              <AdminDashboard
                t={t}
                tasks={tasks}
                onAssignTask={handleAssignTask}
                onDeleteTask={handleDeleteTask}
                teacherName={username}
              />
            )}

            {/* STUDENT EXPERIENCE */}
            {!isTeacher && (
              <>
                {studentView === 'student_home' && (
                  <StudentDashboard
                    level={studentLevel}
                    taskProgress={taskProgress}
                    t={t}
                    assignedTasks={tasks}
                    onPractice={() => setStudentView('student_practice')}
                    onLearn={() => setStudentView('student_learn')}
                    onSelectAssignedTask={(_task) => setStudentView('student_practice')}
                  />
                )}

                {studentView === 'student_learn' && (
                  <StudentLearn
                    level={studentLevel}
                    t={t}
                    onPractice={() => setStudentView('student_practice')}
                  />
                )}

                {studentView === 'student_practice' && (
                  <PracticeScreen
                    level={studentLevel}
                    t={t}
                    onBack={() => setStudentView('student_home')}
                    onProgressIncrement={() => setTaskProgress((prev) => Math.min(100, prev + 12))}
                  />
                )}

                {studentView === 'student_progress' && (
                  <StudentProgress t={t} />
                )}

                {studentView === 'student_settings' && (
                  <StudentSettings
                    username={username}
                    level={studentLevel}
                    onLogout={handleLogout}
                    language={language}
                    setLanguage={setLanguage}
                    t={t}
                    theme={theme}
                    onToggleTheme={toggleTheme}
                  />
                )}
              </>
            )}

          </div>
        </main>
      </div>
    </>
  );
}

export default App;
