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
        gap: 12,
      }}
    >
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
        Teszt kezdőlap
      </Text>

      <Pressable
        onPress={() => {
          console.log('LOGIN CLICK');
          router.push('/login');
        }}
        style={{
          backgroundColor: '#2563eb',
          paddingVertical: 12,
          paddingHorizontal: 20,
          borderRadius: 10,
          minWidth: 180,
          alignItems: 'center',
        }}
      >
        <Text style={{ color: 'white', fontWeight: '600' }}>Bejelentkezés</Text>
      </Pressable>

      <Pressable
        onPress={() => {
          console.log('REGISTER CLICK');
          router.push('/register');
        }}
        style={{
          backgroundColor: '#16a34a',
          paddingVertical: 12,
          paddingHorizontal: 20,
          borderRadius: 10,
          minWidth: 180,
          alignItems: 'center',
        }}
      >
        <Text style={{ color: 'white', fontWeight: '600' }}>Regisztráció</Text>
      </Pressable>
    </View>
  );
}