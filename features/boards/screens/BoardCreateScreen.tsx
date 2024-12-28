import { YStack } from "@/components/ui/YStack";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

import { BoardForm } from "@/features/boards/forms/BoardForm";
import type { z } from "zod";
import type { boardFormSchema } from "@/convex/schema";
import { router } from "expo-router";
import { ScrollView } from "react-native";

export default function BoardCreateScreen() {
  const createBoard = useMutation(api.boards.createBoard);

  const onSubmit = async (values: z.infer<typeof boardFormSchema>) => {
    const boardId = await createBoard({
      values,
    });
    router.back();
  };

  return (
    <ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps="handled">
      <YStack gap="md" pd="lg" container>
        <BoardForm onSubmitted={onSubmit} />
      </YStack>
    </ScrollView>
  );
}
