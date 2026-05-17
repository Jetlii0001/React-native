import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, ActivityIndicator, Linking } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { useMoviesStore } from '../../store/moviesStore';
import { useThemeStore } from '../../store/themeStore';
import { useFavoritesStore } from '../../store/favoritesStore';
import { darkTheme, lightTheme } from '../../theme/colors';
import { useImageCache } from '../../hooks/useImageCache';
import HorizontalCarousel from '../../components/v2/HorizontalCarousel';
import SectionHeader from '../../components/v2/SectionHeader';
import { schedulePremiereNotification } from '../../utils/notifications';

export default function MovieDetailsScreen() {
  const router = useRouter();
  const { id, type = 'movie', showTrailer } = useLocalSearchParams();
  const { theme } = useThemeStore();
  const colors = theme === 'dark' ? darkTheme : lightTheme;

  const { selectedMovie, isLoadingDetails, error, fetchMovieDetails, clearSelectedMovie } = useMoviesStore();
  const { addToFavorites, removeFromFavorites, isFavorite, addToWatchLater, isInWatchLater, addToWatched } = useFavoritesStore();

  const [activeTab, setActiveTab] = useState('about');

  useEffect(() => {
    if (id) {
      fetchMovieDetails(parseInt(id, 10), type);
    }
    return () => clearSelectedMovie();
  }, [id, type]);

  useEffect(() => {
    if (showTrailer && selectedMovie?.videos?.results?.length > 0) {
      openTrailer();
    }
  }, [showTrailer, selectedMovie]);

  const isFav = selectedMovie ? isFavorite(selectedMovie.id) : false;
  const inWatchLater = selectedMovie ? isInWatchLater(selectedMovie.id) : false;

  const posterUrl = selectedMovie?.fullPosterUrl || null;
  const backdropUrl = selectedMovie?.fullBackdropUrl || null;
  const { cachedUrl: cachedPoster } = useImageCache(posterUrl);
  const { cachedUrl: cachedBackdrop } = useImageCache(backdropUrl);

  const openTrailer = () => {
    const trailer = selectedMovie?.videos?.results?.find(
      (video) => video.type === 'Trailer' && video.site === 'YouTube'
    );
    if (trailer) {
      Linking.openURL(`https://www.youtube.com/watch?v=${trailer.key}`);
    }
  };

  const handleReminder = async () => {
    if (selectedMovie?.release_date) {
      await schedulePremiereNotification(selectedMovie, selectedMovie.release_date);
    }
  };

  if (isLoadingDetails && !selectedMovie) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={[styles.loadingText, { color: colors.text }]}>Загрузка...</Text>
        </View>
      </View>
    );
  }

  if (error || !selectedMovie) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
        <View style={styles.centerContainer}>
          <Text style={[styles.errorText, { color: colors.error }]}>Ошибка загрузки</Text>
          <Text style={[styles.errorMessage, { color: colors.textSecondary }]}>{error || 'Не найдено'}</Text>
          <TouchableOpacity style={[styles.backButton, { backgroundColor: colors.primary }]} onPress={() => router.back()}>
            <Text style={styles.backButtonText}>Назад</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const title = selectedMovie.title || selectedMovie.name;
  const year = (selectedMovie.release_date || selectedMovie.first_air_date || '').substring(0, 4);
  const rating = selectedMovie.vote_average?.toFixed(1) || 'N/A';

  const formatMoney = (value) => {
    if (!value || value === 0) return '—';
    return `$${(value / 1000000).toFixed(1)} млн`;
  };

  const infoItems = [
    { label: 'Статус', value: selectedMovie.status || '—' },
    { label: 'Язык', value: (selectedMovie.original_language || '—').toUpperCase() },
    { label: 'Бюджет', value: formatMoney(selectedMovie.budget) },
    { label: 'Сборы', value: formatMoney(selectedMovie.revenue) },
    { label: 'Страна', value: selectedMovie.production_countries?.[0]?.name || '—' },
    { label: 'Возраст', value: selectedMovie.adult ? '18+' : '0+' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />

      <ScrollView>
        {/* Backdrop */}
        {cachedBackdrop ? (
          <Image source={{ uri: cachedBackdrop }} style={styles.backdrop} resizeMode="cover" />
        ) : null}

        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
            <Text style={styles.iconText}>←</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => (isFav ? removeFromFavorites(selectedMovie.id) : addToFavorites(selectedMovie))} style={styles.iconButton}>
            <Text style={styles.iconText}>{isFav ? '❤️' : '🤍'}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.mainInfo}>
          {cachedPoster || posterUrl ? (
            <Image source={{ uri: cachedPoster || posterUrl }} style={styles.poster} resizeMode="cover" />
          ) : (
            <View style={[styles.poster, { backgroundColor: '#333' }]} />
          )}
          <View style={styles.info}>
            <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>{year} • {selectedMovie.runtime || selectedMovie.episode_run_time?.[0] || 'N/A'} мин</Text>
            <View style={styles.ratingRow}>
              <Text style={[styles.rating, { color: colors.primary }]}>⭐ {rating}</Text>
              <Text style={[styles.voteCount, { color: colors.textSecondary }]}>({selectedMovie.vote_count} оценок)</Text>
            </View>
            <View style={styles.actionsRow}>
              <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.primary }]} onPress={openTrailer}>
                <Text style={styles.actionText}>▶ Трейлер</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.secondary }]} onPress={() => addToWatchLater(selectedMovie)}>
                <Text style={styles.actionText}>{inWatchLater ? '✓ В списке' : '🕒 Смотреть позже'}</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.accent }]} onPress={handleReminder}>
              <Text style={styles.actionText}>⏰ Напомнить о премьере</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.tabs}>
          {['about', 'cast', 'videos', 'reviews', 'similar'].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && { borderBottomColor: colors.primary }]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabText, { color: activeTab === tab ? colors.primary : colors.textSecondary }]}>
                {tab === 'about' && 'О фильме'}
                {tab === 'cast' && 'Актеры'}
                {tab === 'videos' && 'Трейлеры'}
                {tab === 'reviews' && 'Отзывы'}
                {tab === 'similar' && 'Похожие'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {activeTab === 'about' && (
          <View style={styles.section}>
            <SectionHeader title="Описание" />
            <Text style={[styles.overview, { color: colors.textSecondary }]}>{selectedMovie.overview}</Text>
            {selectedMovie.genres?.length > 0 && (
              <View style={styles.genres}>
                {selectedMovie.genres.map((genre) => (
                  <View key={genre.id} style={[styles.genreTag, { backgroundColor: colors.surface }]}>
                    <Text style={[styles.genreText, { color: colors.text }]}>{genre.name}</Text>
                  </View>
                ))}
              </View>
            )}
            <View style={[styles.infoGrid, { borderColor: colors.border }]}>
              {infoItems.map((item) => (
                <View key={item.label} style={[styles.infoCell, { backgroundColor: colors.surface }]}>
                  <Text style={[styles.infoLabel, { color: colors.textTertiary }]}>{item.label}</Text>
                  <Text style={[styles.infoValue, { color: colors.text }]}>{item.value}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {activeTab === 'cast' && (
          <View style={styles.section}>
            <SectionHeader title="В главных ролях" />
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {selectedMovie.credits?.cast?.slice(0, 15).map((actor) => (
                <View key={actor.id} style={styles.actorCard}>
                  <Image
                    source={{ uri: actor.profile_path ? `https://image.tmdb.org/t/p/w185${actor.profile_path}` : undefined }}
                    style={styles.actorImage}
                  />
                  <Text style={[styles.actorName, { color: colors.text }]} numberOfLines={1}>{actor.name}</Text>
                  <Text style={[styles.actorRole, { color: colors.textSecondary }]} numberOfLines={1}>{actor.character}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        )}

        {activeTab === 'videos' && (
          <View style={styles.section}>
            <SectionHeader title="Трейлеры" />
            {selectedMovie.videos?.results?.slice(0, 5).map((video) => (
              <TouchableOpacity key={video.id} style={styles.videoItem} onPress={() => Linking.openURL(`https://www.youtube.com/watch?v=${video.key}`)}>
                <Text style={[styles.videoTitle, { color: colors.text }]}>{video.name}</Text>
                <Text style={[styles.videoMeta, { color: colors.textSecondary }]}>{video.site} • {video.type}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {activeTab === 'reviews' && (
          <View style={styles.section}>
            <SectionHeader title="Отзывы" />
            {selectedMovie.reviews?.results?.slice(0, 5).map((review) => (
              <View key={review.id} style={[styles.reviewCard, { backgroundColor: colors.surface }]}>
                <Text style={[styles.reviewAuthor, { color: colors.text }]}>{review.author}</Text>
                <Text style={[styles.reviewContent, { color: colors.textSecondary }]} numberOfLines={6}>{review.content}</Text>
              </View>
            ))}
          </View>
        )}

        {activeTab === 'similar' && (
          <View style={styles.section}>
            <SectionHeader title="Похожие фильмы" />
            <HorizontalCarousel data={selectedMovie.similar?.results || []} onPressItem={(item) => router.push(`/movies/${item.id}?type=${type}`)} type={type} />
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backdrop: {
    width: '100%',
    height: 240,
  },
  header: {
    position: 'absolute',
    top: 40,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 10,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    color: '#fff',
    fontSize: 18,
  },
  mainInfo: {
    flexDirection: 'row',
    padding: 16,
    marginTop: -80,
  },
  poster: {
    width: 120,
    height: 180,
    borderRadius: 12,
    marginRight: 16,
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  subtitle: {
    marginTop: 4,
    fontSize: 13,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  rating: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  voteCount: {
    fontSize: 12,
  },
  actionsRow: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 8,
    flexWrap: 'wrap',
  },
  actionButton: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
    flexGrow: 1,
    flexBasis: 0,
    minWidth: 140,
  },
  actionText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  tab: {
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabText: {
    fontSize: 12,
    fontWeight: '600',
  },
  section: {
    padding: 16,
  },
  overview: {
    fontSize: 14,
    lineHeight: 20,
  },
  genres: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 12,
  },
  genreTag: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  genreText: {
    fontSize: 12,
  },
  infoGrid: {
    marginTop: 16,
    borderWidth: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  infoCell: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.08)',
  },
  infoLabel: {
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  infoValue: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: '600',
  },
  actorCard: {
    width: 100,
    marginRight: 12,
  },
  actorImage: {
    width: 100,
    height: 120,
    borderRadius: 8,
    backgroundColor: '#333',
  },
  actorName: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 6,
  },
  actorRole: {
    fontSize: 10,
  },
  videoItem: {
    marginBottom: 12,
  },
  videoTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  videoMeta: {
    fontSize: 12,
  },
  reviewCard: {
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  reviewAuthor: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  reviewContent: {
    fontSize: 12,
    marginTop: 6,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 8,
  },
  errorText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorMessage: {
    fontSize: 12,
    marginBottom: 12,
  },
  backButton: {
    padding: 12,
    borderRadius: 10,
  },
  backButtonText: {
    color: '#fff',
  },
});
