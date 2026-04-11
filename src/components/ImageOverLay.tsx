import { Download, X } from "lucide-react-native";
import React from "react";
import {
  Dimensions,
  Image,
  Modal,
  Pressable,
  TouchableOpacity,
  View,
} from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

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
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <Pressable
        onPress={onClose}
        className="flex-1 bg-black/95 justify-center items-center px-5"
      >
        {/* Inner pressable stops tap from bubbling to backdrop */}
        <Pressable onPress={(e) => e.stopPropagation()}>
          <View style={{ width: SCREEN_WIDTH - 40 }}>
            {/* ── ACTION ROW ── */}
            <View className="flex-row items-center justify-between mb-3">
              {/* Download — disabled */}
              <TouchableOpacity
                disabled
                activeOpacity={0.8}
                className="bg-white/10 p-2.5 rounded-full border border-white/10 opacity-30"
              >
                <Download size={18} color="white" />
              </TouchableOpacity>

              {/* Close */}
              <TouchableOpacity
                onPress={onClose}
                activeOpacity={0.8}
                className="bg-white/10 p-2.5 rounded-full border border-white/10"
              >
                <X size={18} color="white" />
              </TouchableOpacity>
            </View>

            {/* ── IMAGE ── */}
            <Image
              source={imageSource}
              style={{
                width: SCREEN_WIDTH - 40,
                height: undefined,
                aspectRatio: 1,
                maxHeight: SCREEN_HEIGHT * 0.7,
              }}
              className="rounded-2xl border border-white/10"
              resizeMode="contain"
            />
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default SimpleImageAlert;
