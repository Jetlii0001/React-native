import { create } from 'zustand';

/**
 * AAA-версия store для фильмотеки
 * Полная информативность: фильмы, сериалы, актеры, трейлеры, отзывы, похожие
 */

// ⚠️ ВАЖНО: Замени на свой API ключ от TMDB
const TMDB_API_KEY = 'dd2c9414549b7c582ba2b24b0a6836ba';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

const DEFAULT_LANGUAGE = 'ru-RU';
const DEFAULT_REGION = 'RU';

const apiFetch = async (path, params = {}) => {
  const url = new URL(`${TMDB_BASE_URL}${path}`);
  url.searchParams.set('api_key', TMDB_API_KEY);
  url.searchParams.set('language', DEFAULT_LANGUAGE);
  url.searchParams.set('region', DEFAULT_REGION);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, value);
    }
  });

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`Ошибка API: ${response.status}`);
  }
  return response.json();
};

export const useMoviesStore = create((set, get) => ({
  // Базовые списки
  movies: [],
  tvShows: [],

  // AAA секции главной
  homeSections: {
    trending: [],
    topRated: [],
    nowPlaying: [],
    upcoming: [],
    popularTV: [],
    topRatedTV: [],
    onTheAirTV: [],
    discover: [],
  },

  // Детали и поиск
  selectedMovie: null,
  searchResults: [],
  searchQuery: '',

  // Жанры
  genres: [],
  genreMap: {},

  // Состояния загрузки
  isLoadingHome: false,
  isLoadingDetails: false,
  isLoadingSearch: false,
  error: null,

  /**
   * Загрузка жанров
   */
  fetchGenres: async () => {
    try {
      const [movieGenres, tvGenres] = await Promise.all([
        apiFetch('/genre/movie/list'),
        apiFetch('/genre/tv/list'),
      ]);

      const allGenres = [...(movieGenres.genres || []), ...(tvGenres.genres || [])];
      const map = {};
      allGenres.forEach((genre) => {
        map[genre.id] = genre.name;
      });

      set({ genres: allGenres, genreMap: map });
    } catch (error) {
      console.error('Ошибка загрузки жанров:', error);
    }
  },

  /**
   * Загрузка всех секций главной (AAA)
   */
  fetchHomeData: async () => {
    set({ isLoadingHome: true, error: null });
    try {
      const [
        trending,
        topRated,
        nowPlaying,
        upcoming,
        popularTV,
        topRatedTV,
        onTheAirTV,
        discover,
      ] = await Promise.all([
        apiFetch('/trending/all/week'),
        apiFetch('/movie/top_rated', { page: 1 }),
        apiFetch('/movie/now_playing', { page: 1 }),
        apiFetch('/movie/upcoming', { page: 1 }),
        apiFetch('/tv/popular', { page: 1 }),
        apiFetch('/tv/top_rated', { page: 1 }),
        apiFetch('/tv/on_the_air', { page: 1 }),
        apiFetch('/discover/movie', {
          sort_by: 'popularity.desc',
          include_adult: false,
          page: 1,
        }),
      ]);

      set({
        homeSections: {
          trending: trending.results || [],
          topRated: topRated.results || [],
          nowPlaying: nowPlaying.results || [],
          upcoming: upcoming.results || [],
          popularTV: popularTV.results || [],
          topRatedTV: topRatedTV.results || [],
          onTheAirTV: onTheAirTV.results || [],
          discover: discover.results || [],
        },
        isLoadingHome: false,
      });
    } catch (error) {
      console.error('Ошибка загрузки главной:', error);
      set({ error: error.message, isLoadingHome: false });
    }
  },

  /**
   * Загрузка популярных фильмов
   */
  fetchPopularMovies: async () => {
    set({ isLoadingHome: true, error: null });
    try {
      const data = await apiFetch('/movie/popular', { page: 1 });
      set({ movies: data.results || [], isLoadingHome: false });
    } catch (error) {
      console.error('Ошибка загрузки фильмов:', error);
      set({ error: error.message, isLoadingHome: false });
    }
  },

  /**
   * Загрузка популярных сериалов
   */
  fetchPopularTVShows: async () => {
    set({ isLoadingHome: true, error: null });
    try {
      const data = await apiFetch('/tv/popular', { page: 1 });
      set({ tvShows: data.results || [], isLoadingHome: false });
    } catch (error) {
      console.error('Ошибка загрузки сериалов:', error);
      set({ error: error.message, isLoadingHome: false });
    }
  },

  /**
   * Загрузка детальной информации о фильме/сериале
   */
  fetchMovieDetails: async (movieId, type = 'movie') => {
    set({ isLoadingDetails: true, error: null });
    try {
      const details = await apiFetch(`/${type}/${movieId}`, {
        append_to_response: 'credits,videos,images,similar,recommendations,reviews,keywords,watch/providers',
        include_image_language: 'ru,en,null',
      });

      set({
        selectedMovie: {
          ...details,
          type,
          fullPosterUrl: details.poster_path
            ? `https://image.tmdb.org/t/p/w500${details.poster_path}`
            : null,
          fullBackdropUrl: details.backdrop_path
            ? `https://image.tmdb.org/t/p/w1280${details.backdrop_path}`
            : null,
        },
        isLoadingDetails: false,
      });
    } catch (error) {
      console.error('Ошибка загрузки деталей:', error);
      set({ error: error.message, isLoadingDetails: false });
    }
  },

  /**
   * Поиск с фильтрами
   */
  searchMovies: async (query, filters = {}) => {
    if (!query.trim()) {
      set({ searchResults: [], searchQuery: '' });
      return;
    }

    set({ isLoadingSearch: true, error: null, searchQuery: query });
    try {
      const data = await apiFetch('/search/multi', {
        query,
        page: 1,
        include_adult: filters.includeAdult ? true : false,
        year: filters.year,
      });

      let results = data.results || [];

      // Локальная фильтрация по рейтингу
      if (filters.minRating) {
        results = results.filter((item) => (item.vote_average || 0) >= filters.minRating);
      }

      // Фильтр по типу (movie/tv)
      if (filters.type && filters.type !== 'all') {
        results = results.filter((item) => item.media_type === filters.type);
      }

      set({ searchResults: results, isLoadingSearch: false });
    } catch (error) {
      console.error('Ошибка поиска:', error);
      set({ error: error.message, isLoadingSearch: false });
    }
  },

  /**
   * Очистка выбранного фильма
   */
  clearSelectedMovie: () => set({ selectedMovie: null }),

  /**
   * Очистка результатов поиска
   */
  clearSearch: () => set({ searchResults: [], searchQuery: '' }),

  /**
   * Получить URL изображения
   */
  getImageUrl: (path, size = 'w500') => {
    if (!path) return null;
    return `https://image.tmdb.org/t/p/${size}${path}`;
  },
}));
