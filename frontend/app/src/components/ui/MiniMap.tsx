import { View } from "react-native";
import MapView from "react-native-maps";
import { StyleSheet, withUnistyles } from "react-native-unistyles";
import { Coordinates } from "src/api/types/Posts";
import { MapMarker } from "./MapMarker";

type MiniMapProps = {
  coordinates: Coordinates;
  height?: number;
};

export function MiniMap({ coordinates, height = 300 }: MiniMapProps) {
  return (
    <View style={[styles.container, { height }]}>
      <UMapView
        style={styles.map}
        region={{
          ...coordinates,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <MapMarker coordinate={coordinates} />
      </UMapView>
    </View>
  );
}

const UMapView = withUnistyles(MapView, (theme) => ({
  userInterfaceStyle: theme.name,
}));

const styles = StyleSheet.create(() => ({
  container: {
    width: "100%",
  },
  map: {
    flex: 1,
  },
}));
