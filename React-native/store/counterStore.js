import { create } from 'zustand';

/**
 * Простой пример store для счетчика
 * Показывает базовое использование Zustand
 */

export const useCounterStore = create((set) => ({
  // Состояние
  count: 0,

  // Действия
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
  setCount: (value) => set({ count: value }),
}));

