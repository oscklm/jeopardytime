import { Text } from "@/components/ui";

import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { YStack } from "@/components/ui/YStack";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

import { BoardForm } from "@/features/boards/forms/BoardForm";
import type { z } from "zod";
import type { boardFormSchema } from "@/convex/schema";
import { router } from "expo-router";

export default function BoardCreateScreen() {
  const createBoard = useMutation(api.boards.createBoard);

  const onSubmit = async (values: z.infer<typeof boardFormSchema>) => {
    await createBoard({
      values,
    });
    router.back();
  };

  return (
    <YStack gap="sm" padding="lg" container>
      <View>
        <Text variant="h1">Create board</Text>
      </View>
      <BoardForm onSubmitted={onSubmit} />
    </YStack>
  );
}

const styles = StyleSheet.create((th, rt) => ({
  container: {
    gap: th.gap(3),
  },
}));