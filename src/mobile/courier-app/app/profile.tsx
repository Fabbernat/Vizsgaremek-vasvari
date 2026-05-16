import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  StatusBar,
  Image,
} from "react-native";
import { router } from "expo-router";
import { useCourierAuth } from "../stores/CourierAuthStore";
import { useTheme } from "../context/CourierThemeContext";

export default function ProfileScreen() {
  const { courier } = useCourierAuth();
  const { colors } = useTheme();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.bg }]}
      showsVerticalScrollIndicator={false}
    >
      <StatusBar barStyle="light-content" backgroundColor={colors.bg} />

      {/* Header */}
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
          👤 Profil
        </Text>
        <View style={{ width: 50 }} />
      </View>

      <View style={styles.content}>
        {/* Avatar Section */}
        <View style={styles.avatarSection}>
          <View
            style={[
              styles.avatarBox,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            {courier?.profilePhotoUrl ? (
              <Image
                source={{ uri: courier.profilePhotoUrl }}
                style={styles.avatar}
              />
            ) : (
              <Text style={styles.avatarPlaceholder}>👨‍💼</Text>
            )}
          </View>
          <Text style={[styles.username, { color: colors.text }]}>
            {courier?.username}
          </Text>
          <Text style={[styles.email, { color: colors.muted }]}>
            {courier?.email}
          </Text>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View
            style={[
              styles.statBox,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            <Text style={styles.statIcon}>📦</Text>
            <Text style={[styles.statValue, { color: colors.text }]}>
              {courier?.totalDeliveries || 0}
            </Text>
            <Text style={[styles.statLabel, { color: colors.muted }]}>
              Kézbesítés
            </Text>
          </View>

          <View
            style={[
              styles.statBox,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            <Text style={styles.statIcon}>⭐</Text>
            <Text style={[styles.statValue, { color: colors.gold }]}>
              {(courier?.rating || 0).toFixed(1)}
            </Text>
            <Text style={[styles.statLabel, { color: colors.muted }]}>
              Értékelés
            </Text>
          </View>

          <View
            style={[
              styles.statBox,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            <Text style={styles.statIcon}>🟢</Text>
            <Text style={[styles.statValue, { color: colors.green }]}>
              {courier?.status === "online" ? "Online" : "Offline"}
            </Text>
            <Text style={[styles.statLabel, { color: colors.muted }]}>
              Státusz
            </Text>
          </View>
        </View>

        {/* Info Sections */}
        <View
          style={[
            styles.section,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: colors.muted }]}>
            KAPCSOLATADATOK
          </Text>

          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: colors.muted }]}>
              Email:
            </Text>
            <Text style={[styles.infoValue, { color: colors.text }]}>
              {courier?.email}
            </Text>
          </View>

          {courier?.phoneNumber && (
            <View style={styles.infoRow}>
              <Text style={[styles.infoLabel, { color: colors.muted }]}>
                Telefon:
              </Text>
              <Text style={[styles.infoValue, { color: colors.text }]}>
                {courier.phoneNumber}
              </Text>
            </View>
          )}
        </View>

        {/* Achievements */}
        <View
          style={[
            styles.section,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: colors.muted }]}>
            TELJESÍTMÉNYEK
          </Text>

          <View style={styles.achievementRow}>
            <View style={styles.achievement}>
              <Text style={styles.achievementIcon}>🥇</Text>
              <Text style={[styles.achievementText, { color: colors.text }]}>
                Megbízható Futár
              </Text>
            </View>
            <View style={styles.achievement}>
              <Text style={styles.achievementIcon}>⚡</Text>
              <Text style={[styles.achievementText, { color: colors.text }]}>
                Gyors Szállítás
              </Text>
            </View>
            <View style={styles.achievement}>
              <Text style={styles.achievementIcon}>😊</Text>
              <Text style={[styles.achievementText, { color: colors.text }]}>
                Jó Ügyfélszolgálat
              </Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionSection}>
          <Pressable
            style={({ pressed }) => [
              styles.actionBtn,
              {
                backgroundColor: colors.blue,
                opacity: pressed ? 0.85 : 1,
              },
            ]}
            onPress={() => router.push("/settings")}
          >
            <Text style={styles.actionBtnText}>⚙️ Beállítások</Text>
          </Pressable>
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
    fontSize: 18,
    fontWeight: "900",
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  avatarSection: {
    alignItems: "center",
    marginBottom: 32,
  },
  avatarBox: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    overflow: "hidden",
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
  avatarPlaceholder: {
    fontSize: 60,
  },
  username: {
    fontSize: 24,
    fontWeight: "900",
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    fontWeight: "600",
  },
  statsContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 24,
  },
  statBox: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    alignItems: "center",
  },
  statIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: "600",
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
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  infoLabel: {
    fontSize: 13,
    fontWeight: "600",
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "700",
  },
  achievementRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  achievement: {
    alignItems: "center",
    flex: 1,
  },
  achievementIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  achievementText: {
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
  },
  actionSection: {
    gap: 12,
    marginTop: 20,
  },
  actionBtn: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
  },
  actionBtnText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#fff",
  },
});
