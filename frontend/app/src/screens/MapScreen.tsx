import React, { useState, useRef, useEffect } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { View } from "react-native";
import { StyleSheet, withUnistyles } from "react-native-unistyles";
import MapView from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import { useCurrentLocation } from "src/hooks/useCurrentLocation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "src/navigation/RootStackNavigator";

type NavigationProps = NativeStackNavigationProp<RootStackParamList, "MapScreen">;

export default function MapScreen() {
  const navigation = useNavigation<NavigationProps>();

  const mapRef = useRef<MapView>(null);
  const isStartLocationLoaded = useRef(false);
  const [region, setRegion] = useState({
    latitude: 46.92485692655237,
    longitude: 26.937895583196728,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const { currentLocation: startLocation, permissionState } = useCurrentLocation();

  useEffect(() => {
    if (!isStartLocationLoaded.current && permissionState === "denied") {
      setRegion({ ...region });
      isStartLocationLoaded.current = true;
      return;
    }

    if (!isStartLocationLoaded.current && startLocation && permissionState !== "granted") {
      const newRegion = {
        latitude: startLocation.coords.latitude,
        longitude: startLocation.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
      setRegion(newRegion);
      mapRef.current?.animateToRegion(newRegion);
      isStartLocationLoaded.current = true;
      return;
    }
  }, [startLocation, permissionState, setRegion]);

  return (
    <View style={styles.container}>
      <UMapView
        ref={mapRef}
        style={styles.map}
        initialRegion={region}
        onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
      />

      <View style={styles.floatingContainer} pointerEvents="box-none">
        <UFontAwesome name="map-marker" size={48} />
      </View>
    </View>
  );
}

const UMapView = withUnistyles(MapView, (theme) => ({
  userInterfaceStyle: theme.name,
}));

const UFontAwesome = withUnistyles(FontAwesome, (theme) => ({
  color: theme.colors.primaryA0,
}));

const styles = StyleSheet.create((theme, runtime) => ({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  floatingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: runtime.insets.top + 16,
    paddingBottom: runtime.insets.bottom + 16,
    paddingHorizontal: 16,
  },
}));
