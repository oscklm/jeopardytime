import { defaultLayoutVariants } from "@/styles/shared";
import * as React from "react";
import { View as RNView } from "react-native";
import { StyleSheet, type UnistylesVariants } from "react-native-unistyles";

type XStackProps = React.ComponentPropsWithoutRef<typeof RNView> &
  UnistylesVariants<typeof styles>;

const XStack = React.forwardRef<React.ElementRef<typeof RNView>, XStackProps>(
  ({ gap, jc, ai, style, ...props }, ref) => {
    styles.useVariants({ gap, jc, ai });
    return <RNView ref={ref} style={[styles.view, style]} {...props} />;
  }
);

XStack.displayName = "XStack";

const styles = StyleSheet.create((th) => ({
  view: {
    flexDirection: "row",
    variants: {
      ...defaultLayoutVariants(th),
    },
  },
}));

export { XStack };
export type { XStackProps };
