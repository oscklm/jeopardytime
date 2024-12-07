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
import { Authenticated, Unauthenticated, useConvexAuth } from "convex/react";
import { clearStorage } from "@/storage";

const schema = z.object({
  email: z.string().min(1),
  password: z.string().min(1),
});

export default function SignInScreen() {
  console.log("SignInScreen");
  const { signIn, setActive, isLoaded } = useSignIn();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleResetStore = () => {
    clearStorage();
  };

  const onSubmit = async (values: z.infer<typeof schema>) => {
    if (!isLoaded) return;

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: values.email,
        password: values.password,
      });

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      console.error(JSON.stringify(err, null, 2));

      // for more info on error handling
      if (isClerkAPIResponseError(err)) {
        const errors = err.errors;
        if (errors[0].code === "form_param_format_invalid") {
          form.setError("email", {
            message: "Invalid email",
          });
        }
        if (errors[0].code === "form_identifier_exists") {
          form.setError("email", {
            message: "Email already in use",
          });
        }
        if (errors[0].code === "form_identifier_not_found") {
          form.setError("email", {
            message: "Email not found",
          });
        }
        if (errors[0].code === "form_password_invalid") {
          form.setError("password", {
            message: "Invalid password",
          });
        }
      }
    }
  };

  return (
    <>
      <Authenticated>
        <Redirect href="/" />
      </Authenticated>
      <Unauthenticated>
        <YStack gap="sm" padding="lg" style={styles.container}>
          <Button onPress={handleResetStore}>Reset store</Button>
          <View>
            <Text>{isLoaded ? "Not loading..." : "Loading..."}</Text>
          </View>
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
