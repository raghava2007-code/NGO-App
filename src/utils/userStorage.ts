import { StoredUser, INITIAL_DEMO_USERS, UserRole, StudentClass } from '../types';

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

export function updateUserPassword(role: UserRole, username: string, newPassword: string): boolean {
  const users = getStoredUsers();
  const normalized = username.trim().toLowerCase();
  const index = users.findIndex(
    (u) => u.role === role && u.username.trim().toLowerCase() === normalized
  );
  if (index !== -1) {
    users[index].password = newPassword;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
      return true;
    } catch (e) {
      console.warn('Error updating user password:', e);
    }
  }
  return false;
}

export function requestPasswordReset(username: string, studentClass: StudentClass): boolean {
  const users = getStoredUsers();
  const normalized = username.trim().toLowerCase();
  const index = users.findIndex(
    (u) => u.role === 'student' && u.username.trim().toLowerCase() === normalized && u.studentClass === studentClass
  );
  if (index !== -1) {
    users[index].password_reset_requested = true;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
      window.dispatchEvent(new Event('ganitmitra_users_updated'));
      return true;
    } catch (e) {
      console.warn('Error requesting password reset:', e);
    }
  }
  return false;
}

export function getPendingPasswordRequests(): StoredUser[] {
  const users = getStoredUsers();
  return users.filter((u) => u.role === 'student' && u.password_reset_requested === true);
}

export function assignStudentPin(userId: string, newPin: string): boolean {
  const users = getStoredUsers();
  const index = users.findIndex((u) => u.id === userId);
  if (index !== -1) {
    users[index].password = newPin;
    users[index].password_reset_requested = false;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
      window.dispatchEvent(new Event('ganitmitra_users_updated'));
      return true;
    } catch (e) {
      console.warn('Error assigning student PIN:', e);
    }
  }
  return false;
}


