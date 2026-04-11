import {
  BookOpen,
  Coffee,
  Dumbbell,
  FlaskConical,
  Library,
  Wifi,
} from "lucide-react-native";
import { Text, View } from "react-native";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";

const CAMPUS_LOCATIONS = [
  {
    id: "1",
    name: "Main Library",
    shortName: "Library",
    description: "Books, study rooms, printing",
    coordinate: { latitude: 4.0483, longitude: 9.7043 },
    icon: Library,
    color: "#3b82f6",
  },
  {
    id: "2",
    name: "Cafeteria",
    shortName: "Cafeteria",
    description: "Food & drinks, 7am - 8pm",
    coordinate: { latitude: 4.049, longitude: 9.705 },
    icon: Coffee,
    color: "#f97316",
  },
  {
    id: "3",
    name: "Computer Lab",
    shortName: "PC Lab",
    description: "Free WiFi, 40 computers",
    coordinate: { latitude: 4.0486, longitude: 9.7046 },
    icon: Wifi,
    color: "#22c55e",
  },
  {
    id: "4",
    name: "Lecture Hall A",
    shortName: "Hall A",
    description: "Capacity: 200 students",
    coordinate: { latitude: 4.0488, longitude: 9.7048 },
    icon: BookOpen,
    color: "#a855f7",
  },
  {
    id: "5",
    name: "Sports Complex",
    shortName: "Gym",
    description: "Football, basketball, gym",
    coordinate: { latitude: 4.0495, longitude: 9.7055 },
    icon: Dumbbell,
    color: "#ef4444",
  },
  {
    id: "6",
    name: "Science Lab",
    shortName: "Lab",
    description: "Chemistry & Physics labs",
    coordinate: { latitude: 4.0492, longitude: 9.7052 },
    icon: FlaskConical,
    color: "#06b6d4",
  },
];

export default function CampusMapScreen() {
  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      rotateEnabled={true}
      pitchEnabled={false}
      showsUserLocation={true}
      showsMyLocationButton={true}
      mapType="hybrid"
      style={{ flex: 1 }}
      initialRegion={{
        latitude: 4.0489,
        longitude: 9.7049,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
    >
      {CAMPUS_LOCATIONS.map((location) => {
        const Icon = location.icon;

        return (
          <Marker
            key={location.id}
            coordinate={location.coordinate}
            anchor={{ x: 0.5, y: 1 }}
            // ✅ Pushes callout up by 20px away from the marker
            calloutOffset={{ x: 0, y: -20 }}
          >
            {/* ── CUSTOM MARKER ── */}
            <View style={{ alignItems: "center" }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: "#0a0a0a",
                  borderRadius: 20,
                  paddingHorizontal: 10,
                  paddingVertical: 6,
                  gap: 6,
                  borderWidth: 1.5,
                  borderColor: location.color,
                  shadowColor: location.color,
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.4,
                  shadowRadius: 6,
                  elevation: 6,
                }}
              >
                <View
                  style={{
                    backgroundColor: location.color + "20",
                    padding: 4,
                    borderRadius: 8,
                  }}
                >
                  <Icon size={12} color={location.color} />
                </View>
                <Text
                  style={{
                    color: "white",
                    fontSize: 11,
                    fontWeight: "800",
                  }}
                >
                  {location.shortName}
                </Text>
              </View>

              {/* Pointer triangle */}
              <View
                style={{
                  width: 0,
                  height: 0,
                  borderLeftWidth: 6,
                  borderRightWidth: 6,
                  borderTopWidth: 8,
                  borderLeftColor: "transparent",
                  borderRightColor: "transparent",
                  borderTopColor: location.color,
                }}
              />
            </View>

            {/* ── CALLOUT ── */}
            <Callout
              tooltip
              style={{
                // ✅ Extra spacing between callout and marker
                marginBottom: 16,
              }}
            >
              <View
                style={{
                  backgroundColor: "#0a0a0a",
                  borderRadius: 16,
                  padding: 14,
                  minWidth: 180,
                  borderWidth: 1,
                  borderColor: "#1a1a1a",
                  // ✅ Subtle shadow so callout floats visually
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.5,
                  shadowRadius: 8,
                  elevation: 10,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 6,
                  }}
                >
                  <View
                    style={{
                      backgroundColor: location.color + "20",
                      padding: 6,
                      borderRadius: 10,
                    }}
                  >
                    <Icon size={16} color={location.color} />
                  </View>
                  <Text
                    style={{
                      color: "white",
                      fontSize: 14,
                      fontWeight: "800",
                    }}
                  >
                    {location.name}
                  </Text>
                </View>

                <View
                  style={{
                    height: 1,
                    backgroundColor: "#1a1a1a",
                    marginBottom: 8,
                  }}
                />

                <Text
                  style={{
                    color: "#71717a",
                    fontSize: 12,
                    fontWeight: "600",
                  }}
                >
                  {location.description}
                </Text>
              </View>
            </Callout>
          </Marker>
        );
      })}
    </MapView>
  );
}
