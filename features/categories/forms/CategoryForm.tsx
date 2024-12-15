import {
  Button,
  Form,
  FormField,
  FormInput,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui";

import { StyleSheet } from "react-native-unistyles";
import { useForm } from "react-hook-form";
import { YStack } from "@/components/ui/YStack";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Doc } from "@/convex/_generated/dataModel";
import { categoryFormSchema } from "@/convex/schema";
import type { z } from "zod";

type CategoryFormValues = z.infer<typeof categoryFormSchema>;

interface CategoryFormProps {
  defaultValues?: Doc<"categories">;
  onSubmitted: (values: CategoryFormValues) => void;
}

export const CategoryForm = ({
  defaultValues,
  onSubmitted,
}: CategoryFormProps) => {
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues,
  });

  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Category name</FormLabel>
            <FormInput autoComplete="off" {...field} />
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormInput
              autoComplete="off"
              style={{ height: 100 }}
              multiline
              {...field}
            />
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
