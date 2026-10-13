import { Language } from '../types';

export type DiagramType =
  | 'big_small'
  | 'inside_outside'
  | 'up_down'
  | 'subtraction_apples'
  | 'number_bonds'
  | 'multiplication_array'
  | 'shapes_geom'
  | 'equation_balance'
  | 'double_digit_ops'
  | 'clock_24h'
  | 'currency_rupees_paise'
  | 'buying_selling'
  | 'meters_to_cm'
  | 'kg_to_grams'
  | 'triple_digit_ops'
  | 'time_conversions'
  | 'elapsed_time'
  | 'budget_expenditure'
  | 'profit_loss'
  | 'forex_currencies'
  | 'counting'
  | 'counting_grid';

interface MathDiagramProps {
  type: DiagramType;
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

  // 2. INSIDE - OUTSIDE (SPATIAL BOUNDARIES)
  if (type === 'inside_outside') {
    return (
      <div className="w-full max-w-lg mx-auto bg-neutral-50 dark:bg-neutral-800/80 rounded-3xl p-5 md:p-6 border border-black/10 dark:border-white/10 shadow-xs space-y-4">
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
          <span>{t('Spatial Position: Boundary Enclosure', 'స్థాన సంబంధ భావన: సరిహద్దు లోపల & వెలుపల')}</span>
          <span className="text-black dark:text-white font-extrabold text-xs">
            {t('Inside vs Outside', 'లోపల vs వెలుపల')}
          </span>
        </div>

        {/* Boundary Container Visualization */}
        <div className="relative bg-white dark:bg-neutral-900 rounded-2xl p-5 border border-black/5 dark:border-white/5 min-h-[220px] flex flex-col justify-between">
          <div className="flex items-center justify-between text-[11px] font-bold text-neutral-400 pb-2">
            <span>{t('Room / Boundary Area', 'గది / సరిహద్దు ప్రాంతం')}</span>
            <span className="text-amber-500 font-extrabold">{t('Exterior Ground', 'బయటి మైదానం')}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
            {/* INSIDE: Objects inside the container box */}
            <div className="p-4 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/40 border-2 border-dashed border-emerald-500 text-center flex flex-col items-center justify-center space-y-2 relative shadow-inner">
              <span className="absolute top-2 left-2.5 px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-600 text-white">
                {t('INSIDE', 'లోపల')}
              </span>
              <div className="text-4xl pt-4 space-x-2">
                <span title="Apple inside basket">🍎</span>
                <span title="Pencil inside box">✏️</span>
              </div>
              <p className="text-xs font-bold text-emerald-900 dark:text-emerald-300">
                {t('Apple & Pencil are INSIDE the box', 'ఆపిల్ మరియు పెన్సిల్ పెట్టె లోపల ఉన్నాయి')}
              </p>
              <span className="text-[10px] text-emerald-700 dark:text-emerald-400">
                {t('Enclosed by boundaries', 'సరిహద్దుల లోపల భద్రంగా ఉంది')}
              </span>
            </div>

            {/* OUTSIDE: Objects outside the boundary */}
            <div className="p-4 rounded-2xl bg-amber-50/80 dark:bg-amber-950/40 border-2 border-dashed border-amber-500 text-center flex flex-col items-center justify-center space-y-2 relative">
              <span className="absolute top-2 left-2.5 px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-amber-600 text-white">
                {t('OUTSIDE', 'వెలుపల')}
              </span>
              <div className="text-4xl pt-4 space-x-2">
                <span title="Soccer ball outside">⚽</span>
                <span title="Flower outside">🌸</span>
              </div>
              <p className="text-xs font-bold text-amber-900 dark:text-amber-300">
                {t('Ball & Flower are OUTSIDE the box', 'బంతి మరియు పువ్వు పెట్టె వెలుపల ఉన్నాయి')}
              </p>
              <span className="text-[10px] text-amber-700 dark:text-amber-400">
                {t('Located on the exterior', 'బయట ఉన్న ప్రదేశంలో ఉన్నాయి')}
              </span>
            </div>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-center">
          <p className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
            💡 {t('Inside is enclosed within walls or containers. Outside is in the open exterior.', 'లోపల అంటే పెట్టె లేదా గోడల పరిధిలో ఉండటం. వెలుపల అంటే బయటి భాగంలో ఉండటం.')}
          </p>
        </div>
      </div>
    );
  }

