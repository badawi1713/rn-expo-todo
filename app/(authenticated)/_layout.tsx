import { Colors } from "@/constants/Colors";
import { Stack, useRouter } from "expo-router";
import { useWindowDimensions } from "react-native";

const Layout = () => {
  const { height } = useWindowDimensions();
  const router = useRouter();
  return (
    <Stack
      screenOptions={{ contentStyle: { backgroundColor: Colors.background } }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
};
export default Layout;
