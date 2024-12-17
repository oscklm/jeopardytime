import { FlatList, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { Button, Spacer, Icons, Text, XStack, YStack } from "@/components/ui";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { BoardCard } from "@/components/BoardCard";
import { ListItemSeperator } from "@/components/ListItemSeperator";
import { router } from "expo-router";
import { LoadingView } from "@/components/LoadingView";

export default function BoardsTabScreen() {
  const boards = useQuery(api.boards.getAllBoardsByCurrentUser);

  if (!boards) {
    return <LoadingView />;
  }

  return (
    <YStack pd="md" gap="none" container>
      <XStack ai="center" jc="space-between">
        <XStack ai="center" gap="md">
          <Text variant="h1">
            Boards <Text muted>({boards?.length})</Text>
          </Text>
        </XStack>
        <XStack gap="md">
          <Button
            size="sm"
            icon="plus"
            onPress={() => router.push("/boards/create")}
          />
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
