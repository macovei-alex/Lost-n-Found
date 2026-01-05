import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyPostsScreen from "src/screens/profile/MyPostsScreen";
import ProfileScreen from "src/screens/profile/ProfileScreen";

export type ProfileStackParamList = {
  ProfileScreen: undefined;
  MyPostsScreen: undefined;
};

const ProfileStack = createNativeStackNavigator();

export default function ProfileStackNavigator() {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen name="ProfileScreen" component={ProfileScreen} />
      <ProfileStack.Screen name="MyPostsScreen" component={MyPostsScreen} />
    </ProfileStack.Navigator>
  );
}
