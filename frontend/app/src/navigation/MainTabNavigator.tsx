import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native-unistyles";
import ChatStackNavigator from "./ChatStackNavigator";
import PostsStackNavigator from "./PostsStackNavigator";
import CreatePostScreen from "src/screens/CreatePostScreen";

export type MainTabParamList = {
  PostsStackNavigator: undefined;
  CreatePostScreen: undefined;
  Chat: undefined;
};

const MainTab = createBottomTabNavigator();

export default function MainTabNavigator() {
  return (
    <MainTab.Navigator
      screenOptions={({ navigation, route }) => ({
        headerShown: false,
        tabBarStyle: styles.tabBar,
      })}
    >
      <MainTab.Screen
        name="PostsStackNavigator"
        component={PostsStackNavigator}
        options={{
          title: "Posts",
          tabBarIcon: ({ focused, color, size }) => <></>,
        }}
      />
      <MainTab.Screen
        name="CreatePostScreen"
        component={CreatePostScreen}
        options={{
          title: "Create",
          tabBarIcon: ({ focused, color, size }) => <></>,
        }}
      />
      <MainTab.Screen
        name="Chat"
        component={ChatStackNavigator}
        options={{
          title: "Chat",
          tabBarIcon: ({ focused, color, size }) => <></>,
        }}
      />
    </MainTab.Navigator>
  );
}

const styles = StyleSheet.create((theme) => ({
  tabBar: {
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    backgroundColor: theme.colors.surfaceA20,
  },
}));
