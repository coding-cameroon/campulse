import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import {
  CampusEvent,
  EventCategory,
  InitialRegion,
  Polygon,
} from "../../types/index";

interface MapProps {
  markers?: CampusEvent[];
  iutRegion: InitialRegion;
  iutDoualaPolygon?: Polygon[];
}

const GoogleMap = ({ iutRegion, iutDoualaPolygon, markers }: MapProps) => {
  const getMarkerColor = (category: EventCategory) => {
    switch (category) {
      case "Tech":
        return "#3b82f6"; // Blue
      case "Sports":
        return "#22c55e"; // Green
      case "Social":
        return "#ec4899"; // Pink
      case "Academic":
        return "#f59e0b"; // Orange
      default:
        return "#000000";
    }
  };

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
      {iutDoualaPolygon && (
        <Polyline
          coordinates={iutDoualaPolygon}
          strokeColor="#f97316" // Your orange theme color
          strokeWidth={6}
          lineDashPattern={[1]} // Optional: makes it look like a dotted path
        />
      )}

      {markers &&
        markers.map((marker: CampusEvent) => (
          <Marker
            key={marker._id}
            title={marker.title}
            coordinate={marker.coordinate}
            pinColor={getMarkerColor(marker.category)}
            description={`${marker.location} • ${marker.isFree ? "Free" : marker.price + " CFA"}`}
          />
        ))}
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
