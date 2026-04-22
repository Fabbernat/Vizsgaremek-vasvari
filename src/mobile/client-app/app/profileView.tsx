import { useState, useRef, useEffect } from "react";
import {
  View,
  Pressable,
  Text,
  ScrollView,
  TextInput,
  Animated,
  StyleSheet,
} from "react-native";
import Orders from "./orders";
import { router } from "expo-router";
import Toast from "react-native-toast-message";

const COLORS = {
  bg: "#0f0e0c",
  surface: "#1c1a16",
  card: "#242018",
  border: "#2e2b22",
  gold: "#f0b429",
  goldDim: "#7a5c15",
  text: "#f5f0e8",
  muted: "#9c9178",
  placeholder: "#5a5545",
};

// ── AnimatedInput (same as loginScreen) ──────────────────────────────────────
function AnimatedInput({
  value,
  onChangeText,
  placeholder,
  icon,
  secureTextEntry = false,
  autoCapitalize = "none",
}: {
  value: string;
  onChangeText: (v: string) => void;
  placeholder: string;
  icon: string;
  secureTextEntry?: boolean;
  autoCapitalize?: "none" | "sentences";
}) {
  const borderAnim = useRef(new Animated.Value(0)).current;

  const handleFocus = () =>
    Animated.timing(borderAnim, { toValue: 1, duration: 200, useNativeDriver: false }).start();
  const handleBlur = () =>
    Animated.timing(borderAnim, { toValue: 0, duration: 200, useNativeDriver: false }).start();

  const borderColor = borderAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [COLORS.border, COLORS.gold],
  });

  return (
    <Animated.View style={[styles.inputWrapper, { borderColor }]}>
      <Text style={styles.inputIcon}>{icon}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={COLORS.placeholder}
        secureTextEntry={secureTextEntry}
        autoCapitalize={autoCapitalize}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={styles.input}
      />
      {value.length > 0 && <View style={styles.inputFilledDot} />}
    </Animated.View>
  );
}

// ── Section header ─────────────────────────────────────────────────────────
function SectionHeader({ icon, title }: { icon: string; title: string }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionIcon}>{icon}</Text>
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  );
}

// ── Avatar initials circle ─────────────────────────────────────────────────
function Avatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <View style={styles.avatarCircle}>
      <Text style={styles.avatarInitials}>{initials}</Text>
    </View>
  );
}

