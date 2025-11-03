import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native-unistyles";
import { View } from "react-native";
import FeedScreen from "src/screens/FeedScreen";

export type MainTabParamList = {};

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
        name="FeedScreen"
        component={FeedScreen}
        options={{
          title: "Feed",
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
    backgroundColor: theme.background.navbar,
  },
}));
