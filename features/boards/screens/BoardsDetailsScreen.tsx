import { FlatList, TouchableOpacity, View } from "react-native";

import { StyleSheet } from "react-native-unistyles";
import { Button, Icons, Spacer, Text, XStack, YStack } from "@/components/ui";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { ListItemSeperator } from "@/components/ListItemSeperator";
import { router, useLocalSearchParams } from "expo-router";
import type { Id } from "@/convex/_generated/dataModel";
import { CategoryCard } from "@/components/CategoryCard";
import { LoadingView } from "@/components/LoadingView";

export default function BoardsDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: Id<"boards"> }>();

  const board = useQuery(api.boards.getBoardById, id ? { id } : "skip");

  const categories = useQuery(api.boards.getAllBoardCategories, { id });

  if (categories === undefined || board === undefined) return <LoadingView />;

  return (
    <YStack padding="md" container>
      <XStack gap="md" ai="center" jc="spaceBetween">
        <XStack gap="sm" ai="center" jc="center">
          <Icons.list size={28} color="black" strokeWidth={2.5} />
          <Text variant="h1">{board?.name}</Text>
        </XStack>
        <Button onPress={() => router.push(`/boards/edit?id=${id}`)}>
          Edit
        </Button>
      </XStack>
      <Spacer />
      <YStack gap="md">
        <XStack jc="spaceBetween" ai="center">
          <Text variant="h2">Categories</Text>
          <Button
            size="sm"
            onPress={() => router.push(`/categories/create?boardId=${id}`)}
          >
            <Icons.plus size={20} color="white" />
          </Button>
        </XStack>
        {categories && categories.length === 0 ? (
          <YStack padding="md" ai="center">
            <Text>No categories found</Text>
          </YStack>
        ) : (
          <FlatList
            data={categories}
            ItemSeparatorComponent={() => <ListItemSeperator />}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => router.push(`/categories/${item._id}`)}
              >
                <CategoryCard category={item} />
              </TouchableOpacity>
            )}
          />
        )}
      </YStack>
    </YStack>
  );
}

const styles = StyleSheet.create((th, rt) => ({
  container: {
    flex: 1,
  },
}));
