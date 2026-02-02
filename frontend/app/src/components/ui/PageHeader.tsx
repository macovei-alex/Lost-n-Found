import { StyleProp, View, ViewStyle } from "react-native";
import { Text } from "./Text";
import { StyleSheet } from "react-native-unistyles";

type PageHeaderProps = {
  title?: string;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

export function PageHeader({ title, children, style }: PageHeaderProps) {
  return (
    <View style={[styles.container, style]}>
      {title && <Text style={styles.title}>{title}</Text>}
      {children}
    </View>
  );
}

const styles = StyleSheet.create((theme, runtime) => ({
  container: {
    paddingTop: runtime.statusBar.height + 10,
    paddingBottom: 8,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: theme.colors.primaryA10,
  },
}));
