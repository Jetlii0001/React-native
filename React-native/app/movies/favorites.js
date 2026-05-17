import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useFavoritesStore } from '../../store/favoritesStore';
import { useThemeStore } from '../../store/themeStore';
import { darkTheme, lightTheme } from '../../theme/colors';
import MovieCardV2 from '../../components/v2/MovieCardV2';

export default function FavoritesScreen() {
  const router = useRouter();
  const { theme } = useThemeStore();
  const colors = theme === 'dark' ? darkTheme : lightTheme;

  const {
    favorites,
    watchLater,
    watched,
    loadData,
  } = useFavoritesStore();

  const [activeTab, setActiveTab] = useState('favorites');

  useEffect(() => {
    loadData();
  }, []);

  const data = activeTab === 'favorites' ? favorites : activeTab === 'watchLater' ? watchLater : watched;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />

      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>❤️ Мои списки</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={[styles.back, { color: colors.primary }]}>Назад</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tabs}>
        {['favorites', 'watchLater', 'watched'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tab,
              activeTab === tab && { backgroundColor: colors.primary },
            ]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, { color: activeTab === tab ? '#fff' : colors.textSecondary }]}>
              {tab === 'favorites' && 'Избранное'}
              {tab === 'watchLater' && 'Смотреть позже'}
              {tab === 'watched' && 'Просмотрено'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <MovieCardV2
            movie={item}
            type={item.type || 'movie'}
            onPress={() => router.push(`/movies/${item.id}?type=${item.type || 'movie'}`)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 16,
    paddingBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  back: {
    fontSize: 14,
    fontWeight: '600',
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 8,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 12,
    fontWeight: '600',
  },
  listContent: {
    padding: 10,
  },
  row: {
    justifyContent: 'space-between',
  },
  cardWrapper: {
    width: '48%',
  },
});

