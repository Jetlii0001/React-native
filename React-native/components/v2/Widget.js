import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useThemeStore } from '../../store/themeStore';
import { darkTheme, lightTheme } from '../../theme/colors';
import MovieCardV2 from './MovieCardV2';

/**
 * Виджет для главного экрана
 * Пункт 96: Виджеты
 * 
 * Можно использовать для:
 * - Главного экрана телефона (требует нативной интеграции)
 * - Виджета внутри приложения
 * - Быстрого доступа к популярным фильмам
 */
export default function PopularMoviesWidget({ movies = [], onMoviePress, onSeeAllPress }) {
  const { theme } = useThemeStore();
  const colors = theme === 'dark' ? darkTheme : lightTheme;

  const topMovies = movies.slice(0, 4); // Топ 4 фильма

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>🔥 Популярные сейчас</Text>
        {onSeeAllPress && (
          <TouchableOpacity onPress={onSeeAllPress}>
            <Text style={[styles.seeAll, { color: colors.primary }]}>Все →</Text>
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={topMovies}
        renderItem={({ item }) => (
          <View style={styles.movieItem}>
            <MovieCardV2
              movie={item}
              layout="carousel"
              onPress={() => onMoviePress?.(item)}
            />
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  seeAll: {
    fontSize: 14,
    fontWeight: '600',
  },
  listContent: {
    gap: 10,
  },
  movieItem: {
    width: 150,
    marginRight: 10,
  },
});

