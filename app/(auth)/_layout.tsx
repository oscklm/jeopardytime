import { Stack } from "expo-router";
import { useConvexAuth } from "convex/react";
import { Redirect } from "expo-router";
import { NavigationHeader } from "@/components/NavigationHeader";

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
        header: (options) => <NavigationHeader {...options} />,
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
          presentation: "formSheet",
          sheetGrabberVisible: true,
          sheetAllowedDetents: "fitToContents",
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
          presentation: "formSheet",
          sheetGrabberVisible: true,
          sheetAllowedDetents: "fitToContents",
        }}
      />
      <Stack.Screen
        name="boards/edit"
        options={{
          title: "Edit board",
          presentation: "formSheet",
          sheetGrabberVisible: true,
          sheetAllowedDetents: "fitToContents",
        }}
      />

      <Stack.Screen
        name="categories/create"
        options={{
          title: "New category",
          presentation: "formSheet",
          sheetGrabberVisible: true,
          sheetAllowedDetents: "fitToContents",
        }}
      />

      <Stack.Screen name="categories/[id]" options={{ title: "Category" }} />

      <Stack.Screen
        name="categories/edit"
        options={{
          title: "Edit category",
          presentation: "formSheet",
          sheetGrabberVisible: true,
          sheetAllowedDetents: "fitToContents",
        }}
      />
      <Stack.Screen
        name="questions/edit"
        options={{
          title: "Edit question",
          presentation: "formSheet",
          sheetGrabberVisible: true,
          sheetAllowedDetents: "fitToContents",
        }}
      />

      <Stack.Screen
        name="questions/create"
        options={{
          title: "New question",
          presentation: "formSheet",
          sheetGrabberVisible: true,
          sheetAllowedDetents: "fitToContents",
        }}
      />
    </Stack>
  );
}
