import { useNavigation } from "@react-navigation/native";
import { Unauthenticated, useQuery } from "convex/react";
import { FlatList, TouchableWithoutFeedback } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import Badge from "@/components/Badge";
import Skeleton from "@/components/Skeleton";
import { Card } from "@/components/ui/Card";
import Text from "@/components/ui/Text";
import TouchableBounce from "@/components/ui/TouchableBounce";
import XStack from "@/components/ui/XStack";
import YStack from "@/components/ui/YStack";
import { api } from "@/convex/_generated/api";

export function Home() {
	const boards = useQuery(api.boards.queries.getAllEnriched);
	const navigation = useNavigation();

	return (
		<YStack flex={1} gap="lg">
			<YStack gap="md" pd="lg" bg="purple" insetTop style={{ height: 125 }}>
				<Text variant="h1">Home</Text>
			</YStack>
			<YStack flex={1} gap="md">
				<YStack px="lg">
					<Text variant="h2">Recent boards</Text>
				</YStack>
				<FlatList
					horizontal
					contentContainerStyle={styles.contentContainer}
					showsHorizontalScrollIndicator={false}
					ListEmptyComponent={() =>
						Array.from({ length: 10 }).map((_, index) => (
							// biome-ignore lint/suspicious/noArrayIndexKey: <its ok>
							<Skeleton key={index} style={{ width: 265, height: 140 }} />
						))
					}
					data={boards}
					renderItem={({ item: board }) => {
						const totalQuestions = board.enriched.categories.reduce(
							(acc, category) => acc + category.questions.length,
							0,
						);
						return (
							<TouchableWithoutFeedback
								key={board._id}
								onPress={() =>
									navigation.navigate("Board", { boardId: board._id })
								}
							>
								<Card key={board._id} style={{ width: 265, height: 150 }}>
									<YStack flex={1} jc="between">
										<YStack>
											<Text variant="h3">{board.title}</Text>
											<Text numberOfLines={2} lineBreakMode="tail">
												{board.description}
											</Text>
										</YStack>
										<XStack gap="sm">
											<Badge
												label={`${board.enriched.categories.length} categories`}
											/>
											<Badge label={`${totalQuestions} questions`} />
										</XStack>
									</YStack>
								</Card>
							</TouchableWithoutFeedback>
						);
					}}
				/>
			</YStack>
			<YStack px="lg">
				<Unauthenticated>
					<TouchableBounce
						sensory="light"
						onPress={() => navigation.navigate("SignIn")}
					>
						<Card>
							<YStack pd="md" gap="sm">
								<Text variant="h2">Sign in to get started</Text>
								<Text>
									Sign in or create your account to get access to more features.
								</Text>
							</YStack>
						</Card>
					</TouchableBounce>
				</Unauthenticated>
			</YStack>
		</YStack>
	);
}

const styles = StyleSheet.create((th, rt) => ({
	heroSection: {
		height: 125,
		paddingTop: rt.insets.top,
		padding: th.space.lg,
		gap: th.space.lg,
		backgroundColor: th.colors.purple,
	},
	contentContainer: {
		gap: th.space.lg,
		paddingHorizontal: th.space.lg,
	},
}));
