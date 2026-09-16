import { useState } from 'react';
import { Eye, EyeOff, Calculator } from 'lucide-react';
import AnimatedLogo from './AnimatedLogo';

interface LoginScreenProps {
  onLoginSuccess: () => void;
  t: (en: string, te: string) => string;
}

export default function LoginScreen({ onLoginSuccess, t }: LoginScreenProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Simple prototype credentials check
    if (username === 'abcde' && password === '12345') {
      onLoginSuccess();
    } else {
      setError(t('Invalid username or password.', 'చెల్లని వినియోగదారు పేరు లేదా పాస్‌వర్డ్.'));
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

        {/* Right Panel - Form */}
        <div className="w-full lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center relative bg-[#2F2F2F]">
          {/* Mobile Branding (Visible only on smaller screens) */}
          <div className="lg:hidden flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl bg-[#D4F670] flex items-center justify-center text-[#2F2F2F] font-bold text-xl">
              <Calculator size={24} />
            </div>
            <span className="text-2xl tracking-tight text-white flex items-center"><AnimatedLogo /></span>
          </div>

          <div className="max-w-md w-full mx-auto lg:mx-0">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white">{t('Log in', 'లాగిన్ చేయండి')}</h2>
            <p className="text-[#F4F5F8]/60 mb-10 text-lg">
              {t('Please enter your details to continue.', 'దయచేసి కొనసాగించడానికి మీ వివరాలను నమోదు చేయండి.')}
            </p>

            <form onSubmit={handleLogin} className="space-y-6">
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#F4F5F8]/80 ml-1 block">{t('Username', 'వినియోగదారు పేరు')}</label>
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder={t('Enter username', 'వినియోగదారు పేరు నమోదు చేయండి')}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:border-[#D4F670] focus:ring-1 focus:ring-[#D4F670] transition-all outline-none text-white placeholder:text-white/30 text-lg"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-[#F4F5F8]/80 ml-1 block">{t('Password', 'పాస్‌వర్డ్')}</label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t('Enter password', 'పాస్‌వర్డ్ నమోదు చేయండి')}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl pl-5 pr-12 py-4 focus:border-[#D4F670] focus:ring-1 focus:ring-[#D4F670] transition-all outline-none text-white placeholder:text-white/30 text-lg"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors p-1"
                  >
                    {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
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
                  className="w-full bg-[#D4F670] text-[#2F2F2F] font-bold text-lg rounded-2xl py-4 mt-2 hover:bg-[#bce451] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-[#D4F670]/10 flex items-center justify-center gap-2"
                >
                  {t('Log In', 'లాగిన్ అవ్వండి')}
                </button>
              </div>
              
            </form>
            
            {/* Temporary hint for the prototype */}
            <div className="mt-12 text-center border-t border-white/10 pt-6">
              <p className="text-xs text-[#F4F5F8]/40 mb-3 uppercase tracking-wider font-semibold">Prototype Credentials</p>
              <div className="flex justify-center gap-3 text-sm font-medium text-[#F4F5F8]/70">
                <span className="bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">User: <span className="text-white">abcde</span></span>
                <span className="bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">Pass: <span className="text-white">12345</span></span>
              </div>
            </div>

          </div>
        </div>
        
      </div>
    </div>
  );
}
