export type StudentLevel = 'Beginner' | 'Intermediate' | 'Advanced';
export type UserRole = 'student' | 'teacher';
export type Language = 'en' | 'te';
export type ThemeMode = 'light' | 'dark';

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
