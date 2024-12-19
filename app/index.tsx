import { Colors } from "@/constants/Colors";
import { useOAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { scale } from "react-native-size-matters";

export default function Index() {
  const { top } = useSafeAreaInsets();

  const { startOAuthFlow: googleOAuth } = useOAuth({
    strategy: "oauth_google",
  });

  const handleGoogleOAuth = async () => {
    try {
      const { createdSessionId, setActive } = await googleOAuth();
      if (createdSessionId) {
        setActive!({
          session: createdSessionId,
        });
      }
    } catch (error) {
      console.error("Google OAuth failed: ", error);
    }
  };

  const openLink = async (url: string) => {
    WebBrowser.openBrowserAsync(url);
  };

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <Image
        source={require("@/assets/images/todoist-logo.png")}
        style={[styles.logoImage]}
      />
      <Image
        source={require("@/assets/images/login.png")}
        style={[styles.bannerImage]}
      />
      <View style={[styles.buttonContainer]}>
        <TouchableOpacity style={[styles.button]} onPress={handleGoogleOAuth}>
          <Ionicons name="logo-google" size={24} />
          <Text style={[styles.buttonText]}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button]} onPress={handleGoogleOAuth}>
          <Ionicons name="mail" size={24} />
          <Text style={[styles.buttonText]}>Continue with Email</Text>
        </TouchableOpacity>

        <Text style={styles.description}>
          By continuing you agree to Todoist's{" "}
          <Text
            style={styles.link}
            onPress={() => openLink("https://dbadawi.my.id")}
          >
            Terms of Service
          </Text>{" "}
          and{" "}
          <Text
            style={styles.link}
            onPress={() => openLink("https://dbadawi.my.id")}
          >
            Privacy Policy
          </Text>
          .
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 40,
    marginTop: 20,
  },
  logoImage: {
    height: 40,
    resizeMode: "contain",
    alignSelf: "center",
  },
  bannerImage: {
    height: scale(200),
    resizeMode: "contain",
    alignSelf: "center",
  },
  buttonContainer: {
    gap: 20,
    marginHorizontal: 40,
  },
  button: {
    flexDirection: "row",
    padding: 12,
    borderRadius: 6,
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
    borderColor: Colors.lightBorder,
    borderWidth: StyleSheet.hairlineWidth,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "500",
  },
  description: {
    fontSize: 12,
    textAlign: "center",
    color: Colors.lightText,
  },
  link: {
    color: Colors.lightText,
    fontSize: 12,
    textAlign: "center",
    textDecorationLine: "underline",
  },
});
