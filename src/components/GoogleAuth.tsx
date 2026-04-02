import { isClerkAPIResponseError, useSSO } from "@clerk/expo";
import * as AuthSessions from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Button from "./Button";

WebBrowser.maybeCompleteAuthSession();

const GoogleAuth = () => {
  const { startSSOFlow } = useSSO();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);

  const handleSignInWithGoogle = async () => {
    setLoading(true);
    try {
      // 2. Start the flow
      const { setActive, createdSessionId } = await startSSOFlow({
        strategy: "oauth_google",
        redirectUrl: AuthSessions.makeRedirectUri({ scheme: "campulse" }),
      });

      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
      }
    } catch (error) {
      console.error("OAuth Error:", error);
      if (isClerkAPIResponseError(error)) {
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button onPress={handleSignInWithGoogle} loading={loading} disabled>
      <View style={styles.buttonInner}>
        <Image
          source={require("$/icons/google.png")}
          style={styles.googleIcon}
          resizeMode="contain"
        />
        <Text style={styles.buttonText}>Continue with Google</Text>
      </View>
    </Button>
  );
};

const styles = StyleSheet.create({
  buttonInner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "700",
    color: "black",
  },
  googleIcon: {
    width: 25,
    height: 25,
  },
});

export default GoogleAuth;
