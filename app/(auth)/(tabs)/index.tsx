import { ScrollView, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import * as Clipboard from "expo-clipboard";
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
import { toast } from "@/libs/sonner";

import { formatDistanceToNow } from "date-fns";

export default function HomeScreen() {
  const gameRooms = useQuery(api.games.getAllGameRooms);

  if (gameRooms === undefined) return null;

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Button onPress={() => router.push("/uploader")}>Upload</Button>
        <XStack ai="center" jc="spaceBetween">
          <XStack ai="center" gap="md">
            <Icons.logo size={28} color={styles.logo.color} />
            <Text variant="h1">
              Games <Text muted>({gameRooms.length})</Text>
            </Text>
          </XStack>
          <XStack gap="md">
            <Button size="sm" onPress={() => router.push("/games/create")}>
              <Icons.plus size={20} color="white" />
            </Button>
          </XStack>
        </XStack>
        <Spacer />
        <YStack gap="lg">
          {gameRooms.map((game) => (
            <TouchableOpacity
              key={game._id}
              onPress={() => router.push(`/games/${game._id}`)}
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
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create((th, rt) => ({
  container: {
    flex: 1,
    paddingTop: rt.insets.top,
    padding: th.gap(3),
  },
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
