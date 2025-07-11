import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HeaderButton, Text } from "@react-navigation/elements";
import {
	createStaticNavigation,
	type StaticParamList,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useConvexAuth } from "convex/react";
import { StyleSheet } from "react-native-unistyles";
import Button from "@/components/ui/Button";
import { GameScreen } from "@/features/game/screens/GameScreen";
import { UniThemeProvider } from "@/styles/theme";
import { Board } from "./screens/Board";
import { CreateBoard } from "./screens/CreateBoard";
import { CreateGame } from "./screens/CreateGame";
import { CreateTeam } from "./screens/CreateTeam";
import { Help } from "./screens/Help";
import { HomeTab } from "./screens/HomeTab";
import { NotFound } from "./screens/NotFound";
import { ProfileTab } from "./screens/ProfileTab";
import { PublicProfile } from "./screens/PublicProfile";
import { Scanner } from "./screens/Scanner";
import { Settings } from "./screens/Settings";
import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";
import { Welcome } from "./screens/Welcome";
import { CustomBottomTabHeader } from "./ui/CustomBottomTabHeader";

const styles = StyleSheet.create((th) => ({
	tabBarBadgeStyle: {
		color: th.colors.labelSecondary,
		backgroundColor: th.colors.yellow,
	},
}));

const BottomTabs = createBottomTabNavigator({
	screenOptions: {
		header: (props) => <CustomBottomTabHeader {...props} />,
	},
	screens: {
		Home: {
			screen: HomeTab,
			options: {
				title: "Home",
				tabBarIcon: ({ color, size }) => (
					<FontAwesome name="home" size={size} color={color} />
				),
				headerBgColor: "purple",
				toolbarItems: [
					<Button
						icon="qrcode"
						sensory="light"
						variant="icon"
						screen="Scanner"
					/>,
				],
			},
		},
		Profile: {
			screen: ProfileTab,
			options: {
				title: "Profile",
				tabBarLabel: "Profile",
				headerBgColor: "blue",
				tabBarIcon: ({ color, size }) => (
					<FontAwesome name="user" size={size} color={color} />
				),
				tabBarBadgeStyle: styles.tabBarBadgeStyle,
			},
		},
	},
});

const RootStack = createNativeStackNavigator({
	layout: ({ children }) => <UniThemeProvider>{children}</UniThemeProvider>,
	screenOptions: {
		headerBackButtonDisplayMode: "minimal",
	},
	screens: {
		BottomTabs: {
			if: () => useConvexAuth().isAuthenticated,
			screen: BottomTabs,
			options: {
				headerShown: false,
			},
		},
		Welcome: {
			if: () => !useConvexAuth().isAuthenticated,
			screen: Welcome,
			options: {
				title: "Welcome",
				headerShown: false,
			},
		},
		Game: {
			screen: GameScreen,
			options: {
				title: "Game",
			},
		},
		SignIn: {
			if: () => !useConvexAuth().isAuthenticated,
			screen: SignIn,
			options: {
				title: "Sign in",
			},
		},
		SignUp: {
			if: () => !useConvexAuth().isAuthenticated,
			screen: SignUp,
			options: {
				title: "Sign up",
			},
		},
		Profile: {
			screen: PublicProfile,
			options: {
				title: "Profile",
				presentation: "modal",
			},
			linking: {
				path: ":user(@[a-zA-Z0-9-_]+)",
				parse: {
					user: (value) => value.replace(/^@/, ""),
				},
				stringify: {
					user: (value) => `@${value}`,
				},
			},
		},
		Board: {
			screen: Board,
			linking: {
				path: ":boardId(^[a-z0-9]{32}$)",
			},
		},

		CreateBoard: {
			screen: CreateBoard,
			options: {
				title: "Create Board",
				presentation: "modal",
			},
		},
		CreateGame: {
			screen: CreateGame,
			options: {
				title: "Start game",
				presentation: "modal",
			},
		},
		CreateTeam: {
			screen: CreateTeam,
			options: {
				title: "Create Team",
				presentation: "modal",
			},
		},
		Settings: {
			screen: Settings,
			options: ({ navigation }) => ({
				presentation: "modal",
				headerRight: () => (
					<HeaderButton onPress={navigation.goBack}>
						<Text>Close</Text>
					</HeaderButton>
				),
			}),
		},
		Scanner: {
			screen: Scanner,
			options: {
				title: "Scanner",
				presentation: "modal",
				headerShown: false,
			},
		},
		Help: {
			screen: Help,
			options: {
				title: "Help",
			},
		},
		NotFound: {
			screen: NotFound,
			options: {
				title: "404",
			},
			linking: {
				path: "*",
			},
		},
	},
});

export const Navigation = createStaticNavigation(RootStack);

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
	namespace ReactNavigation {
		interface RootParamList extends RootStackParamList {}
	}
}
