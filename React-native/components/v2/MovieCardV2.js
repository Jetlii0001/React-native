import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Animated, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Swipeable } from 'react-native-gesture-handler';
import * as Haptics from 'expo-haptics';
import { useThemeStore } from '../../store/themeStore';
import { useFavoritesStore } from '../../store/favoritesStore';
import { useImageCache } from '../../hooks/useImageCache';
import { useMoviesStore } from '../../store/moviesStore';
import { darkTheme, lightTheme } from '../../theme/colors';

/**
 * Новая версия карточки фильма с редизайном
 * Пункты 11-24: Градиенты, бейджи, анимации, избранное
 */
export default function MovieCardV2({ movie, onPress, type = 'movie', layout = 'grid', showGenres = true }) {
  const { theme } = useThemeStore();
  const { 
    isFavorite, 
    addToFavorites, 
    removeFromFavorites,
    addToWatchLater,
    removeFromWatchLater,
    isInWatchLater,
    addToWatched,
    isWatched,
  } = useFavoritesStore();
  const { genreMap } = useMoviesStore();
  const colors = theme === 'dark' ? darkTheme : lightTheme;
  
  const [scaleAnim] = React.useState(new Animated.Value(1));
  const isFav = isFavorite(movie.id);
  const inWatchLater = isInWatchLater(movie.id);
  const watched = isWatched(movie.id);
  
  const imageUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;
  const { cachedUrl } = useImageCache(imageUrl);

  const title = movie.title || movie.name;
  const releaseDate = movie.release_date || movie.first_air_date;
  const year = releaseDate ? releaseDate.substring(0, 4) : 'N/A';
  const rating = movie.vote_average?.toFixed(1) || 'N/A';
  const genres = movie.genre_ids?.slice(0, 2) || [];
  const genreNames = genres.map((id) => genreMap?.[id]).filter(Boolean);
  const typeLabel = type === 'tv' ? 'Сериал' : 'Фильм';

  // Анимация нажатия
  const handlePressIn = () => {
    Haptics.selectionAsync();
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  // Переключение избранного
  const handleFavoritePress = async (e) => {
    if (e && e.stopPropagation) {
      e.stopPropagation();
    }
    if (isFav) {
      await removeFromFavorites(movie.id);
    } else {
      await addToFavorites({ ...movie, type });
    }
  };

  const handleWatchLater = async () => {
    if (inWatchLater) {
      await removeFromWatchLater(movie.id);
    } else {
      await addToWatchLater({ ...movie, type });
    }
  };

  const handleWatched = async () => {
    if (!watched) {
      await addToWatched({ ...movie, type });
    }
  };

  const handleLongPress = () => {
    Alert.alert(
      title,
      'Быстрые действия',
      [
        { text: isFav ? 'Убрать из избранного' : 'В избранное', onPress: handleFavoritePress },
        { text: inWatchLater ? 'Убрать из "Смотреть позже"' : 'Смотреть позже', onPress: handleWatchLater },
        { text: watched ? 'Просмотрено' : 'Отметить как просмотренное', onPress: handleWatched },
        { text: 'Отмена', style: 'cancel' },
      ]
    );
  };

  const renderLeftActions = () => (
    <View style={[styles.swipeAction, { backgroundColor: colors.primary }]}>
      <Text style={styles.swipeActionText}>{isFav ? '💔' : '❤️'}</Text>
    </View>
  );

  const renderRightActions = () => (
    <View style={[styles.swipeAction, { backgroundColor: colors.secondary }]}>
      <Text style={styles.swipeActionText}>{inWatchLater ? '⏰' : '🕒'}</Text>
    </View>
  );

  // Цвет рейтинга
  const getRatingColor = () => {
    const ratingNum = parseFloat(rating);
    if (ratingNum >= 7) return colors.rating.high;
    if (ratingNum >= 5) return colors.rating.medium;
    return colors.rating.low;
  };

  const ratingPercent = Math.min((parseFloat(rating) || 0) * 10, 100);

  const containerStyle = layout === 'carousel' ? styles.containerCarousel : styles.container;
  const posterStyle = layout === 'carousel' ? styles.posterCarousel : styles.poster;

  return (
    <Animated.View style={[containerStyle, { transform: [{ scale: scaleAnim }] }]}>
      <Swipeable
        renderLeftActions={renderLeftActions}
        renderRightActions={renderRightActions}
        onSwipeableLeftOpen={handleFavoritePress}
        onSwipeableRightOpen={handleWatchLater}
      >
        <TouchableOpacity
          style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}
          onPress={onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onLongPress={handleLongPress}
          activeOpacity={0.9}
        >
        {/* Постер с градиентным оверлеем */}
        <View style={styles.posterContainer}>
          {cachedUrl ? (
            <Image source={{ uri: cachedUrl }} style={posterStyle} resizeMode="cover" />
          ) : (
            <View style={[posterStyle, styles.posterPlaceholder]}>
              <Text style={styles.placeholderText}>🎬</Text>
            </View>
          )}
          
          {/* Градиентный оверлей */}
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.75)']}
            style={styles.gradientOverlay}
          />

          {/* Кнопка избранного */}
          <TouchableOpacity
            style={[styles.favoriteButton, { backgroundColor: 'rgba(0,0,0,0.55)' }]}
            onPress={handleFavoritePress}
          >
            <Text style={styles.favoriteIcon}>{isFav ? '❤️' : '🤍'}</Text>
          </TouchableOpacity>

          {/* Бейдж рейтинга */}
          <View style={[styles.ratingBadge, { backgroundColor: getRatingColor() }]}>
            <Text style={styles.ratingText}>⭐ {rating}</Text>
          </View>

          {/* Бейдж "Новинка" */}
          {releaseDate && new Date(releaseDate) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) && (
            <View style={styles.newBadge}>
              <Text style={styles.newBadgeText}>NEW</Text>
            </View>
          )}
        </View>

        {/* Информация о фильме */}
        <View style={styles.infoContainer}>
          <Text style={[styles.title, { color: colors.text }]} numberOfLines={2}>
            {title}
          </Text>

          {/* Рейтинг-бар */}
          <View style={[styles.ratingBar, { backgroundColor: colors.divider }]}>
            <View style={[styles.ratingFill, { width: `${ratingPercent}%`, backgroundColor: getRatingColor() }]} />
          </View>

          {/* Жанры */}
          {showGenres && genreNames.length > 0 && (
            <View style={styles.genresContainer}>
              {genreNames.map((name, index) => (
                <View key={`${name}-${index}`} style={[styles.genreTag, { backgroundColor: colors.surfaceVariant }]}>
                  <Text
                    style={[styles.genreText, { color: colors.textSecondary }]}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {name}
                  </Text>
                </View>
              ))}
            </View>
          )}

          {/* Мета информация */}
          <View style={styles.metaContainer}>
            <Text style={[styles.year, { color: colors.textSecondary }]}>{year}</Text>
            {movie.vote_count > 0 && (
              <Text style={[styles.voteCount, { color: colors.textTertiary }]}>
                ({movie.vote_count} оценок)
              </Text>
            )}
          </View>
          <View style={styles.metaChips}>
            <View style={[styles.metaChip, { backgroundColor: colors.surfaceVariant }]}>
              <Text style={[styles.metaChipText, { color: colors.textSecondary }]}>{typeLabel}</Text>
            </View>
            {movie.adult && (
              <View style={[styles.metaChip, { backgroundColor: colors.accent }]}>
                <Text style={[styles.metaChipText, { color: '#fff' }]}>18+</Text>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
      </Swipeable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '48%',
    marginBottom: 15,
  },
  containerCarousel: {
    width: 160,
    marginBottom: 10,
  },
  card: {
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  posterContainer: {
    position: 'relative',
    width: '100%',
    height: 280,
  },
  poster: {
    width: '100%',
    height: '100%',
  },
  posterCarousel: {
    width: '100%',
    height: 220,
  },
  posterPlaceholder: {
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 48,
  },
  gradientOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '40%',
  },
  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteIcon: {
    fontSize: 20,
  },
  ratingBadge: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ratingText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  newBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#4caf50',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  newBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  infoContainer: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
    minHeight: 40,
  },
  ratingBar: {
    height: 4,
    borderRadius: 999,
    overflow: 'hidden',
    marginBottom: 8,
  },
  ratingFill: {
    height: '100%',
    borderRadius: 999,
  },
  genresContainer: {
    flexDirection: 'row',
    marginBottom: 8,
    flexWrap: 'wrap',
    gap: 6,
  },
  genreTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
  },
  genreText: {
    fontSize: 10,
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 6,
  },
  year: {
    fontSize: 12,
  },
  voteCount: {
    fontSize: 10,
  },
  metaChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 8,
  },
  metaChip: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
  },
  metaChipText: {
    fontSize: 11,
    fontWeight: '600',
  },
  swipeAction: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: '100%',
    borderRadius: 16,
  },
  swipeActionText: {
    fontSize: 24,
  },
});

