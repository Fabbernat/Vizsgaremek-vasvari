import { View, Text, Pressable } from 'react-native';
import { router } from 'expo-router';

export default function RootLayout() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        backgroundColor: '#ffffff',
      }}
    >
      {/* Cím */}
      <Text
        style={{
          fontSize: 28,
          fontWeight: 'bold',
          marginBottom: 12,
        }}
      >
        Royal Delivery
      </Text>

      {/* Leírás */}
      <Text
        style={{
          fontSize: 16,
          color: '#555',
          marginBottom: 40,
          textAlign: 'center',
        }}
      >
        Kiszállítás olcsón és egyszerűen.
      </Text>

      {/* Login gomb */}
      <Pressable
        onPress={() => router.push('/login')}
        style={{
          backgroundColor: '#2563eb',
          paddingVertical: 14,
          paddingHorizontal: 24,
          borderRadius: 12,
          marginBottom: 12,
          minWidth: 200,
          alignItems: 'center',
        }}
      >
        <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>
          Bejelentkezés
        </Text>
      </Pressable>

      {/* Register gomb */}
      <Pressable
        onPress={() => router.push('/register')}
        style={{
          backgroundColor: '#16a34a',
          paddingVertical: 14,
          paddingHorizontal: 24,
          borderRadius: 12,
          minWidth: 200,
          alignItems: 'center',
        }}
      >
        <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>
          Regisztráció
        </Text>
      </Pressable>
    </View>
  );
}