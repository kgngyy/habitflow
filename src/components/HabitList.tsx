import type { Habit } from '../types';
import HabitCard from './HabitCard';

interface Props {
  habits: Habit[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function HabitList({ habits, onToggle, onDelete }: Props) {
  if (habits.length === 0) {
    return <p className="empty-state">Пока нет привычек — добавьте первую!</p>;
  }

  return (
    <div className="habit-grid">
      {habits.map((h) => (
        <HabitCard key={h.id} habit={h} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </div>
  );
}
