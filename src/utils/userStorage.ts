import { StoredUser, INITIAL_DEMO_USERS, UserRole } from '../types';

const STORAGE_KEY = 'ganitmitra_user_accounts';

export function getStoredUsers(): StoredUser[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Error reading stored users:', e);
  }

  // Initialize with initial demo users (now empty)
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DEMO_USERS));
  } catch (e) {
    console.warn('Error saving initial demo users:', e);
  }
  return INITIAL_DEMO_USERS;
}

export function saveUser(user: StoredUser): void {
  const currentUsers = getStoredUsers();
  // Filter out any existing user with same id or case-insensitive role+username
  const updated = currentUsers.filter(
    (u) =>
      u.id !== user.id &&
      !(u.role === user.role && u.username.toLowerCase() === user.username.toLowerCase())
  );
  updated.unshift(user);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.warn('Error saving user to localStorage:', e);
  }
}

export function findUser(role: UserRole, username: string): StoredUser | undefined {
  const users = getStoredUsers();
  const normalized = username.trim().toLowerCase();
  return users.find(
    (u) => u.role === role && u.username.trim().toLowerCase() === normalized
  );
}
