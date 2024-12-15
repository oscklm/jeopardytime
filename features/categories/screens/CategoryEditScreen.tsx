import { Text } from "@/components/ui";

import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { YStack } from "@/components/ui/YStack";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

import { useLocalSearchParams } from "expo-router/build/hooks";
import type { Id } from "@/convex/_generated/dataModel";
import { CategoryForm } from "@/features/categories/forms/CategoryForm";
import type { z } from "zod";
import type { categoryFormSchema } from "@/convex/schema";
import { router } from "expo-router";

import { toast } from "@/libs/sonner";

export default function CategoryEditScreen() {
  const { id } = useLocalSearchParams<{ id: Id<"categories"> }>();

  const updateCategory = useMutation(api.categories.updateCategoryById);

  const currentCategory = useQuery(
    api.categories.getCategoryById,
    id ? { id } : "skip"
  );

  const handleUpdateCategory = async (
    values: z.infer<typeof categoryFormSchema>
  ) => {
    await updateCategory({
      id,
      values,
    });
    router.back();
    setTimeout(() => {
      toast.success("Category updated.");
    }, 150);
  };

  if (currentCategory === undefined) return null;

  if (currentCategory === null) {
    return <Text>Category not found</Text>;
  }

  return (
    <YStack gap="sm" padding="lg" container>
      <View>
        <Text variant="h1">Edit category</Text>
      </View>
      <CategoryForm
        defaultValues={currentCategory}
        onSubmitted={handleUpdateCategory}
      />
    </YStack>
  );
}

const styles = StyleSheet.create((th, rt) => ({
  container: {
    gap: th.gap(3),
  },
}));
