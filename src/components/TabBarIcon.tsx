import { COLORS } from "@/utils/colors";
import type { LucideIcon } from "lucide-react-native";
import { StyleSheet, View } from "react-native";

interface TabBarIconprops {
  color: string;
  focused: boolean;
  Icon: LucideIcon;
}

const TabBarIcon = ({ color, focused, Icon }: TabBarIconprops) => {
  return (
    <View
      style={[
        styles.activeBar,
        focused
          ? { backgroundColor: COLORS.accent }
          : {
              backgroundColor: "transparent",
            },
      ]}
    >
      <Icon color={color} size={focused ? 26 : 24} />
    </View>
  );
};

const styles = StyleSheet.create({
  activeBar: {
    height: 50,
    borderRadius: 60,
    width: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
});

export default TabBarIcon;
