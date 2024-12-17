import { StyleSheet } from "react-native-unistyles";
import { Button, Spacer, Text, XStack, YStack } from "@/components/ui";

export default function ExploreTabScreen() {
  return (
    <YStack pd="md" gap="md" container>
      <XStack ai="center" jc="space-between">
        <XStack ai="center" gap="md">
          <Text variant="h1">Explore </Text>
        </XStack>
        <XStack gap="md">
          <Button size="sm">Refresh</Button>
        </XStack>
      </XStack>
      <Spacer />
    </YStack>
  );
}

const styles = StyleSheet.create((th, rt) => ({
  container: {
    flex: 1,
  },
  iconColor: {
    color: th.colors.primary.base,
  },
}));
