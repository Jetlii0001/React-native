import { View, Text, StyleSheet, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { useMoviesStore } from '../../store/moviesStore';
import { useThemeStore } from '../../store/themeStore';
import { useRecommendationsStore } from '../../store/recommendationsStore';
import { useShake } from '../../hooks/useShake';
import { darkTheme, lightTheme } from '../../theme/colors';
import HeroBanner from '../../components/v2/HeroBanner';
import SectionHeader from '../../components/v2/SectionHeader';
import HorizontalCarousel from '../../components/v2/HorizontalCarousel';
import PopularMoviesWidget from '../../components/v2/Widget';
import { MovieListSkeleton } from '../../components/v2/SkeletonLoader';

export default function MoviesScreen() {
  const router = useRouter();
  const { theme } = useThemeStore();
  const colors = theme === 'dark' ? darkTheme : lightTheme;

  const { homeSections, isLoadingHome, error, fetchHomeData, fetchGenres } = useMoviesStore();
  const { recommendations, fetchRecommendations } = useRecommendationsStore();

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchGenres();
    fetchHomeData();
    fetchRecommendations();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchHomeData();
    setRefreshing(false);
  };

  const heroMovie = homeSections.trending?.[0];

  const openMovie = (item) => {
    const type = item.media_type || 'movie';
    router.push(`/movies/${item.id}?type=${type}`);
  };

  const openRandom = () => {
    const list = homeSections.trending || [];
    if (list.length === 0) return;
    const random = list[Math.floor(Math.random() * list.length)];
    openMovie(random);
  };

  useShake(openRandom, 1.8);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />

      {isLoadingHome && (!homeSections.trending || homeSections.trending.length === 0) ? (
        <MovieListSkeleton count={6} />
      ) : (
        <ScrollView
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          <HeroBanner
            movie={heroMovie}
            onPress={() => heroMovie && openMovie(heroMovie)}
            onWatchTrailer={() => heroMovie && router.push(`/movies/${heroMovie.id}?type=movie&showTrailer=true`)}
          />

          <View style={styles.quickActions}>
          <TouchableOpacity
            style={[styles.quickButton, { backgroundColor: colors.primary }]}
            onPress={() => router.push('/movies/search')}
          >
            <Text style={[styles.quickButtonText, { color: colors.textOnPrimary }]}>🔍 Поиск</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.quickButton, { backgroundColor: colors.secondary }]}
            onPress={() => router.push('/movies/favorites')}
          >
            <Text style={[styles.quickButtonText, { color: colors.textOnPrimary }]}>❤️ Избранное</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.quickButton, { backgroundColor: colors.accent }]}
            onPress={() => router.push('/movies/recommendations')}
          >
            <Text style={[styles.quickButtonText, { color: '#fff' }]}>✨ Рекомендации</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.quickButton, { backgroundColor: colors.primaryVariant }]}
            onPress={openRandom}
          >
            <Text style={[styles.quickButtonText, { color: colors.textOnPrimary }]}>🎲 Случайный</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.quickButton, { backgroundColor: colors.surfaceVariant }]}
            onPress={() => router.push('/movies/settings')}
          >
            <Text style={[styles.quickButtonText, { color: colors.text }]}>⚙️ Настройки</Text>
          </TouchableOpacity>
          </View>

          <PopularMoviesWidget
            movies={homeSections.trending || []}
            onMoviePress={openMovie}
            onSeeAllPress={() => router.push('/movies/trending')}
          />

          <SectionHeader
            title="🔥 Тренды недели"
            subtitle="Самое обсуждаемое"
            onSeeAll={() => router.push('/movies/trending')}
          />
          <HorizontalCarousel data={homeSections.trending || []} onPressItem={openMovie} />

          <SectionHeader title="⭐ Топ рейтинга" subtitle="Лучшие фильмы по оценкам" />
          <HorizontalCarousel data={homeSections.topRated || []} onPressItem={openMovie} />

          <SectionHeader title="🎬 Сейчас в кино" subtitle="Новинки проката" />
          <HorizontalCarousel data={homeSections.nowPlaying || []} onPressItem={openMovie} />

          <SectionHeader title="📅 Скоро выйдут" subtitle="Будущие премьеры" />
          <HorizontalCarousel data={homeSections.upcoming || []} onPressItem={openMovie} />

          <SectionHeader title="📺 Популярные сериалы" subtitle="Лучшие сериалы недели" />
          <HorizontalCarousel data={homeSections.popularTV || []} onPressItem={openMovie} type="tv" />

          <SectionHeader title="🏆 Топ сериалы" subtitle="Высший рейтинг" />
          <HorizontalCarousel data={homeSections.topRatedTV || []} onPressItem={openMovie} type="tv" />

          <SectionHeader title="📡 Сейчас в эфире" subtitle="Новые серии" />
          <HorizontalCarousel data={homeSections.onTheAirTV || []} onPressItem={openMovie} type="tv" />

          <SectionHeader title="🎯 Для вас" subtitle="Персональная подборка" />
          <HorizontalCarousel data={homeSections.discover || []} onPressItem={openMovie} />

          {recommendations.length > 0 && (
            <>
              <SectionHeader title="🤖 AI рекомендации" subtitle="Подобрано под ваш вкус" />
              <HorizontalCarousel data={recommendations} onPressItem={openMovie} />
            </>
          )}

          {error && (
            <View style={styles.errorBox}>
              <Text style={[styles.errorText, { color: colors.error }]}>Ошибка: {error}</Text>
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    marginTop: 16,
    gap: 8,
  },
  quickButton: {
    flexGrow: 1,
    flexBasis: '48%',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  quickButtonText: {
    fontWeight: '700',
  },
  errorBox: {
    padding: 16,
    margin: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(244, 67, 54, 0.1)',
  },
  errorText: {
    fontSize: 14,
    textAlign: 'center',
  },
});

