import React, { useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ChatStackParamList } from "src/navigation/ChatStackNavigator";

type Props = NativeStackScreenProps<ChatStackParamList, "ChatRoomScreen">;

export default function ChatRoomScreen({ route }: Props) {
  const { chatId, chatTitle } = route.params;
  const [messages, setMessages] = useState<
    { id: string; text: string; sentByMe: boolean }[]
  >([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), text: input, sentByMe: true },
    ]);
    setInput("");
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text style={styles.header}>{chatTitle}</Text>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={[
              styles.message,
              item.sentByMe ? styles.sent : styles.received,
            ]}
          >
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Type a message..."
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    fontSize: 20,
    fontWeight: "600",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  message: { padding: 12, margin: 8, borderRadius: 12, maxWidth: "70%" },
  sent: { backgroundColor: "#0066FF", alignSelf: "flex-end" },
  received: { backgroundColor: "#eee", alignSelf: "flex-start" },
  messageText: { color: "#000" },
  inputContainer: {
    flexDirection: "row",
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  input: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    borderRadius: 24,
    paddingHorizontal: 16,
    height: 48,
  },
  sendButton: { justifyContent: "center", paddingHorizontal: 16 },
  sendText: { color: "#0066FF", fontWeight: "600" },
});
