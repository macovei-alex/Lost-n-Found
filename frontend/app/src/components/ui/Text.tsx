import { Text as RNText } from "react-native";
import { StyleSheet } from "react-native-unistyles";

export function Text(props: React.ComponentProps<typeof RNText>) {
  return <RNText {...props} style={[styles.text, props.style]} />;
}

const styles = StyleSheet.create((theme) => ({
  text: {
    color: theme.colors.text,
  },
}));
