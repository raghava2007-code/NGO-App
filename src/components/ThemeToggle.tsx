import { Moon, Sun } from 'lucide-react';
import { ThemeMode } from '../types';

interface ThemeToggleProps {
  theme: ThemeMode;
  onToggle: () => void;
  t: (en: string, te: string) => string;
  className?: string;
  showLabel?: boolean;
}

export default function ThemeToggle({
  theme,
  onToggle,
  t,
  className = '',
  showLabel = false,
}: ThemeToggleProps) {
  const isDark = theme === 'dark';

  return (
    <button
      onClick={onToggle}
      type="button"
      aria-label={isDark ? t('Switch to light mode', 'లైట్ మోడ్‌కు మారండి') : t('Switch to dark mode', 'డార్క్ మోడ్‌కు మారండి')}
      title={isDark ? t('Switch to light mode', 'లైట్ మోడ్‌కు మారండి') : t('Switch to dark mode', 'డార్క్ మోడ్‌కు మారండి')}
      className={`relative inline-flex items-center justify-center transition-all cursor-pointer ${
        showLabel
          ? 'px-3.5 py-2 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-700 shadow-xs'
          : 'w-10 h-10 md:w-11 md:h-11 rounded-full border border-black/5 dark:border-white/10 bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 shadow-xs'
      } ${className}`}
    >
      <div className="flex items-center gap-2">
        {isDark ? (
          <Moon size={18} className="text-indigo-400 stroke-[2.2] animate-in zoom-in-50 duration-200" />
        ) : (
          <Sun size={18} className="text-amber-500 stroke-[2.2] animate-in zoom-in-50 duration-200" />
        )}
        {showLabel && (
          <span className="text-xs md:text-sm font-semibold">
            {isDark ? t('Dark Mode', 'డార్క్ మోడ్') : t('Light Mode', 'లైట్ మోడ్')}
          </span>
        )}
      </div>
    </button>
  );
}
