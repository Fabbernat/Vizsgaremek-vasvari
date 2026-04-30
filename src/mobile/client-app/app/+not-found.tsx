// client-app\app\+not-found.tsx
import { View, Text, Pressable } from 'react-native';
import { router } from 'expo-router';

export default function NotFoundScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
      }}
    >
      <Text style={{ fontSize: 26, fontWeight: 'bold', marginBottom: 12 }}>
        404
      </Text>

      <Text style={{ marginBottom: 20 }}>
        Ez az oldal nem található.
      </Text>

      <Pressable
        onPress={() => router.replace('/')}
        style={{
          backgroundColor: '#2563eb',
          padding: 12,
          borderRadius: 10,
        }}
      >
        <Text style={{ color: 'white' }}>Vissza a főoldalra</Text>
      </Pressable>
    </View>
  );
}