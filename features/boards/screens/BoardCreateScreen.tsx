import { Text } from "@/components/ui";

import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { YStack } from "@/components/ui/YStack";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

import { BoardForm } from "@/features/boards/forms/BoardForm";
import type { z } from "zod";
import type { boardFormSchema } from "@/convex/schema";
import { router } from "expo-router";

export default function BoardCreateScreen() {
  const createBoard = useMutation(api.boards.createBoard);

  const onSubmit = async (values: z.infer<typeof boardFormSchema>) => {
    const boardId = await createBoard({
      values,
    });
    router.replace(`/boards/${boardId}`);
  };

  return (
    <YStack gap="md" pd="lg" container>
      <BoardForm onSubmitted={onSubmit} />
    </YStack>
  );
}

const styles = StyleSheet.create((th, rt) => ({
  container: {
    gap: th.gap(3),
  },
}));
