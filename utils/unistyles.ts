import type { Ref } from 'react';

export const createExpoWebCompatibleRef =
  <T>(forwardedRef: Ref<T>) =>
  (ref: T | null) => {
    if (typeof forwardedRef === 'function') {
      forwardedRef(ref);
    } else if (forwardedRef) {
      // @ts-ignore - this is necessary for Expo Web compatibility
      forwardedRef.current = ref;
    }
  };
