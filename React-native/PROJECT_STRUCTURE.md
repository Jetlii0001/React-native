# 📁 Структура проекта

## Полная структура файлов

```
React native/
│
├── app/                          # 📱 Экраны приложения (Expo Router)
│   ├── _layout.js               # Главный layout с навигацией
│   ├── index.js                 # Главный экран (/)
│   ├── profile.js               # Экран профиля (/profile)
│   ├── details.js               # Экран с концепциями (/details)
│   └── api-example.js           # Экран с примерами API (/api-example)
│
├── components/                  # 🧩 Переиспользуемые компоненты
│   └── Card.js                  # Компонент карточки
│
├── store/                       # 🗄 Zustand stores (состояние)
│   ├── counterStore.js          # Store для счетчика
│   └── userStore.js             # Store для данных пользователя
│
├── package.json                 # 📦 Зависимости проекта
├── app.json                     # ⚙️ Конфигурация Expo
├── babel.config.js              # 🔧 Настройки Babel
├── .gitignore                   # 🚫 Файлы для игнорирования Git
│
└── Документация/
    ├── README.md                # 📖 Справочник концепций
    ├── LECTURE.md               # 📚 Пошаговая лекция (НАЧНИ ОТСЮДА!)
    ├── QUICKSTART.md            # ⚡ Быстрый старт
    ├── INSTALL.md               # 🛠 Инструкция по установке
    ├── TECHNOLOGIES.md          # 🛠 Объяснение технологий
    └── PROJECT_STRUCTURE.md     # 📁 Этот файл
```

---

## 📂 Описание папок и файлов

### `/app` - Экраны приложения

**Expo Router** использует файловую систему для маршрутизации:
- Имя файла = путь в приложении
- `index.js` = главный экран (`/`)
- `profile.js` = экран профиля (`/profile`)

#### `_layout.js`
- Настраивает навигацию
- Определяет заголовки экранов
- Настраивает общие стили

#### `index.js`
- Главный экран приложения
- Пример использования Zustand (счетчик)
- Навигация на другие экраны

#### `profile.js`
- Экран профиля пользователя
- Использует Zustand store для данных
- Пример работы с формой

#### `details.js`
- Объяснение основных концепций
- Учебный материал

#### `api-example.js`
- Примеры API запросов
- Использование fetch
- Загрузка данных через Zustand

---

### `/components` - Переиспользуемые компоненты

Компоненты, которые можно использовать в разных местах.

#### `Card.js`
- Пример создания своего компонента
- Принимает props (title, children, color)
- Переиспользуемый UI элемент

**Как использовать:**
```javascript
import Card from '../components/Card';

<Card title="Заголовок" color="#6200ee">
  Содержимое карточки
</Card>
```

---

### `/store` - Zustand Stores

Хранилища состояния, доступные из любого компонента.

#### `counterStore.js`
- Простой пример store
- Счетчик с функциями increment/decrement/reset
- Демонстрация базового использования Zustand

**Как использовать:**
```javascript
import { useCounterStore } from '../store/counterStore';

const { count, increment } = useCounterStore();
```

#### `userStore.js`
- Store для данных пользователя
- Пример с API запросами внутри store
- Более сложный пример

**Как использовать:**
```javascript
import { useUserStore } from '../store/userStore';

const { name, email, setName, fetchUsers } = useUserStore();
```

---

### Конфигурационные файлы

#### `package.json`
- Список всех зависимостей
- Скрипты для запуска проекта
- Метаданные проекта

#### `app.json`
- Настройки Expo
- Название приложения
- Плагины

#### `babel.config.js`
- Настройки транспиляции кода
- Плагины Babel
- Настройки для Expo Router

#### `.gitignore`
- Файлы, которые не нужно коммитить в Git
- `node_modules/`, `.expo/` и т.д.

---

## 🔄 Как работает навигация?

```
app/
├── _layout.js          → Настраивает Stack навигацию
│
├── index.js            → Главный экран
│   └── router.push('/profile') → Переход на profile.js
│
├── profile.js          → Экран профиля
│   └── router.back() → Возврат на предыдущий экран
│
└── api-example.js      → Экран с API
    └── router.back() → Возврат на предыдущий экран
```

**Важно:** Expo Router автоматически создает маршруты на основе структуры папок!

---

## 🗄 Как работает Zustand?

```
store/
├── counterStore.js
│   └── useCounterStore() → Доступен в любом компоненте
│
└── userStore.js
    └── useUserStore() → Доступен в любом компоненте
```

**Использование:**
```javascript
// В любом компоненте:
import { useCounterStore } from '../store/counterStore';

function MyComponent() {
  const { count, increment } = useCounterStore();
  // Теперь count доступен здесь!
}
```

---

## 📝 Где что искать?

### Хочу создать новый экран
→ Создай файл в папке `app/` (например, `app/about.js`)

### Хочу создать переиспользуемый компонент
→ Создай файл в папке `components/` (например, `components/Button.js`)

### Хочу добавить глобальное состояние
→ Создай новый store в папке `store/` (например, `store/todoStore.js`)

### Хочу изменить навигацию
→ Отредактируй `app/_layout.js`

### Хочу добавить библиотеку
→ Добавь в `package.json` в `dependencies`, затем `npm install`

---

## 🎯 Рекомендуемый порядок изучения

1. **Начни с [LECTURE.md](./LECTURE.md)** - пошаговая инструкция
2. **Изучи структуру** - этот файл
3. **Читай код** - начни с `app/index.js`
4. **Экспериментируй** - меняй код и смотри, что происходит
5. **Читай [README.md](./README.md)** - для понимания концепций

---

**Помни:** Структура проекта должна быть логичной и понятной. Если что-то непонятно - спрашивай! 🚀

