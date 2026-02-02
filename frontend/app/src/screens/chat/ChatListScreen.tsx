import React, { useEffect, useState } from "react";
import { View, FlatList } from "react-native";
import { TouchableOpacity, Text, PageHeader, CenteredView, ActivityIndicator } from "src/components/ui";
import { StyleSheet } from "react-native-unistyles";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ChatStackParamList } from "src/navigation/ChatStackNavigator";
import { useAuthContext } from "src/context/AuthContext";
import { UserAvatar } from "src/components/ui";
import { useQuery } from "@tanstack/react-query";
import { loadMeInformationQO } from "src/api/options/loadMeInformationQO";

type Props = NativeStackScreenProps<ChatStackParamList, "ChatListScreen">;

type Chat = {
  id: string;
  otherUserName: string;
};

export default function ChatListScreen({ navigation }: Props) {
  const { api, token } = useAuthContext();
  const [chats, setChats] = useState<Chat[]>([]);

  const meQuery = useQuery(loadMeInformationQO(api, token));

  useEffect(() => {
    if (!meQuery.data) return;

    const fetchChats = async () => {
      try {
        const res = await api(`/chats/my-chats?accountId=${meQuery.data.id}`);
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
  }, [meQuery.data]);

  if (meQuery.isLoading) {
    return (
      <CenteredView style={styles.container}>
        <ActivityIndicator />
      </CenteredView>
    );
  }

  return (
    <FlatList
      data={chats}
      style={styles.container}
      keyExtractor={(item) => item.id}
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
          <UserAvatar fullName={item.otherUserName} size="small" />
          <Text style={styles.chatTitle}>{item.otherUserName}</Text>
        </TouchableOpacity>
      )}
      ListHeaderComponent={<PageHeader title="Chats" style={styles.headerContainer} />}
      stickyHeaderIndices={[0]}
    />
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surfaceA0,
  },
  headerContainer: {
    backgroundColor: theme.colors.surfaceA0,
    paddingBottom: 4,
  },
  chatItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 4,
    backgroundColor: theme.colors.surfaceA20,
    borderRadius: 12,
  },
  chatTitle: {
    fontSize: 18,
    fontWeight: "500",
  },
}));
