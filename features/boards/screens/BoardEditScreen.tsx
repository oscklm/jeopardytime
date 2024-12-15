import { Text } from "@/components/ui";

import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { YStack } from "@/components/ui/YStack";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

import { useLocalSearchParams } from "expo-router/build/hooks";
import type { Id } from "@/convex/_generated/dataModel";
import { BoardForm } from "@/features/boards/forms/BoardForm";
import type { z } from "zod";
import type { boardFormSchema } from "@/convex/schema";
import { router } from "expo-router";
import { toast } from "@/libs/sonner";
export default function BoardEditScreen() {
  const { id } = useLocalSearchParams<{ id: Id<"boards"> }>();

  const updateBoard = useMutation(api.boards.updateBoardById);

  const currentBoard = useQuery(api.boards.getBoardById, id ? { id } : "skip");

  const handleUpdateBoard = async (values: z.infer<typeof boardFormSchema>) => {
    await updateBoard({
      id,
      values: {
        name: values.name,
        isPublic: values.isPublic,
      },
    });
    router.back();
    setTimeout(() => {
      toast.success("Board updated.");
    }, 150);
  };

  if (currentBoard === undefined) return null;

  if (currentBoard === null) {
    return <Text>Board not found</Text>;
  }

  return (
    <YStack gap="sm" padding="lg" container>
      <View>
        <Text variant="h1">Edit board</Text>
      </View>
      <BoardForm defaultValues={currentBoard} onSubmitted={handleUpdateBoard} />
    </YStack>
  );
}

const styles = StyleSheet.create((th, rt) => ({
  container: {
    gap: th.gap(3),
  },
}));