// ── Main component ─────────────────────────────────────────────────────────
export default function ProfileView() {
  const [currentUsername, setCurrentUsername] = useState("Kiss Anna");
  const [newUsername, setNewUsername] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [loadingUsername, setLoadingUsername] = useState(false);
  const [loadingAvatar, setLoadingAvatar] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.spring(slideAnim, { toValue: 0, tension: 60, friction: 9, useNativeDriver: true }),
    ]).start();
  }, []);

  // ── Modify username ──────────────────────────────────────────────────────
  async function modifyUsername() {
    if (!newUsername.trim()) {
      Toast.show({ type: "error", text1: "Hiba", text2: "Adj meg egy felhasználónevet" });
      return;
    }
    setLoadingUsername(true);
    try {
      const response = await fetch("http://10.0.2.2:54321/api/user/modify-username", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newUsername }),
      });

      if (!response.ok) throw new Error("Request failed");

      Toast.show({ type: "success", text1: "Siker!", text2: "Felhasználónév módosítva" });
      setCurrentUsername(newUsername);
      setNewUsername("");
    } catch (error) {
      Toast.show({ type: "error", text1: "Hiba történt", text2: "Nem sikerült módosítani" });
    } finally {
      setLoadingUsername(false);
    }
  }

  // ── Modify avatar ────────────────────────────────────────────────────────
  async function modifyAvatar() {
    if (!avatarUrl.trim()) {
      Toast.show({ type: "error", text1: "Hiba", text2: "Adj meg egy képet" });
      return;
    }
    setLoadingAvatar(true);
    try {
      const response = await fetch("http://10.0.2.2:54321/api/user/modify-avatar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ avatarUrl }),
      });

      if (!response.ok) throw new Error("Request failed");

      Toast.show({ type: "success", text1: "Siker!", text2: "Profilkép módosítva" });
      setAvatarUrl("");
    } catch (error) {
      Toast.show({ type: "error", text1: "Hiba történt", text2: "Nem sikerült módosítani a profilképet" });
    } finally {
      setLoadingAvatar(false);
    }
  }

  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Brand */}
      <View style={styles.brandRow}>
        <Text style={styles.crown}>👑</Text>
        <Text style={styles.brandName}>Royal Delivery</Text>
      </View>

      {/* Profile hero */}
      <Animated.View
        style={[styles.heroRow, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}
      >
        <Avatar name={currentUsername} />
        <View style={{ flex: 1 }}>
          <Text style={styles.heroLabel}>Üdvözlünk,</Text>
          <Text style={styles.heroName}>{currentUsername}</Text>
        </View>
      </Animated.View>

      <Text style={styles.subheading}>Kezeld profil- és rendelési adataidat</Text>

      {/* ── Username card ── */}
      <View style={styles.card}>
        <SectionHeader icon="✏️" title="Felhasználónév módosítása" />
        <AnimatedInput
          value={newUsername}
          onChangeText={setNewUsername}
          placeholder="Új felhasználónév"
          icon="👤"
          autoCapitalize="sentences"
        />
        <Pressable
          onPress={modifyUsername}
          disabled={loadingUsername}
          style={({ pressed }) => [
            styles.primaryBtn,
            loadingUsername && styles.primaryBtnDisabled,
            pressed && !loadingUsername && styles.btnPressed,
          ]}
        >
          <Text style={styles.primaryBtnText}>
            {loadingUsername ? "Mentés..." : "Felhasználónév mentése →"}
          </Text>
        </Pressable>
      </View>

      {/* ── Avatar card ── */}
      <View style={styles.card}>
        <SectionHeader icon="🖼️" title="Profilkép módosítása" />
        <AnimatedInput
          value={avatarUrl}
          onChangeText={setAvatarUrl}
          placeholder="Kép feltöltése"
          icon="🔗"
        />
        <Pressable
          onPress={modifyAvatar}
          disabled={loadingAvatar}
          style={({ pressed }) => [
            styles.ghostBtn,
            styles.ghostBtnGold,
            loadingAvatar && styles.primaryBtnDisabled,
            pressed && !loadingAvatar && styles.btnPressed,
          ]}
        >
          <Text style={[styles.ghostBtnText, { color: COLORS.gold }]}>
            {loadingAvatar ? "Feltöltés..." : "Profilkép módosítása →"}
          </Text>
        </Pressable>
      </View>

      {/* ── Orders card ── */}
      <View style={styles.card}>
        <SectionHeader icon="📦" title="Rendeléseim" />

        <View style={styles.orderSection}>
          <Text style={styles.orderSectionLabel}>🚚  Kiszállítás alatt</Text>
        </View>
        <View style={styles.dividerLine} />

        <View style={styles.orderSection}>
          <Text style={styles.orderSectionLabel}>⏳  Befejezetlen megrendelések</Text>
          <Orders />
        </View>
        <View style={styles.dividerLine} />

        <View style={styles.orderSection}>
          <Text style={styles.orderSectionLabel}>✅  Korábbi megrendelések</Text>
        </View>
      </View>

      {/* ── Checkout button ── */}
      <Pressable
        onPress={() => router.push("/checkoutScreen")}
        style={({ pressed }) => [styles.primaryBtn, pressed && styles.btnPressed]}
      >
        <Text style={styles.primaryBtnText}>Megrendelés →</Text>
        <Text style={styles.primaryBtnSub}>Tovább a fizetéshez</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.bg },
  scrollContent: { paddingHorizontal: 24, paddingBottom: 48, paddingTop: 24 },

  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 28,
  },
  crown: { fontSize: 22 },
  brandName: { fontSize: 16, fontWeight: "700", color: COLORS.gold, letterSpacing: 0.5 },

  heroRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginBottom: 8,
  },
  avatarCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.card,
    borderWidth: 2,
    borderColor: COLORS.gold,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarInitials: {
    fontSize: 22,
    fontWeight: "800",
    color: COLORS.gold,
    letterSpacing: 1,
  },
  heroLabel: { fontSize: 13, color: COLORS.muted, marginBottom: 2 },
  heroName: { fontSize: 22, fontWeight: "900", color: COLORS.text, letterSpacing: -0.3 },

  subheading: { fontSize: 14, color: COLORS.muted, marginBottom: 28, marginTop: 6 },

  card: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 18,
    gap: 12,
    marginBottom: 16,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  sectionIcon: { fontSize: 15 },
  sectionTitle: { fontSize: 14, fontWeight: "700", color: COLORS.gold, letterSpacing: 0.2 },

  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    borderWidth: 1.5,
    paddingHorizontal: 14,
    paddingVertical: 14,
    gap: 10,
  },
  inputIcon: { fontSize: 15 },
  input: { flex: 1, fontSize: 15, color: COLORS.text, padding: 0 },
  inputFilledDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: COLORS.gold },

  primaryBtn: {
    backgroundColor: COLORS.gold,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
  },
  primaryBtnDisabled: { backgroundColor: COLORS.goldDim },
  primaryBtnText: { color: "#0f0e0c", fontSize: 15, fontWeight: "800", letterSpacing: 0.2 },
  primaryBtnSub: { color: "#0f0e0c", fontSize: 11, fontWeight: "500", opacity: 0.6, marginTop: 2 },

  ghostBtn: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    backgroundColor: COLORS.surface,
  },
  ghostBtnGold: { borderColor: COLORS.goldDim },
  ghostBtnText: { fontSize: 14, fontWeight: "600", color: COLORS.muted },

  btnPressed: { opacity: 0.82, transform: [{ scale: 0.97 }] },

  orderSection: { gap: 6 },
  orderSectionLabel: { fontSize: 13, fontWeight: "600", color: COLORS.muted, marginBottom: 4 },
  dividerLine: { height: 1, backgroundColor: COLORS.border, marginVertical: 4 },
});