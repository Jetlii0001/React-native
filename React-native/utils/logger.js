/**
 * Система логирования
 * Пункты 86-89: Технические улучшения
 */

const LOG_LEVELS = {
  DEBUG: 'DEBUG',
  INFO: 'INFO',
  WARN: 'WARN',
  ERROR: 'ERROR',
};

class Logger {
  constructor() {
    this.logs = [];
    this.maxLogs = 100;
  }

  log(level, message, data = null) {
    const timestamp = new Date().toISOString();
    const logEntry = {
      level,
      message,
      data,
      timestamp,
    };

    this.logs.push(logEntry);

    // Ограничиваем количество логов
    if (this.logs.length > this.maxLogs) {
      this.logs.shift();
    }

    // Выводим в консоль
    const consoleMethod = level === LOG_LEVELS.ERROR ? 'error' :
                         level === LOG_LEVELS.WARN ? 'warn' :
                         level === LOG_LEVELS.DEBUG ? 'debug' : 'log';

    if (__DEV__) {
      console[consoleMethod](`[${level}] ${message}`, data || '');
    }
  }

  debug(message, data) {
    this.log(LOG_LEVELS.DEBUG, message, data);
  }

  info(message, data) {
    this.log(LOG_LEVELS.INFO, message, data);
  }

  warn(message, data) {
    this.log(LOG_LEVELS.WARN, message, data);
  }

  error(message, data) {
    this.log(LOG_LEVELS.ERROR, message, data);
  }

  getLogs(level = null) {
    if (level) {
      return this.logs.filter(log => log.level === level);
    }
    return this.logs;
  }

  clearLogs() {
    this.logs = [];
  }

  exportLogs() {
    return JSON.stringify(this.logs, null, 2);
  }
}

export const logger = new Logger();

