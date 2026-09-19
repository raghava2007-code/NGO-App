import { useState } from 'react';
import { Eye, EyeOff, Calculator, GraduationCap, Presentation, ArrowLeft, Check } from 'lucide-react';
import AnimatedLogo from './AnimatedLogo';

export type UserRole = 'student' | 'teacher';
export type StudentLevel = 'Beginner' | 'Intermediate' | 'Advanced';

interface LoginScreenProps {
  onLoginSuccess: (userData: { role: UserRole; username: string; level: StudentLevel }) => void;
  t: (en: string, te: string) => string;
}

export default function LoginScreen({ onLoginSuccess, t }: LoginScreenProps) {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [level, setLevel] = useState<StudentLevel>('Beginner');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  // Strict name validation function
  // Allowed: alphabetical characters (a-z, A-Z) and maximum a single period (.)
  // Forbidden: Numbers, spaces, and all other special characters (@, #, _, -, etc.)
  const validateUsername = (name: string): string | null => {
    const trimmed = name.trim();
    if (!trimmed) {
      return t('Please enter your name.', 'దయచేసి మీ పేరును నమోదు చేయండి.');
    }

    if (/\s/.test(name)) {
      return t('Spaces are not allowed. Only letters and an optional single period (.) are permitted.', 'ఖాళీలు అనుమతించబడవు. అక్షరాలు మరియు ఒక చుక్క (.) మాత్రమే అనుమతించబడతాయి.');
    }

    if (/\d/.test(name)) {
      return t('Numbers are not permitted in the name field.', 'పేరులో అంకెలు అనుమతించబడవు.');
    }

    // Must match letters and dot only
    if (!/^[a-zA-Z.]+$/.test(name)) {
      return t('Special characters are not allowed. Only letters (A-Z, a-z) and a single period (.) are permitted.', 'ప్రత్యేక అక్షరాలు అనుమతించబడవు. కేవలం అక్షరాలు (A-Z, a-z) మరియు ఒక చుక్క (.) మాత్రమే అనుమతించబడతాయి.');
    }

    // Single period check
    const dotCount = (name.match(/\./g) || []).length;
    if (dotCount > 1) {
      return t('Only one period (.) is allowed for initials or surnames.', 'ఇనీషియల్స్ కోసం కేవలం ఒక చుక్క (.) మాత్రమే అనుమతించబడుతుంది.');
    }

    return null;
  };

  const handleStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const validationError = validateUsername(username);
    if (validationError) {
      setError(validationError);
      return;
    }

    if (!level) {
      setError(t('Please select a level.', 'దయచేసి ఒక స్థాయిని ఎంచుకోండి.'));
      return;
    }

    onLoginSuccess({
      role: 'student',
      username: username.trim(),
      level: level,
    });
  };

  const handleTeacherSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const validationError = validateUsername(username);
    if (validationError) {
      setError(validationError);
      return;
    }

    const trimmedUser = username.trim();

    // Teacher authentication using prototype password pattern or teacher username
    if (password === '12345' || password === 'admin' || trimmedUser.toLowerCase() === 'teacher' || trimmedUser.toLowerCase() === 'admin') {
      onLoginSuccess({
        role: 'teacher',
        username: trimmedUser || 'Teacher',
        level: 'Advanced',
      });
    } else {
      setError(t('Invalid teacher password. Hint: 12345', 'చెల్లని పాస్‌వర్డ్. సూచన: 12345'));
    }
  };

  return (
    <div className="min-h-screen bg-[#2F2F2F] flex items-center justify-center p-4 md:p-8 font-sans text-[#F4F5F8]">
      <div className="w-full max-w-6xl flex flex-col lg:flex-row bg-[#2F2F2F] rounded-[32px] md:rounded-[48px] overflow-hidden shadow-2xl border border-white/5 min-h-[600px]">
        
        {/* Left Panel - Visual/Branding (Hidden on mobile, visible on lg screens) */}
        <div className="hidden lg:flex lg:w-1/2 relative p-12 flex-col justify-between overflow-hidden bg-gradient-to-br from-[#2F2F2F] to-black">
          {/* Abstract decorative shape using the Lime color */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
             <div className="absolute top-[-20%] left-[-20%] w-[140%] h-[140%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#D4F670]/30 via-transparent to-transparent blur-[100px]"></div>
          </div>
          
          <div className="relative z-10 flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#D4F670] flex items-center justify-center text-[#2F2F2F] font-bold text-2xl">
              <Calculator size={28} />
            </div>
            <span className="text-3xl tracking-tight text-white flex items-center"><AnimatedLogo /></span>
          </div>

          <div className="relative z-10 mt-auto">
            <h1 className="text-5xl font-bold leading-tight mb-6 text-white">
              {t('Master Mathematics.', 'గణితంలో పట్టు సాధించండి.')}<br />
              <span className="text-[#D4F670]">{t('Shape Your Future.', 'మీ భవిష్యత్తును తీర్చిదిద్దుకోండి.')}</span>
            </h1>
            <p className="text-lg text-white/70 max-w-md">
              {t('Join our interactive learning platform designed to make math intuitive, engaging, and fun for everyone.', 'గణితాన్ని అందరికీ సహజంగా, ఆకర్షణీయంగా మరియు సరదాగా ఉండేలా రూపొందించిన మా ఇంటరాక్టివ్ లెర్నింగ్ ప్లాట్‌ఫారమ్‌లో చేరండి.')}
            </p>
          </div>
        </div>

        {/* Right Panel - Role Selection & Form */}
        <div className="w-full lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center relative bg-[#2F2F2F]">
          {/* Mobile Branding */}
          <div className="lg:hidden flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl bg-[#D4F670] flex items-center justify-center text-[#2F2F2F] font-bold text-xl">
              <Calculator size={24} />
            </div>
            <span className="text-2xl tracking-tight text-white flex items-center"><AnimatedLogo /></span>
          </div>

          <div className="max-w-md w-full mx-auto lg:mx-0">
            
            {/* STEP 1: ROLE SELECTION */}
            {selectedRole === null && (
              <div className="animate-in fade-in duration-300">
                <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white">
                  {t('Welcome', 'స్వాగతం')}
                </h2>
                <p className="text-[#F4F5F8]/60 mb-8 text-base md:text-lg">
                  {t('Please select your role to continue:', 'కొనసాగించడానికి దయచేసి మీ పాత్రను ఎంచుకోండి:')}
                </p>

                {/* Two small, rounded-corner rectangular options arranged vertically, one above the other */}
                <div className="flex flex-col gap-4 w-full">
                  {/* Student Option */}
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedRole('student');
                      setError('');
                    }}
                    className="group w-full p-5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#D4F670]/80 rounded-2xl flex items-center justify-between transition-transform duration-200 hover:scale-105 active:scale-95 text-left cursor-pointer shadow-sm"
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
                          {t('Practice math & track your progress', 'గణితాన్ని సాధన చేసి మీ పురోగతిని చూడండి')}
                        </p>
                      </div>
                    </div>
                    <span className="text-[#D4F670] text-xl font-bold opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  </button>

                  {/* Teacher Option */}
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedRole('teacher');
                      setError('');
                    }}
                    className="group w-full p-5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#D4F670]/80 rounded-2xl flex items-center justify-between transition-transform duration-200 hover:scale-105 active:scale-95 text-left cursor-pointer shadow-sm"
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
                          {t('Monitor students & review analytics', 'విద్యార్థులను పర్యవేక్షించి విశ్లేషణలను చూడండి')}
                        </p>
                      </div>
                    </div>
                    <span className="text-[#D4F670] text-xl font-bold opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2A: STUDENT LOGIN */}
            {selectedRole === 'student' && (
              <div className="animate-in fade-in duration-300">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedRole(null);
                    setError('');
                  }}
                  className="inline-flex items-center gap-2 text-sm text-[#F4F5F8]/60 hover:text-white mb-6 transition-colors"
                >
                  <ArrowLeft size={16} />
                  {t('Change Role', 'పాత్రను మార్చండి')}
                </button>

                <h2 className="text-3xl font-bold mb-2 text-white flex items-center gap-2">
                  {t('Student Login', 'విద్యార్థి లాగిన్')} <span>👤</span>
                </h2>
                <p className="text-[#F4F5F8]/60 mb-6 text-sm md:text-base">
                  {t('Enter your username and select your current skill level.', 'మీ వినియోగదారు పేరును నమోదు చేసి మీ ప్రస్తుత స్థాయిని ఎంచుకోండి.')}
                </p>

                <form onSubmit={handleStudentSubmit} className="space-y-6">
                  {/* Username Input */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between ml-1">
                      <label className="text-sm font-medium text-[#F4F5F8]/80 block">
                        {t('Username', 'వినియోగదారు పేరు')}
                      </label>
                      <span className="text-[11px] text-[#D4F670]/80 font-mono">
                        {t('Letters & 1 dot only (e.g. R.Kumar)', 'అక్షరాలు & 1 చుక్క మాత్రమే')}
                      </span>
                    </div>
                    <input 
                      type="text" 
                      value={username}
                      onChange={(e) => {
                        setUsername(e.target.value);
                        if (error) setError('');
                      }}
                      placeholder={t('e.g. Raghava or R.Sharma', 'ఉదా: Raghava లేదా R.Sharma')}
                      autoFocus
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 focus:border-[#D4F670] focus:ring-1 focus:ring-[#D4F670] transition-all outline-none text-white placeholder:text-white/30 text-base md:text-lg"
                    />
                  </div>

                  {/* Level Selection */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#F4F5F8]/80 ml-1 block">
                      {t('Level', 'స్థాయి')}
                    </label>
                    <div className="grid grid-cols-3 gap-2.5">
                      {(['Beginner', 'Intermediate', 'Advanced'] as StudentLevel[]).map((lvl) => (
                        <button
                          key={lvl}
                          type="button"
                          onClick={() => setLevel(lvl)}
                          className={`py-3 px-2 rounded-xl text-sm font-semibold border transition-all flex flex-col items-center justify-center gap-1 ${
                            level === lvl
                              ? 'bg-[#D4F670] text-[#2F2F2F] border-[#D4F670] shadow-md shadow-[#D4F670]/10 font-bold'
                              : 'bg-white/5 text-white/80 border-white/10 hover:bg-white/10'
                          }`}
                        >
                          <span>{t(lvl, lvl === 'Beginner' ? 'ప్రారంభం' : lvl === 'Intermediate' ? 'మధ్యస్థం' : 'అధునాతనం')}</span>
                          {level === lvl && <Check size={14} className="stroke-[3]" />}
                        </button>
                      ))}
                    </div>
                  </div>

                  {error && (
                    <div className="text-red-400 text-sm font-medium px-4 bg-red-400/10 py-3 rounded-xl text-center border border-red-400/20">
                      {error}
                    </div>
                  )}

                  <div className="pt-2">
                    <button 
                      type="submit"
                      className="w-full bg-[#D4F670] text-[#2F2F2F] font-bold text-lg rounded-2xl py-4 hover:bg-[#bce451] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-[#D4F670]/10 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {t('Start Learning', 'నేర్చుకోవడం ప్రారంభించండి')} →
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* STEP 2B: TEACHER LOGIN */}
            {selectedRole === 'teacher' && (
              <div className="animate-in fade-in duration-300">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedRole(null);
                    setError('');
                  }}
                  className="inline-flex items-center gap-2 text-sm text-[#F4F5F8]/60 hover:text-white mb-6 transition-colors"
                >
                  <ArrowLeft size={16} />
                  {t('Change Role', 'పాత్రను మార్చండి')}
                </button>

                <h2 className="text-3xl font-bold mb-2 text-white flex items-center gap-2">
                  {t('Teacher Login', 'ఉపాధ్యాయుల లాగిన్')} <span>👨‍🏫</span>
                </h2>
                <p className="text-[#F4F5F8]/60 mb-6 text-sm md:text-base">
                  {t('Access student progress analytics and class monitoring.', 'విద్యార్థుల పురోగతి విశ్లేషణలు మరియు తరగతి పర్యవేక్షణను యాక్సెస్ చేయండి.')}
                </p>

                <form onSubmit={handleTeacherSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between ml-1">
                      <label className="text-sm font-medium text-[#F4F5F8]/80 block">
                        {t('Teacher Username', 'ఉపాధ్యాయుని వినియోగదారు పేరు')}
                      </label>
                      <span className="text-[11px] text-[#D4F670]/80 font-mono">
                        {t('Letters & 1 dot only', 'అక్షరాలు & 1 చుక్క మాత్రమే')}
                      </span>
                    </div>
                    <input 
                      type="text" 
                      value={username}
                      onChange={(e) => {
                        setUsername(e.target.value);
                        if (error) setError('');
                      }}
                      placeholder={t('e.g. S.Rao or Teacher', 'ఉదా: S.Rao లేదా Teacher')}
                      autoFocus
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 focus:border-[#D4F670] focus:ring-1 focus:ring-[#D4F670] transition-all outline-none text-white placeholder:text-white/30 text-base md:text-lg"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#F4F5F8]/80 ml-1 block">
                      {t('Password', 'పాస్‌వర్డ్')}
                    </label>
                    <div className="relative">
                      <input 
                        type={showPassword ? "text" : "password"} 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder={t('Enter password', 'పాస్‌వర్డ్ నమోదు చేయండి')}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl pl-5 pr-12 py-3.5 focus:border-[#D4F670] focus:ring-1 focus:ring-[#D4F670] transition-all outline-none text-white placeholder:text-white/30 text-base md:text-lg"
                      />
                      <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors p-1"
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>

                  {error && (
                    <div className="text-red-400 text-sm font-medium px-4 bg-red-400/10 py-3 rounded-xl text-center border border-red-400/20">
                      {error}
                    </div>
                  )}

                  <div className="pt-2">
                    <button 
                      type="submit"
                      className="w-full bg-[#D4F670] text-[#2F2F2F] font-bold text-lg rounded-2xl py-4 hover:bg-[#bce451] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-[#D4F670]/10 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {t('Access Teacher Portal', 'ఉపాధ్యాయుల పోర్టల్‌లోకి ప్రవేశించండి')} →
                    </button>
                  </div>
                </form>

                <div className="mt-8 text-center border-t border-white/10 pt-4">
                  <p className="text-xs text-[#F4F5F8]/40 mb-2 uppercase tracking-wider font-semibold">Teacher Quick Access</p>
                  <div className="flex justify-center gap-3 text-xs font-medium text-[#F4F5F8]/70">
                    <span className="bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">User: <span className="text-white">teacher</span></span>
                    <span className="bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">Pass: <span className="text-white">12345</span></span>
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
