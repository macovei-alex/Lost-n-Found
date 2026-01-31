import React, { useState, useRef, useEffect } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { View } from "react-native";
import { StyleSheet, withUnistyles } from "react-native-unistyles";
import MapView from "react-native-maps";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { useCurrentLocation } from "src/hooks/useCurrentLocation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "src/navigation/RootStackNavigator";
import { ActivityIndicator, Text, TouchableOpacity } from "src/components/ui";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { loadAddressFromCoordinates } from "src/api/options/loadAddressFromCoordinates";
import { useAuthContext } from "src/context/AuthContext";

type NavigationProps = NativeStackNavigationProp<RootStackParamList, "MapScreen">;
type RouteProps = RouteProp<RootStackParamList, "MapScreen">;

export default function MapScreen() {
  const navigation = useNavigation<NavigationProps>();
  const params = useRoute<RouteProps>().params;
  const { api } = useAuthContext();
  const queryClient = useQueryClient();

  const mapRef = useRef<MapView>(null);
  const isStartLocationLoaded = useRef(false);
  const [region, setRegion] = useState({
    latitude: params?.initialCoordinates.latitude ?? 45.65,
    longitude: params?.initialCoordinates.longitude ?? 25.61,
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

  const [address, setAddress] = useState("");
  const addressQuery = useQuery({
    ...loadAddressFromCoordinates(api, region),
    enabled: false,
  });

  useEffect(() => {
    const handler = setTimeout(() => {
      if (region) {
        queryClient
          .cancelQueries(addressQuery)
          .then(() => addressQuery.refetch())
          .then((result) => setAddress(result.data ?? ""));
      }
    }, 500);

    return () => clearTimeout(handler);
  }, [region]);

  const handleNavigationPress = () => {
    navigation.navigate({
      name: "MainTabNavigator",
      params: {
        screen: "CreatePostScreen",
        params: {
          coordinates: {
            latitude: region.latitude,
            longitude: region.longitude,
          },
        },
      },
      merge: true,
    });
  };

  return (
    <View style={styles.container}>
      <UMapView
        ref={mapRef}
        style={styles.map}
        initialRegion={region}
        onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
      />

      <View style={styles.floatingContainer} pointerEvents="box-none">
        {/* top section */}
        <View style={styles.addressContainer}>
          <View style={styles.iconContainer}>
            {addressQuery.isLoading ? (
              <ActivityIndicator size={32} />
            ) : (
              <UFontAwesome name="home" size={32} />
            )}
          </View>
          <Text style={styles.addressText} numberOfLines={2}>
            {address}
          </Text>
        </View>

        <UFontAwesome name="map-marker" size={48} />

        <TouchableOpacity style={styles.selectAddressButton} onPress={handleNavigationPress}>
          <Text style={styles.selectAddressText}>Select</Text>
        </TouchableOpacity>
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
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: runtime.insets.top + 16,
    paddingBottom: runtime.insets.bottom + 16,
    paddingHorizontal: 16,
  },
  addressContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    padding: 16,
    borderRadius: 12,
    backgroundColor: theme.colors.surfaceA20,
  },
  iconContainer: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  addressText: {
    fontSize: 16,
    fontWeight: "bold",
    flexGrow: 1,
    flexShrink: 1,
  },
  selectAddressButton: {
    width: "100%",
    alignItems: "center",
    borderRadius: 12,
    paddingVertical: 12,
    backgroundColor: theme.colors.primaryA0,
  },
  selectAddressText: {
    fontSize: 18,
    fontWeight: "600",
  },
}));
