/**
 * Система аналитики
 * Пункты 91-95: Технические улучшения
 */

class Analytics {
  constructor() {
    this.events = [];
    this.userProperties = {};
  }

  // Отслеживание события
  track(eventName, properties = {}) {
    const event = {
      name: eventName,
      properties,
      timestamp: new Date().toISOString(),
    };

    this.events.push(event);

    if (__DEV__) {
      console.log('[Analytics]', eventName, properties);
    }

    // Здесь можно интегрировать с Google Analytics, Mixpanel и т.д.
    // Например:
    // if (window.gtag) {
    //   window.gtag('event', eventName, properties);
    // }
  }

  // Установка свойств пользователя
  setUserProperties(properties) {
    this.userProperties = { ...this.userProperties, ...properties };
  }

  // Отслеживание просмотра экрана
  trackScreenView(screenName) {
    this.track('screen_view', { screen_name: screenName });
  }

  // Отслеживание поиска
  trackSearch(query, resultsCount) {
    this.track('search', {
      query,
      results_count: resultsCount,
    });
  }

  // Отслеживание просмотра фильма
  trackMovieView(movieId, movieTitle) {
    this.track('movie_view', {
      movie_id: movieId,
      movie_title: movieTitle,
    });
  }

  // Отслеживание добавления в избранное
  trackFavorite(movieId, action) {
    this.track('favorite', {
      movie_id: movieId,
      action, // 'add' или 'remove'
    });
  }

  // Получить все события
  getEvents() {
    return this.events;
  }

  // Очистить события
  clearEvents() {
    this.events = [];
  }
}

export const analytics = new Analytics();

