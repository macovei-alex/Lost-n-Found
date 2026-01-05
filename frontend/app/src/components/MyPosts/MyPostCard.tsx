import { Image } from "expo-image";
import { Pressable, View } from "react-native";
import { Text } from "src/components/ui";
import { StyleSheet } from "react-native-unistyles";
import { Post } from "src/api/types/Posts";
import { ENV } from "src/config/env";

type PostCardProps = {
  post: Post;
  onNavigate?: () => void;
};

export default function MyPostCard({ post, onNavigate }: PostCardProps) {
  const isResolved = post.resolvedAt !== null;

  return (
    <Pressable style={styles.postCard} onPress={onNavigate}>
      <View style={styles.titleRow}>
        <Text style={styles.title}>{post.title}</Text>

        <View style={[styles.statusBadge, isResolved ? styles.resolved : styles.unresolved]}>
          <Text style={[styles.statusText, isResolved ? styles.resolvedText : styles.unresolvedText]}>
            {isResolved ? "RESOLVED" : "OPEN"}
          </Text>
        </View>
      </View>
      <Text style={styles.description}>{post.itemDescription}</Text>
      <Text style={styles.location}>{post.location}</Text>
      <Image
        source={{ uri: `${ENV.API_BASE_URL}/images/${post.mainImageName}` }}
        style={styles.image}
        contentFit="contain"
      />
    </Pressable>
  );
}

const styles = StyleSheet.create((theme) => ({
  postCard: {
    backgroundColor: theme.colors.surfaceA10,
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    borderRadius: 12,
    shadowColor: theme.colors.text,
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },

  title: {
    color: theme.colors.primaryA10,
    fontSize: 18,
    fontWeight: "bold",
    flexShrink: 1,
    marginRight: 8,
  },

  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    borderWidth: 1,
  },

  resolved: {
    borderColor: theme.colors.successA0,
    backgroundColor: "transparent",
  },

  unresolved: {
    borderColor: theme.colors.warningA0,
    backgroundColor: "transparent",
  },

  statusText: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.5,
  },

  resolvedText: {
    color: theme.colors.successA0 ?? "#2E7D32",
  },

  unresolvedText: {
    color: theme.colors.warningA0 ?? "#ED6C02",
  },

  description: {
    color: theme.colors.primaryA30,
    fontSize: 14,
    marginBottom: 4,
  },
  location: {
    color: theme.colors.primaryA30,
    fontSize: 12,
  },
  image: {
    height: 200,
    marginTop: 8,
    borderRadius: 12,
  },
}));
