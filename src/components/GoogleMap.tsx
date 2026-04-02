import BottomSheet from "@gorhom/bottom-sheet";
import { CalendarDays, X } from "lucide-react-native";
import React, { useEffect, useMemo, useRef } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import {
  CampusEvent,
  EventCategory,
  InitialRegion,
  Polygon,
} from "../../types/index";

interface MapProps {
  markers?: CampusEvent[];
  iutRegion?: InitialRegion;
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

  const snapPoints = useMemo(() => ["25%", "50%", "70%", "80%"], []);
  const sheetRef = useRef<BottomSheet>(null);

  const handleOpenSheet = (id: string) => {
    sheetRef.current?.expand();

    // const filteredEvents = MOCK_CAMPUS_EVENTS.filter(
    //   (event) => event._id === id,
    // );
  };

  useEffect(() => {
    handleOpenSheet("hey");
  }, []);

  const handleCloseSheet = () => {
    sheetRef.current?.close();
  };

  return (
    <>
      <MapView
        style={styles.map}
        initialRegion={iutRegion}
        provider={PROVIDER_GOOGLE}
        rotateEnabled={true}
        pitchEnabled={false}
        showsUserLocation={true}
        showsMyLocationButton={true}
        mapType="hybrid"
        // onLongPress={(e) =>
        //   console.log(JSON.stringify(e.nativeEvent.coordinate))
        // }
        onMarkerPress={(e) => handleOpenSheet(e.nativeEvent.id)}
      >
        {/* The Pathway */}
        {iutDoualaPolygon && (
          <Polyline
            coordinates={iutDoualaPolygon}
            strokeColor="#f97316"
            strokeWidth={6}
            lineDashPattern={[1]}
          />
        )}

        {markers &&
          markers.map((marker: CampusEvent) => (
            <Marker
              key={marker._id}
              title={marker.title}
              identifier={marker._id}
              coordinate={marker.coordinate}
              pinColor={getMarkerColor(marker.category)}
              description={`${marker.location} • ${marker.isFree ? "Free" : marker.price + " CFA"}`}
            />
          ))}
      </MapView>

      <BottomSheet
        index={1}
        ref={sheetRef}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        handleIndicatorStyle={{ display: "none" }}
        backgroundStyle={{ backgroundColor: "#111" }}
      >
        <View className="flex-1 px-2">
          {/* HEADER */}
          <View className="flex-row gap-2 items-center justify-between px-3">
            <View className="flex-row gap-2 items-center justify-start">
              <View className="size-11 rounded-xl bg-accent p-2">
                <CalendarDays />
              </View>
              <Text className="text-xl font-bold tracking-wider text-white">
                Campus Event
              </Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleCloseSheet}
              className="bg-dark-1 size-8 items-center justify-center border-[0.5px] border-[#555] rounded-full"
            >
              <X color={"white"} size={20} />
            </TouchableOpacity>
          </View>
          {/* CONTENT */}
          <View>
            <Text>content</Text>
          </View>
        </View>
      </BottomSheet>
    </>
  );
};

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height - 60,
  },
});

export default GoogleMap;
