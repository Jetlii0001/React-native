import { View, Text, StyleSheet, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { useMoviesStore } from '../../store/moviesStore';
import { useThemeStore } from '../../store/themeStore';
import { useFavoritesStore } from '../../store/favoritesStore';
import { darkTheme, lightTheme } from '../../theme/colors';
import HeroBanner from '../../components/v2/HeroBanner';
import MovieCardV2 from '../../components/v2/MovieCardV2';
import { MovieListSkeleton } from '../../components/v2/SkeletonLoader';


export default function MoviesScreenV2() {
  const router = useRouter();
  const { theme } = useThemeStore();
  const colors = theme === 'dark' ? darkTheme : lightTheme;
  
  const { 
    movies, 
    tvShows, 
    isLoading, 
    error,
    fetchPopularMovies, 
    fetchPopularTVShows,
  } = useMoviesStore();

  const { loadData } = useFavoritesStore();
  const [activeTab, setActiveTab] = useState('movies');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchPopularMovies();
    fetchPopularTVShows();
    loadData();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    if (activeTab === 'movies') {
      await fetchPopularMovies();
    } else {
      await fetchPopularTVShows();
    }
    setRefreshing(false);
  };

  const heroMovie = movies.length > 0 ? movies[0] : null;

  const renderMovieCard = ({ item }) => (
    <MovieCardV2
      movie={item}
      type={activeTab === 'movies' ? 'movie' : 'tv'}
      onPress={() => router.push(`/movies/${item.id}?type=${activeTab === 'movies' ? 'movie' : 'tv'}`)}
    />
  );

  const handleHeroPress = () => {
    if (heroMovie) {
      router.push(`/movies/${heroMovie.id}?type=movie`);
    }
  };

  const handleWatchTrailer = () => {
    if (heroMovie) {
      router.push(`/movies/${heroMovie.id}?type=movie&showTrailer=true`);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />

      {heroMovie && activeTab === 'movies' && (
        <HeroBanner
          movie={heroMovie}
          onPress={handleHeroPress}
          onWatchTrailer={handleWatchTrailer}
        />
      )}

      <View style={[styles.header, { backgroundColor: colors.surface }]}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>🎬 Фильмотека</Text>
        <TouchableOpacity
          style={[styles.searchButton, { backgroundColor: colors.primary }]}
          onPress={() => router.push('/movies/search')}
        >
          <Text style={styles.searchButtonText}>🔍</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.tabs, { backgroundColor: colors.surfaceVariant }]}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'movies' && { backgroundColor: colors.primary },
          ]}
          onPress={() => setActiveTab('movies')}
        >
          <Text
            style={[
              styles.tabText,
              { color: activeTab === 'movies' ? '#fff' : colors.textSecondary },
            ]}
          >
            🎬 Фильмы
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'tv' && { backgroundColor: colors.primary },
          ]}
          onPress={() => setActiveTab('tv')}
        >
          <Text
            style={[
              styles.tabText,
              { color: activeTab === 'tv' ? '#fff' : colors.textSecondary },
            ]}
          >
            📺 Сериалы
          </Text>
        </TouchableOpacity>
      </View>

      {isLoading && (activeTab === 'movies' ? movies : tvShows).length === 0 ? (
        <MovieListSkeleton count={6} />
      ) : error ? (
        <View style={styles.centerContainer}>
          <Text style={[styles.errorText, { color: colors.error }]}>Ошибка: {error}</Text>
          <TouchableOpacity
            style={[styles.retryButton, { backgroundColor: colors.primary }]}
            onPress={onRefresh}
          >
            <Text style={styles.retryButtonText}>Повторить</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={activeTab === 'movies' ? movies : tvShows}
          renderItem={renderMovieCard}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.listContent}
          columnWrapperStyle={styles.row}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={colors.primary}
            />
          }
          ListEmptyComponent={
            <View style={styles.centerContainer}>
              <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
                Нет данных
              </Text>
            </View>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  searchButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButtonText: {
    fontSize: 20,
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 10,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
  },
  listContent: {
    padding: 10,
  },
  row: {
    justifyContent: 'space-between',
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
    marginBottom: 20,
  },
  retryButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyText: {
    fontSize: 16,
  },
});

