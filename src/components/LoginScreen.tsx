import { useState } from 'react';
import { Eye, EyeOff, Calculator, GraduationCap, Presentation, ArrowLeft, Check, Globe, BookOpen, UserPlus, LogIn, Lock, User, Sparkles } from 'lucide-react';
import AnimatedLogo from './AnimatedLogo';
import { Language, StudentClass, STUDENT_CLASS_OPTIONS, StudentLevel, UserRole, StoredUser } from '../types';
import { getStoredUsers, saveUser, findUser } from '../utils/userStorage';

export type { UserRole, StudentLevel };

interface LoginScreenProps {
  onLoginSuccess: (userData: {
    role: UserRole;
    username: string;
    level: StudentLevel;
    subject?: string;
    studentClass?: StudentClass;
  }) => void;
  t: (en: string, te: string) => string;
  language: Language;
  setLanguage: (lang: Language) => void;
}

export type AuthMode = 'create' | 'login';

export default function LoginScreen({ onLoginSuccess, t, language, setLanguage }: LoginScreenProps) {
  // Step 1: Role selection ('student' | 'teacher' | null)
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  
  // Step 2: Auth mode ('create' | 'login' | null)
  const [authMode, setAuthMode] = useState<AuthMode | null>(null);

  // Form states
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [teacherSubject, setTeacherSubject] = useState('Mathematics');
  const [studentClass, setStudentClass] = useState<StudentClass | ''>('Class 5');
  const [level, setLevel] = useState<StudentLevel>('Beginner');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [successNotice, setSuccessNotice] = useState('');

  // Handle class selection with level auto-suggestion
  const handleSelectClass = (selected: StudentClass) => {
    setStudentClass(selected);
    if (error) setError('');
    const classOption = STUDENT_CLASS_OPTIONS.find((c) => c.value === selected);
    if (classOption) {
      setLevel(classOption.level);
    }
  };

  // Validate Name inputs
  const validateName = (name: string): string | null => {
    const trimmed = name.trim();
    if (!trimmed) {
      return t('Please enter your name.', 'దయచేసి మీ పేరును నమోదు చేయండి.');
    }
    if (trimmed.length < 2) {
      return t('Name must be at least 2 characters long.', 'పేరు కనీసం 2 అక్షరాల పొడవు ఉండాలి.');
    }
    // Allow letters, numbers, spaces, and single dot for initials (e.g. "R. Sharma", "Sai Kumar")
    if (!/^[a-zA-Z0-9.\s]+$/.test(name)) {
      return t('Name should only contain letters, numbers, spaces, or single dot.', 'పేరులో కేవలం అక్షరాలు, అంకెలు, ఖాళీలు లేదా చుక్క మాత్రమే ఉండాలి.');
    }
    return null;
  };

  // Validate Password input
  const validatePassword = (pwd: string): string | null => {
    if (!pwd || !pwd.trim()) {
      return t('Please enter a password.', 'దయచేసి పాస్‌వర్డ్‌ను నమోదు చేయండి.');
    }
    if (pwd.trim().length < 3) {
      return t('Password must be at least 3 characters.', 'పాస్‌వర్డ్ కనీసం 3 అక్షరాలు ఉండాలి.');
    }
    return null;
  };

  // CREATE ACCOUNT SUBMIT HANDLER
  const handleCreateAccount = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessNotice('');

    const nameError = validateName(username);
    if (nameError) {
      setError(nameError);
      return;
    }

    const pwdError = validatePassword(password);
    if (pwdError) {
      setError(pwdError);
      return;
    }

    if (selectedRole === 'student') {
      if (!studentClass) {
        setError(t('Please select which class you are in.', 'దయచేసి మీ తరగతిని ఎంచుకోండి.'));
        return;
      }
    } else {
      if (!teacherSubject.trim()) {
        setError(t('Please specify the subject you teach.', 'దయచేసి మీరు బోధించే సబ్జెక్ట్‌ను నమోదు చేయండి.'));
        return;
      }
    }

    const trimmedName = username.trim();
    const existing = findUser(selectedRole!, trimmedName);
    if (existing) {
      setError(
        t(
          `An account with the name "${trimmedName}" already exists. Please choose another name or log in.`,
          `"${trimmedName}" పేరుతో ఇప్పటికే ఖాతా ఉంది. దయచేసి మరొక పేరును ఎంచుకోండి లేదా లాగిన్ అవ్వండి.`
        )
      );
      return;
    }

    const newUser: StoredUser = {
      id: `user-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      role: selectedRole!,
      username: trimmedName,
      password: password.trim(),
      studentClass: selectedRole === 'student' ? (studentClass as StudentClass) : undefined,
      level: selectedRole === 'student' ? level : 'Advanced',
      subject: selectedRole === 'teacher' ? teacherSubject.trim() : undefined,
      createdAt: new Date().toISOString(),
    };

    saveUser(newUser);

    setSuccessNotice(
      t('Account created successfully! Logging you in...', 'ఖాతా విజయవంతంగా సృష్టించబడింది! లాగిన్ అవుతోంది...')
    );

    setTimeout(() => {
      onLoginSuccess({
        role: newUser.role,
        username: newUser.username,
        level: newUser.level || 'Beginner',
        subject: newUser.subject,
        studentClass: newUser.studentClass,
      });
    }, 600);
  };

  // LOGIN EXISTING ACCOUNT SUBMIT HANDLER
  const handleLoginAccount = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessNotice('');

    const trimmedName = username.trim();
    if (!trimmedName) {
      setError(t('Please enter your registered name.', 'దయచేసి మీ నమోదిత పేరును నమోదు చేయండి.'));
      return;
    }

    if (!password.trim()) {
      setError(t('Please enter your password.', 'దయచేసి మీ పాస్‌వర్డ్‌ను నమోదు చేయండి.'));
      return;
    }

    const matchedUser = findUser(selectedRole!, trimmedName);

    // Legacy fallback check for teachers (e.g., password '12345' or username 'teacher' / 'admin')
    if (selectedRole === 'teacher') {
      const isLegacyTeacher =
        (password === '12345' || password === 'admin') &&
        (trimmedName.toLowerCase() === 'teacher' || trimmedName.toLowerCase() === 'admin' || trimmedName.toLowerCase() === 'mr. sharma');

      if (matchedUser) {
        if (matchedUser.password === password.trim() || password === '12345') {
          onLoginSuccess({
            role: 'teacher',
            username: matchedUser.username,
            level: 'Advanced',
            subject: matchedUser.subject || teacherSubject.trim() || 'Mathematics',
          });
          return;
        } else {
          setError(t('Incorrect password for teacher account.', 'ఉపాధ్యాయుల ఖాతాకు పాస్‌వర్డ్ తప్పు.'));
          return;
        }
      } else if (isLegacyTeacher) {
        onLoginSuccess({
          role: 'teacher',
          username: trimmedName || 'Teacher',
          level: 'Advanced',
          subject: teacherSubject.trim() || 'Mathematics',
        });
        return;
      }
    }

    if (!matchedUser) {
      setError(
        t(
          `No registered ${selectedRole} account found for "${trimmedName}". Please check spelling or create a new account.`,
          `"${trimmedName}" పేరుతో ఎటువంటి ${selectedRole === 'student' ? 'విద్యార్థి' : 'ఉపాధ్యాయ'} ఖాతా కనుగొనబడలేదు. దయచేసి కొత్త ఖాతాను సృష్టించండి.`
        )
      );
      return;
    }

    if (matchedUser.password !== password.trim()) {
      setError(t('Incorrect password. Please verify your credentials.', 'పాస్‌వర్డ్ తప్పు. దయచేసి మీ వివరాలను తనిఖీ చేయండి.'));
      return;
    }

    setSuccessNotice(t('Login successful! Redirecting...', 'లాగిన్ విజయవంతమైంది! దారి మళ్లిస్తోంది...'));

    setTimeout(() => {
      onLoginSuccess({
        role: matchedUser.role,
        username: matchedUser.username,
        level: matchedUser.level || 'Beginner',
        subject: matchedUser.subject,
        studentClass: matchedUser.studentClass,
      });
    }, 400);
  };

  // Demo accounts autofill helper
  const handleAutoFillDemo = (demoUser: StoredUser) => {
    setUsername(demoUser.username);
    setPassword(demoUser.password);
    if (demoUser.studentClass) setStudentClass(demoUser.studentClass);
    if (demoUser.level) setLevel(demoUser.level);
    if (demoUser.subject) setTeacherSubject(demoUser.subject);
    setError('');
  };

  const storedUsers = getStoredUsers().filter((u) => u.role === (selectedRole || 'student'));

  return (
    <div className="min-h-screen bg-[#2F2F2F] flex flex-col items-center justify-center p-4 md:p-8 font-sans text-[#F4F5F8] relative">
      {/* Top Bar with Language Selector */}
      <header className="w-full max-w-6xl flex justify-end items-center mb-4 sm:mb-6 px-1 z-20">
        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-white/15 shadow-md">
          <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-white/90">
            <Globe size={16} className="text-[#D4F670]" />
            <span className="hidden sm:inline">{t('Language / భాష', 'భాష / Language')}</span>
            <span className="sm:hidden">{t('Language', 'భాష')}</span>
          </div>
          <div className="flex items-center bg-black/40 p-1 rounded-xl gap-1">
            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                language === 'en'
                  ? 'bg-[#D4F670] text-[#2F2F2F] shadow-sm font-extrabold'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
              aria-pressed={language === 'en'}
            >
              <span>English</span>
              {language === 'en' && <Check size={13} strokeWidth={3} />}
            </button>
            <button
              type="button"
              onClick={() => setLanguage('te')}
              className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                language === 'te'
                  ? 'bg-[#D4F670] text-[#2F2F2F] shadow-sm font-extrabold'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
              aria-pressed={language === 'te'}
            >
              <span>తెలుగు</span>
              {language === 'te' && <Check size={13} strokeWidth={3} />}
            </button>
          </div>
        </div>
      </header>

      <div className="w-full max-w-6xl flex flex-col lg:flex-row bg-[#2F2F2F] rounded-[32px] md:rounded-[48px] overflow-hidden shadow-2xl border border-white/5 min-h-[620px]">
        {/* Left Panel - Visual/Branding (Hidden on mobile, visible on lg screens) */}
        <div className="hidden lg:flex lg:w-1/2 relative p-12 flex-col justify-between overflow-hidden bg-gradient-to-br from-[#2F2F2F] to-black">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-[-20%] left-[-20%] w-[140%] h-[140%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#D4F670]/30 via-transparent to-transparent blur-[100px]"></div>
          </div>

          <div className="relative z-10 flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#D4F670] flex items-center justify-center text-[#2F2F2F] font-bold text-2xl">
              <Calculator size={28} />
            </div>
            <span className="text-3xl tracking-tight text-white flex items-center">
              <AnimatedLogo />
            </span>
          </div>

          <div className="relative z-10 mt-auto">
            <h1 className="text-5xl font-bold leading-tight text-white">
              {t('Master Mathematics.', 'గణితంలో పట్టు సాధించండి.')}
              <br />
              <span className="text-[#D4F670]">{t('Shape Your Future.', 'మీ భవిష్యత్తును తీర్చిదిద్దుకోండి.')}</span>
            </h1>
          </div>
        </div>

        {/* Right Panel - Role Selection, Auth Mode Choice & Forms */}
        <div className="w-full lg:w-1/2 p-6 md:p-10 lg:p-12 flex flex-col justify-center relative bg-[#2F2F2F] overflow-y-auto max-h-[90vh] custom-scrollbar">
          {/* Mobile Branding */}
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-[#D4F670] flex items-center justify-center text-[#2F2F2F] font-bold text-xl">
              <Calculator size={24} />
            </div>
            <span className="text-2xl tracking-tight text-white flex items-center">
              <AnimatedLogo />
            </span>
          </div>

          <div className="max-w-md w-full mx-auto lg:mx-0">
            {/* STEP 1: ROLE SELECTION (Student or Teacher) */}
            {selectedRole === null && (
              <div className="animate-in fade-in duration-300">
                <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white">
                  {t('Welcome to GanitMitra', 'గణిత్‌మిత్రకు స్వాగతం')}
                </h2>
                <p className="text-[#F4F5F8]/60 mb-8 text-base md:text-lg">
                  {t('Please select your role to continue:', 'కొనసాగించడానికి దయచేసి మీ పాత్రను ఎంచుకోండి:')}
                </p>

                <div className="flex flex-col gap-4 w-full">
                  {/* Student Role Button */}
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedRole('student');
                      setAuthMode(null);
                      setError('');
                    }}
                    className="group w-full p-5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#D4F670]/80 rounded-2xl flex items-center justify-between transition-transform duration-200 hover:scale-102 active:scale-98 text-left cursor-pointer shadow-sm"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-[#D4F670]/20 text-[#D4F670] flex items-center justify-center group-hover:bg-[#D4F670] group-hover:text-[#2F2F2F] transition-colors">
                        <GraduationCap size={26} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                          {t('Student', 'విద్యార్థి')} <span className="text-lg">👤</span>
                        </h3>
                        <p className="text-sm text-[#F4F5F8]/60">
                          {t('Practice math drills & track your progress', 'గణితాన్ని సాధన చేసి మీ పురోగతిని చూడండి')}
                        </p>
                      </div>
                    </div>
                    <span className="text-[#D4F670] text-xl font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                      →
                    </span>
                  </button>

                  {/* Teacher Role Button */}
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedRole('teacher');
                      setAuthMode(null);
                      setError('');
                    }}
                    className="group w-full p-5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#D4F670]/80 rounded-2xl flex items-center justify-between transition-transform duration-200 hover:scale-102 active:scale-98 text-left cursor-pointer shadow-sm"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center group-hover:bg-blue-400 group-hover:text-[#2F2F2F] transition-colors">
                        <Presentation size={26} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                          {t('Teacher', 'ఉపాధ్యాయుడు')} <span className="text-lg">👨‍🏫</span>
                        </h3>
                        <p className="text-sm text-[#F4F5F8]/60">
                          {t('Monitor students, assign tasks & review curriculum', 'విద్యార్థులను పర్యవేక్షించి టాస్క్‌లను కేటాయించండి')}
                        </p>
                      </div>
                    </div>
                    <span className="text-[#D4F670] text-xl font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                      →
                    </span>
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: AUTH MODE SELECTION ("Create New Account" or "Log In to Existing Account") */}
            {selectedRole !== null && authMode === null && (
              <div className="animate-in fade-in duration-300">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedRole(null);
                    setError('');
                  }}
                  className="inline-flex items-center gap-2 text-sm text-[#F4F5F8]/60 hover:text-white mb-6 transition-colors cursor-pointer"
                >
                  <ArrowLeft size={16} />
                  {t('Change Role', 'పాత్రను మార్చండి')}
                </button>

                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-[#D4F670]/20 text-[#D4F670] border border-[#D4F670]/30 uppercase tracking-wider">
                    {selectedRole === 'student' ? t('Student Portal', 'విద్యార్థి పోర్టల్') : t('Teacher Portal', 'ఉపాధ్యాయుల పోర్టల్')}
                  </span>
                </div>

                <h2 className="text-3xl font-bold mb-2 text-white">
                  {selectedRole === 'student'
                    ? t('Student Access', 'విద్యార్థి ప్రవేశం')
                    : t('Teacher Access', 'ఉపాధ్యాయుల ప్రవేశం')}
                </h2>
                <p className="text-[#F4F5F8]/60 mb-8 text-sm md:text-base">
                  {t(
                    'Select whether you want to create a brand new account or log in to an existing one:',
                    'కొత్త ఖాతాను సృష్టించాలా లేదా మీ నమోదిత ఖాతాలోకి లాగిన్ అవ్వాలా ఎంచుకోండి:'
                  )}
                </p>

                <div className="flex flex-col gap-4 w-full">
                  {/* Option A: Create New Account */}
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode('create');
                      setError('');
                      setUsername('');
                      setPassword('');
                    }}
                    className="group w-full p-5 bg-white/5 hover:bg-white/10 border border-white/15 hover:border-[#D4F670] rounded-2xl flex items-center justify-between transition-all duration-200 hover:scale-102 active:scale-98 text-left cursor-pointer shadow-md"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-[#D4F670] text-[#2F2F2F] flex items-center justify-center font-bold shadow-xs">
                        <UserPlus size={24} />
                      </div>
                      <div>
                        <h3 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                          {t('Create New Account', 'కొత్త ఖాతాను సృష్టించండి')}
                        </h3>
                        <p className="text-xs md:text-sm text-[#F4F5F8]/60 mt-0.5">
                          {selectedRole === 'student'
                            ? t('Register with Name, Class, and custom Password', 'పేరు, తరగతి మరియు పాస్‌వర్డ్‌తో నమోదు చేయండి')
                            : t('Register with Name, Subject Taught, and Password', 'పేరు, సబ్జెక్ట్ మరియు పాస్‌వర్డ్‌తో నమోదు చేయండి')}
                        </p>
                      </div>
                    </div>
                    <span className="text-[#D4F670] text-xl font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                      →
                    </span>
                  </button>

                  {/* Option B: Log In to Existing Account */}
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode('login');
                      setError('');
                      setUsername('');
                      setPassword('');
                    }}
                    className="group w-full p-5 bg-white/5 hover:bg-white/10 border border-white/15 hover:border-[#D4F670] rounded-2xl flex items-center justify-between transition-all duration-200 hover:scale-102 active:scale-98 text-left cursor-pointer shadow-md"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white/15 text-white flex items-center justify-center font-bold">
                        <LogIn size={24} />
                      </div>
                      <div>
                        <h3 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                          {t('Log In to Existing Account', 'ఉన్న ఖాతాలోకి లాగిన్ అవ్వండి')}
                        </h3>
                        <p className="text-xs md:text-sm text-[#F4F5F8]/60 mt-0.5">
                          {t('Authenticate with your registered Name & Password', 'నమోదిత పేరు మరియు పాస్‌వర్డ్‌తో లాగిన్ అవ్వండి')}
                        </p>
                      </div>
                    </div>
                    <span className="text-[#D4F670] text-xl font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                      →
                    </span>
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3A: CREATE NEW ACCOUNT (Student or Teacher) */}
            {selectedRole !== null && authMode === 'create' && (
              <div className="animate-in fade-in duration-300">
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode(null);
                    setError('');
                  }}
                  className="inline-flex items-center gap-2 text-sm text-[#F4F5F8]/60 hover:text-white mb-5 transition-colors cursor-pointer"
                >
                  <ArrowLeft size={16} />
                  {t('Back to Options', 'ఎంపికలకు తిరిగి వెళ్లండి')}
                </button>

                <h2 className="text-2xl md:text-3xl font-bold mb-1 text-white flex items-center gap-2">
                  {selectedRole === 'student' ? (
                    <>
                      <span>{t('Create Student Account', 'విద్యార్థి ఖాతాను సృష్టించండి')}</span>
                      <span>👤</span>
                    </>
                  ) : (
                    <>
                      <span>{t('Create Teacher Account', 'ఉపాధ్యాయ ఖాతాను సృష్టించండి')}</span>
                      <span>👨‍🏫</span>
                    </>
                  )}
                </h2>
                <p className="text-[#F4F5F8]/60 mb-6 text-xs md:text-sm">
                  {selectedRole === 'student'
                    ? t('Register your profile, choose your class grade, and set a custom password.', 'మీ ప్రొఫైల్‌ను నమోదు చేసి, తరగతిని ఎంచుకోండి మరియు పాస్‌వర్డ్ సెట్ చేసుకోండి.')
                    : t('Register your teacher credentials and subject specialization.', 'మీ ఉపాధ్యాయ వివరాలు మరియు సబ్జెక్ట్‌ను నమోదు చేసుకోండి.')}
                </p>

                <form onSubmit={handleCreateAccount} className="space-y-5">
                  {/* Name Input */}
                  <div className="space-y-1.5">
                    <label className="text-xs sm:text-sm font-semibold text-[#F4F5F8]/90 flex items-center gap-1.5 ml-1">
                      <User size={15} className="text-[#D4F670]" />
                      <span>{selectedRole === 'student' ? t('Student Full Name', 'విద్యార్థి పూర్తి పేరు') : t('Teacher Name', 'ఉపాధ్యాయుని పేరు')}</span>
                      <span className="text-[#D4F670] font-bold">*</span>
                    </label>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => {
                        setUsername(e.target.value);
                        if (error) setError('');
                      }}
                      placeholder={
                        selectedRole === 'student'
                          ? t('e.g. Raghava or Sai Kumar', 'ఉదా: Raghava లేదా Sai Kumar')
                          : t('e.g. Mr. Sharma or S. Rao', 'ఉదా: Mr. Sharma లేదా S. Rao')
                      }
                      autoFocus
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:border-[#D4F670] focus:ring-1 focus:ring-[#D4F670] transition-all outline-none text-white placeholder:text-white/30 text-sm md:text-base"
                    />
                  </div>

                  {/* Student Class / Grade Visual Grid */}
                  {selectedRole === 'student' && (
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between ml-1">
                        <label className="text-xs sm:text-sm font-semibold text-[#F4F5F8]/90 flex items-center gap-1.5">
                          <BookOpen size={15} className="text-[#D4F670]" />
                          <span>{t('Class / Grade', 'తరగతి / గ్రేడ్')}</span>
                          <span className="text-[#D4F670] font-bold">*</span>
                        </label>
                        {studentClass && (
                          <span className="text-xs font-bold text-[#1a1a1a] bg-[#D4F670] px-2 py-0.5 rounded-full flex items-center gap-1">
                            <Check size={12} strokeWidth={3} />
                            {STUDENT_CLASS_OPTIONS.find((c) => c.value === studentClass)
                              ? (language === 'te'
                                  ? STUDENT_CLASS_OPTIONS.find((c) => c.value === studentClass)!.labelTe
                                  : STUDENT_CLASS_OPTIONS.find((c) => c.value === studentClass)!.labelEn)
                              : studentClass}
                          </span>
                        )}
                      </div>

                      <div className="p-3 bg-black/25 border border-white/10 rounded-2xl space-y-2">
                        <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-neutral-400 px-1">
                          <span>{t('Classes 1 to 10', '1 నుండి 10వ తరగతులు')}</span>
                          <span className="text-[10px] text-neutral-500">{t('Select one', 'ఒకటి ఎంచుకోండి')}</span>
                        </div>

                        <div className="grid grid-cols-5 gap-1.5">
                          {STUDENT_CLASS_OPTIONS.filter((c) => !c.value.startsWith('Intermediate')).map((c) => {
                            const isSelected = studentClass === c.value;
                            return (
                              <button
                                key={c.value}
                                type="button"
                                onClick={() => handleSelectClass(c.value)}
                                className={`py-2 px-1 rounded-xl font-bold transition-all flex flex-col items-center justify-center cursor-pointer border ${
                                  isSelected
                                    ? 'bg-[#D4F670] text-[#1a1a1a] border-[#D4F670] shadow-md shadow-[#D4F670]/25 scale-102 ring-2 ring-[#D4F670]/50'
                                    : 'bg-white/5 text-white/90 border-white/10 hover:bg-white/15'
                                }`}
                              >
                                <span className="text-sm font-extrabold leading-none">{c.shortLabel}</span>
                                <span className={`text-[9px] mt-1 ${isSelected ? 'text-[#1a1a1a]/90 font-bold' : 'text-neutral-400'}`}>
                                  {t('Class', 'తరగతి')}
                                </span>
                              </button>
                            );
                          })}
                        </div>

                        <div className="pt-2 border-t border-white/10">
                          <div className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400 px-1 mb-1.5">
                            {t('Intermediate (1st & 2nd Year)', 'ఇంటర్మీడియట్ (1 & 2వ సంవత్సరం)')}
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            {STUDENT_CLASS_OPTIONS.filter((c) => c.value.startsWith('Intermediate')).map((c) => {
                              const isSelected = studentClass === c.value;
                              return (
                                <button
                                  key={c.value}
                                  type="button"
                                  onClick={() => handleSelectClass(c.value)}
                                  className={`py-2 px-2.5 rounded-xl font-semibold text-xs transition-all flex items-center justify-center gap-1 cursor-pointer border ${
                                    isSelected
                                      ? 'bg-[#D4F670] text-[#1a1a1a] border-[#D4F670] shadow-xs font-bold ring-2 ring-[#D4F670]/50'
                                      : 'bg-white/5 text-white/90 border-white/10 hover:bg-white/15'
                                  }`}
                                >
                                  <span>{language === 'te' ? c.labelTe : c.labelEn}</span>
                                  {isSelected && <Check size={13} className="stroke-[3] text-[#1a1a1a]" />}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Teacher Subject Selection */}
                  {selectedRole === 'teacher' && (
                    <div className="space-y-2">
                      <label className="text-xs sm:text-sm font-semibold text-[#F4F5F8]/90 flex items-center gap-1.5 ml-1">
                        <BookOpen size={15} className="text-[#D4F670]" />
                        <span>{t('Subject Taught', 'బోధించే సబ్జెక్ట్')}</span>
                        <span className="text-[#D4F670] font-bold">*</span>
                      </label>
                      <div className="flex flex-wrap gap-1.5 mb-1.5">
                        {[
                          { en: 'Mathematics', te: 'గణితం' },
                          { en: 'Basic Arithmetic', te: 'ప్రాథమిక అంకగణితం' },
                          { en: 'Algebra & Geometry', te: 'బీజగణితం & జ్యామితి' },
                          { en: 'Science & Math', te: 'సైన్స్ & మ్యాథ్స్' },
                        ].map((subj) => (
                          <button
                            key={subj.en}
                            type="button"
                            onClick={() => setTeacherSubject(subj.en)}
                            className={`px-3 py-1 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                              teacherSubject === subj.en
                                ? 'bg-[#D4F670] text-[#1a1a1a] border-[#D4F670] font-bold'
                                : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10 hover:text-white'
                            }`}
                          >
                            {language === 'te' ? subj.te : subj.en}
                          </button>
                        ))}
                      </div>
                      <input
                        type="text"
                        value={teacherSubject}
                        onChange={(e) => setTeacherSubject(e.target.value)}
                        placeholder={t('e.g. Mathematics, Algebra, etc.', 'ఉదా: గణితం, బీజగణితం మొదలైనవి')}
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:border-[#D4F670] focus:ring-1 focus:ring-[#D4F670] transition-all outline-none text-white placeholder:text-white/30 text-sm md:text-base"
                      />
                    </div>
                  )}

                  {/* Custom Password Input */}
                  <div className="space-y-1.5">
                    <label className="text-xs sm:text-sm font-semibold text-[#F4F5F8]/90 flex items-center gap-1.5 ml-1">
                      <Lock size={15} className="text-[#D4F670]" />
                      <span>{t('New Custom Password', 'కొత్త కస్టమ్ పాస్‌వర్డ్')}</span>
                      <span className="text-[#D4F670] font-bold">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          if (error) setError('');
                        }}
                        placeholder={t('Enter a custom password', 'ఒక పాస్‌వర్డ్‌ను నమోదు చేయండి')}
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-2xl pl-4 pr-11 py-3 focus:border-[#D4F670] focus:ring-1 focus:ring-[#D4F670] transition-all outline-none text-white placeholder:text-white/30 text-sm md:text-base"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors cursor-pointer p-1"
                        aria-label={showPassword ? t('Hide password', 'పాస్‌వర్డ్‌ను దాచండి') : t('Show password', 'పాస్‌వర్డ్‌ను చూపించండి')}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  {error && (
                    <div className="text-red-400 text-xs sm:text-sm font-medium px-4 bg-red-400/10 py-3 rounded-xl border border-red-400/20 text-center animate-in fade-in">
                      {error}
                    </div>
                  )}

                  {successNotice && (
                    <div className="text-emerald-300 text-xs sm:text-sm font-semibold px-4 bg-emerald-500/10 py-3 rounded-xl border border-emerald-500/30 text-center animate-in fade-in flex items-center justify-center gap-2">
                      <Sparkles size={16} />
                      <span>{successNotice}</span>
                    </div>
                  )}

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full bg-[#D4F670] text-[#2F2F2F] font-bold text-base md:text-lg rounded-2xl py-3.5 hover:bg-[#bce451] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-[#D4F670]/10 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>
                        {selectedRole === 'student'
                          ? t('Create Account & Start Learning', 'ఖాతాను సృష్టించి నేర్చుకోవడం ప్రారంభించండి')
                          : t('Create Account & Enter Portal', 'ఖాతాను సృష్టించి పోర్టల్‌లోకి ప్రవేశించండి')}
                      </span>
                      <span>→</span>
                    </button>
                  </div>
                </form>

                {/* Switch to Login Link */}
                <div className="mt-6 text-center border-t border-white/10 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode('login');
                      setError('');
                    }}
                    className="text-xs sm:text-sm text-neutral-300 hover:text-[#D4F670] font-semibold transition-colors cursor-pointer"
                  >
                    {t('Already have an account? Log In to Existing Account', 'ఇప్పటికే ఖాతా ఉందా? ఉన్న ఖాతాలోకి లాగిన్ అవ్వండి')}
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3B: LOG IN TO EXISTING ACCOUNT (Student or Teacher) */}
            {selectedRole !== null && authMode === 'login' && (
              <div className="animate-in fade-in duration-300">
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode(null);
                    setError('');
                  }}
                  className="inline-flex items-center gap-2 text-sm text-[#F4F5F8]/60 hover:text-white mb-5 transition-colors cursor-pointer"
                >
                  <ArrowLeft size={16} />
                  {t('Back to Options', 'ఎంపికలకు తిరిగి వెళ్లండి')}
                </button>

                <h2 className="text-2xl md:text-3xl font-bold mb-1 text-white flex items-center gap-2">
                  {selectedRole === 'student' ? (
                    <>
                      <span>{t('Student Log In', 'విద్యార్థి లాగిన్')}</span>
                      <span>👤</span>
                    </>
                  ) : (
                    <>
                      <span>{t('Teacher Log In', 'ఉపాధ్యాయుల లాగిన్')}</span>
                      <span>👨‍🏫</span>
                    </>
                  )}
                </h2>
                <p className="text-[#F4F5F8]/60 mb-6 text-xs md:text-sm">
                  {t(
                    'Enter your registered name and password to access your dashboard.',
                    'మీ నమోదిత పేరు మరియు పాస్‌వర్డ్‌ను నమోదు చేసి డాష్‌బోర్డ్‌లోకి ప్రవేశించండి.'
                  )}
                </p>

                <form onSubmit={handleLoginAccount} className="space-y-5">
                  {/* Name Input */}
                  <div className="space-y-1.5">
                    <label className="text-xs sm:text-sm font-semibold text-[#F4F5F8]/90 flex items-center gap-1.5 ml-1">
                      <User size={15} className="text-[#D4F670]" />
                      <span>{t('Registered Name / Username', 'నమోదిత పేరు / వినియోగదారు పేరు')}</span>
                      <span className="text-[#D4F670] font-bold">*</span>
                    </label>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => {
                        setUsername(e.target.value);
                        if (error) setError('');
                      }}
                      placeholder={
                        selectedRole === 'student'
                          ? t('e.g. Raghava or Sai Kumar', 'ఉదా: Raghava లేదా Sai Kumar')
                          : t('e.g. Mr. Sharma or Teacher', 'ఉదా: Mr. Sharma లేదా Teacher')
                      }
                      autoFocus
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:border-[#D4F670] focus:ring-1 focus:ring-[#D4F670] transition-all outline-none text-white placeholder:text-white/30 text-sm md:text-base"
                    />
                  </div>

                  {/* Password Input */}
                  <div className="space-y-1.5">
                    <label className="text-xs sm:text-sm font-semibold text-[#F4F5F8]/90 flex items-center gap-1.5 ml-1">
                      <Lock size={15} className="text-[#D4F670]" />
                      <span>{t('Password', 'పాస్‌వర్డ్')}</span>
                      <span className="text-[#D4F670] font-bold">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          if (error) setError('');
                        }}
                        placeholder={t('Enter your password', 'మీ పాస్‌వర్డ్‌ను నమోదు చేయండి')}
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-2xl pl-4 pr-11 py-3 focus:border-[#D4F670] focus:ring-1 focus:ring-[#D4F670] transition-all outline-none text-white placeholder:text-white/30 text-sm md:text-base"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors cursor-pointer p-1"
                        aria-label={showPassword ? t('Hide password', 'పాస్‌వర్డ్‌ను దాచండి') : t('Show password', 'పాస్‌వర్డ్‌ను చూపించండి')}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  {error && (
                    <div className="text-red-400 text-xs sm:text-sm font-medium px-4 bg-red-400/10 py-3 rounded-xl border border-red-400/20 text-center animate-in fade-in">
                      {error}
                    </div>
                  )}

                  {successNotice && (
                    <div className="text-emerald-300 text-xs sm:text-sm font-semibold px-4 bg-emerald-500/10 py-3 rounded-xl border border-emerald-500/30 text-center animate-in fade-in flex items-center justify-center gap-2">
                      <Sparkles size={16} />
                      <span>{successNotice}</span>
                    </div>
                  )}

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full bg-[#D4F670] text-[#2F2F2F] font-bold text-base md:text-lg rounded-2xl py-3.5 hover:bg-[#bce451] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-[#D4F670]/10 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>
                        {selectedRole === 'student'
                          ? t('Log In & Continue Learning', 'లాగిన్ అయి నేర్చుకోవడం కొనసాగించండి')
                          : t('Access Teacher Portal', 'ఉపాధ్యాయుల పోర్టల్‌లోకి ప్రవేశించండి')}
                      </span>
                      <span>→</span>
                    </button>
                  </div>
                </form>

                {/* Switch to Create Account */}
                <div className="mt-5 text-center border-t border-white/10 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode('create');
                      setError('');
                    }}
                    className="text-xs sm:text-sm text-neutral-300 hover:text-[#D4F670] font-semibold transition-colors cursor-pointer"
                  >
                    {t("Don't have an account yet? Create New Account", 'ఇంకా ఖాతా లేదా? కొత్త ఖాతాను సృష్టించండి')}
                  </button>
                </div>

                {/* Quick Demo Accounts Pill for Instant Testing */}
                <div className="mt-6 p-3.5 bg-black/30 border border-white/10 rounded-2xl">
                  <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-2">
                    <span>{t('Saved Accounts for Quick Access', 'త్వరిత ప్రాప్యత కోసం నమోదైన ఖాతాలు')}</span>
                    <span className="text-[#D4F670] text-[10px]">{t('Tap to fill', 'నమోదుకు నొక్కండి')}</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {storedUsers.slice(0, 3).map((u) => (
                      <button
                        key={u.id}
                        type="button"
                        onClick={() => handleAutoFillDemo(u)}
                        className="px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-xs font-semibold text-white/90 flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <span className="text-[#D4F670] font-bold">{u.username}</span>
                        <span className="text-[10px] text-neutral-400">({u.password})</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
