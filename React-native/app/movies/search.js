import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { useMoviesStore } from '../../store/moviesStore';
import { useThemeStore } from '../../store/themeStore';
import { useDebounce } from '../../hooks/useDebounce';
import { darkTheme, lightTheme } from '../../theme/colors';
import SearchBar from '../../components/v2/SearchBar';
import FilterChips from '../../components/v2/FilterChips';
import MovieCardV2 from '../../components/v2/MovieCardV2';
import { MovieListSkeleton } from '../../components/v2/SkeletonLoader';

export default function SearchScreen() {
  const router = useRouter();
  const { theme } = useThemeStore();
  const colors = theme === 'dark' ? darkTheme : lightTheme;

  const { searchResults, isLoadingSearch, error, searchMovies } = useMoviesStore();

  const [query, setQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState(['movie', 'tv']);
  const [minRating, setMinRating] = useState(null);
  const [year, setYear] = useState(null);

  const debouncedQuery = useDebounce(query, 500);

  const filters = [
    { value: 'movie', label: 'Фильмы', icon: '🎬' },
    { value: 'tv', label: 'Сериалы', icon: '📺' },
    { value: 'high', label: '7+ рейтинг', icon: '⭐' },
    { value: '2024', label: '2024', icon: '📅' },
  ];
  const quickSuggestions = ['Дюна', 'Интерстеллар', 'Оппенгеймер', 'Во все тяжкие', 'Чернобыль'];

  useEffect(() => {
    if (debouncedQuery.trim()) {
      const mediaFilters = selectedFilters.filter((f) => f === 'movie' || f === 'tv');
      const type = mediaFilters.length === 2 ? 'all' : mediaFilters[0] || 'all';
      searchMovies(debouncedQuery, {
        type,
        minRating,
        year,
      });
    }
  }, [debouncedQuery, selectedFilters, minRating, year]);

  const handleToggleFilter = (filterValue) => {
    setSelectedFilters((prev) => {
      const exists = prev.includes(filterValue);
      const next = exists ? prev.filter((f) => f !== filterValue) : [...prev, filterValue];
      return next;
    });
    if (filterValue === 'high') {
      setMinRating((prev) => (prev ? null : 7));
    }
    if (filterValue === '2024') {
      setYear((prev) => (prev ? null : 2024));
    }
  };

  const filteredResults = searchResults.filter((item) => {
    if (selectedFilters.includes('movie') && item.media_type === 'movie') return true;
    if (selectedFilters.includes('tv') && item.media_type === 'tv') return true;
    return false;
  });

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />

      <View style={[styles.searchContainer, { backgroundColor: colors.surface }]}>
        <SearchBar
          value={query}
          onChangeText={setQuery}
          onFilterPress={() => {}}
          onVoiceSearch={() => {}}
        />
      </View>

      <FilterChips
        filters={filters}
        selectedFilters={selectedFilters}
        onToggleFilter={handleToggleFilter}
      />

      {query.trim() === '' && (
        <View style={styles.suggestions}>
          <Text style={[styles.suggestionsTitle, { color: colors.textSecondary }]}>Быстрые запросы</Text>
          <View style={styles.suggestionsRow}>
            {quickSuggestions.map((s) => (
              <TouchableOpacity
                key={s}
                style={[styles.suggestionChip, { backgroundColor: colors.surfaceVariant, borderColor: colors.border }]}
                onPress={() => setQuery(s)}
              >
                <Text style={[styles.suggestionText, { color: colors.text }]}>{s}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {isLoadingSearch && searchResults.length === 0 ? (
        <MovieListSkeleton count={6} />
      ) : error ? (
        <View style={styles.centerContainer}>
          <Text style={[styles.errorText, { color: colors.error }]}>Ошибка: {error}</Text>
        </View>
      ) : query.trim() === '' ? (
        <View style={styles.centerContainer}>
          <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
            Введите название фильма или сериала
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
          renderItem={({ item }) => (
            <MovieCardV2
              movie={item}
              type={item.media_type || 'movie'}
              onPress={() => router.push(`/movies/${item.id}?type=${item.media_type || 'movie'}`)}
            />
          )}
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
  suggestions: {
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  suggestionsTitle: {
    fontSize: 12,
    marginBottom: 8,
  },
  suggestionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  suggestionChip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
  },
  suggestionText: {
    fontSize: 12,
    fontWeight: '600',
  },
});

