import { Stack } from "expo-router";
import UserProvider from "@/providers/user-provider";

export default function RootLayout() {
	return (
		<UserProvider>
			<Stack>
				<Stack.Screen
					name="(tabs)"
					options={{
						headerShown: false,
						title: "Back",
					}}
				/>
				<Stack.Screen
					name="settings"
					options={{
						title: "Settings",
						presentation: "modal",
					}}
				/>
				<Stack.Screen
					name="background-task"
					options={{
						title: "Background Task",
						presentation: "modal",
					}}
				/>
			</Stack>
		</UserProvider>
	);
}
