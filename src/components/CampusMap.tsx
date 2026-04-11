import {
  BookOpen,
  BriefcaseBusiness,
  Building,
  Building2,
  CircuitBoard,
  Computer,
  Cpu,
  DoorOpen,
  Gpu,
  Toilet,
} from "lucide-react-native";
import { Text, View } from "react-native";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { InitialRegion, Polygon } from "../../types";

const CAMPUS_LOCATIONS = [
  {
    id: "1",
    name: "Bâtiment C",
    shortName: "Bat C",
    description: "Salles de cours du département GI et GIM.",
    coordinate: { latitude: 4.056165570864137, longitude: 9.745511077344418 },
    icon: Building,
    color: "#3b82f6", // blue
  },
  {
    id: "2",
    name: "Bâtiment B",
    shortName: "Bat B",
    description: "Salles de cours du département GC et GEA.",
    coordinate: { latitude: 4.056070590942527, longitude: 9.745177812874317 },
    icon: Building,
    color: "#f97316", // orange
  },
  {
    id: "3",
    name: "Amphi 200",
    shortName: "Amphi 200",
    description: "Grand amphithéâtre de 200 places pour cours magistraux.",
    coordinate: { latitude: 4.056053534687811, longitude: 9.744760058820248 },
    icon: Building2,
    color: "#22c55e", // green
  },
  {
    id: "4",
    name: "Bibliothèque",
    shortName: "Biblio",
    description: "Ressources pédagogiques, Wi-Fi gratuit et salles de lecture.",
    coordinate: { latitude: 4.055692343327039, longitude: 9.744799621403217 },
    icon: BookOpen,
    color: "#a855f7", // purple
  },
  {
    id: "5",
    name: "Toilettes",
    shortName: "Toilettes",
    description: "Toilettes mixtes accessibles à tous les étudiants.",
    coordinate: { latitude: 4.0556277970761245, longitude: 9.74516037851572 },
    icon: Toilet,
    color: "#64748b", // slate
  },
  {
    id: "6",
    name: "Bâtiment A",
    shortName: "Bat A",
    description: "Salles de cours du département GEE et MTI.",
    coordinate: { latitude: 4.055347873638132, longitude: 9.74522341042757 },
    icon: Building,
    color: "#06b6d4", // cyan
  },
  {
    id: "7",
    name: "Bloc GRT",
    shortName: "Bloc GRT",
    description: "Salles de cours et laboratoires du département GRT.",
    coordinate: { latitude: 4.0557124095179855, longitude: 9.745597243309021 },
    icon: Gpu,
    color: "#ec4899", // pink
  },
  {
    id: "8",
    name: "Labo Informatique",
    shortName: "Labo Info",
    description: "Salle informatique équipée de 40 postes et Wi-Fi.",
    coordinate: { latitude: 4.055899359506347, longitude: 9.745631106197834 },
    icon: Computer,
    color: "#14b8a6", // teal
  },
  {
    id: "9",
    name: "Labo Mécanique",
    shortName: "Labo Méca",
    description: "Laboratoire pratique pour les départements MTI.",
    coordinate: { latitude: 4.056654182185801, longitude: 9.74506214261055 },
    icon: Cpu,
    color: "#f59e0b",
  },
  {
    id: "15",
    name: "Labo Electrique",
    shortName: "Labo Méca",
    description: "Laboratoire pratique pour les départements GEII, GBM.",
    coordinate: { latitude: 4.056574251948738, longitude: 9.74552046507597 },
    icon: CircuitBoard,
    color: "#8b5cf6",
  },
  {
    id: "10",
    name: "Bureaux Administratifs",
    shortName: "Bureaux",
    description: "Bureau du proviseur, scolarité et services administratifs.",
    coordinate: { latitude: 4.056226103836526, longitude: 9.745917432010174 },
    icon: BriefcaseBusiness,
    color: "#ef4444", // red
  },
  {
    id: "11",
    name: "Bloc A",
    shortName: "Bloc A",
    description: "Salles A11, A12 et A13.",
    coordinate: { latitude: 4.058128040829917, longitude: 9.741453565657139 },
    icon: Building,
    color: "#8b5cf6", // violet
  },
  {
    id: "12",
    name: "Bloc A",
    shortName: "Bloc A",
    description: "Salles A21, A22 et A23.",
    coordinate: { latitude: 4.0583250233222, longitude: 9.741709046065807 },
    icon: Building,
    color: "#84cc16", // lime
  },
  {
    id: "13",
    name: "Barrière Principale",
    shortName: "Entrée Principale",
    description:
      "Entrée principale de l'IUT, accessible aux étudiants et au personnel.",
    coordinate: { latitude: 4.05608798163323, longitude: 9.746085070073605 },
    icon: DoorOpen,
    color: "#f97316", // orange
  },
  {
    id: "14",
    name: "Barrière Secondaire",
    shortName: "Entrée Secondaire",
    description:
      "Entrée secondaire de l'IUT, utilisée pour la sortie des véhicules.",
    coordinate: { latitude: 4.05638797098901, longitude: 9.744591750204563 },
    icon: DoorOpen,
    color: "#10b981", // emerald
  },
];

interface MapProps {
  iutRegion?: InitialRegion;
  iutDoualaPolygon?: Polygon[];
}

export function CampusMap({ iutRegion, iutDoualaPolygon }: MapProps) {
  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      rotateEnabled={true}
      pitchEnabled={false}
      showsUserLocation={true}
      showsMyLocationButton={true}
      mapType="hybrid"
      style={{ flex: 1 }}
      initialRegion={iutRegion}
      onLongPress={(e) => console.log(JSON.stringify(e.nativeEvent.coordinate))}
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
