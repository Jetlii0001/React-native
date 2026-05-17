# Бэклог улучшений кода (не срочно)

Учебный проект. Пункты ниже — для постепенного внесения, когда будет удобно.

## Ключ TMDB

Для ребят ключ **намеренно** в коде (`store/moviesStore.js`). В продакшене позже можно перейти на переменные окружения — в этом файле не держим как обязательный долг.

---

## Баги и несоответствия API стора

1. **`app/movies/index-v2.js`** — используется `isLoading`, в `moviesStore` такого поля нет (`isLoadingHome` / `isLoadingDetails` / `isLoadingSearch`). Скелетон при загрузке из-за этого не работает как задумано.

2. **`app/movies/search-v2.js`** — то же: нужен **`isLoadingSearch`** вместо `isLoading`. Плюс в `filteredResults` ранние `return true` по типам `movie`/`tv` могут обходить фильтры года и рейтинга.

3. **`moviesStore`** — несколько методов (`fetchHomeData`, `fetchPopularMovies`, `fetchPopularTVShows`) пишут в один **`isLoadingHome`**: возможны гонки при одновременных вызовах.

4. **`app/movies/index.js` + `useShake`** — колбэк `openRandom` без `useEffect`/стабильной ссылки пересоздаёт подписку на акселерометр слишком часто. Имеет смысл `useCallback`.

---

## «AI» рекомендации (название и данные)

5. **`utils/aiRecommendations.js`** — по факту эвристики (жанры, рейтинг), не LLM. Можно переименовать UI/комментарии, чтобы не вводить в заблуждение.

6. Рекомендации завязаны на `genre_ids` и наполнение `moviesStore`; если экран открыть до загрузки главной, кандидатов мало.

---

## Мёртвый / дублирующий код

7. **`movies/index-v2.js`**, **`movies/search-v2.js`** — не подключены в `_layout`, на них нет навигации из приложения. Либо удалить, либо слить с основными экранами.

8. **`components/Card.js`** — в приложении импортов не найдено (есть только в README/структуре).

9. Неиспользуемые зависимости (проверить перед удалением): **`react-native-elements`**, **`react-native-draggable-flatlist`**; продумать нужность **`react-native-vector-icons`** рядом с **`@expo/vector-icons`**.

10. **`utils/logger.js`**, **`utils/analytics.js`**, **`utils/performance.js`** — не импортируются из кода приложения.

11. Лишние импорты: **`FlatList`** в `app/api-example.js`; **`Image`** в `utils/imageCache.js`.

---

## Тема и UI

12. **`app.json`**: `userInterfaceStyle: "light"` vs **`themeStore`** по умолчанию `dark` и флаг **`isSystemTheme`** без реальной привязки к системной теме.

13. **`app/_layout.js`** — фиксированный `#6200ee` в хедере стека при темизированном контенте фильмотеки.

14. **`babel.config.js`** — `unstable_transformImportMeta`: при обновлении Expo перепроверить необходимость.

---

## Надёжность

15. **`favoritesStore`** — `JSON.parse` без обёртки: битые данные в AsyncStorage могут ронять приложение.

16. **`userStore.fetchUsers`** — нет проверки `response.ok`.

17. **`moviesStore`** — объединение movie/tv жанров в один `genreMap`: теоретически возможны коллизии id (редко у TMDB, но хрупко).

18. **`utils/imageCache.js`** — имя файла из URL: разные URL с одинаковым последним сегментом могут перезаписывать кэш.

---

## Error boundary и уведомления

19. **`ErrorBoundary`** — сброс ошибки без смены `key` у детей может сразу снова упасть на том же дереве.

20. **`schedulePremiereNotification`** — формат `trigger` для `expo-notifications` сверить с документацией вашей версии SDK.

---

## Репозиторий и прочее

21. Папка **`.expo`** — обычно в `.gitignore`.

22. Много корневых **`.md`** — при желании сократить дублирование.

23. **`package.json` name** vs имя папки — косметика для единообразия.

---

*Последнее обновление списка: по аудиту кодовой базы, без автоматических правок.*
