import { CompletedTestRecord } from '../types';

const TESTS_STORAGE_KEY = 'ganitmitra_student_tests';

const INITIAL_BASELINE_TESTS: CompletedTestRecord[] = [
  {
    id: 'test-seed-1',
    studentName: 'Sai Kumar',
    studentClass: 'Class 7',
    chapterId: 'c7-ch1',
    chapterNumber: 1,
    chapterTitleEn: 'Simple Linear Equations (Balance Scale)',
    chapterTitleTe: 'సరళ సమీకరణాలు (త్రాసు సమతుల్యత)',
    score: 2,
    totalQuestions: 2,
    percentage: 100,
    passed: true,
    completedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    timeFormatted: 'Today, 10:30 AM',
    answers: [
      {
        questionPrompt: 'Solve for x: 3x = 21',
        studentAnswer: '7',
        correctAnswer: '7',
        isCorrect: true,
      },
      {
        questionPrompt: 'Solve for x: x + 9 = 15',
        studentAnswer: '6',
        correctAnswer: '6',
        isCorrect: true,
      },
    ],
  },
  {
    id: 'test-seed-2',
    studentName: 'Raghava',
    studentClass: 'Class 5',
    chapterId: 'c1-ch3',
    chapterNumber: 3,
    chapterTitleEn: 'Single-Digit Subtraction (Take Away)',
    chapterTitleTe: 'ఒకే అంకె తీసివేత (తీసివేయడం)',
    score: 2,
    totalQuestions: 2,
    percentage: 100,
    passed: true,
    completedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    timeFormatted: 'Yesterday, 4:15 PM',
    answers: [
      {
        questionPrompt: '8 apples minus 3 eaten apples = ?',
        studentAnswer: '5',
        correctAnswer: '5',
        isCorrect: true,
      },
      {
        questionPrompt: '6 − 2 = ?',
        studentAnswer: '4',
        correctAnswer: '4',
        isCorrect: true,
      },
    ],
  },
];

export function getCompletedTests(): CompletedTestRecord[] {
  try {
    const raw = localStorage.getItem(TESTS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Error reading completed tests:', e);
  }

  // Prepopulate baseline tests
  try {
    localStorage.setItem(TESTS_STORAGE_KEY, JSON.stringify(INITIAL_BASELINE_TESTS));
  } catch (e) {
    console.warn('Error seeding tests:', e);
  }
  return INITIAL_BASELINE_TESTS;
}

export function saveCompletedTest(test: CompletedTestRecord): void {
  const current = getCompletedTests();
  // Filter out identical test id if exists
  const filtered = current.filter((t) => t.id !== test.id);
  filtered.unshift(test);
  try {
    localStorage.setItem(TESTS_STORAGE_KEY, JSON.stringify(filtered));
  } catch (e) {
    console.warn('Error saving completed test:', e);
  }
}

export function resetOrDeleteTest(testId: string): void {
  const current = getCompletedTests();
  const filtered = current.filter((t) => t.id !== testId);
  try {
    localStorage.setItem(TESTS_STORAGE_KEY, JSON.stringify(filtered));
  } catch (e) {
    console.warn('Error resetting test:', e);
  }
}

export function getStudentTestMetrics(studentName: string) {
  const allTests = getCompletedTests();
  const normalized = studentName.trim().toLowerCase();
  const studentTests = allTests.filter(
    (t) => t.studentName.trim().toLowerCase() === normalized
  );

  const testsCount = studentTests.length;
  if (testsCount === 0) {
    return {
      testsCount: 0,
      averagePercentage: 0,
      passedCount: 0,
      studentTests: [],
    };
  }

  const totalPercentage = studentTests.reduce((sum, t) => sum + t.percentage, 0);
  const averagePercentage = Math.round(totalPercentage / testsCount);
  const passedCount = studentTests.filter((t) => t.passed).length;

  return {
    testsCount,
    averagePercentage,
    passedCount,
    studentTests,
  };
}
