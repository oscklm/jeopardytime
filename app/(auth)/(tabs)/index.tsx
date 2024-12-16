import { ScrollView, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import { StyleSheet } from "react-native-unistyles";

import {
  Button,
  Text,
  Card,
  Spacer,
  YStack,
  XStack,
  Icons,
} from "@/components/ui";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

import { formatDistanceToNow } from "date-fns";
import * as Clipboard from "expo-clipboard";
import { toast } from "@/libs/sonner";

export default function HomeScreen() {
  const gameRooms = useQuery(api.games.getAllGameRooms);

  if (gameRooms === undefined) return null;

  const handleCopyCode = async (text: string) => {
    await Clipboard.setStringAsync(text);
    toast.success(`Copied "${text}" to clipboard`);
  };

  return (
    <YStack padding="md" container>
      <ScrollView style={{ flex: 1 }}>
        <XStack ai="center" jc="spaceBetween">
          <XStack ai="center" gap="md">
            <Icons.logo size={28} color={styles.logo.color} strokeWidth={2.5} />
            <Text variant="h1">
              Rooms <Text muted>({gameRooms.length})</Text>
            </Text>
          </XStack>
          <XStack gap="md">
            <Button size="sm" onPress={() => router.push("/rooms/create")}>
              <Icons.plus size={20} color="white" />
            </Button>
          </XStack>
        </XStack>
        <Spacer />
        <YStack gap="md">
          <XStack gap="sm" ai="center">
            <Icons.info size={20} color="gray" />
            <Text variant="caption" muted>
              Long press on a card to copy the room code.
            </Text>
          </XStack>
          {gameRooms.map((game) => (
            <TouchableOpacity
              key={game._id}
              onLongPress={() => handleCopyCode(game.code)}
              onPress={() => router.push(`/rooms/${game._id}`)}
            >
              <Card key={game._id}>
                <View>
                  <XStack ai="center" jc="spaceBetween">
                    <Text variant="h2">{game.name}</Text>
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>
                        {game.maxPlayers} players
                      </Text>
                    </View>
                  </XStack>
                  <Text variant="caption" muted>
                    {formatDistanceToNow(game._creationTime)} •{" "}
                    {game.maxPlayers} players
                  </Text>
                  <Text muted>{game.code}</Text>
                </View>
              </Card>
            </TouchableOpacity>
          ))}
        </YStack>
      </ScrollView>
    </YStack>
  );
}

const styles = StyleSheet.create((th, rt) => ({
  logo: {
    color: th.colors.primary.base,
  },
  badge: {
    backgroundColor: th.colors.primary.base,
    padding: th.gap(1),
    paddingHorizontal: th.gap(3),
    borderRadius: th.borderRadius(4),
  },
  badgeText: {
    fontFamily: th.fontFamily.HeadingBlack,
    fontSize: th.fontSize(0.825),
    lineHeight: th.fontSize(0.825) * 1.3,
    color: th.colors.background.light,
  },
}));
