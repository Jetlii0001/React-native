import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { useThemeStore } from '../../store/themeStore';
import { darkTheme, lightTheme } from '../../theme/colors';

/**
 * Скелетон загрузки вместо ActivityIndicator
 * Пункт 5: Скелетон загрузки
 */
export default function SkeletonLoader({ width, height, borderRadius = 8, style }) {
  const { theme } = useThemeStore();
  const colors = theme === 'dark' ? darkTheme : lightTheme;
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  return (
    <Animated.View
      style={[
        styles.skeleton,
        {
          width,
          height,
          borderRadius,
          backgroundColor: colors.surfaceVariant,
          opacity,
        },
        style,
      ]}
    />
  );
}

/**
 * Скелетон карточки фильма
 */
export function MovieCardSkeleton() {
  return (
    <View style={styles.cardContainer}>
      <SkeletonLoader width="100%" height={280} borderRadius={16} />
      <View style={styles.infoContainer}>
        <SkeletonLoader width="80%" height={20} borderRadius={4} style={styles.titleSkeleton} />
        <SkeletonLoader width="60%" height={16} borderRadius={4} style={styles.metaSkeleton} />
      </View>
    </View>
  );
}

/**
 * Скелетон списка карточек
 */
export function MovieListSkeleton({ count = 6 }) {
  return (
    <View style={styles.listContainer}>
      {Array.from({ length: count }).map((_, index) => (
        <MovieCardSkeleton key={index} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  skeleton: {
    overflow: 'hidden',
  },
  cardContainer: {
    width: '48%',
    marginBottom: 15,
  },
  infoContainer: {
    padding: 12,
  },
  titleSkeleton: {
    marginBottom: 8,
  },
  metaSkeleton: {
    marginTop: 4,
  },
  listContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },
});

