import Button from "@/components/Button";
import InputField from "@/components/InputField";
import { COLORS } from "@/utils/colors";
import { useRouter } from "expo-router";
import { ArrowRight, Eye, EyeOff } from "lucide-react-native";
import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SignInScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = async () => {
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError("");

    // Simulate API Call
    setTimeout(() => {
      setLoading(false);
      // router.replace("/(root)/(tabs)/home");
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Top Section: Branding */}
          <View style={styles.topSection}>
            <Image
              source={require("../../../assets/images/logo.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          <View style={styles.bottomSection}>
            <View style={styles.textGroup}>
              <Text style={styles.headerText}>Welcome back.</Text>
              <Text style={styles.subHeaderText}>
                Sign in to continue to your campus vibes.
              </Text>
            </View>

            <View style={styles.form}>
              <InputField
                label="Email Address"
                placeholder="johndoe@gmail.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <InputField
                label="Password"
                placeholder="********"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={showPassword}
                error={error}
                rightIcon={
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff color={COLORS.gray} size={20} />
                    ) : (
                      <Eye color={COLORS.gray} size={20} />
                    )}
                  </TouchableOpacity>
                }
              />

              <Button
                loading={loading}
                onPress={handleSignIn}
                style={styles.signInButton}
              >
                <View style={styles.buttonInner}>
                  <Text style={styles.buttonText}>Sign In</Text>
                  <ArrowRight
                    color="black"
                    size={20}
                    style={{ marginLeft: 8 }}
                  />
                </View>
              </Button>

              <View style={styles.signUpLinkContainer}>
                <Text style={styles.footerText}>Don't have an account? </Text>
                <TouchableOpacity
                  onPress={() => router.push("/(auth)/sign-up")}
                >
                  <Text style={styles.signUpText}>Sign Up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    justifyContent: "space-between",
  },
  topSection: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 200,
  },
  logo: {
    width: 100,
    height: 100,
  },
  bottomSection: {
    paddingBottom: 30,
  },
  textGroup: {
    marginBottom: 32,
  },
  headerText: {
    fontSize: 32,
    fontWeight: "800",
    color: COLORS.light,
    letterSpacing: -1,
  },
  subHeaderText: {
    fontSize: 17,
    color: COLORS.gray,
    marginTop: 8,
    lineHeight: 24,
  },
  form: {
    width: "100%",
  },
  signInButton: {
    marginTop: 10,
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
  signUpLinkContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },
  footerText: {
    color: COLORS.gray,
    fontSize: 15,
  },
  signUpText: {
    color: COLORS.light,
    fontSize: 15,
    fontWeight: "700",
    textDecorationLine: "underline",
  },
});

export default SignInScreen;
