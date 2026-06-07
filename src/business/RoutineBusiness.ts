import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { Routine, RoutineType, RoutineRepeat } from '../models/Routine';
import { RoutineRepository } from '../repository/RoutineRepository';

const repository = new RoutineRepository();

export const ROUTINE_TYPE_LABELS: Record<RoutineType, string> = {
  rega:  'Rega',
  adubo: 'Adubar',
  poda:  'Poda',
  livre: 'Livre',
};

export const ROUTINE_REPEAT_LABELS: Record<RoutineRepeat, string> = {
  nunca:   'Nunca',
  diario:  'Todo dia',
  semanal: 'Toda semana',
  mensal:  'Todo mês',
};

export class RoutineBusiness {

  async requestPermissions(): Promise<boolean> {
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('routines', {
        name: 'Rotinas',
        importance: Notifications.AndroidImportance.HIGH,
      });
    }
    const { status } = await Notifications.requestPermissionsAsync();
    return status === 'granted';
  }

  async getAll(): Promise<Routine[]> {
    return repository.getAll();
  }

  async add(data: {
    title: string;
    type: RoutineType;
    plantId?: string;
    plantName?: string;
    date: string;
    time: string;
    repeat: RoutineRepeat;
  }): Promise<void> {
    const notificationId = await this.scheduleNotification(data);

    await repository.add({
      title: data.title,
      type: data.type,
      ...(data.plantId   ? { plantId:   data.plantId }   : {}),
      ...(data.plantName ? { plantName: data.plantName } : {}),
      date: data.date,
      time: data.time,
      repeat: data.repeat,
      notificationId,
      done: false,
      createdAt: new Date().toISOString(),
    });
  }

  async markDone(routine: Routine): Promise<void> {
    await repository.update(routine.id, { done: true });
  }

  async delete(routine: Routine): Promise<void> {
    if (routine.notificationId) {
      await Notifications.cancelScheduledNotificationAsync(routine.notificationId);
    }
    await repository.delete(routine.id);
  }

  validate(title: string, date: string, time: string): string | null {
    if (!title.trim()) return 'Título é obrigatório.';
    if (!date) return 'Data é obrigatória.';
    if (!time) return 'Hora é obrigatória.';
    return null;
  }

  private async scheduleNotification(data: {
    title: string;
    type: RoutineType;
    date: string;
    time: string;
    repeat: RoutineRepeat;
  }): Promise<string> {
    const [year, month, day] = data.date.split('-').map(Number);
    const [hour, minute] = data.time.split(':').map(Number);

    const trigger: Notifications.NotificationTriggerInput =
      data.repeat === 'nunca'
        ? { type: Notifications.SchedulableTriggerInputTypes.DATE, date: new Date(year, month - 1, day, hour, minute) }
        : data.repeat === 'diario'
        ? { type: Notifications.SchedulableTriggerInputTypes.DAILY, hour, minute }
        : data.repeat === 'semanal'
        ? { type: Notifications.SchedulableTriggerInputTypes.WEEKLY, weekday: new Date(year, month - 1, day).getDay() + 1, hour, minute }
        : { type: Notifications.SchedulableTriggerInputTypes.MONTHLY, day, hour, minute };

    return Notifications.scheduleNotificationAsync({
      content: {
        title: ` ${ROUTINE_TYPE_LABELS[data.type]}`,
        body: data.title,
        sound: true,
      },
      trigger,
    });
  }
}
