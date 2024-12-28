import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { Text } from "@/components/ui";
import type { Doc } from "@/convex/_generated/dataModel";

type QuestionCardProps = {
  question: Doc<"questions">;
};

export const QuestionCard = ({
  question,
}: QuestionCardProps): React.JSX.Element => {
  return (
    <View style={styles.container}>
      <Text>{question.question}</Text>
    </View>
  );
};

const styles = StyleSheet.create((th, rt) => ({
  container: {
    padding: th.gap(4),
    borderRadius: th.borderRadius(10),
    backgroundColor: th.colors.background.dark,
  },
}));
