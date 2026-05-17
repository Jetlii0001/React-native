# 📦 Инструкция по установке

## Требования

Перед началом работы убедись, что у тебя установлено:

1. **Node.js** (версия 18 или выше)
   - Скачай с [nodejs.org](https://nodejs.org/)
   - Проверь установку: `node --version`

2. **npm** (устанавливается вместе с Node.js)
   - Проверь: `npm --version`

3. **Git** (опционально, для версионного контроля)
   - Скачай с [git-scm.com](https://git-scm.com/)

## Установка проекта

### Шаг 1: Открой терминал

**Windows:**
- Нажми `Win + R`
- Введи `cmd` или `powershell`
- Нажми Enter

**Mac/Linux:**
- Открой Terminal

### Шаг 2: Перейди в папку проекта

```bash
cd "C:\Users\User\Desktop\React native"
```

### Шаг 3: Установи зависимости

```bash
npm install
```

**Что происходит:**
- npm читает `package.json`
- Скачивает все необходимые библиотеки
- Устанавливает их в папку `node_modules/`

**Время:** Обычно 2-5 минут (зависит от интернета)

### Шаг 4: Установи Expo CLI (если нужно)

```bash
npm install -g expo-cli
```

**Или используй npx (рекомендуется):**
```bash
npx expo start
```

## Запуск проекта

### Вариант 1: Через npm scripts

```bash
npm start
```

### Вариант 2: Через npx

```bash
npx expo start
```

### Что ты увидишь:

```
› Metro waiting on exp://192.168.1.1:8081
› Scan the QR code above with Expo Go (Android) or the Camera app (iOS)

› Press a │ open Android
› Press i │ open iOS simulator
› Press w │ open web

› Press r │ reload app
› Press m │ toggle menu
```

## Запуск на устройстве

### Для Android:

1. **Способ 1: Expo Go (рекомендуется)**
   - Скачай [Expo Go](https://play.google.com/store/apps/details?id=host.exp.exponent) из Google Play
   - Открой приложение
   - Отсканируй QR-код из терминала

2. **Способ 2: Эмулятор**
   - Установи Android Studio
   - Создай виртуальное устройство
   - Запусти: `npm run android`

### Для iOS:

1. **Способ 1: Expo Go (рекомендуется)**
   - Скачай [Expo Go](https://apps.apple.com/app/expo-go/id982107779) из App Store
   - Открой приложение
   - Отсканируй QR-код из терминала

2. **Способ 2: Симулятор (только на Mac)**
   - Установи Xcode из App Store
   - Запусти: `npm run ios`

### Для веба:

```bash
npm run web
```

Приложение откроется в браузере по адресу `http://localhost:8081`

## Возможные проблемы

### Проблема: "Command not found: expo"

**Решение:**
```bash
npm install -g expo-cli
```

Или используй:
```bash
npx expo start
```

### Проблема: "Port 8081 already in use"

**Решение:**
1. Закрой другие приложения, использующие этот порт
2. Или убей процесс:
   ```bash
   # Windows
   netstat -ano | findstr :8081
   taskkill /PID <номер_процесса> /F
   
   # Mac/Linux
   lsof -ti:8081 | xargs kill
   ```

### Проблема: QR-код не сканируется

**Решение:**
1. Убедись, что телефон и компьютер в одной Wi-Fi сети
2. Попробуй запустить с флагом `--tunnel`:
   ```bash
   npx expo start --tunnel
   ```

### Проблема: "Unable to resolve module"

**Решение:**
1. Удали папку `node_modules`:
   ```bash
   rm -rf node_modules
   ```
2. Удали файл `package-lock.json` (если есть)
3. Переустанови зависимости:
   ```bash
   npm install
   ```

### Проблема: Приложение не обновляется

**Решение:**
1. Встряхни телефон (или нажми `Cmd/Ctrl + D`)
2. Выбери "Reload"
3. Или перезапусти сервер: `npm start`

## Полезные команды

```bash
# Запуск с очисткой кеша
npm start -- --clear

# Запуск в режиме туннеля (для тестирования на другом Wi-Fi)
npx expo start --tunnel

# Запуск только для веба
npm run web

# Показать логи
npx expo start --dev-client
```

## Что дальше?

После успешного запуска:
1. Открой `README.md` для изучения основ
2. Начни экспериментировать с кодом
3. Изменяй файлы в папке `app/` и смотри, как меняется приложение

**Удачи!** 🚀

