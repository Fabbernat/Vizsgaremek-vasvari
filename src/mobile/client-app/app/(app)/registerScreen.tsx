// client-app\(app)\app\(app)\registerScreen.tsx
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Animated,
    Image,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import Toast from "react-native-toast-message";
import { supabase } from "../../supabase";
import { setGlobalIsLoggedIn } from "./AuthStore";

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

function AnimatedInput({
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  autoCapitalize = "none",
  icon,
}: {
  value: string;
  onChangeText: (v: string) => void;
  placeholder: string;
  secureTextEntry?: boolean;
  autoCapitalize?: "none" | "sentences";
  icon: string;
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

export default function RegisterScreen() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [loading, setLoading] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;
  
  const isValidEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const isStrongPassword = (pw: string) => {
  return pw.length >= 6;
};

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.spring(slideAnim, { toValue: 0, tension: 60, friction: 9, useNativeDriver: true }),
    ]).start();
  }, [fadeAnim, slideAnim]);

 const isFormValid =
  username.trim().length > 0 &&
  isValidEmail(email) &&
  password.length > 0 &&
  passwordRepeat.length > 0 &&
  password === passwordRepeat;

  // ── Valódi Supabase regisztráció ──────────────────────────────────────────
  async function handleRegister() {
    if (loading) return;
    if (password !== passwordRepeat) {
      Alert.alert("Hiba!", "A jelszavak nem egyeznek!");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { username, role: "customer" } },
    });
    setLoading(false);

    if (error) {
  if (error.message.toLowerCase().includes("network")) {
    Toast.show({
      type: "error",
      text1: "Hálózati hiba",
      text2: "Ellenőrizd az internetkapcsolatot!",
    });
  } else {
    Toast.show({
      type: "error",
      text1: "Hiba",
      text2: "Ezzel az email-címmel vagy felhasználónévvel már regisztráltak!",
    });
  }
} else {
      Toast.show({
        type: "success",
        text1: "Siker!",
        text2: "Nézd meg az e-mailed a visszaigazoláshoz!",
      });
    }
  }

  // ── Teszt adatok kitöltése + regisztráció indítása ────────────────────────
  function fillAndRegister() {
    setUsername("teszt");
    setEmail("teszt@gmail.com");
    setPassword("jelszo12");
    setPasswordRepeat("jelszo12");
    Toast.show({ type: "info", text1: "Teszt adatok betöltve" });
    // Delay szükséges, hogy a React state frissüljön handleRegister előtt
    setTimeout(handleRegister, 100);
  }

  // ── Fake regisztráció — Supabase nélkül, egyből belép ────────────────────
  function handleQuickRegister() {
    Toast.show({ type: "success", text1: "Teszt regisztráció", text2: "Gyors belépés sikeres" });
    setGlobalIsLoggedIn(true);
    router.push("/");
  }

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Pressable onPress={() => router.back()} style={styles.backBtn}>
        <Text style={styles.backText}>← Vissza</Text>
      </Pressable>

      <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        <Animated.View
          style={[styles.content, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}
        >
          {/* Brand */}
          <View style={styles.brandRow}>
        <Image source={require("../../assets/mine/icons/rd-logo.png")} style={styles.crown}  />
            <Text style={styles.brandName}>Royal Delivery</Text>
          </View>

          {/* Heading */}
          <Text style={styles.heading}>Csatlakozz{"\n"}hozzánk!</Text>
          <Text style={styles.subheading}>Hozz létre egy fiókot a rendeléshez</Text>

          {/* Form card */}
          <View style={styles.card}>
            <AnimatedInput
              value={username}
              onChangeText={setUsername}
              placeholder="Felhasználónév"
              icon="👤"
            />
            <AnimatedInput
              value={email}
              onChangeText={setEmail}
              placeholder="Email cím"
              icon="✉️"
            />
            <AnimatedInput
              value={password}
              onChangeText={setPassword}
              placeholder="Jelszó"
              secureTextEntry
              icon="🔒"
            />
            <AnimatedInput
              value={passwordRepeat}
              onChangeText={setPasswordRepeat}
              placeholder="Jelszó megerősítése"
              secureTextEntry
              icon="🔑"
            />

            {email.length > 0 && !isValidEmail(email) && (
  <Text style={styles.errorText}>⚠️ Érvénytelen email cím</Text>
)}
{password.length > 0 && !isStrongPassword(password) && (
  <Text style={styles.errorText}>⚠️ Legalább 6 karakter hosszú jelszó szükséges</Text>
)}

            {/* Jelszó eltérés figyelmeztetés */}
            {passwordRepeat.length > 0 && password !== passwordRepeat && (
              <Text style={styles.errorText}>⚠️ A jelszavak nem egyeznek</Text>
            )}

            {/* Primary register button */}
            <Pressable
              onPress={handleRegister}
              disabled={!isFormValid || loading}
              style={({ pressed }) => [
                styles.primaryBtn,
                (!isFormValid || loading) && styles.primaryBtnDisabled,
                pressed && isFormValid && styles.btnPressed,
              ]}
            >
              <Text style={styles.primaryBtnText}>
  {loading ? "Regisztráció..." : "Regisztrálok →"}
</Text>

{loading && (
  <ActivityIndicator
    size="small"
    color="#0f0e0c"
    style={{ marginTop: 6 }}
  />
)}
            </Pressable>

            {/* Divider */}
            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>vagy</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Test buttons */}
            <View style={styles.testRow}>
              {/* Kitölti a mezőket + valódi Supabase regisztráció */}
              <Pressable
                onPress={fillAndRegister}
                style={({ pressed }) => [styles.ghostBtn, pressed && styles.btnPressed]}
              >
                <Text style={styles.ghostBtnText}>Kitöltés teszt adatokkal</Text>
              </Pressable>

              {/* Supabase-t megkerüli, egyből belép */}
              <Pressable
                onPress={handleQuickRegister}
                style={({ pressed }) => [styles.ghostBtn, styles.ghostBtnGold, pressed && styles.btnPressed]}
              >
                <Text style={[styles.ghostBtnText, { color: COLORS.gold }]}>Gyors belépés</Text>
              </Pressable>
            </View>
          </View>

          {/* Login link */}
          <View style={styles.loginRow}>
            <Text style={styles.loginPrompt}>Már van fiókod? </Text>
            <Pressable onPress={() => router.push("/LoginScreen")}>
              <Text style={styles.loginLink}>Jelentkezz be</Text>
            </Pressable>
          </View>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.bg },
  backBtn: { paddingTop: 20, paddingLeft: 20, paddingBottom: 8 },
  backText: { color: COLORS.muted, fontSize: 15, fontWeight: "500" },
  content: { paddingHorizontal: 24, paddingTop: 16, paddingBottom: 40 },

  brandRow: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 32 },
  crown: {
  width: 100,
  height: 100,
  resizeMode: "contain",
},
  brandName: { fontSize: 16, fontWeight: "700", color: COLORS.gold, letterSpacing: 0.5 },

  heading: {
    fontSize: 42, fontWeight: "900", color: COLORS.text,
    lineHeight: 46, letterSpacing: -0.5, marginBottom: 10,
  },
  subheading: { fontSize: 15, color: COLORS.muted, marginBottom: 36 },

  card: {
    backgroundColor: COLORS.card, borderRadius: 20,
    borderWidth: 1, borderColor: COLORS.border, padding: 20, gap: 14,
  },

  inputWrapper: {
    flexDirection: "row", alignItems: "center", backgroundColor: COLORS.surface,
    borderRadius: 12, borderWidth: 1.5, paddingHorizontal: 14, paddingVertical: 14, gap: 10,
  },
  inputIcon: { fontSize: 16 },
  input: { flex: 1, fontSize: 16, color: COLORS.text, padding: 0 },
  inputFilledDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: COLORS.gold },

  errorText: { fontSize: 13, color: "#ef4444", marginTop: -4 },

  primaryBtn: {
    backgroundColor: COLORS.gold, borderRadius: 14,
    paddingVertical: 16, alignItems: "center", marginTop: 4,
  },
  primaryBtnDisabled: { backgroundColor: COLORS.goldDim },
  primaryBtnText: { color: "#0f0e0c", fontSize: 16, fontWeight: "800", letterSpacing: 0.2 },
  btnPressed: { opacity: 0.82, transform: [{ scale: 0.97 }] },

  divider: { flexDirection: "row", alignItems: "center", gap: 10, marginVertical: 2 },
  dividerLine: { flex: 1, height: 1, backgroundColor: COLORS.border },
  dividerText: { fontSize: 13, color: COLORS.muted },

  testRow: { flexDirection: "row", gap: 10 },
  ghostBtn: {
    flex: 1, borderWidth: 1, borderColor: COLORS.border, borderRadius: 12,
    paddingVertical: 13, alignItems: "center", backgroundColor: COLORS.surface,
  },
  ghostBtnGold: { borderColor: COLORS.goldDim },
  ghostBtnText: { fontSize: 14, fontWeight: "600", color: COLORS.muted },

  loginRow: { flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 28 },
  loginPrompt: { fontSize: 14, color: COLORS.muted },
  loginLink: { fontSize: 14, fontWeight: "700", color: COLORS.gold },
});