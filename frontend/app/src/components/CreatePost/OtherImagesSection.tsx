import React from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { Text, TouchableOpacity } from "src/components/ui";

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

  return (
    <View>
      <Text style={styles.label}>Other Images (optional, up to 5)</Text>
      <View style={styles.chipsRow}>
        {images.map((img) => (
          <View key={img.name} style={styles.chip}>
            <Text style={styles.chipText}>{img.name}</Text>
            <TouchableOpacity onPress={() => onRemoveImage(img.name)} style={styles.chipRemove}>
              <Text style={styles.chipRemoveText}>x</Text>
            </TouchableOpacity>
          </View>
        ))}
        {canAddMore && (
          <TouchableOpacity style={styles.addChip} onPress={onAddImages} activeOpacity={0.85}>
            <Text style={styles.addChipText}>+ Add</Text>
          </TouchableOpacity>
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
  },
  chipsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: theme.colors.surfaceA20,
    borderRadius: 12,
    gap: 6,
  },
  chipText: {
    color: theme.colors.primaryA10,
    fontWeight: "600",
  },
  chipRemove: {
    paddingHorizontal: 6,
  },
  chipRemoveText: {
    color: theme.colors.dangerA0,
    fontWeight: "800",
  },
  addChip: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: theme.colors.primaryA20,
    borderRadius: 12,
  },
  addChipText: {
    color: theme.colors.textOpposite,
    fontWeight: "700",
  },
}));
