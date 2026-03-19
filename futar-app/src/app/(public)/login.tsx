import { View, Text, Button } from 'react-native';
import { router } from 'expo-router';

export default function LoginScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>
        Royal Delivery Futár App
      </Text>

      <Text style={{ marginBottom: 24 }}>
        Itt lesz majd a bejelentkezés.
      </Text>

      <Button title="Demo belépés" onPress={() => router.replace('/')} />
    </View>
  );
}