  // 3. UP - DOWN (VERTICAL POSITIONS)
  if (type === 'up_down') {
    return (
      <div className="w-full max-w-lg mx-auto bg-neutral-50 dark:bg-neutral-800/80 rounded-3xl p-5 md:p-6 border border-black/10 dark:border-white/10 shadow-xs space-y-4">
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
          <span>{t('Vertical Elevation Comparison', 'నిలువు స్థానాల పోలిక')}</span>
          <span className="text-black dark:text-white font-extrabold text-xs">
            {t('Up vs Down', 'పైన vs కింద')}
          </span>
        </div>

        <div className="bg-white dark:bg-neutral-900 rounded-2xl p-5 border border-black/5 dark:border-white/5 space-y-4">
          {/* UP Zone (High in sky) */}
          <div className="p-3.5 rounded-2xl bg-sky-50 dark:bg-sky-950/40 border border-sky-300 dark:border-sky-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-4xl">☀️ 🪁</span>
              <div>
                <span className="font-extrabold text-sm text-sky-900 dark:text-sky-200 block">
                  {t('Sun & Kite in the Sky', 'ఆకాశంలో సూర్యుడు & గాలిపటం')}
                </span>
                <span className="text-[11px] text-sky-700 dark:text-sky-400">
                  {t('Higher vertical position', 'ఎత్తైన ప్రదేశంలో ఉన్నాయి')}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-600 text-white font-black text-xs">
              <span>⬆️</span>
              <span>{t('UP', 'పైన')}</span>
            </div>
          </div>

          {/* Vertical Elevation Arrow Indicator */}
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-neutral-400">
            <span>↕️</span>
            <span>{t('Vertical Elevation Axis', 'ఎత్తు మరియు దిగువ అక్షం')}</span>
          </div>

          {/* DOWN Zone (On ground) */}
          <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-4xl">🌱 ⚽</span>
              <div>
                <span className="font-extrabold text-sm text-emerald-900 dark:text-emerald-200 block">
                  {t('Grass & Ball on the Ground', 'నేలపై గడ్డి & బంతి')}
                </span>
                <span className="text-[11px] text-emerald-700 dark:text-emerald-400">
                  {t('Lower vertical position', 'దిగువ ప్రదేశంలో ఉన్నాయి')}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-600 text-white font-black text-xs">
              <span>⬇️</span>
              <span>{t('DOWN', 'కింద')}</span>
            </div>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-center">
          <p className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
            💡 {t('Up means higher towards the sky. Down means lower towards the ground.', 'పైన అంటే ఆకాశం వైపు ఎత్తులో ఉండటం. కింద అంటే నేల వైపు దిగువన ఉండటం.')}
          </p>
        </div>
      </div>
    );
  }

