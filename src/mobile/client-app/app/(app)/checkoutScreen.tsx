// client-app\(app)\app\(app)\CheckoutScreen.tsx
import { router } from "expo-router";
import { useRef, useState } from "react";
import {
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

const COLORS = {
  bg: "#0f0e0c",
  surface: "#1c1a16",
  card: "#242018",
  border: "#2e2b22",
  gold: "#f0b429",
  goldDark: "#c58f12",
  text: "#f5f0e8",
  muted: "#9c9178",
  placeholder: "#5a5545",
  error: "#ff6b6b",
  success: "#4ade80",
};

const onlyDigits = (v: string) => v.replace(/\D/g, "");

const luhnCheck = (card: string) => {
  const digits = onlyDigits(card);
  if (digits.length < 13 || digits.length > 19) return false;

  let sum = 0;
  let shouldDouble = false;

  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = Number(digits[i]);

    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }

    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return sum % 10 === 0;
};

const isFutureExpiry = (value: string) => {
  if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(value)) return false;

  const [mm, yy] = value.split("/");
  const month = Number(mm);
  const year = 2000 + Number(yy);

  const now = new Date();
  const expiryEnd = new Date(year, month, 0, 23, 59, 59);

  return expiryEnd >= now;
};

const formatCardNumber = (value: string) => {
  const cleaned = onlyDigits(value).slice(0, 19);
  return cleaned.match(/.{1,4}/g)?.join(" ") ?? cleaned;
};

