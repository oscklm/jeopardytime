import { FlatList, TouchableOpacity, View } from "react-native";

import { StyleSheet } from "react-native-unistyles";
import { Button, Icons, Spacer, Text, XStack, YStack } from "@/components/ui";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { ListItemSeperator } from "@/components/ListItemSeperator";
import { router, useLocalSearchParams } from "expo-router";
import type { Id } from "@/convex/_generated/dataModel";
import { QuestionCard } from "@/components/questions/QuestionCard";
import { LoadingView } from "@/components/LoadingView";

export default function CategoryDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: Id<"categories"> }>();

  const category = useQuery(
    api.categories.getCategoryById,
    id ? { id } : "skip"
  );

  const categories = useQuery(api.categories.getAllCategoryQuestions, { id });

  if (categories === undefined || category === undefined)
    return <LoadingView />;

  return (
    <YStack pd="md" container>
      <XStack gap="md" ai="center" jc="space-between">
        <XStack gap="sm" ai="center" jc="center">
          <Text variant="h1">{category?.name}</Text>
        </XStack>
        <Button onPress={() => router.push(`/categories/edit?id=${id}`)}>
          Edit
        </Button>
      </XStack>
      <Spacer />
      <YStack gap="md">
        <XStack jc="space-between" ai="center">
          <Text variant="h2">Questions</Text>
          <Button
            size="sm"
            onPress={() => router.push(`/questions/create?categoryId=${id}`)}
          >
            <Icons.plus size={20} color="white" />
          </Button>
        </XStack>
        {categories && categories.length === 0 ? (
          <YStack pd="md" ai="center">
            <Text>No questions found</Text>
          </YStack>
        ) : (
          <FlatList
            data={categories}
            ItemSeparatorComponent={() => <ListItemSeperator />}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => router.push(`/questions/edit?id=${item._id}`)}
              >
                <QuestionCard question={item} />
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
