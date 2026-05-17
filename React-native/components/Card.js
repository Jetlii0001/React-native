import { View, Text, StyleSheet } from 'react-native';

/**
 * Переиспользуемый компонент Card
 * 
 * @param {string} title - Заголовок карточки
 * @param {string} children - Содержимое карточки (текст)
 * @param {string} color - Цвет заголовка (опционально)
 */
export default function Card({ title, children, color = '#6200ee' }) {
  return (
    <View style={styles.card}>
      <Text style={[styles.title, { color }]}>
        {title}
      </Text>
      <Text style={styles.content}>
        {children}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
});

