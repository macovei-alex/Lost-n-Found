import { Image } from "expo-image";
import { View, GestureResponderEvent, Pressable } from "react-native";
import { Text, Button } from "src/components/ui";
import { StyleSheet } from "react-native-unistyles";
import { Post } from "src/api/types/Post";
import { ENV } from "src/config/env";
import { useAuthContext } from "src/context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

type PostCardProps = {
  post: Post;
  onNavigate?: () => void;
};

export default function PostCard({ post, onNavigate }: PostCardProps) {
  const { api } = useAuthContext();
  const navigation = useNavigation<any>();
  const [loading, setLoading] = useState(false);

  const handleChatPress = async (event: GestureResponderEvent) => {
    event.stopPropagation();
    setLoading(true);
    try {
      const meResponse = await api("/accounts/me");
      const currentUser = await meResponse.json();
      const currentUserId = currentUser.id;
      const chatResponse = await api(
        `/chats/get-or-create?account1Id=${currentUserId}&account2Id=${post.idAccount}`
      );
      const chat = await chatResponse.json();
      navigation.navigate("Chat", {
        screen: "ChatRoomScreen",
        params: { chatId: chat.id, chatTitle: post.title },
      });
    } catch (err) {
      console.error("Error creating chat:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Pressable style={styles.postCard} onPress={onNavigate}>
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.description}>{post.itemDescription}</Text>
      <Text style={styles.location}>{post.location}</Text>
      <Image
        source={{ uri: `${ENV.API_BASE_URL}/images/${post.mainImageName}` }}
        style={styles.image}
        contentFit="contain"
      />
      <Button title="Message Seller" onPress={handleChatPress} disabled={loading} />
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
