import { useState, useRef, useEffect, useMemo } from 'react';
import { Search, X, PlayCircle, BookOpen, TrendingUp, Settings, Bell, Globe, SunMoon, ArrowRight, ShieldCheck, LucideIcon } from 'lucide-react';
import { UserRole, StudentViewState, Language, StudentLevel } from '../types';

export interface SearchItem {
  id: string;
  titleEn: string;
  titleTe: string;
  categoryEn: string;
  categoryTe: string;
  descriptionEn: string;
  descriptionTe: string;
  keywords: string[];
  icon: LucideIcon;
  role: 'student' | 'teacher';
  action: () => void;
}

interface RoleBasedSearchBarProps {
  userRole: UserRole;
  t: (en: string, te: string) => string;
  language: Language;
  setLanguage: (lang: Language) => void;
  studentLevel?: StudentLevel;
  onNavigate: (view: StudentViewState) => void;
  onOpenTasksModal: () => void;
  onToggleTheme: () => void;
  onOpenAssignModal?: () => void;
  tasksCount?: number;
}

export default function RoleBasedSearchBar({
  userRole,
  t,
  setLanguage,
  studentLevel = 'Beginner',
  onNavigate,
  onOpenTasksModal,
  onToggleTheme,
  onOpenAssignModal,
  tasksCount = 0,
}: RoleBasedSearchBarProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        inputRef.current?.blur();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Strict role-specific index catalogue
  const searchIndex: SearchItem[] = useMemo(() => {
    // 1. STRICT STUDENT CATALOGUE
    // Under NO circumstances are any teacher tools, analytics, or roster logs included here.
    const studentCatalog: SearchItem[] = [
      {
        id: 'student-practice',
        titleEn: 'Math Practice Drills',
        titleTe: 'గణిత సాధన డ్రిల్స్',
        categoryEn: 'Practice',
        categoryTe: 'సాధన',
        descriptionEn: `Interactive math problems tailored for ${studentLevel} level with instant feedback`,
        descriptionTe: `${studentLevel} స్థాయికి తగిన తక్షణ సమాధానాలతో ఇంటరాక్టివ్ ప్రశ్నలు`,
        keywords: ['practice', 'drill', 'quiz', 'test', 'questions', 'math', 'problems', 'సాధన', 'లెక్కలు', 'ప్రశ్నలు'],
        icon: PlayCircle,
        role: 'student',
        action: () => onNavigate('student_practice'),
      },
      {
        id: 'student-learn',
        titleEn: 'Learn & Revision Guide',
        titleTe: 'నేర్చుకోండి & రివిజన్ గైడ్',
        categoryEn: 'Learning & Concepts',
        categoryTe: 'అధ్యయనం & భావనలు',
        descriptionEn: 'Step-by-step breakdown of math concepts and mental math techniques',
        descriptionTe: 'గణిత భావనలు మరియు మానసిక గణిత పద్ధతుల వివరణలు',
        keywords: ['learn', 'revision', 'concepts', 'lessons', 'study', 'formulas', 'examples', 'నేర్చుకోండి', 'రివిజన్', 'పాఠాలు', 'ఉదాహరణలు'],
        icon: BookOpen,
        role: 'student',
        action: () => onNavigate('student_learn'),
      },
      {
        id: 'topic-number-bonds',
        titleEn: 'Topic: Number Bonds to 10',
        titleTe: 'అంశం: 10 కి సంఖ్య బంధాలు',
        categoryEn: 'Topics',
        categoryTe: 'అంశాలు',
        descriptionEn: 'Learn how to split numbers to reach 10 quickly for mental addition',
        descriptionTe: 'త్వరిత కూడిక కోసం 10 కి సంఖ్యలను విభజించడం నేర్చుకోండి',
        keywords: ['number bonds', 'addition', 'making 10', 'plus', 'add', 'కూడిక', 'సంఖ్య బంధాలు'],
        icon: BookOpen,
        role: 'student',
        action: () => onNavigate('student_learn'),
      },
      {
        id: 'topic-multiplication',
        titleEn: 'Topic: Multiplication & Times Tables',
        titleTe: 'అంశం: గుణకారం & ఎక్కాలు',
        categoryEn: 'Topics',
        categoryTe: 'అంశాలు',
        descriptionEn: 'Distributive property, arrays, and times tables tips',
        descriptionTe: 'గుణకార పట్టికలు మరియు వ్యూహాత్మక పద్ధతులు',
        keywords: ['multiplication', 'tables', 'times', 'arrays', 'multiply', 'గుణకారం', 'ఎక్కాలు'],
        icon: BookOpen,
        role: 'student',
        action: () => onNavigate('student_learn'),
      },
      {
        id: 'topic-division',
        titleEn: 'Topic: Division & Equal Sharing',
        titleTe: 'అంశం: భాగహారం & సమాన పంపకం',
        categoryEn: 'Topics',
        categoryTe: 'అంశాలు',
        descriptionEn: 'Understanding division as the inverse of multiplication',
        descriptionTe: 'గుణకారానికి వ్యతిరేక ప్రక్రియగా భాగహారాన్ని అర్థం చేసుకోండి',
        keywords: ['division', 'divide', 'sharing', 'quotient', 'remainder', 'భాగహారం', 'భాగాహారం'],
        icon: BookOpen,
        role: 'student',
        action: () => onNavigate('student_learn'),
      },
      {
        id: 'topic-equations',
        titleEn: 'Topic: Balancing Equations',
        titleTe: 'అంశం: సరళ సమీకరణాలు',
        categoryEn: 'Topics',
        categoryTe: 'అంశాలు',
        descriptionEn: 'Single-variable algebra, isolating variables with balance scale method',
        descriptionTe: 'బీజగణిత సమీకరణాలను సులభంగా సాధించడం',
        keywords: ['algebra', 'equations', 'variables', 'balance', 'solve x', 'సమీకరణాలు'],
        icon: BookOpen,
        role: 'student',
        action: () => onNavigate('student_learn'),
      },
      {
        id: 'student-progress',
        titleEn: 'My Learning Progress',
        titleTe: 'నా పురోగతి రికార్డు',
        categoryEn: 'Progress',
        categoryTe: 'పురోగతి',
        descriptionEn: 'Track completed drills, accuracy rate, and achievement milestones',
        descriptionTe: 'పూర్తయిన సాధనలు, ఖచ్చితత్వం మరియు విజయాలను చూడండి',
        keywords: ['progress', 'score', 'accuracy', 'stats', 'achievements', 'completed', 'పురోగతి', 'స్కోరు'],
        icon: TrendingUp,
        role: 'student',
        action: () => onNavigate('student_progress'),
      },
      {
        id: 'student-tasks',
        titleEn: 'Assigned Tasks from Teacher',
        titleTe: 'ఉపాధ్యాయుని నుండి కేటాయించిన పనులు',
        categoryEn: 'Assignments',
        categoryTe: 'అసైన్‌మెంట్లు',
        descriptionEn: `${tasksCount} active homework assignment${tasksCount === 1 ? '' : 's'} assigned by your teacher`,
        descriptionTe: `ఉపాధ్యాయుడు కేటాయించిన ${tasksCount} యాక్టివ్ హోంవర్క్ టాస్క్‌లు`,
        keywords: ['tasks', 'assigned', 'homework', 'notifications', 'teacher', 'బాధ్యతలు', 'టాస్క్‌లు', 'నోటిఫికేషన్లు'],
        icon: Bell,
        role: 'student',
        action: () => onOpenTasksModal(),
      },
      {
        id: 'student-settings',
        titleEn: 'Student Settings',
        titleTe: 'విద్యార్థి సెట్టింగ్‌లు',
        categoryEn: 'Settings',
        categoryTe: 'సెట్టింగ్‌లు',
        descriptionEn: 'Adjust student audio, read-aloud voice speed, and display preferences',
        descriptionTe: 'ఆడియో, వాయిస్ వేగం మరియు ప్రదర్శన ఎంపికలను సరిచేయండి',
        keywords: ['settings', 'preferences', 'profile', 'sound', 'voice', 'సెట్టింగ్‌లు'],
        icon: Settings,
        role: 'student',
        action: () => onNavigate('student_settings'),
      },
      {
        id: 'lang-telugu',
        titleEn: 'Switch Language to Telugu (తెలుగు)',
        titleTe: 'భాషను తెలుగుకు మార్చండి',
        categoryEn: 'Language',
        categoryTe: 'భాష',
        descriptionEn: 'Set the entire application interface and voice explanations to Telugu',
        descriptionTe: 'యాప్ మరియు వాయిస్ వివరణలను తెలుగులో వినండి',
        keywords: ['telugu', 'language', 'తెలుగు', 'భాష'],
        icon: Globe,
        role: 'student',
        action: () => setLanguage('te'),
      },
      {
        id: 'lang-english',
        titleEn: 'Switch Language to English',
        titleTe: 'భాషను ఇంగ్లీషుకు మార్చండి',
        categoryEn: 'Language',
        categoryTe: 'భాష',
        descriptionEn: 'Set the interface and voice narration to English',
        descriptionTe: 'ఇంటర్‌ఫేస్ మరియు వాయిస్ వివరణను ఇంగ్లీషులో వినండి',
        keywords: ['english', 'language', 'ఇంగ్లీష్', 'భాష'],
        icon: Globe,
        role: 'student',
        action: () => setLanguage('en'),
      },
      {
        id: 'theme-toggle',
        titleEn: 'Toggle Dark / Light Mode',
        titleTe: 'డార్క్ / లైట్ మోడ్ మార్చండి',
        categoryEn: 'Appearance',
        categoryTe: 'రూపం',
        descriptionEn: 'Switch color theme between high-contrast dark and clean light mode',
        descriptionTe: 'డార్క్ మరియు లైట్ థీమ్ మధ్య మారండి',
        keywords: ['theme', 'dark', 'light', 'mode', 'color', 'థీమ్'],
        icon: SunMoon,
        role: 'student',
        action: () => onToggleTheme(),
      },
    ];

    // 2. STRICT TEACHER CATALOGUE
    // Only available when userRole === 'teacher'
    const teacherCatalog: SearchItem[] = [
      {
        id: 'teacher-tasks',
        titleEn: 'Assignments & Active Tasks',
        titleTe: 'కేటాయించిన పనులు & టాస్క్‌లు',
        categoryEn: 'Teacher Tools',
        categoryTe: 'ఉపాధ్యాయ సాధనాలు',
        descriptionEn: 'View and manage all active homework assignments synced to students',
        descriptionTe: 'విద్యార్థులకు ఇచ్చిన హోంవర్క్ టాస్క్‌లను నిర్వహించండి',
        keywords: ['assignments', 'tasks', 'homework', 'manage', 'టాస్క్‌లు'],
        icon: ShieldCheck,
        role: 'teacher',
        action: () => {
          // Stay on teacher dashboard
        },
      },
      {
        id: 'teacher-assign-new',
        titleEn: 'Assign New Math Task (+)',
        titleTe: 'కొత్త గణిత టాస్క్‌ను కేటాయించండి (+)',
        categoryEn: 'Teacher Actions',
        categoryTe: 'ఉపాధ్యాయ చర్యలు',
        descriptionEn: 'Create and dispatch a new exercise set to Beginner, Intermediate, or All students',
        descriptionTe: 'విద్యార్థులకు కొత్త సాధన టాస్క్‌ను వెంటనే కేటాయించండి',
        keywords: ['assign', 'new task', 'create assignment', 'add homework', 'కొత్త టాస్క్'],
        icon: PlayCircle,
        role: 'teacher',
        action: () => {
          if (onOpenAssignModal) onOpenAssignModal();
        },
      },
      {
        id: 'teacher-submissions',
        titleEn: 'Student Test Submissions & Logs',
        titleTe: 'విద్యార్థుల పరీక్ష సమర్పణలు & సమాధానాలు',
        categoryEn: 'Classroom Data',
        categoryTe: 'తరగతి సమాచారం',
        descriptionEn: 'Inspect question-by-question student submissions and retake requests',
        descriptionTe: 'విద్యార్థుల సమాధానాలు మరియు రీటేక్ అభ్యర్థనలను పరిశీలించండి',
        keywords: ['submissions', 'students', 'answers', 'inspect', 'tests', 'విద్యార్థులు'],
        icon: ShieldCheck,
        role: 'teacher',
        action: () => {
          // Focuses submissions
        },
      },
      {
        id: 'teacher-curriculum',
        titleEn: 'Curriculum Health & Topic Difficulty',
        titleTe: 'పాఠ్యప్రణాళిక విశ్లేషణ & కష్టతర అంశాలు',
        categoryEn: 'Analytics',
        categoryTe: 'విశ్లేషణలు',
        descriptionEn: 'Analyze pass rates and high error areas like long division & carry-over',
        descriptionTe: 'ఎక్కువ తప్పులు జరుగుతున్న అధ్యాయాలను విశ్లేషించండి',
        keywords: ['curriculum', 'analytics', 'difficulty', 'pass rate', 'errors', 'విశ్లేషణ'],
        icon: TrendingUp,
        role: 'teacher',
        action: () => {},
      },
      {
        id: 'teacher-lang-te',
        titleEn: 'Switch Language to Telugu (తెలుగు)',
        titleTe: 'భాషను తెలుగుకు మార్చండి',
        categoryEn: 'Language',
        categoryTe: 'భాష',
        descriptionEn: 'Switch teacher portal to Telugu',
        descriptionTe: 'పోర్టల్‌ను తెలుగులో చూడండి',
        keywords: ['telugu', 'language', 'తెలుగు'],
        icon: Globe,
        role: 'teacher',
        action: () => setLanguage('te'),
      },
      {
        id: 'teacher-lang-en',
        titleEn: 'Switch Language to English',
        titleTe: 'భాషను ఇంగ్లీషుకు మార్చండి',
        categoryEn: 'Language',
        categoryTe: 'భాష',
        descriptionEn: 'Switch teacher portal to English',
        descriptionTe: 'పోర్టల్‌ను ఇంగ్లీషులో చూడండి',
        keywords: ['english', 'language', 'ఇంగ్లీష్'],
        icon: Globe,
        role: 'teacher',
        action: () => setLanguage('en'),
      },
      {
        id: 'teacher-theme',
        titleEn: 'Toggle Dark / Light Mode',
        titleTe: 'డార్క్ / లైట్ మోడ్ మార్చండి',
        categoryEn: 'Appearance',
        categoryTe: 'రూపం',
        descriptionEn: 'Toggle theme appearance',
        descriptionTe: 'థీమ్ మార్చండి',
        keywords: ['theme', 'dark', 'light'],
        icon: SunMoon,
        role: 'teacher',
        action: () => onToggleTheme(),
      },
    ];

    // Return STRICTLY based on role
    return userRole === 'teacher' ? teacherCatalog : studentCatalog;
  }, [userRole, studentLevel, tasksCount, onNavigate, onOpenTasksModal, onToggleTheme, onOpenAssignModal, setLanguage]);

  // Filter items matching query
  const filteredResults = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) {
      // When empty and focused, show quick top recommendations
      return searchIndex.slice(0, 5);
    }

    return searchIndex.filter((item) => {
      const matchTitleEn = item.titleEn.toLowerCase().includes(trimmed);
      const matchTitleTe = item.titleTe.toLowerCase().includes(trimmed);
      const matchCategoryEn = item.categoryEn.toLowerCase().includes(trimmed);
      const matchCategoryTe = item.categoryTe.toLowerCase().includes(trimmed);
      const matchDescEn = item.descriptionEn.toLowerCase().includes(trimmed);
      const matchDescTe = item.descriptionTe.toLowerCase().includes(trimmed);
      const matchKeywords = item.keywords.some((k) => k.toLowerCase().includes(trimmed));

      return (
        matchTitleEn ||
        matchTitleTe ||
        matchCategoryEn ||
        matchCategoryTe ||
        matchDescEn ||
        matchDescTe ||
        matchKeywords
      );
    });
  }, [query, searchIndex]);

  const handleSelect = (item: SearchItem) => {
    item.action();
    setIsOpen(false);
    setQuery('');
    inputRef.current?.blur();
  };

  const isStudent = userRole === 'student';

  return (
    <div ref={containerRef} className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
      {/* Search Input Container */}
      <div className="relative flex items-center">
        <Search
          size={16}
          className="absolute left-3.5 text-neutral-400 dark:text-neutral-500 pointer-events-none transition-colors"
        />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (!isOpen) setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && filteredResults.length > 0) {
              handleSelect(filteredResults[0]);
            }
          }}
          placeholder={
            isStudent
              ? t('Search topics, practice, revision...', 'విషయాలు, సాధన, రివిజన్ వెతకండి...')
              : t('Search teacher tools, submissions, tasks...', 'ఉపాధ్యాయ సాధనాలు, సమర్పణలు, టాస్క్‌లు...')
          }
          className="w-full pl-9 pr-8 py-2 md:py-2.5 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 text-xs md:text-sm rounded-full border border-black/10 dark:border-white/10 shadow-xs focus:outline-none focus:ring-2 focus:ring-[#D4F670] dark:focus:ring-[#D4F670] transition-all"
          aria-label={t('Search GanitMitra features', 'గణిత్‌మిత్ర ఫీచర్లను వెతకండి')}
          autoComplete="off"
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery('');
              inputRef.current?.focus();
            }}
            className="absolute right-3 p-1 rounded-full text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors cursor-pointer"
            title={t('Clear search', 'వెతుకులాటను తొలగించండి')}
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Auto-suggest Results Dropdown */}
      {isOpen && (
        <div className="absolute left-0 right-0 mt-2 bg-white dark:bg-neutral-900 rounded-2xl md:rounded-3xl shadow-2xl border border-black/10 dark:border-white/10 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150 max-h-[75vh] flex flex-col">
          {/* Category / Context Header */}
          <div className="px-4 py-2.5 bg-neutral-50 dark:bg-neutral-800/80 border-b border-black/5 dark:border-white/5 flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            <span>
              {query.trim()
                ? t(`Search Results (${filteredResults.length})`, `ఫలితాలు (${filteredResults.length})`)
                : t('Suggested Shortcuts', 'సూచించబడిన షార్ట్‌కట్‌లు')}
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 font-extrabold">
              {isStudent ? t('Student Mode', 'విద్యార్థి మోడ్') : t('Teacher Mode', 'ఉపాధ్యాయుల మోడ్')}
            </span>
          </div>

          {/* Results List */}
          <div className="overflow-y-auto divide-y divide-neutral-100 dark:divide-neutral-800/60 p-1.5 custom-scrollbar">
            {filteredResults.length === 0 ? (
              <div className="p-6 text-center text-neutral-500 dark:text-neutral-400">
                <p className="text-sm font-semibold mb-1">
                  {t('No matching features found', 'ఎటువంటి ఫలితాలు కనుగొనబడలేదు')}
                </p>
                <p className="text-xs opacity-75">
                  {isStudent
                    ? t('Try searching for "practice", "fractions", "bonds", or "progress"', '"సాధన", "కూడిక", "రివిజన్", లేదా "పురోగతి" అని వెతకండి')
                    : t('Try searching for "assignments", "submissions", or "curriculum"', '"టాస్క్", "సమర్పణలు", లేదా "విశ్లేషణ" అని వెతకండి')}
                </p>
              </div>
            ) : (
              filteredResults.map((item) => {
                const ItemIcon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item)}
                    className="w-full px-3.5 py-2.5 rounded-xl flex items-center justify-between gap-3 text-left hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors group cursor-pointer"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-xl bg-neutral-100 dark:bg-neutral-800 group-hover:bg-[#D4F670] dark:group-hover:bg-[#D4F670] text-neutral-700 dark:text-neutral-300 group-hover:text-black dark:group-hover:text-black flex items-center justify-center shrink-0 transition-colors">
                        <ItemIcon size={16} />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs md:text-sm font-bold text-neutral-900 dark:text-white truncate">
                            {t(item.titleEn, item.titleTe)}
                          </span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 font-semibold shrink-0">
                            {t(item.categoryEn, item.categoryTe)}
                          </span>
                        </div>
                        <p className="text-[11px] text-neutral-500 dark:text-neutral-400 truncate mt-0.5">
                          {t(item.descriptionEn, item.descriptionTe)}
                        </p>
                      </div>
                    </div>

                    <div className="opacity-0 group-hover:opacity-100 transition-opacity text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white shrink-0 pl-2">
                      <ArrowRight size={14} />
                    </div>
                  </button>
                );
              })
            )}
          </div>

          {/* Quick Footer with Keyboard Hint */}
          <div className="px-4 py-2 bg-neutral-50 dark:bg-neutral-800/50 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-[11px] text-neutral-400 dark:text-neutral-500">
            <span>{t('Press Enter to open first result', 'మొదటి ఫలితాన్ని తెరవడానికి Enter నొక్కండి')}</span>
            <span>{t('ESC to close', 'మూసివేయడానికి ESC')}</span>
          </div>
        </div>
      )}
    </div>
  );
}
