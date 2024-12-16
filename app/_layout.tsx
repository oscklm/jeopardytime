import {
  useFonts,
  Nunito_400Regular,
  Nunito_600SemiBold,
  Nunito_700Bold,
} from "@expo-google-fonts/nunito";
import { Roboto_700Bold, Roboto_900Black } from "@expo-google-fonts/roboto";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import ConvexClerkProvider from "@/components/ConvexClerkProvider";
import { Devtools } from "stan-js-devtools";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import "react-native-reanimated";

import { Toaster } from "@/libs/sonner";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    Nunito_400Regular,
    Nunito_700Bold,
    Nunito_600SemiBold,
    Roboto_700Bold,
    Roboto_900Black,
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView>
      <ConvexClerkProvider>
        <View style={styles.container}>
          <BottomSheetModalProvider>
            <Stack>
              <Stack.Screen name="(auth)" options={{ headerShown: false }} />
              <Stack.Screen
                name="sign-in"
                options={{
                  title: "Sign in",
                  gestureEnabled: false,
                  animation: "fade",
                }}
              />
              <Stack.Screen name="+not-found" />
            </Stack>
          </BottomSheetModalProvider>
          <Toaster position="top-center" />
          <StatusBar style="auto" />
        </View>
      </ConvexClerkProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create((th, rt) => ({
  container: {
    flex: 1,
    backgroundColor: th.colors.background.base,
  },
}));
