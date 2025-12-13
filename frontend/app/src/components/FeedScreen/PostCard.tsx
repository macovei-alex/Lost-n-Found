import { Image } from "expo-image";
import { View } from "react-native";
import { Text } from "src/components/ui";
import { StyleSheet } from "react-native-unistyles";
import { Post } from "src/api/types/Post";
import { ENV } from "src/config/env";

type PostCardProps = {
  post: Post;
  onNavigate?: () => void;
};

export default function PostCard({ post, onNavigate }: PostCardProps) {
  return (
    <View style={styles.postCard} onTouchEnd={onNavigate}>
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.description}>{post.itemDescription}</Text>
      <Text style={styles.location}>{post.location}</Text>
      <Image
        source={{ uri: `${ENV.API_BASE_URL}/images/${post.mainImageName}` }}
        style={styles.image}
        contentFit="contain"
      />
    </View>
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
  title: {
    color: theme.colors.primaryA10,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  description: {
    color: theme.colors.primaryA30,
    fontSize: 14,
    marginBottom: 4,
  },
  location: {
    color: theme.colors.primaryA50,
    fontSize: 12,
  },
  image: {
    height: 200,
    marginTop: 8,
    borderRadius: 12,
  },
}));
