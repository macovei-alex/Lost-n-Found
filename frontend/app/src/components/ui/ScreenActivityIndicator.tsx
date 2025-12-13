import { ActivityIndicator, View } from "react-native";
import { StyleSheet, withUnistyles } from "react-native-unistyles";

export function ScreenActivityIndicator() {
  return (
    <View style={styles.centered}>
      <UActivityIndicator size="large" />
    </View>
  );
}

const UActivityIndicator = withUnistyles(ActivityIndicator, (theme) => ({
  color: theme.colors.primaryA10,
}));

const styles = StyleSheet.create(() => ({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
}));
