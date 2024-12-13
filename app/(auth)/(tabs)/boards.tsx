import { Button, Card, Text, YStack } from "@/components/ui";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { router } from "expo-router";
import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

export default function BoardsScreen() {
  const user = useQuery(api.users.current);

  const gameBoards = useQuery(
    api.gameBoards.getGameBoardByUserId,
    user?._id
      ? {
          userId: user._id,
        }
      : "skip"
  );

  return (
    <View style={styles.container}>
      <YStack gap="md" padding="md">
        <Button onPress={() => router.push("/boards/edit")}>
          Create new board
        </Button>
        {gameBoards?.map((gameBoard) => (
          <Card key={gameBoard._id}>
            <Text>{gameBoard.name}</Text>
          </Card>
        ))}
      </YStack>
    </View>
  );
}

const styles = StyleSheet.create((th, rt) => ({
  container: {
    flex: 1,
  },
}));
