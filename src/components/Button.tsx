import React from "react";
import { Pressable, PressableProps, Text, ViewStyle } from "react-native";

interface ButtonProps extends PressableProps {
  children: React.ReactNode;
}

export default function Button({ children, style, ...props }: ButtonProps) {
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
        },
        style as ViewStyle,
      ]}
      {...props}
    >
      {typeof children === "string" ? (
        <Text style={{ fontWeight: "700", fontSize: 16 }}>{children}</Text>
      ) : (
        children
      )}
    </Pressable>
  );
}
