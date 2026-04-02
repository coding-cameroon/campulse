import { MOCK_CAMPUS_EVENTS } from "$/data/map";
import { COLORS } from "@/utils/colors";
import { Fontisto } from "@expo/vector-icons";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import dayjs from "dayjs";
import * as Linking from "expo-linking";
import { CalendarDays, Clock, MapPin, Ticket, X } from "lucide-react-native";
import React, { useMemo, useRef, useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
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
  const [event, setEvent] = useState<CampusEvent>();
  const [activeImg, setActiveImg] = useState<string | null>();

  const handleOpenSheet = (id: string) => {
    sheetRef.current?.snapToIndex(2);

    const filteredEvents = MOCK_CAMPUS_EVENTS.find((event) => event._id === id);
    setEvent(filteredEvents);

    setActiveImg("");
  };

  const handleCloseSheet = () => {
    sheetRef.current?.close();
  };

  const openWhatsApp = (phoneNumber: string) => {
    const cleanNumber = phoneNumber.trim();
    const message = `Hello! I'm interested in the event: *${event?.title}* 🗓️

📍 *Location:* ${event?.location}
⏰ *Time:* ${dayjs(event?.time).format("MMM D, YYYY h:mm A").toUpperCase()}
💰 *Entry:* ${event?.isFree ? "Free" : `${event?.price} CFA`}

I'd like to get more information or confirm my attendance. Looking forward to your reply!`;

    const url = `whatsapp://send?phone=${cleanNumber}&text=${encodeURIComponent(message)}`;

    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        Alert.alert("Error", "WhatsApp is not installed on this device");
      }
    });
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
        index={-1}
        ref={sheetRef}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        handleIndicatorStyle={{ display: "none" }}
        backgroundStyle={{ backgroundColor: "#111" }}
      >
        <BottomSheetView style={{ flex: 1 }}>
          <View className="flex-1 px-2">
            {/* HEADER */}
            <View className="flex-row gap-2 items-center justify-between px-3">
              <View className="flex-1 flex-row gap-3 items-center justify-start">
                <View className="size-12 rounded-2xl bg-accent items-center justify-center shrink-0">
                  <CalendarDays color="black" size={24} />
                </View>

                <View className="flex-1">
                  <Text
                    className="text-2xl font-black tracking-tight text-white"
                    numberOfLines={2}
                  >
                    {event?.title}
                  </Text>
                  <View className="flex-row items-center gap-1">
                    <View className="px-2 py-0.5 rounded-md bg-zinc-800">
                      <Text className="text-[10px] font-bold uppercase text-accent">
                        {event?.category}
                      </Text>
                    </View>
                    <Text className="text-zinc-500 text-xs">•</Text>
                    <Text className="text-zinc-400 text-xs">
                      Hosted by {event?.author.fullName.split(" ")[0]}
                    </Text>
                  </View>
                </View>
              </View>

              <TouchableOpacity
                onPress={handleCloseSheet}
                className="bg-zinc-800 size-9 items-center justify-center rounded-full border border-zinc-700"
              >
                <X color={"#a1a1aa"} size={20} />
              </TouchableOpacity>
            </View>

            {/* CONTENT AREA */}
            <ScrollView
              className="flex-1 mt-6 px-3"
              showsVerticalScrollIndicator={false}
            >
              {/* INFO GRID */}
              <View className="flex-row flex-wrap gap-4 mb-6">
                {/* Time Info */}
                <View className="flex-row items-center gap-3 w-[45%]">
                  <View className="size-9 rounded-full bg-zinc-900 items-center justify-center border border-zinc-800">
                    <Clock color="#a1a1aa" size={18} />
                  </View>
                  <View>
                    <Text className="text-zinc-500 text-[10px] uppercase font-bold">
                      Time
                    </Text>
                    <Text className="text-white text-sm font-medium uppercase">
                      {dayjs(event?.time).format("MMM D, YYYY h:mm A")}
                    </Text>
                  </View>
                </View>

                {/* Location Info */}
                <View className="flex-row items-center gap-3 w-[45%]">
                  <View className="size-9 rounded-full bg-zinc-900 items-center justify-center border border-zinc-800">
                    <MapPin color="#a1a1aa" size={18} />
                  </View>
                  <View>
                    <Text className="text-zinc-500 text-[10px] uppercase font-bold">
                      Location
                    </Text>
                    <Text
                      className="text-white text-sm font-medium"
                      numberOfLines={1}
                    >
                      {event?.location}
                    </Text>
                  </View>
                </View>

                {/* Price Info */}
                <View className="flex-row items-center gap-3 w-[45%]">
                  <View className="size-9 rounded-full bg-zinc-900 items-center justify-center border border-zinc-800">
                    <Ticket color="#a1a1aa" size={18} />
                  </View>
                  <View>
                    <Text className="text-zinc-500 text-[10px] uppercase font-bold">
                      Entry
                    </Text>
                    <Text
                      className={`text-sm font-bold ${event?.isFree ? "text-green-400" : "text-white"}`}
                    >
                      {event?.isFree ? "FREE" : `$${event?.price}`}
                    </Text>
                  </View>
                </View>
              </View>

              {/* DESCRIPTION */}
              <View className="mb-8">
                <Text className="text-zinc-500 text-[10px] uppercase font-bold mb-2 tracking-widest">
                  About Event
                </Text>
                <Text className="text-zinc-300 text-[15px] leading-6">
                  {event?.description ||
                    "No description provided for this event."}
                </Text>
              </View>

              {/* ORGANIZER MINI CARD */}
              <View className="bg-zinc-900/50 p-4 rounded-3xl border border-zinc-800 flex-row mb-10">
                <Image
                  source={{ uri: activeImg || event?.images[0] }}
                  style={{ width: "100%", height: 300, borderRadius: 10 }}
                />
              </View>
            </ScrollView>

            {/* FOOTER ACTION */}

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                width: "100%",
                alignItems: "center",
                gap: 8,
              }}
              className="bg-zinc-900/50 p-4 rounded-3xl border border-zinc-800 flex-row mb-10"
            >
              {event?.images.map((img, idx) => (
                <TouchableOpacity onPress={() => setActiveImg(img)}>
                  <Image
                    key={img + idx + Date.now()}
                    source={{ uri: img }}
                    style={[
                      { width: 50, height: 50, borderRadius: 10 },
                      activeImg === img
                        ? { borderWidth: 2, borderColor: COLORS.accent }
                        : "",
                    ]}
                  />
                </TouchableOpacity>
              ))}
            </ScrollView>
            <View
              className="px-4 pt-4 border-t border-zinc-900"
              style={{ paddingBottom: 20 }}
            >
              <TouchableOpacity
                activeOpacity={0.8}
                className="bg-accent flex-row gap-2 h-14 rounded-2xl items-center justify-center shadow-lg shadow-accent/20"
                onPress={() => openWhatsApp(event?.phoneNumber as string)}
              >
                <Fontisto name="whatsapp" size={20} color="black" />
                <Text className="text-black text-lg font-black italic uppercase">
                  {event?.isFree ? "RSVP Now" : "Get Tickets"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </BottomSheetView>
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
