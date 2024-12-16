import { ActivityIndicator, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

export const LoadingView = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={styles.spinner.color} />
    </View>
  );
};

const styles = StyleSheet.create((th, rt) => ({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  spinner: {
    color: th.colors.primary.base,
  },
}));
