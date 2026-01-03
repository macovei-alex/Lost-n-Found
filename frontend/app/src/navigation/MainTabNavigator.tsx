import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, useUnistyles } from "react-native-unistyles";
import ChatStackNavigator from "./ChatStackNavigator";
import PostsStackNavigator from "./PostsStackNavigator";
import CreatePostScreen from "src/screens/CreatePostScreen";
import { Ionicons } from "@expo/vector-icons";

export type MainTabParamList = {
  PostsStackNavigator: undefined;
  CreatePostScreen: undefined;
  Chat: undefined;
};

const MainTab = createBottomTabNavigator();

export default function MainTabNavigator() {
  const { theme } = useUnistyles();

  return (
    <MainTab.Navigator
      screenOptions={({ navigation, route }) => ({
        headerShown: false,
        tabBarStyle: {
          borderColor: theme.colors.surfaceA20,
          backgroundColor: theme.colors.surfaceA20,
        },
        animation: "shift",
        tabBarActiveTintColor: String(theme.colors.primaryA0),
        tabBarInactiveTintColor: String(theme.colors.primaryA0),
      })}
    >
      <MainTab.Screen
        name="PostsStackNavigator"
        component={PostsStackNavigator}
        options={{
          title: "Posts",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={size}
              style={styles.tabBarIcon(focused, color)}
            />
          ),
        }}
      />
      <MainTab.Screen
        name="CreatePostScreen"
        component={CreatePostScreen}
        options={{
          title: "Create",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "add-circle" : "add-circle-outline"}
              size={size + 6}
              style={styles.tabBarIcon(focused, color)}
            />
          ),
        }}
      />
      <MainTab.Screen
        name="Chat"
        component={ChatStackNavigator}
        options={{
          title: "Chat",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "chatbubble" : "chatbubble-outline"}
              size={size}
              style={styles.tabBarIcon(focused, color)}
            />
          ),
        }}
      />
    </MainTab.Navigator>
  );
}

const styles = StyleSheet.create(() => ({
  tabBarIcon: (focused: boolean, color: string) => ({
    opacity: focused ? 1 : 0.6,
    color,
  }),
}));
