import Button from "@/components/Button";
import { COLORS } from "@/utils/colors";
import { useRouter } from "expo-router";
import { ArrowRight } from "lucide-react-native";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AuthScreen = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.topSection}>
          <Image
            source={require("$/images/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <View style={styles.bottomSection}>
          <View style={styles.textGroup}>
            <Text style={styles.headerText}>One Campus. Join in.</Text>
            <Text style={styles.subHeaderText}>
              One ensures a connected campus
            </Text>
          </View>

          <View style={styles.authActions}>
            <Text style={styles.joinText}>Join now</Text>

            <Button onPress={() => router.push("/(auth)/sign-in")}>
              <View style={styles.buttonInner}>
                <Text style={styles.buttonText}>Continue with Email</Text>
                <ArrowRight color="black" size={20} />
              </View>
            </Button>

            <View style={styles.dividerContainer}>
              <View style={styles.line} />
              <Text style={styles.orText}>OR</Text>
              <View style={styles.line} />
            </View>

            <Button
              onPress={() => {
                /* Handle Google Auth */
              }}
            >
              <View style={[styles.buttonInner, { gap: 12 }]}>
                <Image
                  source={require("$/icons/google.png")}
                  style={{ width: 25, height: 25 }}
                  resizeMode="contain"
                />
                <Text style={styles.buttonText}>Continue with Google</Text>
              </View>
            </Button>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              By continuing, you agree to our{" "}
              <Text style={styles.linkText}>Terms and Policies</Text> and{" "}
              <Text style={styles.linkText}>Privacy Laws</Text>.
            </Text>
          </View>
        </View>
      </ScrollView>
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
    justifyContent: "space-between", // Pushes topSection and bottomSection apart
  },
  topSection: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 250,
  },
  logo: {
    width: 140,
    height: 140,
  },
  bottomSection: {
    paddingBottom: 20,
  },
  textGroup: {
    marginBottom: 40,
  },
  headerText: {
    fontSize: 34,
    fontWeight: "800",
    color: COLORS.light,
    textAlign: "center",
    letterSpacing: -1,
  },
  subHeaderText: {
    fontSize: 18,
    color: COLORS.gray,
    textAlign: "center",
    marginTop: 10,
  },
  authActions: {
    gap: 16,
  },
  joinText: {
    color: COLORS.light,
    fontSize: 14,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1.5,
    textAlign: "center",
    marginBottom: 4,
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
  googleIcon: {
    width: 24,
    height: 24,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#333",
  },
  orText: {
    color: COLORS.gray,
    paddingHorizontal: 16,
    fontSize: 14,
    fontWeight: "600",
  },
  footer: {
    marginTop: 40,
    paddingHorizontal: 20,
  },
  footerText: {
    color: COLORS.gray,
    fontSize: 12,
    textAlign: "center",
    lineHeight: 18,
  },
  linkText: {
    color: COLORS.light,
    textDecorationLine: "underline",
  },
});

export default AuthScreen;
