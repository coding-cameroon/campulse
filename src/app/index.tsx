import { Camera } from "lucide-react-native";
import { Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-5xl font-bold text-slate-800">Home Screen</Text>
      <Text>
        <Camera color="red" size={48} />;
      </Text>
    </View>
  );
}
