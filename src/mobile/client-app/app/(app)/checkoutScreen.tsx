// client-app\(app)\app\(app)\CheckoutScreen.tsx
import { useState, useRef } from "react";
import {
  Text,
  TextInput,
  Pressable,
  ScrollView,
  View,
  Animated,
  StyleSheet,
  Image,
  Alert,
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
    Animated.timing(borderAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  const handleBlur = () =>
    Animated.timing(borderAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();

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
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!name) newErrors.name = "Kötelező mező";
    if (!email) newErrors.email = "Kötelező mező";
    if (!phone) newErrors.phone = "Kötelező mező";
    if (!zip) newErrors.zip = "Kötelező mező";
    if (!city) newErrors.city = "Kötelező mező";
    if (!street) newErrors.street = "Kötelező mező";
    if (!streetType) newErrors.streetType = "Kötelező mező";
    if (!houseNumber) newErrors.houseNumber = "Kötelező mező";

    const emailRegex = /\S+@\S+\.\S+/;
    if (email && !emailRegex.test(email)) {
      newErrors.email = "Érvénytelen e-mail";
    }

    if (phone && phone.length < 8) {
      newErrors.phone = "Túl rövid telefonszám";
    }

    if (zip && !/^\d{4}$/.test(zip)) {
      newErrors.zip = "4 számjegy szükséges";
    }

    if (!/^\d{16}$/.test(cardNumber.replace(/\s/g, ""))) {
      newErrors.cardNumber = "16 számjegy";
    }

    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) {
      newErrors.expiry = "MM/YY formátum";
    }

    if (!/^\d{3,4}$/.test(cvv)) {
      newErrors.cvv = "3-4 számjegy";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      Alert.alert("Hibás adatok", "Kérlek javítsd a pirossal jelölt mezőket.");
      return false;
    }

    return true;
  };

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, "").slice(0, 16);
    const groups = cleaned.match(/.{1,4}/g);
    return groups ? groups.join(" ") : cleaned;
  };

  const formatExpiry = (value: string) => {
    const cleaned = value.replace(/\D/g, "").slice(0, 4);

    if (cleaned.length <= 2) return cleaned;
    return cleaned.slice(0, 2) + "/" + cleaned.slice(2);
  };

  const isFormValid =
    name &&
    email &&
    phone &&
    zip &&
    city &&
    street &&
    streetType &&
    houseNumber &&
    /^\d{16}$/.test(cardNumber.replace(/\s/g, "")) &&
    /^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry) &&
    /^\d{3,4}$/.test(cvv);

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
        <Image
          source={require("../../assets/mine/icons/rd-logo.png")}
          style={styles.crown}
        />
        <Text style={styles.brandName}>Royal Delivery</Text>
      </View>

      <Text style={styles.heading}>Számlázási{"\n"}adatok</Text>
      <Text style={styles.subheading}>
        Töltsd ki az alábbi mezőket a rendeléshez
      </Text>

      {/* Personal info */}
      <View style={styles.card}>
        <SectionHeader icon="👤" title="Személyes adatok" />
        <AnimatedInput
          value={name}
          onChangeText={setName}
          placeholder="Teljes név"
          icon="✏️"
        />
        {errors.name && <Text style={styles.error}>{errors.name}</Text>}
        <AnimatedInput
          value={email}
          onChangeText={setEmail}
          placeholder="E-mail cím"
          icon="✉️"
          keyboardType="email-address"
        />
        {errors.email && <Text style={styles.error}>{errors.email}</Text>}
        <AnimatedInput
          value={phone}
          onChangeText={setPhone}
          placeholder="Telefonszám"
          icon="📞"
          keyboardType="phone-pad"
        />
        {errors.phone && <Text style={styles.error}>{errors.phone}</Text>}
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
            <AnimatedInput
              value={city}
              onChangeText={setCity}
              placeholder="Település"
              icon="🏙️"
            />
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
          onChangeText={(v) => setCardNumber(formatCardNumber(v))}
          placeholder="Kártyaszám"
          icon="💳"
          keyboardType="numeric"
        />
        {errors.cardNumber && (
          <Text style={styles.error}>{errors.cardNumber}</Text>
        )}
        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <AnimatedInput
              value={expiry}
              onChangeText={(v) => setExpiry(formatExpiry(v))}
              placeholder="Lejárat (MM/YY)"
              icon="📅"
            />
            {errors.expiry && <Text style={styles.error}>{errors.expiry}</Text>}
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
            {errors.cvv && <Text style={styles.error}>{errors.cvv}</Text>}
          </View>
        </View>
      </View>

      <Pressable
        onPress={() => {
          setName("Teszt Elek");
          setEmail("teszt@pelda.hu");
          setPhone("06301234567");
          setZip("6720");
          setCity("Szeged");
          setStreet("Kossuth Lajos");
          setStreetType("utca");
          setHouseNumber("12");
          setExtra("2/5");
          setCardNumber("4242424242424242");
          setExpiry("12/30");
          setCvv("123");
        }}
        style={({ pressed }) => [
          {
            backgroundColor: COLORS.surface,
            borderWidth: 1,
            borderColor: COLORS.border,
            borderRadius: 12,
            paddingVertical: 12,
            alignItems: "center",
            marginBottom: 10,
            opacity: pressed ? 0.7 : 1,
          },
        ]}
      >
        <Text style={{ color: COLORS.text, fontWeight: "600" }}>
          Kitöltés teszt adatokkal
        </Text>
      </Pressable>

      {/* Pay button */}
      <Pressable
        onPress={() => {
          if (validateForm()) {
            router.push("/payingScreen");
          }
        }}
        style={({ pressed }) => [
          styles.payBtn,
          !isFormValid && { opacity: 0.4 },
          pressed && styles.btnPressed,
        ]}
        disabled={!isFormValid}
      >
        <Text style={styles.payBtnText}>Fizetés →</Text>
        <Text style={styles.payBtnSub}>Biztonságos fizetési folyamat</Text>
      </Pressable>

      {/* Safety note */}
      <View style={styles.safetyRow}>
        <Text style={styles.safetyText}>
          🔒 Adataid titkosítva kerülnek továbbításra
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.bg },
  scrollContent: { paddingHorizontal: 24, paddingBottom: 48 },

  backBtn: { paddingTop: 20, paddingBottom: 8 },
  backText: { color: COLORS.muted, fontSize: 15, fontWeight: "500" },

  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 28,
    marginTop: 8,
  },
  crown: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  brandName: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.gold,
    letterSpacing: 0.5,
  },

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
  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.gold,
    letterSpacing: 0.2,
  },

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
  inputFilledDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: COLORS.gold,
  },

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
  error: {
    color: "#ff6b6b",
    fontSize: 12,
    marginTop: -6,
    marginBottom: 4,
  },
});
