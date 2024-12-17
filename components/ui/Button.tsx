import { type IconNames, Icons } from "@/components/ui/Icons";
import type { ViewProps } from "@/components/ui/View";
import { forwardRef } from "react";
import { Text } from "react-native";
import { Pressable, type PressableProps, View } from "react-native";
import { StyleSheet, type UnistylesVariants } from "react-native-unistyles";

type ButtonVariants = UnistylesVariants<typeof styles>;

type ButtonViewProps = ButtonVariants &
  ViewProps & {
    icon?: IconNames;
    children?: React.ReactNode | undefined;
  };

const ButtonView = ({
  children,
  hovered,
  pressed,
  icon,
  style,
  ...props
}: ButtonViewProps) => {
  // NOTE: THIS BREAKS
  // styles.useVariants({
  //   hovered,
  //   pressed,
  // });

  const Icon = icon ? Icons[icon] : null;

  return (
    <View style={[styles.buttonView, style]} {...props}>
      {Icon && <Icon size={20} color={styles.buttonText.color} />}
      {children && <Text style={styles.buttonText}>{children}</Text>}
    </View>
  );
};

const Button = forwardRef<
  View,
  Omit<ButtonViewProps, "pressed" | "hovered"> & PressableProps
>(({ ...props }, ref) => {
  return (
    <Pressable ref={ref} {...props}>
      {(state) => {
        return (
          <ButtonView
            {...state}
            {...props}
            style={
              /** NOTE: THIS DIRECT APPROACH WORKS WITH THE PRESS STATE  */
              state.pressed
                ? { backgroundColor: "red" }
                : { backgroundColor: "gray" }
            }
          />
        );
      }}
    </Pressable>
  );
});

export { Button };

const styles = StyleSheet.create((th, rt) => ({
  buttonView: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    borderRadius: th.borderRadius(2),
    backgroundColor: th.colors.button.base,
    variants: {
      pressed: {
        true: {
          backgroundColor: "red",
        },
        false: {},
      },
      size: {
        sm: {
          padding: 10,
        },
        md: {
          padding: 15,
        },
        lg: {
          padding: 20,
        },
      },
      hovered: {
        true: {
          backgroundColor: th.colors.button.dark,
        },
        false: {},
      },
    },
  },
  buttonText: {
    fontFamily: th.fontFamily.BodySemiBold,
    fontSize: th.fontSize(1),
    lineHeight: th.fontSize(1) * 1.5,
    color: th.colors.background.light,
    variants: {
      pressed: {
        true: {
          color: "blue",
        },
        false: {},
      },
      size: {
        sm: {
          fontSize: th.fontSize(0.5),
        },
        md: {
          fontSize: th.fontSize(1),
        },
        lg: {
          fontSize: th.fontSize(1.5),
        },
      },
      hovered: {
        true: {
          color: th.colors.foreground.dark,
        },
        false: {},
      },
    },
  },
}));
