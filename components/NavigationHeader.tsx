import type React from "react";
import { View, Text, Platform, Pressable } from "react-native";
import type { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native-unistyles";
import { Icons } from "@/components/ui";

export const NavigationHeader = ({
  navigation,
  route,
  options,
  back,
}: NativeStackHeaderProps) => {
  const hasStatusBar =
    options.presentation !== "modal" &&
    options.presentation !== "formSheet" &&
    Platform.OS !== "web";

  const isModal =
    options.presentation === "modal" ||
    (options.presentation === "formSheet" && Platform.OS !== "web");

  styles.useVariants({ hasStatusBar });

  return (
    <View style={styles.container}>
      {/* Left (Back button or Modal close) */}
      <View style={styles.leftContainer}>
        {back && !isModal ? (
          <Pressable
            hitSlop={15}
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Icons.arrowLeft size={24} color={styles.iconColor.color} />
            {back.title && (
              <Text style={styles.backButtonText}>{back.title}</Text>
            )}
          </Pressable>
        ) : null}
      </View>

      {/* Center (Title) */}
      {options.presentation !== "formSheet" && (
        <View style={styles.centerContainer}>
          <Text style={styles.title}>
            {typeof options.headerTitle === "function"
              ? options.headerTitle({ children: "", tintColor: undefined })
              : options.headerTitle ?? options.title ?? route.name}
          </Text>
        </View>
      )}

      {/* Right (Optional right button) */}
      <View style={styles.rightContainer}>
        {isModal ? (
          <Pressable
            hitSlop={15}
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Icons.cross
              size={30}
              strokeWidth={2.5}
              color={styles.crossColor.color}
            />
          </Pressable>
        ) : (
          options.headerRight?.({})
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create((th, rt) => ({
  container: {
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: th.gap(2),

    variants: {
      hasStatusBar: {
        true: {
          marginTop: rt.insets.top,
        },
        false: {
          marginTop: 15,
        },
      },
    },
  },
  iconColor: {
    color: th.colors.primary.base,
  },
  crossColor: {
    color: th.colors.error.base,
  },
  leftContainer: {
    flex: 1,
    alignItems: "flex-start",
  },
  centerContainer: {
    flex: 2,
    alignItems: "center",
  },
  rightContainer: {
    flex: 1,
    alignItems: "flex-end",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButtonText: {
    fontFamily: th.fontFamily.BodySemiBold,
    fontSize: th.fontSize(1),
    color: th.colors.primary.base,
    marginLeft: th.gap(1),
  },
  title: {
    fontFamily: th.fontFamily.HeadingBold,
    fontSize: th.fontSize(1.15),
    lineHeight: th.fontSize(1.15) * 1.5,
    color: th.colors.foreground.base,
  },
}));

export default NavigationHeader;
