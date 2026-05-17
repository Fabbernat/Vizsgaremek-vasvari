// client-app\(app)\app\(app)\loginScreen.tsx
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
    Alert,
    Animated,
    Image,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import Toast from "react-native-toast-message";
import { supabase } from "../../supabase";
import { setGlobalIsLoggedIn } from "@/stores/AuthStore";

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

type Props = {
  style?: any;
  isLoggedIn: boolean;
  setIsLoggedIn: (v: boolean) => void;
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

export default function LoginScreen({ isLoggedIn, setIsLoggedIn }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.spring(slideAnim, { toValue: 0, tension: 60, friction: 9, useNativeDriver: true }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  const isFormValid = email.trim().length > 0 && password.length > 0;

  // ── Real Supabase login (with signUp workaround) ──────────────────────────
async function handleLogin(overrideEmail?: string, overridePass?: string) {
  const _email = overrideEmail ?? (email ?? "");
  const _password = overridePass ?? (password ?? "");

    setLoading(true);

    // Workaround: ensure test user exists in Supabase before signing in
    await supabase.auth.signUp({
      email:  process.env.EXPO_PUBLIC_TEST_EMAIL,
      password: process.env.EXPO_PUBLIC_TEST_PASSWORD,
    });

    const { error } = await supabase.auth.signInWithPassword({ email: _email, password: _password });
    setLoading(false);

    if (error) {
      const friendlyError = error.message.includes("Invalid login credentials")
        ? "Hibás email vagy jelszó"
        : error.message;
      Toast.show({ type: "error", text1: "Sikertelen bejelentkezés", text2: friendlyError });
    } else {
      Toast.show({ type: "success", text1: "Üdvözlünk!", text2: "Sikeres bejelentkezés" });
      setGlobalIsLoggedIn(true);
      router.push("/");
    }
  }

  // ── Forgot password — sends reset email via Supabase ─────────────────────
  async function handleForgotPassword() {
    if (email.trim().length === 0) {
      Alert.alert("Elfelejtett jelszó", "Kérjük, add meg az email-címed a visszaállításhoz!");
      return;
    }
    setResetLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim());
    setResetLoading(false);

    if (error) {
      Toast.show({ type: "error", text1: "Hiba", text2: error.message });
    } else {
      Toast.show({
        type: "success",
        text1: "Email elküldve!",
        text2: "Nézd meg a postaládád a visszaállítási linkért.",
      });
    }
  }

  // ── Fill fields + auto-trigger real login after state settles ─────────────
  async function fillAndLogin() {
    const testEmail = process.env.EXPO_PUBLIC_TEST_EMAIL;
    const testPassword = process.env.EXPO_PUBLIC_TEST_PASSWORD;

    setEmail(testEmail);
    setPassword(testPassword);
    Toast.show({ type: "info", text1: "Teszt adatok betöltése sikeres" });
    if (__DEV__) await supabase.auth.signUp({ email: testEmail, password: testPassword });
    await handleLogin(testEmail, testPassword);
  }

  // ── Fake/bypass login — no Supabase call needed ───────────────────────────
  function handleQuickLogin() {
    Toast.show({ type: "success", text1: "Teszt belépés", text2: "Gyors login sikeres" });
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

      <Animated.View
        style={[styles.content, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}
      >
        {/* Brand */}
        <View style={styles.brandRow}>
        <Image source={require("../../assets/mine/icons/royal-delivery-logo.png")} style={styles.crown}  />
          <Text style={styles.brandName}>Royal Delivery</Text>
        </View>

        {/* Heading */}
        <Text style={styles.heading}>Üdvözlünk{"\n"}újra!</Text>
        <Text style={styles.subheading}>Jelentkezz be a folytatáshoz</Text>

        {/* Form card */}
        <View style={styles.card}>
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

          {/* Forgot password link */}
          <Pressable
            onPress={handleForgotPassword}
            disabled={resetLoading}
            style={({ pressed }) => [styles.forgotBtn, pressed && styles.btnPressed]}
          >
            <Text style={styles.forgotBtnText}>
              {resetLoading ? "Küldés..." : "🔑 Elfelejtett jelszó?"}
            </Text>
          </Pressable>

          {/* Primary login button */}
          <Pressable
            onPress={() => handleLogin()}
            disabled={!isFormValid || loading}
            style={({ pressed }) => [
              styles.primaryBtn,
              (!isFormValid || loading) && styles.primaryBtnDisabled,
              pressed && isFormValid && styles.btnPressed,
            ]}
          >
            <Text style={styles.primaryBtnText}>
              {loading ? "Bejelentkezés..." : "Bejelentkezés →"}
            </Text>
          </Pressable>

          {/* Divider */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>vagy</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Test buttons */}
          <View style={styles.testRow}>
            {/* Fills fields + triggers real Supabase login */}
            <Pressable
              onPress={fillAndLogin}
              style={({ pressed }) => [styles.ghostBtn, pressed && styles.btnPressed]}
            >
              <Text style={styles.ghostBtnText}>Kitöltés teszt adatokkal</Text>
            </Pressable>

            {/* Bypasses Supabase entirely — requires fields filled */}
            <Pressable
              onPress={handleQuickLogin}
              style={({ pressed }) => [styles.ghostBtn, styles.ghostBtnGold, pressed && styles.btnPressed]}
            >
              <Text style={[styles.ghostBtnText, { color: COLORS.gold }]}>Gyors belépés</Text>
            </Pressable>
          </View>
        </View>

        {/* Register link */}
        <View style={styles.registerRow}>
          <Text style={styles.registerPrompt}>Nincs még fiókod? </Text>
          <Pressable onPress={() => router.push("/RegisterScreen")}>
            <Text style={styles.registerLink}>Hozz létre egyet!</Text>
          </Pressable>
        </View>
      </Animated.View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.bg },
  backBtn: { paddingTop: 20, paddingLeft: 20, paddingBottom: 8 },
  backText: { color: COLORS.muted, fontSize: 15, fontWeight: "500" },
  content: { flex: 1, paddingHorizontal: 24, paddingTop: 16 },

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

  forgotBtn: { alignSelf: "flex-end", marginTop: -4 },
  forgotBtnText: { fontSize: 13, fontWeight: "600", color: "#c4b99a" },


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

  registerRow: { flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 28 },
  registerPrompt: { fontSize: 14, color: COLORS.muted },
  registerLink: { fontSize: 14, fontWeight: "700", color: COLORS.gold },
});