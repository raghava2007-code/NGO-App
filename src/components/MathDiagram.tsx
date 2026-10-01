import { Language } from '../types';

interface MathDiagramProps {
  type: 'big_small' | 'subtraction_apples' | 'shapes_geom' | 'number_bonds' | 'multiplication_array' | 'fraction_pie' | 'equation_balance' | 'counting' | 'counting_grid';
  data?: any;
  language: Language;
  t: (en: string, te: string) => string;
  size?: 'normal' | 'large';
}

export default function MathDiagram({ type, data, t }: MathDiagramProps) {
  // 1. BIG AND SMALL (COMPARING SIZES)
  if (type === 'big_small') {
    const leftLabel = data?.left || 'Elephant';
    const rightLabel = data?.right || 'Mouse';

    return (
      <div className="w-full max-w-lg mx-auto bg-neutral-50 dark:bg-neutral-800/80 rounded-3xl p-5 md:p-6 border border-black/10 dark:border-white/10 shadow-xs space-y-4">
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
          <span>{t('Side-by-Side Size Comparison', 'పక్కపక్కనే పరిమాణాల పోలిక')}</span>
          <span className="text-black dark:text-white font-extrabold text-xs">
            {t('Visual Concept', 'దృశ్య భావన')}
          </span>
        </div>

        {/* Pair: Elephant vs Mouse / Ant */}
        <div className="grid grid-cols-2 gap-4 bg-white dark:bg-neutral-900 rounded-2xl p-4 border border-black/5 dark:border-white/5 items-center">
          {/* Elephant (Big) */}
          <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/50 text-center">
            <div className="relative mb-2 flex items-center justify-center">
              <svg viewBox="0 0 100 80" className="w-24 h-20 text-slate-700 dark:text-slate-300">
                <ellipse cx="50" cy="45" rx="32" ry="24" fill="#94A3B8" />
                <circle cx="28" cy="35" r="16" fill="#94A3B8" />
                <path d="M20 35 C15 45 10 55 12 60 C15 62 18 55 22 45" fill="none" stroke="#94A3B8" strokeWidth="6" strokeLinecap="round" />
                <circle cx="24" cy="32" r="2.5" fill="#1E293B" />
                <rect x="30" y="55" width="8" height="20" rx="3" fill="#64748B" />
                <rect x="42" y="55" width="8" height="20" rx="3" fill="#64748B" />
                <rect x="58" y="55" width="8" height="20" rx="3" fill="#64748B" />
                <rect x="70" y="55" width="8" height="20" rx="3" fill="#64748B" />
                <ellipse cx="38" cy="34" rx="10" ry="14" fill="#CBD5E1" />
              </svg>
            </div>
            <span className="font-extrabold text-sm md:text-base text-black dark:text-white">
              {leftLabel === 'Elephant' ? t('Elephant', 'ఏనుగు') : leftLabel === 'Basketball' ? t('Basketball', 'బాస్కెట్‌బాల్') : leftLabel}
            </span>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
              {t('BIG', 'పెద్దది')}
            </span>
          </div>

          {/* Mouse / Ant / Marble (Small) */}
          <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 text-center">
            <div className="relative mb-2 flex items-center justify-center h-20">
              {rightLabel === 'Marble' ? (
                <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-400 shadow-md"></div>
              ) : (
                <svg viewBox="0 0 60 50" className="w-10 h-8 text-neutral-700 dark:text-neutral-300">
                  <ellipse cx="28" cy="30" rx="14" ry="10" fill="#CBD5E1" />
                  <circle cx="42" cy="28" r="7" fill="#CBD5E1" />
                  <circle cx="44" cy="27" r="1.5" fill="#000" />
                  <circle cx="36" cy="22" r="4" fill="#F472B6" />
                  <path d="M14 32 Q8 30 6 36" stroke="#94A3B8" strokeWidth="2" fill="none" strokeLinecap="round" />
                </svg>
              )}
            </div>
            <span className="font-extrabold text-sm md:text-base text-black dark:text-white">
              {rightLabel === 'Mouse' ? t('Mouse', 'ఎలుక') : rightLabel === 'Ant' ? t('Ant', 'చీమ') : rightLabel === 'Marble' ? t('Marble', 'గోళీ') : rightLabel}
            </span>
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400 mt-0.5">
              {t('SMALL', 'చిన్నది')}
            </span>
          </div>
        </div>

        {/* Caption Requirement: "An elephant is Big. A mouse is Small." */}
        <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/60 text-center">
          <p className="text-xs sm:text-sm font-extrabold text-black dark:text-white">
            💡 {t('An elephant is Big. A mouse is Small.', 'ఏనుగు పెద్దది. ఎలుక చిన్నది.')}
          </p>
          <p className="text-[11px] text-neutral-600 dark:text-neutral-400 mt-0.5">
            {t('A big object occupies more space. A small object occupies less space.', 'పెద్ద వస్తువు ఎక్కువ స్థలాన్ని, చిన్న వస్తువు తక్కువ స్థలాన్ని ఆక్రమిస్తాయి.')}
          </p>
        </div>
      </div>
    );
  }

  // 2. SINGLE-DIGIT SUBTRACTION (8 APPLES MINUS 3 EATEN = 5 REMAINING)
  if (type === 'subtraction_apples') {
    return (
      <div className="w-full max-w-lg mx-auto bg-neutral-50 dark:bg-neutral-800/80 rounded-3xl p-5 md:p-6 border border-black/10 dark:border-white/10 shadow-xs space-y-4">
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
          <span>{t('Object Removal Diagram (Subtraction)', 'వస్తువుల తీసివేత రేఖాచిత్రం')}</span>
          <span className="text-black dark:text-white font-black text-sm">
            8 − 3 = 5
          </span>
        </div>

        {/* Visual Branch with 8 apples: 5 remaining whole apples + 3 eaten / taken away */}
        <div className="bg-white dark:bg-neutral-900 rounded-2xl p-4 md:p-5 border border-black/5 dark:border-white/5 space-y-4">
          <div className="relative">
            {/* Wooden branch line */}
            <div className="w-full h-3 bg-amber-800 dark:bg-amber-900 rounded-full relative">
              <div className="absolute -top-1 left-4 w-3 h-3 bg-emerald-600 rounded-full"></div>
              <div className="absolute -bottom-1 right-8 w-3 h-3 bg-emerald-600 rounded-full"></div>
            </div>

            {/* 8 Apples Row */}
            <div className="flex items-center justify-between pt-3 px-2">
              {/* 5 Remaining Apples */}
              {[1, 2, 3, 4, 5].map((idx) => (
                <div key={`whole-${idx}`} className="flex flex-col items-center">
                  <div className="w-10 h-10 md:w-11 md:h-11 rounded-2xl bg-red-100 dark:bg-red-950/60 border-2 border-red-500 flex items-center justify-center text-xl shadow-xs">
                    🍎
                  </div>
                  <span className="text-[10px] font-bold text-black dark:text-white mt-1">
                    #{idx}
                  </span>
                </div>
              ))}

              {/* Separator / Minus Indicator: rendered white in dark mode, black in light mode */}
              <div className="text-xl md:text-2xl font-black text-black dark:text-white select-none px-1">
                −
              </div>

              {/* 3 Eaten / Taken Away Apples */}
              {[1, 2, 3].map((idx) => (
                <div key={`eaten-${idx}`} className="flex flex-col items-center opacity-70">
                  <div className="w-10 h-10 md:w-11 md:h-11 rounded-2xl bg-neutral-200 dark:bg-neutral-800 border-2 border-dashed border-red-400 flex items-center justify-center text-xl relative">
                    <span className="grayscale">🍎</span>
                    <span className="absolute inset-0 flex items-center justify-center text-red-600 font-black text-sm">
                      ✕
                    </span>
                  </div>
                  <span className="text-[9px] font-bold text-red-500 mt-1">
                    {t('Eaten', 'తిన్నది')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Equation Breakdown Box */}
          <div className="grid grid-cols-3 gap-2 pt-2 text-center">
            <div className="p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800">
              <span className="text-[10px] font-bold uppercase text-neutral-500 block">
                {t('Initial Apples', 'మొదట ఉన్నవి')}
              </span>
              <span className="text-xl font-black text-black dark:text-white">8</span>
            </div>

            <div className="p-2.5 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900/50">
              <span className="text-[10px] font-bold uppercase text-red-600 dark:text-red-400 block">
                {t('Eaten Away (−)', 'తీసివేసినవి (−)')}
              </span>
              <span className="text-xl font-black text-red-600 dark:text-red-400">3</span>
            </div>

            <div className="p-2.5 rounded-xl bg-[#D4F670]/20 border border-[#D4F670]/50">
              <span className="text-[10px] font-bold uppercase text-neutral-800 dark:text-[#D4F670] block">
                {t('Left Remaining (=)', 'మిగిలినవి (=)')}
              </span>
              <span className="text-xl font-black text-black dark:text-white">5</span>
            </div>
          </div>
        </div>

        {/* Prompt Requirement: "8 apples on a branch minus 3 eaten apples = 5 remaining" */}
        <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800/60 text-center">
          <p className="text-xs sm:text-sm font-bold text-black dark:text-white">
            {t(
              '8 apples on a branch minus 3 eaten apples = 5 remaining.',
              'కొమ్మపై ఉన్న 8 ఆపిల్స్ నుండి 3 తిన్న ఆపిల్స్ తీసివేస్తే = 5 మిగిలి ఉన్నాయి.'
            )}
          </p>
        </div>
      </div>
    );
  }

  // 3. COUNTING AND COUNTING GRID
  if (type === 'counting' || type === 'counting_grid') {
    const totalCount = data?.count || 7;
    const iconType = data?.icon || 'circle';

    return (
      <div className="w-full max-w-lg mx-auto bg-neutral-50 dark:bg-neutral-800/80 rounded-3xl p-5 md:p-6 border border-black/10 dark:border-white/10 shadow-xs space-y-4">
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
          <span>{t('Step-by-Step Counting Grid', 'దశలవారీగా లెక్కించే గ్రిడ్')}</span>
          <span className="text-black dark:text-white font-extrabold text-sm">
            {totalCount} {t('Items', 'వస్తువులు')}
          </span>
        </div>

        <div className="bg-white dark:bg-neutral-900 rounded-2xl p-5 border border-black/5 dark:border-white/5">
          <div className="grid grid-cols-5 gap-3 justify-items-center">
            {Array.from({ length: totalCount }).map((_, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="w-11 h-11 rounded-2xl bg-neutral-100 dark:bg-neutral-800 border border-black/10 dark:border-white/10 flex items-center justify-center text-xl shadow-xs">
                  {iconType === 'apple' ? '🍎' : iconType === 'star' ? '⭐' : '🔵'}
                </div>
                <span className="text-xs font-black text-black dark:text-white mt-1">
                  {idx + 1}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-black/5 dark:border-white/10 text-center">
            <span className="text-xs font-bold text-neutral-600 dark:text-neutral-400">
              {t(`Total Count: `, `మొత్తం సంఖ్య: `)}
              <span className="text-base font-black text-black dark:text-white">{totalCount}</span>
            </span>
          </div>
        </div>
      </div>
    );
  }

  // 4. 2D GEOMETRIC SHAPES
  if (type === 'shapes_geom') {
    return (
      <div className="w-full max-w-lg mx-auto bg-neutral-50 dark:bg-neutral-800/80 rounded-3xl p-5 md:p-6 border border-black/10 dark:border-white/10 shadow-xs space-y-4">
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
          <span>{t('2D Geometric Shapes & Properties', '2D రేఖాగణిత ఆకారాలు & లక్షణాలు')}</span>
          <span className="text-black dark:text-white font-extrabold text-xs">
            {t('Shapes', 'ఆకారాలు')}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {/* Triangle */}
          <div className="bg-white dark:bg-neutral-900 rounded-2xl p-3 border border-black/5 dark:border-white/5 flex flex-col items-center text-center">
            <svg viewBox="0 0 60 60" className="w-14 h-14 mb-2">
              <polygon points="30,8 8,50 52,50" fill="#F97316" stroke="#C2410C" strokeWidth="2.5" />
            </svg>
            <span className="font-extrabold text-sm text-black dark:text-white">
              {t('Triangle', 'త్రిభుజం')}
            </span>
            <span className="text-[10px] text-orange-600 dark:text-orange-400 font-bold mt-0.5">
              {t('3 Sides • 3 Corners', '3 భుజాలు • 3 మూలలు')}
            </span>
          </div>

          {/* Square */}
          <div className="bg-white dark:bg-neutral-900 rounded-2xl p-3 border border-black/5 dark:border-white/5 flex flex-col items-center text-center">
            <svg viewBox="0 0 60 60" className="w-14 h-14 mb-2">
              <rect x="10" y="10" width="40" height="40" rx="4" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="2.5" />
            </svg>
            <span className="font-extrabold text-sm text-black dark:text-white">
              {t('Square', 'చతురస్రం')}
            </span>
            <span className="text-[10px] text-blue-600 dark:text-blue-400 font-bold mt-0.5">
              {t('4 Equal Sides', '4 సమాన భుజాలు')}
            </span>
          </div>

          {/* Circle */}
          <div className="bg-white dark:bg-neutral-900 rounded-2xl p-3 border border-black/5 dark:border-white/5 flex flex-col items-center text-center">
            <svg viewBox="0 0 60 60" className="w-14 h-14 mb-2">
              <circle cx="30" cy="30" r="22" fill="#10B981" stroke="#047857" strokeWidth="2.5" />
            </svg>
            <span className="font-extrabold text-sm text-black dark:text-white">
              {t('Circle', 'వృత్తం')}
            </span>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold mt-0.5">
              {t('Round • 0 Corners', 'గుండ్రని • 0 మూలలు')}
            </span>
          </div>
        </div>
      </div>
    );
  }

  // 5. NUMBER BONDS TO 10
  if (type === 'number_bonds') {
    return (
      <div className="w-full max-w-lg mx-auto bg-neutral-50 dark:bg-neutral-800/80 rounded-3xl p-5 md:p-6 border border-black/10 dark:border-white/10 shadow-xs space-y-4">
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
          <span>{t('Tens Frame / Number Bonds', 'పదుల ఫ్రేమ్ / సంఖ్య బంధాలు')}</span>
          <span className="text-black dark:text-white font-black text-sm">
            7 + 3 = 10
          </span>
        </div>

        <div className="bg-white dark:bg-neutral-900 rounded-2xl p-4 border border-black/5 dark:border-white/5">
          <div className="grid grid-cols-5 gap-2.5">
            {[1, 2, 3, 4, 5, 6, 7].map((num) => (
              <div
                key={`b-${num}`}
                className="h-12 rounded-xl bg-blue-500 text-white font-extrabold flex items-center justify-center text-sm shadow-xs"
              >
                {num}
              </div>
            ))}
            {[8, 9, 10].map((num) => (
              <div
                key={`g-${num}`}
                className="h-12 rounded-xl bg-[#D4F670] text-[#1a1a1a] font-extrabold flex items-center justify-center text-sm shadow-xs"
              >
                +{num - 7}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-around mt-4 pt-3 border-t border-black/5 dark:border-white/10 text-xs font-bold text-neutral-700 dark:text-neutral-300">
            <span className="text-blue-600 dark:text-blue-400">🔵 {t('7 Blue Tokens', '7 నీలం టోకెన్లు')}</span>
            <span className="text-black dark:text-white">+</span>
            <span className="text-[#98c51e] dark:text-[#D4F670]">🟢 {t('3 Lime Tokens', '3 లైమ్ టోకెన్లు')}</span>
            <span className="text-black dark:text-white">=</span>
            <span className="font-extrabold text-black dark:text-white">10 {t('Total', 'మొత్తం')}</span>
          </div>
        </div>
      </div>
    );
  }

  // 6. MULTIPLICATION ARRAY
  if (type === 'multiplication_array') {
    return (
      <div className="w-full max-w-lg mx-auto bg-neutral-50 dark:bg-neutral-800/80 rounded-3xl p-5 md:p-6 border border-black/10 dark:border-white/10 shadow-xs space-y-4">
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
          <span>{t('Multiplication Array Grid', 'గుణకార శ్రేణి గ్రిడ్')}</span>
          <span className="text-black dark:text-white font-black text-sm">
            3 × 4 = 12
          </span>
        </div>

        <div className="bg-white dark:bg-neutral-900 rounded-2xl p-4 border border-black/5 dark:border-white/5 flex flex-col items-center gap-3">
          <div className="grid grid-cols-4 gap-3 p-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
              <div
                key={i}
                className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/60 border border-purple-400 flex items-center justify-center text-xs font-bold text-purple-700 dark:text-purple-300"
              >
                ★
              </div>
            ))}
          </div>
          <span className="text-xs font-bold text-neutral-600 dark:text-neutral-300">
            {t('3 rows with 4 stars each = 3 × 4 = 12', 'ప్రతి వరుసలో 4 నక్షత్రాలతో 3 వరుసలు = 3 × 4 = 12')}
          </span>
        </div>
      </div>
    );
  }

  // 7. FRACTION PIE
  if (type === 'fraction_pie') {
    return (
      <div className="w-full max-w-lg mx-auto bg-neutral-50 dark:bg-neutral-800/80 rounded-3xl p-5 md:p-6 border border-black/10 dark:border-white/10 shadow-xs space-y-4">
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
          <span>{t('Fraction Pie Diagram', 'భిన్నాల పై రేఖాచిత్రం')}</span>
          <span className="text-black dark:text-white font-black text-sm">
            3 / 4
          </span>
        </div>

        <div className="bg-white dark:bg-neutral-900 rounded-2xl p-5 border border-black/5 dark:border-white/5 flex flex-col sm:flex-row items-center justify-around gap-4">
          <svg viewBox="0 0 100 100" className="w-28 h-28 transform -rotate-90">
            <circle cx="50" cy="50" r="40" fill="transparent" stroke="#E2E8F0" strokeWidth="20" />
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
              stroke="#3B82F6"
              strokeWidth="20"
              strokeDasharray="251.2"
              strokeDashoffset="62.8"
            />
          </svg>

          <div className="text-left space-y-1.5">
            <span className="text-2xl font-black text-blue-600 dark:text-blue-400 block">
              3 / 4
            </span>
            <p className="text-xs text-neutral-600 dark:text-neutral-300 font-semibold">
              {t('3 Shaded Parts (Numerator)', '3 షేడ్ చేసిన భాగాలు (లవం)')}
            </p>
            <p className="text-xs text-neutral-400 dark:text-neutral-500">
              {t('4 Total Equal Slices (Denominator)', '4 మొత్తం సమాన భాగాలు (హారం)')}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // 8. EQUATION BALANCE SCALE
  if (type === 'equation_balance') {
    return (
      <div className="w-full max-w-lg mx-auto bg-neutral-50 dark:bg-neutral-800/80 rounded-3xl p-5 md:p-6 border border-black/10 dark:border-white/10 shadow-xs space-y-4">
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
          <span>{t('Algebraic Balance Scale', 'బీజగణిత త్రాసు సమతుల్యత')}</span>
          <span className="text-black dark:text-white font-black text-sm">
            2x + 4 = 16
          </span>
        </div>

        <div className="bg-white dark:bg-neutral-900 rounded-2xl p-5 border border-black/5 dark:border-white/5 space-y-4 text-center">
          {/* Stylized Balance Scale Graphic */}
          <div className="relative py-4 flex items-center justify-center">
            {/* Center Fulcrum */}
            <div className="w-full max-w-xs relative flex flex-col items-center">
              {/* Horizontal Beam */}
              <div className="w-full h-2.5 bg-neutral-700 dark:bg-neutral-300 rounded-full"></div>

              {/* Fulcrum Triangle */}
              <div className="w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-b-[24px] border-b-neutral-800 dark:border-b-neutral-200"></div>

              {/* Left Pan */}
              <div className="absolute -left-2 top-3 w-28 p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-300 dark:border-indigo-800">
                <span className="text-[11px] font-bold text-neutral-500 block">{t('Left Side', 'ఎడమ వైపు')}</span>
                <span className="text-sm font-black text-black dark:text-white">2x + 4</span>
              </div>

              {/* Right Pan */}
              <div className="absolute -right-2 top-3 w-28 p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800">
                <span className="text-[11px] font-bold text-neutral-500 block">{t('Right Side', 'కుడి వైపు')}</span>
                <span className="text-sm font-black text-black dark:text-white">16</span>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-xs font-semibold text-neutral-700 dark:text-neutral-300">
            {t(
              'Subtract 4 from both sides: 2x = 12. Then divide by 2: x = 6.',
              'ఇరువైపుల 4 తీసివేయండి: 2x = 12. తర్వాత 2 తో భాగించండి: x = 6.'
            )}
          </div>
        </div>
      </div>
    );
  }

  return null;
}
