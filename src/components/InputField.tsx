import { COLORS } from "@/utils/colors";
import { Info } from "lucide-react-native";
import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";

interface InputFieldProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  error,
  containerStyle,
  style,
  ...props
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.inputLabel}>{label}</Text>}

      <TextInput
        style={[
          styles.inputField,
          error ? styles.inputErrorBorder : null,
          style,
        ]}
        placeholderTextColor={COLORS.gray}
        {...props}
      />

      {error?.trim() ? (
        <View style={styles.errorBox}>
          <Info color="#FF4D4D" size={12} />
          <Text style={styles.errorMessage}>{error}</Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 24,
  },
  inputLabel: {
    fontWeight: "600",
    fontSize: 14,
    color: COLORS.light,
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  inputField: {
    height: 56,
    backgroundColor: "#121212",
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 12,
    color: COLORS.light,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  inputErrorBorder: {
    borderWidth: 0.5,
    borderColor: "#FF4D4D",
  },
  errorBox: {
    flexDirection: "row",
    gap: 4,
    marginTop: 8,
    marginBottom: 24,
    alignItems: "center",
  },
  errorMessage: {
    color: "#FF4D4D",
    fontSize: 12,
    fontWeight: "500",
  },
});

export default InputField;
