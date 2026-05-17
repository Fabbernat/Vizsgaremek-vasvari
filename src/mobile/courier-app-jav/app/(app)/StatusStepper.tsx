import { View, Text } from "react-native";
import { useTheme } from "./ThemeContext";

// components/StatusStepper.tsx
const STEPS = ["Új", "Készül", "Futárnak átadva", "Kiszállítás alatt", "Kézbesítve"];

export function StatusStepper({ currentStep }: { currentStep: number }) {
  const { colors } = useTheme();
  return (
    <View>
      {STEPS.map((step, i) => (
        <View key={i} style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          <View style={{
            width: 24, height: 24, borderRadius: 12,
            backgroundColor: i <= currentStep ? colors.gold : colors.surface,
            alignItems: "center", justifyContent: "center"
          }}>
            <Text style={{ color: i <= currentStep ? colors.bg : colors.muted, fontWeight: "800" }}>
              {i <= currentStep ? "✓" : i + 1}
            </Text>
          </View>
          <Text style={{ color: i <= currentStep ? colors.text : colors.muted, fontWeight: i === currentStep ? "800" : "400" }}>
            {step}
          </Text>
        </View>
      ))}
    </View>
  );
}