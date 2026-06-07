export type RoutineType = 'rega' | 'adubo' | 'poda' | 'livre';

export type RoutineRepeat = 'nunca' | 'diario' | 'semanal' | 'mensal';

export interface Routine {
  id: string;
  uid: string;
  title: string;
  type: RoutineType;
  plantId?: string;
  plantName?: string;
  date: string;
  time: string;
  repeat: RoutineRepeat;
  notificationId?: string;
  done: boolean;
  createdAt: string;
}
