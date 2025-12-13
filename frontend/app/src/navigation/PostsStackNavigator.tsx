import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FeedScreen from "src/screens/FeedScreen";
import FullPostScreen from "src/screens/FullPostScreen";

export type PostsStackParamList = {
  FeedScreen: undefined;
  FullPostScreen: { postId: number };
};

const PostsStack = createNativeStackNavigator<PostsStackParamList>();

export default function PostsStackNavigator() {
  return (
    <PostsStack.Navigator screenOptions={{ headerShown: false }}>
      <PostsStack.Screen name="FeedScreen" component={FeedScreen} />
      <PostsStack.Screen name="FullPostScreen" component={FullPostScreen} />
    </PostsStack.Navigator>
  );
}
