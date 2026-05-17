import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { useThemeStore } from '../../store/themeStore';
import { useMoviesStore } from '../../store/moviesStore';
import { darkTheme, lightTheme } from '../../theme/colors';

const { width } = Dimensions.get('window');

/**
 * Hero секция с популярным фильмом
 * Пункты 1-10: Градиентный фон, Hero секция
 */
export default function HeroBanner({ movie, onPress, onWatchTrailer }) {
  const { theme } = useThemeStore();
  const { genreMap } = useMoviesStore();
  const colors = theme === 'dark' ? darkTheme : lightTheme;

  if (!movie) return null;

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
    : null;

  const title = movie.title || movie.name;
  const rating = movie.vote_average?.toFixed(1) || 'N/A';
  const overview = movie.overview || '';
  const year = (movie.release_date || movie.first_air_date || '').substring(0, 4);
  const genres = (movie.genre_ids || []).slice(0, 2).map((id) => genreMap?.[id]).filter(Boolean);

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.9}>
      {backdropUrl ? (
        <Image source={{ uri: backdropUrl }} style={styles.backdrop} resizeMode="cover" />
      ) : (
        <View style={[styles.backdrop, { backgroundColor: colors.surface }]} />
      )}

      {/* Размытый оверлей */}
      <BlurView intensity={20} style={styles.blurOverlay} />

      {/* Градиентный оверлей */}
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.35)', 'rgba(0,0,0,0.9)']}
        style={styles.gradientOverlay}
      />

      {/* Контент */}
      <View style={styles.content}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>🔥 Тренд недели</Text>
        </View>

        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>

        <View style={styles.ratingContainer}>
          <View style={[styles.ratingBadge, { backgroundColor: colors.primary }]}>
            <Text style={styles.ratingText}>⭐ {rating}</Text>
          </View>
          <Text style={styles.ratingLabel}>({movie.vote_count || 0} оценок)</Text>
        </View>
        <View style={styles.metaRow}>
          {year ? <Text style={styles.metaText}>{year}</Text> : null}
          {genres.map((g) => (
            <View key={g} style={[styles.metaChip, { borderColor: colors.border }]}>
              <Text style={styles.metaChipText}>{g}</Text>
            </View>
          ))}
        </View>

        {overview && (
          <Text style={styles.overview} numberOfLines={2}>
            {overview}
          </Text>
        )}

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.button, styles.primaryButton, { backgroundColor: colors.primary }]}
            onPress={onPress}
          >
            <Text style={[styles.buttonText, { color: colors.textOnPrimary }]}>Подробнее</Text>
          </TouchableOpacity>

          {onWatchTrailer && (
            <TouchableOpacity
              style={[styles.button, styles.secondaryButton, { borderColor: colors.primary }]}
              onPress={onWatchTrailer}
            >
              <Text style={[styles.buttonText, { color: colors.primary }]}>▶ Трейлер</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width,
    height: 400,
    position: 'relative',
  },
  backdrop: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  blurOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 20,
    paddingBottom: 40,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 107, 107, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 12,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  ratingBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 10,
  },
  ratingText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  ratingLabel: {
    color: '#fff',
    fontSize: 12,
    opacity: 0.8,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  metaText: {
    color: '#fff',
    fontSize: 12,
    opacity: 0.8,
  },
  metaChip: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    borderWidth: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  metaChipText: {
    color: '#fff',
    fontSize: 11,
  },
  overview: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
    marginBottom: 20,
    lineHeight: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
  },
  primaryButton: {
    // backgroundColor задается динамически
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

