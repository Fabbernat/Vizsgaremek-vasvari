// client-app\app\profileScreen.tsx
import { useState, useRef, useEffect } from "react";
import {
  View,
  Pressable,
  Text,
  ScrollView,
  TextInput,
  Animated,
  StyleSheet,
  Image,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import Orders from "./orders";
import { router } from "expo-router";
import Toast from "react-native-toast-message";
import { getGlobalUsername, setGlobalUsername } from "./authStore";

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

// ── AnimatedInput ─────────────────────────────────────────────────────────────
function AnimatedInput({
  value,
  onChangeText,
  placeholder,
  iconName,
  secureTextEntry = false,
  autoCapitalize = "none",
}: {
  value: string;
  onChangeText: (v: string) => void;
  placeholder: string;
  iconName: string;
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
      <FontAwesome5 name={iconName} size={14} color={COLORS.muted} style={styles.inputIcon} />
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

// ── SectionHeader ─────────────────────────────────────────────────────────────
function SectionHeader({ iconName, title }: { iconName: string; title: string }) {
  return (
    <View style={styles.sectionHeader}>
      <FontAwesome5 name={iconName} size={13} color={COLORS.gold} />
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  );
}

// ── Avatar: initials vagy kép ─────────────────────────────────────────────────
function Avatar({ name, imageUri }: { name: string; imageUri: string }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <View style={styles.avatarCircle}>
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.avatarImage} />
      ) : (
        <Text style={styles.avatarInitials}>{initials}</Text>
      )}
    </View>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function ProfileScreen() {
  // Globális store-ból töltjük be, nem lokális default-ból
  const [currentUsername, setCurrentUsername] = useState(getGlobalUsername);
  const [newUsername, setNewUsername] = useState("");
  const [avatarUri, setAvatarUri] = useState("");
  const [loadingUsername, setLoadingUsername] = useState(false);
  const [loadingAvatar, setLoadingAvatar] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.spring(slideAnim, { toValue: 0, tension: 60, friction: 9, useNativeDriver: true }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  // ── Felhasználónév módosítása ─────────────────────────────────────────────
  async function modifyUsername() {
    if (!newUsername.trim()) {
      Toast.show({ type: "error", text1: "Hiba", text2: "Adj meg egy felhasználónevet" });
      return;
    }
    setLoadingUsername(true);
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/user/modify-username`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newUsername }),
      });
      if (!response.ok) throw new Error("Request failed");
    } catch {
      // API nem elérhető — lokálisan mindig mentjük
    } finally {
      // Globális store frissítése → navigáció után is megmarad
      setGlobalUsername(newUsername);
      setCurrentUsername(newUsername);
      setNewUsername("");
      setLoadingUsername(false);
      Toast.show({ type: "success", text1: "Siker!", text2: "Felhasználónév módosítva" });
    }
  }

  // ── Avatar kiválasztása gépről ────────────────────────────────────────────
  async function pickAvatar() {
    // Engedélykérés
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Toast.show({
        type: "error",
        text1: "Nincs engedély",
        text2: "Engedélyezd a galériához való hozzáférést",
      });
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],      // négyzet crop — avatar-hoz ideális
      quality: 0.7,
    });

    if (result.canceled) return;

    const uri = result.assets[0].uri;
    setLoadingAvatar(true);

    try {
      // Feltöltés a backendre (FormData-ként küldjük a fájlt)
      const formData = new FormData();
      formData.append("avatar", {
        uri,
        name: "avatar.jpg",
        type: "image/jpeg",
      } as any);

      const apiUrl = typeof process !== "undefined" ? (process as any).env?.EXPO_PUBLIC_API_URL : "";
      const response = await fetch(`${apiUrl}/api/user/modify-avatar`, {
        method: "POST",
        headers: { "Content-Type": "multipart/form-data" },
        body: formData,
      });
      if (!response.ok) throw new Error("Upload failed");
      Toast.show({ type: "success", text1: "Siker!", text2: "Profilkép feltöltve" });
    } catch {
      // Ha az API nem elérhető, lokálisan akkor is mentjük az URI-t
      Toast.show({ type: "info", text1: "Lokális mentés", text2: "Profilkép frissítve" });
    } finally {
      setAvatarUri(uri);   // lokálisan azonnal mutatjuk az új képet
      setLoadingAvatar(false);
    }
  }

  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Back */}
      <Pressable onPress={() => router.back()} style={styles.backBtn}>
        <Text style={styles.backText}>← Vissza</Text>
      </Pressable>
      {/* Brand */}
      <View style={styles.brandRow}>
        <FontAwesome5 name="crown" size={18} color={COLORS.gold} />
        <Text style={styles.brandName}>Royal Delivery</Text>
      </View>

      {/* Profile hero */}
      <Animated.View
        style={[styles.heroRow, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}
      >
        <Avatar name={currentUsername} imageUri={avatarUri} />
        <View style={{ flex: 1 }}>
          <Text style={styles.heroLabel}>Üdvözlünk,</Text>
          <Text style={styles.heroName}>{currentUsername}</Text>
        </View>
      </Animated.View>
      <Text style={styles.subheading}>Kezeld profil- és rendelési adataidat</Text>

      {/* ── Username card ── */}
      <View style={styles.card}>
        <SectionHeader iconName="pencil-alt" title="Felhasználónév módosítása" />
        <AnimatedInput
          value={newUsername}
          onChangeText={setNewUsername}
          placeholder="Új felhasználónév"
          iconName="user"
          autoCapitalize="sentences"
        />
        <Pressable
          onPress={modifyUsername}
          disabled={loadingUsername || !newUsername.trim()}
          style={({ pressed }) => [
            styles.primaryBtn,
            (loadingUsername || !newUsername.trim()) && styles.primaryBtnDisabled,
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
        <SectionHeader iconName="image" title="Profilkép módosítása" />

        {/* Előnézet, ha van kiválasztott kép */}
        {avatarUri ? (
          <View style={styles.avatarPreviewRow}>
            <Image source={{ uri: avatarUri }} style={styles.avatarPreview} />
            <Text style={styles.avatarPreviewLabel}>Jelenlegi profilkép</Text>
          </View>
        ) : (
          <View style={styles.avatarPlaceholderRow}>
            <FontAwesome5 name="user-circle" size={40} color={COLORS.border} />
            <Text style={styles.avatarPlaceholderText}>Még nincs profilkép</Text>
          </View>
        )}

        {/* Fájl kiválasztó gomb */}
        <Pressable
          onPress={pickAvatar}
          disabled={loadingAvatar}
          style={({ pressed }) => [
            styles.ghostBtn,
            styles.ghostBtnGold,
            loadingAvatar && styles.primaryBtnDisabled,
            pressed && !loadingAvatar && styles.btnPressed,
          ]}
        >
          <View style={styles.btnInnerRow}>
            <FontAwesome5
              name={loadingAvatar ? "spinner" : "upload"}
              size={13}
              color={loadingAvatar ? COLORS.goldDim : COLORS.gold}
            />
            <Text style={[styles.ghostBtnText, { color: loadingAvatar ? COLORS.goldDim : COLORS.gold }]}>
              {loadingAvatar ? "Feltöltés..." : "Kép kiválasztása a galériából →"}
            </Text>
          </View>
        </Pressable>
      </View>

      {/* ── Orders card ── */}
      <View style={styles.card}>
        <SectionHeader iconName="box-open" title="Rendeléseim" />
        <View style={styles.orderSection}>
          <View style={styles.orderLabelRow}>
            <FontAwesome5 name="truck" size={12} color={COLORS.muted} />
            <Text style={styles.orderSectionLabel}>Kiszállítás alatt</Text>
          </View>
        </View>
        <View style={styles.dividerLine} />
        <View style={styles.orderSection}>
          <View style={styles.orderLabelRow}>
            <FontAwesome5 name="hourglass-half" size={12} color={COLORS.muted} />
            <Text style={styles.orderSectionLabel}>Befejezetlen megrendelések</Text>
          </View>
          <Orders />
        </View>
        <View style={styles.dividerLine} />
        <View style={styles.orderSection}>
          <View style={styles.orderLabelRow}>
            <FontAwesome5 name="check-circle" size={12} color={COLORS.muted} />
            <Text style={styles.orderSectionLabel}>Korábbi megrendelések</Text>
          </View>
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
  backText: { color: COLORS.muted, fontSize: 15, fontWeight: "500" },
  backBtn: { paddingBottom: 12, paddingTop: 4 },

  brandRow: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 28 },
  brandName: { fontSize: 16, fontWeight: "700", color: COLORS.gold, letterSpacing: 0.5 },

  heroRow: { flexDirection: "row", alignItems: "center", gap: 16, marginBottom: 8 },
  avatarCircle: {
    width: 64, height: 64, borderRadius: 32,
    backgroundColor: COLORS.card, borderWidth: 2, borderColor: COLORS.gold,
    alignItems: "center", justifyContent: "center",
    overflow: "hidden",
  },
  avatarImage: { width: 64, height: 64, borderRadius: 32 },
  avatarInitials: { fontSize: 22, fontWeight: "800", color: COLORS.gold, letterSpacing: 1 },
  heroLabel: { fontSize: 13, color: COLORS.muted, marginBottom: 2 },
  heroName: { fontSize: 22, fontWeight: "900", color: COLORS.text, letterSpacing: -0.3 },
  subheading: { fontSize: 14, color: COLORS.muted, marginBottom: 28, marginTop: 6 },

  card: {
    backgroundColor: COLORS.card, borderRadius: 20,
    borderWidth: 1, borderColor: COLORS.border,
    padding: 18, gap: 12, marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: "row", alignItems: "center", gap: 8,
    paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: COLORS.border,
  },
  sectionTitle: { fontSize: 14, fontWeight: "700", color: COLORS.gold, letterSpacing: 0.2 },

  inputWrapper: {
    flexDirection: "row", alignItems: "center", backgroundColor: COLORS.surface,
    borderRadius: 12, borderWidth: 1.5, paddingHorizontal: 14, paddingVertical: 14, gap: 10,
  },
  inputIcon: { width: 18, textAlign: "center" },
  input: { flex: 1, fontSize: 15, color: COLORS.text, padding: 0 },
  inputFilledDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: COLORS.gold },

  // Avatar preview
  avatarPreviewRow: {
    flexDirection: "row", alignItems: "center", gap: 14,
    backgroundColor: COLORS.surface, borderRadius: 12,
    padding: 12, borderWidth: 1, borderColor: COLORS.border,
  },
  avatarPreview: { width: 52, height: 52, borderRadius: 26, borderWidth: 2, borderColor: COLORS.gold },
  avatarPreviewLabel: { fontSize: 13, color: COLORS.muted, fontWeight: "500" },
  avatarPlaceholderRow: {
    alignItems: "center", gap: 8, paddingVertical: 16,
    backgroundColor: COLORS.surface, borderRadius: 12,
    borderWidth: 1, borderColor: COLORS.border, borderStyle: "dashed",
  },
  avatarPlaceholderText: { fontSize: 13, color: COLORS.muted },

  primaryBtn: {
    backgroundColor: COLORS.gold, borderRadius: 14,
    paddingVertical: 16, alignItems: "center",
  },
  primaryBtnDisabled: { backgroundColor: COLORS.goldDim },
  primaryBtnText: { color: "#0f0e0c", fontSize: 15, fontWeight: "800", letterSpacing: 0.2 },
  primaryBtnSub: { color: "#0f0e0c", fontSize: 11, fontWeight: "500", opacity: 0.6, marginTop: 2 },

  ghostBtn: {
    borderWidth: 1, borderColor: COLORS.border, borderRadius: 12,
    paddingVertical: 14, alignItems: "center", backgroundColor: COLORS.surface,
  },
  ghostBtnGold: { borderColor: COLORS.goldDim },
  ghostBtnText: { fontSize: 14, fontWeight: "600", color: COLORS.muted },
  btnInnerRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  btnPressed: { opacity: 0.82, transform: [{ scale: 0.97 }] },

  orderSection: { gap: 6 },
  orderLabelRow: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 4 },
  orderSectionLabel: { fontSize: 13, fontWeight: "600", color: COLORS.muted },
  dividerLine: { height: 1, backgroundColor: COLORS.border, marginVertical: 4 },
});