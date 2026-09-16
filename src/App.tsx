import { useState } from 'react';
import { LayoutDashboard, Users, BookOpen, Bell, X, Award, TrendingUp, LogOut } from 'lucide-react';
import StudentDashboard from './components/StudentDashboard';
import AdminDashboard from './components/AdminDashboard';
import PracticeScreen from './components/PracticeScreen';
import StudentProgress from './components/StudentProgress';
import LoginScreen from './components/LoginScreen';
import CustomCursor from './components/CustomCursor';
import AnimatedLogo from './components/AnimatedLogo';

export type ViewState = 'student_home' | 'student_learn' | 'student_practice' | 'student_progress' | 'student_badges' | 'admin_home';
export type Language = 'en' | 'te';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState<ViewState>('student_home');
  const [language, setLanguage] = useState<Language>('en');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const t = (en: string, te: string) => language === 'en' ? en : te;

  if (!isAuthenticated) {
    return (
      <>
        <CustomCursor />
        <LoginScreen onLoginSuccess={() => setIsAuthenticated(true)} t={t} />
      </>
    );
  }

  const NavItem = ({ view, icon: Icon, label }: { view: ViewState, icon: any, label: string }) => (
    <button 
      onClick={() => {
        setCurrentView(view);
        setIsMobileMenuOpen(false);
      }}
      className={`flex items-center gap-4 px-5 py-4 rounded-full transition-all w-full ${
        currentView === view ? 'bg-white text-black font-medium' : 'text-gray-400 hover:text-white hover:bg-white/5'
      }`}
    >
      <Icon size={20} />
      <span>{label}</span>
    </button>
  );

  const goHome = () => {
    setCurrentView(currentView.startsWith('admin') ? 'admin_home' : 'student_home');
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentView('student_home');
  };

  return (
    <>
      <CustomCursor />
      <div className="flex h-screen w-full bg-app-bg text-white font-sans overflow-hidden md:p-4 md:gap-4">
      
      {/* Mobile Header (Visible only on small screens) */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-transparent z-50 flex items-center justify-between px-4">
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 hover:scale-105 active:scale-95 transition-all"
        >
          {isMobileMenuOpen ? <X size={20} className="text-white" /> : <LayoutDashboard size={20} className="text-white" />}
          <span className="font-semibold text-white">{t('Dashboard', 'డాష్‌బోర్డ్')}</span>
        </button>
      </div>

      {/* Sidebar - Follows the dark theme with white pills for active state */}
      <aside className={`fixed inset-0 z-40 bg-app-bg transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:w-[280px] flex flex-col justify-between rounded-[32px] overflow-hidden ${
        isMobileMenuOpen ? 'translate-x-0 pt-16' : '-translate-x-full md:pt-0'
      }`}>
        <div className="py-8 px-6">
          <div className="hidden md:flex items-center gap-3 mb-12">
            <button onClick={goHome} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 hover:scale-105 active:scale-95 transition-all w-full">
              <LayoutDashboard size={24} className="text-white" />
              <span className="text-xl tracking-tight text-white flex items-center"><AnimatedLogo /></span>
            </button>
          </div>

          <nav className="flex flex-col gap-2">
            <NavItem view="student_home" icon={LayoutDashboard} label={t('Home', 'హోమ్')} />
            <NavItem view="student_practice" icon={BookOpen} label={t('Practice', 'ప్రాక్టీస్')} />
            <NavItem view="student_progress" icon={TrendingUp} label={t('Progress', 'పురోగతి')} />
            <NavItem view="student_badges" icon={Award} label={t('Badges', 'బ్యాడ్జ్‌లు')} />
          </nav>
        </div>

        <div className="p-6 pb-12 md:pb-6">
          <button 
            onClick={() => {
              setCurrentView('admin_home');
              setIsMobileMenuOpen(false);
            }}
            className={`flex items-center gap-4 px-5 py-4 w-full rounded-full transition-all ${
              currentView === 'admin_home' ? 'bg-white text-black font-medium' : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Users size={20} />
            <span>{t('Teacher View', 'ఉపాధ్యాయుల వీక్షణ')}</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area - Light background rounded container */}
      <main className="flex-1 bg-app-surface text-app-text mt-16 md:mt-0 md:rounded-[40px] shadow-2xl flex flex-col overflow-hidden relative w-full">
        
        {/* Header */}
        <header className="flex justify-between items-center px-6 md:px-10 pt-6 md:pt-8 pb-4 bg-app-surface z-10 sticky top-0 border-b border-black/5 md:border-none">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <img 
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=C3B8FF" 
                alt="Avatar" 
                className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-white shadow-sm"
              />
              <div className="hidden sm:block">
                <h2 className="font-semibold text-[17px] leading-tight">Sai Kumar</h2>
                <p className="text-sm text-app-textMuted">{t('Class 5 Student', '5వ తరగతి విద్యార్థి')}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <div className="flex bg-white rounded-full p-1 shadow-sm border border-black/5">
              <button 
                onClick={() => setLanguage('en')}
                className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-semibold transition-all ${language === 'en' ? 'bg-app-text text-white' : 'text-app-textMuted hover:text-app-text'}`}
              >
                EN
              </button>
              <button 
                onClick={() => setLanguage('te')}
                className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-semibold transition-all ${language === 'te' ? 'bg-app-text text-white' : 'text-app-textMuted hover:text-app-text'}`}
              >
                తెలుగు
              </button>
            </div>

            <button className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-black/5 relative hover:bg-gray-50 transition-colors">
              <Bell size={20} className="text-gray-600" />
              <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-app-lime rounded-full border-2 border-white"></span>
            </button>
            <button 
              onClick={handleLogout}
              className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-black/5 relative hover:bg-red-50 hover:text-red-600 transition-colors text-gray-400"
              title={t('Log Out', 'లాగౌట్')}
            >
              <LogOut size={20} />
            </button>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 md:px-10 pb-10 custom-scrollbar">
          {(currentView === 'student_home' || currentView === 'student_badges') && <StudentDashboard t={t} onPractice={() => setCurrentView('student_practice')} />}
          {currentView === 'student_practice' && <PracticeScreen t={t} onBack={goHome} />}
          {currentView === 'student_progress' && <StudentProgress t={t} />}
          {currentView === 'admin_home' && <AdminDashboard t={t} />}
        </div>
      </main>
    </div>
    </>
  );
}

export default App;
