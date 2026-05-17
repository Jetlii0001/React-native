# 🎨 Руководство по использованию нового редизайна

## ✅ Что реализовано

### 1. Система тем (Пункты 1-10)
- ✅ Темная и светлая тема
- ✅ Градиентные цвета
- ✅ Цветовая палитра для всех компонентов

**Использование:**
```javascript
import { useThemeStore } from '../store/themeStore';
import { darkTheme, lightTheme } from '../theme/colors';

const { theme } = useThemeStore();
const colors = theme === 'dark' ? darkTheme : lightTheme;
```

### 2. Новые компоненты (Пункты 11-24)
- ✅ `MovieCardV2` - новая карточка с градиентами и анимациями
- ✅ `HeroBanner` - Hero секция с популярным фильмом
- ✅ `SkeletonLoader` - скелетон загрузки
- ✅ `SearchBar` - улучшенная строка поиска
- ✅ `FilterChips` - чипы для фильтров

### 3. Избранное и списки (Пункты 31-33)
- ✅ Store для избранного (`favoritesStore.js`)
- ✅ Локальное хранение через AsyncStorage
- ✅ Функции: избранное, смотреть позже, просмотрено

**Использование:**
```javascript
import { useFavoritesStore } from '../store/favoritesStore';

const { addToFavorites, isFavorite } = useFavoritesStore();
```

### 4. Уведомления (Пункты 41-48)
- ✅ Система уведомлений (`utils/notifications.js`)
- ✅ Уведомления о премьерах
- ✅ Рекомендации
- ✅ Напоминания

**Использование:**
```javascript
import { schedulePremiereNotification } from '../utils/notifications';

await schedulePremiereNotification(movie, releaseDate);
```

### 5. Оптимизация (Пункты 51-65)
- ✅ Кэширование изображений (`utils/imageCache.js`)
- ✅ Debounce для поиска (`hooks/useDebounce.js`)
- ✅ Хук для кэширования изображений (`hooks/useImageCache.js`)

**Использование:**
```javascript
import { useDebounce } from '../hooks/useDebounce';
import { useImageCache } from '../hooks/useImageCache';

const debouncedQuery = useDebounce(query, 500);
const { cachedUrl } = useImageCache(imageUrl);
```

### 6. Технические улучшения (Пункты 86-89, 91-95)
- ✅ Error Boundary (`components/v2/ErrorBoundary.js`)
- ✅ Система логирования (`utils/logger.js`)
- ✅ Аналитика (`utils/analytics.js`)
- ✅ Мониторинг производительности (`utils/performance.js`)

**Использование:**
```javascript
import ErrorBoundary from '../components/v2/ErrorBoundary';
import { logger } from '../utils/logger';
import { analytics } from '../utils/analytics';
import { performanceMonitor } from '../utils/performance';

// Error Boundary
<ErrorBoundary>
  <YourComponent />
</ErrorBoundary>

// Логирование
logger.info('User action', { action: 'search' });

// Аналитика
analytics.track('movie_view', { movie_id: 123 });

// Производительность
performanceMonitor.startMeasure('api_call');
// ... код ...
performanceMonitor.endMeasure('api_call');
```

## 📦 Установленные пакеты

```bash
npm install @react-native-async-storage/async-storage
npm install expo-linear-gradient
npm install expo-blur
npm install expo-notifications expo-device
npm install expo-file-system
```

## 🚀 Как использовать новые компоненты

### Обновление главной страницы фильмотеки

Замени `app/movies/index.js` на `app/movies/index-v2.js` или интегрируй компоненты в существующий файл.

### Обновление страницы поиска

Замени `app/movies/search.js` на `app/movies/search-v2.js` или используй новые компоненты.

### Добавление темы в приложение

В `app/_layout.js`:
```javascript
import { useThemeStore } from '../store/themeStore';
import { darkTheme, lightTheme } from '../theme/colors';

export default function RootLayout() {
  const { theme } = useThemeStore();
  const colors = theme === 'dark' ? darkTheme : lightTheme;
  
  // Используй colors для стилей
}
```

## 🎯 Следующие шаги

1. **Интегрировать новые компоненты** в существующие страницы
2. **Добавить переключатель темы** в настройки
3. **Настроить уведомления** для реальных премьер
4. **Добавить аналитику** для отслеживания использования
5. **Тестировать производительность** с новыми оптимизациями

## 📝 Примечания

- Все новые компоненты находятся в `components/v2/`
- Тема хранится в `store/themeStore.js`
- Утилиты в папке `utils/`
- Хуки в папке `hooks/`
- Старые файлы не изменены, созданы новые версии с суффиксом `-v2`

## 🔧 Настройка

Перед использованием убедись, что:
1. Все пакеты установлены
2. API ключ TMDB настроен
3. Разрешения на уведомления запрошены (для реальных устройств)

---

**Готово к использованию!** 🎉

