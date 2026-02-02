import React from "react";
import { StyleProp, TextStyle, ViewStyle } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { Text } from "./Text";
import { TouchableOpacity } from "./TouchableOpacity";

type ButtonProps = Omit<React.ComponentProps<typeof TouchableOpacity>, "children"> & {
  title?: string;
  textStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
  activeOpacity?: number;
};

export function Button(props: ButtonProps) {
  const { title, textStyle, style, activeOpacity = 0.8, disabled, ...rest } = props;

  return (
    <TouchableOpacity
      activeOpacity={activeOpacity}
      disabled={disabled}
      style={[styles.container(disabled), style]}
      {...rest}
    >
      {title !== undefined && title !== null && <Text style={[styles.text, textStyle]}>{title}</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: (disabled?: boolean) => ({
    backgroundColor: theme.colors.primaryA0,
    justifyContent: "center",
    alignItems: "center",
    opacity: disabled ? 0.6 : 1,
  }),
  text: {
    color: theme.colors.textOpposite,
    fontSize: 16,
    fontWeight: "600",
  },
}));
