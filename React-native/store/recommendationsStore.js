import { create } from 'zustand';
import { getRecommendations, getSimilarMovies, getPersonalizedRecommendations } from '../utils/aiRecommendations';
import { useFavoritesStore } from './favoritesStore';
import { useMoviesStore } from './moviesStore';

/**
 * Store для AI рекомендаций
 * Пункт 100: AI рекомендации
 */
export const useRecommendationsStore = create((set, get) => ({
  recommendations: [],
  similarMovies: {},
  personalizedRecommendations: [],
  isLoading: false,

  // Получить рекомендации на основе просмотренных
  fetchRecommendations: async () => {
    set({ isLoading: true });
    try {
      const { watched } = useFavoritesStore.getState();
      const { movies, tvShows, homeSections } = useMoviesStore.getState();
      const allMovies = [
        ...movies,
        ...tvShows,
        ...(homeSections.trending || []),
        ...(homeSections.topRated || []),
        ...(homeSections.nowPlaying || []),
        ...(homeSections.upcoming || []),
      ];

      const recommendations = getRecommendations(watched, allMovies);
      set({ recommendations, isLoading: false });
    } catch (error) {
      console.error('Ошибка получения рекомендаций:', error);
      set({ isLoading: false });
    }
  },

  // Получить похожие фильмы
  fetchSimilarMovies: async (movieId) => {
    try {
      const { movies, tvShows, homeSections } = useMoviesStore.getState();
      const allMovies = [
        ...movies,
        ...tvShows,
        ...(homeSections.trending || []),
        ...(homeSections.topRated || []),
        ...(homeSections.nowPlaying || []),
        ...(homeSections.upcoming || []),
      ];
      const movie = allMovies.find(m => m.id === movieId);

      if (!movie) return;

      const similar = getSimilarMovies(movie, allMovies);
      set(state => ({
        similarMovies: {
          ...state.similarMovies,
          [movieId]: similar,
        },
      }));
    } catch (error) {
      console.error('Ошибка получения похожих фильмов:', error);
    }
  },

  // Получить персональные рекомендации
  fetchPersonalizedRecommendations: async () => {
    set({ isLoading: true });
    try {
      const { watched, favorites } = useFavoritesStore.getState();
      const { movies, tvShows, homeSections } = useMoviesStore.getState();
      const allMovies = [
        ...movies,
        ...tvShows,
        ...(homeSections.trending || []),
        ...(homeSections.topRated || []),
        ...(homeSections.nowPlaying || []),
        ...(homeSections.upcoming || []),
      ];

      // Анализируем любимые жанры
      const favoriteGenres = [];
      favorites.forEach(movie => {
        if (movie.genre_ids) {
          favoriteGenres.push(...movie.genre_ids);
        }
      });

      // Находим средний рейтинг просмотренных
      const avgRating = watched.length > 0
        ? watched.reduce((sum, m) => sum + (m.vote_average || 0), 0) / watched.length
        : 7;

      const userProfile = {
        watchedMovies: watched,
        favoriteGenres: [...new Set(favoriteGenres)],
        preferredRating: avgRating,
      };

      const personalized = getPersonalizedRecommendations(userProfile, allMovies);
      set({ personalizedRecommendations: personalized, isLoading: false });
    } catch (error) {
      console.error('Ошибка получения персональных рекомендаций:', error);
      set({ isLoading: false });
    }
  },
}));

