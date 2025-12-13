import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainTabNavigator from "src/navigation/MainTabNavigator";
import WebViewScreen from "src/screens/WebViewScreen";

export type RootStackParamList = {
  MainTabNavigator: undefined;
  WebViewScreen: { uri: string };
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function RootStackNavigator() {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen name="MainTabNavigator" component={MainTabNavigator} />
      <RootStack.Screen name="WebViewScreen" component={WebViewScreen} />
    </RootStack.Navigator>
  );
}
