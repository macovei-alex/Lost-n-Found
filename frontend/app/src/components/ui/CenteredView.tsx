import React from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

type CenteredViewProps = React.ComponentProps<typeof View> & {
  direction?: "row" | "column" | "both";
};

export function CenteredView(props: CenteredViewProps) {
  return <View {...props} style={[styles.fill, getAlignamntStyles(props.direction), props.style]} />;
}

const styles = StyleSheet.create(() => ({
  fill: {
    flex: 1,
  },
  centeredVertical: {
    alignItems: "center",
  },
  centeredHorizontal: {
    justifyContent: "center",
  },
}));

function getAlignamntStyles(direction: CenteredViewProps["direction"]) {
  if (!direction || direction === "both") {
    return [styles.centeredVertical, styles.centeredHorizontal];
  } else if (direction === "row") {
    return styles.centeredVertical;
  } else {
    return styles.centeredHorizontal;
  }
}
