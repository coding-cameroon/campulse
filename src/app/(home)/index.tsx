import Button from "@/components/Button";
import { COLORS } from "@/utils/colors";
import { useClerk } from "@clerk/expo";
import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { signOut } = useClerk();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS["dark-3"] }}>
      <Text>HomeScreen</Text>
      <Button onPress={() => signOut()}>Sign Out</Button>
    </SafeAreaView>
  );
}
