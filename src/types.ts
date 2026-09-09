export interface Habit {
  id: string;
  name: string;
  color: string;
  days: number[]; // 0 = воскресенье ... 6 = суббота
  history: string[]; // даты отметок "YYYY-MM-DD"
  createdAt: string;
}
