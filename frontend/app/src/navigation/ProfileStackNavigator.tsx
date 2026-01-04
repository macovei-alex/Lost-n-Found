import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "src/screens/ProfileScreen";

export type ProfileStackParamList = {
  ProfileScreen: undefined;
};

const ProfileStack = createNativeStackNavigator();

export default function ProfileStackNavigator() {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen name="ProfileScreen" component={ProfileScreen} />
    </ProfileStack.Navigator>
  );
}
