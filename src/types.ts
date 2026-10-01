export type StudentLevel = 'Beginner' | 'Intermediate' | 'Advanced';
export type UserRole = 'student' | 'teacher';
export type Language = 'en' | 'te';
export type ThemeMode = 'light' | 'dark';
export type StudentViewState = 'student_home' | 'student_learn' | 'student_practice' | 'student_progress' | 'student_settings';

export type StudentClass =
  | 'Class 1'
  | 'Class 2'
  | 'Class 3'
  | 'Class 4'
  | 'Class 5'
  | 'Class 6'
  | 'Class 7'
  | 'Class 8'
  | 'Class 9'
  | 'Class 10'
  | 'Intermediate 1st Year'
  | 'Intermediate 2nd Year';

export interface ClassOption {
  value: StudentClass;
  shortLabel: string;
  labelEn: string;
  labelTe: string;
  level: StudentLevel;
  categoryEn: 'Primary School' | 'Middle School' | 'Secondary School' | 'Junior College';
  categoryTe: 'ప్రాథమిక పాఠశాల' | 'మాధ్యమిక పాఠశాల' | 'ఉన్నత పాఠశాల' | 'ఇంటర్మీడియట్';
}

export const STUDENT_CLASS_OPTIONS: ClassOption[] = [
  { value: 'Class 1', shortLabel: '1', labelEn: 'Class 1', labelTe: '1వ తరగతి', level: 'Beginner', categoryEn: 'Primary School', categoryTe: 'ప్రాథమిక పాఠశాల' },
  { value: 'Class 2', shortLabel: '2', labelEn: 'Class 2', labelTe: '2వ తరగతి', level: 'Beginner', categoryEn: 'Primary School', categoryTe: 'ప్రాథమిక పాఠశాల' },
  { value: 'Class 3', shortLabel: '3', labelEn: 'Class 3', labelTe: '3వ తరగతి', level: 'Beginner', categoryEn: 'Primary School', categoryTe: 'ప్రాథమిక పాఠశాల' },
  { value: 'Class 4', shortLabel: '4', labelEn: 'Class 4', labelTe: '4వ తరగతి', level: 'Beginner', categoryEn: 'Primary School', categoryTe: 'ప్రాథమిక పాఠశాల' },
  { value: 'Class 5', shortLabel: '5', labelEn: 'Class 5', labelTe: '5వ తరగతి', level: 'Beginner', categoryEn: 'Primary School', categoryTe: 'ప్రాథమిక పాఠశాల' },
  { value: 'Class 6', shortLabel: '6', labelEn: 'Class 6', labelTe: '6వ తరగతి', level: 'Intermediate', categoryEn: 'Middle School', categoryTe: 'మాధ్యమిక పాఠశాల' },
  { value: 'Class 7', shortLabel: '7', labelEn: 'Class 7', labelTe: '7వ తరగతి', level: 'Intermediate', categoryEn: 'Middle School', categoryTe: 'మాధ్యమిక పాఠశాల' },
  { value: 'Class 8', shortLabel: '8', labelEn: 'Class 8', labelTe: '8వ తరగతి', level: 'Intermediate', categoryEn: 'Middle School', categoryTe: 'మాధ్యమిక పాఠశాల' },
  { value: 'Class 9', shortLabel: '9', labelEn: 'Class 9', labelTe: '9వ తరగతి', level: 'Advanced', categoryEn: 'Secondary School', categoryTe: 'ఉన్నత పాఠశాల' },
  { value: 'Class 10', shortLabel: '10', labelEn: 'Class 10', labelTe: '10వ తరగతి', level: 'Advanced', categoryEn: 'Secondary School', categoryTe: 'ఉన్నత పాఠశాల' },
  { value: 'Intermediate 1st Year', shortLabel: 'Inter 1', labelEn: 'Intermediate 1st Year', labelTe: 'ఇంటర్మీడియట్ 1వ సం.', level: 'Advanced', categoryEn: 'Junior College', categoryTe: 'ఇంటర్మీడియట్' },
  { value: 'Intermediate 2nd Year', shortLabel: 'Inter 2', labelEn: 'Intermediate 2nd Year', labelTe: 'ఇంటర్మీడియట్ 2వ సం.', level: 'Advanced', categoryEn: 'Junior College', categoryTe: 'ఇంటర్మీడియట్' },
];

export interface AssignedTask {
  id: string;
  title: string;
  description: string;
  targetLevel: 'All' | StudentLevel;
  assignedBy: string;
  assignedDate: string;
  status: 'pending' | 'in_progress' | 'completed';
  dueDate?: string;
}

export interface StoredUser {
  id: string;
  role: UserRole;
  username: string;
  password: string;
  studentClass?: StudentClass;
  level?: StudentLevel;
  subject?: string;
  createdAt: string;
}

export interface CompletedTestRecord {
  id: string;
  studentName: string;
  studentClass: StudentClass;
  chapterId: string;
  chapterNumber: number;
  chapterTitleEn: string;
  chapterTitleTe: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  passed: boolean;
  completedAt: string;
  timeFormatted: string;
  answers: {
    questionPrompt: string;
    studentAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
  }[];
}

export const INITIAL_DEMO_USERS: StoredUser[] = [
  {
    id: 'student-demo-1',
    role: 'student',
    username: 'Raghava',
    password: 'password123',
    studentClass: 'Class 5',
    level: 'Beginner',
    createdAt: '2026-09-01T00:00:00Z',
  },
  {
    id: 'student-demo-2',
    role: 'student',
    username: 'Sai Kumar',
    password: 'password123',
    studentClass: 'Class 7',
    level: 'Intermediate',
    createdAt: '2026-09-01T00:00:00Z',
  },
  {
    id: 'student-demo-3',
    role: 'student',
    username: 'Rahul V.',
    password: 'password123',
    studentClass: 'Class 10',
    level: 'Advanced',
    createdAt: '2026-09-01T00:00:00Z',
  },
  {
    id: 'teacher-demo-1',
    role: 'teacher',
    username: 'Mr. Sharma',
    password: '12345',
    subject: 'Mathematics',
    createdAt: '2026-09-01T00:00:00Z',
  },
  {
    id: 'teacher-demo-2',
    role: 'teacher',
    username: 'Teacher',
    password: '12345',
    subject: 'Mathematics',
    createdAt: '2026-09-01T00:00:00Z',
  },
];

