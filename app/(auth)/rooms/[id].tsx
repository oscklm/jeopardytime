import { Button, Icons, Text, XStack } from "@/components/ui";
import { Stack, useLocalSearchParams } from "expo-router";
import { StyleSheet } from "react-native-unistyles";
import { z } from "zod";
import { YStack } from "@/components/ui/YStack";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { toast } from "@/libs/sonner";
import * as Clipboard from "expo-clipboard";

const schema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
});

export default function DetailGameScreen() {
  const user = useQuery(api.users.current);

  const { id } = useLocalSearchParams<{ id: Id<"rooms"> }>();

  const gameRoom = useQuery(
    api.games.getGameRoomById,
    id
      ? {
          id,
        }
      : "skip"
  );

  const copyToClipboard = async (text: string) => {
    await Clipboard.setStringAsync(text);
    toast.success("Copied game code to clipboard");
  };

  const handleJoinGame = () => {
    console.log("join game");
  };

  if (!gameRoom) return null;

  return (
    <>
      <Stack.Screen options={{ title: gameRoom.name }} />
      <YStack gap="sm" padding="lg" container>
        <XStack jc="spaceBetween" style={styles.header}>
          <Text variant="h1">{gameRoom.maxPlayers} players</Text>
          <XStack gap="md" ai="center">
            <Text variant="h1" color="primary" muted>
              {gameRoom.code}
            </Text>
            <Button size="sm" onPress={() => copyToClipboard(gameRoom.code)}>
              <Icons.copy size={16} color="white" />
            </Button>
          </XStack>
        </XStack>
        <YStack gap="md" ai="center">
          <Button onPress={handleJoinGame}>Join game</Button>
        </YStack>
      </YStack>
    </>
  );
}

const styles = StyleSheet.create((th, rt) => ({
  formContainer: {
    gap: th.gap(3),
  },
  header: {
    width: "100%",
  },
  input: {
    fontFamily: th.fontFamily.BodyRegular,
    padding: th.gap(3),
    borderRadius: th.borderRadius(2),
    backgroundColor: th.colors.background.base,
  },
}));
