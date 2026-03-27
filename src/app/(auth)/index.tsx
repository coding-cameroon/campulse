import Button from "@/components/Button";
import InputField from "@/components/InputField";
import { COLORS } from "@/utils/colors";
import { router } from "expo-router";
import { ArrowRight, Info } from "lucide-react-native";
import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const OnBoardingScreen = () => {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const schoolEmail = "iut-university@gmail.com";

  const handleOnboarding = () => {
    const trimmedEmail = email.trim();
    setError("");

    if (!trimmedEmail) {
      setError("Provide an email to continue");
      return;
    }

    if (trimmedEmail !== schoolEmail) {
      setError("This email is not authorized.");
      return;
    }

    router.push("/(auth)/auth");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.content}>
            <View style={styles.topSpace}>
              <Image
                source={require("../../../assets/images/logo.png")}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>

            <View style={styles.bottomSection}>
              <View style={styles.textGroup}>
                <Text style={styles.headerText}>Welcome to One.</Text>
                <Text style={styles.subHeaderText}>
                  We need to proceed with a quick security check.
                </Text>
              </View>

              <View style={styles.inputBox}>
                <InputField
                  placeholder="name@university.edu"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onChangeText={setEmail}
                  value={email}
                  placeholderTextColor={COLORS.gray}
                />

                {error && (
                  <View style={styles.errorBox}>
                    <Info color="#FF4D4D" size={12} />
                    <Text style={styles.errorMessage}>{error}</Text>
                  </View>
                )}

                <Button onPress={handleOnboarding}>
                  <View style={styles.buttonInner}>
                    <Text style={styles.buttonText}>Continue</Text>
                    <ArrowRight
                      color="black"
                      size={20}
                      style={{ marginLeft: 8 }}
                    />
                  </View>
                </Button>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "black",
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 10,
  },
  content: {
    flex: 1,
    justifyContent: "flex-end",
  },
  topSpace: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 120,
    height: 120,
    opacity: 0.9,
  },
  bottomSection: {
    width: "100%",
  },
  textGroup: {
    marginBottom: 32,
  },
  headerText: {
    fontSize: 32,
    fontWeight: "800",
    color: COLORS.light,
    textAlign: "left",
    letterSpacing: -0.5,
  },
  subHeaderText: {
    fontSize: 17,
    lineHeight: 24,
    color: COLORS.gray,
    textAlign: "left",
    marginTop: 8,
  },
  inputBox: {
    width: "100%",
  },
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
  errorBox: {
    flexDirection: "row",
    gap: 4,
    marginTop: -15,
    marginBottom: 20,
    alignItems: "center",
  },
  errorMessage: { color: "#FF4D4D", fontSize: 13, fontWeight: "500" },
});

export default OnBoardingScreen;
