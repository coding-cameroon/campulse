import { useSSO } from "@clerk/expo";
import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Button from "./Button";

const GoogleAuth = () => {
  const { startSSOFlow } = useSSO();
  const [errors, setErrors] = useState<any[]>([]);

  // const handleSignInWithGoogle = async () => {
  //   try {
  //     const { setActive, createdSessionId } = await startSSOFlow({
  //       strategy: "oauth_google",
  //       redirectUrl: AuthSessions.makeRedirectUri(),
  //     });

  //     if (createdSessionId) {
  //       setActive!({ session: createdSessionId });
  //     } else {
  //       setErrors(["No user session created."]);
  //     }
  //   } catch (error) {
  //     if (isClerkAPIResponseError(error)) {
  //       setErrors(error.errors);
  //     } else {
  //       setErrors(error as any);
  //     }
  //   }
  // };
  return (
    <Button onPress={() => {}} disabled>
      <View style={[styles.buttonInner, { gap: 12 }]}>
        <Image
          source={require("$/icons/google.png")}
          style={{ width: 25, height: 25 }}
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
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "700",
    color: "black",
  },
  googleIcon: {
    width: 24,
    height: 24,
  },
});

export default GoogleAuth;
