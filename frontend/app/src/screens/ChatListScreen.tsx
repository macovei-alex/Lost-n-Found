import React from "react";
import { View, FlatList, TouchableOpacity, Text, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ChatStackParamList } from "src/navigation/ChatStackNavigator";

type Props = NativeStackScreenProps<ChatStackParamList, "ChatListScreen">;

const mockChats = [
  { id: "1", title: "Alice" },
  { id: "2", title: "Bob" },
];

export default function ChatListScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <FlatList
        data={mockChats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.chatItem}
            onPress={() => navigation.navigate("ChatRoomScreen", { chatId: item.id, chatTitle: item.title })}
          >
            <Text style={styles.chatTitle}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  chatItem: { padding: 16, borderBottomWidth: 1, borderBottomColor: "#ddd" },
  chatTitle: { fontSize: 18 },
});
