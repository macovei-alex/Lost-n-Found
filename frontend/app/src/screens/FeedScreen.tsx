import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native-unistyles";

export default function FeedScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Feed Screen</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.background.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: theme.text.primary,
    fontSize: 18,
    fontWeight: "bold",
  },
}));
