import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainTabNavigator, { MainTabParamList } from "src/navigation/MainTabNavigator";
import WebViewScreen from "src/screens/WebViewScreen";
import MapScreen from "src/screens/MapScreen";
import { NavigatorScreenParams } from "@react-navigation/native";
import { Coordinates } from "src/api/types/Posts";

export type RootStackParamList = {
  MainTabNavigator: NavigatorScreenParams<MainTabParamList>;
  WebViewScreen: { uri: string };
  MapScreen: { initialCoordinates: Coordinates } | undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function RootStackNavigator() {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen name="MainTabNavigator" component={MainTabNavigator} />
      <RootStack.Screen name="WebViewScreen" component={WebViewScreen} />
      <RootStack.Screen name="MapScreen" component={MapScreen} />
    </RootStack.Navigator>
  );
}
