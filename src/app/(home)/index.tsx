import { COLORS } from "@/utils/colors";
import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS["dark-3"] }}>
      <Text>HomeScreen</Text>
    </SafeAreaView>
  );
}
