import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import MovieCardV2 from './MovieCardV2';

/**
 * Горизонтальный карусельный список фильмов
 */
export default function HorizontalCarousel({ data, onPressItem, type = 'movie' }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.content}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <MovieCardV2
              movie={item}
              type={item.media_type || type}
              layout="carousel"
              onPress={() => onPressItem(item)}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 16,
  },
  content: {
    paddingRight: 16,
  },
  item: {
    width: 160,
    marginRight: 12,
  },
});

