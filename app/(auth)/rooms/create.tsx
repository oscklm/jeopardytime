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
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { YStack } from "@/components/ui/YStack";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

import { Picker } from "@react-native-picker/picker";
import type { Id } from "@/convex/_generated/dataModel";
import { roomFormSchema } from "@/convex/schema";

export default function CreateGameScreen() {
  const user = useQuery(api.users.current);

  const boards = useQuery(api.boards.getAllBoardsByCurrentUser);

  const createRoom = useMutation(api.games.createRoom);

  const form = useForm<z.infer<typeof roomFormSchema>>({
    resolver: zodResolver(roomFormSchema),
    defaultValues: {
      name: "",
      boardId: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof roomFormSchema>) => {
    if (!user) return;
    try {
      await createRoom({
        name: values.name,
        boardId: values.boardId as Id<"boards">,
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
        <Text variant="h1">Create new room</Text>
        <Text variant="caption" muted>
          Create new room to play with your friends, family or even strangers.
        </Text>
      </View>
      <Form {...form}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel />
              <FormInput {...field} />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="boardId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Board</FormLabel>
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
                {boards?.map((board) => (
                  <Picker.Item
                    key={board._id}
                    label={board.name}
                    value={board._id}
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
          Submit
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
