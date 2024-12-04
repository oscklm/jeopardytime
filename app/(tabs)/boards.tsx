import { Text } from "@/components/ui";
import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

export default function BoardsScreen() {
  return (
    <View style={styles.container}>
      <Text>Aqwd</Text>
    </View>
  );
}

const styles = StyleSheet.create((th, rt) => ({
  container: {
    flex: 1,
    paddingTop: rt.insets.top,
  },
}));
