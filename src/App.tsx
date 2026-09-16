import { useState } from 'react';
import { LayoutDashboard, Users, BookOpen, Calculator, Bell, ChevronDown, Rocket } from 'lucide-react';
import StudentDashboard from './components/StudentDashboard';
import AdminDashboard from './components/AdminDashboard';
import PracticeScreen from './components/PracticeScreen';

export type ViewState = 'student_home' | 'student_practice' | 'admin_home';
export type Language = 'en' | 'te';

function App() {
  const [currentView, setCurrentView] = useState<ViewState>('student_home');
  const [language, setLanguage] = useState<Language>('en');

  const t = (en: string, te: string) => language === 'en' ? en : te;

  return (
    <div className="flex h-screen w-full bg-app-bg text-white p-4 gap-4 font-sans overflow-hidden">
      
      {/* Sidebar - Follows the dark theme with white pills for active state */}
      <aside className="w-[280px] flex flex-col justify-between rounded-[32px] overflow-hidden">
        <div className="py-8 px-6">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 rounded-xl bg-app-lime flex items-center justify-center text-black font-bold text-2xl">
              <Calculator size={24} />
            </div>
            <span className="text-2xl font-semibold tracking-tight text-white">MathPath</span>
          </div>

          <nav className="flex flex-col gap-2">
            <button 
              onClick={() => setCurrentView('student_home')}
              className={`flex items-center justify-between px-5 py-4 rounded-full transition-all ${
                currentView.startsWith('student') ? 'bg-white text-black font-medium' : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-4">
                <LayoutDashboard size={20} />
                <span>{t('Dashboard', 'డాష్‌బోర్డ్')}</span>
              </div>
              {currentView.startsWith('student') && (
                <div className="w-6 h-6 rounded-full bg-app-lime flex items-center justify-center text-xs font-bold">3</div>
              )}
            </button>

            <button 
              onClick={() => setCurrentView('student_practice')}
              className={`flex items-center justify-between px-5 py-4 rounded-full transition-all ${
                currentView === 'student_practice' ? 'bg-white text-black font-medium' : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-4">
                <BookOpen size={20} />
                <span>{t('Practice', 'ప్రాక్టీస్')}</span>
              </div>
            </button>
            
            <button 
              onClick={() => setCurrentView('admin_home')}
              className={`flex items-center justify-between px-5 py-4 rounded-full transition-all ${
                currentView === 'admin_home' ? 'bg-white text-black font-medium' : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-4">
                <Users size={20} />
                <span>{t('Teacher View', 'ఉపాధ్యాయుల వీక్షణ')}</span>
              </div>
              {currentView === 'admin_home' && (
                <div className="w-6 h-6 rounded-full bg-app-accent flex items-center justify-center text-xs font-bold text-black">1</div>
              )}
            </button>
          </nav>
        </div>

        {/* Upgrade / Promotion Card equivalent -> Achievement / Status Card */}
        <div className="p-6">
          <div className="bg-app-lime text-black p-6 rounded-[32px] flex flex-col items-start shadow-[0_8px_32px_rgba(212,246,112,0.15)] relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-2">{t('Keep going!', 'కొనసాగించండి!')}</h3>
              <p className="text-sm font-medium opacity-80 mb-6 leading-relaxed max-w-[150px]">
                {t('You are on a 5-day learning streak.', 'మీరు 5 రోజుల లెర్నింగ్ స్ట్రీక్‌లో ఉన్నారు.')}
              </p>
              <button className="bg-[#1C1C1E] text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-black transition-colors">
                {t('View Badges', 'బ్యాడ్జ్‌లను చూడండి')}
              </button>
            </div>
            {/* Decorative background element */}
            <div className="absolute -right-4 -bottom-4 opacity-20">
              <Rocket size={120} strokeWidth={1} />
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area - Light background rounded container */}
      <main className="flex-1 bg-app-surface text-app-text rounded-[40px] shadow-2xl flex flex-col overflow-hidden relative">
        
        {/* Header */}
        <header className="flex justify-between items-center px-10 pt-8 pb-4 bg-app-surface z-10 sticky top-0">
          <div className="flex items-center gap-4 cursor-pointer hover:bg-black/5 p-2 rounded-full transition-colors -ml-2">
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=C3B8FF" 
              alt="Avatar" 
              className="w-12 h-12 rounded-full border-2 border-white shadow-sm"
            />
            <div>
              <h2 className="font-semibold text-[17px] leading-tight">Sai Kumar</h2>
              <p className="text-sm text-app-textMuted">{t('Class 5 Student', '5వ తరగతి విద్యార్థి')}</p>
            </div>
            <ChevronDown size={18} className="text-gray-400 ml-2" />
          </div>

          <div className="flex items-center gap-6">
            {/* Language Switcher */}
            <div className="flex bg-white rounded-full p-1 shadow-sm border border-black/5">
              <button 
                onClick={() => setLanguage('en')}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all flex items-center gap-2 ${language === 'en' ? 'bg-app-text text-white' : 'text-app-textMuted hover:text-app-text'}`}
              >
                EN
              </button>
              <button 
                onClick={() => setLanguage('te')}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all flex items-center gap-2 ${language === 'te' ? 'bg-app-text text-white' : 'text-app-textMuted hover:text-app-text'}`}
              >
                తెలుగు
              </button>
            </div>

            <div className="relative">
              <input 
                type="text" 
                placeholder={t('Search topics...', 'అంశాలను శోధించండి...')}
                className="bg-white px-6 py-3 pr-12 rounded-full text-sm outline-none shadow-sm border border-black/5 w-[250px] focus:ring-2 focus:ring-app-accent/50 transition-all"
              />
            </div>
            <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-black/5 relative hover:bg-gray-50 transition-colors">
              <Bell size={20} className="text-gray-600" />
              <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-app-lime rounded-full border-2 border-white"></span>
            </button>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-10 pb-10 custom-scrollbar">
          {currentView === 'student_home' && <StudentDashboard t={t} onPractice={() => setCurrentView('student_practice')} />}
          {currentView === 'student_practice' && <PracticeScreen t={t} onBack={() => setCurrentView('student_home')} />}
          {currentView === 'admin_home' && <AdminDashboard t={t} />}
        </div>
      </main>
    </div>
  );
}

export default App;
