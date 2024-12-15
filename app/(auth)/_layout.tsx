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
      <Stack.Screen
        name="(tabs)"
        options={{ title: "Home", headerShown: false }}
      />

      <Stack.Screen
        name="rooms/[id]"
        options={{
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="rooms/create"
        options={{
          title: "New room",
          presentation: "modal",
        }}
      />

      <Stack.Screen
        name="boards/[id]"
        options={{
          title: "Board",
        }}
      />
      <Stack.Screen
        name="boards/create"
        options={{
          title: "New board",
          headerTitle: "qwd",
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="boards/edit"
        options={{ title: "Edit board", presentation: "modal" }}
      />

      <Stack.Screen
        name="categories/create"
        options={{ title: "New category", presentation: "modal" }}
      />
      <Stack.Screen
        name="categories/edit"
        options={{ title: "Edit category" }}
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
