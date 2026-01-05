import { View } from "react-native";
import { Text } from "./Text";
import { StyleSheet } from "react-native-unistyles";

type PageHeaderProps = {
  title?: string;
  children?: React.ReactNode;
};

export function PageHeader({ title, children }: PageHeaderProps) {
  return (
    <View style={styles.container}>
      {title && <Text style={styles.title}>{title}</Text>}
      {children}
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    paddingTop: 32,
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
