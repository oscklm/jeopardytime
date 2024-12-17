import * as React from "react";
import { View as RNView } from "react-native";
import { StyleSheet, type UnistylesVariants } from "react-native-unistyles";

type BadgeProps = React.ComponentPropsWithoutRef<typeof RNView> &
  UnistylesVariants<typeof styles>;

const Badge = React.forwardRef<RNView, BadgeProps>(
  ({ variant, style, ...props }, ref) => {
    styles.useVariants({ variant });
    return <RNView ref={ref} style={[styles.view, style]} {...props} />;
  }
);

Badge.displayName = "Badge";

const styles = StyleSheet.create((th) => ({
  view: {
    borderRadius: th.borderRadius(3),
    padding: th.gap(1),
    paddingHorizontal: th.gap(3),
    backgroundColor: th.colors.background.dark,
    variants: {
      variant: {
        primary: {
          backgroundColor: th.colors.primary.base,
        },
        secondary: {
          backgroundColor: th.colors.background.base,
        },
      },
    },
  },
}));

export { Badge };
export type { BadgeProps };
