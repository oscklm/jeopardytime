import { Text } from "@/components/ui";
import { YStack } from "@/components/ui/YStack";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/clerk-expo";
import { useQuery } from "convex/react";
import { StyleSheet } from "react-native-unistyles";

export default function ProfileScreen() {
  const user = useQuery(api.users.current);

  if (!user) {
    return null;
  }

  return (
    <YStack container topInset>
      <YStack gap="md" padding="md">
        <Text>{user.username}</Text>
        <Text>{user.email}</Text>
      </YStack>
    </YStack>
  );
}

const styles = StyleSheet.create((th, rt) => ({
  container: {
    flex: 1,
    paddingTop: rt.insets.top,
  },
}));
