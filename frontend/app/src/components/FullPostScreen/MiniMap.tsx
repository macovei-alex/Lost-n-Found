import { FontAwesome } from "@expo/vector-icons";
import { View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, withUnistyles } from "react-native-unistyles";

type MiniMapProps = {
  coordinates: {
    latitude: number;
    longitude: number;
  };
};

export default function MiniMap({ coordinates }: MiniMapProps) {
  return (
    <View style={styles.container}>
      <UMapView
        style={styles.map}
        region={{
          latitude: coordinates.latitude,
          longitude: coordinates.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <Marker coordinate={{ latitude: coordinates.latitude, longitude: coordinates.longitude }}>
          <UFontAwesome name="map-marker" size={36} />
        </Marker>
      </UMapView>
    </View>
  );
}

const UMapView = withUnistyles(MapView, (theme) => ({
  userInterfaceStyle: theme.name,
}));

const UFontAwesome = withUnistyles(FontAwesome, (theme) => ({
  color: theme.colors.primaryA0,
}));

const styles = StyleSheet.create((theme) => ({
  container: {
    width: "100%",
    height: 300,
  },
  map: {
    flex: 1,
  },
}));
