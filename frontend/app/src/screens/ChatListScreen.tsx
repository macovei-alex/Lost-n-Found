import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ChatStackParamList } from "src/navigation/ChatStackNavigator";
import { useAuthContext } from "src/context/AuthContext";

type Props = NativeStackScreenProps<ChatStackParamList, "ChatListScreen">;

type Chat = { id: string; otherUserName: string; avatarUrl?: string };

export default function ChatListScreen({ navigation }: Props) {
  const { api } = useAuthContext();
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await api("/accounts/me");
        const data = await res.json();
        setCurrentUserId(data.id);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCurrentUser();
  }, []);

  useEffect(() => {
    if (!currentUserId) return;

    const fetchChats = async () => {
      try {
        const res = await api(`/chats/my-chats?accountId=${currentUserId}`);
        const data = await res.json();
        setChats(
          data.map((chat: any) => ({
            id: chat.id.toString(),
            otherUserName: chat.otherUserName,
          })),
        );
      } catch (err) {
        console.error(err);
      }
    };

    fetchChats();
  }, [currentUserId]);

  return (
    <View style={styles.container}>
      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingVertical: 8 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.chatItem}
            onPress={() =>
              navigation.navigate("ChatRoomScreen", {
                chatId: item.id,
                chatTitle: item.otherUserName,
              })
            }
          >
            <Image source={{ uri: item.avatarUrl }} style={styles.avatar} />
            <Text style={styles.chatTitle}>{item.otherUserName}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5", paddingTop: 16 },
  chatItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 4,
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
  },
  chatTitle: { fontSize: 18, fontWeight: "500" },
});
