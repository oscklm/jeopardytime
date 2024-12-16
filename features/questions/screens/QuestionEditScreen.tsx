import { Text } from "@/components/ui";

import {
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { YStack } from "@/components/ui/YStack";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

import { useLocalSearchParams } from "expo-router/build/hooks";
import type { Id } from "@/convex/_generated/dataModel";
import type { z } from "zod";
import type { questionFormSchema } from "@/convex/schema";
import { QuestionForm } from "@/features/questions/forms/QuestionForm";
import { LoadingView } from "@/components/LoadingView";
import { router } from "expo-router";
import { toast } from "@/libs/sonner";

export default function QuestionEditScreen() {
  const { id } = useLocalSearchParams<{ id: Id<"questions"> }>();

  const updateQuestion = useMutation(api.questions.updateQuestionById);

  const currentQuestion = useQuery(
    api.questions.getQuestionById,
    id ? { id } : "skip"
  );

  const handleUpdateQuestion = async (
    values: z.infer<typeof questionFormSchema>
  ) => {
    try {
      await updateQuestion({
        id,
        values,
      });
      router.back();
      setTimeout(() => {
        toast.success("Question updated");
      }, 100);
    } catch (error) {
      toast.error("Failed to update question");
    }
  };

  if (currentQuestion === undefined) return <LoadingView />;

  if (currentQuestion === null) {
    return <Text>Question not found</Text>;
  }

  return (
    <ScrollView style={{ flex: 1 }}>
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <TouchableOpacity activeOpacity={1} onPress={Keyboard.dismiss}>
          <YStack gap="sm" padding="lg" container>
            <View>
              <Text variant="h1">Edit question</Text>
            </View>
            <QuestionForm
              defaultValues={currentQuestion}
              onSubmitted={handleUpdateQuestion}
            />
          </YStack>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create((th, rt) => ({
  container: {
    gap: th.gap(3),
  },
}));
