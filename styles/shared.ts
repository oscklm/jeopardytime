import { StyleSheet } from "react-native-unistyles";
import type {
  UnistylesTheme,
  UnistylesValues,
} from "react-native-unistyles/lib/typescript/src/types";

export const styles = StyleSheet.create((th) => ({
  contentStyle: {
    backgroundColor: th.colors.background.base,
  },
  headerStyle: {
    color: th.colors.primary.base,
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
        justifyContent: "center",
      },
      "space-between": {
        justifyContent: "space-between",
      },
      start: {
        justifyContent: "flex-start",
      },
      end: {
        justifyContent: "flex-end",
      },
    } satisfies Record<string, UnistylesValues>,
    ai: {
      center: {
        alignItems: "center",
      },
      start: {
        alignItems: "flex-start",
      },
      end: {
        alignItems: "flex-end",
      },
    } satisfies Record<string, UnistylesValues>,
    pd: {
      none: {
        padding: 0,
      },
      sm: {
        padding: th.gap(1),
      },
      md: {
        padding: th.gap(3),
      },
      lg: {
        padding: th.gap(6),
      },
    } satisfies Record<string, UnistylesValues>,
    px: {
      none: {
        paddingHorizontal: 0,
      },
      sm: {
        paddingHorizontal: th.gap(1),
      },
      md: {
        paddingHorizontal: th.gap(3),
      },
      lg: {
        paddingHorizontal: th.gap(6),
      },
    },
    mg: {
      none: {
        margin: 0,
      },
      sm: {
        margin: th.gap(1),
      },
      md: {
        margin: th.gap(2),
      },
      lg: {
        margin: th.gap(3),
      },
    } satisfies Record<string, UnistylesValues>,
    my: {
      none: {
        marginVertical: 0,
      },
      sm: {
        marginVertical: th.gap(1),
      },
      md: {
        marginVertical: th.gap(2),
      },
      lg: {
        marginVertical: th.gap(3),
      },
    } satisfies Record<string, UnistylesValues>,
    mx: {
      none: {
        marginHorizontal: 0,
      },
      sm: {
        marginHorizontal: th.gap(1),
      },
      md: {
        marginHorizontal: th.gap(2),
      },
      lg: {
        marginHorizontal: th.gap(3),
      },
    } satisfies Record<string, UnistylesValues>,
  }) as const;
