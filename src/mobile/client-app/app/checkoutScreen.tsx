import { useState, useRef,} from "react";
import {
  Text,
  TextInput,
  Pressable,
  ScrollView,
  View,
  Animated,
  StyleSheet,
  Image,
} from "react-native";
import { router } from "expo-router";

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
  icon,
  secureTextEntry = false,
  keyboardType = "default",
}: {
  value: string;
  onChangeText: (v: string) => void;
  placeholder: string;
  icon: string;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address" | "phone-pad" | "numeric";
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
        keyboardType={keyboardType}
        autoCapitalize="none"
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={styles.input}
      />
      {value.length > 0 && <View style={styles.inputFilledDot} />}
    </Animated.View>
  );
}

function SectionHeader({ icon, title }: { icon: string; title: string }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionIcon}>{icon}</Text>
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  );
}

export default function CheckoutScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [zip, setZip] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [streetType, setStreetType] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [extra, setExtra] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

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
        <Image source={require("../assets/mine/icons/rd-logo.png")}  style={styles.crown} />
        <Text style={styles.brandName}>Royal Delivery</Text>
      </View>

      <Text style={styles.heading}>Számlázási{"\n"}adatok</Text>
      <Text style={styles.subheading}>Töltsd ki az alábbi mezőket a rendeléshez</Text>

      {/* Personal info */}
      <View style={styles.card}>
        <SectionHeader icon="👤" title="Személyes adatok" />
        <AnimatedInput value={name} onChangeText={setName} placeholder="Teljes név" icon="✏️" />
        <AnimatedInput
          value={email}
          onChangeText={setEmail}
          placeholder="E-mail cím"
          icon="✉️"
          keyboardType="email-address"
        />
        <AnimatedInput
          value={phone}
          onChangeText={setPhone}
          placeholder="Telefonszám"
          icon="📞"
          keyboardType="phone-pad"
        />
      </View>

      {/* Address */}
      <View style={styles.card}>
        <SectionHeader icon="📍" title="Szállítási cím" />
        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <AnimatedInput
              value={zip}
              onChangeText={setZip}
              placeholder="Irányítószám"
              icon="🔢"
              keyboardType="numeric"
            />
          </View>
          <View style={{ flex: 2 }}>
            <AnimatedInput value={city} onChangeText={setCity} placeholder="Település" icon="🏙️" />
          </View>
        </View>
        <AnimatedInput
          value={street}
          onChangeText={setStreet}
          placeholder="Közterület neve"
          icon="🛣️"
        />
        <AnimatedInput
          value={streetType}
          onChangeText={setStreetType}
          placeholder="Közterület jellege (utca, út…)"
          icon="🗺️"
        />
        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <AnimatedInput
              value={houseNumber}
              onChangeText={setHouseNumber}
              placeholder="Házszám"
              icon="🏠"
            />
          </View>
          <View style={{ flex: 2 }}>
            <AnimatedInput
              value={extra}
              onChangeText={setExtra}
              placeholder="Emelet, ajtó, stb."
              icon="🚪"
            />
          </View>
        </View>
      </View>

      {/* Card info */}
      <View style={styles.card}>
        <SectionHeader icon="💳" title="Bankkártya adatok" />
        <AnimatedInput
          value={cardNumber}
          onChangeText={setCardNumber}
          placeholder="Kártyaszám"
          icon="💳"
          keyboardType="numeric"
        />
        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <AnimatedInput
              value={expiry}
              onChangeText={setExpiry}
              placeholder="Lejárat (hó/év)"
              icon="📅"
            />
          </View>
          <View style={{ flex: 1 }}>
            <AnimatedInput
              value={cvv}
              onChangeText={setCvv}
              placeholder="CVV/CVC"
              icon="🔒"
              secureTextEntry
              keyboardType="numeric"
            />
          </View>
        </View>
      </View>

      {/* Pay button */}
      <Pressable
        onPress={() => router.push("/payingScreen")}
        style={({ pressed }) => [styles.payBtn, pressed && styles.btnPressed]}
      >
        <Text style={styles.payBtnText}>Fizetés →</Text>
        <Text style={styles.payBtnSub}>Biztonságos fizetési folyamat</Text>
      </Pressable>

      {/* Safety note */}
      <View style={styles.safetyRow}>
        <Text style={styles.safetyText}>🔒  Adataid titkosítva kerülnek továbbításra</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.bg },
  scrollContent: { paddingHorizontal: 24, paddingBottom: 48 },

  backBtn: { paddingTop: 20, paddingBottom: 8 },
  backText: { color: COLORS.muted, fontSize: 15, fontWeight: "500" },

  brandRow: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 28, marginTop: 8 },
  crown: {
  width: 100,
  height: 100,
  resizeMode: "contain",
},
  brandName: { fontSize: 16, fontWeight: "700", color: COLORS.gold, letterSpacing: 0.5 },

  heading: {
    fontSize: 38,
    fontWeight: "900",
    color: COLORS.text,
    lineHeight: 44,
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  subheading: { fontSize: 14, color: COLORS.muted, marginBottom: 28 },

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
    marginBottom: 4,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  sectionIcon: { fontSize: 16 },
  sectionTitle: { fontSize: 15, fontWeight: "700", color: COLORS.gold, letterSpacing: 0.2 },

  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    borderWidth: 1.5,
    paddingHorizontal: 14,
    paddingVertical: 13,
    gap: 10,
  },
  inputIcon: { fontSize: 15 },
  input: { flex: 1, fontSize: 15, color: COLORS.text, padding: 0 },
  inputFilledDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: COLORS.gold },

  row: { flexDirection: "row", gap: 10 },

  payBtn: {
    backgroundColor: COLORS.gold,
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: "center",
    marginTop: 4,
    marginBottom: 16,
  },
  payBtnText: {
    color: "#0f0e0c",
    fontSize: 17,
    fontWeight: "800",
    letterSpacing: 0.2,
  },
  payBtnSub: {
    color: "#0f0e0c",
    fontSize: 12,
    fontWeight: "500",
    opacity: 0.6,
    marginTop: 3,
  },
  btnPressed: { opacity: 0.82, transform: [{ scale: 0.97 }] },

  safetyRow: { alignItems: "center", marginBottom: 8 },
  safetyText: { fontSize: 13, color: COLORS.muted },
});