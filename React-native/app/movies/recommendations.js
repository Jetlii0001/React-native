import { View, Text, StyleSheet, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useRecommendationsStore } from '../../store/recommendationsStore';
import { useThemeStore } from '../../store/themeStore';
import { darkTheme, lightTheme } from '../../theme/colors';
import MovieCardV2 from '../../components/v2/MovieCardV2';
import { MovieListSkeleton } from '../../components/v2/SkeletonLoader';

export default function RecommendationsScreen() {
  const router = useRouter();
  const { theme } = useThemeStore();
  const colors = theme === 'dark' ? darkTheme : lightTheme;

  const { recommendations, isLoading, fetchRecommendations } = useRecommendationsStore();

  useEffect(() => {
    fetchRecommendations();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />

      <Text style={[styles.title, { color: colors.text }]}>🤖 AI рекомендации</Text>

      {isLoading ? (
        <MovieListSkeleton count={6} />
      ) : (
        <FlatList
          data={recommendations}
          renderItem={({ item }) => (
            <MovieCardV2
              movie={item}
              onPress={() => router.push(`/movies/${item.id}?type=${item.media_type || 'movie'}`)}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.listContent}
          columnWrapperStyle={styles.row}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  listContent: {
    padding: 10,
  },
  row: {
    justifyContent: 'space-between',
  },
});

