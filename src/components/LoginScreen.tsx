import { useState } from 'react';
import { Eye, EyeOff, Calculator, GraduationCap, Presentation, Check, Globe, Lock, User, Sparkles, BookOpen, ArrowRight } from 'lucide-react';
import AnimatedLogo from './AnimatedLogo';
import { Language, StudentClass, STUDENT_CLASS_OPTIONS, StudentLevel, UserRole, StoredUser } from '../types';
import { saveUser, findUser, requestPasswordReset } from '../utils/userStorage';

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

export type AuthMode = 'login' | 'create';

export default function LoginScreen({ onLoginSuccess, t, language, setLanguage }: LoginScreenProps) {
  // Role & Mode State (Defaults to Student Log In for the most streamlined experience)
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const [authMode, setAuthMode] = useState<AuthMode>('login');

  // Form states
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [studentClass, setStudentClass] = useState<StudentClass>('Class 1');
  const [selectedLevel, setSelectedLevel] = useState<StudentLevel>('Beginner');
  const [teacherSubject, setTeacherSubject] = useState('Mathematics');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [successNotice, setSuccessNotice] = useState('');

  // Forgot Password Request Modal States & Handlers
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [resetStudentUsername, setResetStudentUsername] = useState('');
  const [resetStudentClass, setResetStudentClass] = useState<StudentClass>('Class 1');
  const [requestSubmitted, setRequestSubmitted] = useState(false);
  const [forgotPasswordError, setForgotPasswordError] = useState('');
  const [forgotPasswordSuccess, setForgotPasswordSuccess] = useState('');

  const handleRequestPasswordReset = (e: React.FormEvent) => {
    e.preventDefault();
    setForgotPasswordError('');
    setForgotPasswordSuccess('');
    const trimmedName = resetStudentUsername.trim();
    if (!trimmedName) {
      setForgotPasswordError(t('Please enter your name.', 'దయచేసి మీ పేరును నమోదు చేయండి.'));
      return;
    }

    const success = requestPasswordReset(trimmedName, resetStudentClass);
    if (success) {
      setRequestSubmitted(true);
      setForgotPasswordSuccess(
        t(
          'Request sent to teacher. Please wait.',
          'ఉపాధ్యాయునికి అభ్యర్థన పంపబడింది. దయచేసి వేచి ఉండండి.'
        )
      );
      setTimeout(() => {
        setIsForgotPasswordOpen(false);
        setResetStudentUsername('');
        setRequestSubmitted(false);
        setForgotPasswordSuccess('');
      }, 2500);
    } else {
      setForgotPasswordError(
        t(
          'Student account not found with this name and class.',
          'ఈ పేరు మరియు తరగతితో విద్యార్థి ఖాతా కనుగొనబడలేదు.'
        )
      );
    }
  };



  // Validation
  const validateInputs = () => {
    const trimmedName = username.trim();
    if (!trimmedName) {
      return t('Please enter your name.', 'దయచేసి మీ పేరును నమోదు చేయండి.');
    }
    if (trimmedName.length < 2) {
      return t('Name must be at least 2 characters long.', 'పేరు కనీసం 2 అక్షరాల పొడవు ఉండాలి.');
    }
    if (!password.trim()) {
      return t('Please enter a password.', 'దయచేసి పాస్‌వర్డ్‌ను నమోదు చేయండి.');
    }
    if (password.trim().length < 3) {
      return t('Password must be at least 3 characters.', 'పాస్‌వర్డ్ కనీసం 3 అక్షరాలు ఉండాలి.');
    }
    return null;
  };

  // Submit Handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessNotice('');

    const validationError = validateInputs();
    if (validationError) {
      setError(validationError);
      return;
    }

    const trimmedName = username.trim();
    const trimmedPassword = password.trim();

    if (authMode === 'create') {
      // Create Account Flow
      const existing = findUser(selectedRole, trimmedName);
      if (existing) {
        setError(
          t(
            `An account with the name "${trimmedName}" already exists. Please choose another name or switch to Log In.`,
            `"${trimmedName}" పేరుతో ఇప్పటికే ఖాతా ఉంది. దయచేసి మరొక పేరును ఎంచుకోండి లేదా లాగిన్ అవ్వండి.`
          )
        );
        return;
      }

      const level = selectedRole === 'student' ? selectedLevel : 'Advanced';
      const newUser: StoredUser = {
        id: `user-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        role: selectedRole,
        username: trimmedName,
        password: trimmedPassword,
        studentClass: selectedRole === 'student' ? studentClass : undefined,
        level: level,
        subject: selectedRole === 'teacher' ? teacherSubject.trim() || 'Mathematics' : undefined,
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
      }, 500);
    } else {
      // Log In Flow
      const matchedUser = findUser(selectedRole, trimmedName);

      if (!matchedUser) {
        setError(
          t(
            `No ${selectedRole} account found for "${trimmedName}". Please check your name or create a new account.`,
            `"${trimmedName}" పేరుతో ${selectedRole === 'student' ? 'విద్యార్థి' : 'ఉపాధ్యాయ'} ఖాతా ఏదీ లేదు. దయచేసి తనిఖీ చేయండి లేదా కొత్త ఖాతా సృష్టించండి.`
          )
        );
        return;
      }

      if (matchedUser.password !== trimmedPassword) {
        setError(t('Incorrect password. Please verify your credentials.', 'పాస్‌వర్డ్ తప్పు. దయచేసి సరైన పాస్‌వర్డ్ నమోదు చేయండి.'));
        return;
      }

      setSuccessNotice(t('Login successful! Redirecting...', 'లాగిన్ విజయవంతమైంది! దారి మళ్లిస్తోంది...'));

      setTimeout(() => {
        const studentLevelFromClass = matchedUser.studentClass
          ? STUDENT_CLASS_OPTIONS.find((c) => c.value === matchedUser.studentClass)?.level
          : undefined;
        onLoginSuccess({
          role: matchedUser.role,
          username: matchedUser.username,
          level: selectedRole === 'student'
            ? (matchedUser.level || studentLevelFromClass || 'Beginner')
            : (matchedUser.level || 'Advanced'),
          subject: matchedUser.subject,
          studentClass: matchedUser.studentClass,
        });
      }, 400);
    }

  };

  return (
    <div className="min-h-[calc(100vh-48px)] flex-1 bg-[#1F1F1F] flex flex-col items-center justify-center p-3 sm:p-6 md:p-8 font-sans font-light text-[#F4F5F8] relative">
      {/* Top Bar with Language Selector */}
      <header className="w-full max-w-5xl flex justify-between items-center mb-3 sm:mb-6 px-2 z-20">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#D4F670] flex items-center justify-center text-[#1a1a1a] font-black text-base shadow-sm">
            <Calculator size={18} />
          </div>
          <span className="text-xl font-bold tracking-tight text-white flex items-center">
            <AnimatedLogo />
          </span>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-1.5 bg-neutral-800/90 backdrop-blur-md p-1 rounded-2xl border border-white/10 shadow-sm">
            <Globe size={14} className="text-[#D4F670] ml-2 hidden sm:inline" />
            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                language === 'en'
                  ? 'bg-[#D4F670] text-[#1a1a1a] shadow-xs'
                  : 'text-neutral-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>English</span>
              {language === 'en' && <Check size={12} strokeWidth={3} />}
            </button>
            <button
              type="button"
              onClick={() => setLanguage('te')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                language === 'te'
                  ? 'bg-[#D4F670] text-[#1a1a1a] shadow-xs'
                  : 'text-neutral-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>తెలుగు</span>
              {language === 'te' && <Check size={12} strokeWidth={3} />}
            </button>
          </div>

          {/* Official NGO Logo (top-right of login page) */}
          <img
            src="/ngo-logo.png"
            alt="NGO Logo"
            className="h-9 sm:h-11 w-auto max-w-[120px] sm:max-w-[160px] object-contain rounded-md"
            onError={(e) => {
              // Hide broken image placeholder until file is uploaded
              (e.currentTarget as HTMLElement).style.display = 'none';
            }}
            onLoad={(e) => {
              (e.currentTarget as HTMLElement).style.display = 'block';
            }}
          />
        </div>
      </header>

      {/* Main Unified Card */}
      <div className="w-full max-w-5xl flex flex-col lg:flex-row bg-neutral-900 rounded-[32px] md:rounded-[40px] overflow-hidden shadow-2xl border border-white/10 min-h-[560px]">
        {/* Left Hero Panel (Large Screens) */}
        <div className="hidden lg:flex lg:w-5/12 relative p-10 flex-col justify-between overflow-hidden bg-gradient-to-br from-neutral-900 via-neutral-950 to-black border-r border-white/5">
          <div className="space-y-4 relative z-10">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-black tracking-wider uppercase bg-[#D4F670]/20 text-[#D4F670] border border-[#D4F670]/30">
              {t('Interactive Math Learning', 'ఇంటరాక్టివ్ గణిత సాధన')}
            </span>
            <h1 className="text-3xl xl:text-4xl font-black leading-tight text-white">
              {t('Master Mathematics.', 'గణితంలో పట్టు సాధించండి.')}
              <br />
              <span className="text-[#D4F670]">
                {t('One Step at a Time.', 'సులభమైన దశలతో.')}
              </span>
            </h1>
            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
              {t(
                'Personalized class-based learning with visual diagrams, bilingual voice guidance, and real-time teacher synchronization.',
                'దృశ్య రేఖాచిత్రాలు, ద్విభాషా వాయిస్ మార్గదర్శకత్వం మరియు ఉపాధ్యాయ పర్యవేక్షణతో వ్యక్తిగతీకరించిన గణితం.'
              )}
            </p>
          </div>

          {/* Value props badges */}
          <div className="space-y-2.5 relative z-10 pt-6 border-t border-white/10">
            <div className="flex items-center gap-2.5 text-xs font-semibold text-neutral-300">
              <span className="w-5 h-5 rounded-full bg-[#D4F670]/20 text-[#D4F670] flex items-center justify-center text-[10px] font-bold">✓</span>
              <span>{t('Class 1 to 10 & Intermediate Math', '1 నుండి 10వ తరగతి & ఇంటర్మీడియట్ గణితం')}</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs font-semibold text-neutral-300">
              <span className="w-5 h-5 rounded-full bg-[#D4F670]/20 text-[#D4F670] flex items-center justify-center text-[10px] font-bold">✓</span>
              <span>{t('Instant scoring & retake management', 'తక్షణ స్కోరింగ్ & రీటేక్ నిర్వహణ')}</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs font-semibold text-neutral-300">
              <span className="w-5 h-5 rounded-full bg-[#D4F670]/20 text-[#D4F670] flex items-center justify-center text-[10px] font-bold">✓</span>
              <span>{t('Telugu & English Bilingual interface', 'తెలుగు మరియు ఇంగ్లీష్ ద్విభాషా ఇంటర్‌ఫేస్')}</span>
            </div>
          </div>
        </div>

        {/* Right Form Panel (Unified, Direct, Minimalist) */}
        <div className="w-full lg:w-7/12 p-6 sm:p-8 md:p-10 flex flex-col justify-center bg-neutral-900">
          <div className="max-w-md w-full mx-auto space-y-6">
            
            {/* 1. ROLE SELECTOR (Student vs Teacher) */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block">
                {t('I am a:', 'నేను:')}
              </label>
              <div className="grid grid-cols-2 gap-2 p-1.5 bg-neutral-800/90 rounded-2xl border border-white/5">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedRole('student');
                    setError('');
                  }}
                  className={`py-2.5 px-3 rounded-xl font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    selectedRole === 'student'
                      ? 'bg-[#D4F670] text-[#1a1a1a] shadow-sm font-black'
                      : 'text-neutral-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <GraduationCap size={18} />
                  <span>{t('Student', 'విద్యార్థి')}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedRole('teacher');
                    setError('');
                  }}
                  className={`py-2.5 px-3 rounded-xl font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    selectedRole === 'teacher'
                      ? 'bg-[#D4F670] text-[#1a1a1a] shadow-sm font-black'
                      : 'text-neutral-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Presentation size={18} />
                  <span>{t('Teacher', 'ఉపాధ్యాయుడు')}</span>
                </button>
              </div>
            </div>

            {/* 2. AUTH MODE TOGGLE (Log In vs Create Account) */}
            <div className="flex border-b border-white/10">
              <button
                type="button"
                onClick={() => {
                  setAuthMode('login');
                  setError('');
                  setSuccessNotice('');
                }}
                className={`flex-1 pb-3 text-sm sm:text-base font-extrabold transition-all cursor-pointer relative ${
                  authMode === 'login'
                    ? 'text-white'
                    : 'text-neutral-500 hover:text-neutral-300'
                }`}
              >
                <span>{t('Log In', 'లాగిన్')}</span>
                {authMode === 'login' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D4F670] rounded-full"></div>
                )}
              </button>
              <button
                type="button"
                onClick={() => {
                  setAuthMode('create');
                  setError('');
                  setSuccessNotice('');
                }}
                className={`flex-1 pb-3 text-sm sm:text-base font-extrabold transition-all cursor-pointer relative ${
                  authMode === 'create'
                    ? 'text-white'
                    : 'text-neutral-500 hover:text-neutral-300'
                }`}
              >
                <span>{t('Create Account', 'ఖాతా సృష్టించండి')}</span>
                {authMode === 'create' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D4F670] rounded-full"></div>
                )}
              </button>
            </div>

            {/* 3. SIMPLIFIED FORM */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name field */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-neutral-300 flex items-center gap-1.5">
                  <User size={14} className="text-[#D4F670]" />
                  <span>
                    {selectedRole === 'student'
                      ? t('Student Name', 'విద్యార్థి పేరు')
                      : t('Teacher Name', 'ఉపాధ్యాయుని పేరు')}
                  </span>
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
                  required
                  autoFocus
                  className="w-full bg-neutral-800/80 border border-white/10 rounded-2xl px-4 py-3 text-sm text-white focus:border-[#D4F670] focus:ring-1 focus:ring-[#D4F670] outline-none transition-all placeholder:text-neutral-500"
                />
              </div>

              {/* Class Selection Dropdown (Only for Student Create Account) */}
              {selectedRole === 'student' && authMode === 'create' && (
                <div className="space-y-1">
                  <label className="text-xs font-bold text-neutral-300 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <BookOpen size={14} className="text-[#D4F670]" />
                      <span>{t('Class / Grade', 'తరగతి / గ్రేడ్')}</span>
                    </span>
                    <span className="text-[11px] font-bold text-[#D4F670]">
                      {STUDENT_CLASS_OPTIONS.find((c) => c.value === studentClass)?.categoryEn || ''}
                    </span>
                  </label>
                  <select
                    value={studentClass}
                    onChange={(e) => {
                      const newClass = e.target.value as StudentClass;
                      setStudentClass(newClass);
                      const matched = STUDENT_CLASS_OPTIONS.find((c) => c.value === newClass);
                      if (matched) {
                        setSelectedLevel(matched.level);
                      }
                    }}
                    className="w-full bg-neutral-800/80 border border-white/10 rounded-2xl px-4 py-3 text-sm text-white focus:border-[#D4F670] focus:ring-1 focus:ring-[#D4F670] outline-none transition-all cursor-pointer font-light"
                  >
                    <optgroup label={t('Primary & Middle School (Classes 1 - 8)', 'ప్రాథమిక & మాధ్యమిక (1 - 8 తరగతులు)')} className="bg-neutral-900 text-white font-semibold">
                      {STUDENT_CLASS_OPTIONS.filter((c) => !['Class 9', 'Class 10', 'Intermediate 1st Year', 'Intermediate 2nd Year'].includes(c.value)).map((c) => (
                        <option key={c.value} value={c.value}>
                          {language === 'te' ? c.labelTe : c.labelEn}
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label={t('High School & College (Classes 9 - 12)', 'ఉన్నత పాఠశాల & కళాశాల (9 - 12 తరగతులు)')} className="bg-neutral-900 text-white font-semibold">
                      {STUDENT_CLASS_OPTIONS.filter((c) => ['Class 9', 'Class 10', 'Intermediate 1st Year', 'Intermediate 2nd Year'].includes(c.value)).map((c) => (
                        <option key={c.value} value={c.value}>
                          {language === 'te' ? c.labelTe : c.labelEn}
                        </option>
                      ))}
                    </optgroup>
                  </select>
                </div>
              )}

              {/* Subject Input (Only for Teacher Create Account) */}
              {selectedRole === 'teacher' && authMode === 'create' && (
                <div className="space-y-1">
                  <label className="text-xs font-bold text-neutral-300 flex items-center gap-1.5">
                    <BookOpen size={14} className="text-[#D4F670]" />
                    <span>{t('Subject Specialization', 'బోధించే సబ్జెక్ట్')}</span>
                  </label>
                  <div className="flex gap-1.5 mb-1.5 flex-wrap">
                    {['Mathematics', 'Basic Arithmetic', 'Algebra & Geometry'].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setTeacherSubject(s)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                          teacherSubject === s
                            ? 'bg-[#D4F670] text-[#1a1a1a] border-[#D4F670] font-bold'
                            : 'bg-white/5 text-neutral-400 border-white/10 hover:text-white'
                        }`}
                      >
                        {s === 'Mathematics' ? t('Mathematics', 'గణితం') : s === 'Basic Arithmetic' ? t('Basic Arithmetic', 'ప్రాథమిక అంకగణితం') : t('Algebra & Geometry', 'బీజగణితం & జ్యామితి')}
                      </button>
                    ))}
                  </div>
                  <input
                    type="text"
                    value={teacherSubject}
                    onChange={(e) => setTeacherSubject(e.target.value)}
                    placeholder={t('e.g. Mathematics', 'ఉదా: గణితం')}
                    required
                    className="w-full bg-neutral-800/80 border border-white/10 rounded-2xl px-4 py-3 text-sm text-white focus:border-[#D4F670] focus:ring-1 focus:ring-[#D4F670] outline-none transition-all placeholder:text-neutral-500"
                  />
                </div>
              )}

              {/* Password field */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-neutral-300 flex items-center gap-1.5">
                    <Lock size={14} className="text-[#D4F670]" />
                    <span>{t('Password', 'పాస్‌వర్డ్')}</span>
                  </label>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (error) setError('');
                    }}
                    placeholder={
                      authMode === 'create'
                        ? t('Create a password (min 3 chars)', 'పాస్‌వర్డ్‌ను సెట్ చేయండి (కనీసం 3 అక్షరాలు)')
                        : t('Enter your password', 'మీ పాస్‌వర్డ్‌ను నమోదు చేయండి')
                    }
                    required
                    className="w-full bg-neutral-800/80 border border-white/10 rounded-2xl pl-4 pr-11 py-3 text-sm text-white focus:border-[#D4F670] focus:ring-1 focus:ring-[#D4F670] outline-none transition-all placeholder:text-neutral-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white p-1 cursor-pointer transition-colors"
                    aria-label={showPassword ? t('Hide password', 'పాస్‌వర్డ్‌ను దాచండి') : t('Show password', 'పాస్‌వర్డ్‌ను చూపించండి')}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>

                {/* Forgot Password Button - Repositioned below password section with border and increased font */}
                {selectedRole === 'student' && authMode === 'login' && (
                  <div className="flex justify-end pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        setResetStudentUsername(username.trim());
                        setIsForgotPasswordOpen(true);
                        setForgotPasswordError('');
                        setForgotPasswordSuccess('');
                      }}
                      className="text-sm font-light text-[#D4F670] hover:text-white border border-[#D4F670]/40 hover:border-[#D4F670] bg-neutral-800/80 hover:bg-neutral-800 px-3.5 py-1.5 rounded-xl transition-all cursor-pointer inline-flex items-center gap-1.5 shadow-sm active:scale-95"
                    >
                      <span>{t('Forgot Password?', 'పాస్‌వర్డ్ మర్చిపోయారా?')}</span>
                    </button>
                  </div>
                )}
              </div>



              {/* Error Notice */}
              {error && (
                <div className="p-3 bg-red-950/50 border border-red-500/50 rounded-xl text-red-300 text-xs font-semibold text-center animate-in fade-in">
                  {error}
                </div>
              )}

              {/* Success Notice */}
              {successNotice && (
                <div className="p-3 bg-emerald-950/50 border border-emerald-500/50 rounded-xl text-emerald-300 text-xs font-semibold text-center animate-in fade-in flex items-center justify-center gap-2">
                  <Sparkles size={15} />
                  <span>{successNotice}</span>
                </div>
              )}

              {/* Primary Action Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-5 bg-[#D4F670] hover:bg-[#bce451] text-[#1a1a1a] font-extrabold text-sm sm:text-base rounded-2xl transition-transform active:scale-98 shadow-md shadow-[#D4F670]/10 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>
                    {authMode === 'create'
                      ? selectedRole === 'student'
                        ? t('Create Student Account & Start', 'విద్యార్థి ఖాతాను సృష్టించండి')
                        : t('Create Teacher Account & Start', 'ఉపాధ్యాయ ఖాతాను సృష్టించండి')
                      : selectedRole === 'student'
                      ? t('Log In as Student', 'విద్యార్థిగా లాగిన్ అవ్వండి')
                      : t('Log In as Teacher', 'ఉపాధ్యాయుడిగా లాగిన్ అవ్వండి')}
                  </span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </form>

            {/* Switch Mode Prompt */}
            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => {
                  setAuthMode(authMode === 'login' ? 'create' : 'login');
                  setError('');
                  setSuccessNotice('');
                }}
                className="text-xs text-neutral-400 hover:text-[#D4F670] font-bold transition-colors cursor-pointer"
              >
                {authMode === 'login'
                  ? t("Don't have an account? Create one in seconds →", 'ఖాతా లేదా? కొన్ని సెకన్లలో సృష్టించండి →')
                  : t('Already have an account? Log In →', 'ఇప్పటికే ఖాతా ఉందా? లాగిన్ అవ్వండి →')}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Student Request Password Reset Modal */}
      {isForgotPasswordOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-neutral-900 border border-white/10 rounded-[32px] p-6 sm:p-8 max-w-md w-full space-y-6 shadow-2xl text-white relative animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#D4F670]/20 text-[#D4F670] flex items-center justify-center font-bold">
                  <Lock size={18} />
                </div>
                <h3 className="text-lg sm:text-xl font-black">
                  {t('Request Password Reset', 'పాస్వర్డ్ రీసెట్ అభ్యర్థించండి')}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsForgotPasswordOpen(false);
                  setResetStudentUsername('');
                  setForgotPasswordError('');
                  setForgotPasswordSuccess('');
                  setRequestSubmitted(false);
                }}
                className="w-8 h-8 rounded-full bg-neutral-800 text-neutral-400 hover:text-white flex items-center justify-center cursor-pointer transition-colors"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleRequestPasswordReset} className="space-y-4">
              <p className="text-xs text-neutral-400 leading-relaxed">
                {t(
                  'Enter your name and class to request a password reset PIN from your GanitMitra teacher.',
                  'మీ GanitMitra ఉపాధ్యాయుని నుండి పాస్‌వర్డ్ రీసెట్ పిన్ కోరడానికి మీ పేరు మరియు తరగతిని నమోదు చేయండి.'
                )}
              </p>

              <div className="space-y-1">
                <label className="text-xs font-bold text-neutral-300 flex items-center gap-1.5">
                  <User size={14} className="text-[#D4F670]" />
                  <span>{t('Enter Name', 'పేరును నమోదు చేయండి')}</span>
                </label>
                <input
                  type="text"
                  value={resetStudentUsername}
                  onChange={(e) => {
                    setResetStudentUsername(e.target.value);
                    if (forgotPasswordError) setForgotPasswordError('');
                  }}
                  placeholder={t('Enter student name', 'విద్యార్థి పేరును నమోదు చేయండి')}
                  required
                  className="w-full bg-neutral-800 border border-white/10 rounded-2xl px-4 py-3 text-sm text-white focus:border-[#D4F670] outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-neutral-300 flex items-center gap-1.5">
                  <BookOpen size={14} className="text-[#D4F670]" />
                  <span>{t('Enter Class', 'తరగతిని ఎంచుకోండి')}</span>
                </label>
                <select
                  value={resetStudentClass}
                  onChange={(e) => setResetStudentClass(e.target.value as StudentClass)}
                  className="w-full bg-neutral-800 border border-white/10 rounded-2xl px-4 py-3 text-sm text-white focus:border-[#D4F670] outline-none cursor-pointer"
                >
                  <optgroup label={t('Primary & Middle School (Classes 1 - 8)', 'ప్రాథమిక & మాధ్యమిక (1 - 8 తరగతులు)')} className="bg-neutral-900 text-white font-semibold">
                    {STUDENT_CLASS_OPTIONS.filter((c) => !['Class 9', 'Class 10', 'Intermediate 1st Year', 'Intermediate 2nd Year'].includes(c.value)).map((c) => (
                      <option key={c.value} value={c.value}>
                        {language === 'te' ? c.labelTe : c.labelEn}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label={t('High School & College (Classes 9 - 12)', 'ఉన్నత పాఠశాల & కళాశాల (9 - 12 తరగతులు)')} className="bg-neutral-900 text-white font-semibold">
                    {STUDENT_CLASS_OPTIONS.filter((c) => ['Class 9', 'Class 10', 'Intermediate 1st Year', 'Intermediate 2nd Year'].includes(c.value)).map((c) => (
                      <option key={c.value} value={c.value}>
                        {language === 'te' ? c.labelTe : c.labelEn}
                      </option>
                    ))}
                  </optgroup>
                </select>
              </div>

              {forgotPasswordError && (
                <div className="p-3 bg-red-950/60 border border-red-500/50 rounded-xl text-red-300 text-xs font-semibold text-center">
                  {forgotPasswordError}
                </div>
              )}

              {forgotPasswordSuccess && (
                <div className="p-3 bg-emerald-950/60 border border-emerald-500/50 rounded-xl text-emerald-300 text-xs font-semibold text-center flex items-center justify-center gap-2">
                  <Sparkles size={15} />
                  <span>{forgotPasswordSuccess}</span>
                </div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={requestSubmitted}
                  className="w-full py-3.5 bg-[#D4F670] hover:bg-[#bce451] text-[#1a1a1a] font-extrabold text-sm rounded-2xl shadow-md transition-transform active:scale-98 cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>{t('Request Password', 'పాస్వర్డ్ అభ్యర్థించండి')}</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
