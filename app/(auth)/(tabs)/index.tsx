import { ScrollView, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { Button, Text } from "@/components/ui";
import { Card } from "@/components/ui/Card";
import { router } from "expo-router";
import { useGameStore, reset } from "@/stores/gameStore";
import { YStack } from "@/components/ui/YStack";
import { XStack } from "@/components/ui/XStack";
import { formatDistanceToNow } from "date-fns";
import { Spacer } from "@/components/ui/Spacer";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

export default function HomeScreen() {
  const { games, totalGames } = useGameStore();

  const gameRooms = useQuery(api.games.getAllGameRooms);

  if (gameRooms === undefined) return null;

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.container}>
        <XStack ai="center" jc="spaceBetween">
          <Text variant="h1">
            Games <Text muted>({gameRooms.length})</Text>
          </Text>
          <XStack gap="md">
            <Button size="sm" onPress={() => reset()}>
              <IconSymbol size={20} name="trash.fill" color="white" />
            </Button>
            <Button size="sm" onPress={() => router.push("/games/create")}>
              <IconSymbol size={20} name="play.circle" color="white" />
            </Button>
          </XStack>
        </XStack>
        <Spacer />
        <YStack gap="lg">
          {gameRooms.map((game) => (
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
                  {formatDistanceToNow(game._creationTime)} • {game.maxPlayers}{" "}
                  players
                </Text>
                <Text muted>{game.code}</Text>
              </View>
            </Card>
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
