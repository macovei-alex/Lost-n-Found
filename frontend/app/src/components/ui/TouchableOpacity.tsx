import React from "react";
import { TouchableOpacity as RNTouchableOpacity } from "react-native";
import { StyleSheet } from "react-native-unistyles";

export function TouchableOpacity(props: React.ComponentProps<typeof RNTouchableOpacity>) {
  const { activeOpacity = 0.8, disabled, ...rest } = props;
  return (
    <RNTouchableOpacity
      activeOpacity={activeOpacity}
      disabled={disabled}
      {...rest}
      style={[styles.button(disabled), props.style]}
    />
  );
}

const styles = StyleSheet.create((theme) => ({
  button: (disabled?: boolean) => ({
    backgroundColor: theme.colors.primaryA0,
    opacity: disabled ? 0.6 : 1,
    alignItems: "center",
    padding: 8,
    borderRadius: 12,
  }),
}));
