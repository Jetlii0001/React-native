import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';

/**
 * Система уведомлений
 * Пункты 41-48: Уведомления о премьерах, рекомендации
 */

// Настройка обработчика уведомлений
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

/**
 * Запрос разрешения на уведомления
 */
export async function requestNotificationPermissions() {
  if (!Device.isDevice) {
    console.warn('Уведомления работают только на реальных устройствах');
    return false;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    console.warn('Разрешение на уведомления не получено');
    return false;
  }

  // Настройка канала для Android
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return true;
}

/**
 * Отправить уведомление о премьере
 */
export async function schedulePremiereNotification(movie, releaseDate) {
  const hasPermission = await requestNotificationPermissions();
  if (!hasPermission) return;

  const releaseDateTime = new Date(releaseDate);
  const now = new Date();

  // Если премьера уже прошла, не планируем уведомление
  if (releaseDateTime <= now) return;

  // Планируем уведомление за день до премьеры
  const notificationDate = new Date(releaseDateTime);
  notificationDate.setDate(notificationDate.getDate() - 1);

  await Notifications.scheduleNotificationAsync({
    content: {
      title: '🎬 Скоро премьера!',
      body: `${movie.title || movie.name} выйдет завтра!`,
      data: { movieId: movie.id, type: 'premiere' },
      sound: true,
    },
    trigger: notificationDate,
  });
}

/**
 * Отправить уведомление с рекомендацией
 */
export async function sendRecommendationNotification(movie, reason) {
  const hasPermission = await requestNotificationPermissions();
  if (!hasPermission) return;

  await Notifications.scheduleNotificationAsync({
    content: {
      title: '💡 Рекомендация для тебя',
      body: `${movie.title || movie.name} - ${reason}`,
      data: { movieId: movie.id, type: 'recommendation' },
      sound: true,
    },
    trigger: null, // Немедленно
  });
}

/**
 * Отправить уведомление о напоминании
 */
export async function scheduleReminderNotification(movie, reminderDate) {
  const hasPermission = await requestNotificationPermissions();
  if (!hasPermission) return;

  await Notifications.scheduleNotificationAsync({
    content: {
      title: '⏰ Напоминание',
      body: `Не забудь посмотреть ${movie.title || movie.name}`,
      data: { movieId: movie.id, type: 'reminder' },
      sound: true,
    },
    trigger: reminderDate,
  });
}

/**
 * Отменить все запланированные уведомления
 */
export async function cancelAllNotifications() {
  await Notifications.cancelAllScheduledNotificationsAsync();
}

/**
 * Получить все запланированные уведомления
 */
export async function getAllScheduledNotifications() {
  return await Notifications.getAllScheduledNotificationsAsync();
}

