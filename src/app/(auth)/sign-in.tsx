import Button from "@/components/Button";
import InputField from "@/components/InputField";
import { COLORS } from "@/utils/colors";
import { useSignIn } from "@clerk/expo";
import { Href, useRouter } from "expo-router";
import { Eye, EyeOff, Info, MailCheck, ShieldCheck } from "lucide-react-native";
import { useState } from "react";
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
  const { signIn } = useSignIn();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async () => {
    setError("");
    setLoading(true);
    const { error } = await signIn.password({
      emailAddress,
      password,
    });

    if (error) {
      setLoading(false);
      console.log(JSON.stringify(error, null, 2));
      setError(error);
      return;
    }

    if (signIn.status === "complete") {
      await signIn.finalize({
        navigate: ({ session, decorateUrl }) => {
          if (session?.currentTask) {
            // Handle pending session tasks
            // See https://clerk.com/docs/guides/development/custom-flows/authentication/session-tasks
            console.log(session?.currentTask);
            return;
          }

          const url = decorateUrl("/");
          if (url.startsWith("http")) {
            window.location.href = url;
          } else {
            router.push(url as Href);
          }
        },
      });

      setLoading(false);
    } else if (signIn.status === "needs_second_factor") {
    } else if (signIn.status === "needs_client_trust") {
      const emailCodeFactor = signIn.supportedSecondFactors.find(
        (factor) => factor.strategy === "email_code",
      );

      if (emailCodeFactor) {
        await signIn.mfa.sendEmailCode();
      }
    } else {
      setError(`Sign-in attempt not complete: ${signIn}`);
      console.log("Sign-in attempt not complete:", signIn);
    }
  };

  const handleVerify = async () => {
    await signIn.mfa.verifyEmailCode({ code });

    if (signIn.status === "complete") {
      await signIn.finalize({
        navigate: ({ session, decorateUrl }) => {
          if (session?.currentTask) {
            console.log(session?.currentTask);
            return;
          }

          const url = decorateUrl("/");
          if (url.startsWith("http")) {
            window.location.href = url;
          } else {
            router.push(url as Href);
          }
        },
      });
    } else {
      console.error("Sign-in attempt not complete:", signIn);
    }
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

          {signIn.status === "needs_client_trust" ? (
            <View style={styles.bottomSection}>
              <View style={styles.textGroup}>
                <View style={styles.iconCircle}>
                  <ShieldCheck color={COLORS.light} size={32} />
                </View>
                <Text style={styles.headerText}>Verify Email.</Text>
                <Text style={styles.subHeaderText}>
                  We sent an OTP verification code to{" "}
                  <Text style={{ color: COLORS.light, fontWeight: "600" }}>
                    {emailAddress}
                  </Text>
                </Text>
              </View>

              <View style={styles.form}>
                <InputField
                  label="Verification Code"
                  placeholder="000000"
                  value={code}
                  onChangeText={setCode}
                  keyboardType="number-pad"
                  maxLength={6}
                  autoFocus
                  style={styles.otpInput}
                />

                <Button onPress={handleVerify}>
                  <Text style={styles.buttonText}>Verify Account</Text>
                </Button>
              </View>
            </View>
          ) : (
            /* SIGN IN UI */
            <View style={styles.bottomSection}>
              <View style={styles.textGroup}>
                <Text style={styles.headerText}>Welcome Back.</Text>
                <Text style={styles.subHeaderText}>
                  Sign in to continue to your campus vibes
                </Text>
              </View>

              <View style={styles.form}>
                <InputField
                  label="Email"
                  placeholder="johndoe@gmail.com"
                  value={emailAddress}
                  onChangeText={setEmailAddress}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />

                <InputField
                  label="Password"
                  placeholder="********"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  // error={error}
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

                {error && (
                  <View style={styles.errorBox}>
                    <Info color="#FF4D4D" size={12} />
                    <Text style={styles.errorMessage}>
                      {error.errors[0].message ||
                        error.errors[0].longMessage ||
                        error}
                    </Text>
                  </View>
                )}

                <Button
                  onPress={handleSubmit}
                  loading={loading}
                  disabled={loading}
                >
                  <Text style={styles.buttonText}>Sign In</Text>
                </Button>

                <View style={styles.verificationNotice}>
                  <MailCheck color={COLORS.gray} size={16} />
                  <Text style={styles.verificationText}>
                    A verification link may be sent to your email.
                  </Text>
                </View>

                <View style={styles.signInLinkContainer}>
                  <Text style={styles.footerText}>Not having an account? </Text>
                  <TouchableOpacity
                    onPress={() => router.push("/(auth)/sign-up")}
                  >
                    <Text style={styles.signInText}>Sign Up</Text>
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
  errorBox: {
    flexDirection: "row",
    gap: 4,
    marginTop: -15,
    marginBottom: 20,
    alignItems: "center",
  },
  errorMessage: { color: "#FF4D4D", fontSize: 13, fontWeight: "500" },
});

export default SignInScreen;
