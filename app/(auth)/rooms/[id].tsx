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
  const { id } = useLocalSearchParams<{ id: Id<"games"> }>();

  const gameRoom = useQuery(
    api.games.getRoomById,
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
      <YStack gap="sm" pd="lg" container>
        <YStack>
          <XStack jc="space-between" style={styles.header}>
            <Text variant="h1">{gameRoom.maxPlayers} players</Text>
            <XStack gap="md" ai="center">
              <Text variant="h1" color="primary" muted>
                {gameRoom.code}
              </Text>
              <Button
                size="sm"
                icon="copy"
                onPress={() => copyToClipboard(gameRoom.code)}
              />
            </XStack>
          </XStack>
        </YStack>
        <XStack pd="md">
          <Button onPress={handleJoinGame}>Join game</Button>
        </XStack>
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
