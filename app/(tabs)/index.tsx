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

export default function HomeScreen() {
  const { games, totalGames } = useGameStore();

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.container}>
        <XStack ai="center" jc="spaceBetween">
          <Text variant="h1">
            Games <Text muted>({totalGames})</Text>
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
          {games.map((game) => (
            <Card key={game.id}>
              <View>
                <XStack ai="center" jc="spaceBetween">
                  <Text variant="h2">{game.title}</Text>
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>
                      {game.sessions} players
                    </Text>
                  </View>
                </XStack>
                <Text variant="caption" muted>
                  {formatDistanceToNow(game.createdAt)} • {game.sessions} play
                  sessions
                </Text>
                <Text muted>{game.description}</Text>
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
