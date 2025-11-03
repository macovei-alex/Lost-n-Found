import { Text, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

export default function StylesTest() {
  return (
    <View style={styleSheet.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
    </View>
  );
}

const styleSheet = StyleSheet.create((theme) => ({
  container: {
    backgroundColor: theme.background.primary,
    padding: 16,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
}));
