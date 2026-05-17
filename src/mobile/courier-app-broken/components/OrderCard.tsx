import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Dimensions,
} from "react-native";
import { DeliveryOrder } from "../models/deliveryOrder";
import { StatusBadge } from "./StatusBadge";
import { useTheme } from "../context/CourierThemeContext";

interface OrderCardProps {
  order: DeliveryOrder;
  onPress: (order: DeliveryOrder) => void;
  compact?: boolean;
}

export const OrderCard: React.FC<OrderCardProps> = ({
  order,
  onPress,
  compact = false,
}) => {
  const { colors } = useTheme();

  if (compact) {
    return (
      <Pressable
        style={({ pressed }) => [
          styles.compactCard,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
            opacity: pressed ? 0.85 : 1,
          },
        ]}
        onPress={() => onPress(order)}
      >
        <View style={styles.compactHeader}>
          <View>
            <Text style={[styles.compactTitle, { color: colors.text }]}>
              Rendelés #{order.id.slice(0, 8).toUpperCase()}
            </Text>
            <Text style={[styles.compactAddress, { color: colors.muted }]}>
              📍 {order.deliveryAddress}
            </Text>
          </View>
          <Text style={[styles.compactPrice, { color: colors.gold }]}>
            {order.totalPrice.toFixed(0)} Ft
          </Text>
        </View>
        <View style={styles.compactFooter}>
          <Text style={[styles.compactItems, { color: colors.muted }]}>
            {order.items.length} tétel • {order.clientName}
          </Text>
          <StatusBadge status={order.status} size="small" />
        </View>
      </Pressable>
    );
  }

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
          opacity: pressed ? 0.85 : 1,
        },
      ]}
      onPress={() => onPress(order)}
    >
      {/* Header */}
      <View style={styles.cardHeader}>
        <View style={{ flex: 1 }}>
          <Text style={[styles.orderId, { color: colors.gold }]}>
            Rendelés #{order.id.slice(0, 8).toUpperCase()}
          </Text>
          <Text style={[styles.restaurant, { color: colors.text }]}>
            🏪 {order.restaurantName}
          </Text>
        </View>
        <StatusBadge status={order.status} size="medium" />
      </View>

      {/* Price & Items */}
      <View
        style={[
          styles.divider,
          { borderBottomColor: colors.border, marginVertical: 12 },
        ]}
      />

      <View style={styles.priceRow}>
        <View>
          <Text style={[styles.label, { color: colors.muted }]}>
            Megrendelés:
          </Text>
          <Text style={[styles.itemCount, { color: colors.text }]}>
            {order.items.reduce((sum, item) => sum + item.quantity, 0)} tétel
          </Text>
        </View>
        <Text style={[styles.price, { color: colors.gold }]}>
          {order.totalPrice.toFixed(0)} Ft
        </Text>
      </View>

      {/* Items preview */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.itemsPreview}
      >
        {order.items.map((item, idx) => (
          <View
            key={idx}
            style={[
              styles.itemTag,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
              },
            ]}
          >
            <Text style={[styles.itemTagText, { color: colors.text }]}>
              {item.quantity}x {item.name}
            </Text>
          </View>
        ))}
      </ScrollView>

      {/* Delivery info */}
      <View
        style={[
          styles.divider,
          { borderBottomColor: colors.border, marginVertical: 12 },
        ]}
      />

      <View style={styles.deliveryInfo}>
        <View style={styles.infoRow}>
          <Text style={[styles.infoLabel, { color: colors.muted }]}>
            📦 Cím:
          </Text>
          <Text style={[styles.infoValue, { color: colors.text }]}>
            {order.deliveryAddress}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={[styles.infoLabel, { color: colors.muted }]}>
            👤 Megrendelő:
          </Text>
          <Text style={[styles.infoValue, { color: colors.text }]}>
            {order.clientName}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={[styles.infoLabel, { color: colors.muted }]}>
            📞 Telefon:
          </Text>
          <Text style={[styles.infoValue, { color: colors.text }]}>
            {order.clientPhone}
          </Text>
        </View>

        {order.notes && (
          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: colors.muted }]}>
              💬 Megjegyzés:
            </Text>
            <Text style={[styles.infoValue, { color: colors.text }]}>
              {order.notes}
            </Text>
          </View>
        )}
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={[styles.time, { color: colors.muted }]}>
          ⏰ Megrendelt: {new Date(order.createdAt).toLocaleTimeString("hu-HU")}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
  },
  orderId: {
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 4,
  },
  restaurant: {
    fontSize: 14,
    fontWeight: "600",
  },
  divider: {
    borderBottomWidth: 1,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontSize: 12,
    fontWeight: "500",
    marginBottom: 4,
  },
  itemCount: {
    fontSize: 14,
    fontWeight: "700",
  },
  price: {
    fontSize: 24,
    fontWeight: "900",
  },
  itemsPreview: {
    marginVertical: 12,
  },
  itemTag: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 8,
    borderWidth: 1,
  },
  itemTagText: {
    fontSize: 12,
    fontWeight: "600",
  },
  deliveryInfo: {
    gap: 8,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
  },
  infoLabel: {
    fontSize: 12,
    fontWeight: "600",
    minWidth: 60,
  },
  infoValue: {
    fontSize: 12,
    flex: 1,
    fontWeight: "500",
  },
  footer: {
    marginTop: 12,
  },
  time: {
    fontSize: 11,
    fontWeight: "500",
  },

  // Compact card styles
  compactCard: {
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
  },
  compactHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  compactTitle: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 4,
  },
  compactAddress: {
    fontSize: 12,
  },
  compactPrice: {
    fontSize: 18,
    fontWeight: "900",
  },
  compactFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  compactItems: {
    fontSize: 11,
    fontWeight: "500",
  },
});
