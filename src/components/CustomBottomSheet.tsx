import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import React, { forwardRef, useMemo } from "react";
import { Text } from "react-native";

const CustomBottomSheet = forwardRef<BottomSheet, any>((props, ref) => {
  const snapPoints = useMemo(() => ["25%", "50%", "70%", "90%"], []);

  return (
    <BottomSheet
      ref={ref}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      style={{ zIndex: 99999 }}
      backgroundStyle={{ backgroundColor: "#111" }}
      handleIndicatorStyle={{ backgroundColor: "white" }}
      {...props}
    >
      <BottomSheetView style={{ flex: 1, alignItems: "center", padding: 20 }}>
        <Text className="text-white font-bold text-3xl">Event Details</Text>
      </BottomSheetView>
    </BottomSheet>
  );
});

export default CustomBottomSheet;
