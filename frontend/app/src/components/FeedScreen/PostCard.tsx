import { Image } from "expo-image";
import { Text, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { FeedPost } from "src/api/types/FeedPost";
import { ENV } from "src/config/env";

type PostCardProps = {
  post: FeedPost;
};

export default function PostCard({ post }: PostCardProps) {
  return (
    <View style={styles.postCard}>
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
    backgroundColor: theme.background.card,
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  title: {
    color: theme.text.primary,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  description: {
    color: theme.text.secondary,
    fontSize: 14,
    marginBottom: 4,
  },
  location: {
    color: theme.text.secondary,
    fontSize: 12,
  },
  image: {
    width: "100%",
    height: 200,
    marginTop: 8,
    borderRadius: 8,
  },
}));
