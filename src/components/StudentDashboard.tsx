import { ArrowRight, BookOpen, Lightbulb, PlayCircle, Clock, Sparkles } from 'lucide-react';
import { StudentLevel, AssignedTask } from '../types';

interface StudentDashboardProps {
  t: (en: string, te: string) => string;
  onPractice: () => void;
  onLearn: () => void;
  level: StudentLevel;
  taskProgress: number;
  assignedTasks?: AssignedTask[];
  onSelectAssignedTask?: (task: AssignedTask) => void;
}

export default function StudentDashboard({
  t,
  onPractice,
  onLearn,
  level,
  taskProgress,
  assignedTasks = [],
  onSelectAssignedTask,
}: StudentDashboardProps) {
  // Filter tasks assigned to either "All" or specifically to this student's level
  const relevantTeacherTasks = assignedTasks.filter(
    (task) => task.targetLevel === 'All' || task.targetLevel === level
  );

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

  return (
    <div className="animate-in fade-in duration-500 max-w-5xl mx-auto pt-2 md:pt-4 space-y-8">
      
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

        {/* The Single Circular Progress Indicator representing the student's current task completion */}
        <div className="relative z-10 flex flex-col items-center justify-center p-4 self-center md:self-auto">
          <div className="relative w-36 h-36 md:w-44 md:h-44 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 130 130">
              {/* Background Track */}
              <circle
                cx="65"
                cy="65"
                r={radius}
                className="stroke-white/10"
                strokeWidth="10"
                fill="transparent"
              />
              {/* Animated Progress Indicator */}
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
            {t('Task Completion', 'టాస్క్ పూర్తి')}
          </span>
        </div>

        {/* Decorative background glow */}
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-app-lime/10 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      {/* TEACHER ASSIGNED TASKS (SYNCHRONIZED IN REAL-TIME) */}
      {relevantTeacherTasks.length > 0 && (
        <div className="space-y-4">
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
                      {assignedTask.assignedDate}
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
                    {t('Target: ', 'లక్ష్యం: ')}{assignedTask.targetLevel}
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

      {/* Revision & Step-by-Step Examples Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Revision Card */}
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
            {t('Explore all examples & formulas', 'అన్ని ఉదాహరణలు & సూత్రాలను చూడండి')}
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Quick Practice Session Launcher */}
        <div className="bg-white dark:bg-neutral-800 rounded-[32px] p-6 md:p-8 border border-black/5 dark:border-white/5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-xs font-bold mb-4">
              <PlayCircle size={14} />
              {t('Quick Practice', 'త్వరిత సాధన')}
            </div>
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
              {t('Interactive Math Drills', 'ఇంటరాక్టివ్ గణిత సాధన')}
            </h3>
            <p className="text-neutral-600 dark:text-neutral-300 text-sm md:text-base leading-relaxed mb-6">
              {t('Practice 5 quick questions tailored to your level with instant feedback and step-by-step hints.', 'తక్షణ అభిప్రాయం మరియు సూచనలతో మీ స్థాయికి తగిన 5 త్వరిత ప్రశ్నలను ప్రాక్టీస్ చేయండి.')}
            </p>
          </div>
          <button
            onClick={onPractice}
            className="inline-flex items-center gap-2 text-sm font-bold text-neutral-900 dark:text-neutral-100 hover:text-black dark:hover:text-white transition-colors self-start cursor-pointer"
          >
            {t('Start Practice Drill', 'సాధనను ప్రారంభించండి')}
            <ArrowRight size={16} />
          </button>
        </div>

      </div>

    </div>
  );
}
