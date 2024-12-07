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
import { useForm } from "react-hook-form";
import { TextInput, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { YStack } from "@/components/ui/YStack";
import { useGameStore } from "@/stores/gameStore";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

const schema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
});

export default function CreateGameScreen() {
  const { setGames } = useGameStore();

  const user = useQuery(api.users.current);

  const createGameRoom = useMutation(api.games.createGameRoom);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    if (!user) return;
    try {
      await createGameRoom({
        name: values.title,
        userId: user._id,
      });
      router.back();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <YStack gap="sm" padding="lg" container>
      <View>
        <Text variant="h1">Create new game</Text>
        <Text variant="caption" muted>
          Create new custom game with your own board and questions
        </Text>
      </View>
      <Form {...form}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel />
              <FormInput {...field} />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel />
              <FormInput {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
      </Form>
      <YStack gap="md" ai="center">
        <Button onPress={form.handleSubmit(onSubmit)}>Create game</Button>
      </YStack>
    </YStack>
  );
}

const styles = StyleSheet.create((th, rt) => ({
  formContainer: {
    gap: th.gap(3),
  },
  input: {
    fontFamily: th.fontFamily.BodyRegular,
    padding: th.gap(3),
    borderRadius: th.borderRadius(2),
    backgroundColor: th.colors.background.base,
  },
}));
