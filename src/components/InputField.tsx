// Inside your components/InputField.tsx
import { COLORS } from "@/utils/colors";
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
  containerStyle?: ViewStyle;
  rightIcon?: React.ReactNode; // Add this
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  containerStyle,
  style,
  rightIcon,
  ...props
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.inputLabel}>{label}</Text>}

      <View style={styles.inputWrapper}>
        <TextInput
          style={[styles.inputField, style]}
          placeholderTextColor={COLORS.gray}
          {...props}
        />
        {rightIcon && <View style={styles.iconContainer}>{rightIcon}</View>}
      </View>

      {/* {error?.trim() ? (
        <View style={styles.errorBox}>
          <Info color="#FF4D4D" size={12} />
          <Text style={styles.errorMessage}>{error}</Text>
        </View>
      ) : null} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { width: "100%", marginBottom: 24 },
  inputLabel: {
    fontWeight: "600",
    fontSize: 14,
    color: COLORS.light,
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  inputWrapper: {
    position: "relative",
    justifyContent: "center",
  },
  inputField: {
    height: 56,
    backgroundColor: "#121212",
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 12,
    color: COLORS.light,
    paddingHorizontal: 16,
    paddingRight: 50, // Added padding so text doesn't go under the icon
    fontSize: 16,
  },
  iconContainer: {
    position: "absolute",
    right: 16,
  },
  inputErrorBorder: { borderWidth: 1, borderColor: "#FF4D4D" },
});

export default InputField;
