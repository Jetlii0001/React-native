import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { useUserStore } from '../store/userStore';

export default function ApiExampleScreen() {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { fetchUsers, users, isLoading } = useUserStore();

  // Пример 1: Простой fetch запрос при загрузке компонента
  useEffect(() => {
    loadPosts();
  }, []);

  // Функция для загрузки постов с API
  const loadPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      // Используем бесплатный тестовый API
      const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10');
      
      // Проверяем, успешен ли запрос
      if (!response.ok) {
        throw new Error('Ошибка загрузки данных');
      }
      
      const data = await response.json();
      setPosts(data);
    } catch (err) {
      setError(err.message);
      console.error('Ошибка:', err);
    } finally {
      setLoading(false);
    }
  };

  // Пример 2: Загрузка пользователей из Zustand store
  const handleLoadUsers = () => {
    fetchUsers(); // Эта функция уже есть в store
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Примеры API запросов</Text>
        <Text style={styles.subtitle}>
          Здесь показано, как делать запросы к серверу
        </Text>

        {/* Пример 1: Загрузка постов */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Пример 1: Fetch запрос</Text>
          <Text style={styles.sectionDescription}>
            Используем встроенный fetch для получения данных
          </Text>
          
          <TouchableOpacity 
            style={styles.button}
            onPress={loadPosts}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Загрузить посты</Text>
            )}
          </TouchableOpacity>

          {error && (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>Ошибка: {error}</Text>
            </View>
          )}

          {posts.length > 0 && (
            <View style={styles.resultsBox}>
              <Text style={styles.resultsTitle}>Загружено постов: {posts.length}</Text>
              {posts.slice(0, 3).map((post) => (
                <View key={post.id} style={styles.postItem}>
                  <Text style={styles.postTitle}>{post.title}</Text>
                  <Text style={styles.postBody} numberOfLines={2}>
                    {post.body}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Пример 2: Загрузка через Zustand store */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Пример 2: API через Zustand</Text>
          <Text style={styles.sectionDescription}>
            Запрос к API выполняется внутри store
          </Text>
          
          <TouchableOpacity 
            style={[styles.button, { backgroundColor: '#4caf50' }]}
            onPress={handleLoadUsers}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Загрузить пользователей</Text>
            )}
          </TouchableOpacity>

          {users.length > 0 && (
            <View style={styles.resultsBox}>
              <Text style={styles.resultsTitle}>Загружено пользователей: {users.length}</Text>
              {users.slice(0, 3).map((user) => (
                <View key={user.id} style={styles.userItem}>
                  <Text style={styles.userName}>{user.name}</Text>
                  <Text style={styles.userEmail}>{user.email}</Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Объяснение */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Как это работает?</Text>
          <Text style={styles.infoText}>
            <Text style={styles.bold}>1. Fetch API:</Text>{'\n'}
            • Встроенный способ делать HTTP запросы{'\n'}
            • Не требует дополнительных библиотек{'\n'}
            • Работает везде (браузер, React Native){'\n\n'}
            
            <Text style={styles.bold}>2. Async/Await:</Text>{'\n'}
            • async функция = функция, которая может ждать{'\n'}
            • await = ждем, пока запрос выполнится{'\n'}
            • try/catch = обрабатываем ошибки{'\n\n'}
            
            <Text style={styles.bold}>3. Состояние загрузки:</Text>{'\n'}
            • Показываем индикатор, пока грузится{'\n'}
            • Блокируем кнопку, чтобы не делать запрос дважды{'\n'}
            • Показываем ошибку, если что-то пошло не так
          </Text>
        </View>

        <TouchableOpacity 
          style={[styles.button, { backgroundColor: '#6200ee' }]}
          onPress={() => router.back()}
        >
          <Text style={styles.buttonText}>Назад</Text>
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
  section: {
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6200ee',
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#6200ee',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorBox: {
    backgroundColor: '#ffebee',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#f44336',
  },
  errorText: {
    color: '#c62828',
    fontSize: 14,
  },
  resultsBox: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 15,
    marginTop: 10,
  },
  resultsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  postItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  postBody: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  userItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
  },
  infoCard: {
    backgroundColor: '#e3f2fd',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1976d2',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#424242',
    lineHeight: 22,
  },
  bold: {
    fontWeight: 'bold',
    color: '#1976d2',
  },
});

