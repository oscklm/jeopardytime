import { Text } from "@/components/ui";
import { YStack } from "@/components/ui/YStack";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

export default function ProfileScreen() {
  const user = useQuery(api.users.current);

  if (!user) {
    return null;
  }

  return (
    <YStack container>
      <YStack gap="md" padding="md">
        <Text>{user.username}</Text>
        <Text>{user.email}</Text>
      </YStack>
    </YStack>
  );
}
