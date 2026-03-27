import TabBarIcon from "@/components/TabBarIcon";
import { COLORS } from "@/utils/colors";
import { Tabs } from "expo-router";
import {
  BrickWall,
  House,
  PackageSearch,
  Plus,
  UserRound,
} from "lucide-react-native";
import { StyleSheet } from "react-native";

export default function HomeLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false, // Keep it clean without text labels
        tabBarInactiveTintColor: COLORS.light,
        tabBarActiveTintColor: COLORS.accent, // Using accent for the active icon
        tabBarStyle: {
          paddingTop: 5,
          paddingBottom: 15,
          borderTopWidth: 0.5,
          height: 110,
          backgroundColor: COLORS["dark-3"],
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon Icon={House} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="event"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon Icon={BrickWall} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="new"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon Icon={Plus} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="lost-found"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon Icon={PackageSearch} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon Icon={UserRound} color={color} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({});
