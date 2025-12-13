import { RouteProp, useRoute } from "@react-navigation/native";
import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import WebView from "react-native-webview";
import { RootStackParamList } from "src/navigation/RootStackNavigator";

type RouteProps = RouteProp<RootStackParamList, "WebViewScreen">;

export default function WebViewScreen() {
  const { uri } = useRoute<RouteProps>().params;

  return (
    <View style={styles.container}>
      <WebView source={{ uri }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
