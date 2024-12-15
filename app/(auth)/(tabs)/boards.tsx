import { FlatList, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { Button, Text, XStack, YStack } from "@/components/ui";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { BoardCard } from "@/components/BoardCard";
import { ListItemSeperator } from "@/components/ListItemSeperator";
import { router } from "expo-router";
import { useEffect } from "react";

export default function BoardsTabScreen() {
  const boards = useQuery(api.boards.getAllBoardsByCurrentUser);
  useEffect(() => {
    console.log("Boards mounted");
    return () => {
      console.log("Boards unmounted");
    };
  }, []);

  return (
    <YStack padding="md" gap="md" container>
      <XStack gap="md" ai="center" jc="spaceBetween">
        <Text variant="h1">Boards</Text>
        <Button onPress={() => router.push("/boards/create")}>
          Create Board
        </Button>
      </XStack>
      <FlatList
        data={boards}
        ItemSeparatorComponent={() => <ListItemSeperator />}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push(`/boards/${item._id}`)}>
            <BoardCard board={item} />
          </TouchableOpacity>
        )}
      />
    </YStack>
  );
}

const styles = StyleSheet.create((th, rt) => ({
  container: {
    flex: 1,
  },
}));
