import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { Card, Text } from "@/components/ui";
import type { Doc } from "@/convex/_generated/dataModel";

type BoardCardProps = {
  board: Doc<"boards">;
};

export const BoardCard = ({ board }: BoardCardProps): React.JSX.Element => {
  return (
    <Card>
      <Text variant="h3">{board.name}</Text>
      <Text variant="caption" muted>
        {board.timesPlayed} times played
      </Text>
    </Card>
  );
};

const styles = StyleSheet.create((th, rt) => ({
  container: {
    padding: th.gap(4),
    borderRadius: th.borderRadius(10),
    backgroundColor: th.colors.background.light,
  },
}));
