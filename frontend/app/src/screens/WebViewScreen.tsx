import { RouteProp, useRoute } from "@react-navigation/native";
import { useEffect } from "react";
import { View } from "react-native";
import WebView from "react-native-webview";
import { RootStackParamList } from "src/navigation/RootStackNavigator";
import * as NavigationBar from "expo-navigation-bar";

type RouteProps = RouteProp<RootStackParamList, "WebViewScreen">;

export default function WebViewScreen() {
  const { uri } = useRoute<RouteProps>().params;

  useEffect(() => {
    let initialVisibility: NavigationBar.NavigationBarVisibility | null = null;

    (async () => {
      initialVisibility = await NavigationBar.getVisibilityAsync();
      await NavigationBar.setVisibilityAsync("visible");
    })();

    return () => {
      if (initialVisibility) {
        NavigationBar.setVisibilityAsync(initialVisibility);
      }
    };
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <WebView source={{ uri }} />
    </View>
  );
}
