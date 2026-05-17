# 📚 ПОЛНАЯ ЛЕКЦИЯ: Создание React Native приложения с нуля

## 👋 Привет!

Эта лекция — полноценный учебный курс, который шаг‑за‑шагом проведет через создание **React Native** приложения и превращение его в **полноценную фильмотеку AAA‑уровня** (по информативности и функционалу близкую к Кинопоиску).

**Что нужно знать:** базовый JavaScript (переменные, функции, объекты)  
**Формат:** много практики + объяснение каждого шага  
**Цель:** уметь собирать приложение от нуля до сложного продукта  

---

## 📋 СОДЕРЖАНИЕ

1. [Что мы будем создавать?](#что-мы-будем-создавать)  
2. [Подготовка окружения и устройств](#подготовка)  
3. [Шаг 1: Создание проекта](#шаг-1)  
4. [Шаг 2: Понимание структуры](#шаг-2)  
5. [Шаг 3: Первый экран](#шаг-3)  
6. [Шаг 4: Навигация](#шаг-4)  
7. [Шаг 5: Стили и дизайн](#шаг-5)  
8. [Шаг 6: Состояние](#шаг-6)  
9. [Шаг 7: Zustand](#шаг-7)  
10. [Шаг 8: API запросы](#шаг-8)  
11. [Шаг 9: Полная фильмотека (AAA)](#шаг-9)  
12. [Итоги и куда двигаться дальше](#итоги)  

---

## 🎯 Что мы будем создавать?

Мы сделаем **две части** в одном проекте:

✅ **Учебную заглушку** — простое приложение для изучения React Native  
✅ **Фильмотеку AAA‑уровня** — с секциями, карточками, поиском, деталями, актерами, трейлерами, рекомендациями

**Результат:** приложение уровня production, которое можно запускать на телефоне.

---

## 🛠 Подготовка окружения и устройств

### ✅ Проверенные версии, использованные в проекте

> Ниже — версии, с которыми проект создавался и тестировался.  
> Если у тебя другие — это не критично, но лучше держаться этих диапазонов.

**Node.js:** `v22.21.1`  
**Expo SDK:** `^54.0.31`  
**React:** `19.1.0`  
**React Native:** `0.81.5`  
**Expo Router:** `~6.0.21`  
**Zustand:** `^4.4.7`  
**expo-linear-gradient:** `^15.0.8`  
**expo-blur:** `^15.0.8`  
**expo-notifications:** `^0.32.16`  
**expo-file-system:** `^19.0.21`  
**expo-haptics:** `^15.0.8`  
**expo-sensors:** `^15.0.8`  
**@react-native-async-storage/async-storage:** `^2.2.0`  

### Шаг 0.1: Установка Node.js

**Что это?** Node.js — среда выполнения JavaScript.

**Установка:**
1. Перейди на [nodejs.org](https://nodejs.org/)  
2. Скачай LTS версию  
3. Установи  
4. Проверь:
```bash
node --version
```

### Шаг 0.2: Установка менеджера пакетов

По умолчанию используется `npm` (идет вместе с Node.js).  
Проверка:
```bash
npm --version
```

### Шаг 0.3: Установка Expo CLI

Expo CLI нужен для запуска проекта:
```bash
npm install -g expo-cli
expo --version
```

### Шаг 0.4: Expo Go (на телефон)

Для быстрого запуска без сборки:
- **Android:** Google Play → Expo Go  
- **iOS:** App Store → Expo Go  

### Шаг 0.5: Эмуляторы (по желанию)

**Android:** Android Studio + SDK (минимум Android 11)  
**iOS:** Xcode (только macOS)  

### Шаг 0.6: Доп. требования

- **Windows:** желательно установить **Android Studio** и **JDK 17+**  
- **macOS:** Xcode + Command Line Tools  
- **Linux:** Android Studio + JDK  

---

## 🚀 Шаг 1: Создание проекта

### Шаг 1.1: Создаем папку проекта

Открой терминал и перейди в нужную папку:
```bash
cd "C:\Users\User\Desktop\React native"
```

**Что делает команда:**
- `cd` = "change directory" (сменить папку)
- Путь в кавычках - это адрес папки

### Шаг 1.2: Инициализация проекта

Создай файл `package.json`:
```json
{
  "name": "react-native-basics",
  "version": "1.0.0",
  "main": "expo-router/entry",
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web"
  },
  "dependencies": {
    "@expo/vector-icons": "^15.0.3",
    "expo": "^54.0.31",
    "expo-router": "~6.0.21",
    "expo-status-bar": "~3.0.9",
    "react": "19.1.0",
    "react-native": "0.81.5",
    "react-native-elements": "^3.4.3",
    "react-native-safe-area-context": "~5.6.0",
    "react-native-screens": "~4.16.0",
    "react-native-vector-icons": "^10.0.3",
    "zustand": "^4.4.7"
  },
  "devDependencies": {
    "@babel/core": "^7.20.0",
    "babel-preset-expo": "^54.0.9"
  },
  "private": true
}
```

**Что это за файл?**
- `package.json` - это "паспорт" проекта
- Здесь перечислены все библиотеки, которые нужны проекту
- `dependencies` - то, что нужно для работы приложения
- `scripts` - команды для запуска проекта

**Объяснение зависимостей:**
- `expo` - основной фреймворк
- `expo-router` - навигация (переходы между экранами)
- `react` и `react-native` - основа всего
- `zustand` - для управления состоянием (state management)

### Шаг 1.3: Установка зависимостей

В терминале напиши:
```bash
npm install
```

**Что происходит:**
1. npm читает `package.json`
2. Скачивает все библиотеки из интернета
3. Устанавливает их в папку `node_modules/`

**Время:** 2-5 минут (зависит от интернета)

### Шаг 1.4: Создание конфигурации Expo

Создай файл `app.json`:
```json
{
  "expo": {
    "name": "React Native Basics",
    "slug": "react-native-basics",
    "version": "1.0.0",
    "orientation": "portrait",
    "scheme": "react-native-basics",
    "plugins": [
      "expo-router"
    ]
  }
}
```

**Что это?**
- Настройки для Expo
- `name` - название приложения
- `plugins` - плагины (expo-router для навигации)

### Шаг 1.5: Настройка Babel

Создай файл `babel.config.js`:
```javascript
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
  };
};
```

**Примечание:** В новых версиях Expo Router плагин `expo-router/babel` не требуется — он подключается автоматически.

**Что это?**
- Babel - это "переводчик" кода
- Превращает современный JavaScript в код, который понимают старые устройства
- `expo-router/babel` - плагин для работы с навигацией

---

## 📁 Шаг 2: Понимание структуры проекта

### Структура папок

После установки у тебя должна быть такая структура:

```
React native/
├── app/              # ← Здесь будут экраны приложения
├── node_modules/     # ← Библиотеки (не трогай!)
├── package.json      # ← Зависимости проекта
├── app.json          # ← Настройки Expo
└── babel.config.js   # ← Настройки Babel
```

### Почему папка называется `app/`?

**Expo Router** использует **файловую систему для маршрутизации**:
- Файл `app/index.js` = главный экран (путь `/`)
- Файл `app/profile.js` = экран профиля (путь `/profile`)
- Файл `app/about.js` = экран "О нас" (путь `/about`)

**Аналогия:** Как папки на компьютере - каждая папка = отдельный экран!

---

## 🎨 Шаг 3: Создание первого экрана

### Шаг 3.1: Создаем главный layout

Создай файл `app/_layout.js`:

```javascript
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
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
    </Stack>
  );
}
```

**Разбор кода построчно:**

```javascript
import { Stack } from 'expo-router';
```
- `import` - берем что-то из библиотеки
- `Stack` - компонент для навигации (стек экранов)
- `from 'expo-router'` - из какой библиотеки берем

```javascript
export default function RootLayout() {
```
- `export default` - отдаем функцию другим файлам
- `function RootLayout()` - создаем функцию с именем RootLayout
- `()` - функция не принимает параметры

```javascript
return (
  <Stack>
```
- `return` - возвращаем что-то из функции
- `<Stack>` - JSX компонент (выглядит как HTML, но это JavaScript)

```javascript
<Stack.Screen 
  name="index" 
  options={{ title: 'Главная' }} 
/>
```
- `Stack.Screen` - настройка одного экрана
- `name="index"` - имя файла экрана (без расширения)
- `options` - настройки (цвет заголовка, название и т.д.)

**Что делает этот файл?**
Настраивает навигацию приложения. Это как "каркас" - все экраны будут внутри этого Stack.

### Шаг 3.2: Создаем главный экран

Создай файл `app/index.js`:

```javascript
import { View, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.title}>Привет, мир!</Text>
      <Text style={styles.subtitle}>Мое первое приложение</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
  },
});
```

**Разбор кода:**

```javascript
import { View, Text, StyleSheet } from 'react-native';
```
- Импортируем компоненты из React Native:
  - `View` - контейнер (как `<div>` в HTML)
  - `Text` - текст (как `<p>` в HTML)
  - `StyleSheet` - для создания стилей

```javascript
import { StatusBar } from 'expo-status-bar';
```
- `StatusBar` - строка состояния (батарея, время и т.д.)

```javascript
export default function HomeScreen() {
```
- Создаем компонент (функцию, которая возвращает UI)

```javascript
return (
  <View style={styles.container}>
```
- Возвращаем JSX
- `style={styles.container}` - применяем стиль из объекта styles

```javascript
const styles = StyleSheet.create({
```
- Создаем объект со стилями
- `StyleSheet.create()` - оптимизирует стили для производительности

```javascript
container: {
  flex: 1,
  backgroundColor: '#f5f5f5',
  justifyContent: 'center',
  alignItems: 'center',
},
```
- `flex: 1` - занимает все доступное пространство
- `backgroundColor` - цвет фона
- `justifyContent: 'center'` - выравнивание по вертикали (центр)
- `alignItems: 'center'` - выравнивание по горизонтали (центр)

### Шаг 3.3: Запуск приложения

В терминале напиши:
```bash
npm start
```

**Что происходит:**
1. Запускается сервер разработки
2. Появляется QR-код
3. Открывается Expo DevTools в браузере

**Как запустить на телефоне:**
1. Открой Expo Go на телефоне
2. Отсканируй QR-код
3. Приложение запустится!

**🎉 Поздравляю! Ты создал свое первое приложение!**

---

## 🧭 Шаг 4: Навигация между экранами

### Шаг 4.1: Создаем второй экран

Создай файл `app/profile.js`:

```javascript
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.title}>Профиль</Text>
      <Text style={styles.text}>Это экран профиля</Text>
      
      <TouchableOpacity 
        style={styles.button}
        onPress={() => router.back()}
      >
        <Text style={styles.buttonText}>Назад</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    color: '#666',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#6200ee',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
```

**Новые концепции:**

```javascript
import { useRouter } from 'expo-router';
```
- Хук для навигации

```javascript
const router = useRouter();
```
- Получаем объект router для перехода между экранами

```javascript
<TouchableOpacity 
  style={styles.button}
  onPress={() => router.back()}
>
```
- `TouchableOpacity` - кнопка (реагирует на нажатие)
- `onPress` - что происходит при нажатии
- `router.back()` - вернуться на предыдущий экран

### Шаг 4.2: Добавляем навигацию на главный экран

Обнови `app/index.js`:

```javascript
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.title}>Привет, мир!</Text>
      
      <TouchableOpacity 
        style={styles.button}
        onPress={() => router.push('/profile')}
      >
        <Text style={styles.buttonText}>Перейти в Профиль</Text>
      </TouchableOpacity>
    </View>
  );
}

// ... стили остаются те же
```

**Что изменилось:**

```javascript
onPress={() => router.push('/profile')}
```
- `router.push('/profile')` - перейти на экран `/profile`
- Путь `/profile` соответствует файлу `app/profile.js`

### Шаг 4.3: Обновляем layout

Обнови `app/_layout.js`, добавив новый экран:

```javascript
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ title: 'Главная' }} 
      />
      <Stack.Screen 
        name="profile" 
        options={{ title: 'Профиль' }} 
      />
    </Stack>
  );
}
```

**Теперь у тебя есть навигация!** 🎉

---

## 💅 Шаг 5: Стили и дизайн

### Что такое StyleSheet?

**StyleSheet** - это способ создания стилей в React Native. Похоже на CSS, но есть отличия.

### Основы Flexbox

React Native использует **Flexbox** по умолчанию для расположения элементов.

**Основные свойства:**

```javascript
{
  flex: 1,                    // Занимает все доступное пространство
  flexDirection: 'column',    // 'row' - в ряд, 'column' - в столбец (по умолчанию)
  justifyContent: 'center',   // Выравнивание по главной оси
  alignItems: 'center',       // Выравнивание по поперечной оси
}
```

**Визуализация:**

```
flexDirection: 'column' (по умолчанию)
┌─────────────┐
│   Элемент 1 │ ← сверху вниз
│   Элемент 2 │
│   Элемент 3 │
└─────────────┘

flexDirection: 'row'
┌─────────────────┐
│ Эл1 │ Эл2 │ Эл3 │ ← слева направо
└─────────────────┘
```

### Цвета

```javascript
{
  backgroundColor: '#6200ee',  // Фон (HEX формат)
  color: '#fff',               // Цвет текста
  borderColor: '#ddd',          // Цвет границы
}
```

**HEX формат:** `#RRGGBB`
- `#000000` - черный
- `#ffffff` - белый
- `#ff0000` - красный
- `#6200ee` - фиолетовый

### Размеры

```javascript
{
  width: 100,        // Ширина в пикселях
  height: 50,         // Высота в пикселях
  padding: 20,        // Внутренние отступы (со всех сторон)
  margin: 10,         // Внешние отступы
  borderRadius: 8,    // Скругление углов
}
```

### Тени

```javascript
{
  // Для iOS
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  
  // Для Android
  elevation: 3,
}
```

**Почему два способа?** iOS и Android по-разному рисуют тени, поэтому нужны оба.

---

## 🔄 Шаг 6: Состояние (State)

### Что такое состояние?

**Состояние** - это данные, которые могут изменяться и влияют на отображение.

**Аналогия:** Представь переменную, которая при изменении автоматически обновляет экран.

### useState - хук для состояния

```javascript
import { useState } from 'react';

function MyComponent() {
  const [count, setCount] = useState(0);
  
  return (
    <View>
      <Text>{count}</Text>
      <TouchableOpacity onPress={() => setCount(count + 1)}>
        <Text>Увеличить</Text>
      </TouchableOpacity>
    </View>
  );
}
```

**Разбор:**

```javascript
const [count, setCount] = useState(0);
```
- `useState(0)` - создаем состояние со значением 0
- `count` - текущее значение
- `setCount` - функция для изменения
- `[count, setCount]` - деструктуризация массива

```javascript
<Text>{count}</Text>
```
- Отображаем значение состояния
- `{count}` - JavaScript выражение в JSX

```javascript
onPress={() => setCount(count + 1)}
```
- При нажатии увеличиваем count на 1
- Компонент автоматически перерисовывается!

### Пример: Счетчик

Создай компонент со счетчиком:

```javascript
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.count}>{count}</Text>
      <View style={styles.buttons}>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => setCount(count - 1)}
        >
          <Text>-</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => setCount(0)}
        >
          <Text>Сброс</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => setCount(count + 1)}
        >
          <Text>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
```

---

## 🗄 Шаг 7: Zustand - управление состоянием

### Зачем нужен Zustand?

**Проблема с useState:**
- Состояние доступно только в одном компоненте
- Чтобы передать данные в другой компонент, нужно прокидывать через props
- Это становится сложно, когда компонентов много

**Решение - Zustand:**
- Создаешь store (хранилище) один раз
- Используешь данные из любого компонента
- Не нужно прокидывать props через все компоненты!

### Почему НЕ Redux?

**Redux - это сложно:**
- Нужно создавать 4 файла для одного состояния
- Много boilerplate кода (повторяющегося кода)
- Сложно понять новичкам

**Zustand - это просто:**
- Один файл = один store
- Минимум кода
- Легко понять

### Создание store

Создай файл `store/counterStore.js`:

```javascript
import { create } from 'zustand';

export const useCounterStore = create((set) => ({
  // Состояние
  count: 0,

  // Действия (функции для изменения)
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}));
```

**Разбор кода:**

```javascript
import { create } from 'zustand';
```
- Импортируем функцию `create` из библиотеки zustand

```javascript
export const useCounterStore = create((set) => ({
```
- `create` - создаем store
- `set` - функция для обновления состояния
- `({ ... })` - возвращаем объект с состоянием и действиями

```javascript
count: 0,
```
- Начальное значение состояния

```javascript
increment: () => set((state) => ({ count: state.count + 1 })),
```
- `increment` - функция для увеличения
- `set((state) => ...)` - обновляем состояние
- `state.count + 1` - берем текущее значение и увеличиваем на 1

### Использование store в компоненте

```javascript
import { useCounterStore } from '../store/counterStore';

function MyComponent() {
  const { count, increment, decrement } = useCounterStore();

  return (
    <View>
      <Text>{count}</Text>
      <TouchableOpacity onPress={increment}>
        <Text>+</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={decrement}>
        <Text>-</Text>
      </TouchableOpacity>
    </View>
  );
}
```

**Что происходит:**
1. Импортируем store
2. Используем хук `useCounterStore()`
3. Получаем состояние и функции
4. Используем их в компоненте

**Преимущество:** Теперь `count` доступен в ЛЮБОМ компоненте, который использует этот store!

### Пример: Store для пользователя

Создай `store/userStore.js`:

```javascript
import { create } from 'zustand';

export const useUserStore = create((set) => ({
  name: 'Иван',
  email: 'ivan@example.com',
  
  setName: (newName) => set({ name: newName }),
  setEmail: (newEmail) => set({ email: newEmail }),
  
  updateUser: (userData) => set((state) => ({
    ...state,
    ...userData
  })),
}));
```

**Использование:**

```javascript
const { name, email, setName } = useUserStore();

<TextInput
  value={name}
  onChangeText={setName}
/>
```

---

## 🌐 Шаг 8: API запросы

### Что такое API?

**API** (Application Programming Interface) - это способ общения с сервером.

**Аналогия:** Как меню в ресторане - ты заказываешь блюдо (отправляешь запрос), официант приносит его (сервер возвращает данные).

### Fetch - встроенный способ делать запросы

**Fetch** - это встроенная функция JavaScript для HTTP запросов.

### Базовый пример

```javascript
async function loadData() {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Ошибка:', error);
  }
}
```

**Разбор:**

```javascript
async function loadData() {
```
- `async` - функция, которая может ждать (async = асинхронная)

```javascript
const response = await fetch('https://api.example.com/data');
```
- `fetch()` - отправляем запрос на сервер
- `await` - ждем, пока запрос выполнится
- `response` - ответ от сервера

```javascript
const data = await response.json();
```
- `response.json()` - преобразуем ответ в JavaScript объект
- `await` - ждем преобразования

```javascript
try {
  // код
} catch (error) {
  // обработка ошибок
}
```
- `try` - пытаемся выполнить код
- `catch` - если произошла ошибка, обрабатываем ее

### Пример с состоянием

```javascript
import { useState } from 'react';

function ApiExample() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const posts = await response.json();
      setData(posts);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={loadData}>
        <Text>Загрузить данные</Text>
      </TouchableOpacity>
      
      {loading && <Text>Загрузка...</Text>}
      {error && <Text>Ошибка: {error}</Text>}
      {data.map(item => (
        <Text key={item.id}>{item.title}</Text>
      ))}
    </View>
  );
}
```

**Что происходит:**
1. При нажатии кнопки вызывается `loadData()`
2. Устанавливаем `loading = true` (показываем индикатор)
3. Делаем запрос к API
4. Если успешно - сохраняем данные в state
5. Если ошибка - сохраняем ошибку
6. В любом случае устанавливаем `loading = false`

### API запросы в Zustand store

```javascript
import { create } from 'zustand';

export const useApiStore = create((set) => ({
  users: [],
  isLoading: false,
  error: null,

  fetchUsers: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const users = await response.json();
      set({ users, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },
}));
```

**Использование:**

```javascript
const { users, isLoading, fetchUsers } = useApiStore();

useEffect(() => {
  fetchUsers();
}, []);

{isLoading ? (
  <Text>Загрузка...</Text>
) : (
  users.map(user => <Text key={user.id}>{user.name}</Text>)
)}
```

---

## 🎬 Шаг 9: Создание полноценной фильмотеки

### Что мы создали?

После создания базового приложения-заглушки, мы разработали **полноценную фильмотеку**, которая может заменить по информативности Кинопоиск!

### Что делает фильмотека:

✅ **Показывает популярные фильмы и сериалы** - загружает актуальные данные с TMDB API  
✅ **Поиск** - можно найти любой фильм или сериал по названию  
✅ **Детальная информация** - описание, рейтинг, дата выхода, жанры  
✅ **Актеры** - список актеров с фотографиями  
✅ **Трейлеры** - просмотр трейлеров на YouTube  
✅ **Информация о сборах** - кассовые сборы фильмов  

### Структура фильмотеки:

```
app/movies/
├── index.js      # Главная страница (список фильмов/сериалов)
├── [id].js       # Страница деталей (динамический роут)
└── search.js     # Страница поиска

store/
└── moviesStore.js  # Store для управления данными фильмотеки
```

### 9.1: Создание store для фильмотеки

**Файл:** `store/moviesStore.js`

**Что делает:**
- Хранит состояние фильмотеки (списки фильмов, выбранный фильм, результаты поиска)
- Содержит функции для загрузки данных с TMDB API
- Управляет индикаторами загрузки и ошибками

**Основные функции:**

```javascript
// Загрузка популярных фильмов
fetchPopularMovies: async () => {
  const response = await fetch(
    `${TMDB_BASE_URL}/movie/popular?api_key=${API_KEY}&language=ru-RU`
  );
  const data = await response.json();
  set({ movies: data.results });
}

// Загрузка деталей фильма
fetchMovieDetails: async (movieId, type) => {
  const response = await fetch(
    `${TMDB_BASE_URL}/${type}/${movieId}?api_key=${API_KEY}&append_to_response=credits,videos`
  );
  const details = await response.json();
  set({ selectedMovie: details });
}

// Поиск
searchMovies: async (query) => {
  const response = await fetch(
    `${TMDB_BASE_URL}/search/multi?api_key=${API_KEY}&query=${query}`
  );
  const data = await response.json();
  set({ searchResults: data.results });
}
```

**Почему это важно:**
- Все данные о фильмах хранятся в одном месте
- Легко получить доступ из любого компонента
- Не нужно прокидывать props через все компоненты

### 9.2: Главная страница фильмотеки

**Файл:** `app/movies/index.js`

**Что делает:**
1. При загрузке компонента вызывает `fetchPopularMovies()` и `fetchPopularTVShows()`
2. Отображает фильмы и сериалы в виде карточек с постерами
3. Позволяет переключаться между вкладками "Фильмы" и "Сериалы"
4. При нажатии на карточку переходит на страницу деталей

**Ключевые концепции:**

```javascript
// Использование useEffect для загрузки данных при монтировании
useEffect(() => {
  fetchPopularMovies();
  fetchPopularTVShows();
}, []); // Пустой массив = выполнится только один раз

// FlatList для эффективного отображения списка
<FlatList
  data={movies}
  renderItem={renderMovieCard}
  numColumns={2}  // Две колонки
  keyExtractor={(item) => item.id.toString()}
/>
```

**Почему FlatList, а не map?**
- FlatList оптимизирован для больших списков
- Автоматически подгружает элементы при прокрутке (lazy loading)
- Лучше работает с производительностью

### 9.3: Страница деталей фильма

**Файл:** `app/movies/[id].js`

**Что это?** Динамический роут - `[id]` означает, что ID фильма берется из URL.

**Пример URL:** `/movies/550?type=movie`

**Что делает:**
1. Получает ID из URL через `useLocalSearchParams()`
2. Загружает детальную информацию о фильме
3. Отображает постер, описание, рейтинг, актеров
4. Позволяет открыть трейлер на YouTube

**Ключевые концепции:**

```javascript
// Получение параметров из URL
const { id, type = 'movie' } = useLocalSearchParams();

// Загрузка данных при изменении ID
useEffect(() => {
  if (id) {
    fetchMovieDetails(parseInt(id), type);
  }
}, [id, type]); // Выполнится при изменении id или type

// Открытие внешней ссылки
const openTrailer = () => {
  Linking.openURL(`https://www.youtube.com/watch?v=${trailer.key}`);
};
```

**Почему динамический роут?**
- Один компонент для всех фильмов
- Не нужно создавать отдельную страницу для каждого фильма
- URL понятный и SEO-friendly

### 9.4: Страница поиска

**Файл:** `app/movies/search.js`

**Что делает:**
1. Показывает поле ввода для поиска
2. Выполняет поиск с задержкой (debounce) - не делает запрос при каждом нажатии клавиши
3. Отображает результаты в реальном времени
4. Позволяет перейти к деталям найденного фильма

**Ключевые концепции:**

```javascript
// Debounce - задержка перед поиском
useEffect(() => {
  const timer = setTimeout(() => {
    if (query.trim()) {
      searchMovies(query);
    }
  }, 500); // Ждем 500мс после последнего ввода

  return () => clearTimeout(timer); // Очищаем таймер при размонтировании
}, [query]);
```

**Почему debounce?**
- Не перегружаем API лишними запросами
- Пользователь может печатать быстро, но запрос делается только после паузы
- Экономия трафика и улучшение производительности

### 9.5: Обновление главной страницы

**Файл:** `app/index.js`

**Что изменилось:**
- Добавлено разделение на две секции:
  1. **Фильмотека** - переход к полноценному приложению
  2. **Обучающая заглушка** - существующие примеры и демонстрации

**Почему так?**
- Пользователь может легко переключаться между режимами
- Существующий код не изменен, только добавлены новые секции
- Удобная навигация

### 9.6: Интеграция в навигацию

**Файл:** `app/_layout.js`

**Что добавлено:**
```javascript
<Stack.Screen name="movies/index" options={{ title: 'Фильмотека' }} />
<Stack.Screen name="movies/[id]" options={{ title: 'Детали фильма' }} />
<Stack.Screen name="movies/search" options={{ title: 'Поиск' }} />
```

**Почему важно:**
- Expo Router автоматически создает маршруты на основе структуры папок
- `movies/index.js` = `/movies`
- `movies/[id].js` = `/movies/123` (динамический)
- `movies/search.js` = `/movies/search`

### 9.7: Использование TMDB API

**Что такое TMDB?**
The Movie Database - бесплатная база данных о фильмах и сериалах.

**Как получить API ключ:**
1. Зарегистрируйся на [themoviedb.org](https://www.themoviedb.org/)
2. Перейди в настройки аккаунта → API
3. Запроси API ключ (бесплатно)
4. Замени `YOUR_API_KEY` в `store/moviesStore.js` на свой ключ

**Основные endpoints:**
- `/movie/popular` - популярные фильмы
- `/tv/popular` - популярные сериалы
- `/movie/{id}` - детали фильма
- `/search/multi` - поиск фильмов и сериалов

**Пример запроса:**
```javascript
const response = await fetch(
  `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=ru-RU`
);
const data = await response.json();
```

### 9.8: Что мы изучили

✅ **Динамические роуты** - `[id].js` для создания страниц с параметрами  
✅ **FlatList** - эффективное отображение списков  
✅ **useEffect с зависимостями** - загрузка данных при изменении параметров  
✅ **Debounce** - оптимизация поиска  
✅ **Linking API** - открытие внешних ссылок (YouTube)  
✅ **Работа с изображениями** - загрузка и отображение постеров  
✅ **Обработка ошибок** - показ сообщений об ошибках пользователю  
✅ **Индикаторы загрузки** - ActivityIndicator для UX  

### 9.9: Примеры кода

**Загрузка данных при монтировании:**
```javascript
useEffect(() => {
  fetchPopularMovies();
}, []); // Пустой массив = один раз при загрузке
```

**Загрузка при изменении параметра:**
```javascript
useEffect(() => {
  if (id) {
    fetchMovieDetails(id, type);
  }
}, [id, type]); // Выполнится при изменении id или type
```

**Очистка при размонтировании:**
```javascript
useEffect(() => {
  fetchData();
  
  return () => {
    clearData(); // Выполнится при размонтировании компонента
  };
}, []);
```

**Debounce для поиска:**
```javascript
useEffect(() => {
  const timer = setTimeout(() => {
    if (query.trim()) {
      searchMovies(query);
    }
  }, 500);

  return () => clearTimeout(timer); // Очищаем таймер
}, [query]);
```

### 9.10: Важные замечания

⚠️ **API ключ:** Не забудь заменить `YOUR_API_KEY` на свой ключ от TMDB!

⚠️ **Обработка ошибок:** Всегда обрабатывай ошибки при работе с API:
```javascript
try {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Ошибка загрузки');
  }
  const data = await response.json();
} catch (error) {
  set({ error: error.message });
}
```

⚠️ **Проверка данных:** Всегда проверяй наличие данных перед использованием:
```javascript
{selectedMovie?.overview && (
  <Text>{selectedMovie.overview}</Text>
)}
```

### 9.11: Что можно улучшить

💡 **Кэширование** - сохранять загруженные фильмы локально  
💡 **Избранное** - возможность сохранять любимые фильмы  
💡 **Фильтры** - фильтрация по жанрам, годам, рейтингу  
💡 **Пагинация** - подгрузка следующих страниц при прокрутке  
💡 **Офлайн режим** - работа без интернета с кэшированными данными  

---

---

## 🎬 Шаг 9: Полная фильмотека (AAA)

В этой части мы превращаем заглушку в полноценное приложение:

**Что реализовано:**
- Hero‑секция с трендом недели  
- Секции: тренды, топ‑рейтинг, новинки, сериалы  
- Полный экран деталей: актеры, трейлеры, отзывы, похожие  
- Поиск с фильтрами и debounce  
- Избранное / Смотреть позже / Просмотрено  
- AI‑рекомендации  
- Уведомления о премьерах  
- Haptics + Swipe actions  

### 9.1 Архитектура фильмотеки

```
app/movies/
├── index.js         # AAA главная
├── search.js        # поиск с фильтрами
├── [id].js          # детальная
├── favorites.js     # списки
├── recommendations.js
└── settings.js
```

### 9.2 Главная фильмотеки

Главная собирается из секций:
- `trending` — тренды  
- `topRated` — топ‑рейтинг  
- `nowPlaying` — сейчас в кино  
- `upcoming` — скоро  
- `popularTV` / `topRatedTV` — сериалы  
- `discover` — персональная подборка  

### 9.3 Детальная страница

Показываем **все**, что нужно:
- рейтинг  
- актеры  
- трейлеры  
- отзывы  
- похожие  
- официальные площадки (watch providers)  

---

## ✅ Итоги и что дальше?

### Что ты узнал:

✅ Как создать React Native приложение с нуля
✅ Как работает структура проекта
✅ Как создавать экраны и компоненты
✅ Как делать навигацию между экранами
✅ Как использовать стили (StyleSheet)
✅ Как работать с состоянием (useState)
✅ Как использовать Zustand для управления состоянием
✅ Как делать API запросы
✅ Как создать полноценную фильмотеку с реальными данными
✅ Как работать с динамическими роутами
✅ Как использовать FlatList для эффективного отображения списков
✅ Как реализовать поиск с debounce
✅ Как интегрировать внешние API (TMDB)

### Что дальше?

1. **Экспериментируй!**
   - Меняй стили
   - Добавляй новые экраны
   - Создавай свои компоненты

2. **Изучай новые компоненты:**
   - `FlatList` - для списков
   - `Image` - для картинок
   - `TextInput` - для ввода текста
   - `ScrollView` - для прокрутки

3. **Практикуйся:**
   - Создай приложение-заметки
   - Создай список задач (todo list)
   - Создай погодное приложение

4. **Изучай документацию:**
   - [React Native Docs](https://reactnative.dev/)
   - [Expo Docs](https://docs.expo.dev/)
   - [Zustand Docs](https://zustand-demo.pmnd.rs/)

### Полезные советы:

💡 **Не бойся ломать код** - это лучший способ учиться!
💡 **Читай ошибки** - они подсказывают, что не так
💡 **Используй Google** - если что-то не понятно, ищи в интернете
💡 **Практикуйся каждый день** - даже по 30 минут

---

## 🎉 Поздравляю!

Ты создал свое первое мобильное приложение! Это большой шаг в изучении программирования.

**Помни:** Каждый программист когда-то был новичком. Главное - не останавливаться и продолжать учиться!

**Удачи в изучении React Native!** 🚀

