import { Stack } from "expo-router";
import "../../global.css";

export default function RootLayout() {
  const isSignedIn = false;
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!isSignedIn}>
        <Stack.Screen name="(auth)" />
      </Stack.Protected>
      <Stack.Protected guard={!!isSignedIn}>
        <Stack.Screen name="(home)" />
      </Stack.Protected>
    </Stack>
  );
}
