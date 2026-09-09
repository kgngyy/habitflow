import { useState, type FormEvent } from 'react';
import './HabitForm.css';

interface HabitFormData {
  name: string;
  color: string;
  days: number[];
}

interface Props {
  onSubmit: (data: HabitFormData) => void;
}

const DAYS = [
  { value: 1, label: 'Пн' },
  { value: 2, label: 'Вт' },
  { value: 3, label: 'Ср' },
  { value: 4, label: 'Чт' },
  { value: 5, label: 'Пт' },
  { value: 6, label: 'Сб' },
  { value: 0, label: 'Вс' },
];

const COLORS = ['#4f8cff', '#ff6b6b', '#ffd93d', '#6bcb77', '#a66cff', '#ff9f43'];

export default function HabitForm({ onSubmit }: Props) {
  const [name, setName] = useState('');
  const [color, setColor] = useState(COLORS[0]);
  const [days, setDays] = useState<number[]>([]);
  const [error, setError] = useState('');

  const toggleDay = (d: number) => {
    setDays((prev) => (prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Введите название привычки');
      return;
    }
    if (days.length === 0) {
      setError('Выберите хотя бы один день недели');
      return;
    }
    setError('');
    onSubmit({ name: name.trim(), color, days });
    setName('');
    setDays([]);
  };

  return (
    <form className="habit-form" onSubmit={handleSubmit}>
      <h2>Новая привычка</h2>

      <label className="habit-form__label">
        Название
        <input
          type="text"
          value={name}
          maxLength={100}
          onChange={(e) => setName(e.target.value)}
          placeholder="Например: Чтение 20 минут"
        />
      </label>

      <div className="habit-form__row">
        <span className="habit-form__label-text">Цвет</span>
        <div className="habit-form__colors">
          {COLORS.map((c) => (
            <button
              key={c}
              type="button"
              className={`habit-form__color ${color === c ? 'is-active' : ''}`}
              style={{ backgroundColor: c }}
              onClick={() => setColor(c)}
              aria-label={`Выбрать цвет ${c}`}
            />
          ))}
        </div>
      </div>

      <div className="habit-form__row">
        <span className="habit-form__label-text">Дни недели</span>
        <div className="habit-form__days">
          {DAYS.map((d) => (
            <button
              key={d.value}
              type="button"
              className={`habit-form__day ${days.includes(d.value) ? 'is-active' : ''}`}
              onClick={() => toggleDay(d.value)}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <p className="habit-form__error" role="alert">{error}</p>
      )}

      <button type="submit" className="habit-form__submit">Сохранить</button>
    </form>
  );
}
