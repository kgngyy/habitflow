import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { calculateStreak, toggleCheckIn } from '../storage';
import HabitCard from '../components/HabitCard';
import HabitList from '../components/HabitList';
import type { Habit } from '../types';

const makeHabit = (overrides: Partial<Habit> = {}): Habit => ({
  id: '1',
  name: 'Чтение',
  color: '#4f8cff',
  days: [0, 1, 2, 3, 4, 5, 6],
  history: [],
  createdAt: '2026-09-01',
  ...overrides,
});

describe('calculateStreak', () => {
  it('считает серию подряд идущих дней (позитивный сценарий)', () => {
    const now = new Date(2026, 8, 9);
    const history = ['2026-09-07', '2026-09-08', '2026-09-09'];
    expect(calculateStreak(history, now)).toBe(3);
  });

  it('сбрасывает серию при пропуске дня (негативный сценарий)', () => {
    const now = new Date(2026, 8, 9);
    const history = ['2026-09-01', '2026-09-09'];
    expect(calculateStreak(history, now)).toBe(1);
  });

  it('возвращает 0 при пустой истории', () => {
    const now = new Date(2026, 8, 9);
    expect(calculateStreak([], now)).toBe(0);
  });
});

describe('toggleCheckIn', () => {
  it('добавляет отметку за сегодня', () => {
    const now = new Date(2026, 8, 9);
    const updated = toggleCheckIn(makeHabit(), now);
    expect(updated.history).toContain('2026-09-09');
  });

  it('снимает отметку при повторном нажатии', () => {
    const now = new Date(2026, 8, 9);
    const habit = makeHabit({ history: ['2026-09-09'] });
    const updated = toggleCheckIn(habit, now);
    expect(updated.history).not.toContain('2026-09-09');
  });
});

describe('HabitCard', () => {
  it('вызывает onToggle при нажатии на чекбокс', () => {
    const onToggle = vi.fn();
    const onDelete = vi.fn();
    render(<HabitCard habit={makeHabit()} onToggle={onToggle} onDelete={onDelete} />);
    fireEvent.click(screen.getByRole('button', { name: /Отметить Чтение/ }));
    expect(onToggle).toHaveBeenCalledWith('1');
  });
});

describe('HabitList', () => {
  it('показывает заглушку при пустом списке', () => {
    render(<HabitList habits={[]} onToggle={() => {}} onDelete={() => {}} />);
    expect(screen.getByText(/Пока нет привычек/)).toBeTruthy();
  });
});
