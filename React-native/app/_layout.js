import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { Platform, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useThemeStore } from '../store/themeStore';
import ErrorBoundary from '../components/v2/ErrorBoundary';

export default function RootLayout() {
  const { loadTheme } = useThemeStore();
  const RootView = Platform.OS === 'web' ? View : GestureHandlerRootView;

  useEffect(() => {
    loadTheme();
  }, []);

  return (
    <RootView style={{ flex: 1 }}>
      <ErrorBoundary>
        <Stack>
      <Stack.Screen 
        name="index" 
        options={{ 
          title: 'Главная',
          headerStyle: {
            backgroundColor: '#6200ee',
          },
          headerTintColor: '#fff',
        }} 
      />
      <Stack.Screen 
        name="profile" 
        options={{ 
          title: 'Профиль',
          headerStyle: {
            backgroundColor: '#6200ee',
          },
          headerTintColor: '#fff',
        }} 
      />
      <Stack.Screen 
        name="details" 
        options={{ 
          title: 'Детали',
          headerStyle: {
            backgroundColor: '#6200ee',
          },
          headerTintColor: '#fff',
        }} 
      />
      <Stack.Screen 
        name="api-example" 
        options={{ 
          title: 'API Примеры',
          headerStyle: {
            backgroundColor: '#6200ee',
          },
          headerTintColor: '#fff',
        }} 
      />
      <Stack.Screen 
        name="movies/index" 
        options={{ 
          title: 'Фильмотека',
          headerStyle: {
            backgroundColor: '#6200ee',
          },
          headerTintColor: '#fff',
        }} 
      />
      <Stack.Screen 
        name="movies/[id]" 
        options={{ 
          title: 'Детали фильма',
          headerStyle: {
            backgroundColor: '#6200ee',
          },
          headerTintColor: '#fff',
        }} 
      />
      <Stack.Screen 
        name="movies/search" 
        options={{ 
          title: 'Поиск',
          headerStyle: {
            backgroundColor: '#6200ee',
          },
          headerTintColor: '#fff',
        }} 
      />
      <Stack.Screen 
        name="movies/favorites" 
        options={{ 
          title: 'Мои списки',
          headerStyle: {
            backgroundColor: '#6200ee',
          },
          headerTintColor: '#fff',
        }} 
      />
      <Stack.Screen 
        name="movies/recommendations" 
        options={{ 
          title: 'Рекомендации',
          headerStyle: {
            backgroundColor: '#6200ee',
          },
          headerTintColor: '#fff',
        }} 
      />
      <Stack.Screen 
        name="movies/settings" 
        options={{ 
          title: 'Настройки',
          headerStyle: {
            backgroundColor: '#6200ee',
          },
          headerTintColor: '#fff',
        }} 
      />
      <Stack.Screen 
        name="movies/trending" 
        options={{ 
          title: 'Тренды',
          headerStyle: {
            backgroundColor: '#6200ee',
          },
          headerTintColor: '#fff',
        }} 
      />
        </Stack>
      </ErrorBoundary>
    </RootView>
  );
}

