import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';

export default function DetailsScreen() {
  const router = useRouter();

  const concepts = [
    {
      title: 'Компоненты',
      description: 'Компоненты - это строительные блоки React Native. Каждый экран и элемент UI - это компонент. Компоненты можно переиспользовать.',
      example: '<View>, <Text>, <TouchableOpacity> - это все компоненты',
    },
    {
      title: 'Стили (StyleSheet)',
      description: 'StyleSheet создает объекты стилей, которые применяются к компонентам. Это похоже на CSS, но для мобильных приложений.',
      example: 'const styles = StyleSheet.create({ container: { flex: 1 } })',
    },
    {
      title: 'Навигация (Expo Router)',
      description: 'Expo Router использует файловую систему для маршрутизации. Файл app/index.js = главный экран, app/profile.js = экран профиля.',
      example: 'router.push("/profile") - переход на другой экран',
    },
    {
      title: 'Состояние (State)',
      description: 'useState - это хук для хранения данных, которые могут изменяться. Когда состояние меняется, компонент автоматически перерисовывается.',
      example: 'const [count, setCount] = useState(0)',
    },
    {
      title: 'Flexbox',
      description: 'React Native использует Flexbox для расположения элементов. flex: 1 означает "занять все доступное пространство".',
      example: 'flexDirection: "row" - элементы в ряд, "column" - в столбец',
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Основные Концепции</Text>
        <Text style={styles.subtitle}>
          Здесь собраны ключевые понятия React Native
        </Text>

        {concepts.map((concept, index) => (
          <View key={index} style={styles.conceptCard}>
            <Text style={styles.conceptTitle}>{concept.title}</Text>
            <Text style={styles.conceptDescription}>{concept.description}</Text>
            <View style={styles.exampleBox}>
              <Text style={styles.exampleLabel}>Пример:</Text>
              <Text style={styles.exampleText}>{concept.example}</Text>
            </View>
          </View>
        ))}

        <View style={styles.tipCard}>
          <Text style={styles.tipTitle}>💡 Совет</Text>
          <Text style={styles.tipText}>
            Экспериментируйте! Меняйте стили, добавляйте новые компоненты, 
            создавайте свои экраны. Лучший способ учиться - практика!
          </Text>
        </View>

        <TouchableOpacity 
          style={styles.button}
          onPress={() => router.back()}
        >
          <Text style={styles.buttonText}>Назад на Главную</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  conceptCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  conceptTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#6200ee',
    marginBottom: 12,
  },
  conceptDescription: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 15,
  },
  exampleBox: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#6200ee',
  },
  exampleLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6200ee',
    marginBottom: 5,
  },
  exampleText: {
    fontSize: 14,
    color: '#333',
    fontFamily: 'monospace',
  },
  tipCard: {
    backgroundColor: '#fff3cd',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ffc107',
  },
  tipTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#856404',
    marginBottom: 10,
  },
  tipText: {
    fontSize: 16,
    color: '#856404',
    lineHeight: 24,
  },
  button: {
    backgroundColor: '#6200ee',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

