import { Button, Icons, Spacer, Text, XStack } from "@/components/ui";
import { YStack } from "@/components/ui/YStack";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { router } from "expo-router";
import { useEffect } from "react";
import { StyleSheet } from "react-native-unistyles";

export default function ProfileScreen() {
  const user = useQuery(api.users.current);

  if (!user) {
    return null;
  }

  return (
    <YStack padding="md" gap="none" container>
      <XStack ai="center" jc="spaceBetween">
        <XStack ai="center" gap="md">
          <Icons.profile
            size={28}
            color={styles.iconColor.color}
            strokeWidth={2.5}
          />
          <Text variant="h1">Your Profile</Text>
        </XStack>
        <XStack gap="md">
          <Button size="sm">Edit Profile</Button>
        </XStack>
      </XStack>
      <Spacer />
      <YStack gap="md" padding="md">
        <Text>{user.username}</Text>
        <Text>{user.email}</Text>
      </YStack>
    </YStack>
  );
}

const styles = StyleSheet.create((th, rt) => ({
  iconColor: {
    color: th.colors.primary.base,
  },
}));
