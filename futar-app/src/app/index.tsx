import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
      }}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: 'bold',
          marginBottom: 12,
        }}
      >
        Futár kezdőlap
      </Text>

      <Text style={{ marginBottom: 24, textAlign: 'center' }}>
        Itt lesznek az aktív rendelések és a műszakadatok.
      </Text>

      <Pressable
        onPress={() => router.push('/login')}
        style={{
          backgroundColor: '#2563eb',
          paddingVertical: 12,
          paddingHorizontal: 20,
          borderRadius: 10,
          marginBottom: 12,
          minWidth: 180,
          alignItems: 'center',
        }}
      >
        <Text style={{ color: 'white', fontWeight: '600' }}>Bejelentkezés</Text>
      </Pressable>

      <Pressable
        onPress={() => router.push('/register')}
        style={{
          backgroundColor: '#16a34a',
          paddingVertical: 12,
          paddingHorizontal: 20,
          borderRadius: 10,
          marginBottom: 12,
          minWidth: 180,
          alignItems: 'center',
        }}
      >
        <Text style={{ color: 'white', fontWeight: '600' }}>Regisztráció</Text>
      </Pressable>

      <Pressable onPress={() => router.push('/contacts')}>
        <Text style={{ color: '#2563eb', textDecorationLine: 'underline' }}>
          Segítség
        </Text>
      </Pressable>
    </View>
  );
}