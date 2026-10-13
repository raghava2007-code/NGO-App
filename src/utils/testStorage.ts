import { CompletedTestRecord } from '../types';
import { queueOfflineAction } from './offlineSync';

const TESTS_STORAGE_KEY = 'ganitmitra_student_tests';

function notifyTestsUpdated(): void {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('ganitmitra_tests_updated'));
  }
}

export function getCompletedTests(): CompletedTestRecord[] {
  try {
    const raw = localStorage.getItem(TESTS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Filter out any legacy baseline seed tests
        const realTests = parsed.filter((item) => !item.id?.startsWith('test-seed-'));
        return realTests.map((item) => ({
          ...item,
          retake_requested: item.retake_requested === true,
          retry_locked: item.retry_locked !== false,
          retake_rejected: item.retake_rejected === true,
        }));
      }
    }
  } catch (e) {
    console.warn('Error reading completed tests:', e);
  }

  return [];
}

export function saveCompletedTest(test: CompletedTestRecord): void {
  const current = getCompletedTests();
  // Filter out identical test id if exists
  const filtered = current.filter((t) => t.id !== test.id);
  const normalizedTest: CompletedTestRecord = {
    ...test,
    retake_requested: test.retake_requested === true,
    retry_locked: test.retry_locked !== false,
    retake_rejected: test.retake_rejected === true,
  };
  filtered.unshift(normalizedTest);
  try {
    localStorage.setItem(TESTS_STORAGE_KEY, JSON.stringify(filtered));
    queueOfflineAction('TEST_SUBMISSION', normalizedTest);
    notifyTestsUpdated();
  } catch (e) {
    console.warn('Error saving completed test:', e);
  }
}

export function updateTestRetakeRequest(testId: string, retakeRequested: boolean): void {
  const current = getCompletedTests();
  const updated = current.map((t) => {
    if (t.id === testId) {
      return {
        ...t,
        retake_requested: retakeRequested,
        retake_rejected: retakeRequested ? false : t.retake_rejected,
      };
    }
    return t;
  });
  try {
    localStorage.setItem(TESTS_STORAGE_KEY, JSON.stringify(updated));
    queueOfflineAction('RETAKE_REQUEST', { testId, retakeRequested });
    notifyTestsUpdated();
  } catch (e) {
    console.warn('Error updating retake request:', e);
  }
}

export function approveTestRetake(testId: string): void {
  const current = getCompletedTests();
  const updated = current.map((t) => {
    if (t.id === testId) {
      return {
        ...t,
        retry_locked: false,
        retake_requested: false,
        retake_rejected: false,
      };
    }
    return t;
  });
  try {
    localStorage.setItem(TESTS_STORAGE_KEY, JSON.stringify(updated));
    notifyTestsUpdated();
  } catch (e) {
    console.warn('Error approving test retake:', e);
  }
}

export function rejectTestRetake(testId: string): void {
  const current = getCompletedTests();
  const updated = current.map((t) => {
    if (t.id === testId) {
      return {
        ...t,
        retry_locked: true,
        retake_requested: false,
        retake_rejected: true,
      };
    }
    return t;
  });
  try {
    localStorage.setItem(TESTS_STORAGE_KEY, JSON.stringify(updated));
    notifyTestsUpdated();
  } catch (e) {
    console.warn('Error rejecting test retake:', e);
  }
}

export function resetOrDeleteTest(testId: string): void {
  const current = getCompletedTests();
  const filtered = current.filter((t) => t.id !== testId);
  try {
    localStorage.setItem(TESTS_STORAGE_KEY, JSON.stringify(filtered));
    notifyTestsUpdated();
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
