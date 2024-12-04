import { StyleSheet } from 'react-native-unistyles';
import type {
  UnistylesTheme,
  UnistylesValues,
} from 'react-native-unistyles/lib/typescript/src/types';

export const styles = StyleSheet.create((th) => ({
  contentStyle: {
    backgroundColor: th.colors.background.base,
  },
}));

export const defaultLayoutVariants = (th: UnistylesTheme) =>
  ({
    gap: {
      none: {
        gap: 0,
      },
      sm: {
        gap: th.gap(1),
      },
      md: {
        gap: th.gap(3),
      },
      lg: {
        gap: th.gap(4),
      },
    } satisfies Record<string, UnistylesValues>,
    jc: {
      center: {
        justifyContent: 'center',
      },
      spaceBetween: {
        justifyContent: 'space-between',
      },
      start: {
        justifyContent: 'flex-start',
      },
      end: {
        justifyContent: 'flex-end',
      },
    } satisfies Record<string, UnistylesValues>,
    ai: {
      center: {
        alignItems: 'center',
      },
      start: {
        alignItems: 'flex-start',
      },
      end: {
        alignItems: 'flex-end',
      },
    } satisfies Record<string, UnistylesValues>,
    padding: {
      none: {
        padding: 0,
      },
      sm: {
        padding: th.gap(2),
      },
      md: {
        padding: th.gap(4),
      },
      lg: {
        padding: th.gap(6),
      },
    } satisfies Record<string, UnistylesValues>,
  }) as const;
