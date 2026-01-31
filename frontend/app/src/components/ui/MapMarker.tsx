import { FontAwesome } from "@expo/vector-icons";
import { Marker } from "react-native-maps";
import { withUnistyles } from "react-native-unistyles";
import { Coordinates } from "src/api/types/Posts";

type MapMarkerProps = {
  coordinate: Coordinates;
};

export function MapMarker(props: MapMarkerProps) {
  return (
    <Marker {...props}>
      <UFontAwesome name="map-marker" size={36} />
    </Marker>
  );
}

const UFontAwesome = withUnistyles(FontAwesome, (theme) => ({
  color: theme.colors.primaryA0,
}));
