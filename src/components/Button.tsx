import React from "react";
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  Text,
  ViewStyle,
} from "react-native";

interface ButtonProps extends PressableProps {
  children: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
}

export default function Button({
  children,
  disabled,
  loading,
  style,
  ...props
}: ButtonProps) {
  const isIntaractive = loading || disabled;

  return (
    <Pressable
      style={[
        {
          backgroundColor: "white",
          borderRadius: 12,
          width: "100%",
          paddingVertical: 16,
          paddingHorizontal: 6,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          opacity: !isIntaractive ? 1 : 0.8,
        },
        style as ViewStyle,
      ]}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={"black"} size={"small"} />
      ) : (
        <>
          {typeof children === "string" ? (
            <Text style={{ fontWeight: "700", fontSize: 16 }}>{children}</Text>
          ) : (
            children
          )}
        </>
      )}
    </Pressable>
  );
}
