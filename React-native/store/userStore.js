import { create } from 'zustand';

/**
 * Store для управления данными пользователя
 * 
 * Zustand - это самый простой state management для React
 * Вместо Redux (который сложный и требует много кода),
 * Zustand позволяет создать store за несколько строк
 */

export const useUserStore = create((set) => ({
  // Состояние (state)
  name: 'Иван',
  email: 'ivan@example.com',
  age: 20,
  isLoading: false,
  users: [],

  // Действия (actions) - функции для изменения состояния
  
  // Обновить имя
  setName: (newName) => set({ name: newName }),
  
  // Обновить email
  setEmail: (newEmail) => set({ email: newEmail }),
  
  // Обновить возраст
  setAge: (newAge) => set({ age: newAge }),
  
  // Обновить все данные пользователя сразу
  updateUser: (userData) => set((state) => ({
    ...state,
    ...userData
  })),

  // Загрузить пользователей с API
  fetchUsers: async () => {
    set({ isLoading: true });
    try {
      // Пример API запроса
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const users = await response.json();
      set({ users, isLoading: false });
    } catch (error) {
      console.error('Ошибка загрузки пользователей:', error);
      set({ isLoading: false });
    }
  },

  // Сбросить все данные
  reset: () => set({
    name: 'Иван',
    email: 'ivan@example.com',
    age: 20,
    users: []
  }),
}));

