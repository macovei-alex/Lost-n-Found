import { ColorValue, StyleProp, View, ViewStyle } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { Text } from "./Text";

type AvatarSize = "small" | "medium" | "large";

type UserAvatarProps = {
  fullName: string;
  size: AvatarSize;
  style?: StyleProp<ViewStyle>;
};

export function UserAvatar({ fullName, size, style }: UserAvatarProps) {
  const initials = getInitials(fullName);
  const avatarColor = getColorFromInitials(initials);

  return (
    <View style={[styles.avatar(avatarColor, size), style]}>
      <Text style={styles.avatarText(size)}>{initials}</Text>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  avatar: (avatarColor: ColorValue, size: AvatarSize) => ({
    width: sizes[size].image,
    height: sizes[size].image,
    borderRadius: sizes[size].image / 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: avatarColor,
  }),
  avatarText: (size: AvatarSize) => ({
    fontSize: sizes[size].text,
    fontWeight: "700",
    color: "#ffffff",
  }),
}));

const sizes = {
  small: {
    image: 40,
    text: 14,
  },
  medium: {
    image: 70,
    text: 24,
  },
  large: {
    image: 100,
    text: 36,
  },
};

const colors = [
  "#E55A5A",
  "#3DB3AB",
  "#399CB0",
  "#E6916B",
  "#7EB6AD",
  "#DCCB55",
  "#9A6FBF",
  "#6AA2C9",
  "#D8A72B",
  "#449C88",
];

function getColorFromInitials(initials: string): string {
  const charCode = initials.charCodeAt(0) + (initials.charCodeAt(1) || 0);
  return colors[charCode % colors.length];
}

function getInitials(name: string): string {
  const parts = name.trim().split(" ");
  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
