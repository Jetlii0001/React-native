import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { useMoviesStore } from '../../store/moviesStore';
import { useThemeStore } from '../../store/themeStore';
import { useDebounce } from '../../hooks/useDebounce';
import { darkTheme, lightTheme } from '../../theme/colors';
import SearchBar from '../../components/v2/SearchBar';
import FilterChips from '../../components/v2/FilterChips';
import MovieCardV2 from '../../components/v2/MovieCardV2';
import { MovieListSkeleton } from '../../components/v2/SkeletonLoader';

export default function SearchScreenV2() {
  const router = useRouter();
  const { theme } = useThemeStore();
  const colors = theme === 'dark' ? darkTheme : lightTheme;

  const { 
    searchResults, 
    isLoading, 
    error,
    searchMovies,
  } = useMoviesStore();

  const [query, setQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState(['movie', 'tv']);
  const debouncedQuery = useDebounce(query, 500);

  const filters = [
    { value: 'movie', label: 'Фильмы', icon: '🎬' },
    { value: 'tv', label: 'Сериалы', icon: '📺' },
    { value: '2024', label: '2024', icon: '📅' },
    { value: 'high_rating', label: 'Высокий рейтинг', icon: '⭐' },
  ];

  useEffect(() => {
    if (debouncedQuery.trim()) {
      searchMovies(debouncedQuery);
    }
  }, [debouncedQuery]);

  // Переключение фильтра
  const handleToggleFilter = (filterValue) => {
    setSelectedFilters(prev => {
      if (prev.includes(filterValue)) {
        return prev.filter(f => f !== filterValue);
      } else {
        return [...prev, filterValue];
      }
    });
  };

  const filteredResults = searchResults.filter(item => {
    if (selectedFilters.includes('movie') && item.media_type === 'movie') return true;
    if (selectedFilters.includes('tv') && item.media_type === 'tv') return true;
    if (selectedFilters.includes('2024')) {
      const year = (item.release_date || item.first_air_date)?.substring(0, 4);
      if (year !== '2024') return false;
    }
    if (selectedFilters.includes('high_rating')) {
      if ((item.vote_average || 0) < 7) return false;
    }
    return false;
  });

  const renderResult = ({ item }) => {
    const type = item.media_type === 'tv' ? 'tv' : 'movie';
    return (
      <MovieCardV2
        movie={item}
        type={type}
        onPress={() => router.push(`/movies/${item.id}?type=${type}`)}
      />
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
      
      {/* Поиск */}
      <View style={[styles.searchContainer, { backgroundColor: colors.surface }]}>
        <SearchBar
          value={query}
          onChangeText={setQuery}
          onFilterPress={() => {/* Открыть модальное окно фильтров */}}
          onVoiceSearch={() => {/* Голосовой поиск */}}
        />
      </View>

      {/* Фильтры */}
      <FilterChips
        filters={filters}
        selectedFilters={selectedFilters}
        onToggleFilter={handleToggleFilter}
      />

      {/* Результаты */}
      {isLoading && searchResults.length === 0 ? (
        <MovieListSkeleton count={6} />
      ) : error ? (
        <View style={styles.centerContainer}>
          <Text style={[styles.errorText, { color: colors.error }]}>Ошибка: {error}</Text>
        </View>
      ) : query.trim() === '' ? (
        <View style={styles.centerContainer}>
          <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
            Введите название фильма или сериала для поиска
          </Text>
        </View>
      ) : filteredResults.length === 0 ? (
        <View style={styles.centerContainer}>
          <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
            Ничего не найдено по запросу "{query}"
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredResults}
          renderItem={renderResult}
          keyExtractor={(item) => `${item.id}-${item.media_type}`}
          numColumns={2}
          contentContainerStyle={styles.listContent}
          columnWrapperStyle={styles.row}
          ListHeaderComponent={
            <Text style={[styles.resultsCount, { color: colors.textSecondary }]}>
              Найдено: {filteredResults.length} результатов
            </Text>
          }
        />
      )}

      {/* Кнопка назад */}
      <TouchableOpacity 
        style={[styles.backButton, { backgroundColor: colors.primary }]}
        onPress={() => router.back()}
      >
        <Text style={styles.backButtonText}>← Назад</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    paddingTop: 60,
  },
  listContent: {
    padding: 10,
  },
  row: {
    justifyContent: 'space-between',
  },
  resultsCount: {
    fontSize: 14,
    marginBottom: 15,
    paddingHorizontal: 5,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  errorText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
  },
  backButton: {
    padding: 15,
    margin: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

