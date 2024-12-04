import * as React from "react";
import { View as RNView } from "react-native";
import { StyleSheet, type UnistylesVariants } from "react-native-unistyles";

type CardProps = React.ComponentPropsWithoutRef<typeof RNView> &
  UnistylesVariants<typeof styles>;

const Card = React.forwardRef<RNView, CardProps>(
  ({ variant, style, ...props }, ref) => {
    styles.useVariants({ variant });
    return <RNView ref={ref} style={[styles.view, style]} {...props} />;
  }
);

Card.displayName = "Card";

const styles = StyleSheet.create((th) => ({
  view: {
    borderRadius: th.borderRadius(3),
    padding: th.gap(4),
    shadowColor: th.colors.foreground.base,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
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

export { Card };
export type { CardProps };
