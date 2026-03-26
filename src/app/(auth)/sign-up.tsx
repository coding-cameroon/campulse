import Button from "@/components/Button";
import InputField from "@/components/InputField";
import { COLORS } from "@/utils/colors";
import { useRouter } from "expo-router";
import {
  ArrowRight,
  Eye,
  EyeOff,
  MailCheck,
  RefreshCw,
  ShieldCheck,
} from "lucide-react-native";
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

const SignUpScreen = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [verification, setVerification] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");

  const otpCode = "123456";

  const handleSignUp = async () => {
    if (!formData.email || !formData.password) {
      setError("All fields are required to join.");
      return;
    }
    setLoading(true);
    setError("");

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setVerification(true);
    }, 2000);
  };

  const handleVerify = () => {
    setOtpError("");

    if (otp.length < 6) {
      return setOtpError("Please enter the full 6-digit code.");
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      if (otp !== otpCode) {
        return setOtpError("Invalid OTP. Provide a valid OTP Code");
      } else {
        return router.push("/(home)");
      }
    }, 1500);
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
          {/* Top Section */}
          <View style={styles.topSection}>
            <Image
              source={require("$/images/logo.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          {verification ? (
            <View style={styles.bottomSection}>
              <View style={styles.textGroup}>
                <View style={styles.iconCircle}>
                  <ShieldCheck color={COLORS.light} size={32} />
                </View>
                <Text style={styles.headerText}>Verify Email.</Text>
                <Text style={styles.subHeaderText}>
                  We sent an OTP verification code to{" "}
                  <Text style={{ color: COLORS.light, fontWeight: "600" }}>
                    {formData.email}
                  </Text>
                </Text>
              </View>

              <View style={styles.form}>
                <InputField
                  label="Verification Code"
                  placeholder="000000"
                  value={otp}
                  onChangeText={setOtp}
                  keyboardType="number-pad"
                  maxLength={6}
                  error={otpError}
                  autoFocus
                  style={styles.otpInput}
                />

                <Button loading={loading} onPress={handleVerify}>
                  <Text style={styles.buttonText}>Verify Account</Text>
                </Button>

                <TouchableOpacity style={styles.resendBtn}>
                  <RefreshCw color={COLORS.gray} size={14} />
                  <Text style={styles.resendText}>Resend Code</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            /* SIGN UP UI */
            <View style={styles.bottomSection}>
              <View style={styles.textGroup}>
                <Text style={styles.headerText}>Create Account.</Text>
                <Text style={styles.subHeaderText}>
                  Join the national campus network today.
                </Text>
              </View>

              <View style={styles.form}>
                <InputField
                  label="School Email"
                  placeholder="johndoe@gmail.com"
                  value={formData.email}
                  onChangeText={(val) =>
                    setFormData({ ...formData, email: val })
                  }
                  keyboardType="email-address"
                  autoCapitalize="none"
                />

                <InputField
                  label="Password"
                  placeholder="********"
                  value={formData.password}
                  onChangeText={(val) =>
                    setFormData({ ...formData, password: val })
                  }
                  secureTextEntry={!showPassword}
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

                <Button loading={loading} onPress={handleSignUp}>
                  <View style={styles.buttonInner}>
                    <Text style={styles.buttonText}>Get Started</Text>
                    <ArrowRight
                      color="black"
                      size={20}
                      style={{ marginLeft: 8 }}
                    />
                  </View>
                </Button>

                <View style={styles.verificationNotice}>
                  <MailCheck color={COLORS.gray} size={16} />
                  <Text style={styles.verificationText}>
                    A verification link will be sent to your email.
                  </Text>
                </View>

                <View style={styles.signInLinkContainer}>
                  <Text style={styles.footerText}>
                    Already have an account?{" "}
                  </Text>
                  <TouchableOpacity
                    onPress={() => router.push("/(auth)/sign-in")}
                  >
                    <Text style={styles.signInText}>Sign In</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "black" },
  scrollView: { flex: 1 },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    justifyContent: "space-between",
  },
  topSection: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 180,
  },
  logo: { width: 90, height: 90 },
  bottomSection: { paddingBottom: 40 },
  textGroup: { marginBottom: 28 },
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
  form: { width: "100%" },
  buttonInner: { flexDirection: "row", alignItems: "center" },
  buttonText: { fontSize: 18, fontWeight: "700", color: "black" },

  // Verification Specific Styles
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#121212",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#333",
  },
  otpInput: {
    letterSpacing: 8,
    fontSize: 24,
    textAlign: "center",
    fontWeight: "700",
  },
  resendBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    marginTop: 20,
  },
  resendText: {
    color: COLORS.gray,
    fontSize: 14,
    fontWeight: "600",
  },

  // Existing Styles
  verificationNotice: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    gap: 8,
    backgroundColor: "#121212",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#222",
  },
  verificationText: { color: COLORS.gray, fontSize: 13, fontWeight: "500" },
  signInLinkContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },
  footerText: { color: COLORS.gray, fontSize: 15 },
  signInText: {
    color: COLORS.light,
    fontSize: 15,
    fontWeight: "700",
    textDecorationLine: "underline",
  },
});

export default SignUpScreen;
