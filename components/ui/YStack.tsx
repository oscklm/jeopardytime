import { defaultLayoutVariants } from "@/styles/shared";
import * as React from "react";
import { View as RNView } from "react-native";
import { StyleSheet, type UnistylesVariants } from "react-native-unistyles";

type YStackProps = React.ComponentPropsWithoutRef<typeof RNView> &
  UnistylesVariants<typeof styles>;

const YStack = React.forwardRef<React.ElementRef<typeof RNView>, YStackProps>(
  (
    { gap, jc, ai, pd, px, mg, my, mx, topInset, container, style, ...props },
    ref
  ) => {
    styles.useVariants({
      gap,
      jc,
      ai,
      pd,
      px,
      mg,
      my,
      mx,
      topInset,
      container,
    });
    return <RNView ref={ref} style={[styles.view, style]} {...props} />;
  }
);

YStack.displayName = "YStack";

const styles = StyleSheet.create((th, rt) => ({
  view: {
    flex: 1,
    flexDirection: "column",
    gap: th.gap(2),
    variants: {
      ...defaultLayoutVariants(th),
      container: {
        true: {
          flex: 1,
          margin: "auto",
          minWidth: {
            sm: "100%",
            lg: "90%",
            xl: 400,
          },
        },
      },
      topInset: {
        true: {
          marginTop: rt.insets.top,
        },
      },
    },
  },
}));

export { YStack };
export type { YStackProps };
