import { router } from 'expo-router';
import { Pressable, Text, TextInput, View } from 'react-native';
import { useState } from 'react';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        padding: 24,
        backgroundColor: '#ffffff',
      }}
    >
      <Text
        style={{
          fontSize: 28,
          fontWeight: 'bold',
          marginBottom: 12,
          textAlign: 'center',
        }}
      >
        Bejelentkezés
      </Text>

      <Text
        style={{
          textAlign: 'center',
          color: '#555',
          marginBottom: 28,
        }}
      >
        Lépj be a Royal Delivery futár alkalmazásba.
      </Text>

      <Text style={{ marginBottom: 6, fontWeight: '600' }}>E-mail</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="pelda@email.com"
        keyboardType="email-address"
        autoCapitalize="none"
        style={{
          borderWidth: 1,
          borderColor: '#d1d5db',
          borderRadius: 10,
          paddingHorizontal: 14,
          paddingVertical: 12,
          marginBottom: 16,
        }}
      />

      <Text style={{ marginBottom: 6, fontWeight: '600' }}>Jelszó</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Jelszó"
        secureTextEntry
        style={{
          borderWidth: 1,
          borderColor: '#d1d5db',
          borderRadius: 10,
          paddingHorizontal: 14,
          paddingVertical: 12,
          marginBottom: 24,
        }}
      />

      <Pressable
        onPress={() => router.replace('/')}
        style={{
          backgroundColor: '#2563eb',
          paddingVertical: 14,
          borderRadius: 10,
          alignItems: 'center',
          marginBottom: 14,
        }}
      >
        <Text style={{ color: 'white', fontWeight: '700', fontSize: 16 }}>
          Demo belépés
        </Text>
      </Pressable>

      <Pressable onPress={() => router.push('/register')}>
        <Text
          style={{
            color: '#2563eb',
            textAlign: 'center',
            textDecorationLine: 'underline',
          }}
        >
          Nincs még fiókod? Regisztrálj
        </Text>
      </Pressable>

      <Pressable onPress={() => router.push('/contacts')} style={{ marginTop: 18 }}>
        <Text
          style={{
            color: '#2563eb',
            textAlign: 'center',
            textDecorationLine: 'underline',
          }}
        >
          Segítség / Kapcsolat
        </Text>
      </Pressable>
    </View>
  );
}