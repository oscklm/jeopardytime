import { StyleSheet } from "react-native-unistyles";
import { Button, Icons, Spacer, Text, XStack, YStack } from "@/components/ui";

export default function ExploreTabScreen() {
  return (
    <YStack padding="md" gap="md" container>
      <XStack ai="center" jc="spaceBetween">
        <XStack ai="center" gap="md">
          <Icons.star
            size={28}
            color={styles.iconColor.color}
            strokeWidth={2.5}
          />
          <Text variant="h1">Explore </Text>
        </XStack>
        <XStack gap="md">
          <Button size="sm">Search</Button>
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
