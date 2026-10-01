import { useState } from 'react';
import { ArrowRight, BookOpen, Lightbulb, PlayCircle, Clock, Sparkles, CheckCircle2, Award } from 'lucide-react';
import { StudentLevel, AssignedTask, StudentClass, STUDENT_CLASS_OPTIONS } from '../types';
import { CHAPTERS_DATA } from '../data/curriculumData';

interface StudentDashboardProps {
  t: (en: string, te: string) => string;
  onPractice: () => void;
  onLearn: () => void;
  level: StudentLevel;
  taskProgress: number;
  assignedTasks?: AssignedTask[];
  onSelectAssignedTask?: (task: AssignedTask) => void;
  studentName?: string;
  studentClass?: StudentClass;
  onSelectChapter?: (chapterId: string, action: 'learn' | 'test') => void;
  language?: 'en' | 'te';
}

export default function StudentDashboard({
  t,
  onPractice,
  onLearn,
  level,
  taskProgress,
  assignedTasks = [],
  onSelectAssignedTask,
  studentName = 'Student',
  studentClass = 'Class 5',
  onSelectChapter,
  language = 'en',
}: StudentDashboardProps) {
  // Allow switching between classes for chapter roster
  const [selectedRosterClass, setSelectedRosterClass] = useState<StudentClass>(studentClass);

  // Filter tasks assigned to either "All" or specifically to this student's level
  const relevantTeacherTasks = assignedTasks.filter(
    (task) => task.targetLevel === 'All' || task.targetLevel === level
  );

  // Get all chapters for the selected roster class
  const classChapters = CHAPTERS_DATA.filter((ch) => ch.classLevel === selectedRosterClass);

  // Level-specific base curriculum task information
  const getTaskInfo = () => {
    switch (level) {
      case 'Intermediate':
        return {
          title: t('Multiplication & Division - Chapter 3', 'గుణకారం మరియు భాగహారం - అధ్యాయం 3'),
          desc: t('Mastering times tables, grouping, and long division concepts.', 'గుణకార పట్టికలు, సమూహాలు మరియు దీర్ఘ భాగహార భావనలను నేర్చుకోండి.'),
          exampleTitle: t('Visual Multiplication Arrays', 'దృశ్య గుణకార వ్యూహాలు'),
          exampleDesc: t('4 rows of 6 dots equals 24. Think of multiplication as repeated addition!', '6 చుక్కల 4 వరుసలు 24 కి సమానం. గుణకారాన్ని పునరావృత కూడికగా భావించండి!'),
        };
      case 'Advanced':
        return {
          title: t('Fractions, Decimals & Pre-Algebra - Chapter 4', 'భిన్నాలు, దశాంశాలు మరియు బీజగణితం - అధ్యాయం 4'),
          desc: t('Simplifying improper fractions, solving single-variable equations.', 'అపక్రమ భిన్నాలను సరళీకరించడం, సమీకరణాలను సాధించడం.'),
          exampleTitle: t('Equation Balancing', 'సమీకరణ సమతుల్యత'),
          exampleDesc: t('Whatever you add or subtract on one side, you must balance on the other!', 'మీరు ఒక వైపు ఏమి జోడించినా లేదా తీసివేసినా, రెండవ వైపు కూడా సమానం చేయాలి!'),
        };
      case 'Beginner':
      default:
        return {
          title: t('Addition & Subtraction - Chapter 2', 'కూడిక మరియు తీసివేత - అధ్యాయం 2'),
          desc: t('Learning number bonds, carrying over, and sums up to 20.', 'సంఖ్యల బంధాలు, క్యారీ-ఓవర్ మరియు 20 వరకు మొత్తం నేర్చుకోండి.'),
          exampleTitle: t('Number Bonds to 10', '10 కి సంఖ్య బంధాలు'),
          exampleDesc: t('7 + 3 = 10, 6 + 4 = 10. Split numbers to quickly sum larger values!', '7 + 3 = 10, 6 + 4 = 10. పెద్ద సంఖ్యలను త్వరగా కూడటానికి సంఖ్యలను విభజించండి!'),
        };
    }
  };

  const task = getTaskInfo();

  // Circular progress calculations for the SINGLE circular progress indicator
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (taskProgress / 100) * circumference;

  // Render colorful geometric shape icon for chapters
  const renderShapeIcon = (shapeType: string, numberLabel?: string) => {
    switch (shapeType) {
      case 'circle':
        return (
          <div className="w-11 h-11 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-2 border-emerald-500 flex items-center justify-center font-black text-sm shrink-0 shadow-xs">
            {numberLabel || '●'}
          </div>
        );
      case 'square':
        return (
          <div className="w-11 h-11 rounded-xl bg-blue-500/20 text-blue-600 dark:text-blue-400 border-2 border-blue-500 flex items-center justify-center font-black text-sm shrink-0 shadow-xs">
            {numberLabel || '■'}
          </div>
        );
      case 'triangle':
        return (
          <div className="w-11 h-11 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400 border-2 border-amber-500 flex items-center justify-center font-black text-sm shrink-0 shadow-xs">
            {numberLabel || '▲'}
          </div>
        );
      case 'shapes':
      default:
        return (
          <div className="w-11 h-11 rounded-xl bg-[#D4F670]/30 text-neutral-900 dark:text-[#D4F670] border-2 border-[#D4F670] flex items-center justify-center font-black text-sm shrink-0 shadow-xs">
            {numberLabel || '★'}
          </div>
        );
    }
  };

  return (
    <div className="animate-in fade-in duration-500 max-w-5xl mx-auto pt-2 md:pt-4 space-y-8 pb-12">
      {/* Current Task Card featuring the ONE SINGLE CIRCULAR PROGRESS INDICATOR */}
      <div className="bg-app-darkCard text-white p-6 md:p-10 rounded-[32px] md:rounded-[40px] shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-8 relative overflow-hidden">
        <div className="relative z-10 flex-1">
          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full font-semibold text-xs md:text-sm mb-4 text-app-lime">
            <span>📚</span> {t('Current Task Progress', 'ప్రస్తుత విధి పురోగతి')}
          </div>

          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 tracking-tight">
            {task.title}
          </h2>

          <p className="text-white/70 font-medium mb-8 max-w-lg text-sm md:text-base leading-relaxed">
            {task.desc}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={onPractice}
              className="bg-app-lime text-black font-bold text-base md:text-lg px-8 py-3.5 rounded-full hover:bg-[#bce451] transition-transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2 shadow-lg shadow-app-lime/10 cursor-pointer"
            >
              <PlayCircle size={20} />
              {t('Continue Learning', 'నేర్చుకోవడం కొనసాగించండి')}
            </button>
            <button
              onClick={onLearn}
              className="bg-white/10 hover:bg-white/20 text-white font-semibold text-sm md:text-base px-6 py-3.5 rounded-full transition-colors flex items-center gap-2 cursor-pointer"
            >
              <BookOpen size={18} />
              {t('Review Concepts', 'భావనలను సమీక్షించండి')}
            </button>
          </div>
        </div>

        {/* The Single Circular Progress Indicator */}
        <div className="relative z-10 flex flex-col items-center justify-center p-4 self-center md:self-auto">
          <div className="relative w-36 h-36 md:w-44 md:h-44 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 130 130">
              <circle
                cx="65"
                cy="65"
                r={radius}
                className="stroke-white/10"
                strokeWidth="10"
                fill="transparent"
              />
              <circle
                cx="65"
                cy="65"
                r={radius}
                className="stroke-app-lime transition-all duration-1000 ease-out"
                strokeWidth="10"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
                {taskProgress}%
              </span>
              <span className="text-xs font-semibold text-white/60 uppercase tracking-wider mt-0.5">
                {t('Completed', 'పూర్తయింది')}
              </span>
            </div>
          </div>
          <span className="text-xs text-white/50 font-medium mt-2">
            {t('Overall Mastery', 'మొత్తం సాధన')}
          </span>
        </div>

        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-app-lime/10 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      {/* SECTION 1: CHAPTER ROSTER (CLASS 1 THROUGH CLASS 10)
          Clearly marked as "Ready to be Learnt" with visual shapes (circles, squares, triangles, numbers) */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-[#D4F670]/20 text-[#1a1a1a] dark:text-[#D4F670] border border-[#D4F670]/40">
                {t('Chapter Curriculum Roster', 'అధ్యాయాల ప్రణాళిక')}
              </span>
              <span className="text-xs font-bold text-neutral-400 dark:text-neutral-500">•</span>
              <span className="text-xs font-bold text-neutral-600 dark:text-neutral-400">
                {studentName} ({studentClass})
              </span>
            </div>
            <h3 className="text-2xl md:text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
              {t('Explore Learning Chapters', 'అధ్యాయాలను అన్వేషించండి')}
            </h3>
          </div>

          <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 self-start sm:self-auto flex items-center gap-1.5 shadow-xs">
            <CheckCircle2 size={14} />
            <span>{classChapters.length} {t('Chapters Ready', 'అధ్యాయాలు సిద్ధం')}</span>
          </span>
        </div>

        {/* Child-Friendly Class Switcher (Classes 1 through 10) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 custom-scrollbar">
          {STUDENT_CLASS_OPTIONS.filter((c) => !c.value.startsWith('Intermediate')).map((c) => {
            const isSelected = selectedRosterClass === c.value;
            return (
              <button
                key={c.value}
                type="button"
                onClick={() => setSelectedRosterClass(c.value)}
                className={`px-3 py-1.5 rounded-xl font-bold text-xs whitespace-nowrap transition-all cursor-pointer border flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 border-neutral-900 dark:border-white shadow-xs'
                    : 'bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border-black/5 dark:border-white/5 hover:bg-neutral-100 dark:hover:bg-neutral-700'
                }`}
              >
                <span>{c.shortLabel}</span>
                <span className="text-[10px] font-medium opacity-80">{t('Class', 'తరగతి')}</span>
              </button>
            );
          })}
        </div>

        {/* Chapters Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {classChapters.map((ch) => (
            <div
              key={ch.id}
              className="bg-white dark:bg-neutral-800 rounded-[28px] p-6 border border-black/5 dark:border-white/5 shadow-xs hover:border-[#D4F670]/80 dark:hover:border-[#D4F670]/60 transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Header: Visual Shape + Number Badge + "Ready to be Learnt" */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-2.5">
                    {renderShapeIcon(ch.visualShape, String(ch.chapterNumber))}
                    <div>
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 block">
                        {t(`Chapter ${ch.chapterNumber}`, `అధ్యాయం ${ch.chapterNumber}`)}
                      </span>
                      <span className="text-xs font-bold text-neutral-700 dark:text-neutral-300">
                        {selectedRosterClass}
                      </span>
                    </div>
                  </div>

                  {/* PROMINENT "Ready to be Learnt" BADGE REQUIRED BY PROMPT */}
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-black bg-[#D4F670] text-[#1a1a1a] shadow-xs">
                    <Sparkles size={12} className="stroke-[2.5]" />
                    <span>{t(ch.badgeEn, ch.badgeTe)}</span>
                  </span>
                </div>

                <h4 className="text-lg md:text-xl font-bold text-neutral-900 dark:text-white mb-2 leading-snug group-hover:text-emerald-600 dark:group-hover:text-[#D4F670] transition-colors">
                  {t(ch.titleEn, ch.titleTe)}
                </h4>

                <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed mb-4">
                  {t(ch.shortDescriptionEn, ch.shortDescriptionTe)}
                </p>

                {/* Key Concepts Preview list with colorful shape markers */}
                <div className="space-y-1.5 mb-5 p-3 rounded-2xl bg-neutral-50 dark:bg-neutral-900/60 border border-black/5 dark:border-white/5">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-neutral-400 block mb-1">
                    {t('Visual Focus Points', 'దృశ్య ముఖ్యాంశాలు')}
                  </span>
                  {(language === 'te' ? ch.keyConceptsTe : ch.keyConceptsEn).slice(0, 2).map((concept, cIdx) => (
                    <div key={cIdx} className="flex items-start gap-2 text-xs text-neutral-700 dark:text-neutral-300">
                      <span className="text-[#D4F670] font-black text-sm leading-none shrink-0 mt-0.5">●</span>
                      <span className="leading-snug">{concept}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions: Learn Concepts & Take Chapter Test */}
              <div className="flex items-center justify-between pt-4 border-t border-neutral-100 dark:border-neutral-700 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    if (onSelectChapter) {
                      onSelectChapter(ch.id, 'learn');
                    } else {
                      onLearn();
                    }
                  }}
                  className="px-4 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-700 dark:hover:bg-neutral-600 text-neutral-800 dark:text-neutral-200 font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <BookOpen size={14} />
                  <span>{t('Learn Concepts', 'భావనలను నేర్చుకోండి')}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (onSelectChapter) {
                      onSelectChapter(ch.id, 'test');
                    } else {
                      onPractice();
                    }
                  }}
                  className="px-4 py-2 rounded-xl bg-[#D4F670] hover:bg-[#bce451] text-black font-extrabold text-xs transition-all shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95"
                >
                  <PlayCircle size={14} />
                  <span>{t('Take Chapter Test', 'అధ్యాయం పరీక్ష రాయండి')}</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* TEACHER ASSIGNED TASKS (SYNCHRONIZED IN REAL-TIME) */}
      {relevantTeacherTasks.length > 0 && (
        <div className="space-y-4 pt-2 border-t border-neutral-200/80 dark:border-neutral-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D4F670] animate-pulse"></span>
              <h3 className="text-xl md:text-2xl font-bold text-neutral-900 dark:text-white">
                {t('Assigned Tasks from Teacher', 'ఉపాధ్యాయుని నుండి కేటాయించిన పనులు')}
              </h3>
            </div>
            <span className="text-xs font-bold px-3 py-1 bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300 rounded-full">
              {relevantTeacherTasks.length} {t('Active', 'యాక్టివ్')}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {relevantTeacherTasks.map((assignedTask) => (
              <div
                key={assignedTask.id}
                className="bg-white dark:bg-neutral-800 rounded-[28px] p-6 border border-black/5 dark:border-white/5 shadow-xs hover:border-neutral-300 dark:hover:border-neutral-600 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-neutral-100 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200">
                      <Sparkles size={13} className="text-amber-500" />
                      {assignedTask.assignedBy}
                    </span>
                    <span className="text-xs text-neutral-400 dark:text-neutral-500 font-medium flex items-center gap-1">
                      <Clock size={12} />
                      {assignedTask.assignedDate === 'Today'
                        ? t('Today', 'ఈరోజు')
                        : assignedTask.assignedDate === 'Yesterday'
                        ? t('Yesterday', 'నిన్న')
                        : assignedTask.assignedDate}
                    </span>
                  </div>

                  <h4 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">
                    {assignedTask.title}
                  </h4>
                  <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed mb-6">
                    {assignedTask.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-neutral-100 dark:border-neutral-700">
                  <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
                    {t('Target: ', 'లక్ష్యం: ')}
                    {assignedTask.targetLevel === 'All'
                      ? t('All', 'అందరికీ')
                      : t(
                          assignedTask.targetLevel,
                          assignedTask.targetLevel === 'Beginner'
                            ? 'ప్రారంభం'
                            : assignedTask.targetLevel === 'Intermediate'
                            ? 'మధ్యస్థం'
                            : 'అధునాతనం'
                        )}
                  </span>
                  <button
                    onClick={() => {
                      if (onSelectAssignedTask) {
                        onSelectAssignedTask(assignedTask);
                      } else {
                        onPractice();
                      }
                    }}
                    className="inline-flex items-center gap-2 bg-[#D4F670] hover:bg-[#bce451] text-black font-bold text-xs md:text-sm px-4 py-2 rounded-xl transition-all shadow-xs cursor-pointer active:scale-95"
                  >
                    {t('Start Task', 'టాస్క్ ప్రారంభించండి')}
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Revision & Practice Session Launcher */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-neutral-800 rounded-[32px] p-6 md:p-8 border border-black/5 dark:border-white/5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-2 bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 px-3 py-1 rounded-full text-xs font-bold mb-4">
              <Lightbulb size={14} />
              {t('Concept Revision', 'కాన్సెప్ట్ రివిజన్')}
            </div>
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
              {task.exampleTitle}
            </h3>
            <p className="text-neutral-600 dark:text-neutral-300 text-sm md:text-base leading-relaxed mb-6">
              {task.exampleDesc}
            </p>
          </div>
          <button
            onClick={onLearn}
            className="inline-flex items-center gap-2 text-sm font-bold text-neutral-900 dark:text-neutral-100 hover:text-black dark:hover:text-white transition-colors self-start cursor-pointer"
          >
            {t('Explore all examples & diagrams', 'అన్ని ఉదాహరణలు & చిత్రాలను చూడండి')}
            <ArrowRight size={16} />
          </button>
        </div>

        <div className="bg-white dark:bg-neutral-800 rounded-[32px] p-6 md:p-8 border border-black/5 dark:border-white/5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-xs font-bold mb-4">
              <Award size={14} />
              {t('Chapter Assessments', 'అధ్యాయాల పరీక్షలు')}
            </div>
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
              {t('Diagram-Based Test Drills', 'చిత్రాలతో కూడిన ప్రాక్టీస్ పరీక్షలు')}
            </h3>
            <p className="text-neutral-600 dark:text-neutral-300 text-sm md:text-base leading-relaxed mb-6">
              {t(
                'Complete interactive diagram questions and tests. Your scores sync directly with your teacher!',
                'ఇంటరాక్టివ్ చిత్రాల ప్రశ్నలను పూర్తి చేయండి. మీ స్కోర్లు వెంటనే ఉపాధ్యాయుని వద్దకు చేరుతాయి!'
              )}
            </p>
          </div>
          <button
            onClick={onPractice}
            className="inline-flex items-center gap-2 text-sm font-bold text-neutral-900 dark:text-neutral-100 hover:text-black dark:hover:text-white transition-colors self-start cursor-pointer"
          >
            {t('Start Chapter Practice', 'అధ్యాయ సాధన ప్రారంభించండి')}
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
