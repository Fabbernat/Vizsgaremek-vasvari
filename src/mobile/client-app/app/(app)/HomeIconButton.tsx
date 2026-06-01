// client-app/app/(app)/HomeIconButton.tsx
import { router } from 'expo-router';
import React from 'react';
import { Pressable, Text } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { isSmallPhone } from './HomeScreen';
import { styles } from './SettingsIconButton';


export default function HomeIconButton() {
  return (
    <Pressable onPress={() => router.push('/')} style={({ pressed }) => [
          styles.button,
          { backgroundColor: "#fbff00", borderColor: "#fbff00" },
          pressed && styles.pressed,
        ]}>
      <Text style={{ fontSize: 22 }}><Ionicons name="home-outline"  size={isSmallPhone ? 28 : 34}  /></Text>
    </Pressable>
  );
}