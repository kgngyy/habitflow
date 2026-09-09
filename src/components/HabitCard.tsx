import type { Habit } from '../types';
import { calculateStreak, isScheduledToday, isCheckedOn, toDateKey } from '../storage';
import './HabitCard.css';

interface Props {
  habit: Habit;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const DAYS_LABELS = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

export default function HabitCard({ habit, onToggle, onDelete }: Props) {
  const checked = isCheckedOn(habit, toDateKey(new Date()));
  const scheduled = isScheduledToday(habit);
  const streak = calculateStreak(habit.history);

  return (
    <div className="habit-card" style={{ borderLeftColor: habit.color }}>
      <div className="habit-card__top">
        <span className="habit-card__emoji" aria-hidden="true">🎯</span>
        <div className="habit-card__info">
          <h3 className="habit-card__name">{habit.name}</h3>
          <p className="habit-card__days">
            {habit.days.map((d) => DAYS_LABELS[d]).join(' · ')}
          </p>
        </div>
        <button
          type="button"
          className="habit-card__delete"
          onClick={() => onDelete(habit.id)}
          aria-label={`Удалить привычку ${habit.name}`}
          title="Удалить"
        >
          ✕
        </button>
      </div>

      <div className="habit-card__bottom">
        <span className="habit-card__streak" title="Серия дней">🔥 {streak}</span>
        <button
          type="button"
          className={`habit-card__check ${checked ? 'is-checked' : ''}`}
          onClick={() => onToggle(habit.id)}
          disabled={!scheduled}
          aria-label={checked ? `Снять отметку ${habit.name}` : `Отметить ${habit.name}`}
        >
          {checked ? '✓' : ''}
        </button>
      </div>
    </div>
  );
}
