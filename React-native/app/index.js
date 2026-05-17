import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { useCounterStore } from '../store/counterStore';

export default function HomeScreen() {
  const router = useRouter();
  // Используем Zustand store - получаем count и функции для его изменения
  const { count, increment, decrement, reset } = useCounterStore();

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Добро пожаловать!</Text>
        <Text style={styles.subtitle}>Выберите раздел приложения</Text>
        
        {/* Раздел: Фильмотека */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>🎬 Фильмотека</Text>
            <Text style={styles.sectionSubtitle}>Полноценное приложение для просмотра информации о фильмах и сериалах</Text>
          </View>
          
          <View style={styles.sectionCard}>
            <Text style={styles.sectionCardTitle}>Что внутри:</Text>
            <Text style={styles.sectionCardText}>
              • Популярные фильмы и сериалы{'\n'}
              • Поиск по названию{'\n'}
              • Детальная информация (описание, рейтинг, актеры){'\n'}
              • Трейлеры{'\n'}
              • Информация о сборах
            </Text>
            
            <TouchableOpacity 
              style={[styles.button, styles.moviesButton]}
              onPress={() => router.push('/movies')}
            >
              <Text style={styles.buttonText}>Открыть Фильмотеку →</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Раздел: Заглушка (обучающие материалы) */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>📚 Обучающая заглушка</Text>
            <Text style={styles.sectionSubtitle}>Примеры и демонстрация основных концепций React Native</Text>
          </View>
          
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Что такое React Native?</Text>
            <Text style={styles.cardText}>
              React Native - это фреймворк для создания мобильных приложений, 
              используя JavaScript и React. Один код работает на iOS и Android!
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Что такое Expo?</Text>
            <Text style={styles.cardText}>
              Expo - это набор инструментов и сервисов, который упрощает разработку 
              React Native приложений. Не нужно настраивать Android Studio или Xcode!
            </Text>
          </View>

          <TouchableOpacity 
            style={styles.button}
            onPress={() => router.push('/profile')}
          >
            <Text style={styles.buttonText}>Перейти в Профиль</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, styles.buttonSecondary]}
            onPress={() => router.push('/details')}
          >
            <Text style={styles.buttonText}>Посмотреть Детали</Text>
          </TouchableOpacity>

          {/* Пример использования Zustand - счетчик */}
          <View style={styles.counterCard}>
            <Text style={styles.counterTitle}>Пример Zustand Store</Text>
            <Text style={styles.counterValue}>{count}</Text>
            <View style={styles.counterButtons}>
              <TouchableOpacity 
                style={[styles.counterButton, styles.counterButtonMinus]}
                onPress={decrement}
              >
                <Text style={styles.counterButtonText}>-</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.counterButton, styles.counterButtonReset]}
                onPress={reset}
              >
                <Text style={styles.counterButtonText}>Сброс</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.counterButton, styles.counterButtonPlus]}
                onPress={increment}
              >
                <Text style={styles.counterButtonText}>+</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.counterHint}>
              Это состояние хранится в Zustand store и доступно из любого компонента!
            </Text>
          </View>

          <TouchableOpacity 
            style={[styles.button, { backgroundColor: '#ff6b6b' }]}
            onPress={() => router.push('/api-example')}
          >
            <Text style={styles.buttonText}>Пример API запросов</Text>
          </TouchableOpacity>
        </View>
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
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6200ee',
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  button: {
    backgroundColor: '#6200ee',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonSecondary: {
    backgroundColor: '#03dac6',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  counterCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginTop: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
  },
  counterTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6200ee',
    marginBottom: 15,
  },
  counterValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  counterButtons: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 15,
  },
  counterButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    minWidth: 80,
    alignItems: 'center',
  },
  counterButtonPlus: {
    backgroundColor: '#4caf50',
  },
  counterButtonMinus: {
    backgroundColor: '#f44336',
  },
  counterButtonReset: {
    backgroundColor: '#ff9800',
  },
  counterButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  counterHint: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  sectionCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionCardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6200ee',
    marginBottom: 10,
  },
  sectionCardText: {
    fontSize: 15,
    color: '#666',
    lineHeight: 24,
    marginBottom: 15,
  },
  moviesButton: {
    backgroundColor: '#e91e63',
    marginTop: 10,
  },
});

