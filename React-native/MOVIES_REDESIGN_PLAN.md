# 🎨 План полного редизайна фильмотеки

## 📐 Новая структура дизайна

### 1. Главная страница (Movies Index)

#### Hero секция
```javascript
// Большой баннер с популярным фильмом недели
<HeroBanner>
  <BackdropImage />
  <GradientOverlay />
  <MovieInfo>
    <Title />
    <Rating />
    <WatchTrailerButton />
  </MovieInfo>
</HeroBanner>
```

#### Категории с табами
```javascript
<Tabs>
  <Tab>🔥 Популярные</Tab>
  <Tab>⭐ Топ рейтинга</Tab>
  <Tab>📅 Скоро выйдут</Tab>
  <Tab>🎬 В кинотеатрах</Tab>
</Tabs>
```

#### Сетка фильмов
- 2 колонки на мобильных
- 3-4 колонки на планшетах
- Карточки с градиентными обводками
- Hover эффекты (для веб)

### 2. Карточка фильма (новая версия)

```javascript
<MovieCard>
  <PosterContainer>
    <PosterImage />
    <GradientOverlay />
    <QuickActions>
      <FavoriteButton />
      <WatchLaterButton />
    </QuickActions>
    <RatingBadge /> {/* В углу */}
  </PosterContainer>
  <MovieInfo>
    <Title />
    <Genres>
      <GenreTag /> {/* Цветные теги */}
    </Genres>
    <MetaInfo>
      <Year />
      <Duration />
    </MetaInfo>
  </MovieInfo>
</MovieCard>
```

### 3. Страница деталей (полный редизайн)

#### Структура:
```
┌─────────────────────────┐
│   Fullscreen Backdrop   │
│   (с размытием)          │
├─────────────────────────┤
│   Sticky Header         │
│   [←] Название [❤] [📤] │
├─────────────────────────┤
│   Tabs:                 │
│   О фильме | Актеры |    │
│   Трейлеры | Отзывы      │
├─────────────────────────┤
│   Content Area          │
│   (прокручиваемый)      │
└─────────────────────────┘
```

### 4. Поиск (улучшенная версия)

```javascript
<SearchScreen>
  <SearchBar>
    <SearchInput />
    <FilterButton />
    <VoiceSearchButton />
  </SearchBar>
  
  <QuickFilters>
    <FilterChip>Фильмы</FilterChip>
    <FilterChip>Сериалы</FilterChip>
    <FilterChip>2024</FilterChip>
    <FilterChip>Комедия</FilterChip>
  </QuickFilters>
  
  <SearchResults />
  <RecentSearches />
</SearchScreen>
```

## 🎨 Цветовая палитра

### Темная тема
```javascript
const darkTheme = {
  background: '#0a0a0a',
  surface: '#1a1a1a',
  surfaceVariant: '#2a2a2a',
  primary: '#6200ee',
  secondary: '#03dac6',
  accent: '#ff6b6b',
  text: '#ffffff',
  textSecondary: '#999999',
  border: '#333333',
  gradient: ['#667eea', '#764ba2'],
};
```

### Светлая тема
```javascript
const lightTheme = {
  background: '#f5f5f5',
  surface: '#ffffff',
  surfaceVariant: '#f0f0f0',
  primary: '#6200ee',
  secondary: '#03dac6',
  accent: '#ff6b6b',
  text: '#1a1a1a',
  textSecondary: '#666666',
  border: '#e0e0e0',
  gradient: ['#667eea', '#764ba2'],
};
```

## 🎭 Анимации

### 1. Появление карточек
```javascript
// Fade in + slide up
Animated.sequence([
  Animated.timing(opacity, { toValue: 1, duration: 300 }),
  Animated.spring(translateY, { toValue: 0, tension: 50 }),
]);
```

### 2. Переходы между экранами
```javascript
// Slide transition
<Transition.Slide direction="left" />
```

### 3. Hover эффекты (веб)
```javascript
// Scale + shadow
transform: scale(1.05),
boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
```

## 📦 Новые компоненты для создания

1. **HeroBanner** - большой баннер с фильмом
2. **MovieCardV2** - новая версия карточки
3. **GenreTags** - цветные теги жанров
4. **RatingBadge** - бейдж с рейтингом
5. **TabBar** - кастомная панель вкладок
6. **SearchBar** - улучшенная строка поиска
7. **FilterChips** - чипы для фильтров
8. **SkeletonLoader** - скелетон загрузки
9. **GradientButton** - кнопка с градиентом
10. **AnimatedCard** - карточка с анимацией

## 🔄 Миграция

### Этап 1: Подготовка
- Создать папку `components/v2/` для новых компонентов
- Создать `theme/` для цветовых схем
- Настроить систему тем

### Этап 2: Новые компоненты
- Создать все новые компоненты
- Протестировать изолированно

### Этап 3: Интеграция
- Постепенно заменять старые компоненты
- Тестировать на каждом этапе

### Этап 4: Финальная полировка
- Анимации
- Оптимизация
- Тестирование

---

**Готов начать? Начнем с создания новых компонентов!** 🚀

