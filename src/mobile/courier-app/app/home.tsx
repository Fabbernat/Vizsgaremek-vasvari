import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { router } from "expo-router";
import { useCourierAuth } from "../stores/CourierAuthStore";
import { useCourierOrderStore } from "../stores/OrderStore";
import { useTheme } from "../context/CourierThemeContext";
import { OrderCard } from "../components/OrderCard";
import { DeliveryOrder } from "../models/deliveryOrder";

export default function CourierHomeScreen() {
  const { courier, loading: authLoading } = useCourierAuth();
  const { availableOrders, myOrders, loading: ordersLoading, fetchAvailableOrders, fetchMyOrders } = useCourierOrderStore();
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState<"available" | "my-orders">("available");

  useEffect(() => {
    fetchAvailableOrders();
    if (courier?.id) {
      fetchMyOrders(courier.id);
    }
  }, [courier?.id]);

  const handleOrderPress = (order: DeliveryOrder) => {
    router.push({
      pathname: "/order-detail",
      params: { orderId: order.id, status: order.status },
    });
  };

  const handleSettingsPress = () => {
    router.push("/settings");
  };

  const handleProfilePress = () => {
    router.push("/profile");
  };

  if (authLoading) {
    return (
      <View style={[styles.container, { backgroundColor: colors.bg }]}>
        <ActivityIndicator size="large" color={colors.gold} />
      </View>
    );
  }

  if (!courier?.id) {
    return (
      <View style={[styles.container, { backgroundColor: colors.bg }]}>
        <Text style={[styles.errorText, { color: colors.danger }]}>
          Nem bejelentkezve!
        </Text>
        <Pressable
          style={({ pressed }) => [
            styles.btn,
            { backgroundColor: colors.blue, opacity: pressed ? 0.85 : 1 },
          ]}
          onPress={() => router.push("/login")}
        >
          <Text style={styles.btnText}>Bejelentkezés</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <StatusBar barStyle="light-content" backgroundColor={colors.bg} />

      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
        <View>
          <Text style={[styles.greeting, { color: colors.muted }]}>
            Üdv vissza! 👋
          </Text>
          <Text style={[styles.username, { color: colors.text }]}>
            {courier.username}
          </Text>
        </View>
        <View style={styles.headerActions}>
          <Pressable
            style={({ pressed }) => [
              styles.iconBtn,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
                opacity: pressed ? 0.85 : 1,
              },
            ]}
            onPress={handleSettingsPress}
          >
            <Text style={styles.icon}>⚙️</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              styles.iconBtn,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
                opacity: pressed ? 0.85 : 1,
              },
            ]}
            onPress={handleProfilePress}
          >
            <Text style={styles.icon}>👤</Text>
          </Pressable>
        </View>
      </View>

      {/* Online Status Badge */}
      <View style={styles.statusContainer}>
        <View
          style={[
            styles.statusDot,
            {
              backgroundColor: courier.status === "online" ? colors.green : colors.muted,
            },
          ]}
        />
        <Text style={[styles.statusText, { color: colors.text }]}>
          {courier.status === "online" ? "Online" : "Offline"}
        </Text>
      </View>

      {/* Tabs */}
      <View style={[styles.tabs, { borderBottomColor: colors.border }]}>
        <Pressable
          style={[
            styles.tab,
            activeTab === "available" && {
              borderBottomColor: colors.gold,
              borderBottomWidth: 3,
            },
          ]}
          onPress={() => setActiveTab("available")}
        >
          <Text
            style={[
              styles.tabText,
              {
                color: activeTab === "available" ? colors.gold : colors.muted,
              },
            ]}
          >
            🆕 Elérhető ({availableOrders.length})
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.tab,
            activeTab === "my-orders" && {
              borderBottomColor: colors.gold,
              borderBottomWidth: 3,
            },
          ]}
          onPress={() => setActiveTab("my-orders")}
        >
          <Text
            style={[
              styles.tabText,
              {
                color: activeTab === "my-orders" ? colors.gold : colors.muted,
              },
            ]}
          >
            📦 Szállítás alatt ({myOrders.length})
          </Text>
        </Pressable>
      </View>

      {/* Content */}
      {ordersLoading ? (
        <View style={styles.centerContent}>
          <ActivityIndicator size="large" color={colors.gold} />
          <Text style={[styles.loadingText, { color: colors.muted }]}>
            Rendelések betöltése...
          </Text>
        </View>
      ) : activeTab === "available" ? (
        <FlatList
          data={availableOrders}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <OrderCard order={item} onPress={handleOrderPress} />
          )}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyIcon}>📭</Text>
              <Text style={[styles.emptyText, { color: colors.muted }]}>
                Jelenleg nincsenek elérhető rendelések.
              </Text>
              <Pressable
                style={({ pressed }) => [
                  styles.refreshBtn,
                  {
                    backgroundColor: colors.gold,
                    opacity: pressed ? 0.85 : 1,
                  },
                ]}
                onPress={() => fetchAvailableOrders()}
              >
                <Text style={styles.refreshBtnText}>🔄 Frissítés</Text>
              </Pressable>
            </View>
          }
        />
      ) : (
        <FlatList
          data={myOrders}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <OrderCard order={item} onPress={handleOrderPress} />
          )}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyIcon}>🎉</Text>
              <Text style={[styles.emptyText, { color: colors.muted }]}>
                Nincsenek szállítás alatt álló rendelések.
              </Text>
            </View>
          }
        />
      )}
    </View>
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
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  greeting: {
    fontSize: 12,
    fontWeight: "500",
    marginBottom: 4,
  },
  username: {
    fontSize: 18,
    fontWeight: "900",
  },
  headerActions: {
    flexDirection: "row",
    gap: 8,
  },
  iconBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    fontSize: 20,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  statusText: {
    fontSize: 14,
    fontWeight: "600",
  },
  tabs: {
    flexDirection: "row",
    borderBottomWidth: 1,
    paddingHorizontal: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    borderBottomWidth: 3,
    borderBottomColor: "transparent",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "700",
    textAlign: "center",
  },
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingBottom: 40,
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 12,
  },
  emptyContainer: {
    alignItems: "center",
    paddingVertical: 48,
  },
  emptyIcon: {
    fontSize: 60,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 16,
    textAlign: "center",
  },
  refreshBtn: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  refreshBtnText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0f0e0c",
  },
  errorText: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 16,
  },
  btn: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    alignSelf: "center",
  },
  btnText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#fff",
  },
});
