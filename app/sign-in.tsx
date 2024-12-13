import { Button, Text } from "@/components/ui";

import {
  Form,
  FormField,
  FormInput,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";

import { Redirect } from "expo-router";
import { useForm } from "react-hook-form";
import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { YStack } from "@/components/ui/YStack";
import { isClerkAPIResponseError, useSignIn } from "@clerk/clerk-expo";
import { Authenticated, Unauthenticated } from "convex/react";

import { toast } from "@/libs/sonner";

const schema = z.object({
  email: z.string().min(1, { message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export default function SignInScreen() {
  const { signIn, setActive, isLoaded } = useSignIn();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSignIn = async (identifier: string, password: string) => {
    if (!isLoaded) return;

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier,
        password,
      });

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === "complete") {
        toast.promise(setActive({ session: signInAttempt.createdSessionId }), {
          loading: "Signing in...",
          success: () => "Signed in successfully",
          error: "Error signing in",
        });
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      if (isClerkAPIResponseError(err)) {
        const errors = err.errors;
        toast.error(errors[0].message);
      }
    }
  };

  const onSubmit = async (values: z.infer<typeof schema>) => {
    // Format the values
    const identifier = values.email.trim().toLowerCase();
    const password = values.password.trim();

    await handleSignIn(identifier, password);
  };

  return (
    <>
      <Authenticated>
        <Redirect href="/" />
      </Authenticated>
      <Unauthenticated>
        <YStack gap="sm" padding="lg" container>
          <View>
            <Text variant="h1">Sign in</Text>
            <Text variant="caption" muted>
              Sign in to your account
            </Text>
          </View>
          <Form {...form}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel />
                  <FormInput {...field} autoCapitalize="none" />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel />
                  <FormInput {...field} secureTextEntry />
                  <FormMessage />
                </FormItem>
              )}
            />
          </Form>
          <YStack gap="md" ai="center">
            <Button onPress={form.handleSubmit(onSubmit)}>Sign in</Button>
          </YStack>
        </YStack>
      </Unauthenticated>
    </>
  );
}

const styles = StyleSheet.create((th, rt) => ({
  container: {
    paddingTop: rt.insets.top,
  },
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
