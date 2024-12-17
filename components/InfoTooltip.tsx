import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { Icons, Text } from "@/components/ui";

type Props = {
  text: string;
};

export const InfoTooltip = ({ text }: Props): React.JSX.Element => {
  return (
    <View style={styles.container}>
      <Icons.info size={20} color="gray" />
      <Text variant="caption" muted>
        {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create((th, rt) => ({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
}));
