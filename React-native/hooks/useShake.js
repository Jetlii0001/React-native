import { useEffect } from 'react';
import { Platform } from 'react-native';
import { Accelerometer } from 'expo-sensors';

export function useShake(onShake, threshold = 1.7) {
  useEffect(() => {
    let subscription = null;

    const subscribe = () => {
      subscription = Accelerometer.addListener(({ x, y, z }) => {
        const acceleration = Math.sqrt(x * x + y * y + z * z);
        if (acceleration > threshold) {
          onShake();
        }
      });
      Accelerometer.setUpdateInterval(300);
    };

    const init = async () => {
      try {
        if (Platform.OS === 'web') return;
        const available = await Accelerometer.isAvailableAsync?.();
        if (available === false) return;
        subscribe();
      } catch (error) {
        console.warn('Shake not available:', error);
      }
    };

    init();

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, [onShake, threshold]);
}

