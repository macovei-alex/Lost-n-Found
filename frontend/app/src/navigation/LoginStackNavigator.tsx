import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "src/screens/LoginScreen";
import RegisterScreen from "src/screens/RegisterScreen";

export type LoginStackParamList = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
};

const LoginStack = createNativeStackNavigator<LoginStackParamList>();

export default function LoginStackNavigator() {
  return (
    <LoginStack.Navigator screenOptions={{ headerShown: false }}>
      <LoginStack.Screen name="LoginScreen" component={LoginScreen} />
      <LoginStack.Screen name="RegisterScreen" component={RegisterScreen} />
    </LoginStack.Navigator>
  );
}
