import type { Habit } from './types';

const STORAGE_KEY = 'habitflow.habits';

export function loadHabits(): Habit[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Habit[];
  } catch {
    return [];
  }
}

export function saveHabits(habits: Habit[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
}

export function createId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function toDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function todayKey(): string {
  return toDateKey(new Date());
}

export function isScheduledToday(habit: Habit, now: Date = new Date()): boolean {
  return habit.days.includes(now.getDay());
}

export function isCheckedOn(habit: Habit, dateKey: string): boolean {
  return habit.history.includes(dateKey);
}

export function calculateStreak(history: string[], now: Date = new Date()): number {
  if (history.length === 0) return 0;

  const set = new Set(history);
  const cursor = new Date(now);
  cursor.setHours(0, 0, 0, 0);

  // если сегодня ещё не отмечено — начинаем со вчерашнего дня
  if (!set.has(toDateKey(cursor))) {
    cursor.setDate(cursor.getDate() - 1);
  }

  let streak = 0;
  while (set.has(toDateKey(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
    if (streak > 10000) break;
  }
  return streak;
}

export function toggleCheckIn(habit: Habit, now: Date = new Date()): Habit {
  const key = toDateKey(now);
  const checked = habit.history.includes(key);
  const history = checked
    ? habit.history.filter((d) => d !== key)
    : [...habit.history, key];
  return { ...habit, history };
}
