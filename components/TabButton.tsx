import type { TabTriggerSlotProps } from "expo-router/ui";
import { Pressable, Text, type View } from "react-native";
import { forwardRef } from "react";
import { StyleSheet } from "react-native-unistyles";
import { Icons } from "@/components/ui";

type Icon = keyof typeof Icons;

type TabButtonProps = TabTriggerSlotProps & {
  icon: Icon;
};

export const TabButton = forwardRef<View, TabButtonProps>(
  ({ children, isFocused, icon, ...props }, ref) => {
    const Icon = Icons[icon];

    return (
      <Pressable
        ref={ref}
        {...props}
        style={[styles.tabButton, isFocused && styles.tabButtonFocused]}
      >
        <Icon
          size={21}
          strokeWidth={2}
          color={isFocused ? "#f3f2ff" : "#4118bf"}
        />
        <Text
          style={[
            { fontSize: 12 },
            isFocused ? { color: "#f3f2ff" } : { color: "#4118bf" },
          ]}
        >
          {children}
        </Text>
      </Pressable>
    );
  }
);

const styles = StyleSheet.create((th) => ({
  tabButton: {
    flex: 1,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    gap: 3,
    overflow: "hidden",
  },
  tabButtonFocused: {
    backgroundColor: th.colors.primary.light,
  },
}));
