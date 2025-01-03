import * as React from "react";
import { Text as RNText } from "react-native";
import { StyleSheet, type UnistylesVariants } from "react-native-unistyles";

type TextProps = React.ComponentPropsWithoutRef<typeof RNText> &
  UnistylesVariants<typeof styles>;

const Text = React.forwardRef<React.ElementRef<typeof RNText>, TextProps>(
  (
    { className, style, variant, color, muted, uppercase, ...props },
    forwardedRef
  ) => {
    styles.useVariants({
      variant,
      color,
      uppercase,
      muted,
    });

    return (
      <RNText
        ref={(ref) => {
          if (typeof forwardedRef === "function") {
            forwardedRef(ref);
          } else if (forwardedRef) {
            // @ts-ignore - this is necessary for Expo Web compatibility
            forwardedRef.current = ref;
          }
        }}
        style={[styles.container, style]}
        {...props}
      />
    );
  }
);

Text.displayName = "Text";

const styles = StyleSheet.create((th, rt) => ({
  container: {
    fontFamily: th.fontFamily.BodySemiBold,
    fontSize: th.fontSize(1),
    lineHeight: th.fontSize(1) * 1.4,
    textTransform: "none",
    color: th.colors.foreground.base,
    variants: {
      uppercase: {
        true: {
          textTransform: "uppercase",
        },
      },
      variant: {
        h1: {
          fontFamily: th.fontFamily.HeadingBlack,
          fontSize: th.fontSize(1.6),
          lineHeight: th.fontSize(1.6) * 1.5,
          letterSpacing: -0.2,
        },
        h2: {
          fontFamily: th.fontFamily.HeadingBold,
          fontSize: th.fontSize(1.25),
          lineHeight: th.fontSize(1.25) * 1.5,
          letterSpacing: -0.2,
        },
        h3: {
          fontFamily: th.fontFamily.HeadingBold,
          fontSize: th.fontSize(1.125),
          lineHeight: th.fontSize(1.125) * 1.5,
          letterSpacing: -0.2,
        },
        subtitle: {
          fontFamily: th.fontFamily.BodyBold,
          fontSize: th.fontSize(0.875),
          lineHeight: th.fontSize(0.875) * 1.4,
        },
        caption: {
          fontFamily: th.fontFamily.BodySemiBold,
          fontSize: th.fontSize(0.875),
        },
      },
      color: {
        foreground: {
          color: th.colors.foreground.base,
        },
        inverted: {
          color: th.colors.background.base,
        },
        primary: {
          color: th.colors.primary.dark,
        },
        secondary: {
          color: th.colors.background.light,
        },
      },
      muted: {
        true: {
          color: th.colors.foreground.light,
        },
      },
    },
    compoundVariants: [
      {
        color: "primary",
        muted: true,
        styles: {
          color: th.colors.primary.dark,
        },
      },
      {
        color: "secondary",
        muted: true,
        styles: {
          color: th.colors.foreground.dark,
        },
      },
    ],
  },
}));

export { Text };

export type { TextProps };
