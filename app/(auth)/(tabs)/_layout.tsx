import React, { forwardRef } from "react";
import { Platform, SafeAreaView, Pressable, Text } from "react-native";

import { Tabs, TabList, TabTrigger, TabSlot } from "expo-router/ui";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TabButton } from "@/components/TabButton";
import { StyleSheet } from "react-native-unistyles";

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView
      style={[{ flex: 1 }, Platform.OS === "ios" && { paddingTop: insets.top }]}
    >
      <Tabs>
        <TabSlot />
        <TabList style={[styles.tabListContainer]}>
          <TabTrigger name="home" href="/" asChild>
            <TabButton icon="home">Home</TabButton>
          </TabTrigger>
          <TabTrigger name="boards" href="/boards" asChild>
            <TabButton icon="list">Boards</TabButton>
          </TabTrigger>
          <TabTrigger name="profile" href="/profile" asChild>
            <TabButton icon="profile">Profile</TabButton>
          </TabTrigger>
        </TabList>
      </Tabs>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create((th) => ({
  tabListContainer: {
    marginHorizontal: 15,
    borderRadius: 30,
    padding: 10,
    overflow: "hidden",
    backgroundColor: th.colors.primary.base,
  },
}));
