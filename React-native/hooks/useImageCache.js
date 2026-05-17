import { useState, useEffect } from 'react';
import { cacheImage, isImageCached, getCachedImagePath } from '../utils/imageCache';

export function useImageCache(url) {
  const [cachedUrl, setCachedUrl] = useState(url);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadCachedImage() {
      if (!url) {
        setIsLoading(false);
        return;
      }

      try {
        const cached = await isImageCached(url);
        
        if (cached) {
          const cachedPath = await getCachedImagePath(url);
          if (isMounted) {
            setCachedUrl(cachedPath);
            setIsLoading(false);
          }
        } else {
          const cachedPath = await cacheImage(url);
          if (isMounted) {
            setCachedUrl(cachedPath);
            setIsLoading(false);
          }
        }
      } catch (error) {
        console.error('Ошибка загрузки изображения:', error);
        if (isMounted) {
          setCachedUrl(url); 
          setIsLoading(false);
        }
      }
    }

    loadCachedImage();

    return () => {
      isMounted = false;
    };
  }, [url]);

  return { cachedUrl, isLoading };
}

