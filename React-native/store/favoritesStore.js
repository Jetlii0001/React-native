import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Store для управления избранным и списками
 * Пункты 31-33: Избранное, Смотреть позже, Просмотрено
 */

const STORAGE_KEYS = {
  favorites: 'favorites',
  watchLater: 'watch_later',
  watched: 'watched',
};

export const useFavoritesStore = create((set, get) => ({
  // Состояние
  favorites: [],
  watchLater: [],
  watched: [],

  // Загрузка данных из AsyncStorage
  loadData: async () => {
    try {
      const [favorites, watchLater, watched] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.favorites),
        AsyncStorage.getItem(STORAGE_KEYS.watchLater),
        AsyncStorage.getItem(STORAGE_KEYS.watched),
      ]);

      set({
        favorites: favorites ? JSON.parse(favorites) : [],
        watchLater: watchLater ? JSON.parse(watchLater) : [],
        watched: watched ? JSON.parse(watched) : [],
      });
    } catch (error) {
      console.error('Ошибка загрузки данных:', error);
    }
  },

  // Избранное
  setFavorites: async (favorites) => {
    set({ favorites });
    await AsyncStorage.setItem(STORAGE_KEYS.favorites, JSON.stringify(favorites));
  },
  addToFavorites: async (movie) => {
    const favorites = [...get().favorites, movie];
    set({ favorites });
    await AsyncStorage.setItem(STORAGE_KEYS.favorites, JSON.stringify(favorites));
  },

  removeFromFavorites: async (movieId) => {
    const favorites = get().favorites.filter(m => m.id !== movieId);
    set({ favorites });
    await AsyncStorage.setItem(STORAGE_KEYS.favorites, JSON.stringify(favorites));
  },

  isFavorite: (movieId) => {
    return get().favorites.some(m => m.id === movieId);
  },

  // Смотреть позже
  setWatchLater: async (watchLater) => {
    set({ watchLater });
    await AsyncStorage.setItem(STORAGE_KEYS.watchLater, JSON.stringify(watchLater));
  },
  addToWatchLater: async (movie) => {
    const watchLater = [...get().watchLater, movie];
    set({ watchLater });
    await AsyncStorage.setItem(STORAGE_KEYS.watchLater, JSON.stringify(watchLater));
  },

  removeFromWatchLater: async (movieId) => {
    const watchLater = get().watchLater.filter(m => m.id !== movieId);
    set({ watchLater });
    await AsyncStorage.setItem(STORAGE_KEYS.watchLater, JSON.stringify(watchLater));
  },

  isInWatchLater: (movieId) => {
    return get().watchLater.some(m => m.id === movieId);
  },

  // Просмотрено
  setWatched: async (watched) => {
    set({ watched });
    await AsyncStorage.setItem(STORAGE_KEYS.watched, JSON.stringify(watched));
  },
  addToWatched: async (movie) => {
    const watched = [...get().watched, movie];
    set({ watched });
    await AsyncStorage.setItem(STORAGE_KEYS.watched, JSON.stringify(watched));
  },

  removeFromWatched: async (movieId) => {
    const watched = get().watched.filter(m => m.id !== movieId);
    set({ watched });
    await AsyncStorage.setItem(STORAGE_KEYS.watched, JSON.stringify(watched));
  },

  isWatched: (movieId) => {
    return get().watched.some(m => m.id === movieId);
  },

  // Получить все списки
  getAllLists: () => {
    return {
      favorites: get().favorites,
      watchLater: get().watchLater,
      watched: get().watched,
    };
  },
}));

