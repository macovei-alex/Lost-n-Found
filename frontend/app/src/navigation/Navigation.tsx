import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useAuthContext } from "src/context/AuthContext";
import RootStackNavigator from "src/navigation/RootStackNavigator";
import LoginStackNavigator from "src/navigation/LoginStackNavigator";

export default function Navigation() {
  const authContext = useAuthContext();

  return (
    <NavigationContainer>
      {authContext.isAuthenticated ? <RootStackNavigator /> : <LoginStackNavigator />}
    </NavigationContainer>
  );
}
