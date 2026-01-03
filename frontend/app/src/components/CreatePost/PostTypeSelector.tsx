import React from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { Text, TouchableOpacity } from "src/components/ui";
import { Post, POST_TYPES } from "src/api/types/Post";

type PostTypeSelectorProps = {
  selected: Post["postType"];
  onSelect: (type: Post["postType"]) => void;
};

export default function PostTypeSelector({ selected, onSelect }: PostTypeSelectorProps) {
  return (
    <View>
      <Text style={styles.label}>Post Type</Text>
      <View style={styles.row}>
        {POST_TYPES.map((type) => {
          const isSelected = selected === type;
          return (
            <TouchableOpacity
              key={type}
              onPress={() => onSelect(type)}
              style={[styles.typePill, isSelected && styles.typePillSelected]}
              activeOpacity={0.8}
            >
              <Text style={[styles.typeText, isSelected && styles.typeTextSelected]}>{type}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  label: {
    color: theme.colors.primaryA30,
    fontWeight: "600",
    marginTop: 6,
    marginBottom: 4,
  },
  row: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 6,
  },
  typePill: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.surfaceA30,
    backgroundColor: theme.colors.surfaceA10,
  },
  typePillSelected: {
    backgroundColor: theme.colors.primaryA20,
    borderColor: theme.colors.primaryA10,
  },
  typeText: {
    color: theme.colors.primaryA30,
    fontWeight: "600",
  },
  typeTextSelected: {
    color: theme.colors.textOpposite,
  },
}));