const formatExpiry = (value: string) => {
  const cleaned = onlyDigits(value).slice(0, 4);
  if (cleaned.length <= 2) return cleaned;
  return `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
};

function AnimatedInput({
  value,
  onChangeText,
  placeholder,
  icon,
  error,
  secureTextEntry = false,
  keyboardType = "default",
}: {
  value: string;
  onChangeText: (v: string) => void;
  placeholder: string;
  icon: string;
  error?: string;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address" | "phone-pad" | "numeric";
}) {
  const borderAnim = useRef(new Animated.Value(0)).current;

  const handleFocus = () =>
    Animated.timing(borderAnim, {
      toValue: 1,
      duration: 180,
      useNativeDriver: false,
    }).start();

  const handleBlur = () =>
    Animated.timing(borderAnim, {
      toValue: 0,
      duration: 180,
      useNativeDriver: false,
    }).start();

  const borderColor = error
    ? COLORS.error
    : borderAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [COLORS.border, COLORS.gold],
      });

  return (
    <View>
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
          autoCorrect={false}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={styles.input}
        />

        {value.length > 0 && (
          <Text style={[styles.inputStatus, error && styles.inputStatusError]}>
            {error ? "!" : "✓"}
          </Text>
        )}
      </Animated.View>

      {!!error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

function SectionHeader({
  icon,
  title,
  subtitle,
}: {
  icon: string;
  title: string;
  subtitle: string;
}) {
  return (
    <View style={styles.sectionHeader}>
      <View style={styles.sectionIconBox}>
        <Text style={styles.sectionIcon}>{icon}</Text>
      </View>

      <View style={{ flex: 1 }}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <Text style={styles.sectionSubtitle}>{subtitle}</Text>
      </View>
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) newErrors.name = "Kötelező mező";
    if (!email.trim()) newErrors.email = "Kötelező mező";
    if (!phone.trim()) newErrors.phone = "Kötelező mező";
    if (!zip.trim()) newErrors.zip = "Kötelező mező";
    if (!city.trim()) newErrors.city = "Kötelező mező";
    if (!street.trim()) newErrors.street = "Kötelező mező";
    if (!streetType.trim()) newErrors.streetType = "Kötelező mező";
    if (!houseNumber.trim()) newErrors.houseNumber = "Kötelező mező";

    if (email && !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Érvénytelen e-mail";
    }

    if (phone && onlyDigits(phone).length < 8) {
      newErrors.phone = "Túl rövid telefonszám";
    }

    if (zip && !/^\d{4}$/.test(zip)) {
      newErrors.zip = "4 számjegy szükséges";
    }

    if (!luhnCheck(cardNumber)) {
      newErrors.cardNumber = "Érvénytelen kártyaszám";
    }

    if (!isFutureExpiry(expiry)) {
      newErrors.expiry = "Érvénytelen vagy lejárt kártya";
    }

    if (!/^\d{3,4}$/.test(cvv)) {
      newErrors.cvv = "3-4 számjegy";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isFormValid =
    !!name.trim() &&
    /\S+@\S+\.\S+/.test(email) &&
    onlyDigits(phone).length >= 8 &&
    /^\d{4}$/.test(zip) &&
    !!city.trim() &&
    !!street.trim() &&
    !!streetType.trim() &&
    !!houseNumber.trim() &&
    luhnCheck(cardNumber) &&
    isFutureExpiry(expiry) &&
    /^\d{3,4}$/.test(cvv);

  const handlePay = () => {
    if (isSubmitting) return;

    if (!validateForm()) {
      Toast.show({
        type: "error",
        text1: "Hibás adatok",
        text2: "Kérlek javítsd ki a hibás adatokat!",
        position: "bottom",
      });
      return;
    }

    setIsSubmitting(true);
    setCvv("");

    Toast.show({
      type: "success",
      text1: "Sikeres ellenőrzés",
      text2: "Átirányítás a fizetés feldolgozásához...",
      position: "bottom",
    });

    setTimeout(() => {
      router.replace("/PayingScreen");
    }, 600);
  };

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backText}>← Vissza</Text>
        </Pressable>

        <View style={styles.hero}>
          <View style={styles.brandRow}>
            <Image
              source={require("../../assets/mine/icons/royal-delivery-logo.png")}
              style={styles.crown}
            />

            <View>
              <Text style={styles.brandName}>Royal Delivery</Text>
              <Text style={styles.brandSub}>Gyors, elegáns, biztonságos</Text>
            </View>
          </View>

          <Text style={styles.heading}>Rendelés véglegesítése</Text>
          <Text style={styles.subheading}>
            Töltsd ki az alábbi mezőket a rendeléshez
          </Text>

          <View style={styles.progressWrap}>
            <View style={styles.progressActive} />
            <View style={styles.progressActive} />
            <View style={styles.progressActive} />
          </View>
        </View>

        <View style={styles.card}>
          <SectionHeader
            icon="👤"
            title="Személyes adatok"
            subtitle="Személyes adatok"
          />

          <AnimatedInput
            value={name}
            onChangeText={setName}
            placeholder="Teljes név"
            icon="✏️"
            error={errors.name}
          />

          <AnimatedInput
            value={email}
            onChangeText={setEmail}
            placeholder="E-mail cím"
            icon="✉️"
            keyboardType="email-address"
            error={errors.email}
          />

          <AnimatedInput
            value={phone}
            onChangeText={(v) => setPhone(v.slice(0, 20))}
            placeholder="Telefonszám"
            icon="📞"
            keyboardType="phone-pad"
            error={errors.phone}
          />
        </View>

        <View style={styles.card}>
          <SectionHeader
            icon="📍"
            title="Szállítási cím"
            subtitle="Szállítási cím"
          />

          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <AnimatedInput
                value={zip}
                onChangeText={(v) => setZip(onlyDigits(v).slice(0, 4))}
                placeholder="Irányítószám"
                icon="🔢"
                keyboardType="numeric"
                error={errors.zip}
              />
            </View>

            <View style={{ flex: 2 }}>
              <AnimatedInput
                value={city}
                onChangeText={setCity}
                placeholder="Település"
                icon="🏙️"
                error={errors.city}
              />
            </View>
          </View>

          <AnimatedInput
            value={street}
            onChangeText={setStreet}
            placeholder="Közterület neve"
            icon="🛣️"
            error={errors.street}
          />

          <AnimatedInput
            value={streetType}
            onChangeText={setStreetType}
            placeholder="Közterület jellege"
            icon="🗺️"
            error={errors.streetType}
          />

          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <AnimatedInput
                value={houseNumber}
                onChangeText={setHouseNumber}
                placeholder="Házszám"
                icon="🏠"
                error={errors.houseNumber}
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

        <View style={styles.card}>
          <SectionHeader
            icon="💳"
            title="Bankkártya"
            subtitle="Demo fizetéshez tesztkártya ajánlott"
          />

          <AnimatedInput
            value={cardNumber}
            onChangeText={(v) => setCardNumber(formatCardNumber(v))}
            placeholder="Kártyaszám"
            icon="💳"
            keyboardType="numeric"
            error={errors.cardNumber}
          />

          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <AnimatedInput
                value={expiry}
                onChangeText={(v) => setExpiry(formatExpiry(v))}
                placeholder="Lejárat (MM/YY)"
                icon="📅"
                keyboardType="numeric"
                error={errors.expiry}
              />
            </View>

            <View style={{ flex: 1 }}>
              <AnimatedInput
                value={cvv}
                onChangeText={(v) => setCvv(onlyDigits(v).slice(0, 4))}
                placeholder="CVV"
                icon="🔒"
                secureTextEntry
                keyboardType="numeric"
                error={errors.cvv}
              />
            </View>
          </View>
        </View>

        {__DEV__ && (
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
              setCardNumber("4242 4242 4242 4242");
              setExpiry("12/30");
              setCvv("123");
              setErrors({});

              Toast.show({
                type: "info",
                text1: "Teszt adatok betöltése sikeres",
                position: "bottom",
              });
            }}
            style={({ pressed }) => [
              styles.testBtn,
              pressed && styles.btnPressed,
            ]}
          >
            <Text style={styles.testBtnText}>Kitöltés teszt adatokkal</Text>
          </Pressable>
        )}

        <Pressable
          onPress={handlePay}
          disabled={!isFormValid || isSubmitting}
          style={({ pressed }) => [
            styles.payBtn,
            (!isFormValid || isSubmitting) && styles.payBtnDisabled,
            pressed && styles.btnPressed,
          ]}
        >
          <Text style={styles.payBtnText}>
            {isSubmitting ? "Feldolgozás..." : "Fizetés →"}
          </Text>
          <Text style={styles.payBtnSub}>Biztonságos fizetési folyamat</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 44,
  },

  backBtn: {
    alignSelf: "flex-start",
    paddingTop: 20,
    paddingBottom: 10,
    paddingRight: 16,
  },
  backText: {
    color: COLORS.muted,
    fontSize: 15,
    fontWeight: "700",
  },

  hero: {
    marginBottom: 18,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 8,
    marginBottom: 26,
  },
  crown: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  brandName: {
    fontSize: 18,
    fontWeight: "900",
    color: COLORS.gold,
    letterSpacing: 0.3,
  },
  brandSub: {
    color: COLORS.muted,
    fontSize: 12,
    marginTop: 2,
  },
  heading: {
    fontSize: 36,
    fontWeight: "900",
    color: COLORS.text,
    lineHeight: 40,
    letterSpacing: -0.7,
  },
  subheading: {
    fontSize: 14,
    color: COLORS.muted,
    lineHeight: 20,
    marginTop: 10,
    marginBottom: 18,
  },
  progressWrap: {
    flexDirection: "row",
    gap: 8,
  },
  progressActive: {
    flex: 1,
    height: 5,
    borderRadius: 999,
    backgroundColor: COLORS.gold,
  },

  card: {
    backgroundColor: COLORS.card,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 16,
    gap: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.22,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 5,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingBottom: 12,
    marginBottom: 2,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  sectionIconBox: {
    width: 38,
    height: 38,
    borderRadius: 14,
    backgroundColor: COLORS.surface,
    justifyContent: "center",
    alignItems: "center",
  },
  sectionIcon: {
    fontSize: 18,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: COLORS.text,
  },
  sectionSubtitle: {
    color: COLORS.muted,
    fontSize: 12,
    marginTop: 2,
  },

  inputWrapper: {
    minHeight: 52,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    borderWidth: 1.5,
    paddingHorizontal: 14,
    gap: 10,
  },
  inputIcon: {
    fontSize: 16,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: COLORS.text,
    padding: 0,
  },
  inputStatus: {
    color: COLORS.success,
    fontSize: 14,
    fontWeight: "900",
  },
  inputStatusError: {
    color: COLORS.error,
  },

  row: {
    flexDirection: "row",
    gap: 10,
  },

  error: {
    color: COLORS.error,
    fontSize: 12,
    fontWeight: "700",
    marginTop: 6,
    marginLeft: 4,
  },

  testBtn: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 12,
  },
  testBtnText: {
    color: COLORS.text,
    fontWeight: "800",
  },

  payBtn: {
    backgroundColor: COLORS.gold,
    borderRadius: 20,
    paddingVertical: 18,
    alignItems: "center",
    marginTop: 2,
    marginBottom: 14,
    shadowColor: COLORS.gold,
    shadowOpacity: 0.28,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
  payBtnDisabled: {
    opacity: 0.45,
    shadowOpacity: 0,
  },
  payBtnText: {
    color: COLORS.bg,
    fontSize: 18,
    fontWeight: "900",
    letterSpacing: 0.2,
  },
  payBtnSub: {
    color: COLORS.bg,
    fontSize: 12,
    fontWeight: "700",
    opacity: 0.62,
    marginTop: 4,
  },
  btnPressed: {
    opacity: 0.82,
    transform: [{ scale: 0.98 }],
  },

  safetyCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 14,
  },
  safetyIcon: {
    fontSize: 18,
  },
  safetyText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 17,
    color: COLORS.muted,
  },
});