import BottomSheet from "@gorhom/bottom-sheet";
import React, { useMemo } from "react";
import { Text, View } from "react-native";

const CustomBottomSheet = () => {
  const snapPoints = useMemo(() => ["25%", "50%", "70%"], []);
  return (
    <BottomSheet index={1} snapPoints={snapPoints}>
      <View>
        <Text className="text-white font-bold text-3xl">Hello</Text>
      </View>
    </BottomSheet>
  );
};

export default CustomBottomSheet;
