import { Text } from "@/components/ui";

import { ScrollView, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { YStack } from "@/components/ui/YStack";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

import { CategoryForm } from "@/features/categories/forms/CategoryForm";
import type { z } from "zod";
import type { categoryFormSchema } from "@/convex/schema";
import { router, useLocalSearchParams } from "expo-router";
import type { Id } from "@/convex/_generated/dataModel";

export default function CategoryCreateScreen() {
  const { boardId } = useLocalSearchParams<{ boardId: Id<"boards"> }>();

  const createCategory = useMutation(api.categories.createCategory);

  const onSubmit = async (values: z.infer<typeof categoryFormSchema>) => {
    await createCategory({
      values,
      boardId,
    });
    router.back();
  };

  return (
    <ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps="handled">
      <YStack gap="sm" pd="lg" container>
        <View>
          <Text variant="h1">Create category</Text>
        </View>
        <CategoryForm onSubmitted={onSubmit} />
      </YStack>
    </ScrollView>
  );
}
