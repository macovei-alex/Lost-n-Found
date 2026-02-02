import { Image } from "expo-image";
import { Alert, GestureResponderEvent, Pressable, View } from "react-native";
import { Text, Button } from "src/components/ui";
import { StyleSheet } from "react-native-unistyles";
import { Post } from "src/api/types/Posts";
import { ENV } from "src/config/env";
import { useAuthContext } from "src/context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { loadMeInformationQO } from "src/api/options/loadMeInformationQO";

type PostCardProps = { post: Post; onNavigate?: () => void };

export default function PostCard({ post, onNavigate }: PostCardProps) {
  const { api, token } = useAuthContext();
  const navigation = useNavigation<any>();
  const meQuery = useQuery(loadMeInformationQO(api, token));

  const handleChatPress = async () => {
    if (!meQuery.data) {
      console.warn("User information not loaded yet");
      return;
    }

    const currentAccount = meQuery.data;
    if (currentAccount.id === post.idAccount) {
      console.warn("You can't send message to yourself");
      Alert.alert("Circular messaging", "You can't send message to yourself.");
      return;
    }

    try {
      const chatResponse = await api(
        `/chats/get-or-create?account1Id=${currentAccount.id}&account2Id=${post.idAccount}`,
      );
      const chat = await chatResponse.json();

      navigation.navigate("Chat", {
        screen: "ChatRoomScreen",
        params: { chatId: chat.id, chatTitle: post.title },
      });
    } catch (err) {
      console.error("Error creating chat:", err);
    }
  };

  return (
    <View style={styles.postCard}>
      <Pressable onPress={onNavigate}>
        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.description}>{post.itemDescription}</Text>
        <Text style={styles.location}>{post.location}</Text>
        <Image
          source={{ uri: `${ENV.API_BASE_URL}/images/${post.mainImageName}` }}
          style={styles.image}
          contentFit="contain"
        />
      </Pressable>
      <Button
        title="Message author"
        onPress={handleChatPress}
        disabled={meQuery.isLoading || meQuery.isError}
        style={styles.messageButton}
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
    color: theme.colors.primaryA30,
    fontSize: 12,
  },
  image: {
    height: 200,
    marginTop: 8,
    borderRadius: 12,
  },
  messageButton: {
    marginTop: 12,
    paddingTop: 8,
    paddingHorizontal: 40,
  },
}));
