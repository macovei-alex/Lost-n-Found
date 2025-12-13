import { withUnistyles } from "react-native-unistyles";
import { Button as RNButton } from "react-native";

export function Button(props: React.ComponentProps<typeof RNButton>) {
  return <UButton {...props} />;
}

const UButton = withUnistyles(RNButton, (theme) => ({
  color: theme.colors.primaryA0,
}));
