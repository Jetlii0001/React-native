import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { useThemeStore } from '../../store/themeStore';
import { darkTheme, lightTheme } from '../../theme/colors';
import { clearImageCache, getCacheSize } from '../../utils/imageCache';
import { requestNotificationPermissions, cancelAllNotifications } from '../../utils/notifications';

export default function SettingsScreen() {
  const { theme, toggleTheme } = useThemeStore();
  const colors = theme === 'dark' ? darkTheme : lightTheme;

  const [cacheSize, setCacheSize] = useState(0);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  useEffect(() => {
    loadCacheSize();
  }, []);

  const loadCacheSize = async () => {
    const size = await getCacheSize();
    setCacheSize(size);
  };

  const handleClearCache = async () => {
    await clearImageCache();
    await loadCacheSize();
  };

  const handleNotifications = async (value) => {
    if (value) {
      const granted = await requestNotificationPermissions();
      setNotificationsEnabled(granted);
    } else {
      await cancelAllNotifications();
      setNotificationsEnabled(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />

      <Text style={[styles.title, { color: colors.text }]}>⚙️ Настройки</Text>

      <View style={[styles.card, { backgroundColor: colors.surface }]}>
        <Text style={[styles.cardTitle, { color: colors.text }]}>Тема</Text>
        <View style={styles.row}>
          <Text style={[styles.label, { color: colors.textSecondary }]}>Темная тема</Text>
          <Switch value={theme === 'dark'} onValueChange={toggleTheme} />
        </View>
      </View>

      <View style={[styles.card, { backgroundColor: colors.surface }]}>
        <Text style={[styles.cardTitle, { color: colors.text }]}>Уведомления</Text>
        <View style={styles.row}>
          <Text style={[styles.label, { color: colors.textSecondary }]}>Включить уведомления</Text>
          <Switch value={notificationsEnabled} onValueChange={handleNotifications} />
        </View>
      </View>

      <View style={[styles.card, { backgroundColor: colors.surface }]}>
        <Text style={[styles.cardTitle, { color: colors.text }]}>Кэш изображений</Text>
        <Text style={[styles.label, { color: colors.textSecondary }]}>
          Размер: {(cacheSize / (1024 * 1024)).toFixed(2)} MB
        </Text>
        <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]} onPress={handleClearCache}>
          <Text style={styles.buttonText}>Очистить кэш</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
  },
  button: {
    marginTop: 12,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

