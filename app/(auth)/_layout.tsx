import { Stack } from "expo-router";
import { useConvexAuth } from "convex/react";
import { Redirect } from "expo-router";

export default function AuthLayout() {
  const { isAuthenticated, isLoading } = useConvexAuth();

  if (isLoading) {
    return null;
  }

  if (!isAuthenticated) {
    return <Redirect href="/sign-in" />;
  }

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#f6f7f9" },
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="games/create"
        options={{
          title: "New game",
          presentation: "modal",
        }}
      />
      <Stack.Screen name="boards/edit" />
      <Stack.Screen
        name="games/[id]"
        options={{
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="uploader"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
