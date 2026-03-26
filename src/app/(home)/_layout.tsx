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
        tabBarStyle: styles.tabBarContainer,
        tabBarInactiveTintColor: COLORS.light,
        tabBarActiveTintColor: COLORS["dark-1"],
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

const styles = StyleSheet.create({
  tabBarContainer: {
    position: "absolute",
    bottom: 50,
    left: 30,
    right: 30,
    height: 65,
    display: "flex",
    marginHorizontal: 30,
    backgroundColor: COLORS["dark-1"],
    borderRadius: 35,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    elevation: 0,
  },
});
