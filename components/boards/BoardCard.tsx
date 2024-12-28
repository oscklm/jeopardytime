import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { Card, Text, XStack } from "@/components/ui";
import type { Doc } from "@/convex/_generated/dataModel";
import { PublicStatusIndicator } from "@/components/PublicStatusIndicator";

type BoardCardProps = {
  board: Doc<"boards">;
};

export const BoardCard = ({ board }: BoardCardProps): React.JSX.Element => {
  return (
    <Card>
      <View style={styles.container}>
        <XStack ai="center" jc="space-between">
          <Text variant="h2">{board.name}</Text>
          <PublicStatusIndicator isPublic={board.isPublic} />
        </XStack>
        <Text variant="caption" muted>
          {board.timesPlayed} times played
        </Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create((th, rt) => ({
  container: {
    height: 150,
  },
}));
