import { Text } from "@/components/ui";

import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { YStack } from "@/components/ui/YStack";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

import { useLocalSearchParams } from "expo-router/build/hooks";
import type { Id } from "@/convex/_generated/dataModel";
import type { z } from "zod";
import type { questionSchema } from "@/convex/schema";
import { QuestionForm } from "@/features/questions/forms/QuestionForm";

export default function QuestionEditScreen() {
  const { id } = useLocalSearchParams<{ id: Id<"questions"> }>();

  const updateQuestion = useMutation(api.questions.updateQuestionById);

  const currentQuestion = useQuery(
    api.questions.getQuestionById,
    id ? { id } : "skip"
  );

  const handleUpdateQuestion = async (
    values: z.infer<typeof questionSchema>
  ) => {
    await updateQuestion({
      id,
      values,
    });
  };

  if (currentQuestion === undefined) return null;

  if (currentQuestion === null) {
    return <Text>Question not found</Text>;
  }

  return (
    <YStack gap="sm" padding="lg" container>
      <View>
        <Text variant="h1">Edit question</Text>
      </View>
      <QuestionForm
        defaultValues={currentQuestion}
        onSubmitted={handleUpdateQuestion}
      />
    </YStack>
  );
}

const styles = StyleSheet.create((th, rt) => ({
  container: {
    gap: th.gap(3),
  },
}));
