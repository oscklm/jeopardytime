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
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

import type { z } from "zod";
import type { questionFormSchema } from "@/convex/schema";
import { router, useLocalSearchParams } from "expo-router";
import type { Id } from "@/convex/_generated/dataModel";
import { QuestionForm } from "@/features/questions/forms/QuestionForm";
import { toast } from "@/libs/sonner";
export default function QuestionCreateScreen() {
  const { categoryId } = useLocalSearchParams<{
    categoryId: Id<"categories">;
  }>();

  const createQuestion = useMutation(api.questions.createQuestion);

  const onSubmit = async (values: z.infer<typeof questionFormSchema>) => {
    try {
      await createQuestion({
        values,
        categoryId,
      });
      router.back();
      setTimeout(() => {
        toast.success("Question created");
      }, 100);
    } catch (error) {
      toast.error("Failed to create question");
    }
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <TouchableOpacity activeOpacity={1} onPress={Keyboard.dismiss}>
          <YStack gap="sm" padding="lg" container>
            <View>
              <Text variant="h1">Create question</Text>
            </View>
            <QuestionForm onSubmitted={onSubmit} />
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
