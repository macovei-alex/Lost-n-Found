import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChatListScreen from "src/screens/chat/ChatListScreen";
import ChatRoomScreen from "src/screens/chat/ChatRoomScreen";

export type ChatStackParamList = {
  ChatListScreen: undefined;
  ChatRoomScreen: { chatId: string; chatTitle: string };
};

const ChatStack = createNativeStackNavigator<ChatStackParamList>();

export default function ChatStackNavigator() {
  return (
    <ChatStack.Navigator screenOptions={{ headerShown: false }}>
      <ChatStack.Screen name="ChatListScreen" component={ChatListScreen} />
      <ChatStack.Screen name="ChatRoomScreen" component={ChatRoomScreen} />
    </ChatStack.Navigator>
  );
}