  // 4. SUBTRACTION APPLES (8 - 3 = 5)
  if (type === 'subtraction_apples') {
    return (
      <div className="w-full max-w-lg mx-auto bg-neutral-50 dark:bg-neutral-800/80 rounded-3xl p-5 md:p-6 border border-black/10 dark:border-white/10 shadow-xs space-y-4">
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
          <span>{t('Object Removal Diagram (Subtraction)', 'వస్తువుల తీసివేత రేఖాచిత్రం')}</span>
          <span className="text-black dark:text-white font-black text-sm">
            8 − 3 = 5
          </span>
        </div>

        <div className="bg-white dark:bg-neutral-900 rounded-2xl p-4 md:p-5 border border-black/5 dark:border-white/5 space-y-4">
          <div className="relative">
            <div className="w-full h-3 bg-amber-800 dark:bg-amber-900 rounded-full relative">
              <div className="absolute -top-1 left-4 w-3 h-3 bg-emerald-600 rounded-full"></div>
              <div className="absolute -bottom-1 right-8 w-3 h-3 bg-emerald-600 rounded-full"></div>
            </div>

            <div className="flex items-center justify-between pt-3 px-2">
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

              <div className="text-xl md:text-2xl font-black text-black dark:text-white select-none px-1">
                −
              </div>

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

  // 5. NUMBER BONDS / TENS FRAME (7 + 3 = 10)
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

  // 6. MULTIPLICATION ARRAY (3 × 4 = 12)
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

  // 7. 2D GEOMETRIC SHAPES
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

  // 8. EQUATION BALANCE SCALE (2x + 4 = 16)
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
          <div className="relative py-4 flex items-center justify-center">
            <div className="w-full max-w-xs relative flex flex-col items-center">
              <div className="w-full h-2.5 bg-neutral-700 dark:bg-neutral-300 rounded-full"></div>
              <div className="w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-b-[24px] border-b-neutral-800 dark:border-b-neutral-200"></div>

              <div className="absolute -left-2 top-3 w-28 p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-300 dark:border-indigo-800">
                <span className="text-[11px] font-bold text-neutral-500 block">{t('Left Side', 'ఎడమ వైపు')}</span>
                <span className="text-sm font-black text-black dark:text-white">2x + 4</span>
              </div>

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

  // 9. DOUBLE-DIGIT OPERATIONS (PLACE VALUE COLUMN TABLE)
  if (type === 'double_digit_ops') {
    return (
      <div className="w-full max-w-lg mx-auto bg-neutral-50 dark:bg-neutral-800/80 rounded-3xl p-5 md:p-6 border border-black/10 dark:border-white/10 shadow-xs space-y-4">
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
          <span>{t('Double-Digit Place Value Columns', 'ద్విఅంకె స్థాన విలువల పట్టిక')}</span>
          <span className="text-black dark:text-white font-black text-sm">
            45 + 23 = 68
          </span>
        </div>

        <div className="bg-white dark:bg-neutral-900 rounded-2xl p-5 border border-black/5 dark:border-white/5 space-y-4">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800">
              <span className="text-xs font-bold text-blue-700 dark:text-blue-300 block mb-1">
                {t('Tens (పదులు)', 'పదుల స్థానం (Tens)')}
              </span>
              <div className="text-2xl font-black text-black dark:text-white space-y-1">
                <div>40</div>
                <div>+ 20</div>
                <div className="border-t border-black/20 dark:border-white/20 pt-1 text-blue-600 dark:text-blue-400">= 60</div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 block mb-1">
                {t('Units (ఒకట్లు)', 'విడి స్థానం (Units)')}
              </span>
              <div className="text-2xl font-black text-black dark:text-white space-y-1">
                <div>5</div>
                <div>+ 3</div>
                <div className="border-t border-black/20 dark:border-white/20 pt-1 text-emerald-600 dark:text-emerald-400">= 8</div>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#D4F670]/20 border border-[#D4F670]/50 text-center">
            <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
              {t('Combined Result: 60 + 8 = 68', 'మొత్తం ఫలితం: 60 + 8 = 68')}
            </span>
          </div>
        </div>
      </div>
    );
  }

  // 10. 24 HOURS IDENTIFICATION (12-HOUR vs 24-HOUR DUAL CLOCK)
  if (type === 'clock_24h') {
    return (
      <div className="w-full max-w-lg mx-auto bg-neutral-50 dark:bg-neutral-800/80 rounded-3xl p-5 md:p-6 border border-black/10 dark:border-white/10 shadow-xs space-y-4">
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
          <span>{t('12-Hour vs 24-Hour Railway Time', '12 గంటలు vs 24 గంటల రైల్వే సమయం')}</span>
          <span className="text-black dark:text-white font-extrabold text-xs">
            {t('Clock Converter', 'గడియార మార్పిడి')}
          </span>
        </div>

        <div className="bg-white dark:bg-neutral-900 rounded-2xl p-5 border border-black/5 dark:border-white/5 space-y-3">
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800">
              <span className="text-neutral-400 font-bold block text-[10px]">{t('12-Hr Time', '12 గంటలు')}</span>
              <span className="text-sm font-extrabold text-black dark:text-white mt-1 block">08:00 AM</span>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">08:00</span>
            </div>
            <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800">
              <span className="text-indigo-400 font-bold block text-[10px]">{t('Afternoon (+12)', 'మధ్యాహ్నం (+12)')}</span>
              <span className="text-sm font-extrabold text-indigo-900 dark:text-indigo-200 mt-1 block">03:00 PM</span>
              <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold">15:00</span>
            </div>
            <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800">
              <span className="text-purple-400 font-bold block text-[10px]">{t('Night (+12)', 'రాత్రి (+12)')}</span>
              <span className="text-sm font-extrabold text-purple-900 dark:text-purple-200 mt-1 block">08:00 PM</span>
              <span className="text-[10px] text-purple-600 dark:text-purple-400 font-bold">20:00</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-center text-xs">
            <p className="font-bold text-neutral-800 dark:text-neutral-200">
              💡 {t('For PM hours, add 12 (3 PM + 12 = 15:00). Midnight 12 AM is 00:00.', 'PM గంటలకు 12 కలపాలి (3 PM + 12 = 15:00). అర్ధరాత్రి 12 AM అంటే 00:00.')}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // 11. CONVERTING RUPEES TO PAISE
  if (type === 'currency_rupees_paise') {
    return (
      <div className="w-full max-w-lg mx-auto bg-neutral-50 dark:bg-neutral-800/80 rounded-3xl p-5 md:p-6 border border-black/10 dark:border-white/10 shadow-xs space-y-4">
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
          <span>{t('Currency Conversion Standard', 'కరెన్సీ మార్పిడి ప్రమాణం')}</span>
          <span className="text-black dark:text-white font-black text-sm">
            ₹1 = 100 Paise
          </span>
        </div>

        <div className="bg-white dark:bg-neutral-900 rounded-2xl p-5 border border-black/5 dark:border-white/5 space-y-4">
          <div className="flex items-center justify-around p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-center">
            <div>
              <span className="text-3xl block">🪙</span>
              <span className="font-extrabold text-sm text-black dark:text-white mt-1 block">1 Rupee (₹1)</span>
            </div>
            <span className="text-2xl font-black text-amber-600 dark:text-amber-400">=</span>
            <div>
              <span className="text-3xl block">💰</span>
              <span className="font-extrabold text-sm text-black dark:text-white mt-1 block">100 Paise</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 space-y-1.5 text-xs text-neutral-800 dark:text-neutral-200">
            <div className="flex justify-between font-bold">
              <span>₹15.50 = 15.50 × 100</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">1550 Paise</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>₹20.30 = 20.30 × 100</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">2030 Paise</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 12. BUYING AND SELLING (RETAIL RECEIPT)
  if (type === 'buying_selling') {
    return (
      <div className="w-full max-w-lg mx-auto bg-neutral-50 dark:bg-neutral-800/80 rounded-3xl p-5 md:p-6 border border-black/10 dark:border-white/10 shadow-xs space-y-4">
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
          <span>{t('Store Transaction & Change Bill', 'స్టోర్ లావాదేవీ & మిగిలిన సొమ్ము బిల్లు')}</span>
          <span className="text-black dark:text-white font-extrabold text-xs">
            {t('Bill Receipt', 'రసీదు')}
          </span>
        </div>

        <div className="bg-white dark:bg-neutral-900 rounded-2xl p-5 border border-black/5 dark:border-white/5 space-y-3 font-mono text-xs">
          <div className="border-b border-dashed border-neutral-300 dark:border-neutral-700 pb-2 text-center">
            <span className="font-black text-sm text-black dark:text-white block">{t('GANITMITRA STATIONERY', 'గణిత్ మిత్ర స్టేషనరీ')}</span>
            <span className="text-[10px] text-neutral-400">{t('Transaction Receipt', 'లావాదేవీ రసీదు')}</span>
          </div>

          <div className="space-y-1.5 text-neutral-700 dark:text-neutral-300">
            <div className="flex justify-between">
              <span>3 Pens @ ₹12 each</span>
              <span className="font-bold">₹36.00</span>
            </div>
            <div className="flex justify-between font-bold text-black dark:text-white border-t border-neutral-200 dark:border-neutral-800 pt-1">
              <span>Total Bill (మొత్తం ఖర్చు)</span>
              <span>₹36.00</span>
            </div>
            <div className="flex justify-between text-blue-600 dark:text-blue-400">
              <span>Cash Paid (చెల్లించిన నోటు)</span>
              <span>₹50.00</span>
            </div>
            <div className="flex justify-between font-black text-emerald-600 dark:text-emerald-400 border-t border-dashed border-neutral-300 dark:border-neutral-700 pt-1">
              <span>Change Returned (మిగిలిన డబ్బు)</span>
              <span>₹14.00</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 13. METERS TO CENTIMETERS (METRIC RULER)
  if (type === 'meters_to_cm') {
    return (
      <div className="w-full max-w-lg mx-auto bg-neutral-50 dark:bg-neutral-800/80 rounded-3xl p-5 md:p-6 border border-black/10 dark:border-white/10 shadow-xs space-y-4">
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
          <span>{t('Metric Length Scale', 'కొలతల స్కేల్ (మీటర్లు & సెం.మీ.)')}</span>
          <span className="text-black dark:text-white font-black text-sm">
            1 m = 100 cm
          </span>
        </div>

        <div className="bg-white dark:bg-neutral-900 rounded-2xl p-5 border border-black/5 dark:border-white/5 space-y-4">
          <div className="p-3 bg-amber-100 dark:bg-amber-950/60 rounded-xl border border-amber-300 dark:border-amber-800">
            <div className="flex justify-between text-[10px] font-bold text-amber-900 dark:text-amber-200 mb-1">
              <span>0 cm</span>
              <span>25 cm</span>
              <span>50 cm</span>
              <span>75 cm</span>
              <span>100 cm (1 Meter)</span>
            </div>
            <div className="w-full h-4 bg-amber-300 dark:bg-amber-700 rounded-md relative flex items-center justify-between px-1">
              <div className="h-full w-0.5 bg-black/40"></div>
              <div className="h-2 w-0.5 bg-black/30"></div>
              <div className="h-full w-0.5 bg-black/40"></div>
              <div className="h-2 w-0.5 bg-black/30"></div>
              <div className="h-full w-0.5 bg-black/40"></div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-xs text-center font-bold text-neutral-800 dark:text-neutral-200">
            <p>12 Meters = 12 × 100 = 1200 Centimeters (సెం.మీ.)</p>
          </div>
        </div>
      </div>
    );
  }

  // 14. KILOGRAMS TO GRAMS (WEIGHT BALANCE)
  if (type === 'kg_to_grams') {
    return (
      <div className="w-full max-w-lg mx-auto bg-neutral-50 dark:bg-neutral-800/80 rounded-3xl p-5 md:p-6 border border-black/10 dark:border-white/10 shadow-xs space-y-4">
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
          <span>{t('Mass & Weight Scale', 'ద్రవ్యరాశి మరియు బరువు ప్రమాణం')}</span>
          <span className="text-black dark:text-white font-black text-sm">
            1 kg = 1000 g
          </span>
        </div>

        <div className="bg-white dark:bg-neutral-900 rounded-2xl p-5 border border-black/5 dark:border-white/5 space-y-4">
          <div className="flex items-center justify-around p-3 bg-neutral-100 dark:bg-neutral-800 rounded-xl text-center">
            <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-950/60 border border-blue-300 dark:border-blue-800">
              <span className="text-xl block">⚖️</span>
              <span className="font-extrabold text-sm text-black dark:text-white mt-1 block">1 Kilogram (కేజీ)</span>
            </div>
            <span className="text-xl font-black text-neutral-400">=</span>
            <div className="p-3 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800">
              <span className="text-xl block">📦</span>
              <span className="font-extrabold text-sm text-black dark:text-white mt-1 block">1000 Grams (గ్రాములు)</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 text-xs text-center font-semibold text-neutral-700 dark:text-neutral-300">
            {t('50.3 kg × 1000 = 50,300 grams. Always multiply by 1000.', '50.3 కిలోలు × 1000 = 50,300 గ్రాములు. కిలోలను గ్రాములకు మార్చడానికి 1000 తో గుణించండి.')}
          </div>
        </div>
      </div>
    );
  }

  // 15. TRIPLE-DIGIT OPERATIONS (HUNDREDS, TENS, UNITS PLACE VALUES)
  if (type === 'triple_digit_ops') {
    return (
      <div className="w-full max-w-lg mx-auto bg-neutral-50 dark:bg-neutral-800/80 rounded-3xl p-5 md:p-6 border border-black/10 dark:border-white/10 shadow-xs space-y-4">
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
          <span>{t('Triple-Digit Place Value Breakdown', 'త్రిఅంకె స్థాన విలువల విభజన')}</span>
          <span className="text-black dark:text-white font-black text-sm">
            345 + 231 = 576
          </span>
        </div>

        <div className="bg-white dark:bg-neutral-900 rounded-2xl p-5 border border-black/5 dark:border-white/5 space-y-3">
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800">
              <span className="text-purple-600 dark:text-purple-300 font-bold block text-[10px]">{t('Hundreds (వందలు)', 'వందలు')}</span>
              <span className="text-sm font-extrabold text-black dark:text-white mt-1 block">300 + 200</span>
              <span className="text-xs font-black text-purple-600 dark:text-purple-400">= 500</span>
            </div>
            <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800">
              <span className="text-blue-600 dark:text-blue-300 font-bold block text-[10px]">{t('Tens (పదులు)', 'పదులు')}</span>
              <span className="text-sm font-extrabold text-black dark:text-white mt-1 block">40 + 30</span>
              <span className="text-xs font-black text-blue-600 dark:text-blue-400">= 70</span>
            </div>
            <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
              <span className="text-emerald-600 dark:text-emerald-300 font-bold block text-[10px]">{t('Units (ఒకట్లు)', 'ఒకట్లు')}</span>
              <span className="text-sm font-extrabold text-black dark:text-white mt-1 block">5 + 1</span>
              <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">= 6</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#D4F670]/20 border border-[#D4F670]/50 text-center font-bold text-xs text-neutral-800 dark:text-neutral-200">
            500 + 70 + 6 = 576
          </div>
        </div>
      </div>
    );
  }

  // 16. TIME CONVERSIONS (HOURS TO MINUTES WHEEL)
  if (type === 'time_conversions') {
    return (
      <div className="w-full max-w-lg mx-auto bg-neutral-50 dark:bg-neutral-800/80 rounded-3xl p-5 md:p-6 border border-black/10 dark:border-white/10 shadow-xs space-y-4">
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
          <span>{t('Time Ratio: Hours & Minutes', 'సమయ నిష్పత్తి: గంటలు & నిమిషాలు')}</span>
          <span className="text-black dark:text-white font-black text-sm">
            1 Hour = 60 Min
          </span>
        </div>

        <div className="bg-white dark:bg-neutral-900 rounded-2xl p-5 border border-black/5 dark:border-white/5 space-y-4">
          <div className="grid grid-cols-2 gap-3 text-center text-xs">
            <div className="p-3 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800">
              <span className="text-sky-700 dark:text-sky-300 font-bold block">{t('Multiply by 60', '60 తో గుణించండి')}</span>
              <span className="text-sm font-black text-black dark:text-white mt-1 block">Hours ➔ Minutes</span>
              <span className="text-[11px] text-neutral-500 mt-1 block">12 Hours × 60 = 720 mins</span>
            </div>
            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800">
              <span className="text-amber-700 dark:text-amber-300 font-bold block">{t('Divide by 60', '60 తో భాగించండి')}</span>
              <span className="text-sm font-black text-black dark:text-white mt-1 block">Minutes ➔ Hours</span>
              <span className="text-[11px] text-neutral-500 mt-1 block">120 mins ÷ 60 = 2 Hours</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 17. ELAPSED TIME (JOURNEY TIMELINE)
  if (type === 'elapsed_time') {
    return (
      <div className="w-full max-w-lg mx-auto bg-neutral-50 dark:bg-neutral-800/80 rounded-3xl p-5 md:p-6 border border-black/10 dark:border-white/10 shadow-xs space-y-4">
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
          <span>{t('Elapsed Time Interval Timeline', 'గడిచిన సమయ వ్యవధి టైమ్‌లైన్')}</span>
          <span className="text-black dark:text-white font-extrabold text-xs">
            {t('Duration = 6 Hours', 'వ్యవధి = 6 గంటలు')}
          </span>
        </div>

        <div className="bg-white dark:bg-neutral-900 rounded-2xl p-5 border border-black/5 dark:border-white/5 space-y-4">
          <div className="flex items-center justify-between relative px-2">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-emerald-500 text-white text-xs font-black flex items-center justify-center">
                A
              </div>
              <span className="text-xs font-bold text-black dark:text-white mt-1">08:30 AM</span>
              <span className="text-[10px] text-neutral-400">{t('Departure', 'బయలుదేరు')}</span>
            </div>

            <div className="flex-1 px-4 flex flex-col items-center">
              <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 mb-1">+6 Hours</span>
              <div className="w-full h-1.5 bg-emerald-500 rounded-full"></div>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-blue-500 text-white text-xs font-black flex items-center justify-center">
                B
              </div>
              <span className="text-xs font-bold text-black dark:text-white mt-1">02:30 PM</span>
              <span className="text-[10px] text-neutral-400">{t('Arrival', 'చేరుకొను')}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 18. BUDGETING AND EXPENDITURE (FINANCIAL BREAKDOWN)
  if (type === 'budget_expenditure') {
    return (
      <div className="w-full max-w-lg mx-auto bg-neutral-50 dark:bg-neutral-800/80 rounded-3xl p-5 md:p-6 border border-black/10 dark:border-white/10 shadow-xs space-y-4">
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
          <span>{t('Income & Expense Budgeting', 'ఆదాయం మరియు ఖర్చుల బడ్జెట్')}</span>
          <span className="text-black dark:text-white font-black text-sm">
            Savings = Income - Expenses
          </span>
        </div>

        <div className="bg-white dark:bg-neutral-900 rounded-2xl p-5 border border-black/5 dark:border-white/5 space-y-3 text-xs">
          <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 flex justify-between font-bold">
            <span className="text-blue-800 dark:text-blue-300">Total Income (మొత్తం ఆదాయం)</span>
            <span className="text-blue-900 dark:text-blue-200">₹15,000</span>
          </div>
          <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 flex justify-between font-bold">
            <span className="text-red-800 dark:text-red-300">Total Expenses (మొత్తం ఖర్చులు)</span>
            <span className="text-red-900 dark:text-red-200">− ₹11,000</span>
          </div>
          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 flex justify-between font-black">
            <span className="text-emerald-800 dark:text-emerald-300">Net Savings (మిగిలిన పొదుపు)</span>
            <span className="text-emerald-900 dark:text-emerald-200">₹4,000</span>
          </div>
        </div>
      </div>
    );
  }

  // 19. PROFIT AND LOSS (MARGIN BAR)
  if (type === 'profit_loss') {
    return (
      <div className="w-full max-w-lg mx-auto bg-neutral-50 dark:bg-neutral-800/80 rounded-3xl p-5 md:p-6 border border-black/10 dark:border-white/10 shadow-xs space-y-4">
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
          <span>{t('Profit & Loss Pricing Structure', 'లాభం మరియు నష్టం ధరల విధానం')}</span>
          <span className="text-black dark:text-white font-black text-sm">
            Profit = SP − CP
          </span>
        </div>

        <div className="bg-white dark:bg-neutral-900 rounded-2xl p-5 border border-black/5 dark:border-white/5 space-y-3 text-xs">
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800">
              <span className="text-[10px] text-neutral-400 font-bold block">{t('Cost Price (CP)', 'కొన్న ధర (CP)')}</span>
              <span className="text-sm font-black text-black dark:text-white mt-1 block">₹300</span>
              <span className="text-[10px] text-neutral-500 block">20 pens @ ₹15</span>
            </div>
            <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold block">{t('Profit (+)', 'లాభం (+)')}</span>
              <span className="text-sm font-black text-emerald-600 dark:text-emerald-400 mt-1 block">+₹55</span>
              <span className="text-[10px] text-emerald-500 block">{t('Earned', 'ఆర్జించినది')}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800">
              <span className="text-[10px] text-blue-600 dark:text-blue-400 font-bold block">{t('Selling Price', 'అమ్మిన ధర (SP)')}</span>
              <span className="text-sm font-black text-blue-600 dark:text-blue-400 mt-1 block">₹355</span>
              <span className="text-[10px] text-blue-500 block">₹17.75 per pen</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 20. COUNTRY CURRENCIES (FOREX KIOSK)
  if (type === 'forex_currencies') {
    return (
      <div className="w-full max-w-lg mx-auto bg-neutral-50 dark:bg-neutral-800/80 rounded-3xl p-5 md:p-6 border border-black/10 dark:border-white/10 shadow-xs space-y-4">
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
          <span>{t('Foreign Currency Exchange Kiosk', 'విదేశీ కరెన్సీ మారకం కౌంటర్')}</span>
          <span className="text-black dark:text-white font-black text-sm">
            $1 USD = ₹80 INR
          </span>
        </div>

        <div className="bg-white dark:bg-neutral-900 rounded-2xl p-5 border border-black/5 dark:border-white/5 space-y-3 text-xs">
          <div className="flex items-center justify-around p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center">
            <div>
              <span className="text-2xl block">💵</span>
              <span className="font-extrabold text-sm text-black dark:text-white mt-1 block">1 US Dollar ($)</span>
            </div>
            <span className="text-xl font-black text-emerald-600 dark:text-emerald-400">⇄</span>
            <div>
              <span className="text-2xl block">₹</span>
              <span className="font-extrabold text-sm text-black dark:text-white mt-1 block">80 Rupees (INR)</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 space-y-1 font-semibold text-neutral-800 dark:text-neutral-200">
            <div className="flex justify-between">
              <span>$12 Dollars ➔ Rupees</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">12 × 80 = ₹960</span>
            </div>
            <div className="flex justify-between">
              <span>₹220 Rupees ➔ Dollars</span>
              <span className="font-bold text-blue-600 dark:text-blue-400">220 ÷ 80 = $2.75</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // FALLBACK COUNTING GRID (ONLY IF EXPLICITLY COUNTING ITEMS)
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

  return null;
}
