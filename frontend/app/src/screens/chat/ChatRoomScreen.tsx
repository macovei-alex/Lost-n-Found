import React, { useEffect, useState } from "react";
import { View, FlatList, TextInput, KeyboardAvoidingView } from "react-native";
import { Text, Button, PageHeader, UserAvatar } from "src/components/ui";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ChatStackParamList } from "src/navigation/ChatStackNavigator";
import { useAuthContext } from "src/context/AuthContext";
import { MessageSchema } from "src/api/types/Chat";
import { StyleSheet } from "react-native-unistyles";
import { useQuery } from "@tanstack/react-query";
import { loadMeInformationQO } from "src/api/options/loadMeInformationQO";
import z from "zod";

type AugmentedMessage = {
  id: string;
  textContent: string;
  sentByMe: boolean;
};

type Props = NativeStackScreenProps<ChatStackParamList, "ChatRoomScreen">;

export default function ChatRoomScreen({ route }: Props) {
  const { chatId, chatTitle } = route.params;
  const { api, token } = useAuthContext();

  const meQuery = useQuery(loadMeInformationQO(api, token));

  const [messages, setMessages] = useState<AugmentedMessage[]>([]);
  const [input, setInput] = useState("");

  const fetchMessages = async () => {
    if (!meQuery.data) return;
    try {
      const response = await api(`/chats/${chatId}/messages`);
      const data = await response.json();
      const parsed = z.array(MessageSchema).parse(data);
      setMessages(
        parsed.map((msg) => ({
          id: msg.id.toString(),
          textContent: msg.textContent,
          sentByMe: msg.senderId === meQuery.data.id,
        })),
      );
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (meQuery.data) {
      fetchMessages();
      const interval = setInterval(fetchMessages, 5000);
      return () => clearInterval(interval);
    }
  }, [meQuery.data]);

  const sendMessage = async () => {
    if (!input.trim() || !meQuery.data) return;
    try {
      const response = await api(
        `/chats/${chatId}/send?senderId=${meQuery.data.id}&text=${encodeURIComponent(input)}`,
        { method: "POST" },
      );
      const data = await response.json();
      const parsed = MessageSchema.parse(data);
      setMessages((prev) => [
        ...prev,
        {
          id: parsed.id.toString(),
          textContent: parsed.textContent,
          sentByMe: true,
        },
      ]);
      setInput("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.message, item.sentByMe ? styles.sent : styles.received]}>
            <Text style={styles.messageText}>{item.textContent}</Text>
          </View>
        )}
        ListHeaderComponent={
          <PageHeader style={styles.headerContainer}>
            <UserAvatar fullName={chatTitle} size="small" />
            <Text style={styles.headerText}>{chatTitle}</Text>
          </PageHeader>
        }
        stickyHeaderIndices={[0]}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Type a message..."
        />
        <Button style={styles.sendButton} textStyle={styles.sendText} onPress={sendMessage} title="Send" />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surfaceA0,
  },
  headerContainer: {
    backgroundColor: theme.colors.surfaceA0,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "600",
    color: theme.colors.text,
  },
  message: {
    padding: 12,
    margin: 8,
    borderRadius: 12,
    maxWidth: "80%",
  },
  sent: {
    backgroundColor: theme.colors.surfaceTonalA10,
    alignSelf: "flex-end",
  },
  received: {
    backgroundColor: theme.colors.surfaceTonalA30,
    alignSelf: "flex-start",
  },
  messageText: {
    color: theme.colors.text,
  },
  inputContainer: {
    flexDirection: "row",
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: theme.colors.primaryA20,
    gap: 4,
  },
  input: {
    flex: 1,
    backgroundColor: theme.colors.surfaceA20,
    color: theme.colors.text,
    borderRadius: 24,
    paddingHorizontal: 16,
    height: 48,
  },
  sendButton: {
    paddingHorizontal: 12,
    borderRadius: 9999,
    fontSize: 12,
  },
  sendText: {
    fontSize: 14,
    fontWeight: "700",
  },
}));
