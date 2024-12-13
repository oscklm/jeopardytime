import { Button, Text } from "@/components/ui";
import {
  Form,
  FormField,
  FormInput,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { router } from "expo-router";
import {
  type Control,
  useForm,
  FormProvider,
  useFormContext,
} from "react-hook-form";
import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { YStack } from "@/components/ui/YStack";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

const categorySchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  questions: z.array(
    z.object({
      id: z.string(),
      question: z.string().min(1),
      answer: z.string().min(1),
      value: z.number().min(100),
      imageId: z.string().nullable(),
    })
  ),
});

const schema = z.object({
  name: z.string().min(1),
  isPublic: z.boolean().default(false),
  categories: z.array(categorySchema).min(1),
});

export default function CreateGameBoardScreen() {
  const user = useQuery(api.users.current);

  const createGameBoard = useMutation(api.gameBoards.createGameBoard);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      isPublic: false,
      categories: [
        {
          id: "1",
          name: "Category 1",
          questions: [],
        },
      ],
    },
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    if (!user) return;

    try {
      await createGameBoard({
        values: {
          ...values,
          timesPlayed: 0,
        },
      });
      router.back();
    } catch (error) {
      console.error(error);
    }
  };

  const categories = form.watch("categories");

  const addCategory = () => {
    const currentCategories = form.getValues("categories");
    form.setValue("categories", [
      ...currentCategories,
      {
        id: `category-${currentCategories.length}`,
        name: `Category ${currentCategories.length}`,
        questions: [],
      },
    ]);
  };

  const removeCategory = (index: number) => {
    const currentCategories = form.getValues("categories");
    form.setValue(
      "categories",
      currentCategories.filter((_, i) => i !== index)
    );
  };

  return (
    <YStack gap="sm" padding="lg" container>
      <View>
        <Text variant="h1">Create new board</Text>
        <Text variant="caption" muted>
          Create new custom board with your own questions
        </Text>
      </View>
      <FormProvider {...form}>
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

          {/* Categories Section */}
          <YStack gap="md">
            <View style={styles.categoriesHeader}>
              <Text variant="h2">Categories</Text>
              <Button size="sm" onPress={addCategory}>
                Add Category
              </Button>
            </View>

            {categories.map((category, index) => (
              <CategoryForm
                key={category.id}
                index={index}
                control={form.control}
                onRemove={() => removeCategory(index)}
              />
            ))}
          </YStack>
        </Form>
      </FormProvider>

      <YStack gap="md" ai="center">
        <Button size="md" onPress={form.handleSubmit(onSubmit)}>
          Create
        </Button>
      </YStack>
    </YStack>
  );
}

interface CategoryFormProps {
  index: number;
  control: Control<z.infer<typeof schema>>;
  onRemove: () => void;
}

const CategoryForm = ({ index, control, onRemove }: CategoryFormProps) => {
  const form = useFormContext<z.infer<typeof schema>>();

  const addQuestion = () => {
    const currentQuestions = form.getValues(`categories.${index}.questions`);
    const questionPosition = currentQuestions.length;
    const value = (questionPosition + 1) * 200;

    form.setValue(`categories.${index}.questions`, [
      ...currentQuestions,
      {
        id: `category-${index}-question-${questionPosition}`,
        question: "",
        answer: "",
        value,
        imageId: null,
      },
    ]);
  };

  const removeQuestion = (questionIndex: number) => {
    const currentQuestions = form.getValues(`categories.${index}.questions`);
    form.setValue(
      `categories.${index}.questions`,
      currentQuestions.filter((_, i) => i !== questionIndex)
    );
  };

  return (
    <YStack gap="sm" style={styles.categoryContainer}>
      <View style={styles.categoryHeader}>
        <FormField
          control={control}
          name={`categories.${index}.name`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category Name</FormLabel>
              <FormInput {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <Button size="sm" variant="ghost" onPress={onRemove}>
          Remove
        </Button>
      </View>

      <YStack gap="sm">
        <View style={styles.categoriesHeader}>
          <Text variant="h3">Questions</Text>
          <Button size="sm" onPress={addQuestion}>
            Add Question
          </Button>
        </View>

        <FormField
          control={control}
          name={`categories.${index}.questions`}
          render={({ field }) => (
            <YStack gap="sm">
              {field.value.map((question, questionIndex) => (
                <YStack
                  key={question.id}
                  gap="sm"
                  style={styles.questionContainer}
                >
                  <View style={styles.questionHeader}>
                    <Text>
                      Question {questionIndex + 1} - $
                      {(questionIndex + 1) * 200}
                    </Text>
                    <Button
                      size="sm"
                      variant="ghost"
                      onPress={() => removeQuestion(questionIndex)}
                    >
                      Remove
                    </Button>
                  </View>

                  <FormField
                    control={control}
                    name={`categories.${index}.questions.${questionIndex}.question`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Question</FormLabel>
                        <FormInput {...field} />
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name={`categories.${index}.questions.${questionIndex}.answer`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Answer</FormLabel>
                        <FormInput {...field} />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </YStack>
              ))}
            </YStack>
          )}
        />
      </YStack>
    </YStack>
  );
};

const styles = StyleSheet.create((th, rt) => ({
  formContainer: {
    gap: th.gap(3),
  },
  pickerItemPlaceholder: {
    color: th.colors.foreground.base,
  },
  picker: {
    padding: th.gap(3),
    borderWidth: 2,
    borderColor: th.colors.background.dark,
    borderRadius: th.borderRadius(2),
    backgroundColor: th.colors.background.light,
  },
  pickerItem: {
    fontFamily: th.fontFamily.BodySemiBold,
    fontSize: th.fontSize(1.25),
  },
  input: {
    fontFamily: th.fontFamily.BodyRegular,
    padding: th.gap(3),
    borderRadius: th.borderRadius(2),
    backgroundColor: th.colors.background.base,
  },
  categoriesHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: th.gap(2),
  },
  categoryContainer: {
    padding: th.gap(3),
    backgroundColor: th.colors.background.light,
    borderRadius: th.borderRadius(2),
  },
  categoryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: th.gap(2),
  },
  questionContainer: {
    padding: th.gap(2),
    backgroundColor: th.colors.background.base,
    borderRadius: th.borderRadius(2),
  },
  questionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));
