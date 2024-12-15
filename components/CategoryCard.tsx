import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { Card, Text } from "@/components/ui";
import type { Doc } from "@/convex/_generated/dataModel";

type CategoryCardProps = {
  category: Doc<"categories">;
};

export const CategoryCard = ({
  category,
}: CategoryCardProps): React.JSX.Element => {
  return (
    <Card>
      <Text variant="h3">{category.name}</Text>
      <Text variant="caption" muted>
        {category.description}
      </Text>
    </Card>
  );
};

const styles = StyleSheet.create((th, rt) => ({
  container: {
    padding: th.gap(4),
    borderRadius: th.borderRadius(4),
    shadowColor: th.colors.background.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.35,
    shadowRadius: 2.84,
    elevation: 5,
    backgroundColor: th.colors.background.light,
  },
}));
