import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  Alert,
  ActivityIndicator,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { router } from "expo-router";
import { useCourierAuth } from "../stores/CourierAuthStore";
import { useTheme } from "../context/CourierThemeContext";

export default function LoginScreen() {
  const { colors } = useTheme();
  const { login, loading } = useCourierAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Kérjük, töltsd ki az összes mezőt!");
      return;
    }

    try {
      setError("");
      await login(email, password);
      router.replace("/home");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Bejelentkezés sikertelen";
      setError(message);
      Alert.alert("Hiba", message);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.container, { backgroundColor: colors.bg }]}
    >
      <StatusBar barStyle="light-content" backgroundColor={colors.bg} />

      <View style={styles.content}>
        {/* Logo/Title */}
        <View style={styles.titleSection}>
          <Text style={styles.logo}>👨‍💼</Text>
          <Text style={[styles.title, { color: colors.text }]}>
            Royal Delivery
          </Text>
          <Text style={[styles.subtitle, { color: colors.muted }]}>
            Futár Bejelentkezés
          </Text>
        </View>

        {/* Error Message */}
        {error && (
          <View
            style={[
              styles.errorBox,
              { backgroundColor: colors.danger + "20", borderColor: colors.danger },
            ]}
          >
            <Text style={[styles.errorText, { color: colors.danger }]}>
              ⚠️ {error}
            </Text>
          </View>
        )}

        {/* Form */}
        <View style={styles.form}>
          {/* Email Input */}
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: colors.text }]}>Email</Text>
            <View
              style={[
                styles.inputWrapper,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                },
              ]}
            >
              <Text style={styles.inputIcon}>📧</Text>
              <TextInput
                style={[styles.input, { color: colors.text }]}
                placeholder="futár@royaldelivery.hu"
                placeholderTextColor={colors.muted}
                value={email}
                onChangeText={setEmail}
                editable={!loading}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          {/* Password Input */}
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: colors.text }]}>Jelszó</Text>
            <View
              style={[
                styles.inputWrapper,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                },
              ]}
            >
              <Text style={styles.inputIcon}>🔒</Text>
              <TextInput
                style={[styles.input, { color: colors.text }]}
                placeholder="••••••••"
                placeholderTextColor={colors.muted}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                editable={!loading}
              />
              <Pressable onPress={() => setShowPassword(!showPassword)}>
                <Text style={styles.eyeIcon}>
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </Text>
              </Pressable>
            </View>
          </View>

          {/* Login Button */}
          <Pressable
            style={({ pressed }) => [
              styles.loginBtn,
              {
                backgroundColor: colors.gold,
                opacity: pressed || loading ? 0.85 : 1,
              },
            ]}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#000" size="small" />
            ) : (
              <Text style={styles.loginBtnText}>🚀 Bejelentkezés</Text>
            )}
          </Pressable>

          {/* Demo Credentials */}
          <View
            style={[
              styles.demoBox,
              { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
          >
            <Text style={[styles.demoTitle, { color: colors.muted }]}>
              📌 Demo Belépés (Teszteléshez)
            </Text>
            <Text style={[styles.demoText, { color: colors.text }]}>
              Email: courier@example.com
            </Text>
            <Text style={[styles.demoText, { color: colors.text }]}>
              Jelszó: password123
            </Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: colors.muted }]}>
            © 2026 Royal Delivery - Futár App
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
    justifyContent: "space-between",
  },
  titleSection: {
    alignItems: "center",
    marginTop: 40,
    marginBottom: 40,
  },
  logo: {
    fontSize: 64,
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: "900",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  errorBox: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 12,
    marginBottom: 20,
  },
  errorText: {
    fontSize: 14,
    fontWeight: "600",
  },
  form: {
    marginBottom: 40,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 12,
    height: 52,
    gap: 8,
  },
  inputIcon: {
    fontSize: 18,
  },
  input: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
  },
  eyeIcon: {
    fontSize: 18,
  },
  loginBtn: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
  },
  loginBtnText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#000",
  },
  demoBox: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    marginTop: 24,
  },
  demoTitle: {
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 12,
    textTransform: "uppercase",
  },
  demoText: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 4,
    fontFamily: "monospace",
  },
  footer: {
    alignItems: "center",
  },
  footerText: {
    fontSize: 12,
    fontWeight: "600",
  },
});
