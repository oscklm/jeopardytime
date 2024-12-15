import { Text } from "@/components/ui/Text";
import * as React from "react";
import { View } from "react-native";
import { Pressable } from "react-native";
import { StyleSheet, type UnistylesVariants } from "react-native-unistyles";

type ButtonProps = Omit<
  React.ComponentPropsWithoutRef<typeof Pressable>,
  "children"
> &
  UnistylesVariants<typeof styles> & {
    children: React.ReactNode;
  };

type ButtonViewProps = UnistylesVariants<typeof styles> & {
  children: React.ReactNode;
  disabled?: null | boolean | undefined;
};

const Button = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  ButtonProps
>(({ children, variant, disabled, size, ...props }, ref) => {
  return (
    // biome-ignore lint/a11y/useSemanticElements: <explanation>
    <Pressable ref={ref} disabled={disabled} role="button" {...props}>
      {({ pressed, hovered }) => {
        return (
          <ButtonView
            variant={variant}
            size={size}
            pressed={pressed}
            hovered={hovered}
            disabled={disabled ?? false}
          >
            {children}
          </ButtonView>
        );
      }}
    </Pressable>
  );
});
Button.displayName = "Button";

const ButtonView = ({
  children,
  variant,
  size,
  pressed,
  hovered,
  disabled,
}: ButtonViewProps) => {
  styles.useVariants({
    variant,
    size,
    pressed,
    hovered,
    disabled: disabled ?? false,
  });
  return (
    <View style={styles.buttonView}>
      <Text style={styles.text}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create((th, rt) => ({
  buttonView: {
    borderRadius: th.borderRadius(2),
    backgroundColor: th.colors.button.base,
    variants: {
      variant: {
        ghost: {
          backgroundColor: "transparent",
          borderWidth: 2,
          borderColor: th.colors.button.base,
        },
      },
      size: {
        sm: {
          paddingHorizontal: th.gap(3),
          paddingVertical: th.gap(2),
        },
        md: {
          paddingHorizontal: th.gap(4),
          paddingVertical: th.gap(3),
        },
        default: {
          paddingHorizontal: th.gap(4),
          paddingVertical: th.gap(3),
        },
      },
      disabled: {
        true: {
          opacity: 0.5,
        },
      },
      pressed: {
        true: {
          backgroundColor: th.colors.button.dark,
        },
      },
      hovered: {
        true: {
          backgroundColor: th.colors.button.dark,
        },
      },
    },
    compoundVariants: [
      {
        variant: "ghost",
        pressed: true,
        styles: {
          borderWidth: 2,
          borderColor: th.colors.button.dark,
          backgroundColor: th.colors.button.dark,
        },
      },
      {
        variant: "ghost",
        hovered: true,
        styles: {
          borderWidth: 2,
          borderColor: th.colors.button.light,
        },
      },
    ],
  },
  text: {
    textAlign: "center",
    fontFamily: th.fontFamily.BodyBold,
    fontSize: th.fontSize(1),
    lineHeight: th.fontSize(1) * 1.5,
    color: th.colors.background.light,
    variants: {
      variant: {
        ghost: {
          color: th.colors.foreground.base,
        },
      },
      size: {
        sm: {
          fontSize: th.fontSize(1),
          lineHeight: th.fontSize(1) * 1.5,
        },
        md: {
          fontSize: th.fontSize(1.25),
          lineHeight: th.fontSize(1.25) * 1.5,
        },
      },
      pressed: {},
      hovered: {},
    },
    compoundVariants: [
      {
        variant: "ghost",
        pressed: true,
        styles: {
          color: th.colors.background.light,
        },
      },
    ],
  },
}));

export { Button };

export type { ButtonProps };
