import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { StyleSheet } from "react-native-unistyles";
import { Icons } from "@/components/ui/Icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#000",
        tabBarLabelStyle: {
          fontFamily: "Roboto_700Bold",
        },
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
        sceneStyle: styles.contentStyle,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color }) => <Icons.home size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="boards"
        options={{
          title: "Boards",
          tabBarIcon: ({ color }) => <Icons.list size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <Icons.profile size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}

export const styles = StyleSheet.create((th, rt) => ({
  container: {
    flex: 1,
    paddingTop: rt.insets.top,
    padding: th.gap(3),
  },
  contentStyle: {
    backgroundColor: th.colors.background.base,
  },
}));
