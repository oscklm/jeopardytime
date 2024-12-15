import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { Text } from "@/components/ui";
import type { QuestionFormValues } from "@/features/boards/boardStore";

type QuestionCardProps = {
  question: QuestionFormValues;
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
