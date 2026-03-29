import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import MapView, { Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import { InitialRegion, Polygon } from "../../types/index";

interface MapProps {
  iutRegion: InitialRegion;
  iutDoualaPolygon: Polygon[];
}

const GoogleMap = ({ iutRegion, iutDoualaPolygon }: MapProps) => {
  return (
    <MapView
      style={styles.map}
      initialRegion={iutRegion}
      provider={PROVIDER_GOOGLE}
      rotateEnabled={false}
      pitchEnabled={false}
      showsUserLocation={true}
      showsMyLocationButton={true}
      mapType="hybrid"
      // onLongPress={(e) =>
      //   console.log(JSON.stringify(e.nativeEvent.coordinate))
      // }
    >
      {/* The Pathway */}
      <Polyline
        coordinates={iutDoualaPolygon}
        strokeColor="#f97316" // Your orange theme color
        strokeWidth={4}
        lineDashPattern={[1]} // Optional: makes it look like a dotted path
      />
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default GoogleMap;
