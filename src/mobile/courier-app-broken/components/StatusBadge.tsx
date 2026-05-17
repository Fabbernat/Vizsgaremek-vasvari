import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { DeliveryStatus } from "../models/deliveryOrder";
import { useTheme } from "../context/CourierThemeContext";

const STATUS_CONFIG: Record<
  DeliveryStatus,
  { label: string; backgroundColor: string; textColor: string; icon: string }
> = {
  új: {
    label: "Új",
    backgroundColor: "#3b82f6",
    textColor: "#fff",
    icon: "🆕",
  },
  készül: {
    label: "Készül",
    backgroundColor: "#f59e0b",
    textColor: "#000",
    icon: "⏳",
  },
  átadva_futárnak: {
    label: "Átadva futárnak",
    backgroundColor: "#8b5cf6",
    textColor: "#fff",
    icon: "📦",
  },
  kézbesítve: {
    label: "Kézbesítve",
    backgroundColor: "#22c55e",
    textColor: "#000",
    icon: "✅",
  },
  mégsem: {
    label: "Mégsem",
    backgroundColor: "#ef4444",
    textColor: "#fff",
    icon: "❌",
  },
};

interface StatusBadgeProps {
  status: DeliveryStatus;
  size?: "small" | "medium" | "large";
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  size = "medium",
}) => {
  const config = STATUS_CONFIG[status];
  const sizeStyles = {
    small: { paddingHorizontal: 8, paddingVertical: 4 },
    medium: { paddingHorizontal: 12, paddingVertical: 6 },
    large: { paddingHorizontal: 16, paddingVertical: 8 },
  };

  const textSizes = {
    small: 12,
    medium: 14,
    large: 16,
  };

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: config.backgroundColor,
          ...sizeStyles[size],
        },
      ]}
    >
      <Text style={{ fontSize: size === "small" ? 10 : 12, marginRight: 4 }}>
        {config.icon}
      </Text>
      <Text
        style={{
          color: config.textColor,
          fontSize: textSizes[size],
          fontWeight: "600",
        }}
      >
        {config.label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: "row",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});
