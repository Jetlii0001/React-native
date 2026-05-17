import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Store для управления темой приложения
 * Пункт 7: Темная/светлая тема
 */

export const useThemeStore = create((set, get) => ({
  theme: 'dark', // 'dark' или 'light'
  isSystemTheme: true, // Использовать системную тему

  // Переключение темы
  toggleTheme: async () => {
    const currentTheme = get().theme;
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    set({ theme: newTheme, isSystemTheme: false });
    await AsyncStorage.setItem('app_theme', newTheme);
  },

  // Установка темы
  setTheme: async (theme) => {
    set({ theme, isSystemTheme: false });
    await AsyncStorage.setItem('app_theme', theme);
  },

  // Загрузка сохраненной темы
  loadTheme: async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('app_theme');
      if (savedTheme) {
        set({ theme: savedTheme, isSystemTheme: false });
      }
    } catch (error) {
      console.error('Ошибка загрузки темы:', error);
    }
  },
}));

