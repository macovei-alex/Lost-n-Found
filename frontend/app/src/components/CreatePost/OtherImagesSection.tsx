import { Ionicons } from "@expo/vector-icons";
import React, { useMemo } from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { Button, Text, TouchableOpacity } from "src/components/ui";

type SelectedImage = {
  uri: string;
  name: string;
  mimeType?: string;
};

type OtherImagesSectionProps = {
  images: SelectedImage[];
  onRemoveImage: (name: string) => void;
  onAddImages: () => void;
};

export default function OtherImagesSection({ images, onRemoveImage, onAddImages }: OtherImagesSectionProps) {
  const canAddMore = images.length < 5;

  const imageKeys = useMemo(() => {
    const keys: string[] = [];
    for (const img of images) {
      if (!keys.includes(img.name)) {
        keys.push(img.name);
      } else {
        keys.push(Math.random().toString(36).substring(2, 8));
      }
    }
    return keys;
  }, [images]);

  return (
    <View>
      <Text style={styles.label}>Other Images (optional, up to 5)</Text>
      <View style={styles.chipsRow}>
        {images.map((img, index) => (
          <View key={imageKeys[index]} style={styles.chip}>
            <Text style={styles.chipText}>{img.name}</Text>
            <TouchableOpacity
              onPress={() => onRemoveImage(img.name)}
              style={styles.chipRemove}
              activeOpacity={0.7}
            >
              <Ionicons name="close" size={16} style={styles.chipRemoveIcon} />
            </TouchableOpacity>
          </View>
        ))}
        {canAddMore && (
          <Button style={styles.addChip} onPress={onAddImages} title="+ Add" textStyle={styles.addChipText} />
        )}
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
  chipsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 8,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: theme.colors.surfaceA20,
    borderRadius: 12,
    gap: 6,
  },
  chipText: {
    color: theme.colors.primaryA20,
    fontWeight: "600",
  },
  chipRemove: {
    backgroundColor: theme.colors.primaryA20,
  },
  chipRemoveIcon: {
    color: theme.colors.textOpposite,
  },
  addChip: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: theme.colors.primaryA20,
    borderRadius: 12,
  },
  addChipText: {
    fontSize: 14,
    fontWeight: "700",
  },
}));
