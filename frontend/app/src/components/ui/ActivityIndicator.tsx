import { ActivityIndicator as RNActivityIndicator } from "react-native";
import { StyleSheet, withUnistyles } from "react-native-unistyles";
import { CenteredView } from "./CenteredView";

export function ActivityIndicator(props: React.ComponentProps<typeof RNActivityIndicator>) {
  const { size = "large", ...rest } = props;

  return (
    <CenteredView style={styles.centered}>
      <UActivityIndicator size={size} {...rest} />
    </CenteredView>
  );
}

const UActivityIndicator = withUnistyles(RNActivityIndicator, (theme) => ({
  color: theme.colors.primaryA10,
}));

const styles = StyleSheet.create(() => ({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
}));
