// app/(app)/settingsScreen.tsx
//
// Settings page.
//   Guest    → Appearance (theme toggle) + "Log in for more" prompt
//   Logged in → Appearance + Account info + Notification prefs

import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
    Animated,
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    View,
} from "react-native";
import { supabase } from "../../supabase";
import { useGlobalAuth } from "./AuthStore";
import { useTheme } from "./ThemeContext";

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────────────────

function SectionHeader({ icon, title, colors }: { icon: string; title: string; colors: any }) {
  return (
    <View style={[styles.sectionHeader, { borderBottomColor: colors.border }]}>
      <Text style={styles.sectionIcon}>{icon}</Text>
      <Text style={[styles.sectionTitle, { color: colors.gold }]}>{title}</Text>
    </View>
  );
}

function SettingRow({
  icon,
  label,
  sublabel,
  right,
  onPress,
  colors,
  isLast = false,
}: {
  icon: string;
  label: string;
  sublabel?: string;
  right?: React.ReactNode;
  onPress?: () => void;
  colors: any;
  isLast?: boolean;
}) {
  const Wrap = onPress ? Pressable : View;

  return (
    <Wrap
      onPress={onPress}
      style={({ pressed }: any) => [
        styles.settingRow,
        !isLast && { borderBottomWidth: 1, borderBottomColor: colors.border },
        onPress && pressed && { opacity: 0.7 },
      ]}
    >
      <View style={[styles.settingIconBox, { backgroundColor: colors.surface }]}>
        <Text style={{ fontSize: 16 }}>{icon}</Text>
      </View>
      <View style={styles.settingText}>
        <Text style={[styles.settingLabel, { color: colors.text }]}>{label}</Text>
        {sublabel ? (
          <Text style={[styles.settingSubLabel, { color: colors.muted }]}>{sublabel}</Text>
        ) : null}
      </View>
      {right ?? (onPress ? (
        <Ionicons name="chevron-forward" size={16} color={colors.muted} />
      ) : null)}
    </Wrap>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Screen
// ─────────────────────────────────────────────────────────────────────────────

export default function SettingsScreen() {
  const { colors, isDark, toggleTheme } = useTheme();
  const { isLoggedIn } = useGlobalAuth();

  // Notification toggles (local state — wire to Supabase/AsyncStorage as needed)
  const [orderNotifs, setOrderNotifs] = useState(true);
  const [promoNotifs, setPromoNotifs] = useState(false);

  // User email (fetched when logged in)
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    if (isLoggedIn) {
      supabase.auth.getUser().then(({ data }) => {
        setUserEmail(data.user?.email ?? null);
      });
    }
  }, [isLoggedIn]);

  // Entrance animation
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(24)).current;
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 400, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 400, useNativeDriver: true }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  const switchThumbColor = isDark ? colors.gold : colors.gold;
  const switchTrackOn = isDark ? "#7a5c15" : "#e8c56a";
  const switchTrackOff = colors.border;

  return (
    <ScrollView
      style={[styles.root, { backgroundColor: colors.bg }]}
      contentContainerStyle={styles.scroll}
      showsVerticalScrollIndicator={false}
    >
      {/* Back */}
      <Pressable onPress={() => router.back()} style={styles.backBtn}>
        <Text style={[styles.backText, { color: colors.muted }]}>← Vissza</Text>
      </Pressable>

      {/* Brand */}
      <Animated.View
        style={[styles.brandRow, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}
      >
        <Image
          source={require("../../assets/mine/icons/royal-delivery-logo.png")}
          style={styles.crown}
        />
        <View>
          <Text style={[styles.brandName, { color: colors.gold }]}>Royal Delivery</Text>
          <Text style={[styles.brandSub, { color: colors.muted }]}>Beállítások</Text>
        </View>
      </Animated.View>

      <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>

        {/* ── Appearance ───────────────────────────────────────────── */}
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <SectionHeader icon="🎨" title="Megjelenés" colors={colors} />

          <SettingRow
            icon={isDark ? "🌙" : "☀️"}
            label={isDark ? "Sötét mód" : "Világos mód"}
            sublabel="Válts a sötét és világos téma között"
            colors={colors}
            isLast
            right={
              <Switch
                value={isDark}
                onValueChange={toggleTheme}
                thumbColor={switchThumbColor}
                trackColor={{ true: switchTrackOn, false: switchTrackOff }}
                ios_backgroundColor={switchTrackOff}
              />
            }
          />
        </View>

        {/* ── Account (logged in only) ─────────────────────────────── */}
        {isLoggedIn ? (
          <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <SectionHeader icon="👤" title="Fiók" colors={colors} />

            <SettingRow
              icon="✉️"
              label="Email cím"
              sublabel={userEmail ?? "Betöltés..."}
              colors={colors}
            />

            <SettingRow
              icon="🧾"
              label="Rendeléseim"
              sublabel="Korábbi rendelések megtekintése"
              onPress={() => router.push("/Orders")}
              colors={colors}
            />

            <SettingRow
              icon="👤"
              label="Profil szerkesztése"
              sublabel="Adataim módosítása"
              onPress={() => router.push("/ProfileScreen")}
              colors={colors}
              isLast
            />
          </View>
        ) : null}

        {/* ── Notifications (logged in only) ───────────────────────── */}
        {isLoggedIn ? (
          <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <SectionHeader icon="🔔" title="Értesítések" colors={colors} />

            <SettingRow
              icon="📦"
              label="Rendelési frissítések"
              sublabel="Értesítés a rendelés állapotáról"
              colors={colors}
              right={
                <Switch
                  value={orderNotifs}
                  onValueChange={setOrderNotifs}
                  thumbColor={switchThumbColor}
                  trackColor={{ true: switchTrackOn, false: switchTrackOff }}
                  ios_backgroundColor={switchTrackOff}
                />
              }
            />

            <SettingRow
              icon="🎉"
              label="Akciók és ajánlatok"
              sublabel="Értesítés különleges ajánlatokról"
              colors={colors}
              isLast
              right={
                <Switch
                  value={promoNotifs}
                  onValueChange={setPromoNotifs}
                  thumbColor={switchThumbColor}
                  trackColor={{ true: switchTrackOn, false: switchTrackOff }}
                  ios_backgroundColor={switchTrackOff}
                />
              }
            />
          </View>
        ) : null}

        {/* ── Guest CTA ─────────────────────────────────────────────── */}
        {!isLoggedIn ? (
          <View style={[styles.guestCard, { backgroundColor: colors.goldFaint, borderColor: colors.goldDim }]}>
            <Text style={[styles.guestIcon]}>🔒</Text>
            <Text style={[styles.guestTitle, { color: colors.text }]}>
              Több lehetőség vár rád!
            </Text>
            <Text style={[styles.guestBody, { color: colors.muted }]}>
              Jelentkezz be a fiókbeállítások, értesítések és rendelési előzmények eléréséhez.
            </Text>
            <View style={styles.guestBtnRow}>
              <Pressable
                onPress={() => router.push("/LoginScreen")}
                style={({ pressed }) => [
                  styles.guestBtn,
                  { backgroundColor: colors.gold },
                  pressed && { opacity: 0.8 },
                ]}
              >
                <Text style={styles.guestBtnText}>Bejelentkezés</Text>
              </Pressable>
              <Pressable
                onPress={() => router.push("/RegisterScreen")}
                style={({ pressed }) => [
                  styles.guestBtnOutline,
                  { borderColor: colors.goldDim },
                  pressed && { opacity: 0.8 },
                ]}
              >
                <Text style={[styles.guestBtnOutlineText, { color: colors.gold }]}>
                  Regisztráció
                </Text>
              </Pressable>
            </View>
          </View>
        ) : null}

        {/* ── About ────────────────────────────────────────────────── */}
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <SectionHeader icon="ℹ️" title="Az alkalmazásról" colors={colors} />
          <SettingRow
            icon="📱"
            label="Verzió"
            sublabel="1.0.0"
            colors={colors}
          />
          <SettingRow
            icon="📞"
            label="Kapcsolat & Segítség"
            onPress={() => router.push("/ContactDetails")}
            colors={colors}
            isLast
          />
        </View>

        {/* Bottom spacer */}
        <View style={{ height: 32 }} />
      </Animated.View>
    </ScrollView>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Styles
// ─────────────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root: { flex: 1 },
  scroll: { paddingHorizontal: 20, paddingBottom: 48 },

  backBtn: { paddingTop: 20, paddingBottom: 8 },
  backText: { fontSize: 15, fontWeight: "500" },

  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 28,
    marginTop: 4,
  },
  crown: { width: 64, height: 64, resizeMode: "contain" },
  brandName: { fontSize: 18, fontWeight: "800", letterSpacing: 0.3 },
  brandSub: { fontSize: 13, fontWeight: "500", marginTop: 2 },

  card: {
    borderRadius: 18,
    borderWidth: 1,
    overflow: "hidden",
    marginBottom: 16,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  sectionIcon: { fontSize: 16 },
  sectionTitle: { fontSize: 13, fontWeight: "700", letterSpacing: 0.5, textTransform: "uppercase" },

  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 14,
  },
  settingIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  settingText: { flex: 1 },
  settingLabel: { fontSize: 15, fontWeight: "600" },
  settingSubLabel: { fontSize: 12, marginTop: 2 },

  // Guest CTA card
  guestCard: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 20,
    alignItems: "center",
    marginBottom: 16,
    gap: 8,
  },
  guestIcon: { fontSize: 32, marginBottom: 4 },
  guestTitle: { fontSize: 17, fontWeight: "800", textAlign: "center" },
  guestBody: { fontSize: 13, textAlign: "center", lineHeight: 20, maxWidth: 260 },
  guestBtnRow: { flexDirection: "row", gap: 10, marginTop: 12 },
  guestBtn: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  guestBtnText: { color: "#0f0e0c", fontWeight: "800", fontSize: 14 },
  guestBtnOutline: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
  },
  guestBtnOutlineText: { fontWeight: "700", fontSize: 14 },
});