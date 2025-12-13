import React from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

export function CenteredView(props: React.ComponentProps<typeof View>) {
  return <View {...props} style={[styles.centered, props.style]} />;
}

const styles = StyleSheet.create(() => ({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
}));
