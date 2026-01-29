import React from "react";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { useAuthContext } from "src/context/AuthContext";
import RootStackNavigator from "src/navigation/RootStackNavigator";
import LoginStackNavigator from "src/navigation/LoginStackNavigator";
import { useUnistyles } from "react-native-unistyles";

export default function Navigation() {
  const authContext = useAuthContext();
  const { theme } = useUnistyles();

  return (
    <NavigationContainer
      theme={{
        dark: theme.name === "dark",
        fonts: DefaultTheme.fonts,
        colors: {
          primary: theme.colors.primaryA0,
          background: theme.colors.surfaceA10,
          card: theme.colors.surfaceA20,
          text: theme.colors.text,
          border: theme.colors.surfaceA30,
          notification: theme.colors.primaryA0,
        },
      }}
    >
      {authContext.isAuthenticated ? <RootStackNavigator /> : <LoginStackNavigator />}
    </NavigationContainer>
  );
}
