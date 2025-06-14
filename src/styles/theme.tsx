import { ThemeProvider as NavigationThemeProvider } from "@react-navigation/native";
import { withUnistyles } from "react-native-unistyles";
import colors from "./colors";
import { fonts } from "./fonts";
import type { UnistylesTheme } from "./types";

const lightTheme: UnistylesTheme = {
	colors: {
		primary: colors.accent,
		secondary: colors.secondary,
		accent: colors.accent,
		card: colors.white,
		success: colors.green,
		error: colors.red,
		warning: colors.yellow,
		info: colors.primaryMuted,
		background: colors.primary,
		text: colors.black,
		border: colors.accentMuted,
		notification: colors.white,
	},
	fonts,
};

const darkTheme: UnistylesTheme = {
	colors: {
		primary: colors.accent,
		secondary: colors.secondary,
		accent: colors.accent,
		success: colors.green,
		error: colors.red,
		warning: colors.yellow,
		info: colors.primaryMuted,
		background: colors.black,
		card: colors.gray,
		text: colors.white,
		border: colors.accentMuted,
		notification: colors.white,
	},
	fonts,
};

const UniThemeProvider = withUnistyles(NavigationThemeProvider, (_th, rt) => ({
	value:
		rt.colorScheme === "dark"
			? {
					dark: true,
					...darkTheme,
				}
			: {
					dark: false,
					...lightTheme,
				},
}));

export { UniThemeProvider, lightTheme, darkTheme };
