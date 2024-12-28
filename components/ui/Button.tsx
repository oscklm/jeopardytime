import { forwardRef } from "react";

import {
  View,
  Text,
  Pressable,
  PressableProps,
  StyleProp,
  ViewStyle,
} from "react-native";

import { Icons } from "./Icons";
import {
  StyleSheet,
  UnistylesVariants,
  withUnistyles,
} from "react-native-unistyles";

export type Variants = UnistylesVariants<typeof styles>;

type ButtonProps = PressableProps &
  Variants & {
    children?: React.ReactNode;
    icon?: keyof typeof Icons;
    style?: StyleProp<ViewStyle>;
  };

type ButtonViewProps = Variants & {
  children?: React.ReactNode;
  icon?: keyof typeof Icons;
  style?: StyleProp<ViewStyle>;
};

export const ButtonView = withUnistyles(
  ({ hovered, pressed, icon, size, children }: ButtonViewProps) => {
    const Icon = icon ? Icons[icon] : null;

    styles.useVariants({
      hovered,
      pressed,
      size,
    });

    return (
      <View style={[styles.buttonView]}>
        {Icon && <Icon size={20} color={styles.buttonText.color} />}
        {children && (
          <Text selectable={false} style={styles.buttonText}>
            {children}
          </Text>
        )}
      </View>
    );
  }
);

export const Button = forwardRef<View, ButtonProps>(
  ({ children, icon, size, style, ...props }, ref) => {
    styles.useVariants({});
    return (
      <Pressable hitSlop={15} ref={ref} {...props}>
        {({ hovered, pressed }) => {
          return (
            <ButtonView
              hovered={hovered}
              pressed={pressed}
              icon={icon}
              size={size}
              children={children}
            />
          );
        }}
      </Pressable>
    );
  }
);

export default Button;

const styles = StyleSheet.create((th, rt) => ({
  buttonView: {
    height: 40,
    paddingHorizontal: th.gap(4),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: th.borderRadius(10),
    backgroundColor: th.colors.button.base,
    variants: {
      pressed: {
        true: {
          backgroundColor: th.colors.button.light,
        },
        false: {},
      },
      hovered: {
        true: {
          backgroundColor: th.colors.button.dark,
        },
        false: {},
      },
      size: {
        sm: {
          height: 40,
        },
        md: {
          height: 50,
        },
        lg: {
          height: 65,
        },
      },
    },
    compoundVariants: [
      {
        pressed: true,
        hovered: true,
        styles: {
          backgroundColor: th.colors.button.light,
        },
      },
    ],
  },
  buttonText: {
    fontFamily: th.fontFamily.HeadingBold,
    fontSize: th.fontSize(1),
    letterSpacing: 0.2,
    color: th.colors.background.light,
    variants: {
      pressed: {
        true: {
          color: th.colors.background.light,
        },
        false: {},
      },
      hovered: {
        true: {
          color: th.colors.background.light,
        },
        false: {},
      },
      size: {
        sm: {
          fontSize: th.fontSize(1),
          lineHeight: th.fontSize(1) * 1.5,
        },
        md: {
          fontSize: th.fontSize(1.2),
          lineHeight: th.fontSize(1.2) * 1.5,
        },
        lg: {
          fontSize: th.fontSize(1.3),
          lineHeight: th.fontSize(1.3) * 1.5,
        },
      },
    },
  },
}));
