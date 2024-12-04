import * as React from "react";
import { View as RNView } from "react-native";
import { StyleSheet, type UnistylesVariants } from "react-native-unistyles";

type ViewProps = React.ComponentPropsWithoutRef<typeof RNView> &
  UnistylesVariants<typeof styles>;

const View = React.forwardRef<React.ElementRef<typeof RNView>, ViewProps>(
  ({ variant, ...props }, ref) => {
    styles.useVariants({ variant });
    return <RNView ref={ref} style={styles.view} {...props} />;
  }
);

View.displayName = "View";

const styles = StyleSheet.create((th) => ({
  view: {
    variants: {
      variant: {
        primary: {
          backgroundColor: th.colors.primary.base,
        },
        secondary: {
          backgroundColor: th.colors.secondary.base,
        },
      },
    },
  },
}));

export { View };
export type { ViewProps };
