import { Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import {
  getInfoAsync,
  makeDirectoryAsync,
  deleteAsync,
  readDirectoryAsync,
  downloadAsync,
} from 'expo-file-system/legacy';

/**
 * Кэширование изображений
 * Пункты 51-65: Оптимизация производительности
 */

const BASE_CACHE_DIR = FileSystem.cacheDirectory || FileSystem.documentDirectory || null;
const CACHE_DIR = BASE_CACHE_DIR ? `${BASE_CACHE_DIR}movie_images/` : null;
const CACHE_KEY = 'image_cache_map';

// Инициализация директории кэша
async function initCacheDir() {
  if (!CACHE_DIR) return false;
  const dirInfo = await getInfoAsync(CACHE_DIR);
  if (!dirInfo.exists) {
    await makeDirectoryAsync(CACHE_DIR, { intermediates: true });
  }
  return true;
}

/**
 * Получить имя файла из URL
 */
function getFileName(url) {
  return url.split('/').pop().split('?')[0];
}

/**
 * Проверить, есть ли изображение в кэше
 */
export async function isImageCached(url) {
  const ready = await initCacheDir();
  if (!ready) return false;
  const fileName = getFileName(url);
  const filePath = `${CACHE_DIR}${fileName}`;
  const fileInfo = await getInfoAsync(filePath);
  return fileInfo.exists;
}

/**
 * Получить путь к кэшированному изображению
 */
export async function getCachedImagePath(url) {
  const ready = await initCacheDir();
  if (!ready) return url;
  const fileName = getFileName(url);
  return `${CACHE_DIR}${fileName}`;
}

/**
 * Кэшировать изображение
 */
export async function cacheImage(url) {
  try {
    const ready = await initCacheDir();
    if (!ready) return url;
    
    // Проверяем, не кэшировано ли уже
    if (await isImageCached(url)) {
      return await getCachedImagePath(url);
    }

    const fileName = getFileName(url);
    const filePath = `${CACHE_DIR}${fileName}`;

    // Скачиваем изображение
    const downloadResult = await downloadAsync(url, filePath);
    
    return downloadResult.uri;
  } catch (error) {
    console.error('Ошибка кэширования изображения:', error);
    return url; // Возвращаем оригинальный URL при ошибке
  }
}

/**
 * Очистить кэш изображений
 */
export async function clearImageCache() {
  try {
    if (!CACHE_DIR) return;
    const dirInfo = await getInfoAsync(CACHE_DIR);
    if (dirInfo.exists) {
      await deleteAsync(CACHE_DIR, { idempotent: true });
      await initCacheDir();
    }
  } catch (error) {
    console.error('Ошибка очистки кэша:', error);
  }
}

/**
 * Получить размер кэша
 */
export async function getCacheSize() {
  try {
    if (!CACHE_DIR) return 0;
    const dirInfo = await getInfoAsync(CACHE_DIR);
    if (!dirInfo.exists) return 0;

    const files = await readDirectoryAsync(CACHE_DIR);
    let totalSize = 0;

    for (const file of files) {
      const fileInfo = await getInfoAsync(`${CACHE_DIR}${file}`);
      if (fileInfo.exists && fileInfo.size) {
        totalSize += fileInfo.size;
      }
    }

    return totalSize;
  } catch (error) {
    console.error('Ошибка получения размера кэша:', error);
    return 0;
  }
}

