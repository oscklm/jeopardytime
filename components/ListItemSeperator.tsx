import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

type ListItemSeperatorProps = {
  horizontal?: boolean;
};

export const ListItemSeperator = ({
  horizontal = false,
}: ListItemSeperatorProps): React.JSX.Element => {
  styles.useVariants({ horizontal });
  return <View style={styles.container} />;
};

const styles = StyleSheet.create((th, rt) => ({
  container: {
    variants: {
      horizontal: {
        true: {
          width: th.gap(4),
        },
        false: {
          height: th.gap(4),
        },
      },
    },
  },
}));
