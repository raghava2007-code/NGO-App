import { useState, useEffect } from 'react';
import { LayoutDashboard, Users, BookOpen, Bell, X, TrendingUp, LogOut, Settings, PlayCircle, ClipboardList, ArrowRight, CheckCircle2, GraduationCap, WifiOff } from 'lucide-react';
import StudentDashboard from './components/StudentDashboard';
import AdminDashboard from './components/AdminDashboard';
import PracticeScreen from './components/PracticeScreen';
import StudentProgress from './components/StudentProgress';
import StudentSettings from './components/StudentSettings';
import StudentLearn from './components/StudentLearn';
import LoginScreen, { UserRole, StudentLevel } from './components/LoginScreen';
import AnimatedLogo from './components/AnimatedLogo';
import ThemeToggle from './components/ThemeToggle';
import RoleBasedSearchBar from './components/RoleBasedSearchBar';
import { AssignedTask, ThemeMode, StudentClass, STUDENT_CLASS_OPTIONS } from './types';
import { subscribeNetworkStatus } from './utils/offlineSync';

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
  const [studentClass, setStudentClass] = useState<StudentClass>(() => {
    try {
      const saved = localStorage.getItem('ganitmitra_student_class');
      if (saved) return saved as StudentClass;
    } catch {
      // fallback
    }
    return 'Class 1';
  });
  const [taskProgress, setTaskProgress] = useState<number>(68);
  const [studentView, setStudentView] = useState<StudentViewState>('student_home');
  const [selectedChapterId, setSelectedChapterId] = useState<string>('c1-ch1');
  const [language, setLanguage] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('ganitmitra_language');
      if (saved === 'en' || saved === 'te') {
        return saved;
      }
    } catch {
      // fallback
    }
    return 'en';
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isOnline, setIsOnline] = useState<boolean>(() => (typeof navigator !== 'undefined' ? navigator.onLine : true));

  useEffect(() => {
    const unsubscribe = subscribeNetworkStatus((online) => {
      setIsOnline(online);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('ganitmitra_language', language);
    } catch {
      // ignore
    }
  }, [language]);

  // Theme Management (Light / Dark Mode) with localStorage persistence
  const [teacherSubject, setTeacherSubject] = useState<string>(() => {
    try {
      return localStorage.getItem('ganitmitra_teacher_subject') || 'Mathematics';
    } catch {
      return 'Mathematics';
    }
  });

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

  const [isTaskNotificationsOpen, setIsTaskNotificationsOpen] = useState(false);

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

  const handleLoginSuccess = (userData: {
    role: UserRole;
    username: string;
    level?: StudentLevel;
    subject?: string;
    studentClass?: StudentClass;
  }) => {
    setUserRole(userData.role);
    setUsername(userData.username || (userData.role === 'student' ? 'Student' : 'Teacher'));
    if (userData.level) {
      setStudentLevel(userData.level);
    }
    if (userData.studentClass) {
      setStudentClass(userData.studentClass);
      try {
        localStorage.setItem('ganitmitra_student_class', userData.studentClass);
        const studentProfile = {
          username: userData.username,
          studentClass: userData.studentClass,
          level: userData.level,
          role: userData.role,
          updatedAt: new Date().toISOString(),
        };
        localStorage.setItem('ganitmitra_student_profile', JSON.stringify(studentProfile));
      } catch (e) {
        console.warn('Could not save student class / profile:', e);
      }
    }
    if (userData.subject) {
      setTeacherSubject(userData.subject);
      try {
        localStorage.setItem('ganitmitra_teacher_subject', userData.subject);
      } catch (e) {
        console.warn('Could not save teacher subject:', e);
      }
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
      <LoginScreen
        onLoginSuccess={handleLoginSuccess}
        t={t}
        language={language}
        setLanguage={setLanguage}
      />
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
    <div className="flex h-screen w-full bg-neutral-900 text-white font-sans overflow-hidden md:p-3 lg:p-4 md:gap-3 lg:gap-4">
        
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
          className={`fixed inset-0 z-40 bg-neutral-900 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:w-[240px] lg:w-[270px] xl:w-[280px] shrink-0 flex flex-col justify-between rounded-[28px] lg:rounded-[32px] overflow-hidden ${
            isMobileMenuOpen ? 'translate-x-0 pt-16' : '-translate-x-full md:pt-0'
          }`}
        >
          <div className="py-6 lg:py-8 px-4 lg:px-6">
            <div className="hidden md:flex items-center gap-3 mb-8 lg:mb-10">
              <button
                onClick={() => {
                  if (!isTeacher) setStudentView('student_home');
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center gap-3 px-3.5 lg:px-4 py-2.5 lg:py-3 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 transition-all w-full cursor-pointer"
              >
                <LayoutDashboard size={22} className="text-white shrink-0" />
                <span className="text-lg lg:text-xl tracking-tight text-white flex items-center"><AnimatedLogo /></span>
              </button>
            </div>

            {/* Student Specific Navigation */}
            {!isTeacher && (
              <nav className="flex flex-col gap-1.5 lg:gap-2">
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
                  className="flex items-center gap-3 lg:gap-4 px-4 lg:px-5 py-3.5 lg:py-4 rounded-full transition-all w-full bg-white text-black font-semibold shadow-sm cursor-pointer text-sm lg:text-base"
                >
                  <Users size={18} />
                  <span>{t('Classroom Monitor', 'తరగతి పర్యవేక్షణ')}</span>
                </button>
              </nav>
            )}
          </div>

          {/* Sidebar Footer with Selected Tags just above Log Out */}
          <div className="p-3 sm:p-4 lg:p-6 pb-8 sm:pb-6 mt-auto flex flex-col gap-2.5 lg:gap-3">
            {/* Selected Tags placed at bottom left of the sidebar */}
            {!isTeacher && (
              <div className="p-2.5 lg:p-3.5 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/10 text-left select-none space-y-1.5 lg:space-y-2.5 transition-all">
                <div className="flex items-center justify-between gap-1.5">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-6 h-6 lg:w-7 lg:h-7 rounded-lg bg-[#D4F670] text-[#1a1a1a] font-extrabold text-xs flex items-center justify-center shrink-0 shadow-xs">
                      {username ? username.charAt(0).toUpperCase() : 'S'}
                    </div>
                    <span className="text-xs font-bold text-white truncate max-w-[80px] lg:max-w-[100px]">
                      {username || t('Student', 'విద్యార్థి')}
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[10px] lg:text-xs font-black px-2 py-0.5 rounded-lg bg-[#D4F670] text-[#1a1a1a] shrink-0 shadow-xs">
                    <GraduationCap size={12} className="shrink-0" />
                    <span>
                      {STUDENT_CLASS_OPTIONS.find((c) => c.value === studentClass)
                        ? (language === 'te'
                            ? STUDENT_CLASS_OPTIONS.find((c) => c.value === studentClass)!.labelTe
                            : STUDENT_CLASS_OPTIONS.find((c) => c.value === studentClass)!.labelEn)
                        : studentClass}
                    </span>
                  </span>
                </div>

                <div className="flex items-center gap-1.5 flex-wrap pt-0.5 border-t border-white/10">
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-white/15 text-white/90">
                    {t(studentLevel, studentLevel === 'Beginner' ? 'ప్రారంభం' : studentLevel === 'Intermediate' ? 'మధ్యస్థం' : 'అధునాతనం')}
                  </span>
                  <span className="text-[10px] font-medium text-neutral-300">
                    {STUDENT_CLASS_OPTIONS.find((c) => c.value === studentClass)
                      ? t(
                          STUDENT_CLASS_OPTIONS.find((c) => c.value === studentClass)!.categoryEn,
                          STUDENT_CLASS_OPTIONS.find((c) => c.value === studentClass)!.categoryTe
                        )
                      : t('School', 'పాఠశాల')}
                  </span>
                </div>
              </div>
            )}

            {isTeacher && (
              <div className="p-2.5 lg:p-3.5 rounded-2xl bg-white/10 border border-white/10 text-left select-none">
                <div className="flex items-center justify-between gap-1.5 mb-1">
                  <span className="text-xs lg:text-sm font-bold text-white truncate">
                    {username || t('Teacher', 'ఉపాధ్యాయుడు')}
                  </span>
                  <span className="text-[10px] lg:text-[11px] font-extrabold px-2 py-0.5 rounded-full bg-[#D4F670] text-[#1a1a1a]">
                    {teacherSubject === 'Mathematics' ? t('Mathematics', 'గణితం') : teacherSubject === 'Basic Arithmetic' ? t('Basic Arithmetic', 'ప్రాథమిక అంకగణితం') : teacherSubject === 'Algebra & Geometry' ? t('Algebra & Geometry', 'బీజగణితం & జ్యామితి') : teacherSubject === 'Science & Math' ? t('Science & Math', 'సైన్స్ & మ్యాథ్స్') : teacherSubject}
                  </span>
                </div>
                <span className="text-[10px] text-neutral-300 font-medium">
                  {t('Educator Portal', 'ఉపాధ్యాయ పోర్టల్')}
                </span>
              </div>
            )}

            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-2.5 lg:py-3 w-full rounded-full transition-all text-red-400 hover:text-red-300 hover:bg-red-500/10 cursor-pointer font-medium text-xs lg:text-sm"
            >
              <LogOut size={16} />
              <span>{t('Log Out', 'లాగౌట్')}</span>
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-white mt-16 md:mt-0 md:rounded-[32px] lg:rounded-[40px] shadow-2xl flex flex-col overflow-hidden relative w-full transition-colors duration-200">
          
          {/* Top Header Bar */}
          <header className="px-4 sm:px-6 lg:px-8 xl:px-10 pt-3 md:pt-4 lg:pt-5 pb-3 bg-neutral-50 dark:bg-neutral-900 z-30 sticky top-0 border-b border-black/5 dark:border-white/10 md:border-none transition-colors duration-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5 md:gap-3">
              
              {/* User Profile Info & Mobile Actions */}
              <div className="flex items-center justify-between gap-2 shrink-0">
                <div>
                  <h2 className="font-bold text-sm sm:text-base md:text-lg leading-tight text-neutral-900 dark:text-white truncate">
                    {username || (isTeacher ? t('Teacher', 'ఉపాధ్యాయుడు') : t('Student', 'విద్యార్థి'))}
                  </h2>
                </div>

                {/* Mobile Quick Action Buttons */}
                <div className="flex items-center gap-1.5 md:hidden">
                  <ThemeToggle theme={theme} onToggle={toggleTheme} t={t} />
                  <button
                    onClick={() => setIsTaskNotificationsOpen(true)}
                    className="w-9 h-9 bg-white dark:bg-neutral-800 rounded-full flex items-center justify-center shadow-xs border border-black/5 dark:border-white/10 relative hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors cursor-pointer"
                    title={t('Assigned Tasks Notifications', 'కేటాయించిన పనుల నోటిఫికేషన్లు')}
                    aria-label={t('Assigned Tasks Notifications', 'కేటాయించిన పనుల నోటిఫికేషన్లు')}
                  >
                    <Bell size={16} className="text-neutral-600 dark:text-neutral-300" />
                    {tasks.length > 0 && (
                      <span className="absolute -top-1 -right-1 min-w-[18px] h-4 px-1 bg-[#D4F670] text-[#1a1a1a] rounded-full text-[10px] font-extrabold flex items-center justify-center border-2 border-white dark:border-neutral-900 shadow-xs">
                        {tasks.length}
                      </span>
                    )}
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-9 h-9 bg-white dark:bg-neutral-800 rounded-full flex items-center justify-center shadow-xs border border-black/5 dark:border-white/10 text-neutral-500 hover:text-red-500 transition-colors cursor-pointer"
                    title={t('Log Out', 'లాగౌట్')}
                  >
                    <LogOut size={16} />
                  </button>
                </div>
              </div>

              {/* Universal Role-Based Search Bar */}
              <div className="flex-1 min-w-0 max-w-full md:max-w-xs lg:max-w-sm xl:max-w-md md:mx-2">
                <RoleBasedSearchBar
                  userRole={userRole || 'student'}
                  t={t}
                  language={language}
                  setLanguage={setLanguage}
                  studentLevel={studentLevel}
                  onNavigate={(view) => setStudentView(view)}
                  onOpenTasksModal={() => setIsTaskNotificationsOpen(true)}
                  onToggleTheme={toggleTheme}
                  tasksCount={tasks.length}
                />
              </div>

              {/* Desktop Actions */}
              <div className="hidden md:flex items-center gap-1.5 lg:gap-2.5 shrink-0">
                {/* Theme Toggle (Quick Header Access) */}
                <ThemeToggle theme={theme} onToggle={toggleTheme} t={t} />

                {/* Language Switcher */}
                <div className="flex items-center bg-white dark:bg-neutral-800 rounded-full p-1 shadow-xs border border-black/5 dark:border-white/10" title="Language / భాష">
                  <button
                    type="button"
                    onClick={() => setLanguage('en')}
                    className={`px-2 lg:px-3 py-1 lg:py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                      language === 'en'
                        ? 'bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 shadow-xs'
                        : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                    }`}
                    aria-pressed={language === 'en'}
                  >
                    <span>EN</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setLanguage('te')}
                    className={`px-2 lg:px-3 py-1 lg:py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                      language === 'te'
                        ? 'bg-[#D4F670] text-[#2F2F2F] shadow-xs font-extrabold'
                        : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                    }`}
                    aria-pressed={language === 'te'}
                  >
                    <span>తెలుగు</span>
                  </button>
                </div>

                {/* Notification Bell with Tasks indicator */}
                <button
                  onClick={() => setIsTaskNotificationsOpen(true)}
                  className="w-9 h-9 lg:w-10 lg:h-10 bg-white dark:bg-neutral-800 rounded-full flex items-center justify-center shadow-xs border border-black/5 dark:border-white/10 relative hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors cursor-pointer shrink-0"
                  title={t('Assigned Tasks Notifications', 'కేటాయించిన పనుల నోటిఫికేషన్లు')}
                  aria-label={t('Assigned Tasks Notifications', 'కేటాయించిన పనుల నోటిఫికేషన్లు')}
                >
                  <Bell size={16} className="text-neutral-600 dark:text-neutral-300" />
                  {tasks.length > 0 && (
                    <span className="absolute -top-1 -right-1 min-w-[18px] h-4.5 px-1 bg-[#D4F670] text-[#1a1a1a] rounded-full text-[10px] font-extrabold flex items-center justify-center border-2 border-white dark:border-neutral-900 shadow-xs">
                      {tasks.length}
                    </span>
                  )}
                </button>

                {/* Logout Header Button */}
                <button
                  onClick={handleLogout}
                  className="w-9 h-9 lg:w-10 lg:h-10 bg-white dark:bg-neutral-800 rounded-full flex items-center justify-center shadow-xs border border-black/5 dark:border-white/10 relative hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40 dark:hover:text-red-400 transition-colors text-neutral-500 dark:text-neutral-400 cursor-pointer shrink-0"
                  title={t('Log Out', 'లాగౌట్')}
                >
                  <LogOut size={16} />
                </button>
              </div>
            </div>
          </header>

          {/* Scrollable View Content */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 xl:px-10 pb-10 custom-scrollbar">
            
            {/* Offline Mode Active Notification Banner */}
            {!isOnline && (
              <div className="mb-4 mt-2 p-3 rounded-2xl bg-amber-500/15 border border-amber-500/40 text-amber-900 dark:text-amber-200 text-xs sm:text-sm font-semibold flex items-center justify-between gap-2 shadow-xs animate-in fade-in">
                <div className="flex items-center gap-2">
                  <WifiOff size={16} className="text-amber-600 dark:text-amber-400 shrink-0" />
                  <span>
                    {t(
                      'Offline Mode Active • Lessons, tests & progress are safely saved locally via Service Worker.',
                      'ఆఫ్‌లైన్ మోడ్ యాక్టివ్‌గా ఉంది • పాఠాలు, పరీక్షలు & పురోగతి స్థానికంగా భద్రపరచబడ్డాయి.'
                    )}
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-800 dark:text-amber-300 text-[10px] font-bold shrink-0">
                  {t('Saved Locally', 'సేవ్ చేయబడింది')}
                </span>
              </div>
            )}
            
            {/* TEACHER EXPERIENCE */}
            {isTeacher && (
              <AdminDashboard
                t={t}
                tasks={tasks}
                onAssignTask={handleAssignTask}
                onDeleteTask={handleDeleteTask}
                teacherName={username}
                teacherSubject={teacherSubject}
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
                    studentName={username}
                    studentClass={studentClass}
                    onSelectChapter={(chapterId, action) => {
                      setSelectedChapterId(chapterId);
                      setStudentView(action === 'learn' ? 'student_learn' : 'student_practice');
                    }}
                    language={language}
                  />
                )}

                {studentView === 'student_learn' && (
                  <StudentLearn
                    level={studentLevel}
                    t={t}
                    language={language}
                    onPractice={(chapterId) => {
                      if (chapterId) setSelectedChapterId(chapterId);
                      setStudentView('student_practice');
                    }}
                    studentClass={studentClass}
                    selectedChapterId={selectedChapterId}
                    onSelectChapter={(id) => setSelectedChapterId(id)}
                  />
                )}

                {studentView === 'student_practice' && (
                  <PracticeScreen
                    level={studentLevel}
                    t={t}
                    language={language}
                    onBack={() => setStudentView('student_home')}
                    onProgressIncrement={() => setTaskProgress((prev) => Math.min(100, prev + 12))}
                    studentClass={studentClass}
                    selectedChapterId={selectedChapterId}
                    onNavigateToProgress={() => setStudentView('student_progress')}
                    studentName={username}
                  />
                )}

                {studentView === 'student_progress' && (
                  <StudentProgress
                    t={t}
                    studentName={username}
                    studentClass={studentClass}
                    onGoToPractice={(chapterId) => {
                      if (chapterId) setSelectedChapterId(chapterId);
                      setStudentView('student_practice');
                    }}
                  />
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
                    studentClass={studentClass}
                  />
                )}
              </>
            )}

          </div>
        </main>

        {/* Task Notifications Modal Window in Middle with Blurred Background */}
        {isTaskNotificationsOpen && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200"
            onClick={() => setIsTaskNotificationsOpen(false)}
          >
            <div
              className="relative w-full max-w-lg bg-white dark:bg-neutral-900 rounded-[32px] shadow-2xl border border-black/10 dark:border-white/10 p-6 md:p-7 overflow-hidden z-10 animate-in zoom-in-95 duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-neutral-100 dark:border-neutral-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#D4F670] text-black flex items-center justify-center shadow-xs">
                    <ClipboardList size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-neutral-900 dark:text-white leading-tight">
                      {t('Assigned Tasks', 'కేటాయించిన పనులు')}
                    </h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      {tasks.length === 1 
                        ? t('1 active task from teacher', 'ఉపాధ్యాయుని నుండి 1 యాక్టివ్ టాస్క్') 
                        : t(`${tasks.length} active tasks from teacher`, `ఉపాధ్యాయుని నుండి ${tasks.length} యాక్టివ్ టాస్క్‌లు`)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsTaskNotificationsOpen(false)}
                  className="w-9 h-9 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-500 hover:text-neutral-900 dark:hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                  aria-label={t('Close', 'మూసివేయి')}
                >
                  <X size={18} />
                </button>
              </div>

              <div className="max-h-[60vh] overflow-y-auto space-y-3 pr-1 custom-scrollbar">
                {tasks.length === 0 ? (
                  <div className="text-center py-10 px-4">
                    <div className="w-12 h-12 rounded-2xl bg-neutral-100 dark:bg-neutral-800 text-neutral-400 flex items-center justify-center mx-auto mb-3">
                      <ClipboardList size={24} />
                    </div>
                    <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                      {t('No tasks assigned yet', 'ఇంకా టాస్క్‌లు ఏవీ కేటాయించబడలేదు')}
                    </p>
                    <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-1 max-w-xs mx-auto">
                      {t('When the teacher assigns math drills, they will appear here.', 'ఉపాధ్యాయుడు లెక్కల సాధనను కేటాయించినప్పుడు అవి ఇక్కడ కనిపిస్తాయి.')}
                    </p>
                  </div>
                ) : (
                  tasks.map((task) => (
                    <div
                      key={task.id}
                      className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/70 border border-neutral-200/80 dark:border-neutral-700/60 hover:border-[#D4F670]/80 transition-all group"
                    >
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#D4F670]/30 text-neutral-900 dark:text-[#D4F670] border border-[#D4F670]/40">
                          {task.targetLevel === 'All'
                            ? t('All Levels', 'అన్ని స్థాయిలు')
                            : t(
                                task.targetLevel,
                                task.targetLevel === 'Beginner'
                                  ? 'ప్రారంభం'
                                  : task.targetLevel === 'Intermediate'
                                  ? 'మధ్యస్థం'
                                  : 'అధునాతనం'
                              )}
                        </span>
                        <span className="text-[11px] text-neutral-400 dark:text-neutral-500 font-medium">
                          {task.assignedDate === 'Today'
                            ? t('Today', 'ఈరోజు')
                            : task.assignedDate === 'Yesterday'
                            ? t('Yesterday', 'నిన్న')
                            : task.assignedDate}
                        </span>
                      </div>
                      <h4 className="font-bold text-sm text-neutral-900 dark:text-white mb-1 group-hover:text-emerald-600 dark:group-hover:text-[#D4F670] transition-colors">
                        {task.title}
                      </h4>
                      <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed mb-3">
                        {task.description}
                      </p>
                      <div className="flex items-center justify-between pt-2 border-t border-neutral-200/60 dark:border-neutral-700/40">
                        <span className="text-[11px] text-neutral-400 dark:text-neutral-500">
                          {t('Assigned by:', 'కేటాయించినది:')} <strong className="text-neutral-700 dark:text-neutral-300 font-semibold">{task.assignedBy}</strong>
                        </span>
                        {!isTeacher ? (
                          <button
                            onClick={() => {
                              setIsTaskNotificationsOpen(false);
                              setStudentView('student_practice');
                            }}
                            className="px-3.5 py-1.5 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-bold hover:bg-black dark:hover:bg-neutral-200 transition-all flex items-center gap-1.5 cursor-pointer"
                          >
                            <span>{t('Start Task', 'టాస్క్ ప్రారంభించండి')}</span>
                            <ArrowRight size={13} />
                          </button>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">
                            <CheckCircle2 size={13} />
                            {t('Synced with class', 'తరగతితో సింక్ అయింది')}
                          </span>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>

              {tasks.length > 0 && (
                <div className="pt-4 mt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                  <span className="text-xs text-neutral-400 dark:text-neutral-500">
                    {t('Real-time sync active', 'రియల్-టైమ్ సింక్ యాక్టివ్')}
                  </span>
                  <button
                    onClick={() => setIsTaskNotificationsOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
                  >
                    {t('Close', 'మూసివేయి')}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  export default App;
