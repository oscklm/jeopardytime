import {
  Button,
  Text,
  Form,
  FormField,
  FormInput,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui";

import { useForm } from "react-hook-form";
import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { YStack } from "@/components/ui/YStack";

import { zodResolver } from "@hookform/resolvers/zod";

import { questionSchema } from "@/convex/schema";
import type { Doc } from "@/convex/_generated/dataModel";
import type { z } from "zod";

type QuestionFormValues = z.infer<typeof questionSchema>;

interface QuestionFormProps {
  defaultValues?: Doc<"questions">;
  onSubmitted: (values: QuestionFormValues) => void;
}

export const QuestionForm = ({
  defaultValues,
  onSubmitted,
}: QuestionFormProps) => {
  const form = useForm<QuestionFormValues>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      question: defaultValues?.question ?? "",
      answer: defaultValues?.answer ?? "",
      value: defaultValues?.value ?? 200,
      imageId: defaultValues?.imageId ?? null,
    },
  });

  return (
    <YStack gap="sm" padding="lg" container>
      <View>
        <Text variant="h1">Edit question</Text>
      </View>
      <Form {...form}>
        <FormField
          control={form.control}
          name="question"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Question</FormLabel>
              <FormInput style={{ height: 100 }} multiline {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="answer"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Answer</FormLabel>
              <FormInput style={{ height: 200 }} multiline {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <YStack gap="md" ai="center">
          <Button
            size="md"
            disabled={!form.formState.isValid || !form.formState.isDirty}
            onPress={form.handleSubmit(onSubmitted)}
          >
            Save
          </Button>
        </YStack>
      </Form>
    </YStack>
  );
};

const styles = StyleSheet.create((th, rt) => ({
  formContainer: {
    gap: th.gap(3),
  },
}));
