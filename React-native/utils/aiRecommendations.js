/**
 * Система AI рекомендаций
 * Пункт 100: AI рекомендации
 * 
 * Простая система рекомендаций на основе:
 * - Жанров просмотренных фильмов
 * - Рейтингов
 * - Популярности
 */

/**
 * Получить рекомендации на основе просмотренных фильмов
 * @param {Array} watchedMovies - Массив просмотренных фильмов
 * @param {Array} allMovies - Все доступные фильмы
 * @returns {Array} - Рекомендуемые фильмы
 */
export function getRecommendations(watchedMovies, allMovies) {
  if (!watchedMovies || watchedMovies.length === 0) {
    // Если нет просмотренных, возвращаем популярные
    return allMovies
      .sort((a, b) => (b.vote_average || 0) - (a.vote_average || 0))
      .slice(0, 10);
  }

  // Анализируем жанры просмотренных фильмов
  const genreFrequency = {};
  watchedMovies.forEach(movie => {
    if (movie.genre_ids) {
      movie.genre_ids.forEach(genreId => {
        genreFrequency[genreId] = (genreFrequency[genreId] || 0) + 1;
      });
    }
  });

  // Находим любимые жанры (топ 3)
  const favoriteGenres = Object.entries(genreFrequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([genreId]) => parseInt(genreId));

  // Вычисляем score для каждого фильма
  const scoredMovies = allMovies.map(movie => {
    let score = 0;

    // Бонус за совпадение жанров
    if (movie.genre_ids) {
      const matchingGenres = movie.genre_ids.filter(id => favoriteGenres.includes(id));
      score += matchingGenres.length * 10;
    }

    // Бонус за высокий рейтинг
    if (movie.vote_average) {
      score += movie.vote_average * 2;
    }

    // Бонус за популярность (количество оценок)
    if (movie.vote_count) {
      score += Math.log10(movie.vote_count + 1) * 2;
    }

    // Штраф за уже просмотренные
    if (watchedMovies.some(w => w.id === movie.id)) {
      score = -1000; // Исключаем просмотренные
    }

    return { ...movie, recommendationScore: score };
  });

  // Сортируем по score и возвращаем топ 10
  return scoredMovies
    .sort((a, b) => b.recommendationScore - a.recommendationScore)
    .slice(0, 10)
    .map(({ recommendationScore, ...movie }) => movie);
}

/**
 * Получить рекомендации на основе конкретного фильма
 * @param {Object} movie - Фильм, на основе которого ищем похожие
 * @param {Array} allMovies - Все доступные фильмы
 * @returns {Array} - Похожие фильмы
 */
export function getSimilarMovies(movie, allMovies) {
  if (!movie || !movie.genre_ids) {
    return [];
  }

  const movieGenres = movie.genre_ids;

  const scoredMovies = allMovies
    .filter(m => m.id !== movie.id) // Исключаем сам фильм
    .map(m => {
      let score = 0;

      // Совпадение жанров
      if (m.genre_ids) {
        const commonGenres = m.genre_ids.filter(id => movieGenres.includes(id));
        score += commonGenres.length * 10;
      }

      // Близкий рейтинг
      if (movie.vote_average && m.vote_average) {
        const ratingDiff = Math.abs(movie.vote_average - m.vote_average);
        score += (10 - ratingDiff) * 2;
      }

      return { ...m, similarityScore: score };
    });

  return scoredMovies
    .sort((a, b) => b.similarityScore - a.similarityScore)
    .slice(0, 10)
    .map(({ similarityScore, ...m }) => m);
}

/**
 * Получить персональные рекомендации
 * @param {Object} userProfile - Профиль пользователя
 * @param {Array} allMovies - Все доступные фильмы
 * @returns {Array} - Персональные рекомендации
 */
export function getPersonalizedRecommendations(userProfile, allMovies) {
  const { watchedMovies = [], favoriteGenres = [], preferredRating = 7 } = userProfile;

  const scoredMovies = allMovies
    .filter(m => !watchedMovies.some(w => w.id === m.id))
    .map(movie => {
      let score = 0;

      // Жанры
      if (movie.genre_ids && favoriteGenres.length > 0) {
        const matchingGenres = movie.genre_ids.filter(id => favoriteGenres.includes(id));
        score += matchingGenres.length * 15;
      }

      // Рейтинг
      if (movie.vote_average) {
        if (movie.vote_average >= preferredRating) {
          score += 20;
        }
        score += movie.vote_average * 3;
      }

      // Популярность
      if (movie.vote_count) {
        score += Math.log10(movie.vote_count + 1) * 3;
      }

      // Новизна (бонус за недавние фильмы)
      if (movie.release_date) {
        const releaseYear = parseInt(movie.release_date.substring(0, 4));
        const currentYear = new Date().getFullYear();
        if (releaseYear >= currentYear - 2) {
          score += 5;
        }
      }

      return { ...movie, personalScore: score };
    });

  return scoredMovies
    .sort((a, b) => b.personalScore - a.personalScore)
    .slice(0, 20)
    .map(({ personalScore, ...movie }) => movie);
}

