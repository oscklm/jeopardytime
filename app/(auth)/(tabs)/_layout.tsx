import React from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { Tabs, TabList, TabTrigger, TabSlot } from "expo-router/ui";

import { TabButton } from "@/components/TabButton";

export default function TabLayout() {
  return (
    <Tabs>
      <View style={styles.container}>
        <TabSlot />
        <View style={styles.tabListContainer}>
          <View style={styles.tabList}>
            <TabTrigger name="home" asChild>
              <TabButton icon="home">Home</TabButton>
            </TabTrigger>
            <TabTrigger name="explore" asChild>
              <TabButton icon="star">Explore</TabButton>
            </TabTrigger>
            <TabTrigger name="boards" asChild>
              <TabButton icon="list">Boards</TabButton>
            </TabTrigger>
            <TabTrigger name="profile" asChild>
              <TabButton icon="profile">Profile</TabButton>
            </TabTrigger>
          </View>
        </View>
      </View>
      {/** TabList nessecary here so screens get registered to the navigator */}
      <TabList style={{ display: "none" }}>
        <TabTrigger name="home" href="/" />
        <TabTrigger name="explore" href="/explore" />
        <TabTrigger name="boards" href="/boards" />
        <TabTrigger name="profile" href="/profile" />
      </TabList>
    </Tabs>
  );
}

const styles = StyleSheet.create((th, rt) => ({
  container: {
    flex: 1,
    paddingTop: rt.insets.top,
  },
  tabListContainer: {
    margin: "auto",
    minWidth: {
      xs: "95%",
      md: "90%",
      lg: 700,
    },
    marginBottom: {
      xs: rt.insets.bottom,
    },
    _web: {
      marginBottom: 15,
    },
  },
  tabList: {
    flexDirection: "row",
    borderRadius: 30,
    padding: 10,
    overflow: "hidden",
    backgroundColor: th.colors.primary.base,
  },
}));
