import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Alert,
  ActivityIndicator,
  StatusBar,
  Switch,
} from "react-native";
import { router } from "expo-router";
import { useCourierAuth } from "../stores/CourierAuthStore";
import { useTheme } from "../context/CourierThemeContext";

export default function SettingsScreen() {
  const { courier, updateProfile, setOnlineStatus, logout, loading } = useCourierAuth();
  const { colors, theme, toggleTheme } = useTheme();
  const [language, setLanguage] = useState<"hu" | "en">(courier?.language || "hu");
  const [isOnline, setIsOnline] = useState(courier?.status === "online");
  const [updating, setUpdating] = useState(false);

  const handleLanguageChange = async (newLang: "hu" | "en") => {
    try {
      setUpdating(true);
      setLanguage(newLang);
      await updateProfile({ language: newLang });
      Alert.alert("Siker", "Nyelv módosítva");
    } catch (error) {
      Alert.alert("Hiba", "A nyelv módosítása sikertelen");
    } finally {
      setUpdating(false);
    }
  };

  const handleOnlineStatusChange = async (value: boolean) => {
    try {
      setUpdating(true);
      setIsOnline(value);
      await setOnlineStatus(value ? "online" : "offline");
    } catch (error) {
      Alert.alert("Hiba", "Az állapot módosítása sikertelen");
      setIsOnline(!value);
    } finally {
      setUpdating(false);
    }
  };

  const handleLogout = async () => {
    Alert.alert("Kijelentkezés", "Biztosan ki akarsz jelentkezni?", [
      { text: "Mégsem", style: "cancel" },
      {
        text: "Igen, kijelentkezés",
        style: "destructive",
        onPress: async () => {
          try {
            setUpdating(true);
            await logout();
            router.replace("/login");
          } catch (error) {
            Alert.alert("Hiba", "A kijelentkezés sikertelen");
          } finally {
            setUpdating(false);
          }
        },
      },
    ]);
  };

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: colors.bg }]}>
        <ActivityIndicator size="large" color={colors.gold} />
      </View>
    );
  }

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
          ⚙️ Beállítások
        </Text>
        <View style={{ width: 50 }} />
      </View>

      <View style={styles.content}>
        {/* Profile Section */}
        <View
          style={[
            styles.section,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: colors.muted }]}>
            PROFIL
          </Text>

          <View style={styles.profileInfo}>
            <Text style={[styles.label, { color: colors.muted }]}>
              Felhasználónév:
            </Text>
            <Text style={[styles.value, { color: colors.text }]}>
              {courier?.username}
            </Text>
          </View>

          <View style={styles.profileInfo}>
            <Text style={[styles.label, { color: colors.muted }]}>
              Email:
            </Text>
            <Text style={[styles.value, { color: colors.text }]}>
              {courier?.email}
            </Text>
          </View>

          <View style={styles.profileInfo}>
            <Text style={[styles.label, { color: colors.muted }]}>
              Szállítások:
            </Text>
            <Text style={[styles.value, { color: colors.text }]}>
              {courier?.totalDeliveries || 0}
            </Text>
          </View>

          <View style={styles.profileInfo}>
            <Text style={[styles.label, { color: colors.muted }]}>
              Értékelés:
            </Text>
            <Text style={[styles.value, { color: colors.gold }]}>
              {"⭐".repeat(Math.floor(courier?.rating || 0))} ({(courier?.rating || 0).toFixed(1)})
            </Text>
          </View>
        </View>

        {/* Online Status */}
        <View
          style={[
            styles.section,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: colors.muted }]}>
            STÁTUSZ
          </Text>

          <View style={styles.settingRow}>
            <View>
              <Text style={[styles.settingLabel, { color: colors.text }]}>
                Online Mód
              </Text>
              <Text style={[styles.settingDescription, { color: colors.muted }]}>
                Rendeléseket fogadni tud: {isOnline ? "Igen ✅" : "Nem ❌"}
              </Text>
            </View>
            <Switch
              value={isOnline}
              onValueChange={handleOnlineStatusChange}
              disabled={updating}
              trackColor={{ false: colors.border, true: colors.gold }}
              thumbColor={isOnline ? colors.green : colors.muted}
            />
          </View>
        </View>

        {/* Appearance */}
        <View
          style={[
            styles.section,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: colors.muted }]}>
            MEGJELENÉS
          </Text>

          <View style={styles.settingRow}>
            <View>
              <Text style={[styles.settingLabel, { color: colors.text }]}>
                Sötét Téma
              </Text>
              <Text style={[styles.settingDescription, { color: colors.muted }]}>
                Jelenlegi: {theme === "dark" ? "Sötét" : "Világos"}
              </Text>
            </View>
            <Switch
              value={theme === "dark"}
              onValueChange={toggleTheme}
              trackColor={{ false: colors.border, true: colors.gold }}
              thumbColor={theme === "dark" ? colors.gold : colors.muted}
            />
          </View>
        </View>

        {/* Language */}
        <View
          style={[
            styles.section,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: colors.muted }]}>
            NYELV
          </Text>

          <View style={styles.languageButtons}>
            <Pressable
              style={({ pressed }) => [
                styles.langBtn,
                {
                  backgroundColor: language === "hu" ? colors.gold : colors.surface,
                  borderColor: colors.border,
                  opacity: pressed || updating ? 0.7 : 1,
                },
              ]}
              onPress={() => handleLanguageChange("hu")}
              disabled={updating}
            >
              <Text
                style={[
                  styles.langBtnText,
                  { color: language === "hu" ? "#000" : colors.text },
                ]}
              >
                🇭🇺 Magyar
              </Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.langBtn,
                {
                  backgroundColor: language === "en" ? colors.gold : colors.surface,
                  borderColor: colors.border,
                  opacity: pressed || updating ? 0.7 : 1,
                },
              ]}
              onPress={() => handleLanguageChange("en")}
              disabled={updating}
            >
              <Text
                style={[
                  styles.langBtnText,
                  { color: language === "en" ? "#000" : colors.text },
                ]}
              >
                🇬🇧 English
              </Text>
            </Pressable>
          </View>
        </View>

        {/* About */}
        <View
          style={[
            styles.section,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: colors.muted }]}>
            RÓLUNK
          </Text>

          <View style={styles.aboutItem}>
            <Text style={[styles.aboutLabel, { color: colors.muted }]}>
              Alkalmazás:
            </Text>
            <Text style={[styles.aboutValue, { color: colors.text }]}>
              Royal Delivery - Futár App
            </Text>
          </View>

          <View style={styles.aboutItem}>
            <Text style={[styles.aboutLabel, { color: colors.muted }]}>
              Verzió:
            </Text>
            <Text style={[styles.aboutValue, { color: colors.text }]}>
              1.0.0
            </Text>
          </View>
        </View>

        {/* Logout Button */}
        <Pressable
          style={({ pressed }) => [
            styles.logoutBtn,
            {
              backgroundColor: colors.danger,
              opacity: pressed || updating ? 0.85 : 1,
            },
          ]}
          onPress={handleLogout}
          disabled={updating}
        >
          {updating ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Text style={styles.logoutBtnText}>🚪 Kijelentkezés</Text>
          )}
        </Pressable>

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
  profileInfo: {
    marginBottom: 12,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 4,
  },
  value: {
    fontSize: 14,
    fontWeight: "700",
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 12,
    fontWeight: "500",
  },
  languageButtons: {
    flexDirection: "row",
    gap: 12,
  },
  langBtn: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
  },
  langBtnText: {
    fontSize: 14,
    fontWeight: "700",
  },
  aboutItem: {
    marginBottom: 12,
  },
  aboutLabel: {
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 4,
  },
  aboutValue: {
    fontSize: 14,
    fontWeight: "700",
  },
  logoutBtn: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
  },
  logoutBtnText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#fff",
  },
});
