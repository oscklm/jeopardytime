import * as React from "react";
import { View as RNView } from "react-native";
import { StyleSheet, type UnistylesVariants } from "react-native-unistyles";

type XStackProps = React.ComponentPropsWithoutRef<typeof RNView> &
  UnistylesVariants<typeof styles>;

const XStack = React.forwardRef<React.ElementRef<typeof RNView>, XStackProps>(
  ({ gap, jc, ai, padding, style, ...props }, ref) => {
    styles.useVariants({ gap, jc, ai, padding });
    return <RNView ref={ref} style={[styles.view, style]} {...props} />;
  }
);

XStack.displayName = "XStack";

const styles = StyleSheet.create((th) => ({
  view: {
    flexDirection: "row",
    //padding: th.gap(4),
    variants: {
      // THESE VARIANTS DONT GET APPLIED CORRECTLY
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
      },
      jc: {
        center: {
          justifyContent: "center",
        },
        spaceBetween: {
          justifyContent: "space-between",
        },
        start: {
          justifyContent: "flex-start",
        },
        end: {
          justifyContent: "flex-end",
        },
      },
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
      },
      padding: {
        none: {
          padding: 0,
        },
        sm: {
          padding: th.gap(2),
        },
        md: {
          padding: th.gap(10),
        },
        lg: {
          padding: th.gap(6),
        },
      },
    },
  },
}));

export { XStack };
export type { XStackProps };
