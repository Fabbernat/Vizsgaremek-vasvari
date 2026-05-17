import { router } from 'expo-router';
import { Pressable, Text, TextInput, View } from 'react-native';
import { useState } from 'react';

export default function RegisterScreen() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
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
        Regisztráció
      </Text>

      <Text
        style={{
          textAlign: 'center',
          color: '#555',
          marginBottom: 28,
        }}
      >
        Hozz létre egy futár fiókot demó célra.
      </Text>

      <Text style={{ marginBottom: 6, fontWeight: '600' }}>Teljes név</Text>
      <TextInput
        value={fullName}
        onChangeText={setFullName}
        placeholder="Teljes név"
        style={{
          borderWidth: 1,
          borderColor: '#d1d5db',
          borderRadius: 10,
          paddingHorizontal: 14,
          paddingVertical: 12,
          marginBottom: 16,
        }}
      />

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

      <Text style={{ marginBottom: 6, fontWeight: '600' }}>Telefonszám</Text>
      <TextInput
        value={phone}
        onChangeText={setPhone}
        placeholder="+36301234567"
        keyboardType="phone-pad"
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
        onPress={() => router.push('/')}
        style={{
          backgroundColor: '#16a34a',
          paddingVertical: 14,
          borderRadius: 10,
          alignItems: 'center',
          marginBottom: 14,
        }}
      >
        <Text style={{ color: 'white', fontWeight: '700', fontSize: 16 }}>
          Demo regisztráció
        </Text>
      </Pressable>

      <Pressable onPress={() => router.push('/login')}>
        <Text
          style={{
            color: '#2563eb',
            textAlign: 'center',
            textDecorationLine: 'underline',
          }}
        >
          Van már fiókod? Bejelentkezés
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