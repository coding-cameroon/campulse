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
        <View className="w-full aspect-square max-w-[400px]">
          <View className="flex-row items-center justify-between gap-2">
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

          {/* The Actual Image */}
          <Image
            source={imageSource}
            className="w-full h-full"
            resizeMode="contain"
          />
        </View>
      </Pressable>
    </Modal>
  );
};

export default SimpleImageAlert;
