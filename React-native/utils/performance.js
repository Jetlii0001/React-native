/**
 * Мониторинг производительности
 * Пункты 91-95: Технические улучшения
 */

class PerformanceMonitor {
  constructor() {
    this.metrics = {};
  }

  // Начать измерение
  startMeasure(name) {
    this.metrics[name] = {
      startTime: performance.now(),
      endTime: null,
      duration: null,
    };
  }

  // Завершить измерение
  endMeasure(name) {
    if (this.metrics[name]) {
      this.metrics[name].endTime = performance.now();
      this.metrics[name].duration = this.metrics[name].endTime - this.metrics[name].startTime;
      
      if (__DEV__) {
        console.log(`[Performance] ${name}: ${this.metrics[name].duration.toFixed(2)}ms`);
      }
    }
  }

  // Получить метрики
  getMetrics() {
    return this.metrics;
  }

  // Очистить метрики
  clearMetrics() {
    this.metrics = {};
  }

  // Измерить выполнение функции
  async measureFunction(name, fn) {
    this.startMeasure(name);
    try {
      const result = await fn();
      this.endMeasure(name);
      return result;
    } catch (error) {
      this.endMeasure(name);
      throw error;
    }
  }
}

export const performanceMonitor = new PerformanceMonitor();

// Полифилл для performance.now() если не доступен
if (typeof performance === 'undefined') {
  global.performance = {
    now: () => Date.now(),
  };
}

