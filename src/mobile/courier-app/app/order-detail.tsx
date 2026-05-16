import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  ActivityIndicator,
  Alert,
  StatusBar,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useCourierAuth } from "../stores/CourierAuthStore";
import { useCourierOrderStore } from "../stores/OrderStore";
import { useTheme } from "../context/CourierThemeContext";
import { StatusBadge } from "../components/StatusBadge";
import { DeliveryOrder, DeliveryStatus } from "../models/deliveryOrder";
import { supabase } from "../supabase"
export default function OrderDetailScreen() {
  const { orderId, status: initialStatus } = useLocalSearchParams();
  const { courier } = useCourierAuth();
  const { acceptOrder, updateOrderStatus } = useCourierOrderStore();
  const { colors } = useTheme();
  const [order, setOrder] = useState<DeliveryOrder | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("delivery_orders")
        .select("*")
        .eq("id", orderId)
        .single();

      if (error) throw error;
      setOrder(data);
    } catch (error) {
      console.error("Fetch order error:", error);
      Alert.alert("Hiba", "A rendelés betöltése sikertelen");
      router.back();
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptOrder = async () => {
    if (!courier?.id || !order?.id) return;

    try {
      setUpdating(true);
      await acceptOrder(order.id, courier.id);
      Alert.alert("Siker", "Rendelés elfogadva! ✅");
      router.back();
    } catch (error) {
      console.error("Accept order error:", error);
      Alert.alert("Hiba", "Az elfogadás sikertelen");
    } finally {
      setUpdating(false);
    }
  };

  const handleUpdateStatus = async (newStatus: DeliveryStatus) => {
    if (!order?.id) return;

    try {
      setUpdating(true);
      await updateOrderStatus(order.id, newStatus);
      setOrder({ ...order, status: newStatus });
      Alert.alert("Siker", `Státusz frissítve: ${newStatus}`);
    } catch (error) {
      console.error("Update status error:", error);
      Alert.alert("Hiba", "A státusz frissítése sikertelen");
    } finally {
      setUpdating(false);
    }
  };

  const handleCancelOrder = async () => {
    Alert.alert(
      "Rendelés visszavonása",
      "Biztosan vissza akarsz vonni ezt a rendelést?",
      [
        { text: "Mégsem", style: "cancel" },
        {
          text: "Igen, vissza",
          style: "destructive",
          onPress: async () => {
            try {
              setUpdating(true);
              await updateOrderStatus(order!.id, "mégsem");
              Alert.alert("Siker", "Rendelés visszavonva");
              router.back();
            } catch (error) {
              Alert.alert("Hiba", "A visszavonás sikertelen");
            } finally {
              setUpdating(false);
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: colors.bg }]}>
        <ActivityIndicator size="large" color={colors.gold} />
      </View>
    );
  }

  if (!order) {
    return (
      <View style={[styles.container, { backgroundColor: colors.bg }]}>
        <Text style={[styles.errorText, { color: colors.danger }]}>
          Rendelés nem található
        </Text>
      </View>
    );
  }

  const isAvailable = order.status === "új";
  const isAccepted = order.accepted_by_courier_id === courier?.id;

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.bg }]}
      showsVerticalScrollIndicator={false}
    >
      <StatusBar barStyle="light-content" backgroundColor={colors.bg} />

      {/* Back button + Header */}
      <View
        style={[
          styles.header,
          { backgroundColor: colors.surface, borderBottomColor: colors.border },
        ]}
      >
        <Pressable
          style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
          onPress={() => router.back()}
        >
          <Text style={[styles.backBtn, { color: colors.gold }]}>← Vissza</Text>
        </Pressable>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          Rendelés #{order.id.slice(0, 8).toUpperCase()}
        </Text>
        <View style={{ width: 50 }} />
      </View>

      <View style={styles.content}>
        {/* Status Section */}
        <View
          style={[
            styles.section,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: colors.muted }]}>
            STÁTUSZ
          </Text>
          <View style={styles.statusSection}>
            <StatusBadge status={order.status} size="large" />
            <Text style={[styles.statusTime, { color: colors.muted }]}>
              📅 {new Date(order.createdAt).toLocaleString("hu-HU")}
            </Text>
          </View>
        </View>

        {/* Restaurant Section */}
        <View
          style={[
            styles.section,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: colors.muted }]}>
            ÉTTEREM / BOLT
          </Text>
          <Text style={[styles.sectionValue, { color: colors.text }]}>
            {order.restaurantName}
          </Text>
          <Text style={[styles.sectionSmall, { color: colors.muted }]}>
            📍 {order.restaurantAddress}
          </Text>
        </View>

        {/* Items Section */}
        <View
          style={[
            styles.section,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: colors.muted }]}>
            MEGRENDELÉS ({order.items.length} tétel)
          </Text>
          {order.items.map((item, idx) => (
            <View
              key={idx}
              style={[
                styles.itemRow,
                {
                  borderBottomColor: colors.border,
                  borderBottomWidth: idx < order.items.length - 1 ? 1 : 0,
                },
              ]}
            >
              <View>
                <Text style={[styles.itemName, { color: colors.text }]}>
                  {item.name}
                </Text>
                <Text style={[styles.itemQuantity, { color: colors.muted }]}>
                  Mennyiség: {item.quantity} db
                </Text>
              </View>
              <Text style={[styles.itemPrice, { color: colors.gold }]}>
                {(item.price * item.quantity).toFixed(0)} Ft
              </Text>
            </View>
          ))}
          <View style={styles.totalRow}>
            <Text style={[styles.totalLabel, { color: colors.muted }]}>
              Összesen:
            </Text>
            <Text style={[styles.totalPrice, { color: colors.gold }]}>
              {order.totalPrice.toFixed(0)} Ft
            </Text>
          </View>
        </View>

        {/* Delivery Address Section */}
        <View
          style={[
            styles.section,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: colors.muted }]}>
            KISZÁLLÍTÁSI CÍM
          </Text>
          <Text style={[styles.sectionValue, { color: colors.text }]}>
            {order.deliveryAddress}
          </Text>
          {order.latitude && order.longitude && (
            <Text style={[styles.coordinates, { color: colors.muted }]}>
              📍 {order.latitude.toFixed(4)}, {order.longitude.toFixed(4)}
            </Text>
          )}
        </View>

        {/* Client Info Section */}
        <View
          style={[
            styles.section,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: colors.muted }]}>
            MEGRENDELŐ ADATAI
          </Text>
          <View style={styles.infoGrid}>
            <View style={styles.infoItem}>
              <Text style={[styles.infoLabel, { color: colors.muted }]}>
                Név:
              </Text>
              <Text style={[styles.infoValue, { color: colors.text }]}>
                {order.clientName}
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={[styles.infoLabel, { color: colors.muted }]}>
                Telefon:
              </Text>
              <Text style={[styles.infoValue, { color: colors.text }]}>
                {order.clientPhone}
              </Text>
            </View>
          </View>
        </View>

        {/* Notes Section */}
        {order.notes && (
          <View
            style={[
              styles.section,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            <Text style={[styles.sectionTitle, { color: colors.muted }]}>
              MEGJEGYZÉS
            </Text>
            <Text style={[styles.sectionValue, { color: colors.text }]}>
              {order.notes}
            </Text>
          </View>
        )}

        {/* Action Buttons */}
        <View style={styles.actionSection}>
          {isAvailable ? (
            <Pressable
              style={({ pressed }) => [
                styles.actionBtn,
                {
                  backgroundColor: colors.green,
                  opacity: pressed || updating ? 0.85 : 1,
                },
              ]}
              onPress={handleAcceptOrder}
              disabled={updating}
            >
              {updating ? (
                <ActivityIndicator color="#000" size="small" />
              ) : (
                <Text style={styles.actionBtnText}>✅ Rendelés Elfogadása</Text>
              )}
            </Pressable>
          ) : isAccepted ? (
            <>
              {order.status === "készül" && (
                <Pressable
                  style={({ pressed }) => [
                    styles.actionBtn,
                    {
                      backgroundColor: colors.blue,
                      opacity: pressed || updating ? 0.85 : 1,
                    },
                  ]}
                  onPress={() => handleUpdateStatus("átadva_futárnak")}
                  disabled={updating}
                >
                  {updating ? (
                    <ActivityIndicator color="#fff" size="small" />
                  ) : (
                    <Text style={styles.actionBtnTextLight}>
                      📦 Átadva futárnak
                    </Text>
                  )}
                </Pressable>
              )}

              {order.status === "átadva_futárnak" && (
                <Pressable
                  style={({ pressed }) => [
                    styles.actionBtn,
                    {
                      backgroundColor: colors.green,
                      opacity: pressed || updating ? 0.85 : 1,
                    },
                  ]}
                  onPress={() => handleUpdateStatus("kézbesítve")}
                  disabled={updating}
                >
                  {updating ? (
                    <ActivityIndicator color="#000" size="small" />
                  ) : (
                    <Text style={styles.actionBtnText}>
                      🎉 Kézbesítve - Kész!
                    </Text>
                  )}
                </Pressable>
              )}

              {order.status !== "kézbesítve" && (
                <Pressable
                  style={({ pressed }) => [
                    styles.cancelBtn,
                    {
                      borderColor: colors.danger,
                      opacity: pressed || updating ? 0.7 : 1,
                    },
                  ]}
                  onPress={handleCancelOrder}
                  disabled={updating}
                >
                  <Text style={[styles.cancelBtnText, { color: colors.danger }]}>
                    ❌ Rendelés Visszavonása
                  </Text>
                </Pressable>
              )}
            </>
          ) : (
            <Text style={[styles.infoMessage, { color: colors.muted }]}>
              Ez a rendelés már más futár által lett elfogadva.
            </Text>
          )}
        </View>

        <View style={{ height: 40 }} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  backBtn: {
    fontSize: 16,
    fontWeight: "700",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "900",
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  section: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 12,
  },
  sectionValue: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
  },
  sectionSmall: {
    fontSize: 13,
    fontWeight: "500",
  },
  statusSection: {
    gap: 12,
  },
  statusTime: {
    fontSize: 12,
    fontWeight: "500",
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  itemName: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 4,
  },
  itemQuantity: {
    fontSize: 12,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: "800",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 12,
    marginTop: 12,
    borderTopWidth: 1,
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: "700",
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: "900",
  },
  coordinates: {
    fontSize: 12,
    marginTop: 8,
  },
  infoGrid: {
    gap: 12,
  },
  infoItem: {
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "600",
  },
  errorText: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  actionSection: {
    gap: 12,
    marginBottom: 20,
  },
  actionBtn: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  actionBtnText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#000",
  },
  actionBtnTextLight: {
    fontSize: 16,
    fontWeight: "800",
    color: "#fff",
  },
  cancelBtn: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: "center",
  },
  cancelBtnText: {
    fontSize: 16,
    fontWeight: "800",
  },
  infoMessage: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    paddingVertical: 16,
  },
});
