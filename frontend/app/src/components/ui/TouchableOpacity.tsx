import React from "react";
import { TouchableOpacity as RNTouchableOpacity } from "react-native";
import { StyleSheet } from "react-native-unistyles";

export function TouchableOpacity(props: React.ComponentProps<typeof RNTouchableOpacity>) {
  return <RNTouchableOpacity {...props} style={[styles.button, props.style]} />;
}

const styles = StyleSheet.create((theme) => ({
  button: {
    backgroundColor: theme.colors.primaryA0,
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
}));
