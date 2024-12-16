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
import { Keyboard, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { YStack } from "@/components/ui/YStack";

import { zodResolver } from "@hookform/resolvers/zod";

import { questionFormSchema } from "@/convex/schema";
import type { Doc } from "@/convex/_generated/dataModel";
import type { z } from "zod";

type QuestionFormValues = z.infer<typeof questionFormSchema>;

interface QuestionFormProps {
  defaultValues?: Doc<"questions">;
  onSubmitted: (values: QuestionFormValues) => void;
}

export const QuestionForm = ({
  defaultValues,
  onSubmitted,
}: QuestionFormProps) => {
  const form = useForm<QuestionFormValues>({
    resolver: zodResolver(questionFormSchema),
    defaultValues: {
      question: defaultValues?.question ?? "",
      answer: defaultValues?.answer ?? "",
      value: defaultValues?.value ?? 200,
      imageId: defaultValues?.imageId ?? null,
    },
  });

  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="question"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Question</FormLabel>
            <FormInput style={{ height: 80 }} multiline {...field} />
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
            <FormInput
              style={{ height: 150 }}
              multiline
              {...field}
              onSubmitEditing={Keyboard.dismiss}
            />
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
  );
};

const styles = StyleSheet.create((th, rt) => ({
  formContainer: {
    gap: th.gap(3),
  },
}));
