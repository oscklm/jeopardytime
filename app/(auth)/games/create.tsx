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
import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { YStack } from "@/components/ui/YStack";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

import { Picker } from "@react-native-picker/picker";
import type { Id } from "@/convex/_generated/dataModel";

const schema = z.object({
  title: z.string().min(1),
  gameBoardId: z.string().min(2, "Game board is required"),
});

export default function CreateGameScreen() {
  const user = useQuery(api.users.current);

  const gameBoards = useQuery(
    api.gameBoards.getGameBoardByUserId,
    user
      ? {
          userId: user._id,
        }
      : "skip"
  );

  const createGameRoom = useMutation(api.games.createGameRoom);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      gameBoardId: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    if (!user) return;
    try {
      await createGameRoom({
        name: values.title,
        gameBoardId: values.gameBoardId as Id<"gameBoards">,
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
          name="gameBoardId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Game board</FormLabel>
              <Picker
                mode="dropdown"
                style={styles.picker}
                itemStyle={styles.pickerItem}
                selectedValue={field.value}
                onValueChange={field.onChange}
              >
                <Picker.Item
                  color={styles.pickerItemPlaceholder.color}
                  label="Select a game board"
                  value=""
                />
                {gameBoards?.map((gameBoard) => (
                  <Picker.Item
                    key={gameBoard._id}
                    label={gameBoard.name}
                    value={gameBoard._id}
                  />
                ))}
              </Picker>
              <FormMessage />
            </FormItem>
          )}
        />
      </Form>
      <YStack gap="md" ai="center">
        <Button size="md" onPress={form.handleSubmit(onSubmit)}>
          Create
        </Button>
      </YStack>
    </YStack>
  );
}

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
}));
