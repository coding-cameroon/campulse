import { Download, X } from "lucide-react-native";
import React from "react";
import { Image, Modal, Pressable, TouchableOpacity, View } from "react-native";

interface SimpleImageAlertProps {
  visible: boolean;
  onClose: () => void;
  imageSource: any;
}

const SimpleImageAlert = ({
  visible,
  onClose,
  imageSource,
}: SimpleImageAlertProps) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <Pressable
        onPress={onClose}
        className="flex-1 bg-black/90 justify-center items-center px-4"
      >
        {/* Removed aspect-square and fixed height to allow natural expansion */}
        <View className="w-full max-w-[400px]">
          <View className="flex-row items-center justify-between mb-4">
            {/* download image */}
            <TouchableOpacity
              disabled
              onPress={() => {}}
              activeOpacity={0.8}
              className=" bg-black/60 p-2 rounded-full border border-white/20 opacity-35"
            >
              <Download size={20} color="white" />
            </TouchableOpacity>

            {/* Close Button Inside the Image Area */}
            <TouchableOpacity
              onPress={onClose}
              activeOpacity={0.8}
              className=" bg-black/60 p-2 rounded-full border border-white/20"
            >
              <X size={20} color="white" />
            </TouchableOpacity>
          </View>

          <Image
            source={imageSource}
            className="w-full min-h-[300px] rounded-lg border-[0.5px] border-white/30"
            resizeMode="cover"
          />
        </View>
      </Pressable>
    </Modal>
  );
};

export default SimpleImageAlert;
