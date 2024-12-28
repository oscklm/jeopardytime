import {
  Button,
  Form,
  FormField,
  FormInput,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui";

import { useForm } from "react-hook-form";
import { StyleSheet } from "react-native-unistyles";
import { YStack } from "@/components/ui/YStack";

import { zodResolver } from "@hookform/resolvers/zod";
import { boardFormSchema } from "@/convex/schema";
import type { z } from "zod";
import type { Doc } from "@/convex/_generated/dataModel";
import { TouchableWithoutFeedback } from "react-native";

type BoardFormValues = z.infer<typeof boardFormSchema>;

interface BoardFormProps {
  defaultValues?: Doc<"boards">;
  onSubmitted: (values: BoardFormValues) => void;
}

export const BoardForm = ({ defaultValues, onSubmitted }: BoardFormProps) => {
  const form = useForm<BoardFormValues>({
    resolver: zodResolver(boardFormSchema),
    defaultValues: {
      name: defaultValues?.name ?? "",
      isPublic: defaultValues?.isPublic ?? false,
    },
  });

  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Board name</FormLabel>
            <FormInput {...field} />
            <FormMessage />
          </FormItem>
        )}
      />
      <YStack gap="md">
        <Button
          size="md"
          disabled={!form.formState.isValid || !form.formState.isDirty}
          onPress={form.handleSubmit(onSubmitted)}
        >
          Submit
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
