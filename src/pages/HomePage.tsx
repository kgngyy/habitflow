import { useEffect, useState } from 'react';
import type { Habit } from '../types';
import {
  loadHabits,
  saveHabits,
  createId,
  toggleCheckIn,
  todayKey,
  isScheduledToday,
} from '../storage';
import HabitList from '../components/HabitList';
import HabitForm from '../components/HabitForm';
import ProgressBar from '../components/ProgressBar';

export default function HomePage() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Имитация асинхронной загрузки (в реальном приложении — запрос к API)
    const timer = setTimeout(() => {
      setHabits(loadHabits());
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const persist = (next: Habit[]) => {
    setHabits(next);
    saveHabits(next);
  };

  const addHabit = (data: { name: string; color: string; days: number[] }) => {
    const habit: Habit = {
      id: createId(),
      name: data.name,
      color: data.color,
      days: data.days,
      history: [],
      createdAt: todayKey(),
    };
    persist([...habits, habit]);
  };

  const toggle = (id: string) => {
    persist(habits.map((h) => (h.id === id ? toggleCheckIn(h) : h)));
  };

  const remove = (id: string) => {
    if (window.confirm('Удалить привычку и всю её историю?')) {
      persist(habits.filter((h) => h.id !== id));
    }
  };

  if (loading) {
    return <p className="empty-state">Загрузка…</p>;
  }

  const today = habits.filter((h) => isScheduledToday(h));
  const doneToday = today.filter((h) => h.history.includes(todayKey()));
  const progress = today.length === 0 ? 0 : (doneToday.length / today.length) * 100;

  return (
    <div className="page">
      <header className="header">
        <h1>HabitFlow</h1>
        <p className="header__subtitle">
          Сегодня выполнено: {doneToday.length} из {today.length}
        </p>
        <ProgressBar value={progress} />
      </header>

      <HabitForm onSubmit={addHabit} />

      <section>
        <h2>Мои привычки</h2>
        <HabitList habits={habits} onToggle={toggle} onDelete={remove} />
      </section>
    </div>
  );
}
