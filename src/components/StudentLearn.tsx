import { useState, useEffect } from 'react';
import { CheckCircle, ArrowRight, PlayCircle, Volume2, VolumeX, GraduationCap } from 'lucide-react';
import { StudentLevel, Language, StudentClass, STUDENT_CLASS_OPTIONS } from '../types';
import { speakExplanation, stopSpeaking } from '../utils/voiceExplanation';

interface StudentLearnProps {
  level: StudentLevel;
  t: (en: string, te: string) => string;
  onPractice: () => void;
  language?: Language;
  studentClass?: StudentClass;
}

interface MathTopic {
  titleEn: string;
  titleTe: string;
  summaryEn: string;
  summaryTe: string;
  exampleProblem: string;
  stepsEn: string[];
  stepsTe: string[];
  keyTakeawayEn: string;
  keyTakeawayTe: string;
}

export default function StudentLearn({ level, t, onPractice, language = 'en', studentClass }: StudentLearnProps) {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const currentClassMeta = studentClass ? STUDENT_CLASS_OPTIONS.find((c) => c.value === studentClass) : null;

  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, []);

  useEffect(() => {
    stopSpeaking();
    setIsSpeaking(false);
  }, [activeTab]);

  const handleSpeakLesson = () => {
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
      return;
    }

    const title = language === 'te' ? currentTopic.titleTe : currentTopic.titleEn;
    const summary = language === 'te' ? currentTopic.summaryTe : currentTopic.summaryEn;
    const takeaway = language === 'te' ? currentTopic.keyTakeawayTe : currentTopic.keyTakeawayEn;
    const textToSpeak = `${title}. ${summary}. ${
      language === 'te' ? 'ముఖ్యమైన అంశం: ' : 'Key takeaway: '
    }${takeaway}`;

    speakExplanation(
      textToSpeak,
      language,
      () => setIsSpeaking(true),
      () => setIsSpeaking(false),
      () => setIsSpeaking(false)
    );
  };

  const topicsByLevel: Record<StudentLevel, MathTopic[]> = {
    Beginner: [
      {
        titleEn: 'Addition with Number Bonds',
        titleTe: 'సంఖ్య బంధాలతో కూడిక',
        summaryEn: 'Number bonds break numbers into pairs that make mental addition effortless.',
        summaryTe: 'సంఖ్య బంధాలు సులభంగా కూడటానికి సంఖ్యలను జంటలుగా విభజిస్తాయి.',
        exampleProblem: '8 + 6 = ?',
        stepsEn: [
          'Step 1: Identify how much 8 needs to make 10. (8 + 2 = 10)',
          'Step 2: Split 6 into 2 and 4. (6 = 2 + 4)',
          'Step 3: Add 8 + 2 to get 10, then add the remaining 4: 10 + 4 = 14.',
        ],
        stepsTe: [
          'దశ 1: 8 కి 10 కావడానికి ఎంత కావాలో గుర్తించండి. (8 + 2 = 10)',
          'దశ 2: 6 ని 2 మరియు 4 గా విభజించండి. (6 = 2 + 4)',
          'దశ 3: 10 పొందడానికి 8 + 2 కూడండి, ఆపై మిగిలిన 4 ని కలపండి: 10 + 4 = 14.',
        ],
        keyTakeawayEn: 'Always look for combinations that make 10 first!',
        keyTakeawayTe: 'ఎల్లప్పుడూ మొదట 10 చేసే సంఖ్యల కలయికలను వెతకండి!',
      },
      {
        titleEn: 'Subtraction: Counting Backwards',
        titleTe: 'తీసివేత: వెనుకకు లెక్కించడం',
        summaryEn: 'Use a visual number line to step backwards smoothly.',
        summaryTe: 'వెనుకకు లెక్కించడానికి సంఖ్యా రేఖను ఉపయోగించండి.',
        exampleProblem: '15 - 7 = ?',
        stepsEn: [
          'Step 1: Start at 15 on your number line.',
          'Step 2: Jump back 5 to reach a friendly round 10. (15 - 5 = 10)',
          'Step 3: You still need to subtract 2 more (since 5 + 2 = 7). 10 - 2 = 8.',
        ],
        stepsTe: [
          'దశ 1: మీ సంఖ్యా రేఖపై 15 వద్ద ప్రారంభించండి.',
          'దశ 2: 10 చేరుకోవడానికి 5 వెనక్కి వెళ్ళండి. (15 - 5 = 10)',
          'దశ 3: మీరు ఇంకా 2 తీసివేయాలి (5 + 2 = 7 కాబట్టి). 10 - 2 = 8.',
        ],
        keyTakeawayEn: 'Breaking the subtractor into parts makes large subtractions quick.',
        keyTakeawayTe: 'తీసివేసే సంఖ్యను విభజించడం ద్వారా పెద్ద తీసివేతలు సులభం అవుతాయి.',
      },
    ],
    Intermediate: [
      {
        titleEn: 'Multiplication by Distributive Property',
        titleTe: 'పంపిణీ న్యాయం ద్వారా గుణకారం',
        summaryEn: 'Break difficult multiplication factors into round, friendly chunks.',
        summaryTe: 'కష్టమైన గుణకారాలను సులభమైన భాగాలుగా విభజించండి.',
        exampleProblem: '14 × 6 = ?',
        stepsEn: [
          'Step 1: Break 14 into (10 + 4).',
          'Step 2: Multiply 10 × 6 = 60.',
          'Step 3: Multiply 4 × 6 = 24.',
          'Step 4: Add the two partial products: 60 + 24 = 84.',
        ],
        stepsTe: [
          'దశ 1: 14 ని (10 + 4) గా విభజించండి.',
          'దశ 2: 10 × 6 = 60 గుణించండి.',
          'దశ 3: 4 × 6 = 24 గుణించండి.',
          'దశ 4: రెండు ఉత్పత్తులను కలపండి: 60 + 24 = 84.',
        ],
        keyTakeawayEn: 'Multiplying by 10 is fast—always break numbers into 10s and units.',
        keyTakeawayTe: '10 తో గుణించడం చాలా వేగంగా ఉంటుంది!',
      },
      {
        titleEn: 'Division as Equal Sharing & Inverses',
        titleTe: 'సమాన భాగస్వామ్యంగా భాగహారం',
        summaryEn: 'Division is the exact inverse operation of multiplication.',
        summaryTe: 'భాగహారం అనేది గుణకారానికి వ్యతిరేక ప్రక్రియ.',
        exampleProblem: '48 ÷ 6 = ?',
        stepsEn: [
          'Step 1: Ask yourself: "What number multiplied by 6 equals 48?"',
          'Step 2: Recall 6 times table: 6 × 7 = 42, 6 × 8 = 48.',
          'Step 3: Therefore, 48 ÷ 6 = 8 with zero remainder.',
        ],
        stepsTe: [
          'దశ 1: 6 తో ఏ సంఖ్యను గుణిస్తే 48 వస్తుందో ఆలోచించండి.',
          'దశ 2: 6 ఎక్కం గుర్తుచేసుకోండి: 6 × 8 = 48.',
          'దశ 3: కాబట్టి, 48 ÷ 6 = 8.',
        ],
        keyTakeawayEn: 'Mastering multiplication tables unlocks instant division answers.',
        keyTakeawayTe: 'గుణకార పట్టికలు తెలిస్తే భాగహారం సులభం!',
      },
    ],
    Advanced: [
      {
        titleEn: 'Balancing Linear Equations',
        titleTe: 'సరళ సమీకరణాల సమతుల్యత',
        summaryEn: 'Think of an equation like a balanced scale: whatever you do to one side, you must do to the other.',
        summaryTe: 'సమీకరణాన్ని ఒక త్రాసులా భావించండి: ఒక వైపు ఏమి చేసినా రెండో వైపు కూడా చేయాలి.',
        exampleProblem: '3x + 6 = 27',
        stepsEn: [
          'Step 1: Subtract 6 from both sides to isolate terms with x: 3x = 27 - 6 = 21.',
          'Step 2: Divide both sides by 3: x = 21 / 3.',
          'Step 3: Solve: x = 7.',
          'Step 4: Check your answer: 3(7) + 6 = 21 + 6 = 27 (Verified!).',
        ],
        stepsTe: [
          'దశ 1: రెండు వైపులా 6 తీసివేయండి: 3x = 21.',
          'దశ 2: రెండు వైపులా 3 తో భాగించండి: x = 21 / 3.',
          'దశ 3: సాధన: x = 7.',
          'దశ 4: తనిఖీ చేయండి: 3(7) + 6 = 27 (సరైనది!).',
        ],
        keyTakeawayEn: 'Perform inverse operations in reverse order of operations (PEMDAS in reverse).',
        keyTakeawayTe: 'సమీకరణాలను సాధించడానికి వ్యతిరేక ప్రక్రియలను అనుసరించండి.',
      },
      {
        titleEn: 'Working with Fractions & Unlike Denominators',
        titleTe: 'భిన్నాలు మరియు విభిన్న హారాలు',
        summaryEn: 'Find a common denominator before adding or subtracting fractions.',
        summaryTe: 'భిన్నాలను కూడేటప్పుడు లేదా తీసివేసేటప్పుడు ఉమ్మడి హారాన్ని కనుగొనండి.',
        exampleProblem: '1/3 + 2/5 = ?',
        stepsEn: [
          'Step 1: Find the least common multiple of 3 and 5, which is 15.',
          'Step 2: Convert 1/3 = 5/15 (multiply numerator and denominator by 5).',
          'Step 3: Convert 2/5 = 6/15 (multiply numerator and denominator by 3).',
          'Step 4: Add numerators: 5/15 + 6/15 = 11/15.',
        ],
        stepsTe: [
          'దశ 1: 3 మరియు 5 ల కనిష్ట సామాన్య గుణిజం 15.',
          'దశ 2: 1/3 = 5/15 గా మార్చండి.',
          'దశ 3: 2/5 = 6/15 గా మార్చండి.',
          'దశ 4: లవాలను కూడండి: 5/15 + 6/15 = 11/15.',
        ],
        keyTakeawayEn: 'Never add denominators together—only add the numerators once denominators match.',
        keyTakeawayTe: 'హారాలను ఎప్పుడూ కలపవద్దు—కేవలం లవాలను మాత్రమే కలపండి.',
      },
    ],
  };

  const topics = topicsByLevel[level] || topicsByLevel.Beginner;
  const currentTopic = topics[activeTab] || topics[0];

  return (
    <div className="animate-in fade-in duration-500 max-w-4xl mx-auto pt-2 md:pt-4 space-y-8">
      <div>
        <div className="inline-flex items-center gap-2 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 px-3.5 py-1.5 rounded-full text-xs font-bold mb-3 shadow-xs border border-indigo-200/50 dark:border-indigo-900/50">
          <GraduationCap size={14} />
          <span>
            {currentClassMeta
              ? `${t(currentClassMeta.labelEn, currentClassMeta.labelTe)} • ${t(level, level === 'Beginner' ? 'ప్రారంభం' : level === 'Intermediate' ? 'మధ్యస్థం' : 'అధునాతనం')}`
              : `${level}`}{' '}
            {t('Curriculum Guide', 'పాఠ్యప్రణాళిక మార్గదర్శిని')}
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight mb-2">
          {t('Concepts & Step-by-Step Examples', 'భావనలు & దశలవారీ ఉదాహరణలు')}
        </h1>
        <p className="text-neutral-500 dark:text-neutral-400 text-sm md:text-base">
          {t('Master core mechanics with breakdown explanations, examples, and mental math strategies.', 'వివరణలు, ఉదాహరణలు మరియు వ్యూహాలతో గణిత భావనలను నేర్చుకోండి.')}
        </p>
      </div>

      {/* Topic Tabs */}
      <div className="flex items-center gap-3 border-b border-neutral-200 dark:border-neutral-700 pb-3 overflow-x-auto">
        {topics.map((tItem, idx) => (
          <button
            key={idx}
            onClick={() => setActiveTab(idx)}
            className={`px-4 py-2.5 rounded-2xl text-xs md:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === idx
                ? 'bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 shadow-xs'
                : 'bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-700'
            }`}
          >
            {t(tItem.titleEn, tItem.titleTe)}
          </button>
        ))}
      </div>

      {/* Concept Deep Dive Card */}
      <div className="bg-white dark:bg-neutral-800 rounded-[32px] p-6 md:p-10 border border-black/5 dark:border-white/5 shadow-xs space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white mb-2">
              {t(currentTopic.titleEn, currentTopic.titleTe)}
            </h2>
            <p className="text-neutral-600 dark:text-neutral-300 text-base md:text-lg leading-relaxed">
              {t(currentTopic.summaryEn, currentTopic.summaryTe)}
            </p>
          </div>

          <button
            type="button"
            onClick={handleSpeakLesson}
            className={`self-start sm:self-center shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all cursor-pointer shadow-xs ${
              isSpeaking
                ? 'bg-amber-500 text-white animate-pulse'
                : 'bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-700 dark:hover:bg-neutral-600 text-neutral-800 dark:text-neutral-200 border border-black/5 dark:border-white/10'
            }`}
            title={language === 'te' ? 'వాయిస్ ద్వారా పాఠం వినండి' : 'Listen to lesson explanation'}
          >
            {isSpeaking ? <VolumeX size={17} /> : <Volume2 size={17} />}
            <span>
              {isSpeaking
                ? t('Stop Voice', 'ఆపండి')
                : t('Listen to Lesson', 'పాఠం వినండి (వాయిస్)')}
            </span>
          </button>
        </div>

        {/* Worked Example */}
        <div className="p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-700/50 border border-neutral-200/80 dark:border-neutral-700 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-400">
              {t('Worked Example', 'పరిష్కరించిన ఉదాహరణ')}
            </span>
            <span className="text-sm font-mono font-bold bg-neutral-100 dark:bg-neutral-800 px-3.5 py-1.5 rounded-xl text-neutral-900 dark:text-white border border-neutral-200 dark:border-neutral-700 flex items-center">
              {currentTopic.exampleProblem.split(/([+\-−×÷=])/g).map((part, idx) => {
                if (['+', '-', '−', '×', '÷', '='].includes(part)) {
                  const displaySymbol = part === '-' ? '−' : part;
                  return (
                    <span
                      key={idx}
                      className="inline-flex items-center justify-center px-2 py-0.5 mx-1 rounded-md bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 font-black text-xs shadow-xs border border-neutral-700 dark:border-neutral-300"
                    >
                      {displaySymbol}
                    </span>
                  );
                }
                return <span key={idx}>{part}</span>;
              })}
            </span>
          </div>

          <div className="space-y-3 pt-2">
            {(t('en', 'te') === 'en' ? currentTopic.stepsEn : currentTopic.stepsTe).map((step, sIdx) => (
              <div key={sIdx} className="flex items-start gap-3">
                <CheckCircle size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base leading-relaxed">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Pro Tip Box */}
        <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-2xl p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-200 flex items-center justify-center font-bold text-lg shrink-0">
            💡
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300 mb-0.5">
              {t('Key Learning Takeaway', 'ముఖ్యమైన సూచన')}
            </h4>
            <p className="text-amber-900/90 dark:text-amber-200/90 text-sm font-medium">
              {t(currentTopic.keyTakeawayEn, currentTopic.keyTakeawayTe)}
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-end pt-4 border-t border-neutral-100 dark:border-neutral-700">
          <button
            onClick={onPractice}
            className="inline-flex items-center gap-2 bg-[#D4F670] hover:bg-[#bce451] text-black font-bold text-sm md:text-base px-6 py-3.5 rounded-full transition-transform active:scale-95 shadow-sm cursor-pointer"
          >
            <PlayCircle size={18} />
            {t('Try a Practice Drill on this Topic', 'ఈ అంశంపై సాధన చేయండి')}
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
