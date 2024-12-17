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
import { FlashList } from "@shopify/flash-list";

export default function HomeScreen() {
  const games = useQuery(api.games.getAllRooms);

  if (games === undefined) return null;

  const handleCopyCode = async (text: string) => {
    await Clipboard.setStringAsync(text);
    toast.success(`Copied "${text}" to clipboard`);
  };

  return (
    <YStack container>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        <YStack>
          <Button>Test Button</Button>
        </YStack>
        <XStack ai="center" jc="space-between">
          <XStack ai="center" gap="md">
            <Text variant="h1">Home</Text>
          </XStack>
        </XStack>
        <Spacer />
        <YStack gap="md">
          <XStack ai="center" gap="sm">
            <Icons.trophy
              size={20}
              strokeWidth={2.5}
              color={styles.trophyIconColor.color}
            />
            <Text variant="h2" uppercase>
              Top boards
            </Text>
          </XStack>
          <XStack gap="md" jc="space-between" pd="sm">
            {Array.from({ length: 3 }).map((_, index) => (
              <Card key={`board-${index + 1}`}>
                <View style={{ height: 150 }}>
                  <Text variant="h2">Board {index + 1}</Text>
                </View>
              </Card>
            ))}
          </XStack>

          <Text variant="h2">Your games</Text>
          <FlashList
            data={games}
            estimatedItemSize={150}
            renderItem={({ item: game }) => (
              <TouchableOpacity
                key={game._id}
                onLongPress={() => handleCopyCode(game.code)}
                onPress={() => router.push(`/rooms/${game._id}`)}
              >
                <Card key={game._id}>
                  <View>
                    <XStack ai="center" jc="space-between">
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
            )}
          />
        </YStack>
      </ScrollView>
    </YStack>
  );
}

const styles = StyleSheet.create((th, rt) => ({
  logo: {
    color: th.colors.primary.base,
  },
  trophyIconColor: {
    color: th.colors.foreground.base,
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
