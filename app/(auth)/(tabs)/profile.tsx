import { Button, Spacer, Text, XStack } from "@/components/ui";
import { YStack } from "@/components/ui/YStack";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { StyleSheet } from "react-native-unistyles";

export default function ProfileScreen() {
  const user = useQuery(api.users.current);

  if (!user) {
    return null;
  }

  return (
    <YStack pd="sm" gap="none" container>
      <XStack pd="sm" ai="center" jc="space-between">
        <XStack ai="center" gap="md">
          <Text variant="h1">Your Profile</Text>
        </XStack>
        <XStack gap="md">
          <Button size="sm">Edit Profile</Button>
        </XStack>
      </XStack>
      <Spacer />
      <YStack gap="md" pd="md">
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
