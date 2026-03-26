import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SignInScreen = () => {
  return (
    <SafeAreaView style={styles.constainer}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.text}>SignUpScreen</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: "black",
  },
  text: {
    color: "white",
  },
});

export default SignInScreen;
