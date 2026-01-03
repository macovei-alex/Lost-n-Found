import React from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { Text, TouchableOpacity } from "src/components/ui";

type MainImageSectionProps = {
  selectedImageName: string | null;
  onPickImage: () => void;
};

export default function MainImageSection({ selectedImageName, onPickImage }: MainImageSectionProps) {
  return (
    <View>
      <Text style={styles.label}>Main Image</Text>
      <TouchableOpacity style={styles.imagePicker} onPress={onPickImage}>
        <Text style={styles.imagePickerText}>
          {selectedImageName ? selectedImageName : "Pick main image"}
        </Text>
      </TouchableOpacity>
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
  imagePicker: {
    borderWidth: 1,
    borderColor: theme.colors.surfaceA30,
    backgroundColor: theme.colors.surfaceA10,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 14,
  },
  imagePickerText: {
    color: theme.colors.primaryA30,
    fontWeight: "600",
  },
}));
