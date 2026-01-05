import { useState } from "react";
import { View, Pressable } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { PostType } from "src/api/types/Post";
import { Text, SelectModal } from "src/components/ui";

interface PostsFiltersProps {
  postType: PostType | undefined;
  resolved: boolean | undefined;
  setPostType: (value: PostType | undefined) => void;
  setResolved: (value: boolean | undefined) => void;
}

export default function MyPostsFilters({ postType, resolved, setPostType, setResolved }: PostsFiltersProps) {
  const [typeModalVisible, setTypeModalVisible] = useState(false);
  const [statusModalVisible, setStatusModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      {/* Type filter */}
      <Pressable onPress={() => setTypeModalVisible(true)} style={styles.filterChip}>
        <Text style={styles.label}>Type: {postType ?? "ALL"}</Text>
      </Pressable>

      {/* Status filter */}
      <Pressable onPress={() => setStatusModalVisible(true)} style={styles.filterChip}>
        <Text style={styles.label}>
          Status: {resolved === undefined ? "ALL" : resolved ? "RESOLVED" : "OPEN"}
        </Text>
      </Pressable>

      {/* Type modal */}
      <SelectModal
        visible={typeModalVisible}
        title="Post type"
        options={
          [
            { label: "All", value: undefined },
            { label: "Lost", value: "LOST" },
            { label: "Found", value: "FOUND" },
          ] as const
        }
        onSelect={(value) => {
          setPostType(value);
          setTypeModalVisible(false);
        }}
        onClose={() => setTypeModalVisible(false)}
      />

      {/* Status modal */}
      <SelectModal
        visible={statusModalVisible}
        title="Post status"
        options={[
          { label: "All", value: undefined },
          { label: "Open", value: false },
          { label: "Resolved", value: true },
        ]}
        onSelect={(value) => {
          setResolved(value);
          setStatusModalVisible(false);
        }}
        onClose={() => setStatusModalVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
    paddingVertical: 12,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: theme.colors.surfaceA10,
  },
  label: {
    fontWeight: "600",
    color: theme.colors.primaryA0,
  },
}));
