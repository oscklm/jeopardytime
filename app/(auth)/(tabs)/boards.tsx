import { FlatList, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { Button, Spacer, Icons, Text, XStack, YStack } from "@/components/ui";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { BoardCard } from "@/components/BoardCard";
import { ListItemSeperator } from "@/components/ListItemSeperator";
import { router } from "expo-router";

export default function BoardsTabScreen() {
  const boards = useQuery(api.boards.getAllBoardsByCurrentUser);

  return (
    <YStack padding="md" gap="none" container>
      <XStack ai="center" jc="spaceBetween">
        <XStack ai="center" gap="md">
          <Icons.list
            size={28}
            color={styles.iconColor.color}
            strokeWidth={2.5}
          />
          <Text variant="h1">Boards</Text>
        </XStack>
        <XStack gap="md">
          <Button size="sm" onPress={() => router.push("/boards/create")}>
            Create Board
          </Button>
        </XStack>
      </XStack>
      <Spacer />
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
  iconColor: {
    color: th.colors.primary.base,
  },
}));
