import { Colors } from "@/constants/Colors";
import { tokenCache } from "@/utils/cache";
import { ClerkLoaded, ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { Stack, usePathname, useRouter, useSegments } from "expo-router";
import { useCallback, useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
  throw new Error(
    "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
  );
}

const InitialLayout = () => {
  const router = useRouter();
  const segments = useSegments();
  const pathname = usePathname();

  const { isLoaded, isSignedIn } = useAuth();

  console.log("isLoaded", isLoaded);
  console.log(isSignedIn);

  const handleSignedIn = useCallback(() => {
    if (!isLoaded) return;

    const inAuthGroup = segments[0] === "(authenticated)";

    if (isSignedIn && !inAuthGroup) {
      router.replace("/(authenticated)/(tabs)/today");
    } else if (!isSignedIn && pathname === "/") {
      router.replace("/");
    }
  }, [isLoaded, isSignedIn]);

  useEffect(() => {
    handleSignedIn();
  }, [handleSignedIn]);

  if (!isLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: Colors.background,
        },
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(authenticated)" options={{ headerShown: false }} />
    </Stack>
  );
};

export default function RootLayoutNav() {
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <ClerkLoaded>
        <InitialLayout />
      </ClerkLoaded>
    </ClerkProvider>
  );
}
